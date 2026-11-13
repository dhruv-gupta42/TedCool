'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger, EASE, DURATION } from '@/app/lib/animations/gsapConfig';
import { getFeaturedProjects, type Project } from '@/app/data/projects';
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import Button from '@/app/components/common/Button';

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const projects = getFeaturedProjects();
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP pinned horizontal scroll for desktop
  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const container = containerRef.current;
    if (!section || !track || !container) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        section.querySelectorAll('.fw-header-anim'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION.normal,
          stagger: 0.1,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Total track scroll distance
      const totalWidth = track.scrollWidth - container.offsetWidth;

      // Snappy scroll distance: ~0.42x of totalWidth for fast, responsive browsing
      const pinDistance = totalWidth * 0.42;

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${pinDistance}`,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          x: -totalWidth,
          ease: 'none',
        }),
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (projects.length - 1));
          setCurrentIndex(Math.min(Math.max(idx, 0), projects.length - 1));
        },
      });

      scrollTriggerRef.current = st;
    }, section);

    return () => ctx.revert();
  }, [isMobile, projects.length]);

  // Navigate next / prev project
  const navigateProject = useCallback(
    (direction: 'prev' | 'next') => {
      const nextIdx =
        direction === 'next'
          ? Math.min(currentIndex + 1, projects.length - 1)
          : Math.max(currentIndex - 1, 0);

      if (isMobile && trackRef.current) {
        const cardWidth = trackRef.current.querySelector('.project-card')?.clientWidth || 360;
        const gap = 24;
        const scrollAmount = direction === 'next' ? cardWidth + gap : -(cardWidth + gap);
        trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setCurrentIndex(nextIdx);
      } else if (scrollTriggerRef.current) {
        const st = scrollTriggerRef.current;
        const targetProgress = nextIdx / (projects.length - 1);
        const targetScroll = st.start + targetProgress * (st.end - st.start);
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    },
    [currentIndex, isMobile, projects.length]
  );

  return (
    <section
      ref={sectionRef}
      className="relative md:h-screen md:min-h-[720px] flex flex-col justify-between overflow-hidden bg-background py-16 md:py-0"
    >
      {/* Dynamic ambient glow behind the showcase */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[500px] rounded-full bg-brand/[0.04] blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-brand/[0.03] blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* TOP: Header (Pinned Viewport Top) */}
      <div className="px-6 md:px-12 pt-8 md:pt-16 pb-4 relative z-10 flex-shrink-0">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="fw-header-anim text-3xl md:text-5xl font-heading font-bold text-text-primary tracking-tight">
              SELECTED WORK
            </h2>
          </div>

          {/* Navigation Controls on Top-Right */}
          <div className="fw-header-anim flex items-center gap-3">
            <button
              onClick={() => navigateProject('prev')}
              disabled={currentIndex === 0}
              className={`p-2.5 rounded-full border border-white/10 transition-all duration-300 ${
                currentIndex === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:border-brand hover:bg-brand/10 text-white'
              }`}
              aria-label="Previous project"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateProject('next')}
              disabled={currentIndex === projects.length - 1}
              className={`p-2.5 rounded-full border border-white/10 transition-all duration-300 ${
                currentIndex === projects.length - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:border-brand hover:bg-brand/10 text-white'
              }`}
              aria-label="Next project"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CENTER: Full-screen horizontal gallery track */}
      <div ref={containerRef} className="flex-1 flex items-center overflow-hidden my-auto w-full relative z-10">
        <div
          ref={trackRef}
          className={`flex items-center gap-6 md:gap-8 h-full py-2 ${
            isMobile
              ? 'overflow-x-auto px-6 snap-x snap-mandatory'
              : 'px-14'
          }`}
          style={isMobile ? { scrollbarWidth: 'none' } : undefined}
          onScroll={
            isMobile
              ? (e) => {
                  const el = e.currentTarget;
                  const card = el.querySelector('.project-card');
                  const cardWidth = card?.clientWidth || 360;
                  const idx = Math.round(el.scrollLeft / (cardWidth + 24));
                  setCurrentIndex(Math.min(Math.max(idx, 0), projects.length - 1));
                }
              : undefined
          }
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isActive={currentIndex === i}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      {/* BOTTOM: Status bar & View All CTA */}
      <div className="px-6 md:px-12 pb-5 md:pb-6 pt-3 relative z-10 flex-shrink-0 border-t border-white/5">
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between">
          {/* Progress bar */}
          <div className="flex items-center gap-4">
            <div className="w-32 md:w-56 h-[3px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand to-rose-500 rounded-full transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
              />
            </div>
            <span className="text-xs uppercase tracking-widest text-text-muted font-heading hidden sm:inline">
              Swipe or Scroll to Explore
            </span>
          </div>

          {/* View all work link */}
          <Link
            href="/work"
            className="group flex items-center gap-2 text-xs md:text-sm font-heading uppercase tracking-[0.2em] text-text-primary hover:text-brand transition-colors duration-300"
          >
            <span>View All Work</span>
            <ArrowUpRight className="w-4 h-4 text-brand group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isActive,
  isMobile,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  isMobile: boolean;
}) {
  return (
    <Link
      href="/work"
      className={`project-card group flex-shrink-0 block relative cursor-pointer select-none rounded-md overflow-hidden border transition-all duration-500 ${
        isMobile
          ? 'w-[88vw] snap-center h-[58vh]'
          : 'w-[75vw] md:w-[62vw] lg:w-[58vw] max-w-[1050px] h-[58vh] md:h-[65vh] lg:h-[68vh] min-h-[480px] max-h-[720px]'
      } ${
        isActive
          ? 'border-brand/40 shadow-[0_0_40px_rgba(200,0,0,0.18)]'
          : 'border-white/10 hover:border-brand/30'
      }`}
    >
      {/* Background artwork & gradient mood */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.accentGradient} transition-transform duration-700 group-hover:scale-105`}
      />

      {/* Subtle texture grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Atmospheric light ray & vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand/20 transition-all duration-700" />

      {/* TOP CARD CONTENT */}
      <div className="relative z-20 p-6 md:p-10 flex items-start justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-black/60 border border-brand/40 text-xs uppercase tracking-wider text-white font-heading font-medium backdrop-blur-md">
            {project.category}
          </span>
          <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-text-secondary font-heading">
            {project.client}
          </span>
        </div>

        {/* Metric badge */}
        <div className="text-right bg-black/50 border border-white/10 px-4 py-2 rounded-sm backdrop-blur-md">
          <div className="text-lg md:text-xl font-heading font-bold text-brand leading-none">
            {project.metric}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-text-muted font-heading mt-0.5">
            {project.metricLabel}
          </div>
        </div>
      </div>

      {/* BOTTOM CARD CONTENT */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-text-muted font-heading block mb-2">
              {project.year || '2024'} Case Study
            </span>
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight group-hover:text-brand transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm md:text-base text-text-secondary mt-3 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Action pill */}
          <div className="flex-shrink-0">
            <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-brand text-white font-heading text-xs uppercase tracking-[0.2em] font-medium group-hover:bg-brand-light transition-all duration-300 shadow-[0_0_20px_rgba(200,0,0,0.3)] group-hover:shadow-[0_0_30px_rgba(200,0,0,0.6)]">
              <span>View Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
