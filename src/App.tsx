import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { aboutText, previews, profile, projects, services } from './data';
import type { Project } from './data';
import { AnimatedText, FadeIn, Magnet } from './components/Effects';
import { PortfolioDialog } from './components/PortfolioDialog';
import type { DialogState } from './components/PortfolioDialog';

function ContactButton({ onClick }: { onClick: () => void }) {
  return <button type="button" onClick={onClick} className="contact-button" aria-haspopup="dialog">联系我</button>;
}

function HeroSection({ onContact }: { onContact: () => void }) {
  return (
    <section id="home" className="hero-section">
      <FadeIn delay={0} y={-20}>
        <nav className="hero-nav" aria-label="主导航">
          <a href="#about">关于我</a>
          <a href="#services">技术专长</a>
          <a href="#projects">精选作品</a>
          <button type="button" onClick={onContact} aria-haspopup="dialog">联系</button>
        </nav>
      </FadeIn>
      <div className="hero-heading-wrap">
        <FadeIn as="h1" className="hero-heading hero-title" delay={0.15} y={40}>{profile.headline}</FadeIn>
      </div>
      <div className="hero-portrait">
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3}>
            <img src="/images/portrait.png" alt="Shroud 网站的 3D 角色主视觉" width={1450} height={1570} draggable={false} />
          </Magnet>
        </FadeIn>
      </div>
      <div className="hero-bottom">
        <FadeIn as="p" className="hero-description" delay={0.35} y={20}>{profile.tagline}</FadeIn>
        <FadeIn delay={0.5} y={20}><ContactButton onClick={onContact} /></FadeIn>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const rows = [previews.slice(0, 11), previews.slice(11)];

  useEffect(() => {
    let frame = 0;
    let sectionTop = 0;
    const update = () => {
      frame = 0;
      const offset = reducedMotion ? 0 : (window.scrollY - sectionTop + window.innerHeight) * 0.3 - 200;
      // Start on the middle copy so rightward scrolling never exposes an empty edge.
      if (firstRef.current) firstRef.current.style.transform = `translate3d(${-rows[0].length * 432 + offset}px, 0, 0)`;
      if (secondRef.current) secondRef.current.style.transform = `translate3d(${-rows[1].length * 432 - offset}px, 0, 0)`;
    };
    const measure = () => {
      sectionTop = (sectionRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
      update();
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, [reducedMotion]);

  return (
    <section id="showreel" ref={sectionRef} className="marquee-section" aria-label="作品与工作流视觉展示">
      {rows.map((row, rowIndex) => <div key={rowIndex} ref={rowIndex === 0 ? firstRef : secondRef} className="marquee-track">{Array.from({ length: 3 }, (_, copy) => row.map(({ src, description }, tileIndex) => <img key={`${copy}-${tileIndex}`} className="marquee-tile" src={src} alt={copy === 1 ? description : ''} width={420} height={270} loading="lazy" decoding="async" draggable={false} />))}</div>)}
    </section>
  );
}

function AboutSection({ onContact }: { onContact: () => void }) {
  const ornaments = [
    { src: 'moon.png', position: 'ornament-moon', delay: 0.1, x: -80 },
    { src: 'sculpture.png', position: 'ornament-smile', delay: 0.25, x: -80 },
    { src: 'lego.png', position: 'ornament-lego', delay: 0.15, x: 80 },
    { src: 'rings.png', position: 'ornament-arrow', delay: 0.3, x: 80 },
  ];
  return (
    <section id="about" className="about-section">
      {ornaments.map(({ src, position, delay, x }) => <div key={src} className={`about-ornament ${position}`} aria-hidden="true"><FadeIn delay={delay} x={x} y={0} duration={0.9}><img src={`/images/${src}`} alt="" loading="lazy" draggable={false} /></FadeIn></div>)}
      <div className="about-content">
        <FadeIn as="h2" className="hero-heading section-heading" y={40}>About me</FadeIn>
        <AnimatedText text={aboutText} />
        <FadeIn className="about-contact"><ContactButton onClick={onContact} /></FadeIn>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="services-section">
      <FadeIn as="h2" className="section-heading services-heading" y={40}>Expertise</FadeIn>
      <div className="service-list">
        {services.map(({ name, description }, index) => <FadeIn key={name} className="service-row" delay={index * 0.1}>
          <span className="service-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div className="service-copy"><h3>{name}</h3><p>{description}</p></div>
        </FadeIn>)}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, progress, onProject }: { project: Project; index: number; progress: MotionValue<number>; onProject: (project: Project) => void }) {
  const reducedMotion = useReducedMotion();
  const targetScale = 1 - (projects.length - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / projects.length, 1], [1, targetScale]);
  return (
    <div className="project-slot" style={{ '--stack-offset': `${index * 28}px` } as CSSProperties}>
      <motion.article className="project-card" style={{ scale: reducedMotion ? 1 : scale }} aria-labelledby={`project-${project.number}`}>
        <div className="project-card-header">
          <span className="project-number" aria-hidden="true">{project.number}</span>
          <div className="project-name"><p>{project.category}</p><h3 id={`project-${project.number}`}>{project.name}</h3></div>
          <button type="button" className="live-project-button" onClick={() => onProject(project)} aria-haspopup="dialog" aria-label={`查看项目：${project.name}`}>查看项目</button>
        </div>
        <div className="project-images">
          <div className="project-images-left">
            <img src={project.images[0]} alt={project.imageDescriptions[0]} loading="lazy" width={1280} height={720} />
            <img src={project.images[1]} alt={project.imageDescriptions[1]} loading="lazy" width={1280} height={720} />
          </div>
          <img className="project-image-main" src={project.images[2]} alt={project.imageDescriptions[2]} loading="lazy" width={1280} height={720} />
        </div>
      </motion.article>
    </div>
  );
}

function ProjectsSection({ onProject }: { onProject: (project: Project) => void }) {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });
  return (
    <section id="projects" className="projects-section">
      <FadeIn as="h2" className="hero-heading section-heading projects-heading" y={40}>Projects</FadeIn>
      <div className="project-stack" ref={stackRef}>{projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} progress={scrollYProgress} onProject={onProject} />)}</div>
    </section>
  );
}

export default function App() {
  const [dialog, setDialog] = useState<DialogState>(null);
  const onContact = () => setDialog({ type: 'contact' });
  return (
    <>
      <a className="skip-link" href="#about">跳转至正文</a>
      <main className="page-wrapper">
        <HeroSection onContact={onContact} />
        <MarqueeSection />
        <AboutSection onContact={onContact} />
        <ServicesSection />
        <ProjectsSection onProject={(project) => setDialog({ type: 'project', project })} />
      </main>
      <PortfolioDialog state={dialog} onClose={() => setDialog(null)} />
    </>
  );
}
