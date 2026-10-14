import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const directory = path.resolve(import.meta.dirname, '../public/visuals');
await mkdir(directory, { recursive: true });

function scene(title, subtitle, accent, body, height = 800) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}">
  <defs>
    <radialGradient id="ambient"><stop stop-color="${accent}" stop-opacity=".35"/><stop offset="1" stop-color="#0c0c0c" stop-opacity="0"/></radialGradient>
    <linearGradient id="silver" x2=".85" y2="1"><stop stop-color="#fff"/><stop offset=".4" stop-color="#d7e2ea"/><stop offset="1" stop-color="#788390"/></linearGradient>
    <linearGradient id="fabric" x1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".5" stop-color="#dfdce9"/><stop offset="1" stop-color="#918ba6"/></linearGradient>
    <linearGradient id="glass" x2="1" y2="1"><stop stop-color="#41404e"/><stop offset=".55" stop-color="#16141d"/><stop offset="1" stop-color="#252530"/></linearGradient>
    <linearGradient id="accent" x2="1" y2="1"><stop stop-color="#d7e2ea"/><stop offset=".5" stop-color="${accent}"/><stop offset="1" stop-color="#64319b"/></linearGradient>
    <filter id="shadow" x="-70%" y="-70%" width="240%" height="240%"><feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#000" flood-opacity=".55"/></filter>
    <filter id="glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="20"/></filter>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke="#d7e2ea" stroke-opacity=".05"/></pattern>
  </defs>
  <rect width="1200" height="${height}" fill="#0f0f13"/>
  <rect width="1200" height="${height}" fill="url(#grid)"/>
  <ellipse cx="600" cy="${height * .54}" rx="600" ry="${height * .7}" fill="url(#ambient)"/>
  <g font-family="Segoe UI, Arial, sans-serif" fill="#d7e2ea" text-anchor="middle">
    <text x="600" y="${height === 1000 ? 165 : 155}" font-size="${height === 1000 ? 58 : 56}" font-weight="800" letter-spacing="-2">${title}</text>
    <text x="600" y="${height === 1000 ? 210 : 195}" font-size="18" fill="#aeb0bf" letter-spacing="4">${subtitle}</text>
  </g>
  ${body}
  <g fill="#d7e2ea" font-family="Segoe UI, Arial, sans-serif" font-size="14" letter-spacing="3"><text x="50" y="${height - 40}" opacity=".4">SHROUD / PROJECT VISUAL</text></g>
</svg>`;
}

function shirt(x, y, scale = 1, fill = 'url(#fabric)') {
  return `<g transform="translate(${x} ${y}) scale(${scale})" filter="url(#shadow)">
  <path d="M-80-85-40-112Q0-88 40-112L80-85 125-28 77 4 60-19 65 119Q0 135-65 119L-60-19-77 4-125-28Z" fill="${fill}" stroke="#f0eef7" stroke-opacity=".6" stroke-width="2"/>
  <path d="M-40-112Q0-66 40-112" fill="none" stroke="#848094" stroke-width="7"/>
  <path d="M-55 5-46 105M56 5 47 105M-23-77-12 111" stroke="#a39daf" stroke-opacity=".5" fill="none"/>
  <path d="M-69-79-103-29M70-79 104-29" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="3"/>
  </g>`;
}

function pill(label, y, accent) {
  return `<g font-family="Segoe UI, Arial, sans-serif" text-anchor="middle"><rect x="395" y="${y}" width="410" height="56" rx="28" fill="#18151f" stroke="${accent}" stroke-opacity=".7"/><text x="600" y="${y + 35}" fill="#d7e2ea" font-size="18" letter-spacing="3">${label}</text></g>`;
}

const wardrobeCover = scene('WARDROBE', 'LOCAL-FIRST / AI', '#ca91e9', `
  <ellipse cx="600" cy="780" rx="220" ry="45" fill="#c286df" opacity=".3" filter="url(#glow)"/>
  <ellipse cx="600" cy="600" rx="270" ry="140" fill="none" stroke="url(#accent)" stroke-width="3" transform="rotate(-30 600 600)" opacity=".65"/>
  <rect x="439" y="312" width="325" height="395" rx="40" fill="url(#glass)" stroke="#a48abe" stroke-opacity=".3" transform="rotate(12 600 500)"/>
  ${shirt(600, 532, 1.55)}
  <g fill="url(#accent)"><circle cx="410" cy="400" r="18"/><circle cx="780" cy="680" r="12"/><circle cx="800" cy="350" r="7"/></g>
  ${pill('PHOTO → REVIEW → STYLE', 830, '#be84df')}`, 1000);

const wardrobeFlow = scene('IMPORT &amp; REVIEW', 'VISION / GENERATION / APPROVAL', '#bf93eb', `
  <path d="M320 440H880" stroke="#b592cc" stroke-width="2" stroke-dasharray="7 12" opacity=".5"/>
  <g filter="url(#shadow)">
    <rect x="250" y="300" width="210" height="265" rx="28" fill="url(#glass)" stroke="#9584a7" stroke-opacity=".5" transform="rotate(-10 355 430)"/>
    <rect x="740" y="300" width="210" height="265" rx="28" fill="url(#glass)" stroke="#9584a7" stroke-opacity=".5" transform="rotate(10 845 430)"/>
    <rect x="475" y="270" width="250" height="310" rx="30" fill="#2f253b" stroke="#d8bcf0" stroke-opacity=".65"/>
  </g>
  ${shirt(355, 430, .55)}${shirt(600, 425, .7)}${shirt(845, 430, .55)}
  <g font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#d7e2ea" text-anchor="middle"><text x="355" y="640">01 / IMPORT</text><text x="600" y="640">02 / REVIEW</text><text x="845" y="640">03 / SAVE</text></g>`);

