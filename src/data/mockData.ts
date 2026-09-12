import { ForecastData, RegionForecast, TimelineForecast, WeatherSystem } from '../types/forecast';
import { INDIA_STATES } from './indiaGeo';

export const INITIAL_WEATHER_SYSTEMS: WeatherSystem[] = [
  {
    id: 'ws-bob-dep',
    name: 'Depression BOB-02',
    type: 'monsoon_depression',
    location: 'Northwest Bay of Bengal off Odisha Coast',
    coordinates: [19.8, 87.2],
    intensity: 'high',
    movement: 'West-Northwest at 16 km/h',
    status: 'intensifying'
  },
  {
    id: 'ws-konkan-surge',
    name: 'Offshore Trough & Active Surge',
    type: 'heavy_rain',
    location: 'Konkan Coast & Ghats (Maharashtra/Goa)',
    coordinates: [17.5, 73.1],
    intensity: 'severe',
    movement: 'Stationary / Oscillating',
    status: 'active'
  },
  {
    id: 'ws-wd-himalaya',
    name: 'Mid-Latitude Western Disturbance',
    type: 'western_disturbance',
    location: 'Northern Pakistan & Jammu & Kashmir',
    coordinates: [33.5, 75.0],
    intensity: 'moderate',
    movement: 'East-Northeast at 28 km/h',
    status: 'active'
  },
  {
    id: 'ws-ar-cyclone',
    name: 'Deep Depression AS-01',
    type: 'cyclone',
    location: 'East-Central Arabian Sea',
    coordinates: [16.2, 68.8],
    intensity: 'high',
    movement: 'North-Northwest at 14 km/h',
    status: 'developing'
  },
  {
    id: 'ws-rj-heatwave',
    name: 'Thermal Low & Heat Advection',
    type: 'heatwave',
    location: 'West Rajasthan & Thar Desert',
    coordinates: [27.2, 71.8],
    intensity: 'moderate',
    movement: 'Persistent',
    status: 'active'
  }
];

export const INITIAL_TIMELINE: TimelineForecast[] = [
  { day: 1, date: '12 Sep', confidence: 91, bustProbability: 9, condition: 'monsoon_depression' },
  { day: 2, date: '13 Sep', confidence: 88, bustProbability: 12, condition: 'heavy_rain' },
  { day: 3, date: '14 Sep', confidence: 84, bustProbability: 16, condition: 'active_monsoon' },
  { day: 4, date: '15 Sep', confidence: 79, bustProbability: 21, condition: 'cyclone' },
  { day: 5, date: '16 Sep', confidence: 74, bustProbability: 26, condition: 'monsoon_depression' },
  { day: 6, date: '17 Sep', confidence: 68, bustProbability: 32, condition: 'heavy_rain' },
  { day: 7, date: '18 Sep', confidence: 62, bustProbability: 38, condition: 'western_disturbance' },
  { day: 8, date: '19 Sep', confidence: 57, bustProbability: 43, condition: 'break_monsoon' },
  { day: 9, date: '20 Sep', confidence: 51, bustProbability: 49, condition: 'heatwave' },
  { day: 10, date: '21 Sep', confidence: 46, bustProbability: 54, condition: 'clear' }
];

