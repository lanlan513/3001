import { Search, X } from 'lucide-react';
import { useShoeStore } from '@/store/useShoeStore';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useShoeStore();

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-museum-gray" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="搜索鞋款名称、设计师..."
          className="w-full pl-12 pr-10 py-3 bg-transparent border border-museum-gold/30 text-museum-ivory placeholder-museum-gray/50 font-sans text-sm focus:outline-none focus:border-museum-gold transition-colors duration-300"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-museum-gray hover:text-museum-gold transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
