import React from 'react';
import { cn } from '../../lib/utils';
import { formatDateTimeShort } from '../../lib/utils';

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: Date | string;
  status?: 'completed' | 'current' | 'pending';
  icon?: React.ReactNode;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function Timeline({ events, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sentinel-green via-sentinel-gold to-sentinel-blue opacity-30" />
      
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="relative flex items-start space-x-4">
            <div className={cn(
              'relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-200',
              {
                'bg-gradient-to-r from-sentinel-green to-sentinel-blue text-white border-transparent': event.status === 'completed',
                'bg-sentinel-gold text-white border-transparent animate-pulse-gentle': event.status === 'current',
                'bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700': event.status === 'pending',
              }
            )}>
              {event.icon || (
                <div className="h-2 w-2 rounded-full bg-current" />
              )}
            </div>
            
            <div className="flex-1 min-w-0 pb-8">
              <div className="flex items-center justify-between">
                <h3 className={cn(
                  'font-medium transition-colors',
                  {
                    'text-slate-900 dark:text-white': event.status === 'completed' || event.status === 'current',
                    'text-slate-500 dark:text-slate-400': event.status === 'pending',
                  }
                )}>
                  {event.title}
                </h3>
                <time className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {formatDateTimeShort(event.timestamp)}
                </time>
              </div>
              
              {event.description && (
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {event.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}