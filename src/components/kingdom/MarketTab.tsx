import { Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { MarketTrend, ShoeSeason } from '@/types';
import { seasons, styles } from '@/data/kingdomConstants';

export default function MarketTab({
  trends,
  currentSeason,
}: {
  trends: MarketTrend[];
  currentSeason: ShoeSeason;
}) {
  return (
    <div className="space-y-8">
      <div className="gold-border p-6 bg-gradient-to-r from-museum-burgundy/10 via-transparent to-museum-gold/10">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-8 h-8 text-museum-gold" />
          <div>
            <h2 className="font-display text-2xl text-museum-gold">当前季节</h2>
            <p className="font-body text-museum-ivory text-lg">
              {seasons.find((s) => s.id === currentSeason)?.icon}{' '}
              {seasons.find((s) => s.id === currentSeason)?.name}系列热销中！
            </p>
          </div>
        </div>
        <p className="font-body text-museum-gray">
          符合当季的产品销量提升 20%，反季产品销量下降 30%。
        </p>
      </div>

      <div>
        <h3 className="font-display text-2xl text-museum-gold mb-6">风格流行趋势</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trends.map((t) => {
            const styleInfo = styles.find((s) => s.id === t.style);
            const trendText = {
              rising: '热度上升',
              stable: '保持稳定',
              falling: '逐渐降温',
            }[t.trend];

            return (
              <div
                key={t.style}
                className={`gold-border p-6 relative overflow-hidden ${
                  t.popularity >= 70
                    ? 'border-green-500/30'
                    : t.popularity <= 30
                    ? 'border-red-500/30'
                    : ''
                }`}
              >
                {t.popularity >= 80 && (
                  <div className="absolute top-3 right-3">
                    <span className="font-sans text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded animate-pulse">
                      🔥 爆款风格
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="text-5xl">{styleInfo?.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h4 className="font-display text-2xl text-museum-ivory">
                        {styleInfo?.name}风
                      </h4>
                      <span
                        className={`flex items-center gap-1 font-sans text-xs px-2 py-1 rounded ${
                          t.trend === 'rising'
                            ? 'bg-green-500/20 text-green-400'
                            : t.trend === 'falling'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-museum-gray/20 text-museum-gray'
                        }`}
                      >
                        {t.trend === 'rising' && <TrendingUp className="w-3 h-3" />}
                        {t.trend === 'falling' && <TrendingDown className="w-3 h-3" />}
                        {t.trend === 'stable' && <Minus className="w-3 h-3" />}
                        {trendText}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-sans text-xs text-museum-gray uppercase tracking-wider">
                          流行指数
                        </span>
                        <span className="font-display text-xl text-museum-gold">
                          {t.popularity}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-museum-black rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            t.popularity >= 70
                              ? 'bg-gradient-to-r from-green-600 to-green-400'
                              : t.popularity >= 40
                              ? 'bg-gradient-to-r from-museum-gold-dark to-museum-gold'
                              : 'bg-gradient-to-r from-red-600 to-red-400'
                          }`}
                          style={{ width: `${t.popularity}%` }}
                        />
                      </div>
                    </div>

                    <p className="font-sans text-sm text-museum-gray">
                      预计剩余{' '}
                      <span className="text-museum-gold font-bold">{t.remainingDays}</span> 天
                      {t.remainingDays <= 2 && (
                        <span className="text-museum-burgundy-light ml-2">⚠️ 即将变化</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="gold-border p-6">
        <h3 className="font-display text-2xl text-museum-gold mb-4">全部风格</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {styles.map((s) => {
            const inTrend = trends.some((t) => t.style === s.id);
            return (
              <div
                key={s.id}
                className={`p-4 text-center transition-all ${
                  inTrend
                    ? 'bg-museum-gold/10 border border-museum-gold/50'
                    : 'bg-museum-black/30 border border-museum-gold/10'
                }`}
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="font-body text-sm text-museum-ivory">{s.name}</p>
                <p className="font-sans text-xs mt-1 text-museum-gray">
                  {inTrend ? '流行中' : '普通'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
