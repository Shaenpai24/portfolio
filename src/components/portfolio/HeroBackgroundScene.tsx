"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Points, PointMaterial, shaderMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { RootState } from "@react-three/fiber";

type Trajectory = {
  points: [number, number, number][];
  color: string;
};

const FieldMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
  },
  `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;

    float lineWave(vec2 uv, float speed, float scale, float width) {
      float y = 0.5 + sin(uv.x * scale + uTime * speed) * 0.14;
      return smoothstep(width, 0.0, abs(uv.y - y));
    }

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;
      vec2 centered = uv - 0.5;

      float flowA = lineWave(uv + vec2(0.0, sin(uTime * 0.17) * 0.03), 0.7, 16.0, 0.028);
      float flowB = lineWave(uv.yx + vec2(0.0, cos(uTime * 0.21) * 0.02), 0.5, 13.0, 0.025);

      vec2 grid = floor(uv * 24.0);
      float node = step(0.986, hash(grid + floor(uTime * 0.5)));
      float glow = exp(-8.5 * dot(centered - (uMouse - 0.5) * 0.28, centered - (uMouse - 0.5) * 0.28));

      vec3 base = vec3(0.0, 0.0, 0.0);
      vec3 cyan = vec3(1.0, 0.48, 0.0) * (flowA * 0.35 + flowB * 0.22);
      vec3 mint = vec3(1.0, 0.30, 0.0) * (node * 0.25 + glow * 0.12);

      vec3 color = base + cyan + mint;
      float vignette = smoothstep(0.98, 0.18, length(centered));
      gl_FragColor = vec4(color * vignette, 0.45);
    }
  `,
);

function FieldPlane({ lightsOn }: { lightsOn: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const shader = useMemo(() => new FieldMaterial(), []);

  useFrame((state, delta) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value += delta;
    material.current.opacity = lightsOn ? 0.72 : 0.22;
    material.current.uniforms.uMouse.value.lerp(
      new THREE.Vector2(state.pointer.x * 0.5 + 0.5, state.pointer.y * 0.5 + 0.5),
      0.08,
    );
  });

  return (
    <mesh position={[0, 0, -4]} scale={[24, 14, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <primitive ref={material} object={shader} attach="material" transparent />
    </mesh>
  );
}

function NeuralField() {
  const ref = useRef<THREE.Points>(null);

  const cloud = useMemo(() => {
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    const arr = new Float32Array(1400 * 3);
    for (let i = 0; i < 1400; i += 1) {
      const i3 = i * 3;
      arr[i3] = (pseudoRandom(i + 1) - 0.5) * 28;
      arr[i3 + 1] = (pseudoRandom((i + 1) * 1.7) - 0.5) * 16;
      arr[i3 + 2] = (pseudoRandom((i + 1) * 2.3) - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.025;
    ref.current.rotation.x += delta * 0.01;
  });

  return (
    <Points ref={ref} positions={cloud} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#ff7722"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.33}
      />
    </Points>
  );
}

function Trajectories() {
  const curves = useMemo<Trajectory[]>(() => {
    return new Array(6).fill(null).map((_, idx) => {
      const radius = 2 + idx * 0.4;
      const offset = (idx / 8) * Math.PI;
      const points: [number, number, number][] = [];
      for (let i = 0; i < 90; i += 1) {
        const t = (i / 90) * Math.PI * 2;
        const x = Math.cos(t + offset) * (radius + Math.sin(t * 2.1) * 0.8);
        const y = Math.sin(t * 1.7 + offset) * 1.4;
        const z = Math.sin(t + offset) * (radius * 0.7);
        points.push([x, y, z]);
      }
      return {
        points,
        color: idx % 2 === 0 ? "#ff7722" : "#ff4d00",
      };
    });
  }, []);

  return (
    <group>
      {curves.map((curve, idx) => (
        <Float key={idx} speed={1 + idx * 0.03} rotationIntensity={0.05} floatIntensity={0.14}>
          <Line
            points={curve.points}
            color={curve.color}
            transparent
            opacity={0.22}
            lineWidth={1}
          />
        </Float>
      ))}
    </group>
  );
}

function CameraRig() {
  useFrame((state: RootState, delta) => {
    const total = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(window.scrollY / total, 1);

    const targetX = state.pointer.x * 0.55;
    const targetY = state.pointer.y * 0.32 + progress * 0.45;
    const targetZ = 9.3 - progress * 1.8;

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 3, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 3, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 3, delta);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroBackgroundScene({ lightsOn }: { lightsOn: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9.5], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="h-full w-full"
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", lightsOn ? 10 : 6, lightsOn ? 26 : 14]} />
      <ambientLight intensity={lightsOn ? 0.32 : 0.02} />
      <directionalLight position={[6, 7, 3]} intensity={lightsOn ? 0.9 : 0.06} color="#ff7722" />
      <directionalLight position={[-6, -5, -3]} intensity={lightsOn ? 0.45 : 0.02} color="#ff4d00" />
      <FieldPlane lightsOn={lightsOn} />
      <NeuralField />
      <Trajectories />
      <CameraRig />
    </Canvas>
  );
}
