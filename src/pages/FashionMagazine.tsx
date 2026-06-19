import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Flame,
  Newspaper,
  Sparkles,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';
import { useFashionMagazineStore } from '@/store/useFashionMagazineStore';
import { useCompanyStore } from '@/store/useCompanyStore';
import NewsCard from '@/components/magazine/NewsCard';
import TrendEventBanner from '@/components/magazine/TrendEventBanner';
import CoverCard from '@/components/magazine/CoverCard';
import CoverModal from '@/components/magazine/CoverModal';
import type { MagazineCover } from '@/types';

type TabType = 'news' | 'trends' | 'covers';

export default function FashionMagazine() {
  const [activeTab, setActiveTab] = useState<TabType>('news');
  const [selectedCover, setSelectedCover] = useState<MagazineCover | null>(null);

  const {
    news,
    trendEvents,
    covers,
    issueCounter,
  } = useFashionMagazineStore();

  const {
    currentDay,
    currentSeason,
    marketTrends,
    products,
    advanceDay,
  } = useCompanyStore();

  useEffect(() => {
    const mgStore = useFashionMagazineStore.getState();
    if (mgStore.lastNewsDay < currentDay) {
      mgStore.generateDailyNews(currentDay, currentSeason, marketTrends, products);
    }
  }, [currentDay, currentSeason, marketTrends, products]);

  const handleAdvanceDay = () => {
    advanceDay();
  };

  const tabs = [
    { id: 'news' as TabType, label: '时尚资讯', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'trends' as TabType, label: '热点事件', icon: <Flame className="w-4 h-4" /> },
    { id: 'covers' as TabType, label: '杂志封面', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen">
      <header className="relative py-6 md:py-8 border-b border-museum-gold/20 bg-gradient-to-b from-museum-burgundy/10 via-museum-gold/5 to-transparent">
        <div className="container">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-museum-gray hover:text-museum-gold transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans text-sm tracking-wider uppercase">返回首页</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-10 h-10 text-museum-gold" />
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold gold-text-gradient">
                    时尚杂志社
                  </h1>
                  <p className="font-sans text-sm tracking-[0.2em] text-museum-gray uppercase">
                    Stiletto Weekly • 第 {currentDay} 天
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="gold-border px-4 py-2 bg-museum-black/50">
                <div className="flex items-center gap-2 text-museum-gold">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-sans text-xs tracking-wider uppercase">已出版</span>
                </div>
                <p className="font-display text-2xl text-museum-ivory">{issueCounter}</p>
              </div>
              <div className="gold-border px-4 py-2 bg-museum-black/50">
                <div className="flex items-center gap-2 text-museum-burgundy-light">
                  <Flame className="w-4 h-4" />
                  <span className="font-sans text-xs tracking-wider uppercase">活跃热点</span>
                </div>
                <p className="font-display text-2xl text-museum-ivory">{trendEvents.length}</p>
              </div>
              <div className="gold-border px-4 py-2 bg-museum-black/50">
                <div className="flex items-center gap-2 text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-sans text-xs tracking-wider uppercase">资讯</span>
                </div>
                <p className="font-display text-2xl text-museum-ivory">{news.length}</p>
              </div>
              <button
                onClick={handleAdvanceDay}
                className="btn-gold flex items-center gap-2 animate-pulse hover:animate-none"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="font-sans text-sm tracking-wider">下一天</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="border-b border-museum-gold/10 sticky top-0 bg-museum-black/95 backdrop-blur z-40">
        <div className="container">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-sans text-sm tracking-wider whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'text-museum-gold border-museum-gold'
                    : 'text-museum-gray border-transparent hover:text-museum-ivory'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.id === 'trends' && trendEvents.length > 0 && (
                  <span className="bg-red-500/20 text-red-400 text-xs px-1.5 py-0.5 rounded-full">
                    {trendEvents.length}
                  </span>
                )}
                {tab.id === 'covers' && covers.length > 0 && (
                  <span className="bg-museum-gold/20 text-museum-gold text-xs px-1.5 py-0.5 rounded-full">
                    {covers.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container py-8">
        {activeTab === 'news' && (
          <div className="space-y-6">
            {trendEvents.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-display text-2xl text-museum-gold flex items-center gap-2">
                  <Flame className="w-6 h-6" />
                  实时热点
                </h2>
                {trendEvents.map((event) => (
                  <TrendEventBanner key={event.id} event={event} />
                ))}
                <div className="gold-divider w-full my-6" />
              </div>
            )}

            <h2 className="font-display text-2xl text-museum-gold flex items-center gap-2">
              <Newspaper className="w-6 h-6" />
              今日时尚资讯
            </h2>

            {news.length === 0 ? (
              <div className="text-center py-16">
                <Newspaper className="w-16 h-16 text-museum-gray/30 mx-auto mb-4" />
                <p className="font-display text-2xl text-museum-gray mb-2">暂无资讯</p>
                <p className="font-body text-museum-gray/60">点击「下一天」生成今日时尚新闻</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {news.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-6">
            <div className="gold-border p-6 bg-gradient-to-r from-museum-burgundy/10 via-transparent to-museum-gold/10">
              <div className="flex items-center gap-3 mb-4">
                <Flame className="w-8 h-8 text-museum-gold" />
                <div>
                  <h2 className="font-display text-2xl text-museum-gold">热点事件</h2>
                  <p className="font-body text-museum-gray">
                    热点事件会影响市场需求，你的产品如果匹配热点风格，销量将大幅提升！
                  </p>
                </div>
              </div>
            </div>

            {trendEvents.length === 0 ? (
              <div className="text-center py-16">
                <Flame className="w-16 h-16 text-museum-gray/30 mx-auto mb-4" />
                <p className="font-display text-2xl text-museum-gray mb-2">当前无活跃热点</p>
                <p className="font-body text-museum-gray/60">热点事件会随机出现，持续经营以触发更多热点！</p>
              </div>
            ) : (
              <div className="space-y-4">
                {trendEvents.map((event) => (
                  <TrendEventBanner key={event.id} event={event} />
                ))}
              </div>
            )}

            {trendEvents.length > 0 && (
              <div className="gold-border p-6">
                <h3 className="font-display text-xl text-museum-gold mb-4">市场影响总览</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trendEvents.map((event) => (
                    <div key={event.id} className="p-4 bg-museum-black/50 border border-museum-gold/10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{event.icon}</span>
                        <span className="font-display text-lg text-museum-ivory">{event.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-sans text-xs text-museum-gray">需求倍率</span>
                        <span className="font-display text-xl text-museum-gold">x{event.demandMultiplier}</span>
                      </div>
                      <div className="w-full h-2 bg-museum-gold/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-museum-gold-dark to-museum-gold rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, (event.demandMultiplier / 2.5) * 100)}%`,
                          }}
                        />
                      </div>
                      <p className="font-sans text-xs text-museum-gray mt-2">
                        剩余 {event.remainingDays}/{event.duration} 天
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'covers' && (
          <div className="space-y-6">
            <div className="gold-border p-6 bg-gradient-to-r from-museum-burgundy/10 via-transparent to-museum-gold/10">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-museum-gold" />
                <div>
                  <h2 className="font-display text-2xl text-museum-gold">杂志封面</h2>
                  <p className="font-body text-museum-gray">
                    设计人气超过75且销量超过10双的高跟鞋，有机会登上《Stiletto Weekly》封面！
                  </p>
                </div>
              </div>
            </div>

            {covers.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-museum-gray/30 mx-auto mb-4" />
                <p className="font-display text-2xl text-museum-gray mb-2">尚未出版</p>
                <p className="font-body text-museum-gray/60">
                  在高跟鞋王国中设计并销售产品，提升人气指数，你的作品就有机会登上封面！
                </p>
                <Link
                  to="/kingdom"
                  className="btn-gold inline-flex items-center gap-2 mt-6"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>前往高跟鞋王国</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {covers.map((cover) => (
                  <CoverCard
                    key={cover.id}
                    cover={cover}
                    onClick={() => setSelectedCover(cover)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {selectedCover && (
        <CoverModal
          cover={selectedCover}
          onClose={() => setSelectedCover(null)}
        />
      )}
    </div>
  );
}
