import React from 'react';

const facts = [
  {
    text: "Transforming visions into visual stories through the lens",
    align: "right" as const,
  },
  {
    text: "Bringing characters to life with passion and creativity",
    align: "left" as const,
  },
  {
    text: "Creating content that inspires and connects with audiences worldwide",
    align: "right" as const,
  },
];

export function FactsSection() {
  return (
    <div className="relative">
      {facts.map((fact, index) => (
        <section
          key={index}
          className="relative min-h-screen flex items-center justify-center px-8 md:px-16 py-32 bg-blue-600"
        >
          {/* Fact content */}
          <div
            className={`relative z-10 max-w-4xl ${
              fact.align === 'right' ? 'ml-auto text-right' : 'mr-auto text-left'
            }`}
          >
            <p className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight">
              {fact.text}
            </p>
            <div
              className={`mt-8 h-1 w-32 bg-white/50 ${
                fact.align === 'right' ? 'ml-auto' : 'mr-auto'
              }`}
            ></div>
          </div>
        </section>
      ))}
    </div>
  );
}
