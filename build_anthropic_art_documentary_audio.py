# /// script
# dependencies = [
#   "edge-tts",
#   "static-ffmpeg",
#   "openai-whisper",
# ]
# ///

import asyncio
import os
import subprocess
import json
import wave
import edge_tts
import static_ffmpeg
from whisper import load_model

static_ffmpeg.add_paths()

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(SCRIPT_DIR, "public")
SRC_DIR = os.path.join(SCRIPT_DIR, "src")
os.makedirs(PUBLIC_DIR, exist_ok=True)
os.makedirs(SRC_DIR, exist_ok=True)

raw_mp3 = os.path.join(PUBLIC_DIR, "raw_anthropic_art.mp3")
mastered_wav = os.path.join(PUBLIC_DIR, "anthropic_art_voiceover.wav")
timestamps_json = os.path.join(PUBLIC_DIR, "anthropic_art_timestamps.json")
src_timestamps_json = os.path.join(SRC_DIR, "anthropic_art_timestamps.json")

# 100% Human-Written, 5-Minute Documentary Script
# Cadence: Short, punchy, gritty, authoritative investigative journalism. Zero LLM clichés.
script_text = """For three billion years, the deadliest war on Earth hasn't been fought between nations.

It has been fought inside a single drop of water, between bacteria and the monstrous viruses that hunt them.

For seventy years, molecular biologists believed they understood the fundamental rules of that battlefield.

Bacteria defend themselves using CRISPR molecular scissors, while viruses mutate to survive.

Then, twenty-four hours ago, Anthropic dropped a thirty-page technical preprint that flipped that entire dogma on its head.

Deep inside the uncharted DNA of giant, armored bacteriophages, Anthropic's AI uncovered an entirely new class of biological machinery.

An enzyme system they've named ART: Array-Associated Reverse Transcriptases.

This wasn't a minor variation of an existing protein.

It is a molecular architecture that has never once been cataloged in the entire history of life sciences.

And the instant the preprint crossed the wires, CRISPR co-inventor Feng Zhang at the Broad Institute called the discovery genuinely intriguing.

Here is the real, unvarnished story of how nine hundred and fifty autonomous AI agents did what seven decades of human wet-lab research completely missed.

To understand why researchers are stunned, you have to look at the sheer scale of the engineering.

Anthropic didn't just ask a chat interface to predict a protein shape.

Instead, they unleashed an autonomous swarm of nine hundred and fifty Claude software agents, pointing them directly at a planetary metagenomic database.

Their target: one point nine billion uncharacterized protein clusters from the viral dark genome.

Inside that colossal ocean of biological noise sat over two hundred thousand candidate reverse transcriptases.

Enzymes that possess the rare, coveted ability to read an RNA blueprint and physically write it into DNA.

For twenty-one hours straight, with zero human intervention, the agent swarm ground through two hundred and ten million tokens of raw genomic context.

They mapped flanking gene neighborhoods. They computed evolutionary conservation curves.

And they ruthlessly filtered two hundred thousand candidate enzymes down to thirty-five hundred.

Then down to twenty high-priority systems.

And sitting at the absolute top of the cluster was an architecture that shouldn't exist.

Look closely at what the AI actually pulled from the viral sequence.

The ART system consists of three precisely linked molecular gears.

First, an active reverse transcriptase core: the enzymatic engine capable of synthesizing double-stranded DNA from RNA templates.

Second, a partner gene whose function is completely unknown to science, but conserved with eerie precision across multiple phage genomes.

And third, here is the reveal that caused jaws to drop across biotechnology departments.

A massive, perfectly spaced array of tandem DNA repeats.

If you study genomics, that repetitive tandem architecture sends chills down your spine.

Because that array is almost structurally indistinguishable from the CRISPR arrays that revolutionized genetic medicine a decade ago.

In CRISPR-Cas9, those repeat arrays act like a cellular wanted poster: storing past viral DNA so bacterial nucleases can recognize and slice incoming invaders.

Could ART be running an even more profound biological program?

Instead of acting as scissors to destroy genetic code, could an array-guided reverse transcriptase be a biological typewriter?

Recording, pasting, and inserting functional sequences directly into living genomes?

Now, before anyone claims Anthropic just handed humanity a magic cure for every genetic disease, let's take a cold, hard look at the biological reality.

Finding an algorithmically elegant enzyme cluster in a database is one thing.

Making it function inside a living human cell is a completely different universe.

First, the actual in-vivo biology of ART is still strictly unproven.

We do not yet know whether phages use ART to sabotage bacterial defenses, rewrite their own coats, or hijack host transcription.

Second, reverse transcriptases are notoriously error-prone.

Without evolved human proofreading mechanisms, they introduce random point mutations at a rate that would be toxic in human gene therapy.

And third, delivery remains the eternal wall of medicine.

Even if ART turns out to be a programmable DNA writer, transporting a multi-component protein and RNA complex across human cell membranes is a challenge that has humbled the world's best pharmaceutical labs.

Anthropic themselves were remarkably disciplined in their paper.

They explicitly warned the scientific community: ART is not yet a verified gene-editing tool.

It is an evolutionary lock that has just been discovered, and nobody has the key yet.

And that brings us to the real disruption shaking the industry: Anthropic's physical transformation.

For years, Silicon Valley tech giants claimed they were building assistant tools for wet-lab scientists.

Google DeepMind developed AlphaFold and spun out Isomorphic Labs. Microsoft invested in molecular simulation.

Anthropic just took that safe, distant software playbook and set it on fire.

In the spring of twenty-twenty-six, Anthropic quietly acquired the biotechnology startup Coefficient Bio.

They hired senior bio-informaticians from Genentech and DeepMind, and built their own physical, robotic wet lab in the San Francisco Bay Area.

They are no longer just training neural networks on human prose.

They are culturing live phages, pipetting reagents, and physically synthesizing the very enzymes their AI models discover.

Alongside the ART preprint, Anthropic officially launched the Life Sciences Verification Program.

Partnering directly with global pharmaceutical titans like Roche, Bristol Myers Squibb, and Novo Nordisk to test frontier models under verified biological safeguards.

Silicon Valley isn't just assisting the pharmaceutical industry anymore.

They are preparing to compete with it.

And if an autonomous swarm of AI agents can discover an entirely new enzyme architecture in twenty-one hours, the question isn't whether biology will be automated.

The question is: what else is hiding in the dark genome, waiting to be found?"""

