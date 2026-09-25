import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const BiochemicalPathwayGraph: React.FC<{
  pathwayName: string;
  blockedNode?: string; // e.g. "KRAS-G12C"
}> = ({
  pathwayName = 'MAPK / ERK Oncogenic Signaling Cascade',
  blockedNode = 'KRAS (G12C)',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 14 },
  });

  const nodes = [
    { id: 'egfr', label: 'EGFR', role: 'Receptor', x: 200, y: 350, color: '#38BDF8' },
    { id: 'kras', label: 'KRAS (G12C)', role: 'GTPase Switch', x: 500, y: 350, color: '#EF4444', isTarget: true },
    { id: 'raf', label: 'BRAF', role: 'Kinase', x: 800, y: 350, color: '#F59E0B' },
    { id: 'mek', label: 'MEK 1/2', role: 'Dual Kinase', x: 1100, y: 350, color: '#10B981' },
    { id: 'erk', label: 'ERK 1/2', role: 'Nuclear Effector', x: 1400, y: 350, color: '#8B5CF6' },
  ];

  // Moving signal pulses
  const pulsePos = (frame * 12) % 1200;

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
      {/* Title */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '60px',
        }}
      >
        <span style={{ fontSize: '15px', fontWeight: 900, color: '#38BDF8', letterSpacing: '2px', textTransform: 'uppercase' }}>
          CELLULAR SIGNALING CASCADE
        </span>
        <h2 style={{ fontSize: '42px', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
          {pathwayName}
        </h2>
      </div>

      {/* SVG Canvas for nodes and signal flow */}
      <svg
        width="1600"
        height="450"
        viewBox="0 0 1600 450"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="pathwayLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="25%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="75%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>

        {/* Base Connecting Pipe */}
        <line
          x1="200"
          y1="225"
          x2="1400"
          y2="225"
          stroke="url(#pathwayLine)"
          strokeWidth="6"
          opacity="0.4"
        />

        {/* Traveling Phosphorylation Signal Packet */}
        <circle
          cx={200 + pulsePos}
          cy="225"
          r="12"
          fill="#FFFFFF"
          style={{ filter: 'drop-shadow(0 0 15px #38BDF8)' }}
        />

        {/* Pathway Nodes */}
        {nodes.map((node) => {
          const isBlocked = blockedNode === node.label;
          const nodePulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.95, 1.05]);

          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, 225)`}
            >
              {/* Outer Glow Halo */}
              <circle
                r={node.isTarget ? 75 : 60}
                fill={`${node.color}22`}
                stroke={node.color}
                strokeWidth={node.isTarget ? 3 : 2}
                style={{ transform: `scale(${nodePulse})` }}
              />

              {/* Node Core */}
              <circle
                r={node.isTarget ? 50 : 42}
                fill="#0F172A"
                stroke={node.color}
                strokeWidth="3"
              />

              {/* Label */}
              <text
                textAnchor="middle"
                dy="6"
                fill="#FFFFFF"
                fontSize={node.isTarget ? "16" : "15"}
                fontWeight="900"
                fontFamily="sans-serif"
              >
                {node.label}
              </text>

              {/* Sub-label Role */}
              <text
                textAnchor="middle"
                dy="95"
                fill="#94A3B8"
                fontSize="14"
                fontWeight="700"
                fontFamily="sans-serif"
              >
                {node.role}
              </text>

              {/* AI Blocked / Target Callout */}
              {node.isTarget && (
                <g transform="translate(0, -90)">
                  <rect
                    x="-90"
                    y="-20"
                    width="180"
                    height="36"
                    rx="8"
                    fill="#EF4444"
                  />
                  <text
                    textAnchor="middle"
                    dy="4"
                    fill="#FFFFFF"
                    fontSize="13"
                    fontWeight="900"
                    fontFamily="sans-serif"
                  >
                    AI INHIBITOR TARGET
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
