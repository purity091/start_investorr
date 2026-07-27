import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as Lucide from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

import { QUESTIONS } from './constants';
import { analyzeWithAI } from './services/aiService';
import { ProgressDots } from './components/CommonUI';
import * as Renderers from './components/QuestionRenderer';
import ResultPage from './ResultPage';

export default function SmartBeginnerPro() {
  const [phase, setPhase] = useState<'form' | 'analyzing' | 'results'>('form');
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [tempAnswer, setTempAnswer] = useState<any>(null);
  const [error, setError] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingTimerRef = useRef<any>(null);

  const currentQ = QUESTIONS[qIndex];
  const formProgress = Math.round((qIndex / QUESTIONS.length) * 100);
  const isLastStep = qIndex === QUESTIONS.length - 1;

  const loadingMessages = [
    'تحليل الفكرة وربطها بمسارات السوق المناسبة...',
    'فهم العميل والمشكلة ومنطق القيمة المقترحة...',
    'قياس الجاهزية الأولية وهيكل الجدوى المحتمل...',
    'ترتيب المخاطر والفرص وخطوات التنفيذ الأقرب...',
    'تجهيز القراءة النهائية بشكل واضح وقابل للمراجعة...',
  ];

  useEffect(() => {
    if (phase !== 'analyzing') return;
    let i = 0;
    loadingTimerRef.current = setInterval(() => {
      i = (i + 1) % loadingMessages.length;
      setLoadingStep(i);
    }, 1400);
    return () => clearInterval(loadingTimerRef.current);
  }, [phase]);

  const runAnalysis = useCallback(async (finalAnswers: any) => {
    setPhase('analyzing');
    setError('');

    try {
      await analyzeWithAI(finalAnswers, (process.env as any).API_KEY);
      setPhase('results');
    } catch (e: any) {
      setError(`حدث خطأ في التحليل: ${e.response?.data?.message || e.message}`);
      setPhase('form');
    }
  }, []);

  const handleAnswer = useCallback(
    (val: any) => {
      const q = QUESTIONS[qIndex];
      let newAnswers = { ...answers };

      if (['profile_builder', 'resources_check', 'goal_matrix', 'empathy_map'].includes(q.type)) {
        newAnswers = { ...answers, ...val };
      } else {
        newAnswers[q.id] = val;
      }

      setAnswers(newAnswers);
      setTempAnswer(null);

      if (qIndex < QUESTIONS.length - 1) {
        setQIndex(qIndex + 1);
      } else {
        runAnalysis(newAnswers);
      }
    },
    [qIndex, answers, runAnalysis],
  );

  if (phase === 'form') {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          <Card className="border-0 bg-background shadow-none">
            <CardHeader className="gap-5 px-0 pt-0">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="space-y-3">
                  <Badge variant="secondary" className="w-fit rounded-md px-3 py-1 font-medium">
                    النموذج السهل
                  </Badge>
                  <div className="space-y-2">
                    <CardTitle className="text-2xl leading-tight sm:text-3xl">
                      بناء دراسة جدوى مشروع بشكل مبسط
                    </CardTitle>
                    <CardDescription className="max-w-3xl text-sm leading-7 sm:text-[15px]">
                      أجب على الأسئلة التالية بشكل مباشر. كل خطوة تضيف طبقة أوضح إلى دراسة الجدوى،
                      ثم تنتقل في النهاية إلى قراءة تحليلية تساعدك على اتخاذ القرار.
                    </CardDescription>
                  </div>
                </div>

                <div className="grid w-full gap-3 sm:grid-cols-3 xl:w-[520px]">
                  <div className="rounded-xl bg-muted/40 p-4">
                    <div className="text-xs font-medium text-muted-foreground">المرحلة الحالية</div>
                    <div className="mt-2 text-2xl font-semibold text-foreground">{qIndex + 1}</div>
                  </div>
                  <div className="rounded-xl bg-muted/40 p-4">
                    <div className="text-xs font-medium text-muted-foreground">إجمالي الأسئلة</div>
                    <div className="mt-2 text-2xl font-semibold text-foreground">{QUESTIONS.length}</div>
                  </div>
                  <div className="rounded-xl bg-muted/40 p-4">
                    <div className="text-xs font-medium text-muted-foreground">نسبة الإنجاز</div>
                    <div className="mt-2 text-2xl font-semibold text-foreground">{formProgress}%</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-muted/20 px-4 py-4 sm:px-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-foreground">مسار الإجابة</div>
                    <div className="flex items-center gap-3">
                      <div className="h-2.5 w-48 overflow-hidden rounded-full bg-muted sm:w-72">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-300"
                          style={{ width: `${formProgress}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{formProgress}%</span>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <ProgressDots
                      steps={QUESTIONS.map((q) => ({ icon: q.icon, id: q.id }))}
                      current={qIndex}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-muted/20 shadow-none">
            <CardContent className="px-5 py-5 sm:px-6">
              <div key={qIndex} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-6 flex items-start gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-background text-foreground shadow-sm">
                    {(Lucide as any)[currentQ.icon]
                      ? React.createElement((Lucide as any)[currentQ.icon], {
                          size: 18,
                          strokeWidth: 2.25,
                        })
                      : <Lucide.Target size={18} />}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold leading-8 text-foreground sm:text-2xl">
                      {currentQ.label}
                    </h2>
                    <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                      {currentQ.sublabel}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  {currentQ.type === 'cards' && (
                    <Renderers.QuestionCards
                      question={currentQ}
                      onSelect={handleAnswer}
                      selected={answers[currentQ.id]}
                      tempAnswer={tempAnswer}
                      setTempAnswer={setTempAnswer}
                    />
                  )}
                  {currentQ.type === 'textarea_choice' && (
                    <Renderers.QuestionTextAreaChoice
                      question={currentQ}
                      onSelect={handleAnswer}
                      selected={answers[currentQ.id]}
                      tempAnswer={tempAnswer}
                      setTempAnswer={setTempAnswer}
                    />
                  )}
                  {currentQ.type === 'empathy_map' && (
                    <Renderers.EmpathyMapRenderer
                      question={currentQ}
                      onSelect={handleAnswer}
                      selected={answers[currentQ.id]}
                      tempAnswer={tempAnswer}
                      setTempAnswer={setTempAnswer}
                    />
                  )}
                  {currentQ.type === 'profile_builder' && (
                    <Renderers.MultiSelectionRenderer
                      question={currentQ}
                      items={currentQ.profiles!}
                      fieldPrefix="customer"
                      onSelect={handleAnswer}
                      selected={answers}
                      tempAnswer={tempAnswer}
                      setTempAnswer={setTempAnswer}
                    />
                  )}
                  {currentQ.type === 'competition_map' && (
                    <Renderers.CompetitionMap
                      question={currentQ}
                      onSelect={handleAnswer}
                      selected={answers}
                      tempAnswer={tempAnswer}
                      setTempAnswer={setTempAnswer}
                    />
                  )}
                  {currentQ.type === 'resources_check' && (
                    <Renderers.MultiSelectionRenderer
                      question={currentQ}
                      items={currentQ.items!}
                      fieldPrefix=""
                      onSelect={handleAnswer}
                      selected={answers}
                      tempAnswer={tempAnswer}
                      setTempAnswer={setTempAnswer}
                    />
                  )}
                  {currentQ.type === 'validation_scale' && (
                    <Renderers.ValidationScale
                      question={currentQ}
                      onSelect={handleAnswer}
                      selected={answers[currentQ.id]}
                      tempAnswer={tempAnswer}
                      setTempAnswer={setTempAnswer}
                    />
                  )}
                  {currentQ.type === 'goal_matrix' && (
                    <Renderers.MultiSelectionRenderer
                      question={currentQ}
                      items={currentQ.goals!}
                      fieldPrefix=""
                      onSelect={handleAnswer}
                      selected={answers}
                      tempAnswer={tempAnswer}
                      setTempAnswer={setTempAnswer}
                    />
                  )}
                  {currentQ.type === 'fear_select' && (
                    <Renderers.FearSelect
                      question={currentQ}
                      onSelect={handleAnswer}
                      selected={answers[currentQ.id]}
                      tempAnswer={tempAnswer}
                      setTempAnswer={setTempAnswer}
                    />
                  )}
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs font-medium text-muted-foreground">
                    يمكنك تعديل أي خطوة قبل الانتقال إلى النتائج النهائية.
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => (qIndex > 0 ? setQIndex(qIndex - 1) : window.location.reload())}
                    >
                      <Lucide.ArrowRight size={16} />
                      العودة
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleAnswer(tempAnswer || answers[currentQ.id] || { skipped: true })}
                    >
                      {isLastStep ? 'إنشاء التحليل النهائي' : 'الخطوة التالية'}
                      <Lucide.Zap size={16} />
                    </Button>
                  </div>
                </div>

                {error ? (
                  <div className="mt-6 flex items-center gap-3 rounded-2xl bg-rose-50 px-4 py-4 text-sm font-medium text-rose-700">
                    <Lucide.AlertOctagon size={18} />
                    {error}
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (phase === 'analyzing') {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-4 py-8 sm:px-6">
          <Card className="w-full border-0 bg-muted/20 shadow-none">
            <CardContent className="flex flex-col items-center gap-8 px-6 py-10 text-center sm:px-10">
              <div className="flex size-24 items-center justify-center rounded-[2rem] bg-background text-primary shadow-sm">
                <Lucide.Cpu size={40} className="animate-spin-slow" />
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
                  جارٍ تجهيز التحليل النهائي
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  نقوم الآن بترتيب الإجابات وتحويلها إلى مخرجات أوضح تساعدك على قراءة دراسة الجدوى
                  بشكل أفضل.
                </p>
              </div>

              <div className="w-full rounded-2xl bg-background/80 px-5 py-5 shadow-sm">
                <p className="text-sm font-medium leading-7 text-foreground">{loadingMessages[loadingStep]}</p>
              </div>

              <div className="flex justify-center gap-2">
                {loadingMessages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      loadingStep === i ? 'w-12 bg-primary' : 'w-2 bg-muted-foreground/20'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    return <ResultPage />;
  }

  return null;
}
