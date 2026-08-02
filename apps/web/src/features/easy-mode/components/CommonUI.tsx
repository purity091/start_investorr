import React from 'react';
import * as Lucide from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge as ShadcnBadge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => (
  <Card className={cn('p-6 bg-card border-border rounded-xl shadow-xs transition-all', className)}>
    {children}
  </Card>
);

interface BadgeProps {
  children: React.ReactNode;
  type?: 'default' | 'green' | 'red' | 'amber' | 'gold' | 'blue' | 'purple';
}

export const Badge: React.FC<BadgeProps> = ({ children, type = 'default' }) => {
  const variantClass = React.useMemo(() => {
    switch (type) {
      case 'green': return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
      case 'red': return 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20';
      case 'amber': case 'gold': return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
      case 'blue': case 'purple': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted text-muted-foreground border-transparent';
    }
  }, [type]);

  return (
    <ShadcnBadge variant="outline" className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-bold rounded-md border', variantClass)}>
      {children}
    </ShadcnBadge>
  );
};

interface StepWizardProps {
  steps: { icon: string; id: string; title?: string }[];
  current: number;
  onStepClick?: (index: number) => void;
}

export const ProgressDots: React.FC<StepWizardProps> = ({ steps, current, onStepClick }) => (
  <div className="flex flex-col items-center gap-2 w-full" dir="rtl">
    <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
      {steps.map((s, i) => {
        const isCompleted = i < current;
        const isActive = i === current;
        const IconComp = (Lucide as any)[s.icon] || Lucide.Circle;

        return (
          <React.Fragment key={s.id}>
            <button
              type="button"
              onClick={() => onStepClick?.(i + 1)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer border",
                isCompleted
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs hover:bg-emerald-700"
                  : isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-xs ring-2 ring-primary/20"
                    : "bg-muted/70 text-muted-foreground border-border hover:bg-muted hover:text-foreground"
              )}
              title={`الخطوة ${i + 1}`}
            >
              <div className="flex items-center justify-center shrink-0">
                {isCompleted ? (
                  <Lucide.Check size={14} strokeWidth={3} />
                ) : (
                  <IconComp size={14} strokeWidth={isActive ? 2.5 : 2} />
                )}
              </div>
              <span className="whitespace-nowrap">الخطوة {i + 1}</span>
            </button>

            {i < steps.length - 1 ? (
              <div className={cn('h-0.5 w-3 sm:w-6 rounded-full transition-all duration-300 shrink-0', isCompleted ? 'bg-emerald-600' : 'bg-muted')} />
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  </div>
);
