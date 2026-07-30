import React from "react";
import { Compass, Zap, ArrowRightLeft, Lightbulb } from "lucide-react";
import { BaseCard, CardHeader, CardBody, TOKENS } from "./CardDesignSystem";

export const ExecutionPathCard = () => {
  return (
    <BaseCard variant="highlight">
       <CardHeader 
          title="أفضل مسار تنفيذ مقترح (Execution Path)" 
          subtitle="تحديد المسار الأكثر أماناً وكفاءة بناءً على ميزانيتك (5 آلاف دولار)"
          icon={<Compass size={22} strokeWidth={2.5} />}
          badge="Strategist Choice"
       />

       <CardBody>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
             <div style={{ 
               padding: "24px", 
               background: `linear-gradient(135deg, ${TOKENS.colors.primary} 0%, ${TOKENS.colors.primaryLight} 100%)`, 
               borderRadius: TOKENS.radius.inner, 
               color: "#fff",
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               boxShadow: `0 10px 20px ${TOKENS.colors.primaryGlow}`
             }}>
                <p style={{ fontSize: "12px", fontWeight: 800, opacity: 0.9, marginBottom: 8 }}>المسار المختار:</p>
                <h3 style={{ fontSize: "24px", fontWeight: 900, marginBottom: 12 }}>Cloud Kitchen / Lean Startup</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.6, opacity: 0.95 }}>
                   بميزانية محدودة في سوق الرياض، هذا المسار هو الوحيد الذي يمنع نفاد السيولة قبل الانطلاق. ستقوم بالتركيز على جودة المنتج والتوصيل فقط دون تحمل تكاليف الديكور والإيجارات الباهظة.
                </p>
             </div>

             <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                   <div style={{ width: 32, height: 32, background: "#f0fdf4", borderRadius: "8px", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Zap size={16} color={TOKENS.colors.secondary} />
                   </div>
                   <div>
                      <p style={{ fontSize: TOKENS.typography.label.size, fontWeight: 800, color: TOKENS.colors.secondary, textTransform: "uppercase" }}>الميزة الكبرى (Advantage)</p>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: TOKENS.colors.text.body }}>سرعة اختبار السوق بأقل مخاطرة مالية ممكنة.</p>
                   </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                   <div style={{ width: 32, height: 32, background: "#fef2f2", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <ArrowRightLeft size={16} color={TOKENS.colors.danger} />
                   </div>
                   <div>
                      <p style={{ fontSize: TOKENS.typography.label.size, fontWeight: 800, color: TOKENS.colors.danger, textTransform: "uppercase" }}>التحدي (Trade-off)</p>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: TOKENS.colors.text.body }}>التضحية بتجربة العميل داخل المحل (Dine-in Experience).</p>
                   </div>
                </div>

                <div style={{ 
                  marginTop: "auto", 
                  padding: "12px 16px", 
                  background: "#f8fafc", 
                  borderRadius: "12px", 
                  border: `1px dashed ${TOKENS.colors.border}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 10
                }}>
                   <Lightbulb size={16} color={TOKENS.colors.warning} />
                   <p style={{ fontSize: "13px", color: TOKENS.colors.text.muted, fontWeight: 600 }}>
                      <span style={{ color: TOKENS.colors.text.title }}>نصيحة التنفيذ:</span> "ابدأ بالتعاقد مع (The Kitchen-Co) أو منصات مشابهة في الرياض لتقليل عمولة التأسيس."
                   </p>
                </div>
             </div>
          </div>
       </CardBody>
    </BaseCard>
  );
};
