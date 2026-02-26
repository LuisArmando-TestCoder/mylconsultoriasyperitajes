"use client";

import React, { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Grid,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';
import ClientOnly from '@/components/atoms/ClientOnly';
import styles from './Hero3D.module.scss';

const COLORS = {
  primary: "#002244",
  accent: "#ff0000",
  secondary: "#c0c0c0",
  background: "#050505", // Still used for base, but we can override in Scene
  glow: "#0066cc"
};

function VisualVehicle({ position, color, isHero }: any) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    
    // Subtle driving vibration/bobbing
    meshRef.current.position.y = position[1] + Math.sin(time * 15) * 0.02 + Math.sin(time * 3) * 0.05;
    
    // Slight drift sway
    meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.05;
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Chassis */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[2, 0.6, 1]} />
        <meshStandardMaterial 
          color={color} 
          wireframe 
          transparent 
          opacity={0.8} 
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Cabin */}
      <mesh position={[-0.2, 0.9, 0]}>
        <boxGeometry args={[1, 0.5, 0.8]} />
        <meshStandardMaterial 
          color={color} 
          wireframe 
          transparent 
          opacity={0.6} 
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Wheels (Spinning visually) */}
      {[[-0.6, 0.1, 0.4], [0.6, 0.1, 0.4], [-0.6, 0.1, -0.4], [0.6, 0.1, -0.4]].map((pos, i) => (
        <Wheel key={i} position={pos} />
      ))}
    </group>
  );
}

function Wheel({ position }: any) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.x -= delta * 10; // Spin wheels
  });
  return (
    <mesh ref={ref} position={position as any}>
      <cylinderGeometry args={[0.2, 0.2, 0.1, 8]} />
      <meshStandardMaterial color={COLORS.secondary} wireframe />
    </mesh>
  );
}

function InfiniteGrid() {
  const gridRef = useRef<any>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      // Move grid backwards to simulate forward movement
      // Modulo 10 (2 * sectionSize) to loop seamlessly
      gridRef.current.position.x = (state.clock.elapsedTime * 8) % 5; 
      // Moving X because cars are facing X? 
      // Let's assume cars face +X (right) or -X (left). 
      // In previous physics they drifted.
      // Let's make them drive forward along +X.
    }
  });

  return (
    <group>
      <Grid
        ref={gridRef}
        infiniteGrid
        fadeDistance={60}
        fadeStrength={5}
        cellSize={1}
        sectionSize={5}
        sectionColor={COLORS.primary}
        cellColor={COLORS.secondary}
        sectionThickness={1.5}
        cellThickness={1}
        position={[0, -0.5, 0]}
      />
      {/* Road markings or additional visual cues could go here */}
    </group>
  );
}

function FloatingParticles({ count = 100 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 60;
      p[i * 3 + 1] = Math.random() * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    // Particles flow past the car
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    for(let i=0; i < count; i++) {
       positions[i*3] -= 0.2; // Move left (opposite to car driving right)
       if (positions[i*3] < -30) positions[i*3] = 30; // Reset
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={COLORS.secondary} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function Rig({ scrollY }: any) {
  const { camera, pointer } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 5, 15));
  const lookAtTarget = new THREE.Vector3(0, 0, 0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollFactor = Math.min(scrollY / 1000, 1);
    
    // Dynamic camera that follows the "action" (even though it's static position)
    // Gentle sway to feel like a chase cam
    const x = -10 + Math.sin(time * 0.2) * 2 + (pointer.x * 2);
    const z = 10 + Math.cos(time * 0.3) * 2 + (pointer.y * 2);
    const y = 5 + (scrollFactor * 2);

    targetPos.current.set(x, y, z);
    camera.position.lerp(targetPos.current, 0.05);
    
    // Look ahead of the cars
    lookAtTarget.set(5, 0, 0); 
    camera.lookAt(lookAtTarget);
  });

  return null;
}

function Scene() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    setScrollY(window.scrollY);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { theme } = useTheme();
  const themeBg = theme === 'dark' ? "#050505" : "#f9f9f9";

  return (
    <>
      <color attach="background" args={[themeBg]} />
      <fog attach="fog" args={[themeBg, 10, 50]} /> 
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 15, 10]} intensity={2} color={COLORS.glow} />
      <pointLight position={[-10, 10, -10]} intensity={1} color={COLORS.accent} />
      
      <group>
        <VisualVehicle position={[0, 0.5, 2]} color={COLORS.glow} />
        <VisualVehicle position={[2, 0.5, -2]} color={COLORS.accent} />
      </group>
      
      <InfiniteGrid />
      <FloatingParticles count={150} />
      
      <Environment preset="night" />
      <Rig scrollY={scrollY} />
    </>
  );
}

export default function Hero3D() {
  return (
    <div id="hero-3d-container" className={styles.hero3d}>
      <ClientOnly>
        <Canvas 
          id="hero-canvas"
          dpr={[1, 1.5]} 
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ fov: 45 }} 
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </ClientOnly>
      <div className={styles.overlay} />
    </div>
  );
}
