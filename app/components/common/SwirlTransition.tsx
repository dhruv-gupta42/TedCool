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
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const preloaderElementsRef = useRef<HTMLDivElement>(null);

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

      // Fade out logo / preloader UI
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

      // Swirl unroll (matching extrafazant's power1/power2 curve)
      tl.to(
        anim,
        {
          progress: 1,
          duration: 1.25,
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

      // Hide preloader counter elements during route transitions (clean typography only)
      if (preloaderElementsRef.current) {
        preloaderElementsRef.current.style.display = 'none';
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

  // INITIAL PRELOADER: Holds for exactly 2 seconds before the swirl transition reveals the site
  useEffect(() => {
    const counter = counterRef.current;
    const progressLine = progressLineRef.current;

    // Animate the 00% -> 100% counter and hairline progress bar across the 2-second hold
    const counterObj = { value: 0 };
    const counterTween = gsap.to(counterObj, {
      value: 100,
      duration: 1.85,
      ease: 'power1.inOut',
      onUpdate: () => {
        if (counter) {
          const val = Math.floor(counterObj.value);
          counter.textContent = `${val < 10 ? '0' + val : val}%`;
        }
        if (progressLine) {
          progressLine.style.width = `${counterObj.value}%`;
        }
      },
    });

    // Hold on screen for 2.0 seconds before starting the swirl transition unroll
    const timer = setTimeout(() => {
      playReveal();
    }, 2000);

    return () => {
      clearTimeout(timer);
      counterTween.kill();
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

        {/* Minimalist Centered Brand Monogram & 2-Second Preloader Elements */}
        <div
          ref={logoRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 px-6"
        >
          <div className="font-heading font-black text-white text-4xl md:text-6xl tracking-[0.35em] uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            TEDCOOL
          </div>
          <div className="mt-2 text-xs md:text-sm tracking-[0.45em] text-white/85 uppercase font-mono font-medium">
            Creative Agency
          </div>

          {/* Preloader Counter & Progress Indicator (active during the 2s preloader) */}
          <div
            ref={preloaderElementsRef}
            className="mt-8 flex flex-col items-center gap-3 w-48 max-w-full"
          >
            {/* Hairline progress bar */}
            <div className="w-full h-[1.5px] bg-white/20 rounded-full overflow-hidden">
              <div
                ref={progressLineRef}
                className="h-full bg-white transition-all duration-75"
                style={{ width: '0%' }}
              />
            </div>
            {/* Minimalist 00% -> 100% Counter */}
            <span
              ref={counterRef}
              className="text-white/80 font-mono text-xs tracking-[0.25em]"
            >
              00%
            </span>
          </div>
        </div>
      </div>

      {children}
    </SwirlContext.Provider>
  );
}
