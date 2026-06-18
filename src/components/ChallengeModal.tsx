import { useState } from 'react';
import { X, Coins, Star, Check, ChevronRight, Sparkles } from 'lucide-react';
import { useCityMapStore } from '@/store/useCityMapStore';
import type { Challenge } from '@/types';

interface ChallengeModalProps {
  challenge: Challenge;
}

const quizQuestions: Record<string, { question: string; options: string[]; correct: number }[]> = {
  'ch-dt-1': [
    {
      question: '一位职业女性要参加重要商务会议，哪双鞋最合适？',
      options: ['15cm防水台恨天高', '8cm黑色尖头细跟', '彩色水台凉鞋', '运动鞋'],
      correct: 1,
    },
    {
      question: '一位年轻女孩要去约会，推荐哪双鞋？',
      options: ['平底鞋', '粗跟玛丽珍鞋', '10cm裸色尖头', '雨靴'],
      correct: 2,
    },
    {
      question: '一位女士要去参加晚宴，哪双鞋最配礼服？',
      options: ['黑色细高跟', '运动鞋', '凉鞋', '靴子'],
      correct: 0,
    },
  ],
  'ch-hz-2': [
    {
      question: '高跟鞋最早起源于哪个国家？',
      options: ['法国', '意大利', '波斯', '中国'],
      correct: 2,
    },
    {
      question: '哪位设计师被称为"高跟鞋之王"？',
      options: ['Christian Louboutin', 'Manolo Blahnik', 'Jimmy Choo', 'Stuart Weitzman'],
      correct: 1,
    },
    {
      question: '红底鞋是哪个品牌的标志性设计？',
      options: ['Gucci', 'Christian Louboutin', 'Prada', 'Chanel'],
      correct: 1,
    },
    {
      question: '1920年代流行的鞋款特点是？',
      options: ['厚底防水台', '玛丽珍鞋', '细高跟', '尖头鞋'],
      correct: 1,
    },
    {
      question: '世界上最贵的高跟鞋售价约为？',
      options: ['100万美元', '50万美元', '1500万美元', '200万美元'],
      correct: 2,
    },
    {
      question: '玛丽珍鞋的命名来源于？',
      options: ['一位设计师', '一个漫画角色', '一位公主', '一个品牌'],
      correct: 1,
    },
    {
      question: '防水台高跟鞋在哪个年代开始流行？',
      options: ['1930s', '1970s', '1990s', '2000s'],
      correct: 1,
    },
    {
      question: 'Stiletto（细高跟）这个词来源于？',
      options: ['意大利语', '法语', '西班牙语', '德语'],
      correct: 0,
    },
    {
      question: '猫跟鞋的跟高通常是？',
      options: ['1-2cm', '3-5cm', '6-8cm', '10cm以上'],
      correct: 1,
    },
    {
      question: '以下哪种鞋型是最经典的款式？',
      options: ['防水台', '尖头细跟', '松糕鞋', '老爹鞋'],
      correct: 1,
    },
  ],
};

