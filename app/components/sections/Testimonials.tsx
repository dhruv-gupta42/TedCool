'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap, EASE, DURATION } from '@/app/lib/animations/gsapConfig';
import { testimonials, Testimonial } from '@/app/data/testimonials';
import { marqueeSelectedBrands } from './BrandLogos';

/**
 * Editorial Portrait Card
 * Displays client photography when provided, or a high-fashion,
 * neutral editorial contact-sheet placeholder with studio metadata.
 */
interface EditorialPortraitProps {
  testimonial: Testimonial;
  index: number;
  total: number;
}

function EditorialPortrait({ testimonial, index, total }: EditorialPortraitProps) {
  const initials = testimonial.author
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="relative w-full h-full bg-[#111113] border border-white/20 select-none overflow-hidden group">
      {testimonial.portrait ? (
        <img
          src={testimonial.portrait}
          alt={testimonial.author}
          className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      ) : (
        /* Neutral Editorial Studio Placeholder */
        <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 md:p-6 bg-gradient-to-br from-[#1a1a1e] via-[#121215] to-[#0a0a0c] relative">
          {/* Subtle Ambient Studio Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand/10 rounded-full blur-2xl pointer-events-none" />

          {/* Minimalist Editorial Corner Crop Marks */}
          <span className="absolute top-2 left-2 text-[10px] font-mono text-white/30 leading-none">
            +
          </span>
          <span className="absolute top-2 right-2 text-[10px] font-mono text-white/30 leading-none">
            +
          </span>
          <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white/30 leading-none">
            +
          </span>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono text-white/30 leading-none">
            +
          </span>

          {/* Top Metadata */}
          <div className="relative z-10 flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase border-b border-white/10 pb-2">
            <span>STUDIO // ARCHIVE</span>
            <span>
              0{index + 1} / 0{total}
            </span>
          </div>

          {/* Center Graphic: Architectural Monogram & Reticle */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4">
            <div className="relative flex items-center justify-center">
              {/* Monoline Camera Target Circle */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border border-white/10 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-white/5" />
              </div>

              {/* Large Editorial Monogram */}
              <span className="absolute font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white/90 tracking-widest">
                {initials}
              </span>
            </div>

            <span className="mt-3 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
              {testimonial.service}
            </span>
          </div>

          {/* Bottom Metadata */}
          <div className="relative z-10 pt-2 border-t border-white/10 flex items-end justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
            <div>
              <div className="text-white/80 font-bold">{testimonial.company}</div>
              <div className="text-white/40 text-[8px] mt-0.5">PORTRAIT // 4:5</div>
            </div>
            <div className="w-4 h-[2px] bg-brand" />
          </div>
        </div>
      )}

      {/* Very subtle red edge highlight on bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
    </div>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const quoteContainerRef = useRef<HTMLDivElement>(null);
  const portraitContainerRef = useRef<HTMLDivElement>(null);

  const activeTestimonial = testimonials[activeIndex];
  const total = testimonials.length;

  // Change testimonial with refined GSAP transitions
  const goToTestimonial = useCallback(
    (newIndex: number) => {
      if (newIndex === activeIndex) return;

      const quoteEl = quoteContainerRef.current;
      const portraitEl = portraitContainerRef.current;

      // Animate out current content
      const tl = gsap.timeline({
        onComplete: () => {
          setActiveIndex(newIndex);
        },
      });

      if (quoteEl) {
        tl.to(quoteEl, {
          y: -10,
          opacity: 0,
          duration: 0.18,
          ease: 'power2.in',
        });
      }

      if (portraitEl) {
        tl.to(
          portraitEl,
          {
            scale: 0.98,
            opacity: 0.75,
            duration: 0.18,
            ease: 'power2.in',
          },
          0
        );
      }
    },
    [activeIndex]
  );

  // Entrance animation when activeIndex updates
  useEffect(() => {
    const quoteEl = quoteContainerRef.current;
    const portraitEl = portraitContainerRef.current;

    if (quoteEl) {
      gsap.fromTo(
        quoteEl,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.42, ease: 'power3.out' }
      );
    }

    if (portraitEl) {
      gsap.fromTo(
        portraitEl,
        { scale: 1.03, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 0.45, ease: 'power3.out' }
      );
    }
  }, [activeIndex]);

  // Keyboard accessibility (ArrowLeft / ArrowRight to cycle brands)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToTestimonial((activeIndex - 1 + total) % total);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToTestimonial((activeIndex + 1) % total);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, total, goToTestimonial]);

  // Section entrance reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.editorial-entrance'),
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION.normal,
          stagger: 0.1,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      role="region"
      aria-label="Client Voices Testimonials"
      className="relative w-full pt-14 sm:pt-16 md:pt-20 pb-8 md:pb-12 bg-[#0a0a0c] text-white border-t border-white/10 overflow-hidden"
    >
      {/* Ambient background atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* ==================================================================== */}
        {/* 1. OVERSIZED TYPOGRAPHIC HEADLINE WITH ASYMMETRICAL PORTRAIT OVERLAP */}
        {/* Composition: "WHAT [PORTRAIT] THEY SAY"                              */}
        {/* ==================================================================== */}
        <div className="editorial-entrance relative w-full">
          {/* Header Row: WHAT [Tilted Portrait] THEY SAY */}
          <div className="flex flex-row items-end justify-start gap-4 sm:gap-6 md:gap-8 lg:gap-10 pb-2 sm:pb-3 overflow-visible">
            {/* Left Headline: WHAT */}
            <div className="flex-shrink-0">
              <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tighter leading-none text-white/95 select-none whitespace-nowrap">
                WHAT
              </h2>
            </div>

            {/* Asymmetrical Tilted Portrait Interruption */}
            {/* Positioned right beside WHAT, straddling and breaking down past the horizontal divider */}
            <div className="relative z-20 flex-shrink-0 -mb-16 sm:-mb-24 md:-mb-32 lg:-mb-40 xl:-mb-44 rotate-[-2.5deg] hover:rotate-0 transition-transform duration-500 ease-out shadow-2xl">
              <div
                ref={portraitContainerRef}
                className="w-[105px] sm:w-[140px] md:w-[170px] lg:w-[220px] xl:w-[240px] aspect-[4/5]"
              >
                <EditorialPortrait
                  testimonial={activeTestimonial}
                  index={activeIndex}
                  total={total}
                />
              </div>
            </div>

            {/* Right Headline: THEY SAY pushed to far right */}
            <div className="ml-auto flex-shrink-0 text-right">
              <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tighter leading-none text-white/95 select-none whitespace-nowrap">
                THEY SAY
              </h2>
            </div>
          </div>

          {/* Thin Horizontal Divider Line (Cut across by the hanging portrait) */}
          <div className="w-full h-px bg-white/15 relative z-10" />
        </div>

        {/* ==================================================================== */}
        {/* 2. TESTIMONIAL CONTENT ROW (BELOW DIVIDER)                            */}
        {/* Left: CLIENT VOICES label (with portrait hanging beside it)           */}
        {/* Right: Monospaced uppercase quote, author info, active brand tag      */}
        {/* ==================================================================== */}
        <div className="editorial-entrance pt-20 sm:pt-26 md:pt-6 lg:pt-8 pb-4 md:pb-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Left Column: Under WHAT (Col 1-5) */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-row md:flex-col items-center md:items-start justify-between gap-4">
            <div>
              <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-neutral-400 font-medium">
                CLIENT VOICES
              </span>
              <div className="hidden md:block mt-2 text-[11px] font-mono text-neutral-500 tracking-widest">
                PARTNER // 0{activeIndex + 1}
              </div>
            </div>

            {/* Counter indicator */}
            <div className="md:hidden font-mono text-xs text-neutral-500 tracking-widest">
              [ 0{activeIndex + 1} / 0{total} ]
            </div>
          </div>

          {/* Right Column: Under THEY SAY — Testimonial Quote & Metadata (Col 6-12) */}
          <div className="md:col-span-7 lg:col-span-7 md:pl-8 lg:pl-6 flex flex-col justify-between min-h-[140px] md:min-h-[160px]">
            {/* Dynamic Quote and Author Info Container */}
            <div ref={quoteContainerRef} aria-live="polite">
              {/* Active Testimonial Quotation (Editorial Grotesk / Monospace Uppercase) */}
              <blockquote className="font-mono text-sm sm:text-base md:text-sm lg:text-base xl:text-lg text-neutral-200 tracking-wide uppercase leading-relaxed max-w-3xl">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>

              {/* Client Info Metadata */}
              <div className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm font-mono tracking-wider">
                  <span className="text-white font-bold tracking-wide">
                    {activeTestimonial.author}
                  </span>
                  <span className="text-neutral-500 hidden sm:inline">•</span>
                  <span className="text-neutral-400">
                    {activeTestimonial.role},{' '}
                    <span className="text-brand font-semibold">{activeTestimonial.company}</span>
                  </span>
                </div>

                {/* Status Indicator & Counter */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 hidden sm:inline">
                    SELECT BRAND BELOW
                  </span>
                  <span className="px-2.5 py-1 bg-white/[0.04] border border-white/10 rounded-sm font-mono text-xs text-white/90 font-bold tracking-widest">
                    0{activeIndex + 1} / 0{total}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 3. INTERACTIVE INFINITE BRAND LOGO MARQUEE                           */}
        {/* Compact, positioned immediately under the quote for 1-screen UX      */}
        {/* ==================================================================== */}
        <div className="editorial-entrance mt-2 md:mt-4 pt-4 md:pt-6 border-t border-white/10">
          {/* Subtle Mono Header with instructions */}
          <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase mb-4 sm:mb-5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              <span>CLICK A BRAND TO VIEW THEIR STORY</span>
            </div>
            <span className="hidden sm:inline text-neutral-500">
              ACTIVE: {activeTestimonial.company.toUpperCase()}
            </span>
          </div>

          {/* Marquee Track with Horizontal Edge Masks */}
          <div
            className="w-full overflow-hidden relative select-none py-2"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
            }}
          >
            {/* The single infinite moving strip */}
            <div className="animate-marquee flex items-center whitespace-nowrap">
              {/* First Set of 6 Selected Brand Logos */}
              <div className="flex items-center gap-14 sm:gap-20 md:gap-24 lg:gap-28 shrink-0 pr-14 sm:pr-20 md:pr-24 lg:pr-28">
                {marqueeSelectedBrands.map((brand, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={`brand-1-${brand.id}`}
                      type="button"
                      onClick={() => goToTestimonial(idx)}
                      aria-label={`Select ${brand.name} testimonial`}
                      className={`group relative flex flex-col items-center justify-center py-2 px-3 transition-all duration-300 cursor-pointer focus:outline-none ${
                        isActive
                          ? 'grayscale-0 opacity-100 scale-110 drop-shadow-[0_0_16px_rgba(255,255,255,0.2)]'
                          : 'grayscale opacity-40 hover:opacity-100 hover:grayscale-0 hover:scale-105'
                      }`}
                    >
                      <div className="h-10 sm:h-12 md:h-14 flex items-center justify-center">
                        {brand.node}
                      </div>

                      {/* Active Red Indicator Underline */}
                      <div
                        className={`h-[2px] transition-all duration-300 rounded-full mt-2.5 ${
                          isActive
                            ? 'w-8 bg-brand'
                            : 'w-0 bg-transparent group-hover:w-4 group-hover:bg-white/40'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Second Duplicate Set for Seamless Continuous Loop */}
              <div className="flex items-center gap-14 sm:gap-20 md:gap-24 lg:gap-28 shrink-0 pr-14 sm:pr-20 md:pr-24 lg:pr-28">
                {marqueeSelectedBrands.map((brand, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={`brand-2-${brand.id}`}
                      type="button"
                      onClick={() => goToTestimonial(idx)}
                      aria-label={`Select ${brand.name} testimonial`}
                      className={`group relative flex flex-col items-center justify-center py-2 px-3 transition-all duration-300 cursor-pointer focus:outline-none ${
                        isActive
                          ? 'grayscale-0 opacity-100 scale-110 drop-shadow-[0_0_16px_rgba(255,255,255,0.2)]'
                          : 'grayscale opacity-40 hover:opacity-100 hover:grayscale-0 hover:scale-105'
                      }`}
                    >
                      <div className="h-10 sm:h-12 md:h-14 flex items-center justify-center">
                        {brand.node}
                      </div>

                      {/* Active Red Indicator Underline */}
                      <div
                        className={`h-[2px] transition-all duration-300 rounded-full mt-2.5 ${
                          isActive
                            ? 'w-8 bg-brand'
                            : 'w-0 bg-transparent group-hover:w-4 group-hover:bg-white/40'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}