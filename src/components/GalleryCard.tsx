import { Link } from 'react-router-dom';
import type { Shoe } from '@/types';

interface GalleryCardProps {
  shoe: Shoe;
  index: number;
}

const GalleryCard = ({ shoe, index }: GalleryCardProps) => {
  const staggerDelay = (index % 12) * 0.05;

  return (
    <Link
      to={`/shoe/${shoe.id}`}
      className="gallery-card group relative overflow-hidden opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${staggerDelay}s` }}
    >
      <div className="museum-frame">
        <div className="relative overflow-hidden">
          <img
            src={shoe.imageUrl}
            alt={shoe.name}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-museum-black via-museum-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-2 py-1 bg-museum-burgundy/80 font-sans text-xs text-museum-ivory uppercase">
              {shoe.era}
            </span>
            <span className="px-2 py-1 bg-museum-black/60 font-sans text-xs text-museum-gold">
              {shoe.specs.heelHeight}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="font-display text-lg text-museum-ivory mb-1">
              {shoe.name}
            </h3>
            <p className="font-sans text-xs text-museum-gold mb-2">
              {shoe.designer}
            </p>
            <div className="flex flex-wrap gap-1">
              {shoe.style.slice(0, 2).map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 text-[10px] font-sans uppercase border border-museum-gold/30 text-museum-gray-light"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3">
          <h4 className="font-display text-base text-museum-ivory mb-1 group-hover:text-museum-gold transition-colors">
            {shoe.name}
          </h4>
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs text-museum-gray">
              {shoe.color}
            </span>
            <span className="font-sans text-xs text-museum-gold">
              {shoe.year}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const GalleryCardSkeleton = () => (
  <div className="museum-frame">
    <div className="aspect-square skeleton" />
    <div className="p-3">
      <div className="skeleton h-5 w-3/4 mb-2" />
      <div className="skeleton h-4 w-1/2" />
    </div>
  </div>
);

export default GalleryCard;