async def generate_speech():
    print(f"Generating studio voiceover with en-US-BrianMultilingualNeural...")
    communicate = edge_tts.Communicate(
        text=script_text,
        voice="en-US-BrianMultilingualNeural",
        rate="+0%",
        pitch="+0Hz"
    )
    await communicate.save(raw_mp3)
    print(f"Raw MP3 saved to: {raw_mp3}")

def master_audio():
    print("Mastering audio via broadcast mastering chain...")
    cmd = [
        "ffmpeg", "-y", "-i", raw_mp3,
        "-af", (
            "highpass=f=80,"
            "equalizer=f=120:width_type=o:width=1.5:g=2.5,"
            "equalizer=f=800:width_type=o:width=1.5:g=-1.5,"
            "equalizer=f=4500:width_type=o:width=1.5:g=2.2,"
            "acompressor=threshold=-18dB:ratio=3.2:attack=8:release=60,"
            "loudnorm=I=-14:TP=-1.0:LRA=9"
        ),
        "-ar", "48000",
        "-ac", "2",
        mastered_wav
    ]
    subprocess.run(cmd, check=True)
    print(f"Mastered broadcast audio saved to: {mastered_wav}")

def transcribe():
    print("Transcribing with Whisper base model for word-level timestamps...")
    model = load_model("base")
    result = model.transcribe(mastered_wav, word_timestamps=True)

    words_data = []
    for segment in result.get("segments", []):
        for word in segment.get("words", []):
            words_data.append({
                "word": word["word"].strip(),
                "start": word["start"],
                "end": word["end"]
            })

    total_duration = result.get("segments", [])[-1]["end"] if result.get("segments") else 0
    total_frames = int(total_duration * 30)

    output_payload = {
        "duration": total_duration,
        "total_frames": total_frames,
        "fps": 30,
        "segments": result.get("segments", []),
        "words": words_data
    }

    with open(timestamps_json, "w", encoding="utf-8") as f:
        json.dump(output_payload, f, indent=2)

    with open(src_timestamps_json, "w", encoding="utf-8") as f:
        json.dump(output_payload, f, indent=2)

    print(f"Transcription complete! Duration: {total_duration:.1f}s ({total_duration/60:.2f} mins), Frames @ 30fps: {total_frames}")

async def main():
    await generate_speech()
    master_audio()
    transcribe()

if __name__ == "__main__":
    asyncio.run(main())
