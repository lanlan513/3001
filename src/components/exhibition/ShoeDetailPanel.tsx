import { X, Crown, Star, Award, Calendar, Palette, User } from 'lucide-react';
import type { ExhibitionShoe } from '@/data/exhibitionShoes';

interface ShoeDetailPanelProps {
  shoe: ExhibitionShoe | null;
  onClose: () => void;
}

const rarityConfig = {
  legendary: {
    label: '传奇臻品',
    icon: Crown,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/30',
    glowColor: 'shadow-yellow-400/20',
  },
  iconic: {
    label: '经典标志',
    icon: Star,
    color: 'text-gray-300',
    bgColor: 'bg-gray-300/10',
    borderColor: 'border-gray-300/30',
    glowColor: 'shadow-gray-300/20',
  },
  classic: {
    label: '时代经典',
    icon: Award,
    color: 'text-amber-600',
    bgColor: 'bg-amber-600/10',
    borderColor: 'border-amber-600/30',
    glowColor: 'shadow-amber-600/20',
  },
};

export default function ShoeDetailPanel({ shoe, onClose }: ShoeDetailPanelProps) {
  if (!shoe) return null;

  const rarity = rarityConfig[shoe.rarity];
  const RarityIcon = rarity.icon;

  return (
    <div className="absolute inset-y-0 right-0 w-80 md:w-96 z-20 pointer-events-auto">
      <div className="h-full bg-museum-black/95 backdrop-blur-xl border-l border-museum-gold/20 flex flex-col animate-slide-up">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-museum-gold/5 to-transparent pointer-events-none" />

          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${rarity.bgColor} ${rarity.borderColor} border`}>
                <RarityIcon className={`w-4 h-4 ${rarity.color}`} />
                <span className={`font-sans text-xs tracking-wider uppercase ${rarity.color}`}>
                  {rarity.label}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-museum-gold/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-museum-gray" />
              </button>
            </div>

            <p className="font-sans text-xs tracking-[0.25em] text-museum-gold/70 uppercase mb-2">
              {shoe.era}
            </p>
            <h2 className="font-display text-3xl font-bold gold-text-gradient mb-2 leading-tight">
              {shoe.name}
            </h2>
            <p className="font-sans text-sm text-museum-gray">
              {shoe.brand} · {shoe.year}
            </p>
          </div>
        </div>

        <div className="px-6">
          <div className="gold-divider" />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-museum-gold/5 rounded-lg border border-museum-gold/10">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-museum-gold" />
                <span className="font-sans text-xs tracking-wider text-museum-gold/70 uppercase">
                  年代
                </span>
              </div>
              <p className="font-body text-xl text-museum-ivory">
                {shoe.year}
              </p>
            </div>
            <div className="p-3 bg-museum-gold/5 rounded-lg border border-museum-gold/10">
              <div className="flex items-center gap-2 mb-1">
                <Palette className="w-4 h-4 text-museum-gold" />
                <span className="font-sans text-xs tracking-wider text-museum-gold/70 uppercase">
                  颜色
                </span>
              </div>
              <p className="font-body text-xl text-museum-ivory">
                {shoe.color}
              </p>
            </div>
          </div>

          <div className="p-4 bg-museum-gold/5 rounded-lg border border-museum-gold/10">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-museum-gold" />
              <span className="font-sans text-xs tracking-wider text-museum-gold/70 uppercase">
                设计师
              </span>
            </div>
            <p className="font-body text-xl text-museum-ivory">
              {shoe.designer}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-sans text-sm tracking-widest uppercase text-museum-gold flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-museum-gold" />
              珍品故事
              <span className="w-1 h-1 rounded-full bg-museum-gold" />
            </h3>
            <p className="font-body text-base text-museum-gray leading-relaxed drop-cap">
              {shoe.fullStory || shoe.shortStory}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-sans text-sm tracking-widest uppercase text-museum-gold flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-museum-gold" />
              交互提示
              <span className="w-1 h-1 rounded-full bg-museum-gold" />
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-sm">
                <span className="text-museum-gold mt-1">•</span>
                <span className="font-body text-museum-gray">拖拽旋转展厅视角，环视所有展品</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="text-museum-gold mt-1">•</span>
                <span className="font-body text-museum-gray">滚轮或上下滑动缩放，欣赏细节</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="text-museum-gold mt-1">•</span>
                <span className="font-body text-museum-gray">点击展品展柜，查看详细信息</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-6 border-t border-museum-gold/20">
          <div className="museum-frame">
            <p className="font-sans text-xs tracking-[0.25em] text-museum-gold/70 uppercase mb-2 text-center">
              藏品编号
            </p>
            <p className="font-mono text-center text-museum-ivory text-lg tracking-wider">
              EXH-{shoe.id.toUpperCase().slice(0, 8)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
