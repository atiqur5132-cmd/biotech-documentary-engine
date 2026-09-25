import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const CrisprVsArtComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { stiffness: 100, damping: 14 } });

  // Cut action in CRISPR
  const cutAction = interpolate(Math.sin(frame * 0.1), [-1, 1], [0, 1]);
  // Write action in ART
  const writeProgress = (frame * 3) % 400;

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
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{ fontSize: '15px', fontWeight: 900, color: '#A78BFA', letterSpacing: '2px', textTransform: 'uppercase' }}>
          GENOMIC MECHANISM COMPARISON
        </span>
        <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#FFFFFF', margin: '4px 0 0 0' }}>
          CRISPR SCISSORS vs ART TYPEWRITER
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', width: '1450px' }}>
        {/* Track 1: CRISPR-Cas9 (Cutting) */}
        <div
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '24px',
            padding: '30px 40px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ width: '380px' }}>
            <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', fontSize: '14px', fontWeight: 900, padding: '4px 12px', borderRadius: '6px' }}>
              CRISPR-CAS9 MECHANISM
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#FFFFFF', margin: '12px 0 6px 0' }}>
              MOLECULAR SCISSORS
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '16px', margin: 0 }}>
              Endonuclease cleavage: Slices and breaks targeted double-stranded DNA.
            </p>
          </div>

          {/* Animated Cutting Graphic */}
          <div style={{ position: 'relative', width: '600px', height: '90px', display: 'flex', alignItems: 'center' }}>
            {/* Left DNA Strand */}
            <div style={{ flex: 1, height: '14px', backgroundColor: '#38BDF8', borderRadius: '4px', transform: `translateX(-${cutAction * 15}px)` }} />
            {/* Cleavage Gap */}
            <div style={{ width: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span style={{ color: '#EF4444', fontSize: '28px', fontWeight: 900, transform: `scale(${1 + cutAction * 0.3})` }}>
                ✂
              </span>
            </div>
            {/* Right DNA Strand */}
            <div style={{ flex: 1, height: '14px', backgroundColor: '#38BDF8', borderRadius: '4px', transform: `translateX(${cutAction * 15}px)` }} />
          </div>

          <div style={{ textAlign: 'right', minWidth: '180px' }}>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#EF4444', fontFamily: 'monospace' }}>
              DSB BREAK
            </div>
            <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 700 }}>
              DESTRUCTIVE EDIT
            </div>
          </div>
        </div>

        {/* Track 2: ART System (Writing) */}
        <div
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '2px solid rgba(16, 185, 129, 0.6)',
            borderRadius: '24px',
            padding: '30px 40px',
            boxShadow: '0 20px 60px rgba(16, 185, 129, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ width: '380px' }}>
            <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10B981', fontSize: '14px', fontWeight: 900, padding: '4px 12px', borderRadius: '6px' }}>
              ART ENZYME MECHANISM
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#FFFFFF', margin: '12px 0 6px 0' }}>
              BIOLOGICAL TYPEWRITER
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '16px', margin: 0 }}>
              Array-associated reverse transcriptase: Synthesizes and writes new DNA directly.
            </p>
          </div>

          {/* Animated Writing Graphic */}
          <div style={{ position: 'relative', width: '600px', height: '90px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Template RNA Strand (Red) */}
            <div style={{ width: '100%', height: '8px', backgroundColor: '#F43F5E', borderRadius: '4px', marginBottom: '14px', opacity: 0.7 }} />
            {/* Growing Synthesized DNA Strand (Emerald) */}
            <div
              style={{
                width: `${Math.min(100, (writeProgress / 400) * 100)}%`,
                height: '14px',
                backgroundColor: '#10B981',
                borderRadius: '4px',
                boxShadow: '0 0 20px #10B981',
                position: 'relative',
              }}
            >
              {/* Typewriter Cursor Head */}
              <div
                style={{
                  position: 'absolute',
                  right: '-10px',
                  top: '-8px',
                  width: '20px',
                  height: '30px',
                  borderRadius: '4px',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 0 15px #FFFFFF',
                }}
              />
            </div>
          </div>

          <div style={{ textAlign: 'right', minWidth: '180px' }}>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#10B981', fontFamily: 'monospace' }}>
              SYNTHESIS
            </div>
            <div style={{ fontSize: '13px', color: '#34D399', fontWeight: 700 }}>
              CONSTRUCTIVE WRITE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
