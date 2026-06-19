import { useState, useRef, useEffect, useCallback } from 'react';
import type { ExhibitionShoe } from '@/data/exhibitionShoes';
import { exhibitionShoes } from '@/data/exhibitionShoes';

interface ExhibitionStageProps {
  selectedShoe: ExhibitionShoe | null;
  onSelectShoe: (shoe: ExhibitionShoe | null) => void;
}

const rarityColors = {
  legendary: {
    primary: '#FFD700',
    glow: 'rgba(255, 215, 0, 0.4)',
    ring: 'rgba(255, 215, 0, 0.2)',
  },
  iconic: {
    primary: '#C0C0C0',
    glow: 'rgba(192, 192, 192, 0.4)',
    ring: 'rgba(192, 192, 192, 0.2)',
  },
  classic: {
    primary: '#CD7F32',
    glow: 'rgba(205, 127, 50, 0.4)',
    ring: 'rgba(205, 127, 50, 0.2)',
  },
};

const STAGE_RADIUS = 280;
const ITEM_SIZE = 140;

export default function ExhibitionStage({ selectedShoe, onSelectShoe }: ExhibitionStageProps) {
  const [rotation, setRotation] = useState(-20);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [zoom, setZoom] = useState(1);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!autoRotate || isDragging || selectedShoe) return;

    const animate = () => {
      setRotation((prev) => prev + 0.15);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoRotate, isDragging, selectedShoe]);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    setAutoRotate(false);
    lastXRef.current = clientX;
    lastYRef.current = clientY;
  }, []);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return;

    const deltaX = clientX - lastXRef.current;
    const deltaY = clientY - lastYRef.current;

    setRotation((prev) => prev + deltaX * 0.5);
    setZoom((prev) => {
      const newZoom = prev + deltaY * 0.002;
      return Math.max(0.6, Math.min(1.5, newZoom));
    });

    lastXRef.current = clientX;
    lastYRef.current = clientY;
  }, [isDragging]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => setAutoRotate(true), 3000);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => {
      const newZoom = prev - e.deltaY * 0.001;
      return Math.max(0.6, Math.min(1.5, newZoom));
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onWheel={handleWheel}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        handleStart(touch.clientX, touch.clientY);
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }}
      onTouchEnd={handleEnd}
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      <div
        className="relative"
        style={{
          width: '600px',
          height: '600px',
          transformStyle: 'preserve-3d',
          transform: `rotateX(20deg) scale(${zoom})`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.1s linear',
          }}
        >
          {exhibitionShoes.map((shoe) => {
            const angleRad = (shoe.angle * Math.PI) / 180;
            const x = Math.sin(angleRad) * STAGE_RADIUS;
            const z = Math.cos(angleRad) * STAGE_RADIUS;
            const colors = rarityColors[shoe.rarity];
            const isSelected = selectedShoe?.id === shoe.id;

            return (
              <div
                key={shoe.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: ITEM_SIZE,
                  height: ITEM_SIZE + 80,
                  transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${-shoe.angle}deg)`,
                  transformStyle: 'preserve-3d',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectShoe(isSelected ? null : shoe);
                }}
              >
                <div
                  className="relative w-full h-full flex flex-col items-center justify-end cursor-pointer transition-all duration-500"
                  style={{
                    transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                  }}
                >
                  <div
                    className="absolute bottom-16 w-28 h-28 rounded-full blur-2xl transition-all duration-500"
                    style={{
                      background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
                      opacity: isSelected ? 1 : 0.6,
                    }}
                  />

                  <div
                    className="relative mb-4 transition-all duration-500"
                    style={{
                      transform: `translateY(${isSelected ? -8 : 0}px)`,
                    }}
                  >
                    <div
                      className="w-24 h-24 rounded-full absolute inset-0 blur-md"
                      style={{
                        background: `conic-gradient(from 0deg, transparent, ${colors.primary}40, transparent, ${colors.primary}40, transparent)`,
                        animation: isSelected ? 'spin 4s linear infinite' : 'none',
                      }}
                    />
                    <img
                      src={shoe.imageUrl}
                      alt={shoe.name}
                      className="relative w-24 h-24 object-contain drop-shadow-2xl"
                      style={{
                        filter: `drop-shadow(0 10px 20px ${colors.glow})`,
                      }}
                      draggable={false}
                    />
                  </div>

                  <div className="relative flex flex-col items-center">
                    <div
                      className="w-28 h-3 rounded-t-lg"
                      style={{
                        background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.primary}80 100%)`,
                        boxShadow: `0 0 20px ${colors.glow}`,
                      }}
                    />
                    <div
                      className="w-32 h-12"
                      style={{
                        background: 'linear-gradient(180deg, #2a2520 0%, #1a1714 100%)',
                        borderRadius: '0 0 16px 16px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                      }}
                    />
                    <div
                      className="absolute -bottom-1 w-36 h-2 blur-sm"
                      style={{
                        background: `radial-gradient(ellipse, ${colors.glow} 0%, transparent 70%)`,
                      }}
                    />
                  </div>

                  {(isSelected) && (
                    <div
                      className="absolute -bottom-2 w-40 h-40 rounded-full border-2 animate-ping"
                      style={{
                        borderColor: colors.primary,
                        opacity: 0.3,
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}

          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: STAGE_RADIUS * 2,
              height: STAGE_RADIUS * 2,
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  radial-gradient(circle at center, 
                    transparent 0%, 
                    rgba(212, 175, 138, 0.03) 40%, 
                    rgba(212, 175, 138, 0.08) 60%, 
                    rgba(212, 175, 138, 0.1) 100%
                  )
                `,
                boxShadow: 'inset 0 0 60px rgba(212, 175, 138, 0.1)',
              }}
            />
            <div
              className="absolute inset-8 rounded-full border border-museum-gold/20"
            />
            <div
              className="absolute inset-24 rounded-full border border-museum-gold/10"
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212, 175, 138, 0.15) 0%, transparent 70%)',
              }}
            />
          </div>

          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotateX(90deg) translateZ(-1px)',
              width: STAGE_RADIUS * 2.5,
              height: STAGE_RADIUS * 2.5,
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `
                  radial-gradient(circle at center, 
                    rgba(212, 175, 138, 0.08) 0%, 
                    rgba(212, 175, 138, 0.02) 50%, 
                    transparent 80%
                  )
                `,
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
