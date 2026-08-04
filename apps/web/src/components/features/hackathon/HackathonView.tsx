import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   Zap,
   Sparkles,
   Activity,
   Layout,
   Database,
   ChevronLeft,
   Trophy,
   Clock,
   Target,
   FileText,
   CheckCircle2,
   Timer,
   RefreshCw,
   Bell,
   Calendar,
   Globe,
   Users,
   Search,
   MoreVertical,
   ChevronDown,
   ChevronRight,
   Check,
   Tv,
   FileDown,
   Infinity,
   Smartphone,
   Award,
   Plus,
   Minus,
   Info,
   Play,
   Lightbulb,
   Code
} from 'lucide-react';

import { HackathonState, ReadinessBreakdown } from './types';
import { sprintDays, OPPORTUNITIES, TOTAL_DURATION } from './constants';
import { Button } from '@/components/ui/Button';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import { HackathonHeader } from './components/HackathonHeader';
import { HackathonTaskBoard } from './components/HackathonTaskBoard';
import { ScenarioWarRoom } from './components/ScenarioWarRoom';
import { InvestorReadinessScore } from './components/InvestorReadinessScore';
import { ExecutionCommandCenter } from './components/ExecutionCommandCenter';
import { HackathonCanvas } from './components/HackathonCanvas';
import { OpportunitiesLibrary } from './components/OpportunitiesLibrary';
import { LeadershipBoard } from './components/LeadershipBoard';
import { HackathonIntro } from './components/HackathonIntro';
import { HackathonRegistrationModal } from './components/HackathonRegistrationModal';

const STORAGE_KEY = 'start_investor_hackathon_v2';

const INITIAL_STATE: HackathonState = {
   currentStage: 1,
   hasStarted: false,
   pledged: false,
   startTime: null,
   taskStatus: {} as any,
   answers: {},
   selectedOpportunityId: '',
   intensityScore: 0,
   lastActivity: Date.now(),
   accomplished: false,
   scenario: {
      marketingSpend: 5000,
      pricingStrategy: 'premium',
      teamFocus: 'product',
   },
};

