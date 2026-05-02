import React from 'react';
import { 
  Zap, 
  ArrowRight, 
  AlertCircle, 
  Lightbulb, 
  DollarSign, 
  TrendingUp, 
  Activity,
  Box,
  CircleDot
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   UNICORN ANATOMY — "Blueprint Lab"
   ═══════════════════════════════════════════════════════════════ */

const cases = [
  {
    name: 'Stripe',
    sector: 'التكنولوجيا المالية',
    valuation: '$50B+',
    problem: 'تعقيد قبول المدفوعات عبر الإنترنت للمطورين.',
    solution: 'واجهة برمجية (API) بسيطة مكونة من 7 أسطر كود.',
    impact: 'تمكين ملايين الشركات من بدء التجارة الإلكترونية فوراً.',
    icon: DollarSign,
    color: 'bg-indigo-600'
  },
  {
    name: 'Snowflake',
    sector: 'الحوسبة السحابية',
    valuation: '$40B+',
    problem: 'عدم القدرة على فصل التخزين عن المعالجة في قواعد البيانات.',
    solution: 'بناء قاعدة بيانات سحابية أصلية تتيح القياس المرن.',
    impact: 'تقليل تكاليف تخزين البيانات الضخمة بنسبة 70%.',
    icon: Box,
    color: 'bg-blue-500'
  },
  {
    name: 'Airbnb',
    sector: 'السفر والضيافة',
    valuation: '$70B+',
    problem: 'عدم كفاية الفنادق وارتفاع تكاليف السفر في المدن الكبرى.',
    solution: 'منصة لمشاركة المساكن الخاصة وتوفير تجربة محلية.',
    impact: 'إحداث ثورة في اقتصاد التشارك وخلق دخل إضافي للملايين.',
    icon: TrendingUp,
    color: 'bg-rose-500'
  }
];

const AnatomyCard = ({ data }: any) => (
  <div className="bg-white border border-slate-100 rounded-2xl relative overflow-hidden group hover:shadow-lg transition-all duration-300">
    <div className="p-6 sm:p-7">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl ${data.color} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-all duration-300 shrink-0`}>
            <data.icon size={22} />
          </div>
          <div className="min-w-0">
            <h4 className="text-base font-black text-slate-900 leading-tight truncate">{data.name}</h4>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{data.sector}</p>
          </div>
        </div>
        <div className="text-left shrink-0">
          <p className="text-[8px] font-black text-slate-400 uppercase mb-1 tracking-wider">التقييم</p>
          <p className="text-lg font-black text-emerald-600 leading-none">{data.valuation}</p>
        </div>
      </div>

      {/* Simplified Path */}
      <div className="space-y-4 relative">
        <div className="absolute top-2 right-4 w-[1.5px] h-[calc(100%-16px)] bg-slate-100 group-hover:bg-indigo-100 transition-colors" />

        <div className="relative pr-10">
          <div className="absolute top-1 right-0 w-8 h-8 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-50 border-2 border-rose-400" />
          </div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[9px] font-black text-rose-600 uppercase tracking-wider">المشكلة</span>
          </div>
          <p className="text-slate-500 text-[11px] font-bold leading-relaxed">{data.problem}</p>
        </div>

        <div className="relative pr-10">
          <div className="absolute top-1 right-0 w-8 h-8 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-50 border-2 border-indigo-400" />
          </div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-wider">الحل</span>
          </div>
          <p className="text-slate-900 text-[11px] font-black leading-relaxed">{data.solution}</p>
        </div>

        <div className="relative pr-10">
          <div className="absolute top-1 right-0 w-8 h-8 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-50 border-2 border-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-wider">الأثر</span>
          </div>
          <p className="text-slate-500 text-[11px] font-bold leading-relaxed">{data.impact}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-5 border-t border-slate-50 flex justify-between items-center">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-lg text-[8px] font-black text-slate-500 uppercase border border-slate-100">
          <Activity size={10} className="text-indigo-400" /> قيادة السوق
        </div>
        <button className="text-[10px] font-black text-indigo-600 flex items-center gap-1.5 group/btn">
          التشريح الكامل 
          <ArrowRight size={12} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </div>
);

export const UnicornAnatomy = () => {
  return (
    <section className="py-10 sm:py-14 px-5 sm:px-10 lg:px-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto" dir="rtl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-200 shadow-sm">
               <CircleDot size={12} /> الهندسة العكسية
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">
               تشريح نماذج النجاح
            </h2>
            <p className="text-slate-400 font-bold text-[12px] sm:text-sm max-w-2xl">
               كيف تحولت فجوات الألم إلى شركات بمليارات الدولارات؟ حلل المسار الاستراتيجي لأنجح الشركات العالمية.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {cases.map((c, i) => (
            <AnatomyCard key={i} data={c} />
          ))}
        </div>
      </div>
    </section>
  );
};
