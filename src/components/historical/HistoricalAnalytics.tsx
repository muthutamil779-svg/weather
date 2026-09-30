import React, { useState } from 'react';
import { HistoricalCharts, StationObservation } from '../../types/forecast';
import { ForecastErrorChart } from './ForecastErrorChart';
import { RainfallObsVsPredChart } from './RainfallObsVsPredChart';
import { TempWindErrorChart } from './TempWindErrorChart';
import { ConfidenceVsActualChart } from './ConfidenceVsActualChart';
import { StationObservationExplorer } from '../bias-correction/StationObservationExplorer';
import { History, CloudRain, Thermometer, Wind, Target, Radio } from 'lucide-react';

type HistoricalTab = 'error' | 'rainfall' | 'temp' | 'wind' | 'calibration' | 'stations';

interface HistoricalAnalyticsProps {
  charts: HistoricalCharts;
  stations?: StationObservation[];
}

export const HistoricalAnalytics: React.FC<HistoricalAnalyticsProps> = ({ charts, stations = [] }) => {
  const [activeTab, setActiveTab] = useState<HistoricalTab>('error');

  return (
    <div className="fg-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Header & Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <span className="subtle-title">Model Verification Suite</span>
          <h2 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Historical Error Analytics
          </h2>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.03)', padding: '2px', borderRadius: 'var(--radius-sm)', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('error')}
            className={`fg-tab-btn ${activeTab === 'error' ? 'active' : ''}`}
          >
            <History size={13} />
            <span>Forecast Error</span>
          </button>
          <button
            onClick={() => setActiveTab('rainfall')}
            className={`fg-tab-btn ${activeTab === 'rainfall' ? 'active' : ''}`}
          >
            <CloudRain size={13} />
            <span>Rainfall (Obs vs Pred)</span>
          </button>
          <button
            onClick={() => setActiveTab('temp')}
            className={`fg-tab-btn ${activeTab === 'temp' ? 'active' : ''}`}
          >
            <Thermometer size={13} />
            <span>Temperature</span>
          </button>
          <button
            onClick={() => setActiveTab('wind')}
            className={`fg-tab-btn ${activeTab === 'wind' ? 'active' : ''}`}
          >
            <Wind size={13} />
            <span>Wind</span>
          </button>
          <button
            onClick={() => setActiveTab('calibration')}
            className={`fg-tab-btn ${activeTab === 'calibration' ? 'active' : ''}`}
          >
            <Target size={13} />
            <span>Confidence vs Actual</span>
          </button>
          <button
            onClick={() => setActiveTab('stations')}
            className={`fg-tab-btn ${activeTab === 'stations' ? 'active' : ''}`}
          >
            <Radio size={13} />
            <span>IMD Stations & MOS Bias</span>
          </button>
        </div>
      </div>

      {/* Dynamic Tab Body */}
      <div>
        {activeTab === 'error' && <ForecastErrorChart data={charts.forecastError} />}
        {activeTab === 'rainfall' && <RainfallObsVsPredChart data={charts.rainfallObservedVsPredicted} />}
        {activeTab === 'temp' && (
          <TempWindErrorChart
            data={charts.tempError}
            metricName="2m Temperature"
            unit="°C"
            lineColor="#f59e0b"
          />
        )}
        {activeTab === 'wind' && (
          <TempWindErrorChart
            data={charts.windError}
            metricName="10m Surface Wind Speed"
            unit="m/s"
            lineColor="#06b6d4"
          />
        )}
        {activeTab === 'calibration' && <ConfidenceVsActualChart data={charts.confidenceVsActual} />}
        {activeTab === 'stations' && <StationObservationExplorer stations={stations} />}
      </div>

      {/* Chart explanation footer */}
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--card-border)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
        <span>Reference Baseline: IMD Doppler Weather Radar Network & In-Situ Rain Gauges</span>
        <span>Lead Time Verification: 72–120 Hours</span>
      </div>
    </div>
  );
};
