import { useState, useEffect, useCallback } from 'react';
import { ForecastData } from '../types/forecast';
import { getForecastData, refreshForecastCycle } from '../services/forecastApi';

interface UseForecastDataReturn {
  data: ForecastData | null;
  loading: boolean;
  error: string | null;
  isRefreshing: boolean;
  refetch: () => Promise<void>;
  triggerRefresh: () => Promise<void>;
}

export function useForecastData(): UseForecastDataReturn {
  const [data, setData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const forecast = await getForecastData();
      setData(forecast);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unable to load forecast data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const triggerRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const updated = await refreshForecastCycle();
      setData(updated);
    } catch (err: unknown) {
      console.error('Model cycle assimilation failed:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    isRefreshing,
    refetch: fetchData,
    triggerRefresh
  };
}
