
import React, { useState, useMemo } from 'react';
import { 
  ArrowRightLeft, 
  CheckCircle2, 
  ChevronLeft, 
  FileText, 
  Zap, 
  BrainCircuit, 
  ArrowUpRight, 
  TrendingUp,
  X,
  Target,
  Sparkles,
  ShieldCheck,
  Activity,
  Plus,
  BarChart4,
  PieChart,
  Calculator,
  AlertTriangle,
  Layers,
  ArrowRight
} from 'lucide-react';

interface StrategicMetrics {
  marketSize: string;
  roi: number;
  breakEven: number;
  riskLevel: 'low' | 'medium' | 'high';
  scalability: number;
}

interface Plan {
  id: string;
  title: string;
  category: string;
  progress: number;
  aiScore: number;
  lastEdited: string;
  metrics: StrategicMetrics;
  radarData: number[]; // [Tech, Market, Team, Financial, Ops]
}

const MOCK_PLANS: Plan[] = [
  { 
    id: '1', title: 'منصة التجارة الهجينة', category: 'E-commerce', progress: 95, aiScore: 92, lastEdited: 'منذ يومين',
    metrics: { marketSize: '$2.5M', roi: 450, breakEven: 8, riskLevel: 'medium', scalability: 85 },
    radarData: [90, 85, 75, 95, 80]
  },
  { 
    id: '2', title: 'تطبيق التوصيل اللوجستي', category: 'Logistics', progress: 60, aiScore: 78, lastEdited: 'أمس',
    metrics: { marketSize: '$1.2M', roi: 320, breakEven: 14, riskLevel: 'high', scalability: 92 },
    radarData: [95, 70, 85, 60, 90]
  },
  { 
    id: '3', title: 'مؤسسة التعليم الذكي', category: 'EdTech', progress: 85, aiScore: 88, lastEdited: 'منذ ساعة',
    metrics: { marketSize: '$800K', roi: 280, breakEven: 6, riskLevel: 'low', scalability: 70 },
    radarData: [70, 90, 95, 85, 65]
  },
  { 
    id: '4', title: 'عقارات دبي - فنتك', category: 'FinTech', progress: 40, aiScore: 65, lastEdited: 'منذ أسبوع',
    metrics: { marketSize: '$5.0M', roi: 580, breakEven: 18, riskLevel: 'medium', scalability: 95 },
    radarData: [85, 95, 60, 75, 85]
  }
];

const THEME = {
  accent: '#2563eb',
  accentDim: '#eff6ff',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  text: '#1e293b',
  textMuted: '#64748b',
  border: '#e2e8f0',
  bgCard: '#ffffff',
  bgMain: '#f8fafc'
};

