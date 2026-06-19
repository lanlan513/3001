import { Star, BookOpen } from 'lucide-react';
import type { MagazineCover } from '@/types';

export default function CoverCard({
  cover,
  onClick,
}: {
  cover: MagazineCover;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group text-left transition-all hover:scale-[1.02] duration-300"
    >
      <div className="museum-frame relative overflow-hidden">
        <div className="aspect-[3/4] bg-gradient-to-br from-museum-burgundy/30 via-museum-black to-museum-gold/20 flex flex-col items-center justify-center p-6 relative">
          {cover.productPreviewUrl ? (
            <div className="absolute inset-0 opacity-30">
              <img
                src={cover.productPreviewUrl}
                alt={cover.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}

          <div className="absolute inset-0 bg-gradient-to-t from-museum-black/80 via-transparent to-museum-black/60" />

          <div className="relative z-10 text-center w-full">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="w-4 h-4 text-museum-gold" />
              <span className="font-sans text-xs tracking-[0.3em] text-museum-gold uppercase">
                Vol.{String(cover.issueNumber).padStart(3, '0')}
              </span>
              <Star className="w-4 h-4 text-museum-gold" />
            </div>

            <div className="gold-divider w-16 mx-auto mb-4" />

            <h3 className="font-display text-2xl md:text-3xl gold-text-gradient mb-2 leading-tight">
              {cover.title}
            </h3>

            <p className="font-body text-sm text-museum-gray mb-6 leading-relaxed">
              {cover.subtitle}
            </p>

            {cover.productPreviewUrl && (
              <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-museum-gold/40 overflow-hidden">
                <img
                  src={cover.productPreviewUrl}
                  alt="cover product"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="gold-divider w-16 mx-auto mb-4" />

            <div className="flex items-center justify-center gap-2 text-museum-gold/60">
              <BookOpen className="w-3 h-3" />
              <span className="font-sans text-xs tracking-wider uppercase">
                第 {cover.publishDay} 天出版
              </span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-museum-gold/0 group-hover:bg-museum-gold/5 transition-colors pointer-events-none" />
      </div>
    </button>
  );
}