let closet = '';
for (let i = 0; i < 6; i++) {
  const x = 385 + (i % 3) * 215;
  const y = 340 + Math.floor(i / 3) * 185;
  closet += `<rect x="${x - 90}" y="${y - 77}" width="180" height="158" rx="22" fill="url(#glass)" stroke="#d7e2ea" stroke-opacity=".2"/>${shirt(x, y - 3, .44, i % 2 ? 'url(#accent)' : 'url(#fabric)')}`;
}
const wardrobeLibrary = scene('YOUR CLOSET', 'EDIT / ORGANIZE / COMBINE', '#d294b5', `${closet}${pill('A WORKFLOW FOR EVERY LOOK', 655, '#c792d8')}`);

const modelingCover = scene('MODELING', 'FROM QUESTION TO PAPER', '#b299ff', `
  <ellipse cx="600" cy="600" rx="265" ry="145" fill="none" stroke="url(#accent)" stroke-width="4" transform="rotate(-40 600 600)" opacity=".6"/>
  <g filter="url(#shadow)">
    <rect x="466" y="323" width="300" height="395" rx="28" fill="#403459" stroke="#9d85be" transform="rotate(13 600 520)"/>
    <rect x="440" y="300" width="320" height="420" rx="28" fill="url(#silver)" transform="rotate(-8 600 520)"/>
  </g>
  <g transform="rotate(-8 600 520)" font-family="Segoe UI, Arial, sans-serif" text-anchor="middle">
    <text x="600" y="430" fill="#2d2836" font-size="65" font-weight="700">f(x)</text>
    <path d="M488 485H712M488 512H690M488 539H706M488 566H643" stroke="#817c89" stroke-width="7" stroke-linecap="round" opacity=".5"/>
    <rect x="488" y="604" width="224" height="65" rx="12" fill="#afa6c2"/><text x="600" y="646" font-size="26" fill="#302738" font-weight="600">LaTeX</text>
  </g>
  ${pill('DATA → MODEL → PAPER', 830, '#aa8bcf')}`, 1000);

const modelingFlow = scene('SOLVE, THEN TELL', 'PROBLEM / PLAN / DELIVERY', '#af9bec', `
  <g filter="url(#shadow)">
    <rect x="320" y="290" width="240" height="300" rx="26" fill="url(#glass)" stroke="#8976ab" transform="rotate(-12 440 440)"/>
    <rect x="660" y="290" width="240" height="300" rx="26" fill="url(#glass)" stroke="#8976ab" transform="rotate(12 780 440)"/>
    <rect x="460" y="260" width="280" height="340" rx="28" fill="url(#silver)"/>
  </g>
  <g font-family="Segoe UI, Arial, sans-serif" text-anchor="middle" font-weight="700"><text x="600" y="357" fill="#322a40" font-size="40">PLAN</text><path d="M503 400H697M503 435H652M503 470H687M503 505H641" stroke="#857a96" stroke-width="9" stroke-linecap="round"/><text x="380" y="437" fill="#d7e2ea" font-size="26">CSV</text><text x="825" y="437" fill="#d7e2ea" font-size="25">PDF</text></g>
  ${pill('A REUSABLE AI WORKFLOW', 655, '#b193d9')}`);

const modelingData = scene('CONNECT THE DOTS', 'DATA ANALYSIS / WORKFLOW CONCEPT', '#b1a6ff', `
  <rect x="270" y="265" width="660" height="365" rx="36" fill="url(#glass)" stroke="#ac98d1" stroke-opacity=".35" filter="url(#shadow)"/>
  <g stroke="#d7e2ea" stroke-opacity=".08"><path d="M320 330H880M320 400H880M320 470H880M320 540H880M380 310V580M490 310V580M600 310V580M710 310V580M820 310V580"/></g>
  <path d="M320 535C400 540 405 425 470 450S580 550 640 430 745 370 790 350 850 395 885 315" fill="none" stroke="url(#accent)" stroke-width="7" stroke-linecap="round"/>
  <g fill="#d7e2ea" stroke="#b3a0e9" stroke-width="7"><circle cx="470" cy="450" r="11"/><circle cx="640" cy="430" r="11"/><circle cx="790" cy="350" r="11"/></g>
  ${pill('PYTHON + STRUCTURED DELIVERY', 665, '#ac90dc')}`);

