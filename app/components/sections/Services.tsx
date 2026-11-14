'use client';

import { useEffect, useRef, useState } from 'react';
import { services } from '@/app/data/services';
import LiquidGlassServiceHeader from './LiquidGlassServiceHeader';

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Progressive Expansion State: Tracks which services have been revealed.
  // Once a service expands, it remains expanded so content never disappears or causes unexpected shifts.
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(() => new Set());

  // Tracks services manually closed by the user. If the user clicks to close a service header,
  // it stays closed and will NOT auto-expand on scroll until the user clicks on it again.
  const manuallyClosedRef = useRef<Set<number>>(new Set());

  // Trigger progressive expansion when a service heading enters the lower ~26% of the viewport (74% down from top)
  useEffect(() => {
    // 1. Primary: IntersectionObserver with rootMargin calibrated to activate in the lower portion of the viewport (72-75%)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idxStr = entry.target.getAttribute('data-service-index');
            if (idxStr !== null) {
              const idx = parseInt(idxStr, 10);
              // Respect user manual close: do NOT auto-open if user closed it
              if (manuallyClosedRef.current.has(idx)) return;

              setExpandedIndices((prev) => {
                if (prev.has(idx)) return prev;
                const next = new Set(prev);
                next.add(idx);
                return next;
              });
            }
          }
        });
      },
      {
        // Activates when heading reaches ~74% down the viewport (lower portion of the screen)
        rootMargin: '0px 0px -26% 0px',
        threshold: 0,
      }
    );

    titleRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // 2. Secondary: Passive scroll check on requestAnimationFrame for responsive detection during rapid scroll
    let ticking = false;
    const checkPositions = () => {
      const triggerY = window.innerHeight * 0.74; // ~74% down from viewport top
      titleRefs.current.forEach((el, idx) => {
        if (el) {
          // Respect user manual close: do NOT auto-open if user closed it
          if (manuallyClosedRef.current.has(idx)) return;

          const rect = el.getBoundingClientRect();
          // Activate as soon as header top enters the lower viewport area
          if (rect.top <= triggerY && rect.bottom >= 0) {
            setExpandedIndices((prev) => {
              if (prev.has(idx)) return prev;
              const next = new Set(prev);
              next.add(idx);
              return next;
            });
          }
        }
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          checkPositions();
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial check on mount
    checkPositions();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Manual header click allows visitor to toggle an individual service open/closed without affecting other services.
  // If the user clicks on a service header to close it, it will stay closed until they click on it again.
  const handleTitleClick = (idx: number) => {
    setExpandedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        // User explicitly clicked to close this header -> keep it closed until clicked again
        next.delete(idx);
        manuallyClosedRef.current.add(idx);
      } else {
        // User clicked to open it -> remove from manually closed set so it stays open
        next.add(idx);
        manuallyClosedRef.current.delete(idx);
      }
      return next;
    });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full bg-background py-16 md:py-24 border-t border-white/5"
    >
      {/* Section Heading in Natural Document Flow */}
      <div className="px-6 md:px-12 pb-8 md:pb-12">
        <div className="w-full max-w-[1600px] mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-xs uppercase tracking-[0.3em] text-text-muted font-mono">
              CAPABILITIES &amp; EXECUTION
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-text-primary tracking-tight">
            What we offer
          </h2>
        </div>
      </div>

      {/* Stacked Liquid Glass Service Panels in Natural Document Flow */}
      <div className="w-full flex flex-col gap-4 sm:gap-5">
        {services.map((service, idx) => {
          const isExpanded = expandedIndices.has(idx);

          return (
            <div
              key={service.id}
              data-service-index={idx}
              data-expanded={isExpanded ? 'true' : 'false'}
              className="service-panel w-full"
            >
              {/* Liquid Glass Service Header Container */}
              <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12">
                <LiquidGlassServiceHeader
                  title={service.title}
                  index={idx}
                  totalServices={services.length}
                  isExpanded={isExpanded}
                  onClick={() => handleTitleClick(idx)}
                  innerRef={(el) => {
                    titleRefs.current[idx] = el;
                  }}
                />
              </div>

              {/* Progressive Expandable Content — Fluid CSS Grid Height Transition */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: isExpanded ? '1fr' : '0fr',
                  transition: 'grid-template-rows 420ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div className="overflow-hidden min-h-0">
                  <div
                    style={{
                      opacity: isExpanded ? 1 : 0,
                      transform: isExpanded ? 'translateY(0)' : 'translateY(12px)',
                      transition:
                        'opacity 320ms cubic-bezier(0.16, 1, 0.3, 1), transform 320ms cubic-bezier(0.16, 1, 0.3, 1)',
                      transitionDelay: isExpanded ? '50ms' : '0ms',
                    }}
                    className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 pt-3 pb-4"
                  >
                    <div className="rounded-2xl md:rounded-3xl border border-white/10 bg-[#0d0d12]/80 backdrop-blur-xl p-6 sm:p-8 md:p-12 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                        {/* LEFT: Description + Bullets + Tags (Cols 1-7) */}
                        <div className="lg:col-span-7 flex flex-col justify-between">
                          <div>
                            <p className="text-base md:text-lg lg:text-xl text-text-secondary leading-relaxed mb-6 md:mb-8 font-normal">
                              {service.description}
                            </p>

                            {/* Bullets with '↳' */}
                            <div className="flex flex-col gap-3 md:gap-3.5 mb-6 md:mb-8">
                              {service.bullets.map((bullet, bIdx) => (
                                <div key={bIdx} className="flex items-start gap-3">
                                  <span className="text-brand font-bold text-base mt-0.5 select-none leading-none">
                                    ↳
                                  </span>
                                  <span className="text-sm md:text-base text-text-primary leading-relaxed font-sans">
                                    {bullet}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Capabilities tags */}
                          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                            {service.capabilities.map((cap) => (
                              <span
                                key={cap}
                                className="text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-text-secondary font-heading"
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* RIGHT: Visual Showcase Card / Brand Network (Cols 8-12) */}
                        <div className="lg:col-span-5">
                          <div className="bg-black/80 border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl flex flex-col justify-between min-h-[280px] md:min-h-[340px]">
                            {/* Card Header */}
                            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                              <span className="text-xs uppercase tracking-wider text-text-primary font-heading font-semibold">
                                Brand &amp; Creator Network
                              </span>
                              <span className="text-[10px] uppercase tracking-widest text-text-muted font-heading">
                                Verified
                              </span>
                            </div>

                            {/* 3x3 Brand Logos Grid */}
                            <div className="grid grid-cols-3 gap-2.5 md:gap-3 mb-5">
                              {service.brands.map((brand, bIndex) => (
                                <div
                                  key={bIndex}
                                  className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-brand/40 rounded-md p-3 md:p-3.5 flex items-center justify-center text-center transition-all duration-300 group"
                                >
                                  <span className="font-heading font-black tracking-wider text-xs text-text-primary group-hover:text-brand transition-colors">
                                    {brand}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {/* Card Bottom: Metric Highlight */}
                            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                              <span className="text-text-muted font-heading">Performance Benchmark</span>
                              <span className="font-heading font-bold text-brand">
                                {service.metric} • {service.metricLabel}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
