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
import { AIPromptHelper } from '@/components/features/business/AIPromptHelper';
import { useProjectWorkspace } from '@/features/workspace/ProjectWorkspaceContext';

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
  const { workspace } = useProjectWorkspace();

  const current = STEPS[currentStep];
  const CurrentIcon = current.icon;
  const currentValue = data[current.id] || '';
  const hasValue = currentValue.trim().length > 0;
  const isLast = currentStep === STEPS.length - 1;
  const completedCount = STEPS.filter((step) => (data[step.id] || '').trim().length > 0).length;
  const progress = Math.round((completedCount / STEPS.length) * 100);

  return (
    <main dir="rtl" className="mx-auto w-full max-w-7xl space-y-3.5 px-2.5 py-2.5 sm:py-4 sm:px-6 lg:px-8 text-right font-sans">
      
      {/* Single Unified Header Div - Clean, Borderless & Concise */}
      <div className="rounded-2xl border-0 bg-card p-3.5 sm:p-5 shadow-2xs space-y-3.5">
        {/* Top Row: Title + Progress + Active Step Info */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0 font-bold text-xs py-0.5 px-2.5">
              <Heart className="me-1 size-3 text-primary fill-primary/10 inline" />
              النموذج السهل
            </Badge>
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-foreground">
              دراسة الجدوى المبسطة
            </h1>
            <Badge variant="outline" className="border-0 bg-muted/60 text-[11px] px-2.5 py-0.5 font-bold text-muted-foreground">
              نسبة الإنجاز: {progress}% ({completedCount} من {STEPS.length})
            </Badge>
          </div>

          {/* Active Step Indicator */}
          <div className="flex items-center gap-2 text-xs shrink-0 bg-muted/30 px-3 py-1.5 rounded-xl">
            <span className="font-bold text-foreground">
              الخطوة {currentStep + 1} من {STEPS.length}: {current.title}
            </span>
            {hasValue && (
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-0 text-[10px] font-bold px-1.5 py-0">
                مكتمل
              </Badge>
            )}
          </div>
        </div>

        {/* Top Horizontal Step Tabs (Borderless) */}
        <div className="w-full flex overflow-x-auto whitespace-nowrap scrollbar-none gap-2 py-0.5">
          {STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = (data[step.id] || '').trim().length > 0;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onStepChange(index)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all border-0 cursor-pointer",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : isCompleted
                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20"
                      : "bg-muted/40 text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                )}
              >
                <span className={cn(
                  "flex size-4.5 items-center justify-center rounded-full text-[10px] font-bold shrink-0",
                  isActive ? "bg-primary-foreground/20 text-primary-foreground" : isCompleted ? "bg-emerald-500/20 text-emerald-700" : "bg-background text-muted-foreground"
                )}>
                  {isCompleted ? <CheckCircle2 className="size-3" /> : index + 1}
                </span>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-muted/50">
            <div 
              className="h-full rounded-full bg-primary transition-all duration-300 ease-in-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Active Step Question Form - Borderless & Full Width */}
      <div className="w-full flex flex-col gap-4">
        <Card className="rounded-2xl border-0 shadow-2xs bg-card flex flex-col justify-between overflow-hidden">
          <CardHeader className="border-0 bg-muted/10 p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="size-9 shrink-0 rounded-xl bg-primary/10 text-primary border-0 flex items-center justify-center">
                <CurrentIcon className="size-4.5" />
              </div>
              <div className="space-y-0.5">
                <CardTitle className="text-base font-bold text-foreground">{current.title}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  {current.subtitle}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-5 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Textarea Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap border-b border-border/40 pb-1.5">
                  <span className="text-xs font-bold text-foreground">مدخلات الفكرة والبيانات:</span>
                  <AIPromptHelper
                    sectionTitle={`الخطوة ${currentStep + 1}: ${current.title}`}
                    questionText={current.subtitle}
                    projectName={workspace.profile.name || data.nickname || undefined}
                    projectSector={workspace.profile.sectorLabel || workspace.profile.sectorGroup || undefined}
                    targetMarket={workspace.profile.countryLabel || undefined}
                    customerType={workspace.profile.customerType || undefined}
                    formData={{
                      currentStep: current.title,
                      allEnteredAnswers: data,
                    }}
                    onApplyAnswer={(ans) => onChange({ [current.id]: ans })}
                    compact
                  />
                </div>
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
