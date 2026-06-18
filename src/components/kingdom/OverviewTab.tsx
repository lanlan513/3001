import {
  ShoppingBag,
  Package,
  TrendingUp,
  Mic2,
  Sparkles,
  Factory,
  TrendingDown,
  Minus,
  RefreshCw,
} from 'lucide-react';
import type { Product, MarketTrend, FashionShow } from '@/types';
import { styles } from '@/data/kingdomConstants';

export default function OverviewTab({
  products,
  totalStock,
  storageCapacity,
  activeProducts,
  soldUnits,
  totalRevenue,
  totalProfit,
  fashionShows,
  marketTrends,
  onGoDesign,
  onGoProducts,
  onGoShows,
  onReset,
}: {
  products: Product[];
  totalStock: number;
  storageCapacity: number;
  activeProducts: number;
  soldUnits: number;
  totalRevenue: number;
  totalProfit: number;
  fashionShows: FashionShow[];
  marketTrends: MarketTrend[];
  onGoDesign: () => void;
  onGoProducts: () => void;
  onGoShows: () => void;
  onReset: () => void;
}) {
  const successfulShows = fashionShows.filter((s) => s.success === true).length;
  const totalBuzz = fashionShows.reduce((sum, s) => sum + s.buzzGenerated, 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="gold-border p-6">
          <div className="flex items-center gap-2 mb-2 text-museum-gold">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-sans text-xs tracking-wider uppercase">产品线</span>
          </div>
          <p className="font-display text-3xl text-museum-ivory">{products.length}</p>
          <p className="font-sans text-sm text-museum-gray mt-1">{activeProducts} 款在售</p>
        </div>
        <div className="gold-border p-6">
          <div className="flex items-center gap-2 mb-2 text-museum-burgundy-light">
            <Package className="w-5 h-5" />
            <span className="font-sans text-xs tracking-wider uppercase">库存</span>
          </div>
          <p className="font-display text-3xl text-museum-ivory">{totalStock}</p>
          <p className="font-sans text-sm text-museum-gray mt-1">
            / {storageCapacity} 双 ({Math.round((totalStock / storageCapacity) * 100)}%)
          </p>
        </div>
        <div className="gold-border p-6">
          <div className="flex items-center gap-2 mb-2 text-green-400">
            <TrendingUp className="w-5 h-5" />
            <span className="font-sans text-xs tracking-wider uppercase">总销量</span>
          </div>
          <p className="font-display text-3xl text-museum-ivory">{soldUnits}</p>
          <p className="font-sans text-sm text-museum-gray mt-1">
            营收 ¥{totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="gold-border p-6">
          <div className="flex items-center gap-2 mb-2 text-museum-gold">
            <Mic2 className="w-5 h-5" />
            <span className="font-sans text-xs tracking-wider uppercase">发布会</span>
          </div>
          <p className="font-display text-3xl text-museum-ivory">{successfulShows}</p>
          <p className="font-sans text-sm text-museum-gray mt-1">累计热度 {totalBuzz}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="gold-border p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-2xl text-museum-gold">快速操作</h3>
            <button
              onClick={() => {
                if (confirm('确定要重新开始游戏吗？所有进度将丢失！')) onReset();
              }}
              className="text-museum-gray hover:text-museum-burgundy-light transition-colors p-2"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <QuickActionCard
              icon={<Sparkles className="w-8 h-8" />}
              title="设计新品"
              desc="创造独特的高跟鞋设计"
              onClick={onGoDesign}
              color="gold"
            />
            <QuickActionCard
              icon={<Factory className="w-8 h-8" />}
              title="生产定价"
              desc="管理库存和产品定价"
              onClick={onGoProducts}
              color="burgundy"
            />
            <QuickActionCard
              icon={<Mic2 className="w-8 h-8" />}
              title="举办发布会"
              desc="提升品牌知名度"
              onClick={onGoShows}
              color="gray"
            />
          </div>

          <div className="mt-8 pt-6 border-t border-museum-gold/10">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display text-xl text-museum-ivory">利润概览</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-museum-burgundy/10 border border-museum-burgundy/30 p-4">
                <p className="font-sans text-xs tracking-wider text-museum-gray uppercase mb-1">
                  总营收
                </p>
                <p className="font-display text-2xl text-green-400">
                  +¥{totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-museum-gold/10 border border-museum-gold/30 p-4">
                <p className="font-sans text-xs tracking-wider text-museum-gray uppercase mb-1">
                  净利润
                </p>
                <p
                  className={`font-display text-2xl ${
                    totalProfit >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {totalProfit >= 0 ? '+' : ''}¥{totalProfit.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="gold-border p-6">
          <h3 className="font-display text-2xl text-museum-gold mb-6">市场风向</h3>
          <div className="space-y-4">
            {marketTrends.slice(0, 4).map((t) => {
              const styleInfo = styles.find((s) => s.id === t.style);
              return (
                <div key={t.style} className="flex items-center gap-3">
                  <span className="text-2xl">{styleInfo?.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-body text-sm text-museum-ivory">
                        {styleInfo?.name}
                      </span>
                      <span
                        className={`font-sans text-xs flex items-center gap-1 ${
                          t.trend === 'rising'
                            ? 'text-green-400'
                            : t.trend === 'falling'
                            ? 'text-red-400'
                            : 'text-museum-gray'
                        }`}
                      >
                        {t.trend === 'rising' && <TrendingUp className="w-3 h-3" />}
                        {t.trend === 'falling' && <TrendingDown className="w-3 h-3" />}
                        {t.trend === 'stable' && <Minus className="w-3 h-3" />}
                        {t.popularity}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-museum-gold/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          t.popularity >= 70
                            ? 'bg-green-500'
                            : t.popularity >= 40
                            ? 'bg-museum-gold'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${t.popularity}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({
  icon,
  title,
  desc,
  onClick,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
  color: 'gold' | 'burgundy' | 'gray';
}) {
  const colorClasses = {
    gold: 'hover:bg-museum-gold/10 hover:border-museum-gold',
    burgundy: 'hover:bg-museum-burgundy/10 hover:border-museum-burgundy',
    gray: 'hover:bg-museum-gray/10 hover:border-museum-gray',
  };
  const iconColors = {
    gold: 'text-museum-gold',
    burgundy: 'text-museum-burgundy-light',
    gray: 'text-museum-gray',
  };
  const Plus = () => <span className="text-museum-gold">+</span>;

  return (
    <button
      onClick={onClick}
      className={`gold-border p-6 text-left transition-all group ${colorClasses[color]}`}
    >
      <div className={`${iconColors[color]} mb-3 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h4 className="font-display text-xl text-museum-ivory mb-1">{title}</h4>
      <p className="font-sans text-xs text-museum-gray tracking-wide">{desc}</p>
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Plus />
      </div>
    </button>
  );
}
