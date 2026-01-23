import React from 'react';

interface SkeletonProps {
  type?: 'text' | 'title' | 'card' | 'avatar' | 'image';
  count?: number;
  className?: string;
}

export default function Skeleton({
  type = 'text',
  count = 1,
  className = ''
}: SkeletonProps) {
  const getSkeletonClass = () => {
    switch (type) {
      case 'title':
        return 'skeleton-title';
      case 'card':
        return 'skeleton-card';
      case 'avatar':
        return 'skeleton-avatar';
      case 'image':
        return 'skeleton-image';
      default:
        return 'skeleton-text';
    }
  };

  const baseClass = getSkeletonClass();

  if (count > 1) {
    return (
      <div className={className}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`${baseClass} ${i < count - 1 ? 'mb-4' : ''}`} />
        ))}
      </div>
    );
  }

  return <div className={`${baseClass} ${className}`} />;
}
