import ShoePreview from '@/components/ShoePreview';
import { calculateProductionCost } from '@/store/useCompanyStore';
import type { ProductDesign, ShoeSeason } from '@/types';
import {
  styles,
  seasons,
  qualities,
  materials,
  colorPresets,
  decorations,
  toeShapes,
  strapStyles,
} from '@/data/kingdomConstants';

export default function DesignModal({
  design,
  setDesign,
  designName,
  setDesignName,
  onClose,
  onCreate,
  currentSeason,
}: {
  design: ProductDesign;
  setDesign: (d: ProductDesign) => void;
  designName: string;
  setDesignName: (s: string) => void;
  onClose: () => void;
  onCreate: () => void;
  currentSeason: ShoeSeason;
}) {
  const estimatedCost = calculateProductionCost(design);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="museum-frame max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-museum-gold/20">
            <h2 className="font-display text-3xl gold-text-gradient">设计高跟鞋</h2>
            <button
              onClick={onClose}
              className="p-2 text-museum-gray hover:text-museum-gold transition-colors text-xl"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="sticky top-8 space-y-6">
                <div className="flex justify-center">
                  <ShoePreview config={design} size={320} />
                </div>

                <div className="gold-border p-5">
                  <label className="font-sans text-xs tracking-wider uppercase text-museum-gray block mb-2">
                    产品名称
                  </label>
                  <input
                    type="text"
                    value={designName}
                    onChange={(e) => setDesignName(e.target.value)}
                    placeholder="如：金色梦境系列"
                    className="w-full bg-transparent border border-museum-gold/30 px-4 py-3 font-body text-lg text-museum-ivory focus:border-museum-gold outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="gold-border p-4 bg-museum-burgundy/5">
                    <p className="font-sans text-xs tracking-wider uppercase text-museum-gray mb-1">
                      单位成本
                    </p>
                    <p className="font-display text-2xl text-museum-burgundy-light">
                      ¥{estimatedCost}
                    </p>
                  </div>
                  <div className="gold-border p-4 bg-museum-gold/5">
                    <p className="font-sans text-xs tracking-wider uppercase text-museum-gray mb-1">
                      建议售价
                    </p>
                    <p className="font-display text-2xl text-museum-gold">
                      ¥{Math.round(estimatedCost * 2.5)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border border-museum-gray/30 text-museum-gray font-sans text-sm tracking-widest uppercase transition-all hover:border-museum-gray hover:text-museum-ivory"
                  >
                    取消
                  </button>
                  <button
                    onClick={onCreate}
                    disabled={!designName.trim()}
                    className="flex-1 btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    创建产品
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-sans text-xs tracking-wider uppercase text-museum-gray block mb-2">
                    风格定位
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {styles.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setDesign({ ...design, style: s.id })}
                        className={`p-2 text-center transition-all ${
                          design.style === s.id
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

                <div>
                  <label className="font-sans text-xs tracking-wider uppercase text-museum-gray block mb-2">
                    适用季节
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {seasons.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setDesign({ ...design, season: s.id })}
                        className={`p-2 text-center transition-all ${
                          design.season === s.id
                            ? 'bg-museum-gold/20 border-2 border-museum-gold'
                            : 'border border-museum-gold/20 hover:border-museum-gold/50'
                        } ${s.id === currentSeason ? 'ring-1 ring-green-500/50' : ''}`}
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
                  品质等级
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {qualities.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => setDesign({ ...design, quality: q.id })}
                      className={`p-4 text-center transition-all ${
                        design.quality === q.id
                          ? 'bg-museum-gold/20 border-2 border-museum-gold'
                          : 'border border-museum-gold/20 hover:border-museum-gold/50'
                      }`}
                    >
                      <div className="font-display text-lg text-museum-ivory">{q.name}</div>
                      <div className="font-sans text-xs text-museum-gold mt-1">{q.mult}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-sans text-xs tracking-wider uppercase text-museum-gray block mb-2">
                  鞋跟高度 ({design.heelHeight}cm)
                </label>
                <input
                  type="range"
                  min="2"
                  max="18"
                  step="0.5"
                  value={design.heelHeight}
                  onChange={(e) =>
                    setDesign({ ...design, heelHeight: parseFloat(e.target.value) })
                  }
                  className="w-full h-2 bg-museum-gold/20 rounded-lg appearance-none cursor-pointer accent-museum-gold"
                />
                <div className="flex justify-between font-sans text-xs text-museum-gray mt-1">
                  <span>2cm</span>
                  <span>10cm</span>
                  <span>18cm</span>
                </div>
              </div>

              <div>
                <label className="font-sans text-xs tracking-wider uppercase text-museum-gray block mb-2">
                  材质
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {materials.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setDesign({ ...design, material: m.id })}
                      className={`p-3 text-center transition-all ${
                        design.material === m.id
                          ? 'bg-museum-gold/20 border-museum-gold'
                          : 'border border-museum-gold/20 hover:border-museum-gold/50'
                      }`}
                    >
                      <div className="text-sm text-museum-ivory">{m.name}</div>
                      <div className="text-xs text-museum-gray mt-1">+¥{m.cost}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-sans text-xs tracking-wider uppercase text-museum-gray block mb-2">
                  颜色
                </label>
                <div className="flex flex-wrap gap-3 items-center">
                  {colorPresets.map((c) => (
                    <button
                      key={c}
                      onClick={() => setDesign({ ...design, color: c })}
                      className={`w-10 h-10 rounded-full transition-all border-2 ${
                        design.color === c
                          ? 'border-museum-gold scale-110 shadow-lg shadow-museum-gold/30'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                  <input
                    type="color"
                    value={design.color}
                    onChange={(e) => setDesign({ ...design, color: e.target.value })}
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-museum-gold/30"
                  />
                  <span className="font-sans text-sm text-museum-gold self-center uppercase">
                    {design.color}
                  </span>
                </div>
              </div>

              <div>
                <label className="font-sans text-xs tracking-wider uppercase text-museum-gray block mb-2">
                  鞋头
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {toeShapes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setDesign({ ...design, toeShape: t.id })}
                      className={`p-3 text-center transition-all ${
                        design.toeShape === t.id
                          ? 'bg-museum-gold/20 border-museum-gold'
                          : 'border border-museum-gold/20 hover:border-museum-gold/50'
                      }`}
                    >
                      <span className="text-sm text-museum-ivory">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-sans text-xs tracking-wider uppercase text-museum-gray block mb-2">
                  鞋带
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {strapStyles.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setDesign({ ...design, strapStyle: s.id })}
                      className={`p-3 text-center transition-all ${
                        design.strapStyle === s.id
                          ? 'bg-museum-gold/20 border-museum-gold'
                          : 'border border-museum-gold/20 hover:border-museum-gold/50'
                      }`}
                    >
                      <span className="text-xs text-museum-ivory">{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-sans text-xs tracking-wider uppercase text-museum-gray block mb-2">
                  装饰
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {decorations.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDesign({ ...design, decoration: d.id })}
                      className={`p-3 text-center transition-all ${
                        design.decoration === d.id
                          ? 'bg-museum-gold/20 border-museum-gold'
                          : 'border border-museum-gold/20 hover:border-museum-gold/50'
                      }`}
                    >
                      <div className="text-sm text-museum-ivory">{d.name}</div>
                      {d.cost > 0 && (
                        <div className="text-xs text-museum-gray mt-1">+¥{d.cost}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
