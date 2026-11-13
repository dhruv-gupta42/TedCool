export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  metric: string;
  metricLabel: string;
  coverImage: string;
  posterImage?: string;
  videoUrl?: string;
  year?: string;
  featured: boolean;
  accentGradient: string;
}

export const projects: Project[] = [
  {
    id: 'project-01',
    slug: 'velocity-brand-campaign',
    title: 'Velocity Brand Campaign',
    client: 'Apex Performance',
    category: 'Social Media Marketing',
    description: 'A viral multi-platform social media campaign that redefined digital presence, sparking cultural conversation and record engagement.',
    metric: '42M+',
    metricLabel: 'Organic Impressions',
    coverImage: '/images/projects/project-01.webp',
    posterImage: '/images/projects/project-01-poster.webp',
    videoUrl: '',
    year: '2024',
    featured: true,
    accentGradient: 'from-red-600/30 via-red-950/20 to-black',
  },
  {
    id: 'project-02',
    slug: 'creator-spotlight-series',
    title: 'Creator Spotlight Series',
    client: 'HyperSound Audio',
    category: 'Influencer Marketing',
    description: 'An integrated influencer activation featuring 18 top-tier creators with synchronized storytelling across TikTok, YouTube, and Instagram.',
    metric: '18+',
    metricLabel: 'Top Creators Activated',
    coverImage: '/images/projects/project-02.webp',
    posterImage: '/images/projects/project-02-poster.webp',
    videoUrl: '',
    year: '2024',
    featured: true,
    accentGradient: 'from-rose-600/25 via-red-900/20 to-black',
  },
  {
    id: 'project-03',
    slug: 'cinematica-visual-stories',
    title: 'Cinematica Visual Stories',
    client: 'Kinetix Studios',
    category: 'Video Production',
    description: 'High-concept cinematic brand anthem and episodic video series filmed across 3 continents with HDR commercial finish.',
    metric: '4K HDR',
    metricLabel: 'Commercial Production',
    coverImage: '/images/projects/project-03.webp',
    posterImage: '/images/projects/project-03-poster.webp',
    videoUrl: '',
    year: '2024',
    featured: true,
    accentGradient: 'from-red-500/30 via-amber-950/20 to-black',
  },
  {
    id: 'project-04',
    slug: 'digital-ecosystem-overhaul',
    title: 'Digital Ecosystem Overhaul',
    client: 'Solstice Lifestyle',
    category: 'Social Media Marketing',
    description: 'Comprehensive transformation of a legacy brand into a high-engagement digital powerhouse with community-led content.',
    metric: '3.4x',
    metricLabel: 'Engagement Lift',
    coverImage: '/images/projects/project-04.webp',
    posterImage: '/images/projects/project-04-poster.webp',
    videoUrl: '',
    year: '2023',
    featured: true,
    accentGradient: 'from-red-700/25 via-zinc-900/30 to-black',
  },
  {
    id: 'project-05',
    slug: 'talent-nexus-launch',
    title: 'Talent Nexus Launch',
    client: 'Roster Exclusive',
    category: 'Talent Management',
    description: 'Strategic incubation and personal brand architecture for top emerging creators, securing tier-1 brand endorsements.',
    metric: '100%',
    metricLabel: 'Roster Monetization',
    coverImage: '/images/projects/project-05.webp',
    posterImage: '/images/projects/project-05-poster.webp',
    videoUrl: '',
    year: '2023',
    featured: true,
    accentGradient: 'from-red-600/30 via-red-950/30 to-black',
  },
  {
    id: 'project-06',
    slug: 'campaign-360',
    title: 'Campaign 360',
    client: 'Nova Wear',
    category: 'Influencer Marketing',
    description: 'An integrated influencer marketing campaign spanning multiple platforms with synchronized messaging.',
    metric: '8.5M',
    metricLabel: 'Video Views',
    coverImage: '/images/projects/project-06.webp',
    posterImage: '/images/projects/project-06-poster.webp',
    videoUrl: '',
    year: '2023',
    featured: false,
    accentGradient: 'from-red-600/20 to-black',
  },
  {
    id: 'project-07',
    slug: 'motion-series',
    title: 'Motion Series',
    client: 'Echo Labs',
    category: 'Video Production',
    description: 'A series of motion design pieces combining typography, animation, and brand elements into captivating visual content.',
    metric: '12 Ep',
    metricLabel: 'Content Roster',
    coverImage: '/images/projects/project-07.webp',
    posterImage: '/images/projects/project-07-poster.webp',
    videoUrl: '',
    year: '2023',
    featured: false,
    accentGradient: 'from-red-600/20 to-black',
  },
  {
    id: 'project-08',
    slug: 'brand-evolution',
    title: 'Brand Evolution',
    client: 'Vanguard Group',
    category: 'Social Media Marketing',
    description: 'A year-long brand evolution project that transformed a startup\'s social media presence from the ground up.',
    metric: '250K+',
    metricLabel: 'Follower Growth',
    coverImage: '/images/projects/project-08.webp',
    posterImage: '/images/projects/project-08-poster.webp',
    videoUrl: '',
    year: '2023',
    featured: false,
    accentGradient: 'from-red-600/20 to-black',
  },
];

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((p) => p.featured);
};