export const HackathonView: React.FC = () => {
   const [state, setState] = useState<HackathonState>(INITIAL_STATE);
   const [showLeadershipOnboarding, setShowLeadershipOnboarding] = useState(false);
   const [leadershipOnboardingStep, setLeadershipOnboardingStep] = useState(0);
   const [clock, setClock] = useState(Date.now());
   const [activeTab, setActiveTab] = useState<'overview' | 'goals' | 'rules' | 'mechanism' | 'outcomes' | 'schedule'>('overview');
   const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
   const [notice, setNotice] = useState<{ title: string; description: string } | null>(null);

   useEffect(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
         try {
            setState(JSON.parse(saved));
         } catch (e) {
            console.error('Failed to load hackathon state', e);
         }
      }
   }, []);

   useEffect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
   }, [state]);

   useEffect(() => {
      const timer = setInterval(() => setClock(Date.now()), 1000);
      return () => clearInterval(timer);
   }, []);

   const totalProgress = useMemo(() => {
      const totalTasks = sprintDays.reduce((acc, day) => acc + day.tasks.length, 0);
      const completedTasks = Object.values(state.taskStatus).filter(Boolean).length;
      return Math.round((completedTasks / totalTasks) * 100);
   }, [state.taskStatus]);

   const currentDay = useMemo(() => {
      if (!state.startTime) return 1;
      const elapsed = clock - state.startTime;
      const day = Math.floor(elapsed / (24 * 60 * 60 * 1000)) + 1;
      return Math.min(Math.max(day, 1), 7);
   }, [state.startTime, clock]);

   const remainingTime = useMemo(() => {
      if (!state.startTime) return TOTAL_DURATION;
      const elapsed = clock - state.startTime;
      return Math.max(TOTAL_DURATION - elapsed, 0);
   }, [state.startTime, clock]);

   const isStageComplete = (day: number) => {
      const dayTasks = sprintDays.find(d => d.day === day)?.tasks || [];
      return dayTasks.every(t => state.taskStatus[t.id]);
   };

   const goToStage = (day: number) => {
      if (day === 1 || isStageComplete(day - 1)) {
         setState(prev => ({ ...prev, currentStage: day, lastActivity: Date.now() }));
      }
   };

   const updateAnswer = (taskId: string, val: any) => {
      setState(prev => ({
         ...prev,
         answers: { ...prev.answers, [taskId]: val },
         taskStatus: { ...prev.taskStatus, [taskId]: !!val },
         lastActivity: Date.now()
      }));
   };

   const readiness = useMemo((): ReadinessBreakdown => {
      const scores = {
         market: Object.keys(state.taskStatus).filter(k => ['target', 'market_size', 'audience'].includes(k)).filter(k => state.taskStatus[k as any]).length / 3,
         financial: Object.keys(state.taskStatus).filter(k => ['revenue', 'costs', 'projections'].includes(k)).filter(k => state.taskStatus[k as any]).length / 3,
         execution: Object.keys(state.taskStatus).filter(k => ['arsenal', 'features', 'prototype_plan'].includes(k)).filter(k => state.taskStatus[k as any]).length / 3,
         risk: Object.keys(state.taskStatus).filter(k => ['risk', 'legal', 'team_governance'].includes(k)).filter(k => state.taskStatus[k as any]).length / 3,
      };

      return {
         marketClarity: scores.market * 100,
         financialStrength: scores.financial * 100,
         executionQuality: scores.execution * 100,
         riskControl: scores.risk * 100,
         overall: Math.round((scores.market + scores.financial + scores.execution + scores.risk) / 4 * 100),
         reasons: scores.market < 1 ? ['نقص في بيانات العميل المستهدف'] : ['جاهزية استثمارية عالية']
      };
   }, [state.taskStatus]);

   const simulation = useMemo(() => {
      const { marketingSpend, pricingStrategy, teamFocus } = state.scenario;
      let success = 50;
      if (pricingStrategy === 'premium') success += 10;
      if (teamFocus === 'product') success += 15;
      if (marketingSpend > 10000) success += 10;

      return {
         sustainability: Math.min(success, 100),
         successChance: Math.min(success - 10, 100),
         runwayStress: 40,
         ltvEstimate: 1200,
         verdict: success > 70 ? 'stable' : 'watch'
      } as any;
   }, [state.scenario]);

   const mentorMessage = useMemo(() => {
      if (totalProgress === 0) return 'ابدأ بتشريح "الألم السوقي". المستثمر يبحث عن جراح، وليس حالم.';
      if (totalProgress < 30) return 'جيد، لكن تأكد من أرقام الـ TAM/SAM/SOM. الغموض هو عدو التمويل.';
      return 'أنت على وشك الانطلاق. ملفك الاستثماري بدأ يكتسب وزناً حقيقياً.';
   }, [totalProgress]);

   const milestones = useMemo(() => [
      { week: 1, title: 'تثبيت "الألم" وتوثيق 15 مقابلة عمق مع الفئة المستهدفة', owner: 'CEO', status: 'focus', kpi: '15 Validated Interviews' },
      { week: 2, title: 'إطلاق نسخة Alpha التقنية واختبار المعمارية السيادية', owner: 'CTO', status: 'focus', kpi: 'Zero Downtime' },
      { week: 4, title: 'بناء قمع الاستحواذ الأولي وتحقيق أول 10 طلبات مدفوعة', owner: 'Growth', status: 'at-risk', kpi: '10 Paid Conversions' },
      { week: 8, title: 'تحليل معدل الاحتفاظ (Retention) وتحسين مؤشر الـ Aha! Moment', owner: 'Product', status: 'stable', kpi: 'Retention > 40%' },
      { week: 12, title: 'التفاوض على شراكة توزيع استراتيجية (B2B) للنمو العابر', owner: 'Partnerships', status: 'focus', kpi: '1 Signed MOU' },
      { week: 14, title: 'تجهيز غرفة بيانات المستثمرين (Data Room) وبدء جولة Seed', owner: 'Finance', status: 'stable', kpi: 'Pitch Ready' },
   ], []);

   const kpis = useMemo(() => [
      { label: 'Unit Economics (LTV/CAC)', current: '2.4x', target: '3.5x+' },
      { label: 'Payback Period', current: '7.5 Months', target: '< 5 Months' },
      { label: 'Growth Run-Rate', current: '12% MoM', target: '25% MoM' },
   ], []);

   const alerts = useMemo(() => [
      { level: 'high', title: 'خطر فجوة السيولة (Cash Gap)', detail: 'معدل الحرق الحالي قد يستنزف المدرج قبل الوصول لنقطة التعادل. فعّل خطة الطوارئ.' },
      { level: 'medium', title: 'تباطؤ مؤشر التحول (Conversion)', detail: 'قمع الاستحواذ يظهر تسرباً في مرحلة التجربة. راجع الرسالة التسويقية فوراً.' },
   ], []);

   const handleRegistration = (data: any) => {
      setState(prev => ({ ...prev, registrationData: data }));
      setIsRegistrationOpen(false);
      setNotice({
         title: 'تم تسجيل بياناتك',
         description: 'تم حفظ بيانات المشاركة في الهاكثون بنجاح.',
      });
   };

   const handleStartParticipation = () => {
      if (!state.registrationData) {
         setIsRegistrationOpen(true);
      } else {
         setNotice({
            title: 'أنت مسجل بالفعل',
            description: 'بياناتك محفوظة ويمكنك متابعة المشاركة مباشرة.',
         });
      }
   };

   if (!state.hasStarted) {
      return <HackathonIntro onStart={() => setState(prev => ({ ...prev, hasStarted: true }))} />;
   }

   return (
      <div className="min-h-screen bg-slate-50 font-tajawal" dir="rtl">

         <div className="relative">


            {/* Hero Section */}
            <header className="bg-[#1c1d1f] pt-12 pb-16 relative overflow-hidden text-right">
               <div className="container mx-auto px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                     <div className="lg:col-span-8">
                        <nav className="flex items-center gap-2 text-indigo-400 text-sm font-bold mb-6">
                           <span>الرئيسية</span>
                           <ChevronLeft size={14} />
                           <span>الهاكثون</span>
                           <ChevronLeft size={14} />
                           <span className="text-indigo-300">بناء الشركات السيادية</span>
                        </nav>

                        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                           هاكثون الاستثمار: بناء الكيانات التقنية والسيادة المالية
                        </h1>

                        <p className="text-xl text-white/90 font-medium mb-8 leading-relaxed max-w-2xl">
                           رحلة مكثفة لتصميم وهندسة حلول تقنية ثورية، ننتقل بك من الفكرة إلى الجاهزية الاستثمارية الكاملة عبر أدوات ذكاء اصطناعي وجلسات توجيه احترافية.
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-sm mb-8">
                           <div className="flex items-center gap-2">
                              <span className="text-amber-400 font-black text-lg">4.9</span>
                              <div className="flex text-amber-400">
                                 {[1, 2, 3, 4, 5].map(i => <Sparkles key={i} size={14} fill="currentColor" />)}
                              </div>
                              <span className="text-indigo-300 underline">(1,240 تقييم)</span>
                           </div>
                           <div className="text-white font-bold">بإشراف فريق <span className="text-indigo-400 underline">Start Investor</span></div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm font-bold">
                           <div className="flex items-center gap-2">
                              <Info size={16} />
                              <span>آخر تحديث 05/2026</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <Globe size={16} />
                              <span>العربية</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </header>

            {/* Main Layout Grid (Contains Tabs, Content, and Floating Sidebar) */}
            <div className="container mx-auto px-6 relative">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                  {/* Left Side: Tabs + Dynamic Content */}
                  <div className="lg:col-span-8">
                     {/* Tabs Navigation */}
                     <div className="border-b border-slate-200 sticky top-16 bg-white z-40 mb-12">
                        <div className="flex overflow-x-auto no-scrollbar gap-8">
                           {[
                              { id: 'overview', label: 'نظرة عامة' },
                              { id: 'goals', label: 'الأهداف الإستراتيجية' },
                              { id: 'rules', label: 'ضوابط المشاركة' },
                              { id: 'mechanism', label: 'آلية المشاركة' },
                              { id: 'outcomes', label: 'المخرجات' },
                              { id: 'schedule', label: 'الجدول الزمني' },
                           ].map((tab) => (
                              <button
                                 key={tab.id}
                                 onClick={() => setActiveTab(tab.id as any)}
                                 className={`py-5 text-sm font-black transition-all whitespace-nowrap border-b-4 ${activeTab === tab.id
                                       ? 'text-indigo-600 border-indigo-600'
                                       : 'text-slate-500 border-transparent hover:text-slate-900'
                                    }`}
                              >
                                 {tab.label}
                              </button>
                           ))}
                        </div>
                     </div>

                     <main className="pb-24 text-right min-h-[600px]">
                        <AnimatePresence mode="wait">
                           {/* OVERVIEW TAB */}
                           {activeTab === 'overview' && (
                              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                                 <section className="bg-slate-50 border border-slate-100 p-8 rounded-2xl">
                                    <h2 className="text-2xl font-black text-slate-900 mb-6">ما الذي ستتعلمه في هذا الهاكثون؟</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                       {[
                                          'هندسة شركات متخصصة في قطاعات (PropTech, HealthTech, AgriTech)',
                                          'تصميم الميزة التنافسية السيادية وحماية الملكية الفكرية',
                                          'بناء النماذج المالية المعقدة وتوقعات التدفق النقدي',
                                          'استراتيجيات الاستحواذ الهجومي واكتساح السوق المحلي',
                                          'تجهيز غرفة بيانات المستثمرين والجاهزية لجولات Seed',
                                          'إدارة المخاطر التشريعية والامتثال للأنظمة السعودية'
                                       ].map((item, i) => (
                                          <div key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                                             <Check size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                                             <span>{item}</span>
                                          </div>
                                       ))}
                                    </div>
                                 </section>

                                 <section>
                                    <h2 className="text-2xl font-black text-slate-900 mb-2">المسارات المتخصصة المتاحة</h2>
                                    <p className="text-slate-500 font-medium mb-8">اختر المسار الذي يناسب خبرتك التقنية لبناء شركة عميقة التخصص:</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                       {[
                                          { title: 'PropTech Intelligence', icon: Layout, desc: 'أتمتة إدارة الأصول العقارية الكبرى باستخدام رؤية الحاسوب.', color: 'text-blue-600', bg: 'bg-blue-50' },
                                          { title: 'HealthTech AI', icon: Activity, desc: 'أنظمة تشخيصية مبكرة متوافقة مع معايير وزارة الصحة.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                                          { title: 'FinTech Governance', icon: Database, desc: 'حلول الامتثال المالي المتقدمة وأنظمة الدفع السيادية.', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                                          { title: 'AgriTech IoT', icon: Globe, desc: 'تحسين سلاسل الإمداد الزراعي عبر حساسات إنترنت الأشياء.', color: 'text-amber-600', bg: 'bg-amber-50' }
                                       ].map((track, i) => (
                                          <div key={i} className="p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group">
                                             <div className={`w-12 h-12 ${track.bg} ${track.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                                <track.icon size={24} />
                                             </div>
                                             <h4 className="text-lg font-black text-slate-900 mb-2">{track.title}</h4>
                                             <p className="text-sm font-bold text-slate-500 leading-relaxed">{track.desc}</p>
                                          </div>
                                       ))}
                                    </div>
                                 </section>

                                 <section>
                                    <h2 className="text-2xl font-black text-slate-900 mb-6">المتطلبات الأساسية</h2>
                                    <ul className="space-y-4">
                                       {[
                                          'معرفة متقدمة في هندسة البرمجيات أو علوم البيانات',
                                          'فهم أولي لأساسيات ريادة الأعمال والتمويل',
                                          'الالتزام الكامل بجدول الهاكثون (10 ساعات يومياً)',
                                          'فريق مكون من 3 إلى 5 أعضاء (اختياري)'
                                       ].map((req, i) => (
                                          <li key={i} className="flex items-center gap-4 text-slate-700 font-bold">
                                             <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                                             <span>{req}</span>
                                          </li>
                                       ))}
                                    </ul>
                                 </section>
                              </motion.div>
                           )}

                           {/* GOALS TAB */}
                           {activeTab === 'goals' && (
                              <motion.div key="goals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                                 <h2 className="text-3xl font-black text-slate-900 mb-8">الأهداف الإستراتيجية</h2>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                       { title: 'تعزيز الابتكار', desc: 'تشجيع الطلاب على ابتكار حلول تقنية مجتمعية', icon: Lightbulb, color: 'text-amber-500', bg: 'bg-amber-50' },
                                       { title: 'التطبيق العملي', desc: 'تقليل الفجوة بين الدراسة الأكاديمية والتطبيق البرمجي', icon: Code, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                                       { title: 'بناء المجتمع التقني', desc: 'تعزيز روح العمل الجماعي والتعاون بين التخصصات', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' }
                                    ].map((item, i) => (
                                       <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center group">
                                          <div className={`w-24 h-24 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                             <item.icon size={48} />
                                          </div>
                                          <h4 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h4>
                                          <p className="text-lg font-bold text-slate-400 leading-relaxed">{item.desc}</p>
                                       </div>
                                    ))}
                                 </div>
                              </motion.div>
                           )}

                           {/* RULES TAB */}
                           {activeTab === 'rules' && (
                              <motion.div key="rules" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                 <h2 className="text-3xl font-black text-slate-900 mb-8">ضوابط المشاركة</h2>
                                 <div className="space-y-4">
                                    {[
                                       'الالتزام بأن تكون جميع المشاريع المشاركة أصلية وغير منسوخة أو منقولة من أعمال سابقة.',
                                       'يحق لكل فريق المشاركة بمشروع واحد فقط ضمن أحد مسارات الهاكثون.',
                                       'يجب أن يتراوح عدد أعضاء الفريق بين (2 – 5) طلاب كحد أقصى.',
                                       'الالتزام بالوقت المحدد لتسليم المشروع والعرض النهائي.',
                                       'الالتزام بأخلاقيات العمل الجماعي واحترام حقوق الملكية الفكرية.',
                                       'يمنع استخدام أي أدوات أو حلول جاهزة بالكامل دون إضافة قيمة ابتكارية واضحة.',
                                       'يجب أن تكون جميع المشاركات متوافقة مع القيم المجتمعية والأنظمة المعمول بها في المملكة العربية السعودية.',
                                       'تلتزم الفرق بتقديم عرض تقديمي (Pitch) يوضح الفكرة والحل المقترح.',
                                       'يحق للجنة المنظمة استبعاد أي فريق لا يلتزم بالضوابط أو التعليمات.'
                                    ].map((rule, i) => (
                                       <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all shadow-sm">
                                          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-indigo-600 font-black shrink-0 border border-slate-100 order-2 group-hover:bg-indigo-600 group-hover:text-white">{i + 1}</div>
                                          <p className="text-base font-bold text-slate-600 leading-relaxed order-1">{rule}</p>
                                       </div>
                                    ))}
                                 </div>
                              </motion.div>
                           )}

                           {/* MECHANISM TAB */}
                           {activeTab === 'mechanism' && (
                              <motion.div key="mechanism" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                                 <h2 className="text-3xl font-black text-slate-900 mb-8">آلية المشاركة</h2>
                                 <div className="relative space-y-12 before:absolute before:right-6 before:top-0 before:bottom-0 before:w-1 before:bg-slate-100">
                                    {[
                                       { title: 'التسجيل الإلكتروني', desc: 'يقوم المشاركون بتعبئة نموذج التسجيل عبر الرابط الرسمي للهاكثون.' },
                                       { title: 'تشكيل الفرق', desc: 'يمكن التسجيل كفريق جاهز أو كفرد، وسيتم توزيع الأفراد على فرق. يراعى تنوع التخصصات داخل الفريق.' },
                                       { title: 'اختيار المسار', desc: 'يختار الفريق أحد التحديات المطروحة.' },
                                       { title: 'مرحلة الفرز والقبول', desc: 'تقوم اللجنة بمراجعة الطلبات واعتماد الفرق المشاركة.' },
                                       { title: 'يوم الهاكثون', desc: 'انطلاق العمل على المشاريع، وتوفير الإرشاد الفني، ومتابعة تقدم الفرق.' },
                                       { title: 'التسليم النهائي والعرض', desc: 'تقديم النموذج الأولي والعرض أمام لجنة التحكيم.' }
                                    ].map((step, i) => (
                                       <div key={i} className="relative pr-16 group">
                                          <div className="absolute right-0 top-0 w-12 h-12 rounded-full bg-white border-4 border-slate-50 shadow-md flex items-center justify-center text-indigo-600 font-black group-hover:border-indigo-600 group-hover:bg-indigo-50 transition-all z-10">{i + 1}</div>
                                          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm group-hover:shadow-xl transition-all">
                                             <h4 className="text-2xl font-black text-slate-900 mb-2">{step.title}</h4>
                                             <p className="text-lg font-medium text-slate-500 leading-relaxed">{step.desc}</p>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </motion.div>
                           )}

                           {/* OUTCOMES TAB */}
                           {activeTab === 'outcomes' && (
                              <motion.div key="outcomes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                                 <h2 className="text-3xl font-black text-slate-900 mb-8">مخرجات الهاكاثون المتوقعة</h2>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                       { title: 'نماذج أولية (MVP)', desc: 'نماذج أولية قابلة للتطوير لمشاريع وطنية واجتماعية', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50' },
                                       { title: 'تقارير تقنية', desc: 'تقارير تقنية عن أداء الطلاب ومهاراتهم البرمجية', icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                                       { title: 'توثيق إعلامي', desc: 'توثيق إعلامي يبرز دور الجامعة في دعم الابتكار الرقمي', icon: Globe, color: 'text-emerald-500', bg: 'bg-emerald-50' }
                                    ].map((item, i) => (
                                       <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all text-center flex flex-col items-center">
                                          <div className={`w-24 h-24 ${item.bg} ${item.color} rounded-3xl flex items-center justify-center mb-6`}>
                                             <item.icon size={48} />
                                          </div>
                                          <h4 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h4>
                                          <p className="text-lg font-bold text-slate-400 leading-relaxed">{item.desc}</p>
                                       </div>
                                    ))}
                                 </div>
                              </motion.div>
                           )}

                           {/* SCHEDULE TAB */}
                           {activeTab === 'schedule' && (
                              <motion.div key="schedule" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                                 <h2 className="text-3xl font-black text-slate-900 mb-8">المنهج التنفيذي والجدول الزمني</h2>
                                 <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-sm">
                                    {sprintDays.map((day, i) => (
                                       <div key={day.day} className="bg-white group">
                                          <button className="w-full px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-all text-right">
                                             <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                   {day.day}
                                                </div>
                                                <span className="text-xl font-black text-slate-900">{day.title}</span>
                                             </div>
                                             <div className="flex items-center gap-2 text-slate-400 font-bold">
                                                <span className="text-sm">{day.tasks.length} مهام</span>
                                                <ChevronDown size={20} />
                                             </div>
                                          </button>
                                       </div>
                                    ))}
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </main>
                  </div>

                  {/* Sticky Sidebar Column - Persistent & Floating */}
                  <div className="lg:col-span-4 relative">
                     <div className="lg:sticky lg:top-28 lg:mt-[-280px] z-50 space-y-6">
                        <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden border border-slate-100">
                           <div className="relative aspect-video hidden lg:block group cursor-pointer">
                              <img
                                 src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800"
                                 alt="Preview"
                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4 group-hover:bg-black/20 transition-all">
                                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-2xl group-hover:scale-110 transition-transform">
                                    <Play size={40} className="fill-slate-900 translate-x-1" />
                                 </div>
                                 <span className="text-white font-black text-lg">شاهد الإعلان التعريفي</span>
                              </div>
                           </div>

                           <div className="p-8">
                              <div className="flex items-baseline gap-3 mb-6">
                                 <span className="text-4xl font-black text-slate-900">مجاني</span>
                                 <span className="text-lg text-slate-400 font-bold line-through">1,200 SR</span>
                              </div>

                              <button
                                 onClick={handleStartParticipation}
                                 className="w-full py-5 bg-indigo-600 text-white font-black text-xl rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 mb-6"
                              >
                                 {state.registrationData ? 'أنت مسجل بالفعل' : 'سجل الآن في الهاكثون'}
                              </button>

                              <div className="text-center text-sm font-bold text-slate-500 mb-8 border-b border-slate-100 pb-6">ضمان الجاهزية الاستثمارية بنسبة 100%</div>

                              <div className="space-y-5">
                                 <p className="text-base font-black text-slate-900">يتضمن هذا البرنامج:</p>
                                 {[
                                    { icon: Tv, text: '24 ساعة من الجلسات المباشرة' },
                                    { icon: FileDown, text: 'أدوات ونماذج عمل قابلة للتحميل' },
                                    { icon: Infinity, text: 'وصول لمدى الحياة لغرفة العمليات' },
                                    { icon: Award, text: 'شهادة اعتماد "مؤسس تقني سيادي"' }
                                 ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-sm text-slate-600 font-bold">
                                       <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                                          <item.icon size={18} />
                                       </div>
                                       <span>{item.text}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>

                        <div className="flex gap-4 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                           <button className="flex-1 py-4 font-black text-slate-700 hover:text-indigo-600 transition-all text-sm">مشاركة</button>
                           <div className="w-px h-8 bg-slate-200 self-center" />
                           <button className="flex-1 py-4 font-black text-slate-700 hover:text-indigo-600 transition-all text-sm">تطبيق كوبون</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <HackathonRegistrationModal
            isOpen={isRegistrationOpen}
            onClose={() => setIsRegistrationOpen(false)}
            onComplete={handleRegistration}
         />
         <Dialog open={Boolean(notice)} onOpenChange={(open) => !open && setNotice(null)}>
            <DialogContent className="sm:max-w-[420px]" dir="rtl">
               <DialogHeader className="text-right">
                  <DialogTitle>{notice?.title}</DialogTitle>
                  <DialogDescription>{notice?.description}</DialogDescription>
               </DialogHeader>
               <DialogFooter>
                  <Button onClick={() => setNotice(null)}>حسناً</Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   );
};
export default HackathonView;
