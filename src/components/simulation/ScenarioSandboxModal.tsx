import React from 'react';
import { X, Play, RefreshCw, AlertTriangle, CloudRain, Sun, Wind, CheckCircle2 } from 'lucide-react';

export type SynopticScenarioId = 'cyclogenesis' | 'monsoon_break' | 'western_disturbance' | 'baseline';

interface ScenarioSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeScenario: SynopticScenarioId;
  onApplyScenario: (scenario: SynopticScenarioId) => void;
}

export const SCENARIOS: Array<{
  id: SynopticScenarioId;
  name: string;
  tagline: string;
  icon: React.ReactNode;
  riskShift: string;
  affectedRegions: string[];
  description: string;
}> = [
  {
    id: 'cyclogenesis',
    name: 'Rapid Cyclogenesis Surge (BOB-02)',
    tagline: 'Bay of Bengal Deep Depression intensifying into Severe Cyclonic Storm',
    icon: <Wind size={18} style={{ color: '#f43f5e' }} />,
    riskShift: 'Odisha & Madhya Pradesh escalated to HIGH (Bust Risk: 88%)',
    affectedRegions: ['Odisha', 'Madhya Pradesh', 'Chhattisgarh', 'Andhra Pradesh'],
    description: 'Central pressure plunges to 988 hPa. Extreme 140km multi-model track disparity between ECMWF and GFS triggers acute quantitative precipitation forecast bust risk.'
  },
  {
    id: 'monsoon_break',
    name: 'Monsoon Break & Convective Drought',
    tagline: 'Monsoon trough shifts northward to Himalayan foothills',
    icon: <Sun size={18} style={{ color: '#eab308' }} />,
    riskShift: 'Central & Peninsular India rainfall abruptly drops to 0mm',
    affectedRegions: ['Maharashtra', 'Madhya Pradesh', 'Karnataka', 'Telangana'],
    description: 'Convective parameterization failure in deterministic NWP suites creates false positive rain predictions while agricultural catchments experience sudden moisture drought.'
  },
  {
    id: 'western_disturbance',
    name: 'Western Disturbance Himalayan Surge',
    tagline: 'Mid-tropospheric trough interacting with sub-tropical westerly jet',
    icon: <CloudRain size={18} style={{ color: '#06b6d4' }} />,
    riskShift: 'Himachal Pradesh & Uttarakhand escalated to HIGH (Bust Risk: 76%)',
    affectedRegions: ['Himachal Pradesh', 'Uttarakhand', 'Jammu & Kashmir'],
    description: 'Freezing level elevation swings by 800m across ensemble members, causing heavy localized cloudbursts and freezing rain variance.'
  },
  {
    id: 'baseline',
    name: 'Operational Baseline 06Z Cycle',
    tagline: 'Standard assimilated multi-model operational run',
    icon: <CheckCircle2 size={18} style={{ color: '#22c55e' }} />,
    riskShift: 'Calibrated operational baseline (Confidence: 78%)',
    affectedRegions: ['All 36 Subdivisions Balanced'],
    description: 'Real-time assimilated 06Z cycle blending ECMWF EPS, GFS GEFS, and IMD ground-truth observation telemetry.'
  }
];

export const ScenarioSandboxModal: React.FC<ScenarioSandboxModalProps> = ({
  isOpen,
  onClose,
  activeScenario,
  onApplyScenario
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        className="fg-panel"
        style={{
          width: '100%',
          maxWidth: '750px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '24px',
          background: '#12161f',
          border: '1px solid rgba(59, 156, 255, 0.4)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span 
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'rgba(59, 156, 255, 0.15)',
                  color: 'var(--accent-blue)',
                  border: '1px solid rgba(59, 156, 255, 0.3)'
                }}
              >
                70% Milestone: Synoptic Scenario Injection Sandbox
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Forecaster Stress-Test Engine
              </span>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Meteorological Stress Test & Scenario Simulator
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
              Inject severe atmospheric perturbations to test how ForecastGuard AI detects, flags, and alerts on rapid-onset forecast bust events.
            </p>
          </div>

          <button 
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '6px',
              color: 'var(--text-secondary)',
              background: 'rgba(255,255,255,0.05)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scenarios Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {SCENARIOS.map(sc => {
            const isActive = sc.id === activeScenario;
            return (
              <div 
                key={sc.id}
                className="fg-card"
                style={{
                  padding: '16px',
                  background: isActive ? 'rgba(59, 156, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  border: isActive ? '1px solid var(--accent-blue)' : '1px solid var(--card-border)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: '1', minWidth: '280px' }}>
                  <div 
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--card-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {sc.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {sc.name}
                      </span>
                      {isActive && (
                        <span style={{ fontSize: '9.5px', padding: '1px 6px', borderRadius: '3px', background: 'rgba(59,156,255,0.2)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                          ACTIVE RUN
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--accent-blue)', marginTop: '2px', fontWeight: 500 }}>
                      {sc.tagline}
                    </div>
                    <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: '6px 0 0', lineHeight: 1.4 }}>
                      {sc.description}
                    </p>
                    <div style={{ fontSize: '11px', color: 'var(--accent-cyan)', marginTop: '4px', fontWeight: 600 }}>
                      Impact: {sc.riskShift}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onApplyScenario(sc.id);
                    onClose();
                  }}
                  className="fg-tab-btn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: isActive ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.06)',
                    color: isActive ? '#fff' : 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '11.5px',
                    border: '1px solid var(--card-border)'
                  }}
                >
                  <Play size={13} />
                  <span>{isActive ? 'Re-Apply Scenario' : 'Inject Scenario'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
