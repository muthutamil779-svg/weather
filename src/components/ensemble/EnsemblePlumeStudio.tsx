import React, { useState } from 'react';
import { EnsemblePlumePoint, ModelComparisonMetric, ShapValue } from '../../types/forecast';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { Activity, Layers, Sliders, Sparkles, TrendingUp, Cpu, Info } from 'lucide-react';

interface EnsemblePlumeStudioProps {
  plumes?: EnsemblePlumePoint[];
  models?: ModelComparisonMetric[];
  shapValues?: ShapValue[];
}

export const EnsemblePlumeStudio: React.FC<EnsemblePlumeStudioProps> = ({
  plumes = [],
  models = [],
  shapValues = []
}) => {
  const [selectedVariable, setSelectedVariable] = useState<'qpf' | 'wind' | 'temp'>('qpf');

  // Multiplier for simulating different physical variables from the base plume
  const chartData = plumes.map(p => {
    if (selectedVariable === 'wind') {
      return {
        date: p.date,
        ecmwf: Math.round(p.ecmwfMean * 0.45 + 20),
        gfs: Math.round(p.gfsMean * 0.38 + 18),
        ncmrwf: Math.round(p.ncmrwfMean * 0.42 + 22),
        p10: Math.round(p.p10 * 0.4 + 15),
        p90: Math.round(p.p90 * 0.5 + 28),
        unit: 'km/h'
      };
    }
    if (selectedVariable === 'temp') {
      return {
        date: p.date,
        ecmwf: +(32 - p.ecmwfMean * 0.05).toFixed(1),
        gfs: +(34 - p.gfsMean * 0.04).toFixed(1),
        ncmrwf: +(33 - p.ncmrwfMean * 0.045).toFixed(1),
        p10: +(28 - p.p10 * 0.03).toFixed(1),
        p90: +(36 - p.p90 * 0.06).toFixed(1),
        unit: '°C'
      };
    }
    return {
      date: p.date,
      ecmwf: p.ecmwfMean,
      gfs: p.gfsMean,
      ncmrwf: p.ncmrwfMean,
      p10: p.p10,
      p90: p.p90,
      observed: p.observed,
      unit: 'mm'
    };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Studio Header & Variable Selector */}
      <div 
        className="fg-panel"
        style={{
          padding: '20px',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(59, 156, 255, 0.3)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div 
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: 'rgba(59, 156, 255, 0.15)',
                  color: 'var(--accent-cyan)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase'
                }}
              >
                70% Milestone: Full-Scale Ensemble ML Studio
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                105-Member Probabilistic Envelope
              </span>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Multi-Model Ensemble Plume & Quantile Spread Analyzer
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
              Deconstructs divergence across ECMWF EPS (51), NCEP GEFS (31), and NCMRWF NEPS (23) with P10–P90 uncertainty confidence bands.
            </p>
          </div>

          {/* Variable Switcher */}
          <div 
            style={{
              display: 'inline-flex',
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid var(--card-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '3px'
            }}
          >
            <button
              onClick={() => setSelectedVariable('qpf')}
              className={`fg-tab-btn ${selectedVariable === 'qpf' ? 'active' : ''}`}
              style={{ padding: '6px 12px', fontSize: '11px' }}
            >
              Precipitation (mm)
            </button>
            <button
              onClick={() => setSelectedVariable('wind')}
              className={`fg-tab-btn ${selectedVariable === 'wind' ? 'active' : ''}`}
              style={{ padding: '6px 12px', fontSize: '11px' }}
            >
              850 hPa Wind (km/h)
            </button>
            <button
              onClick={() => setSelectedVariable('temp')}
              className={`fg-tab-btn ${selectedVariable === 'temp' ? 'active' : ''}`}
              style={{ padding: '6px 12px', fontSize: '11px' }}
            >
              Temperature (°C)
            </button>
          </div>
        </div>

        {/* Interactive Plume Chart */}
        <div style={{ height: '320px', width: '100%', marginTop: '20px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="quantileGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b9cff" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b9cff" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#12161f',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: '#fff'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              {/* Quantile Envelope P10 to P90 */}
              <Area 
                type="monotone" 
                dataKey="p90" 
                stroke="transparent" 
                fill="url(#quantileGrad)" 
                name="P10–P90 Ensemble Spread" 
              />
              {/* Individual Multi-Agency Ensembles */}
              <Line 
                type="monotone" 
                dataKey="ecmwf" 
                stroke="#3b9cff" 
                strokeWidth={2.5} 
                dot={{ r: 3 }} 
                name="ECMWF EPS Mean (51 members)" 
              />
              <Line 
                type="monotone" 
                dataKey="gfs" 
                stroke="#f43f5e" 
                strokeWidth={2} 
                strokeDasharray="4 4" 
                dot={{ r: 3 }} 
                name="NCEP GEFS Mean (31 members)" 
              />
              <Line 
                type="monotone" 
                dataKey="ncmrwf" 
                stroke="#22d3ee" 
                strokeWidth={2} 
                dot={{ r: 3 }} 
                name="NCMRWF NEPS Mean (23 members)" 
              />
              {selectedVariable === 'qpf' && (
                <Line 
                  type="monotone" 
                  dataKey="observed" 
                  stroke="#22c55e" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, stroke: '#fff', strokeWidth: 1 }} 
                  name="IMD Ground Truth Verification (Observed)" 
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lower Row: Model Comparison Matrix + ML SHAP Feature Importance */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Model Metrics Table */}
        <div className="fg-panel" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Layers size={16} style={{ color: 'var(--accent-blue)' }} />
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Multi-Agency Model Performance Scorecard
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {models.map(m => (
              <div 
                key={m.modelName}
                className="fg-card"
                style={{
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--card-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {m.modelName}
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--accent-cyan)', background: 'rgba(34,211,238,0.1)', padding: '1px 5px', borderRadius: '3px' }}>
                      {m.memberCount} members
                    </span>
                  </div>
                  <span className="mono-text" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    Res: {m.gridResolution}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '11px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px', borderRadius: '4px' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '9px' }}>24HR RMSE</div>
                    <div className="mono-text" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{m.rmse24hr} mm</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px', borderRadius: '4px' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '9px' }}>TRACK ERROR</div>
                    <div className="mono-text" style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>{m.trackErrorKm} km</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px', borderRadius: '4px' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '9px' }}>DIVERG. SPREAD</div>
                    <div className="mono-text" style={{ fontWeight: 600, color: 'var(--risk-high)' }}>{m.divergenceContributionPct}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Machine Learning SHAP Feature Importance */}
        <div className="fg-panel" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} style={{ color: 'var(--weather-monsoon)' }} />
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                Machine Learning SHAP Bust Attribution
              </h3>
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              TreeSHAP / XGBoost Regressor
            </span>
          </div>

          <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Explains the statistical contribution of each atmospheric parameter to the current elevated forecast bust probability:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {shapValues.map(s => (
              <div 
                key={s.feature}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '6px',
                  padding: '10px 12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {s.feature}
                  </span>
                  <span className="mono-text" style={{ fontSize: '11px', fontWeight: 700, color: s.impactDirection === 'positive_bust_risk' ? 'var(--risk-high)' : 'var(--risk-low)' }}>
                    {s.impactDirection === 'positive_bust_risk' ? `+${s.importance}` : `-${s.importance}`} SHAP
                  </span>
                </div>

                {/* Visual Importance Bar */}
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden', margin: '4px 0' }}>
                  <div 
                    style={{
                      width: `${s.importance}%`,
                      height: '100%',
                      background: s.impactDirection === 'positive_bust_risk' ? 'linear-gradient(90deg, #f97316, #ef4444)' : 'linear-gradient(90deg, #22d3ee, #22c55e)',
                      borderRadius: '2px'
                    }}
                  />
                </div>

                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {s.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
