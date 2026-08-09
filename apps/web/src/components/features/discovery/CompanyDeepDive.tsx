
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  Zap, 
  Target, 
  Users, 
  Globe, 
  BarChart3, 
  Shield, 
  Rocket, 
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Share2,
  Bookmark,
  Award,
  Sparkles,
  ArrowLeft,
  Download,
  Info,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { companyDeepDives, CompanyDeepDive as CompanyDeepDiveType } from '../../../data/companyDeepDives';

interface CompanyDeepDiveProps {
  companyId?: string;
  onBack: () => void;
}

export const CompanyDeepDive: React.FC<CompanyDeepDiveProps> = ({ companyId, onBack }) => {
  const [company, setCompany] = useState<CompanyDeepDiveType | null>(null);
  const [activeSection, setActiveSection] = useState('problem');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (companyId) {
      const found = companyDeepDives.find(c => c.id === companyId);
      setCompany(found || companyDeepDives[0]);
    } else {
      setCompany(companyDeepDives[0]);
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      const sectionIds = ['problem', 'solution', 'impact', 'strategy', 'lessons'];
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [companyId]);

  if (!company) return null;

  const Icon = company.icon;

  const sections = [
    { id: 'problem', label: 'المشكلة', icon: Target },
    { id: 'solution', label: 'الحل', icon: Lightbulb },
    { id: 'impact', label: 'الأثر', icon: BarChart3 },
    { id: 'strategy', label: 'الاستراتيجية', icon: Rocket },
    { id: 'lessons', label: 'الدروس', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-slate-50/30 font-['IBM_Plex_Sans_Arabic'] overflow-x-hidden selection:bg-indigo-100" dir="rtl">
      {/* ── Progress Bar ── */}
      <div className="fixed top-0 left-0 h-1 bg-indigo-600 z-[100] transition-all duration-300" style={{ width: `${scrollProgress}%` }} />

      {/* ── Compact Header ── */}
      <header className="sticky top-0 z-[60] bg-white/90 backdrop-blur-xl border-b border-slate-200/60 px-4 sm:px-6 h-14 sm:h-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                <ArrowLeft size={14} className="rotate-180" />
              </div>
              <span className="hidden sm:inline text-xs font-black">عودة</span>
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2.5">
               <div className={`w-8 h-8 rounded-lg ${company.color} flex items-center justify-center text-white text-xs font-black shadow-md`}>
                 {company.logo}
               </div>
               <h2 className="text-sm font-black text-slate-900">{company.name}</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
             <button onClick={() => window.print()} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-black hover:bg-slate-800 transition-all">
               <Download size={12} /> طباعة الدراسة
             </button>
             <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
               <Share2 size={16} />
             </button>
          </div>
        </div>
      </header>

      {/* ── Refined Hero Section ── */}
      <section className="relative bg-white border-b border-slate-100 pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
        
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100/50">
                <Sparkles size={12} />
                <span className="text-[9px] font-black uppercase tracking-widest">دراسة استراتيجية</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
                تشريح نموذج نجاح <span className="text-indigo-600">{company.name}</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-500 font-bold leading-relaxed max-w-2xl">
                {company.impact.description}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex flex-col gap-0.5 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">التقييم</span>
                  <span className="text-xl font-black text-emerald-600">{company.valuation}</span>
                </div>
                <div className="flex flex-col gap-0.5 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">القطاع</span>
                  <span className="text-base font-black text-slate-900">{company.sector}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
               <div className={`w-48 h-48 sm:w-64 sm:h-64 rounded-[3rem] ${company.color} flex items-center justify-center text-6xl sm:text-8xl font-black text-white shadow-2xl relative overflow-hidden animate-in zoom-in duration-700`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  {company.logo}
               </div>
               
               {/* Metrics Badges */}
               <div className="absolute -bottom-4 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 w-full max-w-[280px] grid grid-cols-2 gap-2 bg-white p-3 rounded-2xl shadow-xl border border-slate-100">
                  {company.impact.metrics.slice(0, 2).map((m, i) => (
                    <div key={i} className="text-center p-2 rounded-xl bg-slate-50">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{m.label}</p>
                      <p className="text-sm font-black text-slate-900">{m.value}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sub-Navigation ── */}
      <nav className="sticky top-14 sm:top-16 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60 overflow-x-auto no-scrollbar">
        <div className="max-w-6xl mx-auto px-4 flex justify-center sm:justify-start gap-4 sm:gap-8 h-12">
          {sections.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSection(s.id);
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`relative flex items-center px-1 text-[11px] sm:text-xs font-black transition-all ${
                  isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {s.label}
                {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── Content Area ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16 sm:space-y-24">
        
        {/* Problem Section */}
        <section id="problem" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-32">
          <div className="lg:col-span-4 sticky top-32">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                <Target size={20} />
              </div>
              <h2 className="text-xl font-black text-slate-900">المشكلة والدافع</h2>
            </div>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">تحليل الفجوة التي استغلتها {company.name}</p>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-lg sm:text-xl text-slate-700 font-bold leading-relaxed">
                {company.problem.description}
              </p>
            </div>
            <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100/50 flex items-start gap-4">
              <AlertCircle className="text-rose-500 shrink-0" size={18} />
              <p className="text-sm font-bold text-rose-900 leading-relaxed">
                <span className="font-black">الأثر المباشر:</span> {company.problem.impact}
              </p>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-32">
          <div className="lg:col-span-4 sticky top-32">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Lightbulb size={20} />
              </div>
              <h2 className="text-xl font-black text-slate-900">الحل المبتكر</h2>
            </div>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">كيف أعادت تعريف قواعد اللعبة</p>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <p className="text-lg text-slate-700 font-bold leading-relaxed">
                {company.solution.description}
              </p>
              <div className="pt-6 border-t border-slate-50">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3">
                  <Zap size={12} fill="currentColor" /> ميزة الاختراق
                </div>
                <p className="text-lg font-black text-slate-900">{company.solution.keyFeature}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section id="strategy" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-32">
          <div className="lg:col-span-4 sticky top-32">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Rocket size={20} />
              </div>
              <h2 className="text-xl font-black text-slate-900">استراتيجية النمو</h2>
            </div>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">المحركات الثلاثة للسيطرة على السوق</p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 gap-4">
            {company.strategy.points.map((point, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:border-indigo-100 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-xs font-black text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  {i + 1}
                </div>
                <p className="text-base font-bold text-slate-700 leading-relaxed pt-1">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Lessons Section */}
        <section id="lessons" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-32">
          <div className="lg:col-span-4 sticky top-32">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <Award size={20} />
              </div>
              <h2 className="text-xl font-black text-slate-900">الدروس المستفادة</h2>
            </div>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">خلاصات لرائد الأعمال</p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {company.lessons.map((lesson, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
                <CheckCircle2 size={18} className="text-amber-500" />
                <p className="text-sm font-black text-slate-800 leading-relaxed">
                  {lesson}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Compact CTA */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 text-center text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent opacity-50" />
           <div className="relative z-10 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-black">جاهز لمحاكاة هذا النجاح؟</h3>
              <p className="text-slate-400 font-bold text-sm max-w-xl mx-auto">
                استخدم أدوات Startup OS لتبدأ ببناء نموذج عملك بنفس الاستراتيجيات التي قادت {company.name} للعالمية.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                 <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-900 rounded-xl font-black text-sm hover:scale-105 transition-all">
                    ابدأ بناء مشروعك الآن
                 </button>
                 <button className="w-full sm:w-auto px-8 py-3.5 bg-white/10 text-white rounded-xl font-black text-sm border border-white/10 hover:bg-white/20">
                    تصفح المزيد من الدراسات
                 </button>
              </div>
           </div>
        </div>

      </main>

      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">STARTUP OS Intelligence Lab</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
};
