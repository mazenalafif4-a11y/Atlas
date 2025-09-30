import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'sm', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium transition-colors',
          
          // Size variants
          {
            'px-2 py-0.5 text-xs': size === 'sm',
            'px-2.5 py-1 text-sm': size === 'md',
            'px-3 py-1.5 text-base': size === 'lg',
          },
          
          // Color variants
          {
            'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300': variant === 'default',
            'bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-400': variant === 'secondary',
            'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400': variant === 'success',
            'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400': variant === 'warning',
            'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400': variant === 'error',
            'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400': variant === 'info',
          },
          
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';