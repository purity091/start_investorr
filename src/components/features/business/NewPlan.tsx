
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Rocket, 
  ShoppingBag, 
  Utensils, 
  Briefcase, 
  Wand2, 
  Laptop, 
  Scissors, 
  GraduationCap, 
  Lightbulb,
  ChevronLeft,
  Sparkles,
  Layers,
  Zap,
  ArrowRight,
  Heart,
  LayoutGrid
} from 'lucide-react';
import SmartBeginnerPro from '../../../features/easy-mode/SmartBeginnerPro';
import { IdeaCreation, CreationMode } from './IdeaCreation';

interface Template {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
  color: string;
  isPopular?: boolean;
}

const TEMPLATES: Template[] = [
  {
    id: 'tech',
    title: 'شركة تقنية ناشئة',
    description: 'قالب شامل للشركات الناشئة في مجال البرمجيات والتقنية.',
    icon: Laptop,
    category: 'تقنية',
    color: 'bg-blue-500',
    isPopular: true
  },
  {
    id: 'restaurant',
    title: 'مطعم أو مقهى',
    description: 'خطة عمل تركز على التميز في الموقع وفي تجربة العميل.',
    icon: Utensils,
    category: 'أغذية ومشروبات',
    color: 'bg-orange-500',
    isPopular: true
  },
  {
    id: 'retail',
    title: 'متجر إلكتروني',
    description: 'خطة متكاملة للتجارة الإلكترونية والبيع بالتجزئة.',
    icon: ShoppingBag,
    category: 'تجارة إلكترونية',
    color: 'bg-indigo-500'
  },
  {
    id: 'consulting',
    title: 'خدمات استشارية',
    description: 'للخبراء والمستشارين الذين يقدمون خدمات مهنية.',
    icon: Briefcase,
    category: 'استشارات',
    color: 'bg-emerald-500'
  },
  {
    id: 'beauty',
    title: 'صالون تجميل',
    description: 'خطة مخصصة لمراكز العناية والجمال والخدمات الشخصية.',
    icon: Scissors,
    category: 'خدمات شخصية',
    color: 'bg-rose-500'
  },
  {
    id: 'education',
    title: 'مركز تدريب',
    description: 'للمؤسسات التعليمية ومراكز التدريب وورش العمل التعليمة.',
    icon: GraduationCap,
    category: 'تعليم',
    color: 'bg-amber-500'
  }
];

