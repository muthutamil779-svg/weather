import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WeatherSystem } from '../../types/forecast';
import { Html } from '@react-three/drei';

interface MarkerProps {
  system: WeatherSystem;
  radius?: number;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

// Convert Lat/Lng to Cartesian vector on a globe of given radius
export function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export const WeatherSystemMarker: React.FC<MarkerProps> = ({
  system,
  radius = 2.02,
  isSelected,
  onSelect
}) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const position = latLngToVector3(system.coordinates[0], system.coordinates[1], radius);

  // Rotate cyclone / depression rings smoothly without heavy compute
  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += (system.type === 'cyclone' ? 2.5 : 1.2) * delta;
    }
  });

  // Color mapping per condition
  let ringColor = '#06b6d4';
  if (system.type === 'cyclone') ringColor = '#f43f5e';
  else if (system.type === 'monsoon_depression') ringColor = '#8b5cf6';
  else if (system.type === 'heavy_rain') ringColor = '#0284c7';
  else if (system.type === 'heatwave') ringColor = '#f97316';

  // Orient marker normal to globe surface
  const normal = position.clone().normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

  return (
    <group position={position} quaternion={quaternion}>
      {/* Central Pin Point */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          if (onSelect) onSelect(system.id);
        }}
      >
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={ringColor} />
      </mesh>

      {/* Atmospheric Ring for Cyclone / Depression */}
      {(system.type === 'cyclone' || system.type === 'monsoon_depression') && (
        <mesh ref={ringRef}>
          <ringGeometry args={[0.06, 0.08, 24]} />
          <meshBasicMaterial color={ringColor} side={THREE.DoubleSide} transparent opacity={0.75} />
        </mesh>
      )}

      {/* Heatwave / Heavy rain outer beacon */}
      {system.type === 'heatwave' && (
        <mesh>
          <ringGeometry args={[0.04, 0.09, 16]} />
          <meshBasicMaterial color="#f97316" side={THREE.DoubleSide} transparent opacity={0.4} />
        </mesh>
      )}

      {/* Lightweight label on hover / focus */}
      <Html distanceFactor={8} position={[0.05, 0.05, 0]}>
        <div
          style={{
            background: 'rgba(10, 14, 20, 0.85)',
            border: `1px solid ${ringColor}`,
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '10px',
            color: '#ffffff',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            transform: 'translate3d(0, -50%, 0)'
          }}
        >
          {system.name}
        </div>
      </Html>
    </group>
  );
};
