'use client';

import WorkCarousel from '@/app/components/ui/work-carousel';
import type { Slide } from '@/app/components/ui/work-carousel';
import { getFeaturedProjects } from '@/app/data/projects';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

// Unsplash images that match each project's vibe — verified, high-quality landscape/creative shots
const U = (id: string) =>
  'https://images.unsplash.com/photo-' + id + '?q=80&w=1800&auto=format&fit=crop';

// Map project data into Polaroid carousel slides
function buildSlides(): Slide[] {
  const projects = getFeaturedProjects();

  // Curated Unsplash images matching each project's theme
  const unsplashImages: Record<string, string> = {
    'project-01': U('1611162617474-5b21e879e113'), // social media / viral campaign
    'project-02': U('1516321497487-e288fb19713f'), // creator / influencer content
    'project-03': U('1492691527719-9d1e07e534b4'), // cinematic video production
    'project-04': U('1460925895917-afdab827c52f'), // digital transformation
    'project-05': U('1522202176988-66273c2fd55f'), // talent / personal branding
    'project-06': U('1533750516457-a7f11a37be4d'), // campaign / marketing visuals
    'project-07': U('1536240478700-b869070f9279'), // motion design / video
    'project-08': U('1559136555-9303baea8ebd'), // brand evolution / growth
  };

  return projects.map((p) => ({
    image: unsplashImages[p.id] || p.coverImage,
    video: p.videoUrl && p.videoUrl.trim() !== '' ? p.videoUrl : undefined,
    poster: p.posterImage || p.coverImage,
    title: p.title,
    caption: `${p.client} — ${p.category}`,
    alt: `${p.title} for ${p.client}`,
  }));
}

export default function SelectedWork() {
  const slides = buildSlides();

  return (
    <section className="relative">
      {/* Section header */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 md:px-12 lg:px-16 pt-8 md:pt-12">
        <div className="w-full max-w-[1700px] mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-xs uppercase tracking-[0.3em] text-text-muted font-mono">
                Featured Projects
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-text-primary tracking-tight">
              SELECTED WORK
            </h2>
          </div>

          <Link
            href="/work"
            className="group flex items-center gap-2 text-xs md:text-sm font-heading uppercase tracking-[0.2em] text-text-primary hover:text-brand transition-colors duration-300"
          >
            <span>View All Work</span>
            <ArrowUpRight className="w-4 h-4 text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Work Showcase Carousel */}
      <WorkCarousel
        slides={slides}
        height="100svh"
        cardWidth={320}
        sag={50}
        swing={1}
        autoplay={5000}
        string="#C80000"
        background="#080808"
        ink="#F5F5F5"
        ariaLabel="Selected work carousel"
      />
    </section>
  );
}
