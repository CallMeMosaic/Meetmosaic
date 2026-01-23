import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import gallery1 from 'figma:asset/12b376718a2142e58ee380f278397829435e31b1.png';
import gallery2 from 'figma:asset/6576d4da695e1339c399e3274411318f3f4a29f4.png';

const carouselImages = [
  gallery1,
  gallery2,
  'https://images.unsplash.com/photo-1735720520926-f3425679b103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NwbGF5JTIwY29zdHVtZXxlbnwxfHx8fDE3NjkxMzk1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1569171133563-f562ae163dc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5MTM5NTM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1721411395539-152e35906fc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTA4NjEyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1700040186780-18adbcc909b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3RpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjkxMzk1Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
];

const categories = [
  { name: 'Headshots', image: 'https://images.unsplash.com/photo-1721411395539-152e35906fc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTA4NjEyN3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Act/Partial Act', image: gallery1 },
  { name: 'Nature', image: 'https://images.unsplash.com/photo-1569171133563-f562ae163dc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5MTM5NTM4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1704208316515-a32f81e373ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY5MDIzMTkxfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Cosplay', image: 'https://images.unsplash.com/photo-1735720520926-f3425679b103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NwbGF5JTIwY29zdHVtZXxlbnwxfHx8fDE3NjkxMzk1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Castings', image: gallery2 },
];

export function GallerySection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative bg-blue-600 py-20 px-4 md:px-8">
      {/* Carousel Gallery */}
      <div className="max-w-6xl mx-auto mb-20">
        <h2 className="text-5xl md:text-6xl font-light text-white mb-12 text-center">
          Featured Work
        </h2>
        <div className="relative">
          {/* Carousel container */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: currentSlide === index ? 1 : 0,
                  pointerEvents: currentSlide === index ? 'auto' : 'none',
                }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-3 rounded-full transition-colors z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-3 rounded-full transition-colors z-10"
              aria-label="Next slide"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-light text-white mb-12 text-center">
          Portfolio Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <a
              key={index}
              href={`#${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative overflow-hidden rounded-lg aspect-[4/5] cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                <h3 className="text-white text-2xl md:text-3xl font-light">
                  {category.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
