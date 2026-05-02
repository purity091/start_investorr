/// <reference types="react" />
import * as React from 'react';
import { 
  ShieldCheck, 
  AlertCircle, 
  TrendingUp, 
  Zap, 
  Lightbulb, 
  ArrowUpRight, 
  LucideIcon 
} from 'lucide-react';
import { SwotAnalysis, SwotItem } from './types';

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
    <div 
      className="sd-section-light sd-section-card" 
      data-section="swot-analysis"
      style={{
        position: 'relative',
        background: '#fff',
        borderRadius: 24,
        border: '1px solid #e2e8f0',
        padding: '32px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 32, direction: 'rtl' }}>
        <div style={{ width: 4, height: 32, background: 'var(--acc)', borderRadius: 4, flexShrink: 0, marginTop: 4 }} />
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>تحليل SWOT الاستراتيجي</h2>
          <p style={{ margin: '8px 0 0', fontSize: 16, fontWeight: 500, color: '#64748b', lineHeight: 1.6 }}>نظرة تحليلية شاملة للقطاع: {title}</p>
        </div>
      </div>

      <div className="sd-section-light-body" style={{ direction: 'rtl' }}>
        <div className="mb-10 text-right">
          <p style={{ fontSize: 16, fontWeight: 500, color: '#475569', lineHeight: 1.8 }}>
            {swot.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <SwotCard title="نقاط القوة" items={swot.strengths} icon={ShieldCheck} color="emerald" />
          <SwotCard title="نقاط الضعف" items={swot.weaknesses} icon={AlertCircle} color="rose" />
          <SwotCard title="الفرص الواعدة" items={swot.opportunities} icon={TrendingUp} color="amber" />
          <SwotCard title="التهديدات والمخاطر" items={swot.threats} icon={Zap} color="indigo" />
        </div>

        <div className="mt-12 relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-yellow-400/5 to-orange-400/5 rounded-[2rem]" />
          <div className="relative bg-white border border-amber-100/50 rounded-[2rem] p-1 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-amber-900/5">
            <div className="bg-amber-50/10 backdrop-blur-xl rounded-[1.8rem] p-8 md:p-10 border border-white overflow-hidden relative">
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-right">
                <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-200/50">
                  <Lightbulb size={32} className="text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-amber-100/50 border border-amber-200/50 rounded-full text-[10px] font-black text-amber-800 uppercase tracking-widest">
                      STRATEGIC INSIGHT
                    </span>
                    <div className="h-px w-10 bg-amber-200" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-3 leading-tight">
                    الملخص الذكي لتحليل SWOT
                  </h4>
                  <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-3xl">
                    {swot.insight}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
