import React from 'react';
import { WeatherSystem } from '../../types/forecast';
import { INDIA_STATES } from '../../data/indiaGeo';
import { AlertCircle, Compass, Wind, CloudRain, Flame } from 'lucide-react';

interface FallbackEarth2DProps {
  weatherSystems: WeatherSystem[];
  onSelectSystem?: (id: string) => void;
}

export const FallbackEarth2D: React.FC<FallbackEarth2DProps> = ({
  weatherSystems,
  onSelectSystem
}) => {
  return (
    <div 
      className="fg-panel"
      style={{
        width: '100%',
        minHeight: '480px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'radial-gradient(ellipse at center, #141b27 0%, #0a0d13 100%)',
        position: 'relative'
      }}
    >
      {/* Notice Banner */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(59, 156, 255, 0.08)',
          border: '1px solid rgba(59, 156, 255, 0.2)',
          borderRadius: 'var(--radius-sm)',
          padding: '6px 12px',
          fontSize: '11px',
          color: 'var(--accent-cyan)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertCircle size={14} />
          <span>2D High-Performance Fallback Projection Active (South Asia & Indian Ocean Basin)</span>
        </div>
        <span style={{ color: 'var(--text-secondary)' }}>WebGL Accelerated Mode Bypassed</span>
      </div>

      {/* SVG Projection Display */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 700 500" style={{ width: '100%', maxHeight: '400px' }}>
          {/* Latitude Longitude Grid */}
          <g stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" strokeDasharray="3 3">
            <line x1="50" y1="100" x2="650" y2="100" />
            <line x1="50" y1="200" x2="650" y2="200" />
            <line x1="50" y1="300" x2="650" y2="300" />
            <line x1="50" y1="400" x2="650" y2="400" />
            <line x1="150" y1="30" x2="150" y2="470" />
            <line x1="300" y1="30" x2="300" y2="470" />
            <line x1="450" y1="30" x2="450" y2="470" />
            <line x1="600" y1="30" x2="600" y2="470" />
          </g>

          {/* Continental Outline / Geographic Context */}
          {/* Indian Subcontinent silhouette */}
          <path
            d="M 280 120 L 330 110 L 390 140 L 410 180 L 450 200 L 430 240 L 370 290 L 330 380 L 300 290 L 260 220 L 240 180 Z"
            fill="rgba(59, 156, 255, 0.12)"
            stroke="rgba(59, 156, 255, 0.4)"
            strokeWidth="1.5"
          />

          {/* Arabian Sea */}
          <text x="180" y="300" fill="#3b9cff" opacity="0.4" fontSize="12" fontWeight="600">ARABIAN SEA</text>
          {/* Bay of Bengal */}
          <text x="440" y="300" fill="#3b9cff" opacity="0.4" fontSize="12" fontWeight="600">BAY OF BENGAL</text>
          {/* Indian Ocean */}
          <text x="310" y="440" fill="#3b9cff" opacity="0.4" fontSize="12" fontWeight="600">INDIAN OCEAN</text>
          {/* India Label */}
          <text x="330" y="220" fill="#e6e9ef" fontSize="13" fontWeight="700" textAnchor="middle">INDIA</text>

          {/* Render Active Synoptic Weather Systems */}
          {weatherSystems.map((sys, idx) => {
            // Rough 2D coordinate mapping
            const x = 160 + (sys.coordinates[1] - 65) * 14;
            const y = 460 - (sys.coordinates[0] - 5) * 13;

            return (
              <g 
                key={sys.id} 
                transform={`translate(${x}, ${y})`}
                onClick={() => onSelectSystem && onSelectSystem(sys.id)}
                style={{ cursor: 'pointer' }}
              >
                <circle r="14" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="3 2" className="ambient-pulse" />
                <circle r="4" fill="#3b9cff" />
                <text x="12" y="3" fill="#e6e9ef" fontSize="9" fontWeight="600">
                  {sys.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Systems Status Summary Bar */}
      <div 
        style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingTop: '8px',
          borderTop: '1px solid var(--card-border)'
        }}
      >
        {weatherSystems.map((sys) => (
          <div
            key={sys.id}
            style={{
              padding: '6px 10px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              minWidth: 'max-content'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: sys.status === 'intensifying' ? 'var(--risk-high)' : 'var(--accent-blue)' }} />
            <strong style={{ color: 'var(--text-primary)' }}>{sys.name}</strong>
            <span style={{ color: 'var(--text-secondary)' }}>({sys.movement})</span>
          </div>
        ))}
      </div>
    </div>
  );
};
