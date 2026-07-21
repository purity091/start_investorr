import React from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Building2,
  CalendarClock,
  CheckCircle2,
  Compass,
  FileText,
  PlayCircle,
  Radar,
  ShieldAlert,
  Target,
  TrendingUp,
  ChevronLeft,
  Activity,
  Zap,
  Lock,
  Layers,
  Sparkles,
  Timer,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { WorkspaceDecisionStatus, WorkspaceExecutionTask, WorkspaceKpi, WorkspaceJourneyStage } from '../../types';
import { useProjectWorkspace } from './ProjectWorkspaceContext';
import { getExecutionCategoryLabel } from './workspaceUtils';

const STAGE_CONFIG: Record<WorkspaceJourneyStage, { label: string; icon: React.ReactNode; color: string; goal: string }> = {
  discovery: { label: 'اكتشاف الفرصة', icon: <Compass size={14} />, color: 'blue', goal: 'العثور على فجوة في السوق واعدة استثمارياً.' },
  analysis: { label: 'تحليل المشكلة', icon: <Activity size={14} />, color: 'indigo', goal: 'فهم عميق لألم العميل وتصميم الحل الأولي.' },
  decision: { label: 'القرار الاستراتيجي', icon: <Target size={14} />, color: 'purple', goal: 'تثبيت نموذج العمل واتخاذ قرار الالتزام.' },
  planning: { label: 'بناء الخطة', icon: <Layers size={14} />, color: 'amber', goal: 'تجهيز خارطة الطريق التنفيذية والمالية.' },
  execution: { label: 'التشغيل والنمو', icon: <Zap size={14} />, color: 'emerald', goal: 'الانطلاق، الحصول على أول عميل، والتوسع.' },
};

