'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { services } from '@/app/data/services';
import { motion, AnimatePresence } from 'framer-motion';

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const isClickingRef = useRef(false);

  // Robust scroll tracking that never triggers layout feedback loops
  // and stays locked on the last service when scrolling past into Quote
  const handleScroll = useCallback(() => {
    if (isClickingRef.current) return;
    const section = sectionRef.current;
    if (!section) return;

    const triggerY = window.innerHeight * 0.55;
    const sectionRect = section.getBoundingClientRect();

    // If user is above the section (in Selected Work), default to first service
    if (sectionRect.top > triggerY) {
      setActiveIdx(0);
      return;
    }

    // CRITICAL: When scrolling past the section down into Quote,
    // KEEP the last service active! NEVER collapse to -1.
    // This permanently prevents any layout shift, jump, or glitch when entering Quote.
    if (sectionRect.bottom < triggerY) {
      setActiveIdx(services.length - 1);
      return;
    }

    // Within the section: find the highest panel whose title has reached triggerY
    let currentIdx = 0;
    const panels = panelRefs.current;
    for (let i = 0; i < panels.length; i++) {
      const panel = panels[i];
      if (panel) {
        const pRect = panel.getBoundingClientRect();
        if (pRect.top <= triggerY) {
          currentIdx = i;
        }
      }
    }

    setActiveIdx(currentIdx);
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run on mount
    handleScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  const handleTitleClick = (idx: number) => {
    isClickingRef.current = true;
    setActiveIdx(idx);

    // Release click lock after animation completes
    setTimeout(() => {
      isClickingRef.current = false;
    }, 600);
  };

  return (
    <section id="services" ref={sectionRef} className="relative w-full bg-background pb-20 md:pb-28">
      {/* Section Heading */}
      <div className="px-6 md:px-12 pt-24 md:pt-32 pb-8 md:pb-12">
        <div className="w-full max-w-[1600px] mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-text-primary tracking-tight">
            What we offer
          </h2>
        </div>
      </div>

      {/* Stacked Service Panels in Normal Flow */}
      <div className="w-full flex flex-col">
        {services.map((service, idx) => {
          const isActive = activeIdx === idx;

          return (
            <div
              key={service.id}
              ref={(el) => {
                panelRefs.current[idx] = el;
              }}
              className="service-panel w-full"
            >
              {/* Red Title Bar — Always Visible */}
              <div
                onClick={() => handleTitleClick(idx)}
                className="w-full bg-brand cursor-pointer hover:bg-brand-light transition-colors duration-200 select-none"
              >
                <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-4 md:py-5 flex items-center justify-between">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white tracking-tight">
                    {service.title}
                  </h3>

                  <div className="flex items-center gap-2 text-white/80 text-sm font-heading font-medium">
                    <span className="hidden sm:inline text-xs uppercase tracking-wider">
                      {isActive ? 'Active' : 'Click to View'}
                    </span>
                    <span
                      className="text-lg transition-transform duration-300 inline-block font-bold"
                      style={{
                        transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}
                    >
                      ↳
                    </span>
                  </div>
                </div>
              </div>

              {/* Expandable Content Area */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key={`content-${service.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: {
                        duration: 0.45,
                        ease: [0.25, 0.1, 0.25, 1],
                      },
                      opacity: {
                        duration: 0.3,
                        delay: 0.08,
                      },
                    }}
                    className="overflow-hidden border-b border-white/10 bg-surface/30"
                  >
                    <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-10 md:py-14">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                        {/* LEFT: Description + Bullets + Tags (Cols 1-7) */}
                        <div className="lg:col-span-7 flex flex-col justify-between">
                          <div>
                            <p className="text-base md:text-xl text-text-secondary leading-relaxed mb-8 font-normal">
                              {service.description}
                            </p>

                            {/* Bullets with '↳' */}
                            <div className="flex flex-col gap-3.5 mb-8">
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
                          <div className="bg-black/80 border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl flex flex-col justify-between min-h-[300px] md:min-h-[360px]">
                            {/* Card Header */}
                            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                              <span className="text-xs uppercase tracking-wider text-text-primary font-heading font-semibold">
                                Brand & Creator Network
                              </span>
                              <span className="text-[10px] uppercase tracking-widest text-text-muted font-heading">
                                Verified
                              </span>
                            </div>

                            {/* 3x3 Brand Logos Grid (Matching Inspiration Image) */}
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
