import React, { useState } from 'react';
import { Settings as SettingsIcon, Sliders, Globe, Cpu, RefreshCw, CheckCircle2 } from 'lucide-react';

interface SettingsModalProps {
  use3DGlobe: boolean;
  onToggle3DGlobe: (val: boolean) => void;
  onTriggerAssimilation: () => void;
  isRefreshing: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  use3DGlobe,
  onToggle3DGlobe,
  onTriggerAssimilation,
  isRefreshing
}) => {
  const [activeModel, setActiveModel] = useState<'ECMWF' | 'GFS' | 'NCUM' | 'ENSEMBLE'>('ENSEMBLE');
  const [bustThreshold, setBustThreshold] = useState<number>(35);

  return (
    <div className="fg-panel" style={{ padding: '24px', maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--card-border)', paddingBottom: '12px' }}>
        <div 
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            background: 'rgba(59, 156, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-blue)'
          }}
        >
          <SettingsIcon size={18} />
        </div>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
            System Configuration & Model Parameters
          </h2>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            Configure assimilation parameters, rendering mode, and verification thresholds
          </p>
        </div>
      </div>

      {/* Geospatial Visualization Mode */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span className="subtle-title">Geospatial Engine</span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--card-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe size={18} style={{ color: 'var(--accent-cyan)' }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>Interactive 3D Weather Globe</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Renders Three.js orbital globe (automatic 2D fallback on low-end hardware)</div>
            </div>
          </div>
          <button
            onClick={() => onToggle3DGlobe(!use3DGlobe)}
            className={`fg-tab-btn ${use3DGlobe ? 'active' : ''}`}
            style={{ padding: '6px 14px' }}
          >
            {use3DGlobe ? '3D Active' : '2D Map Active'}
          </button>
        </div>
      </div>

      {/* Ensemble Model Selection */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span className="subtle-title">Active NWP Deterministic & Ensemble Member Suite</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
          {(['ENSEMBLE', 'ECMWF', 'GFS', 'NCUM'] as const).map((model) => (
            <button
              key={model}
              onClick={() => setActiveModel(model)}
              className="fg-card"
              style={{
                padding: '12px',
                textAlign: 'left',
                border: activeModel === model ? '1px solid var(--accent-blue)' : '1px solid var(--card-border)',
                background: activeModel === model ? 'rgba(59, 156, 255, 0.1)' : 'rgba(255,255,255,0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)' }}>{model}</span>
                {activeModel === model && <CheckCircle2 size={13} style={{ color: 'var(--accent-blue)' }} />}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {model === 'ENSEMBLE' ? 'Super-Ensemble 51-Member' : model === 'ECMWF' ? 'IFS High-Res 9km' : model === 'GFS' ? 'NCEP GFS 13km' : 'NCMRWF Unified Model'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bust Alert Sensitivity Slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="subtle-title">Severe Bust Alert Threshold</span>
          <span className="mono-text" style={{ fontSize: '12px', color: 'var(--risk-high)', fontWeight: '700' }}>
            &ge; {bustThreshold}% Probability
          </span>
        </div>
        <input
          type="range"
          min="15"
          max="50"
          value={bustThreshold}
          onChange={(e) => setBustThreshold(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent-blue)', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
          <span>15% (Ultra-Conservative)</span>
          <span>35% (Operational Standard)</span>
          <span>50% (Extreme Outlier)</span>
        </div>
      </div>

      {/* Manual Assimilation Trigger */}
      <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>Trigger Immediate Cycle Assimilation</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Assimilates latest satellite radiance & AWS telemetry</div>
        </div>
        <button
          onClick={onTriggerAssimilation}
          disabled={isRefreshing}
          className="fg-tab-btn active"
          style={{ padding: '8px 16px', background: 'var(--accent-blue)', color: '#ffffff', gap: '8px' }}
        >
          <RefreshCw size={14} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
          <span>{isRefreshing ? 'Assimilating 06Z Cycle...' : 'Run Assimilation'}</span>
        </button>
      </div>
    </div>
  );
};
