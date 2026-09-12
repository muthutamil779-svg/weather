import React, { useState } from 'react';
import { RegionForecast, WeatherSystem } from '../../types/forecast';
import { INDIA_STATES, OFFSHORE_REGIONS, StateGeo } from '../../data/indiaGeo';
import { RegionInfoCard } from './RegionInfoCard';
import { getRiskColor } from '../../utils/riskUtils';
import { ZoomIn, ZoomOut, RotateCcw, Layers, Compass } from 'lucide-react';

interface IndiaRiskMapProps {
  regions: RegionForecast[];
  weatherSystems: WeatherSystem[];
  selectedRegionId: string | null;
  onSelectRegion: (id: string) => void;
}

export const IndiaRiskMap: React.FC<IndiaRiskMapProps> = ({
  regions,
  weatherSystems,
  selectedRegionId,
  onSelectRegion
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [showSystems, setShowSystems] = useState<boolean>(true);
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);

  const selectedRegion = regions.find(r => r.id === selectedRegionId) || null;

  // Map state ID to region forecast
  const regionMap = new Map<string, RegionForecast>();
  regions.forEach(r => regionMap.set(r.id, r));

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 2.0));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.75));
  const handleReset = () => setZoom(1);

  // Convert lat/long to rough SVG [X, Y] within map viewbox (650 x 750)
  // Lat: ~8 to 37 -> Y: 680 to 40
  // Lng: ~68 to 97 -> X: 70 to 600
  const latLngToSvg = (lat: number, lng: number): [number, number] => {
    const minLat = 7.5;
    const maxLat = 37.0;
    const minLng = 67.0;
    const maxLng = 97.5;

    const y = 690 - ((lat - minLat) / (maxLat - minLat)) * 640;
    const x = 70 + ((lng - minLng) / (maxLng - minLng)) * 530;
    return [x, y];
  };

  return (
    <div className="fg-panel geo-visualizer-container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Map Control Bar */}
      <div 
        style={{
          position: 'absolute',
          top: '14px',
          left: '16px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <div>
          <span className="subtle-title">Spatial Risk Projection</span>
          <h2 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
            India Meteorological Risk Field
          </h2>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(18, 22, 31, 0.85)', padding: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--card-border)' }}>
          <button 
            onClick={handleZoomIn} 
            title="Zoom in"
            style={{ padding: '5px', color: 'var(--text-secondary)', display: 'flex' }}
          >
            <ZoomIn size={15} />
          </button>
          <button 
            onClick={handleZoomOut} 
            title="Zoom out"
            style={{ padding: '5px', color: 'var(--text-secondary)', display: 'flex' }}
          >
            <ZoomOut size={15} />
          </button>
          <button 
            onClick={handleReset} 
            title="Reset projection"
            style={{ padding: '5px', color: 'var(--text-secondary)', display: 'flex' }}
          >
            <RotateCcw size={15} />
          </button>
          <button 
            onClick={() => setShowSystems(!showSystems)} 
            title="Toggle Synoptic Systems Layer"
            style={{ 
              padding: '5px 8px', 
              fontSize: '11px', 
              color: showSystems ? 'var(--accent-cyan)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Layers size={13} />
            <span>Systems</span>
          </button>
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div 
        style={{
          width: '100%',
          height: '100%',
          minHeight: '520px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 45% 45%, #151b27 0%, #0c1017 100%)',
          userSelect: 'none'
        }}
      >
        <svg
          viewBox="0 0 650 750"
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '560px',
            transform: `scale(${zoom})`,
            transition: 'transform 0.3s ease-out',
            transformOrigin: 'center center'
          }}
        >
          {/* Subtle lat-long grid lines */}
          <g opacity="0.12" stroke="#3b9cff" strokeWidth="0.8" strokeDasharray="3 4">
            <line x1="50" y1="150" x2="600" y2="150" />
            <line x1="50" y1="300" x2="600" y2="300" />
            <line x1="50" y1="450" x2="600" y2="450" />
            <line x1="50" y1="600" x2="600" y2="600" />
            <line x1="180" y1="50" x2="180" y2="700" />
            <line x1="330" y1="50" x2="330" y2="700" />
            <line x1="480" y1="50" x2="480" y2="700" />
          </g>

          {/* Oceanic Basins Labels */}
          <text x="75" y="520" fill="#3b9cff" opacity="0.4" fontSize="13" fontWeight="600" letterSpacing="1.5">
            ARABIAN SEA
          </text>
          <text x="440" y="540" fill="#3b9cff" opacity="0.4" fontSize="13" fontWeight="600" letterSpacing="1.5">
            BAY OF BENGAL
          </text>
          <text x="230" y="730" fill="#3b9cff" opacity="0.35" fontSize="12" fontWeight="600" letterSpacing="2">
            INDIAN OCEAN
          </text>

          {/* Offshore reference zones */}
          {OFFSHORE_REGIONS.map(zone => (
            <g key={zone.id}>
              <circle cx={zone.center[0]} cy={zone.center[1]} r="24" fill="none" stroke="rgba(59, 156, 255, 0.15)" strokeDasharray="2 3" />
              <text x={zone.center[0]} y={zone.center[1] + 32} textAnchor="middle" fill="#8b93a3" fontSize="9" opacity="0.6">
                {zone.name}
              </text>
            </g>
          ))}

          {/* Indian States Geometry */}
          <g id="states-layer">
            {INDIA_STATES.map((state: StateGeo) => {
              const forecast = regionMap.get(state.id);
              const riskTier = forecast ? forecast.riskTier : 'low';
              const isSelected = selectedRegionId === state.id;
              const isHovered = hoveredStateId === state.id;

              // Color mapping
              let fillColor = 'rgba(34, 197, 94, 0.18)'; // low
              let strokeColor = 'rgba(34, 197, 94, 0.45)';
              if (riskTier === 'high') {
                fillColor = 'rgba(239, 68, 68, 0.35)';
                strokeColor = 'rgba(239, 68, 68, 0.75)';
              } else if (riskTier === 'medium') {
                fillColor = 'rgba(234, 179, 8, 0.25)';
                strokeColor = 'rgba(234, 179, 8, 0.6)';
              }

              if (isSelected) {
                fillColor = riskTier === 'high' ? 'rgba(239, 68, 68, 0.55)' : 'rgba(59, 156, 255, 0.45)';
                strokeColor = '#3b9cff';
              } else if (isHovered) {
                fillColor = 'rgba(59, 156, 255, 0.3)';
                strokeColor = '#60a5fa';
              }

              return (
                <g 
                  key={state.id}
                  onClick={() => onSelectRegion(state.id)}
                  onMouseEnter={() => setHoveredStateId(state.id)}
                  onMouseLeave={() => setHoveredStateId(null)}
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                  role="button"
                  aria-label={`${state.name}, Risk: ${riskTier}`}
                >
                  <path
                    d={state.path}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelected ? '2.5' : '1.2'}
                    strokeLinejoin="round"
                    filter={isSelected ? 'drop-shadow(0px 0px 8px rgba(59, 156, 255, 0.5))' : undefined}
                  />

                  {/* Centered state label & bust % badge */}
                  <text
                    x={state.center[0]}
                    y={state.center[1]}
                    textAnchor="middle"
                    fill="#e6e9ef"
                    fontSize={isSelected ? '11' : '10'}
                    fontWeight={isSelected ? '700' : '500'}
                    style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
                  >
                    {state.id}
                  </text>
                  {forecast && (
                    <text
                      x={state.center[0]}
                      y={state.center[1] + 12}
                      textAnchor="middle"
                      fill={riskTier === 'high' ? '#fca5a5' : riskTier === 'medium' ? '#fde047' : '#86efac'}
                      fontSize="9"
                      fontWeight="600"
                      className="mono-text"
                      style={{ pointerEvents: 'none' }}
                    >
                      {forecast.bustProbability}%
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* Active Synoptic Weather System Markers */}
          {showSystems && (
            <g id="systems-layer">
              {weatherSystems.map((system) => {
                const [sx, sy] = latLngToSvg(system.coordinates[0], system.coordinates[1]);

                if (system.type === 'cyclone') {
                  // Rotating cyclone rings
                  return (
                    <g key={system.id} transform={`translate(${sx}, ${sy})`}>
                      <circle r="22" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.8" className="ambient-pulse" />
                      <circle r="14" fill="none" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.9" />
                      <circle r="5" fill="#f43f5e" />
                      <text x="18" y="-4" fill="#f43f5e" fontSize="10" fontWeight="700" style={{ textShadow: '0 1px 3px black' }}>
                        {system.name}
                      </text>
                    </g>
                  );
                }

                if (system.type === 'monsoon_depression') {
                  // Circular pressure system isobars
                  return (
                    <g key={system.id} transform={`translate(${sx}, ${sy})`}>
                      <circle r="28" fill="rgba(139, 92, 246, 0.08)" stroke="#8b5cf6" strokeWidth="1.2" strokeDasharray="4 2" />
                      <circle r="18" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="1.5" className="ambient-pulse" />
                      <circle r="6" fill="#8b5cf6" />
                      <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">L</text>
                      <text x="14" y="-12" fill="#c4b5fd" fontSize="10" fontWeight="600" style={{ textShadow: '0 1px 3px black' }}>
                        {system.name}
                      </text>
                    </g>
                  );
                }

                if (system.type === 'heavy_rain') {
                  // Rainfall beacon
                  return (
                    <g key={system.id} transform={`translate(${sx}, ${sy})`}>
                      <circle r="16" fill="rgba(2, 132, 199, 0.2)" stroke="#0284c7" strokeWidth="1.5" className="ambient-pulse" />
                      <circle r="5" fill="#0284c7" />
                      <text x="12" y="4" fill="#38bdf8" fontSize="10" fontWeight="600" style={{ textShadow: '0 1px 3px black' }}>
                        {system.name}
                      </text>
                    </g>
                  );
                }

                // Generic synoptic system pin
                return (
                  <g key={system.id} transform={`translate(${sx}, ${sy})`}>
                    <circle r="12" fill="rgba(249, 115, 22, 0.2)" stroke="#f97316" strokeWidth="1.5" />
                    <circle r="4" fill="#f97316" />
                    <text x="10" y="4" fill="#fdba74" fontSize="9" fontWeight="600">
                      {system.name}
                    </text>
                  </g>
                );
              })}
            </g>
          )}
        </svg>
      </div>

      {/* Map Legend Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: 'rgba(18, 22, 31, 0.9)',
          padding: '6px 12px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--card-border)',
          fontSize: '11px',
          color: 'var(--text-secondary)'
        }}
      >
        <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Risk Tiers:</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--risk-high)' }} />
          <span>High Bust Risk (&gt;35%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--risk-medium)' }} />
          <span>Medium (20-35%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--risk-low)' }} />
          <span>Low Stability (&lt;20%)</span>
        </div>
      </div>

      {/* Floating Region Diagnostic Glass Card (Only 1 floating glass card in view) */}
      {selectedRegion && (
        <RegionInfoCard
          region={selectedRegion}
          onClose={() => onSelectRegion('')}
        />
      )}
    </div>
  );
};
