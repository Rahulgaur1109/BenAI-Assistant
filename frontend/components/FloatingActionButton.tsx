'use client';

import { ReactNode } from 'react';

interface FloatingActionButtonProps {
  icon: ReactNode;
  label?: string;
  onClick: () => void;
  className?: string;
}

export default function FloatingActionButton({
  icon,
  label,
  onClick,
  className = ''
}: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fab group ${className}`}
      aria-label={label || 'Action button'}
    >
      <div className="fab-icon">{icon}</div>
      {label && (
        <div className="fab-label">
          {label}
        </div>
      )}
    </button>
  );
}
