import React, { useState } from 'react';
import { StakeholderPersona } from '../../types/pipeline';
import { Users, MessageSquareQuote, CheckCircle, ArrowRight, Lightbulb, Compass, HeartHandshake, ShieldAlert, CloudLightning, Droplets } from 'lucide-react';

interface DesignThinkingPanelProps {
  personas: StakeholderPersona[];
}

export const DesignThinkingPanel: React.FC<DesignThinkingPanelProps> = ({ personas }) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(personas[0]?.id || 'stakeholder-imd');
  const activePersona = personas.find(p => p.id === selectedPersonaId) || personas[0];

  const getPersonaIcon = (iconName: string) => {
    switch (iconName) {
      case 'CloudLightning':
        return <CloudLightning size={20} />;
      case 'ShieldAlert':
        return <ShieldAlert size={20} />;
      case 'Droplets':
        return <Droplets size={20} />;
      default:
        return <Users size={20} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Design Thinking Intro & Stage Tracker */}
      <div 
        className="fg-panel"
        style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(26, 31, 43, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid rgba(234, 179, 8, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div 
            style={{
              padding: '6px',
              borderRadius: '8px',
              background: 'rgba(234, 179, 8, 0.15)',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              color: 'var(--risk-medium)'
            }}
          >
            <HeartHandshake size={20} />
          </div>
          <span 
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              fontWeight: 700,
              letterSpacing: '0.8px',
              color: 'var(--risk-medium)',
              background: 'var(--risk-medium-bg)',
              padding: '2px 8px',
              borderRadius: '12px',
              border: '1px solid var(--risk-medium-border)'
            }}
          >
            Project Better Tomorrow — Design Thinking Pathway
          </span>
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0 8px' }}>
          Operational Stakeholder Feedback & Human-Centered Meteorological Alignment
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', maxWidth: '850px', lineHeight: 1.6 }}>
          Rather than building an abstract ML model in isolation, ForecastGuard AI originated from in-depth field interviews with frontline operational meteorologists (IMD), disaster response commanders (SDMA), and agricultural extension specialists.
        </p>

        {/* 5 Stages of Design Thinking */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
            <div style={{ fontSize: '10px', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>1. EMPATHIZE</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>Frontline Field Interviews</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Identified forecast bust pain points in cyclogenesis & break-monsoon.</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
            <div style={{ fontSize: '10px', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase' }}>2. DEFINE</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>How-Might-We Problem</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Uncover multi-model divergence before catastrophic field failure occurs.</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
            <div style={{ fontSize: '10px', color: 'var(--weather-depression)', fontWeight: 700, textTransform: 'uppercase' }}>3. IDEATE</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>Dual-Engine Synoptic HUD</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Separating 3D synoptic globe from high-contrast 2D fallback map.</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
            <div style={{ fontSize: '10px', color: 'var(--risk-low)', fontWeight: 700, textTransform: 'uppercase' }}>4. PROTOTYPE</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>Interactive 10-Day Strip</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Multi-tier risk badges with non-color geometric identifiers (WCAG AA).</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
            <div style={{ fontSize: '10px', color: 'var(--risk-medium)', fontWeight: 700, textTransform: 'uppercase' }}>5. TEST & ITERATE</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>Operational Validation</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Incorporated feedback from IMD, SDMA, and agricultural hydrologists.</div>
          </div>
        </div>
      </div>

      {/* Stakeholder Selector and Details */}
      <div className="fg-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>
          Operational Stakeholder Personas & Verbatim Feedback
        </h3>

        {/* Persona Selectors */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {personas.map(persona => {
            const isSelected = persona.id === selectedPersonaId;
            return (
              <button
                key={persona.id}
                onClick={() => setSelectedPersonaId(persona.id)}
                className={`fg-tab-btn ${isSelected ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: isSelected ? '1px solid var(--accent-blue)' : '1px solid var(--card-border)'
                }}
              >
                {getPersonaIcon(persona.avatarIcon)}
                <span>{persona.role}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Persona Deep-Dive Card */}
        <div 
          className="fg-card"
          style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--card-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {activePersona.role}
                </span>
                <span 
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    background: 'rgba(59, 156, 255, 0.1)',
                    color: 'var(--accent-cyan)',
                    borderRadius: '4px',
                    border: '1px solid rgba(59, 156, 255, 0.25)'
                  }}
                >
                  {activePersona.location}
                </span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--accent-blue)', fontWeight: 500, marginTop: '2px' }}>
                {activePersona.organization}
              </div>
            </div>
          </div>

          {/* Verbatim Stakeholder Quote Banner */}
          <div 
            style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(59, 156, 255, 0.05)',
              borderLeft: '4px solid var(--accent-blue)',
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start'
            }}
          >
            <MessageSquareQuote size={24} style={{ color: 'var(--accent-blue)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ fontStyle: 'italic', fontSize: '13.5px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                {activePersona.directQuote}
              </p>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                — Stakeholder Validation Interview, Operational Cycle 2026
              </div>
            </div>
          </div>

          {/* 3-Column Empathy & Feature Analysis */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '6px' }}>
            {/* Column 1: Operational Pain Point */}
            <div 
              style={{
                background: 'rgba(239, 68, 68, 0.04)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--risk-high)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                <ShieldAlert size={14} />
                <span>Primary Operational Pain Point</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '6px' }}>
                {activePersona.primaryPainPoint}
              </p>
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {activePersona.operationalChallenge}
              </p>
            </div>

            {/* Column 2: Implemented Solution */}
            <div 
              style={{
                background: 'rgba(59, 156, 255, 0.04)',
                border: '1px solid rgba(59, 156, 255, 0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-blue)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                <Lightbulb size={14} />
                <span>Feature Implemented in Response</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.5 }}>
                {activePersona.implementedFeature}
              </p>
            </div>

            {/* Column 3: Measured Operational Impact */}
            <div 
              style={{
                background: 'rgba(34, 197, 94, 0.04)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--risk-low)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                <CheckCircle size={14} />
                <span>Operational Impact & Value</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.5 }}>
                {activePersona.operationalImpact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