export const INITIAL_REGIONS: RegionForecast[] = [
  {
    id: 'MP',
    name: 'Madhya Pradesh',
    riskTier: 'high',
    confidence: 62,
    bustProbability: 38,
    historicalError: { value: 14.8, unit: 'mm' },
    weatherSystem: 'Depression BOB-02',
    coordinates: [23.5, 77.4],
    forecastDay: 5
  },
  {
    id: 'OD',
    name: 'Odisha',
    riskTier: 'high',
    confidence: 65,
    bustProbability: 35,
    historicalError: { value: 18.2, unit: 'mm' },
    weatherSystem: 'Depression BOB-02',
    coordinates: [20.5, 84.8],
    forecastDay: 3
  },
  {
    id: 'MH',
    name: 'Maharashtra',
    riskTier: 'high',
    confidence: 60,
    bustProbability: 40,
    historicalError: { value: 24.5, unit: 'mm' },
    weatherSystem: 'Offshore Trough & Active Surge',
    coordinates: [19.8, 75.7],
    forecastDay: 4
  },
  {
    id: 'GJ',
    name: 'Gujarat',
    riskTier: 'high',
    confidence: 64,
    bustProbability: 36,
    historicalError: { value: 12.6, unit: 'mm' },
    weatherSystem: 'Deep Depression AS-01',
    coordinates: [22.3, 71.2],
    forecastDay: 5
  },
  {
    id: 'CG',
    name: 'Chhattisgarh',
    riskTier: 'medium',
    confidence: 72,
    bustProbability: 28,
    historicalError: { value: 9.4, unit: 'mm' },
    weatherSystem: 'Depression BOB-02',
    coordinates: [21.3, 81.9],
    forecastDay: 4
  },
  {
    id: 'WB',
    name: 'West Bengal',
    riskTier: 'medium',
    confidence: 74,
    bustProbability: 26,
    historicalError: { value: 8.8, unit: 'mm' },
    weatherSystem: 'Depression BOB-02',
    coordinates: [23.5, 87.8],
    forecastDay: 3
  },
  {
    id: 'JK',
    name: 'Jammu & Kashmir / Ladakh',
    riskTier: 'medium',
    confidence: 69,
    bustProbability: 31,
    historicalError: { value: 3.8, unit: '°C' },
    weatherSystem: 'Mid-Latitude Western Disturbance',
    coordinates: [34.1, 76.5],
    forecastDay: 4
  },
  {
    id: 'HP',
    name: 'Himachal Pradesh',
    riskTier: 'medium',
    confidence: 71,
    bustProbability: 29,
    historicalError: { value: 11.2, unit: 'mm' },
    weatherSystem: 'Mid-Latitude Western Disturbance',
    coordinates: [31.8, 77.2],
    forecastDay: 4
  },
  {
    id: 'UT',
    name: 'Uttarakhand',
    riskTier: 'medium',
    confidence: 73,
    bustProbability: 27,
    historicalError: { value: 10.5, unit: 'mm' },
    weatherSystem: 'Mid-Latitude Western Disturbance',
    coordinates: [30.1, 79.2],
    forecastDay: 4
  },
  {
    id: 'RJ',
    name: 'Rajasthan',
    riskTier: 'medium',
    confidence: 75,
    bustProbability: 25,
    historicalError: { value: 2.4, unit: '°C' },
    weatherSystem: 'Thermal Low & Heat Advection',
    coordinates: [26.9, 73.8],
    forecastDay: 5
  },
  {
    id: 'UP',
    name: 'Uttar Pradesh',
    riskTier: 'low',
    confidence: 82,
    bustProbability: 18,
    historicalError: { value: 5.2, unit: 'mm' },
    weatherSystem: null,
    coordinates: [26.8, 80.9],
    forecastDay: 5
  },
  {
    id: 'BR',
    name: 'Bihar',
    riskTier: 'low',
    confidence: 84,
    bustProbability: 16,
    historicalError: { value: 4.6, unit: 'mm' },
    weatherSystem: null,
    coordinates: [25.6, 85.1],
    forecastDay: 5
  },
  {
    id: 'JH',
    name: 'Jharkhand',
    riskTier: 'low',
    confidence: 80,
    bustProbability: 20,
    historicalError: { value: 6.1, unit: 'mm' },
    weatherSystem: null,
    coordinates: [23.6, 85.3],
    forecastDay: 5
  },
  {
    id: 'PB',
    name: 'Punjab',
    riskTier: 'low',
    confidence: 86,
    bustProbability: 14,
    historicalError: { value: 3.1, unit: 'mm' },
    weatherSystem: null,
    coordinates: [31.1, 75.3],
    forecastDay: 5
  },
  {
    id: 'HR_DL',
    name: 'Haryana & Delhi',
    riskTier: 'low',
    confidence: 85,
    bustProbability: 15,
    historicalError: { value: 3.5, unit: 'mm' },
    weatherSystem: null,
    coordinates: [28.6, 76.9],
    forecastDay: 5
  },
  {
    id: 'TG',
    name: 'Telangana',
    riskTier: 'low',
    confidence: 83,
    bustProbability: 17,
    historicalError: { value: 4.8, unit: 'mm' },
    weatherSystem: null,
    coordinates: [17.9, 79.1],
    forecastDay: 5
  },
  {
    id: 'AP',
    name: 'Andhra Pradesh',
    riskTier: 'low',
    confidence: 81,
    bustProbability: 19,
    historicalError: { value: 5.5, unit: 'mm' },
    weatherSystem: null,
    coordinates: [15.9, 79.7],
    forecastDay: 5
  },
  {
    id: 'KA',
    name: 'Karnataka',
    riskTier: 'low',
    confidence: 82,
    bustProbability: 18,
    historicalError: { value: 6.4, unit: 'mm' },
    weatherSystem: null,
    coordinates: [14.5, 75.9],
    forecastDay: 5
  },
  {
    id: 'KL',
    name: 'Kerala',
    riskTier: 'medium',
    confidence: 76,
    bustProbability: 24,
    historicalError: { value: 12.0, unit: 'mm' },
    weatherSystem: 'Offshore Trough & Active Surge',
    coordinates: [10.2, 76.5],
    forecastDay: 4
  },
  {
    id: 'TN',
    name: 'Tamil Nadu',
    riskTier: 'low',
    confidence: 88,
    bustProbability: 12,
    historicalError: { value: 2.1, unit: 'mm' },
    weatherSystem: null,
    coordinates: [11.1, 78.7],
    forecastDay: 5
  },
  {
    id: 'NE',
    name: 'Assam & Northeast Region',
    riskTier: 'medium',
    confidence: 70,
    bustProbability: 30,
    historicalError: { value: 14.2, unit: 'mm' },
    weatherSystem: null,
    coordinates: [26.2, 92.9],
    forecastDay: 5
  }
];

