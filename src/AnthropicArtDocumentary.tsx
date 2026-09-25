import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';
import { Atmosphere } from './components/Atmosphere';
import { KineticPunchText } from './components/KineticPunchText';
import { PaperDossierViewer } from './components/PaperDossierViewer';
import { ProteinRibbonViewer } from './components/ProteinRibbonViewer';
import { MolecularDockingCanvas } from './components/MolecularDockingCanvas';
import { DNASequenceAlignment } from './components/DNASequenceAlignment';
import { BiochemicalPathwayGraph } from './components/BiochemicalPathwayGraph';
import { ClinicalTrialTimelineGauge } from './components/ClinicalTrialTimelineGauge';
import { BacteriophageInvasion } from './components/BacteriophageInvasion';
import { MetagenomicFunnel } from './components/MetagenomicFunnel';
import { CrisprVsArtComparison } from './components/CrisprVsArtComparison';
import { LipidMembraneBarrier } from './components/LipidMembraneBarrier';
import { RoboticWetLabSchematic } from './components/RoboticWetLabSchematic';
import { PhylogeneticTree } from './components/PhylogeneticTree';
import { MutationRadarHeatmap } from './components/MutationRadarHeatmap';
import { DeepMindVsAnthropic } from './components/DeepMindVsAnthropic';
import { EnzymeSynthesisStream } from './components/EnzymeSynthesisStream';

// Sub-Component: 950 Agent Cluster Grid
const AgentSwarmGrid: React.FC<{ label?: string; subtitle?: string }> = ({
  label = '950 AUTONOMOUS CLAUDE AGENTS',
  subtitle = 'METAGENOMIC DATABASE SCANNING',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { stiffness: 120, damping: 14 } });
  const zoom = interpolate(frame, [0, 200], [1.0, 1.05]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${entrance * zoom})`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          padding: '14px 32px',
          borderRadius: '999px',
          marginBottom: '36px',
          boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)',
        }}
      >
        <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 15px #10B981' }} />
        <span style={{ fontSize: '20px', fontWeight: 900, color: '#34D399', letterSpacing: '2px', fontFamily: 'monospace' }}>
          {label}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '14px',
          width: '1200px',
          backgroundColor: 'rgba(2, 6, 23, 0.85)',
          padding: '30px',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.9)',
        }}
      >
        {Array.from({ length: 48 }).map((_, i) => {
          const active = Math.sin(frame * 0.15 + i * 0.5) > 0.1;
          return (
            <div
              key={i}
              style={{
                height: '38px',
                borderRadius: '8px',
                backgroundColor: active ? '#10B981' : '#0F172A',
                border: `1px solid ${active ? '#34D399' : 'rgba(255, 255, 255, 0.05)'}`,
                boxShadow: active ? '0 0 15px rgba(52, 211, 153, 0.6)' : 'none',
              }}
            />
          );
        })}
      </div>

      <div style={{ marginTop: '28px', color: '#94A3B8', fontSize: '18px', fontWeight: 700, fontFamily: 'monospace' }}>
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};

// Sub-Component: Feng Zhang Quote Dossier
const FengZhangDossier: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { stiffness: 110, damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${entrance})`,
      }}
    >
      <div
        style={{
          width: '1350px',
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          borderRadius: '24px',
          padding: '50px 60px',
          backdropFilter: 'blur(25px)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 40px rgba(139, 92, 246, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ backgroundColor: '#8B5CF6', color: '#FFF', fontSize: '15px', fontWeight: 900, padding: '6px 14px', borderRadius: '6px' }}>
              CRISPR PIONEER REACTION
            </span>
            <span style={{ color: '#94A3B8', fontSize: '18px', fontWeight: 600 }}>
              Broad Institute of MIT and Harvard
            </span>
          </div>
          <span style={{ color: '#A78BFA', fontSize: '16px', fontWeight: 800, fontFamily: 'monospace' }}>
            PEER REVIEW INTAKE
          </span>
        </div>

        <blockquote
          style={{
            fontSize: '40px',
            fontWeight: 800,
            lineHeight: 1.3,
            color: '#FFFFFF',
            margin: '10px 0',
            fontStyle: 'italic',
            borderLeft: '6px solid #8B5CF6',
            paddingLeft: '30px',
          }}
        >
          "Genuinely intriguing. The tandem array architecture suggests an evolutionary lineage we haven't mapped."
        </blockquote>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '10px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#065F46', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '20px', color: '#FFF' }}>
            FZ
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#F8FAFC' }}>Dr. Feng Zhang</div>
            <div style={{ fontSize: '16px', color: '#94A3B8' }}>Co-inventor of CRISPR-Cas9 Genome Editing</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Sub-Component: Wet Lab Acquisition & Pharma Alliance
