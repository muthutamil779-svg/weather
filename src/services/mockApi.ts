import { ForecastData } from '../types/forecast';
import { INITIAL_FORECAST_DATA } from '../data/mockData';

// Clone initial state to allow non-destructive mutations on refresh
let currentMockData: ForecastData = JSON.parse(JSON.stringify(INITIAL_FORECAST_DATA));

/**
 * Simulates a realistic network request with small latency.
 */
export async function fetchMockForecast(): Promise<ForecastData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(currentMockData)));
    }, 450);
  });
}

/**
 * Simulates real-time model run update (e.g. latest 06Z / 12Z cycle).
 */
export async function triggerMockCycleRefresh(): Promise<ForecastData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date();
      currentMockData.updatedAt = now.toISOString();
      
      // Slightly fluctuate ensemble bust probabilities based on dynamic assimilation
      currentMockData.forecastSummary.confidence = Math.min(95, Math.max(50, currentMockData.forecastSummary.confidence + (Math.random() > 0.5 ? 1 : -1)));
      currentMockData.forecastSummary.bustProbability = 100 - currentMockData.forecastSummary.confidence;

      currentMockData.regions = currentMockData.regions.map(reg => {
        const delta = Math.floor((Math.random() * 5) - 2);
        const newConf = Math.min(95, Math.max(45, reg.confidence + delta));
        const newBust = 100 - newConf;
        const newRisk = newBust >= 35 ? 'high' : newBust >= 22 ? 'medium' : 'low';
        return {
          ...reg,
          confidence: newConf,
          bustProbability: newBust,
          riskTier: newRisk
        };
      });

      resolve(JSON.parse(JSON.stringify(currentMockData)));
    }, 500);
  });
}
