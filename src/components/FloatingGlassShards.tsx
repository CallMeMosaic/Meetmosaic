import React, { useEffect, useState } from 'react';

interface Shard {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  drift: number;
}

export function FloatingGlassShards() {
  const [shards, setShards] = useState<Shard[]>([]);

  useEffect(() => {
    // Create initial shards
    const initialShards: Shard[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100,
      size: Math.random() * 20 + 10, // 10-30px
      rotation: Math.random() * 360,
      speed: Math.random() * 0.3 + 0.1, // 0.1-0.4
      drift: Math.random() * 2 - 1, // -1 to 1
    }));

    setShards(initialShards);

    // Animate shards
    const animationInterval = setInterval(() => {
      setShards(prev =>
        prev.map(shard => ({
          ...shard,
          y: (shard.y + shard.speed) % 110, // Loop back to top when past bottom
          x: (shard.x + shard.drift * 0.05 + 100) % 100, // Slight horizontal drift
          rotation: (shard.rotation + 0.5) % 360,
        }))
      );
    }, 50);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {shards.map(shard => (
        <div
          key={shard.id}
          className="absolute"
          style={{
            left: `${shard.x}%`,
            top: `${shard.y}%`,
            width: shard.size,
            height: shard.size,
            transform: `rotate(${shard.rotation}deg)`,
            transition: 'all 0.05s linear',
          }}
        >
          {/* Glass shard SVG */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Irregular polygon to look like glass shard */}
            <polygon
              points="10,2 18,8 15,18 5,16 2,6"
              fill="rgba(255, 255, 255, 0.1)"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="0.5"
            />
            {/* Highlight edge */}
            <line
              x1="10"
              y1="2"
              x2="18"
              y2="8"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="0.8"
            />
            {/* Reflection */}
            <polygon
              points="10,2 12,6 8,8"
              fill="rgba(255, 255, 255, 0.2)"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
