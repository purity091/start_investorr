import React from "react";
import { AlertCircle } from "lucide-react";
import { BaseCard, CardHeader, CardBody, TOKENS } from "./CardDesignSystem";

export const CriticalBottleneckCard = () => {
  return (
    <BaseCard variant="danger">
       <CardHeader 
          title="العنق الأكبر للزجاجة: 'عجز رأس المال التشغيلي'" 
          subtitle="Operational Risk Diagnostic"
          icon={<AlertCircle size={24} strokeWidth={2.5} />}
          badge="Severity: Critical"
          badgeType="danger"
       />

       <CardBody>
          <p style={{ marginBottom: 20 }}>
            الميزانية الحالية ($5,000) تغطي فقط <span style={{ color: TOKENS.colors.danger, fontWeight: 800 }}>17%</span> من متوسط تكاليف التأسيس الفعلية لمطعم في الرياض. هذا العجز سيؤدي لتوقف المشروع حتماً قبل الافتتاح إذا تم اتباع النموذج التقليدي.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 20 }}>
             <div style={{ padding: "16px", background: "#f8fafc", borderRadius: TOKENS.radius.inner, border: `1px solid ${TOKENS.colors.border}` }}>
                <p style={{ fontSize: TOKENS.typography.label.size, fontWeight: 900, color: TOKENS.colors.text.muted, marginBottom: 4, textTransform: "uppercase" }}>Numerical Insight</p>
                <p style={{ fontSize: "14px", fontWeight: 700, color: TOKENS.colors.text.body }}>فجوة التمويل: -83% من الحد الأدنى</p>
             </div>
             <div style={{ padding: "16px", background: "#f0fdf4", borderRadius: TOKENS.radius.inner, border: "1px solid #dcfce7" }}>
                <p style={{ fontSize: TOKENS.typography.label.size, fontWeight: 900, color: TOKENS.colors.secondary, marginBottom: 4, textTransform: "uppercase" }}>Focused Recommendation</p>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#166534" }}>تحويل 100% من الميزانية لنموذج الـ Cloud Kitchen لتقليل الـ CAPEX.</p>
             </div>
          </div>
       </CardBody>
    </BaseCard>
  );
};
