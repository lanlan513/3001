import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ArrowLeft } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import GalleryCard, { GalleryCardSkeleton } from '@/components/GalleryCard';
import Empty from '@/components/Empty';
import { useGallery } from '@/hooks/useGallery';

const Gallery = () => {
  const { shoes, loading, error } = useGallery();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
            高跟鞋图鉴
          </h1>
          <p className="font-sans text-sm tracking-[0.2em] text-museum-gray uppercase mb-6">
            High Heel Collection
          </p>
          <p className="font-body text-base text-museum-gray max-w-xl mx-auto">
            浏览跨越百年的经典鞋款，按年代、高度、风格、颜色筛选你感兴趣的设计
          </p>
        </div>
      </header>

      <div className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <SearchBar />

          <div className="flex items-center gap-4">
            <span className="font-sans text-sm text-museum-gray">
              共 <span className="text-museum-gold">{shoes.length}</span> 款鞋履
            </span>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-museum-gold/30 text-museum-gold hover:bg-museum-gold/10 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="font-sans text-sm">筛选</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="hidden lg:block">
            <FilterSidebar isOpen={true} onClose={() => setIsFilterOpen(false)} />
          </div>

          <div className="flex-1">
            {error && (
              <div className="text-center py-12">
                <p className="text-museum-burgundy-light font-body text-lg">
                  {error}
                </p>
              </div>
            )}

            {!loading && !error && shoes.length === 0 && (
              <Empty
                title="未找到匹配的鞋款"
                description="尝试调整筛选条件或搜索关键词"
              />
            )}

            {loading && shoes.length === 0 && (
              <div className="columns-2 md:columns-3 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="break-inside-avoid">
                    <GalleryCardSkeleton />
                  </div>
                ))}
              </div>
            )}

            {shoes.length > 0 && (
              <div className="columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {shoes.map((shoe, index) => (
                  <div key={shoe.id} className="break-inside-avoid">
                    <GalleryCard shoe={shoe} index={index} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

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

export default Gallery;
