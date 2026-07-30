import React, { useState, useCallback } from "react";
import * as Lucide from "lucide-react";
import { QUESTIONS } from "../constants";
import * as Renderers from "../components/QuestionRenderer";
import { TOKENS, BaseCard } from "../result_components/CardDesignSystem";
import { ProgressDots } from "../components/CommonUI";

interface StrategicPulseFormProps {
  onGenerate: (answers: any) => void;
}

export const StrategicPulseForm = ({ onGenerate }: StrategicPulseFormProps) => {
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [tempAnswer, setTempAnswer] = useState<any>(null);
  const [error, setError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const currentQ = QUESTIONS[qIndex];
  const formProgress = Math.round((qIndex / QUESTIONS.length) * 100);

  const loadingMessages = [
    "تحليل 'تقاطع القطاعات' واكتشاف المحيط الأزرق (Blue Ocean)...",
    "بناء 'خريطة التعاطف' وسيكولوجية العميل (Behavioral Mapping)...",
    "حساب 'تكلفة الفرصة البديلة' ومعايرة الجدوى (Economic Modeling)...",
    "توليد مخطط Gantt وتحديد المسار الحرج (Critical Path)...",
    "صياغة مصفوفة المخاطر وبروتوكولات الطوارئ (Plan B Engine)...",
  ];

  const handleAnswer = useCallback((val: any) => {
    let newAnswers = { ...answers };
    const q = QUESTIONS[qIndex];
    
    if (["profile_builder", "resources_check", "goal_matrix", "empathy_map"].includes(q.type)) {
       newAnswers = { ...answers, ...val };
    } else {
       newAnswers[q.id] = val;
    }

    setAnswers(newAnswers);
    setTempAnswer(null);

    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setIsAnalyzing(true);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i < loadingMessages.length) {
          setLoadingStep(i);
        } else {
          clearInterval(interval);
          onGenerate(newAnswers);
        }
      }, 1200);
    }
  }, [qIndex, answers, onGenerate]);

  if (isAnalyzing) {
    return (
      <div className="fade-in" style={{ 
        minHeight: "650px", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        background: "#0f172a",
        borderRadius: TOKENS.radius.card,
        padding: "32px",
        color: "#fff",
        textAlign: "center"
      }}>
         <div style={{ position: "relative", marginBottom: "32px" }}>
            <div style={{ position: "absolute", inset: -15, background: "rgba(99, 102, 241, 0.2)", borderRadius: "50%", filter: "blur(15px)" }} />
            <Lucide.Cpu size={48} className="animate-spin-slow" style={{ color: "#818cf8" }} />
         </div>
         <h2 style={{ fontSize: "20px", fontWeight: 900, marginBottom: "12px" }}>جاري استخراج "الوعي الاستراتيجي"...</h2>
         <div style={{ padding: "12px 24px", background: "rgba(255,255,255,0.05)", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <p style={{ fontSize: "12px", color: "#818cf8", fontWeight: 800 }}>{loadingMessages[loadingStep]}</p>
         </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
      {/* 🧭 Orientation Banner */}
      <div style={{ 
        marginBottom: "24px", 
        padding: "20px 32px", 
        background: "linear-gradient(to left, rgba(99, 102, 241, 0.04), #fff)", 
        borderRadius: "20px", 
        border: `1.5px solid ${TOKENS.colors.primary}40`,
        boxShadow: "0 10px 25px rgba(99, 102, 241, 0.08)",
        display: "flex",
        alignItems: "center",
        gap: 16,
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle inner glow */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 100, height: "100%", background: "linear-gradient(to left, rgba(99, 102, 241, 0.05), transparent)", pointerEvents: "none" }} />
        <div style={{ background: TOKENS.colors.primary, color: "#fff", width: 36, height: 36, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Lucide.Lightbulb size={20} />
        </div>
        <div>
          <h4 style={{ fontSize: "15px", fontWeight: 900, color: TOKENS.colors.text.title, margin: 0 }}>مختبر الذكاء الاستراتيجي</h4>
          <p style={{ fontSize: "13px", color: TOKENS.colors.text.muted, margin: "2px 0 0", fontWeight: 600 }}>أجب بوضوح لنفكك التحديات ونبني لك مساراً استثمارياً فائق الدقة.</p>
        </div>
      </div>

      <BaseCard isInitiallyOpen={true} style={{ 
        minHeight: "680px", 
        display: "flex", 
        flexDirection: "column",
        border: `2px solid ${TOKENS.colors.primary}`,
        boxShadow: `0 20px 50px rgba(99, 102, 241, 0.15), 0 0 15px rgba(99, 102, 241, 0.1)`,
        background: "linear-gradient(to bottom right, #fff, rgba(99, 102, 241, 0.01))"
      }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            {/* Header with ProgressDots */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "40px", paddingBottom: "12px" }}>
              <ProgressDots 
                steps={QUESTIONS.map(q => ({ icon: q.icon, id: q.id }))} 
                current={qIndex} 
              />
            </div>

            {/* Question Header */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
              <div style={{ width: "42px", height: "42px", background: "#0f172a", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
                {React.createElement((Lucide as any)[currentQ.icon] || Lucide.Target, { size: 22 })}
              </div>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 900, color: TOKENS.colors.text.title, marginBottom: "4px", lineHeight: 1.3 }}>{currentQ.label}</h2>
                <p style={{ fontSize: "13.5px", color: TOKENS.colors.text.muted, fontWeight: 600 }}>{currentQ.sublabel}</p>
              </div>
            </div>

            {/* Question Content Component */}
            <div style={{ minHeight: "280px" }}>
              <div key={qIndex} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {currentQ.type === 'cards' && <Renderers.QuestionCards question={currentQ} onSelect={handleAnswer} selected={answers[currentQ.id]} tempAnswer={tempAnswer} setTempAnswer={setTempAnswer} />}
                {currentQ.type === 'textarea_choice' && <Renderers.QuestionTextAreaChoice question={currentQ} onSelect={handleAnswer} selected={answers[currentQ.id]} tempAnswer={tempAnswer} setTempAnswer={setTempAnswer} />}
                {currentQ.type === 'empathy_map' && <Renderers.EmpathyMapRenderer question={currentQ} onSelect={handleAnswer} selected={answers[currentQ.id]} tempAnswer={tempAnswer} setTempAnswer={setTempAnswer} />}
                {currentQ.type === 'profile_builder' && <Renderers.MultiSelectionRenderer question={currentQ} items={currentQ.profiles!} fieldPrefix="customer" onSelect={handleAnswer} selected={answers} tempAnswer={tempAnswer} setTempAnswer={setTempAnswer} />}
                {currentQ.type === 'competition_map' && <Renderers.CompetitionMap question={currentQ} onSelect={handleAnswer} selected={answers} tempAnswer={tempAnswer} setTempAnswer={setTempAnswer} />}
                {currentQ.type === 'resources_check' && <Renderers.MultiSelectionRenderer question={currentQ} items={currentQ.items!} fieldPrefix="" onSelect={handleAnswer} selected={answers} tempAnswer={tempAnswer} setTempAnswer={setTempAnswer} />}
                {currentQ.type === 'validation_scale' && <Renderers.ValidationScale question={currentQ} onSelect={handleAnswer} selected={answers[currentQ.id]} tempAnswer={tempAnswer} setTempAnswer={setTempAnswer} />}
                {currentQ.type === 'goal_matrix' && <Renderers.MultiSelectionRenderer question={currentQ} items={currentQ.goals!} fieldPrefix="" onSelect={handleAnswer} selected={answers} tempAnswer={tempAnswer} setTempAnswer={setTempAnswer} />}
                {currentQ.type === 'fear_select' && <Renderers.FearSelect question={currentQ} onSelect={handleAnswer} selected={answers[currentQ.id]} tempAnswer={tempAnswer} setTempAnswer={setTempAnswer} />}
              </div>
            </div>
          </div>

          {/* Footer Actions - Stabilized position */}
          <div style={{ marginTop: "40px", paddingTop: "32px", borderTop: `1px solid ${TOKENS.colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button 
              onClick={() => qIndex > 0 && setQIndex(qIndex - 1)}
              disabled={qIndex === 0}
              style={{ 
                padding: "12px 28px", 
                borderRadius: "14px", 
                background: "#f8fafc", 
                border: `1px solid ${TOKENS.colors.border}`, 
                color: TOKENS.colors.text.body, 
                fontWeight: 800, 
                fontSize: "14px", 
                cursor: qIndex === 0 ? "not-allowed" : "pointer", 
                opacity: qIndex === 0 ? 0.3 : 1,
                transition: "all 0.3s ease" 
              }}
            >
              السابق
            </button>
            <button 
              onClick={() => handleAnswer(tempAnswer || answers[currentQ.id])}
              style={{ 
                padding: "16px 40px", 
                borderRadius: "18px", 
                background: TOKENS.colors.primary, 
                border: "none", 
                color: "#fff", 
                fontWeight: 900, 
                fontSize: "16px", 
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center", 
                gap: "12px",
                boxShadow: "0 15px 30px rgba(99, 102, 241, 0.3)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 25px 50px rgba(99, 102, 241, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(99, 102, 241, 0.3)";
              }}
            >
                <span style={{ fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}>
                  {qIndex === QUESTIONS.length - 1 ? "توليد الرؤية الاستراتيجية" : "الخطوة التالية"}
                </span>
                <Lucide.Zap size={20} fill="currentColor" />
            </button>
          </div>
        </div>
      </BaseCard>

      {error && <div style={{ marginTop: "24px", padding: "16px", background: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "12px", color: TOKENS.colors.danger, fontSize: "14px", fontWeight: 700 }}>{error}</div>}
    </div>
  );
};
