import React from "react";
import { TrendingUp, Users, DollarSign } from "lucide-react";
import { BaseCard, CardHeader, CardBody, TOKENS } from "./CardDesignSystem";

export const RevenueAccelerationCard = () => {
  return (
    <BaseCard variant="highlight">
       <CardHeader 
          title="خطة تسريع الدخل (Revenue Acceleration)" 
          subtitle="خارطة طريق رقمية للوصول إلى هدف الـ 6,000 دولار شهرياً"
          icon={<TrendingUp size={22} strokeWidth={2.5} />}
          badge="Timeframe: 90 Days"
       />

       <CardBody>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
             <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ fontSize: TOKENS.typography.label.size, fontWeight: 900, color: TOKENS.colors.text.muted, textTransform: "uppercase", marginBottom: 4 }}>التحول المطلوب في المقاييس (Numerical Transformation)</p>
                
                <div style={{ padding: "18px", background: "#f8fafc", borderRadius: TOKENS.radius.inner, border: `1px solid ${TOKENS.colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <div>
                      <p style={{ fontSize: "11px", color: TOKENS.colors.text.muted, fontWeight: 700, marginBottom: 4 }}>الطلبات اليومية (Daily Orders)</p>
                      <p style={{ fontSize: "18px", fontWeight: 900, color: TOKENS.colors.text.title }}>15 <span style={{ color: TOKENS.colors.text.muted, fontWeight: 500, fontSize: "14px" }}>→</span> 28</p>
                   </div>
                   <div style={{ width: 40, height: 40, background: `${TOKENS.colors.primary}10`, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Users size={20} color={TOKENS.colors.primary} />
                   </div>
                </div>

                <div style={{ padding: "18px", background: "#f8fafc", borderRadius: TOKENS.radius.inner, border: `1px solid ${TOKENS.colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <div>
                      <p style={{ fontSize: "11px", color: TOKENS.colors.text.muted, fontWeight: 700, marginBottom: 4 }}>متوسط قيمة الطلب (AOV)</p>
                      <p style={{ fontSize: "18px", fontWeight: 900, color: TOKENS.colors.text.title }}>$22 <span style={{ color: TOKENS.colors.text.muted, fontWeight: 500, fontSize: "14px" }}>→</span> $28</p>
                   </div>
                   <div style={{ width: 40, height: 40, background: `${TOKENS.colors.primary}10`, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <DollarSign size={20} color={TOKENS.colors.primary} />
                   </div>
                </div>
             </div>

             <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                   <p style={{ fontSize: TOKENS.typography.label.size, fontWeight: 900, color: TOKENS.colors.text.muted, textTransform: "uppercase", marginBottom: 12 }}>إجراءات النمو السريع (High Impact Actions)</p>
                   <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                      <li style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                         <div style={{ width: 22, height: 22, background: TOKENS.colors.primary, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                            <span style={{ fontSize: "11px", fontWeight: 900, color: "#fff" }}>1</span>
                         </div>
                         <p style={{ fontWeight: 600 }}>تفعيل استراتيجية (Upselling) لإضافة مشروبات أو أطباق جانبية لزيادة الـ AOV فوراً.</p>
                      </li>
                      <li style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                         <div style={{ width: 22, height: 22, background: TOKENS.colors.primary, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                            <span style={{ fontSize: "11px", fontWeight: 900, color: "#fff" }}>2</span>
                         </div>
                         <p style={{ fontWeight: 600 }}>إطلاق حملة (Targeted Ads) على TikTok تستهدف عملاء التوصيل في نطاق 5 كم.</p>
                      </li>
                   </ul>
                </div>
                
                <div style={{ padding: "14px 18px", background: "#f5f3ff", borderRadius: TOKENS.radius.inner, border: `1px dashed ${TOKENS.colors.primary}` }}>
                   <p style={{ fontSize: "13px", color: TOKENS.colors.primary, fontWeight: 700 }}>💡 نصيحة النمو:</p>
                   <p style={{ fontSize: "13px", color: TOKENS.colors.primary, fontWeight: 500, marginTop: 4 }}>"ركز على عملاء الـ Retention (الذين يطلبون مرتين في الأسبوع) لأن تكلفة الاستحواذ عليهم هي الأقل."</p>
                </div>
             </div>
          </div>
       </CardBody>
    </BaseCard>
  );
};
