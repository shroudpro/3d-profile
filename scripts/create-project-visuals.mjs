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

function workflow(title, subtitle, accent, steps) {
  const start = steps.length === 4 ? 265 : 300;
  const spacing = steps.length === 4 ? 100 : 115;
  return scene(title, subtitle, accent, `
    <path d="M600 ${start}V${start + (steps.length - 1) * spacing + 76}" stroke="${accent}" stroke-width="3" stroke-dasharray="6 10" opacity=".6"/>
    <g filter="url(#shadow)" font-family="Segoe UI, Arial, sans-serif" text-anchor="middle">
      ${steps.map((step, index) => `<rect x="330" y="${start + index * spacing}" width="540" height="76" rx="24" fill="${index === 1 ? 'url(#silver)' : 'url(#glass)'}" stroke="${accent}" stroke-opacity=".4"/><text x="600" y="${start + index * spacing + 48}" fill="${index === 1 ? '#293244' : '#d7e2ea'}" font-size="25" font-weight="600">${step}</text>`).join('')}
    </g>`);
}

const talkKidsCover = scene('TALK KIDS', 'LOCAL VOICE / ENGLISH PRACTICE', '#9ba8ff', `
  <ellipse cx="600" cy="748" rx="205" ry="35" fill="#99b2ff" opacity=".3" filter="url(#glow)"/>
  <g filter="url(#shadow)">
    <rect x="510" y="315" width="180" height="300" rx="90" fill="url(#silver)"/>
    <path d="M462 510V535C462 705 738 705 738 535V510M600 666V740M530 740H670" fill="none" stroke="url(#silver)" stroke-width="22" stroke-linecap="round"/>
    <path d="M557 367H643M552 400H648M552 433H648M557 466H643" stroke="#79849b" stroke-width="10" stroke-linecap="round" opacity=".65"/>
  </g>
  <g stroke="url(#accent)" stroke-width="8" stroke-linecap="round"><path d="M367 450V540M400 407V583M833 450V540M800 407V583"/></g>
  ${pill('LISTEN → TALK → REPLY', 830, '#9ba8ff')}`, 1000);
const talkKidsFlow = workflow('A VOICE, A CONVERSATION', 'RECORD / TRANSCRIBE / RESPOND', '#9ba8ff', ['RECORD AUDIO', 'SPEECH TO TEXT', 'AI CONVERSATION', 'VOICE REPLY']);
const talkKidsDialogue = scene('KEEP THE CONVERSATION', 'LOCAL SPEECH / WORKFLOW CONCEPT', '#9ba8ff', `
  <g filter="url(#shadow)">
    <path d="M285 285H775Q805 285 805 315V420Q805 450 775 450H435L375 495V450H285Q255 450 255 420V315Q255 285 285 285Z" fill="url(#glass)" stroke="#98a0d9" stroke-opacity=".5"/>
    <path d="M425 490H915Q945 490 945 520V615Q945 645 915 645H805V685L745 645H425Q395 645 395 615V520Q395 490 425 490Z" fill="url(#silver)"/>
  </g>
  <g fill="#d7e2ea" font-family="Segoe UI, Arial, sans-serif"><text x="300" y="350" font-size="27">LET'S TALK.</text><path d="M300 392H700" stroke="#8792bd" stroke-width="6" stroke-linecap="round"/>
  <text x="445" y="549" fill="#293244" font-size="27">ONE REPLY AT A TIME.</text></g>
  <g stroke="#6d7896" stroke-width="7" stroke-linecap="round"><path d="M465 590V611M494 578V623M523 590V611M552 565V636M581 581V620M610 590V611M639 574V627M668 590V611M697 582V619"/></g>`);

const contractCover = scene('CONTRACT AI', 'DOCUMENTS / HUMAN REVIEW', '#e0bda4', `
  <ellipse cx="600" cy="758" rx="235" ry="40" fill="#cda583" opacity=".25" filter="url(#glow)"/>
  <g filter="url(#shadow)">
    <rect x="445" y="310" width="310" height="400" rx="28" fill="url(#glass)" stroke="#bb9d91" transform="rotate(12 600 510)"/>
    <rect x="425" y="290" width="310" height="400" rx="28" fill="url(#silver)" transform="rotate(-8 580 490)"/>
  </g>
  <g transform="rotate(-8 580 490)" stroke="#7d8594" stroke-width="8" stroke-linecap="round"><path d="M485 365H675M485 399H652M485 470H675M485 504H610M485 566H675M485 600H638"/></g>
  <g filter="url(#shadow)"><circle cx="750" cy="622" r="92" fill="url(#glass)" stroke="#dfc1b1" stroke-width="3"/><path d="M709 622 737 650 789 594" stroke="url(#silver)" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  ${pill('PARSE → REVIEW → REPORT', 830, '#dbb59c')}`, 1000);
