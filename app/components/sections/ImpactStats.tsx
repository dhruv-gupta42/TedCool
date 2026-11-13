'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, EASE, DURATION } from '@/app/lib/animations/gsapConfig';
import { TrendingUp, Users, Video, Award } from 'lucide-react';

const stats = [
  {
    number: '250M+',
    label: 'Total Impressions',
    detail: 'Organic audience reach across social & creator networks',
    icon: TrendingUp,
  },
  {
    number: '120+',
    label: 'Brand Campaigns',
    detail: 'Cross-platform strategies delivered with measurable ROI',
    icon: Award,
  },
  {
    number: '45+',
    label: 'Talents & Creators',
    detail: 'Exclusive roster and top-tier digital storytellers',
    icon: Users,
  },
  {
    number: '4.9★',
    label: 'Impact Score',
    detail: 'Client retention & creator satisfaction average',
    icon: Video,
  },
];

export default function ImpactStats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.stat-card'),
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-24 md:py-32 px-6 md:px-12 relative overflow-hidden flex flex-col justify-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand/[0.04] blur-[160px] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto my-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-xs uppercase tracking-[0.4em] text-brand font-heading font-medium">
                Proven Track Record
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary tracking-tight">
              MEASURABLE IMPACT
            </h2>
          </div>
          <p className="text-sm md:text-base text-text-secondary max-w-md">
            Our creative activations are engineered for cultural resonance, audience devotion, and tangible commercial return.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="stat-card group relative p-8 md:p-10 min-h-[320px] md:min-h-[380px] flex flex-col justify-between bg-surface-elevated/70 border border-white/10 hover:border-brand/40 rounded-sm transition-all duration-500 overflow-hidden hover:shadow-[0_0_30px_rgba(200,0,0,0.12)]"
              >
                {/* Subtle top red glow bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="w-2 h-2 rounded-full bg-brand" />
                    <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-text-primary mb-3 group-hover:text-brand transition-colors duration-300">
                    {stat.number}
                  </div>

                  <div className="text-sm font-heading font-bold text-text-primary uppercase tracking-wider mb-2">
                    {stat.label}
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
