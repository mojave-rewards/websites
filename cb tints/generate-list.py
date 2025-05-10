import os
import json

GALLERY_DIR = './images/gallery'
OUTPUT_FILE = './images/list.json'
VALID_EXT = ('.jpg', '.jpeg', '.png', '.webp', '.gif')

files = [
    f for f in os.listdir(GALLERY_DIR)
    if os.path.isfile(os.path.join(GALLERY_DIR, f)) and f.lower().endswith(VALID_EXT)
]

with open(OUTPUT_FILE, 'w') as f:
    json.dump(files, f, indent=2)

print(f"✅ Generated list.json with {len(files)} images.")
