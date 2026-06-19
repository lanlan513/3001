import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Crown,
  DollarSign,
  Star,
  Calendar,
  Sparkles,
  ShoppingBag,
  Mic2,
  History,
  ArrowLeft,
  Play,
  TrendingUp,
  BookOpen,
} from 'lucide-react';
import { useCompanyStore } from '@/store/useCompanyStore';
import OverviewTab from '@/components/kingdom/OverviewTab';
import DesignTab from '@/components/kingdom/DesignTab';
import ProductsTab from '@/components/kingdom/ProductsTab';
import MarketTab from '@/components/kingdom/MarketTab';
import ShowsTab from '@/components/kingdom/ShowsTab';
import HistoryTab from '@/components/kingdom/HistoryTab';
import DesignModal from '@/components/kingdom/DesignModal';
import ShowModal from '@/components/kingdom/ShowModal';
import ProductDetailModal from '@/components/kingdom/ProductDetailModal';
import type { Product, ShoeSeason, ProductDesign } from '@/types';
import { seasons } from '@/data/kingdomConstants';

type TabType = 'overview' | 'design' | 'products' | 'market' | 'shows' | 'history';

export default function Kingdom() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showDesignModal, setShowDesignModal] = useState(false);
  const [showShowModal, setShowShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    companyName,
    companyReputation,
    money,
    currentDay,
    currentSeason,
    products,
    marketTrends,
    fashionShows,
    showHistory,
    totalRevenue,
    totalProfit,
    storageCapacity,
    advanceDay,
    createProduct,
    setProductPrice,
    produceUnits,
    toggleProductActive,
    deleteProduct,
    hostFashionShow,
    setCompanyName,
    resetGame,
  } = useCompanyStore();

  const [designName, setDesignName] = useState('');
  const [design, setDesign] = useState<ProductDesign>({
    heelHeight: 8,
    material: 'satin',
    color: '#D4AF8A',
    decoration: 'none',
    toeShape: 'pointed',
    strapStyle: 'none',
    style: 'classic',
    season: currentSeason,
    quality: 'premium',
    name: '',
  });

  const [showName, setShowName] = useState('');
  const [showSeason, setShowSeason] = useState<ShoeSeason>(currentSeason);
  const [showBudget, setShowBudget] = useState(5000);
  const [showProductIds, setShowProductIds] = useState<string[]>([]);

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const activeProducts = products.filter((p) => p.isActive);
  const soldUnits = products.reduce((sum, p) => sum + p.totalSold, 0);

  const handleCreateProduct = () => {
    if (!designName.trim()) return;
    createProduct(designName.trim(), { ...design, name: designName.trim() });
    setShowDesignModal(false);
    setDesignName('');
  };

  const handleHostShow = () => {
    if (!showName.trim() || showProductIds.length === 0) return;
    hostFashionShow(showName.trim(), showSeason, showBudget, showProductIds);
    setShowShowModal(false);
    setShowName('');
    setShowProductIds([]);
  };

  const toggleShowProduct = (id: string) => {
    setShowProductIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen">
      <header className="relative py-6 md:py-8 border-b border-museum-gold/20 bg-gradient-to-b from-museum-burgundy/10 to-transparent">
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
                <Crown className="w-10 h-10 text-museum-gold" />
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="font-display text-3xl md:text-4xl font-bold gold-text-gradient bg-transparent border-none focus:outline-none focus:border-b focus:border-museum-gold/50"
                />
              </div>
              <p className="font-sans text-sm tracking-[0.2em] text-museum-gray uppercase">
                High Heel Kingdom • 经营模式
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              <StatCard
                icon={<DollarSign className="w-5 h-5" />}
                label="资金"
                value={`¥${money.toLocaleString()}`}
                color="gold"
              />
              <StatCard
                icon={<Star className="w-5 h-5" />}
                label="声誉"
                value={`${Math.round(companyReputation)}%`}
                color="burgundy"
              />
              <StatCard
                icon={<Calendar className="w-5 h-5" />}
                label="第"
                value={`${currentDay} 天`}
                subValue={seasons.find((s) => s.id === currentSeason)?.name}
                color="gray"
              />
              <button
                onClick={advanceDay}
                className="btn-gold flex items-center justify-center gap-2 animate-pulse hover:animate-none"
              >
                <Play className="w-4 h-4" />
                <span className="font-sans text-sm tracking-wider">下一天</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="border-b border-museum-gold/10 sticky top-0 bg-museum-black/95 backdrop-blur z-40">
        <div className="container">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {([
              { id: 'overview', label: '总览', icon: <Crown className="w-4 h-4" />, link: undefined as string | undefined },
              { id: 'design', label: '设计', icon: <Sparkles className="w-4 h-4" />, link: undefined as string | undefined },
              { id: 'products', label: '产品', icon: <ShoppingBag className="w-4 h-4" />, link: undefined as string | undefined },
              { id: 'market', label: '市场趋势', icon: <TrendingUp className="w-4 h-4" />, link: undefined as string | undefined },
              { id: 'shows', label: '发布会', icon: <Mic2 className="w-4 h-4" />, link: undefined as string | undefined },
              { id: 'history', label: '动态', icon: <History className="w-4 h-4" />, link: undefined as string | undefined },
              { id: 'magazine', label: '杂志', icon: <BookOpen className="w-4 h-4" />, link: '/magazine' as string | undefined },
            ] as { id: string; label: string; icon: React.ReactNode; link: string | undefined }[]).map((tab) => (
              tab.link ? (
                <Link
                  key={tab.id}
                  to={tab.link}
                  className="flex items-center gap-2 px-4 py-3 font-sans text-sm tracking-wider whitespace-nowrap transition-all border-b-2 text-museum-gray border-transparent hover:text-museum-ivory"
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </Link>
              ) : (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-4 py-3 font-sans text-sm tracking-wider whitespace-nowrap transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'text-museum-gold border-museum-gold'
                      : 'text-museum-gray border-transparent hover:text-museum-ivory'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              )
            ))}
          </div>
        </div>
      </nav>

      <main className="container py-8">
        {activeTab === 'overview' && (
          <OverviewTab
            products={products}
            totalStock={totalStock}
            storageCapacity={storageCapacity}
            activeProducts={activeProducts.length}
            soldUnits={soldUnits}
            totalRevenue={totalRevenue}
            totalProfit={totalProfit}
            fashionShows={fashionShows}
            marketTrends={marketTrends}
            onGoDesign={() => setActiveTab('design')}
            onGoProducts={() => setActiveTab('products')}
            onGoShows={() => setActiveTab('shows')}
            onReset={resetGame}
          />
        )}

        {activeTab === 'design' && (
          <DesignTab
            onOpenDesign={() => setShowDesignModal(true)}
            products={products.slice(0, 6)}
          />
        )}

        {activeTab === 'products' && (
          <ProductsTab
            products={products}
            onSetPrice={setProductPrice}
            onProduce={produceUnits}
            onToggleActive={toggleProductActive}
            onDelete={deleteProduct}
            onView={(p) => setSelectedProduct(p)}
            money={money}
            storageCapacity={storageCapacity}
            totalStock={totalStock}
          />
        )}

        {activeTab === 'market' && (
          <MarketTab trends={marketTrends} currentSeason={currentSeason} />
        )}

        {activeTab === 'shows' && (
          <ShowsTab
            shows={fashionShows}
            products={products}
            onOpenShow={() => setShowShowModal(true)}
          />
        )}

        {activeTab === 'history' && <HistoryTab history={showHistory} />}
      </main>

      {showDesignModal && (
        <DesignModal
          design={design}
          setDesign={setDesign}
          designName={designName}
          setDesignName={setDesignName}
          onClose={() => setShowDesignModal(false)}
          onCreate={handleCreateProduct}
          currentSeason={currentSeason}
        />
      )}

      {showShowModal && (
        <ShowModal
          showName={showName}
          setShowName={setShowName}
          showSeason={showSeason}
          setShowSeason={setShowSeason}
          showBudget={showBudget}
          setShowBudget={setShowBudget}
          showProductIds={showProductIds}
          toggleShowProduct={toggleShowProduct}
          products={products}
          onClose={() => setShowShowModal(false)}
          onHost={handleHostShow}
          money={money}
        />
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  subValue,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  color: 'gold' | 'burgundy' | 'gray';
}) {
  const colorClasses = {
    gold: 'text-museum-gold border-museum-gold/30',
    burgundy: 'text-museum-burgundy-light border-museum-burgundy/30',
    gray: 'text-museum-gray border-museum-gray/30',
  };

  return (
    <div className={`gold-border p-3 md:p-4 bg-museum-black/50`}>
      <div className={`flex items-center gap-2 mb-1 ${colorClasses[color]}`}>
        {icon}
        <span className="font-sans text-xs tracking-wider uppercase">{label}</span>
      </div>
      <p className="font-display text-xl md:text-2xl text-museum-ivory">{value}</p>
      {subValue && <p className="font-sans text-xs text-museum-gray mt-1">{subValue}</p>}
    </div>
  );
}
