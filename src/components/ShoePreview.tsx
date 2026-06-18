import { useMemo } from 'react';
import type { DesignerShoeConfig } from '@/types';

interface ShoePreviewProps {
  config: DesignerShoeConfig;
  size?: number;
}

const materialTextures: Record<string, { pattern: string; opacity: number }> = {
  satin: { pattern: 'satin', opacity: 0.15 },
  leather: { pattern: 'leather', opacity: 0.1 },
  suede: { pattern: 'suede', opacity: 0.2 },
  patent: { pattern: 'patent', opacity: 0.3 },
  velvet: { pattern: 'velvet', opacity: 0.25 },
};

const decorationPositions: Record<string, { x: number; y: number }[]> = {
  bow: [{ x: 120, y: 180 }],
  buckle: [{ x: 200, y: 160 }],
  rhinestone: [
    { x: 100, y: 190 },
    { x: 130, y: 175 },
    { x: 160, y: 165 },
    { x: 190, y: 160 },
  ],
  tassel: [{ x: 80, y: 200 }],
  feather: [{ x: 60, y: 150 }],
  none: [],
};

export default function ShoePreview({ config, size = 400 }: ShoePreviewProps) {
  const { heelHeight, material, color, decoration, toeShape, strapStyle } = config;

  const heelHeightPx = useMemo(() => {
    const minHeel = 40;
    const maxHeel = 180;
    const ratio = (heelHeight - 2) / (18 - 2);
    return minHeel + ratio * (maxHeel - minHeel);
  }, [heelHeight]);

  const toePath = useMemo(() => {
    switch (toeShape) {
      case 'pointed':
        return 'M 60 220 Q 30 210 20 200 Q 15 190 25 185 L 80 175 Q 70 190 60 220 Z';
      case 'rounded':
        return 'M 60 220 Q 25 215 20 195 Q 18 180 40 175 L 80 175 Q 70 195 60 220 Z';
      case 'square':
        return 'M 60 220 L 25 215 L 20 190 L 25 178 L 80 175 Q 70 195 60 220 Z';
      case 'almond':
        return 'M 60 220 Q 35 212 25 198 Q 22 185 45 178 L 80 175 Q 70 195 60 220 Z';
      default:
        return 'M 60 220 Q 30 210 20 200 Q 15 190 25 185 L 80 175 Q 70 190 60 220 Z';
    }
  }, [toeShape]);

  const vampPath = useMemo(() => {
    const heelBaseY = 220;
    const heelTopY = 220 - heelHeightPx;
    return `M 80 175 Q 120 150 180 145 Q 240 140 280 ${heelTopY + 15} L 290 ${heelBaseY} L 260 ${heelBaseY} Q 250 ${heelTopY + 30} 220 ${heelTopY + 25} Q 180 160 120 170 Q 90 175 80 175 Z`;
  }, [heelHeightPx]);

  const heelPath = useMemo(() => {
    const heelBaseY = 220;
    const heelTopY = 220 - heelHeightPx;
    return `M 260 ${heelBaseY} L 280 ${heelTopY + 15} L 300 ${heelTopY} L 310 ${heelTopY + 5} L 290 ${heelBaseY} L 260 ${heelBaseY} Z`;
  }, [heelHeightPx]);

  const solePath = useMemo(() => {
    return 'M 25 215 L 60 220 L 260 220 L 290 220 L 280 225 L 25 222 Z';
  }, []);

  const strapPath = useMemo(() => {
    switch (strapStyle) {
      case 'ankle':
        return {
          main: 'M 250 155 Q 280 150 295 165 Q 300 175 290 185 L 270 180 Q 260 170 250 165 Z',
          buckle: null as string | null,
        };
      case 'tstrap':
        return {
          main: 'M 150 145 L 155 180 M 130 175 Q 150 165 170 175 Q 180 180 175 190 L 125 190 Q 120 180 130 175 Z',
          buckle: null as string | null,
        };
      case 'slingback':
        return {
          main: 'M 270 155 Q 300 160 305 180 Q 300 195 280 190 L 270 185',
          buckle: null as string | null,
        };
      case 'maryjane':
        return {
          main: 'M 130 160 Q 170 155 210 160 Q 220 165 215 175 L 125 175 Q 120 165 130 160 Z',
          buckle: 'M 200 160 L 210 165 L 200 170',
        };
      default:
        return { main: '', buckle: null };
    }
  }, [strapStyle]);

  const materialInfo = materialTextures[material] || materialTextures.satin;
  const decorations = decorationPositions[decoration] || [];

  const lighterColor = useMemo(() => {
    const hex = color.replace('#', '');
    const r = Math.min(255, parseInt(hex.substr(0, 2), 16) + 40);
    const g = Math.min(255, parseInt(hex.substr(2, 2), 16) + 40);
    const b = Math.min(255, parseInt(hex.substr(4, 2), 16) + 40);
    return `rgb(${r}, ${g}, ${b})`;
  }, [color]);

  const darkerColor = useMemo(() => {
    const hex = color.replace('#', '');
    const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - 40);
    const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - 40);
    const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - 40);
    return `rgb(${r}, ${g}, ${b})`;
  }, [color]);

  const viewboxSize = 350;

  return (
    <div
      className="relative museum-frame flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${viewboxSize} ${viewboxSize}`}
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
      >
        <defs>
          <linearGradient id="shoeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={lighterColor} />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor={darkerColor} />
          </linearGradient>

          <linearGradient id="heelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={darkerColor} />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor={lighterColor} />
          </linearGradient>

          <linearGradient id="soleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B0000" />
            <stop offset="100%" stopColor="#4A0000" />
          </linearGradient>

          <pattern
            id="satinPattern"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            patternTransform="rotate(45)"
          >
            <rect width="20" height="20" fill="transparent" />
            <line x1="0" y1="0" x2="0" y2="20" stroke="white" strokeWidth="0.5" opacity={materialInfo.opacity} />
          </pattern>

          <pattern
            id="leatherPattern"
            patternUnits="userSpaceOnUse"
            width="10"
            height="10"
          >
            <rect width="10" height="10" fill="transparent" />
            <circle cx="5" cy="5" r="0.5" fill="black" opacity={materialInfo.opacity} />
          </pattern>

          <pattern
            id="suedePattern"
            patternUnits="userSpaceOnUse"
            width="4"
            height="4"
          >
            <rect width="4" height="4" fill="transparent" />
            <circle cx="2" cy="2" r="1" fill="black" opacity={materialInfo.opacity} />
          </pattern>

          <pattern
            id="patentPattern"
            patternUnits="userSpaceOnUse"
            width="50"
            height="50"
          >
            <rect width="50" height="50" fill="transparent" />
            <ellipse cx="25" cy="10" rx="20" ry="5" fill="white" opacity={materialInfo.opacity} />
          </pattern>

          <pattern
            id="velvetPattern"
            patternUnits="userSpaceOnUse"
            width="6"
            height="6"
          >
            <rect width="6" height="6" fill="transparent" />
            <line x1="0" y1="3" x2="6" y2="3" stroke="black" strokeWidth="0.5" opacity={materialInfo.opacity} />
            <line x1="3" y1="0" x2="3" y2="6" stroke="black" strokeWidth="0.3" opacity={materialInfo.opacity * 0.5} />
          </pattern>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="rhinestoneGradient">
            <stop offset="0%" stopColor="white" />
            <stop offset="50%" stopColor="#E8E8E8" />
            <stop offset="100%" stopColor="#B8B8B8" />
          </radialGradient>
        </defs>

        <path d={solePath} fill="url(#soleGradient)" />

        <path d={toePath} fill="url(#shoeGradient)" />
        <path
          d={toePath}
          fill={`url(#${materialInfo.pattern}Pattern)`}
          opacity="0.5"
        />

        <path d={vampPath} fill="url(#shoeGradient)" />
        <path
          d={vampPath}
          fill={`url(#${materialInfo.pattern}Pattern)`}
          opacity="0.5"
        />

        <path d={heelPath} fill="url(#heelGradient)" />
        <path
          d={heelPath}
          fill={`url(#${materialInfo.pattern}Pattern)`}
          opacity="0.5"
        />

        {strapStyle !== 'none' && strapPath.main && (
          <>
            <path d={strapPath.main} fill={color} stroke={darkerColor} strokeWidth="0.5" />
            {strapPath.buckle && (
              <path d={strapPath.buckle} fill="none" stroke="#D4AF8A" strokeWidth="2" />
            )}
          </>
        )}

        {decoration === 'bow' && (
          <g transform={`translate(${decorations[0]?.x || 0}, ${decorations[0]?.y || 0})`}>
            <ellipse cx="-15" cy="0" rx="15" ry="10" fill={color} filter="url(#glow)" />
            <ellipse cx="15" cy="0" rx="15" ry="10" fill={color} filter="url(#glow)" />
            <circle cx="0" cy="0" r="6" fill={darkerColor} />
          </g>
        )}

        {decoration === 'buckle' && (
          <g transform={`translate(${decorations[0]?.x || 0}, ${decorations[0]?.y || 0})`}>
            <rect x="-12" y="-8" width="24" height="16" rx="2" fill="none" stroke="#D4AF8A" strokeWidth="2" />
            <rect x="-3" y="-6" width="6" height="12" fill="#D4AF8A" />
            <circle cx="-10" cy="0" r="1.5" fill="#D4AF8A" />
            <circle cx="-5" cy="0" r="1.5" fill="#D4AF8A" />
          </g>
        )}

        {decoration === 'rhinestone' &&
          decorations.map((pos, i) => (
            <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
              <circle r="4" fill="url(#rhinestoneGradient)" filter="url(#glow)" />
              <circle r="2" fill="white" opacity="0.8" />
            </g>
          ))}

        {decoration === 'tassel' && (
          <g transform={`translate(${decorations[0]?.x || 0}, ${decorations[0]?.y || 0})`}>
            <circle cx="0" cy="-5" r="5" fill={darkerColor} />
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1={-4 + i}
                y1="0"
                x2={-6 + i * 1.5}
                y2="25"
                stroke={color}
                strokeWidth="1.5"
              />
            ))}
          </g>
        )}

        {decoration === 'feather' && (
          <g transform={`translate(${decorations[0]?.x || 0}, ${decorations[0]?.y || 0})`}>
            <path
              d="M 0 0 Q -20 -30 -10 -60 Q 0 -75 10 -60 Q 20 -30 0 0"
              fill={color}
              opacity="0.8"
              filter="url(#glow)"
            />
            <path d="M 0 -5 L 0 -55" stroke={darkerColor} strokeWidth="1" />
            {[...Array(6)].map((_, i) => (
              <line
                key={i}
                x1="0"
                y1={-10 - i * 8}
                x2={-8 - i * 2}
                y2={-15 - i * 8}
                stroke={darkerColor}
                strokeWidth="0.5"
                opacity="0.6"
              />
            ))}
            {[...Array(6)].map((_, i) => (
              <line
                key={`r-${i}`}
                x1="0"
                y1={-10 - i * 8}
                x2={8 + i * 2}
                y2={-15 - i * 8}
                stroke={darkerColor}
                strokeWidth="0.5"
                opacity="0.6"
              />
            ))}
          </g>
        )}

        <path
          d="M 60 220 Q 30 210 20 200"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
