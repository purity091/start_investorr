import React from 'react';
import { 
  Sparkles, 
  Zap, 
  FileCheck, 
  ShieldCheck, 
  ArrowRight,
  Crown,
  Star
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   STRATEGIC UPGRADE — "Premium Command Access"
   ═══════════════════════════════════════════════════════════════ */

export const StrategicUpgrade = ({ setActiveTab }: any) => {
  const features = [
    {
      icon: Zap,
      title: 'تحليل ذكاء غير محدود',
      desc: 'لا قيود على حجم المعالجة أو عدد الأفكار التي تريد تشريحها.'
    },
    {
      icon: FileCheck,
      title: 'تقارير جاهزة للاستثمار',
      desc: 'صدر ملفاتك بصيغ احترافية جاهزة للعرض على شركائك ومستثمريك.'
    },
    {
      icon: ShieldCheck,
      title: 'دعم أولوية حصري',
      desc: 'وصول مباشر لفريق الخبراء لضمان استمرارية عملياتك الاستراتيجية.'
    }
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-5 sm:px-10 lg:px-14 bg-white border-b border-slate-100 relative overflow-hidden text-right">
      <div className="max-w-7xl mx-auto" dir="rtl">
        {/* Section Heading */}
        <div className="space-y-2 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white text-purple-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-200 shadow-sm">
            <Crown size={12} /> ترقية المسار الاستراتيجي
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">
             أطلق العنان لكامل القدرات
          </h2>
          <p className="text-slate-400 font-bold text-[12px] sm:text-sm max-w-2xl">
             انضم إلى أكثر من 1,200 مستثمر يستخدمون النسخة الاحترافية لصياغة سيناريوهات نمو غير محدودة.
          </p>
        </div>

        {/* Upgrade Container */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800" />
          
          <div className="relative z-10 p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 w-full">
                {features.map((f, i) => (
                  <div 
                    key={i}
                    className="bg-white/[0.07] backdrop-blur-md border border-white/[0.1] rounded-xl p-5 text-right hover:bg-white/[0.12] transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform">
                      <f.icon size={18} />
                    </div>
                    <h4 className="text-base font-black text-white mb-1.5">{f.title}</h4>
                    <p className="text-indigo-100/60 text-[10px] font-bold leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="w-full lg:w-fit pt-8 lg:pt-0 lg:pr-10 border-t lg:border-t-0 lg:border-r border-white/10 flex flex-col items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-[9px] font-bold text-white/50 mr-2">4.9/5</span>
                </div>

                <button 
                  onClick={() => setActiveTab('pricing')}
                  className="w-full lg:w-56 px-6 py-3.5 bg-white text-indigo-700 rounded-xl text-[12px] font-black hover:bg-indigo-50 transition-all shadow-lg flex items-center justify-center gap-3 group/btn"
                >
                   استكشف الترقية
                   <ArrowRight size={16} className="rotate-180 group-hover/btn:-translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-[9px] font-black text-indigo-200/40 uppercase tracking-widest">
                   ابدأ الآن دون أي مخاطر
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
