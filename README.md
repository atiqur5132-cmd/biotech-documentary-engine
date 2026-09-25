# 🧬 AI x Biotech Documentary Engine

A broadcast-grade programmatic video production engine powered by **Remotion (React)**, **PyMOL (3D Crystallography)**, and **Studio-Mastered Audio**.

Designed for deep-dive investigative scientific documentaries exploring the frontier of **Artificial Intelligence in Biology, Genomics, and Medicine**.

---

## 🔬 Featured Documentary: The ART System Discovery

> **"Autonomous AI agents discover reverse transcriptases with tandem repeat arrays in jumbo phages."**

- **Duration**: 6 minutes 26 seconds (11,587 frames @ 30 FPS)
- **Resolution**: 1920x1080 (Full HD Broadcast)
- **Topic**: Anthropic's breakthrough September 2026 announcement detailing how an autonomous swarm of **950 Claude agents** scanned planetary metagenomic databases in 21 hours to discover the **Array-Associated Reverse Transcriptase (ART)** system in jumbo bacteriophages.
- **Narrative Depth**: Explores the 3-billion-year bacterial warfare, CRISPR-Cas vs. ART comparison, physical robotic wet-lab synthesis in San Francisco, and the Life Sciences Verification Program (LSVP) with Genentech/Roche, Bristol Myers Squibb, and Novo Nordisk.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Video Engine** | Remotion 4.x (React 18 + TypeScript) |
| **Molecular Modeling** | PyMOL Open-Source 3D Crystal Renders (OSMesa) |
| **Audio Voiceover** | `en-US-BrianMultilingualNeural` via `edge-tts` |
| **Audio DSP** | High-pass (80Hz) + Vocal EQ + Broadcast Compressor + Loudness Normalization (-14 LUFS) |
| **Alignment & Timing** | OpenAI Whisper word-level timestamp transcription |
| **Graphics & Schematics** | Custom kinetic SVG & canvas motion graphics (Phylogenetic trees, Enzyme synthesis streams, Mutation radars, Robotic wet-lab gantries) |

---

## 🚀 Quickstart

### Prerequisites
- Node.js 18+
- Python 3.10+ with `uv`

### Installation
```bash
git clone https://github.com/atiqur5132-cmd/biotech-documentary-engine.git
cd biotech-documentary-engine
npm install
```

### Preview in Remotion Studio
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to preview the timeline interactively.

### Render Full Video
```bash
npm run build
# Or render MP4 directly:
npx remotion render AnthropicArtDocumentary out/anthropic_art_documentary.mp4
```

---

## 📜 Scientific References & Acknowledgments
- **PDB Crystal Structures**: 
  - `1RTD`: HIV-1 Reverse Transcriptase Complex (2.1 Å)
  - `5F9R`: CRISPR-Cas9 Target Cleavage Complex (2.58 Å)
  - `4OBE`: KRAS G12C Covalent Inhibitor Complex
- **Primary Literature**: Anthropic Life Sciences Technical Preprint (September 2026), Broad Institute of MIT & Harvard CRISPR research archives.
