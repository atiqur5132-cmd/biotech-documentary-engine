import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const LipidMembraneBarrier: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { stiffness: 90, damping: 14 } });

  // Nanoparticle bounce off membrane
  const particleX = interpolate(Math.sin(frame * 0.08), [-1, 1], [-60, 60]);

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
          CLINICAL TRANSLATION BARRIER
        </span>
        <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#FFFFFF', margin: '4px 0 0 0' }}>
          THE CELLULAR DELIVERY WALL
        </h1>
      </div>

      <div style={{ display: 'flex', gap: '30px', width: '1450px' }}>
        {/* Left: 3 Hard Scientific Bottlenecks */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              borderLeft: '4px solid #EF4444',
              borderRadius: '0 16px 16px 0',
              padding: '20px 24px',
            }}
          >
            <span style={{ color: '#EF4444', fontSize: '13px', fontWeight: 900, letterSpacing: '1px' }}>
              BOTTLENECK 01
            </span>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#F8FAFC', margin: '6px 0 4px 0' }}>
              High Mutation Error Rate
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '15px', margin: 0 }}>
              Natural Reverse Transcriptases lack 3'-to-5' exonuclease proofreading, risking lethal off-target point mutations.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              borderLeft: '4px solid #F59E0B',
              borderRadius: '0 16px 16px 0',
              padding: '20px 24px',
            }}
          >
            <span style={{ color: '#F59E0B', fontSize: '13px', fontWeight: 900, letterSpacing: '1px' }}>
              BOTTLENECK 02
            </span>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#F8FAFC', margin: '6px 0 4px 0' }}>
              Membrane Penetration & Delivery
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '15px', margin: 0 }}>
              Delivering multi-component RT protein complexes across human lipid bilayers remains unsolved at therapeutic scale.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              borderLeft: '4px solid #06B6D4',
              borderRadius: '0 16px 16px 0',
              padding: '20px 24px',
            }}
          >
            <span style={{ color: '#06B6D4', fontSize: '13px', fontWeight: 900, letterSpacing: '1px' }}>
              BOTTLENECK 03
            </span>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#F8FAFC', margin: '6px 0 4px 0' }}>
              Unproven In-Vivo Function
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '15px', margin: 0 }}>
              Database prediction ≠ Living cell efficacy. Strict wet-lab characterization required.
            </p>
          </div>
        </div>

        {/* Right: 2.5D Delivery Simulation Graphic */}
        <div
          style={{
            flex: 1.2,
            backgroundColor: 'rgba(2, 6, 23, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Simulated Lipid Nanoparticle (LNP) */}
          <div
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              backgroundColor: 'rgba(245, 158, 11, 0.25)',
              border: '3px solid #F59E0B',
              boxShadow: '0 0 35px rgba(245, 158, 11, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `translateX(${particleX}px)`,
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#FBBF24', letterSpacing: '1px' }}>
              LNP VEHICLE
            </span>
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#FFF' }}>
              ART Complex
            </span>
          </div>

          {/* Dense Cellular Membrane Barrier */}
          <div
            style={{
              marginTop: '50px',
              width: '90%',
              height: '40px',
              borderRadius: '20px',
              backgroundColor: '#1E293B',
              border: '2px solid #EF4444',
              boxShadow: '0 0 25px rgba(239, 68, 68, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#EF4444', fontSize: '14px', fontWeight: 900, letterSpacing: '2px' }}>
              ⛔ CELLULAR BILAYER BARRIER (ENDOSOMAL TRAP)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
