export const siteConfig = {
  name: 'Tedcool Media',
  tagline: 'We Create What Moves The World.',
  description: 'A premium creative agency specializing in social media marketing, influencer marketing, talent management, and video production.',
  url: 'https://tedcoolmedia.com',
};

export const contactInfo = {
  email: 'hello@tedcoolmedia.com',
  whatsapp: '919XXXXXXXXX',
  whatsappMessage: 'Hello, I would like to discuss a project with Tedcool Media.',
  instagram: 'https://instagram.com/tedcoolmedia',
  youtube: 'https://youtube.com/@tedcoolmedia',
  linkedin: 'https://linkedin.com/company/tedcoolmedia',
};

export const getWhatsAppUrl = () => {
  const encodedMessage = encodeURIComponent(contactInfo.whatsappMessage);
  return `https://wa.me/${contactInfo.whatsapp}?text=${encodedMessage}`;
};

export const getEmailUrl = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const queryString = params.toString();
  return `mailto:${contactInfo.email}${queryString ? '?' + queryString : ''}`;
};

export const heroContent = {
  headline: ['WE CREATE', 'WHAT MOVES', 'THE WORLD.'],
  description: 'We are a creative agency that blends strategy, storytelling, and visual craft to build brands that resonate and campaigns that convert.',
  ctaPrimary: 'Explore Our Work',
  ctaSecondary: 'Get In Touch',
};

export const introContent = {
  headline: 'CRAFTING STORIES THAT LEAVE A MARK',
  description: 'We partner with bold brands and ambitious creators to produce work that stands out in the digital landscape. From concept to execution, every project is an opportunity to push creative boundaries.',
  highlightedWord: 'bold',
};

export const philosophyContent = {
  headline: 'OUR APPROACH',
  subheadline: 'Strategy meets creativity.',
  description: 'Every project begins with understanding — your brand, your audience, your vision. We combine data-driven strategy with fearless creative execution to deliver work that not only looks extraordinary but performs exceptionally.',
  principles: [
    { number: '01', title: 'DISCOVER', description: 'Deep dive into your brand identity, audience, and market landscape.' },
    { number: '02', title: 'STRATEGIZE', description: 'Build a framework that aligns creative vision with measurable outcomes.' },
    { number: '03', title: 'CREATE', description: 'Produce compelling content that captures attention and drives engagement.' },
    { number: '04', title: 'AMPLIFY', description: 'Deploy and optimize across channels to maximize reach and impact.' },
  ],
};

export const contactCTAContent = {
  headline: ['HAVE A PROJECT', 'IN MIND?'],
  description: 'Let\'s create something extraordinary together. Reach out and let\'s start the conversation.',
  whatsappLabel: 'Chat on WhatsApp',
  emailLabel: 'Send an Email',
};

export const aboutContent = {
  heroHeadline: 'WE ARE TEDCOOL MEDIA',
  heroDescription: 'A creative agency built for the digital age.',
  whoWeAre: {
    headline: 'WHO WE ARE',
    description: 'Tedcool Media is a creative agency that specializes in building powerful digital presences. We work at the intersection of creativity and strategy, helping brands tell their stories in ways that resonate with modern audiences.',
    additionalText: 'Our team brings together diverse expertise in social media, content production, influencer partnerships, and talent management to deliver comprehensive creative solutions.',
  },
  philosophy: {
    headline: 'OUR PHILOSOPHY',
    description: 'We believe in the power of authentic storytelling. In a world saturated with content, the brands that win are the ones that dare to be genuine, bold, and unforgettable.',
  },
  approach: {
    headline: 'HOW WE WORK',
    description: 'Every collaboration starts with listening. We immerse ourselves in your brand, understand your goals, and craft strategies that are as unique as your vision.',
    steps: [
      { number: '01', title: 'Listen & Understand', description: 'We start by understanding your brand, audience, and objectives.' },
      { number: '02', title: 'Plan & Strategize', description: 'We develop comprehensive strategies tailored to your goals.' },
      { number: '03', title: 'Create & Execute', description: 'We bring ideas to life with meticulous attention to craft.' },
      { number: '04', title: 'Measure & Optimize', description: 'We analyze performance and continuously refine our approach.' },
    ],
  },
  capabilities: {
    headline: 'CAPABILITIES',
    description: 'A full spectrum of creative services designed to elevate your brand.',
  },
};
