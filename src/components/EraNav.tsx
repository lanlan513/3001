import { useShoeStore } from '@/store/useShoeStore';

interface EraNavProps {
  eras: string[];
  loading: boolean;
}

const EraNav = ({ eras, loading }: EraNavProps) => {
  const { selectedEra, setSelectedEra } = useShoeStore();

  if (loading && eras.length === 0) {
    return (
      <nav className="mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="skeleton h-10 w-20 rounded" />
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="mb-12 opacity-0 animate-fade-in stagger-1">
      <p className="font-sans text-xs tracking-[0.3em] text-museum-gray text-center mb-6 uppercase">
        Explore by Era
      </p>
      <div className="flex flex-wrap justify-center gap-1 md:gap-2">
        <button
          onClick={() => setSelectedEra(null)}
          className={`px-4 py-2 font-sans text-xs tracking-wider uppercase transition-all duration-300 ${
            selectedEra === null
              ? 'bg-museum-gold text-museum-black'
              : 'text-museum-gray hover:text-museum-gold border border-transparent hover:border-museum-gold/30'
          }`}
        >
          All Eras
        </button>
        {eras.map((era, index) => (
          <button
            key={era}
            onClick={() => setSelectedEra(era)}
            className={`px-4 py-2 font-sans text-xs tracking-wider uppercase transition-all duration-300 ${
              selectedEra === era
                ? 'bg-museum-gold text-museum-black'
                : 'text-museum-gray hover:text-museum-gold border border-transparent hover:border-museum-gold/30'
            }`}
            style={{ animationDelay: `${(index + 1) * 0.05}s` }}
          >
            {era}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default EraNav;
