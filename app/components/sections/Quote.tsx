'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, EASE, DURATION } from '@/app/lib/animations/gsapConfig';
import { Sparkles } from 'lucide-react';

export default function Quote() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.quote-animate'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION.slow,
          stagger: 0.15,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        section.querySelector('.quote-line'),
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: DURATION.slow,
          ease: EASE.expoInOut,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
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
      className="relative min-h-screen py-16 md:py-20 px-6 md:px-12 overflow-hidden bg-surface/30 border-y border-white/5 flex flex-col items-center justify-center w-full"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full bg-brand/[0.05] blur-[180px]" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      </div>

      <div
        className="relative w-full max-w-[1600px] mx-auto my-auto flex flex-col items-center justify-center text-center z-10"
        style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}
      >
        {/* Decorative quote mark */}
        <div className="quote-animate mb-8 inline-flex items-center justify-center">
          <span className="text-8xl md:text-[140px] font-heading font-black text-brand/30 leading-none select-none">
            &ldquo;
          </span>
        </div>

        {/* Big quote statement */}
        <blockquote
          className="quote-animate text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary leading-[1.16] tracking-tight max-w-5xl mx-auto mb-14 text-center"
          style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}
        >
          GREAT BRANDS DON&apos;T JUST SPEAK TO AUDIENCES —<br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-rose-500 to-red-600">
            THEY SHAPE CULTURE AND MOVE HEARTS.
          </span>
        </blockquote>

        {/* Attribution with decorative line */}
        <div className="quote-animate flex items-center justify-center gap-4">
          <div className="quote-line h-8 w-[2px] bg-brand origin-top" />
          <span className="text-sm md:text-base uppercase tracking-[0.35em] text-text-secondary font-heading font-semibold">
            Tedcool Media <span className="text-brand">✦</span> Brand Philosophy
          </span>
        </div>
      </div>
    </section>
  );
}
