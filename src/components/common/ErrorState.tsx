import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Unable to load forecast data. Please try again.',
  onRetry
}) => {
  return (
    <div
      className="fg-panel"
      role="alert"
      style={{
        margin: '40px auto',
        maxWidth: '500px',
        padding: '32px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        background: 'rgba(239, 68, 68, 0.05)'
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--risk-high)'
        }}
      >
        <AlertTriangle size={24} />
      </div>

      <div>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
          Data Assimilation Pipeline Error
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '380px' }}>
          {message}
        </p>
      </div>

      <button
        onClick={onRetry}
        className="fg-tab-btn active"
        style={{
          padding: '8px 18px',
          fontSize: '13px',
          background: 'var(--accent-blue)',
          color: '#ffffff',
          borderRadius: 'var(--radius-sm)'
        }}
      >
        <RefreshCw size={14} />
        <span>Retry Telemetry Ingestion</span>
      </button>
    </div>
  );
};
