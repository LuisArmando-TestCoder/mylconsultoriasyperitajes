"use client";

import React, { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Float, 
  MeshDistortMaterial, 
  Stars, 
  Environment
} from '@react-three/drei';
import * as THREE from 'three';
import ClientOnly from '@/components/atoms/ClientOnly';
import styles from './Hero3D.module.scss';

function InteractiveMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const { viewport } = useThree();
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from center of window
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x, y: -y }); // Invert Y for 3D space
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    
    const scrollFactor = Math.min(scrollY / 1000, 1);
    const mouseX = mousePos.x;
    const mouseY = mousePos.y;

    // Interdependent 3-axis morphing
    // 1. Distortion based on X and Scroll
    materialRef.current.distort = THREE.MathUtils.lerp(
      materialRef.current.distort, 
      0.4 + mouseX * 0.2 + scrollFactor * 0.4, 
      0.05
    );

    // 2. Speed based on Y and X
    materialRef.current.speed = THREE.MathUtils.lerp(
      materialRef.current.speed, 
      2 + Math.abs(mouseY) * 3 + mouseX * 2, 
      0.05
    );

    // 3. Scale based on Scroll and Mouse proximity
    const targetScale = 0.8 + scrollFactor * 0.5 + (Math.abs(mouseX) + Math.abs(mouseY)) * 0.1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);

    // Smooth movement
    const x = (mouseX * viewport.width) / 2;
    const y = (mouseY * viewport.height) / 2;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 0.1, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, (y * 0.1) - (scrollFactor * 2), 0.1);
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.2 + scrollFactor * Math.PI, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.2, 0.05);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef}>
        <mesh>
          <icosahedronGeometry args={[2, 1]} />
          <meshStandardMaterial 
            color="#0066cc" 
            wireframe 
            transparent 
            opacity={0.3} 
            emissive="#0066cc"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Internal Distorted Core */}
        <mesh ref={coreRef} scale={0.8}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            ref={materialRef}
            color="#002244"
            speed={2}
            distort={0.4}
            radius={1}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Particles({ count = 100 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const { mouse } = useThree();
  const ref = useRef<THREE.Points>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.001;
    ref.current.rotation.x += mouse.y * 0.002;
    ref.current.rotation.z += mouse.x * 0.002;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#ffffff" 
        transparent 
        opacity={0.6} 
        sizeAttenuation 
      />
    </points>
  );
}

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 0.5, mouse.y * 0.5, 5), 0.05);
    camera.lookAt(0, 0, 0);
  });
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 5, 15]} />
      
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066cc" />
      
      <InteractiveMesh />
      <Particles count={300} />
      
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      
      <Environment preset="city" />
      <Rig />
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
        >
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
            <Scene />
          </Suspense>
        </Canvas>
      </ClientOnly>
      <div className={styles.overlay} />
    </div>
  );
}
