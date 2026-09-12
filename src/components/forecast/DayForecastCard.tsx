import React from 'react';
import { TimelineForecast, WeatherCondition } from '../../types/forecast';
import { formatWeatherCondition } from '../../utils/forecastUtils';
import { CloudRain, Wind, Sun, CloudLightning, ShieldAlert, Waves, Flame, Compass } from 'lucide-react';

interface DayForecastCardProps {
  item: TimelineForecast;
  isSelected: boolean;
  onSelect: (day: number) => void;
}

export const getWeatherConditionIcon = (condition: WeatherCondition, size: number = 18) => {
  switch (condition) {
    case 'monsoon_depression':
      return <Compass size={size} style={{ color: 'var(--weather-depression)' }} />;
    case 'heavy_rain':
      return <CloudRain size={size} style={{ color: 'var(--weather-heavy-rain)' }} />;
    case 'cyclone':
      return <Wind size={size} style={{ color: 'var(--weather-cyclone)' }} />;
    case 'western_disturbance':
      return <CloudLightning size={size} style={{ color: 'var(--weather-western-dist)' }} />;
    case 'heatwave':
      return <Flame size={size} style={{ color: 'var(--weather-heatwave)' }} />;
    case 'active_monsoon':
      return <Waves size={size} style={{ color: 'var(--weather-monsoon)' }} />;
    case 'break_monsoon':
      return <ShieldAlert size={size} style={{ color: 'var(--weather-break)' }} />;
    case 'clear':
    default:
      return <Sun size={size} style={{ color: '#fbbf24' }} />;
  }
};

export const DayForecastCard: React.FC<DayForecastCardProps> = ({
  item,
  isSelected,
  onSelect
}) => {
  const isHighBust = item.bustProbability >= 35;
  const isMediumBust = item.bustProbability >= 20;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-label={`Day ${item.day}, ${item.date}, Condition: ${formatWeatherCondition(item.condition)}, Confidence: ${item.confidence}%, Bust Probability: ${item.bustProbability}%`}
      onClick={() => onSelect(item.day)}
      className="fg-card"
      style={{
        flex: '0 0 145px',
        padding: '12px 14px',
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        background: isSelected ? '#1b2333' : 'var(--card-bg)',
        border: isSelected ? '1px solid var(--accent-blue)' : '1px solid var(--card-border)',
        boxShadow: isSelected ? '0 4px 18px rgba(59, 156, 255, 0.25)' : 'none',
        transform: isSelected ? 'translateY(-3px)' : 'none',
        transition: 'all var(--transition-normal)',
        position: 'relative'
      }}
    >
      {/* Selected Indicator dot */}
      {isSelected && (
        <div 
          style={{
            position: 'absolute',
            top: '6px',
            right: '8px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--accent-blue)',
            boxShadow: '0 0 8px var(--accent-blue)'
          }}
        />
      )}

      {/* Header Day & Date */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
          Day {item.day}
        </span>
        <span className="mono-text" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
          {item.date}
        </span>
      </div>

      {/* Condition Icon and Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {getWeatherConditionIcon(item.condition, 18)}
        <span 
          style={{ 
            fontSize: '11px', 
            fontWeight: '500', 
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
          title={formatWeatherCondition(item.condition)}
        >
          {formatWeatherCondition(item.condition)}
        </span>
      </div>

      {/* Progress & Confidence Metrics */}
      <div style={{ marginTop: '2px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Confidence</span>
          <span className="mono-text" style={{ fontWeight: '600', color: item.confidence >= 70 ? 'var(--risk-low)' : 'var(--risk-medium)' }}>
            {item.confidence}%
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Bust Risk</span>
          <span 
            className="mono-text" 
            style={{ 
              fontWeight: '600', 
              color: isHighBust ? 'var(--risk-high)' : isMediumBust ? 'var(--risk-medium)' : 'var(--risk-low)' 
            }}
          >
            {item.bustProbability}%
          </span>
        </div>

        {/* Mini progress bar */}
        <div 
          style={{ 
            width: '100%', 
            height: '3px', 
            background: 'rgba(255, 255, 255, 0.08)', 
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            marginTop: '2px'
          }}
        >
          <div 
            style={{ 
              width: `${item.confidence}%`, 
              height: '100%', 
              backgroundColor: item.confidence >= 70 ? 'var(--accent-blue)' : item.confidence >= 55 ? 'var(--risk-medium)' : 'var(--risk-high)'
            }} 
          />
        </div>
      </div>
    </button>
  );
};
