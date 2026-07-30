import React from "react";
import { ShieldAlert } from "lucide-react";
import { BaseCard, CardHeader, CardBody, TOKENS } from "./CardDesignSystem";

export const DecisionMemoCard = () => {
  return (
    <BaseCard variant="highlight">
       <CardHeader 
          title="مذكرة القرار الاستراتيجي النهائي" 
          subtitle="AI Investment Advisor | Ref: RIY-RES-2024-001"
          icon={<ShieldAlert size={20} strokeWidth={2.5} />}
          badge="Confidential Memo"
       />

       <CardBody>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 40, alignItems: "center" }}>
             <div>
                <div style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: 8, 
                  padding: "8px 16px", 
                  background: "#fefce8", 
                  border: "1px solid #fef3c7", 
                  borderRadius: "100px",
                  marginBottom: 20
                }}>
                   <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#eab308", boxShadow: "0 0 10px rgba(234,179,8,0.2)" }} />
                   <span style={{ fontSize: "12.5px", fontWeight: 900, color: "#854d0e" }}>Proceed with Adjustments</span>
                </div>

                <h2 style={{ fontSize: "28px", fontWeight: 900, marginBottom: 16, color: TOKENS.colors.text.title, lineHeight: 1.2 }}>
                  "توسع حذر بنموذج (Cloud Kitchen) لتفادي أزمة السيولة"
                </h2>
                
                <p style={{ marginBottom: 24 }}>
                  القرار مبني على فجوة مالية تبلغ <span style={{ color: TOKENS.colors.primary, fontWeight: 800 }}>48%</span> بين ميزانيتك الحالية ومتطلبات السوق الفيزيائي في الرياض. مستوى الجاهزية التشغيلية (44%) ممتاز ولكن المخاطر التنافسية تفرض عليك تقليل المصاريف الثابتة فوراً لضمان الاستمرارية.
                </p>

                <div style={{ 
                  padding: "24px", 
                  background: "#fff1f2", 
                  borderRadius: TOKENS.radius.inner, 
                  borderRight: `5px solid ${TOKENS.colors.danger}`,
                  boxShadow: "0 4px 6px -1px rgba(225,29,72,0.02)"
                }}>
                   <p style={{ fontSize: TOKENS.typography.label.size, fontWeight: 900, color: TOKENS.colors.danger, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>الشرط الجوهري للنجاح (Critical Condition)</p>
                   <p style={{ fontSize: "15px", fontWeight: 700, color: "#9f1239", lineHeight: 1.6 }}>"ابدأ بنموذج التجهيز والتوصيل فقط، وقم بتقليل التكاليف الثابتة (الإيجار والديكور) بنسبة 40% قبل الشهر الثالث."</p>
                </div>
             </div>

             <div style={{ textAlign: "center", borderRight: `1px solid ${TOKENS.colors.border}`, paddingRight: 40 }}>
                <div style={{ position: "relative", width: 150, height: 150, margin: "0 auto 20px" }}>
                   <svg width="150" height="150" viewBox="0 0 150 150">
                      <circle cx="75" cy="75" r="68" stroke="#f1f5f9" strokeWidth="10" fill="none" />
                      <circle cx="75" cy="75" r="68" stroke={TOKENS.colors.primary} strokeWidth="10" fill="none" strokeDasharray="427" strokeDashoffset="107" strokeLinecap="round" transform="rotate(-90 75 75)" />
                   </svg>
                   <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <p style={{ fontSize: "36px", fontWeight: 900, color: TOKENS.colors.text.title }}>75%</p>
                      <p style={{ fontSize: "11px", color: TOKENS.colors.text.muted, fontWeight: 800 }}>الثقة بالقرار</p>
                   </div>
                </div>
                <div style={{ textAlign: "center", maxWidth: 200, margin: "0 auto" }}>
                   <p style={{ fontSize: "11.5px", color: TOKENS.colors.text.muted, lineHeight: 1.6, fontWeight: 500 }}>مستوى الثقة مبني على مقارنة بياناتك مع بيانات أكثر من <span style={{ color: TOKENS.colors.text.title, fontWeight: 700 }}>2,500</span> مطعم في الرياض لعام 2024.</p>
                </div>
             </div>
          </div>
       </CardBody>
    </BaseCard>
  );
};
