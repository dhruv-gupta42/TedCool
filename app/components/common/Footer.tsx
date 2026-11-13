'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { gsap, ScrollTrigger, EASE } from '@/app/lib/animations/gsapConfig';
import { contactInfo, getWhatsAppUrl, getEmailUrl, siteConfig } from '@/app/data/siteContent';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer.querySelectorAll('.footer-animate'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === '/') {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#services');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="bg-background border-t border-border">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2 footer-animate">
            <Image
              src="/images/logo.svg"
              alt="Tedcool Media"
              width={140}
              height={70}
              className="h-10 w-auto mb-6"
            />
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="footer-animate">
            <h4 className="text-xs uppercase tracking-[0.3em] text-text-muted mb-6 font-heading">Navigation</h4>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleServicesClick}
                className="text-text-secondary hover:text-brand transition-colors text-sm text-left"
              >
                Services
              </button>
              <Link href="/work" className="text-text-secondary hover:text-brand transition-colors text-sm">
                Work
              </Link>
              <Link href="/about" className="text-text-secondary hover:text-brand transition-colors text-sm">
                About
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-animate">
            <h4 className="text-xs uppercase tracking-[0.3em] text-text-muted mb-6 font-heading">Get in Touch</h4>
            <div className="flex flex-col gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-brand transition-colors text-sm"
              >
                WhatsApp
              </a>
              <a
                href={getEmailUrl('Project Enquiry')}
                className="text-text-secondary hover:text-brand transition-colors text-sm"
              >
                {contactInfo.email}
              </a>
              {contactInfo.instagram && (
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-brand transition-colors text-sm"
                >
                  Instagram
                </a>
              )}
              {contactInfo.youtube && (
                <a
                  href={contactInfo.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-brand transition-colors text-sm"
                >
                  YouTube
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-animate mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            &copy; 2025 {siteConfig.name}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-text-secondary hover:text-brand transition-colors text-xs uppercase tracking-widest group"
          >
            Back to top
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
