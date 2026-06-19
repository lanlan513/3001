import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  CompanyState,
  Product,
  ProductDesign,
  ShoeSeason,
  ShoeStyle,
  MarketTrend,
  FashionShow,
} from '@/types';
import { useFashionMagazineStore } from '@/store/useFashionMagazineStore';

const ALL_STYLES: ShoeStyle[] = [
  'classic',
  'modern',
  'vintage',
  'avant-garde',
  'minimalist',
  'glamorous',
  'romantic',
  'edgy',
];

const SEASONS: ShoeSeason[] = ['spring', 'summer', 'autumn', 'winter'];

const generateInitialTrends = (): MarketTrend[] => {
  const shuffled = [...ALL_STYLES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4).map((style, i) => ({
    style,
    popularity: 60 + Math.floor(Math.random() * 40),
    trend: (['rising', 'stable', 'falling'] as const)[i % 3],
    remainingDays: 3 + Math.floor(Math.random() * 5),
  }));
};

const QUALITY_COST_MULTIPLIER = {
  standard: 1,
  premium: 1.8,
  luxury: 3,
};

const HEEL_COST_MULTIPLIER = (height: number) => 1 + height * 0.05;

const calculateProductionCost = (design: ProductDesign): number => {
  const baseCost = 50;
  const qualityMult = QUALITY_COST_MULTIPLIER[design.quality];
  const heelMult = HEEL_COST_MULTIPLIER(design.heelHeight);
  const materialCost = {
    satin: 20,
    leather: 30,
    suede: 25,
    velvet: 35,
    patent: 28,
    canvas: 10,
  }[design.material as string] || 15;

  const decorationCost = {
    none: 0,
    bow: 15,
    buckle: 12,
    lace: 20,
    embroidery: 35,
    rhinestones: 50,
    feathers: 40,
    chains: 18,
  }[design.decoration] || 0;

  return Math.round((baseCost + materialCost + decorationCost) * qualityMult * heelMult);
};

const seasonFromDay = (day: number): ShoeSeason => {
  const seasonIndex = Math.floor((day - 1) / 30) % 4;
  return SEASONS[seasonIndex];
};

