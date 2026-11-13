'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, EASE, DURATION } from '@/app/lib/animations/gsapConfig';
import { introContent } from '@/app/data/siteContent';
import {
  SpotifyLogo,
  NetflixLogo,
  NikeLogo,
  AdidasLogo,
  PumaLogo,
  AppleLogo,
  YouTubeLogo,
  GoogleLogo,
  PlayStationLogo,
  OnePlusLogo,
  BoAtLogo,
  SwiggyLogo,
  ZomatoLogo,
  RedBullLogo,
  PepsiLogo,
  TataLogo,
  CredLogo,
  LevisLogo,
  IkeaLogo,
  PondsLogo,
  JioHotstarLogo,
  DotAndKeyLogo,
  WishCareLogo,
  LiquidIVLogo,
  UrbanCompanyLogo,
} from './BrandLogos';

interface BrandEntry {
  name: string;
  logo?: React.ReactNode;
  icon?: string;
  style?: string;
}

// Column 1 Brands (Left Column — moves top to bottom)
// Uses official brand logos when available, with styled names as fallback
const col1Brands: BrandEntry[] = [
  { name: "POND'S", logo: <PondsLogo /> },
  { name: 'JioHotstar', logo: <JioHotstarLogo /> },
  { name: 'DOT & KEY', logo: <DotAndKeyLogo /> },
  { name: 'WishCare', logo: <WishCareLogo /> },
  { name: 'LIQUID I.V.', logo: <LiquidIVLogo /> },
  { name: 'SWIGGY', logo: <SwiggyLogo /> },
  { name: 'ZOMATO', logo: <ZomatoLogo /> },
  { name: 'SPOTIFY', logo: <SpotifyLogo /> },
  { name: 'NETFLIX', logo: <NetflixLogo /> },
  { name: 'ONEPLUS', logo: <OnePlusLogo /> },
  { name: 'NIKE', logo: <NikeLogo /> },
  { name: 'APPLE', logo: <AppleLogo /> },
  { name: 'YOUTUBE', logo: <YouTubeLogo /> },
  { name: "L'ORÉAL", style: 'font-heading tracking-[0.25em] text-sm font-black text-yellow-300/80' },
  { name: 'MAYBELLINE', style: 'font-heading tracking-[0.2em] text-xs font-black' },
  { name: 'PLUM', icon: '✦', style: 'font-heading tracking-widest text-base font-bold text-purple-400/90' },
  { name: 'BEARDO', style: 'font-heading tracking-[0.3em] text-xs font-black' },
  { name: 'THE DERMA CO.', style: 'font-heading tracking-wider text-xs font-bold' },
  { name: 'KFC', style: 'font-heading tracking-[0.3em] text-base font-black text-red-400/90' },
  { name: 'DISNEY+', style: 'font-heading tracking-[0.2em] text-sm font-black text-blue-400/90' },
];

// Column 2 Brands (Right Column — moves bottom to top)
const col2Brands: BrandEntry[] = [
  { name: 'URBAN COMPANY', logo: <UrbanCompanyLogo /> },
  { name: 'IKEA', logo: <IkeaLogo /> },
  { name: 'boAt', logo: <BoAtLogo /> },
  { name: 'PUMA', logo: <PumaLogo /> },
  { name: 'ADIDAS', logo: <AdidasLogo /> },
  { name: 'RED BULL', logo: <RedBullLogo /> },
  { name: 'PEPSI', logo: <PepsiLogo /> },
  { name: 'TATA', logo: <TataLogo /> },
  { name: 'CRED', logo: <CredLogo /> },
  { name: "LEVI'S", logo: <LevisLogo /> },
  { name: 'GOOGLE', logo: <GoogleLogo /> },
  { name: 'PLAYSTATION', logo: <PlayStationLogo /> },
  { name: 'ASIAN PAINTS', style: 'font-heading tracking-wider text-xs font-black text-rose-400/90' },
  { name: 'NYKAA', style: 'font-heading tracking-[0.25em] text-sm font-black text-pink-400/90' },
  { name: 'Cadbury', style: 'font-serif italic tracking-wide text-base font-bold text-purple-400/90' },
  { name: 'MAMA EARTH', style: 'font-heading tracking-wider text-xs font-bold text-emerald-400/90' },
  { name: 'ZEPTO', icon: '⚡', style: 'font-heading tracking-wider text-sm font-black text-rose-400/90' },
  { name: 'BLINKIT', style: 'font-heading tracking-wider text-sm font-black text-yellow-400/90' },
  { name: 'BURGER KING', icon: '👑', style: 'font-heading tracking-wider text-xs font-black text-amber-400/90' },
  { name: 'SAMSUNG', style: 'font-heading tracking-[0.2em] text-sm font-black' },
];

