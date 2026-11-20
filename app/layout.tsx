import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';
import SmoothScroll from '@/app/components/common/SmoothScroll';
import CursorSpotlight from '@/app/components/common/CursorSpotlight';
import Preloader from '@/app/components/common/Preloader';
import SwirlTransition from '@/app/components/common/SwirlTransition';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Tedcool Media — Creative Agency',
    template: '%s | Tedcool Media',
  },
  description:
    'Tedcool Media is a premium creative agency specializing in social media marketing, influencer marketing, talent management, and video production.',
  openGraph: {
    title: 'Tedcool Media — Creative Agency',
    description:
      'A premium creative agency specializing in social media marketing, influencer marketing, talent management, and video production.',
    url: 'https://tedcoolmedia.com',
    siteName: 'Tedcool Media',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tedcool Media — Creative Agency',
    description:
      'A premium creative agency specializing in social media marketing, influencer marketing, talent management, and video production.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=BBH+Bogle&family=Momo+Signature&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Preloader />
        <SwirlTransition>
          <CursorSpotlight />
          <SmoothScroll>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScroll>
        </SwirlTransition>
      </body>
    </html>
  );
}
