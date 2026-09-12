import { ForecastData, RegionForecast, WeatherSystem, HistoricalCharts, AIInsight } from '../types/forecast';
import { fetchMockForecast, triggerMockCycleRefresh } from './mockApi';

/**
 * Production API interface flag. Set to true when backend endpoints are wired.
 */
const USE_REAL_API = false;
const API_BASE_URL = '/api';

/**
 * Fetch complete ForecastGuard meteorological payload.
 */
export async function getForecastData(): Promise<ForecastData> {
  if (USE_REAL_API) {
    const res = await fetch(`${API_BASE_URL}/forecast`);
    if (!res.ok) {
      throw new Error(`Failed to fetch forecast telemetry: HTTP ${res.status}`);
    }
    return res.json();
  }
  return fetchMockForecast();
}

/**
 * Fetch regional forecast risk profiles.
 */
export async function getRegions(): Promise<RegionForecast[]> {
  const data = await getForecastData();
  return data.regions;
}

/**
 * Fetch tracked synoptic weather systems.
 */
export async function getWeatherSystems(): Promise<WeatherSystem[]> {
  const data = await getForecastData();
  return data.weatherSystems;
}

/**
 * Fetch historical verification error metrics.
 */
export async function getHistoricalCharts(): Promise<HistoricalCharts> {
  const data = await getForecastData();
  return data.historicalCharts;
}

/**
 * Fetch AI explanation and factor breakdown.
 */
export async function getAIAnalysis(): Promise<AIInsight> {
  const data = await getForecastData();
  return data.aiInsight;
}

/**
 * Trigger immediate assimilation refresh (e.g. new Doppler/Satellite/NWP cycle).
 */
export async function refreshForecastCycle(): Promise<ForecastData> {
  if (USE_REAL_API) {
    const res = await fetch(`${API_BASE_URL}/forecast/refresh`, { method: 'POST' });
    if (!res.ok) {
      throw new Error(`Failed to trigger forecast cycle: HTTP ${res.status}`);
    }
    return res.json();
  }
  return triggerMockCycleRefresh();
}
