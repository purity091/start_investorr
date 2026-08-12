import React, { useEffect, useRef, useState } from 'react';
import { Activity, ArrowUpRight, CheckCircle2, DraftingCompass, RotateCcw, Rocket, Sparkles, Wand2 } from 'lucide-react';
import { FamilyFriendsMode } from '../../views/FamilyFriendsMode';
import { BusinessModelCanvas } from './BusinessModelCanvas';
import { MIT24Mode } from '../../views/MIT24Mode';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/textarea';
import { useProjectWorkspace } from '@/features/workspace/ProjectWorkspaceContext';

export type CreationMode = 'ai' | 'family' | 'scratch' | 'bmc' | 'mit24';

interface CreationStage {
  id: number;
  label: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
}

const INITIAL_STAGES: CreationStage[] = [
  { id: 1, label: 'تعريف الفكرة', description: 'قراءة الفكرة وتحويلها إلى مشكلة واضحة وقيمة مقترحة.', status: 'active' },
  { id: 2, label: 'تحليل الفجوات', description: 'تحديد الفرص التي تجعل المشروع قابلاً للتميّز.', status: 'pending' },
  { id: 3, label: 'تحديد العميل', description: 'صياغة الشريحة الأولى التي سيخدمها المشروع.', status: 'pending' },
  { id: 4, label: 'تجهيز المسار', description: 'تحويل المدخلات إلى مسار دراسة جدوى قابل للاستكمال.', status: 'pending' },
];

const quickTags = ['خدمات', 'تقنية', 'تجارة', 'تعليم', 'صحة'];

