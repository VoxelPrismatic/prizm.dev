import os
import ffmpeg #ffmpeg-python
import argparse

# Get target folder
parser = argparse.ArgumentParser()
parser.add_argument("target", nargs = "+")
args = parser.parse_args()

# Start converting
ls = []
for t in args.target:
    for f in os.listdir(t):
        if f.endswith("-smol.webp"):
            continue
        ls.append(t + "/" + f)
m = 0
l = len(ls)
print()
for f in ls:
    m += 1
    print(f"\x1b[1A\x1b[K{f} ({m/l*100:.2f}%)")
    p = ffmpeg.probe(f)
    h = p["streams"][0]["height"]
    w = p["streams"][0]["width"]
    n = 6
    while h/n > 640 or w/n > 640:
        n += 1
    print(f"\x1b[1A\x1b[K{f} [{m/l*100:.2f}%]")
    os.system(f"ffmpeg -i \"{f}\" -vf scale={w/n:.0f}:{h/n:.0f} \"{f}-smol.webp\" -y 2> /dev/null")
