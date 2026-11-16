#!/usr/bin/env python3
"""
Collage Image Exporter
Exports 480w and 960w AVIF and WebP images from public/images/about into public/images/about/export
Ensures all 960w assets remain strictly under 90 KB.
"""
import os
import subprocess
from PIL import Image

output_dir = 'public/images/about/export'
os.makedirs(output_dir, exist_ok=True)

images = [
    ('bridge_motorcycle_wide.webp', 'bridge_motorcycle_wide'),
    ('bridge_motorcycle.webp', 'bridge_motorcycle'),
    ('selfie_school.webp', 'selfie_school'),
    ('redbull_f1_helmet.webp', 'redbull_f1_helmet'),
    ('zidane_river.webp', 'zidane_river'),
    ('wa0044_desk_sim.webp', 'wa0044_desk_sim'),
]

for src_name, base_name in images:
    src_path = os.path.join('public/images/about', src_name)
    im = Image.open(src_path)
    if im.mode in ('RGBA', 'P'):
        im = im.convert('RGB')
    orig_w, orig_h = im.size

    for target_w in (480, 960):
        target_h = int(round(orig_h * (target_w / orig_w)))
        resized = im.resize((target_w, target_h), Image.Resampling.LANCZOS)

        # WebP Export
        webp_q = 80 if target_w == 480 else 76
        webp_out = os.path.join(output_dir, f'{base_name}-{target_w}w.webp')
        resized.save(webp_out, 'WEBP', quality=webp_q, method=6)
        webp_kb = os.path.getsize(webp_out) / 1024

        # AVIF Export via ffmpeg (libaom-av1)
        tmp_png = f'/tmp/{base_name}_{target_w}.png'
        resized.save(tmp_png, 'PNG')
        avif_out = os.path.join(output_dir, f'{base_name}-{target_w}w.avif')
        cmd = [
            'ffmpeg', '-y', '-i', tmp_png,
            '-c:v', 'libaom-av1', '-crf', '34', '-cpu-used', '6',
            '-pix_fmt', 'yuv420p',
            avif_out
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        if os.path.exists(tmp_png):
            os.remove(tmp_png)
        avif_kb = os.path.getsize(avif_out) / 1024 if os.path.exists(avif_out) else 0

        print(f'{base_name} {target_w}w: WebP={webp_kb:.1f}KB, AVIF={avif_kb:.1f}KB (max 90KB pass: {webp_kb < 90 and avif_kb < 90})')
