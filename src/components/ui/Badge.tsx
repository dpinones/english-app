'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn, getLevelColor } from '@/lib/utils';
import { Level } from '@/types';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'level';
  color?: 'gray' | 'blue' | 'green' | 'amber' | 'purple' | 'red';
  size?: 'sm' | 'md' | 'lg';
  level?: Level;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', color = 'gray', size = 'md', level, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    };

    const colors = {
      gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };

    const outlineColors = {
      gray: 'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300',
      blue: 'border border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-300',
      green: 'border border-green-300 text-green-700 dark:border-green-600 dark:text-green-300',
      amber: 'border border-amber-300 text-amber-700 dark:border-amber-600 dark:text-amber-300',
      purple: 'border border-purple-300 text-purple-700 dark:border-purple-600 dark:text-purple-300',
      red: 'border border-red-300 text-red-700 dark:border-red-600 dark:text-red-300',
    };

    // Si es un badge de nivel, usar colores especificos
    if (variant === 'level' && level) {
      return (
        <span
          ref={ref}
          className={cn(
            baseStyles,
            sizes[size],
            getLevelColor(level),
            'text-white font-bold',
            className
          )}
          {...props}
        >
          {children || level}
        </span>
      );
    }

    const variantStyles = variant === 'outline' ? outlineColors[color] : colors[color];

    return (
      <span
        ref={ref}
        className={cn(baseStyles, sizes[size], variantStyles, className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
