import { X, Star, BookOpen, Calendar, Zap } from 'lucide-react';
import type { MagazineCover } from '@/types';

export default function CoverModal({
  cover,
  onClose,
}: {
  cover: MagazineCover;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="museum-frame max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-museum-black"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start p-6 border-b border-museum-gold/20">
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 text-museum-gold" />
            <div>
              <p className="font-sans text-xs tracking-[0.3em] text-museum-gold uppercase">
                Vol.{String(cover.issueNumber).padStart(3, '0')}
              </p>
              <h2 className="font-display text-2xl gold-text-gradient">{cover.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-museum-gray hover:text-museum-ivory transition-colors p-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {cover.productPreviewUrl && (
            <div className="aspect-video bg-gradient-to-br from-museum-burgundy/20 to-museum-gold/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <img
                  src={cover.productPreviewUrl}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 text-center">
                <div className="w-32 h-32 mx-auto rounded-full border-2 border-museum-gold/50 overflow-hidden mb-4">
                  <img
                    src={cover.productPreviewUrl}
                    alt="featured product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-display text-xl text-museum-gold">封面设计师作品</p>
              </div>
            </div>
          )}

          <div>
            <h3 className="font-display text-xl text-museum-ivory mb-2">{cover.subtitle}</h3>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-museum-gray">
                <Calendar className="w-4 h-4" />
                <span className="font-sans text-sm">出版于第 {cover.publishDay} 天</span>
              </div>
              {cover.productId && (
                <div className="flex items-center gap-2 text-museum-gold">
                  <Zap className="w-4 h-4" />
                  <span className="font-sans text-sm">封面产品</span>
                </div>
              )}
            </div>
          </div>

          <div className="gold-divider w-full" />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-museum-gold" />
              <h4 className="font-display text-lg text-museum-gold">本期精选</h4>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-museum-gold/5 border border-museum-gold/10">
                <p className="font-body text-sm text-museum-ivory">
                  本期杂志聚焦当季最热门的高跟鞋设计趋势，深度解读时尚潮流背后的故事与灵感。
                </p>
              </div>
              {cover.productId && (
                <div className="p-4 bg-museum-burgundy/10 border border-museum-burgundy/20">
                  <p className="font-body text-sm text-museum-ivory">
                    🌟 封面特别推荐：你的设计作品凭借超高人气登上本期封面！这将大幅提升品牌知名度与产品销量。
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="font-sans text-xs tracking-[0.3em] text-museum-gold/40 uppercase">
              Fashion Magazine • Stiletto Weekly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
