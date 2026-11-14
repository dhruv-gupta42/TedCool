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
  hero: {
    tag: 'WE ARE TEDCOOL MEDIA',
    hook: '9 years in. Still curious. Never here to play it safe.',
    aboutUsLine: "We've been in the game for 9 years. Still haven't run out of ideas.",
    introLead: 'We’re a creative media and marketing agency that believes good work starts with understanding people, not just platforms.',
    introStory: 'For 9 years, we’ve been working around brands, audiences, content and the ever-changing digital landscape. And if there’s one thing we’ve learnt, it’s this: every brand has a story, but not every brand knows how to tell it.',
    introCallout: 'That’s where we come in.',
  },
  narrative: {
    paragraphs: [
      'From understanding what makes a brand tick to figuring out how it should show up, speak and connect with its audience, we bring strategy and creativity together to make things happen.',
      'We work across social media, influencer marketing, talent collaborations and video production, helping brands turn ideas into communication that people actually notice, remember and connect with.',
      'We like asking questions, challenging the obvious and finding the interesting angle others might miss.',
    ],
    punchline: 'Because honestly, the internet already has enough content. It needs better ideas.',
    signoff: 'That’s Tedcool.',
  },
  difference: {
    headline: "SO, WHAT'S THE TEDCOOL DIFFERENCE?",
    whyTedcoolLine: "We don't just want to understand your brief. We want to understand your brand.",
    points: [
      {
        number: '01',
        title: 'NINE YEARS. NOT NINE TRENDS.',
        description: 'Trends come and go. Algorithms keep changing. Understanding brands and people? That’s our thing.',
      },
      {
        number: '02',
        title: 'FIRST, WE GET YOU.',
        description: 'No copy-paste strategies here. Every brand is different, and we like keeping it that way.',
      },
      {
        number: '03',
        title: 'SMALL TEAM. BIG ON INVOLVEMENT.',
        description: 'Less hierarchy, more ideas. You work directly with the people who make things happen.',
      },
      {
        number: '04',
        title: 'CREATIVE MINDS. STRATEGIC THINKING.',
        description: 'We like ideas that look good, work smart and actually mean something.',
      },
      {
        number: '05',
        title: 'LESS CONTENT. MORE PURPOSE.',
        description: 'Not every trend needs a reel. Not every idea needs a post. We believe in creating with intent.',
      },
      {
        number: '06',
        title: 'BEYOND THE POST.',
        description: 'We’re not here just to fill your content calendar. We’re here to help build your brand, one good idea at a time.',
      },
    ],
  },
  howWeWork: {
    headline: 'HOW WE WORK',
    howWeWorkLine: 'First, we listen. Then we think. Then we make things happen.',
    steps: [
      {
        number: '01',
        title: 'FIRST, WE LISTEN.',
        description: 'Before jumping into creative execution, we immerse ourselves in what makes your brand tick. We ask the uncomfortable questions, study your audience, and find the honest truth behind your product.',
      },
      {
        number: '02',
        title: 'THEN, WE THINK.',
        description: 'Strategy meets sharp creative intuition. We challenge the obvious, cut through algorithmic noise, and uncover the distinct angle that turns heads and sticks in culture.',
      },
      {
        number: '03',
        title: 'THEN, WE MAKE THINGS HAPPEN.',
        description: 'From high-concept video production to synchronized creator campaigns, our core team executes with intent. Seamless, impactful, and built to drive genuine human connection.',
      },
    ],
  },
  services: {
    headline: 'CAPABILITIES',
    servicesLine: 'A little strategy. A lot of creativity. And absolutely no guesswork.',
    items: [
      {
        title: 'Social Media Marketing',
        description: 'High-impact campaigns and cultural presence that spark conversation and convert audiences into communities.',
      },
      {
        title: 'Influencer Marketing',
        description: 'Bespoke creator partnerships and native storytelling that build genuine brand credibility at scale.',
      },
      {
        title: 'Talent Collaborations',
        description: 'Strategic talent matching and management that connect visionary creators with ambitious brands.',
      },
      {
        title: 'Video Production',
        description: 'Cinematic commercials, episodic series, and short-form video crafted with commercial finish and artistic intent.',
      },
    ],
  },
  centralThought: {
    mantra: [
      'WE GET BRANDS.',
      'WE GET PEOPLE.',
      'WE GET IDEAS MOVING.',
    ],
    brandName: 'TEDCOOL MEDIA.',
    closing: 'Nine years of understanding brands. Always making room for the next big idea.',
  },
  contact: {
    contactLine: "Got a brief? A half-baked idea? A big ambition? We're listening.",
  },
};
