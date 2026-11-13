'use client';

import { useEffect } from 'react';

export default function ServicesScrollHandler() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#services') {
      const timeout = setTimeout(() => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, []);

  return null;
}
