import { useParams } from 'react-router-dom';
import { useShoeDetail } from '@/hooks/useShoes';
import BackButton from '@/components/BackButton';
import { Ruler, Palette, Hammer, MapPin } from 'lucide-react';

const ShoeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { shoe, loading, error } = useShoeDetail(id);

  if (loading) {
    return (
      <div className="min-h-screen container py-12">
        <div className="mb-8">
          <div className="skeleton h-12 w-40" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="museum-frame">
            <div className="aspect-square skeleton" />
          </div>
          <div>
            <div className="skeleton h-12 w-3/4 mb-4" />
            <div className="skeleton h-6 w-1/2 mb-8" />
            <div className="gold-divider mb-8" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="mb-4">
                <div className="skeleton h-4 w-24 mb-2" />
                <div className="skeleton h-5 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen container py-12 text-center">
        <p className="text-museum-burgundy-light font-body text-xl mb-8">
          {error}
        </p>
        <BackButton />
      </div>
    );
  }

  if (!shoe) return null;

  const paragraphs = shoe.fullStory.split('\n\n');

  return (
    <div className="min-h-screen">
      <div className="container py-12">
        <div className="mb-12 opacity-0 animate-fade-in">
          <BackButton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="opacity-0 animate-fade-in stagger-1">
            <div className="museum-frame mb-6">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={shoe.imageUrl}
                  alt={shoe.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-museum-black/30 via-transparent to-transparent" />
              </div>
            </div>

            {shoe.galleryImages && shoe.galleryImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {shoe.galleryImages.map((img, i) => (
                  <div key={i} className="museum-frame">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={img}
                        alt={`${shoe.name} view ${i + 2}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="opacity-0 animate-fade-in stagger-2">
            <div className="sticky top-12">
              <span className="inline-block px-4 py-1 bg-museum-burgundy/80 font-sans text-xs tracking-wider text-museum-ivory uppercase mb-4">
                {shoe.era} · {shoe.year}
              </span>

              <h1 className="font-display text-4xl md:text-5xl text-museum-ivory mb-3 text-balance">
                {shoe.name}
              </h1>

              <p className="font-body text-xl text-museum-gold mb-6">
                by {shoe.designer} · {shoe.brand}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {shoe.style.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>

              <div className="gold-divider mb-8" />

              <div className="mb-12">
                <h2 className="font-display text-2xl text-museum-gold mb-6">
                  Technical Specifications
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Ruler className="w-5 h-5 text-museum-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-xs tracking-wider text-museum-gray uppercase mb-1">
                        Heel Height
                      </p>
                      <p className="font-body text-xl text-museum-ivory">{shoe.specs.heelHeight}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Palette className="w-5 h-5 text-museum-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-xs tracking-wider text-museum-gray uppercase mb-1">
                        Material
                      </p>
                      <p className="font-body text-xl text-museum-ivory">{shoe.specs.material}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Hammer className="w-5 h-5 text-museum-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-xs tracking-wider text-museum-gray uppercase mb-1">
                        Craftsmanship
                      </p>
                      <p className="font-body text-xl text-museum-ivory">{shoe.specs.craftsmanship}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-museum-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-xs tracking-wider text-museum-gray uppercase mb-1">
                        Origin
                      </p>
                      <p className="font-body text-xl text-museum-ivory">{shoe.specs.origin}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="gold-divider my-16 opacity-0 animate-fade-in stagger-3" />

        <div className="max-w-3xl mx-auto opacity-0 animate-fade-in stagger-4">
          <h2 className="font-display text-3xl text-museum-gold mb-8 text-center">
            The Story
          </h2>

          <div className="space-y-8">
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`font-body text-xl leading-relaxed text-museum-ivory ${
                  i === 0 ? 'drop-cap' : ''
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="gold-divider my-16 opacity-0 animate-fade-in stagger-5" />

        <div className="max-w-3xl mx-auto opacity-0 animate-fade-in stagger-6">
          <h2 className="font-display text-3xl text-museum-gold mb-8 text-center">
            Historical Context
          </h2>

          <blockquote className="relative pl-8 border-l-2 border-museum-gold">
            <p className="font-body text-xl leading-relaxed text-museum-ivory italic">
              {shoe.historicalContext}
            </p>
          </blockquote>
        </div>

        <div className="mt-24 text-center opacity-0 animate-fade-in stagger-7">
          <BackButton />
        </div>
      </div>

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

export default ShoeDetail;
