import type { ArchaeologyLocation, ArchaeologyRoom } from '@/types';
import { useArchaeologyStore } from '@/store/useArchaeologyStore';
import { Lock, Eye, CheckCircle, Puzzle, MapPin } from 'lucide-react';
import { useState } from 'react';

interface RoomExplorerProps {
  location: ArchaeologyLocation;
}

export default function RoomExplorer({ location }: RoomExplorerProps) {
  const { foundClueIds, solvedPuzzleIds, canUnlockRoom, setSelectedRoom, exploreRoom, foundClue, setActivePuzzle } = useArchaeologyStore();
  const [selectedRoomId, setLocalSelectedRoom] = useState<string | null>(null);
  const [discoveringClue, setDiscoveringClue] = useState<string | null>(null);

  const selectedRoom = location.rooms.find((r) => r.id === selectedRoomId);

  const handleRoomClick = (room: ArchaeologyRoom) => {
    if (room.locked && !canUnlockRoom(location.id, room.id)) return;
    if (!room.explored) {
      exploreRoom(location.id, room.id);
    }
    setLocalSelectedRoom(room.id);
    setSelectedRoom(room.id);
  };

  const handleFindClue = (clueId: string) => {
    if (!selectedRoomId) return;
    setDiscoveringClue(clueId);
    foundClue(location.id, selectedRoomId, clueId);
    setTimeout(() => setDiscoveringClue(null), 2000);
  };

  const isRoomAccessible = (room: ArchaeologyRoom) => {
    if (!room.locked) return true;
    return canUnlockRoom(location.id, room.id);
  };

  const getMissingClues = (room: ArchaeologyRoom) => {
    if (!room.locked) return [];
    return room.requiredClueIds
      .filter((id) => !foundClueIds.includes(id))
      .map((id) => {
        for (const r of location.rooms) {
          const clue = r.clues.find((c) => c.id === id);
          if (clue) return clue.name;
        }
        return id;
      });
  };

  return (
    <div className="space-y-6">
      <div className="relative bg-museum-black/50 rounded-2xl border border-museum-gold/20 overflow-hidden" style={{ paddingBottom: '60%' }}>
        <div className="absolute inset-0 p-6">
          <div className="absolute inset-6 relative">
            {location.rooms.map((room) => {
              const accessible = isRoomAccessible(room);
              const isSolved = solvedPuzzleIds.includes(room.puzzle.id);
              const isSelected = selectedRoomId === room.id;

              return (
                <button
                  key={room.id}
                  onClick={() => handleRoomClick(room)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group ${
                    accessible ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed'
                  }`}
                  style={{ left: `${room.x}%`, top: `${room.y}%` }}
                >
                  <div className="relative">
                    {isSolved && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center z-10">
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    {!accessible && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center z-10">
                        <Lock className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl shadow-lg transition-all ${
                        isSelected
                          ? 'ring-4 animate-glow'
                          : accessible
                          ? 'group-hover:ring-4 group-hover:ring-white/20'
                          : 'grayscale opacity-60'
                      }`}
                      style={{
                        backgroundColor: accessible ? `${location.color}30` : '#1a1a1a',
                        border: `2px solid ${accessible ? location.color : '#333'}`,
                        ...(isSelected ? { ringColor: location.color, boxShadow: `0 0 20px ${location.color}60` } : {}),
                      }}
                    >
                      {room.icon}
                    </div>
                    <div
                      className={`absolute -bottom-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-sans font-medium transition-opacity ${
                        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      } text-white`}
                    >
                      {room.name}
                    </div>
                  </div>

                  {!accessible && (
                    <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-sans text-museum-gold/70 opacity-0 group-hover:opacity-100 transition-opacity">
                      需要: {getMissingClues(room).join(', ')}
                    </div>
                  )}
                </button>
              );
            })}

            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {location.rooms.map((room, i) => {
                const nextRoom = location.rooms[i + 1];
                if (!nextRoom) return null;
                const rAccessible = isRoomAccessible(room);
                const nAccessible = isRoomAccessible(nextRoom);
                if (!rAccessible && !nAccessible) return null;
                return (
                  <line
                    key={`${room.id}-${nextRoom.id}`}
                    x1={`${room.x}%`}
                    y1={`${room.y}%`}
                    x2={`${nextRoom.x}%`}
                    y2={`${nextRoom.y}%`}
                    stroke={location.color}
                    strokeWidth="1.5"
                    strokeDasharray="6,6"
                    opacity="0.3"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {selectedRoom && (
        <div className="bg-museum-black/50 rounded-2xl border border-museum-gold/20 p-6 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{selectedRoom.icon}</span>
            <div>
              <h4 className="font-display text-xl text-white">{selectedRoom.name}</h4>
              <p className="font-sans text-xs text-museum-gray tracking-wider">{selectedRoom.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-sans text-sm text-museum-gold tracking-wider uppercase mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4" /> 可探索的线索
              </h5>
              <div className="space-y-2">
                {selectedRoom.clues.map((clue) => (
                  <button
                    key={clue.id}
                    onClick={() => handleFindClue(clue.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-300 ${
                      foundClueIds.includes(clue.id)
                        ? 'bg-museum-gold/10 border-museum-gold/30'
                        : 'bg-white/5 border-white/10 hover:border-museum-gold/30 hover:bg-museum-gold/5'
                    } ${discoveringClue === clue.id ? 'animate-pulse ring-2 ring-museum-gold' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{clue.icon}</span>
                      <div className="flex-1">
                        <p className={`font-sans text-sm ${foundClueIds.includes(clue.id) ? 'text-museum-gold' : 'text-white'}`}>
                          {foundClueIds.includes(clue.id) ? clue.name : '??? 未知线索'}
                        </p>
                        {foundClueIds.includes(clue.id) && (
                          <p className="font-body text-xs text-museum-gray mt-1">{clue.detail}</p>
                        )}
                      </div>
                      {foundClueIds.includes(clue.id) ? (
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      ) : (
                        <MapPin className="w-4 h-4 text-museum-gold/50 shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
                {selectedRoom.clues.length === 0 && (
                  <p className="font-body text-sm text-museum-gray italic">此房间没有可发现的线索</p>
                )}
              </div>
            </div>

            <div>
              <h5 className="font-sans text-sm text-museum-gold tracking-wider uppercase mb-3 flex items-center gap-2">
                <Puzzle className="w-4 h-4" /> 机关谜题
              </h5>
              <div className={`p-4 rounded-lg border ${
                solvedPuzzleIds.includes(selectedRoom.puzzle.id)
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-white/5 border-white/10'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-sm font-sans tracking-wider ${
                    solvedPuzzleIds.includes(selectedRoom.puzzle.id) ? 'text-green-400' : 'text-museum-gold'
                  }`}>
                    {selectedRoom.puzzle.name}
                  </span>
                  {solvedPuzzleIds.includes(selectedRoom.puzzle.id) && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <p className="font-body text-sm text-museum-gray mb-3">{selectedRoom.puzzle.description}</p>
                {!solvedPuzzleIds.includes(selectedRoom.puzzle.id) && (
                  <button
                    onClick={() => setActivePuzzle(selectedRoom.puzzle.id)}
                    className="px-4 py-2 bg-museum-gold/20 text-museum-gold font-sans text-xs tracking-wider uppercase rounded hover:bg-museum-gold/30 transition-all"
                  >
                    解开谜题
                  </button>
                )}
                {solvedPuzzleIds.includes(selectedRoom.puzzle.id) && (
                  <p className="font-body text-xs text-green-400/80 italic">{selectedRoom.puzzle.storyFragment}</p>
                )}
              </div>

              {solvedPuzzleIds.includes(selectedRoom.puzzle.id) && selectedRoom.reward && (
                <div className="mt-4 p-4 rounded-lg border border-museum-gold/30 bg-museum-gold/5">
                  <h6 className="font-sans text-xs text-museum-gold tracking-wider uppercase mb-2">🏅 获得设计图</h6>
                  <p className="font-display text-lg text-white">{selectedRoom.reward.designName}</p>
                  <p className="font-body text-xs text-museum-gray mt-1">{selectedRoom.reward.designDescription}</p>
                  <p className="font-sans text-xs text-museum-gold/60 mt-1">{selectedRoom.reward.designEra}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
