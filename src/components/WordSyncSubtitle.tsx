import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import timestampsData from '../anthropic_art_timestamps.json';

interface WordItem {
  word: string;
  start: number;
  end: number;
}

export const WordSyncSubtitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Find the active segment
  const activeSegment = timestampsData.segments.find(
    (seg) => currentTime >= seg.start - 0.1 && currentTime <= seg.end + 0.2
  );

  if (!activeSegment) return null;

  // Words in the active segment
  const words: WordItem[] = (activeSegment as any).words || [];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '85px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '1500px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '14px 20px',
        padding: '16px 36px',
        borderRadius: '20px',
        backgroundColor: 'rgba(3, 7, 18, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      {words.map((w, index) => {
        const isSpoken = currentTime >= w.start;
        const isCurrentWord = currentTime >= w.start && currentTime <= w.end;

        const pop = isCurrentWord
          ? spring({
              frame: (currentTime - w.start) * fps,
              fps,
              config: { stiffness: 220, damping: 12 },
            })
          : 1;

        return (
          <span
            key={index}
            style={{
              fontSize: '44px',
              fontWeight: isCurrentWord ? 900 : 700,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.5px',
              color: isCurrentWord
                ? '#10B981'
                : isSpoken
                ? '#F8FAFC'
                : '#64748B',
              textShadow: isCurrentWord
                ? '0 0 25px rgba(16, 185, 129, 0.9), 0 4px 15px rgba(0,0,0,0.9)'
                : '0 2px 10px rgba(0,0,0,0.9)',
              transform: isCurrentWord ? `scale(${interpolate(pop, [0, 1], [0.95, 1.12])})` : 'scale(1)',
              display: 'inline-block',
              transition: 'color 0.1s ease',
            }}
          >
            {w.word}
          </span>
        );
      })}
    </div>
  );
};
