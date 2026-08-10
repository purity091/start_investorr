/// <reference types="react" />
import * as React from 'react';
import { 
  ShieldCheck, 
  AlertCircle, 
  TrendingUp, 
  Zap, 
  Lightbulb, 
  LucideIcon 
} from 'lucide-react';
import { SwotAnalysis, SwotItem } from './types';
import { Card } from '../../../ui/Card';

interface SwotCardProps {
  title: string;
  items: SwotItem[];
  icon: LucideIcon;
  variant: 'emerald' | 'rose' | 'sky' | 'amber';
}

const variantStyles = {
  emerald: {
    container: 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/30',
    iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500',
    headerBorder: 'border-emerald-500/15',
  },
  rose: {
    container: 'border-rose-500/20 bg-rose-500/5 hover:border-rose-500/30',
    iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    dot: 'bg-rose-500',
    headerBorder: 'border-rose-500/15',
  },
  sky: {
    container: 'border-sky-500/20 bg-sky-500/5 hover:border-sky-500/30',
    iconBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    dot: 'bg-sky-500',
    headerBorder: 'border-sky-500/15',
  },
  amber: {
    container: 'border-amber-500/20 bg-amber-500/5 hover:border-amber-500/30',
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-500',
    headerBorder: 'border-amber-500/15',
  },
};

function SwotCard({ title, items, icon: Icon, variant }: SwotCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={`flex flex-col justify-between p-5 rounded-xl border ${styles.container} transition-all duration-200 shadow-2xs space-y-3`}>
      <div className={`flex items-center gap-2.5 border-b ${styles.headerBorder} pb-3`}>
        <div className={`flex size-8 items-center justify-center rounded-lg ${styles.iconBg}`}>
          <Icon size={16} strokeWidth={2.2} />
        </div>
        <h3 className="m-0 text-base font-bold text-foreground">{title}</h3>
      </div>
      <ul className="m-0 p-0 space-y-2.5 list-none">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div className={`mt-2 size-1.5 rounded-full ${styles.dot} shrink-0`} />
            <span className="text-xs md:text-sm font-medium text-foreground/90 leading-relaxed">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SwotSectionProps {
  swot: SwotAnalysis;
  title: string;
}

export function SwotSection({ swot, title }: SwotSectionProps) {
  return (
    <Card 
      data-section="swot-analysis"
      className="border-border bg-card p-6 rounded-xl dir-rtl shadow-xs space-y-6"
    >
      <div className="flex items-start gap-3 border-b border-border pb-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <ShieldCheck size={20} strokeWidth={2} />
        </div>
        <div className="flex-1 text-right">
          <h2 className="m-0 text-xl font-bold tracking-tight text-foreground">تحليل SWOT الاستراتيجي</h2>
          <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">نظرة تحليلية شاملة للقطاع: {title}</p>
        </div>
      </div>

      <div className="space-y-6">
        {swot.description && (
          <p className="m-0 text-xs sm:text-sm font-medium text-muted-foreground leading-relaxed">
            {swot.description}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SwotCard title="نقاط القوة" items={swot.strengths} icon={ShieldCheck} variant="emerald" />
          <SwotCard title="نقاط الضعف" items={swot.weaknesses} icon={AlertCircle} variant="rose" />
          <SwotCard title="الفرص الواعدة" items={swot.opportunities} icon={TrendingUp} variant="sky" />
          <SwotCard title="التهديدات والمخاطر" items={swot.threats} icon={Zap} variant="amber" />
        </div>

        {swot.insight && (
          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Lightbulb size={18} strokeWidth={2} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-primary">
                  الملخص الذكي (Strategic Insight)
                </span>
              </div>
              <p className="m-0 text-xs sm:text-sm font-medium leading-relaxed text-foreground">
                {swot.insight}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
