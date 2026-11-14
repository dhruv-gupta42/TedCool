export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  service: string;
  metric: string;
  metricLabel: string;
  portrait?: string;
  year?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'nike',
    quote:
      'Tedcool didn’t just execute a campaign for our launch — they ignited a cultural frenzy. 42M impressions in 10 days, and our flagship sneaker drop sold out in 3 minutes flat.',
    author: 'Marcus Vance',
    role: 'Global VP of Brand Marketing',
    company: 'Nike',
    service: 'Social Media Marketing',
    metric: '42M+',
    metricLabel: 'Organic Impressions',
  },
  {
    id: 'spotify',
    quote:
      'Tedcool understands digital culture and creator partnerships better than anyone in the game. They matched us with talent that genuinely shared our values, turning a soundtrack into a perpetual community.',
    author: 'Aria Chen',
    role: 'Head of Cultural Partnerships',
    company: 'Spotify',
    service: 'Talent Collaborations',
    metric: '15M+',
    metricLabel: 'Gen-Z Reach',
  },
  {
    id: 'netflix',
    quote:
      'Their production quality is cinematic in every sense of the word. Filmed across continents with commercial finish, the original series campaign they crafted became our definitive visual identity.',
    author: 'Julian Cross',
    role: 'Director of Creative Marketing',
    company: 'Netflix',
    service: 'Video Production',
    metric: '4K HDR',
    metricLabel: 'Series Anthem',
  },
  {
    id: 'oneplus',
    quote:
      'No copy-paste strategies here. Every brand is different, and Tedcool delivered a high-octane community launch sequence that doubled our flagship phone pre-orders in 48 hours.',
    author: 'Devin Zhao',
    role: 'Chief Brand Strategist',
    company: 'OnePlus',
    service: 'Digital Strategy',
    metric: '2.4x',
    metricLabel: 'Pre-order Surge',
  },
  {
    id: 'boat',
    quote:
      'Most agencies hand you an influencer roster and cross their fingers. Tedcool coordinated 18 top-tier creators with synchronized storytelling that drove our highest Q4 revenue in company history.',
    author: 'Elena Rostova',
    role: 'Chief Marketing Officer',
    company: 'boAt',
    service: 'Influencer Marketing',
    metric: '+210%',
    metricLabel: 'Q4 Revenue Lift',
  },
  {
    id: 'redbull',
    quote:
      'Fearless, high-energy, and deeply connected to youth culture. Tedcool took our extreme sports property and turned raw moments into an unforgettable viral movement.',
    author: 'Kieran Holt',
    role: 'Senior Director of Content',
    company: 'Red Bull',
    service: 'Content & Culture',
    metric: '88M+',
    metricLabel: 'Video Views',
  },
];
