import React from "react";
import { TrendingUp, CheckCircle2, PartyPopper } from "lucide-react";
import { BaseCard, CardHeader, CardBody, TOKENS } from "./CardDesignSystem";

interface GrowthChecklistSectionProps {
  checklistStep: "setup" | "marketing" | "launch";
  setChecklistStep: (val: "setup" | "marketing" | "launch") => void;
  completedItems: Record<string, boolean>;
  toggleItem: (id: string) => void;
  isActivating: boolean;
  handleActivate: () => void;
  checklistData: any;
}

export const GrowthChecklistSection = ({ 
  checklistStep, 
  setChecklistStep, 
  completedItems, 
  toggleItem, 
  isActivating, 
  handleActivate, 
  checklistData 
}: GrowthChecklistSectionProps) => {
  const step = checklistData[checklistStep];

  return (
    <BaseCard variant="highlight">
       <CardHeader 
          title="خطة الانطلاق المتسارع (30 Days Growth)" 
          subtitle="خارطة طريق تنفيذية لتحويل فكرتك إلى واقع تشغيلي ملموس"
          icon={<TrendingUp size={22} strokeWidth={2.5} />}
          badge="Execution Phase"
       />

       <CardBody>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", alignItems: "center", gap: 16, marginBottom: 32 }}>
             <div style={{ 
                background: "#f1f5f9", 
                padding: "6px", 
                borderRadius: "16px", 
                display: "flex", 
                gap: "4px", 
                border: `1px solid ${TOKENS.colors.border}`,
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)"
             }}>
               {Object.values(checklistData).map((btn: any) => (
                 <button 
                  key={btn.id}
                  onClick={() => setChecklistStep(btn.id as any)}
                  style={{ 
                    padding: "10px 20px", 
                    borderRadius: "12px", 
                    fontSize: "12.5px", 
                    fontWeight: 900, 
                    border: "none", 
                    cursor: "pointer",
                    background: checklistStep === btn.id ? "#fff" : "transparent",
                    color: checklistStep === btn.id ? btn.color : TOKENS.colors.text.muted,
                    boxShadow: checklistStep === btn.id ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex", 
                    alignItems: "center", 
                    gap: 10
                  }}>
                  <span style={{ transform: checklistStep === btn.id ? "scale(1.1)" : "scale(1)", transition: "0.3s" }}>{btn.icon}</span>
                  {btn.label}
                 </button>
               ))}
             </div>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
            {step.items.map((item: any, idx: number) => {
              const itemId = `${checklistStep}-${idx}`;
              const isDone = completedItems[itemId];
              return (
                <div 
                  key={idx} 
                  onClick={() => toggleItem(itemId)}
                  style={{ 
                     display: "flex", 
                     alignItems: "center", 
                     gap: 16, 
                     padding: "20px 24px", 
                     background: isDone ? `${step.color}05` : "#fff", 
                     borderRadius: TOKENS.radius.inner, 
                     border: "1px solid",
                     borderColor: isDone ? `${step.color}40` : TOKENS.colors.border, 
                     transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                     cursor: "pointer",
                     opacity: isDone ? 0.7 : 1,
                     boxShadow: isDone ? "none" : "0 2px 4px rgba(0,0,0,0.01)"
                  }}
                  onMouseEnter={(e) => { if(!isDone) e.currentTarget.style.borderColor = step.color; }}
                  onMouseLeave={(e) => { if(!isDone) e.currentTarget.style.borderColor = TOKENS.colors.border; }}
                >
                  <div style={{ 
                     width: 26, 
                     height: 26, 
                     borderRadius: "9px", 
                     border: `2.5px solid ${isDone ? step.color : step.color + "30"}`, 
                     background: isDone ? step.color : "#fff", 
                     flexShrink: 0,
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     transition: "0.3s"
                  }}>
                     <CheckCircle2 size={16} color={isDone ? "#fff" : step.color} style={{ opacity: isDone ? 1 : 0, transition: "0.3s" }} />
                  </div>
                  <p style={{ 
                     fontSize: "14.5px", 
                     fontWeight: 700, 
                     color: isDone ? TOKENS.colors.text.muted : TOKENS.colors.text.body, 
                     flex: 1,
                     textDecoration: isDone ? "line-through" : "none",
                     transition: "0.3s"
                  }}>{item.label}</p>
                  <div style={{ 
                     fontSize: "11px", 
                     fontWeight: 900, 
                     color: isDone ? TOKENS.colors.secondary : step.color, 
                     background: isDone ? `${TOKENS.colors.secondary}10` : `${step.color}10`, 
                     padding: "6px 12px", 
                     borderRadius: "100px",
                     letterSpacing: "0.02em"
                  }}>
                     {isDone ? "مكتمل" : "قيد التخطيط"}
                </div>
              </div>
              );
            })}
          </div>
          
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <button 
              onClick={handleActivate}
              disabled={isActivating}
              style={{ 
                 width: "100%", 
                 padding: "22px", 
                 borderRadius: TOKENS.radius.card, 
                 background: isActivating ? TOKENS.colors.text.muted : `linear-gradient(135deg, ${step.color} 0%, ${step.color}dd 100%)`, 
                 color: "#fff", 
                 border: "none", 
                 fontSize: "16px", 
                 fontWeight: 900, 
                 boxShadow: isActivating ? "none" : `0 20px 40px ${step.color}30`, 
                 cursor: isActivating ? "not-allowed" : "pointer", 
                 display: "flex", 
                 alignItems: "center", 
                 justifyContent: "center", 
                 gap: 14,
                 transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onMouseEnter={(e) => { if(!isActivating) e.currentTarget.style.transform = "scale(1.01)"; }}
            onMouseLeave={(e) => { if(!isActivating) e.currentTarget.style.transform = "scale(1)"; }}
            >
              {isActivating ? (
                <>
                  <div style={{ width: 22, height: 22, border: "3px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                  جاري تجهيز خطتك الاستراتيجية...
                </>
              ) : (
                <>
                  تفعيل وضع التنفيذ الآن
                  <PartyPopper size={24} />
                </>
              )}
            </button>
            <p style={{ marginTop: 20, fontSize: "12.5px", color: TOKENS.colors.text.muted, fontWeight: 600 }}>
              سيتم إرسال هذه الخطة إلى بريدك الإلكتروني بصيغة PDF فور الضغط
            </p>
          </div>
       </CardBody>
    </BaseCard>
  );
};
