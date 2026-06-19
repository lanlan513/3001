import { useArchaeologyStore } from '@/store/useArchaeologyStore';
import { Scroll, BookOpen } from 'lucide-react';

export default function CluePanel() {
  const { locations, foundClueIds, showStoryModal } = useArchaeologyStore();

  const allClues = locations.flatMap((loc) =>
    loc.rooms.flatMap((room) =>
      room.clues
        .filter((c) => foundClueIds.includes(c.id))
        .map((c) => ({ ...c, locationName: loc.name, locationIcon: loc.icon }))
    )
  );

  if (allClues.length === 0) {
    return (
      <div className="bg-museum-black/50 rounded-2xl border border-museum-gold/20 p-6 text-center">
        <Scroll className="w-8 h-8 text-museum-gold/30 mx-auto mb-3" />
        <p className="font-sans text-sm text-museum-gray tracking-wider">尚未发现任何线索</p>
        <p className="font-body text-xs text-museum-gray-dark mt-1">探索地点中的房间，寻找隐藏的线索</p>
      </div>
    );
  }

  return (
    <div className="bg-museum-black/50 rounded-2xl border border-museum-gold/20 p-4">
      <h3 className="font-sans text-sm text-museum-gold tracking-wider uppercase mb-4 flex items-center gap-2">
        <Scroll className="w-4 h-4" /> 线索收集册 ({allClues.length})
      </h3>
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {allClues.map((clue) => (
          <button
            key={clue.id}
            onClick={() => showStoryModal(clue.detail)}
            className="w-full text-left p-3 rounded-lg bg-white/5 border border-white/10 hover:border-museum-gold/30 transition-all group"
          >
            <div className="flex items-start gap-2">
              <span className="text-lg shrink-0">{clue.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-sans text-sm text-white truncate">{clue.name}</p>
                </div>
                <p className="font-body text-xs text-museum-gray mt-0.5 line-clamp-1">{clue.description}</p>
                <p className="font-sans text-xs text-museum-gold/40 mt-0.5">{clue.locationIcon} {clue.locationName}</p>
              </div>
              <BookOpen className="w-3.5 h-3.5 text-museum-gold/30 group-hover:text-museum-gold/60 shrink-0 mt-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
