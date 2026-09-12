import React from 'react';
import { MetricCard } from './MetricCard';
import { ForecastSummary } from '../../types/forecast';
import { ShieldCheck, AlertTriangle, CloudLightning, MapPin } from 'lucide-react';
import { getRiskColor } from '../../utils/riskUtils';

interface SummaryCardsProps {
  summary: ForecastSummary;
  onNavigateToRisk?: () => void;
  onNavigateToSystems?: () => void;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  summary,
  onNavigateToRisk,
  onNavigateToSystems
}) => {
  // Confidence assessment
  const confText = summary.confidence >= 75 ? 'Good confidence' : summary.confidence >= 60 ? 'Moderate spread' : 'Low confidence';
  
  // Bust assessment
  const bustText = summary.bustProbability >= 35 ? 'Severe risk' : summary.bustProbability >= 20 ? 'Moderate risk' : 'Low risk';

  return (
    <section className="summary-grid" aria-label="Key Meteorological Indicators">
      {/* 1. Overall Forecast Confidence */}
      <MetricCard
        id="metric-card-confidence"
        icon={<ShieldCheck size={18} />}
        label="Overall Forecast Confidence"
        value={summary.confidence}
        unit="%"
        description={confText}
        trend={{
          value: summary.trend.confidence,
          isPositiveGood: true
        }}
        progressValue={summary.confidence}
        progressColor={summary.confidence >= 70 ? 'var(--risk-low)' : summary.confidence >= 50 ? 'var(--risk-medium)' : 'var(--risk-high)'}
        accentColor="var(--accent-blue)"
        badge="ENSEMBLE MEAN"
      />

      {/* 2. Bust Probability */}
      <MetricCard
        id="metric-card-bust"
        icon={<AlertTriangle size={18} />}
        label="Bust Probability"
        value={summary.bustProbability}
        unit="%"
        description={bustText}
        trend={{
          value: summary.trend.bustProbability,
          isPositiveGood: false // Lower is better
        }}
        progressValue={summary.bustProbability}
        progressColor={summary.bustProbability >= 35 ? 'var(--risk-high)' : summary.bustProbability >= 20 ? 'var(--risk-medium)' : 'var(--risk-low)'}
        accentColor={summary.bustProbability >= 30 ? 'var(--risk-high)' : 'var(--risk-medium)'}
        badge="QPF / TRACK"
      />

      {/* 3. Active Weather Systems */}
      <MetricCard
        id="metric-card-systems"
        icon={<CloudLightning size={18} />}
        label="Active Weather Systems"
        value={summary.activeSystems}
        description="3 significant (Depression, Cyclone, Surge)"
        accentColor="var(--accent-cyan)"
        badge="SYNOPTIC"
        onClick={onNavigateToSystems}
      />

      {/* 4. High-Risk Regions */}
      <MetricCard
        id="metric-card-risk-regions"
        icon={<MapPin size={18} />}
        label="High-Risk Regions"
        value={summary.highRiskRegions}
        description="Central, Western & Eastern Corridors"
        accentColor="var(--risk-high)"
        progressValue={(summary.highRiskRegions / 18) * 100}
        progressColor="var(--risk-high)"
        badge="ALERT LEVEL 3"
        onClick={onNavigateToRisk}
      />
    </section>
  );
};
