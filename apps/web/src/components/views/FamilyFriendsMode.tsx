import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  DollarSign, 
  Heart, 
  Layers, 
  Target, 
  Users, 
  Sparkles,
  Lightbulb
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface FamilyFriendsData {
  nickname: string;
  simpleProblem: string;
  grandmaExplanation: string;
  firstUser: string;
  moneyModel: string;
}

type StepConfig = {
  id: keyof FamilyFriendsData;
  title: string;
  subtitle: string;
  placeholder: string;
  tip: string;
  icon: React.ElementType;
  colorClass: {
    activeBg: string;
    iconBg: string;
    iconText: string;
    badgeBg: string;
    border: string;
  };
};

const STEPS: StepConfig[] = [
  {
    id: 'nickname',
    title: 'تسمية المشروع',
    subtitle: 'اسم أولي يوضح فكرة المشروع واتجاهه.',
    placeholder: 'مثال: منصة تربط الحرفيين المحليين بالعملاء داخل المدينة.',
    tip: 'نصيحة: اختر اسماً بسيطاً أو وصفاً موجزاً يعبّر عن الجوهر بدون تعقيد.',
    icon: Layers,
    colorClass: {
      activeBg: 'bg-blue-50/80 border-blue-200',
      iconBg: 'bg-blue-600 text-white shadow-blue-500/20',
      iconText: 'text-blue-600',
      badgeBg: 'bg-blue-100 text-blue-700 border-blue-200',
      border: 'border-blue-500'
    }
  },
  {
    id: 'simpleProblem',
    title: 'المشكلة الأساسية',
    subtitle: 'ما المشكلة الحقيقية التي يحاول المشروع حلها؟',
    placeholder: 'مثال: صعوبة وصول العميل إلى مزودي خدمة موثوقين بسرعة وبسعر واضح.',
    tip: 'نصيحة: ركز على الألم الفعلي الذي يعاني منه العميل في حياته اليومية.',
    icon: Target,
    colorClass: {
      activeBg: 'bg-amber-50/80 border-amber-200',
      iconBg: 'bg-amber-600 text-white shadow-amber-500/20',
      iconText: 'text-amber-600',
      badgeBg: 'bg-amber-100 text-amber-700 border-amber-200',
      border: 'border-amber-500'
    }
  },
  {
    id: 'grandmaExplanation',
    title: 'شرح الفكرة ببساطة',
    subtitle: 'اشرح كيف يعمل المشروع بلغة يفهمها أي شخص.',
    placeholder: 'مثال: التطبيق يربط العميل بمقدم الخدمة، ثم يتابع الطلب والدفع والتقييم في مكان واحد.',
    tip: 'نصيحة: تخيل أنك تشرح الفكرة لشخص ليس لديه خلفية تقنية أو استثمارية.',
    icon: Activity,
    colorClass: {
      activeBg: 'bg-emerald-50/80 border-emerald-200',
      iconBg: 'bg-emerald-600 text-white shadow-emerald-500/20',
      iconText: 'text-emerald-600',
      badgeBg: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      border: 'border-emerald-500'
    }
  },
  {
    id: 'firstUser',
    title: 'العميل الأول',
    subtitle: 'من الشريحة الأقرب لاستخدام المشروع عند الإطلاق؟',
    placeholder: 'مثال: الأسر الشابة، أصحاب المشاريع الصغيرة، الطلاب، أو الشركات الصغيرة.',
    tip: 'نصيحة: حدد مجموعة أولى صريحة يمكنك الوصول إليها بسهولة في أول شهرين.',
    icon: Users,
    colorClass: {
      activeBg: 'bg-purple-50/80 border-purple-200',
      iconBg: 'bg-purple-600 text-white shadow-purple-500/20',
      iconText: 'text-purple-600',
      badgeBg: 'bg-purple-100 text-purple-700 border-purple-200',
      border: 'border-purple-500'
    }
  },
  {
    id: 'moneyModel',
    title: 'طريقة تحقيق الإيراد',
    subtitle: 'كيف سيحقق المشروع الدخل أو الربح؟',
    placeholder: 'مثال: اشتراك شهري، عمولة على الطلبات، رسوم تشغيل ثابتة، أو بيع مباشر.',
    tip: 'نصيحة: اختر طريقة واحدة رئيسية واضحة للبدء قبل التفكير في مصادر دخل متفرعة.',
    icon: DollarSign,
    colorClass: {
      activeBg: 'bg-indigo-50/80 border-indigo-200',
      iconBg: 'bg-indigo-600 text-white shadow-indigo-500/20',
      iconText: 'text-indigo-600',
      badgeBg: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      border: 'border-indigo-500'
    }
  },
];

