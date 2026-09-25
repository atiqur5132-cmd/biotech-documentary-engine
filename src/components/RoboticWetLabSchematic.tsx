import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const RoboticWetLabSchematic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { stiffness: 90, damping: 14 } });

  // Robotic gantry movement across 96-well plate
  const gantryX = interpolate(Math.sin(frame * 0.05), [-1, 1], [-250, 250]);
  const dispenseDroplet = (frame * 8) % 30 < 15;

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
          PHYSICAL EXPERIMENTAL VALIDATION
        </span>
        <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#FFFFFF', margin: '4px 0 0 0' }}>
          ANTHROPIC ROBOTIC WET LAB
        </h1>
      </div>

      {/* Robotic Liquid Handling Platform Canvas */}
      <div
        style={{
          width: '1450px',
          height: '620px',
          backgroundColor: 'rgba(10, 18, 32, 0.85)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: '24px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 40px rgba(16, 185, 129, 0.15)',
          backdropFilter: 'blur(25px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          padding: '30px',
        }}
      >
        {/* Top Rail Gantry System */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            width: '90%',
            height: '16px',
            backgroundColor: '#1E293B',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        />

        {/* Moving Pipetting Head Assembly */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            transform: `translateX(${gantryX}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          {/* Gantry Car */}
          <div
            style={{
              width: '180px',
              height: '36px',
              backgroundColor: '#0F172A',
              border: '2px solid #38BDF8',
              borderRadius: '8px',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38BDF8',
              fontSize: '12px',
              fontWeight: 900,
            }}
          >
            ROBOTIC GANTRY
          </div>

          {/* 8-Channel Pipette Tips */}
          <div style={{ display: 'flex', gap: '14px', marginTop: '4px' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '6px',
                  height: '70px',
                  backgroundColor: '#94A3B8',
                  borderRadius: '0 0 3px 3px',
                  boxShadow: '0 0 8px rgba(148, 163, 184, 0.5)',
                  position: 'relative',
                }}
              >
                {/* Active Reagent Droplet */}
                {dispenseDroplet && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-12px',
                      left: '-2px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      boxShadow: '0 0 10px #10B981',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 96-Well Microplate Grid (Bottom Stage) */}
        <div
          style={{
            marginTop: '170px',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '12px',
            padding: '24px 36px',
            backgroundColor: 'rgba(2, 6, 23, 0.9)',
            border: '2px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
          }}
        >
          {Array.from({ length: 48 }).map((_, idx) => {
            const hasFluid = (idx + frame) % 7 === 0;
            return (
              <div
                key={idx}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: hasFluid ? 'rgba(16, 185, 129, 0.4)' : '#0F172A',
                  border: `2px solid ${hasFluid ? '#34D399' : 'rgba(255, 255, 255, 0.1)'}`,
                  boxShadow: hasFluid ? '0 0 15px rgba(52, 211, 153, 0.8)' : 'none',
                }}
              />
            );
          })}
        </div>

        {/* Telemetry Footer */}
        <div
          style={{
            marginTop: '30px',
            display: 'flex',
            gap: '30px',
            color: '#94A3B8',
            fontSize: '15px',
            fontWeight: 700,
            fontFamily: 'monospace',
          }}
        >
          <span>FACILITY: <strong style={{ color: '#38BDF8' }}>SAN FRANCISCO BAY ROBOTIC WET LAB</strong></span>
          <span>•</span>
          <span>PLATFORM: <strong style={{ color: '#10B981' }}>COEFFICIENT BIO SYNTHESIS SUITE</strong></span>
          <span>•</span>
          <span>ASSAY: <strong style={{ color: '#F59E0B' }}>IN-VITRO REVERSE TRANSCRIPTASE PROOF</strong></span>
        </div>
      </div>
    </div>
  );
};
