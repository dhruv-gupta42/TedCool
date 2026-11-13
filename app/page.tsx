import Hero from '@/app/components/sections/Hero';
import Introduction from '@/app/components/sections/Introduction';
import FeaturedWork from '@/app/components/sections/FeaturedWork';
import Services from '@/app/components/sections/Services';
import Quote from '@/app/components/sections/Quote';
import ContactCTA from '@/app/components/sections/ContactCTA';
import ServicesScrollHandler from '@/app/components/common/ServicesScrollHandler';

export default function Home() {
  return (
    <>
      <ServicesScrollHandler />
      <Hero />
      <Introduction />
      <FeaturedWork />
      <Services />
      <ContactCTA />
      <Quote />
    </>
  );
}
