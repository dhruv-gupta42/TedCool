'use client';

import { useEffect, useRef } from 'react';
import { gsap, EASE, DURATION } from '@/app/lib/animations/gsapConfig';
import WorkGrid from '@/app/components/portfolio/WorkGrid';
import ContactCTA from '@/app/components/sections/ContactCTA';

export default function WorkPageClient() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        hero.querySelectorAll('.work-hero-animate'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION.normal,
          stagger: 0.12,
          ease: EASE.smooth,
        }
      );
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="pt-36 md:pt-48 pb-16 md:pb-20 px-6 md:px-12">
        <div className="w-full max-w-[1600px] mx-auto">
          <span className="work-hero-animate block text-xs uppercase tracking-[0.4em] text-brand mb-4 font-heading">
            Our Portfolio
          </span>
          <h1 className="work-hero-animate text-display font-heading text-text-primary mb-6">
            SELECTED WORK
          </h1>
          <p className="work-hero-animate text-body-lg text-text-secondary max-w-xl">
            A curated collection of our finest projects. Each piece represents our commitment to
            creative excellence and strategic thinking.
          </p>

          {/* Divider */}
          <div className="work-hero-animate mt-12 h-[1px] bg-gradient-to-r from-brand via-border to-transparent" />
        </div>
      </section>

      {/* Work Grid */}
      <section className="px-6 md:px-12 pb-20 md:pb-32">
        <div className="w-full max-w-[1600px] mx-auto">
          <WorkGrid />
        </div>
      </section>

      {/* CTA */}
      <ContactCTA />
    </>
  );
}
