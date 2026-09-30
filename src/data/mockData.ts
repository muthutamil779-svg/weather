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
  },
  ensemblePlumes: [
    { day: 1, date: '12 Sep', ecmwfMean: 34, gfsMean: 32, ncmrwfMean: 33, p10: 28, p25: 31, p75: 36, p90: 40, observed: 35 },
    { day: 2, date: '13 Sep', ecmwfMean: 48, gfsMean: 42, ncmrwfMean: 45, p10: 36, p25: 41, p75: 52, p90: 58, observed: 46 },
    { day: 3, date: '14 Sep', ecmwfMean: 68, gfsMean: 54, ncmrwfMean: 62, p10: 45, p25: 55, p75: 78, p90: 88, observed: 71 },
    { day: 4, date: '15 Sep', ecmwfMean: 95, gfsMean: 68, ncmrwfMean: 82, p10: 52, p25: 69, p75: 110, p90: 132 },
    { day: 5, date: '16 Sep', ecmwfMean: 125, gfsMean: 72, ncmrwfMean: 98, p10: 58, p25: 78, p75: 142, p90: 178 },
    { day: 6, date: '17 Sep', ecmwfMean: 110, gfsMean: 55, ncmrwfMean: 86, p10: 42, p25: 68, p75: 135, p90: 165 },
    { day: 7, date: '18 Sep', ecmwfMean: 85, gfsMean: 48, ncmrwfMean: 70, p10: 35, p25: 52, p75: 105, p90: 140 },
    { day: 8, date: '19 Sep', ecmwfMean: 60, gfsMean: 38, ncmrwfMean: 52, p10: 24, p25: 40, p75: 80, p90: 112 },
    { day: 9, date: '20 Sep', ecmwfMean: 42, gfsMean: 30, ncmrwfMean: 38, p10: 18, p25: 28, p75: 58, p90: 84 },
    { day: 10, date: '21 Sep', ecmwfMean: 32, gfsMean: 24, ncmrwfMean: 28, p10: 12, p25: 20, p75: 45, p90: 68 }
  ],
  modelMetrics: [
    {
      modelName: 'ECMWF EPS',
      institution: 'European Centre for Medium-Range Weather Forecasts',
      memberCount: 51,
      gridResolution: '0.1° (~9 km)',
      rmse24hr: 8.4,
      trackErrorKm: 42,
      biasMm: -2.1,
      divergenceContributionPct: 48
    },
    {
      modelName: 'NCEP GEFS',
      institution: 'National Centers for Environmental Prediction (NOAA)',
      memberCount: 31,
      gridResolution: '0.25° (~28 km)',
      rmse24hr: 12.8,
      trackErrorKm: 94,
      biasMm: -8.4,
      divergenceContributionPct: 32
    },
    {
      modelName: 'NCMRWF NEPS',
      institution: 'National Centre for Medium Range Weather Forecasting (India)',
      memberCount: 23,
      gridResolution: '12 km (South Asia Regional)',
      rmse24hr: 9.6,
      trackErrorKm: 58,
      biasMm: +1.4,
      divergenceContributionPct: 20
    }
  ],
  shapValues: [
    {
      feature: 'Low-Level Jet Velocity Anomaly (850 hPa)',
      category: 'kinematic',
      importance: 86,
      impactDirection: 'positive_bust_risk',
      description: 'Sudden 18 m/s jet surge over Arabian Sea advecting moisture beyond model equilibrium.'
    },
    {
      feature: 'Convective Instability (CAPE > 2,600 J/kg)',
      category: 'thermodynamic',
      importance: 79,
      impactDirection: 'positive_bust_risk',
      description: 'Severe convective energy triggering localized unparameterized mesoscale squalls.'
    },
    {
      feature: 'Western Ghats Orographic Moisture Barrier',
      category: 'orographic',
      importance: 72,
      impactDirection: 'positive_bust_risk',
      description: 'Steep terrain forcing non-linear precipitation pooling along windward slopes.'
    },
    {
      feature: 'Baroclinic Deepening Rate (Bay of Bengal)',
      category: 'synoptic',
      importance: 68,
      impactDirection: 'positive_bust_risk',
      description: 'Central pressure dropping 6 hPa / 12h exceeding deterministic global ensemble tracks.'
    },
    {
      feature: 'Mid-Tropospheric Moisture Shear (700-500 hPa)',
      category: 'thermodynamic',
      importance: 54,
      impactDirection: 'negative_bust_risk',
      description: 'Dry air intrusion from northwest dampening convective bust potential in northern plains.'
    },
    {
      feature: 'Lead-Time Horizon Decay (> Day 4)',
      category: 'synoptic',
      importance: 62,
      impactDirection: 'positive_bust_risk',
      description: 'Non-linear chaotic amplification escalating track spread past 96 hours.'
    }
  ],
  operationalBulletins: [
    {
      id: 'ob-2026-09-12-01',
      bulletinNumber: 'IMD-SDMA-ALERT/2026/09-BOB02',
      issueTime: '2026-09-12T06:00:00Z',
      validUntil: '2026-09-15T06:00:00Z',
      synopticSituation: 'Depression BOB-02 over Northwest Bay of Bengal intensifying into Deep Depression. High model divergence (ECMWF vs GFS +140km) indicating acute forecast bust risk for Odisha & Madhya Pradesh.',
      affectedRegions: ['Odisha', 'Madhya Pradesh', 'Maharashtra', 'Chhattisgarh'],
      severity: 'high',
      alertColor: '#ef4444',
      ndrfDeploymentNotice: 'Pre-position 8 NDRF battalions along Mahanadi basin and Narmada river catchments by 18:00 IST.',
      districtAdvisories: [
        {
          district: 'Puri & Jagatsinghpur (Odisha)',
          warningLevel: 'Red Alert',
          actionProtocol: 'Total suspension of coastal fishing operations; evacuate low-lying villages within 5km of coastline.'
        },
        {
          district: 'Hoshangabad & Sehore (Madhya Pradesh)',
          warningLevel: 'Orange Alert',
          actionProtocol: 'Regulate dam sluice gates; activate 24/7 district flood control rooms; notify relief camp operators.'
        },
        {
          district: 'Raigad & Ratnagiri (Konkan)',
          warningLevel: 'Orange Alert',
          actionProtocol: 'Ghat section landslide monitoring; NDRF teams on immediate standby for flash flood rescue.'
        }
      ]
    },
    {
      id: 'ob-2026-09-12-02',
      bulletinNumber: 'IMD-SDMA-ALERT/2026/09-WD01',
      issueTime: '2026-09-12T08:30:00Z',
      validUntil: '2026-09-14T12:00:00Z',
      synopticSituation: 'Western Disturbance approaching Jammu & Kashmir and Himachal Pradesh with high orographic freezing level variance.',
      affectedRegions: ['Himachal Pradesh', 'Uttarakhand', 'Jammu & Kashmir'],
      severity: 'medium',
      alertColor: '#eab308',
      ndrfDeploymentNotice: 'High-altitude mountain rescue teams placed on 2-hour alert status.',
      districtAdvisories: [
        {
          district: 'Kullu & Kinnaur (Himachal Pradesh)',
          warningLevel: 'Yellow Alert',
          actionProtocol: 'Advisory issued to tourists; restrict highway traffic across high passes during night hours.'
        }
      ]
    }
  ],
  stationObservations: [
    {
      id: 'st-bbsr',
      name: 'Bhubaneswar Airport (VEBS)',
      subdivision: 'Odisha',
      coordinates: [20.24, 85.81],
      observedRainfallMm: 112.4,
      rawGfsQpfMm: 64.0,
      rawEcmwfQpfMm: 135.0,
      correctedQpfMm: 118.2,
      biasVarianceMm: -5.8,
      verificationStatus: 'verified'
    },
    {
      id: 'st-cuttack',
      name: 'Cuttack Observational Ground',
      subdivision: 'Odisha',
      coordinates: [20.46, 85.88],
      observedRainfallMm: 124.6,
      rawGfsQpfMm: 72.0,
      rawEcmwfQpfMm: 142.0,
      correctedQpfMm: 129.0,
      biasVarianceMm: -4.4,
      verificationStatus: 'verified'
    },
    {
      id: 'st-bhopal',
      name: 'Bhopal Bairagarh (VABP)',
      subdivision: 'Madhya Pradesh',
      coordinates: [23.28, 77.33],
      observedRainfallMm: 88.2,
      rawGfsQpfMm: 38.0,
      rawEcmwfQpfMm: 104.0,
      correctedQpfMm: 85.4,
      biasVarianceMm: +2.8,
      verificationStatus: 'verified'
    },
    {
      id: 'st-jabalpur',
      name: 'Jabalpur Station (VAJB)',
      subdivision: 'Madhya Pradesh',
      coordinates: [23.18, 79.95],
      observedRainfallMm: 95.0,
      rawGfsQpfMm: 45.0,
      rawEcmwfQpfMm: 115.0,
      correctedQpfMm: 98.6,
      biasVarianceMm: -3.6,
      verificationStatus: 'verified'
    },
    {
      id: 'st-mumbai-colaba',
      name: 'Mumbai Colaba Observatory',
      subdivision: 'Maharashtra (Konkan)',
      coordinates: [18.90, 72.81],
      observedRainfallMm: 148.5,
      rawGfsQpfMm: 92.0,
      rawEcmwfQpfMm: 175.0,
      correctedQpfMm: 144.0,
      biasVarianceMm: +4.5,
      verificationStatus: 'verified'
    },
    {
      id: 'st-pune',
      name: 'Pune Shivajinagar AWS',
      subdivision: 'Maharashtra (Madhya)',
      coordinates: [18.53, 73.85],
      observedRainfallMm: 52.4,
      rawGfsQpfMm: 32.0,
      rawEcmwfQpfMm: 68.0,
      correctedQpfMm: 54.1,
      biasVarianceMm: -1.7,
      verificationStatus: 'verified'
    },
    {
      id: 'st-delhi-safdarjung',
      name: 'Delhi Safdarjung Base (VIDD)',
      subdivision: 'Haryana & Delhi',
      coordinates: [28.58, 77.20],
      observedRainfallMm: 14.2,
      rawGfsQpfMm: 12.0,
      rawEcmwfQpfMm: 18.0,
      correctedQpfMm: 15.0,
      biasVarianceMm: -0.8,
      verificationStatus: 'verified'
    },
    {
      id: 'st-shimla',
      name: 'Shimla Ridge IMD AWS',
      subdivision: 'Himachal Pradesh',
      coordinates: [31.10, 77.17],
      observedRainfallMm: 42.6,
      rawGfsQpfMm: 22.0,
      rawEcmwfQpfMm: 58.0,
      correctedQpfMm: 44.8,
      biasVarianceMm: -2.2,
      verificationStatus: 'verified'
    }
  ]
};
