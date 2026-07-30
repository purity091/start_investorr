import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  Activity, 
  Lightbulb, 
  Zap, 
  Target, 
  Cpu, 
  AlertCircle,
  Beaker,
  Rocket,
  TrendingUp,
  Globe,
  CheckCircle2,
  ShieldCheck,
  Briefcase,
  Database,
  PieChart,
  CircleDollarSign,
  LayoutGrid,
  Users,
  Puzzle,
  MessageSquare,
  Map as MapIcon,
  RefreshCw,
  Truck,
  GraduationCap,
  BarChart3,
  Heart,
  Share2,
  Microscope,
  Settings2,
  Cloud,
  FileText,
  Search,
  Layout,
  Layers,
  Smartphone,
  Wifi,
  Lock,
  Globe2
} from 'lucide-react';
import { Problem, Sector, SubSector } from './types';
import { ScoreBadge, CountryTag, CountryList } from './SubComponents';
import { BUDGET_TIERS, B2X_MODELS } from './constants';

const IconMap: Record<string, any> = {
  'beaker': Beaker,
  'rocket': Rocket,
  'trending-up': TrendingUp,
  'shield-check': ShieldCheck,
  'briefcase': Briefcase,
  'database': Database,
  'chart-pie': PieChart,
  'currency-dollar': CircleDollarSign,
  'view-grid': LayoutGrid,
  'lightning-bolt': Zap,
  'user-group': Users,
  'puzzle': Puzzle,
  'chat-alt-2': MessageSquare,
  'map': MapIcon,
  'refresh': RefreshCw,
  'truck': Truck,
  'academic-cap': GraduationCap,
  'chart-bar': BarChart3,
  'heart': Heart,
  'cpu': Cpu,
  'share': Share2,
  'chip': Microscope,
  'globe': Globe,
  'globe-alt': Globe2,
  'adjustments': Settings2,
  'cloud': Cloud,
  'file-text': FileText,
  'search': Search,
  'layout': Layout,
  'layers': Layers,
  'smartphone': Smartphone,
  'wifi': Wifi,
  'lock': Lock,
  'check-circle': CheckCircle2
};

interface OpportunityDetailProps {
  selectedProblem: Problem;
  selectedSector: Sector | null;
  selectedSub: SubSector | null;
  lastView: string;
  setView: (v: any) => void;
  goToProblems: (sub: SubSector) => void;
}

