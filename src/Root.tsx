import React from 'react';
import { Composition, Sequence, AbsoluteFill } from 'remotion';
import { Atmosphere } from './components/Atmosphere';
import { KineticPunchText } from './components/KineticPunchText';
import { PaperDossierViewer } from './components/PaperDossierViewer';
import { ProteinRibbonViewer } from './components/ProteinRibbonViewer';
import { MolecularDockingCanvas } from './components/MolecularDockingCanvas';
import { DNASequenceAlignment } from './components/DNASequenceAlignment';
import { BiochemicalPathwayGraph } from './components/BiochemicalPathwayGraph';
import { ClinicalTrialTimelineGauge } from './components/ClinicalTrialTimelineGauge';
import { AnthropicArtDocumentary } from './AnthropicArtDocumentary';
import { BiotechThumbnail, BiotechThumbnailProps } from './components/BiotechThumbnail';

export const BiotechDemoShowcase: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#030712' }}>
      <Atmosphere />

      {/* Act 1: Cold Open Hook - The KRAS Breakthrough */}
      <Sequence from={0} durationInFrames={75}>
        <ProteinRibbonViewer
          structureImageSrc="evidence/molecules/kras_g12c_inhibitor.png"
          proteinName="HUMAN KRAS (G12C)"
          pdbId="4OBE"
          resolution="1.85 Å"
          plddtScore={94.8}
          highlightPocket="Switch II Cavity"
        />
        <KineticPunchText text="CRACKING UNDRUGGABLE CANCER" accentWord="UNDRUGGABLE" position="bottom" />
      </Sequence>
    </AbsoluteFill>
  );
};

export const ThumbnailArtSystem: React.FC = () => (
  <BiotechThumbnail
    brandName="ANTHROPIC"
    brandLogo="logos/anthropic_logo.png"
    kicker="NEW DISCOVERY"
    heroText="ART SYSTEM"
    themeColor="#F59E0B"
    moleculeImage="evidence/molecules/reverse_transcriptase_3d.png"
    heroFontSize={154}
  />
);

export const ThumbnailClaudeArt: React.FC = () => (
  <BiotechThumbnail
    brandName="ANTHROPIC"
    brandLogo="logos/anthropic_logo.png"
    kicker="AUTONOMOUS AI"
    heroText="CLAUDE 'ART'"
    themeColor="#10B981"
    moleculeImage="evidence/molecules/reverse_transcriptase_3d.png"
    heroFontSize={148}
  />
);

export const Thumbnail950Agents: React.FC = () => (
  <BiotechThumbnail
    brandName="ANTHROPIC"
    brandLogo="logos/claude_logo.png"
    kicker="FIRST AI ENZYME"
    heroText="950 AGENTS"
    themeColor="#00D2FF"
    moleculeImage="evidence/molecules/crispr_cas9_3d.png"
    heroFontSize={150}
  />
);

export const Root: React.FC = () => {
  return (
    <>
      {/* 5-Minute Main Masterpiece: Anthropic's Autonomous ART Discovery */}
      <Composition
        id="AnthropicArtDocumentary"
        component={AnthropicArtDocumentary}
        durationInFrames={11587} // 386.24 seconds (6 mins 26s @ 30 FPS)
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Signature High-CTR YouTube Thumbnails */}
      {/* Option 1: Primary Anthropic Amber - ART SYSTEM */}
      <Composition
        id="Thumbnail-ArtSystem"
        component={ThumbnailArtSystem}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Option 2: Biotech Emerald - CLAUDE 'ART' */}
      <Composition
        id="Thumbnail-ClaudeArt"
        component={ThumbnailClaudeArt}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Option 3: Electric Cyan - 950 AGENTS */}
      <Composition
        id="Thumbnail-950Agents"
        component={Thumbnail950Agents}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Short Test Demo */}
      <Composition
        id="BiotechDemoShowcase"
        component={BiotechDemoShowcase}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
