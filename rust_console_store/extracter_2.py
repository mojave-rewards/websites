import cv2
import numpy as np
from PIL import Image
import os

# Load the full store image
input_path = "store_image.png"  # Replace with your file if needed
output_dir = "borderless_items_bottom"
os.makedirs(output_dir, exist_ok=True)

# Read and preprocess
image = cv2.imread(input_path)
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 40, 255, cv2.THRESH_BINARY)

# Find external contours (item boxes)
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

count = 0
for cnt in contours:
    x, y, w, h = cv2.boundingRect(cnt)

    if 80 < w < 300 and 80 < h < 300:
        item = image[y:y+h, x:x+w]

        # Crop values
        side_border = 6
        top_border = 12
        
        h_adj, w_adj = item.shape[:2]
        
        # Use different cropping parameters based on item height
        if h < 170:  # top/middle rows
            name_and_border_height = 40
        else:  # bottom row
            name_and_border_height = 25  # Increased from 25 to 40 to properly crop bottom section
            
        top = top_border
        bottom = h_adj - name_and_border_height

        tight_item = item[top:bottom, side_border:w_adj-side_border]

        out_path = os.path.join(output_dir, f"item_{count}.png")
        Image.fromarray(cv2.cvtColor(tight_item, cv2.COLOR_BGR2RGB)).save(out_path)
        count += 1

print(f"✅ Done! {count} items saved with borders and names trimmed in '{output_dir}'")
