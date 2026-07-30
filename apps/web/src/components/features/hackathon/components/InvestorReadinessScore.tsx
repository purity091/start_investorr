import React from 'react';
import { ReadinessBreakdown } from '../types';
import { BarChart3, Briefcase, ShieldCheck, TrendingUp } from 'lucide-react';

interface InvestorReadinessScoreProps {
  breakdown: ReadinessBreakdown;
}

export const InvestorReadinessScore: React.FC<InvestorReadinessScoreProps> = ({ breakdown }) => {
  const rows = [
    { label: 'وضوح السوق', value: breakdown.marketClarity, icon: BarChart3 },
    { label: 'الصلابة المالية', value: breakdown.financialStrength, icon: TrendingUp },
    { label: 'جودة التنفيذ', value: breakdown.executionQuality, icon: Briefcase },
    { label: 'إدارة المخاطر', value: breakdown.riskControl, icon: ShieldCheck },
  ];

  return (
    <section className="bg-white border border-slate-200 shadow-sm rounded-[2.5rem] p-6 sm:p-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Investor Readiness Score</p>
          <h3 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">درجة جاهزية المستثمر</h3>
        </div>
        <div className="rounded-2xl border border-indigo-100 bg-indigo-600 px-6 py-4 text-center shadow-lg shadow-indigo-100 text-white">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Overall Readiness</p>
          <p className="text-3xl font-black">{breakdown.overall}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <div key={row.label} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 hover:bg-white hover:shadow-sm transition-all">
              <div className="mb-4 flex items-center justify-between gap-2">
                <p className="flex items-center gap-2 text-sm font-black text-slate-900">
                  <Icon size={18} className="text-indigo-500" />
                  {row.label}
                </p>
                <span className="text-sm font-black text-indigo-600">{row.value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-indigo-600 shadow-sm" style={{ width: `${row.value}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-3xl border border-slate-100 bg-slate-50 p-6">
        <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">تحليل العوامل (Score Drivers)</p>
        <ul className="space-y-3">
          {breakdown.reasons.map((reason, index) => (
            <li key={`${reason}-${index}`} className="flex items-start gap-3 text-sm font-bold leading-relaxed text-slate-600">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-300 mt-2 shrink-0" />
              {reason}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
