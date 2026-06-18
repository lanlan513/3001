import ShoePreview from '@/components/ShoePreview';
import type { ShoeSeason, Product } from '@/types';
import { seasons } from '@/data/kingdomConstants';

export default function ShowModal({
  showName,
  setShowName,
  showSeason,
  setShowSeason,
  showBudget,
  setShowBudget,
  showProductIds,
  toggleShowProduct,
  products,
  onClose,
  onHost,
  money,
}: {
  showName: string;
  setShowName: (s: string) => void;
  showSeason: ShoeSeason;
  setShowSeason: (s: ShoeSeason) => void;
  showBudget: number;
  setShowBudget: (b: number) => void;
  showProductIds: string[];
  toggleShowProduct: (id: string) => void;
  products: Product[];
  onClose: () => void;
  onHost: () => void;
  money: number;
}) {
  const avgPopularity =
    showProductIds.length > 0
      ? Math.round(
          products
            .filter((p) => showProductIds.includes(p.id))
            .reduce((sum, p) => sum + p.popularityScore, 0) / showProductIds.length
        )
      : 0;

  const estimatedSuccess = Math.min(
    100,
    Math.round(
      avgPopularity * 0.4 +
        Math.min(100, showBudget / 100) * 0.4 +
        products.filter(
          (p) => showProductIds.includes(p.id) && p.design.season === showSeason
        ).length *
          5
    )
  );

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="museum-frame max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-museum-gold/20">
            <h2 className="font-display text-3xl gold-text-gradient">举办时尚发布会</h2>
            <button
              onClick={onClose}
              className="p-2 text-museum-gray hover:text-museum-gold transition-colors text-xl"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-sans text-xs tracking-wider uppercase text-museum-gray block mb-2">
                  发布会名称
                </label>
                <input
                  type="text"
                  value={showName}
                  onChange={(e) => setShowName(e.target.value)}
                  placeholder="如：春夏新品发布会"
                  className="w-full bg-transparent border border-museum-gold/30 px-4 py-3 font-body text-lg text-museum-ivory focus:border-museum-gold outline-none"
                />
              </div>

              <div>
                <label className="font-sans text-xs tracking-wider uppercase text-museum-gray block mb-2">
                  发布季节
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {seasons.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setShowSeason(s.id)}
                      className={`p-2 text-center transition-all ${
                        showSeason === s.id
                          ? 'bg-museum-gold/20 border-2 border-museum-gold'
                          : 'border border-museum-gold/20 hover:border-museum-gold/50'
                      }`}
                    >
                      <div className="text-xl">{s.icon}</div>
                      <div className="text-xs text-museum-ivory mt-1">{s.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="font-sans text-xs tracking-wider uppercase text-museum-gray block mb-2">
                营销预算: ¥{showBudget.toLocaleString()}
              </label>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={showBudget}
                onChange={(e) => setShowBudget(parseInt(e.target.value))}
                className="w-full h-2 bg-museum-gold/20 rounded-lg appearance-none cursor-pointer accent-museum-gold"
              />
              <div className="flex justify-between font-sans text-xs text-museum-gray mt-1">
                <span>¥1,000</span>
                <span>¥25,000</span>
                <span>¥50,000</span>
              </div>
              <p
                className={`text-sm mt-2 ${
                  money >= showBudget ? 'text-museum-gray' : 'text-red-400'
                }`}
              >
                当前资金: ¥{money.toLocaleString()}
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-sans text-xs tracking-wider uppercase text-museum-gray">
                  选择参展产品 ({showProductIds.length}款已选)
                </label>
                {showProductIds.length > 0 && (
                  <button
                    onClick={() => {
                      products.forEach((p) => {
                        if (!showProductIds.includes(p.id)) toggleShowProduct(p.id);
                      });
                    }}
                    className="font-sans text-xs text-museum-gold hover:underline"
                  >
                    全选
                  </button>
                )}
              </div>

              {products.length === 0 ? (
                <div className="text-center py-8 gold-border">
                  <p className="text-museum-gray">暂无产品，请先设计产品</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto p-1">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => toggleShowProduct(p.id)}
                      className={`p-3 transition-all relative ${
                        showProductIds.includes(p.id)
                          ? 'ring-2 ring-museum-gold bg-museum-gold/10'
                          : 'border border-museum-gold/20 hover:border-museum-gold/50'
                      }`}
                    >
                      <div className="aspect-square flex items-center justify-center mb-2">
                        <ShoePreview config={p.design} size={100} />
                      </div>
                      <p className="font-body text-sm text-museum-ivory truncate">{p.name}</p>
                      <p className="font-sans text-xs text-museum-gray mt-1">
                        热度 {Math.round(p.popularityScore)}%
                      </p>
                      {p.design.season === showSeason && (
                        <span className="absolute top-1 right-1 text-xs bg-green-500/30 text-green-400 px-1 rounded">
                          ✓ 当季
                        </span>
                      )}
                      {showProductIds.includes(p.id) && (
                        <span className="absolute top-1 left-1 w-5 h-5 bg-museum-gold text-museum-black rounded-full text-xs flex items-center justify-center font-bold">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="gold-border p-4 bg-museum-black/30">
                <p className="font-sans text-xs tracking-wider text-museum-gray uppercase mb-1">
                  平均产品热度
                </p>
                <p className="font-display text-2xl text-museum-gold">{avgPopularity}%</p>
              </div>
              <div className="gold-border p-4 bg-museum-black/30">
                <p className="font-sans text-xs tracking-wider text-museum-gray uppercase mb-1">
                  营销触达预估
                </p>
                <p className="font-display text-2xl text-museum-burgundy-light">
                  ~{Math.round(showBudget / 100)}
                </p>
              </div>
              <div className="gold-border p-4 bg-museum-black/30">
                <p className="font-sans text-xs tracking-wider text-museum-gray uppercase mb-1">
                  成功率预估
                </p>
                <p
                  className={`font-display text-2xl ${
                    estimatedSuccess >= 60
                      ? 'text-green-400'
                      : estimatedSuccess >= 40
                      ? 'text-museum-gold'
                      : 'text-red-400'
                  }`}
                >
                  {estimatedSuccess}%
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-museum-gray/30 text-museum-gray font-sans text-sm tracking-widest uppercase transition-all hover:border-museum-gray hover:text-museum-ivory"
              >
                取消
              </button>
              <button
                onClick={onHost}
                disabled={
                  !showName.trim() ||
                  showProductIds.length === 0 ||
                  money < showBudget
                }
                className="flex-1 btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                举办发布会
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
