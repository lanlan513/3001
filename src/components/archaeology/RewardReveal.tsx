import { useArchaeologyStore } from '@/store/useArchaeologyStore';
import { X, Sparkles, BookOpen } from 'lucide-react';

export default function RewardReveal() {
  const { showReward, currentReward, hideRewardModal, showStoryModal } = useArchaeologyStore();

  if (!showReward || !currentReward) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={hideRewardModal} />

      <div className="relative w-full max-w-md bg-museum-black border border-museum-gold/40 rounded-2xl overflow-hidden animate-fade-in-up">
        <div className="relative h-48 bg-gradient-to-b from-museum-gold/20 to-transparent flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-museum-gold/10 flex items-center justify-center animate-pulse">
              <div className="w-24 h-24 rounded-full bg-museum-gold/20 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-museum-gold" />
              </div>
            </div>
          </div>
          <button
            onClick={hideRewardModal}
            className="absolute top-4 right-4 text-museum-gray hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 -mt-8 relative">
          <div className="text-center mb-6">
            <p className="font-sans text-xs text-museum-gold tracking-[0.3em] uppercase mb-2">设计图已解锁</p>
            <h3 className="font-display text-2xl text-white mb-1">{currentReward.designName}</h3>
            <p className="font-sans text-xs text-museum-gold/60 tracking-wider">{currentReward.designEra}</p>
          </div>

          <div className="rounded-xl overflow-hidden border border-museum-gold/20 mb-4">
            <img
              src={currentReward.designImageUrl}
              alt={currentReward.designName}
              className="w-full h-48 object-cover"
            />
          </div>

          <p className="font-body text-sm text-museum-gray leading-relaxed mb-4">
            {currentReward.designDescription}
          </p>

          <div className="p-3 rounded-lg bg-museum-gold/5 border border-museum-gold/10 mb-4">
            <p className="font-body text-xs text-museum-gold/80 leading-relaxed">
              {currentReward.storyFragment}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                hideRewardModal();
                showStoryModal(currentReward.storyFragment);
              }}
              className="flex-1 py-3 border border-museum-gold/30 text-museum-gold font-sans text-xs tracking-wider uppercase rounded-lg hover:bg-museum-gold/10 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>阅读完整故事</span>
            </button>
            <button
              onClick={hideRewardModal}
              className="flex-1 py-3 bg-museum-gold text-museum-black font-sans text-xs tracking-wider uppercase rounded-lg hover:bg-museum-gold-light transition-all"
            >
              继续探索
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
