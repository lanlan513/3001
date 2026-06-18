import { useShoeStore } from '@/store/useShoeStore';
import { Filter, X } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const HEEL_HEIGHT_OPTIONS = [
  { label: '平底 (0-3cm)', min: 0, max: 3 },
  { label: '低跟 (3-5cm)', min: 3, max: 5 },
  { label: '中跟 (5-8cm)', min: 5, max: 8 },
  { label: '高跟 (8-12cm)', min: 8, max: 12 },
  { label: '超高跟 (12cm+)', min: 12, max: 20 },
];

const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    <h4 className="font-sans text-xs tracking-[0.2em] text-museum-gold uppercase mb-4">
      {title}
    </h4>
    {children}
  </div>
);

const FilterSidebar = ({ isOpen, onClose }: FilterSidebarProps) => {
  const {
    eras,
    styles,
    colors,
    selectedEra,
    selectedStyle,
    selectedColor,
    heelHeightRange,
    setSelectedEra,
    setSelectedStyle,
    setSelectedColor,
    setHeelHeightRange,
  } = useShoeStore();

  const handleHeelHeightClick = (min: number, max: number) => {
    if (
      heelHeightRange &&
      heelHeightRange[0] === min &&
      heelHeightRange[1] === max
    ) {
      setHeelHeightRange(null);
    } else {
      setHeelHeightRange([min, max]);
    }
  };

  const isHeelHeightSelected = (min: number, max: number) => {
    return (
      heelHeightRange !== null &&
      heelHeightRange[0] === min &&
      heelHeightRange[1] === max
    );
  };

  const clearAllFilters = () => {
    setSelectedEra(null);
    setSelectedStyle(null);
    setSelectedColor(null);
    setHeelHeightRange(null);
  };

  const hasActiveFilters =
    selectedEra || selectedStyle || selectedColor || heelHeightRange;

  return (
    <>
      <div
        className={`fixed inset-0 bg-museum-black/80 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-museum-black border-l border-museum-gold/20 z-50 transform transition-transform duration-300 overflow-y-auto lg:translate-x-0 lg:static lg:h-auto lg:w-64 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-museum-gold" />
              <h3 className="font-display text-xl text-museum-ivory">筛选</h3>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-museum-gray hover:text-museum-gold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="w-full mb-6 py-2 text-sm font-sans text-museum-burgundy-light border border-museum-burgundy/50 hover:bg-museum-burgundy/10 transition-colors"
            >
              清除所有筛选
            </button>
          )}

          <FilterSection title="年代">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedEra(null)}
                className={`px-3 py-1.5 text-xs font-sans tracking-wider uppercase transition-all duration-200 ${
                  selectedEra === null
                    ? 'bg-museum-gold text-museum-black'
                    : 'text-museum-gray hover:text-museum-gold border border-museum-gold/20 hover:border-museum-gold/50'
                }`}
              >
                全部
              </button>
              {eras.map((era) => (
                <button
                  key={era}
                  onClick={() => setSelectedEra(era)}
                  className={`px-3 py-1.5 text-xs font-sans tracking-wider uppercase transition-all duration-200 ${
                    selectedEra === era
                      ? 'bg-museum-gold text-museum-black'
                      : 'text-museum-gray hover:text-museum-gold border border-museum-gold/20 hover:border-museum-gold/50'
                  }`}
                >
                  {era}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="鞋跟高度">
            <div className="space-y-2">
              {HEEL_HEIGHT_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleHeelHeightClick(option.min, option.max)}
                  className={`w-full text-left px-3 py-2 text-sm font-sans transition-all duration-200 ${
                    isHeelHeightSelected(option.min, option.max)
                      ? 'bg-museum-gold/20 text-museum-gold border border-museum-gold/50'
                      : 'text-museum-gray hover:text-museum-gold border border-transparent hover:border-museum-gold/30'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="风格">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedStyle(null)}
                className={`px-3 py-1.5 text-xs font-sans tracking-wider uppercase transition-all duration-200 ${
                  selectedStyle === null
                    ? 'bg-museum-gold text-museum-black'
                    : 'text-museum-gray hover:text-museum-gold border border-museum-gold/20 hover:border-museum-gold/50'
                }`}
              >
                全部
              </button>
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-3 py-1.5 text-xs font-sans transition-all duration-200 ${
                    selectedStyle === style
                      ? 'bg-museum-gold text-museum-black'
                      : 'text-museum-gray hover:text-museum-gold border border-museum-gold/20 hover:border-museum-gold/50'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="颜色">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedColor(null)}
                className={`px-3 py-1.5 text-xs font-sans tracking-wider uppercase transition-all duration-200 ${
                  selectedColor === null
                    ? 'bg-museum-gold text-museum-black'
                    : 'text-museum-gray hover:text-museum-gold border border-museum-gold/20 hover:border-museum-gold/50'
                }`}
              >
                全部
              </button>
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1.5 text-xs font-sans transition-all duration-200 ${
                    selectedColor === color
                      ? 'bg-museum-gold text-museum-black'
                      : 'text-museum-gray hover:text-museum-gold border border-museum-gold/20 hover:border-museum-gold/50'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </FilterSection>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