export const UnifiedWorkspace: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const {
    workspace,
    cycleAutoTaskStatus,
    cycleFirstCustomerTaskStatus,
  } = useProjectWorkspace();

  const currentStageInfo = STAGE_CONFIG[workspace.currentStage];
  const allTasks = [...workspace.execution.firstCustomerSprint, ...workspace.execution.autoTasks];
  const pendingTasks = allTasks.filter(t => t.status !== 'completed');
  const currentTask = pendingTasks[0];

  return (
    <div dir="rtl" className="min-h-screen bg-[#f1f5f9] text-slate-900 font-sans selection:bg-blue-100">
      
      {/* 1. CLEAN REFINED HERO - PREVENTING OVERLAP */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white pt-12 pb-24">
        <div className="container-full-safe relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
            
            {/* Main Text Content */}
            <div className="flex-1 space-y-8 text-right max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 border border-slate-100">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">نظام التشغيل • نسخة المستثمر الذكي</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
                   محطة <span className="text-blue-600">النمو المركزي</span>
                </h1>
                <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-500">
                  بيئة عمل متكاملة لمتابعة مسار مشروعك الناشئ، مصممة لتوفير رؤية واضحة للخطوات القادمة وتسهيل عملية اتخاذ القرار.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                 <button onClick={() => setActiveTab('market-discovery')} className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-black text-white shadow-lg transition hover:bg-slate-800 active:scale-95">
                    اكتشاف الفرص
                    <ChevronLeft size={16} />
                 </button>
                 <button onClick={() => setActiveTab('editor')} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-black text-slate-600 transition hover:bg-slate-50 active:scale-95 shadow-sm">
                    <FileText size={16} className="text-slate-400" />
                    تحرير الخطة
                 </button>
              </div>
            </div>

            {/* Stage Progress Card - Ensuring No Overlap */}
            <div className="w-full lg:w-96 shrink-0">
               <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/50">
                  <div className="mb-8 flex items-center justify-between flex-row-reverse">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                      {currentStageInfo.icon}
                    </div>
                    <div className="text-right">
                      <h2 className="text-lg font-black text-slate-900">{currentStageInfo.label}</h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">المرحلة الحالية</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[11px] font-black flex-row-reverse">
                          <span className="text-slate-400">الإنجاز</span>
                          <span className="text-blue-600">65%</span>
                       </div>
                       <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full w-[65%] bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                       </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                       <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2">التركيز الاستراتيجي</p>
                       <p className="text-xs font-bold text-slate-600 leading-relaxed">{currentStageInfo.goal}</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-full-safe -mt-12 pb-24">
        
        {/* 2. JOURNEY ROADMAP - ADDING SPACING AND SCROLL SAFETY */}
        <div className="mb-16">
           <div className="rounded-3xl border border-slate-200 bg-white/80 p-3 shadow-xl backdrop-blur-xl">
              <div className="flex flex-row-reverse items-center justify-between gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                {['discovery', 'analysis', 'decision', 'planning', 'execution'].map((stage, idx) => {
                  const info = STAGE_CONFIG[stage as WorkspaceJourneyStage];
                  const isCurrent = workspace.currentStage === stage;
                  const isDone = ['discovery', 'analysis', 'decision', 'planning', 'execution'].indexOf(workspace.currentStage) > idx;
                  
                  return (
                    <div key={stage} className={`flex min-w-[140px] flex-1 items-center gap-3 rounded-2xl p-3 transition-all ${isCurrent ? 'bg-slate-900 text-white shadow-lg' : 'bg-transparent'}`}>
                       <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${isCurrent ? 'bg-blue-500 text-white' : isDone ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                          {isDone ? <CheckCircle2 size={16} /> : info.icon}
                       </div>
                       <div className="text-right overflow-hidden">
                          <p className={`truncate text-[10px] font-black uppercase tracking-tight ${isCurrent ? 'text-white/60' : 'text-slate-400'}`}>المرحلة {idx + 1}</p>
                          <p className={`truncate text-xs font-black ${isCurrent ? 'text-white' : 'text-slate-600'}`}>{info.label}</p>
                       </div>
                    </div>
                  );
                })}
              </div>
           </div>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_380px]">
          
          <div className="space-y-20">
            
            {/* 3. PRIORITY TASK - LARGE AND AIRY */}
            <section className="space-y-6">
               <SectionHeader title="المهمة ذات الأولوية" subtitle="يجب إنجازها لضمان استمرارية التقدم" />
               
               {currentTask && (
                 <div className="group relative overflow-hidden rounded-[2.5rem] bg-white p-10 border border-slate-200 shadow-2xl shadow-slate-200/60 transition-all hover:border-blue-400/50">
                    <div className="absolute top-0 right-0 h-1.5 w-full bg-blue-600" />
                    <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
                       <div className="space-y-4 text-right flex-1">
                          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                             <Zap size={14} />
                             {getExecutionCategoryLabel(currentTask.category)}
                          </div>
                          <h3 className="text-2xl font-black text-slate-900 leading-tight">{currentTask.title}</h3>
                          <p className="max-w-xl text-sm font-medium text-slate-500 leading-relaxed">{currentTask.description}</p>
                       </div>
                       <button 
                         onClick={() => currentTask.id.startsWith('lead-') ? cycleFirstCustomerTaskStatus(currentTask.id) : cycleAutoTaskStatus(currentTask.id)}
                         className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl transition hover:scale-105 active:scale-95"
                       >
                         <CheckCircle2 size={32} />
                       </button>
                    </div>
                 </div>
               )}
            </section>

            {/* 4. PHASE PLAN - CLEAN VERTICAL TIMELINE */}
            <section className="space-y-8">
               <SectionHeader title="المخطط الزمني للـ 90 يوماً" subtitle="أهداف النمو الاستراتيجية لكل شهر" />
               <div className="relative space-y-6 pr-6">
                  <div className="absolute top-0 right-[23px] bottom-0 w-0.5 bg-slate-200/50" />
                  {workspace.execution.phasePlan.map((phase, idx) => (
                    <div key={phase.id} className="relative flex items-start gap-10 group">
                       <div className={`mt-4 h-4 w-4 shrink-0 rounded-full border-4 border-white transition-all z-10 shadow-sm ${idx === 0 ? 'bg-blue-600 scale-125 shadow-blue-200' : 'bg-slate-300'}`} />
                       <div className="flex-1 rounded-[2rem] border border-slate-100 bg-white p-8 transition-all hover:bg-slate-50 text-right shadow-sm group-hover:shadow-md">
                          <div className="mb-4 flex items-center justify-between flex-row-reverse">
                             <h4 className="text-lg font-black text-slate-800">{phase.label}</h4>
                             <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">{phase.focus}</span>
                          </div>
                          <div className="flex flex-wrap gap-3 justify-start flex-row-reverse">
                             {phase.outcomes.map((outcome: string) => (
                               <div key={outcome} className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-[11px] font-bold text-slate-600 border border-slate-100 shadow-sm">
                                  <ShieldCheck size={14} className="text-emerald-500" />
                                  {outcome}
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* 5. TASK GRID - PREVENTING OVERLAP BETWEEN COLUMNS */}
            <section className="space-y-8">
               <SectionHeader title="مركز التحكم الميداني" subtitle="إدارة كافة المهام الجارية" />
               <div className="grid gap-10 md:grid-cols-2">
                  
                  {/* First Customer Sprint */}
                  <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                     <div className="mb-8 flex items-center justify-between flex-row-reverse">
                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                           <Timer size={20} />
                        </div>
                        <h4 className="text-base font-black text-slate-900">سبرينت العميل الأول</h4>
                     </div>
                     <div className="space-y-4">
                        {workspace.execution.firstCustomerSprint.map(task => (
                          <TaskStrip key={task.id} task={task} onClick={() => cycleFirstCustomerTaskStatus(task.id)} color="amber" />
                        ))}
                     </div>
                  </div>

                  {/* Auto Tasks */}
                  <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                     <div className="mb-8 flex items-center justify-between flex-row-reverse">
                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                           <Layers size={20} />
                        </div>
                        <h4 className="text-base font-black text-slate-900">مهام التأسيس</h4>
                     </div>
                     <div className="space-y-4">
                        {workspace.execution.autoTasks.map(task => (
                          <TaskStrip key={task.id} task={task} onClick={() => cycleAutoTaskStatus(task.id)} color="blue" />
                        ))}
                     </div>
                  </div>

               </div>
            </section>

          </div>

          {/* SIDEBAR - INDEPENDENT SCACING */}
          <aside className="space-y-12">
            
            {/* KPI METRICS */}
            <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
               <div className="mb-8 flex items-center justify-between flex-row-reverse">
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">مؤشرات الأداء</h3>
                 <Activity size={18} className="text-blue-500" />
               </div>
               <div className="space-y-8">
                  {workspace.execution.kpis.map(kpi => (
                    <div key={kpi.id} className="space-y-3 text-right">
                       <div className="flex justify-between items-end flex-row-reverse">
                          <p className="text-xs font-black text-slate-800">{kpi.label}</p>
                          <p className="text-[11px] font-bold text-blue-600">{kpi.value} / {kpi.target}</p>
                       </div>
                       <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full transition-all duration-700 shadow-[0_0_6px_rgba(37,99,235,0.3)]"
                            style={{ width: `${Math.min(100, (parseInt(kpi.value) || 0) / (parseInt(kpi.target) || 1) * 100)}%` }}
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* BOTTLENECKS */}
            <section className="rounded-[2.5rem] border border-rose-100 bg-rose-50/30 p-8">
               <div className="mb-6 flex items-center justify-between flex-row-reverse">
                  <h3 className="text-[11px] font-black text-rose-600 uppercase tracking-wider">عوائق حرجة</h3>
                  <AlertTriangle size={18} className="text-rose-500" />
               </div>
               <div className="space-y-4">
                  {workspace.execution.bottlenecks.map((item, i) => (
                    <div key={i} className="rounded-2xl bg-white border border-rose-100 p-4 text-[11px] font-bold text-rose-700 text-right leading-relaxed shadow-sm">
                       {item}
                    </div>
                  ))}
                  {workspace.execution.bottlenecks.length === 0 && (
                    <p className="text-center text-xs font-bold text-slate-400 italic py-4">لا توجد عوائق حالية</p>
                  )}
               </div>
            </section>

            {/* AI RECOMMENDATIONS */}
            <section className="space-y-6">
               <div className="flex items-center justify-center gap-3">
                  <div className="h-px flex-1 bg-slate-200" />
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">توصيات المساعد</p>
                  <div className="h-px flex-1 bg-slate-200" />
               </div>
               {workspace.recommendations.map(rec => (
                 <div key={rec.id} className="group relative rounded-[2rem] border border-slate-100 bg-white p-6 text-right transition hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 duration-300">
                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg">
                       <Lightbulb size={16} />
                    </div>
                    <h4 className="mb-2 text-sm font-black text-slate-900">{rec.title}</h4>
                    <p className="mb-4 text-xs font-medium leading-relaxed text-slate-400">{rec.description}</p>
                    <button 
                      onClick={() => setActiveTab(rec.targetTab)}
                      className="inline-flex items-center gap-2 text-[10px] font-black text-blue-600 transition hover:gap-3"
                    >
                      {rec.actionLabel}
                      <ArrowLeft size={12} />
                    </button>
                 </div>
               ))}
            </section>

          </aside>
        </div>
      </div>
    </div>
  );
};

/* --- REFINED SUB-COMPONENTS --- */

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="text-right space-y-1">
    <h2 className="text-xl font-black text-slate-900 tracking-tight">{title}</h2>
    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{subtitle}</p>
  </div>
);

const TaskStrip: React.FC<{ task: WorkspaceExecutionTask; onClick: () => void; color: 'blue' | 'amber' }> = ({ task, onClick, color }) => {
  const isDone = task.status === 'completed';
  const colorStyles = {
    blue: isDone ? 'bg-blue-50/50 text-blue-400 border-blue-100' : 'bg-white text-slate-600 hover:border-blue-200',
    amber: isDone ? 'bg-amber-50/50 text-amber-400 border-amber-100' : 'bg-white text-slate-600 hover:border-amber-200',
  };

  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-5 text-right transition-all shadow-sm group ${colorStyles[color]}`}
    >
       <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all ${isDone ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-300 group-hover:border-blue-400'}`}>
          {isDone && <CheckCircle2 size={14} />}
       </div>
       <div className="flex-1 overflow-hidden">
          <p className={`truncate text-sm font-black ${isDone ? 'opacity-50 line-through' : 'text-slate-800'}`}>{task.title}</p>
          <div className="flex items-center gap-2 mt-1 opacity-60">
             <span className="text-[9px] font-bold uppercase tracking-wider">{getExecutionCategoryLabel(task.category)}</span>
             <span className="h-1 w-1 rounded-full bg-slate-300" />
             <span className="text-[9px] font-bold">{task.dueWindow}</span>
          </div>
       </div>
    </button>
  );
};
