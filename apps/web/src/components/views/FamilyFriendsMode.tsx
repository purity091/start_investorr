import React from 'react';
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
};

const STEPS: StepConfig[] = [
  {
    id: 'nickname',
    title: 'تسمية المشروع',
    subtitle: 'اسم أولي يوضح فكرة المشروع واتجاهه.',
    placeholder: 'مثال: منصة تربط الحرفيين المحليين بالعملاء داخل المدينة.',
    tip: 'اختر اسماً بسيطاً أو وصفاً موجزاً يعبّر عن الجوهر بدون تعقيد.',
    icon: Layers,
  },
  {
    id: 'simpleProblem',
    title: 'المشكلة الأساسية',
    subtitle: 'ما المشكلة الحقيقية التي يحاول المشروع حلها؟',
    placeholder: 'مثال: صعوبة وصول العميل إلى مزودي خدمة موثوقين بسرعة وبسعر واضح.',
    tip: 'ركز على الألم الفعلي الذي يعاني منه العميل في حياته اليومية.',
    icon: Target,
  },
  {
    id: 'grandmaExplanation',
    title: 'شرح الفكرة ببساطة',
    subtitle: 'اشرح كيف يعمل المشروع بلغة يفهمها أي شخص.',
    placeholder: 'مثال: التطبيق يربط العميل بمقدم الخدمة، ثم يتابع الطلب والدفع والتقييم في مكان واحد.',
    tip: 'تخيل أنك تشرح الفكرة لشخص ليس لديه خلفية تقنية أو استثمارية.',
    icon: Activity,
  },
  {
    id: 'firstUser',
    title: 'العميل الأول',
    subtitle: 'من الشريحة الأقرب لاستخدام المشروع عند الإطلاق؟',
    placeholder: 'مثال: الأسر الشابة، أصحاب المشاريع الصغيرة، الطلاب، أو الشركات الصغيرة.',
    tip: 'حدد مجموعة أولى صريحة يمكنك الوصول إليها بسهولة في أول شهرين.',
    icon: Users,
  },
  {
    id: 'moneyModel',
    title: 'طريقة تحقيق الإيراد',
    subtitle: 'كيف سيحقق المشروع الدخل أو الربح؟',
    placeholder: 'مثال: اشتراك شهري، عمولة على الطلبات، رسوم تشغيل ثابتة، أو بيع مباشر.',
    tip: 'اختر طريقة واحدة رئيسية واضحة للبدء قبل التفكير في مصادر دخل متفرعة.',
    icon: DollarSign,
  },
];

