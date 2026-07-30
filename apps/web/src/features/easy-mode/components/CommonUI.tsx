import React from 'react';
import * as Lucide from 'lucide-react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', glow = false }) => (
  <div
    className={`
      rounded-[2rem] bg-white p-6 relative overflow-hidden transition-all duration-300
      ${glow ? 'shadow-2xl shadow-indigo-100/40' : 'shadow-sm hover:shadow-md'}
      ${className}
    `}
  >
    {children}
  </div>
);

interface BadgeProps {
  children: React.ReactNode;
  type?: 'default' | 'green' | 'red' | 'amber' | 'gold' | 'blue' | 'purple';
}

export const Badge: React.FC<BadgeProps> = ({ children, type = 'default' }) => {
  const themes = {
    default: 'bg-slate-100 text-slate-500',
    green: 'bg-emerald-50 text-emerald-600',
    red: 'bg-rose-50 text-rose-600',
    amber: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-blue-600',
    gold: 'bg-amber-100 text-amber-700',
    purple: 'bg-indigo-50 text-indigo-600',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${themes[type]}`}
    >
      {children}
    </span>
  );
};

interface StepWizardProps {
  steps: { icon: string; id: string }[];
  current: number;
}

export const ProgressDots: React.FC<StepWizardProps> = ({ steps, current }) => (
  <div className="flex items-center gap-1.5" dir="rtl">
    {steps.map((s, i) => {
      const isCompleted = i < current;
      const isActive = i === current;
      const IconComp = (Lucide as any)[s.icon] || Lucide.Circle;

      return (
        <React.Fragment key={s.id}>
          <div className="relative group">
            <div
              className={`
                relative z-10 flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300
                ${
                  isCompleted
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100'
                    : isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                      : 'bg-slate-50 text-slate-300'
                }
              `}
            >
              {isCompleted ? (
                <Lucide.Check size={14} strokeWidth={4} />
              ) : (
                <IconComp size={isActive ? 14 : 12} strokeWidth={isActive ? 2.25 : 2} />
              )}

              {isActive ? (
                <div className="absolute inset-0 -z-10 rounded-lg bg-indigo-500 opacity-20 animate-ping" />
              ) : null}
            </div>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-black uppercase tracking-tighter text-slate-400 opacity-0 transition-opacity group-hover:opacity-100">
              STEP {i + 1}
            </div>
          </div>

          {i < steps.length - 1 ? (
            <div className={`h-[2px] w-3 rounded-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : 'bg-slate-100'}`} />
          ) : null}
        </React.Fragment>
      );
    })}
  </div>
);
