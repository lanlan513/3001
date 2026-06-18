import {
  History,
  DollarSign,
  TrendingUp,
  Mic2,
  Minus,
  Sparkles,
} from 'lucide-react';

type HistoryItem = {
  day: number;
  event: string;
  type: 'sale' | 'trend' | 'show' | 'warning' | 'success';
};

export default function HistoryTab({ history }: { history: HistoryItem[] }) {
  const typeColors = {
    sale: 'border-green-500/50 bg-green-500/5',
    trend: 'border-blue-500/50 bg-blue-500/5',
    show: 'border-museum-gold/50 bg-museum-gold/5',
    warning: 'border-red-500/50 bg-red-500/5',
    success: 'border-green-400/50 bg-green-400/5',
  };

  const typeIcons = {
    sale: <DollarSign className="w-4 h-4 text-green-400" />,
    trend: <TrendingUp className="w-4 h-4 text-blue-400" />,
    show: <Mic2 className="w-4 h-4 text-museum-gold" />,
    warning: <Minus className="w-4 h-4 text-red-400" />,
    success: <Sparkles className="w-4 h-4 text-green-400" />,
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-16">
        <History className="w-16 h-16 text-museum-gray/30 mx-auto mb-4" />
        <p className="font-display text-2xl text-museum-gray mb-2">暂无动态</p>
        <p className="font-body text-museum-gray/60">开始经营你的高跟鞋王国吧！</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl text-museum-gold mb-6">公司动态</h2>
      <div className="space-y-3">
        {history.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 border-l-4 flex items-start gap-4 ${
              typeColors[item.type as keyof typeof typeColors]
            }`}
          >
            <div className="mt-1">{typeIcons[item.type as keyof typeof typeIcons]}</div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-museum-ivory">{item.event}</p>
              <p className="font-sans text-xs text-museum-gray mt-1">第 {item.day} 天</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
