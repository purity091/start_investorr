import React from 'react';
import { 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  Zap, 
  Radio, 
  Network, 
  Activity as PulseIcon 
} from 'lucide-react';
import { MinimalistCard } from '../../features/discovery/ProblemOpportunityEngine/MinimalistCard';


/* ═══════════════════════════════════════════════════════════════
   INTELLIGENCE STREAM — "Live Gap Radar Feed"
   ═══════════════════════════════════════════════════════════════ */

/* Advanced Heatmap Bar */
const HeatmapBar = ({ label, percentage, color, trend }: any) => (
  <div className="group/bar space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
         <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
         <span className="text-[10px] font-black text-slate-100">{label}</span>
      </div>
      <div className="flex items-center gap-2">
         <span className={`text-[9px] font-black ${trend > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
         </span>
         <span className="text-[10px] font-black text-white">{percentage}%</span>
      </div>
    </div>
    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
      <div 
        className={`absolute inset-y-0 right-0 rounded-full ${color} transition-all duration-1000 group-hover/bar:brightness-110`} 
        style={{ width: `${percentage}%` }} 
      />
    </div>
  </div>
);

export const IntelligenceStream = ({ setActiveTab }: any) => {
  const streamItems = [
    {
      title: 'نقص حلول سلاسل التوريد المعتمدة على الـ Blockchain',
      description: 'تحليل الفجوة في كفاءة التتبع والشفافية للشركات اللوجستية المتوسطة.',
      country: 'السعودية',
      gapType: 'فجوة تقنية',
      profitPotential: '450M+',
      painScore: 'High',
      competition: 'Low'
    },
    {
      title: 'غياب التغطية التأمينية للشركات الناشئة في مراحلها المبكرة',
      description: 'دراسة جدوى لنموذج تأمين مخاطر الفشل التقني والتشغيلي.',
      country: 'الإمارات',
      gapType: 'فجوة تنظيمية',
      profitPotential: '280M+',
      painScore: 'Medium',
      competition: 'Moderate'
    }
  ];

  const heatmapData = [
    { label: 'التكنولوجيا المالية', percentage: 84, color: 'bg-indigo-500', trend: 12 },
    { label: 'الأمن السيبراني', percentage: 76, color: 'bg-blue-500', trend: 8 },
    { label: 'الذكاء الاصطناعي', percentage: 92, color: 'bg-purple-500', trend: 24 },
    { label: 'سلاسل التوريد', percentage: 65, color: 'bg-emerald-500', trend: -4 },
    { label: 'الطاقة النظيفة', percentage: 58, color: 'bg-amber-500', trend: 15 }
  ];

  return (
    <section className="bg-white border-y border-slate-100 py-10 sm:py-14 px-5 sm:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10 border-b border-slate-50 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">
              <Radio size={12} className="animate-pulse text-indigo-400" /> مركز البث الاستخباراتي
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">
               رادار الفجوات القطاعية
            </h2>
            <p className="text-slate-400 font-bold text-[12px] sm:text-sm max-w-xl">
               تابع توفر الفرص الاستثمارية وحجم الطلب عليها عالمياً، مع تحليلات وتحديثات حية من قلب الأسواق.
            </p>
          </div>
        </div>

        {/* Content: Cards + Heatmap */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          <div className="flex-1 flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {streamItems.map((item, i) => (
                <MinimalistCard 
                  key={i} 
                  problem={{
                    title: item.title,
                    desc: item.description,
                    sectorName: item.gapType,
                    countries: [item.country === 'السعودية' ? 'SA' : item.country === 'الإمارات' ? 'AE' : item.country === 'مصر' ? 'EG' : 'SY'],
                    pain: item.painScore,
                    money: item.profitPotential.replace('$', '').replace('M+', 'M'),
                    b2x: item.competition
                  }} 
                  onNavigate={() => setActiveTab('problem-engine')}
                />
              ))}
            </div>

            <div className="flex justify-center">
              <button 
                onClick={() => setActiveTab('problem-engine')} 
                className="group relative flex items-center gap-3 px-8 py-3.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg overflow-hidden shrink-0"
              >
                <span>عرض الرادار الكامل</span>
                <ArrowLeft size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Heatmap Sidebar */}
          <div className="lg:w-72 shrink-0">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col h-full">
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest">مؤشر الحرارة</h4>
                  </div>
                  <Zap size={14} className="text-indigo-400" />
                </div>

                <div className="space-y-5 flex-1">
                  {heatmapData.map((item, i) => (
                    <HeatmapBar key={i} {...item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

