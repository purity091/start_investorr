import React from 'react';
import { cn } from '../../lib/cn';

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'success';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'border-slate-200 bg-slate-100 text-slate-700',
  secondary: 'border-blue-100 bg-blue-50 text-blue-700',
  outline: 'border-slate-200 bg-white text-slate-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-black tracking-normal',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