export const IdeaCreation: React.FC<{
  onBack: () => void;
  onBuildPlan?: () => void;
  initialMode?: CreationMode;
}> = ({ onBack, onBuildPlan, initialMode }) => {
  const { workspace, updateWorkspace, flushWorkspace } = useProjectWorkspace();
  const [activeMode] = useState<CreationMode>(initialMode || 'ai');
  const savedModel = (workspace as typeof workspace & {
    feasibilityModels?: Record<string, {
      step?: 'input' | 'processing' | 'result';
      currentStep?: number;
      prompt?: string;
      ideaData?: {
        nickname: string;
        simpleProblem: string;
        grandmaExplanation: string;
        firstUser: string;
        moneyModel: string;
      };
    }>;
  }).feasibilityModels?.[initialMode || 'ai'];
  const [step, setStep] = useState<'input' | 'processing' | 'result'>(savedModel?.step ?? 'input');
  const [prompt, setPrompt] = useState(savedModel?.prompt ?? '');
  const [ideaData, setIdeaData] = useState(savedModel?.ideaData ?? {
    nickname: '',
    simpleProblem: '',
    grandmaExplanation: '',
    firstUser: '',
    moneyModel: '',
  });
  const [familyStep, setFamilyStep] = useState(savedModel?.currentStep ?? 0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [initialMode]);
  const stepRef = useRef(step);
  const promptRef = useRef(prompt);
  const ideaDataRef = useRef(ideaData);
  const familyStepRef = useRef(familyStep);
  const [stages, setStages] = useState<CreationStage[]>(INITIAL_STAGES);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const resultTimeoutRef = useRef<number | null>(null);

  const persistModel = (next: {
    step?: 'input' | 'processing' | 'result';
    currentStep?: number;
    prompt?: string;
    ideaData?: typeof ideaData;
  }) => {
    const nextStep = next.step ?? stepRef.current;
    const nextFamilyStep = next.currentStep ?? familyStepRef.current;
    const nextPrompt = next.prompt ?? promptRef.current;
    const nextIdeaData = next.ideaData ?? ideaDataRef.current;

    updateWorkspace((current) => ({
      feasibilityModels: {
        ...current.feasibilityModels,
        [activeMode]: {
          ...current.feasibilityModels?.[activeMode],
          step: nextStep,
          currentStep: nextFamilyStep,
          prompt: nextPrompt,
          ideaData: nextIdeaData,
        },
      },
      profile: {
        ...current.profile,
        name: nextIdeaData.nickname || current.profile.name,
        opportunitySummary: nextIdeaData.grandmaExplanation || nextPrompt || current.profile.opportunitySummary,
      },
    }));
  };

  const updateStep = (nextStep: 'input' | 'processing' | 'result') => {
    stepRef.current = nextStep;
    setStep(nextStep);
    persistModel({ step: nextStep });
  };

  const updatePrompt = (nextPrompt: string) => {
    promptRef.current = nextPrompt;
    setPrompt(nextPrompt);
    persistModel({ prompt: nextPrompt });
  };

  const updateIdeaData = (updates: Partial<typeof ideaData>) => {
    const nextIdeaData = { ...ideaDataRef.current, ...updates };
    ideaDataRef.current = nextIdeaData;
    setIdeaData(nextIdeaData);
    persistModel({ ideaData: nextIdeaData });
  };

  const updateFamilyStep = (nextFamilyStep: number) => {
    familyStepRef.current = nextFamilyStep;
    setFamilyStep(nextFamilyStep);
    persistModel({ currentStep: nextFamilyStep });
    void flushWorkspace();
  };

  useEffect(() => {
    if (step !== 'processing') return;

    const interval = window.setInterval(() => {
      setStages((prev) => {
        const next = prev.map((stage) => ({ ...stage }));
        if (activeStageIndex < next.length) {
          next[activeStageIndex].status = 'completed';
          if (activeStageIndex + 1 < next.length) next[activeStageIndex + 1].status = 'active';
          setActiveStageIndex((value) => value + 1);
        } else {
          window.clearInterval(interval);
          resultTimeoutRef.current = window.setTimeout(() => {
            updateStep('result');
            resultTimeoutRef.current = null;
          }, 500);
        }
        return next;
      });
    }, 1200);

    return () => {
      window.clearInterval(interval);
      if (resultTimeoutRef.current) {
        window.clearTimeout(resultTimeoutRef.current);
        resultTimeoutRef.current = null;
      }
    };
  }, [activeStageIndex, step]);

  const resetFlow = () => {
    updateStep('input');
    setStages(INITIAL_STAGES);
    setActiveStageIndex(0);
  };

  if (step === 'input' && activeMode === 'family') {
    return (
      <FamilyFriendsMode
        data={ideaData}
        currentStep={familyStep}
        onChange={updateIdeaData}
        onStepChange={updateFamilyStep}
        onSave={() => void flushWorkspace()}
        onComplete={() => {
          updateStep('processing');
          void flushWorkspace();
        }}
      />
    );
  }

  if (step === 'input' && activeMode === 'bmc') {
    return <BusinessModelCanvas onComplete={() => updateStep('processing')} />;
  }

  if (step === 'input' && activeMode === 'mit24') {
    return <MIT24Mode onComplete={() => updateStep('processing')} />;
  }

  return (
    <main className="app-page-shell-wide space-y-3 sm:space-y-4 py-2 sm:py-3 text-right px-2.5 sm:px-4" dir="rtl">
      {step === 'input' && (
        <>
          <section className="rounded-xl bg-card p-3 sm:p-5 shadow-sm ring-1 ring-border/60">
            <div className="flex flex-col gap-2.5 sm:gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-1.5 sm:space-y-2">
                <Badge variant="secondary" className="w-fit">بناء دراسة جدوى مشروع</Badge>
                <div className="space-y-1 sm:space-y-2">
                  <h1 className="text-xl font-semibold tracking-tight text-foreground md:text-3xl">صف فكرة مشروعك كبداية</h1>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    هذه واجهة تمهيدية تساعد المستخدم على تحويل الوصف الأولي إلى مدخل منظم قبل الانتقال إلى بناء الخطة.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Card className="shadow-sm">
            <CardHeader className="p-3 sm:p-6 pb-2 sm:pb-3">
              <CardTitle className="text-base sm:text-lg">وصف الفكرة</CardTitle>
              <CardDescription className="text-xs sm:text-sm">اكتب المشكلة، العميل، والمنتج المقترح بجمل بسيطة.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-3 sm:p-6 pt-0 sm:pt-0">
              {activeMode === 'scratch' ? (
                <div className="flex flex-col items-center justify-center rounded-lg bg-muted/35 p-10 text-center">
                  <DraftingCompass className="mb-3 size-10 text-muted-foreground" />
                  <h2 className="text-lg font-semibold text-foreground">الوضع اليدوي قيد التجهيز</h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    سيتم تقديم واجهة كتابة كاملة لاحقاً. حالياً يمكن استخدام النموذج السهل أو BMC أو MIT 24 Steps.
                  </p>
                </div>
              ) : (
                <>
                  <Textarea
                    value={prompt}
                    onChange={(event) => updatePrompt(event.target.value)}
                    rows={5}
                    className="min-h-[150px] resize-y leading-7"
                    placeholder="مثال: منصة تساعد أصحاب المتاجر الصغيرة على إدارة الطلبات والمخزون والتوصيل من لوحة واحدة..."
                  />
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                      {quickTags.map((tag) => (
                        <Button
                          key={tag}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => updatePrompt(prompt ? `${prompt} ${tag}` : tag)}
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                    <Button disabled={prompt.trim().length < 10} onClick={() => updateStep('processing')} className="sm:w-fit">
                      <Wand2 className="size-4" />
                      تحليل الفكرة
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {step === 'processing' && (
        <Card className="shadow-sm">
          <CardHeader className="text-center p-4 sm:p-6 pb-3 sm:pb-3">
            <div className="mx-auto mb-2 flex size-11 items-center justify-center rounded-lg bg-muted text-foreground">
              <Activity className="size-5" />
            </div>
            <CardTitle>تجهيز المسار</CardTitle>
            <CardDescription>عرض بصري لحالة المعالجة قبل الانتقال للنتيجة.</CardDescription>
          </CardHeader>
          <CardContent className="mx-auto max-w-xl space-y-3 p-4 sm:p-6 pt-0 sm:pt-0">
            {stages.map((stage) => (
              <div key={stage.id} className="flex items-start gap-3 rounded-lg bg-muted/35 p-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-sm font-medium text-foreground">
                  {stage.status === 'completed' ? <CheckCircle2 className="size-4 text-emerald-600" /> : stage.id}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{stage.label}</p>
                  <p className="text-sm leading-6 text-muted-foreground">{stage.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 'result' && (
        <>
          <section className="rounded-xl bg-card p-4 sm:p-5 shadow-sm ring-1 ring-border/60">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-3">
                <Badge variant="secondary" className="w-fit">تحليل مكتمل</Badge>
                <div className="space-y-2">
                  <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">الفكرة جاهزة للتحويل إلى خطة</h1>
                  <p className="text-sm leading-7 text-muted-foreground">
                    تم تجهيز تصور أولي يساعد المستخدم على متابعة بناء دراسة الجدوى من مساحة العمل.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" onClick={resetFlow}>
                  <RotateCcw className="size-4" />
                  إعادة الضبط
                </Button>
                <Button onClick={onBuildPlan}>
                  <Rocket className="size-4" />
                  بناء خطة العمل
                </Button>
              </div>
            </div>
          </section>

          <section className="grid gap-3 md:grid-cols-4">
            {[
              ['التقييم الأولي', '9.4/10'],
              ['الجاذبية السوقية', '92%'],
              ['الميزة التنافسية', 'مرتفعة'],
              ['قابلية التوسع', 'عالية'],
            ].map(([label, value]) => (
              <Card key={label} className="shadow-sm">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-1 text-xl font-semibold text-foreground">{value}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <Card className="shadow-sm">
            <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-3">
              <CardTitle>ملخص الفكرة</CardTitle>
              <CardDescription>مخرجات واجهة فقط قابلة للتحويل لاحقاً إلى منطق برمجي.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2 p-4 sm:p-6 pt-0 sm:pt-0">
              <div className="rounded-lg bg-muted/35 p-4">
                <p className="text-sm font-medium text-foreground">الاسم المقترح</p>
                <p className="mt-1 text-sm text-muted-foreground">{ideaData.nickname || 'مشروع قابل للتطوير'}</p>
              </div>
              <div className="rounded-lg bg-muted/35 p-4">
                <p className="text-sm font-medium text-foreground">العميل الأول</p>
                <p className="mt-1 text-sm text-muted-foreground">{ideaData.firstUser || 'العميل صاحب الحاجة المباشرة'}</p>
              </div>
              <div className="rounded-lg bg-muted/35 p-4 md:col-span-2">
                <p className="text-sm font-medium text-foreground">الوصف</p>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">
                  {ideaData.grandmaExplanation || prompt || 'وصف المشروع سيظهر هنا بعد إدخال الفكرة.'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" onClick={onBuildPlan} className="w-full sm:w-fit">
            استكمال داخل مساحة المشروع
            <ArrowUpRight className="size-4" />
          </Button>
        </>
      )}
    </main>
  );
};
