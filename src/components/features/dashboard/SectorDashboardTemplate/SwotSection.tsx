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
import { Card } from '../../../ui/card';

interface SwotCardProps {
  title: string;
  items: SwotItem[];
  icon: LucideIcon;
  color: 'emerald' | 'rose' | 'amber' | 'indigo';
}

function SwotCard({ title, items, icon: Icon, color }: SwotCardProps) {
  const colorStyles = {
    emerald: {
      bg: 'bg-emerald-50/30',
      border: 'border-emerald-100/50',
      iconBg: 'bg-emerald-500',
      iconShadow: 'shadow-emerald-200',
      text: 'text-emerald-900',
      dot: 'bg-emerald-400',
      hover: 'hover:bg-emerald-50/50'
    },
    rose: {
      bg: 'bg-rose-50/30',
      border: 'border-rose-100/50',
      iconBg: 'bg-rose-500',
      iconShadow: 'shadow-rose-200',
      text: 'text-rose-900',
      dot: 'bg-rose-400',
      hover: 'hover:bg-rose-50/50'
    },
    amber: {
      bg: 'bg-amber-50/30',
      border: 'border-amber-100/50',
      iconBg: 'bg-amber-500',
      iconShadow: 'shadow-amber-200',
      text: 'text-amber-900',
      dot: 'bg-amber-400',
      hover: 'hover:bg-amber-50/50'
    },
    indigo: {
      bg: 'bg-indigo-50/30',
      border: 'border-indigo-100/50',
      iconBg: 'bg-indigo-600',
      iconShadow: 'shadow-indigo-200',
      text: 'text-indigo-900',
      dot: 'bg-indigo-400',
      hover: 'hover:bg-indigo-50/50'
    }
  };

  const s = colorStyles[color];

  return (
    <div className={`group/swot relative h-full ${s.bg} border ${s.border} rounded-[1.5rem] p-4 md:p-6 transition-all duration-300 ${s.hover}`}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`w-8 h-8 md:w-10 md:h-10 ${s.iconBg} text-white rounded-lg md:rounded-xl flex items-center justify-center shadow-md ${s.iconShadow} transition-transform duration-500 group-hover/swot:rotate-6`}>
          <Icon size={16} className="md:size-5" />
        </div>
        <h3 className={`text-base md:text-lg font-black ${s.text}`}>{title}</h3>
      </div>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-4 group/item">
            <div className={`mt-2 w-1.5 h-1.5 rounded-full ${s.dot} shrink-0 group-hover/item:scale-150 transition-transform duration-300`} />
            <span className="text-slate-600 font-bold text-sm leading-relaxed">{item.text}</span>
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
      className="border-border bg-background p-8 dir-rtl"
    >
      <div className="mb-8 flex items-start gap-4">
        <div className="mt-1 h-8 w-1 shrink-0 rounded bg-primary" />
        <div className="flex-1">
          <h2 className="m-0 text-2xl font-black tracking-tight text-foreground">تحليل SWOT الاستراتيجي</h2>
          <p className="mt-2 text-base font-medium leading-relaxed text-muted-foreground">نظرة تحليلية شاملة للقطاع: {title}</p>
        </div>
      </div>

      <div className="dir-rtl">
        <div className="mb-10 text-right">
          <p className="text-base font-medium leading-relaxed text-muted-foreground">
            {swot.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <SwotCard title="نقاط القوة" items={swot.strengths} icon={ShieldCheck} color="emerald" />
          <SwotCard title="نقاط الضعف" items={swot.weaknesses} icon={AlertCircle} color="rose" />
          <SwotCard title="الفرص الواعدة" items={swot.opportunities} icon={TrendingUp} color="amber" />
          <SwotCard title="التهديدات والمخاطر" items={swot.threats} icon={Zap} color="indigo" />
        </div>

        <div className="mt-12 relative group overflow-hidden rounded-[2rem]">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-yellow-400/5 to-orange-400/5" />
          <div className="relative border border-amber-100/50 bg-background/50 p-1 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-amber-900/5">
            <div className="relative overflow-hidden rounded-[1.8rem] border border-border bg-amber-50/10 p-8 backdrop-blur-xl md:p-10">
              
              <div className="relative z-10 flex flex-col items-center gap-8 text-center md:flex-row md:text-right">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 shadow-lg shadow-amber-200/50">
                  <Lightbulb size={32} className="text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="mb-3 flex items-center justify-center gap-3 md:justify-start">
                    <span className="rounded-full border border-amber-200/50 bg-amber-100/50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-800">
                      STRATEGIC INSIGHT
                    </span>
                    <div className="h-px w-10 bg-amber-200" />
                  </div>
                  <h4 className="mb-3 text-2xl font-black leading-tight text-foreground">
                    الملخص الذكي لتحليل SWOT
                  </h4>
                  <p className="max-w-3xl text-lg font-medium leading-relaxed text-muted-foreground">
                    {swot.insight}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
