import React from 'react';
import { AIInsight } from '../../types/forecast';
import { getRiskBadgeClass, getRiskLabel, getRiskIcon } from '../../utils/riskUtils';
import { BrainCircuit, AlertTriangle, MapPin, Compass, CheckCircle2 } from 'lucide-react';

interface AIExplanationCardProps {
  aiInsight: AIInsight;
}

export const AIExplanationCard: React.FC<AIExplanationCardProps> = ({ aiInsight }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Key Summary Quote */}
      <blockquote 
        style={{
          margin: 0,
          padding: '12px 16px',
          background: 'rgba(59, 156, 255, 0.08)',
          borderLeft: '4px solid var(--accent-blue)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
          fontWeight: '500',
          color: 'var(--text-primary)',
          lineHeight: '1.5'
        }}
      >
        “{aiInsight.summary}”
      </blockquote>

      {/* Structured Key Indicators */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--card-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px'
        }}
      >
        <div>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Consensus Risk Level</span>
          <div style={{ marginTop: '4px' }}>
            <span className={getRiskBadgeClass(aiInsight.riskLevel)}>
              {getRiskIcon(aiInsight.riskLevel)} {getRiskLabel(aiInsight.riskLevel)}
            </span>
          </div>
        </div>

        <div>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Recommended Focus</span>
          <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: '600', color: 'var(--accent-cyan)' }}>
            <MapPin size={13} />
            <span>{aiInsight.recommendedRegion}</span>
          </div>
        </div>
      </div>

      {/* Detailed Scientific Narrative */}
      <div>
        <h4 style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>
          Physical Mechanism of Failure
        </h4>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          {aiInsight.explanation}
        </p>
      </div>

      {/* Main Contributing Drivers Checklist */}
      <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '10px' }}>
        <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-secondary)' }}>
          Primary Drivers of Model Decay:
        </span>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {aiInsight.factors.slice(0, 4).map(f => (
            <li key={f.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-primary)' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
              <span><strong>{f.name}:</strong> {f.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
