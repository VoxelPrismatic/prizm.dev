import os
import ffmpeg #ffmpeg-python
import argparse

# Get target folder
parser = argparse.ArgumentParser()
parser.add_argument("target")
args = parser.parse_args()
t = args.target

# Start converting
for f in os.listdir(t):
    if f.endswith("-smol.webp"):
        continue
    p = ffmpeg.probe(t + "/" + f)
    h = p["streams"][0]["height"]
    w = p["streams"][0]["width"]
    n = 4
    while h/n > 1024 or w/n > 1024:
        n += 1
    os.system(f"ffmpeg -i \"{t}/{f}\" -vf scale={w/n:.0f}:{h/n:.0f} \"{t}/{f}-smol.webp\" -y")
