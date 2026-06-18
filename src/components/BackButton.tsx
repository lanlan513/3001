import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const BackButton = () => {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 px-6 py-3 font-sans text-sm tracking-widest uppercase text-museum-gold border border-museum-gold/30 hover:bg-museum-gold hover:text-museum-black transition-all duration-300 group"
    >
      <ChevronLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
      Back to Gallery
    </Link>
  );
};

export default BackButton;