export const OpportunityDetail: React.FC<OpportunityDetailProps> = ({
  selectedProblem,
  selectedSector,
  selectedSub,
  lastView,
  setView,
  goToProblems
}) => {
  return (
    <motion.div 
      key="opportunity" initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.99 }}
      className="bg-white rounded-[2rem] sm:rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col"
    >
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 via-rose-500 to-amber-500" />
        
        {/* Internal Padding Wrapper */}
        <div className="p-6 sm:p-10 lg:p-14">
          {/* Header: Navigation & Context */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
            <button 
              onClick={() => {
                if (lastView === 'b2x_problems') setView('b2x_problems');
                else if (lastView === 'budget_problems') setView('budget_problems');
                else if (lastView === 'market_problems') setView('market_problems');
                else if (lastView === 'search_results') setView('search_results'); 
                else selectedSub && goToProblems(selectedSub);
              }}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-xs font-black bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 group/back w-fit"
            >
              <ArrowRight size={16} className="rotate-180 group-hover/back:translate-x-1 transition-transform" />
              <span>العودة لرادار الاستكشاف</span>
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
                ID: {selectedProblem.id.toUpperCase()}
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-100 text-amber-600 text-[10px] font-black">
                <Activity size={12} />
                <span>تحليل استخباري مباشر</span>
              </div>
            </div>
          </div>

          {/* Main Grid: Problem & Strategic Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left: Problem Content (8 Columns) */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                {/* Breadcrumbs Trail */}
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap">
                  {lastView === 'sectors' || lastView === 'problems' || lastView === 'subs' ? (
                    <>
                      <button onClick={() => setView('sectors')} className="hover:text-indigo-600 transition-colors uppercase">بوابة القطاعات</button>
                      <ArrowLeft size={10} className="shrink-0 rotate-180" />
                      <button onClick={() => { setView('subs'); }} className="hover:text-indigo-600 transition-colors uppercase">{selectedSector?.name || 'القطاع'}</button>
                      {selectedSub && (
                        <>
                          <ArrowLeft size={10} className="shrink-0 rotate-180" />
                          <button onClick={() => { goToProblems(selectedSub); }} className="hover:text-indigo-600 transition-colors uppercase">{selectedSub.name}</button>
                        </>
                      )}
                    </>
                  ) : lastView === 'budget_problems' ? (
                    <>
                      <button onClick={() => setView('budget_tiers')} className="hover:text-indigo-600 transition-colors uppercase">ميزانيات الاستثمار</button>
                      <ArrowLeft size={10} className="shrink-0 rotate-180" />
                      <button onClick={() => setView('budget_problems')} className="hover:text-indigo-600 transition-colors uppercase">{BUDGET_TIERS.find(t => t.id === selectedProblem.budget)?.title}</button>
                    </>
                  ) : lastView === 'b2x_problems' ? (
                    <>
                      <button onClick={() => setView('b2x_gateway')} className="hover:text-indigo-600 transition-colors uppercase">نماذج الأعمال الاستراتيجية</button>
                      <ArrowLeft size={10} className="shrink-0 rotate-180" />
                      <button onClick={() => setView('b2x_problems')} className="hover:text-indigo-600 transition-colors uppercase">{B2X_MODELS.find(m => m.id === selectedProblem.b2x)?.title}</button>
                    </>
                  ) : lastView === 'market_problems' ? (
                    <>
                      <button onClick={() => setView('continents_gateway')} className="hover:text-indigo-600 transition-colors uppercase">استخبارات الأسواق</button>
                      <ArrowLeft size={10} className="shrink-0 rotate-180" />
                      <button onClick={() => setView('market_problems')} className="hover:text-indigo-600 transition-colors uppercase">سجل الفجوات المكتشفة</button>
                    </>
                  ) : null}
                  <ArrowLeft size={10} className="shrink-0 rotate-180" />
                  <span className="text-indigo-600 uppercase">تحليل الثغرة</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black border border-slate-200">
                     <Target size={14} className="text-slate-400" />
                     <span>{selectedSector?.name || "قطاع تقني"}</span>
                  </div>
                  {selectedProblem.b2x && (
                    <div className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">
                       {selectedProblem.b2x}
                    </div>
                  )}
                  <div className="h-6 w-px bg-slate-200" />
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black text-slate-300 uppercase">المناطق:</span>
                     <CountryList countryIds={selectedProblem.countries} />
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-[1.15]">{selectedProblem.title}</h2>
                <p className="text-base sm:text-xl font-medium text-slate-500 leading-relaxed max-w-4xl">{selectedProblem.desc}</p>
              </div>

              {/* Market Moat Section: Strategic Motivator */}
              <div className="pt-12 border-t border-slate-100">
                <div className="bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
                  {/* Decorative Background Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/5 blur-[80px] rounded-full" />
                  
                  <div className="relative flex flex-col lg:flex-row gap-10 items-start">
                    <div className="lg:w-1/3">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md text-white rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-xl">
                        <AlertCircle size={32} className="text-rose-400" />
                      </div>
                      <h4 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">لماذا لم تُحل المشكلة حتى الآن؟</h4>
                      <p className="text-sm font-bold text-slate-400 leading-relaxed">
                        تحليل استخباري للعوائق التاريخية التي منعت الحلول التقليدية من اختراق هذه الفجوة السوقية.
                      </p>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(selectedProblem.whyNotSolved || [
                        'وجود أنظمة قديمة (Legacy) صعبة التحديث.',
                        'غياب التنسيق بين الأطراف الفاعلة في السوق.',
                        'الحاجة لتقنيات متقدمة لم تكن متاحة سابقاً.',
                        'تعقيد اللوائح التنظيمية في النطاقات الجغرافية.'
                      ]).map((txt, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-sm p-6 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group">
                          <div className="flex items-start gap-4">
                             <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 text-xs font-black group-hover:scale-110 transition-transform">
                                {i + 1}
                             </div>
                             <span className="text-sm font-bold text-slate-200 leading-relaxed">{txt}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Solutions Section */}
              <div className="pt-8 border-t border-slate-100">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                       <Lightbulb size={24} />
                    </div>
                    <div>
                       <h3 className="text-xl sm:text-2xl font-black text-slate-900">المقترحات الاستثمارية</h3>
                       <p className="text-xs sm:text-sm font-bold text-slate-400">نماذج أعمال صُممت خصيصاً لاحتكار هذه الفجوة</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedProblem.opps.map((opp, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:border-indigo-300 transition-all group/opp relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50/50 to-transparent -z-10 rounded-bl-full" />
                        <div className="flex justify-between items-start mb-6">
                           <span className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-black border border-slate-100">{opp.type}</span>
                           <Zap size={18} className="text-indigo-400 group-hover/opp:fill-indigo-400 transition-all" />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-2">{opp.name}</h4>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8 flex-1">{opp.model}</p>
                        <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2">
                           توليد خطة العمل الكاملة <ArrowLeft size={16} />
                        </button>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Implementation Roadmap */}
              <div className="pt-12">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-100">
                       <Activity size={24} />
                    </div>
                    <div>
                       <h3 className="text-xl sm:text-2xl font-black text-slate-900">{selectedProblem.roadmap?.title || 'خارطة الطريق السريعة (0-6 أشهر)'}</h3>
                       <p className="text-xs sm:text-sm font-bold text-slate-400">{selectedProblem.roadmap?.subtitle || 'خطوات مدروسة للانتشار وتثبيت الأقدام في السوق'}</p>
                    </div>
                 </div>
                 <div className="bg-slate-50/50 border border-slate-100 rounded-[2.5rem] p-8 space-y-8">
                    {(selectedProblem.roadmap?.phases || [
                      { title: 'مرحلة التأسيس (النموذج الأولي)', description: 'بناء واجهة برمجية مصغرة (MVP) لربط مقدم الخدمة بالمستهلك واختبار جودة البيانات.', icon: 'beaker', color_theme: 'indigo' },
                      { title: 'مرحلة اختراق السوق', description: 'الاستحواذ على أول 500 مستخدم نشط من خلال حملات استخباراتية موجهة للشرائح الأكثر تضرراً.', icon: 'rocket', color_theme: 'rose' },
                      { title: 'نطاق التوسع المحلي', description: 'الربط مع الأنظمة الوطنية المكملة وفتح بوابات واجهة التطبيق البرمجية (API) للشركاء.', icon: 'trending-up', color_theme: 'emerald' }
                    ]).map((step: any, idx: number, arr: any[]) => {
                      const StepIcon = IconMap[step.icon] || Zap;
                      const colorClass = step.color_theme === 'rose' ? 'text-rose-500' : step.color_theme === 'emerald' ? 'text-emerald-500' : 'text-indigo-500';

                      return (
                        <div key={idx} className="flex gap-6 relative">
                           {idx < arr.length - 1 && <div className="absolute top-10 right-5 w-0.5 h-16 bg-slate-200" />}
                           <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center z-10">
                              <StepIcon size={20} className={colorClass} />
                           </div>
                           <div className="flex-1">
                              <h4 className="text-base font-black text-slate-900 mb-1">{step.title || step.t}</h4>
                              <p className="text-sm font-medium text-slate-500 leading-relaxed">{step.description || step.d}</p>
                           </div>
                        </div>
                      );
                    })}
                 </div>
              </div>
            </div>

            {/* Right: Strategic Sidebar (4 Columns) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Dynamic Scores */}
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-6 shadow-2xl">
                 <h3 className="text-lg font-black text-indigo-300 pb-4 border-b border-white/10 uppercase tracking-widest text-center">المصفوفة الاستراتيجية</h3>
                 <ScoreBadge label="شدة احتياج السوق (Pain)" score={selectedProblem.pain} colorClass="text-rose-400" />
                 <ScoreBadge label="السيولة المتاحة (TAM)" score={selectedProblem.money} colorClass="text-emerald-400" />
                 <ScoreBadge label="صعوبة المنافسة (Moat)" score={selectedProblem.gap} colorClass="text-amber-400" />
                 <div className="pt-4 text-center">
                    <p className="text-[10px] font-bold text-slate-500 leading-relaxed">بناءً على تحليل 150+ نقطة بيانات جغرافية وتقنية</p>
                 </div>
              </div>



              {/* Recommended Tech Stack */}
              <div className="bg-white border border-slate-200 rounded-[2rem] p-8">
                 <h4 className="font-black text-slate-900 mb-5 flex items-center gap-2">
                    <Cpu size={18} className="text-indigo-600" /> الترسانة التقنية الموصى بها
                 </h4>
                 <div className="flex flex-wrap gap-2">
                    {(selectedProblem.techStack || ['Generative AI', 'Cloud Infrastructure', 'Real-time API', 'Advanced Security', 'Data Analytics']).map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-[10px] font-black rounded-lg border border-slate-100">{tech}</span>
                    ))}
                 </div>
              </div>

              {/* Risk Indicator */}
              <div className="bg-rose-50 border border-rose-100 rounded-[2rem] p-8">
                 <h4 className="font-black text-rose-900 mb-3 flex items-center gap-2">
                    <AlertCircle size={18} /> مؤشر المخاطر الرئيسي
                 </h4>
                 <p className="text-xs font-bold text-rose-800/70 leading-relaxed">
                    {selectedProblem.mainRisk || "الاعتماد السلوكي للمستخدمين هو التحدي الأكبر. يتطلب الحل تصميم تجربة مستخدم (UX) فائقة البساطة لضمان الانتقال من الطرق التقليدية."}
                 </p>
              </div>
            </div>
          </div>

          {/* Global Resolution Intelligence Engine (Strategic Case Study) - Explicit Professional Edition */}
          {selectedProblem.globalResolution && (
            <div className="mt-16 -mx-6 sm:-mx-10 lg:-mx-14 bg-white border-t border-slate-100 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
              <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-100 pb-8">
                   <div className="space-y-2">
                      <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em]">
                         <Globe size={14} /> الخريطة العالمية للحلول الاستراتيجية
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-black text-slate-900 leading-none">منصة السوابق والحلول</h3>
                      <p className="text-slate-500 font-medium text-sm sm:text-base">تحليل الدول التي نجحت في سد هذه الفجوة ونماذج إدارتها الحديثة</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                   
                   {/* Left Side: Historical Suffering & Context (4 Columns) */}
                   <div className="lg:col-span-4 space-y-8">
                      <div className="p-6 sm:p-8 bg-rose-50/30 border border-rose-100 rounded-[2.5rem] relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
                         <h4 className="text-base font-black text-rose-900 mb-4 flex items-center gap-2">
                            <AlertCircle size={18} /> سياق الأزمة (المعاناة)
                         </h4>
                         <p className="text-sm font-bold text-rose-800/70 leading-relaxed mb-6">
                            {selectedProblem.globalResolution.historicalContext}
                         </p>
                         <div className="pt-4 border-t border-rose-100">
                            <p className="text-[10px] font-black text-rose-400 uppercase mb-3">دول واجهت نفس الفجوة سابقاً</p>
                            <div className="flex flex-wrap gap-2">
                               {selectedProblem.globalResolution.sufferingCountries.map(c => (
                                 <span key={c} className="px-3 py-1 bg-white text-rose-600 text-[10px] font-black rounded-lg border border-rose-200">{c}</span>
                               ))}
                            </div>
                         </div>
                      </div>

                      {/* Success Conditions - Strategic Checklist */}
                      <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem]">
                         <h4 className="text-base font-black text-slate-900 mb-6 flex items-center gap-2">
                            <Zap size={18} className="text-amber-500" /> ركائز النجاح (Success Pillars)
                         </h4>
                         <div className="space-y-4">
                            {selectedProblem.globalResolution.successConditions.map((cond, i) => (
                              <div key={i} className="flex items-start gap-3">
                                 <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                                    <CheckCircle2 size={12} />
                                 </div>
                                 <span className="text-xs font-black text-slate-600 leading-relaxed">{cond}</span>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* Right Side: Benchmarks & Management Model (8 Columns) */}
                   <div className="lg:col-span-8 space-y-10">
                      
                      {/* 1. Global Success Benchmarks */}
                      <div className="space-y-6">
                         <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <TrendingUp size={20} className="text-emerald-500" /> مراجع النجاح العالمي (Global Benchmarks)
                         </h4>
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {selectedProblem.globalResolution.successCountries.map(country => (
                              <div key={country.name} className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group">
                                 <div className="flex items-center gap-3 mb-3">
                                    <span className="text-2xl group-hover:scale-110 transition-transform">{country.flag}</span>
                                    <span className="text-sm font-black text-slate-900">{country.name}</span>
                                 </div>
                                 <p className="text-[10px] font-bold text-slate-500 leading-relaxed">
                                    {country.reason}
                                 </p>
                              </div>
                            ))}
                         </div>
                      </div>

                      {/* 2. Modern Management Model (How it's managed now) */}
                      <div className="relative group">
                         <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                            <Cpu size={20} className="text-indigo-600" /> نموذج الإدارة الحديثة (Modern Management)
                         </h4>
                         <div className="bg-indigo-50/50 p-8 rounded-[2.5rem] border border-indigo-100 relative group-hover:shadow-xl transition-all">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                               <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-indigo-100 flex items-center justify-center shrink-0">
                                  <Activity size={32} className="text-indigo-600" />
                               </div>
                               <div className="flex-1">
                                  <p className="text-slate-700 text-base font-bold leading-relaxed">
                                     {selectedProblem.globalResolution.currentManagementModel}
                                  </p>
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* 3. Local Actionable Playbook */}
                      <div className="bg-slate-900 rounded-[3rem] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
                         <div className="relative">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                               <div>
                                  <h4 className="text-2xl font-black mb-2 flex items-center gap-3">
                                     خطة التنفيذ في سوقنا المحلي 🎯
                                  </h4>
                                  <p className="text-indigo-300 text-sm font-bold opacity-80">{selectedProblem.globalResolution.localApplication.strategy}</p>
                               </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                               {selectedProblem.globalResolution.localApplication.phases.map((phase, idx) => (
                                 <div key={idx} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/11 transition-all">
                                    <div className="text-[10px] font-black text-indigo-400 uppercase mb-3 tracking-widest">المرحلة 0{idx + 1}</div>
                                    <p className="text-sm font-black leading-relaxed">{phase}</p>
                                 </div>
                               ))}
                            </div>
                            
                            <div className="mt-10 pt-8 border-t border-white/10 text-center">
                               <button className="px-10 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-900/20">تصدير استراتيجية الحل بالكامل</button>
                            </div>
                         </div>
                      </div>

                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
