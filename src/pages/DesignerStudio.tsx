import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, RotateCcw, Palette, Grid3X3, Sparkles } from 'lucide-react';
import ShoePreview from '@/components/ShoePreview';
import { useDesignStore } from '@/store/useDesignStore';

const materials = [
  { id: 'satin', name: '缎面', nameEn: 'Satin' },
  { id: 'leather', name: '皮革', nameEn: 'Leather' },
  { id: 'suede', name: '绒面', nameEn: 'Suede' },
  { id: 'patent', name: '漆皮', nameEn: 'Patent' },
  { id: 'velvet', name: '丝绒', nameEn: 'Velvet' },
];

const colorPresets = [
  '#D4AF8A',
  '#722F37',
  '#1A1A1A',
  '#F5F1EB',
  '#C9C4BB',
  '#8B3E47',
  '#2E4057',
  '#2D5016',
  '#5C3D2E',
  '#9B2335',
  '#FFD700',
  '#C0C0C0',
];

const decorations = [
  { id: 'none', name: '无装饰', nameEn: 'None' },
  { id: 'bow', name: '蝴蝶结', nameEn: 'Bow' },
  { id: 'buckle', name: '金属扣', nameEn: 'Buckle' },
  { id: 'rhinestone', name: '水钻', nameEn: 'Rhinestone' },
  { id: 'tassel', name: '流苏', nameEn: 'Tassel' },
  { id: 'feather', name: '羽毛', nameEn: 'Feather' },
];

const toeShapes = [
  { id: 'pointed', name: '尖头', nameEn: 'Pointed' },
  { id: 'rounded', name: '圆头', nameEn: 'Rounded' },
  { id: 'square', name: '方头', nameEn: 'Square' },
  { id: 'almond', name: '杏仁头', nameEn: 'Almond' },
];

const strapStyles = [
  { id: 'none', name: '无带', nameEn: 'None' },
  { id: 'maryjane', name: '玛丽珍', nameEn: 'Mary Jane' },
  { id: 'tstrap', name: 'T字带', nameEn: 'T-Strap' },
  { id: 'ankle', name: '脚踝带', nameEn: 'Ankle Strap' },
  { id: 'slingback', name: '后绊带', nameEn: 'Slingback' },
];

