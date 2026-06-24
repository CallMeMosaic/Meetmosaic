import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CosplayGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TimelineSection {
  id: string;
  year: string;
  title: string;
  description: string;
  images: Array<{ id: number; url: string; title: string }>;
}

export function CosplayGallery({ isOpen, onClose }: CosplayGalleryProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ sectionId: string; imageIndex: number } | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  // Timeline sections - each represents a chapter in your cosplay journey
  const timelineSections: TimelineSection[] = [
    {
      id: 'FOUT-2026',
      year: '2026',
      title: 'Cyberpunk Aesthetics',
      description: 'Futuristic tech & neon dreams',
      images: [
        { id: 1, url: '/sorted_assets/cosplay/FOU_GS/NeonOne1.jpg', title: 'FOUT-1' },
        { id: 2, url: '/sorted_assets/cosplay/FOU_GS/NeonOne2.jpg', title: 'FOUT-2' },
      ],
    },
    {
      id: 'Demon-2026',
      year: '2026',
      title: 'Succubus Royalty',
      description: 'Try not to get seduced :p',
      images: [
        { id: 5, url: '/sorted_assets/cosplay/Succubus_Royalty/Grab.jpg', title: 'Succubus Royalty 1' },
        { id: 6, url: '/sorted_assets/cosplay/Succubus_Royalty/Grab-2.jpg', title: 'Succubus Royalty 2' },
        { id: 7, url: '/sorted_assets/cosplay/Succubus_Royalty/Grab-4.jpg', title: 'Succubus Royalty 3' },
        { id: 8, url: '/sorted_assets/cosplay/Succubus_Royalty/Noble.jpg', title: 'Succubus Royalty 4' },
        { id: 9, url: '/sorted_assets/cosplay/Succubus_Royalty/Noble-2.jpg', title: 'Succubus Royalty 5' },
        { id: 10, url: '/sorted_assets/cosplay/Succubus_Royalty/SuccubusSwordSide1A-2.jpg', title: 'Succubus Royalty 6' },
        { id: 11,url:'/sorted_assets/cosplay/Succubus_Royalty/SuccubusSwordSide1A-5.jpg',title:'Succubus Royalty 7' },
        { id: 12, url:'/sorted_assets/cosplay/Succubus_Royalty/SuccubusSwordSide2.jpg',title:'Succubus Royalty 8' },
        { id:13,url:'/sorted_assets/cosplay/Succubus_Royalty/SuccubusSwordSide2-2.jpg',title:'Succubus Royalty 9' },
        {id:14,url:'/sorted_assets/cosplay/Succubus_Royalty/SwordHug.jpg',title:'Succubus Royalty 10' },
        {id:15,url:'/sorted_assets/cosplay/Succubus_Royalty/SwordHug3.jpg',title:'Succubus Royalty 10' },
      ],
    },
    {
      id: 'Metro-OC',
      year: '2025',
      title: 'Metro Exodus OC: Larissa',
      description: 'Dark and gloomy tunnels await',
      images: [
        { id: 16, url: '/sorted_assets/cosplay/Larissa_Metro/MM1.jpg', title: 'Larissa Sitting' },
        { id: 17, url: '/sorted_assets/cosplay/Larissa_Metro/MM2.jpg', title: 'Larissa Walking' },
        { id: 18, url: '/sorted_assets/cosplay/Larissa_Metro/MM3.jpg', title: 'Larissa Sitting 2' },
        { id: 19, url: '/sorted_assets/cosplay/Larissa_Metro/MM4.jpg', title: 'Larissa Close Up' },
      ],
    },
    {
      id: 'The-Last-Of-Us-I',
      year: '',
      title: 'The Last Of Us I: Part 1 "Ellie"',
      description: 'Hide, or the clickers might hear us!',
      images: [
        { id: 20, url: '/sorted_assets/cosplay/TLU/TLU1.jpg', title: 'Sitting and walking' },
        { id: 21, url: '/sorted_assets/cosplay/TLU/TLU2.jpg', title: 'Something moved!' },
        { id: 22, url: '/sorted_assets/cosplay/TLU/TLU3.jpg', title: 'Drawing the Gun' },
        { id: 23, url: '/sorted_assets/cosplay/TLU/TLU4.jpg', title: 'Approaching' },
        { id: 24, url: '/sorted_assets/cosplay/TLU/TLU5.jpg', title: 'Spotting' },
        { id: 25, url: '/sorted_assets/cosplay/TLU/TLU6.jpg', title: 'Close Up' },
        { id: 26, url: '/sorted_assets/cosplay/TLU/TLU7.jpg', title: 'Done!' },
        { id: 27, url: '/sorted_assets/cosplay/TLU/TLU8.jpg', title: 'Fleeing' },
        { id: 28, url: '/sorted_assets/cosplay/TLU/TLU9.jpg', title: 'Nausea xD' },
        { id: 29, url: '/sorted_assets/cosplay/TLU/TLU10.jpg', title: 'Cover Shot!' },

      ],
    },
    {
      id: 'Specials',
      year: '2025',
      title: 'Blood Shot',
      description: 'Blood can also be an artistic medium!',
      images: [
        { id: 30, url: '/sorted_assets/cosplay/BS/BS1.jpg', title: 'Sitting and walking' },
        { id: 31, url: '/sorted_assets/cosplay/BS/BS2.jpg', title: 'Something moved!' },
        { id: 32, url: '/sorted_assets/cosplay/BS/BS3.jpg', title: 'Drawing the Gun' },
        { id: 33, url: '/sorted_assets/cosplay/BS/BS4.jpg', title: 'Approaching' },
        { id: 34, url: '/sorted_assets/cosplay/BS/BS5.jpg', title: 'Spotting' },
        { id: 35, url: '/sorted_assets/cosplay/BS/BS6.jpg', title: 'Close Up' },
        { id: 36, url: '/sorted_assets/cosplay/BS/BS7.jpg', title: 'Done!' },
        { id: 37, url: '/sorted_assets/cosplay/BS/BS8.jpg', title: 'Fleeing' },
        { id: 38, url: '/sorted_assets/cosplay/BS/BS9.jpg', title: 'Nausea xD' },
        { id: 39, url: '/sorted_assets/cosplay/BS/BS10.jpg', title: 'Cover Shot!' },
        { id: 40, url: '/sorted_assets/cosplay/BS/BS11.jpg', title: 'Sitting and walking' },
        { id: 41, url: '/sorted_assets/cosplay/BS/BS12.jpg', title: 'Something moved!' },
        { id: 42, url: '/sorted_assets/cosplay/BS/BS13.jpg', title: 'Drawing the Gun' },
        { id: 43, url: '/sorted_assets/cosplay/BS/BS14.jpg', title: 'Approaching' },
        { id: 44, url: '/sorted_assets/cosplay/BS/BS15.jpg', title: 'Spotting' },
        { id: 45, url: '/sorted_assets/cosplay/BS/BS16.jpg', title: 'Close Up' },
        { id: 46, url: '/sorted_assets/cosplay/BS/BS17.jpg', title: 'Done!' },
        { id: 47, url: '/sorted_assets/cosplay/BS/BS18.jpg', title: 'Fleeing' },
      ],
    },

  ];

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
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
      setExpandedSection(null);
      setSelectedImage(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSectionToggle = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleImageClick = (sectionId: string, imageIndex: number) => {
    setSelectedImage({ sectionId, imageIndex });
  };

  const handlePrevious = () => {
    if (!selectedImage) return;
    const section = timelineSections.find(s => s.id === selectedImage.sectionId);
    if (!section) return;
    
    if (selectedImage.imageIndex > 0) {
      setSelectedImage({ ...selectedImage, imageIndex: selectedImage.imageIndex - 1 });
    } else {
      setSelectedImage({ ...selectedImage, imageIndex: section.images.length - 1 });
    }
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const section = timelineSections.find(s => s.id === selectedImage.sectionId);
    if (!section) return;
    
    if (selectedImage.imageIndex < section.images.length - 1) {
      setSelectedImage({ ...selectedImage, imageIndex: selectedImage.imageIndex + 1 });
    } else {
      setSelectedImage({ ...selectedImage, imageIndex: 0 });
    }
  };

  if (!isOpen) return null;

  const currentSection = selectedImage ? timelineSections.find(s => s.id === selectedImage.sectionId) : null;
  const currentImage = currentSection ? currentSection.images[selectedImage!.imageIndex] : null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        animation: 'fadeIn 0.4s ease-out',
      }}
    >
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 backdrop-blur-lg"
        style={{
          background: 'rgba(0, 0, 0, 0.92)',
        }}
        onClick={() => selectedImage ? setSelectedImage(null) : onClose()}
      />

      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(255, 105, 180, 0.1) 0%,
              rgba(138, 43, 226, 0.1) 25%,
              rgba(75, 0, 130, 0.1) 50%,
              rgba(138, 43, 226, 0.1) 75%,
              rgba(255, 105, 180, 0.1) 100%
            )
          `,
          animation: 'gradient-shift 10s ease infinite',
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
            background: 'rgba(255, 105, 180, 0.6)',
            boxShadow: '0 0 10px rgba(255, 105, 180, 0.8)',
            animation: `float-particle 8s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 w-14 h-14 rounded-full flex items-center justify-center group transition-all duration-300 hover:scale-110 z-50"
        style={{
          background: `
            linear-gradient(135deg,
              rgba(255, 105, 180, 0.4) 0%,
              rgba(138, 43, 226, 0.4) 100%
            ),
            rgba(20, 20, 40, 0.95)
          `,
          border: '2px solid rgba(255, 105, 180, 0.5)',
          boxShadow: `
            0 0 30px rgba(255, 105, 180, 0.5),
            inset 0 0 20px rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        <X className="w-7 h-7 text-pink-300 group-hover:text-white transition-colors" />
      </button>

      {/* Content */}
      {selectedImage ? (
        // Lightbox View
        <div 
          className="relative z-10 w-full h-full flex items-center justify-center p-8"
          style={{
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-8 w-14 h-14 rounded-full flex items-center justify-center group transition-all duration-300 hover:scale-110 z-50"
            style={{
              background: `
                linear-gradient(135deg,
                  rgba(255, 105, 180, 0.4) 0%,
                  rgba(138, 43, 226, 0.4) 100%
                ),
                rgba(20, 20, 40, 0.95)
              `,
              border: '2px solid rgba(255, 105, 180, 0.5)',
              boxShadow: `
                0 0 30px rgba(255, 105, 180, 0.5),
                inset 0 0 20px rgba(255, 255, 255, 0.1)
              `,
            }}
          >
            <ChevronLeft className="w-7 h-7 text-pink-300 group-hover:text-white transition-colors" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-8 w-14 h-14 rounded-full flex items-center justify-center group transition-all duration-300 hover:scale-110 z-50"
            style={{
              background: `
                linear-gradient(135deg,
                  rgba(255, 105, 180, 0.4) 0%,
                  rgba(138, 43, 226, 0.4) 100%
                ),
                rgba(20, 20, 40, 0.95)
              `,
              border: '2px solid rgba(255, 105, 180, 0.5)',
              boxShadow: `
                0 0 30px rgba(255, 105, 180, 0.5),
                inset 0 0 20px rgba(255, 255, 255, 0.1)
              `,
            }}
          >
            <ChevronRight className="w-7 h-7 text-pink-300 group-hover:text-white transition-colors" />
          </button>

          {/* Large Image */}
          {currentImage && (
            <>
              <div 
                className="relative max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden"
                style={{
                  border: '3px solid rgba(255, 105, 180, 0.5)',
                  boxShadow: `
                    0 0 60px rgba(255, 105, 180, 0.4),
                    inset 0 0 40px rgba(255, 255, 255, 0.1)
                  `,
                  animation: 'scaleIn 0.3s ease-out',
                }}
              >
                <ImageWithFallback
                  src={currentImage.url}
                  alt={currentImage.title}
                  className="max-w-full max-h-[85vh] object-contain"
                />
              </div>

              {/* Image info */}
              <div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full flex items-center gap-4"
                style={{
                  background: 'rgba(20, 20, 40, 0.9)',
                  border: '2px solid rgba(255, 105, 180, 0.5)',
                  boxShadow: '0 0 20px rgba(255, 105, 180, 0.3)',
                  fontFamily: '"ethnocentric", sans-serif',
                  fontStyle: 'italic',
                  color: 'rgba(255, 105, 180, 0.9)',
                  textShadow: '0 0 10px rgba(255, 105, 180, 0.8)',
                }}
              >
                <span className="text-sm">{currentSection?.title}</span>
                <span className="text-xs opacity-60">|</span>
                <span className="text-sm">{selectedImage.imageIndex + 1} / {currentSection?.images.length}</span>
              </div>
            </>
          )}
        </div>
      ) : (
        // Timeline View
        <div 
          className="relative z-10 w-full h-full overflow-y-auto py-24 px-8"
          style={{
            animation: 'slideInUp 0.5s ease-out',
          }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-16 text-center">
              <h2
                className="text-5xl md:text-7xl mb-4"
                style={{
                  fontFamily: '"ethnocentric", sans-serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'rgba(255, 105, 180, 0.2)',
                  WebkitTextStroke: '2px rgba(255, 105, 180, 0.95)',
                  textStroke: '2px rgba(255, 105, 180, 0.95)',
                  textShadow: `
                    2px 2px 0px rgba(255, 105, 180, 0.3),
                    -2px -2px 0px rgba(138, 43, 226, 0.3),
                    0 0 20px rgba(255, 105, 180, 0.8),
                    0 0 40px rgba(138, 43, 226, 0.5)
                  `,
                }}
              >
                Cosplay Journey
              </h2>
              <p
                className="text-lg"
                style={{
                  fontFamily: '"ethnocentric", sans-serif',
                  fontStyle: 'italic',
                  color: 'rgba(255, 105, 180, 0.7)',
                  textShadow: '0 0 10px rgba(255, 105, 180, 0.5)',
                }}
              >
                A timeline of character transformations
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div 
                className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 105, 180, 0.3), rgba(138, 43, 226, 0.3))',
                  boxShadow: '0 0 10px rgba(255, 105, 180, 0.5)',
                }}
              />

              {/* Timeline sections */}
              {timelineSections.map((section, index) => (
                <div 
                  key={section.id}
                  className="relative mb-8"
                  style={{
                    animation: `fadeInSlide 0.6s ease-out ${index * 0.15}s backwards`,
                  }}
                >
                  <div className="flex items-start gap-8">
                    {/* Timeline node */}
                    <button
                      onClick={() => handleSectionToggle(section.id)}
                      className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center group transition-all duration-300 hover:scale-110"
                      style={{
                        background: `
                          linear-gradient(135deg,
                            rgba(255, 105, 180, ${expandedSection === section.id ? '0.6' : '0.4'}) 0%,
                            rgba(138, 43, 226, ${expandedSection === section.id ? '0.6' : '0.4'}) 100%
                          ),
                          rgba(20, 20, 40, 0.95)
                        `,
                        border: `3px solid rgba(255, 105, 180, ${expandedSection === section.id ? '0.8' : '0.5'})`,
                        boxShadow: `
                          0 0 ${expandedSection === section.id ? '40' : '30'}px rgba(255, 105, 180, ${expandedSection === section.id ? '0.8' : '0.5'}),
                          inset 0 0 20px rgba(255, 255, 255, 0.1)
                        `,
                        marginLeft: 'calc(2rem - 2rem)',
                      }}
                    >
                      {expandedSection === section.id ? (
                        <ChevronUp className="w-6 h-6 text-pink-300 group-hover:text-white transition-colors" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-pink-300 group-hover:text-white transition-colors" />
                      )}
                      
                      {/* Pulsing glow */}
                      <div 
                        className="absolute inset-0 rounded-full opacity-50"
                        style={{
                          background: 'radial-gradient(circle, rgba(255, 105, 180, 0.6) 0%, transparent 70%)',
                          filter: 'blur(15px)',
                          animation: expandedSection === section.id ? 'pulse-strong 2s ease-in-out infinite' : 'pulse-glow 3s ease-in-out infinite',
                        }}
                      />
                    </button>

                    {/* Section header */}
                    <div className="flex-1 pt-2">
                      <button
                        onClick={() => handleSectionToggle(section.id)}
                        className="text-left w-full group"
                      >
                        <div className="flex items-baseline gap-4 mb-2">
                          {section.year && (
                            <span
                              className="text-2xl md:text-3xl"
                              style={{
                                fontFamily: '"ethnocentric", sans-serif',
                                fontStyle: 'italic',
                                color: 'rgba(255, 105, 180, 0.8)',
                                textShadow: '0 0 15px rgba(255, 105, 180, 0.6)',
                              }}
                            >
                              {section.year}
                            </span>
                          )}
                          <h3
                            className="text-3xl md:text-4xl group-hover:scale-105 transition-transform origin-left"
                            style={{
                              fontFamily: '"ethnocentric", sans-serif',
                              fontWeight: 400,
                              fontStyle: 'italic',
                              color: 'rgba(255, 105, 180, 0.2)',
                              WebkitTextStroke: '1.5px rgba(255, 105, 180, 0.95)',
                              textStroke: '1.5px rgba(255, 105, 180, 0.95)',
                              textShadow: `
                                1px 1px 0px rgba(255, 105, 180, 0.3),
                                -1px -1px 0px rgba(138, 43, 226, 0.3),
                                0 0 15px rgba(255, 105, 180, 0.7)
                              `,
                            }}
                          >
                            {section.title}
                          </h3>
                        </div>
                        <p
                          className="text-base opacity-70"
                          style={{
                            fontFamily: '"ethnocentric", sans-serif',
                            fontStyle: 'italic',
                            color: 'rgba(255, 105, 180, 0.7)',
                            textShadow: '0 0 8px rgba(255, 105, 180, 0.4)',
                          }}
                        >
                          {section.description} • {section.images.length} images
                        </p>
                      </button>

                      {/* Expanded gallery */}
                      {expandedSection === section.id && (
                        <div 
                          className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                          style={{
                            animation: 'expandDown 0.4s ease-out',
                          }}
                        >
                          {section.images.map((image, imgIndex) => (
                            <button
                              key={image.id}
                              onClick={() => handleImageClick(section.id, imgIndex)}
                              className="group relative aspect-[3/4] overflow-hidden rounded-xl transition-all duration-500 hover:scale-105"
                              style={{
                                background: 'rgba(20, 20, 40, 0.6)',
                                border: '2px solid rgba(255, 105, 180, 0.3)',
                                boxShadow: '0 0 20px rgba(255, 105, 180, 0.2)',
                                animation: `fadeInScale 0.4s ease-out ${imgIndex * 0.05}s backwards`,
                              }}
                            >
                              <ImageWithFallback
                                src={image.url}
                                alt={image.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              
                              {/* Gradient overlay */}
                              <div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                  background: `
                                    linear-gradient(
                                      to top,
                                      rgba(255, 105, 180, 0.5) 0%,
                                      transparent 50%
                                    )
                                  `,
                                }}
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes expandDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            max-height: 2000px;
            transform: translateY(0);
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
            opacity: 0.7;
          }
          50% {
            transform: translateY(-40px) translateX(30px);
            opacity: 0.5;
          }
          75% {
            opacity: 0.7;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes pulse-strong {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.4);
          }
        }
      `}</style>
    </div>
  );
}