const contractFlow = workflow('FROM FILE TO REVIEW', 'UPLOAD / EVIDENCE / REPORT', '#dfbbaa', ['UPLOAD CONTRACT', 'AI RISK ANALYSIS', 'HUMAN REVIEW', 'GENERATE REPORT']);
const contractReview = scene('KEEP THE EVIDENCE', 'RISK REVIEW / CONCEPT VISUAL', '#ddb39b', `
  <g filter="url(#shadow)"><rect x="265" y="260" width="415" height="390" rx="32" fill="url(#silver)"/>
  <rect x="715" y="320" width="235" height="260" rx="28" fill="url(#glass)" stroke="#b89b8e" stroke-opacity=".5"/></g>
  <g stroke="#9299a6" stroke-width="8" stroke-linecap="round"><path d="M315 328H625M315 362H602M315 494H625M315 528H570M315 596H625"/></g>
  <rect x="303" y="403" width="325" height="58" rx="13" fill="#dbbea9"/>
  <path d="M320 432H610M633 432H700" stroke="#8b6b5b" stroke-width="7" stroke-linecap="round"/>
  <g fill="#d7e2ea" font-family="Segoe UI, Arial, sans-serif" text-anchor="middle"><text x="832" y="388" font-size="23">REVIEW</text><path d="M765 428H900M765 460H877M765 492H893" stroke="#aaa2a9" stroke-width="7" stroke-linecap="round"/></g>`);

const coolearnCover = scene('COOLEARN', 'A CONNECTED LEARNING PATH', '#92cbbf', `
  <ellipse cx="600" cy="752" rx="255" ry="42" fill="#86b8aa" opacity=".25" filter="url(#glow)"/>
  <path d="M415 475 535 365 705 400 800 575 640 680 435 625 415 475M535 365 640 680M415 475 800 575M435 625 705 400" fill="none" stroke="url(#accent)" stroke-width="4" opacity=".65"/>
  <g filter="url(#shadow)"><circle cx="415" cy="475" r="50" fill="url(#silver)"/><circle cx="535" cy="365" r="40" fill="url(#glass)" stroke="#92cbbf"/><circle cx="705" cy="400" r="54" fill="url(#silver)"/><circle cx="800" cy="575" r="38" fill="url(#glass)" stroke="#92cbbf"/><circle cx="640" cy="680" r="58" fill="url(#silver)"/><circle cx="435" cy="625" r="34" fill="url(#glass)" stroke="#92cbbf"/></g>
  <g fill="#45655f"><circle cx="415" cy="475" r="13"/><path d="M693 389H717V413H693ZM617 680 640 659 663 680 640 701Z"/></g>
  ${pill('LEARN → PRACTICE → REVIEW', 830, '#92cbbf')}`, 1000);
const coolearnFlow = workflow('BUILD YOUR LEARNING PATH', 'COURSES / PRACTICE / REVIEW', '#92cbbf', ['KNOWLEDGE MAP', 'COURSES + PRACTICE', 'WEAK POINT ANALYSIS', 'REVIEW']);
const coolearnMap = scene('KNOWLEDGE, CONNECTED', 'LEARNING GRAPH / CONCEPT', '#92cbbf', `
  <g stroke="#92cbbf" stroke-width="3" opacity=".5"><path d="M600 440 360 310M600 440 840 310M600 440 330 550M600 440 870 550M600 440 600 650M360 310 330 550M840 310 870 550"/></g>
  <g filter="url(#shadow)"><circle cx="600" cy="440" r="92" fill="url(#silver)"/>
  <circle cx="360" cy="310" r="56" fill="url(#glass)" stroke="#92cbbf"/><circle cx="840" cy="310" r="56" fill="url(#glass)" stroke="#92cbbf"/>
  <circle cx="330" cy="550" r="48" fill="url(#glass)" stroke="#92cbbf"/><circle cx="870" cy="550" r="48" fill="url(#glass)" stroke="#92cbbf"/><circle cx="600" cy="650" r="48" fill="url(#glass)" stroke="#92cbbf"/></g>
  <g font-family="Segoe UI, Arial, sans-serif" text-anchor="middle" fill="#d7e2ea" font-size="18"><text x="600" y="454" fill="#314b47" font-size="40" font-weight="700">AI</text><text x="360" y="317">LEARN</text><text x="840" y="317">PRACTICE</text><text x="330" y="557">MAP</text><text x="870" y="557">REVIEW</text><text x="600" y="657">GROW</text></g>`);

