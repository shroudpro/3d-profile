import { useEffect, useMemo, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

interface FadeInProps extends PropsWithChildren {
  as?: 'div' | 'h1' | 'h2' | 'p' | 'article';
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}

export function FadeIn({ as = 'div', children, className, delay = 0, duration = 0.7, x = 0, y = 30 }: FadeInProps) {
  const reducedMotion = useReducedMotion();
  const Element = useMemo(() => motion.create(as), [as]);
  return (
    <Element
      className={className}
      initial={{ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : x, y: reducedMotion ? 0 : y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay: reducedMotion ? 0 : delay, duration: reducedMotion ? 0 : duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Element>
  );
}

interface MagnetProps extends PropsWithChildren {
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}

export function Magnet({ children, padding = 150, strength = 3, activeTransition = 'transform 0.3s ease-out', inactiveTransition = 'transform 0.6s ease-in-out' }: MagnetProps) {
  const boundsRef = useRef<HTMLDivElement>(null);
  const movingRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let frame = 0;
    const reset = () => {
      if (!movingRef.current) return;
      movingRef.current.style.transition = inactiveTransition;
      movingRef.current.style.transform = 'translate3d(0, 0, 0)';
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!boundsRef.current || !movingRef.current) return;
        const box = boundsRef.current.getBoundingClientRect();
        const x = event.clientX - box.left - box.width / 2;
        const y = event.clientY - box.top - box.height / 2;
        const active = Math.abs(x) < box.width / 2 + padding && Math.abs(y) < box.height / 2 + padding;
        movingRef.current.style.transition = active ? activeTransition : inactiveTransition;
        movingRef.current.style.transform = active ? `translate3d(${x / strength}px, ${y / strength}px, 0)` : 'translate3d(0, 0, 0)';
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', reset);
      reset();
    };
  }, [padding, strength, activeTransition, inactiveTransition, reducedMotion]);

  return <div ref={boundsRef}><div ref={movingRef} className="magnet-content">{children}</div></div>;
}

function Character({ character, index, total, progress }: { character: string; index: number; total: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [index / total, (index + 1) / total], [0.2, 1]);
  const reducedMotion = useReducedMotion();
  return (
    <span className="reveal-character">
      <span className="invisible">{character}</span>
      <motion.span className="absolute inset-0" style={{ opacity: reducedMotion ? 1 : opacity }}>{character}</motion.span>
    </span>
  );
}

export function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  // Segment Chinese and Latin text without forcing a whole Chinese sentence onto one line.
  const words = Array.from(new Intl.Segmenter('zh-CN', { granularity: 'word' }).segment(text), (part) => part.segment);
  const totalCharacters = Array.from(text).length;
  let characterIndex = 0;
  return (
    <p ref={ref} className="about-copy" aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => {
          const start = characterIndex;
          characterIndex += Array.from(word).length;
          if (/^\s+$/.test(word)) return <span key={wordIndex}>{word}</span>;
          return <span className="inline-block" key={wordIndex}>{Array.from(word).map((character, index) => <Character key={index} character={character} index={start + index} total={totalCharacters} progress={scrollYProgress} />)}</span>;
        })}
      </span>
    </p>
  );
}
