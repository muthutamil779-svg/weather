import React from 'react';
import { Wind, HelpCircle, History, AlertTriangle, MapPin, BrainCircuit, ArrowRight } from 'lucide-react';
import { AIInsight } from '../../types/forecast';

interface BustRiskOverviewProps {
  aiInsight: AIInsight;
}

export const BustRiskOverview: React.FC<BustRiskOverviewProps> = ({ aiInsight }) => {
  const pipelineSteps = [
    {
      title: 'Atmospheric Conditions',
      desc: 'Bay of Bengal Depression + Arabian Sea Low-Level Jet',
      icon: <Wind size={16} />,
      color: 'var(--accent-cyan)'
    },
    {
      title: 'Forecast Uncertainty',
      desc: 'Ensemble QPF spread > 65mm between ECMWF & GFS',
      icon: <HelpCircle size={16} />,
      color: 'var(--accent-blue)'
    },
    {
      title: 'Historical Error',
      desc: 'Consistent 14-day rainfall underprediction in central river basins',
      icon: <History size={16} />,
      color: 'var(--weather-monsoon)'
    },
    {
      title: 'Bust Probability',
      desc: '38% probability of severe forecast divergence',
      icon: <AlertTriangle size={16} />,
      color: 'var(--risk-high)'
    },
    {
      title: 'Regional Risk',
      desc: aiInsight.recommendedRegion,
      icon: <MapPin size={16} />,
      color: 'var(--risk-high)'
    },
    {
      title: 'AI Explanation',
      desc: 'Non-linear mesoscale convection trigger',
      icon: <BrainCircuit size={16} />,
      color: 'var(--accent-indigo)'
    }
  ];

  return (
    <div 
      className="fg-panel"
      style={{
        padding: '16px 20px',
        borderLeft: '4px solid var(--accent-blue)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span className="subtle-title" style={{ color: 'var(--accent-blue)' }}>Meteorological Causal Chain</span>
          <h2 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '2px' }}>
            Forecast Failure Mechanism Diagnostic
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Highest Vulnerability:</span>
          <span className="risk-badge high">
            <MapPin size={11} />
            {aiInsight.recommendedRegion}
          </span>
        </div>
      </div>

      {/* Sequential Flow */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '10px',
          alignItems: 'stretch'
        }}
      >
        {pipelineSteps.map((step, idx) => (
          <div
            key={step.title}
            style={{
              background: 'rgba(255, 255, 255, 0.025)',
              border: '1px solid var(--card-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: step.color }}>
                {step.icon}
                <span style={{ fontSize: '11px', fontWeight: '600' }}>{step.title}</span>
              </div>
              <span className="mono-text" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>0{idx + 1}</span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.3' }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
