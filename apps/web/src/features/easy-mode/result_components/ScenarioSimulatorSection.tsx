import React from "react";
import { Lightbulb } from "lucide-react";
import { BaseCard, CardHeader, CardBody, TOKENS } from "./CardDesignSystem";

interface ScenarioSimulatorSectionProps {
  activeScenario: "optimistic" | "pessimistic";
  setActiveScenario: (val: "optimistic" | "pessimistic") => void;
  scenarios: any;
}

export const ScenarioSimulatorSection = ({ activeScenario, setActiveScenario, scenarios }: ScenarioSimulatorSectionProps) => {
  const s = scenarios[activeScenario];
  
  return (
    <BaseCard variant={activeScenario === "optimistic" ? "success" : "danger"} style={{ border: `1.5px solid ${s.border}` }}>
       <CardHeader 
          title={s.title}
          subtitle="محاكاة ذكاء الأعمال بناءً على متغيرات السوق الحالية"
          icon={s.icon}
          badge={activeScenario === "optimistic" ? "Optimistic" : "Pessimistic"}
          badgeType={activeScenario === "optimistic" ? "success" : "danger"}
       />
       
       <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
          <div style={{ 
            background: "#f1f5f9", 
            padding: "5px", 
            borderRadius: "16px", 
            display: "flex", 
            gap: "6px",
            border: "1px solid #e2e8f0",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)"
          }}>
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveScenario("optimistic"); }}
              style={{ 
                padding: "8px 20px", 
                borderRadius: "12px", 
                fontSize: "12px", 
                fontWeight: 900, 
                border: "none", 
                cursor: "pointer",
                background: activeScenario === "optimistic" ? TOKENS.colors.secondary : "transparent",
                color: activeScenario === "optimistic" ? "#fff" : TOKENS.colors.text.muted,
                boxShadow: activeScenario === "optimistic" ? `0 10px 20px ${TOKENS.colors.secondary}40` : "none",
                transition: "all 0.4s",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}>
              متفائل
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveScenario("pessimistic"); }}
              style={{ 
                padding: "8px 20px", 
                borderRadius: "12px", 
                fontSize: "12px", 
                fontWeight: 900, 
                border: "none", 
                cursor: "pointer",
                background: activeScenario === "pessimistic" ? TOKENS.colors.danger : "transparent",
                color: activeScenario === "pessimistic" ? "#fff" : TOKENS.colors.text.muted,
                boxShadow: activeScenario === "pessimistic" ? `0 10px 20px ${TOKENS.colors.danger}40` : "none",
                transition: "all 0.4s",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}>
              حذر
            </button>
          </div>
       </div>

       <CardBody>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            {[
              { label: "نمو الإيراد", value: s.revenue, sub: "سنوياً" },
              { label: "هامش الربح", value: s.margin, sub: "صافي" },
              { label: "فترة الاسترداد", value: s.payback, sub: "Payback" },
              { label: "مستوى الخطر", value: s.risk, sub: "Risk Level" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "14px", background: "#f8fafc", borderRadius: TOKENS.radius.inner, border: `1px solid ${TOKENS.colors.border}` }}>
                <p style={{ fontSize: 11, color: TOKENS.colors.text.muted, marginBottom: 4 }}>{item.label}</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: TOKENS.colors.text.title }}>{item.value}</p>
                <p style={{ fontSize: 10, color: TOKENS.colors.text.muted }}>{item.sub}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "16px", background: s.bg, borderRadius: TOKENS.radius.inner, border: `1px dashed ${s.color}40` }}>
            <Lightbulb size={18} color={s.color} style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: "13px", color: TOKENS.colors.text.body, lineHeight: 1.6 }}>{s.desc}</p>
          </div>
       </CardBody>
    </BaseCard>
  );
};