const ChallengeModal = ({ challenge }: ChallengeModalProps) => {
  const { setSelectedChallenge, completeChallenge, updateChallengeProgress } = useCityMapStore();
  const [step, setStep] = useState<'intro' | 'active' | 'complete'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const questions = quizQuestions[challenge.id] || [];

  const handleStart = () => {
    if (challenge.type === 'design') {
      completeChallenge(challenge.id);
      setSelectedChallenge(null);
      return;
    }
    if (challenge.type === 'collection') {
      completeChallenge(challenge.id);
      setSelectedChallenge(null);
      return;
    }
    setStep('active');
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setAnswers([...answers, answerIndex]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        updateChallengeProgress(challenge.id, currentQuestion + 1);
      } else {
        const correctCount = [...answers, answerIndex].filter(
          (a, i) => a === questions[i].correct
        ).length;
        if (correctCount >= Math.ceil(questions.length * 0.6)) {
          updateChallengeProgress(challenge.id, questions.length);
          setStep('complete');
        } else {
          setCurrentQuestion(0);
          setAnswers([]);
          setSelectedAnswer(null);
          setShowResult(false);
          updateChallengeProgress(challenge.id, 0);
        }
      }
    }, 1500);
  };

  const handleComplete = () => {
    completeChallenge(challenge.id);
    setSelectedChallenge(null);
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      design: '设计挑战',
      quiz: '知识问答',
      collection: '系列设计',
    };
    return labels[type] || type;
  };

  const renderDesignChallenge = () => (
    <div className="text-center py-8">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-museum-gold/20 flex items-center justify-center animate-float">
        <span className="text-5xl">👠</span>
      </div>
      <h4 className="font-display text-2xl text-museum-black mb-4">{challenge.title}</h4>
      <p className="font-body text-museum-gray-dark mb-6">{challenge.description}</p>
      <div className="p-4 bg-museum-burgundy/10 rounded-xl mb-6">
        <p className="font-sans text-sm text-museum-burgundy">
          🎨 前往设计师工作室完成你的设计，回来后点击下方按钮完成挑战
        </p>
      </div>
      <button
        onClick={handleComplete}
        className="w-full btn-gold py-3 rounded-lg font-sans text-sm tracking-wider uppercase"
      >
        完成挑战
      </button>
    </div>
  );

  const renderCollectionChallenge = () => (
    <div className="text-center py-8">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-museum-burgundy/20 flex items-center justify-center animate-float">
        <span className="text-5xl">✨</span>
      </div>
      <h4 className="font-display text-2xl text-museum-black mb-4">{challenge.title}</h4>
      <p className="font-body text-museum-gray-dark mb-6">{challenge.description}</p>
      <div className="p-4 bg-museum-gold/10 rounded-xl mb-6">
        <p className="font-sans text-sm text-museum-gold-dark">
          👗 在设计工作室完成{challenge.requirements.target}双相关主题设计
        </p>
      </div>
      <button
        onClick={handleComplete}
        className="w-full btn-gold py-3 rounded-lg font-sans text-sm tracking-wider uppercase"
      >
        完成挑战
      </button>
    </div>
  );

  const renderQuiz = () => {
    const q = questions[currentQuestion];
    if (!q) return null;

    return (
      <div className="py-4">
        <div className="flex items-center justify-between mb-4">
          <span className="font-sans text-sm text-museum-gray-dark">
            问题 {currentQuestion + 1} / {questions.length}
          </span>
          <div className="flex gap-1">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i < currentQuestion
                    ? 'bg-museum-gold'
                    : i === currentQuestion
                    ? 'bg-museum-burgundy'
                    : 'bg-museum-gray/30'
                }`}
              />
            ))}
          </div>
        </div>

        <h4 className="font-display text-xl text-museum-black mb-6">{q.question}</h4>

        <div className="space-y-3">
          {q.options.map((option, index) => {
            let optionClass = 'bg-white/50 border-museum-gold/30 hover:border-museum-gold hover:bg-museum-gold/5';
            
            if (showResult) {
              if (index === q.correct) {
                optionClass = 'bg-green-50 border-green-500 text-green-700';
              } else if (index === selectedAnswer && index !== q.correct) {
                optionClass = 'bg-red-50 border-red-500 text-red-700';
              } else {
                optionClass = 'bg-white/30 border-museum-gray/20 opacity-50';
              }
            } else if (selectedAnswer === index) {
              optionClass = 'bg-museum-gold/20 border-museum-gold';
            }

            return (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl border text-left font-body transition-all ${optionClass} ${
                  showResult ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && index === q.correct && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-museum-ivory rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl animate-slide-up">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-block px-3 py-1 bg-museum-burgundy/20 text-museum-burgundy text-xs font-sans tracking-wider uppercase rounded-full mb-2">
              {getTypeLabel(challenge.type)}
            </span>
            <h3 className="font-display text-2xl font-bold text-museum-black">{challenge.title}</h3>
          </div>
          <button
            onClick={() => setSelectedChallenge(null)}
            className="p-2 hover:bg-museum-gold/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-museum-gray-dark" />
          </button>
        </div>

        {step === 'intro' && (
          <>
            <p className="font-body text-museum-gray-dark mb-6">{challenge.description}</p>
            <div className="flex items-center gap-4 mb-6 p-4 bg-museum-gold/10 rounded-xl">
              <div className="flex items-center gap-2 text-museum-gold">
                <Coins className="w-5 h-5" />
                <span className="font-sans font-semibold">+{challenge.rewardCoins}</span>
              </div>
              {challenge.unlocksRegion && (
                <div className="flex items-center gap-2 text-museum-burgundy">
                  <Star className="w-5 h-5" />
                  <span className="font-sans text-sm">解锁新区域</span>
                </div>
              )}
            </div>

            {challenge.type === 'design' ? (
              renderDesignChallenge()
            ) : challenge.type === 'collection' ? (
              renderCollectionChallenge()
            ) : (
              <button
                onClick={handleStart}
                className="w-full btn-gold py-3 rounded-lg font-sans text-sm tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                开始挑战
              </button>
            )}
          </>
        )}

        {step === 'active' && challenge.type === 'quiz' && renderQuiz()}

        {step === 'complete' && (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-museum-gold/20 flex items-center justify-center">
              <Check className="w-10 h-10 text-museum-gold" />
            </div>
            <h4 className="font-display text-2xl text-museum-black mb-2">挑战完成！</h4>
            <p className="font-body text-museum-gray-dark mb-6">恭喜你成功完成了挑战</p>
            <button
              onClick={handleComplete}
              className="w-full btn-gold py-3 rounded-lg font-sans text-sm tracking-wider uppercase flex items-center justify-center gap-2"
            >
              领取奖励
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeModal;