const pptCover = scene('AI PPT', 'FROM DOCUMENT TO PRESENTATION', '#bca7ee', `
  <ellipse cx="600" cy="758" rx="245" ry="42" fill="#ab8bd8" opacity=".25" filter="url(#glow)"/>
  <g filter="url(#shadow)"><rect x="440" y="330" width="425" height="280" rx="30" fill="url(#glass)" stroke="#b9a8d1" transform="rotate(12 650 470)"/>
  <rect x="330" y="382" width="460" height="300" rx="30" fill="url(#silver)" transform="rotate(-10 560 530)"/></g>
  <g transform="rotate(-10 560 530)"><path d="M405 449H645M405 483H585" stroke="#7e7699" stroke-width="12" stroke-linecap="round"/>
  <rect x="405" y="530" width="52" height="82" rx="8" fill="#ada4c5"/><rect x="477" y="558" width="52" height="54" rx="8" fill="#8b829f"/><rect x="549" y="514" width="52" height="98" rx="8" fill="#b4a1d0"/>
  <path d="M660 545 707 575 660 605Z" fill="#766584"/></g>
  ${pill('PARSE → PLAN → PPTX', 830, '#bca7ee')}`, 1000);
const pptFlow = workflow('CONTENT INTO SLIDES', 'DOCUMENT / PLANNING / EDITABLE OUTPUT', '#bca7ee', ['PARSE DOCUMENT', 'PLAN SLIDES', 'EDITABLE PPTX']);
const pptSlides = scene('ROOM TO EDIT', 'SLIDE DESIGN / CONCEPT VISUAL', '#bca7ee', `
  <g filter="url(#shadow)"><rect x="230" y="300" width="400" height="260" rx="26" fill="url(#glass)" stroke="#b49bcc" transform="rotate(-9 430 430)"/>
  <rect x="600" y="350" width="400" height="260" rx="26" fill="url(#glass)" stroke="#b49bcc" transform="rotate(9 800 480)"/>
  <rect x="390" y="270" width="430" height="285" rx="26" fill="url(#silver)"/></g>
  <rect x="432" y="317" width="340" height="82" rx="10" fill="none" stroke="#8b7aa8" stroke-width="2" stroke-dasharray="5 6"/>
  <g fill="#8b7aa8"><rect x="427" y="312" width="10" height="10"/><rect x="767" y="312" width="10" height="10"/><rect x="427" y="394" width="10" height="10"/><rect x="767" y="394" width="10" height="10"/></g>
  <g stroke="#81758f" stroke-width="12" stroke-linecap="round"><path d="M460 351H720M460 380H620M447 447H743M447 481H679"/></g>
  ${pill('STRUCTURE + PRESENTATION', 655, '#bca7ee')}`);

const studyCover = scene('STUDY MONITOR', 'VISION MEETS LOCAL AI', '#8ab9df', `
  <ellipse cx="600" cy="750" rx="225" ry="40" fill="#89b5d4" opacity=".25" filter="url(#glow)"/>
  <g filter="url(#shadow)"><rect x="355" y="367" width="490" height="300" rx="65" fill="url(#glass)" stroke="#94afc9" stroke-width="2"/>
  <path d="M435 367 470 315H605L640 367" fill="url(#silver)"/><circle cx="600" cy="517" r="120" fill="#1c2537" stroke="url(#silver)" stroke-width="22"/>
  <circle cx="600" cy="517" r="80" fill="url(#accent)"/><circle cx="600" cy="517" r="47" fill="#111521"/><circle cx="577" cy="494" r="17" fill="#d7e2ea" opacity=".7"/></g>
  <circle cx="774" cy="420" r="12" fill="#a9cbe9"/>
  ${pill('OBSERVE → DETECT → EXPLAIN', 830, '#8ab9df')}`, 1000);
