import React, { useState } from 'react';
import { PIPELINE_AUDIT_DATA } from '../../data/pipelineAuditData';
import { MilestoneEvidencePanel } from './MilestoneEvidencePanel';
import { DesignThinkingPanel } from './DesignThinkingPanel';
import { AIPromptAuditPanel } from './AIPromptAuditPanel';
import { DataPipelineArchitecturePanel } from './DataPipelineArchitecturePanel';
import { Award, HeartHandshake, BrainCircuit, Database, CheckCircle2 } from 'lucide-react';

export type AuditSubTab = 'milestone' | 'design-thinking' | 'prompt-audit' | 'data-pipeline';

export const PipelineAuditView: React.FC = () => {
  const [subTab, setSubTab] = useState<AuditSubTab>('milestone');
  const auditData = PIPELINE_AUDIT_DATA;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Level Sub-Navigation for Audit Hub */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--card-border)',
          borderRadius: 'var(--radius-md)',
          padding: '8px 12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span 
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '4px',
              background: 'rgba(59, 156, 255, 0.15)',
              color: 'var(--accent-blue)',
              fontWeight: 700,
              letterSpacing: '0.5px'
            }}
          >
            PROJECT BETTER TOMORROW
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Compliance & Architecture Verification Hub
          </span>
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSubTab('milestone')}
            className={`fg-tab-btn ${subTab === 'milestone' ? 'active' : ''}`}
            style={{ padding: '6px 12px', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Award size={14} />
            <span>35% Milestone Evidence</span>
          </button>

          <button
            onClick={() => setSubTab('design-thinking')}
            className={`fg-tab-btn ${subTab === 'design-thinking' ? 'active' : ''}`}
            style={{ padding: '6px 12px', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <HeartHandshake size={14} />
            <span>Design Thinking Stakeholders</span>
          </button>

          <button
            onClick={() => setSubTab('prompt-audit')}
            className={`fg-tab-btn ${subTab === 'prompt-audit' ? 'active' : ''}`}
            style={{ padding: '6px 12px', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <BrainCircuit size={14} />
            <span>AI Prompt Audit</span>
          </button>

          <button
            onClick={() => setSubTab('data-pipeline')}
            className={`fg-tab-btn ${subTab === 'data-pipeline' ? 'active' : ''}`}
            style={{ padding: '6px 12px', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Database size={14} />
            <span>Data Pipeline & Caching</span>
          </button>
        </div>
      </div>

      {/* Render active sub-tab view */}
      {subTab === 'milestone' && (
        <MilestoneEvidencePanel
          tasks={auditData.milestoneProgress.tasks}
          achievedPercentage={auditData.milestoneProgress.achievedPercentage}
          currentMilestone={auditData.milestoneProgress.currentMilestone}
          verificationDate={auditData.milestoneProgress.verificationDate}
          repositoryUrl={auditData.milestoneProgress.repositoryUrl}
        />
      )}

      {subTab === 'design-thinking' && (
        <DesignThinkingPanel personas={auditData.stakeholderPersonas} />
      )}

      {subTab === 'prompt-audit' && (
        <AIPromptAuditPanel auditRecords={auditData.aiPromptAuditRecords} />
      )}

      {subTab === 'data-pipeline' && (
        <DataPipelineArchitecturePanel
          stages={auditData.pipelineStages}
          ensembleMetrics={auditData.ensembleMetrics}
        />
      )}
    </div>
  );
};
