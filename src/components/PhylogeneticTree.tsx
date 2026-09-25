import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const PhylogeneticTree: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { stiffness: 90, damping: 14 } });
  const branchGrow = interpolate(frame, [0, 80], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${entrance})`,
        overflow: 'hidden',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <span style={{ fontSize: '15px', fontWeight: 900, color: '#38BDF8', letterSpacing: '2px', textTransform: 'uppercase' }}>
          EVOLUTIONARY TAXONOMY
        </span>
        <h1 style={{ fontSize: '46px', fontWeight: 900, color: '#FFFFFF', margin: '4px 0 0 0' }}>
          JUMBO PHAGE EVOLUTIONARY LINEAGE
        </h1>
      </div>

      <div
        style={{
          width: '1400px',
          height: '620px',
          backgroundColor: 'rgba(10, 18, 32, 0.85)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: '24px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.9)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <svg width="1300" height="520" viewBox="0 0 1300 520" style={{ overflow: 'visible' }}>
          {/* Root Ancestor Line */}
          <line x1="100" y1="260" x2="300" y2="260" stroke="#64748B" strokeWidth="4" />
          <circle cx="100" cy="260" r="10" fill="#64748B" />
          <text x="80" y="300" fill="#94A3B8" fontSize="16" fontWeight="700">Root Caudoviricetes</text>

          {/* First Bifurcation */}
          <path
            d={`M 300 260 C 400 260, 420 130, ${420 + branchGrow * 180} 130`}
            fill="none"
            stroke="#0284C7"
            strokeWidth="4"
          />
          <path
            d={`M 300 260 C 400 260, 420 390, ${420 + branchGrow * 180} 390`}
            fill="none"
            stroke="#10B981"
            strokeWidth="5"
          />

          {/* Branch A: Standard Small Phages (Lambda, T4) */}
          {branchGrow > 0.5 && (
            <g transform="translate(600, 130)">
              <line x1="0" y1="0" x2="250" y2="-60" stroke="#0284C7" strokeWidth="3" />
              <circle cx="250" cy="-60" r="8" fill="#38BDF8" />
              <text x="270" y="-55" fill="#F8FAFC" fontSize="18" fontWeight="800">
                Classic Bacteriophages (&lt;50 kb)
              </text>
              <text x="270" y="-30" fill="#64748B" fontSize="14" fontWeight="600">
                Lacks independent replication machinery
              </text>

              <line x1="0" y1="0" x2="250" y2="50" stroke="#0284C7" strokeWidth="3" />
              <circle cx="250" cy="50" r="8" fill="#38BDF8" />
              <text x="270" y="55" fill="#F8FAFC" fontSize="18" fontWeight="800">
                Prophages &amp; Temperate Viruses
              </text>
            </g>
          )}

          {/* Branch B: Jumbo Phages (The ART Carrier Lineage) */}
          {branchGrow > 0.7 && (
            <g transform="translate(600, 390)">
              <line x1="0" y1="0" x2="280" y2="0" stroke="#10B981" strokeWidth="5" />
              <circle cx="280" cy="0" r="14" fill="#10B981" filter="drop-shadow(0 0 15px #10B981)" />

              {/* Glowing Highlight Box */}
              <rect
                x="310"
                y="-45"
                width="340"
                height="90"
                rx="12"
                fill="rgba(16, 185, 129, 0.15)"
                stroke="#10B981"
                strokeWidth="2"
              />
              <text x="330" y="-15" fill="#34D399" fontSize="22" fontWeight="900">
                JUMBO BACTERIOPHAGES
              </text>
              <text x="330" y="15" fill="#F8FAFC" fontSize="15" fontWeight="700">
                &gt;200 kb Genome • ART System Locus
              </text>
              <text x="330" y="34" fill="#94A3B8" fontSize="13" fontWeight="600">
                Array-Associated Reverse Transcriptase
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
