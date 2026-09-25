import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const MetagenomicFunnel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { stiffness: 90, damping: 14 } });

  // Funnel stage triggers
  const stage1 = spring({ frame: frame - 10, fps });
  const stage2 = spring({ frame: frame - 35, fps });
  const stage3 = spring({ frame: frame - 60, fps });

  // Numbers counting down
  const count1 = interpolate(stage1, [0, 1], [1900000000, 200000]);
  const count2 = interpolate(stage2, [0, 1], [200000, 3500]);
  const count3 = interpolate(stage3, [0, 1], [3500, 20]);

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
      {/* Title Header */}
      <div style={{ textAlign: 'center', marginBottom: '35px' }}>
        <span style={{ fontSize: '15px', fontWeight: 900, color: '#38BDF8', letterSpacing: '2px', textTransform: 'uppercase' }}>
          AUTONOMOUS 950-AGENT FILTRATION PIPELINE
        </span>
        <h1 style={{ fontSize: '46px', fontWeight: 900, color: '#FFFFFF', margin: '4px 0 0 0' }}>
          PLANETARY METAGENOMIC FUNNEL
        </h1>
      </div>

      {/* 4-Stage Horizontal Data Conduit */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '1500px' }}>
        {/* Stage 1: 1.9 Billion */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#38BDF8', letterSpacing: '1px' }}>
            STAGE 01: RAW CLUSTERS
          </span>
          <div style={{ fontSize: '38px', fontWeight: 900, color: '#FFFFFF', fontFamily: 'monospace', margin: '10px 0' }}>
            1.9 BILLION
          </div>
          <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>
            Uncharacterized viral dark genome protein sequences
          </p>
        </div>

        {/* Funnel Arrow */}
        <div style={{ color: '#06B6D4', fontSize: '28px', fontWeight: 900 }}>→</div>

        {/* Stage 2: 200,000 RTs */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#10B981', letterSpacing: '1px' }}>
            STAGE 02: REVERSE TRANSCRIPTASES
          </span>
          <div style={{ fontSize: '38px', fontWeight: 900, color: '#34D399', fontFamily: 'monospace', margin: '10px 0' }}>
            {Math.floor(count1).toLocaleString()}
          </div>
          <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>
            Filtered for RNA-dependent DNA polymerase motifs
          </p>
        </div>

        {/* Funnel Arrow */}
        <div style={{ color: '#10B981', fontSize: '28px', fontWeight: 900 }}>→</div>

        {/* Stage 3: 3,500 Conserved */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#F59E0B', letterSpacing: '1px' }}>
            STAGE 03: CONSERVED NEIGHBORHOODS
          </span>
          <div style={{ fontSize: '38px', fontWeight: 900, color: '#FBBF24', fontFamily: 'monospace', margin: '10px 0' }}>
            {Math.floor(count2).toLocaleString()}
          </div>
          <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>
            Evolutionary conservation across phage lineages
          </p>
        </div>

        {/* Funnel Arrow */}
        <div style={{ color: '#F59E0B', fontSize: '28px', fontWeight: 900 }}>→</div>

        {/* Stage 4: Top 20 ART Systems */}
        <div
          style={{
            flex: 1.1,
            backgroundColor: 'rgba(10, 18, 32, 0.95)',
            border: '2px solid #8B5CF6',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 20px 60px rgba(139, 92, 246, 0.3)',
            transform: `scale(${stage3 > 0.8 ? 1.05 : 1.0})`,
            transition: 'transform 0.3s ease',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#A78BFA', letterSpacing: '1px' }}>
            STAGE 04: ISOLATED SYSTEMS
          </span>
          <div style={{ fontSize: '44px', fontWeight: 900, color: '#C084FC', fontFamily: 'monospace', margin: '10px 0' }}>
            {Math.floor(count3)} ART SYSTEMS
          </div>
          <p style={{ color: '#E2E8F0', fontSize: '14px', margin: 0, fontWeight: 700 }}>
            Reverse Transcriptase + Tandem Repeat Array
          </p>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div
        style={{
          marginTop: '40px',
          display: 'flex',
          gap: '40px',
          backgroundColor: 'rgba(2, 6, 23, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '16px 36px',
          borderRadius: '999px',
        }}
      >
        <span style={{ color: '#94A3B8', fontSize: '16px', fontWeight: 700 }}>
          TOTAL AGENTS: <strong style={{ color: '#38BDF8' }}>950 CLAUDE UNITS</strong>
        </span>
        <span style={{ color: '#475569' }}>|</span>
        <span style={{ color: '#94A3B8', fontSize: '16px', fontWeight: 700 }}>
          RUN DURATION: <strong style={{ color: '#10B981' }}>21 HOURS AUTONOMOUS</strong>
        </span>
        <span style={{ color: '#475569' }}>|</span>
        <span style={{ color: '#94A3B8', fontSize: '16px', fontWeight: 700 }}>
          CONTEXT TOKENS: <strong style={{ color: '#F59E0B' }}>210,000,000 TOKENS</strong>
        </span>
      </div>
    </div>
  );
};
