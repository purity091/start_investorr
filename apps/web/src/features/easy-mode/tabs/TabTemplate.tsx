import React, { useState, useCallback, useMemo } from 'react';
import * as Lucide from "lucide-react";
import { TOKENS, BaseCard } from "../result_components/CardDesignSystem";
import { ProgressDots } from "../components/CommonUI";
import * as Renderers from "../components/QuestionRenderer";
import { WizardGuidance } from "../components/WizardGuidance";

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
    <div className="tab-template w-full" dir="rtl">
      {!isGenerated ? (
        <TabForm config={config} onFinish={handleGenerate} />
      ) : (
        <div className="results-section animate-in fade-in duration-700 w-full">
          <div className="results-header mt-3 mb-6 flex items-center gap-3 px-2">
            <div className="results-icon w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0" style={{ background: `linear-gradient(135deg, ${config.themeColor} 0%, ${config.themeColor}dd 100%)` }}>
              <Lucide.ShieldCheck size={20} />
            </div>
            <h2 className="results-title text-lg sm:text-xl font-black text-slate-900 m-0">{config.resultsTitle}</h2>
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
      <div className="py-16 text-center">
        <Lucide.Hammer size={36} className="text-[#3b82f6] mx-auto mb-4" />
        <h3 className="text-base font-black text-slate-900">هذا المختبر قيد التحديث</h3>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-[350px] sm:min-h-[450px] flex flex-col items-center justify-center bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-5 sm:p-8 text-slate-900 shadow-sm">
         <Lucide.Cpu size={36} className="animate-spin-slow text-[#3b82f6] mb-4" />
         <h2 className="text-base sm:text-lg font-black mb-2 text-center">جاري استخراج التحليلات...</h2>
         <div className="px-3 py-2 bg-blue-50 rounded-full border border-blue-100">
            <p className="text-[10px] sm:text-xs text-[#3b82f6] font-bold">{config.loadingMessages[loadingStep]}</p>
         </div>
      </div>
    );
  }

  return (
    <div className="tab-form w-full space-y-3 sm:space-y-4" dir="rtl">
      {/* Lab Header */}
      <div className="lab-header bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-4 mb-2 animate-in slide-in-from-top-4 duration-500 shadow-sm">
        <div className="lab-icon w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg" style={{ background: `linear-gradient(135deg, ${config.themeColor}, ${config.themeColor}dd)` }}>
          <Lucide.Beaker size={20} />
        </div>
        <div className="lab-info flex-1 min-w-0">
          <h4 className="lab-title text-sm sm:text-lg font-black text-slate-900 m-0 truncate">{config.bannerTitle}</h4>
          <p className="lab-subtitle text-[11px] sm:text-xs text-slate-500 m-0 mt-1 truncate font-bold uppercase tracking-wider">{config.bannerSubtitle}</p>
        </div>
      </div>

      {/* Main Container - Side by Side on Desktop */}
      <div className="flex flex-col xl:flex-row gap-6 items-start w-full">
        {/* Form Card (Right/Main side in RTL) */}
        <div className="form-card flex-1 w-full">
          <BaseCard isInitiallyOpen={true} className="w-full" style={{
            border: `2px solid ${config.themeColor}40`,
            boxShadow: `0 20px 50px -12px ${config.themeColor}30`,
            background: `linear-gradient(135deg, #ffffff, #f8fafc)`,
            padding: "24px"
          }}>
            {/* Progress */}
            <div className="progress-dots flex justify-center mb-4">
              <ProgressDots
                steps={steps.map(s => ({ icon: s.qs[0].icon, id: s.num.toString() }))}
                current={currentStepNumber - 1}
              />
            </div>

            {/* Questions */}
            <div className="questions-list space-y-5">
              {currentStep.qs.map((q, idx) => (
                <div key={q.id} className="question-item animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {/* Question Header */}
                  <div className="question-header flex gap-2.5 mb-3">
                    <div className="q-icon w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 flex-shrink-0 border border-slate-200">
                      {React.createElement((Lucide as any)[q.icon] || Lucide.Target, { size: 14 })}
                    </div>
                    <div className="q-info flex-1">
                      <h3 className="q-label text-sm font-black text-slate-900 m-0">{q.label}</h3>
                      <p className="q-sublabel text-[10px] text-slate-500 m-0 mt-0.5">{q.sublabel}</p>
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="q-content min-h-[45px] mb-2">
                      <RenderQuestion
                        question={q}
                        answer={tempAnswers[q.id] || answers[q.id]}
                        onAnswer={(val) => setSingleAnswer(q.id, val)}
                        themeColor={config.themeColor}
                      />
                  </div>

                  {/* Hint - Mobile Only */}
                  <div className="q-hint block xl:hidden mt-2 p-2 rounded-lg border" style={{
                    background: `${config.themeColor}08`,
                    borderColor: `${config.themeColor}20`
                  }}>
                    <div className="hint-content flex gap-2 items-start">
                      <Lucide.Lightbulb size={13} className="hint-icon flex-shrink-0 mt-0.5" style={{ color: config.themeColor }} />
                      <p className="hint-text text-[10px] text-slate-600 font-bold leading-relaxed m-0">
                        {getHintForQuestion(q.id, config.id)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="nav-buttons mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-between">
              <button
                onClick={() => currentStepNumber > 1 && setCurrentStepNumber(currentStepNumber - 1)}
                disabled={currentStepNumber === 1}
                className="btn-prev w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[44px]"
              >
                السابق
              </button>
              <button
                onClick={handleNext}
                className="btn-next w-full sm:w-auto px-6 py-2.5 rounded-xl text-white font-black shadow-lg flex items-center justify-center gap-2 min-h-[48px]"
                style={{
                  background: config.themeColor,
                  boxShadow: `0 10px 20px ${config.themeColor}30`
                }}
              >
                  <span>{currentStepNumber === totalSteps ? "تحليل النتائج" : "التالي"}</span>
                  <Lucide.Zap size={16} fill="currentColor" />
              </button>
            </div>
          </BaseCard>
        </div>

        {/* Guidance - Desktop Only Sidebar */}
        <div className="guidance-desktop hidden xl:block xl:w-[420px] shrink-0 sticky top-4">
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
       return <div className="text-slate-500 text-center py-3 text-xs">Unknown Question Type</div>;
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
