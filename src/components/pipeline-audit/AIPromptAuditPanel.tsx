import React, { useState } from 'react';
import { AIPromptAuditRecord } from '../../types/pipeline';
import { BrainCircuit, ShieldCheck, Terminal, Sparkles, Sliders, Cpu, Lock } from 'lucide-react';

interface AIPromptAuditPanelProps {
  auditRecords: AIPromptAuditRecord[];
}

export const AIPromptAuditPanel: React.FC<AIPromptAuditPanelProps> = ({ auditRecords }) => {
  const [selectedRecordId, setSelectedRecordId] = useState<string>(auditRecords[0]?.scenarioId || 'audit-sc-01');
  const activeRecord = auditRecords.find(r => r.scenarioId === selectedRecordId) || auditRecords[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Audit Banner */}
      <div 
        className="fg-panel"
        style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(26, 31, 43, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div 
            style={{
              padding: '6px',
              borderRadius: '8px',
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: 'var(--weather-depression)'
            }}
          >
            <BrainCircuit size={20} />
          </div>
          <span 
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              fontWeight: 700,
              letterSpacing: '0.8px',
              color: 'var(--weather-depression)',
              background: 'rgba(139, 92, 246, 0.12)',
              padding: '2px 8px',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.3)'
            }}
          >
            Operational AI Interaction & Prompt Audit Protocol
          </span>
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0 8px' }}>
          Deterministic Meteorological Reasoning & Anti-Hallucination Guardrails
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', maxWidth: '850px', lineHeight: 1.6 }}>
          ForecastGuard AI mandates strict provenance for all AI-synthesized forecast bust explanations. LLMs are constrained via low-temperature sampling (0.15), domain-specific system prompts, and schema validation to prevent ungrounded rainfall exaggerations.
        </p>

        {/* Audit Metrics Badges */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
            <Lock size={14} style={{ color: 'var(--accent-blue)' }} />
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Sampling Temp:</span>
            <span className="mono-text" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>0.15 (Strict Factual)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
            <ShieldCheck size={14} style={{ color: 'var(--risk-low)' }} />
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Hallucination Risk:</span>
            <span className="mono-text" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--risk-low)' }}>&lt; 5% (Ground Truth Anchored)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
            <Cpu size={14} style={{ color: 'var(--accent-cyan)' }} />
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Inference Latency:</span>
            <span className="mono-text" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>~320ms P95</span>
          </div>
        </div>
      </div>

      {/* Audit Scenario Selector & Inspection Playground */}
      <div className="fg-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Audited Prompt & Ingestion Telemetry Records
          </h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            {auditRecords.map(rec => (
              <button
                key={rec.scenarioId}
                onClick={() => setSelectedRecordId(rec.scenarioId)}
                className={`fg-tab-btn ${selectedRecordId === rec.scenarioId ? 'active' : ''}`}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '11px',
                  fontWeight: 600
                }}
              >
                {rec.scenarioName}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Inspector Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
          {/* Left: Prompts & Ingestion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* System Prompt Box */}
            <div 
              className="fg-card"
              style={{
                padding: '16px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--weather-depression)', fontWeight: 600, textTransform: 'uppercase' }}>
                  <Terminal size={13} />
                  <span>Verified System Prompt (Guardrailed)</span>
                </div>
                <span className="mono-text" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  temp={activeRecord.temperature}
                </span>
              </div>
              <pre 
                style={{
                  margin: 0,
                  fontSize: '11.5px',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(0,0,0,0.2)',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.04)'
                }}
              >
                {activeRecord.systemPrompt}
              </pre>
            </div>

            {/* User Prompt Input */}
            <div 
              className="fg-card"
              style={{
                padding: '16px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--accent-blue)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
                <Sliders size={13} />
                <span>NWP Ensemble Parameter Feed (Input)</span>
              </div>
              <pre 
                style={{
                  margin: 0,
                  fontSize: '11.5px',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(0,0,0,0.2)',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.04)'
                }}
              >
                {activeRecord.userPromptInput}
              </pre>
            </div>
          </div>

          {/* Right: Structured Output & Verification Audit */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div 
              className="fg-card"
              style={{
                padding: '16px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--risk-low)', fontWeight: 600, textTransform: 'uppercase' }}>
                  <Sparkles size={13} />
                  <span>Validated Structured Diagnostic Output</span>
                </div>
                <span 
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: 'rgba(34, 197, 94, 0.15)',
                    color: 'var(--risk-low)',
                    border: '1px solid rgba(34, 197, 94, 0.3)'
                  }}
                >
                  AUDIT PASSED
                </span>
              </div>

              {/* Metric Highlights */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>CALIBRATED BUST RISK</div>
                  <div className="mono-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--risk-high)' }}>
                    {activeRecord.structuredOutput.bustRiskScore}%
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>ENSEMBLE SPREAD VARIANCE</div>
                  <div className="mono-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    ±{activeRecord.structuredOutput.ensembleDivergenceMm} mm
                  </div>
                </div>
              </div>

              {/* Meteorological Rationale */}
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  METEOROLOGICAL CAUSAL RATIONALE
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: 1.5, background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {activeRecord.structuredOutput.meteorologicalRationale}
                </p>
              </div>

              {/* Uncertainty Drivers */}
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  IDENTIFIED UNCERTAINTY DRIVERS
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '11.5px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {activeRecord.structuredOutput.uncertaintyDrivers.map((driver, idx) => (
                    <li key={idx}>{driver}</li>
                  ))}
                </ul>
              </div>

              {/* Guardrails Triggered */}
              <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '11px' }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Guardrails:</span>
                  {activeRecord.structuredOutput.guardrailFlagsTriggered.map((flag, idx) => (
                    <span key={idx} style={{ fontSize: '9px', padding: '1px 5px', borderRadius: '3px', background: 'rgba(234,179,8,0.15)', color: 'var(--risk-medium)', border: '1px solid rgba(234,179,8,0.3)' }}>
                      {flag}
                    </span>
                  ))}
                </div>
                <span className="mono-text" style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
                  {activeRecord.verifiedBy}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
