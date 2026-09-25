import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const KineticPunchText: React.FC<{
  text: string;
  accentWord?: string;
  accentColor?: string;
  position?: 'center' | 'top' | 'bottom';
  delay?: number;
}> = ({
  text,
  accentWord,
  accentColor = '#10B981',
  position = 'bottom',
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(' ');

  const scale = spring({
    frame: frame - delay,
    fps,
    config: {
      stiffness: 140,
      damping: 14,
      mass: 0.8,
    },
  });

  const opacity = interpolate(frame - delay, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const getPositionStyles = (): React.CSSProperties => {
    switch (position) {
      case 'top':
        return { top: '100px', left: '50%', transform: `translateX(-50%) scale(${scale})` };
      case 'center':
        return { top: '50%', left: '50%', transform: `translate(-50%, -50%) scale(${scale})` };
      case 'bottom':
      default:
        return { bottom: '110px', left: '50%', transform: `translateX(-50%) scale(${scale})` };
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: '90%',
        maxWidth: '1600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        opacity,
        zIndex: 50,
        ...getPositionStyles(),
      }}
    >
      {words.map((word, i) => {
        const isAccent = accentWord
          ? word.toLowerCase().includes(accentWord.toLowerCase())
          : i === words.length - 1;

        return (
          <span
            key={i}
            style={{
              fontSize: '84px',
              fontWeight: 900,
              letterSpacing: '-2px',
              textTransform: 'uppercase',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              color: isAccent ? accentColor : '#FFFFFF',
              textShadow: isAccent
                ? `0 0 45px ${accentColor}aa, 0 8px 30px rgba(0,0,0,0.95)`
                : '0 8px 30px rgba(0,0,0,0.95)',
              filter: isAccent ? `drop-shadow(0 0 20px ${accentColor})` : 'none',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
