import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Compass, BookOpen, Scroll, Sparkles } from 'lucide-react';
import { useArchaeologyStore } from '@/store/useArchaeologyStore';
import LocationCard from '@/components/archaeology/LocationCard';
import RoomExplorer from '@/components/archaeology/RoomExplorer';
import CluePanel from '@/components/archaeology/CluePanel';
import PuzzleModal from '@/components/archaeology/PuzzleModal';
import RewardReveal from '@/components/archaeology/RewardReveal';

export default function ArchaeologyPlan() {
  const {
    locations,
    selectedLocationId,
    setSelectedLocation,
    activePuzzleId,
    showStory,
    currentStory,
    hideStoryModal,
    foundClueIds,
    solvedPuzzleIds,
    unlockedDesignIds,
    unlockLocation,
    getLocationProgress,
  } = useArchaeologyStore();

  const selectedLocation = locations.find((l) => l.id === selectedLocationId);

  const activePuzzle = selectedLocation?.rooms.find((r) => r.puzzle.id === activePuzzleId);
  const activePuzzleRoom = activePuzzle;

  const totalClues = locations.reduce((acc, loc) => acc + loc.rooms.reduce((a, r) => a + r.clues.length, 0), 0);
  const totalPuzzles = locations.reduce((acc, loc) => acc + loc.rooms.length, 0);
  const totalDesigns = locations.reduce((acc, loc) => acc + loc.rooms.length, 0);

  return (
    <div className="min-h-screen">
      <header className="relative py-8 px-4 border-b border-museum-gold/10">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-museum-burgundy/5 to-transparent" />
        <div className="container relative">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            {selectedLocation ? (
              <button
                onClick={() => setSelectedLocation(null)}
                className="inline-flex items-center gap-2 text-museum-gray-dark hover:text-museum-gold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-sans text-sm tracking-wider">返回地点选择</span>
              </button>
            ) : (
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-museum-gray-dark hover:text-museum-gold transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="font-sans text-sm tracking-wider">返回首页</span>
              </Link>
            )}

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 bg-amber-900/20 px-3 py-1.5 rounded-full border border-amber-700/30">
                <Scroll className="w-4 h-4 text-amber-500" />
                <span className="font-sans text-xs text-amber-400">{foundClueIds.length}/{totalClues}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-museum-burgundy/20 px-3 py-1.5 rounded-full border border-museum-burgundy/30">
                <Compass className="w-4 h-4 text-museum-burgundy-light" />
                <span className="font-sans text-xs text-museum-burgundy-light">{solvedPuzzleIds.length}/{totalPuzzles}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-museum-gold/20 px-3 py-1.5 rounded-full border border-museum-gold/30">
                <Sparkles className="w-4 h-4 text-museum-gold" />
                <span className="font-sans text-xs text-museum-gold">{unlockedDesignIds.length}/{totalDesigns}</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            {!selectedLocation ? (
              <>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Compass className="w-8 h-8 text-amber-500" />
                  <h1 className="font-display text-4xl md:text-5xl font-bold gold-text-gradient">
                    高跟鞋考古计划
                  </h1>
                </div>
                <p className="font-body text-museum-gray-dark text-lg">
                  探索古代遗迹、废弃剧院与神秘庄园，发现失传鞋款设计图与历史故事
                </p>
                <p className="font-sans text-xs text-museum-gray tracking-wider mt-2 uppercase">
                  收集线索 · 解开谜题 · 解锁设计
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-4xl">{selectedLocation.icon}</span>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                    {selectedLocation.name}
                  </h1>
                </div>
                <p className="font-sans text-sm tracking-wider uppercase mb-1" style={{ color: selectedLocation.color }}>
                  {selectedLocation.subtitle} · {selectedLocation.era}
                </p>
                <p className="font-body text-museum-gray max-w-2xl mx-auto">
                  {selectedLocation.description}
                </p>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container py-8">
        {!selectedLocation ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {locations.map((location, index) => {
                const prevLocation = index > 0 ? locations[index - 1] : null;
                const prevProgress = prevLocation ? getLocationProgress(prevLocation.id) : null;
                const prevSolved = prevProgress ? parseInt(prevProgress.puzzles.split('/')[0]) : 0;
                const prevTotal = prevProgress ? parseInt(prevProgress.puzzles.split('/')[1]) : 0;
                const prevComplete = prevProgress ? prevSolved >= prevTotal : false;
                const canUnlock = !location.unlocked && (!prevLocation || prevComplete);
                const unlockRequirement = prevLocation
                  ? `完成「${prevLocation.name}」的全部谜题后解锁`
                  : '';

                return (
                  <LocationCard
                    key={location.id}
                    location={location}
                    unlockRequirement={unlockRequirement}
                    canUnlock={canUnlock}
                    onClick={() => {
                      if (location.unlocked) setSelectedLocation(location.id);
                    }}
                    onUnlock={() => unlockLocation(location.id)}
                  />
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CluePanel />

              <div className="bg-museum-black/50 rounded-2xl border border-museum-gold/20 p-6">
                <h3 className="font-sans text-sm text-museum-gold tracking-wider uppercase mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> 探索指南
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-museum-gold/20 flex items-center justify-center text-xs font-sans font-bold text-museum-gold shrink-0 mt-0.5">1</div>
                    <div>
                      <p className="font-sans text-sm text-white">选择探索地点</p>
                      <p className="font-body text-xs text-museum-gray">三个神秘的地点等待你的探索</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-museum-gold/20 flex items-center justify-center text-xs font-sans font-bold text-museum-gold shrink-0 mt-0.5">2</div>
                    <div>
                      <p className="font-sans text-sm text-white">收集隐藏线索</p>
                      <p className="font-body text-xs text-museum-gray">点击房间中的物品发现线索，解锁新的房间</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-museum-gold/20 flex items-center justify-center text-xs font-sans font-bold text-museum-gold shrink-0 mt-0.5">3</div>
                    <div>
                      <p className="font-sans text-sm text-white">解开机关谜题</p>
                      <p className="font-body text-xs text-museum-gray">根据线索解开谜题，获得失传设计图</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-museum-gold/20 flex items-center justify-center text-xs font-sans font-bold text-museum-gold shrink-0 mt-0.5">4</div>
                    <div>
                      <p className="font-sans text-sm text-white">揭开历史故事</p>
                      <p className="font-body text-xs text-museum-gray">每双鞋背后都藏着一段被遗忘的历史</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-amber-900/10 via-museum-burgundy/5 to-museum-gold/5 rounded-2xl border border-museum-gold/10 text-center">
              <p className="font-display text-lg text-museum-gold mb-2">"穿越千年足迹，追寻失落的鞋履传说"</p>
              <p className="font-body text-sm text-museum-gray">
                每一双高跟鞋都承载着一段历史。在尘封的遗迹中，在废弃的剧院里，在神秘的庄园深处，失传的设计图正在等待被发现。
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <RoomExplorer location={selectedLocation} />

            <div className="p-5 bg-museum-black/30 rounded-xl border border-museum-gold/10">
              <h4 className="font-sans text-xs text-museum-gold tracking-wider uppercase mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> 历史背景
              </h4>
              <p className="font-body text-sm text-museum-gray leading-relaxed">
                {selectedLocation.historicalStory}
              </p>
            </div>
          </div>
        )}
      </main>

      {activePuzzleId && activePuzzleRoom && selectedLocation && (
        <PuzzleModal
          puzzle={activePuzzleRoom.puzzle}
          room={activePuzzleRoom}
          locationColor={selectedLocation.color}
        />
      )}

      <RewardReveal />

      {showStory && currentStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={hideStoryModal} />
          <div className="relative w-full max-w-lg bg-museum-black border border-museum-gold/30 rounded-2xl overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b border-museum-gold/10">
              <h3 className="font-display text-xl text-museum-gold">历史故事</h3>
            </div>
            <div className="p-6">
              <p className="font-body text-museum-gray leading-relaxed">{currentStory}</p>
            </div>
            <div className="p-4 border-t border-museum-gold/10 flex justify-end">
              <button
                onClick={hideStoryModal}
                className="px-6 py-2 bg-museum-gold/20 text-museum-gold font-sans text-xs tracking-wider uppercase rounded-lg hover:bg-museum-gold/30 transition-all"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
