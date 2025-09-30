import React from 'react';
import { cn } from '../../lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

export function ProgressBar({ 
  value, 
  max = 100, 
  className, 
  size = 'md',
  showLabel = false,
  label 
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-1">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn(
        'w-full bg-slate-200 rounded-full overflow-hidden dark:bg-slate-700',
        {
          'h-1': size === 'sm',
          'h-2': size === 'md',
          'h-3': size === 'lg',
        }
      )}>
        <div
          className="h-full bg-gradient-to-r from-sentinel-green via-sentinel-red via-sentinel-gold via-sentinel-blue to-sentinel-silver transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}