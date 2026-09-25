import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from 'remotion';

export const PaperDossierViewer: React.FC<{
  journal: 'Nature' | 'Science' | 'Cell' | 'Nature Biotechnology' | 'bioRxiv';
  title: string;
  leadLab: string;
  doi: string;
  year: number;
  figureImageSrc?: string;
  figureCaption?: string;
}> = ({
  journal,
  title,
  leadLab,
  doi,
  year,
  figureImageSrc,
  figureCaption = 'Primary experimental data & binding isotherms',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { stiffness: 120, damping: 15 },
  });

  const subtleZoom = interpolate(frame, [0, 150], [1.0, 1.05], {
    extrapolateRight: 'clamp',
  });

  // Journal color branding
  const getJournalStyle = () => {
    switch (journal) {
      case 'Nature':
      case 'Nature Biotechnology':
        return { bg: '#E11D48', text: '#FFFFFF', name: journal.toUpperCase() };
      case 'Science':
        return { bg: '#B91C1C', text: '#FFFFFF', name: 'SCIENCE' };
      case 'Cell':
        return { bg: '#2563EB', text: '#FFFFFF', name: 'CELL' };
      case 'bioRxiv':
      default:
        return { bg: '#9333EA', text: '#FFFFFF', name: 'BIORXIV PREPRINT' };
    }
  };

  const jStyle = getJournalStyle();

  return (
    <div
      style={{
        position: 'absolute',
        top: '60px',
        left: '50%',
        width: '1640px',
        height: '840px',
        transform: `translateX(-50%) scale(${entrance * subtleZoom})`,
        backgroundColor: 'rgba(10, 18, 32, 0.85)',
        border: '1px solid rgba(16, 185, 129, 0.35)',
        borderRadius: '24px',
        backdropFilter: 'blur(25px)',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 20,
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 36px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              backgroundColor: jStyle.bg,
              color: jStyle.text,
              fontSize: '18px',
              fontWeight: 900,
              padding: '6px 18px',
              borderRadius: '8px',
              letterSpacing: '1px',
              boxShadow: `0 0 20px ${jStyle.bg}66`,
            }}
          >
            {jStyle.name}
          </div>
          <span style={{ color: '#94A3B8', fontSize: '20px', fontWeight: 600 }}>
            {leadLab} • ({year})
          </span>
        </div>

        {/* DOI Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            padding: '8px 20px',
            borderRadius: '999px',
            color: '#34D399',
            fontSize: '17px',
            fontWeight: 700,
            fontFamily: 'monospace',
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 10px #10B981' }} />
          VERIFIED PEER-REVIEWED: doi:{doi}
        </div>
      </div>

      {/* Main Content Body */}
      <div style={{ display: 'flex', flex: 1, padding: '36px', gap: '36px' }}>
        {/* Left Column: Title & Abstract Context */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div
            style={{
              fontSize: '15px',
              fontWeight: 800,
              color: '#38BDF8',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            PRIMARY LITERATURE EVIDENCE
          </div>
          <h1
            style={{
              fontSize: '44px',
              lineHeight: 1.25,
              fontWeight: 800,
              color: '#F8FAFC',
              fontFamily: 'system-ui, sans-serif',
              marginBottom: '28px',
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}
          >
            {title}
          </h1>

          <div
            style={{
              backgroundColor: 'rgba(2, 6, 23, 0.7)',
              borderLeft: '4px solid #10B981',
              padding: '20px 24px',
              borderRadius: '0 12px 12px 0',
            }}
          >
            <div style={{ color: '#E2E8F0', fontSize: '20px', lineHeight: 1.5, fontWeight: 500 }}>
              {figureCaption}
            </div>
          </div>
        </div>

        {/* Right Column: High-DPI Figure Viewport */}
        {figureImageSrc && (
          <div
            style={{
              flex: 1.2,
              position: 'relative',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backgroundColor: '#020617',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Img
              src={staticFile(figureImageSrc)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />

            {/* Glowing Scanline Highlighter */}
            <div
              style={{
                position: 'absolute',
                top: `${(frame * 2.5) % 100}%`,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #10B981, transparent)',
                boxShadow: '0 0 15px #10B981',
                opacity: 0.7,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
