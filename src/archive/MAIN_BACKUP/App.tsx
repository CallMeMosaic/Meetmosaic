import React from 'react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';

export default function App() {
  return (
    <div className="relative min-h-screen">
      <HeroSection />
      <AboutSection />
    </div>
  );
}
