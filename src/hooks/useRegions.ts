import { useState, useMemo } from 'react';
import { RegionForecast, RiskTier } from '../types/forecast';

export function useRegions(regions: RegionForecast[] = []) {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>('MP'); // default to Madhya Pradesh (Central India)
  const [filterRisk, setFilterRisk] = useState<RiskTier | 'all'>('all');

  const selectedRegion = useMemo(() => {
    return regions.find(r => r.id === selectedRegionId) || null;
  }, [regions, selectedRegionId]);

  const highRiskRegions = useMemo(() => {
    return regions.filter(r => r.riskTier === 'high');
  }, [regions]);

  const mediumRiskRegions = useMemo(() => {
    return regions.filter(r => r.riskTier === 'medium');
  }, [regions]);

  const lowRiskRegions = useMemo(() => {
    return regions.filter(r => r.riskTier === 'low');
  }, [regions]);

  const filteredRegions = useMemo(() => {
    if (filterRisk === 'all') return regions;
    return regions.filter(r => r.riskTier === filterRisk);
  }, [regions, filterRisk]);

  return {
    selectedRegionId,
    setSelectedRegionId,
    selectedRegion,
    filterRisk,
    setFilterRisk,
    filteredRegions,
    highRiskRegions,
    mediumRiskRegions,
    lowRiskRegions
  };
}
