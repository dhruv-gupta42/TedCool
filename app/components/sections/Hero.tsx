'use client';

import { useEffect, useRef } from 'react';
import { gsap, EASE } from '@/app/lib/animations/gsapConfig';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Staggered reveal of each line from below
      gsap.fromTo(
        section.querySelectorAll('.hero-line'),
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: EASE.expo,
          delay: 0.3,
        }
      );

      // Fade in the scroll indicator
      gsap.fromTo(
        section.querySelector('.scroll-indicator'),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 1.5,
          ease: 'power2.out',
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[600px] flex flex-col justify-end overflow-hidden"
    >
      {/* Background — video placeholder (dark cinematic atmosphere) */}
      <div className="absolute inset-0 z-0">
        {/* When video is ready, replace this div with a <video> element */}
        <div className="absolute inset-0 bg-background" />

        {/* Atmospheric ambient glow to keep it cinematic, not flat */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-brand/[0.06] blur-[200px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full bg-brand/[0.04] blur-[180px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.015] blur-[150px] pointer-events-none" />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Bottom gradient so text is always readable over any future video */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Headline — pinned to bottom-left, massive cinematic typography */}
      <div className="relative z-10 px-6 md:px-12 pb-12 md:pb-16 lg:pb-20">
        <div className="w-full max-w-[1600px] mx-auto">
          {/* Main headline — swapped Google Fonts pairing */}
          <h1 className="tracking-tight leading-[0.95]">
            <span className="hero-line block overflow-hidden pb-1">
              <span
                className="block font-bbh uppercase text-[clamp(2.35rem,5.75vw,5.85rem)] font-bold text-text-primary tracking-tight leading-[0.95]"
                style={{ fontFamily: "'BBH Bogle', sans-serif" }}
              >
                we create what moves the
              </span>
            </span>
            <span className="hero-line block overflow-hidden pb-2">
              <span
                className="block font-momo text-[clamp(2.75rem,7.5vw,7.25rem)] font-normal text-transparent bg-clip-text bg-gradient-to-r from-brand via-rose-500 to-red-600 tracking-normal leading-[1.1]"
                style={{ fontFamily: "'Momo Signature', cursive, sans-serif" }}
              >
                World.
              </span>
            </span>
          </h1>
        </div>
      </div>

      {/* Scroll indicator — bottom right */}
      <div className="scroll-indicator absolute bottom-6 md:bottom-10 right-6 md:right-12 z-10 flex flex-col items-center gap-2 opacity-0">
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-heading rotate-90 origin-center translate-x-3 mb-6">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand to-transparent" />
      </div>
    </section>
  );
}
