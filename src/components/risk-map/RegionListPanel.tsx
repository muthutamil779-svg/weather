import React from 'react';
import { RegionForecast, RiskTier } from '../../types/forecast';
import { getRiskBadgeClass, getRiskLabel, getRiskIcon } from '../../utils/riskUtils';
import { ShieldAlert, AlertTriangle, ShieldCheck, Filter } from 'lucide-react';

interface RegionListPanelProps {
  regions: RegionForecast[];
  selectedRegionId: string | null;
  onSelectRegion: (id: string) => void;
  filterRisk: RiskTier | 'all';
  onFilterChange: (tier: RiskTier | 'all') => void;
}

export const RegionListPanel: React.FC<RegionListPanelProps> = ({
  regions,
  selectedRegionId,
  onSelectRegion,
  filterRisk,
  onFilterChange
}) => {
  const highRisk = regions.filter(r => r.riskTier === 'high');
  const mediumRisk = regions.filter(r => r.riskTier === 'medium');
  const lowRisk = regions.filter(r => r.riskTier === 'low');

  const renderRegionItem = (region: RegionForecast) => {
    const isSelected = selectedRegionId === region.id;
    return (
      <div
        key={region.id}
        role="button"
        tabIndex={0}
        aria-selected={isSelected}
        aria-label={`${region.name}, ${getRiskLabel(region.riskTier)}, Confidence: ${region.confidence}%, Bust Risk: ${region.bustProbability}%`}
        onClick={() => onSelectRegion(region.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelectRegion(region.id);
          }
        }}
        className="fg-card"
        style={{
          padding: '10px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          background: isSelected ? 'rgba(59, 156, 255, 0.12)' : 'rgba(255, 255, 255, 0.02)',
          border: isSelected ? '1px solid var(--accent-blue)' : '1px solid var(--card-border)',
          borderRadius: 'var(--radius-sm)',
          transition: 'all var(--transition-fast)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
              {region.name}
            </span>
            {region.riskTier === 'high' && (
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--risk-high)', display: 'inline-block' }} />
            )}
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            {region.weatherSystem ? `${region.weatherSystem}` : 'Stable regime'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ textAlign: 'right' }}>
            <div className="mono-text" style={{ fontSize: '12px', fontWeight: '600', color: region.confidence >= 70 ? 'var(--risk-low)' : 'var(--risk-medium)' }}>
              {region.confidence}% <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>CONF</span>
            </div>
            <div className="mono-text" style={{ fontSize: '11px', color: region.bustProbability >= 35 ? 'var(--risk-high)' : 'var(--text-secondary)' }}>
              {region.bustProbability}% <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>BUST</span>
            </div>
          </div>

          <span className={getRiskBadgeClass(region.riskTier)} style={{ fontSize: '10px', padding: '2px 6px' }}>
            {getRiskIcon(region.riskTier)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="fg-panel regions-panel-container" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Header & Filter Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span className="subtle-title">Vulnerability Registry</span>
          <h2 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Regional Forecast Failure Risk
          </h2>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.03)', padding: '2px', borderRadius: 'var(--radius-sm)' }}>
          <button
            onClick={() => onFilterChange('all')}
            className={`fg-tab-btn ${filterRisk === 'all' ? 'active' : ''}`}
            style={{ padding: '3px 8px', fontSize: '11px' }}
          >
            All ({regions.length})
          </button>
          <button
            onClick={() => onFilterChange('high')}
            className={`fg-tab-btn ${filterRisk === 'high' ? 'active' : ''}`}
            style={{ padding: '3px 8px', fontSize: '11px', color: filterRisk === 'high' ? 'var(--risk-high)' : undefined }}
          >
            High ({highRisk.length})
          </button>
          <button
            onClick={() => onFilterChange('medium')}
            className={`fg-tab-btn ${filterRisk === 'medium' ? 'active' : ''}`}
            style={{ padding: '3px 8px', fontSize: '11px', color: filterRisk === 'medium' ? 'var(--risk-medium)' : undefined }}
          >
            Med ({mediumRisk.length})
          </button>
          <button
            onClick={() => onFilterChange('low')}
            className={`fg-tab-btn ${filterRisk === 'low' ? 'active' : ''}`}
            style={{ padding: '3px 8px', fontSize: '11px', color: filterRisk === 'low' ? 'var(--risk-low)' : undefined }}
          >
            Low ({lowRisk.length})
          </button>
        </div>
      </div>

      {/* Categorized List with Scroll */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          overflowY: 'auto',
          maxHeight: '430px',
          paddingRight: '4px'
        }}
      >
        {/* High Risk Category */}
        {(filterRisk === 'all' || filterRisk === 'high') && highRisk.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: 'var(--risk-high)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <ShieldAlert size={13} />
              <span>High Bust Vulnerability ({highRisk.length})</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {highRisk.map(renderRegionItem)}
            </div>
          </div>
        )}

        {/* Medium Risk Category */}
        {(filterRisk === 'all' || filterRisk === 'medium') && mediumRisk.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: 'var(--risk-medium)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <AlertTriangle size={13} />
              <span>Medium Vulnerability ({mediumRisk.length})</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {mediumRisk.map(renderRegionItem)}
            </div>
          </div>
        )}

        {/* Low Risk Category */}
        {(filterRisk === 'all' || filterRisk === 'low') && lowRisk.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: 'var(--risk-low)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <ShieldCheck size={13} />
              <span>High Stability / Low Risk ({lowRisk.length})</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {lowRisk.map(renderRegionItem)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