const WetLabPharmaAlliance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { stiffness: 100, damping: 14 } });

  const partners = [
    { name: 'ROCHE / GENENTECH', role: 'Target Validation & Oncology', color: '#0284C7' },
    { name: 'BRISTOL MYERS SQUIBB', role: 'Immunotherapy Pipeline', color: '#DC2626' },
    { name: 'NOVO NORDISK', role: 'Metabolic & Peptide Synthesis', color: '#16A34A' },
  ];

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${entrance})`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          padding: '12px 28px',
          borderRadius: '999px',
          marginBottom: '36px',
        }}
      >
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 12px #10B981' }} />
        <span style={{ fontSize: '18px', fontWeight: 800, color: '#34D399', letterSpacing: '2px' }}>
          LIFE SCIENCES VERIFICATION PROGRAM (LSVP)
        </span>
      </div>

      <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#FFFFFF', marginBottom: '40px', textAlign: 'center' }}>
        ANTHROPIC PHYSICAL WET LAB ALLIANCE
      </h1>

      <div style={{ display: 'flex', gap: '24px', width: '1350px' }}>
        {partners.map((p, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              backgroundColor: 'rgba(10, 18, 32, 0.85)',
              border: `1px solid ${p.color}66`,
              borderRadius: '20px',
              padding: '36px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 25px ${p.color}22`,
            }}
          >
            <div>
              <span style={{ backgroundColor: `${p.color}33`, color: p.color, fontSize: '13px', fontWeight: 900, padding: '4px 10px', borderRadius: '6px' }}>
                VERIFIED PARTNER
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#FFFFFF', margin: '16px 0 8px 0' }}>
                {p.name}
              </h2>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '16px', margin: 0, fontWeight: 600 }}>
              {p.role}
            </p>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const AnthropicArtDocumentary: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#030712' }}>
      {/* Dynamic Background Atmosphere */}
      <Atmosphere />

      {/* Broadcast Mastered Studio Voiceover Audio (320 kbps) */}
      <Audio src={staticFile('anthropic_art_voiceover.mp3')} volume={1.0} />

      {/* =========================================================================
          ACT 1: THE DARK GENOME AMBUSH (Frames 0 - 2,220 | 00:00 - 01:14)
          ========================================================================= */}

      {/* Scene 1.1: 0 - 240 (0.0s - 8.0s) - Microscopic War in a Water Drop */}
      <Sequence from={0} durationInFrames={240}>
        <BacteriophageInvasion title="3-BILLION-YEAR WAR IN A WATER DROP" />
        <KineticPunchText text="DEADLIEST WAR ON EARTH" accentWord="DEADLIEST" position="bottom" />
      </Sequence>

      {/* Scene 1.2: 240 - 520 (8.0s - 17.4s) - 70 Years of CRISPR Surveillance */}
      <Sequence from={240} durationInFrames={280}>
        <ProteinRibbonViewer
          structureImageSrc="evidence/molecules/crispr_cas9_3d.png"
          proteinName="CRISPR-CAS9 SURVEILLANCE COMPLEX"
          pdbId="5F9R"
          resolution="2.58 Å Crystal Structure"
          plddtScore={96.8}
          highlightPocket="Dual RNA-Guided Cleavage Lobe"
        />
        <KineticPunchText text="SEVENTY-YEAR WAR RULES" accentWord="SEVENTY-YEAR" position="bottom" />
      </Sequence>

      {/* Scene 1.3: 520 - 712 (17.4s - 23.8s) - CRISPR Molecular Scissors */}
      <Sequence from={520} durationInFrames={192}>
        <CrisprVsArtComparison />
        <KineticPunchText text="CRISPR MOLECULAR SCISSORS" accentWord="SCISSORS" position="bottom" />
      </Sequence>

      {/* Scene 1.4: 712 - 915 (23.8s - 30.5s) - Anthropic 30-Page Preprint Drops */}
      <Sequence from={712} durationInFrames={203}>
        <PaperDossierViewer
          journal="bioRxiv"
          title="Autonomous AI agents discover reverse transcriptases with tandem repeat arrays"
          leadLab="Anthropic Life Sciences Research Group"
          doi="10.1101/2026.09.anthropic.art"
          year={2026}
          figureImageSrc="evidence/molecules/reverse_transcriptase_3d.png"
          figureCaption="Technical preprint reveals uncharacterized reverse transcriptase systems across jumbo phages."
        />
        <KineticPunchText text="THIRTY-PAGE PREPRINT DROPS" accentWord="PREPRINT" position="bottom" />
      </Sequence>

      {/* Scene 1.5: 915 - 1119 (30.5s - 37.3s) - Jumbo Phage Lineage Tree */}
      <Sequence from={915} durationInFrames={204}>
        <PhylogeneticTree />
        <KineticPunchText text="JUMBO PHAGE LINEAGE" accentWord="JUMBO" position="bottom" />
      </Sequence>

      {/* Scene 1.6: 1119 - 1312 (37.3s - 43.7s) - Uncovering the ART System */}
      <Sequence from={1119} durationInFrames={193}>
        <ProteinRibbonViewer
          structureImageSrc="evidence/molecules/reverse_transcriptase_3d.png"
          proteinName="THE ART ENZYME SYSTEM"
          pdbId="1RTD"
          resolution="2.1 Å Reverse Transcriptase"
          plddtScore={95.4}
          highlightPocket="RNA-Dependent DNA Polymerase"
        />
        <KineticPunchText text="NEW ENZYME ARCHITECTURE" accentWord="ARCHITECTURE" position="bottom" />
      </Sequence>

      {/* Scene 1.7: 1312 - 1528 (43.7s - 51.0s) - Catalytic Active Synthesis Stream */}
      <Sequence from={1312} durationInFrames={216}>
        <EnzymeSynthesisStream />
        <KineticPunchText text="ARRAY-ASSOCIATED REVERSE TRANSCRIPTASE" accentWord="REVERSE" position="bottom" />
      </Sequence>

      {/* Scene 1.8: 1528 - 1867 (51.0s - 62.2s) - Never Cataloged in History */}
      <Sequence from={1528} durationInFrames={339}>
        <DNASequenceAlignment
          geneName="ART TANDEM REPEAT LOCUS"
          variantMutation="c.PhageTandemArray"
          impactScore={0.99}
        />
        <KineticPunchText text="NEVER BEFORE CATALOGED" accentWord="CATALOGED" position="bottom" />
      </Sequence>

      {/* Scene 1.9: 1867 - 2042 (62.2s - 68.1s) - Dr. Feng Zhang / Broad Institute Reaction */}
      <Sequence from={1867} durationInFrames={175}>
        <FengZhangDossier />
        <KineticPunchText text="CRISPR PIONEER STUNNED" accentWord="STUNNED" position="bottom" />
      </Sequence>

      {/* Scene 1.10: 2042 - 2220 (68.1s - 74.0s) - 950 Autonomous AI Agents Swarm */}
      <Sequence from={2042} durationInFrames={178}>
        <AgentSwarmGrid label="950 AUTONOMOUS CLAUDE AGENTS" subtitle="SOLVING 70 YEARS OF MISSED BIOLOGY" />
        <KineticPunchText text="950 AUTONOMOUS AGENTS" accentWord="AUTONOMOUS" position="bottom" />
      </Sequence>

      {/* =========================================================================
          ACT 2: THE 21-HOUR AGENT BLITZ (Frames 2,220 - 4,290 | 01:14 - 02:23)
          ========================================================================= */}

      {/* Scene 2.1: 2220 - 2589 (74.0s - 86.3s) - Not a Single Chatbot: The Swarm */}
      <Sequence from={2220} durationInFrames={369}>
        <AgentSwarmGrid label="PLANETARY RESEARCH SWARM" subtitle="1.9 BILLION PROTEIN CLUSTERS MAPPED" />
        <KineticPunchText text="NOT A SINGLE CHATBOT" accentWord="NOT" position="bottom" />
      </Sequence>

      {/* Scene 2.2: 2589 - 2952 (86.3s - 98.4s) - 1.9 Billion Planetary Clusters Funnel */}
      <Sequence from={2589} durationInFrames={363}>
        <MetagenomicFunnel />
        <KineticPunchText text="1.9 BILLION CLUSTERS" accentWord="BILLION" position="bottom" />
      </Sequence>

      {/* Scene 2.3: 2952 - 3330 (98.4s - 111.0s) - 200,000 Reverse Transcriptases */}
      <Sequence from={2952} durationInFrames={378}>
        <MolecularDockingCanvas
          moleculeName="RNA Blueprint to DNA Polymerase"
          targetProtein="Phage Reverse Transcriptase"
          deltaG={-15.2}
          kdValue="1.1 nM"
        />
        <KineticPunchText text="WRITING RNA INTO DNA" accentWord="WRITING" position="top" />
      </Sequence>

      {/* Scene 2.4: 3330 - 3689 (111.0s - 123.0s) - 21 Hours & 210 Million Tokens */}
      <Sequence from={3330} durationInFrames={359}>
        <MetagenomicFunnel />
        <KineticPunchText text="210 MILLION TOKENS" accentWord="TOKENS" position="bottom" />
      </Sequence>

      {/* Scene 2.5: 3689 - 4110 (123.0s - 137.0s) - Flanking Gene Neighborhoods */}
      <Sequence from={3689} durationInFrames={421}>
        <PhylogeneticTree />
        <KineticPunchText text="CONSERVATION CURVES MAPPED" accentWord="CONSERVATION" position="bottom" />
      </Sequence>

      {/* Scene 2.6: 4110 - 4290 (137.0s - 143.1s) - Top System That Shouldn't Exist */}
      <Sequence from={4110} durationInFrames={180}>
        <ProteinRibbonViewer
          structureImageSrc="evidence/molecules/reverse_transcriptase_3d.png"
          proteinName="TOP CANDIDATE SYSTEM #1"
          pdbId="ART-ALPHA"
          resolution="Cryo-EM Map"
          plddtScore={97.1}
          highlightPocket="Conserved Catalytic Triad"
        />
        <KineticPunchText text="TOP PRIORITY ARCHITECTURE" accentWord="TOP" position="bottom" />
      </Sequence>

      {/* =========================================================================
          ACT 3: THE MOLECULAR ANATOMY OF ART (Frames 4,290 - 6,700 | 02:23 - 03:43)
          ========================================================================= */}

      {/* Scene 3.1: 4290 - 4688 (143.1s - 156.3s) - Gear 1: Active RT Core */}
      <Sequence from={4290} durationInFrames={398}>
        <EnzymeSynthesisStream />
        <KineticPunchText text="GEAR 1: RT ENZYME CORE" accentWord="CORE" position="bottom" />
      </Sequence>

      {/* Scene 3.2: 4688 - 5066 (156.3s - 168.9s) - Gear 2: Conserved Mystery Partner Gene */}
      <Sequence from={4688} durationInFrames={378}>
        <DNASequenceAlignment
          geneName="GEAR 2: MYSTERY PARTNER GENE"
          variantMutation="Conserved Lineage Locus"
          impactScore={0.94}
        />
        <KineticPunchText text="GEAR 2: UNKNOWN PARTNER" accentWord="UNKNOWN" position="bottom" />
      </Sequence>

      {/* Scene 3.3: 5066 - 5437 (168.9s - 181.3s) - Gear 3: Massive Tandem DNA Repeat Array */}
      <Sequence from={5066} durationInFrames={371}>
        <DNASequenceAlignment
          geneName="GEAR 3: TANDEM REPEAT ARRAY"
          variantMutation="Evenly Spaced Repeats"
          impactScore={0.99}
        />
        <KineticPunchText text="GEAR 3: TANDEM ARRAYS" accentWord="TANDEM" position="bottom" />
      </Sequence>

      {/* Scene 3.4: 5437 - 5802 (181.3s - 193.4s) - Indistinguishable from CRISPR Arrays */}
      <Sequence from={5437} durationInFrames={365}>
        <CrisprVsArtComparison />
        <KineticPunchText text="INDISTINGUISHABLE FROM CRISPR" accentWord="CRISPR" position="bottom" />
      </Sequence>

      {/* Scene 3.5: 5802 - 6160 (193.4s - 205.4s) - CRISPR Wanted Poster vs ART */}
      <Sequence from={5802} durationInFrames={358}>
        <ProteinRibbonViewer
          structureImageSrc="evidence/molecules/crispr_cas9_3d.png"
          proteinName="CRISPR-CAS9 WANTED POSTER"
          pdbId="5F9R"
          resolution="Dual-Lobe Nuclease"
          plddtScore={98.2}
          highlightPocket="Target Cleavage Pocket"
        />
        <KineticPunchText text="CELLULAR WANTED POSTER" accentWord="WANTED" position="bottom" />
      </Sequence>

      {/* Scene 3.6: 6160 - 6700 (205.4s - 223.4s) - Biological Typewriter Writing Living Genomes */}
      <Sequence from={6160} durationInFrames={540}>
        <EnzymeSynthesisStream />
        <KineticPunchText text="BIOLOGICAL TYPEWRITER" accentWord="TYPEWRITER" position="bottom" />
      </Sequence>

      {/* =========================================================================
          ACT 4: THE SCIENTIFIC REALITY CHECK (Frames 6,700 - 8,940 | 03:43 - 04:58)
          ========================================================================= */}

      {/* Scene 4.1: 6700 - 7275 (223.4s - 242.5s) - Cold Hard Reality Wall */}
      <Sequence from={6700} durationInFrames={575}>
        <ClinicalTrialTimelineGauge
          drugCandidate="ART Programmable Writer"
          indication="In-Vivo Functional Validation"
          activePhaseIndex={1}
          posRate="Unproven Biological Function"
        />
        <KineticPunchText text="COLD HARD REALITY" accentWord="REALITY" position="bottom" />
      </Sequence>

      {/* Scene 4.2: 7275 - 7664 (242.5s - 255.5s) - Unproven In-Vivo Phage Biology */}
      <Sequence from={7275} durationInFrames={389}>
        <BacteriophageInvasion title="UNPROVEN IN-VIVO PHAGE MECHANISMS" />
        <KineticPunchText text="UNPROVEN IN-VIVO BIOLOGY" accentWord="UNPROVEN" position="bottom" />
      </Sequence>

      {/* Scene 4.3: 7664 - 8068 (255.5s - 269.0s) - Error-Prone Mutation Rates */}
      <Sequence from={7664} durationInFrames={404}>
        <MutationRadarHeatmap />
        <KineticPunchText text="100,000X ERROR RATE" accentWord="ERROR" position="bottom" />
      </Sequence>

      {/* Scene 4.4: 8068 - 8578 (269.0s - 286.0s) - Cellular Delivery Wall */}
      <Sequence from={8068} durationInFrames={510}>
        <LipidMembraneBarrier />
        <KineticPunchText text="CELLULAR DELIVERY WALL" accentWord="DELIVERY" position="bottom" />
      </Sequence>

      {/* Scene 4.5: 8578 - 8940 (286.0s - 297.9s) - Disciplined Scientific Caution */}
      <Sequence from={8578} durationInFrames={362}>
        <PaperDossierViewer
          journal="bioRxiv"
          title="Disciplined Scientific Caution: ART is Not Yet a Verified Editor"
          leadLab="Anthropic Life Sciences Research Group"
          doi="10.1101/2026.09.anthropic.art"
          year={2026}
          figureImageSrc="evidence/molecules/reverse_transcriptase_3d.png"
          figureCaption="Anthropic explicitly outlines the rigorous wet-lab validation requirements before clinical translation."
        />
        <KineticPunchText text="DISCIPLINED SCIENTIFIC CAUTION" accentWord="CAUTION" position="bottom" />
      </Sequence>

      {/* =========================================================================
          ACT 5: SILICON VALLEY'S WET-LAB WAR (Frames 8,940 - 11,587 | 04:58 - 06:26)
          ========================================================================= */}

      {/* Scene 5.1: 8940 - 9516 (297.9s - 317.2s) - DeepMind vs Anthropic Playbooks */}
      <Sequence from={8940} durationInFrames={576}>
        <DeepMindVsAnthropic />
        <KineticPunchText text="TWO BIOLOGY PLAYBOOKS" accentWord="TWO" position="bottom" />
      </Sequence>

      {/* Scene 5.2: 9516 - 9920 (317.2s - 330.7s) - Coefficient Bio & SF Robotic Wet Lab */}
      <Sequence from={9516} durationInFrames={404}>
        <RoboticWetLabSchematic />
        <KineticPunchText text="PHYSICAL ROBOTIC WET LAB" accentWord="PHYSICAL" position="bottom" />
      </Sequence>

      {/* Scene 5.3: 9920 - 10459 (330.7s - 348.6s) - Pipetting Real Cells & Synthesizing Enzymes */}
      <Sequence from={9920} durationInFrames={539}>
        <RoboticWetLabSchematic />
        <KineticPunchText text="PIPETTING REAL REAGENTS" accentWord="PIPETTING" position="bottom" />
      </Sequence>

      {/* Scene 5.4: 10459 - 10950 (348.6s - 365.0s) - Life Sciences Verification Program */}
      <Sequence from={10459} durationInFrames={491}>
        <WetLabPharmaAlliance />
        <KineticPunchText text="BIG PHARMA ALLIANCE" accentWord="ALLIANCE" position="bottom" />
      </Sequence>

      {/* Scene 5.5: 10950 - 11282 (365.0s - 376.1s) - Competing with Big Pharma */}
      <Sequence from={10950} durationInFrames={332}>
        <WetLabPharmaAlliance />
        <KineticPunchText text="COMPETING WITH PHARMA" accentWord="COMPETING" position="bottom" />
      </Sequence>

      {/* Scene 5.6: 11282 - 11587 (376.1s - 386.2s) - The Dark Genome Horizon (Grand Finale) */}
      <Sequence from={11282} durationInFrames={305}>
        <ProteinRibbonViewer
          structureImageSrc="evidence/molecules/reverse_transcriptase_3d.png"
          proteinName="THE UNCHARTED DARK GENOME"
          pdbId="FRONTIER-BIOLOGY"
          resolution="Planetary Metagenomic Scale"
          plddtScore={99.8}
          highlightPocket="The Next Revolution"
        />
        <KineticPunchText text="THE DARK GENOME UNLOCKED" accentWord="UNLOCKED" position="bottom" />
      </Sequence>
    </AbsoluteFill>
  );
};