const studyFlow = workflow('LOOK, THEN UNDERSTAND', 'CAMERA / YOLO / LOCAL LLM', '#8ab9df', ['CAMERA INPUT', 'YOLO DETECTION', 'LOCAL LLM EXPLANATION']);
const studyView = scene('A WINDOW INTO FOCUS', 'VISUAL ANALYSIS / CONCEPT', '#8ab9df', `
  <rect x="255" y="265" width="690" height="370" rx="36" fill="url(#glass)" stroke="#9ab9d3" stroke-opacity=".4" filter="url(#shadow)"/>
  <path d="M315 380V325H370M830 325H885V380M315 520V575H370M830 575H885V520" stroke="#a0c4de" stroke-width="5" fill="none" stroke-linecap="round"/>
  <g fill="#72869a" opacity=".4"><circle cx="575" cy="405" r="48"/><path d="M490 535Q490 470 575 470T660 535Z"/></g>
  <rect x="475" y="338" width="200" height="220" rx="18" fill="none" stroke="#94bbe0" stroke-width="3" stroke-dasharray="6 8"/>
  <path d="M720 405H842M720 440H817M720 475H837" stroke="#a6bbcf" stroke-width="7" stroke-linecap="round" opacity=".65"/>
  ${pill('VISUAL INPUT, LOCAL CONTEXT', 675, '#8ab9df')}`);

const culturalCover = scene('CULTURAL AI', 'CHARACTER / MEANING / DESIGN', '#d9b9a0', `
  <ellipse cx="600" cy="753" rx="235" ry="42" fill="#cdaa8c" opacity=".25" filter="url(#glow)"/>
  <g filter="url(#shadow)"><rect x="442" y="318" width="330" height="380" rx="28" fill="url(#glass)" stroke="#bba390" transform="rotate(12 600 500)"/>
  <rect x="412" y="292" width="350" height="395" rx="28" fill="url(#silver)" transform="rotate(-9 590 490)"/></g>
  <g transform="rotate(-9 590 490)" text-anchor="middle"><text x="590" y="551" fill="#39343a" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="190" font-weight="700">纹</text><path d="M479 611H701" stroke="#918390" stroke-width="3"/></g>
  <ellipse cx="600" cy="540" rx="300" ry="145" fill="none" stroke="url(#accent)" stroke-width="3" transform="rotate(-30 600 540)" opacity=".55"/>
  ${pill('MEANING → IMAGE → DESIGN', 830, '#d9b9a0')}`, 1000);
const culturalFlow = workflow('FROM CHARACTER TO CANVAS', 'CULTURAL MEANING / VISUAL CREATION', '#d9b9a0', ['CHARACTER ANALYSIS', 'TEXT TO IMAGE', 'POSTER + PRODUCT DESIGN']);
const culturalPoster = scene('LET MEANING TAKE SHAPE', 'CULTURAL DESIGN / CONCEPT', '#d9b9a0', `
  <g filter="url(#shadow)"><rect x="260" y="295" width="230" height="335" rx="20" fill="url(#glass)" stroke="#a98d80" transform="rotate(-12 375 460)"/>
  <rect x="710" y="295" width="230" height="335" rx="20" fill="url(#glass)" stroke="#a98d80" transform="rotate(12 825 460)"/>
  <rect x="475" y="260" width="250" height="365" rx="22" fill="url(#silver)"/></g>
  <g text-anchor="middle" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="104"><text x="372" y="496" fill="#d7e2ea">文</text><text x="600" y="456" fill="#4c3e42" font-size="150">纹</text><text x="826" y="496" fill="#d7e2ea">象</text></g>
  <path d="M519 535H681M519 566H642" stroke="#9c8b91" stroke-width="6" stroke-linecap="round"/>
  ${pill('A VISUAL LANGUAGE OF CULTURE', 665, '#d9b9a0')}`);

const files = {
  'wardrobe-cover': wardrobeCover, 'wardrobe-flow': wardrobeFlow, 'wardrobe-library': wardrobeLibrary,
  'modeling-cover': modelingCover, 'modeling-flow': modelingFlow, 'modeling-data': modelingData,
  'quartus-cover': quartusCover, 'quartus-flow': quartusFlow, 'quartus-wave': quartusWave,
  'talk-kids-cover': talkKidsCover, 'talk-kids-flow': talkKidsFlow, 'talk-kids-dialogue': talkKidsDialogue,
  'contract-ai-cover': contractCover, 'contract-ai-flow': contractFlow, 'contract-ai-review': contractReview,
  'coolearn-cover': coolearnCover, 'coolearn-flow': coolearnFlow, 'coolearn-map': coolearnMap,
  'ai-ppt-cover': pptCover, 'ai-ppt-flow': pptFlow, 'ai-ppt-slides': pptSlides,
  'study-monitor-cover': studyCover, 'study-monitor-flow': studyFlow, 'study-monitor-view': studyView,
  'cultural-cover': culturalCover, 'cultural-flow': culturalFlow, 'cultural-poster': culturalPoster,
};
await Promise.all(Object.entries(files).map(([name, svg]) => writeFile(path.join(directory, `${name}.svg`), `${svg}\n`)));
process.stdout.write(`Created ${Object.keys(files).length} project visuals.\n`);
