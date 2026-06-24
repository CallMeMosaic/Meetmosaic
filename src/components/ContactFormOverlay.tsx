import React, { useState, useEffect } from 'react';
import { X, Send, Zap } from 'lucide-react';

interface ContactFormOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactFormOverlay({ isOpen, onClose }: ContactFormOverlayProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Contact form failed:", errorText);
                alert(errorText);
                throw new Error(errorText);
            }

            alert('Message sent!');
            setFormData({ name: '', email: '', projectType: '', message: '' });
            onClose();
        } catch (error) {
            alert('Message could not be sent. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        animation: 'fadeIn 0.4s ease-out',
      }}
    >
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 backdrop-blur-md"
        style={{
          background: 'rgba(0, 0, 0, 0.85)',
        }}
        onClick={onClose}
      />

      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              125deg,
              rgba(0, 255, 255, 0.15) 0%,
              rgba(138, 43, 226, 0.15) 25%,
              rgba(0, 191, 255, 0.15) 50%,
              rgba(138, 43, 226, 0.15) 75%,
              rgba(0, 255, 255, 0.15) 100%
            )
          `,
          animation: 'gradient-shift 8s ease infinite',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: 'rgba(0, 255, 255, 0.6)',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
            animation: `float-particle 6s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Contact Form Container */}
      <div 
        className="relative z-10 w-full max-w-3xl mx-4 md:mx-8"
        style={{
          animation: 'slideInUp 0.5s ease-out',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center group transition-all duration-300 hover:scale-110 z-20"
          style={{
            background: `
              linear-gradient(135deg,
                rgba(0, 255, 255, 0.4) 0%,
                rgba(138, 43, 226, 0.4) 100%
              ),
              rgba(20, 20, 40, 0.95)
            `,
            border: '2px solid rgba(0, 255, 255, 0.5)',
            boxShadow: `
              0 0 30px rgba(0, 255, 255, 0.5),
              inset 0 0 20px rgba(255, 255, 255, 0.1)
            `,
          }}
        >
          <X className="w-6 h-6 text-cyan-300 group-hover:text-white transition-colors" />
        </button>

        {/* Form Card */}
        <div 
          className="relative p-8 md:p-12 rounded-3xl overflow-hidden"
          style={{
            background: `
              linear-gradient(135deg,
                rgba(0, 255, 255, 0.05) 0%,
                rgba(138, 43, 226, 0.05) 100%
              ),
              rgba(10, 10, 30, 0.95)
            `,
            border: '2px solid rgba(0, 255, 255, 0.3)',
            boxShadow: `
              0 0 60px rgba(0, 255, 255, 0.3),
              inset 0 0 60px rgba(138, 43, 226, 0.1),
              0 20px 60px rgba(0, 0, 0, 0.5)
            `,
          }}
        >
          {/* Scanline effect */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)',
              animation: 'scanline 8s linear infinite',
            }}
          />

          {/* Header */}
          <div className="mb-10 text-center relative">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Zap className="w-8 h-8 text-cyan-400" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.8))' }} />
              <h2
                className="text-4xl md:text-6xl"
                style={{
                  fontFamily: '"ethnocentric", sans-serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'rgba(0, 255, 255, 0.2)',
                  WebkitTextStroke: '2px rgba(0, 255, 255, 0.95)',
                  textStroke: '2px rgba(0, 255, 255, 0.95)',
                  textShadow: `
                    2px 2px 0px rgba(0, 255, 255, 0.3),
                    -2px -2px 0px rgba(138, 43, 226, 0.3),
                    0 0 20px rgba(0, 255, 255, 0.8),
                    0 0 40px rgba(138, 43, 226, 0.5)
                  `,
                }}
              >
                Initialize Contact
              </h2>
              <Zap className="w-8 h-8 text-purple-400" style={{ filter: 'drop-shadow(0 0 10px rgba(138, 43, 226, 0.8))' }} />
            </div>
            <p
              className="text-sm md:text-base"
              style={{
                fontFamily: '"ethnocentric", sans-serif',
                fontStyle: 'italic',
                color: 'rgba(0, 255, 255, 0.7)',
                textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
              }}
            >
              Transmit your message through the digital void
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative group">
              <label
                htmlFor="name"
                className="block mb-2 text-sm"
                style={{
                  fontFamily: '"ethnocentric", sans-serif',
                  fontStyle: 'italic',
                  color: 'rgba(0, 255, 255, 0.8)',
                  textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-xl transition-all duration-300 focus:outline-none"
                style={{
                  background: 'rgba(0, 20, 40, 0.6)',
                  border: '2px solid rgba(0, 255, 255, 0.3)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid rgba(0, 255, 255, 0.8)';
                  e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.5)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid rgba(0, 255, 255, 0.3)';
                  e.target.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.5)';
                }}
              />
            </div>

            {/* Email Field */}
            <div className="relative group">
              <label
                htmlFor="email"
                className="block mb-2 text-sm"
                style={{
                  fontFamily: '"ethnocentric", sans-serif',
                  fontStyle: 'italic',
                  color: 'rgba(0, 255, 255, 0.8)',
                  textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-xl transition-all duration-300 focus:outline-none"
                style={{
                  background: 'rgba(0, 20, 40, 0.6)',
                  border: '2px solid rgba(0, 255, 255, 0.3)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid rgba(0, 255, 255, 0.8)';
                  e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.5)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid rgba(0, 255, 255, 0.3)';
                  e.target.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.5)';
                }}
              />
            </div>

            {/* Project Type Dropdown */}
            <div className="relative group">
              <label
                htmlFor="projectType"
                className="block mb-2 text-sm"
                style={{
                  fontFamily: '"ethnocentric", sans-serif',
                  fontStyle: 'italic',
                  color: 'rgba(0, 255, 255, 0.8)',
                  textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                }}
              >
                Project Type
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-xl transition-all duration-300 focus:outline-none cursor-pointer"
                style={{
                  background: 'rgba(0, 20, 40, 0.6)',
                  border: '2px solid rgba(0, 255, 255, 0.3)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid rgba(0, 255, 255, 0.8)';
                  e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.5)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid rgba(0, 255, 255, 0.3)';
                  e.target.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.5)';
                }}
              >
                <option value="">Select project type...</option>
                <option value="modeling">Modeling</option>
                <option value="photography">Photography</option>
                <option value="collaboration">Collaboration</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message Field */}
            <div className="relative group">
              <label
                htmlFor="message"
                className="block mb-2 text-sm"
                style={{
                  fontFamily: '"ethnocentric", sans-serif',
                  fontStyle: 'italic',
                  color: 'rgba(0, 255, 255, 0.8)',
                  textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-6 py-4 rounded-xl transition-all duration-300 focus:outline-none resize-none"
                style={{
                  background: 'rgba(0, 20, 40, 0.6)',
                  border: '2px solid rgba(0, 255, 255, 0.3)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid rgba(0, 255, 255, 0.8)';
                  e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.5)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid rgba(0, 255, 255, 0.3)';
                  e.target.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.5)';
                }}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative px-12 py-6 rounded-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: `
                    linear-gradient(135deg,
                      rgba(0, 255, 255, 0.5) 0%,
                      rgba(138, 43, 226, 0.5) 100%
                    ),
                    rgba(20, 20, 40, 0.95)
                  `,
                  border: '3px solid rgba(0, 255, 255, 0.5)',
                  boxShadow: `
                    0 0 40px rgba(0, 255, 255, 0.6),
                    inset 0 0 30px rgba(255, 255, 255, 0.1),
                    0 10px 40px rgba(0, 0, 0, 0.5)
                  `,
                }}
              >
                <div className="flex items-center gap-3">
                  <Send className="w-6 h-6 text-cyan-300 group-hover:text-white transition-colors" />
                  <span
                    className="text-2xl md:text-3xl"
                    style={{
                      fontFamily: '"ethnocentric", sans-serif',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      color: 'rgba(0, 255, 255, 0.2)',
                      WebkitTextStroke: '1.5px rgba(0, 255, 255, 0.95)',
                      textStroke: '1.5px rgba(0, 255, 255, 0.95)',
                      textShadow: `
                        1px 1px 0px rgba(0, 255, 255, 0.3),
                        -1px -1px 0px rgba(138, 43, 226, 0.3),
                        0 0 15px rgba(0, 255, 255, 0.8)
                      `,
                    }}
                  >
                    {isSubmitting ? 'Transmitting...' : 'Send Message'}
                  </span>
                </div>

                {/* Button glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                    animation: 'pulse-glow-cyber 2s ease-in-out infinite',
                  }}
                />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(-30px) translateX(20px);
            opacity: 0.5;
          }
          75% {
            opacity: 0.8;
          }
        }

        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes pulse-glow-cyber {
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
    </div>
  );
}