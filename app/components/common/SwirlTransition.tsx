'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from '@/app/lib/animations/gsapConfig';

const SWIRL_PATH =
  'M43 259C296 11.5688 994 -3 922.994 498.259C851.988 999.517 281.229 1004.28 123 767C-35.2287 529.721 179 259 472 259C765 259 792 498.259 659 654C526 809.741 319 755 285 669.001C251 583.001 299 452 496 452C693 452 876.073 639.171 935 937.001';

const DEFAULT_PATH_LENGTH = 5106.26;
const BRAND_RED = '#E50914';

interface SwirlContextValue {
  navigateWithSwirl: (href: string) => void;
  isTransitioning: boolean;
}

const SwirlContext = createContext<SwirlContextValue>({
  navigateWithSwirl: () => {},
  isTransitioning: false,
});

export const useSwirlTransition = () => useContext(SwirlContext);

export default function SwirlTransition({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLDivElement>(null);
  const agencyTextRef = useRef<HTMLDivElement>(null);

  const [isTransitioning, setIsTransitioning] = useState(true);
  const isNavigatingRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Helper to get actual path length
  const getLength = useCallback(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength();
        if (len > 0) return len;
      } catch {
        // Fallback to pre-calculated length
      }
    }
    return DEFAULT_PATH_LENGTH;
  }, []);

  // Reveal transition: unroll the swirl to reveal the page
  const playReveal = useCallback(
    (onComplete?: () => void) => {
      const path = pathRef.current;
      const wrap = wrapRef.current;
      const logo = logoRef.current;
      if (!path || !wrap) {
        onComplete?.();
        return;
      }

      const len = getLength();

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        wrap.style.visibility = 'hidden';
        wrap.style.pointerEvents = 'none';
        setIsTransitioning(false);
        isNavigatingRef.current = false;
        onComplete?.();
        return;
      }

      wrap.style.visibility = 'visible';
      wrap.style.pointerEvents = 'all';

      // Start state: 100% solid red coverage
      path.style.strokeDasharray = `${len} ${len}`;
      path.style.strokeDashoffset = '0px';
      path.setAttribute('stroke-width', '320');

      if (logo) {
        gsap.set(logo, { opacity: 1, scale: 1 });
      }

      const anim = { progress: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          wrap.style.visibility = 'hidden';
          wrap.style.pointerEvents = 'none';
          setIsTransitioning(false);
          isNavigatingRef.current = false;
          onComplete?.();
        },
      });

      // Fade out logo / branding composition smoothly
      if (logo) {
        tl.to(
          logo,
          {
            opacity: 0,
            scale: 0.94,
            duration: 0.35,
            ease: 'power2.out',
          },
          0.05
        );
      }

      // Cinematic swirl unroll (extending slightly to 1.35s for filmic motion)
      tl.to(
        anim,
        {
          progress: 1,
          duration: 1.35,
          ease: 'power2.inOut',
          onUpdate: () => {
            const p = anim.progress;
            path.style.strokeDasharray = `${len} ${len}`;
            path.style.strokeDashoffset = `${-len * p}px`;
            const width = Math.max(0, 320 - 300 * p);
            path.setAttribute('stroke-width', `${width}`);
          },
        },
        0.1
      );

      timelineRef.current = tl;
    },
    [getLength]
  );

  // Cover transition: draw in the swirl and swell to flood screen solid red
  const playCover = useCallback(
    (onComplete?: () => void) => {
      const path = pathRef.current;
      const wrap = wrapRef.current;
      const logo = logoRef.current;
      if (!path || !wrap) {
        onComplete?.();
        return;
      }

      const len = getLength();

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        onComplete?.();
        return;
      }

      wrap.style.visibility = 'visible';
      wrap.style.pointerEvents = 'all';
      setIsTransitioning(true);

      // Ensure inner logo elements are settled
      if (logoImgRef.current && agencyTextRef.current) {
        gsap.set([logoImgRef.current, agencyTextRef.current], {
          scale: 1,
          y: 0,
          opacity: 1,
        });
      }

      // Start empty with thin stroke
      path.style.strokeDasharray = `${len} ${len}`;
      path.style.strokeDashoffset = `${len}px`;
      path.setAttribute('stroke-width', '30');

      if (logo) {
        gsap.set(logo, { opacity: 0, scale: 0.95 });
      }

      const anim = { progress: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          // Snap to solid red
          path.style.strokeDashoffset = '0px';
          path.setAttribute('stroke-width', '320');
          onComplete?.();
        },
      });

      // Rapidly draw the spiral line and swell to 320px
      tl.to(
        anim,
        {
          progress: 1,
          duration: 0.75,
          ease: 'power2.inOut',
          onUpdate: () => {
            const p = anim.progress;
            path.style.strokeDasharray = `${len} ${len}`;
            path.style.strokeDashoffset = `${len * (1 - p)}px`;
            const width = 30 + 290 * p;
            path.setAttribute('stroke-width', `${width}`);
          },
        },
        0
      );

      // Fade in brand logo near completion of cover
      if (logo) {
        tl.to(
          logo,
          {
            opacity: 1,
            scale: 1,
            duration: 0.25,
            ease: 'power2.out',
          },
          0.5
        );
      }

      timelineRef.current = tl;
    },
    [getLength]
  );

  // Programmatic navigation with swirl
  const navigateWithSwirl = useCallback(
    (href: string) => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;

      playCover(() => {
        router.push(href);
      });
    },
    [playCover, router]
  );

  // INITIAL CINEMATIC BRAND INTRO:
  // Pure logo & "CREATIVE AGENCY" kinetic reveal from bottom-centre, hold, then swirl unrolls
  useEffect(() => {
    const logoEl = logoImgRef.current;
    const agencyText = agencyTextRef.current;

    // Set initial entrance state: scale 0 from bottom-centre with downward offset
    if (logoEl && agencyText) {
      gsap.set([logoEl, agencyText], {
        scale: 0,
        y: 45,
        opacity: 0,
        transformOrigin: '50% 100%',
      });
    }

    const masterTl = gsap.timeline();

    // 1. Logo kinetic reveal: emerges gracefully from bottom to center (0.95s)
    if (logoEl) {
      masterTl.to(
        logoEl,
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
        },
        0.12
      );
    }

    // 2. Supporting "CREATIVE AGENCY" text follows with smooth stagger (0.65s)
    if (agencyText) {
      masterTl.to(
        agencyText,
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
        },
        0.42
      );
    }

    // 3. Brand composition hold (0.65s pause) -> coordinate with page readiness -> trigger swirl reveal
    const triggerRevealWhenReady = () => {
      if (typeof document !== 'undefined' && document.readyState !== 'complete') {
        window.addEventListener('load', () => playReveal(), { once: true });
      } else {
        playReveal();
      }
    };

    masterTl.call(
      triggerRevealWhenReady,
      undefined,
      1.8
    );

    return () => {
      masterTl.kill();
    };
  }, [playReveal]);

  const prevPathnameRef = useRef(pathname);

  // When pathname actually changes (route navigation completes), reveal the new page
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      const timer = setTimeout(() => {
        playReveal();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [pathname, playReveal]);

  // Global click interception for internal links
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0 ||
        e.defaultPrevented
      ) {
        return;
      }

      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Ignore external, target=_blank, or special protocols
      if (
        target.target === '_blank' ||
        target.hasAttribute('download') ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      ) {
        return;
      }

      // Check hash-only links on same page (e.g. /#services, #contact)
      const currentPath = window.location.pathname;
      const [targetPath, targetHash] = href.split('#');

      if ((targetPath === '' || targetPath === currentPath) && targetHash) {
        return;
      }

      // Same exact URL -> do nothing
      if (href === currentPath) {
        e.preventDefault();
        return;
      }

      // Valid internal route navigation -> intercept and trigger swirl!
      e.preventDefault();
      navigateWithSwirl(href);
    };

    document.addEventListener('click', handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleDocumentClick, { capture: true });
    };
  }, [navigateWithSwirl]);

  return (
    <SwirlContext.Provider value={{ navigateWithSwirl, isTransitioning }}>
      {/* The Swirl Curtain Overlay */}
      <div
        ref={wrapRef}
        className="fixed inset-0 z-[9999] overflow-hidden pointer-events-auto"
        style={{
          visibility: 'visible',
          backgroundColor: 'transparent',
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{ color: BRAND_RED }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
            fill="none"
            preserveAspectRatio="none"
            className="absolute -top-[15%] -left-[15%] w-[130%] h-[130%]"
          >
            <path
              ref={pathRef}
              d={SWIRL_PATH}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="320"
              style={{
                strokeDasharray: `${DEFAULT_PATH_LENGTH} ${DEFAULT_PATH_LENGTH}`,
                strokeDashoffset: '0px',
              }}
            />
          </svg>
        </div>

        {/* Minimalist Centered Brand Composition: Logo + "CREATIVE AGENCY" */}
        <div
          ref={logoRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 px-6"
        >
          {/* Actual Company Logo Asset */}
          <div
            ref={logoImgRef}
            className="w-56 sm:w-64 md:w-80 lg:w-92 max-w-[85vw] flex items-center justify-center"
            style={{ transformOrigin: '50% 100%' }}
          >
            <img
              src="/images/tedcool-logo-white.png"
              alt="Tedcool Media"
              className="w-full h-auto object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
            />
          </div>

          {/* "CREATIVE AGENCY" text directly underneath */}
          <div
            ref={agencyTextRef}
            className="mt-3 sm:mt-4 text-xs md:text-sm tracking-[0.45em] text-white/90 uppercase font-mono font-medium text-center"
            style={{ transformOrigin: '50% 100%' }}
          >
            Creative Agency
          </div>
        </div>
      </div>

      {children}
    </SwirlContext.Provider>
  );
}
