'use client';

import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import VideoPlaceholder from './VideoPlaceholder';

interface ProjectVideoProps {
  title: string;
  category: string;
  videoUrl?: string;
  posterImage?: string;
  aspectRatio?: string;
  className?: string;
}

export default function ProjectVideo({
  title,
  category,
  videoUrl,
  posterImage,
  aspectRatio = '16 / 9',
  className = '',
}: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videoUrl) {
    return (
      <VideoPlaceholder
        title={title}
        category={category}
        aspectRatio={aspectRatio}
        className={className}
      />
    );
  }

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-sm bg-surface-elevated cursor-pointer group ${className}`}
      style={{ aspectRatio }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterImage}
        playsInline
        muted
        loop
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Play/Pause overlay */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
        isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
      } bg-black/30`}>
        <div className="w-16 h-16 border-2 border-white/40 rounded-full flex items-center justify-center">
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </div>
      </div>
    </div>
  );
}