export const FamilyFriendsMode: React.FC<{
  data: FamilyFriendsData;
  onChange: (data: Partial<FamilyFriendsData>) => void;
  onComplete: () => void;
}> = ({ data, onChange, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const current = STEPS[currentStep];
  const CurrentIcon = current.icon;
  const currentValue = data[current.id] || '';
  const hasValue = currentValue.trim().length > 0;
  const isLast = currentStep === STEPS.length - 1;
  const completedCount = STEPS.filter((step) => (data[step.id] || '').trim().length > 0).length;
  const progress = Math.round((completedCount / STEPS.length) * 100);

  return (
    <main dir="rtl" className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 text-right sm:px-6 lg:px-8 font-sans animate-in fade-in slide-in-from-bottom-3 duration-300">
      
      {/* Enhanced Header Banner with Colorful Accents */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 sm:p-8 text-white shadow-lg border border-slate-800">
        <div className="absolute -left-16 -top-16 size-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 size-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold px-3 py-1 gap-1.5 shadow-2xs">
                <Heart className="size-3.5 fill-emerald-400/30 text-emerald-400" />
                النموذج السهل (Family & Friends)
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-slate-200 border-white/15 font-semibold px-3 py-1">
                الخطوة {currentStep + 1} من {STEPS.length}
              </Badge>
            </div>

            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
                <span>صغ فكرة مشروعك ببساطة ووضوح</span>
                <Sparkles className="size-6 text-amber-400 animate-pulse hidden sm:inline-block" />
              </h1>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-normal">
                مسار خفيف وسريع مخصص للبدء الفوري بدون تعقيدات استثمارية مبكرة، ليساعدك في بلورة الرؤية واختبار القبول الأول للفكرة.
              </p>
            </div>
          </div>

          {/* Glowing Progress Widget */}
          <div className="min-w-[240px] bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 space-y-2.5 shrink-0">
            <div className="flex items-center justify-between text-xs font-bold text-slate-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-400" />
                نسبة الإنجاز
              </span>
              <span className="font-mono text-emerald-300 text-sm">{completedCount} من {STEPS.length} مكتملة ({progress}%)</span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-slate-900/60 p-0.5 border border-white/5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 transition-all duration-500 ease-out shadow-sm" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        
        {/* Step Navigation Sidebar (Right) */}
        <Card className="rounded-2xl border-slate-200/80 shadow-xs bg-white overflow-hidden">
          <CardHeader className="bg-slate-50/70 border-b border-slate-100 pb-3.5">
            <CardTitle className="text-base font-bold text-slate-900">خطوات النموذج</CardTitle>
            <CardDescription className="text-xs text-slate-500">
              انقر على أي خطوة للتنقل أو التعديل بكل حرية.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 space-y-2">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = (data[step.id] || '').trim().length > 0;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    "w-full text-right p-3 rounded-xl transition-all duration-200 border flex items-center gap-3 cursor-pointer group outline-none",
                    isActive
                      ? `${step.colorClass.activeBg} ${step.colorClass.border} shadow-2xs`
                      : "bg-white border-slate-100 hover:bg-slate-50/80 hover:border-slate-200"
                  )}
                >
                  {/* Step Icon Container */}
                  <div className={cn(
                    "size-9 shrink-0 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105",
                    isCompleted 
                      ? "bg-emerald-500 text-white shadow-xs" 
                      : isActive 
                        ? `${step.colorClass.iconBg} shadow-xs` 
                        : "bg-slate-100 text-slate-500"
                  )}>
                    {isCompleted ? <CheckCircle2 className="size-5" /> : <Icon className="size-4.5" />}
                  </div>

                  {/* Step Title & Status */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className={cn(
                        "text-xs font-bold truncate",
                        isActive ? "text-slate-900 font-extrabold" : "text-slate-700"
                      )}>
                        {step.title}
                      </p>
                      {isCompleted && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200/60">
                          تمت
                        </span>
                      )}
                    </div>
                    <p className="truncate text-[11px] text-slate-500 mt-0.5">{step.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Active Step Question Form (Left) */}
        <Card className="rounded-2xl border-slate-200/80 shadow-xs bg-white flex flex-col justify-between overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-slate-50/40 p-6">
            <div className="flex items-start gap-4">
              <div className={cn(
                "size-12 shrink-0 rounded-xl flex items-center justify-center shadow-md",
                current.colorClass.iconBg
              )}>
                <CurrentIcon className="size-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={cn("font-bold text-[11px] px-2.5 py-0.5", current.colorClass.badgeBg)}>
                    الخطوة {currentStep + 1}
                  </Badge>
                  <CardTitle className="text-xl font-black text-slate-900">{current.title}</CardTitle>
                </div>
                <CardDescription className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {current.subtitle}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-5 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Textarea Input */}
              <div className="space-y-2">
                <Textarea
                  value={currentValue}
                  onChange={(event) => onChange({ [current.id]: event.target.value })}
                  placeholder={current.placeholder}
                  className="min-h-[180px] resize-y bg-slate-50/50 focus:bg-white text-right leading-relaxed text-sm text-slate-900 border-slate-200/90 rounded-xl p-4 transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-2xs font-medium"
                />
                
                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span>عدد الأحرف: <strong className="font-mono text-slate-700">{currentValue.length}</strong></span>
                  {hasValue && (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="size-3.5" />
                      إجابة ممتازة جاهزة للتحفظ
                    </span>
                  )}
                </div>
              </div>

              {/* Helpful Tip Box */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 flex items-start gap-2.5 text-xs leading-relaxed">
                <Lightbulb className="size-4.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{current.tip}</span>
              </div>
            </div>

            {/* Action Buttons Footer */}
            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep((value) => Math.max(0, value - 1))}
                disabled={currentStep === 0}
                className="h-10 px-4 rounded-xl border-slate-200 text-slate-700 font-bold hover:bg-slate-100"
              >
                <ChevronRight className="size-4 ml-1.5" />
                الخطوة السابقة
              </Button>

              <Button
                type="button"
                size="sm"
                onClick={() => {
                  if (!hasValue) return;
                  if (isLast) {
                    onComplete();
                    return;
                  }
                  setCurrentStep((value) => Math.min(STEPS.length - 1, value + 1));
                }}
                disabled={!hasValue}
                className={cn(
                  "h-10 px-6 rounded-xl font-bold text-white shadow-sm transition-all gap-2",
                  isLast 
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-600/20" 
                    : "bg-slate-900 hover:bg-slate-800 text-white"
                )}
              >
                <span>{isLast ? 'إنشاء دراسة الجدوى وتوليد الخطة' : 'الخطوة التالية'}</span>
                {isLast ? <Sparkles className="size-4 text-amber-300" /> : <ChevronLeft className="size-4 mr-1.5" />}
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  );
};
