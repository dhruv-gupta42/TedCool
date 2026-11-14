'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger, EASE, DURATION } from '@/app/lib/animations/gsapConfig';
import { aboutContent } from '@/app/data/siteContent';
import ContactCTA from '@/app/components/sections/ContactCTA';
import { Camera, Film, Flame, Users, Handshake, Clapperboard, LucideIcon } from 'lucide-react';

interface ServiceIconMeta {
  Icon: LucideIcon;
  accentColor: string;
  glow: string;
}

const capabilityIcons: Record<string, ServiceIconMeta> = {
  'Social Media Marketing': {
    Icon: Flame,
    accentColor: 'text-brand',
    glow: 'group-hover:shadow-[0_0_24px_rgba(229,9,20,0.35)] group-hover:border-brand/40 group-hover:bg-brand/10',
  },
  'Influencer Marketing': {
    Icon: Users,
    accentColor: 'text-zinc-200 group-hover:text-brand',
    glow: 'group-hover:shadow-[0_0_24px_rgba(229,9,20,0.25)] group-hover:border-brand/40 group-hover:bg-brand/10',
  },
  'Talent Collaborations': {
    Icon: Handshake,
    accentColor: 'text-brand',
    glow: 'group-hover:shadow-[0_0_24px_rgba(229,9,20,0.35)] group-hover:border-brand/40 group-hover:bg-brand/10',
  },
  'Video Production': {
    Icon: Clapperboard,
    accentColor: 'text-zinc-200 group-hover:text-brand',
    glow: 'group-hover:shadow-[0_0_24px_rgba(229,9,20,0.25)] group-hover:border-brand/40 group-hover:bg-brand/10',
  },
};

