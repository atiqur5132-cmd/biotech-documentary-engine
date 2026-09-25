import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from 'remotion';

export const ProteinRibbonViewer: React.FC<{
  structureImageSrc: string;
  proteinName: string;
  pdbId: string;
  resolution?: string;
  plddtScore?: number;
  highlightPocket?: string;
}> = ({
  structureImageSrc,
  proteinName,
  pdbId,
  resolution = '1.85 Å',
  plddtScore = 92.4,
  highlightPocket = 'Catalytic Switch II Pocket',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 14 },
  });

  // Continuous subtle 3D floating and micro-pan
  const driftY = interpolate(Math.sin(frame * 0.04), [-1, 1], [-12, 12]);
  const driftX = interpolate(Math.cos(frame * 0.03), [-1, 1], [-10, 10]);
  const zoom = interpolate(frame, [0, 180], [1.0, 1.08], {
    extrapolateRight: 'clamp',
  });

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
      {/* Background Radial Glow aligned with structure */}
      <div
        style={{
          position: 'absolute',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(16, 185, 129, 0.08) 50%, transparent 70%)',
          filter: 'blur(80px)',
          transform: `scale(${zoom})`,
        }}
      />

      {/* Main 3D Molecule Render */}
      <div
        style={{
          position: 'relative',
          width: '1200px',
          height: '800px',
          transform: `scale(${entrance * zoom}) translate3d(${driftX}px, ${driftY}px, 0)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Img
          src={staticFile(structureImageSrc)}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 20px 50px rgba(0, 240, 255, 0.25)) drop-shadow(0 30px 80px rgba(0,0,0,0.9))',
          }}
        />

        {/* Catalytic Binding Pocket Callout Vector */}
        {highlightPocket && (
          <div
            style={{
              position: 'absolute',
              top: '28%',
              right: '22%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(52, 211, 153, 0.5)',
              padding: '10px 20px',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(52, 211, 153, 0.3)',
              transform: `scale(${spring({ frame: frame - 15, fps })})`,
            }}
          >
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#34D399',
                boxShadow: '0 0 12px #34D399',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#38BDF8', letterSpacing: '1px', textTransform: 'uppercase' }}>
                TARGET RESIDUES
              </span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>
                {highlightPocket}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Top Left PDB Metadata HUD */}
      <div
        style={{
          position: 'absolute',
          top: '60px',
          left: '80px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          backgroundColor: 'rgba(2, 6, 23, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '20px 28px',
          borderRadius: '16px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              backgroundColor: '#0284C7',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 900,
              padding: '4px 10px',
              borderRadius: '6px',
            }}
          >
            PDB ID: {pdbId}
          </span>
          <span style={{ color: '#94A3B8', fontSize: '16px', fontWeight: 600 }}>
            {resolution} Cryo-EM / X-Ray
          </span>
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#F8FAFC', margin: '4px 0 0 0' }}>
          {proteinName}
        </h2>
      </div>

      {/* Top Right AlphaFold pLDDT Spectrum HUD */}
      <div
        style={{
          position: 'absolute',
          top: '60px',
          right: '80px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          backgroundColor: 'rgba(2, 6, 23, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '20px 28px',
          borderRadius: '16px',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#94A3B8', letterSpacing: '1px' }}>
            STRUCTURAL CONFIDENCE
          </span>
          <span style={{ fontSize: '22px', fontWeight: 900, color: '#38BDF8', fontFamily: 'monospace' }}>
            {plddtScore.toFixed(1)} pLDDT
          </span>
        </div>

        {/* Color Spectrum Bar */}
        <div
          style={{
            width: '280px',
            height: '10px',
            borderRadius: '6px',
            background: 'linear-gradient(90deg, #FF7D45 0%, #FFDB13 50%, #65CBF3 75%, #0053D6 100%)',
            boxShadow: '0 0 10px rgba(0, 83, 214, 0.5)',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B', fontWeight: 700 }}>
          <span>DISORDERED (&lt;50)</span>
          <span>VERY HIGH (&gt;90)</span>
        </div>
      </div>
    </div>
  );
};
