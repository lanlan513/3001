import type { ArchaeologyLocation } from '@/types';
import { useArchaeologyStore } from '@/store/useArchaeologyStore';
import { Lock, MapPin, Footprints, Puzzle } from 'lucide-react';

interface LocationCardProps {
  location: ArchaeologyLocation;
  onClick: () => void;
}

export default function LocationCard({ location, onClick }: LocationCardProps) {
  const getLocationProgress = useArchaeologyStore((s) => s.getLocationProgress);
  const progress = getLocationProgress(location.id);
  const solvedCount = progress.puzzles.split('/')[0];
  const totalPuzzles = progress.puzzles.split('/')[1];
  const isComplete = solvedCount === totalPuzzles;

  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl text-left"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${location.imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

      {!location.unlocked && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
          <div className="text-center">
            <Lock className="w-10 h-10 text-museum-gold mx-auto mb-2" />
            <p className="font-sans text-sm text-museum-gold tracking-wider">需要解锁</p>
          </div>
        </div>
      )}

      {isComplete && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-green-500/80 rounded-full text-white font-sans text-xs tracking-wider flex items-center gap-1">
          <span>✓</span> 已完成
        </div>
      )}

      <div className="relative z-10 p-6 pt-32 md:pt-48">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{location.icon}</span>
          <span
            className="px-2 py-0.5 rounded text-xs font-sans tracking-wider uppercase"
            style={{ backgroundColor: `${location.color}40`, color: location.color }}
          >
            {location.era}
          </span>
        </div>

        <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
          {location.name}
        </h3>
        <p className="font-sans text-sm text-white/60 tracking-wider mb-3">
          {location.subtitle}
        </p>

        <p className="font-body text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
          {location.description}
        </p>

        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-white/70">
            <MapPin className="w-3.5 h-3.5" />
            <span className="font-sans text-xs">{progress.rooms} 房间</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70">
            <Footprints className="w-3.5 h-3.5" />
            <span className="font-sans text-xs">{progress.clues} 线索</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70">
            <Puzzle className="w-3.5 h-3.5" />
            <span className="font-sans text-xs">{progress.puzzles} 谜题</span>
          </div>
        </div>

        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${(parseInt(solvedCount) / parseInt(totalPuzzles)) * 100}%`,
              backgroundColor: isComplete ? '#22c55e' : location.color,
            }}
          />
        </div>
      </div>
    </button>
  );
}
