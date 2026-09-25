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