export const NewPlan: React.FC<{ 
  onStart: (id: string) => void;
  onBuildPlan?: () => void;
  setSubTabLabel: (label: string | null) => void;
  subTabLabel?: string | null;
  initialMode?: 'selection' | 'easy' | 'family' | 'bmc' | 'mit24';
}> = ({ onStart, onBuildPlan, setSubTabLabel, subTabLabel, initialMode = 'selection' }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mode, setMode] = useState<'selection' | 'easy' | 'ai' | 'family' | 'bmc' | 'mit24'>(initialMode);

  useEffect(() => {
    if (!subTabLabel) {
      setMode(initialMode);
    }
  }, [subTabLabel, initialMode]);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  if (mode === 'easy') {
    return <SmartBeginnerPro />;
  }

  if (mode === 'ai' || mode === 'family' || mode === 'bmc' || mode === 'mit24') {
    return (
      <IdeaCreation 
        initialMode={mode as CreationMode} 
        onBuildPlan={onBuildPlan}
        onBack={() => {
          setMode('selection');
          setSubTabLabel(null);
        }} 
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-16" dir="rtl">
      
      {/* 1. COMPACT HERO */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">ابدأ خطة عملك الآن</h1>
        <p className="text-slate-400 font-bold text-sm max-w-xl mx-auto opacity-80">
          اختر المسار الأنسب للمرحلة الحالية لمشروعك الاستثماري.
        </p>
      </div>

      {/* 2. DENSE CHOICE GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* FAMILY MODE CARD */}
        <button 
          onClick={() => {
            setMode('family');
            setSubTabLabel('مود الأهل');
          }}
          className="group relative overflow-hidden bg-white border border-rose-100 p-5 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-rose-100/60 transition-all duration-500 text-right"
        >
          <div className="absolute top-0 left-0 p-2 opacity-[0.06] text-rose-400"><Heart size={60} /></div>
          <div className="flex flex-col gap-3 relative z-10">
            <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <Heart size={20} strokeWidth={2.5} fill="currentColor" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
                <h3 className="text-sm font-black tracking-tight leading-tight text-slate-950">مود الأهل</h3>
                <span className="bg-rose-50 text-rose-700 border border-rose-100 text-[9px] px-2 py-0.5 rounded-full font-black uppercase shrink-0 leading-none">سهل</span>
              </div>
              <p className="text-slate-700 font-bold text-[10px] leading-relaxed line-clamp-2">صغ فكرتك بكلمات بسيطة لتشرحها بوضوح.</p>
            </div>
          </div>
        </button>

        {/* EASY MODE CARD */}
        <button 
          onClick={() => onStart('easy')}
          className="group relative overflow-hidden bg-white border border-emerald-100 p-5 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-emerald-100/60 transition-all duration-500 text-right"
        >
          <div className="absolute top-0 left-0 p-2 opacity-[0.06] text-emerald-400"><Zap size={60} /></div>
          <div className="flex flex-col gap-3 relative z-10">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <Zap size={20} strokeWidth={2.5} fill="currentColor" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
                <h3 className="text-sm font-black tracking-tight leading-tight text-slate-950">النموذج الاحترافي</h3>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] px-2 py-0.5 rounded-full font-black uppercase shrink-0 leading-none">ناشئ</span>
              </div>
              <p className="text-slate-700 font-bold text-[10px] leading-relaxed line-clamp-2">تحليل فكرتك عبر 8 أسئلة ذكية مبسطة.</p>
            </div>
          </div>
        </button>

        {/* AI MODE CARD */}
        <button 
          onClick={() => {
            setMode('ai');
            setSubTabLabel('التوليد الذكي (AI)');
          }}
          className="group relative overflow-hidden bg-white border border-indigo-100 p-5 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-indigo-100/60 transition-all duration-500 text-right"
        >
          <div className="absolute top-0 left-0 p-2 opacity-[0.06] text-indigo-400"><Sparkles size={60} /></div>
          <div className="flex flex-col gap-3 relative z-10">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <Wand2 size={20} strokeWidth={2.5} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
                <h3 className="text-sm font-black tracking-tight leading-tight text-slate-950">التوليد الذكي (AI)</h3>
              </div>
              <p className="text-slate-700 font-bold text-[10px] leading-relaxed line-clamp-2">الذكاء الاصطناعي يبني لك الهيكل الاستراتيجي آلياً.</p>
            </div>
          </div>
        </button>

        {/* SCRATCH CARD */}
        <button 
          onClick={() => onStart('scratch')}
          className="group relative overflow-hidden bg-white border border-slate-100 p-5 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-500 text-right"
        >
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-inner">
              <Plus size={20} strokeWidth={3} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
                <h3 className="text-sm font-black text-slate-900 tracking-tight leading-tight">البدء من الصفر</h3>
              </div>
              <p className="text-slate-400 font-bold text-[10px] leading-relaxed line-clamp-2">تحكم كامل في كل تفاصيل الخطة خطوة بخطوة.</p>
            </div>
          </div>
        </button>

        {/* BMC CARD */}
        <button 
          onClick={() => {
            setMode('bmc');
            setSubTabLabel('Business Canvas');
          }}
          className="group relative overflow-hidden bg-white border border-teal-100 p-5 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-teal-100/60 transition-all duration-500 text-right"
        >
          <div className="absolute top-0 left-0 p-2 opacity-[0.06] text-teal-400"><LayoutGrid size={60} /></div>
          <div className="flex flex-col gap-3 relative z-10">
            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <LayoutGrid size={20} strokeWidth={2} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
                <h3 className="text-sm font-black tracking-tight leading-tight text-slate-950">Business Canvas</h3>
                <span className="bg-teal-50 text-teal-700 border border-teal-100 text-[9px] px-2 py-0.5 rounded-full font-black uppercase shrink-0 leading-none">9 حقول</span>
              </div>
              <p className="text-slate-700 font-bold text-[10px] leading-relaxed line-clamp-2">لوحة نموذج العمل الكلاسيكية بشكل تفاعلي.</p>
            </div>
          </div>
        </button>

        {/* MIT24 CARD */}
        <button 
            onClick={() => {
              setMode('mit24');
              setSubTabLabel('MIT 24 Steps');
            }}
          className="group relative overflow-hidden bg-white border border-amber-100 p-5 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-amber-100/60 transition-all duration-500 text-right"
        >
          <div className="absolute top-0 left-0 p-2 opacity-[0.06] text-amber-400"><Rocket size={60} /></div>
          <div className="flex flex-col gap-3 relative z-10">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <Rocket size={20} strokeWidth={2} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
                <h3 className="text-sm font-black tracking-tight leading-tight text-slate-950">MIT 24 Steps</h3>
                <span className="bg-amber-50 text-amber-700 border border-amber-100 text-[9px] px-2 py-0.5 rounded-full font-black uppercase shrink-0 leading-none">متقدم</span>
              </div>
              <p className="text-slate-700 font-bold text-[10px] leading-relaxed line-clamp-2">منهج بيل أوليت — 20 خطوة انضباطية تأسيسية.</p>
            </div>
          </div>
        </button>
      </div>

      {/* 3. DENSE TEMPLATES SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Layers className="text-indigo-600" size={20} />
            القوالب الاستراتيجية
          </h2>
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">تحديثات مستمرة</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEMPLATES.map((template) => (
            <div 
              key={template.id}
              onClick={() => onStart(template.id)}
              className="group cursor-pointer relative bg-white border border-slate-100 rounded-[1.5rem] p-5 hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 ${template.color} text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <template.icon size={20} />
                </div>
                {template.isPopular && (
                  <span className="bg-amber-50 text-amber-600 text-[8px] font-black px-2 py-0.5 rounded-full border border-amber-100 uppercase tracking-tight">
                    شائع
                  </span>
                )}
              </div>

              <h4 className="text-md font-black text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
                {template.title}
              </h4>
              <p className="text-slate-400 font-bold text-[10px] leading-relaxed mb-6 line-clamp-2">
                {template.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{template.category}</span>
                <button className="flex items-center gap-1 text-[10px] font-black text-indigo-600 group/btn">
                  فتح القالب
                  <ChevronLeft size={12} className="group-hover/btn:-translate-x-1 transition-transform" />
                </button>
              </div>

              <div className={`absolute top-0 right-0 w-1 h-full ${template.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. COMPACT GUIDANCE */}
      <div className="bg-slate-50/50 border border-slate-100 rounded-[1.5rem] p-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-right shadow-inner">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
          <Lightbulb size={20} />
        </div>
        <div className="flex-1">
          <h4 className="text-md font-black text-slate-900 mb-0.5">هل تحتاج لمساعدة الخبراء؟</h4>
          <p className="text-slate-400 font-bold text-[11px]">تواصل مع مستشار أعمالنا الذكي للحصول على ترشيح مخصص لفكرتك.</p>
        </div>
        <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black hover:bg-black transition-all shadow-lg whitespace-nowrap">
          استشر الخبير الآن
        </button>
      </div>

    </div>
  );
};
