import { useState } from 'react';
import { useArchaeologyStore } from '@/store/useArchaeologyStore';
import type { ArchaeologyPuzzle, ArchaeologyRoom } from '@/types';
import { X, Lightbulb, ChevronRight, Lock } from 'lucide-react';

interface PuzzleModalProps {
  puzzle: ArchaeologyPuzzle;
  room: ArchaeologyRoom;
  locationColor: string;
}

export default function PuzzleModal({ puzzle, room, locationColor }: PuzzleModalProps) {
  const { setActivePuzzle, solvePuzzle } = useArchaeologyStore();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isWrong, setIsWrong] = useState(false);

  const handleClose = () => {
    setActivePuzzle(null);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    if (selectedAnswer === puzzle.correctAnswer) {
      setIsCorrect(true);
      setTimeout(() => {
        const state = useArchaeologyStore.getState();
        const locationId = state.selectedLocationId;
        if (locationId) {
          solvePuzzle(locationId, room.id);
        }
        setActivePuzzle(null);
        setSelectedAnswer(null);
        setIsCorrect(null);
      }, 1500);
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 1000);
    }
  };

  const puzzleTypeLabels: Record<string, string> = {
    sequence: '排序谜题',
    riddle: '谜语解答',
    combination: '密码组合',
    pattern: '规律推演',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full max-w-lg bg-museum-black border border-museum-gold/30 rounded-2xl overflow-hidden animate-fade-in-up">
        <div className="relative p-6 border-b border-museum-gold/10" style={{ borderBottomColor: `${locationColor}30` }}>
          <div className="absolute inset-0 opacity-5" style={{ background: `linear-gradient(135deg, ${locationColor}, transparent)` }} />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-museum-gray hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-5 h-5" style={{ color: locationColor }} />
              <span className="font-sans text-xs tracking-wider uppercase" style={{ color: locationColor }}>
                {puzzleTypeLabels[puzzle.type] || puzzle.type}
              </span>
            </div>
            <h3 className="font-display text-2xl text-white">{puzzle.name}</h3>
            <p className="font-body text-museum-gray mt-2 text-sm">{puzzle.description}</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {isCorrect && (
            <div className="text-center py-4 animate-fade-in">
              <div className="text-5xl mb-2">🎉</div>
              <p className="font-display text-xl text-green-400">谜题已解开!</p>
              <p className="font-body text-sm text-museum-gray mt-2">{puzzle.storyFragment}</p>
            </div>
          )}

          {!isCorrect && (
            <>
              <div className="space-y-2">
                {puzzle.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedAnswer(option);
                      setIsWrong(false);
                    }}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                      isWrong && selectedAnswer === option
                        ? 'border-red-500/50 bg-red-500/10 animate-[shake_0.5s_ease-in-out]'
                        : selectedAnswer === option
                        ? 'border-museum-gold/50 bg-museum-gold/10'
                        : 'border-white/10 bg-white/5 hover:border-museum-gold/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-sans font-bold shrink-0 transition-all ${
                          selectedAnswer === option
                            ? 'bg-museum-gold text-museum-black'
                            : 'bg-white/10 text-museum-gray'
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className={`font-body text-sm ${
                        selectedAnswer === option ? 'text-white' : 'text-museum-gray-dark'
                      }`}>
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {puzzle.hints.length > 0 && (
                <div className="space-y-2">
                  {puzzle.hints.slice(0, showHint).map((hint, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-museum-gold/5 border border-museum-gold/10 animate-fade-in">
                      <Lightbulb className="w-4 h-4 text-museum-gold shrink-0 mt-0.5" />
                      <p className="font-body text-xs text-museum-gold/80">{hint}</p>
                    </div>
                  ))}
                  {showHint < puzzle.hints.length && (
                    <button
                      onClick={() => setShowHint((prev) => prev + 1)}
                      className="flex items-center gap-2 text-museum-gold/50 hover:text-museum-gold transition-colors font-sans text-xs tracking-wider"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>显示提示 ({showHint}/{puzzle.hints.length})</span>
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className={`w-full py-3 rounded-lg font-sans text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                  selectedAnswer
                    ? 'text-museum-black hover:opacity-90'
                    : 'bg-white/10 text-museum-gray cursor-not-allowed'
                }`}
                style={selectedAnswer ? { backgroundColor: locationColor } : {}}
              >
                <span>确认答案</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
