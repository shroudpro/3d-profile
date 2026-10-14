export const aboutText = "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

export const services = [
  { name: '3D Modeling', description: 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.' },
  { name: 'Rendering', description: 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.' },
  { name: 'Motion Design', description: 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.' },
  { name: 'Branding', description: 'Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.' },
  { name: 'Web Design', description: 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.' },
] as const;

export interface Project {
  number: string;
  name: string;
  category: 'Client' | 'Personal';
  images: [string, string, string];
  imageDescriptions: [string, string, string];
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    number: '01', name: 'Nextlevel Studio', category: 'Client',
    images: ['/images/project-1-1.webp', '/images/project-1-2.webp', '/images/project-1-3.webp'],
    imageDescriptions: ['Sculptural flowers in a lush miniature garden', 'A richly detailed garden of colorful flowers', 'Sunlit flowers and floating particles in an enchanted forest'],
  },
  {
    number: '02', name: 'Aura Brand Identity', category: 'Personal',
    images: ['/images/project-2-1.webp', '/images/project-2-2.webp', '/images/project-2-3.webp'],
    imageDescriptions: ['Lavender fields beneath a soft evening sky', 'A dreamlike landscape in shades of violet', 'Purple mountains and lavender under a pastel sky'],
  },
  {
    number: '03', name: 'Solaris Digital', category: 'Client',
    images: ['/images/project-3-1.webp', '/images/project-3-2.webp', '/images/project-3-3.webp'],
    imageDescriptions: ['Golden rolling hills and a distant mountain range', 'A sunlit meadow of yellow flowers', 'A warm golden landscape at sunset'],
  },
];

const previewNames = ['Space Voyage', 'Codenest', 'Vex Ventures', 'Stellar AI v2', 'Asme', 'Transform Data', 'Vitara', 'Terra', 'Skyelite', 'Aethera', 'Designpro', 'Stellar AI', 'Xportfolio', 'Orbit Web3', 'Nexora', 'EVR Ventures', 'Planet Orbit', 'New Era', 'Wealth', 'Luminex', 'Celestia'];
export const previews = previewNames.map((name, index) => ({
  // The supplied Celestia URL returns 404. Preserve the 21-tile rhythm using
  // another supplied preview, identified by its actual name.
  name: index === 20 ? 'Luminex' : name,
  src: `/images/marquee-${String(index === 20 ? 20 : index + 1).padStart(2, '0')}.gif`,
}));
