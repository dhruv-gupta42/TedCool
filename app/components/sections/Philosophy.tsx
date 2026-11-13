'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, EASE, DURATION } from '@/app/lib/animations/gsapConfig';
import { philosophyContent } from '@/app/data/siteContent';

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        section.querySelectorAll('.phil-animate'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION.normal,
          stagger: 0.12,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Principle items
      gsap.fromTo(
        section.querySelectorAll('.principle-item'),
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: DURATION.normal,
          stagger: 0.15,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: section.querySelector('.principles-grid'),
            start: 'top 80%',
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
      className="py-24 md:py-36 px-6 md:px-12 bg-surface"
    >
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-20">
          <div>
            <span className="phil-animate block text-xs uppercase tracking-[0.4em] text-brand mb-4 font-heading">
              Our Process
            </span>
            <h2 className="phil-animate text-headline font-heading text-text-primary">
              {philosophyContent.headline}
            </h2>
          </div>
          <div className="flex items-end">
            <p className="phil-animate text-body-lg text-text-secondary">
              {philosophyContent.description}
            </p>
          </div>
        </div>

        {/* Principles Grid */}
        <div className="principles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophyContent.principles.map((principle) => (
            <div
              key={principle.title}
              className="principle-item group p-8 md:p-10 min-h-[240px] md:min-h-[280px] flex flex-col justify-between bg-surface-elevated border border-border-subtle hover:border-brand/30 transition-all duration-500 rounded-sm"
            >
              <div>
                <div className="w-2.5 h-2.5 rounded-full bg-brand/50 group-hover:bg-brand group-hover:scale-125 transition-all duration-300 mb-6" />
                <h3 className="text-xl font-heading font-bold text-text-primary mb-3 group-hover:text-brand transition-colors duration-300">
                  {principle.title}
                </h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
