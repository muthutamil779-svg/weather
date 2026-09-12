import { WeatherCondition } from '../types/forecast';

export function formatWeatherCondition(condition: WeatherCondition): string {
  switch (condition) {
    case 'monsoon_depression':
      return 'Monsoon Depression';
    case 'heavy_rain':
      return 'Heavy Rainfall Event';
    case 'cyclone':
      return 'Tropical Cyclone';
    case 'western_disturbance':
      return 'Western Disturbance';
    case 'heatwave':
      return 'Heat Wave';
    case 'active_monsoon':
      return 'Active Monsoon Phase';
    case 'break_monsoon':
      return 'Break Monsoon Phase';
    case 'clear':
      return 'Stable / Clear';
  }
}

export function formatErrorWithUnit(value: number, unit: string): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)} ${unit}`;
}

export function formatCoordinates(coords?: [number, number]): string {
  if (!coords) return 'N/A';
  const [lat, lng] = coords;
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(1)}°${latDir}, ${Math.abs(lng).toFixed(1)}°${lngDir}`;
}

export function formatApiTimestamp(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    }) + ' UTC';
  } catch {
    return isoString;
  }
}
