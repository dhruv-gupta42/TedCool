'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, EASE, DURATION } from '@/app/lib/animations/gsapConfig';
import { aboutContent } from '@/app/data/siteContent';
import { services } from '@/app/data/services';
import ContactCTA from '@/app/components/sections/ContactCTA';

export default function AboutPageClient() {
  const heroRef = useRef<HTMLElement>(null);
  const whoRef = useRef<HTMLElement>(null);
  const philRef = useRef<HTMLElement>(null);
  const approachRef = useRef<HTMLElement>(null);
  const capabilitiesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      if (heroRef.current) {
        const tl = gsap.timeline({ delay: 0.3 });
        tl.fromTo(
          heroRef.current.querySelectorAll('.about-hero-animate'),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: DURATION.normal, stagger: 0.12, ease: EASE.smooth }
        );
      }

      // Who we are
      if (whoRef.current) {
        gsap.fromTo(
          whoRef.current.querySelectorAll('.who-animate'),
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: DURATION.normal, stagger: 0.12, ease: EASE.smooth,
            scrollTrigger: { trigger: whoRef.current, start: 'top 75%', once: true },
          }
        );
      }

      // Philosophy
      if (philRef.current) {
        gsap.fromTo(
          philRef.current.querySelectorAll('.phil-animate'),
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: DURATION.normal, stagger: 0.12, ease: EASE.smooth,
            scrollTrigger: { trigger: philRef.current, start: 'top 75%', once: true },
          }
        );
      }

      // Approach
      if (approachRef.current) {
        gsap.fromTo(
          approachRef.current.querySelectorAll('.approach-animate'),
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: DURATION.normal, stagger: 0.12, ease: EASE.smooth,
            scrollTrigger: { trigger: approachRef.current, start: 'top 75%', once: true },
          }
        );
      }

      // Capabilities
      if (capabilitiesRef.current) {
        gsap.fromTo(
          capabilitiesRef.current.querySelectorAll('.cap-animate'),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: DURATION.normal, stagger: 0.1, ease: EASE.smooth,
            scrollTrigger: { trigger: capabilitiesRef.current, start: 'top 80%', once: true },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="pt-36 md:pt-48 pb-16 md:pb-20 px-6 md:px-12">
        <div className="w-full max-w-[1600px] mx-auto">
          <span className="about-hero-animate block text-xs uppercase tracking-[0.4em] text-brand mb-4 font-heading">
            About Us
          </span>
          <h1 className="about-hero-animate text-display font-heading text-text-primary mb-6">
            {aboutContent.heroHeadline}
          </h1>
          <p className="about-hero-animate text-subheadline text-text-secondary max-w-2xl">
            {aboutContent.heroDescription}
          </p>
          <div className="about-hero-animate mt-12 h-[1px] bg-gradient-to-r from-brand via-border to-transparent" />
        </div>
      </section>

      {/* Who We Are */}
      <section ref={whoRef} className="py-20 md:py-28 px-6 md:px-12">
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h2 className="who-animate text-headline font-heading text-text-primary">
              {aboutContent.whoWeAre.headline}
            </h2>
          </div>
          <div>
            <p className="who-animate text-body-lg text-text-secondary mb-6">
              {aboutContent.whoWeAre.description}
            </p>
            <p className="who-animate text-body-lg text-text-secondary">
              {aboutContent.whoWeAre.additionalText}
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section ref={philRef} className="py-20 md:py-28 px-6 md:px-12 bg-surface">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="phil-animate text-headline font-heading text-text-primary mb-6">
            {aboutContent.philosophy.headline}
          </h2>
          <p className="phil-animate text-body-lg text-text-secondary">
            {aboutContent.philosophy.description}
          </p>
        </div>
      </section>

      {/* Approach */}
      <section ref={approachRef} className="py-20 md:py-28 px-6 md:px-12">
        <div className="w-full max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12">
            <div>
              <span className="approach-animate block text-xs uppercase tracking-[0.4em] text-brand mb-4 font-heading">
                Our Method
              </span>
              <h2 className="approach-animate text-headline font-heading text-text-primary">
                {aboutContent.approach.headline}
              </h2>
            </div>
            <div className="flex items-end">
              <p className="approach-animate text-body-lg text-text-secondary">
                {aboutContent.approach.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutContent.approach.steps.map((step) => (
              <div
                key={step.title}
                className="approach-animate p-8 md:p-10 min-h-[220px] flex flex-col justify-between border border-border-subtle hover:border-brand/30 transition-all duration-500 rounded-sm group"
              >
                <div>
                  <div className="w-2.5 h-2.5 rounded-full bg-brand/50 group-hover:bg-brand group-hover:scale-125 transition-all duration-300 mb-6" />
                  <h3 className="text-xl font-heading font-bold text-text-primary mb-3 group-hover:text-brand transition-colors duration-300">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section ref={capabilitiesRef} className="py-20 md:py-28 px-6 md:px-12 bg-surface">
        <div className="w-full max-w-[1600px] mx-auto">
          <div className="mb-12">
            <span className="cap-animate block text-xs uppercase tracking-[0.4em] text-brand mb-4 font-heading">
              What We Offer
            </span>
            <h2 className="cap-animate text-headline font-heading text-text-primary">
              {aboutContent.capabilities.headline}
            </h2>
          </div>

          <div className="space-y-0">
            {services.map((service) => (
              <div
                key={service.id}
                className="cap-animate border-t border-border py-8 md:py-10 group"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand/40 group-hover:bg-brand transition-colors flex-shrink-0" />
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary group-hover:text-brand transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary max-w-md md:text-right">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <ContactCTA />
    </>
  );
}
