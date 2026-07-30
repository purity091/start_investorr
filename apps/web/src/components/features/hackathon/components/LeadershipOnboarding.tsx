import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Trophy,
  UserPlus,
  X,
} from 'lucide-react';

interface LeadershipOnboardingProps {
  step: number;
  onNext: () => void;
  onSkip: () => void;
}

const GROUP_JOIN_KEY = 'khotta_hackathon_group_joined';

const steps = [
  {
    icon: UserPlus,
    eyebrow: 'Group Access',
    title: 'انضم إلى غروب الهاكاثون قبل بدء السباق',
    detail:
      'الغروب هو غرفة المتابعة الحية: ستشاهد ترتيبك، تنبيهات المشرف، ونبض تقدم بقية المشاركين. وجودك داخل المجموعة يجعل التحدي أكثر جدية ووضوحا.',
    accent: 'from-blue-500 to-lime-300',
    metric: 'Group 01',
  },
  {
    icon: Trophy,
    eyebrow: 'Live Competition',
    title: 'أنت داخل سباق حي وليس نموذج تعبئة',
    detail:
      'كل مهمة تنجزها وكل إجابة تكتبها ترفع أو تخفض ترتيبك داخل مجموعة الهاكاثون. الفكرة ليست السرعة فقط، بل جودة القرار ووضوح التنفيذ.',
    accent: 'from-blue-500 to-cyan-300',
    metric: '25 مشارك',
  },
  {
    icon: ShieldCheck,
    eyebrow: 'Mentor Watch',
    title: 'يوجد مشرف يتابع الجودة من الخلفية',
    detail:
      'سيظهر لك حضور المشرف وملاحظاته كمستخدم عادي، لكن أدوات تحكم الإدارة تبقى مخفية. الهدف أن تشعر بجدية التحدي بدون تشويش إداري.',
    accent: 'from-lime-500 to-emerald-300',
    metric: '8 ملاحظات',
  },
  {
    icon: BarChart3,
    eyebrow: 'Score Engine',
    title: 'نقاطك مبنية على الفكرة والنجاح ودقة البيانات',
    detail:
      'الترتيب يتحسن عندما تكون فرصة السوق واضحة، النموذج المالي قابل للدفاع، وخطة المخاطر عملية. كل نقطة لها سبب وليست رقما عشوائيا.',
    accent: 'from-amber-400 to-orange-300',
    metric: 'Top 3',
  },
];

export const LeadershipOnboarding: React.FC<LeadershipOnboardingProps> = ({ step, onNext, onSkip }) => {
  const [joinedGroup, setJoinedGroup] = useState(false);
  const current = steps[step] ?? steps[0];
  const Icon = current.icon;
  const isLast = step === steps.length - 1;
  const isGroupStep = step === 0;

  useEffect(() => {
    setJoinedGroup(localStorage.getItem(GROUP_JOIN_KEY) === 'true');
  }, []);

  const joinGroup = () => {
    localStorage.setItem(GROUP_JOIN_KEY, 'true');
    setJoinedGroup(true);
  };

  const handlePrimaryAction = () => {
    if (isGroupStep && !joinedGroup) {
      joinGroup();
      return;
    }

    onNext();
  };

  return (
    <>
      <motion.button
        type="button"
        aria-label="إغلاق شرح لوحة الترتيب"
        className="fixed inset-0 z-[260] bg-slate-950/88 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onSkip}
      />

      <motion.section
        className="fixed left-1/2 top-1/2 z-[270] flex h-[min(580px,calc(100vh-1.5rem))] w-[min(740px,calc(100vw-1.5rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 text-white shadow-2xl shadow-black/70 sm:rounded-[2.25rem]"
        initial={{ opacity: 0, y: 26, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        dir="rtl"
      >
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(59,130,246,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.18)_1px,transparent_1px)] [background-size:38px_38px]" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/25 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-lime-400/15 blur-[100px]" />

        <button
          onClick={onSkip}
          className="absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
          aria-label="تخطي"
        >
          <X size={17} />
        </button>

        <div className="relative flex min-h-0 flex-1 flex-col justify-between p-5 sm:p-7">
          <div className="min-h-0">
            <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${current.accent} text-slate-950 shadow-lg shadow-blue-500/20 sm:h-14 sm:w-14`}>
              <Icon size={25} />
            </div>

            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.3em] text-blue-300">{current.eyebrow}</p>
            <h2 className="max-w-2xl text-2xl font-black leading-tight text-white sm:text-3xl">{current.title}</h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-300 sm:text-[15px] sm:leading-7">{current.detail}</p>

            {isGroupStep && (
              <motion.div
                className="mt-4 rounded-3xl border border-blue-400/20 bg-blue-500/10 p-3.5 sm:p-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 sm:text-[11px]">Hackathon Group</p>
                    <p className="mt-1 text-base font-black text-white">غروب المستثمرين الثوريين</p>
                    <p className="mt-1 text-xs font-semibold text-slate-400">25 مشارك · مشرف مباشر · ترتيب حي</p>
                  </div>
                  <button
                    onClick={joinGroup}
                    disabled={joinedGroup}
                    className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-black transition ${
                      joinedGroup
                        ? 'border border-lime-400/30 bg-lime-500/15 text-lime-300'
                        : 'bg-blue-500 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-400'
                    }`}
                  >
                    {joinedGroup ? <CheckCircle2 size={16} /> : <UserPlus size={16} />}
                    {joinedGroup ? 'تم الانضمام' : 'انضمام للغروب'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="mt-5">
            <div className="mb-4 flex items-center gap-2">
              {steps.map((item, index) => (
                <span key={item.title} className={`h-2 rounded-full transition-all ${index === step ? 'w-12 bg-blue-400' : 'w-3 bg-slate-700'}`} />
              ))}
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button onClick={onSkip} className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-black text-slate-400 transition hover:bg-white/10 hover:text-white">
                تخطي الآن
              </button>
              <button
                onClick={handlePrimaryAction}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-blue-500 to-lime-400 px-6 py-3 text-sm font-black text-slate-950 shadow-lg shadow-blue-500/25 transition hover:scale-[1.01]"
              >
                {isGroupStep && !joinedGroup ? 'انضم أولاً' : isLast ? 'ابدأ المنافسة الآن' : 'التالي'}
                <ArrowLeft size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};
