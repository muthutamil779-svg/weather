import React, { useRef, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { WeatherSystem } from '../../types/forecast';
import { WeatherSystemMarker, latLngToVector3 } from './WeatherSystemMarker';
import { FallbackEarth2D } from './FallbackEarth2D';
import { RotateCcw, Eye, ShieldAlert, Layers } from 'lucide-react';

interface WeatherGlobeProps {
  weatherSystems: WeatherSystem[];
  selectedSystemId?: string | null;
  onSelectSystem?: (id: string) => void;
  force2D?: boolean;
}

// Inner Earth Sphere Component
const EarthSphere: React.FC<{
  weatherSystems: WeatherSystem[];
  selectedSystemId?: string | null;
  onSelectSystem?: (id: string) => void;
}> = ({ weatherSystems, selectedSystemId, onSelectSystem }) => {
  const globeRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Subtle ambient rotation (motion budget compliant)
  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.02;
    }
  });

  // India centroid marker at Lat 22°N, Lon 79°E
  const indiaPosition = useMemo(() => latLngToVector3(22.0, 79.0, 2.03), []);

  return (
    <group ref={globeRef}>
      {/* Base Earth Sphere */}
      <mesh>
        <sphereGeometry args={[2, 48, 48]} />
        <meshStandardMaterial
          color="#0f192b"
          roughness={0.8}
          metalness={0.2}
          emissive="#060c18"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Grid Wireframe for Lat/Long Lines */}
      <mesh>
        <sphereGeometry args={[2.005, 24, 24]} />
        <meshBasicMaterial
          color="#1e3a5f"
          wireframe={true}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Subtle Atmospheric Glow Shell */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.08, 32, 32]} />
        <meshBasicMaterial
          color="#3b9cff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* India National Marker Pin */}
      <group position={indiaPosition}>
        <mesh>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh>
          <ringGeometry args={[0.06, 0.08, 20]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Weather System 3D Markers */}
      {weatherSystems.map((sys) => (
        <WeatherSystemMarker
          key={sys.id}
          system={sys}
          isSelected={selectedSystemId === sys.id}
          onSelect={onSelectSystem}
        />
      ))}
    </group>
  );
};

export const WeatherGlobe: React.FC<WeatherGlobeProps> = ({
  weatherSystems,
  selectedSystemId,
  onSelectSystem,
  force2D = false
}) => {
  const [hasError, setHasError] = useState(false);
  const controlsRef = useRef<any>(null);

  // Focus directly on India & Indian Ocean (Lat ~20°N, Lon ~80°E)
  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  if (force2D || hasError) {
    return <FallbackEarth2D weatherSystems={weatherSystems} onSelectSystem={onSelectSystem} />;
  }

  return (
    <div className="fg-panel" style={{ width: '100%', minHeight: '480px', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Globe Header Controls */}
      <div 
        style={{
          position: 'absolute',
          top: '14px',
          left: '16px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
      >
        <span className="subtle-title">Synoptic Geospatial Sphere</span>
        <h3 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
          Indian Ocean Basin & Subcontinent
        </h3>
      </div>

      <div 
        style={{
          position: 'absolute',
          top: '14px',
          right: '16px',
          zIndex: 10,
          display: 'flex',
          gap: '6px'
        }}
      >
        <button
          onClick={handleResetCamera}
          title="Reset Globe Orientation to India"
          style={{
            padding: '5px 8px',
            borderRadius: '4px',
            background: 'rgba(18, 22, 31, 0.85)',
            border: '1px solid var(--card-border)',
            color: 'var(--text-secondary)',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <RotateCcw size={12} />
          <span>Reset View</span>
        </button>
      </div>

      {/* R3F Canvas */}
      <div style={{ width: '100%', height: '100%', minHeight: '480px', background: 'radial-gradient(circle at center, #111722 0%, #080b10 100%)' }}>
        <Canvas
          camera={{ position: [2.5, 1.8, 3.8], fov: 42 }}
          onError={() => setHasError(true)}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-8, -5, -8]} intensity={0.4} color="#3b9cff" />
          
          <Suspense fallback={null}>
            <EarthSphere
              weatherSystems={weatherSystems}
              selectedSystemId={selectedSystemId}
              onSelectSystem={onSelectSystem}
            />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            minDistance={2.4}
            maxDistance={7.0}
            rotateSpeed={0.6}
            zoomSpeed={0.8}
          />
        </Canvas>
      </div>

      {/* Subtle instructions watermark */}
      <div 
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '16px',
          fontSize: '10px',
          color: 'var(--text-muted)',
          pointerEvents: 'none'
        }}
      >
        Drag to rotate • Scroll to zoom • Centered on 22°N, 79°E (India)
      </div>
    </div>
  );
};
