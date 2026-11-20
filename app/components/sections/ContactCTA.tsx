'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, EASE, DURATION } from '@/app/lib/animations/gsapConfig';
import { contactCTAContent, contactInfo, getEmailUrl, getWhatsAppUrl } from '@/app/data/siteContent';
import { WhatsAppIcon } from '@/app/components/common/SocialIcons';
import {
  Mail,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';

interface ContactCTAProps {
  headline?: React.ReactNode;
  description?: string;
}

export default function ContactCTA({ headline, description }: ContactCTAProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  // GSAP Entrance Animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.contact-reveal'),
        { y: 35, opacity: 0 },
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

  // Copy email to clipboard
  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-16 md:py-24 px-6 md:px-12 w-full flex flex-col justify-between overflow-hidden bg-[#070707] text-[#F5F5F5] border-t border-white/10 scroll-mt-24"
    >
      {/* Ambient background lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[750px] h-[750px] bg-brand/[0.08] rounded-full blur-[170px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[650px] h-[650px] bg-brand/[0.05] blur-[160px]" />
      </div>

      <div className="w-full max-w-[1600px] mx-auto relative z-10 flex flex-col justify-between h-full gap-12 md:gap-16 my-auto">
        
        {/* Main Grid: Headline & Narrative (Left) + Circular Channel Buttons (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-auto">
          
          {/* Left Column: Headline & narrative */}
          <div className="lg:col-span-7 contact-reveal">
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white tracking-tight leading-[1.02] mb-8">
              {headline || (
                <>
                  HAVE A PROJECT<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-rose-500 to-red-600">
                    IN MIND?
                  </span>
                </>
              )}
            </h2>

            <p className="text-lg md:text-2xl text-zinc-300 leading-relaxed max-w-2xl font-light">
              {description || (
                <>
                  {contactCTAContent.description} Reach out directly and let&apos;s build culture-defining work that sets your brand apart.
                </>
              )}
            </p>
          </div>

          {/* Right Column: Direct Channels with Circular Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8 contact-reveal">
            
            {/* WhatsApp Channel */}
            <div className="flex items-center gap-5 sm:gap-6 group">
              {/* Circular button IS the logo itself */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#121212] border border-white/15 hover:border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_30px_rgba(37,211,102,0.35)] cursor-pointer"
              >
                <WhatsAppIcon className="w-8 h-8 sm:w-9 sm:h-9" />
              </a>

              {/* Text metadata */}
              <div className="flex flex-col">
                <span className="text-xs uppercase font-mono tracking-wider text-[#25D366] font-semibold mb-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  Instant Chat • &lt; 15m
                </span>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl sm:text-3xl font-heading font-bold text-white group-hover:text-[#25D366] transition-colors flex items-center gap-2"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-[#25D366] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </a>
              </div>
            </div>

            {/* Email Channel */}
            <div className="flex items-center gap-5 sm:gap-6 group">
              {/* Circular button IS the logo itself */}
              <a
                href={getEmailUrl('Project Enquiry', 'Hello Tedcool Media,\n\nI would like to discuss a project.')}
                aria-label="Send an Email"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#121212] border border-white/15 hover:border-brand text-brand hover:bg-brand hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_30px_rgba(200,0,0,0.4)] cursor-pointer"
              >
                <Mail className="w-8 h-8 sm:w-9 sm:h-9" />
              </a>

              {/* Text metadata */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="text-xs uppercase font-mono tracking-wider text-brand font-semibold">
                    Direct Email • &lt; 2h
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-2 py-0.5 rounded bg-white/[0.05] hover:bg-white/15 text-zinc-400 hover:text-white text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer"
                    title="Copy email address"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={getEmailUrl('Project Enquiry', 'Hello Tedcool Media,\n\nI would like to discuss a project.')}
                  className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white group-hover:text-brand transition-colors flex items-center gap-2"
                >
                  <span className="truncate sm:overflow-visible">{contactInfo.email}</span>
                  <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-brand group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Trust & Response Metrics */}
        <div className="contact-reveal pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-zinc-400">
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
