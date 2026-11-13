'use client';

interface TickerProps {
  items?: string[];
  speed?: 'normal' | 'fast';
  direction?: 'left' | 'right';
  className?: string;
}

const defaultItems = [
  'SOCIAL MEDIA MARKETING',
  'INFLUENCER CAMPAIGNS',
  'TALENT MANAGEMENT',
  'CINEMATIC VIDEO PRODUCTION',
  'VIRAL STRATEGY',
  'CREATOR ACCELERATION',
  'BRAND ARCHITECTURE',
];

export default function Ticker({
  items = defaultItems,
  speed = 'normal',
  direction = 'left',
  className = '',
}: TickerProps) {
  return (
    <div className={`relative overflow-hidden py-4 border-y border-white/10 bg-surface/50 backdrop-blur-sm select-none ${className}`}>
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        className={`flex whitespace-nowrap will-change-transform ${
          direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
        }`}
        style={{ animationDuration: speed === 'fast' ? '25s' : '40s' }}
      >
        {/* Quadrupled for seamless infinite loop */}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center mx-6">
            <span className="text-sm md:text-base font-heading font-bold uppercase tracking-[0.25em] text-text-primary/90 hover:text-brand transition-colors">
              {item}
            </span>
            <span className="ml-6 text-brand text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
