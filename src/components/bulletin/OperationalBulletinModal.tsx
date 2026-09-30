import React, { useState } from 'react';
import { OperationalBulletin } from '../../types/forecast';
import { ShieldAlert, FileText, Copy, Check, Printer, AlertTriangle, X, Download } from 'lucide-react';

interface OperationalBulletinModalProps {
  bulletins?: OperationalBulletin[];
  isOpen: boolean;
  onClose: () => void;
}

export const OperationalBulletinModal: React.FC<OperationalBulletinModalProps> = ({
  bulletins = [],
  isOpen,
  onClose
}) => {
  const [selectedBulletinId, setSelectedBulletinId] = useState<string>(bulletins[0]?.id || '');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const activeBulletin = bulletins.find(b => b.id === selectedBulletinId) || bulletins[0];

  const handleCopyMarkdown = () => {
    if (!activeBulletin) return;
    const text = `
# ${activeBulletin.bulletinNumber}
**ISSUED BY:** FORECASTGUARD AI / STATE DISASTER MANAGEMENT ADVISORY
**ISSUE TIME:** ${new Date(activeBulletin.issueTime).toUTCString()}
**VALIDITY:** ${new Date(activeBulletin.validUntil).toUTCString()}
**SEVERITY:** ${activeBulletin.severity.toUpperCase()} ALERT

### 1. SYNOPTIC SITUATION & BUST VULNERABILITY
${activeBulletin.synopticSituation}

### 2. AFFECTED SUBDIVISIONS & REGIONS
${activeBulletin.affectedRegions.join(', ')}

### 3. NDRF & SDRF PRE-POSITIONING DIRECTIVE
${activeBulletin.ndrfDeploymentNotice}

### 4. DISTRICT SPECIFIC ACTION PROTOCOLS
${activeBulletin.districtAdvisories.map(d => `- **${d.district}** [${d.warningLevel}]: ${d.actionProtocol}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          maxWidth: '820px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '24px',
          background: '#12161f',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
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
                  background: 'rgba(239, 68, 68, 0.15)',
                  color: 'var(--risk-high)',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}
              >
                70% Milestone: Official Early Warning Generator
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                IMD & SDMA Protocol Integration
              </span>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Operational Meteorological Early Warning & Disaster Action Bulletin
            </h2>
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

        {/* Bulletin Switcher Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {bulletins.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBulletinId(b.id)}
              className={`fg-tab-btn ${selectedBulletinId === b.id ? 'active' : ''}`}
              style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 600 }}
            >
              {b.bulletinNumber}
            </button>
          ))}
        </div>

        {activeBulletin && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Bulletin Metadata Bar */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '10px',
                padding: '12px',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--card-border)',
                fontSize: '11px'
              }}
            >
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>ISSUED AT</div>
                <div className="mono-text" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  {new Date(activeBulletin.issueTime).toUTCString()}
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>VALID UNTIL</div>
                <div className="mono-text" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  {new Date(activeBulletin.validUntil).toUTCString()}
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>ALERT LEVEL</div>
                <div style={{ color: activeBulletin.alertColor, fontWeight: 700, textTransform: 'uppercase' }}>
                  {activeBulletin.severity} Priority Alert
                </div>
              </div>
            </div>

            {/* Synoptic Situation */}
            <div className="fg-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ fontSize: '11px', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                1. Synoptic Situation & Model Divergence Context
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
                {activeBulletin.synopticSituation}
              </p>
            </div>

            {/* NDRF Pre-Positioning Directive */}
            <div 
              style={{
                padding: '14px',
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start'
              }}
            >
              <AlertTriangle size={18} style={{ color: 'var(--risk-high)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '11px', color: 'var(--risk-high)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                  2. NDRF / SDRF Tactical Pre-Positioning Directive
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
                  {activeBulletin.ndrfDeploymentNotice}
                </p>
              </div>
            </div>

            {/* District-Specific Operational Action Protocols */}
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                3. District-Specific Disaster Response Protocols
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activeBulletin.districtAdvisories.map((d, idx) => (
                  <div 
                    key={idx}
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '6px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {d.district}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {d.actionProtocol}
                      </div>
                    </div>
                    <span 
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: d.warningLevel.includes('Red') ? 'rgba(239,68,68,0.2)' : 'rgba(234,179,8,0.2)',
                        color: d.warningLevel.includes('Red') ? 'var(--risk-high)' : 'var(--risk-medium)',
                        border: d.warningLevel.includes('Red') ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(234,179,8,0.4)'
                      }}
                    >
                      {d.warningLevel}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <button
                onClick={handleCopyMarkdown}
                className="fg-tab-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '11.5px',
                  background: 'rgba(59, 156, 255, 0.1)',
                  border: '1px solid rgba(59, 156, 255, 0.3)',
                  color: 'var(--accent-blue)',
                  fontWeight: 600
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Official Bulletin'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="fg-tab-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '11.5px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--card-border)',
                  color: 'var(--text-primary)',
                  fontWeight: 600
                }}
              >
                <Printer size={14} />
                <span>Print Advisory</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
