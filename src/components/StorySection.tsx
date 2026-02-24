import React, { useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import storyImage from 'figma:asset/6576d4da695e1339c399e3274411318f3f4a29f4.png';

export function StorySection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('story-section');
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

  const paragraphs = [
    {
      text: "I am a model and data science student with a strong aspiration to build a career in cybersecurity and AI. Who also found a strong interest in creating content online.",
      delay: 0,
      align: 'left' as const,
    },
    {
      text: "From a young age, I've been captivated by the worlds of photography and fashion. Luckily, some of my friends shared this passion, giving me the perfect opportunity to start posing for their photos.",
      delay: 0.1,
      align: 'right' as const,
    },
    {
      text: "Modeling is my ultimate form of self-expression. I firmly believe that the right outfit can illuminate one's personality and tell a unique story. The excitement of being part of a creative vision and the joy of seeing it come to life is incredibly fulfilling to me.",
      delay: 0.2,
      align: 'left' as const,
    },
    {
      text: "I aim to expand my portfolio and become a professional, versatile model in the near future. My goal is to inspire others by showing how beautiful self-expression can be, even if one doesn't fit the classic beauty standards.",
      delay: 0.3,
      align: 'right' as const,
    },
  ];

  return (
    <section 
      id="story-section"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black py-20"
    >
      {/* Background image with blur */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div 
          className="absolute top-0 left-0 w-full h-[120%]"
          style={{
            transform: `translateY(${(scrollY - 2000) * 0.3}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <ImageWithFallback 
            src={storyImage}
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              filter: 'blur(10px)',
            }}
          />
        </div>
      </div>
      
      {/* Color gradient overlay - INVERTED DIRECTION matching new image colors */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(
              -45deg,
              rgba(168, 85, 247, 0.35) 0%,
              rgba(217, 70, 239, 0.3) 25%,
              rgba(236, 72, 153, 0.35) 47%,
              rgba(217, 70, 239, 0.4) 50%,
              rgba(147, 51, 234, 0.35) 53%,
              rgba(126, 34, 206, 0.3) 75%,
              rgba(109, 40, 217, 0.35) 100%
            )
          `,
          transform: `translateX(${100 - (scrollProgress || 0) * 100}%)`,
          opacity: (scrollProgress || 0) * 0.8,
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
        }}
      ></div>
      
      {/* Content with scroll animations */}
      <div className="relative z-10 w-full max-w-4xl px-8 md:px-16">
        {paragraphs.map((para, index) => {
          const adjustedProgress = Math.max(0, Math.min(1, ((scrollProgress || 0) - para.delay) * 1.5));
          
          return (
            <div 
              key={index}
              className={`mb-10 ${para.align === 'right' ? 'text-right' : 'text-left'}`}
              style={{
                transform: para.align === 'left' 
                  ? `translateX(${-400 + adjustedProgress * 400}px)`
                  : `translateX(${400 - adjustedProgress * 400}px)`,
                opacity: adjustedProgress,
                transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
              }}
            >
              <p 
                className="text-lg md:text-2xl leading-relaxed"
                style={{
                  fontFamily: '"ethnocentric", sans-serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'rgba(255, 255, 255, 0.9)',
                  textShadow: `
                    1px 1px 2px rgba(0, 0, 0, 0.8),
                    0 0 10px rgba(236, 72, 153, 0.3)
                  `,
                }}
              >
                {para.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}