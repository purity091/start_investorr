import React from "react";
import { Rocket, Target, ChevronRight } from "lucide-react";
import { BaseCard, CardHeader, CardBody, TOKENS } from "./CardDesignSystem";

export const NextActionCard = () => {
  return (
    <BaseCard variant="success">
       <CardHeader 
          title="الخطوة الأولى: 'التثبت من تكاليف التشغيل السحابي'" 
          subtitle="Startup Operator Directive | 48h Action Window"
          icon={<Rocket size={24} strokeWidth={2.5} />}
          badge="Action Required"
          badgeType="success"
       />

       <CardBody>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
             <div style={{ flex: 1 }}>
                <p style={{ marginBottom: 16 }}>
                   قم بالتواصل الفوري مع مزودي المطابخ السحابية (مثل Kitch أو CloudKitchens) في الرياض للحصول على عروض أسعار فعلية وتوضيح متطلبات التأسيس الأولية.
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#f8fafc", borderRadius: TOKENS.radius.inner, border: `1px solid ${TOKENS.colors.border}` }}>
                   <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Target size={16} color={TOKENS.colors.secondary} />
                      <span style={{ fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.title }}>النتيجة المتوقعة:</span>
                   </div>
                   <p style={{ fontSize: "13px", color: TOKENS.colors.text.muted, fontWeight: 600 }}>تحويل الأرقام التقديرية إلى تكاليف حقيقية وبدء حجز مساحتك التشغيلية.</p>
                </div>
             </div>

             <div style={{ paddingLeft: 10 }}>
                <button 
                  onClick={() => window.open('https://the-kitchens.co/')}
                  style={{ 
                   padding: "16px 28px", 
                   borderRadius: TOKENS.radius.button, 
                   background: TOKENS.colors.text.title, 
                   color: "#fff", 
                   border: "none", 
                   fontSize: "14px", 
                   fontWeight: 800, 
                   cursor: "pointer",
                   display: "flex",
                   alignItems: "center",
                   gap: 8,
                   transition: "0.3s",
                   boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                 }}
                 onMouseEnter={(e) => { (e.currentTarget as any).style.background = TOKENS.colors.primary; }}
                 onMouseLeave={(e) => { (e.currentTarget as any).style.background = TOKENS.colors.text.title; }}
                 >
                    تنفيذ الآن
                    <ChevronRight size={18} />
                </button>
             </div>
          </div>
       </CardBody>
    </BaseCard>
  );
};
