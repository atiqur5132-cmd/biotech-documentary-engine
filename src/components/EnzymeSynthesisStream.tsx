import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const EnzymeSynthesisStream: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { stiffness: 90, damping: 14 } });

  // Polymerization stream offset
  const streamOffset = (frame * 5) % 200;

  const bases = [
    { rna: 'A', dna: 'T', colorRna: '#F43F5E', colorDna: '#10B981' },
    { rna: 'U', dna: 'A', colorRna: '#FB7185', colorDna: '#34D399' },
    { rna: 'G', dna: 'C', colorRna: '#06B6D4', colorDna: '#F59E0B' },
    { rna: 'C', dna: 'G', colorRna: '#38BDF8', colorDna: '#D97706' },
    { rna: 'A', dna: 'T', colorRna: '#F43F5E', colorDna: '#10B981' },
    { rna: 'G', dna: 'C', colorRna: '#06B6D4', colorDna: '#F59E0B' },
    { rna: 'U', dna: 'A', colorRna: '#FB7185', colorDna: '#34D399' },
    { rna: 'C', dna: 'G', colorRna: '#38BDF8', colorDna: '#D97706' },
  ];

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
        <span style={{ fontSize: '15px', fontWeight: 900, color: '#10B981', letterSpacing: '2px', textTransform: 'uppercase' }}>
          CATALYTIC SYNTHESIS DYNAMICS
        </span>
        <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#FFFFFF', margin: '4px 0 0 0' }}>
          REVERSE TRANSCRIPTASE ACTIVE CLEFT
        </h1>
      </div>

      <div
        style={{
          width: '1450px',
          height: '600px',
          backgroundColor: 'rgba(10, 18, 32, 0.85)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '24px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 40px rgba(16, 185, 129, 0.15)',
          backdropFilter: 'blur(25px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Palm Domain Active Enzyme Core (Center Ring) */}
        <div
          style={{
            position: 'absolute',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            backgroundColor: 'rgba(6, 182, 212, 0.08)',
            border: '2px dashed rgba(6, 182, 212, 0.5)',
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ position: 'absolute', top: '24px', color: '#38BDF8', fontSize: '13px', fontWeight: 900, letterSpacing: '2px' }}>
            CATALYTIC PALM DOMAIN (POLYGON)
          </span>
        </div>

        {/* Nucleotide Polymerization Stream */}
        <div style={{ display: 'flex', gap: '32px', transform: `translateX(${streamOffset}px)` }}>
          {bases.map((b, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              {/* Top Template RNA Base */}
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '16px',
                  backgroundColor: b.colorRna,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  boxShadow: `0 0 20px ${b.colorRna}aa`,
                }}
              >
                {b.rna}
              </div>

              {/* Hydrogen Bond Dash */}
              <div style={{ width: '4px', height: '60px', backgroundColor: 'rgba(255, 255, 255, 0.3)', boxShadow: '0 0 10px #FFFFFF' }} />

              {/* Bottom Synthesized DNA Base */}
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '16px',
                  backgroundColor: b.colorDna,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  boxShadow: `0 0 20px ${b.colorDna}aa`,
                }}
              >
                {b.dna}
              </div>
            </div>
          ))}
        </div>

        {/* Labels on Strands */}
        <div style={{ position: 'absolute', left: '60px', top: '160px', color: '#F43F5E', fontSize: '18px', fontWeight: 900, letterSpacing: '1px' }}>
          5' ← SINGLE-STRANDED RNA TEMPLATE
        </div>
        <div style={{ position: 'absolute', left: '60px', bottom: '160px', color: '#10B981', fontSize: '18px', fontWeight: 900, letterSpacing: '1px' }}>
          3' → NEWLY SYNTHESIZED COMPLEMENTARY DNA
        </div>
      </div>
    </div>
  );
};
