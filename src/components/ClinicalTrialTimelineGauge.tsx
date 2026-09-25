import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const ClinicalTrialTimelineGauge: React.FC<{
  drugCandidate: string;
  indication: string;
  activePhaseIndex?: number; // 0 to 6
  posRate?: string; // e.g. "24.5% PoS"
}> = ({
  drugCandidate = 'AI-4089 / Sotorasib Analog',
  indication = 'Non-Small Cell Lung Cancer (NSCLC)',
  activePhaseIndex = 3, // Phase 1
  posRate = '18.4% Cumulative PoS',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 14 },
  });

  const phases = [
    { name: 'Target ID', desc: 'AlphaFold / Pocket Discovery' },
    { name: 'Lead Opt', desc: 'Diffusion De Novo Design' },
    { name: 'Preclinical', desc: 'In-Vitro / Animal PK' },
    { name: 'Phase 1', desc: 'Safety & Dose Escalation' },
    { name: 'Phase 2', desc: 'Efficacy Proof-of-Concept' },
    { name: 'Phase 3', desc: 'Randomized Pivotal Trial' },
    { name: 'FDA Review', desc: 'NDA / Approval' },
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
      {/* Top Header Card */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '1500px',
          marginBottom: '50px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '24px 36px',
          borderRadius: '20px',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#38BDF8', letterSpacing: '2px', textTransform: 'uppercase' }}>
            TRANSLATIONAL PIPELINE TRACKER
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#FFFFFF', margin: '4px 0 0 0' }}>
            {drugCandidate}
          </h2>
          <span style={{ fontSize: '18px', color: '#94A3B8', fontWeight: 600, marginTop: '4px' }}>
            Indication: {indication}
          </span>
        </div>

        <div
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.5)',
            padding: '12px 24px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 12px #10B981' }} />
          <span style={{ fontSize: '22px', fontWeight: 900, color: '#34D399', fontFamily: 'monospace' }}>
            {posRate}
          </span>
        </div>
      </div>

      {/* 7-Step Interactive Pipeline Track */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '1500px',
          position: 'relative',
        }}
      >
        {/* Connecting Track Line */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            left: '50px',
            right: '50px',
            height: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '3px',
            zIndex: 1,
          }}
        />

        {/* Progress Filled Track */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            left: '50px',
            width: `${(activePhaseIndex / (phases.length - 1)) * 1400}px`,
            height: '6px',
            backgroundColor: '#10B981',
            boxShadow: '0 0 15px #10B981',
            borderRadius: '3px',
            zIndex: 2,
          }}
        />

        {phases.map((p, idx) => {
          const isCompleted = idx < activePhaseIndex;
          const isActive = idx === activePhaseIndex;
          const isUpcoming = idx > activePhaseIndex;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 5,
                width: '180px',
              }}
            >
              {/* Node Circle */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? '#10B981' : isCompleted ? '#065F46' : '#0F172A',
                  border: `3px solid ${isActive ? '#34D399' : isCompleted ? '#10B981' : 'rgba(255,255,255,0.2)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  boxShadow: isActive ? '0 0 25px #10B981' : 'none',
                  transform: isActive ? `scale(${interpolate(Math.sin(frame * 0.1), [-1, 1], [1.0, 1.1])})` : 'scale(1)',
                }}
              >
                {isCompleted ? '✓' : idx + 1}
              </div>

              {/* Phase Name */}
              <span
                style={{
                  marginTop: '16px',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: isActive ? '#34D399' : isCompleted ? '#F8FAFC' : '#64748B',
                  textAlign: 'center',
                }}
              >
                {p.name}
              </span>

              {/* Phase Desc */}
              <span
                style={{
                  marginTop: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#94A3B8',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                {p.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
