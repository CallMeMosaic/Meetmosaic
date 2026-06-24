import React from 'react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { StorySection } from './components/StorySection';
import { MessageSection } from './components/MessageSection';
import { PortfolioSection } from './components/PortfolioSection';
import { FooterSection } from './components/FooterSection';
import { CursorParticles } from './components/CursorParticles';
import { FloatingGlassShards } from './components/FloatingGlassShards';
import { FloatingNav } from './components/FloatingNav';
import { ContactFormOverlay } from './components/ContactFormOverlay';

export default function App() {
  const [isContactOpen, setIsContactOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Global effects */}
      <CursorParticles />
      <FloatingGlassShards />
        <FloatingNav onContactClick={() => setIsContactOpen(true)} />
      
      {/* Contact Form Overlay */}
      <ContactFormOverlay isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      
      {/* Sections */}
      <HeroSection onContactClick={() => setIsContactOpen(true)} />
      <AboutSection />
      <StorySection />
      <MessageSection />
      <PortfolioSection />
      <FooterSection onContactClick={() => setIsContactOpen(true)} />
    </div>
  );
}