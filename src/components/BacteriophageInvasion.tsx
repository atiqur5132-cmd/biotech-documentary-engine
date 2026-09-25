import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const BacteriophageInvasion: React.FC<{
  title?: string;
  stage?: 'approach' | 'docking' | 'injection';
}> = ({ title = 'VIRAL ARMORED INVASION', stage = 'injection' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Landing spring
  const landing = spring({
    frame,
    fps,
    config: { stiffness: 70, damping: 12 },
  });

  const phageY = interpolate(landing, [0, 1], [-300, 50]);
  const sheathCompression = interpolate(frame, [45, 90], [1.0, 0.75], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const payloadProgress = interpolate(frame, [60, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Top HUD Badge */}
      <div
        style={{
          position: 'absolute',
          top: '70px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          padding: '12px 28px',
          borderRadius: '999px',
          zIndex: 10,
        }}
      >
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#38BDF8', boxShadow: '0 0 12px #38BDF8' }} />
        <span style={{ fontSize: '18px', fontWeight: 900, color: '#38BDF8', letterSpacing: '2px' }}>
          {title}
        </span>
      </div>

      {/* SVG Canvas for Phage and Bacterial Membrane */}
      <svg
        width="1600"
        height="850"
        viewBox="0 0 1600 850"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <radialGradient id="capsidGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#083344" stopOpacity="0.9" />
          </radialGradient>
          <linearGradient id="dnaPayload" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>

        {/* Bacterial Membrane (Bottom Curved Bilayer) */}
        <g transform="translate(0, 560)">
          {/* Outer Lipid Layer */}
          <path
            d="M 100 50 Q 800 10 1500 50 L 1500 120 Q 800 80 100 120 Z"
            fill="rgba(15, 23, 42, 0.9)"
            stroke="#10B981"
            strokeWidth="3"
            filter="drop-shadow(0 -10px 30px rgba(16, 185, 129, 0.3))"
          />

          {/* Membrane Phospholipid Spheres */}
          {Array.from({ length: 35 }).map((_, i) => (
            <circle
              key={i}
              cx={120 + i * 40}
              cy={50 + Math.sin(i * 0.18 + frame * 0.05) * 5}
              r={9}
              fill="#34D399"
              opacity={0.85}
            />
          ))}

          <text x="800" y="105" textAnchor="middle" fill="#64748B" fontSize="18" fontWeight="800" letterSpacing="3">
            BACTERIAL CELLULAR MEMBRANE
          </text>
        </g>

        {/* Jumbo Bacteriophage Entity */}
        <g transform={`translate(800, ${280 + phageY})`}>
          {/* Icosahedral Armored Capsid Head */}
          <polygon
            points="0,-180 130,-110 130,40 0,110 -130,40 -130,-110"
            fill="url(#capsidGlow)"
            stroke="#22D3EE"
            strokeWidth="5"
            filter="drop-shadow(0 0 35px rgba(34, 211, 238, 0.4))"
          />

          {/* Internal Genetic Coil inside Capsid */}
          <path
            d="M -70,-80 Q 0,-130 70,-80 Q -70,-20 70,-20 Q -60,40 60,40"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="4"
            opacity={1 - payloadProgress * 0.7}
          />
          <text x="0" y="-30" textAnchor="middle" fill="#FBBF24" fontSize="16" fontWeight="900">
            &gt;200 kb DNA
          </text>

          {/* Contractile Sheath Tail */}
          <g transform={`scale(1, ${sheathCompression})`}>
            <rect
              x="-24"
              y="110"
              width="48"
              height="160"
              fill="#0F172A"
              stroke="#06B6D4"
              strokeWidth="4"
              rx="6"
            />
            {/* Sheath Ring Grooves */}
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={i}
                x1="-22"
                y1={130 + i * 22}
                x2="22"
                y2={130 + i * 22}
                stroke="#22D3EE"
                strokeWidth="3"
                opacity="0.8"
              />
            ))}
          </g>

          {/* Tail Fibers Clamped to Membrane */}
          <g transform="translate(0, 260)">
            <path d="M -20,0 L -90,60 L -140,80" fill="none" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />
            <path d="M 20,0 L 90,60 L 140,80" fill="none" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />
            <path d="M -10,0 L -50,70 L -70,85" fill="none" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" />
            <path d="M 10,0 L 50,70 L 70,85" fill="none" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* Injected Viral Genetic Payload Jet */}
          {payloadProgress > 0 && (
            <line
              x1="0"
              y1="260"
              x2="0"
              y2={260 + payloadProgress * 220}
              stroke="url(#dnaPayload)"
              strokeWidth="8"
              strokeLinecap="round"
              filter="drop-shadow(0 0 15px #10B981)"
            />
          )}
        </g>
      </svg>
    </div>
  );
};
