import React, { useState } from 'react';
import { StationObservation } from '../../types/forecast';
import { Database, CheckCircle, Search, Filter, Compass, Radio, ArrowRight } from 'lucide-react';

interface StationObservationExplorerProps {
  stations?: StationObservation[];
}

export const StationObservationExplorer: React.FC<StationObservationExplorerProps> = ({
  stations = []
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubdivision, setSelectedSubdivision] = useState<string>('all');

  const subdivisions = Array.from(new Set(stations.map(s => s.subdivision)));

  const filteredStations = stations.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.subdivision.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubdiv = selectedSubdivision === 'all' || s.subdivision === selectedSubdivision;
    return matchesSearch && matchesSubdiv;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header Panel */}
      <div 
        className="fg-panel"
        style={{
          padding: '20px',
          background: 'linear-gradient(135deg, rgba(26, 31, 43, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(34, 197, 94, 0.3)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span 
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'rgba(34, 197, 94, 0.15)',
                  color: 'var(--risk-low)',
                  border: '1px solid rgba(34, 197, 94, 0.3)'
                }}
              >
                70% Milestone: Station Ground Truth & Bias Correction
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                4,200 IMD Surface Network Real-Time Calibration
              </span>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Ground Truth Telemetry & Quantile Mapping (MOS) Verification Explorer
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
              Applies Model Output Statistics (MOS) and empirical quantile mapping to remove systematic orographic and convective model biases.
            </p>
          </div>

          {/* Quick Quantile Mapping Formula Pill */}
          <div 
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid var(--card-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}
          >
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Correction Transform</div>
            <div className="mono-text" style={{ fontSize: '11px', color: 'var(--accent-cyan)' }}>
              QPF_corr = F_obs⁻¹(F_model(QPF_raw))
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Search station or meteorological subdivision..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 12px 7px 32px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--card-border)',
                color: 'var(--text-primary)',
                fontSize: '12px'
              }}
            />
          </div>

          <select
            value={selectedSubdivision}
            onChange={e => setSelectedSubdivision(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--card-border)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Meteorological Subdivisions</option>
            {subdivisions.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stations Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
        {filteredStations.map(station => (
          <div 
            key={station.id}
            className="fg-card"
            style={{
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--card-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {station.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--accent-blue)', marginTop: '2px' }}>
                  {station.subdivision} • [{station.coordinates[0].toFixed(2)}°N, {station.coordinates[1].toFixed(2)}°E]
                </div>
              </div>
              <span 
                style={{
                  fontSize: '9.5px',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '3px',
                  background: 'rgba(34, 197, 94, 0.15)',
                  color: 'var(--risk-low)',
                  border: '1px solid rgba(34, 197, 94, 0.3)'
                }}
              >
                VERIFIED IMD
              </span>
            </div>

            {/* Telemetry Comparison Matrix */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '11px', marginTop: '4px' }}>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '8px', borderRadius: '4px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>IMD GROUND TRUTH</div>
                <div className="mono-text" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--risk-low)', marginTop: '2px' }}>
                  {station.observedRainfallMm} mm
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '8px', borderRadius: '4px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>RAW GFS / ECMWF</div>
                <div className="mono-text" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {station.rawGfsQpfMm} / {station.rawEcmwfQpfMm}
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '8px', borderRadius: '4px', border: '1px solid rgba(34,211,238,0.2)' }}>
                <div style={{ fontSize: '9px', color: 'var(--accent-cyan)' }}>BIAS-CORRECTED</div>
                <div className="mono-text" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-cyan)', marginTop: '2px' }}>
                  {station.correctedQpfMm} mm
                </div>
              </div>
            </div>

            {/* Bias Variance Delta */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', color: 'var(--text-muted)', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <span>Residual Bias Delta:</span>
              <span className="mono-text" style={{ fontWeight: 600, color: Math.abs(station.biasVarianceMm) < 3 ? 'var(--risk-low)' : 'var(--risk-medium)' }}>
                {station.biasVarianceMm > 0 ? `+${station.biasVarianceMm}` : station.biasVarianceMm} mm
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
