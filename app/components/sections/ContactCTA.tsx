'use client';

import { useEffect, useRef } from 'react';
import { gsap, EASE, DURATION } from '@/app/lib/animations/gsapConfig';
import { contactCTAContent, getWhatsAppUrl, getEmailUrl, contactInfo } from '@/app/data/siteContent';
import { MessageCircle, Mail, ArrowUpRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface ContactCTAProps {
  headline?: React.ReactNode;
  description?: string;
}

export default function ContactCTA({ headline, description }: ContactCTAProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.cta-animate'),
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
      className="min-h-screen py-16 md:py-20 px-6 md:px-12 w-full flex flex-col justify-between relative overflow-hidden bg-surface-elevated/30 border-t border-white/10"
    >
      {/* Ambient red and warm brand glow across the stage */}
      <div className="absolute top-1/4 right-1/4 w-[750px] h-[750px] bg-brand/[0.08] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[650px] h-[650px] bg-brand/[0.05] blur-[160px] pointer-events-none" />

      {/* Container filling the full vertical height of the section */}
      <div
        className="w-full max-w-[1600px] mx-auto my-auto flex flex-col justify-center h-full relative z-10 gap-12 md:gap-16"
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        {/* Main Grid: Grand Typography (Left) + Direct Channels (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center my-auto">
          {/* Left: Headline & narrative */}
          <div className="lg:col-span-7">
            <h2 className="cta-animate text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-text-primary tracking-tight leading-[1.02] mb-8">
              {headline || (
                <>
                  HAVE A PROJECT<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-rose-500 to-red-600">
                    IN MIND?
                  </span>
                </>
              )}
            </h2>

            <p className="cta-animate text-lg md:text-2xl text-text-secondary leading-relaxed max-w-2xl">
              {description || (
                <>
                  {contactCTAContent.description} Reach out directly and let&apos;s build culture-defining work that sets your brand apart.
                </>
              )}
            </p>
          </div>

          {/* Right: Direct communication channels */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* WhatsApp Card */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-animate group p-8 md:p-10 bg-surface/90 hover:bg-[#25D366]/10 border border-white/10 hover:border-[#25D366]/50 rounded-sm transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.15)]"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] group-hover:scale-110 group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#25D366] font-heading font-semibold block mb-1">
                    Instant Chat
                  </span>
                  <span className="text-2xl md:text-3xl font-heading font-bold text-text-primary group-hover:text-white transition-colors">
                    {contactCTAContent.whatsappLabel}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-7 h-7 text-text-muted group-hover:text-[#25D366] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>

            {/* Email Card */}
            <a
              href={getEmailUrl('Project Enquiry', 'Hello Tedcool Media,\n\nI would like to discuss a project.')}
              className="cta-animate group p-8 md:p-10 bg-surface/90 hover:bg-brand/10 border border-white/10 hover:border-brand/50 rounded-sm transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-[0_0_30px_rgba(200,0,0,0.15)]"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center text-brand group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all duration-300">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-brand font-heading font-semibold block mb-1">
                    Direct Email
                  </span>
                  <span className="text-2xl md:text-3xl font-heading font-bold text-text-primary group-hover:text-white transition-colors">
                    {contactInfo.email}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-7 h-7 text-text-muted group-hover:text-brand group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
          </div>
        </div>

        {/* Bottom Trust & Response Metrics */}
        <div className="cta-animate pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-text-secondary">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-brand" />
            <span>Fast turnaround • Responses within 2 hours</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-brand" />
            <span>Direct collaboration with Creative Directors</span>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-brand" />
            <span>End-to-end bespoke production</span>
          </div>
        </div>
      </div>
    </section>
  );
}
