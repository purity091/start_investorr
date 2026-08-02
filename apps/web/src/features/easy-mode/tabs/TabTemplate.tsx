import React, { useState, useCallback, useMemo } from 'react';
import * as Lucide from "lucide-react";
import { BaseCard } from "../result_components/CardDesignSystem";
import { ProgressDots } from "../components/CommonUI";
import * as Renderers from "../components/QuestionRenderer";
import { WizardGuidance } from "../components/WizardGuidance";
import { Button } from "@/components/ui/Button";

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
          <div className="flex items-center gap-3 p-4 rounded-xl bg-card shadow-xs">
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

  const handleNext = useCallback(() => {
     const newAnswers = { ...answers, ...tempAnswers };
     setAnswers(newAnswers);
     setTempAnswers({});

     if (currentStepNumber < totalSteps) {
        setCurrentStepNumber(currentStepNumber + 1);
     } else {
        setIsAnalyzing(true);
        let i = 0;
        const interval = setInterval(() => {
          i++;
          if (i < config.loadingMessages.length) setLoadingStep(i);
          else {
            clearInterval(interval);
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
      <div className="py-12 text-center bg-card rounded-2xl p-6 shadow-xs">
        <Lucide.Hammer size={32} className="text-primary mx-auto mb-3" />
        <h3 className="text-sm font-bold text-foreground">هذا المختبر قيد التحديث</h3>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center bg-card rounded-2xl p-8 text-foreground shadow-xs space-y-4">
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
      {/* Lab Header Banner */}
      <div className="bg-card rounded-2xl p-5 flex items-center gap-4 shadow-xs">
        <div className="size-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs" style={{ backgroundColor: config.themeColor }}>
          <Lucide.Beaker size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-base sm:text-lg font-bold text-foreground truncate">{config.bannerTitle}</h4>
          <p className="text-xs text-muted-foreground mt-0.5 truncate font-medium">{config.bannerSubtitle}</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-col xl:flex-row gap-6 items-start w-full">
        {/* Form Card */}
        <div className="flex-1 w-full space-y-6">
          <BaseCard isInitiallyOpen={true} className="w-full">
            {/* Progress */}
            <div className="flex justify-center mb-6">
              <ProgressDots
                steps={steps.map(s => ({ icon: s.qs[0].icon, id: s.num.toString() }))}
                current={currentStepNumber - 1}
              />
            </div>

            {/* Questions */}
            <div className="space-y-6">
              {currentStep.qs.map((q, idx) => (
                <div key={q.id} className="space-y-3">
                  {/* Question Header */}
                  <div className="flex gap-3 items-start">
                    <div className="size-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground shrink-0 mt-0.5">
                      {React.createElement((Lucide as any)[q.icon] || Lucide.Target, { size: 16 })}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-foreground">{q.label}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{q.sublabel}</p>
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="min-h-[45px]">
                      <RenderQuestion
                        question={q}
                        answer={tempAnswers[q.id] || answers[q.id]}
                        onAnswer={(val) => setSingleAnswer(q.id, val)}
                        themeColor={config.themeColor}
                      />
                  </div>

                  {/* Hint - Mobile */}
                  <div className="block xl:hidden p-3 rounded-xl bg-muted/40 text-xs font-medium text-muted-foreground">
                    <div className="flex gap-2 items-start">
                      <Lucide.Lightbulb size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <p className="leading-relaxed m-0">
                        {getHintForQuestion(q.id, config.id)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-8 pt-4 flex flex-col sm:flex-row gap-3 sm:justify-between items-center">
              <Button
                variant="ghost"
                onClick={() => currentStepNumber > 1 && setCurrentStepNumber(currentStepNumber - 1)}
                disabled={currentStepNumber === 1}
                className="w-full sm:w-auto text-xs font-semibold rounded-lg"
              >
                السابق
              </Button>
              <Button
                onClick={handleNext}
                className="w-full sm:w-auto gap-2 text-xs font-bold rounded-lg shadow-xs"
                style={{ backgroundColor: config.themeColor }}
              >
                  <span>{currentStepNumber === totalSteps ? "تحليل النتائج" : "التالي"}</span>
                  <Lucide.Zap size={15} />
              </Button>
            </div>
          </BaseCard>
        </div>

        {/* Guidance - Desktop Sidebar */}
        <div className="hidden xl:block xl:w-[380px] shrink-0 sticky top-6">
          <WizardGuidance
            currentStep={currentStepNumber}
            totalSteps={totalSteps}
            themeColor={config.themeColor}
            configId={config.id}
          />
        </div>
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

const getHintForQuestion = (questionId: string, configId: string): string => {
  const hints: Record<string, Record<string, string>> = {
    strategic_pulse: {
      target_market: "حدد السوق المستهدف بدقة: من هم عملاؤك المثاليون؟",
      value_proposition: "ما الذي يميزك عن المنافسين؟",
      revenue_streams: "كيف ستكسب المال؟",
      customer_segments: "قسم عملاءك إلى شرائح: من الأكثر ربحية؟",
      channels: "كيف ستصل لعملائك؟"
    },
    financial_viability: {
      initial_costs: "احسب جميع التكاليف الأولية",
      operating_costs: "التكاليف الشهرية: إيجار، رواتب، تسويق",
      pricing_strategy: "كيف تسعر منتجك؟",
      break_even: "متى ستبدأ بالربح؟"
    },
    execution_path: {
      timeline: "ضع جدولاً زمنياً واقعياً",
      resources: "ما الموارد المطلوبة؟",
      risks: "حدد المخاطر المحتملة",
      milestones: "ضع نقاط تدقيق رئيسية"
    },
    growth_plan: {
      expansion: "كيف ستتوسع؟",
      retention: "كيف تحافظ على عملائك؟",
      partnerships: "ما الشراكات الممكنة؟",
      innovation: "كيف تبقى مبتكراً؟"
    },
    revenue_acceleration: {
      quick_wins: "ما الإجراءات سريعة العائد؟",
      pricing_optimization: "هل يمكن تحسين الأسعار؟",
      upselling: "كيف تزيد قيمة كل عميل؟",
      marketing_roi: "أين أفضل عائد تسويقي؟"
    },
    final_decision: {
      go_no_go: "هل المشروع جاهز للانطلاق؟",
      funding_needs: "ما احتياجاتك التمويلية؟",
      next_steps: "ما الخطوات القادمة؟",
      success_metrics: "كيف تقيس النجاح؟"
    }
  };

  return hints[configId]?.[questionId] || "فكر بعمق في هذا السؤال";
};
