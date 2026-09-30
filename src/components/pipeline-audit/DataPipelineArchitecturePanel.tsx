import React, { useState } from 'react';
import { PipelineStageTelemetry } from '../../types/pipeline';
import { Database, Server, RefreshCw, Cpu, Activity, HardDrive, Layers, CheckCircle, Zap, ShieldAlert, Binary } from 'lucide-react';

interface DataPipelineArchitecturePanelProps {
  stages: PipelineStageTelemetry[];
  ensembleMetrics: {
    ecmwfMemberCount: number;
    gfsMemberCount: number;
    ncmrwfMemberCount: number;
    imdGridResolution: string;
    brierScore: number;
    crpsScore: number;
    criticalSuccessIndex: number;
    cacheTtlSeconds: number;
  };
}

export const DataPipelineArchitecturePanel: React.FC<DataPipelineArchitecturePanelProps> = ({
  stages,
  ensembleMetrics
}) => {
  const [selectedStageId, setSelectedStageId] = useState<string>(stages[0]?.stageId || 'stage-nwp-ingest');
  const activeStage = stages.find(s => s.stageId === selectedStageId) || stages[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Banner / Title */}
      <div 
        className="fg-panel"
        style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(26, 31, 43, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid rgba(34, 211, 238, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div 
            style={{
              padding: '6px',
              borderRadius: '8px',
              background: 'rgba(34, 211, 238, 0.15)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              color: 'var(--accent-cyan)'
            }}
          >
            <Database size={20} />
          </div>
          <span 
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              fontWeight: 700,
              letterSpacing: '0.8px',
              color: 'var(--accent-cyan)',
              background: 'rgba(34, 211, 238, 0.12)',
              padding: '2px 8px',
              borderRadius: '12px',
              border: '1px solid rgba(34, 211, 238, 0.3)'
            }}
          >
            Multi-Model NWP Ensemble & Verification Data Pipeline
          </span>
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0 8px' }}>
          Real-Time Ingestion, GRIB2 Parsing, and High-Performance Redis Caching Topology
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', maxWidth: '850px', lineHeight: 1.6 }}>
          ForecastGuard AI synchronizes multi-agency global and regional ensemble prediction suites (ECMWF, GFS, NCMRWF) with ground-truth IMD gridded observation verification products. Telemetry is parsed via distributed workers and persisted in a high-speed in-memory cache to guarantee sub-15ms front-end response times.
        </p>

        {/* 4 Pipeline Stat Counters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>TOTAL ENSEMBLE SUITE</div>
            <div className="mono-text" style={{ fontSize: '17px', fontWeight: 700, color: 'var(--accent-cyan)' }}>
              105 Members
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>51 ECMWF + 31 GFS + 23 NCMRWF</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>GROUND TRUTH GRID</div>
            <div className="mono-text" style={{ fontSize: '17px', fontWeight: 700, color: 'var(--risk-low)' }}>
              {ensembleMetrics.imdGridResolution}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>IMD AWS/ARG Surface Network</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>VERIFICATION BRIER SCORE</div>
            <div className="mono-text" style={{ fontSize: '17px', fontWeight: 700, color: 'var(--accent-blue)' }}>
              {ensembleMetrics.brierScore}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>CRPS: {ensembleMetrics.crpsScore} | CSI: {ensembleMetrics.criticalSuccessIndex}</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>IN-MEMORY REDIS CACHE</div>
            <div className="mono-text" style={{ fontSize: '17px', fontWeight: 700, color: 'var(--weather-monsoon)' }}>
              99.4% Hit Ratio
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>TTL: {ensembleMetrics.cacheTtlSeconds}s (Instant Invalidation)</div>
          </div>
        </div>
      </div>

      {/* Interactive Step-by-Step Architectural Flow */}
      <div className="fg-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>
          End-to-End Synoptic Data Ingestion & Caching Flow
        </h3>

        {/* Pipeline Stages Navigation Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginBottom: '20px' }}>
          {stages.map((stage, idx) => {
            const isSelected = stage.stageId === selectedStageId;
            return (
              <button
                key={stage.stageId}
                onClick={() => setSelectedStageId(stage.stageId)}
                className={`fg-tab-btn ${isSelected ? 'active' : ''}`}
                style={{
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '6px',
                  borderRadius: 'var(--radius-sm)',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--card-border)',
                  background: isSelected ? 'rgba(34, 211, 238, 0.08)' : 'rgba(255, 255, 255, 0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span className="mono-text" style={{ fontSize: '10px', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                    STAGE 0{idx + 1}
                  </span>
                  <span 
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: stage.status === 'nominal' ? 'var(--risk-low)' : 'var(--risk-medium)'
                    }} 
                  />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', textAlign: 'left' }}>
                  {stage.name}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  Format: {stage.format}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {activeStage.name}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--accent-blue)', marginTop: '2px' }}>
                Source: {activeStage.source}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span 
                style={{
                  fontSize: '11px',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: 'rgba(34, 197, 94, 0.12)',
                  color: 'var(--risk-low)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  fontWeight: 600
                }}
              >
                STATUS: NOMINAL
              </span>
              <span className="mono-text" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Latency: {activeStage.latencyMs} ms
              </span>
            </div>
          </div>

          {/* Grid of Stage Metadata */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>UPDATE FREQUENCY</div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                {activeStage.updateFrequency}
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>RECORD VOLUME & BANDWIDTH</div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                {activeStage.recordCount}
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>CACHE HIT PERFORMANCE</div>
              <div className="mono-text" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-cyan)', marginTop: '2px' }}>
                {(activeStage.cacheHitRatio * 100).toFixed(1)}% Active Hit Ratio
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>LAST INGESTION TIMESTAMP</div>
              <div className="mono-text" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {new Date(activeStage.lastIngestedTimestamp).toUTCString()}
              </div>
            </div>
          </div>

          {/* Mathematical Formulations & Data Processing Mechanics */}
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--card-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '8px' }}>
              <Binary size={14} />
              <span>Statistical & Algorithmic Formulation for Stage</span>
            </div>

            {selectedStageId === 'stage-nwp-ingest' && (
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Raw binary GRIB2 buffers are polled via asynchronous Celery workers from ECMWF open data feeds and NOAA NOMADS HTTP servers. Decoding utilizes multi-threaded <code>eccodes</code> C bindings inside an <code>xarray</code> backend, parsing geopotential height (z), u/v wind components, temperature (T), and quantitative precipitation forecast (QPF) for all ensemble perturbations.
              </div>
            )}

            {selectedStageId === 'stage-regrid-calc' && (
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Ensemble spread (σ_ens) across M ensemble members is calculated at every grid point:
                <div className="mono-text" style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.4)', borderRadius: '4px', margin: '8px 0', color: 'var(--accent-cyan)' }}>
                  σ_ens(x, y, t) = √[ (1 / (M - 1)) * Σ (QPF_m(x, y, t) - QPF_mean(x, y, t))² ]
                </div>
                Conservative remapping aligns different native model grids (ECMWF 0.1°, GFS 0.25°) into the unified Indian subcontinental verification grid (6°N to 38°N, 68°E to 98°E).
              </div>
            )}

            {selectedStageId === 'stage-ground-truth' && (
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Verification ground truth merges daily IMD 0.25° gridded rainfall with 4,200 Automated Weather Stations (AWS) and Automatic Rain Gauges (ARG). Continuous Ranked Probability Score (CRPS) and Brier Scores are computed against the deterministic threshold (R &gt;= 64.5 mm for heavy rainfall warnings), ensuring objective performance auditing.
              </div>
            )}

            {selectedStageId === 'stage-redis-cache' && (
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Processed regional risk tiers and bust probabilities are serialized into GeoJSON and partitioned Redis hashes. The cache maintains a strict 1-hour Time-to-Live (TTL: 3600s), paired with immediate pub/sub cache invalidation triggers whenever an 00Z, 06Z, 12Z, or 18Z assimilation cycle completes.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
