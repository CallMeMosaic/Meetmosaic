import React, { useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import footerBackground from 'figma:asset/0ea3d00ae370f4bcf846a4bacd7620c4ec7f5ce7.png';
import { Instagram, Twitter, Mail } from 'lucide-react';

interface FooterSectionProps {
  onContactClick: () => void;
}

export function FooterSection({ onContactClick }: FooterSectionProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('footer-section');
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

  const socials = [
    { 
      name: 'Patreon', 
      url: 'https://patreon.com/RawMosaic',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003"/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/raw.mosaic',
      icon: <Instagram className="w-8 h-8" />
    },
    { 
      name: 'Threads', 
      url: 'https://www.threads.com/@raw.mosaic',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.883h-.116c-.97.013-1.812.285-2.502.804-.686.516-1.074 1.174-1.156 1.955l-2.037-.237c.193-1.396.861-2.584 1.988-3.533 1.13-.95 2.577-1.437 4.302-1.45h.13c1.672 0 3.022.537 4.012 1.595.935 1 1.488 2.37 1.65 4.078.054.38.085.766.098 1.154.543.317 1.01.71 1.392 1.177 1.01 1.236 1.52 2.816 1.52 4.697 0 2.034-.776 3.81-2.31 5.28-1.706 1.637-4.076 2.434-7.05 2.458"/>
        </svg>
      )
    },
    { 
      name: 'X', 
      url: 'https://x.com/The_Beloved_Fr',
      icon: <Twitter className="w-8 h-8" />
    },
    { 
      name: 'ProtonMail', 
      url: 'mailto:Mosaic@mail.rawmosaic.com',
      icon: <Mail className="w-8 h-8" />
    },
  ];

  return (
    <section 
      id="footer-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black py-20"
    >
      {/* Background image with blur and parallax */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div 
          className="absolute top-0 left-0 w-full h-[120%]"
          style={{
            transform: `translateY(${(scrollY - 5000) * 0.3 - 600}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <ImageWithFallback 
            src={footerBackground}
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              filter: 'blur(10px)',
            }}
          />
        </div>
      </div>
      
      {/* Color gradient overlay - warm dark tones */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(
              45deg,
              rgba(139, 69, 19, 0.3) 0%,
              rgba(160, 82, 45, 0.25) 25%,
              rgba(205, 133, 63, 0.35) 47%,
              rgba(210, 105, 30, 0.4) 50%,
              rgba(205, 133, 63, 0.35) 53%,
              rgba(160, 82, 45, 0.25) 75%,
              rgba(139, 69, 19, 0.3) 100%
            )
          `,
          transform: `translateX(${-100 + scrollProgress * 100}%)`,
          opacity: scrollProgress * 0.8,
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl px-8 md:px-16 flex flex-col items-center">
        {/* Header Text */}
        <div 
          className="mb-16 text-center max-w-4xl"
          style={{
            transform: `translateY(${50 - scrollProgress * 50}px)`,
            opacity: scrollProgress,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          <h2 
            className="text-3xl md:text-5xl"
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
                0 0 15px rgba(210, 105, 30, 0.5)
              `,
            }}
          >
            If you have project offers or if my page sparked your interest, please send me an email.
          </h2>
        </div>

        {/* Social Media Icons */}
        <div 
          className="mb-16 flex gap-8 flex-wrap justify-center"
          style={{
            transform: `scale(${0.8 + scrollProgress * 0.2})`,
            opacity: scrollProgress,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          {socials.map((social, index) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              style={{
                animation: 'float 6s ease-in-out infinite',
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(210, 105, 30, 0.4) 0%,
                      rgba(205, 133, 63, 0.3) 50%,
                      rgba(160, 82, 45, 0.4) 100%
                    ),
                    rgba(20, 20, 40, 0.85)
                  `,
                  boxShadow: `
                    0 0 30px rgba(210, 105, 30, 0.4),
                    inset 0 0 20px rgba(255, 255, 255, 0.1)
                  `,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <div className="text-white/90 group-hover:text-white transition-colors">
                  {social.icon}
                </div>
              </div>
              
              {/* Hover glow */}
              <div 
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(210, 105, 30, 0.4) 0%, transparent 70%)',
                  filter: 'blur(15px)',
                }}
              ></div>
              
              {/* Label */}
              <div 
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  fontFamily: '"ethnocentric", sans-serif',
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  textShadow: '0 0 10px rgba(210, 105, 30, 0.8)',
                }}
              >
                {social.name}
              </div>
            </a>
          ))}
        </div>

        {/* Big CTA Button */}
        <div 
          className="mb-16"
          style={{
            transform: `translateY(${30 - scrollProgress * 30}px)`,
            opacity: scrollProgress,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          <button
            onClick={onContactClick}
            className="group relative inline-block"
            style={{
              animation: 'float 7s ease-in-out infinite',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <div 
              className="px-16 py-8 rounded-2xl transition-all duration-300 group-hover:scale-105"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(210, 105, 30, 0.5) 0%,
                    rgba(205, 133, 63, 0.4) 50%,
                    rgba(160, 82, 45, 0.5) 100%
                  ),
                  rgba(20, 20, 40, 0.9)
                `,
                boxShadow: `
                  0 0 60px rgba(210, 105, 30, 0.6),
                  inset 0 0 40px rgba(255, 255, 255, 0.15),
                  0 10px 40px rgba(0, 0, 0, 0.5)
                `,
                border: '3px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <h3
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
                    0 0 25px rgba(210, 105, 30, 0.8)
                  `,
                }}
              >
                Reach Out Now
              </h3>
            </div>
            
            {/* Pulsing glow on hover */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(210, 105, 30, 0.4) 0%, transparent 70%)',
                filter: 'blur(30px)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            ></div>
          </button>
        </div>

        {/* Copyright / Footer note */}
        <div 
          className="text-center"
          style={{
            opacity: scrollProgress * 0.7,
            transition: 'opacity 0.3s ease-out',
          }}
        >
          <p
            className="text-sm mb-8"
            style={{
              fontFamily: '"ethnocentric", sans-serif',
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.6)',
              textShadow: '0 0 10px rgba(0, 0, 0, 0.8)',
            }}
          >
            © 2026 Mosaic | Freyja Reffelmann
          </p>
          
          {/* Impressum */}
          <div
            className="text-xs leading-relaxed"
            style={{
              fontFamily: '"ethnocentric", sans-serif',
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.5)',
              textShadow: '0 0 10px rgba(0, 0, 0, 0.8)',
            }}
          >
            <p className="mb-2">Impressum</p>
            <p>Angaben gemäß §5 DDG</p>
            <p>Freyja Reffelmann</p>
            <p>c/o Block Services</p>
            <p>Stuttgarter Str. 106</p>
            <p>70736 Fellbach</p>
          </div>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
}