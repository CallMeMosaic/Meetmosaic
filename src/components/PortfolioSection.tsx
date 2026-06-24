import React, { useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import previewImage from 'figma:asset/41e37fa7bf380762424047ef950a3bab943c0fc9.png';
import logoImage from 'figma:asset/ff55cf744b7094f73f6303b60d9307c6e85c20c4.png';
import portfolioBackground from 'figma:asset/6eda5e33d8068efbbc3e420f90d4f179444bd6a1.png';
import headshotsImage from 'figma:asset/de73290b6401f36b2eabb60ab7aa21602403ce7b.png';
import actImage from 'figma:asset/e47572d88ce663ecbdf423d8094134fcce708942.png';
import natureImage from 'figma:asset/5f4b997448157987bc10978694afaf6ed4072aae.png';
import fashionImage from 'figma:asset/6eda5e33d8068efbbc3e420f90d4f179444bd6a1.png';
import cosplayImage from 'figma:asset/5536000897216a83d408f6060d0cd6f865e62939.png';
import castingsImage from 'figma:asset/b4e5492730f6abce6cc611a6d2d1a3022b30dd3a.png';
import { CosplayGallery } from './CosplayGallery';
import { CastingsGallery} from "./CastingsGallery.tsx";

export function PortfolioSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = React.useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isCosplayOpen, setIsCosplayOpen] = useState(false);
  const [isCastingsOpen, setIsCastingsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('portfolio-section');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / windowHeight
      ));
      
      setScrollProgress(progress);
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { title: 'Headshots', delay: 0, image: headshotsImage },
    { title: 'Act/Partial Act and Erotic Photography', delay: 0.1, image: actImage },
    { title: 'Nature', delay: 0.2, image: natureImage },
    { title: 'Fashion', delay: 0.3, image: fashionImage },
    { title: 'Cosplay', delay: 0.4, image: cosplayImage },
    { title: 'Castings', delay: 0.5, image: castingsImage },
  ];

  return (
    <section 
      id="portfolio-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black py-20"
    >
      {/* Cosplay Gallery Overlay */}
      <CosplayGallery isOpen={isCosplayOpen} onClose={() => setIsCosplayOpen(false)} />
      
      {/* Background - using portfolio background with blur */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div 
          className="absolute top-0 left-0 w-full h-[120%]"
          style={{
            transform: `translateY(${(scrollY - 4000) * 0.3}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <ImageWithFallback 
            src={portfolioBackground}
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              filter: 'blur(10px)',
            }}
          />
        </div>
      </div>
      
      {/* Color gradient overlay - purple/magenta/neon tones */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(
              45deg,
              rgba(147, 51, 234, 0.3) 0%,
              rgba(219, 39, 119, 0.25) 25%,
              rgba(236, 72, 153, 0.35) 47%,
              rgba(168, 85, 247, 0.4) 50%,
              rgba(236, 72, 153, 0.35) 53%,
              rgba(219, 39, 119, 0.25) 75%,
              rgba(147, 51, 234, 0.3) 100%
            )
          `,
          transform: `translateX(${-100 + scrollProgress * 100}%)`,
          opacity: scrollProgress * 0.8,
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-8 md:px-16">
        {/* Header */}
        <div 
          className="mb-16 text-center"
          style={{
            transform: `translateY(${50 - scrollProgress * 50}px)`,
            opacity: scrollProgress,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          <h1 
            className="text-6xl md:text-8xl"
            style={{
              fontFamily: '"ethnocentric", sans-serif',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.15)',
              WebkitTextStroke: '3px rgba(255, 255, 255, 0.95)',
              textStroke: '3px rgba(255, 255, 255, 0.95)',
              textShadow: `
                2px 2px 0px rgba(255, 255, 255, 0.3),
                -2px -2px 0px rgba(0, 0, 0, 0.5),
                0 0 20px rgba(168, 85, 247, 0.5)
              `,
            }}
          >
            My Portfolio
          </h1>
        </div>

        {/* Preview Image */}
        <div 
          className="mb-20 flex justify-center"
          style={{
            transform: `translateY(${30 - scrollProgress * 30}px) scale(${0.9 + scrollProgress * 0.1})`,
            opacity: scrollProgress,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          <div 
            className="relative max-w-4xl w-full"
            style={{
              animation: 'float 8s ease-in-out infinite',
            }}
          >
            <div className="relative rounded-lg overflow-hidden border-2 border-white/30"
              style={{
                boxShadow: `
                  0 0 60px rgba(168, 85, 247, 0.4),
                  inset 0 0 40px rgba(255, 255, 255, 0.1)
                `,
              }}
            >
              <ImageWithFallback 
                src={previewImage}
                alt="Portfolio preview"
                className="w-full h-auto"
              />
              
              {/* Glass shimmer overlay */}
              <div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                  animation: 'shimmer-preview 5s ease-in-out infinite',
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {categories.map((category, index) => {
            const isCosplay = category.title === 'Cosplay';
            
            return (
              <div
                key={index}
                onClick={() => isCosplay && setIsCosplayOpen(true)}
              >
                <div
                  className="relative cursor-pointer h-80"
                  style={{
                    perspective: '1000px',
                    animation: 'float 6s ease-in-out infinite',
                    animationDelay: `${index * 0.3}s`,
                    zIndex: 20,
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      transformStyle: 'preserve-3d',
                      transform: hoveredCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      transition: 'transform 0.6s',
                    }}
                  >
                    {/* Front - Glass panel with decorative pattern */}
                    <div 
                      className="absolute inset-0 rounded-lg border-2 border-white/30 overflow-hidden"
                      style={{
                        background: `
                          linear-gradient(135deg, 
                            rgba(147, 51, 234, 0.4) 0%,
                            rgba(168, 85, 247, 0.35) 25%,
                            rgba(236, 72, 153, 0.4) 50%,
                            rgba(219, 39, 119, 0.35) 75%,
                            rgba(147, 51, 234, 0.4) 100%
                          ),
                          rgba(20, 20, 40, 0.85)
                        `,
                        boxShadow: `
                          0 0 40px rgba(236, 72, 153, 0.4),
                          inset 0 0 30px rgba(255, 255, 255, 0.1)
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
                          animation: 'shimmer-card 4s ease-in-out infinite',
                          animationDelay: `${index * 0.5}s`,
                        }}
                      ></div>
                      
                      {/* Decorative pattern */}
                      <div className="absolute inset-0 flex flex-col justify-center items-center gap-6 p-6">
                        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                        <div className="w-3/4 h-0.5 bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"></div>
                        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400/40 to-transparent"></div>
                        <div className="w-3/4 h-0.5 bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent"></div>
                        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                      </div>
                      
                      {/* Center glow */}
                      <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
                        style={{
                          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, transparent 70%)',
                          filter: 'blur(20px)',
                        }}
                      ></div>
                      
                      {/* Category title on front */}
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <h3
                          className="text-2xl md:text-3xl text-center"
                          style={{
                            fontFamily: '"ethnocentric", sans-serif',
                            fontWeight: 400,
                            fontStyle: 'italic',
                            color: 'rgba(255, 255, 255, 0.2)',
                            WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.95)',
                            textStroke: '1.5px rgba(255, 255, 255, 0.95)',
                            textShadow: `
                              1px 1px 0px rgba(255, 255, 255, 0.3),
                              -1px -1px 0px rgba(0, 0, 0, 0.5),
                              0 0 20px rgba(236, 72, 153, 0.6)
                            `,
                          }}
                        >
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    {/* Back - Category image */}
                    <div 
                      className="absolute inset-0 rounded-lg overflow-hidden border-2 border-white/30"
                      style={{
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        boxShadow: '0 0 50px rgba(236, 72, 153, 0.5)',
                      }}
                    >
                      <ImageWithFallback 
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Category title overlay at bottom */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 p-4"
                        style={{
                          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)',
                        }}
                      >
                        <h3
                          className="text-lg md:text-xl text-center"
                          style={{
                            fontFamily: '"ethnocentric", sans-serif',
                            fontWeight: 400,
                            fontStyle: 'italic',
                            color: 'rgba(255, 255, 255, 0.2)',
                            WebkitTextStroke: '1px rgba(255, 255, 255, 0.95)',
                            textStroke: '1px rgba(255, 255, 255, 0.95)',
                            textShadow: `
                              1px 1px 0px rgba(255, 255, 255, 0.3),
                              -1px -1px 0px rgba(0, 0, 0, 0.5),
                              0 0 15px rgba(236, 72, 153, 0.6)
                            `,
                          }}
                        >
                          {category.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Header */}
        <div 
          className="mb-12 text-center"
          style={{
            transform: `translateY(${30 - scrollProgress * 30}px)`,
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
                2px 2px 0px rgba(255, 255, 255, 0.3),
                -2px -2px 0px rgba(0, 0, 0, 0.5),
                0 0 15px rgba(168, 85, 247, 0.5)
              `,
            }}
          >
            My Portfolio - My Work - My Story
          </h2>
        </div>

        {/* Logo Button */}
        <div 
          className="flex justify-center"
          style={{
            transform: `scale(${0.8 + scrollProgress * 0.2})`,
            opacity: scrollProgress,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          <a
            href="rawmosaic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block max-w-lg cursor-pointer group"
            style={{
              animation: 'float 7s ease-in-out infinite',
            }}
          >
            <div
              className="transition-all duration-300 group-hover:scale-110"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 80px rgba(236, 72, 153, 0.4))',
              }}
            >
              <ImageWithFallback 
                src={logoImage}
                alt="Mosaic Logo"
                className="w-full h-auto"
              />
            </div>
            
            {/* Pulsing glow on hover */}
            <div 
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
                filter: 'blur(40px)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            ></div>
          </a>
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
        
        @keyframes shimmer-preview {
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
        
        @keyframes shimmer-card {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(200%) translateY(200%) rotate(45deg);
            opacity: 0;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
      `}</style>
    </section>
  );
}