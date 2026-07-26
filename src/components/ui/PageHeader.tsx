import React from 'react';
import { cn } from '../../lib/cn';
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
    <Card className={cn('overflow-hidden rounded-[28px] border-slate-200 bg-white', className)}>
      <div className="flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4">
          {badge ? <Badge variant="outline">{badge}</Badge> : null}
          <div className="space-y-3">
            <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">{title}</h1>
            {description ? <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p> : null}
          </div>
          {actions?.length ? (
            <div className="flex flex-wrap gap-3">
              {actions.map((action) => (
                <Button key={action.label} variant={action.variant ?? 'default'} size="lg" onClick={action.onClick}>
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
              <div key={metric.label} className="rounded-[20px] border border-slate-200 bg-white/90 p-4">
                <p className="text-[11px] font-black text-slate-500">{metric.label}</p>
                <p className="mt-2 text-2xl font-black text-slate-950">{metric.value}</p>
                {metric.helper ? <p className="mt-1 text-[11px] font-semibold text-slate-500">{metric.helper}</p> : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
