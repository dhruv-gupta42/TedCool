'use client';

import { useState } from 'react';
import TedcoolPreloader from '@/app/components/ui/tedcool-preloader';

export default function Preloader() {
  const [done, setDone] = useState(false);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-[#080808]">
      <TedcoolPreloader
        word="TEDCOOL"
        caption="we create what moves the world"
        durationMs={3000}
        fan={0.65}
        weight={0.90}
        palette={{
          paper: '#080808',
          ink: '#F5F5F5',
          sun: '#E50914',
          core: '#800000',
          glow: '#FFFFFF',
        }}
        height="100vh"
        onComplete={() => {
          window.dispatchEvent(new Event('tedcool:preloader-complete'));
          setDone(true);
        }}
      />
    </div>
  );
}
