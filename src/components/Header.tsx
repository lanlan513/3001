import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="relative py-16 md:py-24 text-center overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-museum-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-museum-burgundy rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 opacity-0 animate-fade-in">
        <Link to="/" className="inline-block">
          <p className="font-sans text-xs tracking-[0.5em] text-museum-gold mb-4 uppercase">
            A Virtual Exhibition
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold gold-text-gradient mb-4 text-balance">
            高跟鞋博物馆
          </h1>
          <p className="font-sans text-sm tracking-[0.3em] text-museum-gray uppercase mb-6">
            The High Heel Museum
          </p>
        </Link>

        <div className="gold-divider w-32 mx-auto mb-8" />

        <p className="font-body text-lg md:text-xl text-museum-gray max-w-2xl mx-auto leading-relaxed text-balance">
          跨越百年的优雅足迹，从咆哮的二十年代到可持续的未来，
          <br className="hidden md:block" />
          探索每一双高跟鞋背后的设计故事与时代精神
        </p>
      </div>
    </header>
  );
};

export default Header;
