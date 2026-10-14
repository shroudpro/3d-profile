import { copyFile, mkdir, stat } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const run = promisify(execFile);
const root = path.resolve(import.meta.dirname, '..');
const originalDirectory = path.join(root, '.clone-ui/source/original-previews');
const outputDirectory = path.join(root, '.clone-ui/source/optimized-previews');
await mkdir(originalDirectory, { recursive: true });
await mkdir(outputDirectory, { recursive: true });
let cursor = 1;
let originalBytes = 0;
let optimizedBytes = 0;
await Promise.all(Array.from({ length: 2 }, async () => {
  while (cursor <= 20) {
    const name = `marquee-${String(cursor++).padStart(2, '0')}.gif`;
    const current = path.join(root, 'public/images', name);
    const original = path.join(originalDirectory, name);
    const optimized = path.join(outputDirectory, name);
    const saved = await stat(original).catch((error) => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    if (!saved) await copyFile(current, original);
    await run(process.env.FFMPEG_PATH || 'ffmpeg', [
      '-hide_banner', '-loglevel', 'error', '-y', '-i', original,
      '-filter_complex', '[0:v]fps=15,scale=420:270:force_original_aspect_ratio=increase,crop=420:270,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3:diff_mode=rectangle',
      '-loop', '0', optimized,
    ], { maxBuffer: 1024 * 1024 });
    const before = (await stat(original)).size;
    const after = (await stat(optimized)).size;
    if (after < before) await copyFile(optimized, current);
    await run(process.env.FFMPEG_PATH || 'ffmpeg', [
      '-hide_banner', '-loglevel', 'error', '-y', '-i', current,
      '-frames:v', '1', '-quality', '80', current.replace(/\.gif$/, '.webp'),
    ]);
    originalBytes += before;
    optimizedBytes += Math.min(before, after);
    process.stdout.write(`${name}: ${(before / 1024).toFixed(0)} → ${(Math.min(before, after) / 1024).toFixed(0)} KB\n`);
  }
}));
process.stdout.write(`Total: ${(originalBytes / 1048576).toFixed(1)} → ${(optimizedBytes / 1048576).toFixed(1)} MB\n`);
