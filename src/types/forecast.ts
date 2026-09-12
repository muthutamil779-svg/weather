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
}
