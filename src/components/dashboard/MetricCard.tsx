import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface MetricCardProps {
  id?: string;
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  description: string;
  trend?: {
    value: number;
    isPositiveGood?: boolean; // If true, up is green; if false (e.g. bust prob), down is green
  };
  progressValue?: number; // 0 - 100
  progressColor?: string;
  accentColor?: string;
  badge?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  id,
  icon,
  label,
  value,
  unit,
  description,
  trend,
  progressValue,
  progressColor = 'var(--accent-blue)',
  accentColor = 'var(--accent-blue)',
  badge,
  onClick
}) => {
  const isUp = trend && trend.value > 0;
  const isDown = trend && trend.value < 0;
  
  let trendClass = 'neutral';
  if (trend) {
    if (trend.isPositiveGood !== false) {
      trendClass = isUp ? 'up' : isDown ? 'down' : 'neutral';
    } else {
      trendClass = isDown ? 'up' : isUp ? 'down' : 'neutral';
    }
  }

  return (
    <div
      id={id}
      className={`fg-card ${onClick ? 'fg-card-interactive' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : 'region'}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`${label}: ${value} ${unit || ''}, ${description}`}
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {/* Top ambient color highlight line */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${accentColor} 0%, transparent 80%)`,
          opacity: 0.8
        }} 
      />

      <div>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span className="subtle-title">{label}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {badge && (
              <span 
                style={{ 
                  fontSize: '10px', 
                  padding: '1px 6px', 
                  borderRadius: '4px', 
                  background: 'rgba(255,255,255,0.06)',
                  color: 'var(--text-secondary)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              >
                {badge}
              </span>
            )}
            <div 
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--card-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: accentColor
              }}
            >
              {icon}
            </div>
          </div>
        </div>

        {/* Value + Trend row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
          <span className="metric-value-lg">
            {value}
            {unit && <span style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-secondary)', marginLeft: '2px' }}>{unit}</span>}
          </span>

          {trend && (
            <span className={`metric-delta ${trendClass}`}>
              {isUp && <ArrowUpRight size={14} />}
              {isDown && <ArrowDownRight size={14} />}
              {!isUp && !isDown && <Minus size={14} />}
              {Math.abs(trend.value)}%
            </span>
          )}
        </div>

        {/* Supporting description */}
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
          {description}
        </p>
      </div>

      {/* Progress Bar indicator if present */}
      {typeof progressValue === 'number' && (
        <div style={{ marginTop: '16px' }}>
          <div 
            style={{ 
              width: '100%', 
              height: '4px', 
              background: 'rgba(255, 255, 255, 0.06)', 
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden' 
            }}
          >
            <div 
              style={{ 
                width: `${Math.min(100, Math.max(0, progressValue))}%`, 
                height: '100%', 
                backgroundColor: progressColor,
                borderRadius: 'var(--radius-full)',
                transition: 'width 0.4s ease-out'
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};
