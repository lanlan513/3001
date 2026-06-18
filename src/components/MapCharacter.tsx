import { useCityMapStore } from '@/store/useCityMapStore';

const MapCharacter = () => {
  const { currentPosition } = useCityMapStore();

  return (
    <div
      className={`absolute z-30 transition-all duration-[1500ms] ease-in-out ${
        currentPosition.moving ? 'animate-character-move' : 'animate-bounce-soft'
      }`}
      style={{
        left: `${currentPosition.x}%`,
        top: `${currentPosition.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-museum-gold/30 animate-pulse-ring" />
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-museum-gold to-museum-gold-dark flex items-center justify-center text-xl md:text-2xl shadow-lg border-2 border-white">
          👠
        </div>
      </div>
    </div>
  );
};

export default MapCharacter;
