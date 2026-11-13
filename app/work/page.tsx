import type { Metadata } from 'next';
import WorkPageClient from './WorkPageClient';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Explore our portfolio of creative projects spanning social media marketing, influencer campaigns, talent management, and video production.',
};

export default function WorkPage() {
  return <WorkPageClient />;
}
