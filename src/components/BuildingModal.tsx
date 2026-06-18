import { X, Lock, Coins, Star, Sparkles } from 'lucide-react';
import { useCityMapStore } from '@/store/useCityMapStore';
import type { Building, Challenge } from '@/types';

interface BuildingModalProps {
  building: Building;
  challenge?: Challenge;
}

const BuildingModal = ({ building, challenge }: BuildingModalProps) => {
  const { setSelectedBuilding, setSelectedChallenge, coins, unlockRegion, regions } = useCityMapStore();

  const getBuildingTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      boutique: '精品店',
      studio: '设计工作室',
      runway: '时尚秀场',
      museum: '博物馆',
    };
    return labels[type] || type;
  };

  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      common: 'text-museum-gray-dark',
      rare: 'text-blue-500',
      legendary: 'text-museum-gold',
    };
    return colors[rarity] || 'text-museum-gray-dark';
  };

  const getRarityLabel = (rarity: string) => {
    const labels: Record<string, string> = {
      common: '普通',
      rare: '稀有',
      legendary: '传说',
    };
    return labels[rarity] || rarity;
  };

  const handleUnlockRegion = (regionId: string) => {
    const success = unlockRegion(regionId);
    if (success) {
      const region = regions.find(r => r.id === regionId);
      useCityMapStore.getState().showRewardModal({
        region: region || undefined,
      });
    }
  };

  if (!building.unlocked) {
    const region = regions.find(r =>
      r.buildings.some(b => b.id === building.id)
    );
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="bg-museum-ivory rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-slide-up">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-display text-2xl font-bold text-museum-black">{building.name}</h3>
            <button
              onClick={() => setSelectedBuilding(null)}
              className="p-2 hover:bg-museum-gold/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-museum-gray-dark" />
            </button>
          </div>

          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-museum-gray/20 flex items-center justify-center">
              <Lock className="w-10 h-10 text-museum-gray-dark" />
            </div>
            <h4 className="font-display text-xl text-museum-black mb-2">区域未解锁</h4>
            <p className="font-body text-museum-gray-dark mb-4">{building.description}</p>
            {region && !region.unlocked && (
              <>
                <div className="flex items-center justify-center gap-2 mb-4 text-museum-gold">
                <Coins className="w-5 h-5" />
                <span className="font-sans text-lg">{region.unlockCost} 金币解锁</span>
              </div>
              <button
                onClick={() => handleUnlockRegion(region.id)}
                disabled={coins < region.unlockCost}
                className={
                  coins >= region.unlockCost
                    ? 'w-full btn-gold py-3 rounded-lg font-sans text-sm tracking-wider uppercase transition-all'
                    : 'w-full bg-museum-gray/30 text-museum-gray-dark cursor-not-allowed py-3 rounded-lg font-sans text-sm tracking-wider uppercase transition-all'
                }
              >
                {coins >= region.unlockCost ? '解锁区域' : '需要更多金币'}
              </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  const progressWidth = challenge
    ? (challenge.requirements.current / challenge.requirements.target) * 100 + '%'
    : '0%';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-museum-ivory rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-block px-3 py-1 bg-museum-gold/20 text-museum-gold-dark text-xs font-sans tracking-wider uppercase rounded-full mb-2">
              {getBuildingTypeLabel(building.type)}
            </span>
            <h3 className="font-display text-2xl font-bold text-museum-black">{building.name}</h3>
          </div>
          <button
            onClick={() => setSelectedBuilding(null)}
            className="p-2 hover:bg-museum-gold/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-museum-gray-dark" />
          </button>
        </div>

        <p className="font-body text-museum-gray-dark mb-6">{building.description}</p>

        {challenge && (
          <div className="mb-6 p-4 bg-museum-gold/10 rounded-xl border border-museum-gold/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-museum-gold" />
              <h4 className="font-display text-lg font-bold text-museum-black">当前挑战</h4>
            </div>
            <h5 className="font-sans font-semibold text-museum-burgundy mb-1">{challenge.title}</h5>
            <p className="font-body text-sm text-museum-gray-dark mb-3">{challenge.description}</p>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1 text-museum-gold">
                <Coins className="w-4 h-4" />
                <span className="font-sans text-sm">+{challenge.rewardCoins}</span>
              </div>
              {challenge.unlocksRegion && (
                <div className="flex items-center gap-1 text-museum-burgundy">
                  <Star className="w-4 h-4" />
                  <span className="font-sans text-sm">解锁新区域</span>
                </div>
              )}
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-xs font-sans text-museum-gray-dark mb-1">
                <span>进度</span>
                <span>{challenge.requirements.current}/{challenge.requirements.target}</span>
              </div>
              <div className="h-2 bg-museum-gray/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-museum-gold to-museum-gold-dark transition-all duration-500"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>
            {!challenge.completed ? (
              <button
                onClick={() => {
                  setSelectedBuilding(null);
                  setSelectedChallenge(challenge);
                }}
                className="w-full btn-gold py-2 rounded-lg font-sans text-sm tracking-wider uppercase"
              >
                开始挑战
              </button>
            ) : (
              <div className="text-center py-2 text-museum-gold font-sans text-sm">
                ✓ 挑战已完成
              </div>
            )}
          </div>
        )}

        {building.exclusiveShoes.length > 0 && (
          <div className="mb-6">
            <h4 className="font-display text-lg font-bold text-museum-black mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-museum-gold" />
              独有鞋款
            </h4>
            <div className="space-y-3">
              {building.exclusiveShoes.map((shoe) => (
                <div
                  key={shoe.id}
                  className="flex gap-3 p-3 bg-white/50 rounded-xl border border-museum-gold/20"
                >
                  <img
                    src={shoe.imageUrl}
                    alt={shoe.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-sans font-semibold text-museum-black">{shoe.name}</h5>
                      <span className={'text-xs font-sans ' + getRarityColor(shoe.rarity)}>
                        {getRarityLabel(shoe.rarity)}
                      </span>
                    </div>
                    <p className="font-body text-xs text-museum-gray-dark">{shoe.description}</p>
                    <p className="font-sans text-xs text-museum-gold">跟高: {shoe.heelHeight}cm</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {building.designElements.length > 0 && (
          <div>
            <h4 className="font-display text-lg font-bold text-museum-black mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-museum-gold" />
              限定设计元素
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {building.designElements.map((elem) => (
                <div
                  key={elem.id}
                  className="p-3 bg-white/50 rounded-xl border border-museum-gold/20 text-center"
                >
                  <p className="font-sans font-semibold text-sm text-museum-black">{elem.name}</p>
                  <p className="font-body text-xs text-museum-gray-dark">{elem.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildingModal;
