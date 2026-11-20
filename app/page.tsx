import Hero from '@/app/components/sections/Hero';
import Introduction from '@/app/components/sections/Introduction';
import SelectedWork from '@/app/components/sections/SelectedWork';
import Services from '@/app/components/sections/Services';
import Testimonials from '@/app/components/sections/Testimonials';
import Quote from '@/app/components/sections/Quote';
import ContactCTA from '@/app/components/sections/ContactCTA';
import ServicesScrollHandler from '@/app/components/common/ServicesScrollHandler';

export default function Home() {
  return (
    <>
      <ServicesScrollHandler />
      <Hero />
      <Introduction />
      <SelectedWork />
      <Services />
      <Testimonials />
      <ContactCTA />
      <Quote />
    </>
  );
}
