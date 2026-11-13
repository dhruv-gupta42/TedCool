'use client';

import { Play } from 'lucide-react';

interface VideoPlaceholderProps {
  title: string;
  category: string;
  aspectRatio?: string;
  className?: string;
}

export default function VideoPlaceholder({
  title,
  category,
  aspectRatio = '16 / 9',
  className = '',
}: VideoPlaceholderProps) {
  return (
    <div
      className={`video-placeholder rounded-sm ${className}`}
      style={{ aspectRatio }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
        <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-brand/40 rounded-full flex items-center justify-center mb-6 group-hover:border-brand transition-colors duration-500">
          <Play className="w-6 h-6 md:w-8 md:h-8 text-brand/60 ml-1" />
        </div>
        <span className="text-xs uppercase tracking-[0.3em] text-text-muted mb-2 font-heading">
          {category}
        </span>
        <span className="text-sm text-text-secondary text-center">
          Project Video Coming Soon
        </span>
      </div>

      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-brand/20" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-brand/20" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-brand/20" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-brand/20" />
    </div>
  );
}
