import { Link } from 'react-router-dom';
import { Coins, Lock, Map, Home, Trophy, Footprints } from 'lucide-react';
import { useCityMapStore } from '@/store/useCityMapStore';
import MapCharacter from '@/components/MapCharacter';
import BuildingModal from '@/components/BuildingModal';
import ChallengeModal from '@/components/ChallengeModal';
import RewardModal from '@/components/RewardModal';
import type { Building } from '@/types';

const CityMap = () => {
  const {
    coins,
    regions,
    challenges,
    selectedBuilding,
    selectedChallenge,
    moveToBuilding,
    currentPosition,
    completedChallenges,
    unlockedRegions,
    unlockedShoes,
    unlockedElements,
  } = useCityMapStore();

  const handleBuildingClick = (building: Building) => {
    if (currentPosition.moving) return;
    if (!building.unlocked) {
      const region = regions.find((r) =>
        r.buildings.some((b) => b.id === building.id)
      );
      if (region && !region.unlocked) {
        useCityMapStore.getState().setSelectedBuilding(building);
        return;
      }
    }
    moveToBuilding(building.id);
  };

  const getBuildingChallenge = (buildingId: string) => {
    return challenges.find((c) => c.buildingId === buildingId);
  };

  const getTotalProgress = () => {
    const totalBuildings = regions.reduce((acc, r) => acc + r.buildings.length, 0);
    const unlockedBuildings = regions
      .flatMap((r) => r.buildings)
      .filter((b) => b.unlocked).length;
    const totalChallenges = challenges.length;
    const completed = completedChallenges.length;
    return {
      regions: `${unlockedRegions.length}/${regions.length}`,
      buildings: `${unlockedBuildings}/${totalBuildings}`,
      challenges: `${completed}/${totalChallenges}`,
      shoes: unlockedShoes.length,
      elements: unlockedElements.length,
    };
  };

  const progress = getTotalProgress();

  return (
    <div className="min-h-screen bg-museum-ivory">
      <header className="relative py-8 px-4 bg-gradient-to-b from-museum-black/10 to-transparent">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-museum-gray-dark hover:text-museum-burgundy transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="font-sans text-sm tracking-wider">返回首页</span>
            </Link>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-museum-gold/20 px-4 py-2 rounded-full">
                <Coins className="w-5 h-5 text-museum-gold" />
                <span className="font-display text-xl font-bold text-museum-gold-dark">
                  {coins}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-museum-black mb-2">
              高跟鞋城市地图
            </h1>
            <p className="font-body text-museum-gray-dark text-lg">
              探索时尚都市，完成挑战，解锁限定鞋款与设计元素
            </p>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          <div className="bg-white/60 p-3 rounded-xl border border-museum-gold/20 text-center">
            <Map className="w-5 h-5 mx-auto mb-1 text-museum-gold" />
            <p className="font-sans text-xs text-museum-gray-dark mb-1">已解锁区域</p>
            <p className="font-display text-xl font-bold text-museum-black">{progress.regions}</p>
          </div>
          <div className="bg-white/60 p-3 rounded-xl border border-museum-gold/20 text-center">
            <Footprints className="w-5 h-5 mx-auto mb-1 text-museum-burgundy" />
            <p className="font-sans text-xs text-museum-gray-dark mb-1">已访问建筑</p>
            <p className="font-display text-xl font-bold text-museum-black">{progress.buildings}</p>
          </div>
          <div className="bg-white/60 p-3 rounded-xl border border-museum-gold/20 text-center">
            <Trophy className="w-5 h-5 mx-auto mb-1 text-museum-gold" />
            <p className="font-sans text-xs text-museum-gray-dark mb-1">完成挑战</p>
            <p className="font-display text-xl font-bold text-museum-black">{progress.challenges}</p>
          </div>
          <div className="bg-white/60 p-3 rounded-xl border border-museum-gold/20 text-center">
            <span className="text-xl block mb-1">👠</span>
            <p className="font-sans text-xs text-museum-gray-dark mb-1">收藏鞋款</p>
            <p className="font-display text-xl font-bold text-museum-black">{progress.shoes}</p>
          </div>
          <div className="bg-white/60 p-3 rounded-xl border border-museum-gold/20 text-center">
            <span className="text-xl block mb-1">✨</span>
            <p className="font-sans text-xs text-museum-gray-dark mb-1">设计元素</p>
            <p className="font-display text-xl font-bold text-museum-black">{progress.elements}</p>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-museum-ivory to-white rounded-3xl p-4 md:p-8 shadow-2xl border border-museum-gold/20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(212, 175, 138, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(212, 175, 138, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
              }}
            />
          </div>

          <div className="relative z-10" style={{ paddingBottom: '70%' }}>
            <div className="absolute inset-0">
              {regions.map((region) => (
                <div
                  key={region.id}
                  className={`absolute rounded-2xl transition-all duration-500 ${
                    region.unlocked
                      ? 'opacity-100'
                      : 'opacity-40 grayscale'
                  }`}
                  style={{
                    left: `${region.position.x}%`,
                    top: `${region.position.y}%`,
                    width: `${region.position.width}%`,
                    height: `${region.position.height}%`,
                    backgroundColor: region.unlocked ? `${region.color}15` : '#C9C4BB15',
                    border: `2px dashed ${region.unlocked ? region.color : '#C9C4BB'}`,
                  }}
                >
                  <div
                    className="absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-sans font-semibold tracking-wider"
                    style={{
                      backgroundColor: region.unlocked ? region.color : '#C9C4BB',
                      color: 'white',
                    }}
                  >
                    {region.name}
                    {!region.unlocked && (
                      <Lock className="w-3 h-3 inline ml-1" />
                    )}
                  </div>

                  {region.buildings.map((building) => {
                    const challenge = getBuildingChallenge(building.id);
                    const isCompleted = challenge?.completed;
                    const isSelected = currentPosition.targetBuildingId === building.id;

                    return (
                      <button
                        key={building.id}
                        onClick={() => handleBuildingClick(building)}
                        disabled={currentPosition.moving}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group ${
                          building.unlocked
                            ? 'hover:scale-110 cursor-pointer'
                            : 'cursor-not-allowed'
                        } ${
                          isSelected ? 'scale-110 z-20' : ''
                        }`}
                        style={{
                          left: `${building.x}%`,
                          top: `${building.y}%`,
                        }}
                      >
                        <div className="relative">
                          {isCompleted && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold z-10">
                              ✓
                            </div>
                          )}
                          {!building.unlocked && (
                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center z-10">
                              <Lock className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div
                            className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl shadow-lg transition-all ${
                              isSelected
                                ? 'bg-museum-gold animate-glow ring-4 ring-museum-gold/30'
                                : building.type === 'boutique'
                                ? 'bg-gradient-to-br from-pink-100 to-pink-200'
                                : building.type === 'studio'
                                ? 'bg-gradient-to-br from-purple-100 to-purple-200'
                                : building.type === 'runway'
                                ? 'bg-gradient-to-br from-red-100 to-red-200'
                                : 'bg-gradient-to-br from-amber-100 to-amber-200'
                            } ${
                              building.unlocked && !isSelected
                                ? 'group-hover:ring-4 group-hover:ring-museum-gold/30'
                                : ''
                            }`}
                          >
                            {building.icon}
                          </div>
                          <div
                            className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-sans font-medium transition-opacity ${
                              isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                            } ${
                              building.unlocked
                                ? 'text-museum-black'
                                : 'text-museum-gray-dark'
                            }`}
                          >
                            {building.name}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}

              <MapCharacter />

              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {regions.flatMap((region) =>
                  region.buildings.map((building) => {
                    if (!building.unlocked) return null;
                    const otherBuildings = region.buildings.filter(
                      (b) => b.id !== building.id && b.unlocked
                    );
                    return otherBuildings.map((other) => {
                      const key = `${building.id}-${other.id}`;
                      const reverseKey = `${other.id}-${building.id}`;
                      if (key > reverseKey) return null;
                      return (
                        <line
                          key={key}
                          x1={`${building.x}%`}
                          y1={`${building.y}%`}
                          x2={`${other.x}%`}
                          y2={`${other.y}%`}
                          stroke={region.color}
                          strokeWidth="2"
                          strokeDasharray="6,6"
                          opacity="0.3"
                        />
                      );
                    });
                  })
                )}
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="font-body text-museum-gray-dark">
            💡 点击地图上的建筑图标，前往探索并完成挑战
          </p>
        </div>
      </main>

      {selectedBuilding && (
        <BuildingModal
          building={selectedBuilding}
          challenge={getBuildingChallenge(selectedBuilding.id)}
        />
      )}

      {selectedChallenge && (
        <ChallengeModal challenge={selectedChallenge} />
      )}

      <RewardModal />
    </div>
  );
};

export default CityMap;