export const FamilyFriendsMode: React.FC<{
  data: FamilyFriendsData;
  currentStep: number;
  onChange: (data: Partial<FamilyFriendsData>) => void;
  onStepChange: (step: number) => void;
  onSave: () => void;
  onComplete: () => void;
}> = ({ data, currentStep, onChange, onStepChange, onSave, onComplete }) => {

  const current = STEPS[currentStep];
  const CurrentIcon = current.icon;
  const currentValue = data[current.id] || '';
  const hasValue = currentValue.trim().length > 0;
  const isLast = currentStep === STEPS.length - 1;
  const completedCount = STEPS.filter((step) => (data[step.id] || '').trim().length > 0).length;
  const progress = Math.round((completedCount / STEPS.length) * 100);

  return (
    <main dir="rtl" className="mx-auto w-full max-w-7xl space-y-3.5 sm:space-y-6 px-2.5 py-2.5 sm:py-6 sm:px-6 lg:px-8 text-right font-sans">
      
      {/* Header Banner - Clean Solid shadcn Card */}
      <Card className="p-3.5 sm:p-6 bg-card border border-border shadow-2xs rounded-2xl">
        <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="gap-1 font-semibold text-xs py-0.5 px-2.5 bg-background">
                <Heart className="size-3 text-primary fill-primary/10" />
                النموذج السهل
              </Badge>
              <Badge variant="secondary" className="font-semibold text-xs py-0.5 px-2.5">
                الخطوة {currentStep + 1} من {STEPS.length}
              </Badge>
            </div>

            <div className="space-y-1">
              <h1 className="text-lg font-extrabold tracking-tight text-foreground sm:text-3xl">
                ابدأ دراسة الجدوى بلغة بسيطة
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                مسار مبسط مخصص للبدء الفوري بدون تعقيدات استثمارية مبكرة، ليساعدك في بلورة الرؤية واختبار القبول الأول للفكرة.
              </p>
            </div>
          </div>

          {/* Clean Progress Widget */}
          <div className="min-w-[200px] sm:min-w-[240px] bg-muted/30 rounded-xl p-3 sm:p-4 border border-border space-y-2 shrink-0">
            <div className="flex items-center justify-between text-xs font-semibold text-foreground">
              <span>نسبة الإنجاز</span>
              <span className="font-mono text-primary font-bold">{progress}% ({completedCount} من {STEPS.length})</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div 
                className="h-full rounded-full bg-primary transition-all duration-300 ease-in-out" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Mobile Horizontal Step Bar */}
      <div className="lg:hidden w-full flex overflow-x-auto whitespace-nowrap scrollbar-none gap-1.5 py-0.5">
        {STEPS.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = (data[step.id] || '').trim().length > 0;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepChange(index)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold shrink-0 transition-all border cursor-pointer",
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                  : isCompleted
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                    : "bg-card text-muted-foreground border-border"
              )}
            >
              <span className="flex size-4 items-center justify-center rounded-full text-[9px] font-bold bg-background/20">
                {isCompleted ? <CheckCircle2 className="size-3" /> : index + 1}
              </span>
              <span>{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid Layout */}
      <div className="grid gap-3.5 sm:gap-6 lg:grid-cols-[300px_1fr]">
        
        {/* Step Navigation Sidebar (Right) */}
        <Card className="rounded-xl border border-border shadow-xs bg-card overflow-hidden">
          <CardHeader className="bg-muted/20 border-b border-border pb-3.5">
            <CardTitle className="text-base font-bold text-foreground">خطوات النموذج</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              اختر أي خطوة وعدّل الإجابة بكل سهولة.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 space-y-1.5">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = (data[step.id] || '').trim().length > 0;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => onStepChange(index)}
                  className={cn(
                    "w-full text-right p-3 rounded-lg transition-colors border flex items-center gap-3 cursor-pointer outline-none",
                    isActive
                      ? "bg-secondary text-secondary-foreground border-primary/40 font-medium shadow-2xs"
                      : "bg-card border-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {/* Step Icon Container */}
                  <div className={cn(
                    "size-8 shrink-0 rounded-md flex items-center justify-center border transition-colors",
                    isCompleted 
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
                      : isActive 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-muted text-muted-foreground border-border"
                  )}>
                    {isCompleted ? <CheckCircle2 className="size-4" /> : <Icon className="size-4" />}
                  </div>

                  {/* Step Title & Subtitle */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className={cn(
                        "text-xs font-semibold truncate",
                        isActive ? "text-foreground font-bold" : "text-foreground/80"
                      )}>
                        {step.title}
                      </p>
                      {isCompleted && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/50">
                          تمت
                        </span>
                      )}
                    </div>
                    <p className="truncate text-[11px] text-muted-foreground mt-0.5">{step.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Active Step Question Form (Left) */}
        <Card className="rounded-xl border border-border shadow-xs bg-card flex flex-col justify-between overflow-hidden">
          <CardHeader className="border-b border-border bg-muted/10 p-6">
            <div className="flex items-start gap-4">
              <div className="size-11 shrink-0 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                <CurrentIcon className="size-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-semibold text-xs bg-background">
                    الخطوة {currentStep + 1}
                  </Badge>
                  <CardTitle className="text-xl font-bold text-foreground">{current.title}</CardTitle>
                </div>
                <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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
                  onBlur={onSave}
                  placeholder={current.placeholder}
                  className="min-h-[180px] resize-y bg-background text-right leading-relaxed text-sm text-foreground border-input rounded-lg p-4 font-medium"
                />
                
                <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                  <span>عدد الأحرف: <strong className="font-mono text-foreground">{currentValue.length}</strong></span>
                  {hasValue && (
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="size-3.5" />
                      مكتملة
                    </span>
                  )}
                </div>
              </div>

              {/* Helpful Tip Box */}
              <div className="p-3.5 rounded-lg bg-muted/40 border border-border text-foreground flex items-start gap-2.5 text-xs leading-relaxed">
                <Lightbulb className="size-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{current.tip}</span>
              </div>
            </div>

            {/* Action Buttons Footer */}
            <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onStepChange(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="h-9 px-4 rounded-md font-medium"
              >
                <ChevronRight className="size-4 ml-1" />
                الخطوة السابقة
              </Button>

              <Button
                type="button"
                size="sm"
                variant="default"
                onClick={() => {
                  if (!hasValue) return;
                  if (isLast) {
                    onComplete();
                    return;
                  }
                  onStepChange(Math.min(STEPS.length - 1, currentStep + 1));
                }}
                disabled={!hasValue}
                className="h-9 px-5 rounded-md font-medium gap-1.5 shadow-xs"
              >
                <span>{isLast ? 'إنشاء دراسة الجدوى' : 'الخطوة التالية'}</span>
                <ChevronLeft className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  );
};
