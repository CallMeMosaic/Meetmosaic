import React, { useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import aboutImage from 'figma:asset/12b376718a2142e58ee380f278397829435e31b1.png';
import portraitImage from 'figma:asset/9ae6701af8ca31941a1d4b92298833e2a3d05104.png';

export function AboutSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = React.useState(0);
  const [isFlipped, setIsFlipped] = React.useState(false);

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
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="about-section"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black py-20"
    >
      {/* Background image with blur */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div 
          className="absolute top-0 left-0 w-full h-[120%]"
          style={{
            transform: `translateY(${(scrollY - 1000) * 0.3}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <ImageWithFallback 
            src={aboutImage}
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              filter: 'blur(10px)',
            }}
          />
        </div>
      </div>
      
      {/* Color gradient overlay matching image colors */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(
              45deg,
              rgba(138, 43, 226, 0.3) 0%,
              rgba(255, 105, 180, 0.25) 35%,
              rgba(100, 149, 237, 0.35) 47%,
              rgba(255, 105, 180, 0.35) 50%,
              rgba(138, 43, 226, 0.35) 53%,
              rgba(221, 160, 221, 0.25) 65%,
              rgba(255, 182, 193, 0.3) 100%
            )
          `,
          transform: `translateX(${-100 + (scrollProgress || 0) * 100}%)`,
          opacity: (scrollProgress || 0) * 0.8,
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
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
        
        {/* Portrait Image - Fades in from bottom */}
        <div 
          className="mt-16 flex justify-center"
          style={{
            transform: `translateY(${50 - scrollProgress * 50}px)`,
            opacity: scrollProgress,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          <div 
            className="relative cursor-pointer"
            style={{
              perspective: '1000px',
              width: '400px',
              height: '600px',
              animation: 'float 6s ease-in-out infinite',
            }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: 'transform 0.6s',
              }}
            >
              {/* Front - Glass panel with decorative pattern */}
              <div 
                className="absolute inset-0 rounded-lg border-2 border-white/30 overflow-hidden"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(138, 43, 226, 0.4) 0%,
                      rgba(255, 105, 180, 0.35) 25%,
                      rgba(100, 149, 237, 0.4) 50%,
                      rgba(255, 105, 180, 0.4) 75%,
                      rgba(138, 43, 226, 0.4) 100%
                    ),
                    rgba(20, 20, 40, 0.85)
                  `,
                  boxShadow: `
                    0 0 60px rgba(255, 105, 180, 0.4),
                    inset 0 0 40px rgba(255, 255, 255, 0.15)
                  `,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                {/* Glass shimmer effect */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                    animation: 'shimmer 4s ease-in-out infinite',
                  }}
                ></div>
                
                {/* Decorative pattern */}
                <div className="absolute inset-0 flex flex-col justify-center items-center gap-8 p-8">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                  <div className="w-3/4 h-1 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent"></div>
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
                  <div className="w-3/4 h-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                </div>
                
                {/* Center glow */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 105, 180, 0.6) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                ></div>
              </div>

              {/* Back - Portrait image */}
              <div 
                className="absolute inset-0 rounded-lg overflow-hidden border-2 border-white/30"
                style={{
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  boxShadow: `
                    0 0 50px rgba(255, 105, 180, 0.5),
                    inset 0 0 30px rgba(255, 255, 255, 0.2)
                  `,
                }}
              >
                <ImageWithFallback 
                  src={portraitImage}
                  alt="Mosaic portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-5px) rotate(-1deg);
          }
          75% {
            transform: translateY(-15px) rotate(0.5deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-15deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}