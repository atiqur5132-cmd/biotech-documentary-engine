import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from 'remotion';

export const DeepMindVsAnthropic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { stiffness: 90, damping: 14 } });

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
        <span style={{ fontSize: '15px', fontWeight: 900, color: '#38BDF8', letterSpacing: '2px', textTransform: 'uppercase' }}>
          SILICON VALLEY STRATEGY WAR
        </span>
        <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#FFFFFF', margin: '4px 0 0 0' }}>
          THE TWO FRONTIER BIOLOGY MODELS
        </h1>
      </div>

      <div style={{ display: 'flex', gap: '36px', width: '1450px' }}>
        {/* DeepMind / Isomorphic Labs Card */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', fontSize: '13px', fontWeight: 900, padding: '4px 12px', borderRadius: '6px' }}>
                PURE IN-SILICO PLATFORM
              </span>
              <span style={{ color: '#64748B', fontWeight: 700, fontSize: '14px' }}>EST. 2020</span>
            </div>

            <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#FFFFFF', margin: '20px 0 8px 0' }}>
              Google DeepMind / Isomorphic
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '17px', lineHeight: 1.5 }}>
              AlphaFold 3 &amp; structural prediction. Focuses on digital simulation, atomic coordinate modeling, and licensing models to external pharma labs.
            </p>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ color: '#38BDF8', fontSize: '15px', fontWeight: 800 }}>• In-silico protein structure prediction</div>
              <div style={{ color: '#38BDF8', fontSize: '15px', fontWeight: 800 }}>• Partnered drug discovery pipeline</div>
              <div style={{ color: '#38BDF8', fontSize: '15px', fontWeight: 800 }}>• Zero internal physical manufacturing</div>
            </div>
          </div>

          <div style={{ marginTop: '30px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px', color: '#64748B', fontSize: '14px', fontWeight: 700 }}>
            CORE ADVANTAGE: 200M+ PREDICTED STRUCTURES
          </div>
        </div>

        {/* Anthropic Life Sciences Card */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'rgba(10, 18, 32, 0.95)',
            border: '2px solid #10B981',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: '0 20px 60px rgba(16, 185, 129, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34D399', fontSize: '13px', fontWeight: 900, padding: '4px 12px', borderRadius: '6px' }}>
                AUTONOMOUS SWARM + WET LAB
              </span>
              <span style={{ color: '#34D399', fontWeight: 800, fontSize: '14px' }}>SEPT 2026</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '20px 0 8px 0' }}>
              <Img src={staticFile('logos/anthropic_logo.png')} style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
              <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
                Anthropic Life Sciences
              </h2>
            </div>

            <p style={{ color: '#94A3B8', fontSize: '17px', lineHeight: 1.5 }}>
              Autonomous Claude research swarms + Physical SF Robotic Wet Lab. They formulate hypotheses, mine metagenomes, and synthesize physical enzymes internally.
            </p>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ color: '#34D399', fontSize: '15px', fontWeight: 800 }}>• 950-Agent autonomous hypothesis generation</div>
              <div style={{ color: '#34D399', fontSize: '15px', fontWeight: 800 }}>• Physical San Francisco robotic wet lab</div>
              <div style={{ color: '#34D399', fontSize: '15px', fontWeight: 800 }}>• Life Sciences Verification Program (LSVP)</div>
            </div>
          </div>

          <div style={{ marginTop: '30px', borderTop: '1px solid rgba(16, 185, 129, 0.3)', paddingTop: '16px', color: '#10B981', fontSize: '14px', fontWeight: 900 }}>
            CORE ADVANTAGE: FULL STACK (AI TO PHYSICAL SYNTHESIS)
          </div>
        </div>
      </div>
    </div>
  );
};