export const PlanComparison: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [hoverPlan, setHoverPlan] = useState<string | null>(null);

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(i => i !== id));
    } else {
      if (selectedIds.length < 3) setSelectedIds(prev => [...prev, id]);
    }
  };

  const selectedPlans = useMemo(() => MOCK_PLANS.filter(p => selectedIds.includes(p.id)), [selectedIds]);

  return (
    <div dir="rtl" className="min-h-screen pb-24 lg:pb-0 font-['IBM_Plex_Sans_Arabic'] animate-in fade-in duration-700 w-full max-w-full overflow-x-hidden bg-white">
      
      {/* ─── HEADER ─── */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-14 pt-8 sm:pt-12 pb-12 sm:pb-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 lg:mb-16">
          <div className="flex-1 space-y-4">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <ArrowRightLeft size={20} />
                </div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">Decision Intelligence</span>
             </div>
             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">مقارنة السيناريوهات والجاهزية</h1>
             <p className="text-slate-500 font-bold text-sm sm:text-lg max-w-2xl leading-relaxed">حلل وفاضل بين استثماراتك المخططة. اختر حتى 3 خطط لاكتشاف التوازن الاستراتيجي وحساب المخاطر التراكمية.</p>
          </div>
          
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-white p-3 sm:p-2 rounded-3xl border border-slate-100 shadow-sm">
             <div className="flex -space-x-3 rtl:space-x-reverse px-4 justify-center sm:justify-start">
               {selectedPlans.map(p => (
                 <div key={p.id} className="w-10 h-10 rounded-full bg-blue-600 border-4 border-white flex items-center justify-center text-[10px] font-black text-white shadow-md">
                   {p.title.charAt(0)}
                 </div>
               ))}
               {[...Array(3 - selectedIds.length)].map((_, i) => (
                 <div key={i} className="w-10 h-10 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300">
                   <Plus size={14} />
                 </div>
               ))}
             </div>
             <div className="hidden sm:block h-10 w-px bg-slate-100 mx-2"></div>
             <button 
                onClick={() => setIsComparing(!isComparing)}
                disabled={selectedIds.length < 2}
                className={`flex-1 sm:flex-none px-8 py-3.5 rounded-2xl text-sm font-black transition-all flex items-center justify-center gap-3 ${
                  selectedIds.length >= 2 ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
             >
               {isComparing ? <ArrowRight size={18} className="rotate-180" /> : <Zap size={18} />}
               <span>{isComparing ? 'العودة للاختيار' : 'بدء التحليل المقارن'}</span>
             </button>
          </div>
        </div>

        {!isComparing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {MOCK_PLANS.map(plan => {
               const active = selectedIds.includes(plan.id);
               return (
                 <div 
                   key={plan.id}
                   onClick={() => toggleSelection(plan.id)}
                   className={`group relative bg-white border-2 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${active ? 'border-blue-600 shadow-xl' : 'border-slate-100'}`}
                 >
                    <div className="flex justify-between items-start mb-6">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${active ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                          <Layers size={24} />
                       </div>
                       <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${active ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200'}`}>
                          {active && <CheckCircle2 size={12} strokeWidth={3} />}
                       </div>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2 truncate">{plan.title}</h3>
                    <div className="flex items-center gap-2 mb-6">
                       <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg uppercase">{plan.category}</span>
                       <span className="text-[10px] font-black text-blue-600">{plan.progress}% جاهزية</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                          <div className="text-[9px] font-black text-slate-400 mb-1 uppercase">ROI المتوقع</div>
                          <div className="text-sm font-black text-slate-900">+{plan.metrics.roi}%</div>
                       </div>
                       <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                          <div className="text-[9px] font-black text-slate-400 mb-1 uppercase">نقطة التعادل</div>
                          <div className="text-sm font-black text-slate-900">{plan.metrics.breakEven} شهر</div>
                       </div>
                    </div>
                 </div>
               );
             })}
          </div>
        ) : (
          /* --- ADVANCED ANALYTICS INTERFACE --- */
          <div className="space-y-10 animate-in zoom-in-95 duration-700">
             
             {/* 1. KPI Comparison Grid */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {selectedPlans.map(plan => (
                  <div key={plan.id} className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                     {/* Gradient Accent */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full translate-x-10 -translate-y-10"></div>
                     
                     <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 bg-slate-900 text-white rounded-3xl flex items-center justify-center text-xl font-black shadow-lg">
                           {plan.title.charAt(0)}
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-slate-900 mb-1">{plan.title}</h3>
                           <Badge color={plan.metrics.riskLevel === 'high' ? 'red' : plan.metrics.riskLevel === 'medium' ? 'amber' : 'emerald'}>
                              مخاطر {plan.metrics.riskLevel === 'high' ? 'مرتفعة' : plan.metrics.riskLevel === 'medium' ? 'متوازنة' : 'منخفضة'}
                           </Badge>
                        </div>
                     </div>

                     <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl border border-slate-100">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm"><Calculator size={16} /></div>
                              <span className="text-xs font-black text-slate-500">حجم السوق المستهدف</span>
                           </div>
                           <span className="text-base font-black text-slate-900">{plan.metrics.marketSize}</span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl border border-slate-100">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-sm"><TrendingUp size={16} /></div>
                              <span className="text-xs font-black text-slate-500">العائد الربحي المتوقع</span>
                           </div>
                           <span className="text-base font-black text-emerald-600">+{plan.metrics.roi}%</span>
                        </div>

                        <div className="space-y-3 pt-4">
                           <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              قابيلة التوسع (Scalability)
                              <span>{plan.metrics.scalability}%</span>
                           </div>
                           <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${plan.metrics.scalability}%` }}></div>
                           </div>
                        </div>
                     </div>
                  </div>
                ))}
             </div>

             {/* 2. Visual Comparison Matrix (The War Room) */}
             <div className="bg-slate-950 rounded-[2.5rem] sm:rounded-[4rem] p-6 sm:p-12 text-white shadow-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-20 opacity-10"><BarChart4 size={300} strokeWidth={0.5} /></div>
                <div className="relative z-10">
                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400"><ShieldCheck size={24} /></div>
                      <div>
                         <h2 className="text-xl sm:text-3xl font-black mb-1">الرؤية العميقة للذكاء الاصطناعي</h2>
                         <p className="text-slate-400 font-bold text-[11px] sm:text-sm">مقارنة المفاضلة والقرار الاستراتيجي النهائي</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                      <div className="space-y-12">
                         {/* Radar Chart Mock logic */}
                         <div>
                            <div className="flex items-center gap-3 mb-6">
                               <Sparkles size={18} className="text-blue-400" />
                               <span className="text-sm font-black text-blue-100">توازن أبعاد المقارنة</span>
                            </div>
                            <div className="space-y-6">
                               {['القدرة التقنية', 'اختراق السوق', 'كفاءة الفريق', 'الاستقرار المالي'].map((dim, i) => (
                                 <div key={dim} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                       <span className="text-xs font-bold text-slate-400">{dim}</span>
                                       <div className="flex gap-1.5">
                                          {selectedPlans.map((p, idx) => (
                                             <div key={p.id} className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                          ))}
                                       </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                       {selectedPlans.map((p, idx) => (
                                          <div key={p.id} className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                             <div className={`h-full ${idx === 0 ? 'bg-blue-600' : idx === 1 ? 'bg-emerald-600' : 'bg-amber-600'}`} style={{ width: `${p.radarData[i]}%` }}></div>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>

                      <div className="bg-white/5 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 border border-white/10 backdrop-blur-xl">
                         <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center"><BrainCircuit size={20} /></div>
                            <h4 className="text-lg font-black text-white">توصية المحلل الذكي</h4>
                         </div>
                         <p className="text-slate-300 font-bold text-base leading-relaxed mb-10">
                            بناءً على المعايير الاستراتيجية، تعتبر <span className="text-white font-black underline decoration-blue-500 decoration-4">"{selectedPlans.sort((a,b) => b.aiScore - a.aiScore)[0]?.title}"</span> هي الخطة الأكثر أماناً وقابلية للتمويل الفوري. 
                            بينما تتفوق <span className="text-blue-400">"{selectedPlans.sort((a,b) => b.metrics.roi - a.metrics.roi)[0]?.title}"</span> في حجم الأرباح المتوقع ولكن مع مخاطر سوقية تتطلب خطة طوارئ (Plan B) أكثر صرامة.
                         </p>

                         <div className="flex flex-col gap-4">
                            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-4">
                               <CheckCircle2 size={18} className="text-emerald-500 mt-1 shrink-0" />
                               <div>
                                  <div className="text-[9px] font-black text-emerald-500 uppercase mb-1">عامل النجاح الحاسم</div>
                                  <p className="text-xs font-bold text-white leading-relaxed">كفاءة الفريق في تنفيذ التقنيات الهجينة تضمن إطلاق أسرع بـ 3 أشهر.</p>
                               </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-4">
                               <AlertTriangle size={18} className="text-amber-500 mt-1 shrink-0" />
                               <div>
                                  <div className="text-[9px] font-black text-amber-500 uppercase mb-1">تنبيه المخاطرة</div>
                                  <p className="text-xs font-bold text-white leading-relaxed">تحتاج الخطط المختارة لضبط تكلفة الاستحواذ (CAC) لتجنب استنزاف السيولة مبكراً.</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* 3. Competitive Breakdown Matrix */}
             <div className="bg-white rounded-[2rem] sm:rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden overflow-x-auto no-scrollbar">
                <table className="w-full text-right border-collapse min-w-[700px]">
                   <thead>
                      <tr className="bg-slate-50/50">
                         <th className="p-6 sm:p-10 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 min-w-[200px]">معيار التنافسية</th>
                         {selectedPlans.map(p => (
                            <th key={p.id} className="p-6 sm:p-10 border-b border-slate-100 text-center">
                               <div className="text-sm font-black text-slate-900">{p.title}</div>
                            </th>
                         ))}
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {[
                        { label: 'جاهزية السوق', icon: Target },
                        { label: 'النبض الاستثماري (Score)', icon: Activity },
                        { label: 'تحليل SWOT المكتمل', icon: ShieldCheck },
                      ].map((row, i) => (
                        <tr key={row.label} className="hover:bg-slate-50/30 transition-colors">
                           <td className="p-6 sm:p-10">
                              <div className="flex items-center gap-3">
                                 <row.icon size={16} className="text-blue-500" />
                                 <span className="text-sm font-black text-slate-700">{row.label}</span>
                              </div>
                           </td>
                           {selectedPlans.map(p => (
                              <td key={p.id} className="p-6 sm:p-10 text-center">
                                 {i === 0 ? (
                                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-black">جاهز بنسبة {p.progress}%</div>
                                 ) : i === 1 ? (
                                    <span className="text-2xl font-black text-slate-900">{p.aiScore}</span>
                                 ) : (
                                    <CheckCircle2 size={20} className="text-emerald-500 mx-auto" />
                                 )}
                              </td>
                           ))}
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}
      </div>

      {/* Floating Interactive Legend - Responsive optimization */}
      <div className="fixed bottom-24 lg:bottom-10 right-5 left-5 sm:left-10 lg:left-auto lg:right-auto z-[60] animate-in slide-in-from-bottom-10 lg:slide-in-from-left-10 duration-1000">
         <div className="bg-white/80 backdrop-blur-xl p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-white shadow-2xl flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 sm:gap-6 sm:pr-6">
            <div className="flex items-center gap-3">
               <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest underline decoration-2 underline-offset-4 decoration-blue-200">الأكثر أماناً</span>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest underline decoration-2 underline-offset-4 decoration-emerald-200">الأعلى ربحاً</span>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-2.5 h-2.5 rounded-full bg-amber-600"></div>
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest underline decoration-2 underline-offset-4 decoration-amber-200">الأسرع للتعادل</span>
            </div>
         </div>
      </div>

    </div>
  );
};

const Badge: React.FC<{ children: React.ReactNode; color: 'red' | 'amber' | 'emerald' }> = ({ children, color }) => {
  const styles = {
    red: 'bg-red-50 text-red-600 border-red-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  };
  return <span className={`px-3 py-1 rounded-lg text-[10px] font-black border uppercase ${styles[color]}`}>{children}</span>;
};
