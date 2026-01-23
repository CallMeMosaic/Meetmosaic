import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import introImage from 'figma:asset/a76009b40925b0452de19cde0d67c8c219c8f4a2.png';

interface HeroSectionProps {
  onContactClick: () => void;
}

export function HeroSection({ onContactClick }: HeroSectionProps) {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black" id="hero">
      {/* Background image with parallax */}
      <div 
        className="absolute top-0 left-0 w-full h-[120vh]"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <ImageWithFallback 
          src={introImage}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
      </div>
      
      {/* Content with fractured glass text effect */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 
          className="text-7xl md:text-9xl mb-6 tracking-tight"
          style={{
            fontFamily: '"ethnocentric", sans-serif',
            fontWeight: 400,
            fontStyle: 'italic',
            textShadow: `
              2px 2px 0px rgba(255, 255, 255, 0.1),
              4px 4px 0px rgba(255, 255, 255, 0.08),
              -1px -1px 0px rgba(0, 0, 0, 0.3),
              -2px -2px 0px rgba(0, 0, 0, 0.2),
              3px 3px 8px rgba(0, 0, 0, 0.5)
            `,
            filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))',
          }}
        >
          Meet Mosaic
        </h1>
        <p 
          className="text-2xl md:text-4xl font-light tracking-wide"
          style={{
            fontFamily: '"ethnocentric", sans-serif',
            fontWeight: 400,
            fontStyle: 'italic',
            textShadow: `
              1px 1px 0px rgba(255, 255, 255, 0.1),
              -1px -1px 0px rgba(0, 0, 0, 0.3),
              2px 2px 6px rgba(0, 0, 0, 0.5)
            `,
            filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))',
          }}
        >
          Model / Content Creator / Cosplayer
        </p>
        
        {/* Contact Button */}
        <button
          className="mt-12 px-8 py-4 border-2 border-white/40 rounded-sm backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10 hover:scale-105 active:scale-95"
          style={{
            fontFamily: '"ethnocentric", sans-serif',
            fontWeight: 400,
            fontStyle: 'italic',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            boxShadow: `
              0 0 20px rgba(255, 255, 255, 0.1),
              inset 0 0 20px rgba(255, 255, 255, 0.05)
            `,
          }}
          onClick={onContactClick}
        >
          GET IN TOUCH
        </button>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}