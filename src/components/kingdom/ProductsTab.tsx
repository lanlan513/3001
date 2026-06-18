import { useState } from 'react';
import {
  ShoppingBag,
  Eye,
  EyeOff,
  Settings,
  Trash2,
  Factory,
  Tag,
} from 'lucide-react';
import ShoePreview from '@/components/ShoePreview';
import type { Product } from '@/types';
import { styles, seasons } from '@/data/kingdomConstants';

export default function ProductsTab({
  products,
  onSetPrice,
  onProduce,
  onToggleActive,
  onDelete,
  onView,
  money,
  storageCapacity,
  totalStock,
}: {
  products: Product[];
  onSetPrice: (id: string, price: number) => void;
  onProduce: (id: string, qty: number) => boolean;
  onToggleActive: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (p: Product) => void;
  money: number;
  storageCapacity: number;
  totalStock: number;
}) {
  const [produceQty, setProduceQty] = useState<Record<string, number>>({});
  const [priceInput, setPriceInput] = useState<Record<string, number>>({});

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-16 h-16 text-museum-gray/30 mx-auto mb-4" />
        <p className="font-display text-2xl text-museum-gray mb-2">还没有产品</p>
        <p className="font-body text-museum-gray/60">前往「设计」标签页创建你的第一款高跟鞋吧！</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h2 className="font-display text-2xl text-museum-gold">产品管理 ({products.length})</h2>
        <div className="flex gap-4">
          <div className="gold-border px-4 py-2">
            <span className="font-sans text-xs text-museum-gray uppercase tracking-wider">
              仓库: {totalStock}/{storageCapacity}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={`gold-border p-4 md:p-6 transition-all ${
              !product.isActive ? 'opacity-60' : ''
            }`}
          >
            <div className="flex flex-col lg:flex-row gap-6">
              <div
                className="w-full lg:w-48 flex-shrink-0 aspect-square bg-museum-black/30 rounded cursor-pointer hover:scale-105 transition-transform flex items-center justify-center"
                onClick={() => onView(product)}
              >
                <ShoePreview config={product.design} size={160} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-display text-2xl text-museum-ivory flex items-center gap-2">
                      {product.name}
                      {!product.isActive && (
                        <span className="text-xs font-sans bg-museum-gray/20 text-museum-gray px-2 py-1 rounded">
                          已下架
                        </span>
                      )}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="tag text-xs">
                        {styles.find((s) => s.id === product.design.style)?.icon}
                        {styles.find((s) => s.id === product.design.style)?.name}
                      </span>
                      <span className="tag text-xs">
                        {seasons.find((s) => s.id === product.design.season)?.icon}
                        {seasons.find((s) => s.id === product.design.season)?.name}
                      </span>
                      <span className="tag text-xs">
                        {product.design.heelHeight}cm · {product.design.material}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onToggleActive(product.id)}
                      className="p-2 border border-museum-gold/30 hover:border-museum-gold transition-colors"
                      title={product.isActive ? '下架' : '上架'}
                    >
                      {product.isActive ? (
                        <EyeOff className="w-4 h-4 text-museum-gray" />
                      ) : (
                        <Eye className="w-4 h-4 text-museum-gold" />
                      )}
                    </button>
                    <button
                      onClick={() => onView(product)}
                      className="p-2 border border-museum-gold/30 hover:border-museum-gold transition-colors"
                      title="详情"
                    >
                      <Settings className="w-4 h-4 text-museum-gold" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`确定删除「${product.name}」吗？`)) onDelete(product.id);
                      }}
                      className="p-2 border border-museum-burgundy/30 hover:border-museum-burgundy hover:bg-museum-burgundy/10 transition-colors"
                      title="删除"
                    >
                      <Trash2 className="w-4 h-4 text-museum-burgundy-light" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <MiniStat label="生产成本" value={`¥${product.productionCost}`} />
                  <MiniStat label="库存" value={`${product.stock}双`} />
                  <MiniStat
                    label="销量"
                    value={`${product.totalSold}双`}
                    valueColor="text-green-400"
                  />
                  <MiniStat
                    label="销售额"
                    value={`¥${product.totalRevenue.toLocaleString()}`}
                    valueColor="text-museum-gold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-museum-black/30 rounded">
                    <div className="flex items-center gap-2 mb-3 text-museum-gold">
                      <Tag className="w-4 h-4" />
                      <span className="font-sans text-xs tracking-wider uppercase">定价</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-sans text-museum-gray self-center">¥</span>
                      <input
                        type="number"
                        value={priceInput[product.id] ?? product.sellingPrice}
                        onChange={(e) =>
                          setPriceInput((prev) => ({
                            ...prev,
                            [product.id]: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="flex-1 bg-transparent border border-museum-gold/30 px-3 py-2 font-body text-museum-ivory focus:border-museum-gold outline-none"
                      />
                      <button
                        onClick={() =>
                          onSetPrice(
                            product.id,
                            priceInput[product.id] ?? product.sellingPrice
                          )
                        }
                        className="px-4 border border-museum-gold text-museum-gold font-sans text-xs tracking-wider hover:bg-museum-gold hover:text-museum-black transition-all"
                      >
                        更新
                      </button>
                    </div>
                    {priceInput[product.id] != null && (
                      <p className="text-xs mt-2 text-museum-gray">
                        利润:{' '}
                        <span
                          className={
                            (priceInput[product.id] ?? 0) - product.productionCost >= 0
                              ? 'text-green-400'
                              : 'text-red-400'
                          }
                        >
                          ¥{(priceInput[product.id] ?? 0) - product.productionCost}/双
                          ({Math.round(
                            (((priceInput[product.id] ?? 0) - product.productionCost) /
                              product.productionCost) *
                              100
                          )}
                          %)
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="p-4 bg-museum-black/30 rounded">
                    <div className="flex items-center gap-2 mb-3 text-museum-burgundy-light">
                      <Factory className="w-4 h-4" />
                      <span className="font-sans text-xs tracking-wider uppercase">生产</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min={1}
                        value={produceQty[product.id] ?? 10}
                        onChange={(e) =>
                          setProduceQty((prev) => ({
                            ...prev,
                            [product.id]: Math.max(1, parseInt(e.target.value) || 1),
                          }))
                        }
                        className="flex-1 bg-transparent border border-museum-gold/30 px-3 py-2 font-body text-museum-ivory focus:border-museum-gold outline-none"
                      />
                      <button
                        onClick={() =>
                          onProduce(product.id, produceQty[product.id] ?? 10)
                        }
                        disabled={
                          money < product.productionCost * (produceQty[product.id] ?? 10) ||
                          totalStock + (produceQty[product.id] ?? 10) > storageCapacity
                        }
                        className="px-4 border border-museum-gold text-museum-gold font-sans text-xs tracking-wider hover:bg-museum-gold hover:text-museum-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        生产
                      </button>
                    </div>
                    <p className="text-xs mt-2 text-museum-gray">
                      总花费:{' '}
                      <span
                        className={
                          money >=
                          product.productionCost * (produceQty[product.id] ?? 10)
                            ? 'text-museum-gold'
                            : 'text-red-400'
                        }
                      >
                        ¥
                        {(
                          product.productionCost * (produceQty[product.id] ?? 10)
                        ).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-sans text-xs text-museum-gray uppercase tracking-wider">
                      市场受欢迎度
                    </span>
                    <span className="font-sans text-xs text-museum-gold">
                      {Math.round(product.popularityScore)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-museum-gold/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-museum-burgundy to-museum-gold rounded-full transition-all"
                      style={{ width: `${product.popularityScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
