export interface StateGeo {
  id: string;
  name: string;
  zone: 'North' | 'Central' | 'West' | 'South' | 'East' | 'Northeast';
  path: string;
  center: [number, number]; // [svgX, svgY]
  latLng: [number, number]; // [lat, lng]
}

/**
 * High-precision simplified SVG paths representing the states and regions of India
 * Scaled cleanly into a 650 x 750 meteorological coordinate grid.
 */
export const INDIA_STATES: StateGeo[] = [
  {
    id: 'JK',
    name: 'Jammu & Kashmir / Ladakh',
    zone: 'North',
    path: 'M 210 35 L 245 28 L 295 45 L 340 65 L 330 110 L 290 135 L 255 125 L 225 150 L 195 130 L 180 90 L 195 55 Z',
    center: [255, 80],
    latLng: [34.1, 76.5]
  },
  {
    id: 'HP',
    name: 'Himachal Pradesh',
    zone: 'North',
    path: 'M 225 150 L 255 125 L 285 145 L 270 175 L 240 185 L 220 165 Z',
    center: [250, 158],
    latLng: [31.8, 77.2]
  },
  {
    id: 'PB',
    name: 'Punjab',
    zone: 'North',
    path: 'M 195 155 L 225 150 L 220 185 L 205 210 L 175 195 L 185 165 Z',
    center: [200, 180],
    latLng: [31.1, 75.3]
  },
  {
    id: 'UT',
    name: 'Uttarakhand',
    zone: 'North',
    path: 'M 255 165 L 285 145 L 315 175 L 300 205 L 265 195 Z',
    center: [282, 178],
    latLng: [30.1, 79.2]
  },
  {
    id: 'HR_DL',
    name: 'Haryana & Delhi',
    zone: 'North',
    path: 'M 205 210 L 220 185 L 240 185 L 255 210 L 245 235 L 210 240 Z',
    center: [228, 218],
    latLng: [28.6, 76.9]
  },
  {
    id: 'RJ',
    name: 'Rajasthan',
    zone: 'North',
    path: 'M 130 200 L 185 190 L 210 240 L 230 250 L 215 315 L 170 345 L 125 320 L 115 250 Z',
    center: [170, 270],
    latLng: [26.9, 73.8]
  },
  {
    id: 'UP',
    name: 'Uttar Pradesh',
    zone: 'North',
    path: 'M 245 220 L 290 195 L 350 220 L 385 255 L 360 300 L 310 310 L 260 280 L 245 245 Z',
    center: [305, 255],
    latLng: [26.8, 80.9]
  },
  {
    id: 'BR',
    name: 'Bihar',
    zone: 'East',
    path: 'M 365 255 L 425 255 L 445 285 L 420 320 L 365 310 L 360 275 Z',
    center: [400, 285],
    latLng: [25.6, 85.1]
  },
  {
    id: 'WB',
    name: 'West Bengal',
    zone: 'East',
    path: 'M 430 270 L 460 260 L 455 315 L 460 375 L 435 390 L 415 350 L 425 305 Z',
    center: [442, 335],
    latLng: [23.5, 87.8]
  },
  {
    id: 'SK',
    name: 'Sikkim',
    zone: 'East',
    path: 'M 445 225 L 465 225 L 460 248 L 440 245 Z',
    center: [452, 235],
    latLng: [27.5, 88.5]
  },
  {
    id: 'NE',
    name: 'Assam & Northeast Region',
    zone: 'Northeast',
    path: 'M 470 230 L 530 205 L 580 220 L 610 260 L 575 310 L 530 315 L 480 300 L 465 255 Z',
    center: [530, 260],
    latLng: [26.2, 92.9]
  },
  {
    id: 'GJ',
    name: 'Gujarat',
    zone: 'West',
    path: 'M 85 320 L 145 320 L 165 365 L 140 420 L 115 410 L 95 385 L 60 375 L 65 345 Z',
    center: [115, 365],
    latLng: [22.3, 71.2]
  },
  {
    id: 'MP',
    name: 'Madhya Pradesh',
    zone: 'Central',
    path: 'M 175 330 L 245 285 L 330 305 L 335 375 L 275 415 L 195 400 L 165 355 Z',
    center: [248, 350],
    latLng: [23.5, 77.4]
  },
  {
    id: 'CG',
    name: 'Chhattisgarh',
    zone: 'Central',
    path: 'M 325 335 L 365 330 L 375 415 L 350 475 L 320 445 L 310 380 Z',
    center: [340, 395],
    latLng: [21.3, 81.9]
  },
  {
    id: 'JH',
    name: 'Jharkhand',
    zone: 'East',
    path: 'M 370 310 L 420 315 L 420 360 L 375 365 L 360 330 Z',
    center: [395, 335],
    latLng: [23.6, 85.3]
  },
  {
    id: 'OD',
    name: 'Odisha',
    zone: 'East',
    path: 'M 365 365 L 425 365 L 440 415 L 390 460 L 355 435 L 365 390 Z',
    center: [398, 410],
    latLng: [20.5, 84.8]
  },
  {
    id: 'MH',
    name: 'Maharashtra',
    zone: 'West',
    path: 'M 140 410 L 195 390 L 285 410 L 295 460 L 245 520 L 180 520 L 145 470 Z',
    center: [210, 460],
    latLng: [19.8, 75.7]
  },
  {
    id: 'GA',
    name: 'Goa',
    zone: 'West',
    path: 'M 172 525 L 185 525 L 182 545 L 170 540 Z',
    center: [178, 532],
    latLng: [15.3, 74.0]
  },
  {
    id: 'TG',
    name: 'Telangana',
    zone: 'South',
    path: 'M 265 460 L 320 445 L 335 490 L 295 530 L 260 510 Z',
    center: [295, 485],
    latLng: [17.9, 79.1]
  },
  {
    id: 'AP',
    name: 'Andhra Pradesh',
    zone: 'South',
    path: 'M 320 450 L 380 445 L 365 525 L 315 590 L 280 565 L 305 520 Z',
    center: [330, 520],
    latLng: [15.9, 79.7]
  },
  {
    id: 'KA',
    name: 'Karnataka',
    zone: 'South',
    path: 'M 180 510 L 245 515 L 260 575 L 230 630 L 195 615 L 175 550 Z',
    center: [215, 565],
    latLng: [14.5, 75.9]
  },
  {
    id: 'KL',
    name: 'Kerala',
    zone: 'South',
    path: 'M 195 615 L 220 625 L 210 685 L 190 680 L 185 640 Z',
    center: [200, 650],
    latLng: [10.2, 76.5]
  },
  {
    id: 'TN',
    name: 'Tamil Nadu',
    zone: 'South',
    path: 'M 220 595 L 275 585 L 260 670 L 225 690 L 215 635 Z',
    center: [245, 635],
    latLng: [11.1, 78.7]
  }
];

export interface OffshoreArea {
  id: string;
  name: string;
  center: [number, number];
  latLng: [number, number];
}

export const OFFSHORE_REGIONS: OffshoreArea[] = [
  {
    id: 'BOB_N',
    name: 'North Bay of Bengal',
    center: [460, 430],
    latLng: [19.5, 89.0]
  },
  {
    id: 'BOB_C',
    name: 'Central Bay of Bengal',
    center: [450, 520],
    latLng: [14.0, 87.5]
  },
  {
    id: 'AS_EC',
    name: 'East-Central Arabian Sea',
    center: [105, 490],
    latLng: [16.0, 69.0]
  },
  {
    id: 'AS_NE',
    name: 'Northeast Arabian Sea',
    center: [60, 420],
    latLng: [21.0, 67.5]
  }
];
