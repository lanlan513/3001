import type { ArchaeologyLocation } from '@/types';
import { useArchaeologyStore } from '@/store/useArchaeologyStore';
import { Lock, MapPin, Footprints, Puzzle } from 'lucide-react';

interface LocationCardProps {
  location: ArchaeologyLocation;
  unlockRequirement: string;
  canUnlock: boolean;
  onClick: () => void;
  onUnlock: () => void;
}

export default function LocationCard({ location, unlockRequirement, canUnlock, onClick, onUnlock }: LocationCardProps) {
  const getLocationProgress = useArchaeologyStore((s) => s.getLocationProgress);
  const progress = getLocationProgress(location.id);
  const solvedCount = progress.puzzles.split('/')[0];
  const totalPuzzles = progress.puzzles.split('/')[1];
  const isComplete = solvedCount === totalPuzzles;

  const handleClick = () => {
    if (!location.unlocked) {
      if (canUnlock) onUnlock();
      return;
    }
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative w-full overflow-hidden rounded-2xl transition-all duration-500 text-left ${
        location.unlocked
          ? 'hover:scale-[1.02] hover:shadow-2xl cursor-pointer'
          : canUnlock
          ? 'hover:scale-[1.01] hover:shadow-lg cursor-pointer'
          : 'cursor-not-allowed'
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${location.imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

      {!location.unlocked && (
        <div className={`absolute inset-0 flex items-center justify-center z-20 ${canUnlock ? 'bg-black/50' : 'bg-black/70'}`}>
          <div className="text-center px-4">
            <Lock className={`w-10 h-10 mx-auto mb-3 ${canUnlock ? 'text-green-400' : 'text-museum-gold/60'}`} />
            {canUnlock ? (
              <>
                <p className="font-sans text-sm text-green-400 tracking-wider mb-3">条件已满足</p>
                <div className="px-4 py-2 bg-green-500/20 border border-green-500/40 rounded-lg text-green-400 font-sans text-xs tracking-wider hover:bg-green-500/30 transition-all">
                  点击解锁
                </div>
              </>
            ) : (
              <>
                <p className="font-sans text-sm text-museum-gold/80 tracking-wider mb-2">尚未解锁</p>
                <p className="font-sans text-xs text-museum-gold/50 tracking-wider">{unlockRequirement}</p>
              </>
            )}
          </div>
        </div>
      )}

      {location.unlocked && isComplete && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-green-500/80 rounded-full text-white font-sans text-xs tracking-wider flex items-center gap-1">
          <span>✓</span> 已完成
        </div>
      )}

      <div className={`relative ${location.unlocked ? 'z-10' : 'z-0 opacity-60'} p-6 pt-32 md:pt-48`}>
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
    </div>
  );
}
