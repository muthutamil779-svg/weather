import React, { useState, useMemo } from 'react';
import { RegionForecast, RiskTier } from './types/forecast';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { DashboardTab } from './components/layout/Navigation';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { BustRiskOverview } from './components/dashboard/BustRiskOverview';
import { SettingsModal } from './components/dashboard/SettingsModal';
import { ForecastTimeline } from './components/forecast/ForecastTimeline';
import { ConfidenceSurface3D } from './components/forecast/ConfidenceSurface3D';
import { IndiaRiskMap } from './components/risk-map/IndiaRiskMap';
import { RegionListPanel } from './components/risk-map/RegionListPanel';
import { WeatherGlobe } from './components/globe/WeatherGlobe';
import { AIForecastAnalysis } from './components/ai-analysis/AIForecastAnalysis';
import { HistoricalAnalytics } from './components/historical/HistoricalAnalytics';
import { LoadingSkeleton } from './components/common/LoadingSkeleton';
import { ErrorState } from './components/common/ErrorState';
import { useForecastData } from './hooks/useForecastData';
import { useRegions } from './hooks/useRegions';
import { useWeatherSystems } from './hooks/useWeatherSystems';
import { useWebGLSupport } from './hooks/useWebGLSupport';
import { Globe, Map, Sparkles, Layers, ShieldAlert } from 'lucide-react';

