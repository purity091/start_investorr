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
  color: 'emerald' | 'rose' | 'amber' | 'indigo';
}

function SwotCard({ title, items, icon: Icon }: { title: string; items: SwotItem[]; icon: LucideIcon }) {
  return (
    <div className="flex flex-col justify-between p-5 rounded-lg border border-border bg-card shadow-none space-y-3">
      <div className="flex items-center gap-2.5 border-b border-border pb-3">
        <div className="flex size-8 items-center justify-center rounded-md bg-muted text-primary">
          <Icon size={16} strokeWidth={2} />
        </div>
        <h3 className="m-0 text-base font-bold text-foreground">{title}</h3>
      </div>
      <ul className="m-0 p-0 space-y-2.5 list-none">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
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
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
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
          <SwotCard title="نقاط القوة" items={swot.strengths} icon={ShieldCheck} />
          <SwotCard title="نقاط الضعف" items={swot.weaknesses} icon={AlertCircle} />
          <SwotCard title="الفرص الواعدة" items={swot.opportunities} icon={TrendingUp} />
          <SwotCard title="التهديدات والمخاطر" items={swot.threats} icon={Zap} />
        </div>

        {swot.insight && (
          <div className="p-5 rounded-lg border border-border bg-muted/30 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Lightbulb size={20} strokeWidth={2} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
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
