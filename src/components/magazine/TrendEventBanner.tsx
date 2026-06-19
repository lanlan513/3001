import { Zap, Clock } from 'lucide-react';
import type { TrendEvent } from '@/types';
import { styles } from '@/data/kingdomConstants';

export default function TrendEventBanner({ event }: { event: TrendEvent }) {
  const intensityStyles = {
    minor: 'border-blue-500/40 bg-blue-500/5',
    moderate: 'border-orange-500/40 bg-orange-500/5',
    major: 'border-red-500/40 bg-red-500/5',
  };

  const intensityLabels = {
    minor: '小波动',
    moderate: '中等影响',
    major: '重大事件',
  };

  const intensityBadgeColors = {
    minor: 'bg-blue-500/20 text-blue-400',
    moderate: 'bg-orange-500/20 text-orange-400',
    major: 'bg-red-500/20 text-red-400 animate-pulse',
  };

  const affectedStyleNames = event.affectedStyles
    .map((s) => styles.find((st) => st.id === s))
    .filter(Boolean);

  return (
    <div className={`border-l-4 p-5 ${intensityStyles[event.intensity]} transition-all`}>
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0">{event.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h4 className="font-display text-xl text-museum-ivory">{event.name}</h4>
            <span className={`font-sans text-xs px-2 py-0.5 rounded ${intensityBadgeColors[event.intensity]}`}>
              {intensityLabels[event.intensity]}
            </span>
          </div>

          <p className="font-body text-sm text-museum-gray leading-relaxed mb-3">
            {event.description}
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-museum-gold" />
              <span className="font-sans text-xs text-museum-gray">需求倍率：</span>
              <span className="font-display text-lg text-museum-gold">x{event.demandMultiplier}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-museum-gray" />
              <span className="font-sans text-xs text-museum-gray">
                剩余 {event.remainingDays}/{event.duration} 天
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-sans text-xs text-museum-gray">影响风格：</span>
              {affectedStyleNames.map((s) => (
                <span
                  key={s!.id}
                  className="font-sans text-xs px-2 py-0.5 border border-museum-gold/30 text-museum-gold"
                >
                  {s!.icon} {s!.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
