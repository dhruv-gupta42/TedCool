export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  bullets: string[];
  brands: string[];
  metric: string;
  metricLabel: string;
}

export const services: Service[] = [
  {
    id: 'social-media-marketing',
    number: '01',
    title: 'Social Media Marketing',
    description: 'Strategic social media campaigns that build cult communities, drive viral organic engagement, and turn passive audiences into active brand evangelists across Instagram, YouTube, and TikTok.',
    capabilities: ['Content Strategy', 'Community Management', 'Paid Campaigns', 'Analytics & Reporting'],
    bullets: [
      'Aligning with brand goals & demographic positioning',
      'High-velocity viral short-form & reel architecture',
      'Proactive real-time community engagement & trend-jacking',
      'Deep sentiment analytics & cross-platform ROI attribution',
    ],
    brands: ['SPOTIFY', 'NETFLIX', 'ONEPLUS', 'ZOMATO', 'SWIGGY', 'BOAT', 'PUMA', 'AMAZON', 'LIFESTYLE'],
    metric: '250M+',
    metricLabel: 'Organic Reel & Feed Reach',
  },
  {
    id: 'influencer-marketing',
    number: '02',
    title: 'Influencer Marketing',
    description: 'Connecting ambitious brands with tier-1 digital creators. We handle end-to-end matchmaking, creative brief orchestration, contract negotiations, and multi-tier campaign activations.',
    capabilities: ['Influencer Identification', 'Campaign Management', 'Performance Tracking', 'Brand Collaborations'],
    bullets: [
      'Data-driven creator identification & audience vetting',
      'Crafting authentic, narrative-first campaign briefs',
      'Strategic creator selection across nano to tier-1 talent',
      'Conversion tracking & dedicated promo attribution at scale',
    ],
    brands: ['AJIO', 'MTN DEW', 'URBAN CO.', 'LICIOUS', 'BBNOW', 'ASIAN PAINTS', 'ONEPLUS', 'IKEA', 'CENTRUM'],
    metric: '120+',
    metricLabel: 'Brand Activations Executed',
  },
  {
    id: 'talent-management',
    number: '03',
    title: 'Talent Management',
    description: '360° commercial management and career acceleration for exclusive digital creators. We build sustainable creator businesses, secure high-value brand partnerships, and protect creative freedom.',
    capabilities: ['Brand Building', 'Partnership Negotiations', 'Content Planning', 'Career Strategy'],
    bullets: [
      'End-to-end commercial brand deal representation',
      'Original IP incubation & digital product lines',
      'Multi-platform revenue diversification & creator tours',
      'Strategic PR, media positioning & career longevity',
    ],
    brands: ['GOOGLE', 'SAMSUNG', 'RED BULL', 'DISNEY+', 'CRED', 'HYUNDAI', 'SONY', 'ADIDAS', 'META'],
    metric: '45+',
    metricLabel: 'Exclusive Creator Roster',
  },
  {
    id: 'video-production',
    number: '04',
    title: 'Video Production',
    description: 'Cinema-grade commercial storytelling from storyboard to final color grade. We produce high-concept brand films, studio commercials, and viral episodic formats engineered for modern screens.',
    capabilities: ['Concept Development', 'Production', 'Post-Production', 'Motion Graphics'],
    bullets: [
      'High-concept storytelling & storyboard architecture',
      'Full-scale cinema camera crews & studio production',
      'Hollywood-grade post-production, editing & sound design',
      'Custom 3D motion graphics & visual effect mastery',
    ],
    brands: ['BMW', 'HEINEKEN', 'TATA', 'SONY MUSIC', 'WARNER', "LEVI'S", 'PEPSI', 'MAHINDRA', 'AIRTEL'],
    metric: '4K/6K',
    metricLabel: 'Master Commercial Deliveries',
  },
];
