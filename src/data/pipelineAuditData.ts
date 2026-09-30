import { PipelineAuditData } from '../types/pipeline';

export const PIPELINE_AUDIT_DATA: PipelineAuditData = {
  milestoneProgress: {
    currentMilestone: 'Milestone 1 — Foundational Synoptic Core & Bust Diagnostic Engine',
    targetPercentage: 35,
    achievedPercentage: 35,
    isMilestoneCompleted: true,
    verificationDate: '2026-09-30',
    repositoryUrl: 'https://github.com/muthutamil779-svg/weather',
    tasks: [
      {
        id: 'ms-01',
        category: 'Geospatial & Visualization Strategy',
        name: 'Dual-Engine 3D WebGL Globe & 2D Vector SVG Fallback',
        status: 'completed',
        completionPercentage: 100,
        commitHash: 'e80f1f9',
        verificationEvidence: 'Three.js / React Three Fiber globe with dynamic synoptic cyclonic markers and SVG India geographic projection with accessible pattern overlay.'
      },
      {
        id: 'ms-02',
        category: 'Domain & Diagnostic Modeling',
        name: 'Tropical Dynamics Bust Probability Scoring Algorithm',
        status: 'completed',
        completionPercentage: 100,
        commitHash: 'e80f1f9',
        verificationEvidence: 'Coriolis weakness parameterization, convective instability index (CAPE), and lead-time decay modeling across 10-day forecast horizon.'
      },
      {
        id: 'ms-03',
        category: 'Inclusive UX & Accessibility',
        name: 'Multi-Tier Risk HUD with Dual-Channel Sensory Cues',
        status: 'completed',
        completionPercentage: 100,
        commitHash: 'e80f1f9',
        verificationEvidence: 'Non-blocking diagnostic HUD with high-contrast text tags, geometric status glyphs, and WCAG 2.1 AA compliant color pairings.'
      },
      {
        id: 'ms-04',
        category: 'Verification Analytics',
        name: 'Observed vs. Predicted Verification Error Charting',
        status: 'completed',
        completionPercentage: 100,
        commitHash: 'e80f1f9',
        verificationEvidence: 'Recharts-driven historical error trends, precipitation scatter, temperature/wind variance, and confidence vs actual accuracy curves.'
      },
      {
        id: 'ms-05',
        category: 'Pipeline & Service Layer',
        name: 'Simulation & Assimilation Cycle Client Architecture',
        status: 'completed',
        completionPercentage: 100,
        commitHash: 'e80f1f9',
        verificationEvidence: 'Mock / RESTful API service abstraction with dynamic cycle assimilation simulation and live state mutations.'
      },
      {
        id: 'ms-06',
        category: 'Production Integration',
        name: 'Production Build Verification & Oxlint Type Safety',
        status: 'completed',
        completionPercentage: 100,
        commitHash: 'e80f1f9',
        verificationEvidence: 'Zero TypeScript compile errors on strict mode; automated Vite asset bundling and minified telemetry pipeline.'
      }
    ]
  },

  stakeholderPersonas: [
    {
      id: 'stakeholder-imd',
      role: 'Senior Duty Cyclone Forecaster',
      organization: 'India Meteorological Department (IMD Cyclone Warning Centre)',
      location: 'Bhubaneswar / Chennai',
      avatarIcon: 'CloudLightning',
      primaryPainPoint: 'Multi-model track divergence exceeding 120 km during rapid cyclogenesis in the Bay of Bengal.',
      operationalChallenge: 'Ensemble packages (ECMWF vs GFS) produce conflicting precipitation footprints, forcing forecasters to manually cross-reference 50+ members under strict 3-hour bulletin deadlines.',
      directQuote: '"When a tropical depression deepens within 6 hours, standard global models miss the moisture surge. We need an immediate visualization of where the models diverge most, not just a single averaged track that hides severe bust risk."',
      implementedFeature: 'Spatial Divergence Heatmap & Ensemble Spread Matrix (highlighting high-bust variance zones with quantitative millimeter disparity).',
      operationalImpact: 'Reduces bulletin preparation cycle by 45 minutes; prevents false-consensus complacency during rapid intensity fluctuations.'
    },
    {
      id: 'stakeholder-sdma',
      role: 'State Disaster Response Commissioner',
      organization: 'State Disaster Management Authority (SDMA)',
      location: 'Bhopal / Cuttack',
      avatarIcon: 'ShieldAlert',
      primaryPainPoint: 'Ambiguous probabilistic rainfall warnings that lack clear spatial and lead-time risk categorization for field teams.',
      operationalChallenge: 'Evacuation logistics and NDRF pre-positioning require 48 to 72 hours lead time; a quantitative precipitation forecast bust causes either dangerous unpreparedness or costly false alarm fatigue.',
      directQuote: '"In the field, officers check rugged tablets in bright sunlight. Jargon and subtle color gradients fail us. We require unmistakable geometric symbols and explicit High/Medium/Low tiers linked to bust certainty."',
      implementedFeature: 'Inclusive Multi-Tier Risk HUD with dual-channel visual accessibility (color + shape + explicit text), accompanied by 10-day lead-time decay warnings.',
      operationalImpact: 'Enables decisive pre-positioning of flood rescue units 24 hours earlier with documented 30% reduction in false-deployment costs.'
    },
    {
      id: 'stakeholder-agri',
      role: 'District Agricultural Extension Hydrologist',
      organization: 'Krishi Vigyan Kendra & Water Resources Department',
      location: 'Central Maharashtra / Vidarbha',
      avatarIcon: 'Droplets',
      primaryPainPoint: 'Convective parameterization failures during monsoon breaks causing misinformed sowing advisories to smallholder farmers.',
      operationalChallenge: 'Dry spells mistaken for active rain spells ruin newly sown cotton and soybean crops across millions of hectares.',
      directQuote: '"If the forecast predicts 50mm and we receive 0mm because a break monsoon pattern set in, farmers lose their entire seasonal seed investment. We must know the meteorological bust reason beforehand."',
      implementedFeature: 'Meteorological Causal Chain Diagnostic HUD detailing atmospheric drivers (e.g. low-level jet velocity shift, pressure gradient breakdown).',
      operationalImpact: 'Delivers trusted sowing and irrigation advisory windows with transparent model confidence calibration.'
    }
  ],

  aiPromptAuditRecords: [
    {
      scenarioId: 'audit-sc-01',
      scenarioName: 'Bay of Bengal Depression Track Divergence (BOB-02)',
      model: 'ForecastGuard LLM-Met v2 (Fine-tuned Ensemble Diagnostic)',
      temperature: 0.15,
      systemPrompt: 'You are an operational tropical meteorologist audit agent. Given NWP ensemble spread (ECMWF, GFS, NCMRWF) and IMD AWS rainfall verification ground truth, synthesize the exact causal chain of forecast bust risk. Never extrapolate unsupported extreme precipitation values. Always quantify model divergence in kilometers and precipitation variance in mm.',
      userPromptInput: 'Analyze lead time Day 5 divergence for Region: Madhya Pradesh & Odisha. ECMWF predicts 85mm QPF; GFS predicts 25mm QPF. Convective Available Potential Energy (CAPE) = 2800 J/kg; low-level jet shear = 22 m/s.',
      structuredOutput: {
        bustRiskScore: 78,
        uncertaintyDrivers: [
          'ECMWF-GFS Track Disparity (+140km northward displacement in GFS)',
          'High CAPE environment elevating unparameterized mesoscale convective cell triggers',
          'Orographic moisture trapping over Eastern Ghats leading to non-linear runoff'
        ],
        ensembleDivergenceMm: 60,
        meteorologicalRationale: 'Deep baroclinic deepening in the Bay of Bengal exhibits non-linear phase interaction with the mid-tropospheric ridge. High convective instability renders deterministic rainfall totals volatile beyond 96-hour lead times.',
        guardrailFlagsTriggered: ['HIGH_VARIANCE_WARNING', 'MANDATORY_HUMAN_IN_THE_LOOP_REVIEW'],
        hallucinationRiskScore: 4
      },
      auditStatus: 'passed',
      latencyMs: 340,
      verifiedBy: 'IMD Operational Audit Protocol 2026.4'
    },
    {
      scenarioId: 'audit-sc-02',
      scenarioName: 'Western Disturbance Himalayan Orographic Interaction',
      model: 'ForecastGuard LLM-Met v2 (Fine-tuned Ensemble Diagnostic)',
      temperature: 0.15,
      systemPrompt: 'You are an operational tropical meteorologist audit agent. Adhere strictly to the WMO Guidelines on Ensemble Prediction Systems and verification metrics. Output structured reasoning with explicit confidence bounds.',
      userPromptInput: 'Analyze lead time Day 4 divergence for Himachal Pradesh & Uttarakhand. Western Disturbance approaching northern Pakistan. Upper-level jet velocity: 65 m/s.',
      structuredOutput: {
        bustRiskScore: 64,
        uncertaintyDrivers: [
          'Sub-grid orographic lifting parameterization sensitivity in steep terrain',
          'Jet streak exit-region divergence timing discrepancy (±9 hours)'
        ],
        ensembleDivergenceMm: 32,
        meteorologicalRationale: 'Interaction between the upper-level trough and the mid-latitude jet streak shows divergence in freezing level elevation, skewing liquid vs solid precipitation phase partitioning.',
        guardrailFlagsTriggered: ['OROGRAPHIC_UNCERTAINTY_FLAG'],
        hallucinationRiskScore: 6
      },
      auditStatus: 'passed',
      latencyMs: 310,
      verifiedBy: 'NCMRWF Mountain Weather Protocol 2026.2'
    }
  ],

  pipelineStages: [
    {
      stageId: 'stage-nwp-ingest',
      name: 'Multi-Model NWP Ensemble Ingestion',
      source: 'ECMWF Open Data, NOAA NOMADS (GEFS), NCMRWF Open FTP',
      updateFrequency: 'Every 6 Hours (00Z, 06Z, 12Z, 18Z cycles)',
      recordCount: '105 Ensemble Members / Cycle (~18.4 GB)',
      status: 'nominal',
      latencyMs: 120,
      cacheHitRatio: 0.96,
      lastIngestedTimestamp: '2026-09-30T06:00:00Z',
      format: 'GRIB2'
    },
    {
      stageId: 'stage-regrid-calc',
      name: 'Spatial Regridding & Ensemble Spread Calculation',
      source: 'Distributed xarray & eccodes worker nodes (Bilinear / Conservative)',
      updateFrequency: 'Real-time post GRIB2 decode',
      recordCount: '0.25° × 0.25° Indian Subcontinent Grid (6°N-38°N, 68°E-98°E)',
      status: 'nominal',
      latencyMs: 245,
      cacheHitRatio: 0.99,
      lastIngestedTimestamp: '2026-09-30T06:14:30Z',
      format: 'NetCDF-4'
    },
    {
      stageId: 'stage-ground-truth',
      name: 'Verification Ground Truth Ingestion',
      source: 'IMD Daily Gridded Rainfall (0.25°) + 4,200 AWS/ARG Network Telemetry',
      updateFrequency: 'Daily 03:00Z (24-hour rainfall accumulation to 08:30 IST)',
      recordCount: '4,200 Surface Stations + 1,440 Grid Cells',
      status: 'nominal',
      latencyMs: 95,
      cacheHitRatio: 0.98,
      lastIngestedTimestamp: '2026-09-30T03:30:00Z',
      format: 'CSV / Binary'
    },
    {
      stageId: 'stage-redis-cache',
      name: 'Hot GeoJSON / Regional Risk Cache',
      source: 'In-Memory Redis 7 Cluster (TTL: 3600s with automated invalidation)',
      updateFrequency: 'Dynamic sub-second caching',
      recordCount: '36 Meteorological Sub-Divisions & 10-day Timelines',
      status: 'nominal',
      latencyMs: 12,
      cacheHitRatio: 0.994,
      lastIngestedTimestamp: '2026-09-30T08:05:00Z',
      format: 'GeoJSON'
    }
  ],

  ensembleMetrics: {
    ecmwfMemberCount: 51,
    gfsMemberCount: 31,
    ncmrwfMemberCount: 23,
    imdGridResolution: '0.25° × 0.25° (~25 km)',
    brierScore: 0.142,
    crpsScore: 1.84,
    criticalSuccessIndex: 0.79,
    cacheTtlSeconds: 3600
  }
};
