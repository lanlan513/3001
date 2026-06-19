import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Info, Gem } from 'lucide-react';
import ExhibitionStage from '@/components/exhibition/ExhibitionStage';
import ShoeDetailPanel from '@/components/exhibition/ShoeDetailPanel';
import { exhibitionShoes } from '@/data/exhibitionShoes';
import type { ExhibitionShoe } from '@/data/exhibitionShoes';

const ExhibitionHall = () => {
  const [selectedShoe, setSelectedShoe] = useState<ExhibitionShoe | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-museum-black">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(212, 175, 138, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(114, 47, 55, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 80%, rgba(212, 175, 138, 0.05) 0%, transparent 40%),
            linear-gradient(180deg, #0a0908 0%, #12100e 50%, #0a0908 100%)
          `,
        }}
      />

      <div className="absolute top-0 left-0 right-0 z-20 p-6 pointer-events-none">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-museum-gray hover:text-museum-gold transition-colors pointer-events-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans text-sm tracking-wider uppercase">
              返回首页
            </span>
          </Link>

          <div className="text-center pointer-events-none">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Gem className="w-4 h-4 text-museum-gold" />
              <span className="font-sans text-xs tracking-[0.3em] text-museum-gold uppercase">
                Exclusive Collection
              </span>
              <Gem className="w-4 h-4 text-museum-gold" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold gold-text-gradient">
              珍品3D展区
            </h1>
          </div>

          <div className="w-24" />
        </div>
      </div>

      {showIntro && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-museum-black/85 backdrop-blur-sm">
          <div className="museum-frame max-w-md mx-4 animate-fade-in">
            <div className="text-center p-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Gem className="w-7 h-7 text-museum-gold" />
                <h2 className="font-display text-3xl font-bold gold-text-gradient">
                  珍品展区
                </h2>
                <Gem className="w-7 h-7 text-museum-gold" />
              </div>
              <p className="font-sans text-xs tracking-[0.25em] text-museum-gold/70 uppercase mb-6">
                The Exclusive Exhibition
              </p>
              <div className="gold-divider mb-6" />
              <p className="font-body text-lg text-museum-ivory mb-3">
                欢迎来到高跟鞋博物馆的珍品展区
              </p>
              <p className="font-body text-base text-museum-gray mb-6 leading-relaxed">
                这里陈列着跨越百年的
                <span className="text-museum-gold font-semibold"> {exhibitionShoes.length} </span>
                双经典鞋款臻品。
                <br />
                点击展柜查看详情，拖拽旋转视角，滚轮缩放欣赏细节。
              </p>
              <div className="space-y-3 text-left mb-6 p-4 bg-museum-gold/5 rounded-lg border border-museum-gold/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/30" />
                  <span className="font-sans text-sm text-museum-gray">
                    <span className="text-yellow-400">传奇臻品</span> · 改变鞋履历史的经典之作
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gray-300 shadow-lg shadow-gray-300/30" />
                  <span className="font-sans text-sm text-museum-gray">
                    <span className="text-gray-300">经典标志</span> · 家喻户晓的时代符号
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-600 shadow-lg shadow-amber-600/30" />
                  <span className="font-sans text-sm text-museum-gray">
                    <span className="text-amber-600">时代经典</span> · 每个年代的代表之作
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowIntro(false)}
                className="btn-gold w-full justify-center"
              >
                开始探索
              </button>
            </div>
          </div>
        </div>
      )}

      <ExhibitionStage
        selectedShoe={selectedShoe}
        onSelectShoe={setSelectedShoe}
      />

      <ShoeDetailPanel shoe={selectedShoe} onClose={() => setSelectedShoe(null)} />

      {!selectedShoe && !showIntro && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-museum-black/60 backdrop-blur-md border border-museum-gold/20 rounded-full">
            <Info className="w-4 h-4 text-museum-gold" />
            <span className="font-sans text-xs text-museum-gray tracking-wide">
              拖拽旋转 · 滚轮缩放 · 点击展柜查看详情
            </span>
          </div>
        </div>
      )}

      <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-4 py-2 bg-museum-black/60 backdrop-blur-md border border-museum-gold/20 rounded-full">
          <Sparkles className="w-4 h-4 text-museum-gold" />
          <span className="font-sans text-xs text-museum-gray">
            共 <span className="text-museum-gold font-medium">{exhibitionShoes.length}</span> 件珍品
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionHall;
