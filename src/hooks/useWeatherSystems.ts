import { useState, useMemo } from 'react';
import { WeatherSystem, WeatherCondition } from '../types/forecast';

export function useWeatherSystems(weatherSystems: WeatherSystem[] = []) {
  const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<WeatherCondition | 'all'>('all');

  const selectedSystem = useMemo(() => {
    return weatherSystems.find(ws => ws.id === selectedSystemId) || null;
  }, [weatherSystems, selectedSystemId]);

  const activeSystemsCount = useMemo(() => {
    return weatherSystems.filter(ws => ws.status === 'active' || ws.status === 'intensifying').length;
  }, [weatherSystems]);

  const filteredSystems = useMemo(() => {
    if (filterType === 'all') return weatherSystems;
    return weatherSystems.filter(ws => ws.type === filterType);
  }, [weatherSystems, filterType]);

  return {
    selectedSystemId,
    setSelectedSystemId,
    selectedSystem,
    filterType,
    setFilterType,
    filteredSystems,
    activeSystemsCount
  };
}
