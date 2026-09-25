import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';

export interface BiotechThumbnailProps {
  brandName: string;
  brandLogo: string;
  kicker: string;
  heroText: string;
  themeColor: string; // e.g. '#F59E0B' (Anthropic Amber), '#0091FF' (DeepMind Blue), '#10B981' (Emerald)
  kickerColor?: string;
  moleculeImage?: string;
  heroFontSize?: number;
}

// Generates an undulating 3D particle mesh matching the reference image's digital terrain
const ParticleWave: React.FC<{ color: string }> = ({ color }) => {
  const cols = 55;
  const rows = 26;
  const dots: { x: number; y: number; r: number; opacity: number }[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Perspective compression towards horizon
      const normY = r / (rows - 1);
      const normX = c / (cols - 1);

      // Base coordinate grid
      const baseX = 80 + normX * 1760;
      const baseY = 420 + Math.pow(normY, 1.4) * 580;

      // Complex undulating wave calculation
      const wave1 = Math.sin(normX * 5.2 + normY * 2.8) * (50 + normY * 60);
      const wave2 = Math.cos(normX * 8.4 - normY * 4.2) * (25 + normY * 35);
      const wave3 = Math.sin(normX * 12.0) * 15;

      const y = baseY + wave1 + wave2 + wave3;
      const x = baseX + Math.sin(normY * 3.5) * (normY * 45);

      // Perspective size & opacity scaling
      const radius = 1.4 + normY * 2.8;
      const crestFactor = Math.sin(normX * 5.2 + normY * 2.8) > 0.4 ? 1.4 : 0.8;
      const opacity = Math.min(1.0, (0.25 + normY * 0.65) * crestFactor);

      dots.push({ x, y, r: radius, opacity });
    }
  }

  return (
    <svg
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <defs>
        <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="40%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill={color}
          opacity={d.opacity}
          style={{
            filter: d.r > 2.5 ? `drop-shadow(0 0 6px ${color})` : 'none',
          }}
        />
      ))}
    </svg>
  );
};

export const BiotechThumbnail: React.FC<BiotechThumbnailProps> = ({
  brandName,
  brandLogo,
  kicker,
  heroText,
  themeColor,
  kickerColor = '#FF5252',
  moleculeImage,
  heroFontSize = 148,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#02040A',
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* 1. Deep Obsidian Gradient Base */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 12% 14%, ${themeColor}33 0%, transparent 45%),
            radial-gradient(circle at 88% 70%, ${themeColor}18 0%, transparent 50%),
            linear-gradient(180deg, #020612 0%, #000000 100%)
          `,
        }}
      />

      {/* 2. Top-Left Corner Anamorphic Flare & Glow (Signature Lighting) */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          left: '-80px',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${themeColor}88 0%, ${themeColor}22 40%, transparent 70%)`,
          filter: 'blur(45px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: '28px',
          width: '380px',
          height: '14px',
          background: `linear-gradient(90deg, ${themeColor}FF 0%, transparent 100%)`,
          filter: 'blur(8px)',
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      />

      {/* 3. Undulating 3D Particle Wave Terrain */}
      <ParticleWave color={themeColor} />

      {/* 4. Subtle Ghosted 3D Molecular / Structural Asset (Right Third) */}
      {moleculeImage && (
        <div
          style={{
            position: 'absolute',
            right: '60px',
            top: '160px',
            width: '760px',
            height: '760px',
            opacity: 0.42,
            mixBlendMode: 'screen',
            filter: `drop-shadow(0 0 50px ${themeColor}66)`,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={staticFile(moleculeImage)}
            alt="Molecular Structure"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transform: 'scale(1.05) rotate(-8deg)',
            }}
          />
        </div>
      )}

      {/* 5. Outer Iconic Rounded Neon Border (Signature Frame) */}
      <div
        style={{
          position: 'absolute',
          top: '18px',
          left: '18px',
          right: '18px',
          bottom: '18px',
          border: `7px solid ${themeColor}`,
          borderRadius: '32px',
          pointerEvents: 'none',
          boxShadow: `
            0 0 30px ${themeColor}88,
            inset 0 0 25px ${themeColor}44,
            0 0 70px ${themeColor}33
          `,
        }}
      />

      {/* 6. Top-Left Official Authority Header: Logo + Name + Verified Badge */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          left: '95px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          zIndex: 10,
        }}
      >
        {/* Authentic Transparent Logo */}
        <div
          style={{
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8))',
          }}
        >
          <img
            src={staticFile(brandLogo)}
            alt={brandName}
            style={{
              maxHeight: '38px',
              maxWidth: '38px',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Brand Name */}
        <span
          style={{
            fontSize: '34px',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textShadow: '0 2px 10px rgba(0,0,0,0.9)',
          }}
        >
          {brandName}
        </span>

        {/* Official Blue Verified Checkmark Badge */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            filter: 'drop-shadow(0 2px 8px rgba(0, 145, 255, 0.6))',
          }}
        >
          <circle cx="12" cy="12" r="10.5" fill="#0091FF" />
          <path
            d="M7.5 12.2L10.2 15L16.5 8.8"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 7. The 2-Tier Kinetic Punch Headline (Kicker + Giant White Bloom) */}
      <div
        style={{
          position: 'absolute',
          top: '160px',
          left: '95px',
          maxWidth: '1350px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}
      >
        {/* Tier 1: Kicker / Pre-Title (Coral Red / Salmon) */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: 900,
            color: kickerColor,
            textTransform: 'uppercase',
            letterSpacing: '4px',
            textShadow: `0 0 25px ${kickerColor}99, 0 4px 15px rgba(0,0,0,0.9)`,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {kicker}
        </div>

        {/* Tier 2: Giant Hero Model / System Title (Iconic Volumetric White Bloom) */}
        <div
          style={{
            fontSize: `${heroFontSize}px`,
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 0.95,
            letterSpacing: '-1.5px',
            textTransform: 'uppercase',
            textShadow: `
              0 0 20px rgba(255, 255, 255, 1.0),
              0 0 45px rgba(255, 255, 255, 0.8),
              0 0 90px rgba(255, 255, 255, 0.45),
              0 15px 40px rgba(0, 0, 0, 0.95)
            `,
            filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.85))',
          }}
        >
          {heroText}
        </div>
      </div>
    </AbsoluteFill>
  );
};
