import React from 'react';
import { Compass, Rocket, TrendingUp, ChevronLeft } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   DECISION LAYER — "Strategic Navigation Hub"
   ═══════════════════════════════════════════════════════════════ */

const DecisionCard = ({ icon: Icon, title, desc, action, color, step, onClick }: any) => (
  <div 
    onClick={onClick}
    className="group relative cursor-pointer h-full hover:-translate-y-1.5 transition-all duration-300"
  >
    <div className="relative h-full bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300">
      <div className={`h-1 w-full bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="absolute top-4 left-4 text-[40px] font-black text-slate-50 leading-none select-none group-hover:text-indigo-50/50 transition-colors duration-300">
        {step}
      </div>
 
      <div className="relative p-6 sm:p-7 flex flex-col h-full">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-all duration-300`}>
          <Icon size={24} strokeWidth={2} />
        </div>
 
        <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{title}</h3>
        <p className="text-slate-400 font-bold text-[13px] leading-relaxed mb-8 flex-1">{desc}</p>
 
        <div className={`w-full py-3 px-5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 group-hover:bg-gradient-to-r ${color} group-hover:border-transparent transition-all duration-300`}>
          <span className="text-[10px] font-black text-slate-900 group-hover:text-white uppercase tracking-wider">
            {action}
          </span>
          <ChevronLeft size={16} className="text-slate-400 group-hover:text-white transition-transform group-hover:-translate-x-1" />
        </div>
      </div>
    </div>
  </div>
);

export const DecisionLayer = ({ setActiveTab }: any) => {
  return (
    <section className="px-5 sm:px-10 lg:px-14 py-10 sm:py-14 bg-slate-50/30 border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-2 sm:space-y-3 mb-8 sm:mb-10 text-right">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white text-indigo-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-200 shadow-sm">
             <Compass size={12} /> التوجيه الاستراتيجي
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">
             ما هو موقعك اليوم؟
          </h2>
          <p className="text-slate-400 font-bold text-[12px] sm:text-sm max-w-2xl">
             حدد نقطة البداية المناسبة لرحلتك الاستثمارية، وسنوجهك مباشرة إلى المحرك الأنسب لمرحلتك الحالية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          <DecisionCard 
            step="01"
            icon={Compass}
            title="أسعى لاستكشاف فرص استثمارية واعدة"
            desc="هل تبحث عن نقطة انطلاق؟ دع رادار الذكاء الاصطناعي يحلل الفجوات العالمية ويوجهك نحو القطاع الأكثر مواءمة."
            action="استكشاف الفجوات"
            color="from-indigo-500 to-blue-500"
            onClick={() => setActiveTab('market-discovery')}
          />
          <DecisionCard 
            step="02"
            icon={Rocket}
            title="لدي فكرة وأسعى لبناء خطة استراتيجية"
            desc="هل تمتلك رؤية واضحة؟ استخدم محرر خطط العمل الاحترافي لصياغة مشروعك ورسم خريطة التنفيذ بدقة."
            action="بدء بناء خطة العمل"
            color="from-emerald-500 to-teal-500"
            onClick={() => setActiveTab('new-plan')}
          />
          <DecisionCard 
            step="03"
            icon={TrendingUp}
            title="أواجه تحدياً وأبحث عن حلول مبتكرة"
            desc="هل تواجه عائقاً في قطاع معين؟ ابحث في محرك المشكلات العالمية واستلهم الحلول الاستراتيجية المبتكرة."
            action="فتح محرك الحلول"
            color="from-violet-500 to-purple-500"
            onClick={() => setActiveTab('problem-engine')}
          />
        </div>
      </div>
    </section>
  );
};
