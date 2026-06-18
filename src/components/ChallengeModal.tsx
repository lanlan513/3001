import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Coins, Star, Check, ChevronRight, Sparkles, AlertCircle } from 'lucide-react';
import { useCityMapStore } from '@/store/useCityMapStore';
import { useDesignStore } from '@/store/useDesignStore';
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
  const { works } = useDesignStore();
  const [step, setStep] = useState<'intro' | 'active' | 'complete'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [designCount, setDesignCount] = useState(works.length);

  const questions = quizQuestions[challenge.id] || [];

  useEffect(() => {
    setDesignCount(works.length);
  }, [works.length]);

  const getRequiredCount = () => challenge.requirements.target;

  const isDesignComplete = designCount >= getRequiredCount();

  const handleStart = () => {
    if (challenge.type === 'quiz') {
      setStep('active');
    }
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
    if (challenge.type === 'design' || challenge.type === 'collection') {
      if (!isDesignComplete) {
        return;
      }
    }
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
      <p className="font-body text-museum-gray-dark mb-4">{challenge.description}</p>

      <div className="p-4 bg-museum-burgundy/10 rounded-xl mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="font-sans text-lg font-bold text-museum-burgundy">
            {designCount} / {getRequiredCount()}
          </span>
          <span className="font-body text-sm text-museum-gray-dark">双设计已完成</span>
        </div>
        <div className="h-3 bg-white rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-museum-burgundy to-museum-burgundy-light transition-all duration-500"
            style={{
              width: Math.min((designCount / getRequiredCount()) * 100, 100) + '%',
            }}
          />
        </div>
      </div>

      {isDesignComplete ? (
        <div className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-xl mb-4 text-green-700">
          <Check className="w-5 h-5" />
          <span className="font-sans text-sm font-semibold">设计数量已达标，可领取奖励</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 p-3 bg-amber-50 rounded-xl mb-4 text-amber-700">
          <AlertCircle className="w-5 h-5" />
          <span className="font-sans text-sm">
            还需完成 {getRequiredCount() - designCount} 双设计
          </span>
        </div>
      )}

      <div className="flex gap-3 mb-4">
        <Link
          to="/studio"
          onClick={() => setSelectedChallenge(null)}
          className="flex-1 px-4 py-3 border border-museum-burgundy/50 text-museum-burgundy-light font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-museum-burgundy/20 inline-flex items-center justify-center gap-2 rounded-lg"
        >
          <Sparkles className="w-4 h-4" />
          前往设计室
        </Link>
        <button
          onClick={handleComplete}
          disabled={!isDesignComplete}
          className={
            isDesignComplete
              ? 'flex-1 btn-gold py-3 rounded-lg font-sans text-sm tracking-wider uppercase'
              : 'flex-1 bg-museum-gray/30 text-museum-gray-dark cursor-not-allowed py-3 rounded-lg font-sans text-sm tracking-wider uppercase'
          }
        >
          {isDesignComplete ? '完成挑战' : '尚未达标'}
        </button>
      </div>
    </div>
  );

  const renderCollectionChallenge = () => (
    <div className="text-center py-8">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-museum-burgundy/20 flex items-center justify-center animate-float">
        <span className="text-5xl">✨</span>
      </div>
      <h4 className="font-display text-2xl text-museum-black mb-4">{challenge.title}</h4>
      <p className="font-body text-museum-gray-dark mb-4">{challenge.description}</p>

      <div className="p-4 bg-museum-gold/10 rounded-xl mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="font-sans text-lg font-bold text-museum-gold-dark">
            {designCount} / {getRequiredCount()}
          </span>
          <span className="font-body text-sm text-museum-gray-dark">双系列设计已完成</span>
        </div>
        <div className="h-3 bg-white rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-museum-gold to-museum-gold-dark transition-all duration-500"
            style={{
              width: Math.min((designCount / getRequiredCount()) * 100, 100) + '%',
            }}
          />
        </div>
      </div>

      {isDesignComplete ? (
        <div className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-xl mb-4 text-green-700">
          <Check className="w-5 h-5" />
          <span className="font-sans text-sm font-semibold">系列设计已达标，可领取奖励</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 p-3 bg-amber-50 rounded-xl mb-4 text-amber-700">
          <AlertCircle className="w-5 h-5" />
          <span className="font-sans text-sm">
            还需完成 {getRequiredCount() - designCount} 双设计
          </span>
        </div>
      )}

      <div className="flex gap-3">
        <Link
          to="/studio"
          onClick={() => setSelectedChallenge(null)}
          className="flex-1 px-4 py-3 border border-museum-gold bg-museum-gold/10 text-museum-gold-dark font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-museum-gold/20 inline-flex items-center justify-center gap-2 rounded-lg"
        >
          <Sparkles className="w-4 h-4" />
          前往设计室
        </Link>
        <button
          onClick={handleComplete}
          disabled={!isDesignComplete}
          className={
            isDesignComplete
              ? 'flex-1 btn-gold py-3 rounded-lg font-sans text-sm tracking-wider uppercase'
              : 'flex-1 bg-museum-gray/30 text-museum-gray-dark cursor-not-allowed py-3 rounded-lg font-sans text-sm tracking-wider uppercase'
          }
        >
          {isDesignComplete ? '完成挑战' : '尚未达标'}
        </button>
      </div>
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

        <h4 className="font-display text-xl text-museum-black mb-6 font-semibold">{q.question}</h4>

        <div className="space-y-3">
          {q.options.map((option, index) => {
            let bgClass = 'bg-white';
            let borderClass = 'border-museum-gold/40';
            let textClass = 'text-museum-black';

            if (showResult) {
              if (index === q.correct) {
                bgClass = 'bg-green-100';
                borderClass = 'border-green-500';
                textClass = 'text-green-800';
              } else if (index === selectedAnswer && index !== q.correct) {
                bgClass = 'bg-red-100';
                borderClass = 'border-red-500';
                textClass = 'text-red-800';
              } else {
                bgClass = 'bg-gray-100';
                borderClass = 'border-gray-300';
                textClass = 'text-gray-500';
              }
            } else if (selectedAnswer === index) {
              bgClass = 'bg-museum-gold/20';
              borderClass = 'border-museum-gold';
              textClass = 'text-museum-black';
            }

            return (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={
                  'w-full p-4 rounded-xl border-2 text-left font-body text-base font-medium transition-all ' +
                  bgClass +
                  ' ' +
                  borderClass +
                  ' ' +
                  textClass +
                  ' ' +
                  (showResult
                    ? 'cursor-default '
                    : 'cursor-pointer hover:shadow-md ' +
                      (selectedAnswer !== index ? 'hover:border-museum-gold hover:bg-museum-gold/10 ' : ''))
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        'w-7 h-7 rounded-full flex items-center justify-center text-sm font-sans font-bold flex-shrink-0 ' +
                        (showResult && index === q.correct
                          ? 'bg-green-500 text-white'
                          : showResult && index === selectedAnswer && index !== q.correct
                          ? 'bg-red-500 text-white'
                          : selectedAnswer === index
                          ? 'bg-museum-gold text-white'
                          : 'bg-museum-gray/20 text-museum-gray-dark')
                      }
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {showResult && index === q.correct && (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
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
