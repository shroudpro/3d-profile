import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type { Project } from '../data';

interface ProjectStackProps {
  projects: Project[];
  onProject: (project: Project) => void;
}

function ProjectCard({ project, index, count, progress, onProject }: {
  project: Project;
  index: number;
  count: number;
  progress: MotionValue<number>;
  onProject: (project: Project) => void;
}) {
  const reducedMotion = useReducedMotion();
  const targetScale = 1 - (count - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / count, 1], [1, targetScale]);
  return (
    <div className="project-slot" style={{ '--stack-offset': `${index * 28}px` } as CSSProperties}>
      <motion.article className="project-card" style={{ scale: reducedMotion ? 1 : scale }} aria-labelledby={`project-${project.id}`}>
        <div className="project-card-header">
          <span className="project-number" aria-hidden="true">{project.number}</span>
          <div className="project-name"><p>{project.category}</p><h3 id={`project-${project.id}`}>{project.name}</h3></div>
          <button type="button" className="live-project-button" onClick={() => onProject(project)} aria-haspopup="dialog" aria-label={`查看项目：${project.name}`}>查看项目</button>
        </div>
        <div className="project-images">
          <div className="project-images-left">
            <img src={project.images[0]} alt={project.imageDescriptions[0]} loading="lazy" width={1200} height={800} />
            <img src={project.images[1]} alt={project.imageDescriptions[1]} loading="lazy" width={1200} height={800} />
          </div>
          <img className="project-image-main" src={project.images[2]} alt={project.imageDescriptions[2]} loading="lazy" width={1200} height={1000} />
        </div>
      </motion.article>
    </div>
  );
}

export function ProjectStack({ projects, onProject }: ProjectStackProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });
  return (
    <div className="project-stack" ref={stackRef}>
      {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} count={projects.length} progress={scrollYProgress} onProject={onProject} />)}
    </div>
  );
}
