import React from 'react';
import LandingTemplate from '@/components/templates/LandingTemplate/LandingTemplate';
import Hero from '@/components/organisms/Hero/Hero';
import Services from '@/components/organisms/Services/Services';
import AboutInfographics from '@/components/organisms/AboutInfographics/AboutInfographics';
import Cases from '@/components/organisms/Cases/Cases';
import Contact from '@/components/organisms/Contact/Contact';
import SocialProof from '@/components/organisms/SocialProof/SocialProof';

export default function Home() {
  return (
    <LandingTemplate
      hero={<Hero />}
      content={
        <>
          <AboutInfographics />
          <SocialProof />
          <Services />
          <Cases />
          <Contact />
        </>
      }
    />
  );
}
