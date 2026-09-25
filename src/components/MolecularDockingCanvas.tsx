import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const MolecularDockingCanvas: React.FC<{
  moleculeName: string;
  targetProtein: string;
  deltaG?: number; // e.g. -11.4 kcal/mol
  kdValue?: string; // e.g. "4.2 nM"
}> = ({
  moleculeName,
  targetProtein,
  deltaG = -11.8,
  kdValue = '3.4 nM',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Docking trajectory progress (enters from top right to center pocket)
  const dockProgress = spring({
    frame: frame - 15,
    fps,
    config: { stiffness: 90, damping: 14 },
  });

  const ligandX = interpolate(dockProgress, [0, 1], [300, 0]);
  const ligandY = interpolate(dockProgress, [0, 1], [-250, 0]);
  const ligandRotation = interpolate(dockProgress, [0, 1], [45, 0]);

  // Hydrogen bond lock effect
  const bondOpacity = interpolate(dockProgress, [0.85, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Telemetry numbers counter
  const liveDeltaG = interpolate(dockProgress, [0, 1], [-2.1, deltaG]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* SVG Canvas for Pocket Cavity and Ligand Interactions */}
      <svg
        width="1400"
        height="750"
        viewBox="0 0 1400 750"
        style={{
          position: 'absolute',
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
        }}
      >
        <defs>
          {/* Surface Gradient */}
          <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0E7490" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#042F2E" stopOpacity="0.8" />
          </linearGradient>

          {/* Ligand Glow */}
          <filter id="ligandGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Protein Active Site Cavity Contour */}
        <path
          d="M 250 150 Q 450 120 600 220 Q 700 280 850 240 Q 1000 200 1150 280 Q 1100 550 900 620 Q 700 650 500 580 Q 300 520 250 150 Z"
          fill="url(#pocketGrad)"
          stroke="#06B6D4"
          strokeWidth="3"
          strokeDasharray="8 6"
          opacity="0.85"
        />

        {/* Pocket Residue Anchor Nodes (Catalytic Triad) */}
        <g>
          {/* Residue 1: Cys12 */}
          <circle cx="580" cy="380" r="16" fill="#10B981" filter="drop-shadow(0 0 8px #10B981)" />
          <text x="540" y="420" fill="#34D399" fontSize="18" fontWeight="800" fontFamily="monospace">
            CYS-12
          </text>

          {/* Residue 2: His95 */}
          <circle cx="780" cy="360" r="16" fill="#10B981" filter="drop-shadow(0 0 8px #10B981)" />
          <text x="760" y="405" fill="#34D399" fontSize="18" fontWeight="800" fontFamily="monospace">
            HIS-95
          </text>

          {/* Residue 3: Asp54 */}
          <circle cx="680" cy="480" r="16" fill="#10B981" filter="drop-shadow(0 0 8px #10B981)" />
          <text x="660" y="525" fill="#34D399" fontSize="18" fontWeight="800" fontFamily="monospace">
            ASP-54
          </text>
        </g>

        {/* Docked Small Molecule Chemical Scaffold (Moving Ligand) */}
        <g
          transform={`translate(${ligandX}, ${ligandY}) rotate(${ligandRotation}, 700, 410)`}
          filter="url(#ligandGlow)"
        >
          {/* Chemical Core Rings (Anthracene / Pyrimidine skeleton) */}
          <polygon
            points="650,380 700,350 750,380 750,440 700,470 650,440"
            fill="rgba(244, 63, 94, 0.25)"
            stroke="#F43F5E"
            strokeWidth="4"
          />
          <polygon
            points="750,380 800,350 850,380 850,440 800,470 750,440"
            fill="rgba(244, 63, 94, 0.25)"
            stroke="#F43F5E"
            strokeWidth="4"
          />

          {/* Functional Groups & Heteroatoms */}
          <circle cx="700" cy="350" r="8" fill="#38BDF8" /> {/* Fluorine */}
          <circle cx="850" cy="380" r="8" fill="#F59E0B" /> {/* Amide Nitrogen */}
          <circle cx="650" cy="440" r="8" fill="#EC4899" /> {/* Carbonyl Oxygen */}

          <text x="670" y="325" fill="#F43F5E" fontSize="18" fontWeight="900" fontFamily="sans-serif">
            LIGAND CORE
          </text>
        </g>

        {/* Hydrogen Bonds / Non-Covalent Vectors (Snapped when docked) */}
        <g opacity={bondOpacity}>
          <line
            x1="580"
            y1="380"
            x2="650"
            y2="380"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <text x="590" y="370" fill="#FBBF24" fontSize="14" fontWeight="800" fontFamily="monospace">
            2.1 Å (H-BOND)
          </text>

          <line
            x1="780"
            y1="360"
            x2="800"
            y2="350"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <text x="785" y="340" fill="#FBBF24" fontSize="14" fontWeight="800" fontFamily="monospace">
            1.9 Å (SALT BRIDGE)
          </text>
        </g>
      </svg>

      {/* Real-time Telemetry Dashboard HUD */}
      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          display: 'flex',
          gap: '30px',
          backgroundColor: 'rgba(2, 6, 23, 0.9)',
          border: '1px solid rgba(6, 182, 212, 0.35)',
          padding: '24px 44px',
          borderRadius: '20px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 30px rgba(6, 182, 212, 0.2)',
          zIndex: 30,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '220px' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>
            BINDING AFFINITY (Kd)
          </span>
          <span style={{ fontSize: '38px', fontWeight: 900, color: '#10B981', fontFamily: 'monospace' }}>
            {kdValue}
          </span>
        </div>

        <div style={{ width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '220px' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>
            GIBBS FREE ENERGY (ΔG)
          </span>
          <span style={{ fontSize: '38px', fontWeight: 900, color: '#38BDF8', fontFamily: 'monospace' }}>
            {liveDeltaG.toFixed(1)} kcal/mol
          </span>
        </div>

        <div style={{ width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '220px' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>
            TARGET SPECIFICITY
          </span>
          <span style={{ fontSize: '38px', fontWeight: 900, color: '#F43F5E', fontFamily: 'monospace' }}>
            99.2% SELECTIVE
          </span>
        </div>
      </div>
    </div>
  );
};