export default function AboutPageClient() {
  const heroRef = useRef<HTMLElement>(null);
  const narrativeRef = useRef<HTMLElement>(null);
  const differenceRef = useRef<HTMLElement>(null);
  const howWeWorkRef = useRef<HTMLElement>(null);
  const capabilitiesRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.about-hero-animate'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: DURATION.normal,
            stagger: 0.1,
            ease: EASE.smooth,
            delay: 0.2,
          }
        );
      }

      // Narrative split section
      if (narrativeRef.current) {
        gsap.fromTo(
          narrativeRef.current.querySelectorAll('.narrative-animate'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: DURATION.normal,
            stagger: 0.1,
            ease: EASE.smooth,
            scrollTrigger: {
              trigger: narrativeRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Difference section
      if (differenceRef.current) {
        gsap.fromTo(
          differenceRef.current.querySelectorAll('.diff-animate'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: DURATION.normal,
            stagger: 0.08,
            ease: EASE.smooth,
            scrollTrigger: {
              trigger: differenceRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // How We Work section
      if (howWeWorkRef.current) {
        gsap.fromTo(
          howWeWorkRef.current.querySelectorAll('.work-animate'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: DURATION.normal,
            stagger: 0.1,
            ease: EASE.smooth,
            scrollTrigger: {
              trigger: howWeWorkRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Capabilities section
      if (capabilitiesRef.current) {
        gsap.fromTo(
          capabilitiesRef.current.querySelectorAll('.cap-animate'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: DURATION.normal,
            stagger: 0.08,
            ease: EASE.smooth,
            scrollTrigger: {
              trigger: capabilitiesRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Central Thought Manifesto
      if (manifestoRef.current) {
        gsap.fromTo(
          manifestoRef.current.querySelectorAll('.manifesto-animate'),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: DURATION.slow,
            stagger: 0.15,
            ease: EASE.smooth,
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="pt-36 md:pt-48 pb-16 md:pb-24 px-6 md:px-12 relative overflow-hidden"
      >
        <div className="absolute top-1/3 -right-24 w-[600px] h-[600px] bg-brand/[0.06] rounded-full blur-[160px] pointer-events-none" />

        <div className="w-full max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3 mb-6 about-hero-animate">
            <span className="text-xs uppercase tracking-[0.3em] text-text-muted font-mono">
              EST. 2017 // 9 YEARS IN
            </span>
          </div>

          <h1 className="about-hero-animate text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-black text-text-primary tracking-tight leading-[0.92] mb-8">
            WE ARE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-white to-text-secondary">
              TEDCOOL MEDIA
            </span>
          </h1>

          <p className="about-hero-animate text-2xl sm:text-3xl md:text-4xl font-heading font-medium text-text-primary tracking-tight max-w-4xl leading-tight mb-8">
            {aboutContent.hero.hook}
          </p>

          {/* About Us Highlight Line */}
          <div className="about-hero-animate my-10 p-6 md:p-8 bg-surface-elevated/40 border-l-2 border-brand border-y border-r border-white/5 rounded-r-sm max-w-4xl">
            <p className="text-lg md:text-2xl font-heading italic text-text-primary leading-relaxed">
              &ldquo;{aboutContent.hero.aboutUsLine}&rdquo;
            </p>
          </div>

          <div className="about-hero-animate grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-6 border-t border-white/10 max-w-5xl">
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              {aboutContent.hero.introLead}
            </p>
            <div>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-4">
                {aboutContent.hero.introStory}
              </p>
              <p className="text-base md:text-lg text-brand font-heading font-semibold tracking-wide">
                {aboutContent.hero.introCallout}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NARRATIVE + IMAGE 1 (Editorial Split Layout) */}
      <section
        ref={narrativeRef}
        className="py-20 md:py-28 px-6 md:px-12 border-t border-white/10 bg-surface/30 relative"
      >
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Narrative text */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="narrative-animate text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-primary tracking-tight leading-tight">
              Strategy &amp; Creativity Together. Making Things Happen.
            </h2>

            <div className="narrative-animate space-y-5 text-base md:text-lg text-text-secondary leading-relaxed pt-2">
              {aboutContent.narrative.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Standout quote block */}
            <div className="narrative-animate pt-6">
              <div className="p-8 bg-surface-elevated/70 border border-white/10 rounded-sm relative overflow-hidden group hover:border-brand/40 transition-colors duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-2xl pointer-events-none" />
                <p className="text-xl md:text-2xl font-heading font-semibold text-text-primary leading-snug mb-3">
                  &ldquo;{aboutContent.narrative.punchline}&rdquo;
                </p>
                <span className="text-xs uppercase tracking-[0.3em] text-brand font-mono font-medium block">
                  — {aboutContent.narrative.signoff}
                </span>
              </div>
            </div>
          </div>

          {/* Right: IMAGE PLACEHOLDER 1 */}
          <div className="lg:col-span-5 narrative-animate">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-surface-elevated border border-white/10 group shadow-2xl">
              {/* Backdrop layout */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 flex flex-col justify-between p-8">
                {/* Top Corner Meta */}
                <div className="flex items-center justify-between text-xs font-mono text-text-muted tracking-wider">
                  <span>01 / ARCHIVE</span>
                  <span className="text-brand">EST. 2017</span>
                </div>

                {/* Center Visual Graphic */}
                <div className="flex flex-col items-center justify-center text-center my-auto py-8">
                  <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-4 group-hover:scale-110 group-hover:border-brand/40 transition-all duration-500">
                    <Camera className="w-7 h-7" />
                  </div>
                  <span className="text-sm uppercase tracking-[0.25em] font-heading font-bold text-text-primary mb-2">
                    Visual Storytelling
                  </span>
                  <p className="text-xs text-text-muted max-w-[240px] leading-relaxed">
                    Image Slot 01 • Studio Culture &amp; Creative Direction
                  </p>
                </div>

                {/* Bottom Frame Details */}
                <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs font-mono text-text-secondary">
                  <span>TEDCOOL MEDIA</span>
                  <span className="text-text-muted">4:5 RATIO</span>
                </div>
              </div>

              {/* Ambient hover glow */}
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
            <p className="text-xs text-text-muted font-mono tracking-wider mt-3 text-right">
              Image: Studio &amp; Culture (4:5)
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE TEDCOOL DIFFERENCE */}
      <section
        ref={differenceRef}
        className="py-20 md:py-32 px-6 md:px-12 relative overflow-hidden"
      >
        <div className="absolute bottom-1/4 -left-20 w-[550px] h-[550px] bg-brand/[0.05] rounded-full blur-[150px] pointer-events-none" />

        <div className="w-full max-w-[1600px] mx-auto">
          {/* Section Header */}
          <div className="max-w-4xl mb-16 md:mb-20">
            <h2 className="diff-animate text-4xl sm:text-5xl md:text-7xl font-heading font-black text-text-primary tracking-tight leading-[1.0] mb-6">
              {aboutContent.difference.headline}
            </h2>
            <p className="diff-animate text-xl md:text-2xl text-text-secondary font-heading italic max-w-3xl leading-relaxed">
              &ldquo;{aboutContent.difference.whyTedcoolLine}&rdquo;
            </p>
          </div>

          {/* 6 Difference Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {aboutContent.difference.points.map((point) => (
              <div
                key={point.number}
                className="diff-animate p-8 md:p-10 bg-surface/60 hover:bg-surface border border-white/10 hover:border-brand/40 rounded-sm transition-all duration-500 flex flex-col justify-between group relative overflow-hidden min-h-[260px]"
              >
                {/* Background Number Accent */}
                <div className="absolute -top-4 -right-2 text-7xl font-heading font-black text-white/[0.03] group-hover:text-brand/[0.06] transition-colors pointer-events-none select-none">
                  {point.number}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-mono font-bold text-brand tracking-widest">
                      {point.number}
                    </span>
                    <span className="w-8 h-[1px] bg-border-subtle group-hover:bg-brand/40 transition-colors" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary tracking-tight mb-4 group-hover:text-white transition-colors">
                    {point.title}
                  </h3>
                </div>

                <p className="text-base text-text-secondary leading-relaxed relative z-10">
                  {point.description}
                </p>

                {/* Subtle bottom edge indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW WE WORK + IMAGE 2 (Editorial Split Layout) */}
      <section
        ref={howWeWorkRef}
        className="py-20 md:py-28 px-6 md:px-12 border-t border-white/10 bg-surface/30 relative"
      >
        <div className="w-full max-w-[1600px] mx-auto">
          {/* Section Heading */}
          <div className="max-w-4xl mb-16">
            <h2 className="work-animate text-3xl sm:text-4xl md:text-6xl font-heading font-black text-text-primary tracking-tight leading-tight mb-4">
              {aboutContent.howWeWork.headline}
            </h2>
            <p className="work-animate text-xl md:text-2xl text-text-secondary font-heading italic">
              &ldquo;{aboutContent.howWeWork.howWeWorkLine}&rdquo;
            </p>
          </div>

          {/* Grid: Image on Left + 3 Work Steps on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: IMAGE PLACEHOLDER 2 */}
            <div className="lg:col-span-5 work-animate order-2 lg:order-1">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-surface-elevated border border-white/10 group shadow-2xl">
                {/* Backdrop layout */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 flex flex-col justify-between p-8">
                  {/* Top Corner Meta */}
                  <div className="flex items-center justify-between text-xs font-mono text-text-muted tracking-wider">
                    <span>02 / PRODUCTION</span>
                    <span className="text-brand">CRAFT</span>
                  </div>

                  {/* Center Visual Graphic */}
                  <div className="flex flex-col items-center justify-center text-center my-auto py-8">
                    <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-4 group-hover:scale-110 group-hover:border-brand/40 transition-all duration-500">
                      <Film className="w-7 h-7" />
                    </div>
                    <span className="text-sm uppercase tracking-[0.25em] font-heading font-bold text-text-primary mb-2">
                      Creative Execution
                    </span>
                    <p className="text-xs text-text-muted max-w-[240px] leading-relaxed">
                      Image Slot 02 • Production, Sets &amp; Campaign Execution
                    </p>
                  </div>

                  {/* Bottom Frame Details */}
                  <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs font-mono text-text-secondary">
                    <span>THE WORK IN MOTION</span>
                    <span className="text-text-muted">4:5 RATIO</span>
                  </div>
                </div>

                {/* Ambient hover glow */}
                <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
              <p className="text-xs text-text-muted font-mono tracking-wider mt-3">
                Image: Production &amp; Execution (4:5)
              </p>
            </div>

            {/* Right: 3 Steps */}
            <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
              {aboutContent.howWeWork.steps.map((step) => (
                <div
                  key={step.number}
                  className="work-animate p-8 bg-surface/50 hover:bg-surface border border-white/10 hover:border-brand/30 rounded-sm transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs font-mono font-bold text-brand tracking-widest">
                      {step.number}
                    </span>
                    <h3 className="text-2xl font-heading font-bold text-text-primary group-hover:text-brand transition-colors">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-base md:text-lg text-text-secondary leading-relaxed pl-8">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CAPABILITIES */}
      <section
        ref={capabilitiesRef}
        className="py-20 md:py-28 px-6 md:px-12 relative overflow-hidden"
      >
        <div className="w-full max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
            <div>
              <h2 className="cap-animate text-4xl sm:text-5xl md:text-6xl font-heading font-black text-text-primary tracking-tight">
                {aboutContent.services.headline}
              </h2>
            </div>
            <p className="cap-animate text-lg md:text-xl text-text-secondary font-heading italic max-w-md">
              &ldquo;{aboutContent.services.servicesLine}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aboutContent.services.items.map((item, idx) => {
              const meta = capabilityIcons[item.title] || {
                Icon: Flame,
                accentColor: 'text-zinc-200 group-hover:text-brand',
                glow: 'group-hover:shadow-[0_0_24px_rgba(229,9,20,0.35)] group-hover:border-brand/40 group-hover:bg-brand/10',
              };
              const IconComp = meta.Icon;

              return (
                <div
                  key={item.title}
                  className="cap-animate p-8 md:p-10 bg-surface/40 hover:bg-surface border border-white/10 hover:border-brand/30 rounded-sm transition-all duration-300 group flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    {/* Top Right: Minimal Outline Icon Container */}
                    <div className="flex items-center justify-end mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center select-none transition-all duration-300 ${meta.glow}`}
                      >
                        <IconComp
                          className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 ${meta.accentColor}`}
                          strokeWidth={1.75}
                        />
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-3 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-base text-text-secondary leading-relaxed mt-4">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CENTRAL THOUGHT / MANIFESTO */}
      <section
        ref={manifestoRef}
        className="py-24 md:py-36 px-6 md:px-12 bg-surface border-t border-b border-white/10 relative overflow-hidden text-center"
      >
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand/[0.08] rounded-full blur-[180px] pointer-events-none" />

        <div className="w-full max-w-5xl mx-auto relative z-10">
          <div className="space-y-3 mb-10">
            {aboutContent.centralThought.mantra.map((line, idx) => (
              <h2
                key={line}
                className={`manifesto-animate text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight leading-[1.0] ${
                  idx === 2
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand via-rose-500 to-red-600'
                    : 'text-text-primary'
                }`}
              >
                {line}
              </h2>
            ))}
          </div>

          <div className="manifesto-animate max-w-2xl mx-auto pt-6 border-t border-white/10">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-text-primary tracking-wide mb-3">
              {aboutContent.centralThought.brandName}
            </h3>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-heading">
              {aboutContent.centralThought.closing}
            </p>
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION (With the custom Contact line) */}
      <ContactCTA
        headline={
          <>
            GOT A BRIEF?<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-rose-500 to-red-600">
              WE&apos;RE LISTENING.
            </span>
          </>
        }
        description={aboutContent.contact.contactLine}
      />
    </>
  );
}
