'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger, EASE, DURATION } from '@/app/lib/animations/gsapConfig';
import { getFeaturedProjects, type Project } from '@/app/data/projects';
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, Pause } from 'lucide-react';

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
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION.normal,
          stagger: 0.08,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Compute total horizontal scroll distance
      const computeDistance = () => {
        const scrollDist = track.scrollWidth - container.offsetWidth;
        return Math.max(scrollDist, 0);
      };

      const totalWidth = computeDistance();
      // Pinned vertical scroll distance: balanced for smooth, cinematic scrubbing through 8 cards
      const pinDistance = Math.max(Math.round(totalWidth * 0.82), 1300);

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${pinDistance}`,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          x: () => -computeDistance(),
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
        const card = trackRef.current.querySelector('.project-card');
        const cardWidth = card?.clientWidth || 290;
        const gap = 20;
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
      className="relative md:h-screen md:min-h-[760px] lg:min-h-[820px] flex flex-col justify-between overflow-hidden bg-background py-14 md:py-0 border-t border-white/5"
    >
      {/* Ambient background atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-1/4 left-1/3 w-[650px] h-[500px] rounded-full bg-brand/[0.04] blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-brand/[0.03] blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* TOP: Header (Pinned Viewport Top) */}
      <div className="px-6 md:px-12 lg:px-16 pt-7 md:pt-10 lg:pt-12 pb-3 md:pb-4 relative z-10 flex-shrink-0">
        <div className="w-full max-w-[1700px] mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="fw-header-anim flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-xs uppercase tracking-[0.3em] text-text-muted font-mono">
                CINEMATIC 9:16 VERTICAL SHOWCASE
              </span>
            </div>
            <h2 className="fw-header-anim text-3xl sm:text-4xl md:text-5xl font-heading font-black text-text-primary tracking-tight">
              SELECTED WORK
            </h2>
          </div>

          {/* Navigation Controls on Top-Right */}
          <div className="fw-header-anim flex items-center gap-3">
            <button
              onClick={() => navigateProject('prev')}
              disabled={currentIndex === 0}
              className={`p-2.5 sm:p-3 rounded-full border border-white/10 transition-all duration-300 ${
                currentIndex === 0
                  ? 'opacity-25 cursor-not-allowed'
                  : 'hover:border-brand hover:bg-brand/10 text-white cursor-pointer active:scale-95'
              }`}
              aria-label="Previous project"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateProject('next')}
              disabled={currentIndex === projects.length - 1}
              className={`p-2.5 sm:p-3 rounded-full border border-white/10 transition-all duration-300 ${
                currentIndex === projects.length - 1
                  ? 'opacity-25 cursor-not-allowed'
                  : 'hover:border-brand hover:bg-brand/10 text-white cursor-pointer active:scale-95'
              }`}
              aria-label="Next project"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CENTER: Horizontal 9:16 Vertical Video Showcase Track */}
      <div
        ref={containerRef}
        className="flex-1 flex items-center overflow-hidden my-auto w-full relative z-10 py-1 md:py-2"
      >
        <div
          ref={trackRef}
          className={
            isMobile
              ? 'flex items-center gap-5 overflow-x-auto px-6 snap-x snap-mandatory py-2 w-full'
              : 'flex items-center gap-6 lg:gap-8 h-full px-6 md:px-12 lg:px-16'
          }
          style={isMobile ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : undefined}
          onScroll={
            isMobile
              ? (e) => {
                  const el = e.currentTarget;
                  const card = el.querySelector('.project-card');
                  const cardWidth = card?.clientWidth || 290;
                  const gap = 20;
                  const idx = Math.round(el.scrollLeft / (cardWidth + gap));
                  setCurrentIndex(Math.min(Math.max(idx, 0), projects.length - 1));
                }
              : undefined
          }
        >
          {projects.map((project, i) => (
            <VerticalVideoCard
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
              isActive={currentIndex === i}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      {/* BOTTOM: Status Bar & View All CTA */}
      <div className="px-6 md:px-12 lg:px-16 pb-5 md:pb-6 pt-3.5 relative z-10 flex-shrink-0 border-t border-white/5">
        <div className="w-full max-w-[1700px] mx-auto flex items-center justify-between gap-4">
          {/* Progress bar and counter */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-28 sm:w-44 md:w-56 h-[2.5px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand to-rose-500 rounded-full transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="text-brand font-bold">
                {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1}
              </span>
              <span className="text-text-muted">/</span>
              <span className="text-text-muted">
                {projects.length < 10 ? `0${projects.length}` : projects.length}
              </span>
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-text-muted font-heading hidden sm:inline">
              Swipe or Scroll to Explore
            </span>
          </div>

          {/* View all work link */}
          <Link
            href="/work"
            className="group flex items-center gap-2 text-xs md:text-sm font-heading uppercase tracking-[0.2em] text-text-primary hover:text-brand transition-colors duration-300"
          >
            <span>View All Work</span>
            <ArrowUpRight className="w-4 h-4 text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function VerticalVideoCard({
  project,
  index,
  total,
  isActive,
  isMobile,
}: {
  project: Project;
  index: number;
  total: number;
  isActive: boolean;
  isMobile: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasVideo = Boolean(project.videoUrl && project.videoUrl.trim() !== '');

  const handleMouseEnter = () => {
    if (hasVideo && videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (hasVideo && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <Link
      href="/work"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ aspectRatio: '9 / 16' }}
      className={`project-card group flex-shrink-0 block relative select-none rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer ${
        isMobile
          ? 'h-[500px] sm:h-[540px] max-h-[64vh] snap-center'
          : 'h-[520px] md:h-[580px] lg:h-[620px] xl:h-[650px] max-h-[68vh]'
      } ${
        isActive
          ? 'border-brand/50 shadow-[0_0_40px_rgba(229,9,20,0.22)]'
          : 'border-white/10 hover:border-brand/40 hover:shadow-[0_0_35px_rgba(229,9,20,0.18)]'
      }`}
    >
      {/* Base Obsidian Backdrop */}
      <div className="absolute inset-0 bg-[#0A0A0C]" />

      {/* Dynamic Project Gradient Aura */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${project.accentGradient} opacity-35 group-hover:opacity-65 transition-all duration-700 group-hover:scale-105 pointer-events-none`}
      />

      {/* Atmospheric center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand/15 rounded-full blur-[70px] pointer-events-none group-hover:bg-brand/25 group-hover:scale-125 transition-all duration-700" />

      {/* Fine Film Grain / Viewfinder Texture Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* ACTUAL VIDEO CONTAINER (when videoUrl is provided) */}
      {hasVideo ? (
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            src={project.videoUrl}
            poster={project.posterImage || project.coverImage}
            playsInline
            muted
            loop
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onEnded={() => setIsPlaying(false)}
          />

          {/* Centered video status indicator */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
              isPlaying ? 'opacity-0 group-hover:opacity-80' : 'opacity-100'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white">
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5 fill-white" />
              )}
            </div>
          </div>
        </div>
      ) : (
        /* POLISHED TEMPORARY 9:16 VERTICAL VIDEO PLACEHOLDER */
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none select-none">
          {/* Subtle Viewfinder Framing Crop Marks */}
          <div className="absolute top-3.5 left-3.5 w-3 h-3 border-t border-l border-white/20 group-hover:border-brand/60 transition-colors duration-300" />
          <div className="absolute top-3.5 right-3.5 w-3 h-3 border-t border-r border-white/20 group-hover:border-brand/60 transition-colors duration-300" />
          <div className="absolute bottom-32 left-3.5 w-3 h-3 border-b border-l border-white/20 group-hover:border-brand/60 transition-colors duration-300" />
          <div className="absolute bottom-32 right-3.5 w-3 h-3 border-b border-r border-white/20 group-hover:border-brand/60 transition-colors duration-300" />

          {/* Centered Play Button & Editorial Status */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
            {/* Play Button Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:scale-110 group-hover:border-brand group-hover:bg-brand/20 group-hover:text-brand transition-all duration-500 shadow-2xl">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5 fill-white/20 group-hover:fill-brand/40 text-current transition-colors" />
            </div>

            {/* Video Coming Soon Pill */}
            <div className="mt-4 flex flex-col items-center gap-1.5 text-center">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-[9px] font-mono uppercase tracking-[0.22em] text-white/70 group-hover:text-white group-hover:border-brand/40 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                <span>VIDEO COMING SOON</span>
              </div>
              <span className="text-[9px] font-mono text-text-muted tracking-[0.25em] uppercase">
                9:16 VERTICAL FORMAT
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TOP METADATA ROW */}
      <div className="relative z-20 p-3.5 sm:p-5 flex items-start justify-between gap-1.5">
        {/* Category Pill */}
        <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/80 border border-white/15 backdrop-blur-md text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-white shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
          <span className="truncate max-w-[105px] sm:max-w-none">{project.category}</span>
        </span>

        {/* Metric Badge */}
        <div className="text-right px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-black/80 border border-white/15 backdrop-blur-md shadow-lg flex-shrink-0">
          <div className="text-[11px] sm:text-sm font-heading font-black text-brand leading-none">
            {project.metric}
          </div>
          <div className="text-[7.5px] sm:text-[9px] font-mono uppercase tracking-widest text-text-muted mt-0.5 truncate max-w-[85px] sm:max-w-none">
            {project.metricLabel}
          </div>
        </div>
      </div>

      {/* BOTTOM METADATA & CTA OVERLAY (Cinematic High-Contrast Gradient) */}
      <div className="absolute inset-x-0 bottom-0 pt-20 sm:pt-28 pb-4 sm:pb-6 px-4 sm:px-6 z-20 bg-gradient-to-t from-black via-black/90 via-55% to-transparent flex flex-col justify-end">
        {/* Client & Year meta */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">
          <span className="text-brand font-bold">{project.year || '2024'}</span>
          <span className="text-white/20">//</span>
          <span className="text-white/80 font-medium truncate">{project.client}</span>
        </div>

        {/* Project Title */}
        <h3 className="text-base sm:text-xl font-heading font-black text-white tracking-tight leading-snug group-hover:text-brand transition-colors duration-300 line-clamp-2">
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-[11px] sm:text-xs text-text-secondary mt-1 sm:mt-1.5 line-clamp-2 leading-relaxed font-sans">
          {project.description}
        </p>

        {/* Bottom CTA Row */}
        <div className="mt-2.5 sm:mt-3.5 pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-white/90 group-hover:text-brand transition-colors flex items-center gap-1.5 font-medium">
            <span>View Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </span>

          <span className="text-[9px] sm:text-[10px] font-mono text-text-muted tracking-wider">
            {index + 1 < 10 ? `0${index + 1}` : index + 1} //{' '}
            {total < 10 ? `0${total}` : total}
          </span>
        </div>
      </div>
    </Link>
  );
}
