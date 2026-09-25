import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const MutationRadarHeatmap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { stiffness: 90, damping: 14 } });
  const radarSweep = (frame * 6) % 360;

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
      <div style={{ textAlign: 'center', marginBottom: '35px' }}>
        <span style={{ fontSize: '15px', fontWeight: 900, color: '#EF4444', letterSpacing: '2px', textTransform: 'uppercase' }}>
          FIDELITY BOTTLENECK ANALYSIS
        </span>
        <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#FFFFFF', margin: '4px 0 0 0' }}>
          REVERSE TRANSCRIPTASE MUTATION RADAR
        </h1>
      </div>

      <div style={{ display: 'flex', gap: '36px', width: '1450px' }}>
        {/* Left: The Fidelity Contrast HUD */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Human Polymerase */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              borderLeft: '4px solid #10B981',
              borderRadius: '0 16px 16px 0',
              padding: '24px 28px',
            }}
          >
            <span style={{ color: '#10B981', fontSize: '13px', fontWeight: 900, letterSpacing: '1px' }}>
              HIGH-FIDELITY STANDARD
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#F8FAFC', margin: '6px 0 4px 0' }}>
              Human DNA Polymerase (3'-to-5' Proofreading)
            </h3>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#34D399', fontFamily: 'monospace', margin: '8px 0' }}>
              1 error in 1,000,000,000 bases
            </div>
            <p style={{ color: '#94A3B8', fontSize: '15px', margin: 0 }}>
              Exonuclease proofreading cleans typos in real time. Safe for genomic medicine.
            </p>
          </div>

          {/* Reverse Transcriptase (Viral) */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              borderLeft: '4px solid #EF4444',
              borderRadius: '0 16px 16px 0',
              padding: '24px 28px',
              boxShadow: '0 10px 30px rgba(239, 68, 68, 0.2)',
            }}
          >
            <span style={{ color: '#EF4444', fontSize: '13px', fontWeight: 900, letterSpacing: '1px' }}>
              NATURAL ART VULNERABILITY
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#F8FAFC', margin: '6px 0 4px 0' }}>
              Viral Reverse Transcriptase (No Proofreading)
            </h3>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#EF4444', fontFamily: 'monospace', margin: '8px 0' }}>
              1 error in 10,000 bases
            </div>
            <p style={{ color: '#94A3B8', fontSize: '15px', margin: 0 }}>
              100,000x higher mutation rate! Uncontrolled in-vivo use causes lethal off-target genomic chaos.
            </p>
          </div>
        </div>

        {/* Right: Circular Radar Screen */}
        <div
          style={{
            flex: 1.1,
            backgroundColor: 'rgba(2, 6, 23, 0.9)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            borderRadius: '24px',
            padding: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 30px rgba(239, 68, 68, 0.15)',
          }}
        >
          <svg width="460" height="460" viewBox="0 0 460 460">
            {/* Concentric Radar Rings */}
            <circle cx="230" cy="230" r="200" fill="none" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="2" />
            <circle cx="230" cy="230" r="140" fill="none" stroke="rgba(239, 68, 68, 0.25)" strokeWidth="2" />
            <circle cx="230" cy="230" r="80" fill="none" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" />
            <circle cx="230" cy="230" r="20" fill="#EF4444" opacity="0.6" />

            {/* Radar Crosshairs */}
            <line x1="30" y1="230" x2="430" y2="230" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <line x1="230" y1="30" x2="230" y2="430" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />

            {/* Rotating Radar Sweep Line */}
            <g transform={`rotate(${radarSweep}, 230, 230)`}>
              <line x1="230" y1="230" x2="430" y2="230" stroke="#EF4444" strokeWidth="3" filter="drop-shadow(0 0 8px #EF4444)" />
              <path d="M 230 230 L 430 230 A 200 200 0 0 0 410 130 Z" fill="rgba(239, 68, 68, 0.15)" />
            </g>

            {/* Random Blips / Mutation Hits */}
            <circle cx="310" cy="180" r="8" fill="#FBBF24" filter="drop-shadow(0 0 10px #FBBF24)" />
            <circle cx="160" cy="140" r="6" fill="#EF4444" filter="drop-shadow(0 0 10px #EF4444)" />
            <circle cx="180" cy="320" r="10" fill="#EF4444" filter="drop-shadow(0 0 12px #EF4444)" />
            <circle cx="340" cy="290" r="7" fill="#FBBF24" filter="drop-shadow(0 0 10px #FBBF24)" />
          </svg>

          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid #EF4444',
              color: '#FCA5A5',
              padding: '6px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 900,
            }}
          >
            HAZARD: OFF-TARGET INSERTIONS DETECTED
          </div>
        </div>
      </div>
    </div>
  );
};
