import React, { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { TimelineForecast } from '../../types/forecast';
import { Layers, Cuboid as Cube } from 'lucide-react';
import * as THREE from 'three';

interface ConfidenceSurfaceProps {
  timeline: TimelineForecast[];
}

export const ConfidenceSurface3D: React.FC<ConfidenceSurfaceProps> = ({ timeline }) => {
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');
  const mountRef = useRef<HTMLDivElement>(null);

  // 3D Canvas Lifecycle
  useEffect(() => {
    if (viewMode !== '3D' || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 220;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f141d');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 15, 24);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0x3b9cff, 1.2);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // Generate 3D Surface geometry representing confidence topography
    // Grid: width along X (days 1-10), depth along Z (spread ensemble members)
    const gridX = 10;
    const gridZ = 6;
    const geometry = new THREE.PlaneGeometry(18, 10, gridX - 1, gridZ - 1);
    geometry.rotateX(-Math.PI / 2);

    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const col = i % gridX;
      const row = Math.floor(i / gridX);
      const dayData = timeline[col] || timeline[timeline.length - 1];
      
      // Elevate based on confidence: 90% -> Y=3.5, 45% -> Y=0.2
      const baseHeight = ((dayData.confidence - 40) / 60) * 3.8;
      // Add slight cross-ensemble variance across Z
      const variance = Math.sin(row * 0.8 + col * 0.5) * (dayData.bustProbability / 70);
      pos.setY(i, Math.max(0.1, baseHeight - variance));
    }
    geometry.computeVertexNormals();

    // Material with subtle sci-fi wireframe mesh
    const material = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      roughness: 0.3,
      metalness: 0.8,
      wireframe: false,
      transparent: true,
      opacity: 0.85
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Wireframe overlay for technical grid aesthetic
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x3b9cff,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMat);
    wireframeMesh.position.y += 0.02;
    scene.add(wireframeMesh);

    // Base coordinate reference plane
    const gridHelper = new THREE.GridHelper(20, 10, 0x3b9cff, 0x1f293d);
    gridHelper.position.y = -0.1;
    scene.add(gridHelper);

    // Subtle ambient animation
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      mesh.rotation.y = Math.sin(elapsed * 0.3) * 0.15;
      wireframeMesh.rotation.y = mesh.rotation.y;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup resources
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      wireframeMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [viewMode, timeline]);

  const chartData = timeline.map(t => ({
    day: `D${t.day} (${t.date})`,
    confidence: t.confidence,
    bustRisk: t.bustProbability,
    stabilityEnvelope: Math.max(0, 100 - t.bustProbability - (t.confidence * 0.15))
  }));

  return (
    <div className="fg-panel" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span className="subtle-title">Uncertainty Topography</span>
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Confidence vs. Bust Risk Profile
          </h3>
        </div>

        {/* View Mode Toggle */}
        <div 
          style={{ 
            display: 'inline-flex', 
            background: 'rgba(255, 255, 255, 0.04)', 
            border: '1px solid var(--card-border)', 
            borderRadius: 'var(--radius-sm)',
            padding: '2px'
          }}
        >
          <button
            onClick={() => setViewMode('2D')}
            className={`fg-tab-btn ${viewMode === '2D' ? 'active' : ''}`}
            style={{ padding: '4px 10px', fontSize: '11px' }}
          >
            <Layers size={13} />
            <span>2D View</span>
          </button>
          <button
            onClick={() => setViewMode('3D')}
            className={`fg-tab-btn ${viewMode === '3D' ? 'active' : ''}`}
            style={{ padding: '4px 10px', fontSize: '11px' }}
          >
            <Cube size={13} />
            <span>3D View</span>
          </button>
        </div>
      </div>

      {/* Visualizer Body */}
      {viewMode === '2D' ? (
        <div style={{ width: '100%', height: '190px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b9cff" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#3b9cff" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="bustGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" stroke="#8b93a3" fontSize={10} tickLine={false} />
              <YAxis stroke="#8b93a3" fontSize={10} domain={[0, 100]} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#12161f', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '6px',
                  fontSize: '11px'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
              <Area type="monotone" dataKey="confidence" name="Forecast Confidence (%)" stroke="#3b9cff" fill="url(#confGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="bustRisk" name="Bust Probability (%)" stroke="#ef4444" fill="url(#bustGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div style={{ position: 'relative', width: '100%', height: '190px', borderRadius: '6px', overflow: 'hidden' }}>
          <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
          <div 
            style={{
              position: 'absolute',
              bottom: '6px',
              left: '8px',
              fontSize: '10px',
              color: 'var(--text-muted)',
              background: 'rgba(10, 14, 20, 0.75)',
              padding: '2px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            Topography: Y-axis = Confidence Peak, Valleys = High Bust Divergence
          </div>
        </div>
      )}
    </div>
  );
};
