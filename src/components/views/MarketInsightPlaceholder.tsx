import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

interface MarketInsightPlaceholderProps {
  title: string;
  category: string;
  summary: string;
  setActiveTab: (tab: string) => void;
}

export const MarketInsightPlaceholder: React.FC<MarketInsightPlaceholderProps> = ({
  title,
  category,
  summary,
  setActiveTab,
}) => {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-white px-5 py-8 sm:px-8 lg:px-12"
      style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8 text-white shadow-2xl shadow-slate-200/60">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Compass size={24} />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-200">
                {category}
              </p>
              <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">{title}</h1>
            </div>
          </div>

          <p className="max-w-3xl text-sm font-medium leading-8 text-slate-200 sm:text-base">
            {summary}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                Status
              </p>
              <p className="mt-3 text-sm font-bold text-white">واجهة انتقالية مرتبطة</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                Next Layer
              </p>
              <p className="mt-3 text-sm font-bold text-white">يمكن العودة فوراً إلى مكتبة القطاعات</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                Note
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm font-bold text-white">
                <Sparkles size={16} className="text-indigo-300" />
                لا توجد نهاية فارغة بعد الآن
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('market-discovery')}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-900 transition-all hover:scale-[1.02]"
            >
              <ArrowRight size={16} />
              العودة إلى اكتشاف السوق
            </button>
            <button
              onClick={() => setActiveTab('workspace')}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition-all hover:bg-white/10"
            >
              الانتقال إلى مساحة المشروع
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
