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
              <div className={cn("mt-2 size-1.5 shrink-0 rounded-full", dark ? "bg-primary" : "bg-muted-foreground")} />
              <p className={cn("m-0 text-sm font-medium leading-relaxed", dark ? "text-slate-300" : "text-muted-foreground")}>
                {t.substring(1).trim()}
              </p>
            </div>
          );
        }
        return (
          <p key={i} className={cn("m-0 text-[15px] font-medium leading-relaxed", dark ? "text-slate-300" : "text-muted-foreground")}>
            {t}
          </p>
        );
      })}
    </div>
  );
};

export const LightCard: FC<{ section: SectorSection }> = ({ section }) => (
  <Card className="overflow-hidden border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-md">
    <CardHeader className="pb-4">
      <div className="flex items-center gap-4 dir-rtl">
        <div className="h-8 w-1 rounded bg-primary" />
        <CardTitle className="text-2xl font-black tracking-tight text-foreground">{section.title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="dir-rtl">
      {typeof section.content === 'string' ? parseContent(section.content, false) : section.content}
    </CardContent>
  </Card>
);

export const DarkCard: FC<{ section: SectorSection }> = ({ section }) => (
  <Card className="relative overflow-hidden border-primary/20 bg-primary/5 shadow-sm transition-all duration-300 hover:shadow-md">
    <div className="relative z-10 p-6 md:p-8">
      <CardHeader className="p-0 pb-4">
        <div className="flex items-start gap-4 dir-rtl">
          <div className="h-9 w-1.5 shrink-0 rounded-full bg-primary" />
          <div className="flex-1">
            <CardTitle className="text-2xl font-black leading-tight tracking-tight text-foreground">{section.title}</CardTitle>
            {section.subtitle && (
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-primary">
                {section.subtitle}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 dir-rtl">
        {typeof section.content === 'string' ? parseContent(section.content, false) : section.content}
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
    <Card className="flex flex-col justify-between border-border bg-muted/20 p-4 shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-background hover:shadow-sm cursor-default">
      <div className="mb-2 flex items-center gap-2">
        {IconComponent && (
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground shadow-sm">
            <IconComponent className="size-3.5" strokeWidth={2.5} />
          </div>
        )}
        <div className="text-[11px] font-bold leading-tight text-foreground">{kpi.label}</div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <div className="text-2xl font-black leading-none tracking-tight text-foreground">{kpi.value}</div>
        <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{kpi.unit}</div>
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
    <div className="flex cursor-default items-start gap-4 rounded-2xl border border-white/5 bg-slate-900/40 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/10 hover:bg-slate-900/60">
      {IconComponent && (
        <div className="flex shrink-0 items-center justify-center rounded-xl bg-white/5 p-2.5">
          <IconComponent className="size-5 text-white" strokeWidth={1.5} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="m-0 text-[10px] font-bold uppercase leading-none tracking-widest text-primary/80">
          {market.label}
        </p>
        <div className="mt-1.5">
          <p className="m-0 text-[15px] font-black leading-tight text-slate-50">{market.country}</p>
          {market.note && (
            <p className="mt-1.5 m-0 line-clamp-2 text-[11px] font-medium leading-relaxed text-slate-400">
              {market.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

