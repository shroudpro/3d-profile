import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const brief = await readFile(path.join(root, 'docs/brief.txt'), 'utf8');
const urls = [...brief.matchAll(/https:\/\/[^\s]+/g)].map((match) => match[0]);
if (urls.length !== 35) throw new Error(`Expected 35 supplied images; found ${urls.length}.`);

const images = urls.map((url, index) => {
  const name = index === 0 ? 'portrait.png'
    : index <= 21 ? `marquee-${String(index).padStart(2, '0')}.gif`
      : index <= 25 ? ['moon.png', 'sculpture.png', 'lego.png', 'rings.png'][index - 22]
        : `project-${Math.floor((index - 26) / 3) + 1}-${(index - 26) % 3 + 1}.webp`;
  return { url, name };
});

await mkdir(path.join(root, 'public/images'), { recursive: true });
let cursor = 0;
const failures = [];
// Limit concurrency so the large animated previews do not overwhelm their host.
await Promise.all(Array.from({ length: 5 }, async () => {
  while (cursor < images.length) {
    const { url, name } = images[cursor++];
    if (name === 'marquee-21.gif') {
      process.stderr.write('Celestia: supplied URL is unavailable (404); this gallery slot uses the supplied Luminex preview.\n');
      continue;
    }
    try {
      const existing = await stat(path.join(root, 'public/images', name)).catch((error) => {
        if (error.code === 'ENOENT') return null;
        throw error;
      });
      if (existing?.size) continue;
      const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
      if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) {
        throw new Error(`Invalid image response: ${response.status}`);
      }
      const data = new Uint8Array(await response.arrayBuffer());
      await writeFile(path.join(root, 'public/images', name), data);
      process.stdout.write(`${name}: ${(data.length / 1024).toFixed(0)} KB\n`);
    } catch (error) {
      failures.push({ name, error: error instanceof Error ? error.message : String(error) });
    }
  }
}));

await mkdir(path.join(root, 'public/fonts'), { recursive: true });
await mkdir(path.join(root, 'src'), { recursive: true });
const fontResponse = await fetch('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap', {
  headers: { 'User-Agent': 'Mozilla/5.0 Chrome/130.0.0.0 Safari/537.36' },
});
if (!fontResponse.ok) throw new Error(`Font stylesheet failed: ${fontResponse.status}`);
const fontCss = await fontResponse.text();
const latinMatches = [...fontCss.matchAll(/\/\* latin \*\/\s*(@font-face\s*\{[^}]+\})/g)];
const latinBlocks = latinMatches.length ? latinMatches : [...fontCss.matchAll(/(@font-face\s*\{[^}]+\})/g)];
if (latinBlocks.length !== 7) throw new Error(`Expected 7 Kanit font weights; found ${latinBlocks.length}.`);
const localFonts = await Promise.all(latinBlocks.map(async ([, block]) => {
  const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
  const source = block.match(/url\(([^)]+)\)/)?.[1];
  if (!weight || !source) throw new Error('Invalid font definition.');
  const response = await fetch(source);
  if (!response.ok) throw new Error(`Kanit ${weight} failed: ${response.status}`);
  const extension = new URL(source).pathname.endsWith('.woff2') ? 'woff2' : 'ttf';
  const name = `kanit-${weight}.${extension}`;
  await writeFile(path.join(root, 'public/fonts', name), new Uint8Array(await response.arrayBuffer()));
  return block.replace(source, `/fonts/${name}`);
}));
await writeFile(path.join(root, 'src/fonts.css'), `${localFonts.join('\n')}\n`);
if (failures.length) {
  process.stderr.write(`${JSON.stringify(failures, null, 2)}\n`);
  process.exitCode = 1;
}
