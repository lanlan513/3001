import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import EraNav from '@/components/EraNav';
import ShoeCard, { ShoeCardSkeleton } from '@/components/ShoeCard';
import { useShoes } from '@/hooks/useShoes';
import { Grid3X3, Paintbrush, Map, Crown, Sparkles, BookOpen } from 'lucide-react';

const Home = () => {
  const { shoes, eras, loading, error } = useShoes();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container pb-24">
        <EraNav eras={eras} loading={loading} />

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 flex-wrap">
          <Link
            to="/gallery"
            className="btn-gold inline-flex items-center gap-2"
          >
            <Grid3X3 className="w-4 h-4" />
            <span>浏览完整图鉴</span>
          </Link>
          <Link
            to="/studio"
            className="px-6 py-3 border border-museum-burgundy/50 text-museum-burgundy-light font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-museum-burgundy/20 inline-flex items-center gap-2"
          >
            <Paintbrush className="w-4 h-4" />
            <span>设计师工作室</span>
          </Link>
          <Link
            to="/city-map"
            className="px-6 py-3 border-2 border-museum-gold bg-museum-gold/10 text-museum-gold-dark font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-museum-gold/20 inline-flex items-center gap-2"
          >
            <Map className="w-4 h-4" />
            <span>高跟鞋城市地图</span>
          </Link>
          <Link
            to="/kingdom"
            className="px-6 py-3 bg-gradient-to-r from-museum-gold-dark to-museum-gold text-museum-black font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:shadow-museum-gold/30 hover:scale-105 inline-flex items-center gap-2"
          >
            <Crown className="w-4 h-4" />
            <span>👑 高跟鞋王国</span>
          </Link>
          <Link
            to="/exhibition"
            className="px-6 py-3 bg-gradient-to-r from-museum-burgundy to-museum-burgundy-light text-white font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:shadow-museum-burgundy/30 hover:scale-105 inline-flex items-center gap-2 animate-pulse"
          >
            <Sparkles className="w-4 h-4" />
            <span>✨ 3D珍品展区</span>
          </Link>
          <Link
            to="/magazine"
            className="px-6 py-3 bg-gradient-to-r from-purple-900 to-museum-burgundy text-white font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>📰 时尚杂志社</span>
          </Link>
        </div>

        {error && (
          <div className="text-center py-12">
            <p className="text-museum-burgundy-light font-body text-lg">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && shoes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-museum-gray font-body text-lg">
              No exhibits found for this selection.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? [...Array(9)].map((_, i) => <ShoeCardSkeleton key={i} />)
            : shoes.map((shoe, index) => (
                <ShoeCard key={shoe.id} shoe={shoe} index={index} />
              ))}
        </div>
      </main>

      <footer className="border-t border-museum-gold/20 py-12">
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

export default Home;
