import ShoePreview from '@/components/ShoePreview';
import type { Product } from '@/types';
import { styles, seasons } from '@/data/kingdomConstants';

export default function ProductDetailModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const profitMargin =
    product.totalSold > 0
      ? Math.round(
          ((product.totalRevenue - product.productionCost * product.totalSold) /
            (product.productionCost * product.totalSold)) *
            100
        )
      : 0;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="museum-frame max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-museum-gold/20">
            <h2 className="font-display text-3xl gold-text-gradient">{product.name}</h2>
            <button
              onClick={onClose}
              className="p-2 text-museum-gray hover:text-museum-gold transition-colors text-xl"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex justify-center mb-6">
                <ShoePreview config={product.design} size={300} />
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <span className="tag">
                  {styles.find((s) => s.id === product.design.style)?.icon}
                  {styles.find((s) => s.id === product.design.style)?.name}风
                </span>
                <span className="tag">
                  {seasons.find((s) => s.id === product.design.season)?.icon}
                  {seasons.find((s) => s.id === product.design.season)?.name}
                </span>
                <span className="tag">{product.design.quality}</span>
                <span className={`tag ${product.isActive ? '' : 'opacity-50'}`}>
                  {product.isActive ? '在售' : '已下架'}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <StatBox label="售价" value={`¥${product.sellingPrice}`} color="gold" />
                <StatBox label="成本" value={`¥${product.productionCost}`} color="burgundy" />
                <StatBox label="单利润" value={`¥${product.sellingPrice - product.productionCost}`} color="green" />
                <StatBox
                  label="利润率"
                  value={`${Math.round(((product.sellingPrice - product.productionCost) / product.productionCost) * 100)}%`}
                  color="green"
                />
              </div>

              <div className="gold-border p-4">
                <h4 className="font-display text-lg text-museum-gold mb-4">销售数据</h4>
                <div className="space-y-3">
                  <DataRow label="累计生产" value={`${product.totalProduced} 双`} />
                  <DataRow label="已售出" value={`${product.totalSold} 双`} />
                  <DataRow label="库存" value={`${product.stock} 双`} />
                  <div className="gold-divider my-2" />
                  <DataRow label="总营收" value={`¥${product.totalRevenue.toLocaleString()}`} />
                  <DataRow
                    label="总成本"
                    value={`¥${(product.productionCost * product.totalSold).toLocaleString()}`}
                  />
                  <DataRow
                    label="净利润"
                    value={`${product.totalRevenue - product.productionCost * product.totalSold >= 0 ? '+' : ''}¥${(
                      product.totalRevenue -
                      product.productionCost * product.totalSold
                    ).toLocaleString()}`}
                    valueColor={
                      product.totalRevenue - product.productionCost * product.totalSold >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }
                  />
                  <DataRow label="投资回报率" value={`${profitMargin}%`} />
                </div>
              </div>

              <div className="gold-border p-4">
                <h4 className="font-display text-lg text-museum-gold mb-3">产品规格</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div>
                    <span className="text-museum-gray">鞋跟高度:</span>{' '}
                    <span className="text-museum-ivory">{product.design.heelHeight} cm</span>
                  </div>
                  <div>
                    <span className="text-museum-gray">材质:</span>{' '}
                    <span className="text-museum-ivory">{product.design.material}</span>
                  </div>
                  <div>
                    <span className="text-museum-gray">鞋头:</span>{' '}
                    <span className="text-museum-ivory">{product.design.toeShape}</span>
                  </div>
                  <div>
                    <span className="text-museum-gray">鞋带:</span>{' '}
                    <span className="text-museum-ivory">{product.design.strapStyle}</span>
                  </div>
                  <div>
                    <span className="text-museum-gray">装饰:</span>{' '}
                    <span className="text-museum-ivory">{product.design.decoration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-museum-gray">颜色:</span>
                    <span
                      className="inline-block w-4 h-4 rounded-full border border-museum-gold/30"
                      style={{ backgroundColor: product.design.color }}
                    />
                    <span className="text-museum-ivory text-xs">{product.design.color}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-sans text-xs text-museum-gray uppercase tracking-wider">
                    市场受欢迎度
                  </span>
                  <span className="font-sans text-sm text-museum-gold font-bold">
                    {Math.round(product.popularityScore)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-museum-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-museum-burgundy via-museum-gold-dark to-museum-gold rounded-full transition-all"
                    style={{ width: `${product.popularityScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-museum-gold/20 flex justify-end">
            <button onClick={onClose} className="btn-gold">
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: 'gold' | 'burgundy' | 'green';
}) {
  const colors = {
    gold: 'bg-museum-gold/10 border-museum-gold/30 text-museum-gold',
    burgundy: 'bg-museum-burgundy/10 border-museum-burgundy/30 text-museum-burgundy-light',
    green: 'bg-green-500/10 border-green-500/30 text-green-400',
  };

  return (
    <div className={`p-3 border ${colors[color]} rounded`}>
      <p className="font-sans text-xs uppercase tracking-wider opacity-80 mb-1">{label}</p>
      <p className="font-display text-xl">{value}</p>
    </div>
  );
}

function DataRow({
  label,
  value,
  valueColor = 'text-museum-ivory',
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-sans text-sm text-museum-gray">{label}</span>
      <span className={`font-display text-lg ${valueColor}`}>{value}</span>
    </div>
  );
}
