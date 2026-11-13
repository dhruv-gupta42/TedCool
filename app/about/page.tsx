import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Tedcool Media, our creative philosophy, and how we help brands tell their stories in the digital age.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
