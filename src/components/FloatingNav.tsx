import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface FloatingNavProps {
    onContactClick: () => void;
}

export function FloatingNav({ onContactClick }: FloatingNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'HOME', href: '#hero' },
    { label: 'ABOUT', href: '#about-section' },
    { label: 'PORTFOLIO', href: '#portfolio' },
      { label: 'CONTACT', href: '#contact', action: onContactClick },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed top-8 right-8 z-50">
      {/* Floating Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
        aria-label="Navigation menu"
      >
        {/* Glass bubble */}
        <div
          className="w-16 h-16 rounded-full backdrop-blur-md border-2 border-white/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-white/60 group-hover:shadow-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            boxShadow: `
              0 0 30px rgba(255, 255, 255, 0.2),
              inset 0 0 20px rgba(255, 255, 255, 0.1)
            `,
          }}
        >
          {/* Icon with rotation animation */}
          <div
            className="transition-transform duration-300"
            style={{
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          >
            {isOpen ? (
              <X size={28} className="text-white" />
            ) : (
              <Menu size={28} className="text-white" />
            )}
          </div>
        </div>

        {/* Pulse effect on hover */}
        <div
          className="absolute inset-0 rounded-full border-2 border-white/20 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"
          style={{
            animation: 'pulse 2s infinite',
          }}
        ></div>
      </button>

      {/* Expanded Menu */}
      <div
        className={`absolute top-20 right-0 transition-all duration-300 origin-top-right ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div
          className="backdrop-blur-md rounded-lg border-2 border-white/30 p-6 min-w-[200px]"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            boxShadow: `
              0 0 40px rgba(255, 255, 255, 0.15),
              inset 0 0 30px rgba(255, 255, 255, 0.05)
            `,
          }}
        >
          <nav className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                    if (item.action) {
                        item.action();
                        setIsOpen(false);
                    } else {
                        scrollToSection(item.href);
                    }
                }}
                className="group relative text-left px-4 py-3 rounded transition-all duration-300 hover:bg-white/10"
                style={{
                  fontFamily: '"ethnocentric", sans-serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                }}
              >
                {/* Text */}
                <span className="relative z-10 text-white text-sm tracking-wider group-hover:text-white transition-colors">
                  {item.label}
                </span>

                {/* Hover glow line */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-white/60 group-hover:w-full transition-all duration-300"
                  style={{
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
                  }}
                ></div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* CSS for pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.15);
          }
        }
      `}</style>
    </div>
  );
}
