import Link from 'next/link';
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  href?: string;
  count?: number;
  badge?: string;
  variant?: 'default' | 'enhanced';
  onClick?: () => void;
}

export default function Card({ 
  title, 
  description, 
  icon, 
  href, 
  count, 
  badge, 
  variant = 'default',
  onClick 
}: CardProps) {
  const cardClass = variant === 'enhanced' ? 'card-enhanced' : 'card';
  
  const content = (
    <div className={`${cardClass} p-6 h-full cursor-pointer group transition-all duration-300 transform hover:scale-105`} onClick={onClick}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          {icon && (
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:from-indigo-500/40 group-hover:to-purple-500/40 transition-all duration-300 shadow-lg group-hover:shadow-xl">
              <div className="text-indigo-400 group-hover:text-indigo-300 transition-colors text-lg sm:text-xl">
                {icon}
              </div>
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
              {title}
            </h3>
            {badge && (
              <span className="badge mt-1 text-xs">{badge}</span>
            )}
          </div>
        </div>
        {count !== undefined && (
          <div className="text-2xl sm:text-3xl font-bold gradient-text ml-2">
            {count}
          </div>
        )}
      </div>
      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
        {description}
      </p>
      {href && (
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-indigo-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs uppercase tracking-wide font-medium">Explore</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );

  if (href && !onClick) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
