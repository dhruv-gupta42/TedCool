'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { gsap, EASE, DURATION } from '@/app/lib/animations/gsapConfig';
import { MessageCircle, Mail, ChevronDown } from 'lucide-react';
import { getWhatsAppUrl, getEmailUrl, contactInfo } from '@/app/data/siteContent';
import MobileMenu from './MobileMenu';

const navLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Initial entrance animation
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        nav,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATION.normal, ease: EASE.smooth, delay: 0.5 }
      );
    }, nav);

    return () => ctx.revert();
  }, []);

  // Smart hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const nav = navRef.current;
          if (!nav) return;

          // Never hide if mobile menu is open
          if (isMobileMenuOpen) {
            ticking = false;
            return;
          }

          // At top of page -> always visible
          if (currentScrollY <= 60) {
            gsap.to(nav, { y: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
          } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down -> hide navbar
            gsap.to(nav, { y: -100, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
            setIsConnectOpen(false);
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up -> show navbar
            gsap.to(nav, { y: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
          }

          lastScrollY = Math.max(currentScrollY, 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  // Close connect dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (connectRef.current && !connectRef.current.contains(e.target as Node)) {
        setIsConnectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === '/') {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#services');
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove('mobile-menu-open');
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between opacity-0"
        style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(8, 8, 8, 0.85)' }}
      >
        {/* LEFT: Logo + Nav Links */}
        <div className="flex items-center gap-10">
          <Link href="/" className="relative z-50" onClick={closeMobileMenu}>
            <Image
              src="/images/logo.svg"
              alt="Tedcool Media"
              width={140}
              height={70}
              className="h-10 w-auto md:h-12"
              preload
            />
          </Link>

          {/* Desktop Nav Links — next to logo */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.href === '/#services' ? (
                <button
                  key={link.label}
                  onClick={handleServicesClick}
                  className="text-sm uppercase tracking-[0.2em] text-text-secondary hover:text-brand transition-colors duration-300 font-heading"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm uppercase tracking-[0.2em] transition-colors duration-300 font-heading ${
                    pathname === link.href
                      ? 'text-brand'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>

        {/* RIGHT: Connect Us Button */}
        <div className="hidden md:flex items-center">
          <div ref={connectRef} className="relative">
            <button
              onClick={() => setIsConnectOpen(!isConnectOpen)}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand hover:bg-brand-light text-white text-xs uppercase tracking-[0.2em] font-heading font-medium rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(200,0,0,0.3)] hover:shadow-[0_0_25px_rgba(200,0,0,0.5)]"
            >
              Connect Us
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isConnectOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            <div
              className={`absolute top-full right-0 mt-3 w-64 bg-surface-elevated/95 backdrop-blur-xl border border-white/10 rounded-md shadow-2xl overflow-hidden transition-all duration-300 z-50 ${
                isConnectOpen
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="px-4 py-2 bg-white/[0.03] border-b border-white/5">
                <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted font-heading font-semibold">
                  Get In Touch
                </span>
              </div>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsConnectOpen(false)}
                className="flex items-center gap-3.5 px-5 py-4 text-sm text-text-primary hover:text-brand hover:bg-white/[0.04] transition-all duration-300 border-b border-white/5 group"
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-heading font-medium text-xs uppercase tracking-wider text-white group-hover:text-brand">WhatsApp</div>
                  <div className="text-[11px] text-text-muted">Instant response chat</div>
                </div>
              </a>
              <a
                href={getEmailUrl('Project Enquiry')}
                onClick={() => setIsConnectOpen(false)}
                className="flex items-center gap-3.5 px-5 py-4 text-sm text-text-primary hover:text-brand hover:bg-white/[0.04] transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-heading font-medium text-xs uppercase tracking-wider text-white group-hover:text-brand">Email Us</div>
                  <div className="text-[11px] text-text-muted">{contactInfo.email}</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="relative z-50 md:hidden flex flex-col items-end gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[2px] bg-text-primary transition-all duration-300 ${
              isMobileMenuOpen ? 'w-6 rotate-45 translate-y-[5px]' : 'w-6'
            }`}
          />
          <span
            className={`block h-[2px] bg-text-primary transition-all duration-300 ${
              isMobileMenuOpen ? 'w-0 opacity-0' : 'w-4'
            }`}
          />
          <span
            className={`block h-[2px] bg-text-primary transition-all duration-300 ${
              isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[5px]' : 'w-6'
            }`}
          />
        </button>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        onServicesClick={handleServicesClick}
        pathname={pathname}
      />
    </>
  );
}
