import React from 'react';
import { cn } from '../../lib/cn';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'ui-input flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = 'Input';
