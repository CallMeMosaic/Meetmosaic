import React from 'react';
import glassOverlay from 'figma:asset/a76009b40925b0452de19cde0d67c8c219c8f4a2.png';

export function FracturedGlass() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Broken glass overlay image */}
      <img 
        src={glassOverlay}
        alt=""
        className="w-full h-full object-cover opacity-40"
        style={{
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}
