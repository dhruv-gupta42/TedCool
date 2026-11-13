'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, EASE } from '@/app/lib/animations/gsapConfig';
import { getWhatsAppUrl, getEmailUrl, contactInfo } from '@/app/data/siteContent';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onServicesClick: (e: React.MouseEvent) => void;
  pathname: string;
}

const menuLinks = [
  { label: 'Services', href: '/#services', isServices: true },
  { label: 'Work', href: '/work', isServices: false },
  { label: 'About', href: '/about', isServices: false },
];

export default function MobileMenu({ isOpen, onClose, onServicesClick, pathname }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current || !linksRef.current) return;

    const ctx = gsap.context(() => {
      const links = linksRef.current?.querySelectorAll('.menu-link');
      const contactItems = linksRef.current?.querySelectorAll('.menu-contact');

      if (isOpen) {
        gsap.to(menuRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: EASE.smooth,
          onStart: () => {
            if (menuRef.current) menuRef.current.style.pointerEvents = 'auto';
          },
        });

        if (links) {
          gsap.fromTo(
            links,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: EASE.smooth, delay: 0.2 }
          );
        }

        if (contactItems) {
          gsap.fromTo(
            contactItems,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: EASE.smooth, delay: 0.5 }
          );
        }
      } else {
        gsap.to(menuRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: EASE.smooth,
          onComplete: () => {
            if (menuRef.current) menuRef.current.style.pointerEvents = 'none';
          },
        });
      }
    }, menuRef.current);

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-40 bg-background flex flex-col justify-center items-center opacity-0 pointer-events-none md:hidden"
    >
      <div ref={linksRef} className="flex flex-col items-center gap-8">
        {menuLinks.map((link) =>
          link.isServices ? (
            <button
              key={link.label}
              onClick={onServicesClick}
              className="menu-link text-4xl font-heading font-bold uppercase tracking-wider text-text-primary hover:text-brand transition-colors"
            >
              {link.label}
            </button>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className={`menu-link text-4xl font-heading font-bold uppercase tracking-wider transition-colors ${
                pathname === link.href ? 'text-brand' : 'text-text-primary hover:text-brand'
              }`}
            >
              {link.label}
            </Link>
          )
        )}

        <div className="mt-10 flex flex-col items-center gap-3 w-full max-w-xs">
          <span className="text-xs uppercase tracking-[0.3em] text-text-muted font-heading mb-1">
            Connect Us
          </span>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="menu-contact w-full py-3 px-6 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-white flex items-center justify-center gap-2 text-sm font-heading font-medium tracking-wider uppercase hover:bg-[#25D366] transition-colors"
          >
            Chat on WhatsApp
          </a>
          <a
            href={getEmailUrl('Project Enquiry')}
            onClick={onClose}
            className="menu-contact w-full py-3 px-6 rounded-full bg-white/5 border border-white/10 text-text-secondary flex items-center justify-center gap-2 text-sm font-heading font-medium tracking-wider uppercase hover:border-brand hover:text-brand transition-colors"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
