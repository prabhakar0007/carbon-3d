import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import generateCities from '../utils/cityData';

// Earth sphere with texture
function Earth() {
  const earthRef = useRef();
  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.001;
  });
  const texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
  return (
    <Sphere ref={earthRef} args={[2, 64, 64]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
}

// City markers with emission heat circles
function CityMarkers({ footprintTotal }) {
  const cities = useMemo(() => generateCities(80), []); // adjust count
  const markerGroup = useRef();

  // Scale emission size based on user's footprint
  const scale = Math.min(footprintTotal / 100, 5) + 0.5;

  return (
    <group ref={markerGroup}>
      {cities.map((city, i) => {
        const lat = city.lat * Math.PI / 180;
        const lng = city.lng * Math.PI / 180;
        const radius = 2.1;
        const x = radius * Math.cos(lat) * Math.cos(lng);
        const y = radius * Math.sin(lat);
        const z = radius * Math.cos(lat) * Math.sin(lng);

        // Heat circle size based on city emission and user footprint impact
        const circleSize = Math.max(0.05, city.emission / 100) * scale;
        return (
          <group key={i} position={[x, y, z]}>
            {/* Glowing point */}
            <mesh>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color="#ffaa33" emissive="#ff5500" emissiveIntensity={0.8} />
            </mesh>
            {/* Heat circle (ring) */}
            <mesh rotation={[0, 0, 0]}>
              <ringGeometry args={[circleSize * 0.5, circleSize, 32]} />
              <meshBasicMaterial color="#ff4444" transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
            {/* City label (HTML) */}
            <Html distanceFactor={4} position={[0, 0.15, 0]}>
              <div style={{
                color: '#ddd',
                fontSize: '8px',
                background: 'rgba(0,0,0,0.6)',
                padding: '2px 4px',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none'
              }}>
                {city.name}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function Earth3D({ footprintTotal }) {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-green-400/30" role="img" aria-label="Interactive 3D Earth showing global carbon emissions">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 10]} />
        <Suspense fallback={null}>
          <Earth />
          <CityMarkers footprintTotal={footprintTotal} />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
      <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-1 rounded-full text-sm backdrop-blur-sm">
        🌍 Your CO₂: {footprintTotal} kg CO₂e – City circles show global emissions
      </div>
    </div>
  );
}