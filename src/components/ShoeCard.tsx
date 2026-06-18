import { Link } from 'react-router-dom';
import type { Shoe } from '@/types';

interface ShoeCardProps {
  shoe: Shoe;
  index: number;
}

const ShoeCard = ({ shoe, index }: ShoeCardProps) => {
  const staggerClass = `stagger-${(index % 9) + 1}` as const;

  return (
    <Link
      to={`/shoe/${shoe.id}`}
      className={`shoe-card group opacity-0 animate-fade-in-up ${staggerClass}`}
    >
      <div className="museum-frame h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden mb-6">
          <img
            src={shoe.imageUrl}
            alt={shoe.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-museum-black/80 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block px-3 py-1 bg-museum-burgundy/80 font-sans text-xs tracking-wider text-museum-ivory uppercase">
              {shoe.era}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="font-display text-2xl text-museum-ivory mb-2 group-hover:text-museum-gold transition-colors duration-300">
            {shoe.name}
          </h3>

          <p className="font-sans text-sm text-museum-gold mb-3">
            {shoe.designer} · {shoe.brand}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {shoe.style.slice(0, 3).map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>

          <p className="font-body text-base text-museum-gray leading-relaxed mb-4 line-clamp-3">
            {shoe.shortStory}
          </p>

          <div className="mt-auto pt-4 border-t border-museum-gold/20 flex items-center justify-between">
            <span className="font-sans text-xs text-museum-gray">
              {shoe.year}
            </span>
            <span className="font-sans text-xs text-museum-gold tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-300">
              View Exhibit →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ShoeCardSkeleton = () => (
  <div className="museum-frame h-full">
    <div className="aspect-[4/3] skeleton mb-6" />
    <div className="skeleton h-8 w-3/4 mb-3" />
    <div className="skeleton h-5 w-1/2 mb-4" />
    <div className="flex gap-2 mb-4">
      <div className="skeleton h-6 w-16" />
      <div className="skeleton h-6 w-16" />
    </div>
    <div className="skeleton h-4 w-full mb-2" />
    <div className="skeleton h-4 w-11/12 mb-2" />
    <div className="skeleton h-4 w-4/5" />
  </div>
);

export default ShoeCard;
