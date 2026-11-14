'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { gsap, ScrollTrigger, EASE } from '@/app/lib/animations/gsapConfig';
import { contactInfo, getWhatsAppUrl, getEmailUrl, siteConfig } from '@/app/data/siteContent';
import { ArrowUp } from 'lucide-react';

interface UnderlineLinkProps {
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  isActive?: boolean;
  isExternal?: boolean;
}

function UnderlineLink({
  href,
  onClick,
  children,
  isActive = false,
  isExternal = false,
}: UnderlineLinkProps) {
  const content = (
    <span className="group relative inline-flex flex-col w-fit">
      <span
        className={`transition-colors duration-300 text-sm ${
          isActive ? 'text-white font-medium' : 'text-text-secondary group-hover:text-white'
        }`}
      >
        {children}
      </span>
      {/* Kinetic Underline: draws in from left to right on hover enter, sweeps out to right on hover leave */}
      <span
        className={`h-[2px] w-full bg-brand rounded-full transition-transform duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left shadow-[0_0_8px_rgba(229,9,20,0.55)] mt-0.5 ${
          isActive ? '!scale-x-100 !origin-left' : ''
        }`}
      />
    </span>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="text-left w-fit cursor-pointer">
        {content}
      </button>
    );
  }

  if (isExternal && href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="w-fit">
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className="w-fit">
        {content}
      </Link>
    );
  }

  return content;
}

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
            <div className="flex flex-col gap-3.5">
              <UnderlineLink onClick={handleServicesClick}>
                Services
              </UnderlineLink>
              <UnderlineLink href="/work" isActive={pathname === '/work'}>
                Work
              </UnderlineLink>
              <UnderlineLink href="/about" isActive={pathname === '/about'}>
                About
              </UnderlineLink>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-animate">
            <h4 className="text-xs uppercase tracking-[0.3em] text-text-muted mb-6 font-heading">Get in Touch</h4>
            <div className="flex flex-col gap-3.5">
              <UnderlineLink href={getWhatsAppUrl()} isExternal>
                WhatsApp
              </UnderlineLink>
              <UnderlineLink href={getEmailUrl('Project Enquiry')} isExternal>
                {contactInfo.email}
              </UnderlineLink>
              {contactInfo.instagram && (
                <UnderlineLink href={contactInfo.instagram} isExternal>
                  Instagram
                </UnderlineLink>
              )}
              {contactInfo.youtube && (
                <UnderlineLink href={contactInfo.youtube} isExternal>
                  YouTube
                </UnderlineLink>
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
            className="group flex items-center gap-2 text-xs uppercase tracking-widest cursor-pointer"
          >
            <span className="relative inline-flex flex-col w-fit">
              <span className="text-text-secondary group-hover:text-white transition-colors duration-300">
                Back to top
              </span>
              <span className="h-[1.5px] w-full bg-brand rounded-full transition-transform duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left shadow-[0_0_8px_rgba(229,9,20,0.5)] mt-0.5" />
            </span>
            <ArrowUp className="w-3.5 h-3.5 text-text-secondary group-hover:text-brand group-hover:-translate-y-1 transition-all duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
