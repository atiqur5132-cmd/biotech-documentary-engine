import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const DNASequenceAlignment: React.FC<{
  geneName: string;
  variantMutation: string; // e.g. "c.34G>T (p.G12C)"
  impactScore?: number; // e.g. 0.96
}> = ({
  geneName,
  variantMutation,
  impactScore = 0.98,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { stiffness: 110, damping: 15 },
  });

  const basePairs = [
    { num: 10, top: 'A', bot: 'T', colorTop: '#10B981', colorBot: '#F43F5E' },
    { num: 11, top: 'T', bot: 'A', colorTop: '#F43F5E', colorBot: '#10B981' },
    { num: 12, top: 'G', bot: 'C', colorTop: '#06B6D4', colorBot: '#F59E0B', isMutated: true },
    { num: 13, top: 'C', bot: 'G', colorTop: '#F59E0B', colorBot: '#06B6D4' },
    { num: 14, top: 'A', bot: 'T', colorTop: '#10B981', colorBot: '#F43F5E' },
    { num: 15, top: 'G', bot: 'C', colorTop: '#06B6D4', colorBot: '#F59E0B' },
    { num: 16, top: 'T', bot: 'A', colorTop: '#F43F5E', colorBot: '#10B981' },
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
      }}
    >
      {/* Top Header Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '50px',
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          padding: '16px 36px',
          borderRadius: '999px',
          boxShadow: '0 0 30px rgba(139, 92, 246, 0.25)',
        }}
      >
        <span style={{ fontSize: '18px', fontWeight: 900, color: '#A78BFA', letterSpacing: '2px' }}>
          GENOMIC LOCUS ANALYSIS
        </span>
        <span style={{ color: '#475569' }}>|</span>
        <span style={{ fontSize: '26px', fontWeight: 900, color: '#FFFFFF' }}>
          {geneName}
        </span>
        <span style={{ backgroundColor: '#EF4444', color: '#FFF', fontSize: '15px', fontWeight: 800, padding: '4px 12px', borderRadius: '6px' }}>
          {variantMutation}
        </span>
      </div>

      {/* Kinetic DNA Double Helix Ladder */}
      <div
        style={{
          display: 'flex',
          gap: '28px',
          padding: '40px',
          backgroundColor: 'rgba(2, 6, 23, 0.85)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.9)',
        }}
      >
        {basePairs.map((bp, i) => {
          // Double helix 3D sinusoidal vertical displacement
          const phase = frame * 0.08 + i * 0.9;
          const offsetY = Math.sin(phase) * 35;
          const scale = interpolate(Math.cos(phase), [-1, 1], [0.85, 1.15]);

          return (
            <div
              key={bp.num}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                position: 'relative',
              }}
            >
              {/* Locus Index */}
              <span style={{ fontSize: '14px', fontFamily: 'monospace', color: bp.isMutated ? '#EF4444' : '#64748B', fontWeight: 700 }}>
                #{bp.num}
              </span>

              {/* Top Strand Base */}
              <div
                style={{
                  width: '75px',
                  height: '75px',
                  borderRadius: '16px',
                  backgroundColor: bp.isMutated ? '#EF4444' : bp.colorTop,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  fontWeight: 900,
                  transform: `translateY(${offsetY}px) scale(${scale})`,
                  boxShadow: bp.isMutated
                    ? '0 0 30px #EF4444, 0 10px 20px rgba(0,0,0,0.8)'
                    : `0 0 20px ${bp.colorTop}aa`,
                }}
              >
                {bp.top}
              </div>

              {/* Hydrogen Bond Connector */}
              <div
                style={{
                  width: '3px',
                  height: '80px',
                  backgroundColor: bp.isMutated ? '#EF4444' : 'rgba(255, 255, 255, 0.25)',
                  boxShadow: bp.isMutated ? '0 0 10px #EF4444' : 'none',
                }}
              />

              {/* Bottom Strand Base */}
              <div
                style={{
                  width: '75px',
                  height: '75px',
                  borderRadius: '16px',
                  backgroundColor: bp.isMutated ? '#EF4444' : bp.colorBot,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  fontWeight: 900,
                  transform: `translateY(${-offsetY}px) scale(${scale})`,
                  boxShadow: bp.isMutated
                    ? '0 0 30px #EF4444, 0 10px 20px rgba(0,0,0,0.8)'
                    : `0 0 20px ${bp.colorBot}aa`,
                }}
              >
                {bp.bot}
              </div>

              {/* Mutation Callout Flag */}
              {bp.isMutated && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-65px',
                    backgroundColor: '#EF4444',
                    color: '#FFF',
                    fontSize: '13px',
                    fontWeight: 900,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 0 15px #EF4444',
                  }}
                >
                  DRIVER MUTATION
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pathogenicity & AlphaGenome Impact Dial */}
      <div
        style={{
          marginTop: '45px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          padding: '16px 36px',
          borderRadius: '16px',
        }}
      >
        <span style={{ fontSize: '16px', fontWeight: 800, color: '#94A3B8' }}>
          ALPHAGENOME VARIANT IMPACT (AVI):
        </span>
        <span style={{ fontSize: '32px', fontWeight: 900, color: '#EF4444', fontFamily: 'monospace' }}>
          {impactScore.toFixed(2)} / 1.00
        </span>
        <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#F87171', padding: '6px 14px', borderRadius: '8px', fontSize: '15px', fontWeight: 800 }}>
          HIGH-CONFIDENCE PATHOGENIC
        </span>
      </div>
    </div>
  );
};
