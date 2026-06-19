import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  FashionMagazineState,
  FashionNews,
  TrendEvent,
  MagazineCover,
  ShoeSeason,
  MarketTrend,
  Product,
} from '@/types';
import { newsTemplates, trendEventTemplates, coverTitles, coverSubtitles } from '@/data/magazineConstants';

const pickRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const uid = () => `mg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const generateNews = (day: number, _season: ShoeSeason, marketTrends: MarketTrend[], products: Product[]): FashionNews[] => {
  const articles: FashionNews[] = [];
  const trendingStyles = marketTrends.filter((t) => t.popularity >= 60).map((t) => t.style);
  const relevantTemplates = newsTemplates.filter(
    (t) => !t.relatedStyle || trendingStyles.includes(t.relatedStyle)
  );
  const pool = relevantTemplates.length > 0 ? relevantTemplates : newsTemplates;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const count = 2 + Math.floor(Math.random() * 3);

  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const tmpl = shuffled[i];
    articles.push({
      id: uid(),
      title: pickRandom(tmpl.titleTemplates),
      summary: pickRandom(tmpl.summaryTemplates),
      content: pickRandom(tmpl.summaryTemplates),
      category: tmpl.category,
      relatedStyle: tmpl.relatedStyle,
      impact: tmpl.impact,
      day,
    });
  }

  if (products.length > 0 && Math.random() > 0.5) {
    const topProduct = [...products]
      .sort((a, b) => b.popularityScore - a.popularityScore)[0];
    if (topProduct && topProduct.popularityScore >= 60) {
      articles.unshift({
        id: uid(),
        title: `「${topProduct.name}」成为市场焦点，人气指数飙升！`,
        summary: `你设计的${topProduct.name}正在成为时尚圈的热门话题，其独特的${topProduct.design.style}风格赢得了众多消费者的青睐。`,
        content: `你设计的${topProduct.name}正在成为时尚圈的热门话题，其独特的${topProduct.design.style}风格赢得了众多消费者的青睐。`,
        category: 'industry',
        relatedStyle: topProduct.design.style,
        impact: 'positive',
        day,
      });
    }
  }

  return articles;
};

const generateTrendEvent = (): TrendEvent | null => {
  if (Math.random() > 0.35) return null;
  const tmpl = pickRandom(trendEventTemplates);
  return {
    id: uid(),
    name: tmpl.name,
    description: tmpl.description,
    icon: tmpl.icon,
    affectedStyles: tmpl.affectedStyles,
    demandMultiplier: tmpl.demandMultiplier,
    duration: tmpl.duration,
    remainingDays: tmpl.duration,
    intensity: tmpl.intensity,
  };
};

const defaultState = () => ({
  news: [] as FashionNews[],
  trendEvents: [] as TrendEvent[],
  covers: [] as MagazineCover[],
  issueCounter: 0,
  lastNewsDay: 0,
});

export const useFashionMagazineStore = create<FashionMagazineState>()(
  persist(
    (set, get) => ({
      ...defaultState(),

      generateDailyNews: (day, season, marketTrends, products) => {
        const state = get();
        if (state.lastNewsDay >= day) return;

        const newArticles = generateNews(day, season, marketTrends, products);
        const newEvent = generateTrendEvent();

        const updatedTrendEvents = state.trendEvents
          .map((e) => ({ ...e, remainingDays: e.remainingDays - 1 }))
          .filter((e) => e.remainingDays > 0);

        if (newEvent) {
          updatedTrendEvents.push(newEvent);
        }

        set({
          news: [...newArticles, ...state.news].slice(0, 60),
          trendEvents: updatedTrendEvents,
          lastNewsDay: day,
        });
      },

      updateTrendEvents: () => {
        set((state) => ({
          trendEvents: state.trendEvents
            .map((e) => ({ ...e, remainingDays: e.remainingDays - 1 }))
            .filter((e) => e.remainingDays > 0),
        }));
      },

      checkCoverEligibility: (products, marketTrends) => {
        const state = get();
        const eligible = products.filter(
          (p) => p.popularityScore >= 75 && p.totalSold >= 10
        );
        if (eligible.length === 0) return null;

        const topProduct = eligible.sort((a, b) => b.popularityScore - a.popularityScore)[0];
        const recentCoverProductIds = state.covers
          .slice(0, 3)
          .map((c) => c.productId);
        if (recentCoverProductIds.includes(topProduct.id)) return null;

        if (Math.random() > 0.6) return null;

        const newIssueNumber = state.issueCounter + 1;
        const relatedTrend = marketTrends.find(
          (t) => t.style === topProduct.design.style
        );

        const cover: MagazineCover = {
          id: uid(),
          issueNumber: newIssueNumber,
          title: pickRandom(coverTitles),
          subtitle: pickRandom(coverSubtitles),
          productId: topProduct.id,
          productPreviewUrl: topProduct.previewDataUrl,
          publishDay: state.lastNewsDay,
          featuredNewsIds: state.news.slice(0, 3).map((n) => n.id),
          trendEventId: relatedTrend?.style,
        };

        set((s) => ({
          covers: [cover, ...s.covers],
          issueCounter: newIssueNumber,
        }));

        return cover;
      },

      reset: () => set(defaultState()),
    }),
    {
      name: 'fashion-magazine-storage',
    }
  )
);
