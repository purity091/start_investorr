import React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from './Badge';
import { Button } from './Button';
import { Card } from './Card';

interface HeaderAction {
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  icon?: React.ReactNode;
}

interface MetricItem {
  label: string;
  value: string;
  helper?: string;
}

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  actions?: HeaderAction[];
  metrics?: MetricItem[];
  className?: string;
}

export function PageHeader({ badge, title, description, actions, metrics, className }: PageHeaderProps) {
  return (
    <Card className={cn('overflow-hidden rounded-xl border-border bg-card shadow-xs', className)}>
      <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4">
          {badge ? <Badge variant="outline">{badge}</Badge> : null}
          <div className="space-y-2">
            <h1 className="text-2xl font-black leading-tight text-foreground sm:text-3xl lg:text-4xl">{title}</h1>
            {description ? <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-muted-foreground font-medium">{description}</p> : null}
          </div>
          {actions?.length ? (
            <div className="flex flex-wrap gap-3 pt-1">
              {actions.map((action) => (
                <Button key={action.label} variant={action.variant ?? 'default'} size="sm" onClick={action.onClick} className="font-bold text-xs h-10 gap-2 cursor-pointer">
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>

        {metrics?.length ? (
          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border border-border bg-muted/40 p-4">
                <p className="text-[11px] font-extrabold text-muted-foreground">{metric.label}</p>
                <p className="mt-2 text-xl font-black text-foreground">{metric.value}</p>
                {metric.helper ? <p className="mt-1 text-[11px] font-medium text-muted-foreground">{metric.helper}</p> : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
