import { Sparkles, Plus } from 'lucide-react';
import ShoePreview from '@/components/ShoePreview';
import type { Product } from '@/types';
import { styles, seasons } from '@/data/kingdomConstants';

export default function DesignTab({
  onOpenDesign,
  products,
}: {
  onOpenDesign: () => void;
  products: Product[];
}) {
  return (
    <div className="space-y-8">
      <div className="gold-border p-8 text-center bg-gradient-to-br from-museum-gold/5 to-transparent">
        <Sparkles className="w-16 h-16 text-museum-gold mx-auto mb-4" />
        <h2 className="font-display text-3xl gold-text-gradient mb-3">设计工坊</h2>
        <p className="font-body text-museum-gray max-w-xl mx-auto mb-6">
          发挥创意，设计独一无二的高跟鞋系列。选择材质、颜色、装饰，打造属于你的品牌风格。
        </p>
        <button
          onClick={onOpenDesign}
          className="btn-gold inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>开始新设计</span>
        </button>
      </div>

      {products.length > 0 && (
        <div>
          <h3 className="font-display text-2xl text-museum-gold mb-6">最近设计</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="gold-border p-4 group hover:bg-museum-gold/5 transition-all">
                <div className="aspect-square mb-4 flex items-center justify-center bg-museum-black/30 rounded">
                  <ShoePreview config={p.design} size={200} />
                </div>
                <h4 className="font-display text-lg text-museum-ivory mb-2">{p.name}</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="tag text-xs">
                    {styles.find((s) => s.id === p.design.style)?.icon}
                    {styles.find((s) => s.id === p.design.style)?.name}
                  </span>
                  <span className="tag text-xs">
                    {seasons.find((s) => s.id === p.design.season)?.icon}
                    {seasons.find((s) => s.id === p.design.season)?.name}
                  </span>
                  <span className="tag text-xs">{p.design.quality}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
