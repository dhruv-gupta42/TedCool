'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, EASE, DURATION } from '@/app/lib/animations/gsapConfig';
import { projects, type Project } from '@/app/data/projects';
import ProjectVideo from './ProjectVideo';

const layouts = ['full', 'split', 'split', 'full', 'split-reverse', 'split-reverse', 'full', 'split'] as const;
type Layout = typeof layouts[number];

export default function WorkGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const sections = grid.querySelectorAll('.work-section');

      sections.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.work-animate'),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: DURATION.normal,
            stagger: 0.12,
            ease: EASE.smooth,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
            },
          }
        );
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={gridRef} className="space-y-20 md:space-y-28">
      {projects.map((project, i) => {
        const layout = layouts[i % layouts.length];
        return (
          <WorkSection key={project.id} project={project} layout={layout} index={i} />
        );
      })}
    </div>
  );
}

function WorkSection({
  project,
  layout,
  index,
}: {
  project: Project;
  layout: Layout;
  index: number;
}) {
  if (layout === 'full') {
    return (
      <div className="work-section">
        <div className="work-animate">
          <ProjectVideo
            title={project.title}
            category={project.category}
            videoUrl={project.videoUrl || undefined}
            posterImage={project.posterImage}
            aspectRatio="16 / 9"
          />
        </div>
        <div className="work-animate mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary">
              {project.title}
            </h3>
            <span className="text-sm text-text-secondary mt-1 block">
              {project.category}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {project.year && (
              <span className="text-sm text-text-muted font-heading">{project.year}</span>
            )}
          </div>
        </div>
        <p className="work-animate text-text-secondary text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
          {project.description}
        </p>
      </div>
    );
  }

  const isReversed = layout === 'split-reverse';

  return (
    <div className={`work-section grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center`}>
      <div className={isReversed ? 'md:order-2' : ''}>
        <div className="work-animate">
          <ProjectVideo
            title={project.title}
            category={project.category}
            videoUrl={project.videoUrl || undefined}
            posterImage={project.posterImage}
            aspectRatio="4 / 3"
          />
        </div>
      </div>
      <div className={isReversed ? 'md:order-1' : ''}>
        <div className="work-animate">
          <h3 className="text-xl md:text-3xl font-heading font-bold text-text-primary mb-3">
            {project.title}
          </h3>
          <span className="text-sm text-text-muted mb-4 block">
            {project.category} {project.year && `— ${project.year}`}
          </span>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}