export const App: React.FC = () => {
  const { data, loading, error, isRefreshing, refetch, triggerRefresh } = useForecastData();
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [selectedDay, setSelectedDay] = useState<number>(5); // Day 5 (high divergence)
  const [geoMode, setGeoMode] = useState<'map' | 'globe'>('map');

  const { hasWebGL } = useWebGLSupport();

  // Custom hooks for regions and weather systems
  const {
    selectedRegionId,
    setSelectedRegionId,
    selectedRegion,
    filterRisk,
    setFilterRisk,
    filteredRegions
  } = useRegions(data?.regions);

  const {
    selectedSystemId,
    setSelectedSystemId,
    selectedSystem
  } = useWeatherSystems(data?.weatherSystems);

  // When day is changed, update region forecasts according to that lead time
  const activeDayRegions: RegionForecast[] = useMemo(() => {
    if (!data) return [];
    // If selected day differs from base, adjust confidence slightly by lead time decay
    const leadDecay = Math.max(0, (selectedDay - 1) * 3);
    return data.regions.map(r => {
      const adjustedConf = Math.max(40, r.confidence - (selectedDay > 5 ? leadDecay : 0));
      const adjustedBust = 100 - adjustedConf;
      const adjustedRisk: import('./types/forecast').RiskTier = adjustedBust >= 35 ? 'high' : adjustedBust >= 20 ? 'medium' : 'low';
      return {
        ...r,
        forecastDay: selectedDay,
        confidence: adjustedConf,
        bustProbability: adjustedBust,
        riskTier: adjustedRisk
      };
    });
  }, [data, selectedDay]);

  if (loading && !data) {
    return (
      <div className="app-container">
        <Header
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          updatedAt={new Date().toISOString()}
          isRefreshing={false}
          onTriggerRefresh={() => {}}
        />
        <LoadingSkeleton />
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="app-container">
        <Header
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          updatedAt={new Date().toISOString()}
          isRefreshing={false}
          onTriggerRefresh={refetch}
        />
        <ErrorState message={error || undefined} onRetry={refetch} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* 1. Header Bar */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        updatedAt={data.updatedAt}
        isRefreshing={isRefreshing}
        onTriggerRefresh={triggerRefresh}
      />

      {/* Main Container */}
      <main className="main-content" id="main-content-panel">
        {/* Settings Tab View */}
        {activeTab === 'settings' && (
          <SettingsModal
            use3DGlobe={geoMode === 'globe'}
            onToggle3DGlobe={(val) => setGeoMode(val ? 'globe' : 'map')}
            onTriggerAssimilation={triggerRefresh}
            isRefreshing={isRefreshing}
          />
        )}

        {/* Forecast Analysis Tab Specific View */}
        {activeTab === 'forecast' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <ForecastTimeline
              timeline={data.timeline}
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
            />
            <ConfidenceSurface3D timeline={data.timeline} />
            <div className="dashboard-lower-grid">
              <AIForecastAnalysis
                aiInsight={data.aiInsight}
                overallConfidence={data.forecastSummary.confidence}
              />
              <HistoricalAnalytics charts={data.historicalCharts} />
            </div>
          </div>
        )}

        {/* Risk Map Tab Specific View */}
        {activeTab === 'risk-map' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="dashboard-main-grid">
              <IndiaRiskMap
                regions={activeDayRegions}
                weatherSystems={data.weatherSystems}
                selectedRegionId={selectedRegionId}
                onSelectRegion={setSelectedRegionId}
              />
              <RegionListPanel
                regions={activeDayRegions}
                selectedRegionId={selectedRegionId}
                onSelectRegion={setSelectedRegionId}
                filterRisk={filterRisk}
                onFilterChange={setFilterRisk}
              />
            </div>
            <BustRiskOverview aiInsight={data.aiInsight} />
          </div>
        )}

        {/* AI Explanation Tab Specific View */}
        {activeTab === 'ai-explanation' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <BustRiskOverview aiInsight={data.aiInsight} />
            <AIForecastAnalysis
              aiInsight={data.aiInsight}
              overallConfidence={data.forecastSummary.confidence}
            />
            <ConfidenceSurface3D timeline={data.timeline} />
          </div>
        )}

        {/* Historical Data Tab Specific View */}
        {activeTab === 'historical' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <HistoricalAnalytics charts={data.historicalCharts} />
            <ConfidenceSurface3D timeline={data.timeline} />
          </div>
        )}

        {/* Dashboard (Full Operational View) */}
        {activeTab === 'dashboard' && (
          <>
            {/* 2. Four Priority Summary Metric Cards */}
            <SummaryCards
              summary={data.forecastSummary}
              onNavigateToRisk={() => setFilterRisk('high')}
              onNavigateToSystems={() => setGeoMode('globe')}
            />

            {/* 3. Forecast Timeline Strip (Day 1 - Day 10) */}
            <ForecastTimeline
              timeline={data.timeline}
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
            />

            {/* 4. Meteorological Causal Chain Diagnostic Pipeline */}
            <BustRiskOverview aiInsight={data.aiInsight} />

            {/* 5. Primary Geospatial Intelligence Section (Map / Globe + Region Panel) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Spatial View Switcher */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="subtle-title">Spatial Verification Field</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    Displaying lead time: <strong>Day {selectedDay} Horizon</strong>
                  </span>
                </div>

                <div 
                  style={{
                    display: 'inline-flex',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--card-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '2px'
                  }}
                >
                  <button
                    onClick={() => setGeoMode('map')}
                    className={`fg-tab-btn ${geoMode === 'map' ? 'active' : ''}`}
                    style={{ padding: '4px 12px', fontSize: '11px' }}
                  >
                    <Map size={13} />
                    <span>India Risk Map (SVG)</span>
                  </button>
                  <button
                    onClick={() => setGeoMode('globe')}
                    className={`fg-tab-btn ${geoMode === 'globe' ? 'active' : ''}`}
                    style={{ padding: '4px 12px', fontSize: '11px' }}
                  >
                    <Globe size={13} />
                    <span>3D Weather Globe</span>
                  </button>
                </div>
              </div>

              {/* Grid: Visualizer + Synchronized Region Panel */}
              <div className="dashboard-main-grid">
                {geoMode === 'map' ? (
                  <IndiaRiskMap
                    regions={activeDayRegions}
                    weatherSystems={data.weatherSystems}
                    selectedRegionId={selectedRegionId}
                    onSelectRegion={setSelectedRegionId}
                  />
                ) : (
                  <WeatherGlobe
                    weatherSystems={data.weatherSystems}
                    selectedSystemId={selectedSystemId}
                    onSelectSystem={setSelectedSystemId}
                    force2D={!hasWebGL}
                  />
                )}

                {/* Region Vulnerability Registry Panel */}
                <RegionListPanel
                  regions={activeDayRegions}
                  selectedRegionId={selectedRegionId}
                  onSelectRegion={setSelectedRegionId}
                  filterRisk={filterRisk}
                  onFilterChange={setFilterRisk}
                />
              </div>
            </div>

            {/* 6. 2D/3D Confidence Topography Surface */}
            <ConfidenceSurface3D timeline={data.timeline} />

            {/* 7. Lower Grid: AI Forecast Analysis & Historical Analytics */}
            <div className="dashboard-lower-grid">
              <AIForecastAnalysis
                aiInsight={data.aiInsight}
                overallConfidence={data.forecastSummary.confidence}
              />
              <HistoricalAnalytics charts={data.historicalCharts} />
            </div>
          </>
        )}
      </main>

      {/* 8. Footer Bar */}
      <Footer />
    </div>
  );
};

export default App;
