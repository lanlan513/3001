import { X, Coins, Star, Sparkles, MapPin } from 'lucide-react';
import { useCityMapStore } from '@/store/useCityMapStore';

const RewardModal = () => {
  const { showReward, rewardData, hideRewardModal } = useCityMapStore();

  if (!showReward || !rewardData) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-museum-ivory rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 bg-museum-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-museum-burgundy/10 rounded-full translate-x-1/2 translate-y-1/2" />
        </div>

        <button
          onClick={hideRewardModal}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-museum-gold/20 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-museum-gray-dark" />
        </button>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-museum-gold to-museum-gold-dark flex items-center justify-center animate-bounce-soft">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-display text-3xl font-bold text-museum-black mb-2">
              恭喜获得奖励！
            </h3>
            <p className="font-body text-museum-gray-dark">
              你的努力得到了回报
            </p>
          </div>

          <div className="space-y-4">
            {rewardData.coins && rewardData.coins > 0 && (
              <div className="flex items-center gap-4 p-4 bg-museum-gold/10 rounded-xl border border-museum-gold/30 animate-coin-spin">
                <div className="w-12 h-12 rounded-full bg-museum-gold/20 flex items-center justify-center">
                  <Coins className="w-6 h-6 text-museum-gold" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-museum-black">金币</p>
                  <p className="font-display text-2xl font-bold text-museum-gold">
                    +{rewardData.coins}
                  </p>
                </div>
              </div>
            )}

            {rewardData.region && (
              <div className="flex items-center gap-4 p-4 bg-museum-burgundy/10 rounded-xl border border-museum-burgundy/30 animate-slide-up">
                <div className="w-12 h-12 rounded-full bg-museum-burgundy/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-museum-burgundy" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-museum-black">解锁新区域</p>
                  <p className="font-display text-xl font-bold text-museum-burgundy">
                    {rewardData.region.name}
                  </p>
                  <p className="font-body text-sm text-museum-gray-dark">
                    {rewardData.region.description}
                  </p>
                </div>
              </div>
            )}

            {rewardData.shoes && rewardData.shoes.length > 0 && (
              <div>
                <h4 className="font-sans font-semibold text-museum-black mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4 text-museum-gold" />
                  解锁鞋款
                </h4>
                <div className="space-y-2">
                  {rewardData.shoes.map((shoe, index) => (
                    <div
                      key={shoe.id}
                      className="flex items-center gap-3 p-3 bg-white/50 rounded-xl border border-museum-gold/20 animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <img
                        src={shoe.imageUrl}
                        alt={shoe.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-sans font-semibold text-sm text-museum-black">{shoe.name}</p>
                          <span className={`text-xs font-sans ${getRarityColor(shoe.rarity)}`}>
                            {getRarityLabel(shoe.rarity)}
                          </span>
                        </div>
                        <p className="font-body text-xs text-museum-gray-dark">{shoe.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {rewardData.elements && rewardData.elements.length > 0 && (
              <div>
                <h4 className="font-sans font-semibold text-museum-black mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-museum-gold" />
                  解锁设计元素
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {rewardData.elements.map((elem, index) => (
                    <div
                      key={elem.id}
                      className="p-3 bg-white/50 rounded-xl border border-museum-gold/20 text-center animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <p className="font-sans font-semibold text-sm text-museum-black">{elem.name}</p>
                      <p className="font-body text-xs text-museum-gray-dark">{elem.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={hideRewardModal}
            className="w-full mt-8 btn-gold py-3 rounded-lg font-sans text-sm tracking-wider uppercase"
          >
            太棒了！
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardModal;
