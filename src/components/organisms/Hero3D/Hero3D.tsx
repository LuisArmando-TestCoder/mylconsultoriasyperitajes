"use client";

import React, { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Float, 
  Line,
  Grid,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';
import ClientOnly from '@/components/atoms/ClientOnly';
import styles from './Hero3D.module.scss';

// Brand Colors
const COLORS = {
  primary: "#002244",
  accent: "#ff0000",
  secondary: "#c0c0c0",
  background: "#050505",
  glow: "#0066cc"
};

function Vehicle({ position, rotation, color, wireframe = true, morphFactor = 0, mousePos }: any) {
  const meshRef = useRef<THREE.Group>(null);
  const basePos = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!meshRef.current) return;

    // 1. Drift Physics: Slide based on mouse with inertia
    const driftIntensity = 1.2;
    const targetX = basePos.x + mousePos.x * driftIntensity;
    const targetZ = basePos.z - mousePos.y * driftIntensity; // mouse.y is inverted in R3F or standard? 
    // In our Scene, mousePos.y is normalized -1 to 1 (up is 1).
    // In 3D, moving mouse up should move car "forward" (negative Z or positive Z depending on camera)
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.04);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.04);

    // 2. Banking/Tilt: Subtle roll when "cornering" or drifting
    const driftVelocityX = meshRef.current.position.x - targetX;
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, driftVelocityX * 0.1, 0.1);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, (meshRef.current.position.z - targetZ) * 0.1, 0.1);

    // 3. Morphing: scaling and subtle rotation
    const scale = 1 + morphFactor * 0.15;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    meshRef.current.rotation.y = rotation[1] + mousePos.x * 0.2; // Subtle turn towards mouse
  });

  return (
    <group ref={meshRef} rotation={rotation}>
      {/* Chassis */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[2, 0.6, 1]} />
        <meshStandardMaterial 
          color={color} 
          wireframe={wireframe} 
          transparent 
          opacity={0.6} 
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Cabin */}
      <mesh position={[-0.2, 0.9, 0]}>
        <boxGeometry args={[1, 0.5, 0.8]} />
        <meshStandardMaterial 
          color={color} 
          wireframe={wireframe} 
          transparent 
          opacity={0.4} 
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Wheels */}
      {[[-0.6, 0.1, 0.4], [0.6, 0.1, 0.4], [-0.6, 0.1, -0.4], [0.6, 0.1, -0.4]].map((pos, i) => (
        <mesh key={i} position={pos as any} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 8]} />
          <meshStandardMaterial color={COLORS.secondary} wireframe />
        </mesh>
      ))}
    </group>
  );
}

function ImpactVector({ start, end, color, mousePos }: any) {
  const ref = useRef<any>(null);

  useFrame(() => {
    if (!ref.current) return;
    // Vectors also drift slightly
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mousePos.x * 0.5, 0.03);
    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, -mousePos.y * 0.5, 0.03);
  });

  return (
    <group ref={ref}>
      <Line
        points={[start, end]}
        color={color}
        lineWidth={1}
        transparent
        opacity={0.3}
        dashed
        dashScale={2}
        dashSize={0.2}
      />
    </group>
  );
}

function CollisionScene({ mousePos, scrollY }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const distFromCenter = Math.sqrt(mousePos.x ** 2 + mousePos.y ** 2);

  useFrame(() => {
    if (!groupRef.current) return;
    const scrollFactor = Math.min(scrollY / 1000, 1);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -scrollFactor * 2, 0.1);
  });

  return (
    <group ref={groupRef}>
      <Grid
        infiniteGrid
        fadeDistance={40}
        fadeStrength={5}
        cellSize={1}
        sectionSize={5}
        sectionColor={COLORS.primary}
        cellColor={COLORS.secondary}
        sectionThickness={1.5}
        cellThickness={1}
        position={[0, -0.1, 0]}
      />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
        <group>
          <Vehicle 
            position={[-2.5, 0, 1]} 
            rotation={[0, Math.PI / 4, 0]} 
            color={COLORS.glow} 
            morphFactor={distFromCenter}
            mousePos={mousePos}
          />
          <Vehicle 
            position={[2, 0, -1]} 
            rotation={[0, -Math.PI / 6, 0]} 
            color={COLORS.accent} 
            morphFactor={distFromCenter}
            mousePos={mousePos}
          />
          
          <ImpactVector start={[-6, 0, 3]} end={[-2.5, 0.4, 1]} color={COLORS.glow} mousePos={mousePos} />
          <ImpactVector start={[5, 0, -3]} end={[2, 0.4, -1]} color={COLORS.accent} mousePos={mousePos} />
          
          <mesh position={[0, 0.1, 0]}>
            <ringGeometry args={[0.5, 0.6 + distFromCenter * 0.3, 32]} />
            <meshBasicMaterial color={COLORS.accent} transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function DataParticles({ count = 200 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 40;
      p[i * 3 + 1] = Math.random() * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={COLORS.secondary} transparent opacity={0.2} sizeAttenuation />
    </points>
  );
}

function Rig({ mousePos, scrollY }: any) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 5, 15));
  const lookAtTarget = new THREE.Vector3(0, 0, 0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollFactor = Math.min(scrollY / 1000, 1);
    
    // Orbital motion + mouse influence
    const angle = (time * 0.1) + (mousePos.x * 0.4);
    const radius = 15 - (scrollFactor * 5) + (mousePos.y * 2);
    
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const y = 6 + (mousePos.y * 4) - (scrollFactor * 3);

    targetPos.current.set(x, y, z);
    camera.position.lerp(targetPos.current, 0.05);
    camera.lookAt(lookAtTarget);
  });

  return null;
}

function Scene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    setScrollY(window.scrollY);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <color attach="background" args={[COLORS.background]} />
      <fog attach="fog" args={[COLORS.background, 15, 35]} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color={COLORS.glow} />
      <pointLight position={[-10, 5, -10]} intensity={1} color={COLORS.accent} />
      
      <CollisionScene mousePos={mousePos} scrollY={scrollY} />
      <DataParticles count={250} />
      
      <Environment preset="night" />
      <Rig mousePos={mousePos} scrollY={scrollY} />
    </>
  );
}

export default function Hero3D() {
  return (
    <div id="hero-3d-container" className={styles.hero3d}>
      <ClientOnly>
        <Canvas 
          id="hero-canvas"
          dpr={[1, 2]} 
          gl={{ antialias: true, alpha: true }}
          camera={{ fov: 40 }}
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