export const INITIAL_FORECAST_DATA: ForecastData = {
  updatedAt: '2026-09-12T10:00:00Z',
  forecastSummary: {
    confidence: 78,
    bustProbability: 22,
    activeSystems: 5,
    highRiskRegions: 4,
    trend: {
      confidence: 6,
      bustProbability: -8
    }
  },
  regions: INITIAL_REGIONS,
  timeline: INITIAL_TIMELINE,
  weatherSystems: INITIAL_WEATHER_SYSTEMS,
  aiInsight: {
    summary: 'Forecast confidence is decreasing over central India due to increasing rainfall variability and rapid pressure changes.',
    factors: [
      {
        name: 'Historical Error',
        weight: 22,
        description: 'Persistent 14-day numerical model underestimation of precipitation across river catchments.'
      },
      {
        name: 'Rainfall Variability',
        weight: 18,
        description: 'Increasing spatial rainfall variability is reducing mesoscale convective confidence.'
      },
      {
        name: 'Pressure Change',
        weight: 16,
        description: 'Rapid cyclogenesis and baroclinic deepening in the Bay of Bengal exceeding standard NWP spread.'
      },
      {
        name: 'Wind Pattern',
        weight: 14,
        description: 'Sudden low-level jet velocity shift over the Arabian Sea modifying moisture advection trajectory.'
      },
      {
        name: 'Lead Time',
        weight: 10,
        description: 'Beyond Day 4, ensemble divergence escalates due to non-linear tropical convective parameterization.'
      }
    ],
    riskLevel: 'high',
    recommendedRegion: 'Central India (Madhya Pradesh & Vidarbha)',
    explanation: 'Atmospheric instability triggered by Bay of Bengal Depression BOB-02 coupling with the Arabian Sea offshore trough introduces multi-model variance in rainfall loci. Medium-range ensemble suites (ECMWF, GFS, NCMRWF) diverge by >120 km in track position, resulting in elevated probability of a severe quantitative precipitation forecast bust.'
  },
  historicalCharts: {
    forecastError: [
      { date: '01 Sep', error: 4.2 },
      { date: '02 Sep', error: 5.1 },
      { date: '03 Sep', error: 4.8 },
      { date: '04 Sep', error: 6.9 },
      { date: '05 Sep', error: 8.4 },
      { date: '06 Sep', error: 12.1 },
      { date: '07 Sep', error: 10.8 },
      { date: '08 Sep', error: 14.5 },
      { date: '09 Sep', error: 13.2 },
      { date: '10 Sep', error: 16.7 },
      { date: '11 Sep', error: 15.1 },
      { date: '12 Sep', error: 14.8 }
    ],
    rainfallObservedVsPredicted: [
      { date: '05 Sep', observed: 28, predicted: 32 },
      { date: '06 Sep', observed: 45, predicted: 34 },
      { date: '07 Sep', observed: 72, predicted: 48 },
      { date: '08 Sep', observed: 110, predicted: 62 },
      { date: '09 Sep', observed: 95, predicted: 70 },
      { date: '10 Sep', observed: 130, predicted: 82 },
      { date: '11 Sep', observed: 85, predicted: 90 },
      { date: '12 Sep', observed: 105, predicted: 75 }
    ],
    tempError: [
      { date: '05 Sep', error: 0.8 },
      { date: '06 Sep', error: 1.2 },
      { date: '07 Sep', error: 1.5 },
      { date: '08 Sep', error: 2.1 },
      { date: '09 Sep', error: 1.9 },
      { date: '10 Sep', error: 2.4 },
      { date: '11 Sep', error: 2.2 },
      { date: '12 Sep', error: 2.5 }
    ],
    windError: [
      { date: '05 Sep', error: 2.1 },
      { date: '06 Sep', error: 3.4 },
      { date: '07 Sep', error: 4.2 },
      { date: '08 Sep', error: 5.8 },
      { date: '09 Sep', error: 6.1 },
      { date: '10 Sep', error: 7.5 },
      { date: '11 Sep', error: 6.9 },
      { date: '12 Sep', error: 7.2 }
    ],
    confidenceVsActual: [
      { date: '05 Sep', confidence: 88, actualAccuracy: 86 },
      { date: '06 Sep', confidence: 85, actualAccuracy: 78 },
      { date: '07 Sep', confidence: 82, actualAccuracy: 71 },
      { date: '08 Sep', confidence: 79, actualAccuracy: 64 },
      { date: '09 Sep', confidence: 75, actualAccuracy: 68 },
      { date: '10 Sep', confidence: 71, actualAccuracy: 59 },
      { date: '11 Sep', confidence: 76, actualAccuracy: 72 },
      { date: '12 Sep', confidence: 78, actualAccuracy: 74 }
    ]
  }
};
