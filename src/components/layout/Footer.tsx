import React from 'react';
import { AlertCircle, Activity, Globe, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-bar" role="contentinfo">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '750px' }}>
        <AlertCircle size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <span style={{ fontSize: '11px', lineHeight: '1.4' }}>
          <strong>Meteorological Notice:</strong> ForecastGuard AI is a research and decision-support visualization. Forecast outputs are not official weather warnings and should not replace guidance from authorized meteorological agencies (e.g. India Meteorological Department — IMD, WMO).
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11px', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Cpu size={12} style={{ color: 'var(--accent-blue)' }} />
          <span>ECMWF IFS / GFS / NCUM Ensemble Multi-Model</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Activity size={12} style={{ color: 'var(--risk-low)' }} />
          <span>Verification Latency: 42ms</span>
        </div>
      </div>
    </footer>
  );
};
