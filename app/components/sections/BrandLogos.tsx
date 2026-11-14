import React from 'react';

export interface BrandItem {
  id: string;
  name: string;
  logo?: React.ReactNode;
  fallbackText?: string;
  category?: string;
}

// Crisp, authentic SVG logos for industry leaders
export const SpotifyLogo = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current text-[#1DB954]`} aria-label="Spotify">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.435-5.308-1.76-8.792-.963-.335.077-.67-.133-.746-.468-.077-.334.132-.67.467-.746 3.808-.87 7.076-.496 9.72 1.115.295.18.388.563.208.855zm1.226-2.724c-.226.367-.707.482-1.074.256-2.69-1.654-6.79-2.134-9.97-1.168-.413.125-.85-.11-1-.523-.15-.413.11-.85.523-1 3.63-1.103 8.147-.568 11.265 1.36.368.226.483.708.256 1.075zm.105-2.835C14.692 8.95 8.575 8.75 5.01 9.832c-.496.15-1.025-.133-1.176-.63-.15-.496.133-1.025.63-1.176 4.094-1.243 10.85-1.01 14.65 1.246.447.265.593.844.328 1.29-.265.448-.844.594-1.29.328z" />
  </svg>
);

export const NetflixLogo = ({ className = "h-5 w-auto" }: { className?: string }) => (
  <svg viewBox="0 0 111 30" className={`${className} fill-[#E50914]`} aria-label="Netflix">
    <path d="M105.062 14.28L111 30c-1.75-.25-3.5-.4-5.25-.49l-3.48-9.87-3.48 9.53c-1.62-.08-3.25-.1-4.88-.08l5.88-15.09-5.7-14.08h4.81l3.37 9.07 3.38-9.07h4.88l-5.74 14.28zM89.77 0v28.84c-1.65.04-3.3.13-4.95.27V0h4.95zm-9.35 12.33l-4.57 16.94c-1.57.17-3.14.38-4.7.63l5.82-20.9h-6.28V4.99h17.31v4.01h-7.58v3.33zm-18.73-7.34v8.28h7.94v4.01h-7.94v7.71c2.81-.22 5.63-.38 8.46-.48V29c-4.48.16-8.96.44-13.41.83V4.99h13.41v4.01l-8.46-.01zm-15.35 0v19.46c-1.65.17-3.29.38-4.94.63V0h4.94v4.99zm-13.62 0v7.65c2.4-.2 4.81-.34 7.23-.42v4.01c-2.41.08-4.83.21-7.23.41v7.63c3.08-.2 6.18-.34 9.28-.42V29c-4.76.13-9.52.38-14.24.74V4.99h14.24v4.01l-9.28-.01zM4.95 0v17.48L14.77 0h5.2v29.62c-1.66.1-3.32.23-4.97.4V11.23L4.95 29.83C3.3 30.07 1.65 30.34 0 30.64V0h4.95z" />
  </svg>
);

