import { RiskTier } from '../types/forecast';

export function getRiskColor(risk: RiskTier): string {
  switch (risk) {
    case 'low':
      return '#22c55e';
    case 'medium':
      return '#eab308';
    case 'high':
      return '#ef4444';
  }
}

export function getRiskBadgeClass(risk: RiskTier): string {
  return `risk-badge ${risk}`;
}

export function getRiskLabel(risk: RiskTier): string {
  switch (risk) {
    case 'low':
      return 'Low Risk';
    case 'medium':
      return 'Medium Risk';
    case 'high':
      return 'High Risk';
  }
}

export function getRiskIcon(risk: RiskTier): string {
  switch (risk) {
    case 'low':
      return '●';
    case 'medium':
      return '▲';
    case 'high':
      return '■';
  }
}

export function getBustSeverity(prob: number): { label: string; tier: RiskTier } {
  if (prob >= 35) return { label: 'Severe Bust Risk', tier: 'high' };
  if (prob >= 20) return { label: 'Moderate Bust Risk', tier: 'medium' };
  return { label: 'Nominal Stability', tier: 'low' };
}

export function getConfidenceAssessment(confidence: number): string {
  if (confidence >= 80) return 'High model agreement';
  if (confidence >= 65) return 'Moderate ensemble spread';
  return 'High ensemble divergence';
}
