import React from 'react';
import { cn } from '../../lib/cn';

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    'bg-slate-950 text-white shadow-sm hover:bg-slate-800 focus-visible:ring-slate-300',
  secondary:
    'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-300',
  outline:
    'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 focus-visible:ring-slate-300',
  ghost:
    'text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-200',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 rounded-xl px-3 text-xs font-bold',
  md: 'h-10 rounded-xl px-4 text-sm font-bold',
  lg: 'h-11 rounded-2xl px-5 text-sm font-black',
  icon: 'h-10 w-10 rounded-xl p-0',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', type = 'button', loading = false, loadingText, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      data-loading={loading ? 'true' : 'false'}
      className={cn(
        'ui-button inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985]',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading ? <span className="ui-spinner" aria-hidden="true" /> : null}
      <span className={cn('inline-flex items-center gap-2', loading ? 'opacity-90' : '')}>
        {loading && loadingText ? loadingText : children}
      </span>
    </button>
  ),
);

Button.displayName = 'Button';
