import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { FashionNews } from '@/types';
import { newsCategoryConfig } from '@/data/magazineConstants';

export default function NewsCard({ news }: { news: FashionNews }) {
  const catConfig = newsCategoryConfig[news.category];

  const impactIcon = {
    positive: <TrendingUp className="w-3 h-3 text-green-400" />,
    negative: <TrendingDown className="w-3 h-3 text-red-400" />,
    neutral: <Minus className="w-3 h-3 text-museum-gray" />,
  }[news.impact || 'neutral'];

  const impactLabel = {
    positive: '利好',
    negative: '利空',
    neutral: '中性',
  }[news.impact || 'neutral'];

  return (
    <div className="gold-border p-5 hover:bg-museum-gold/5 transition-all group">
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className={`flex items-center gap-1.5 font-sans text-xs tracking-wider uppercase ${catConfig.color}`}>
          <span>{catConfig.icon}</span>
          <span>{catConfig.label}</span>
        </span>
        {news.relatedStyle && (
          <span className="font-sans text-xs px-2 py-0.5 border border-museum-gold/30 text-museum-gold">
            {news.relatedStyle}
          </span>
        )}
        <span className="flex items-center gap-1 font-sans text-xs ml-auto">
          {impactIcon}
          <span className={news.impact === 'positive' ? 'text-green-400' : news.impact === 'negative' ? 'text-red-400' : 'text-museum-gray'}>
            {impactLabel}
          </span>
        </span>
      </div>

      <h4 className="font-display text-lg text-museum-ivory mb-2 group-hover:text-museum-gold transition-colors">
        {news.title}
      </h4>

      <p className="font-body text-sm text-museum-gray leading-relaxed mb-3">
        {news.summary}
      </p>

      <div className="flex items-center gap-1.5 font-sans text-xs text-museum-gray/60">
        <Clock className="w-3 h-3" />
        <span>第 {news.day} 天</span>
      </div>
    </div>
  );
}
