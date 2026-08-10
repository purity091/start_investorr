import React, { type FC } from 'react';
import { SectorKPI, SectorSection, SectorMarket } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/Card';
import { cn } from '../../../../lib/utils';

const parseContent = (content: string, dark: boolean): React.ReactNode => {
  return (
    <div className="flex flex-col gap-3">
      {content.split('\n').map((line, i) => {
        const t = line.trim();
        if (!t) return <div key={i} className="h-1" />;

        if (/^[•\-\*]/.test(t)) {
          return (
            <div key={i} className="flex items-start gap-3 mb-1">
              <div className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              <p className="m-0 text-sm font-medium leading-relaxed text-muted-foreground">
                {t.substring(1).trim()}
              </p>
            </div>
          );
        }
        return (
          <p key={i} className="m-0 text-[15px] font-medium leading-relaxed text-muted-foreground">
            {t}
          </p>
        );
      })}
    </div>
  );
};

export const LightCard: FC<{ section: SectorSection }> = ({ section }) => (
  <Card className="overflow-hidden border-border bg-card shadow-xs transition-all duration-200 hover:shadow-sm">
    <CardHeader className="pb-3 border-b border-border/50">
      <div className="flex items-center gap-3 dir-rtl">
        <div className="h-6 w-1 rounded-full bg-primary" />
        <CardTitle className="text-xl font-bold tracking-tight text-foreground">{section.title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="pt-4 dir-rtl">
      {typeof section.content === 'string' ? parseContent(section.content, false) : section.content}
    </CardContent>
  </Card>
);

export const DarkCard: FC<{ section: SectorSection }> = ({ section }) => (
  <Card className="relative overflow-hidden border-primary/20 bg-primary/5 shadow-xs transition-all duration-200">
    <div className="p-5 sm:p-6">
      <CardHeader className="p-0 pb-3 border-b border-primary/10">
        <div className="flex items-start gap-3 dir-rtl">
          <div className="h-7 w-1 shrink-0 rounded-full bg-primary" />
          <div className="flex-1">
            <CardTitle className="text-xl font-bold tracking-tight text-foreground">{section.title}</CardTitle>
            {section.subtitle && (
              <p className="mt-1 text-xs font-semibold text-primary">
                {section.subtitle}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-4 dir-rtl">
        {typeof section.content === 'string' ? parseContent(section.content, true) : section.content}
      </CardContent>
    </div>
  </Card>
);

export const KpiCard: FC<{ kpi: SectorKPI }> = ({ kpi }) => {
  const IconComponent =
    typeof kpi.icon === 'function' || (typeof kpi.icon === 'object' && kpi.icon && (kpi.icon as any).$$typeof)
      ? kpi.icon
      : null;

  return (
    <Card className="flex flex-col justify-between border-border bg-card p-3.5 shadow-2xs transition-all duration-200 hover:border-primary/30 hover:shadow-xs cursor-default rounded-xl">
      <div className="mb-2 flex items-center gap-2">
        {IconComponent && (
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <IconComponent className="size-3.5" strokeWidth={2.2} />
          </div>
        )}
        <div className="text-[11px] font-semibold leading-tight text-muted-foreground">{kpi.label}</div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <div className="text-2xl font-extrabold leading-none tracking-tight text-foreground tabular-nums">{kpi.value}</div>
        <div className="text-[10px] font-bold text-muted-foreground">{kpi.unit}</div>
      </div>
    </Card>
  );
};

export const MarketCard: FC<{ market: SectorMarket }> = ({ market }) => {
  const IconComponent =
    typeof market.icon === 'function' || (typeof market.icon === 'object' && market.icon && (market.icon as any).$$typeof)
      ? market.icon
      : null;

  return (
    <div className="flex cursor-default items-start gap-3 rounded-xl border border-border bg-card p-3.5 shadow-2xs transition-all duration-200 hover:border-primary/30 hover:shadow-xs">
      {IconComponent && (
        <div className="flex shrink-0 items-center justify-center rounded-lg bg-primary/10 p-2 text-primary">
          <IconComponent className="size-4" strokeWidth={2} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="m-0 text-[10px] font-bold uppercase leading-none tracking-wider text-primary">
          {market.label}
        </p>
        <div className="mt-1">
          <p className="m-0 text-sm font-bold text-foreground">{market.country}</p>
          {market.note && (
            <p className="mt-1 m-0 line-clamp-2 text-[11px] font-medium leading-relaxed text-muted-foreground">
              {market.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

