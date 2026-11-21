"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { Mesh } from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function EnergyOrb({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.25;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.45} floatIntensity={1.1}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 48, 48]} />
        <MeshDistortMaterial color={color} transparent opacity={0.42} distort={0.35} speed={1.6} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function Ribbon() {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.35) * 0.25;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <mesh ref={ref} position={[0.2, -0.1, -1.2]} rotation={[0.4, 0.2, 0.1]}>
      <torusGeometry args={[1.7, 0.035, 16, 120]} />
      <meshStandardMaterial color="#FFC400" emissive="#FFC400" emissiveIntensity={0.55} transparent opacity={0.55} />
    </mesh>
  );
}

function SceneContent() {
  const sparks = useMemo(() => ({ count: 42, size: 2.2 }), []);

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 5, 2]} intensity={1.1} color="#fff4e8" />
      <pointLight position={[-3, 1, 2]} intensity={1.4} color="#A90008" />
      <pointLight position={[3, -1, 1]} intensity={1.1} color="#FFC400" />

      <EnergyOrb position={[-2.1, 0.7, -1]} color="#A90008" scale={0.85} />
      <EnergyOrb position={[2.2, -0.35, -0.6]} color="#FFC400" scale={0.7} />
      <EnergyOrb position={[0.3, 1.15, -1.8]} color="#C4161C" scale={0.45} />
      <Ribbon />

      <Sparkles
        count={sparks.count}
        scale={[8, 4.5, 3]}
        size={sparks.size}
        speed={0.45}
        opacity={0.55}
        color="#FFC400"
      />
    </>
  );
}

function SoftBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(255,196,0,0.16),transparent_42%),radial-gradient(circle_at_20%_70%,rgba(169,0,8,0.12),transparent_40%)]"
      aria-hidden
    />
  );
}

export function HeroScene() {
  const reduced = usePrefersReducedMotion();
  const [allowWebGL, setAllowWebGL] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const update = () => setAllowWebGL(finePointer.matches && wide.matches);
    update();
    finePointer.addEventListener("change", update);
    wide.addEventListener("change", update);
    return () => {
      finePointer.removeEventListener("change", update);
      wide.removeEventListener("change", update);
    };
  }, []);

  if (reduced || !allowWebGL) {
    return <SoftBackdrop />;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-80" aria-hidden>
      <Canvas
        dpr={[1, 1.25]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          premultipliedAlpha: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        style={{ width: "100%", height: "100%", display: "block", background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(255,249,242,0.55)_100%)]" />
    </div>
  );
}
