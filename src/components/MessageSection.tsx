import React, { useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import messageImage from 'figma:asset/2e5e21908b616ba0c4193ccd8ade0d22d0f8caef.png';
import cardImage1 from 'figma:asset/91ec1f109fe3de88a40bd643973c24a96c2a8048.png';
import cardImage2 from 'figma:asset/5f4b997448157987bc10978694afaf6ed4072aae.png';
import cardImage3 from 'figma:asset/33ac7490b468449c611ab0f88289d6ed83c48509.png';

export function MessageSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = React.useState(0);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('message-section');
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

  const messages = [
    {
      title: "Embracing Unique Beauty",
      text: "My goal is to highlight the unique beauty of every individual body, helping others recognize what makes them truly stunning. I believe in celebrating diversity, emphasizing that beauty comes in many forms, and no one needs to fit a single ideal to be beautiful.",
      delay: 0,
      align: 'left' as const,
    },
    {
      title: "Fashion as Personal Expression",
      text: "Many view fashion as merely a symbol of status or a functional tool. However, I believe it can be so much more — an extension of your personality. Fashion allows you to express the depth and uniqueness of who you truly are, showcasing your individuality to the world.",
      delay: 0.15,
      align: 'right' as const,
    },
    {
      title: "Connecting with My Body",
      text: "My deepest motivation for modeling comes from the process of positioning myself, seeing the results, and finding a sense of identity in the final images. Each photoshoot deepens my connection with my body, leaving me with a renewed sense of love and appreciation for it.",
      delay: 0.3,
      align: 'left' as const,
    },
  ];

  return (
    <section 
      id="message-section"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black py-20"
    >
      {/* Background image with blur and parallax */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div 
          className="absolute top-0 left-0 w-full h-[120%]"
          style={{
            transform: `translateY(${(scrollY - 3000) * 0.3}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <ImageWithFallback 
            src={messageImage}
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              filter: 'blur(10px)',
            }}
          />
        </div>
      </div>
      
      {/* Color gradient overlay - matching blue/purple tones */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(
              45deg,
              rgba(30, 58, 138, 0.35) 0%,
              rgba(67, 56, 202, 0.3) 25%,
              rgba(99, 102, 241, 0.35) 47%,
              rgba(129, 140, 248, 0.4) 50%,
              rgba(67, 56, 202, 0.35) 53%,
              rgba(30, 58, 138, 0.3) 75%,
              rgba(15, 23, 42, 0.35) 100%
            )
          `,
          transform: `translateX(${-100 + scrollProgress * 100}%)`,
          opacity: scrollProgress * 0.8,
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
        }}
      ></div>
      
      {/* Content with scroll animations */}
      <div className="relative z-10 w-full max-w-5xl px-8 md:px-16">
        {/* Header */}
        <div 
          className="mb-20 text-center"
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
                0 0 20px rgba(129, 140, 248, 0.5)
              `,
            }}
          >
            My Message
          </h1>
        </div>

        {/* Messages */}
        {messages.map((message, index) => {
          const adjustedProgress = Math.max(0, Math.min(1, (scrollProgress - message.delay) * 1.3));
          
          return (
            <div 
              key={index}
              className={`mb-16 ${message.align === 'right' ? 'text-right' : 'text-left'} relative`}
              style={{
                transform: message.align === 'left' 
                  ? `translateX(${-450 + adjustedProgress * 450}px)`
                  : `translateX(${450 - adjustedProgress * 450}px)`,
                opacity: adjustedProgress,
                transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
              }}
            >
              {/* Floating glass accent card */}
              <div 
                className={`absolute ${message.align === 'left' ? 'right-0 translate-x-full ml-8' : 'left-0 -translate-x-full mr-8'} top-1/2 -translate-y-1/2 hidden lg:block`}
                style={{
                  transform: `translateY(${-50 + adjustedProgress * 50}%) ${message.align === 'left' ? 'translateX(100%)' : 'translateX(-100%)'}`,
                  opacity: adjustedProgress * 0.6,
                  animation: 'float 8s ease-in-out infinite',
                  animationDelay: `${index * 0.5}s`,
                  perspective: '1000px',
                }}
                onMouseEnter={() => {
                  const newFlipped = [...flippedCards];
                  newFlipped[index] = true;
                  setFlippedCards(newFlipped);
                }}
                onMouseLeave={() => {
                  const newFlipped = [...flippedCards];
                  newFlipped[index] = false;
                  setFlippedCards(newFlipped);
                }}
              >
                <div 
                  className="w-32 h-48 relative cursor-pointer"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flippedCards[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: 'transform 0.6s',
                  }}
                >
                  {/* Front - Glass panel */}
                  <div 
                    className="absolute inset-0 rounded-lg backdrop-blur-md border-2 border-white/20 overflow-hidden"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      boxShadow: `
                        0 0 40px rgba(129, 140, 248, 0.3),
                        inset 0 0 30px rgba(255, 255, 255, 0.1)
                      `,
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Glass shimmer effect */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                        animation: 'shimmer-slow 4s ease-in-out infinite',
                        animationDelay: `${index * 0.7}s`,
                      }}
                    ></div>
                    
                    {/* Decorative lines */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 p-4">
                      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                      <div className="w-3/4 h-0.5 bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent"></div>
                      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                  </div>

                  {/* Back - Image */}
                  <div 
                    className="absolute inset-0 rounded-lg border-2 border-white/30 overflow-hidden"
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                      boxShadow: `
                        0 0 50px rgba(129, 140, 248, 0.5),
                        inset 0 0 30px rgba(255, 255, 255, 0.2)
                      `,
                    }}
                  >
                    <ImageWithFallback 
                      src={index === 0 ? cardImage1 : index === 1 ? cardImage2 : cardImage3}
                      alt={`Card ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Subheader */}
              <h2 
                className="text-3xl md:text-5xl mb-6"
                style={{
                  fontFamily: '"ethnocentric", sans-serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'rgba(255, 255, 255, 0.2)',
                  WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.9)',
                  textStroke: '1.5px rgba(255, 255, 255, 0.9)',
                  textShadow: `
                    1px 1px 0px rgba(255, 255, 255, 0.3),
                    -1px -1px 0px rgba(0, 0, 0, 0.5)
                  `,
                }}
              >
                {message.title}
              </h2>
              
              {/* Body text */}
              <p 
                className="text-lg md:text-xl leading-relaxed max-w-3xl"
                style={{
                  fontFamily: '"ethnocentric", sans-serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'rgba(255, 255, 255, 0.85)',
                  textShadow: `
                    1px 1px 2px rgba(0, 0, 0, 0.8),
                    0 0 10px rgba(99, 102, 241, 0.3)
                  `,
                  marginLeft: message.align === 'right' ? 'auto' : '0',
                  marginRight: message.align === 'left' ? 'auto' : '0',
                }}
              >
                {message.text}
              </p>
            </div>
          );
        })}
      </div>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes shimmer-slow {
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
      `}</style>
    </section>
  );
}