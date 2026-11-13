'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const EASE = {
  smooth: 'power3.out',
  smoothInOut: 'power3.inOut',
  sharp: 'power4.out',
  elastic: 'elastic.out(1, 0.5)',
  bounce: 'bounce.out',
  expo: 'expo.out',
  expoInOut: 'expo.inOut',
} as const;

export const DURATION = {
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
  verySlow: 1.8,
} as const;

export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
  text: 0.03,
} as const;
