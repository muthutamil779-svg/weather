import React, { useEffect } from 'react';
import { RegionForecast } from '../../types/forecast';
import { getRiskBadgeClass, getRiskLabel, getRiskIcon, getRiskColor } from '../../utils/riskUtils';
import { formatCoordinates, formatErrorWithUnit } from '../../utils/forecastUtils';
import { X, AlertTriangle, ShieldCheck, Activity, CloudRain, MapPin } from 'lucide-react';

interface RegionInfoCardProps {
  region: RegionForecast;
  onClose: () => void;
}

export const RegionInfoCard: React.FC<RegionInfoCardProps> = ({ region, onClose }) => {
  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const riskColor = getRiskColor(region.riskTier);

  return (
    <div
      role="dialog"
      aria-labelledby="region-info-title"
      aria-modal="true"
      className="fg-floating-glass"
      style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        width: '320px',
        maxWidth: 'calc(100% - 32px)',
        padding: '16px 18px',
        borderLeft: `4px solid ${riskColor}`,
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} style={{ color: riskColor }} />
            <h3 id="region-info-title" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
              {region.name}
            </h3>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            Coordinates: {formatCoordinates(region.coordinates)}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close region diagnostic panel"
          style={{
            padding: '4px',
            borderRadius: '4px',
            color: 'var(--text-secondary)',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={15} />
        </button>
      </div>

      {/* Risk Badge & Forecast Horizon */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span className={getRiskBadgeClass(region.riskTier)}>
          <span>{getRiskIcon(region.riskTier)}</span>
          <span>{getRiskLabel(region.riskTier)}</span>
        </span>

        <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--accent-cyan)' }}>
          Forecast Lead: Day {region.forecastDay}
        </span>
      </div>

      {/* Metrics Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px',
          marginBottom: '12px'
        }}
      >
        <div>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Confidence</span>
          <div className="mono-text" style={{ fontSize: '16px', fontWeight: '700', color: region.confidence >= 70 ? 'var(--risk-low)' : 'var(--risk-medium)' }}>
            {region.confidence}%
          </div>
        </div>

        <div>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Bust Probability</span>
          <div className="mono-text" style={{ fontSize: '16px', fontWeight: '700', color: region.bustProbability >= 35 ? 'var(--risk-high)' : region.bustProbability >= 20 ? 'var(--risk-medium)' : 'var(--risk-low)' }}>
            {region.bustProbability}%
          </div>
        </div>

        <div style={{ gridColumn: 'span 2', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>14-Day Historical Error</span>
          <span className="mono-text" style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>
            {formatErrorWithUnit(region.historicalError.value, region.historicalError.unit)}
          </span>
        </div>
      </div>

      {/* Associated Weather System */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          background: 'rgba(59, 156, 255, 0.06)',
          border: '1px solid rgba(59, 156, 255, 0.15)',
          borderRadius: '4px',
          padding: '6px 10px'
        }}
      >
        <Activity size={14} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Synoptic Driver: </span>
          <strong style={{ color: 'var(--text-primary)' }}>
            {region.weatherSystem || 'No localized synoptic disturbance'}
          </strong>
        </div>
      </div>
    </div>
  );
};
