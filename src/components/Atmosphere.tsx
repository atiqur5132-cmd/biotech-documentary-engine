import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Atmosphere: React.FC<{
  accentColor?: string;
  particleDensity?: number;
}> = ({ accentColor = 'rgba(16, 185, 129, 0.15)', particleDensity = 25 }) => {
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    return Array.from({ length: particleDensity }).map((_, i) => ({
      x: ((i * 137.5) % 1920),
      y: ((i * 223.7) % 1080),
      size: (i % 4) + 2,
      speedY: ((i % 3) + 1) * 0.4,
      driftX: Math.sin(i) * 0.3,
      opacity: 0.2 + ((i % 5) * 0.12),
    }));
  }, [particleDensity]);

  const pulse = interpolate(Math.sin(frame * 0.05), [-1, 1], [0.85, 1.15]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#030712',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Deep Obsidian Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, #071326 0%, #030712 75%)',
        }}
      />

      {/* Volumetric Bioluminescent Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '30%',
          width: '800px',
          height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          filter: 'blur(90px)',
          transform: `scale(${pulse})`,
        }}
      />

      {/* Floating Cellular/Molecular Micelle Particles */}
      {particles.map((p, idx) => {
        const currentY = (p.y - frame * p.speedY + 1080) % 1080;
        const currentX = (p.x + Math.sin(frame * 0.02 + idx) * 30 + 1920) % 1920;

        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: `${currentX}px`,
              top: `${currentY}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              backgroundColor: '#34D399',
              boxShadow: '0 0 10px rgba(52, 211, 153, 0.8)',
              opacity: p.opacity,
            }}
          />
        );
      })}

      {/* Film Grain & Subtle Grid Mesh */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.6,
        }}
      />
    </AbsoluteFill>
  );
};
