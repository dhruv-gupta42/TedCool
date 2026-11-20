'use client';

import SketchFooter from '@/app/components/ui/sketch-footer';
import type { CrewMember, FooterColumn, FooterAction } from '@/app/components/ui/sketch-footer';
import { contactInfo, getWhatsAppUrl, getEmailUrl, siteConfig } from '@/app/data/siteContent';

// Hand-drawn characters customized across "TEDCOOL" (7 letters: T=0, E=1, D=2, C=3, O=4, O=5, L=6)
const TEDCOOL_CREW: CrewMember[] = [
  { kind: 'yeti', letter: 0, seat: 'front', offset: -0.3, name: 'Bruno', says: 'We create what moves the world.' },
  { kind: 'bird', letter: 1, seat: 'top', offset: 0.02, name: 'Pip', says: 'Got a brief? Hit us up!' },
  { kind: 'mushroom', letter: 2, seat: 'front', offset: 0.1, scale: 0.95, name: 'Morel', says: 'Bold ideas only.' },
  { kind: 'kid', letter: 4, seat: 'top', offset: -0.05, name: 'Juno', says: 'High-voltage creative energy!' },
  { kind: 'cat', letter: 5, seat: 'front', offset: 0.25, flip: true, name: 'Patch', says: '9 years in. Still curious.' },
  { kind: 'ghost', letter: 6, seat: 'behind', offset: 0, name: 'Boo', says: "Let's make some noise." },
];

  const COLUMNS: FooterColumn[] = [
    {
      title: 'Capabilities',
      links: [
        { label: 'Social Media Marketing', href: '/#services' },
        { label: 'Influencer Marketing', href: '/#services' },
        { label: 'Talent Management', href: '/#services' },
        { label: 'Video Production', href: '/#services' },
      ],
    },
    {
      title: 'Explore',
      links: [
        { label: 'Services', href: '/#services' },
        { label: 'Selected Work', href: '/work' },
        { label: 'About Agency', href: '/about' },
        { label: 'Capabilities', href: '/#services' },
      ],
    },
    {
      title: 'Get in Touch',
      links: [
        { label: 'Chat on WhatsApp', href: getWhatsAppUrl() },
        { label: contactInfo.email, href: getEmailUrl('Project Enquiry') },
        { label: 'Book a Discovery Call', href: getEmailUrl('Discovery Call') },
      ],
    },
    {
      title: 'Follow Us',
      links: [
        { label: 'Instagram', href: contactInfo.instagram },
        { label: 'YouTube', href: contactInfo.youtube },
        { label: 'LinkedIn', href: contactInfo.linkedin },
      ],
    },
  ];

  const ACTIONS: FooterAction[] = [
    {
      label: 'Chat on WhatsApp',
      href: getWhatsAppUrl(),
      icon: 'bolt',
      variant: 'solid',
    },
    {
      label: 'Send an Email',
      href: getEmailUrl('Project Enquiry'),
      icon: 'sparkle',
      variant: 'outline',
    },
  ];

export default function Footer() {
  return (
    <SketchFooter
      wordmark="TEDCOOL"
      brand={siteConfig.name}
      blurb={siteConfig.description}
      tagline={siteConfig.tagline}
      columns={COLUMNS}
      actions={ACTIONS}
      crew={TEDCOOL_CREW}
      palette={{
        background: '#080808',
        ink: '#F5F5F5',
        accent: '#C80000',
      }}
      socials={[
        { label: 'Instagram', href: contactInfo.instagram },
        { label: 'YouTube', href: contactInfo.youtube },
        { label: 'LinkedIn', href: contactInfo.linkedin },
      ]}
      legal={[
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
      ]}
      copyright={`© 2026 ${siteConfig.name}. All rights reserved.`}
      backToTop={true}
    />
  );
}
