'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial, Sphere, Wireframe } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function HologramContent() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group>
      {/* Central Figure Mockup (Abstracted into a structured form) */}
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 3, 0.5]} />
        <MeshDistortMaterial
          color="#B8976A"
          speed={2}
          distort={0.1}
          wireframe
          opacity={0.3}
          transparent
        />
      </mesh>

      {/* Outer Scanning Rings */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        {[1, 1.5, 2].map((radius, i) => (
          <mesh key={i} rotation={[0, 0, i * Math.PI / 4]}>
            <torusGeometry args={[radius, 0.005, 16, 100]} />
            <meshBasicMaterial color="#B8976A" opacity={0.15} transparent />
          </mesh>
        ))}
      </group>

      {/* Floating particles */}
      <Points count={100} />
    </group>
  );
}

function Points({ count = 100 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        p[i * 3] = (Math.random() - 0.5) * 6;
        p[i * 3 + 1] = (Math.random() - 0.5) * 6;
        p[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#B8976A" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function ProductScene() {
  return (
    <div className="w-full h-full bg-nero-void">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
        />
        
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#B8976A" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#B8976A" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <HologramContent />
        </Float>
      </Canvas>

      {/* Technical HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between border border-nero-bronze/10">
         <div className="flex justify-between items-start">
            <div className="space-y-1">
               <p className="text-[8px] text-nero-bronze/60 font-mono tracking-widest uppercase">Scan Mode: Active</p>
               <p className="text-[8px] text-nero-bronze/60 font-mono tracking-widest uppercase">Metric: 3D_DRAPE_VOL_v01</p>
            </div>
            <div className="w-4 h-4 border-t border-r border-nero-bronze/40" />
         </div>
         <div className="flex justify-between items-end">
            <div className="w-4 h-4 border-b border-l border-nero-bronze/40" />
            <p className="text-[8px] text-nero-bronze/60 font-mono tracking-widest uppercase">© NERO_LABS_2026</p>
         </div>
      </div>
    </div>
  );
}
