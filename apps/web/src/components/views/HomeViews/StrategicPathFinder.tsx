import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Target, 
  MapPin, 
  ShieldCheck, 
  Briefcase, 
  Activity, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   STRATEGIC PATH FINDER — "Step-by-Step AI Advisor"
   ═══════════════════════════════════════════════════════════════ */

const STEPS_DATA = [
  {
    step: 1,
    title: 'تحديد الموقع والمرجعية',
    options: [
      { id: 'new', title: 'مستثمر طموح', sub: 'أسعى لاستكشاف فرص ناشئة', icon: Target, hint: 'نبدأ من الصفر' },
      { id: 'scale', title: 'كيان مؤسسي', sub: 'أسعى لتعزيز الحصة السوقية', icon: MapPin, hint: 'تطوير وتوسع' },
      { id: 'protect', title: 'محفظة استثمارية', sub: 'أسعى لتنويع الاستثمارات', icon: ShieldCheck, hint: 'إدارة مخاوف' },
    ]
  },
  {
    step: 2,
    title: 'تحديد الهدف الاستراتيجي',
    options: [
      { id: 'b2b', title: 'قطاع الأعمال B2B', sub: 'بناء شراكات طويلة', icon: Briefcase, hint: 'عقود مستقرة' },
      { id: 'b2c', title: 'المستهلك النهائي B2C', sub: 'حلول سريعة الانتشار', icon: Activity, hint: 'نمو متسارع' },
      { id: 'deeptech', title: 'تقنيات عميقة', sub: 'بحث وتطوير مستدام', icon: BrainCircuit, hint: 'ميزة تنافسية' },
    ]
  },
  {
    step: 3,
    title: 'تحديد الرغبة بالمخاطرة',
    options: [
      { id: 'high', title: 'مخاطرة عالية', sub: 'تطلع لتعظيم العوائد الاستثمارية', icon: Target, hint: 'أسواق غير مطروقة' },
      { id: 'med', title: 'مخاطرة محسوبة', sub: 'استراتيجية نمو متزنة', icon: MapPin, hint: 'موازنة المحفظة' },
      { id: 'low', title: 'مخاطرة منخفضة', sub: 'ضمان استقرار الأصول', icon: ShieldCheck, hint: 'تدفق نقدي مستقر' },
    ]
  }
];

const DecisionCard = ({ icon: Icon, title, sub, hint, onClick, isSelected }: any) => (
  <div 
    onClick={onClick}
    className={`group relative p-5 bg-white border rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 active:scale-95 text-right
      ${isSelected ? 'border-indigo-600 ring-4 ring-indigo-50 shadow-md' : 'border-slate-100 hover:border-indigo-200'}
    `}
  >
    <div className="relative flex flex-col items-center text-center gap-3">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'}`}>
        <Icon size={24} strokeWidth={2} />
      </div>
      <div className="space-y-1">
        <h4 className={`text-sm font-black transition-colors ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>{title}</h4>
        <p className="text-[10px] font-bold text-slate-400 leading-relaxed px-1">{sub}</p>
      </div>
      
      {isSelected && (
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-md animate-in zoom-in-0">
          <CheckCircle2 size={12} />
        </div>
      )}
    </div>
  </div>
);

export const StrategicPathFinder = ({ setActiveTab }: any) => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<any>({});

  const currentStepData = STEPS_DATA.find(s => s.step === step) || STEPS_DATA[0];
  const progress = (step / 3) * 100;

  const handleSelection = (id: string) => {
    setSelections({ ...selections, [step]: id });
    setTimeout(() => {
      if (step < 3) setStep(prev => prev + 1);
      else setStep(4);
    }, 500);
  };

  return (
    <section className="py-10 sm:py-14 px-5 sm:px-10 lg:px-14 bg-white relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[9px] font-black uppercase tracking-widest border border-indigo-100 shadow-sm">
             <BrainCircuit size={12} /> نظام التوجيه الذكي
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
             صمم <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">مسارك الاستراتيجي</span> اليوم
          </h2>
          <p className="text-slate-400 font-bold text-[12px] sm:text-sm max-w-2xl mx-auto">
             دع محرك الذكاء الاصطناعي يحلل موقعك الحالي وأهدافك ليقترح لك المسار الأمثل للانطلاق.
          </p>
        </div>

        {/* Decision Chamber */}
        <div className="bg-white/70 backdrop-blur-xl border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden max-w-4xl mx-auto">
           
           {/* Progress */}
           <div className="absolute top-0 left-0 w-full h-1 bg-slate-100/50">
              <div 
                className="h-full bg-indigo-600 transition-all duration-1000 ease-out"
                style={{ width: `${progress > 100 ? 100 : progress}%` }}
              />
           </div>

           <div className="flex justify-between items-end mb-8">
              <div className="space-y-0.5">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">مرحلة {step <= 3 ? step : 3} من 3</p>
                 <p className="text-xl font-black text-indigo-600">{Math.round(progress > 100 ? 100 : progress)}%</p>
              </div>
              <div className="flex gap-2">
                 {[1, 2, 3].map(s => (
                   <div key={s} className={`w-8 h-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-indigo-600 w-12' : 'bg-slate-100'}`} />
                 ))}
              </div>
           </div>

           <div className="min-h-[320px] flex items-center">
              {step <= 3 ? (
                <div key={`step-${step}`} className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                         <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black italic text-base shadow-md">0{step}</span>
                         <h3 className="text-xl lg:text-2xl font-black text-slate-800">
                            {currentStepData.title}
                         </h3>
                      </div>
                      <p className="text-slate-400 font-bold text-xs mr-10">بناءً على اختيارك، سيتم مواءمة المحرك الأنسب لك.</p>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {currentStepData.options.map((opt) => (
                        <DecisionCard 
                          key={opt.id}
                          icon={opt.icon}
                          title={opt.title}
                          sub={opt.sub}
                          hint={opt.hint}
                          onClick={() => handleSelection(opt.id)}
                          isSelected={selections[step] === opt.id}
                        />
                      ))}
                   </div>
                </div>
              ) : (
                <div key="results" className="w-full py-6 text-center space-y-8 animate-in zoom-in-95 duration-500">
                   <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border-2 border-white shadow-lg">
                      <CheckCircle2 size={40} />
                   </div>
                   
                   <div className="space-y-3">
                      <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">اكتمل المسح الاستراتيجي</p>
                      <h4 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                        تمت المواءمة الذكية
                      </h4>
                      <p className="text-slate-500 font-bold text-sm max-w-lg mx-auto leading-relaxed">
                         بناءً على ملفك، ننصحك بالبدء بـ <span className="text-indigo-600 font-black">استكشاف قطاعات السوق</span> للوصول إلى أعلى إمكانات النمو.
                      </p>
                   </div>

                   <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                      <button 
                        onClick={() => setStep(1)} 
                        className="px-6 py-3 text-[11px] font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest"
                      >
                         إعادة البدء
                      </button>
                      <button 
                        onClick={() => setActiveTab('market-discovery')}
                        className="px-8 py-3.5 bg-slate-900 text-white rounded-xl text-[11px] font-black hover:bg-indigo-600 transition-all flex items-center gap-3 group shadow-lg shadow-indigo-100"
                      >
                         بدء التنفيذ الآن
                         <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                      </button>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </section>
  );
};