export default function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll('.intro-animate');

      gsap.fromTo(
        elements,
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-16 md:py-24 px-6 md:px-12 flex flex-col justify-between relative overflow-hidden bg-background"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-[750px] h-[550px] bg-brand/[0.04] blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[650px] h-[450px] bg-brand/[0.03] blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto flex flex-col justify-between h-full relative z-10 gap-12 md:gap-16 my-auto">
        {/* TOP: Agency Manifesto */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
            <div className="md:col-span-7">
              <h2 className="intro-animate text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary leading-[1.06] tracking-tight">
                {introContent.headline.split(' ').map((word, i) => (
                  <span
                    key={i}
                    className={word.toLowerCase() === introContent.highlightedWord?.toLowerCase() ? 'text-brand' : ''}
                  >
                    {word}{' '}
                  </span>
                ))}
              </h2>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between h-full">
              <p className="intro-animate text-base md:text-xl text-text-secondary leading-relaxed font-normal mb-6">
                {introContent.description}
              </p>

              <div className="intro-animate flex flex-wrap gap-2">
                {['Social Marketing', 'Influencer Campaigns', 'Talent Representation', 'Cinematic Video'].map((item) => (
                  <span
                    key={item}
                    className="px-3.5 py-1 rounded-full text-xs font-heading uppercase tracking-wider bg-white/[0.03] border border-white/10 text-text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE: Divider */}
        <div className="intro-animate flex items-center gap-6 my-1">
          <div className="h-[1px] flex-1 bg-border" />
          <span className="text-xs uppercase tracking-[0.4em] text-text-muted font-heading">
            Proven Track Record // Trusted Partners
          </span>
          <div className="h-[1px] flex-1 bg-border" />
        </div>

        {/* BOTTOM: Proven Track Record with Infinite Brand Loop (Matching Inspiration) */}
        <div className="intro-animate">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left side: Heading + Metrics */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-text-primary tracking-tight leading-[1.04] mb-8">
                  Trusted by<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-rose-500 to-red-600">
                    Industry Leaders.
                  </span>
                </h3>
              </div>

              {/* 4 Stats Grid (Matching the inspiration screenshot structure) */}
              <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-2">
                <div>
                  <span className="text-xs uppercase tracking-widest text-brand font-heading font-semibold block mb-1">
                    — IMPRESSIONS
                  </span>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-1">
                    250M+
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Organic audience reach
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-brand font-heading font-semibold block mb-1">
                    — CAMPAIGNS
                  </span>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-1">
                    120+
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    And counting
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-brand font-heading font-semibold block mb-1">
                    — TALENT ROSTER
                  </span>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-1">
                    45+
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Exclusive digital creators
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-brand font-heading font-semibold block mb-1">
                    — IMPACT SCORE
                  </span>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-1">
                    4.9★
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Client satisfaction average
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Infinite Looping Brand Marquee (2 Vertical Columns with Logos) */}
            <div className="lg:col-span-6 relative h-[360px] sm:h-[400px] md:h-[440px] overflow-hidden rounded-xl bg-surface/40 border border-white/5 p-4 sm:p-6">
              {/* Top & Bottom gradient fade masks for smooth infinite illusion */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background via-background/80 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

              <div className="grid grid-cols-2 gap-3 sm:gap-4 h-full overflow-hidden">
                {/* Column 1: Infinite Scroll Top to Bottom */}
                <div className="animate-marquee-vertical-reverse flex flex-col gap-3 sm:gap-4">
                  {[...col1Brands, ...col1Brands].map((brand, i) => (
                    <div
                      key={`col1-${i}`}
                      className="h-16 sm:h-20 px-4 rounded-lg bg-surface-elevated/70 border border-white/10 hover:border-brand/40 flex items-center justify-center gap-2.5 text-text-primary hover:text-white transition-all duration-300 group cursor-default shadow-sm select-none"
                    >
                      {brand.logo ? (
                        <div className="flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          {brand.logo}
                        </div>
                      ) : (
                        <>
                          {brand.icon && (
                            <span className="text-brand text-xs sm:text-sm opacity-80 group-hover:scale-110 transition-transform">
                              {brand.icon}
                            </span>
                          )}
                          <span className={`${brand.style} text-text-secondary group-hover:text-white transition-colors`}>
                            {brand.name}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Column 2: Infinite Scroll Bottom to Top */}
                <div className="animate-marquee-vertical flex flex-col gap-3 sm:gap-4">
                  {[...col2Brands, ...col2Brands].map((brand, i) => (
                    <div
                      key={`col2-${i}`}
                      className="h-16 sm:h-20 px-4 rounded-lg bg-surface-elevated/70 border border-white/10 hover:border-brand/40 flex items-center justify-center gap-2.5 text-text-primary hover:text-white transition-all duration-300 group cursor-default shadow-sm select-none"
                    >
                      {brand.logo ? (
                        <div className="flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          {brand.logo}
                        </div>
                      ) : (
                        <>
                          {brand.icon && (
                            <span className="text-brand text-xs sm:text-sm opacity-80 group-hover:scale-110 transition-transform">
                              {brand.icon}
                            </span>
                          )}
                          <span className={`${brand.style} text-text-secondary group-hover:text-white transition-colors`}>
                            {brand.name}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
