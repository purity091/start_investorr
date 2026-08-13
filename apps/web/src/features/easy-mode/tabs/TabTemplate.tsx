import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import * as Lucide from "lucide-react";
import { BaseCard } from "../result_components/CardDesignSystem";
import { ProgressDots } from "../components/CommonUI";
import * as Renderers from "../components/QuestionRenderer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface TabQuestion {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  type: string;
  options?: any[];
  profiles?: any[];
  items?: any[];
  goals?: any[];
  step?: number;
}

export interface TabConfig {
  id: string;
  title: string;
  subtitle: string;
  bannerTitle: string;
  bannerSubtitle: string;
  themeColor: string;
  questions: TabQuestion[];
  loadingMessages: string[];
  resultsTitle: string;
}

interface TabTemplateProps {
  config: TabConfig;
  isGenerated: boolean;
  onGenerate: (answers: any) => void;
  renderResults: (answers: any) => React.ReactNode;
}

export const TabTemplate: React.FC<TabTemplateProps> = ({
  config,
  isGenerated,
  onGenerate,
  renderResults
}) => {
  const [answers, setAnswers] = useState<any>(null);

  const handleGenerate = (vals: any) => {
    setAnswers(vals);
    onGenerate(vals);
  };

  return (
    <div className="w-full space-y-6" dir="rtl">
      {!isGenerated ? (
        <TabForm config={config} onFinish={handleGenerate} />
      ) : (
        <div className="space-y-6 animate-in fade-in duration-500 w-full">
          {/* User Inputs Summary Banner */}
          {answers && Object.keys(answers).length > 0 && (
            <div className="p-4 sm:p-5 bg-card border border-border rounded-xl shadow-xs space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="size-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Lucide.UserCheck size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground m-0">مدخلاتك الفعالة لهذا التحليل</h3>
                    <p className="text-xs text-muted-foreground m-0">البيانات التي قمت بتحديدها كمُدخلات مباشرة من طرفك</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-xs font-bold gap-1 px-2.5 py-1">
                  <Lucide.UserCheck size={13} />
                  <span>مدخَلك المباشر</span>
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {Object.entries(answers).map(([qId, val]: [string, any]) => {
                  const questionObj = config.questions?.find(q => q.id === qId);
                  const label = questionObj?.label || qId;
                  let displayVal = typeof val === 'object' ? JSON.stringify(val) : String(val);
                  if (questionObj?.options) {
                    const opt = questionObj.options.find((o: any) => (o.val || o.id) === val);
                    if (opt) displayVal = opt.title || opt.label || displayVal;
                  }
                  return (
                    <div key={qId} className="p-3 bg-muted/40 rounded-lg text-xs flex flex-col gap-1 border border-border/60">
                      <span className="font-semibold text-muted-foreground text-[11px]">{label}</span>
                      <span className="font-bold text-foreground truncate">{displayVal || "غير محدد"}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border shadow-xs">
            <div className="size-10 rounded-xl flex items-center justify-center text-white shadow-xs shrink-0" style={{ backgroundColor: config.themeColor }}>
              <Lucide.ShieldCheck size={20} />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-foreground m-0">{config.resultsTitle}</h2>
          </div>
          {renderResults(answers)}
        </div>
      )}
    </div>
  );
};

const TabForm = ({ config, onFinish }: { config: TabConfig, onFinish: (vals: any) => void }) => {
  const [currentStepNumber, setCurrentStepNumber] = useState(1);
  const [answers, setAnswers] = useState<any>({});
  const [tempAnswers, setTempAnswers] = useState<any>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const analysisIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const steps = useMemo(() => {
    const map = new Map<number, TabQuestion[]>();
    config.questions.forEach(q => {
      const s = q.step || 1;
      if (!map.has(s)) map.set(s, []);
      map.get(s)!.push(q);
    });
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]).map(([num, qs]) => ({ num, qs }));
  }, [config.questions]);

  const currentStep = steps.find(s => s.num === currentStepNumber) || steps[0];
  const totalSteps = steps.length;

  useEffect(() => {
    return () => {
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
    };
  }, []);

  const handleNext = useCallback(() => {
    const newAnswers = { ...answers, ...tempAnswers };
    setAnswers(newAnswers);
    setTempAnswers({});

    if (currentStepNumber < totalSteps) {
      setCurrentStepNumber(currentStepNumber + 1);
    } else {
      setIsAnalyzing(true);
      let i = 0;
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
      analysisIntervalRef.current = setInterval(() => {
        i++;
        if (i < config.loadingMessages.length) setLoadingStep(i);
        else {
          if (analysisIntervalRef.current) {
            clearInterval(analysisIntervalRef.current);
            analysisIntervalRef.current = null;
          }
          onFinish(newAnswers);
        }
      }, 1200);
    }
  }, [currentStepNumber, totalSteps, answers, tempAnswers, config, onFinish]);

  const setSingleAnswer = (id: string, val: any) => {
    setTempAnswers(prev => ({ ...prev, [id]: val }));
  };

  if (!config.questions || config.questions.length === 0) {
    return (
      <div className="py-12 text-center bg-card rounded-2xl p-6 border border-border shadow-xs">
        <Lucide.Hammer size={32} className="text-primary mx-auto mb-3" />
        <h3 className="text-sm font-bold text-foreground">هذا المختبر قيد التحديث</h3>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center bg-card rounded-2xl p-8 border border-border text-foreground shadow-xs space-y-4">
        <Lucide.Cpu size={36} className="animate-spin text-primary" />
        <h2 className="text-base font-bold text-center">جاري استخراج التحليلات...</h2>
        <div className="px-4 py-2 bg-primary/10 rounded-full">
          <p className="text-xs text-primary font-semibold">{config.loadingMessages[loadingStep]}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6" dir="rtl">


      {/* Main Container - Full Width Input Form */}
      <div className="w-full space-y-6">
        <BaseCard isInitiallyOpen={true} className="w-full">
          {/* Progress Header */}
          <div className="space-y-4 mb-6 pb-5 border-b border-border">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 gap-1.5 px-3 py-1 font-bold text-xs">
                <Lucide.Layers size={13} />
                <span>الخطوة {currentStepNumber} من {totalSteps}</span>
              </Badge>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                <Lucide.UserCheck size={14} className="text-emerald-600" />
                <span>مدخَلك المباشر</span>
              </div>
            </div>

            <ProgressDots
              steps={steps.map(s => ({ icon: s.qs[0].icon, id: s.num.toString() }))}
              current={currentStepNumber - 1}
              onStepClick={(stepNum) => setCurrentStepNumber(stepNum)}
            />
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {currentStep.qs.map((q) => {
              const currentVal = tempAnswers[q.id] !== undefined ? tempAnswers[q.id] : answers[q.id];
              const hasAnswer = currentVal !== undefined && currentVal !== null && currentVal !== "";

              return (
                <div key={q.id} className="space-y-4 p-4 sm:p-5 rounded-xl bg-card border border-border/70 shadow-2xs">
                  {/* Question Header */}
                  <div className="flex gap-3.5 items-start justify-between">
                    <div className="flex gap-3.5 items-start flex-1">
                      <div className="size-9 sm:size-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        {React.createElement((Lucide as any)[q.icon] || Lucide.Target, { size: 18 })}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground tracking-tight leading-snug m-0">{q.label}</h3>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                                >
                                  <Lucide.HelpCircle size={13} />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs text-xs p-3 leading-relaxed font-medium bg-popover text-popover-foreground border border-border shadow-md">
                                <p className="font-bold text-primary mb-1">توضيح الخبراء:</p>
                                <p>{getHintForQuestion(q, config.id)}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          {hasAnswer && (
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 gap-1">
                              <Lucide.UserCheck size={11} />
                              <span>مدخَلك الحالي</span>
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 m-0 font-medium leading-relaxed">{q.sublabel}</p>
                      </div>
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="min-h-[45px]">
                    <RenderQuestion
                      question={q}
                      answer={currentVal}
                      onAnswer={(val) => setSingleAnswer(q.id, val)}
                      themeColor={config.themeColor}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="mt-8 pt-4 flex flex-col sm:flex-row gap-3 sm:justify-between items-center border-t border-border">
            <Button
              variant="outline"
              onClick={() => currentStepNumber > 1 && setCurrentStepNumber(currentStepNumber - 1)}
              disabled={currentStepNumber === 1}
              className="w-full sm:w-auto text-xs font-semibold rounded-lg"
            >
              الخطوة السابقة
            </Button>
            <Button
              onClick={handleNext}
              className="w-full sm:w-auto gap-2 text-xs font-bold rounded-lg shadow-xs"
              style={{ backgroundColor: config.themeColor }}
            >
              <span>{currentStepNumber === totalSteps ? "تحليل النتائج وتنفيذ الاستراتيجية" : "الخطوة التالية"}</span>
              <Lucide.Zap size={15} />
            </Button>
          </div>
        </BaseCard>
      </div>
    </div>
  );
};

const RenderQuestion = ({ question, answer, onAnswer, themeColor }: { question: TabQuestion, answer: any, onAnswer: (val: any) => void, themeColor: string }) => {
  const handleSelect = (val: any) => {
    onAnswer(val);
  };

  switch (question.type) {
    case 'cards':
      return <Renderers.QuestionCards question={question} onSelect={handleSelect} selected={answer} tempAnswer={answer} setTempAnswer={onAnswer} themeColor={themeColor} />;
    case 'textarea_choice':
      return <Renderers.QuestionTextAreaChoice question={question} onSelect={handleSelect} selected={answer} tempAnswer={answer} setTempAnswer={onAnswer} themeColor={themeColor} />;
    case 'empathy_map':
      return <Renderers.EmpathyMapRenderer question={question} onSelect={handleSelect} selected={answer} tempAnswer={answer} setTempAnswer={onAnswer} themeColor={themeColor} />;
    case 'competition_map':
      return <Renderers.CompetitionMap question={question} onSelect={handleSelect} selected={answer} tempAnswer={answer} setTempAnswer={onAnswer} themeColor={themeColor} />;
    case 'profile_builder':
      return <Renderers.MultiSelectionRenderer question={question} items={question.profiles!} fieldPrefix="customer" onSelect={handleSelect} selected={answer} tempAnswer={answer} setTempAnswer={onAnswer} themeColor={themeColor} />;
    case 'resources_check':
      return <Renderers.MultiSelectionRenderer question={question} items={question.items!} fieldPrefix="" onSelect={handleSelect} selected={answer} tempAnswer={answer} setTempAnswer={onAnswer} themeColor={themeColor} />;
    case 'validation_scale':
      return <Renderers.ValidationScale question={question} onSelect={handleSelect} selected={answer} tempAnswer={answer} setTempAnswer={onAnswer} themeColor={themeColor} />;
    case 'goal_matrix':
      return <Renderers.MultiSelectionRenderer question={question} items={question.goals!} fieldPrefix="" onSelect={handleSelect} selected={answer} tempAnswer={answer} setTempAnswer={onAnswer} themeColor={themeColor} />;
    case 'fear_select':
      return <Renderers.FearSelect question={question} onSelect={handleSelect} selected={answer} tempAnswer={answer} setTempAnswer={onAnswer} themeColor={themeColor} />;
    default:
      return <div className="text-muted-foreground text-center py-3 text-xs">نوع السؤال غير معرّف</div>;
  }
};

export const getHintForQuestion = (questionOrId: any, _configId?: string): string => {
  const qId = typeof questionOrId === 'string' ? questionOrId : questionOrId?.id;
  const qObj = typeof questionOrId === 'object' ? questionOrId : null;

  const expertHints: Record<string, string> = {
    // Cross Sector & Problem
    sector: "اختر قطاعين على الأقل لتحديد نقاط الاندماج والفرص الهجينة ذات المنافسة المنخفضة.",
    problem: "حدد الألم الفعلي المباشر الذي يدفع العميل لاتخاذ قرار الشراء بدلاً من مجرد ميزة إضافية.",
    empathy_data: "فهم الحالة الذهنية والمخاوف اليومية للعميل يرفع كفاءة الرسائل التسويقية.",
    competition: "تحليل نقطة ضعف المنافس يساعدك على ابتكار ميزة تنافسية (Moat) يصعب تقليدها.",
    resources: "تقييم التكلفة البديلة والموارد المتاحة يقلل من مخاطر تعثر التشغيل مبكراً.",
    validation: "قياس حجم التحقق الميداني يحدد مدى الجاهزية للانتقال من الفكرة إلى الإنفاق الفعلي.",
    goals: "ربط الأهداف بمؤشرات قياس محددة يسهل تقييم تقدم المشروع خطوة بخطوة.",
    fears: "الاعتراف بأكبر المخاوف مبكراً يسمح بوضع خطط طوارئ واستراتيجيات بديلة جاهزة.",

    // Strategic Pulse & Readiness
    op_readiness: "تحديد درجة الجاهزية الحالية يوضح الوقت والجهد المطلوبة للوصول لأول نسخة قابلة للإطلاق.",
    financial_estimates: "تقدير التكاليف والإيرادات الأولية يبني الفرضيات المالية الأساسية لتقييم جدوى المشروع.",
    main_goal: "تركيز الهدف المباشر (مثل إثبات الفكرة أو تحقيق الدخل) يوجه الميزانية والجهد نحو الأولويات.",
    target_audience_clear: "التحديد الدقيق للشريحة الأولى يقلل من ميزانية التسويق ويزيد من معدل التحويل.",
    market_gaps: "استغلال الفجوات المتروكة من المنافسين يتيح اختراقاً أسرع وحصة سوقية أسهل.",
    customer_needs_first: "معالجة الاحتياج الأشد إيلاماً تضمن رغبة أسرع لدى العميل لدفع مقابل مالي.",

    // Financial Viability & Budget
    budget_3months: "ضمان السيولة التشغيلية لأول 3 أشهر يحمي المشروع من مخاطر التوقف قبل تدفق الأرباح.",
    break_even_month: "تحديد تاريخ نقطة التعادل يمنح المستثمر والفريق هدفاً زمنياً لتقييم الأداء المالي.",
    financial_gap_plan: "وضع استراتيجية لتغطية نقص السيولة المحتمل يمنع القرارات العشوائية عند الأزمات.",
    initial_costs: "احسب جميع التكاليف الأولية للتأسيس والتراخيص قبل البدء لتجنب المفاجآت المالية.",
    operating_costs: "تقييم التكاليف الثابتة والشهرية يساعدك في تحديد هامش الأمان للأسعار.",
    pricing_strategy: "التسعير المبني على القيمة المقدمة للعميل يحقق أرباحاً أعلى من التسعير المبني على التكلفة فقط.",
    break_even: "احسب عدد الوحدات أو الاشتراكات المطلوبة شهرياً لتغطية كامل مصاريف التشغيل.",

    // Execution & Operations
    competitors_strength: "دراسة نقاط قوة منافسيك تمكنك من تجنب المواجهة المباشرة وبناء ميزة بديلة.",
    supplier_dependency: "اعتماد خيارات متعددة للموردين يضمن مرونة التشغيل واستمرار تزويد الخدمات.",
    risk_mitigation_step: "تحديد خطوات تخفيف المخاطر يعزز ثقة الشركاء والمستثمرين في احترافية الخطة.",
    timeline: "تقسيم الخطة إلى مراحل زمنية محددة يمنع تمدد المشروع دون نتائج ملموسة.",
    milestones: "تحديد محطات تدقيق رئيسية يساعد في تقييم مدى الالتزام بجدول التنفيذ.",

    // Growth & Revenue Acceleration
    primary_uvp: "عرض القيمة الفريد (UVP) هو الجملة التي تسوق مشروعك وتجعله الخيار الأنسب للعميل.",
    differentiation_factor: "التركيز على عامل تمايز حقيقي يمنع دخول المنافسين الجدد بسهولة.",
    customer_value_prop: "صيغ القيمة المضافة بوضوح وبساطة حتى يفهم العميل فائدة منتجك خلال ثوانٍ.",
    quick_revenue_action: "تحديد أقصر طريق لتحقيق أول ريال إيراد ينشط التدفق النقدي ويعزز معنويات الفريق.",
    price_test_ability: "اختبار مرونة الأسعار يساعدك على اكتشاف أعلى نقطة سعرية يتقبلها السوق.",
    upsell_readiness: "إضافة خدمات مكملة للعميل الحالي يرفع متوسط قيمة الفاتورة دون تكلفة تسويق جديدة.",
    best_channel: "الاستثمار في القناة التسويقية الأكثر كفاءة يقلل تكلفة الاستحواذ على العميل (CAC).",
    exec_step_first: "بدء خطوة تنفيذية واحدة فوراً يحول التخطيط النظري إلى مشروع حي ينمو يومياً.",
    mvp_test_plan: "اختبار النسخة الأولية المبسطة يتيح الجمع السريع للملاحظات وتفادي التطوير المكلف.",
    expansion: "حدد استراتيجية التوسع الجغرافي أو تنويع المنتجات بناءً على استقرار النواة الأساسية.",
    retention: "الاحتفاظ بالعميل الحالي أرخص بـ 5 مرات من الاستحواذ على عميل جديد.",
  };

  if (qId && expertHints[qId]) {
    return expertHints[qId];
  }

  if (qObj?.sublabel) {
    return `توضيح: ${qObj.sublabel} اختر الإجابة التي تعبر بدقة عن واقع مشروعك لتغذية التحليل.`;
  }

  if (qObj?.label) {
    return `توضيح: إجابتك حول "${qObj.label}" تساعد المحرك على تقديم توصيات دقيقة وحسابات واقعية.`;
  }

  return "توضيح: حدد الإجابة الأقرب لوضع مشروعك الحالي لتوفير تحليل استراتيجي مخصص وحسابات دقيقة.";
};
