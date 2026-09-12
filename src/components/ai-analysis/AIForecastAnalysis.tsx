import React, { useState } from 'react';
import { AIInsight } from '../../types/forecast';
import { FactorBreakdown } from './FactorBreakdown';
import { AIExplanationCard } from './AIExplanationCard';
import { BrainCircuit, Sparkles, FileText, BarChart3 } from 'lucide-react';

interface AIForecastAnalysisProps {
  aiInsight: AIInsight;
  overallConfidence: number;
}

export const AIForecastAnalysis: React.FC<AIForecastAnalysisProps> = ({
  aiInsight,
  overallConfidence
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'narrative' | 'factors'>('narrative');

  return (
    <div className="fg-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header with Prominent AI Confidence Score */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: 'var(--accent-indigo)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <BrainCircuit size={18} />
          </div>
          <div>
            <span className="subtle-title">Neural Bust Prediction Engine</span>
            <h2 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>
              AI Forecast Analysis
            </h2>
          </div>
        </div>

        {/* AI Confidence Gauge / Metric */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--card-border)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>AI Confidence</span>
            <span style={{ fontSize: '11px', color: 'var(--risk-low)', fontWeight: '500' }}>Moderate Spread</span>
          </div>
          <div className="metric-value-lg" style={{ fontSize: '24px', color: 'var(--accent-blue)' }}>
            {overallConfidence}%
          </div>
        </div>
      </div>

      {/* Sub-tab navigation */}
      <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--card-border)', paddingBottom: '8px' }}>
        <button
          onClick={() => setActiveSubTab('narrative')}
          className={`fg-tab-btn ${activeSubTab === 'narrative' ? 'active' : ''}`}
        >
          <FileText size={14} />
          <span>Diagnostic Narrative</span>
        </button>
        <button
          onClick={() => setActiveSubTab('factors')}
          className={`fg-tab-btn ${activeSubTab === 'factors' ? 'active' : ''}`}
        >
          <BarChart3 size={14} />
          <span>Attribution Weights ({aiInsight.factors.length})</span>
        </button>
      </div>

      {/* Tab Body */}
      {activeSubTab === 'narrative' ? (
        <AIExplanationCard aiInsight={aiInsight} />
      ) : (
        <FactorBreakdown factors={aiInsight.factors} />
      )}
    </div>
  );
};
