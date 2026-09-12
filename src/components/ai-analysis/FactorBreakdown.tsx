import React from 'react';
import { AIFactor } from '../../types/forecast';
import { BarChart2, Info } from 'lucide-react';

interface FactorBreakdownProps {
  factors: AIFactor[];
}

export const FactorBreakdown: React.FC<FactorBreakdownProps> = ({ factors }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="subtle-title">Uncertainty Attribution</span>
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Relative Weighting</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {factors.map((factor) => {
          // Visual weight percentage calculation (max factor is around 25%)
          const fillWidth = Math.min(100, Math.round((factor.weight / 25) * 100));

          return (
            <div
              key={factor.name}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              {/* Header and percentage */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {factor.name}
                </span>
                <span className="mono-text" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                  {factor.weight}%
                </span>
              </div>

              {/* Progress Bar */}
              <div 
                style={{ 
                  width: '100%', 
                  height: '5px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.06)', 
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden' 
                }}
              >
                <div 
                  style={{ 
                    width: `${fillWidth}%`, 
                    height: '100%', 
                    background: 'linear-gradient(90deg, #3b9cff 0%, #22d3ee 100%)',
                    borderRadius: 'var(--radius-full)'
                  }} 
                />
              </div>

              {/* Description */}
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                {factor.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
