import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface EmptyProps {
  title?: string;
  description?: string;
  className?: string;
  actionText?: string;
  actionLink?: string;
}

export default function Empty({
  title = '暂无数据',
  description = '',
  className = '',
  actionText,
  actionLink,
}: EmptyProps) {
  return (
    <div className={cn('flex h-full items-center justify-center', className)}>
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-museum-gold/30 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-museum-gold/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="font-display text-xl text-museum-ivory mb-2">{title}</h3>
        {description && (
          <p className="font-body text-base text-museum-gray mb-6">{description}</p>
        )}
        {actionText && actionLink && (
          <Link to={actionLink} className="btn-gold inline-flex items-center gap-2">
            {actionText}
          </Link>
        )}
      </div>
    </div>
  );
}