export const NikeLogo = ({ className = "h-6 w-auto" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current text-white`} aria-label="Nike">
    <path d="M21.71 4.54c-.28-.15-.62-.12-.87.08L6.47 16.35c-1.35-1.2-2.58-2.22-3.6-2.97-.9-.66-1.78-.93-2.35-.55-.57.37-.58 1.34.02 2.58 1.05 2.16 3.65 5.56 7.42 5.56 1.84 0 3.73-.87 5.59-2.58C18.66 13.9 22.8 7.3 22 5.2c-.08-.24-.18-.46-.29-.66z" />
  </svg>
);

export const AdidasLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-auto fill-current text-white" aria-label="Adidas">
    <path d="M22.95 19.46L14.54 5.34c-.32-.54-.92-.88-1.55-.88-.63 0-1.23.34-1.55.88L3.02 19.46c-.34.57-.34 1.28 0 1.85.34.57.95.92 1.62.92h16.7c.66 0 1.28-.35 1.61-.92.34-.57.34-1.28 0-1.85zm-9.96-10.9l5.42 9.11H7.56l5.43-9.11z" />
  </svg>
);

export const PumaLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-auto fill-current text-white" aria-label="Puma">
    <path d="M21.5 10.4c-.2-.4-.7-.8-1.3-1.1-.9-.4-2-.6-3.1-.4-.6.1-1.2.3-1.8.6-.6.3-1.1.7-1.5 1.2-.4.5-.7 1.1-.8 1.7-.1.6-.1 1.3.1 1.9.3.9 1 1.7 1.9 2.2.9.5 2 .7 3.1.5 1.1-.2 2.1-.8 2.8-1.6.7-.8 1.1-1.9 1.1-3 0-.7-.2-1.4-.5-2zm-6.2 3.3c0-.6.2-1.2.5-1.7.3-.5.8-.8 1.3-1 .5-.2 1.1-.2 1.6-.1.5.1 1 .4 1.4.8.4.4.6.9.7 1.4.1.5 0 1.1-.2 1.6-.2.5-.5.9-1 1.2-.5.3-1 .4-1.5.4-.6 0-1.1-.2-1.6-.5-.4-.4-.7-.9-.7-1.5-.1-.2-.1-.4-.1-.6zM8.8 8.1c-.8.4-1.4 1-1.9 1.7-.5.7-.7 1.5-.7 2.4 0 .9.3 1.7.8 2.4.5.7 1.2 1.2 2 1.5.8.3 1.7.4 2.6.2.9-.2 1.7-.6 2.3-1.3.6-.7 1-1.5 1.1-2.4.1-.9 0-1.8-.4-2.6-.4-.8-1-1.4-1.8-1.8-.8-.4-1.7-.5-2.6-.4-.9.1-1.7.5-2.4 1.1z" />
  </svg>
);

export const AppleLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-auto fill-current text-white" aria-label="Apple">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.9.04-2 .6-2.64 1.35-.56.65-1.05 1.72-.92 2.76 1.01.08 2.03-.49 2.64-1.24z" />
  </svg>
);

export const YouTubeLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-auto fill-[#FF0000]" aria-label="YouTube">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-auto" aria-label="Google">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

export const PlayStationLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-auto fill-[#003791] text-[#003791]" aria-label="PlayStation">
    <path fill="currentColor" d="M8.91 2.5C7.2 2.5 5.8 3.9 5.8 5.6v12.8c0 1.7 1.4 3.1 3.11 3.1 1.7 0 3.1-1.4 3.1-3.1V5.6c0-1.7-1.4-3.1-3.1-3.1zm0 3.8c.4 0 .7.3.7.7v8.9c-.2-.1-.5-.2-.7-.2-.9 0-1.6.7-1.6 1.6 0 .4.1.7.3.9V7c0-.4.3-.7.7-.7zm10.7 8.3c-.6-.7-1.6-1.2-2.7-1.5-1.1-.3-2.3-.4-3.6-.4v2.5c.9 0 1.7.1 2.4.3.7.2 1.2.5 1.4.8.2.3.2.7 0 1-.2.3-.7.6-1.4.8-.7.2-1.5.3-2.4.3v2.5c1.3 0 2.5-.1 3.6-.4 1.1-.3 2.1-.8 2.7-1.5.6-.7.9-1.6.9-2.7 0-1.1-.3-2-.9-2.7z" />
  </svg>
);

export const OnePlusLogo = ({ className = "text-base" }: { className?: string }) => (
  <div className={`flex items-center gap-2 font-heading font-black text-white ${className}`}>
    <div className="w-6 h-6 rounded-sm bg-[#EB0028] text-white flex items-center justify-center text-xs font-black">
      1
    </div>
    <span className="tracking-wider">ONEPLUS</span>
  </div>
);

export const BoAtLogo = ({ className = "text-base" }: { className?: string }) => (
  <div className={`flex items-center gap-2 font-heading font-black text-white tracking-wider ${className}`}>
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#E50000]">
      <path d="M12 2L4 15h16L12 2zm0 4.5l4.5 7.5h-9L12 6.5zM2 18l3 4h14l3-4H2z" />
    </svg>
    <span>bo<span className="text-[#E50000]">A</span>t</span>
  </div>
);

export const SwiggyLogo = () => (
  <div className="flex items-center gap-2 font-heading font-black text-white text-base">
    <div className="w-6 h-6 rounded-full bg-[#FC8019] flex items-center justify-center text-white text-xs font-black">
      S
    </div>
    <span className="tracking-wide">SWIGGY</span>
  </div>
);

export const ZomatoLogo = () => (
  <div className="font-heading italic font-black text-[#CB202D] text-lg tracking-wider">
    zomato
  </div>
);

export const RedBullLogo = ({ className = "text-sm" }: { className?: string }) => (
  <div className={`flex items-center gap-2.5 font-heading font-black text-white tracking-widest ${className}`}>
    <span className="w-3 h-3 rounded-full bg-[#ED1C24] inline-block shadow-[0_0_8px_#ED1C24]" />
    <span>RED BULL</span>
  </div>
);

export const PepsiLogo = () => (
  <div className="flex items-center gap-2 font-heading font-black text-white text-base tracking-wider">
    <div className="w-5 h-5 rounded-full bg-gradient-to-b from-[#004B93] via-white to-[#E32934] border border-white/20" />
    <span>PEPSI</span>
  </div>
);

export const TataLogo = () => (
  <div className="flex items-center gap-2 font-heading font-black text-white text-sm tracking-[0.25em]">
    <div className="w-5 h-5 rounded-full border border-blue-400/80 flex items-center justify-center text-[10px] text-blue-400">
      T
    </div>
    <span>TATA</span>
  </div>
);

export const CredLogo = () => (
  <div className="flex items-center gap-1.5 font-heading font-black text-white text-sm tracking-[0.3em]">
    <div className="w-4 h-4 rounded-sm border border-white flex items-center justify-center text-[9px]">
      ✦
    </div>
    <span>CRED</span>
  </div>
);

export const LevisLogo = () => (
  <div className="px-2.5 py-0.5 rounded-sm bg-[#C41230] text-white font-serif font-black text-xs tracking-wider">
    Levi&apos;s
  </div>
);

export const IkeaLogo = () => (
  <div className="px-2.5 py-1 rounded-sm bg-[#0051BA] text-[#FFDA1A] font-heading font-black text-xs tracking-widest border border-[#FFDA1A]/40">
    IKEA
  </div>
);

export const JioHotstarLogo = () => (
  <div className="flex items-center gap-1.5 font-heading font-bold text-white text-sm tracking-wide">
    <span className="text-brand font-black text-base">✦</span>
    <span>JioHotstar</span>
  </div>
);

export const PondsLogo = () => (
  <div className="font-serif tracking-[0.3em] text-white/90 text-sm font-semibold">
    POND&apos;S
  </div>
);

export const DotAndKeyLogo = () => (
  <div className="font-heading font-black text-xs tracking-[0.2em] text-white">
    DOT <span className="text-brand">&amp;</span> KEY
  </div>
);

export const WishCareLogo = () => (
  <div className="flex items-center gap-1.5 font-heading font-semibold text-white/90 text-sm tracking-wider">
    <span className="text-emerald-400 text-xs">🌿</span>
    <span>WishCare</span>
  </div>
);

export const LiquidIVLogo = () => (
  <div className="flex items-center gap-1.5 font-heading font-black text-xs tracking-[0.15em] text-white">
    <span className="w-3.5 h-3.5 rounded-sm border border-cyan-400 flex items-center justify-center text-[8px] text-cyan-400">
      ⬡
    </span>
    <span>LIQUID I.V.</span>
  </div>
);

export const UrbanCompanyLogo = () => (
  <div className="flex items-center gap-1.5 font-heading font-bold text-white text-xs tracking-wider">
    <div className="w-4 h-4 rounded-sm bg-white text-black flex items-center justify-center text-[9px] font-black">
      uc
    </div>
    <span>Urban Company</span>
  </div>
);

export interface BrandMarqueeItem {
  id: string;
  name: string;
  node: React.ReactNode;
}

export const marqueeSelectedBrands: BrandMarqueeItem[] = [
  { id: 'nike', name: 'Nike', node: <NikeLogo className="h-9 sm:h-10 md:h-11 w-auto" /> },
  { id: 'spotify', name: 'Spotify', node: <SpotifyLogo className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11" /> },
  { id: 'netflix', name: 'Netflix', node: <NetflixLogo className="h-8 sm:h-9 md:h-10 w-auto" /> },
  { id: 'oneplus', name: 'OnePlus', node: <OnePlusLogo className="text-xl sm:text-2xl md:text-3xl" /> },
  { id: 'boat', name: 'boAt', node: <BoAtLogo className="text-xl sm:text-2xl md:text-3xl" /> },
  { id: 'redbull', name: 'Red Bull', node: <RedBullLogo className="text-lg sm:text-xl md:text-2xl" /> },
];

export const brandMarqueeList: BrandMarqueeItem[] = [
  { id: 'spotify', name: 'Spotify', node: <SpotifyLogo /> },
  { id: 'netflix', name: 'Netflix', node: <NetflixLogo /> },
  { id: 'nike', name: 'Nike', node: <NikeLogo /> },
  { id: 'adidas', name: 'Adidas', node: <AdidasLogo /> },
  { id: 'puma', name: 'Puma', node: <PumaLogo /> },
  { id: 'apple', name: 'Apple', node: <AppleLogo /> },
  { id: 'youtube', name: 'YouTube', node: <YouTubeLogo /> },
  { id: 'google', name: 'Google', node: <GoogleLogo /> },
  { id: 'playstation', name: 'PlayStation', node: <PlayStationLogo /> },
  { id: 'oneplus', name: 'OnePlus', node: <OnePlusLogo /> },
  { id: 'boat', name: 'boAt', node: <BoAtLogo /> },
  { id: 'swiggy', name: 'Swiggy', node: <SwiggyLogo /> },
  { id: 'zomato', name: 'Zomato', node: <ZomatoLogo /> },
  { id: 'redbull', name: 'Red Bull', node: <RedBullLogo /> },
  { id: 'pepsi', name: 'Pepsi', node: <PepsiLogo /> },
  { id: 'tata', name: 'Tata', node: <TataLogo /> },
  { id: 'cred', name: 'Cred', node: <CredLogo /> },
  { id: 'levis', name: "Levi's", node: <LevisLogo /> },
  { id: 'ikea', name: 'Ikea', node: <IkeaLogo /> },
  { id: 'jiohotstar', name: 'JioHotstar', node: <JioHotstarLogo /> },
  { id: 'ponds', name: "Pond's", node: <PondsLogo /> },
  { id: 'dotandkey', name: 'Dot & Key', node: <DotAndKeyLogo /> },
  { id: 'wishcare', name: 'WishCare', node: <WishCareLogo /> },
  { id: 'liquidiv', name: 'Liquid I.V.', node: <LiquidIVLogo /> },
  { id: 'urbancompany', name: 'Urban Company', node: <UrbanCompanyLogo /> },
];