const defaultState = () => ({
  companyName: '我的高跟鞋王国',
  companyReputation: 50,
  money: 10000,
  currentDay: 1,
  currentSeason: 'spring' as ShoeSeason,
  products: [] as Product[],
  marketTrends: generateInitialTrends(),
  fashionShows: [] as FashionShow[],
  dailySales: [] as { day: number; productId: string; unitsSold: number; revenue: number }[],
  totalRevenue: 0,
  totalProfit: 0,
  monthlyRent: 2000,
  storageCapacity: 500,
  activeProductIds: [] as string[],
  showHistory: [] as {
    day: number;
    event: string;
    type: 'sale' | 'trend' | 'show' | 'warning' | 'success';
  }[],
});

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set, get) => ({
      ...defaultState(),

      setCompanyName: (name) => set({ companyName: name }),

      addMoney: (amount) =>
        set((state) => ({
          money: state.money + amount,
          totalRevenue: amount > 0 ? state.totalRevenue + amount : state.totalRevenue,
          totalProfit: state.totalProfit + amount,
        })),

      spendMoney: (amount) => {
        const state = get();
        if (state.money < amount) return false;
        set({
          money: state.money - amount,
          totalProfit: state.totalProfit - amount,
        });
        return true;
      },

      advanceDay: () => {
        const state = get();
        const newDay = state.currentDay + 1;
        const newSeason = seasonFromDay(newDay);
        const seasonChanged = newSeason !== state.currentSeason;

        const newTrends = state.marketTrends.map((t) => {
          const newRemaining = t.remainingDays - 1;
          if (newRemaining <= 0) {
            const unusedStyles = ALL_STYLES.filter(
              (s) => !state.marketTrends.some((mt) => mt.style === s)
            );
            const newStyle =
              unusedStyles.length > 0
                ? unusedStyles[Math.floor(Math.random() * unusedStyles.length)]
                : ALL_STYLES[Math.floor(Math.random() * ALL_STYLES.length)];
            return {
              style: newStyle,
              popularity: 50 + Math.floor(Math.random() * 50),
              trend: (['rising', 'stable', 'falling'] as const)[Math.floor(Math.random() * 3)],
              remainingDays: 3 + Math.floor(Math.random() * 5),
            };
          }

          let newPopularity = t.popularity;
          if (t.trend === 'rising') newPopularity = Math.min(100, t.popularity + 3);
          else if (t.trend === 'falling') newPopularity = Math.max(0, t.popularity - 3);

          const trendChance = Math.random();
          let newTrend = t.trend;
          if (trendChance < 0.15) {
            newTrend = t.trend === 'rising' ? 'stable' : t.trend === 'falling' ? 'stable' : Math.random() > 0.5 ? 'rising' : 'falling';
          }

          return {
            ...t,
            popularity: newPopularity,
            trend: newTrend,
            remainingDays: newRemaining,
          };
        });

        let dailyRevenue = 0;
        let dailyUnits = 0;
        const newSalesRecords: typeof state.dailySales = [];
        const newProducts = [...state.products];

        for (const product of newProducts) {
          if (!product.isActive || product.stock <= 0) continue;

          const styleTrend = newTrends.find((t) => t.style === product.design.style);
          const styleMatch = styleTrend ? styleTrend.popularity / 100 : 0.3;
          const seasonMatch = product.design.season === newSeason ? 1.2 : 0.7;
          const priceFactor = Math.max(
            0.1,
            1 - (product.sellingPrice / (product.productionCost * 5)) * 0.8
          );
          const reputationFactor = 0.5 + state.companyReputation / 100;

          const magazineStore = useFashionMagazineStore.getState();
          const trendEventBoost = magazineStore.trendEvents.find((e) =>
            e.affectedStyles.includes(product.design.style)
          );
          const trendEventMultiplier = trendEventBoost ? trendEventBoost.demandMultiplier : 1;

          const baseDemand = 3;
          const demand = Math.max(
            0,
            Math.floor(
              baseDemand * styleMatch * seasonMatch * priceFactor * reputationFactor * trendEventMultiplier + Math.random() * 3
            )
          );

          const unitsToSell = Math.min(demand, product.stock);

          if (unitsToSell > 0) {
            const revenue = unitsToSell * product.sellingPrice;
            dailyRevenue += revenue;
            dailyUnits += unitsToSell;

            product.stock -= unitsToSell;
            product.totalSold += unitsToSell;
            product.totalRevenue += revenue;
            product.popularityScore = Math.min(
              100,
              product.popularityScore + (styleTrend ? styleTrend.popularity * 0.01 : 0.5)
            );

            newSalesRecords.push({
              day: newDay,
              productId: product.id,
              unitsSold: unitsToSell,
              revenue,
            });
          }
        }

        let rentPaid = 0;
        let rentWarning: string | null = null;
        if (newDay % 30 === 0) {
          rentPaid = state.monthlyRent;
          if (state.money + dailyRevenue < rentPaid) {
            rentWarning = '⚠️ 资金不足支付租金！考虑提高销量或降低成本。';
          }
        }

        const newHistory = [...state.showHistory];
        if (dailyUnits > 0) {
          newHistory.unshift({
            day: newDay,
            event: `今日售出 ${dailyUnits} 双高跟鞋，收入 ¥${dailyRevenue.toLocaleString()}`,
            type: 'sale',
          });
        }
        if (seasonChanged) {
          newHistory.unshift({
            day: newDay,
            event: `换季啦！新季节：${
              { spring: '春季🌸', summer: '夏季☀️', autumn: '秋季🍂', winter: '冬季❄️' }[newSeason]
            }`,
            type: 'trend',
          });
        }
        if (rentPaid > 0) {
          newHistory.unshift({
            day: newDay,
            event: `支付月度租金：¥${rentPaid.toLocaleString()}`,
            type: rentWarning ? 'warning' : 'show',
          });
        }
        if (rentWarning) {
          newHistory.unshift({
            day: newDay,
            event: rentWarning,
            type: 'warning',
          });
        }

        let updatedReputation = state.companyReputation;
        if (dailyUnits > 10) {
          updatedReputation = Math.min(100, updatedReputation + 1);
        } else if (dailyUnits === 0 && state.activeProductIds.length > 0) {
          updatedReputation = Math.max(0, updatedReputation - 0.5);
        }

        const updatedProducts = newProducts;
        const updatedTrends = newTrends;

        useFashionMagazineStore.getState().generateDailyNews(
          newDay,
          newSeason,
          updatedTrends,
          updatedProducts
        );

        const coverResult = useFashionMagazineStore.getState().checkCoverEligibility(
          updatedProducts,
          updatedTrends
        );
        if (coverResult) {
          newHistory.unshift({
            day: newDay,
            event: `📰 你的设计登上了《Stiletto Weekly》第${coverResult.issueNumber}期封面！`,
            type: 'success',
          });
          updatedReputation = Math.min(100, updatedReputation + 3);
        }

        const activeMagazineEvents = useFashionMagazineStore.getState().trendEvents;
        if (activeMagazineEvents.length > 0) {
          const eventNames = activeMagazineEvents.map((e) => e.name).join('、');
          newHistory.unshift({
            day: newDay,
            event: `📰 时尚热点：${eventNames}`,
            type: 'trend',
          });
        }

        set({
          currentDay: newDay,
          currentSeason: newSeason,
          marketTrends: updatedTrends,
          products: updatedProducts,
          dailySales: [...state.dailySales, ...newSalesRecords],
          money: Math.max(0, state.money + dailyRevenue - rentPaid),
          totalRevenue: state.totalRevenue + dailyRevenue,
          totalProfit: state.totalProfit + dailyRevenue - rentPaid,
          companyReputation: updatedReputation,
          showHistory: newHistory.slice(0, 50),
        });
      },

      createProduct: (name, design, previewDataUrl) => {
        const state = get();
        const productionCost = calculateProductionCost(design);
        const suggestedPrice = Math.round(productionCost * 2.5);

        const newProduct: Product = {
          id: `product-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          name,
          design,
          productionCost,
          sellingPrice: suggestedPrice,
          stock: 0,
          totalProduced: 0,
          totalSold: 0,
          totalRevenue: 0,
          popularityScore: 30,
          isActive: true,
          createdAt: Date.now(),
          previewDataUrl,
        };

        const newHistory = [
          {
            day: state.currentDay,
            event: `✨ 新产品「${name}」设计完成！建议售价 ¥${suggestedPrice}`,
            type: 'success' as const,
          },
          ...state.showHistory,
        ];

        set({
          products: [newProduct, ...state.products],
          activeProductIds: [newProduct.id, ...state.activeProductIds],
          showHistory: newHistory.slice(0, 50),
        });

        return newProduct;
      },

      setProductPrice: (productId, price) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, sellingPrice: Math.max(1, price) } : p
          ),
        }));
      },

      produceUnits: (productId, quantity) => {
        const state = get();
        const product = state.products.find((p) => p.id === productId);
        if (!product) return false;

        const totalCost = product.productionCost * quantity;
        const currentTotalStock = state.products.reduce((sum, p) => sum + p.stock, 0);

        if (state.money < totalCost) {
          get().addHistory(`资金不足！生产${quantity}双需要 ¥${totalCost.toLocaleString()}`, 'warning');
          return false;
        }
        if (currentTotalStock + quantity > state.storageCapacity) {
          get().addHistory(`仓库容量不足！剩余容量：${state.storageCapacity - currentTotalStock}双`, 'warning');
          return false;
        }

        set((s) => ({
          money: s.money - totalCost,
          totalProfit: s.totalProfit - totalCost,
          products: s.products.map((p) =>
            p.id === productId
              ? {
                  ...p,
                  stock: p.stock + quantity,
                  totalProduced: p.totalProduced + quantity,
                }
              : p
          ),
          showHistory: [
            {
              day: s.currentDay,
              event: `🏭 生产「${product.name}」${quantity}双，花费 ¥${totalCost.toLocaleString()}`,
              type: 'show' as const,
            },
            ...s.showHistory,
          ].slice(0, 50),
        }));

        return true;
      },

      toggleProductActive: (productId) => {
        set((state) => {
          const product = state.products.find((p) => p.id === productId);
          const isCurrentlyActive = state.activeProductIds.includes(productId);

          return {
            products: state.products.map((p) =>
              p.id === productId ? { ...p, isActive: !p.isActive } : p
            ),
            activeProductIds: isCurrentlyActive
              ? state.activeProductIds.filter((id) => id !== productId)
              : [...state.activeProductIds, productId],
            showHistory: [
              {
                day: state.currentDay,
                event: isCurrentlyActive
                  ? `📦 「${product?.name}」已下架`
                  : `🛍️ 「${product?.name}」已上架销售`,
                type: 'show' as const,
              },
              ...state.showHistory,
            ].slice(0, 50),
          };
        });
      },

      deleteProduct: (productId) => {
        set((state) => {
          const product = state.products.find((p) => p.id === productId);
          return {
            products: state.products.filter((p) => p.id !== productId),
            activeProductIds: state.activeProductIds.filter((id) => id !== productId),
            showHistory: [
              {
                day: state.currentDay,
                event: `🗑️ 产品「${product?.name}」已删除`,
                type: 'warning' as const,
              },
              ...state.showHistory,
            ].slice(0, 50),
          };
        });
      },

      hostFashionShow: (name, season, budget, productIds) => {
        const state = get();

        if (state.money < budget) {
          get().addHistory(`资金不足！举办发布会需要 ¥${budget.toLocaleString()}`, 'warning');
          return null;
        }

        const showProducts = state.products.filter((p) => productIds.includes(p.id));
        if (showProducts.length === 0) {
          get().addHistory('请至少选择一款产品参加发布会！', 'warning');
          return null;
        }

        const marketingReach = Math.round(budget / 100);
        const avgProductPopularity =
          showProducts.reduce((sum, p) => sum + p.popularityScore, 0) / showProducts.length;
        const seasonMatch =
          showProducts.filter((p) => p.design.season === season).length / showProducts.length;
        const trendBonus = showProducts.reduce((sum, p) => {
          const trend = state.marketTrends.find((t) => t.style === p.design.style);
          return sum + (trend ? trend.popularity : 30);
        }, 0) / showProducts.length;

        const successScore =
          avgProductPopularity * 0.3 +
          seasonMatch * 100 * 0.2 +
          trendBonus * 0.3 +
          Math.min(100, marketingReach) * 0.2;

        const isSuccess = successScore >= 50;
        const revenueBoost = isSuccess ? Math.round(budget * (0.5 + Math.random() * 1.5)) : 0;
        const buzzGenerated = Math.round(successScore * 2);

        const newShow: FashionShow = {
          id: `show-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          name,
          season,
          budget,
          products: productIds,
          date: Date.now(),
          marketingReach,
          success: isSuccess,
          revenueBoost,
          buzzGenerated,
        };

        const boostedProducts = state.products.map((p) => {
          if (!productIds.includes(p.id)) return p;
          return {
            ...p,
            popularityScore: Math.min(100, p.popularityScore + buzzGenerated / 10),
          };
        });

        set((s) => ({
          money: s.money - budget + revenueBoost,
          totalProfit: s.totalProfit - budget + revenueBoost,
          totalRevenue: s.totalRevenue + revenueBoost,
          companyReputation: Math.min(
            100,
            s.companyReputation + (isSuccess ? buzzGenerated / 20 : -5)
          ),
          products: boostedProducts,
          fashionShows: [newShow, ...s.fashionShows],
          showHistory: [
            {
              day: s.currentDay,
              event: isSuccess
                ? `🎉 「${name}」发布会大获成功！热度+${buzzGenerated}，直接收益 ¥${revenueBoost.toLocaleString()}`
                : `😔 「${name}」发布会反响平平，需要提升产品竞争力`,
              type: isSuccess ? ('success' as const) : ('warning' as const),
            },
            ...s.showHistory,
          ].slice(0, 50),
        }));

        return newShow;
      },

      updateReputation: (delta) =>
        set((state) => ({
          companyReputation: Math.max(0, Math.min(100, state.companyReputation + delta)),
        })),

      addHistory: (event, type) =>
        set((state) => ({
          showHistory: [
            { day: state.currentDay, event, type },
            ...state.showHistory,
          ].slice(0, 50),
        })),

      resetGame: () => set(defaultState()),
    }),
    {
      name: 'company-kingdom-storage',
    }
  )
);

export { calculateProductionCost, QUALITY_COST_MULTIPLIER, HEEL_COST_MULTIPLIER };