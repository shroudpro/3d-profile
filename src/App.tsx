import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { aboutText, featuredProjects, previews, profile, projects, services } from './data';
import type { Project } from './data';
import { AnimatedText, FadeIn, Magnet } from './components/Effects';
import { PortfolioDialog } from './components/PortfolioDialog';
import type { DialogState } from './components/PortfolioDialog';
import { PortfolioNav } from './components/PortfolioNav';
import { ProjectStack } from './components/ProjectStack';

function ContactButton({ onClick }: { onClick: () => void }) {
  return <button type="button" onClick={onClick} className="contact-button" aria-haspopup="dialog">联系我</button>;
}

function HeroSection({ onContact }: { onContact: () => void }) {
  return (
    <section id="home" className="hero-section">
      <PortfolioNav onContact={onContact} />
      <div className="hero-heading-wrap">
        <FadeIn as="h1" className="hero-heading hero-title" delay={0.15} y={40}>{profile.headline}</FadeIn>
      </div>
      <div className="hero-portrait">
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3}>
            <img src="/images/portrait-smile.png" alt="Shroud 网站的微笑 3D 角色主视觉" width={1205} height={1305} draggable={false} />
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

function ProjectsSection({ onProject }: { onProject: (project: Project) => void }) {
  return (
    <section id="projects" className="projects-section">
      <FadeIn as="h2" className="hero-heading section-heading projects-heading" y={40}>Projects</FadeIn>
      <ProjectStack projects={featuredProjects} onProject={onProject} />
    </section>
  );
}

function WorksPage({ onContact, onProject }: { onContact: () => void; onProject: (project: Project) => void }) {
  // Limit each stack to the homepage's three-card rhythm so sticky offsets stay bounded.
  const groups = Array.from({ length: Math.ceil(projects.length / 3) }, (_, index) => projects.slice(index * 3, index * 3 + 3));
  return (
    <>
      <header className="works-header">
        <PortfolioNav worksPage onContact={onContact} />
        <div className="works-intro">
          <FadeIn as="p" className="works-eyebrow" delay={0.1} y={20}>SHROUD / PORTFOLIO</FadeIn>
          <FadeIn as="h1" className="hero-heading section-heading works-title" delay={0.15} y={40}>All Works</FadeIn>
          <FadeIn as="p" className="works-description" delay={0.3} y={20}>{String(projects.length).padStart(2, '0')} 项作品 · 从 AI 应用到本地工具，从工作流到创意表达。</FadeIn>
          <FadeIn delay={0.4} y={20}><a className="live-project-button back-home-link" href="/">↖ 返回首页</a></FadeIn>
        </div>
      </header>
      <section id="works-list" className="projects-section all-works-section" aria-label="所有作品">
        <div className="works-stacks">{groups.map((group) => <ProjectStack key={group[0].id} projects={group} onProject={onProject} />)}</div>
        <div className="works-footer"><a className="live-project-button back-home-link" href="/">↖ 返回首页</a><ContactButton onClick={onContact} /></div>
      </section>
    </>
  );
}

export default function App() {
  const [dialog, setDialog] = useState<DialogState>(null);
  const onContact = () => setDialog({ type: 'contact' });
  const onProject = (project: Project) => setDialog({ type: 'project', project });
  const worksPage = ['/works', '/works/', '/works/index.html'].includes(window.location.pathname);
  return (
    <>
      <a className="skip-link" href={worksPage ? '#works-list' : '#about'}>跳转至正文</a>
      <main className="page-wrapper">
        {worksPage ? <WorksPage onContact={onContact} onProject={onProject} /> : <>
        <HeroSection onContact={onContact} />
        <MarqueeSection />
        <AboutSection onContact={onContact} />
        <ServicesSection />
        <ProjectsSection onProject={onProject} />
        </>}
      </main>
      <PortfolioDialog state={dialog} onClose={() => setDialog(null)} />
    </>
  );
}
