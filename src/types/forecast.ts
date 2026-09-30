export type RiskTier = "low" | "medium" | "high";

export type WeatherCondition =
  | "monsoon_depression"
  | "heavy_rain"
  | "cyclone"
  | "western_disturbance"
  | "heatwave"
  | "active_monsoon"
  | "break_monsoon"
  | "clear";

export interface WeatherSystem {
  id: string;
  name: string;
  type: WeatherCondition;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  intensity: "low" | "moderate" | "high" | "severe";
  movement: string;
  status: "developing" | "active" | "intensifying" | "weakening";
}

export interface RegionForecast {
  id: string;
  name: string;
  riskTier: RiskTier;

  confidence: number;
  bustProbability: number;

  historicalError: {
    value: number;
    unit: "mm" | "°C" | "m/s" | "%";
  };

  weatherSystem: string | null;

  coordinates?: [number, number];

  forecastDay: number;
}

export interface TimelineForecast {
  day: number;
  date: string;

  confidence: number;
  bustProbability: number;

  condition: WeatherCondition;
}

export interface AIFactor {
  name: string;
  weight: number;
  description: string;
}

export interface AIInsight {
  summary: string;

  factors: AIFactor[];

  riskLevel: RiskTier;

  recommendedRegion: string;

  explanation: string;
}

export interface HistoricalCharts {
  forecastError: Array<{
    date: string;
    error: number;
  }>;

  rainfallObservedVsPredicted: Array<{
    date: string;
    observed: number;
    predicted: number;
  }>;

  tempError: Array<{
    date: string;
    error: number;
  }>;

  windError: Array<{
    date: string;
    error: number;
  }>;

  confidenceVsActual: Array<{
    date: string;
    confidence: number;
    actualAccuracy: number;
  }>;
}

export interface EnsemblePlumePoint {
  day: number;
  date: string;
  ecmwfMean: number;
  gfsMean: number;
  ncmrwfMean: number;
  p10: number;
  p25: number;
  p75: number;
  p90: number;
  observed?: number;
}

export interface ModelComparisonMetric {
  modelName: string;
  institution: string;
  memberCount: number;
  gridResolution: string;
  rmse24hr: number;
  trackErrorKm: number;
  biasMm: number;
  divergenceContributionPct: number;
}

export interface ShapValue {
  feature: string;
  category: 'synoptic' | 'thermodynamic' | 'kinematic' | 'orographic';
  importance: number; // 0 - 100
  impactDirection: 'positive_bust_risk' | 'negative_bust_risk';
  description: string;
}

export interface OperationalBulletin {
  id: string;
  bulletinNumber: string;
  issueTime: string;
  validUntil: string;
  synopticSituation: string;
  affectedRegions: string[];
  severity: RiskTier;
  alertColor: string;
  ndrfDeploymentNotice: string;
  districtAdvisories: Array<{
    district: string;
    warningLevel: 'Red Alert' | 'Orange Alert' | 'Yellow Alert' | 'Green Watch';
    actionProtocol: string;
  }>;
}

export interface StationObservation {
  id: string;
  name: string;
  subdivision: string;
  coordinates: [number, number];
  observedRainfallMm: number;
  rawGfsQpfMm: number;
  rawEcmwfQpfMm: number;
  correctedQpfMm: number;
  biasVarianceMm: number;
  verificationStatus: 'verified' | 'provisional';
}

export interface ForecastSummary {
  confidence: number;
  bustProbability: number;

  activeSystems: number;
  highRiskRegions: number;

  trend: {
    confidence: number;
    bustProbability: number;
  };
}

export interface ForecastData {
  updatedAt: string;

  forecastSummary: ForecastSummary;

  regions: RegionForecast[];

  timeline: TimelineForecast[];

  weatherSystems: WeatherSystem[];

  aiInsight: AIInsight;

  historicalCharts: HistoricalCharts;

  ensemblePlumes?: EnsemblePlumePoint[];

  modelMetrics?: ModelComparisonMetric[];

  shapValues?: ShapValue[];

  operationalBulletins?: OperationalBulletin[];

  stationObservations?: StationObservation[];
}
