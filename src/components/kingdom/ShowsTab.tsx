import { Mic2, Plus, Sparkles } from 'lucide-react';
import type { FashionShow, Product } from '@/types';
import { seasons } from '@/data/kingdomConstants';

export default function ShowsTab({
  shows,
  products,
  onOpenShow,
}: {
  shows: FashionShow[];
  products: Product[];
  onOpenShow: () => void;
}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="font-display text-3xl text-museum-gold">时尚发布会</h2>
          <p className="font-body text-museum-gray mt-1">
            举办发布会提升品牌知名度，展示新品系列
          </p>
        </div>
        <button
          onClick={onOpenShow}
          disabled={products.length === 0}
          className="btn-gold inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          <span>举办发布会</span>
        </button>
      </div>

      {products.length === 0 && (
        <div className="gold-border p-8 text-center bg-museum-burgundy/5">
          <Mic2 className="w-12 h-12 text-museum-gray/30 mx-auto mb-3" />
          <p className="font-body text-museum-gray">先设计产品，才能举办发布会哦！</p>
        </div>
      )}

      {shows.length === 0 && products.length > 0 ? (
        <div className="gold-border p-12 text-center">
          <Mic2 className="w-20 h-20 text-museum-gold/30 mx-auto mb-6" />
          <p className="font-display text-2xl text-museum-gray mb-2">还没有举办过发布会</p>
          <p className="font-body text-museum-gray/60 mb-6">
            举办一场惊艳的发布会，让你的品牌一炮而红！
          </p>
          <button onClick={onOpenShow} className="btn-gold inline-flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>首秀登场</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {shows.map((show, idx) => (
            <div
              key={show.id}
              className={`gold-border p-6 ${
                show.success
                  ? 'bg-gradient-to-r from-museum-gold/5 to-transparent'
                  : show.success === false
                  ? 'bg-gradient-to-r from-museum-burgundy/5 to-transparent'
                  : ''
              }`}
            >
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-display text-2xl text-museum-ivory">{show.name}</h3>
                    <span
                      className={`px-3 py-1 font-sans text-xs rounded ${
                        show.success
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : show.success === false
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-museum-gray/20 text-museum-gray'
                      }`}
                    >
                      {show.success ? '✨ 大获成功' : show.success === false ? '😔 反响平平' : '进行中'}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-museum-gray mt-2">
                    {seasons.find((s) => s.id === show.season)?.icon}{' '}
                    {seasons.find((s) => s.id === show.season)?.name}系列 · 预算 ¥
                    {show.budget.toLocaleString()} · #{idx + 1}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MiniStat label="营销触达" value={`${show.marketingReach}`} />
                <MiniStat label="产品数量" value={`${show.products.length}款`} />
                <MiniStat
                  label="产生热度"
                  value={`+${show.buzzGenerated}`}
                  valueColor="text-museum-gold"
                />
                <MiniStat
                  label="直接收益"
                  value={`+¥${show.revenueBoost.toLocaleString()}`}
                  valueColor={show.revenueBoost > 0 ? 'text-green-400' : 'text-museum-gray'}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {show.products.map((pid) => {
                  const p = products.find((prod) => prod.id === pid);
                  return p ? (
                    <span key={pid} className="tag text-xs bg-museum-black/50">
                      {p.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MiniStat({
  label,
  value,
  valueColor = 'text-museum-ivory',
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="bg-museum-black/20 p-3 rounded">
      <p className="font-sans text-xs text-museum-gray uppercase tracking-wider mb-1">{label}</p>
      <p className={`font-display text-lg ${valueColor}`}>{value}</p>
    </div>
  );
}