const DesignerStudio = () => {
  const navigate = useNavigate();
  const { currentConfig, setCurrentConfig, resetConfig, saveWork, works } = useDesignStore();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [designName, setDesignName] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    if (!designName.trim()) return;

    const svgElement = previewRef.current?.querySelector('svg');
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = 400;
        canvas.height = 400;
        if (ctx) {
          ctx.fillStyle = '#1A1A1A';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, 400, 400);
          const dataUrl = canvas.toDataURL('image/png');
          saveWork(designName.trim(), dataUrl);
          URL.revokeObjectURL(url);
          setShowSaveModal(false);
          setDesignName('');
          navigate('/studio/gallery');
        }
      };
      img.src = url;
    }
  };

  return (
    <div className="min-h-screen">
      <header className="relative py-8 md:py-12 text-center border-b border-museum-gold/20">
        <div className="container">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-museum-gray hover:text-museum-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans text-sm tracking-wider uppercase">
              返回首页
            </span>
          </Link>

          <h1 className="font-display text-4xl md:text-5xl font-bold gold-text-gradient mb-3">
            设计师工作室
          </h1>
          <p className="font-sans text-sm tracking-[0.2em] text-museum-gray uppercase mb-6">
            Designer Studio
          </p>
          <p className="font-body text-base text-museum-gray max-w-xl mx-auto">
            发挥你的创意，定制专属于你的高跟鞋设计，实时预览并保存你的作品
          </p>
        </div>
      </header>

      <div className="container py-8">
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowSaveModal(true)}
            className="btn-gold inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>保存设计</span>
          </button>
          <button
            onClick={resetConfig}
            className="px-6 py-3 border border-museum-gray/30 text-museum-gray font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:border-museum-gray hover:text-museum-ivory inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>重置</span>
          </button>
          <Link
            to="/studio/gallery"
            className="px-6 py-3 border border-museum-burgundy/50 text-museum-burgundy-light font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-museum-burgundy/20 inline-flex items-center gap-2"
          >
            <Grid3X3 className="w-4 h-4" />
            <span>我的作品 ({works.length})</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col items-center" ref={previewRef}>
            <div className="sticky top-8">
              <ShoePreview config={currentConfig} size={380} />
              <div className="mt-6 text-center">
                <p className="font-sans text-xs tracking-[0.2em] text-museum-gray uppercase mb-2">
                  Current Design
                </p>
                <p className="font-display text-2xl text-museum-gold">
                  跟高 {currentConfig.heelHeight} cm
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-museum-gold" />
                <h3 className="font-display text-xl text-museum-ivory">鞋跟高度</h3>
              </div>
              <div className="gold-border p-6">
                <div className="mb-4">
                  <input
                    type="range"
                    min="2"
                    max="18"
                    step="0.5"
                    value={currentConfig.heelHeight}
                    onChange={(e) =>
                      setCurrentConfig({ heelHeight: parseFloat(e.target.value) })
                    }
                    className="w-full h-2 bg-museum-gold/20 rounded-lg appearance-none cursor-pointer accent-museum-gold"
                  />
                </div>
                <div className="flex justify-between font-sans text-sm text-museum-gray">
                  <span>2 cm</span>
                  <span className="text-museum-gold font-bold">
                    {currentConfig.heelHeight} cm
                  </span>
                  <span>18 cm</span>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {[3, 6, 10, 15].map((height) => (
                    <button
                      key={height}
                      onClick={() => setCurrentConfig({ heelHeight: height })}
                      className={`py-2 text-sm font-sans transition-all ${
                        currentConfig.heelHeight === height
                          ? 'bg-museum-gold text-museum-black'
                          : 'border border-museum-gold/30 text-museum-gray hover:border-museum-gold hover:text-museum-gold'
                      }`}
                    >
                      {height}cm
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-museum-gold" />
                <h3 className="font-display text-xl text-museum-ivory">鞋面材质</h3>
              </div>
              <div className="gold-border p-6">
                <div className="grid grid-cols-5 gap-3">
                  {materials.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setCurrentConfig({ material: mat.id })}
                      className={`p-3 text-center transition-all ${
                        currentConfig.material === mat.id
                          ? 'bg-museum-gold/20 border-museum-gold'
                          : 'border border-museum-gold/20 hover:border-museum-gold/50'
                      }`}
                    >
                      <p className="font-body text-sm text-museum-ivory">{mat.name}</p>
                      <p className="font-sans text-xs text-museum-gray uppercase mt-1">
                        {mat.nameEn}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-museum-gold" />
                <h3 className="font-display text-xl text-museum-ivory">颜色</h3>
              </div>
              <div className="gold-border p-6">
                <div className="flex flex-wrap gap-3 mb-4">
                  {colorPresets.map((color) => (
                    <button
                      key={color}
                      onClick={() => setCurrentConfig({ color })}
                      className={`w-10 h-10 rounded-full transition-all border-2 ${
                        currentConfig.color === color
                          ? 'border-museum-gold scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <label className="font-sans text-sm text-museum-gray">自定义颜色:</label>
                  <input
                    type="color"
                    value={currentConfig.color}
                    onChange={(e) => setCurrentConfig({ color: e.target.value })}
                    className="w-12 h-8 bg-transparent border border-museum-gold/30 cursor-pointer"
                  />
                  <span className="font-sans text-sm text-museum-gold uppercase">
                    {currentConfig.color}
                  </span>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-museum-gold" />
                <h3 className="font-display text-xl text-museum-ivory">鞋头形状</h3>
              </div>
              <div className="gold-border p-6">
                <div className="grid grid-cols-4 gap-3">
                  {toeShapes.map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => setCurrentConfig({ toeShape: shape.id })}
                      className={`p-3 text-center transition-all ${
                        currentConfig.toeShape === shape.id
                          ? 'bg-museum-gold/20 border-museum-gold'
                          : 'border border-museum-gold/20 hover:border-museum-gold/50'
                      }`}
                    >
                      <p className="font-body text-sm text-museum-ivory">{shape.name}</p>
                      <p className="font-sans text-xs text-museum-gray uppercase mt-1">
                        {shape.nameEn}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-museum-gold" />
                <h3 className="font-display text-xl text-museum-ivory">鞋带样式</h3>
              </div>
              <div className="gold-border p-6">
                <div className="grid grid-cols-5 gap-3">
                  {strapStyles.map((strap) => (
                    <button
                      key={strap.id}
                      onClick={() => setCurrentConfig({ strapStyle: strap.id })}
                      className={`p-3 text-center transition-all ${
                        currentConfig.strapStyle === strap.id
                          ? 'bg-museum-gold/20 border-museum-gold'
                          : 'border border-museum-gold/20 hover:border-museum-gold/50'
                      }`}
                    >
                      <p className="font-body text-sm text-museum-ivory">{strap.name}</p>
                      <p className="font-sans text-xs text-museum-gray uppercase mt-1">
                        {strap.nameEn}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-museum-gold" />
                <h3 className="font-display text-xl text-museum-ivory">装饰元素</h3>
              </div>
              <div className="gold-border p-6">
                <div className="grid grid-cols-3 gap-3">
                  {decorations.map((dec) => (
                    <button
                      key={dec.id}
                      onClick={() => setCurrentConfig({ decoration: dec.id })}
                      className={`p-3 text-center transition-all ${
                        currentConfig.decoration === dec.id
                          ? 'bg-museum-gold/20 border-museum-gold'
                          : 'border border-museum-gold/20 hover:border-museum-gold/50'
                      }`}
                    >
                      <p className="font-body text-sm text-museum-ivory">{dec.name}</p>
                      <p className="font-sans text-xs text-museum-gray uppercase mt-1">
                        {dec.nameEn}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {showSaveModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="museum-frame w-full max-w-md mx-4 animate-fade-in">
            <h3 className="font-display text-2xl text-museum-gold mb-6 text-center">
              保存设计作品
            </h3>
            <div className="mb-6">
              <label className="font-sans text-sm text-museum-gray block mb-2">
                为你的设计命名
              </label>
              <input
                type="text"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                placeholder="例如：金色缎面高跟鞋"
                className="w-full bg-transparent border border-museum-gold/30 px-4 py-3 font-body text-museum-ivory focus:border-museum-gold focus:outline-none transition-colors"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                }}
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 px-6 py-3 border border-museum-gray/30 text-museum-gray font-sans text-sm tracking-widest uppercase transition-all hover:border-museum-gray hover:text-museum-ivory"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                disabled={!designName.trim()}
                className="flex-1 btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-museum-gold/20 py-12 mt-12">
        <div className="container text-center">
          <p className="font-sans text-xs tracking-[0.3em] text-museum-gray uppercase mb-2">
            The High Heel Museum
          </p>
          <p className="font-body text-sm text-museum-gray-dark">
            A curated collection of iconic footwear through the decades
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DesignerStudio;
