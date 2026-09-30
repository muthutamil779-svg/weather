export interface MilestoneTask {
  id: string;
  category: string;
  name: string;
  status: 'completed' | 'in_progress' | 'planned';
  completionPercentage: number;
  commitHash?: string;
  verificationEvidence: string;
}

export interface StakeholderPersona {
  id: string;
  role: string;
  organization: string;
  location: string;
  avatarIcon: string;
  primaryPainPoint: string;
  operationalChallenge: string;
  directQuote: string;
  implementedFeature: string;
  operationalImpact: string;
}

export interface AIPromptAuditRecord {
  scenarioId: string;
  scenarioName: string;
  model: string;
  temperature: number;
  systemPrompt: string;
  userPromptInput: string;
  structuredOutput: {
    bustRiskScore: number;
    uncertaintyDrivers: string[];
    ensembleDivergenceMm: number;
    meteorologicalRationale: string;
    guardrailFlagsTriggered: string[];
    hallucinationRiskScore: number; // 0 - 100
  };
  auditStatus: 'passed' | 'flagged';
  latencyMs: number;
  verifiedBy: string;
}

export interface PipelineStageTelemetry {
  stageId: string;
  name: string;
  source: string;
  updateFrequency: string;
  recordCount: string;
  status: 'nominal' | 'degraded' | 'syncing';
  latencyMs: number;
  cacheHitRatio: number;
  lastIngestedTimestamp: string;
  format: 'GRIB2' | 'NetCDF-4' | 'GeoJSON' | 'CSV / Binary';
}

export interface PipelineAuditData {
  milestoneProgress: {
    currentMilestone: string;
    targetPercentage: number;
    achievedPercentage: number;
    isMilestoneCompleted: boolean;
    verificationDate: string;
    repositoryUrl: string;
    tasks: MilestoneTask[];
  };
  stakeholderPersonas: StakeholderPersona[];
  aiPromptAuditRecords: AIPromptAuditRecord[];
  pipelineStages: PipelineStageTelemetry[];
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
