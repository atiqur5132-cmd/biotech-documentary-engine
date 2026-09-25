import json

with open("src/anthropic_art_timestamps.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Total duration: {data['duration']:.2f}s ({data['duration']/60:.2f} mins), Total frames @ 30fps: {data['total_frames']}")
print("--- Segments ---")
for s in data["segments"]:
    start_f = int(s["start"] * 30)
    end_f = int(s["end"] * 30)
    print(f"[{s['start']:6.1f}s - {s['end']:6.1f}s] (F:{start_f:5d} - {end_f:5d}) {s['text'].strip()}")