let pins = '';
for (let i = 0; i < 8; i++) {
  const x = 387 + i * 28;
  const y = 475 + i * 17;
  pins += `<path d="M${x} ${y}l-40 26v26M${1200 - x} ${y}l40 26v26" stroke="url(#silver)" stroke-width="9" stroke-linecap="round"/>`;
}
const quartusCover = scene('QUARTUS MCP', 'AI MEETS LOCAL ENGINEERING', '#83cef2', `
  <ellipse cx="600" cy="745" rx="265" ry="40" fill="#669ac9" opacity=".25" filter="url(#glow)"/>
  <g filter="url(#shadow)">${pins}
    <path d="M365 460 600 600V655L365 515Z" fill="#181a24" stroke="#667488"/>
    <path d="M600 600 835 460V515L600 655Z" fill="#222733" stroke="#667488"/>
    <path d="M365 460 600 320 835 460 600 600Z" fill="url(#glass)" stroke="#a1adc1" stroke-width="3"/>
    <path d="M500 460 600 400 700 460 600 520Z" fill="url(#silver)" stroke="#fff" stroke-opacity=".7"/>
  </g>
  <g font-family="Segoe UI, Arial, sans-serif" text-anchor="middle"><text x="600" y="470" fill="#343d4d" font-size="33" font-weight="800">MCP</text></g>
  <path d="M260 430H345M855 430H940M370 290 465 350M830 290 735 350" stroke="#83c2ed" stroke-opacity=".4" stroke-width="3"/>
  <g fill="#9bcef6"><circle cx="260" cy="430" r="9"/><circle cx="940" cy="430" r="9"/><circle cx="370" cy="290" r="6"/><circle cx="830" cy="290" r="6"/></g>
  ${pill('VHDL / VWF / CLI', 830, '#85bce5')}`, 1000);

const quartusFlow = scene('ONE CONNECTED FLOW', 'AGENT / MCP / QUARTUS', '#83c7f0', `
  <path d="M600 270V620" stroke="#92bce6" stroke-width="3" stroke-dasharray="7 12"/>
  <g filter="url(#shadow)" font-family="Segoe UI, Arial, sans-serif" text-anchor="middle" font-size="32" font-weight="600">
    <rect x="360" y="280" width="480" height="90" rx="24" fill="url(#glass)" stroke="#8095bc"/><text x="600" y="337" fill="#d7e2ea">AI AGENT</text>
    <rect x="360" y="415" width="480" height="90" rx="24" fill="url(#silver)"/><text x="600" y="472" fill="#293244">MCP SERVER</text>
    <rect x="360" y="550" width="480" height="90" rx="24" fill="url(#glass)" stroke="#8095bc"/><text x="600" y="607" fill="#d7e2ea">QUARTUS CLI</text>
  </g>`);

const quartusWave = scene('SIGNALS INTO STORIES', 'SIMULATION WORKFLOW / CONCEPT', '#9acbf3', `
  <rect x="260" y="260" width="680" height="380" rx="36" fill="url(#glass)" stroke="#9ab2da" stroke-opacity=".4" filter="url(#shadow)"/>
  <g stroke="#d7e2ea" stroke-opacity=".08"><path d="M310 350H890M310 450H890M310 550H890M390 310V600M500 310V600M610 310V600M720 310V600M830 310V600"/></g>
  <path d="M310 385H370V315H450V385H540V315H625V385H710V315H795V385H890" fill="none" stroke="#9bcef6" stroke-width="7" stroke-linejoin="round"/>
  <path d="M310 490H430V420H565V490H700V420H835V490H890" fill="none" stroke="#b79bec" stroke-width="7" stroke-linejoin="round"/>
  <path d="M310 585H510V515H720V585H890" fill="none" stroke="#d7e2ea" stroke-width="7" stroke-linejoin="round"/>
  ${pill('LOCAL TOOLS, CLEAR OUTPUTS', 670, '#92b3e3')}`);

const files = {
  'wardrobe-cover': wardrobeCover, 'wardrobe-flow': wardrobeFlow, 'wardrobe-library': wardrobeLibrary,
  'modeling-cover': modelingCover, 'modeling-flow': modelingFlow, 'modeling-data': modelingData,
  'quartus-cover': quartusCover, 'quartus-flow': quartusFlow, 'quartus-wave': quartusWave,
};
await Promise.all(Object.entries(files).map(([name, svg]) => writeFile(path.join(directory, `${name}.svg`), `${svg}\n`)));
process.stdout.write(`Created ${Object.keys(files).length} project visuals.\n`);
