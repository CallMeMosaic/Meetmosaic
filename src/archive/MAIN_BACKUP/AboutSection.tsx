import React, { useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import aboutImage from 'figma:asset/12b376718a2142e58ee380f278397829435e31b1.png';

export function AboutSection() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('about-section');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far into the section we've scrolled (0 to 1)
      // Adjusted to complete animation when section is centered
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / windowHeight
      ));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="about-section"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background image with blur */}
      <div className="absolute top-0 left-0 w-full h-full">
        <ImageWithFallback 
          src={aboutImage}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
            filter: 'blur(10px)',
          }}
        />
      </div>
      
      {/* Color gradient overlay matching image colors */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(
              45deg,
              rgba(138, 43, 226, 0.45) 0%,
              rgba(255, 105, 180, 0.4) 35%,
              rgba(100, 149, 237, 0.5) 47%,
              rgba(255, 105, 180, 0.5) 50%,
              rgba(138, 43, 226, 0.5) 53%,
              rgba(221, 160, 221, 0.4) 65%,
              rgba(255, 182, 193, 0.45) 100%
            )
          `,
        }}
      ></div>
      
      {/* Content with scroll animations */}
      <div className="relative z-10 w-full max-w-6xl px-8 md:px-16">
        {/* Text 1 - Left aligned, slides from left */}
        <div 
          className="mb-12"
          style={{
            transform: `translateX(${-500 + scrollProgress * 500}px)`,
            opacity: scrollProgress,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          <h2 
            className="text-4xl md:text-6xl"
            style={{
              fontFamily: '"ethnocentric", sans-serif',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.15)',
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.95)',
              textStroke: '2px rgba(255, 255, 255, 0.95)',
              textShadow: `
                1px 1px 0px rgba(255, 255, 255, 0.3),
                -1px -1px 0px rgba(0, 0, 0, 0.5)
              `,
            }}
          >
            I am Freyja Reffelmann or Mosaic
          </h2>
        </div>
        
        {/* Text 2 - Right aligned, slides from right */}
        <div 
          className="mb-12 text-right"
          style={{
            transform: `translateX(${500 - scrollProgress * 500}px)`,
            opacity: scrollProgress,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          <h2 
            className="text-4xl md:text-6xl"
            style={{
              fontFamily: '"ethnocentric", sans-serif',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.15)',
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.95)',
              textStroke: '2px rgba(255, 255, 255, 0.95)',
              textShadow: `
                1px 1px 0px rgba(255, 255, 255, 0.3),
                -1px -1px 0px rgba(0, 0, 0, 0.5)
              `,
            }}
          >
            Model and Computer Science Student
          </h2>
        </div>
        
        {/* Text 3 - Left aligned, slides from left */}
        <div 
          style={{
            transform: `translateX(${-500 + scrollProgress * 500}px)`,
            opacity: scrollProgress,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          <h2 
            className="text-4xl md:text-6xl"
            style={{
              fontFamily: '"ethnocentric", sans-serif',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.15)',
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.95)',
              textStroke: '2px rgba(255, 255, 255, 0.95)',
              textShadow: `
                1px 1px 0px rgba(255, 255, 255, 0.3),
                -1px -1px 0px rgba(0, 0, 0, 0.5)
              `,
            }}
          >
            From Gummersbach, Germany
          </h2>
        </div>
      </div>
    </section>
  );
}
