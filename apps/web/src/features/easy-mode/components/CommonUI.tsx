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
  steps: { icon: string; id: string }[];
  current: number;
}

export const ProgressDots: React.FC<StepWizardProps> = ({ steps, current }) => (
  <div className="flex items-center gap-2" dir="rtl">
    {steps.map((s, i) => {
      const isCompleted = i < current;
      const isActive = i === current;
      const IconComp = (Lucide as any)[s.icon] || Lucide.Circle;

      return (
        <React.Fragment key={s.id}>
          <div className="relative group">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all duration-200",
                isCompleted
                  ? "bg-emerald-600 text-white shadow-2xs"
                  : isActive
                    ? "bg-primary text-primary-foreground shadow-2xs ring-2 ring-primary/20"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {isCompleted ? (
                <Lucide.Check size={15} strokeWidth={3} />
              ) : (
                <IconComp size={15} strokeWidth={isActive ? 2.5 : 2} />
              )}
            </div>
          </div>

          {i < steps.length - 1 ? (
            <div className={cn('h-0.5 w-4 rounded-full transition-all duration-300', isCompleted ? 'bg-emerald-600' : 'bg-muted')} />
          ) : null}
        </React.Fragment>
      );
    })}
  </div>
);
