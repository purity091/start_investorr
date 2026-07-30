import React from "react";
import { BaseCard, CardHeader, CardBody, TOKENS } from "./CardDesignSystem";
import { 
  Zap, 
  Calendar, 
  Construction, 
  Package, 
  PlayCircle, 
  Megaphone, 
  RefreshCw, 
  Flag,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Clock,
  Layout,
  Smartphone,
  ShieldCheck
} from "lucide-react";

export const RoadMapResults = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
      
      {/* 1. Start Smart, Not Perfect */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="بداية ذكية وليس مثالية" 
          subtitle="Start Smart, Not Perfect"
          icon={<Zap size={24} />}
          badge="فلسفة الانطلاق"
        />
        <CardBody>
          <div style={{ fontSize: "16px", fontWeight: 900, color: TOKENS.colors.primary, marginBottom: "16px" }}>الحقيقة: أكبر خطأ هو تأجيل الإطلاق بانتظار "الكمال".</div>
          
          <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
             <StrategyBox label="أطلق بسرعة" icon={<Zap size={18} />} isGood />
             <StrategyBox label="تأجيل بانتظار الكمال" icon={<Clock size={18} />} isGood={false} />
          </div>

          <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "14px", border: `1px solid ${TOKENS.colors.border}`, display: "flex", alignItems: "center", gap: 12 }}>
             <div style={{ color: TOKENS.colors.primary }}><AlertCircle size={20} /></div>
             <div style={{ fontSize: "13.5px", fontWeight: 700 }}>لماذا؟ لأن السوق هو الذي يعطيك الحقيقة العملية.. وليس التخطيط النظري الطويل.</div>
          </div>
        </CardBody>
      </BaseCard>

      {/* 2. Launch Foundation */}
      <BaseCard>
        <CardHeader 
          title="أول 7 أيام" 
          subtitle="Launch Foundation"
          icon={<Calendar size={24} />}
          badge="أسبوع التأسيس"
          badgeType="warning"
        />
        <CardBody>
          <div style={{ fontSize: "14px", fontWeight: 800, marginBottom: "16px" }}>مهمتك الأساسية في الأسبوع الأول:</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "20px" }}>
             <ActionIconBox icon={<Flag size={20} />} title="تحديد الاسم" desc="هوية قانونية واضحة" />
             <ActionIconBox icon={<Layout size={20} />} title="هوية بسيطة" desc="Logo + ألوان أساسية" />
             <ActionIconBox icon={<Smartphone size={20} />} title="السوشال" desc="فتح حسابات التواصل" />
          </div>
          <div style={{ fontSize: "14px", fontWeight: 700, color: TOKENS.colors.primary }}>الهدف: أن تكون جاهزاً تماماً للظهور الرقمي أمام العملاء.</div>
        </CardBody>
      </BaseCard>

      {/* 3. Core Product Setup */}
      <BaseCard>
        <CardHeader 
          title="تجهيز المنتج الأساسي" 
          subtitle="Core Product Setup"
          icon={<Construction size={24} />}
          badge="إعداد المنيو"
        />
        <CardBody>
          <div style={{ padding: "20px", background: "linear-gradient(135deg, #1e293b, #0f172a)", borderRadius: "20px", color: "#fff", marginBottom: "20px" }}>
             <div style={{ fontSize: "13px", opacity: 0.8, fontWeight: 700, marginBottom: "8px" }}>لا تعقد الأمور.. ابدأ بـ:</div>
             <div style={{ fontSize: "22px", fontWeight: 900 }}>3 إلى 5 منتجات فقط</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
             <CheckItem text="وصف واضح وجذاب لكل منتج" />
             <CheckItem text="تسعير مدروس بناءً على تكاليف واقعية" />
             <CheckItem text="تصوير احترافي أولي للمنتجات" />
          </div>

          <div style={{ padding: "12px 16px", background: "rgba(16, 185, 129, 0.1)", color: TOKENS.colors.secondary, borderRadius: "12px", fontSize: "14px", fontWeight: 900 }}>
             📍 القاعدة الذهبية: منتجات أقل = تنفيذ أسرع + جودة أعلى بكثير.
          </div>
        </CardBody>
      </BaseCard>

      {/* 4. Operations Ready */}
      <BaseCard variant="danger">
        <CardHeader 
          title="تجهيز العمليات" 
          subtitle="Operations Ready"
          icon={<Package size={24} />}
          badge="فحص الجاهزية"
          badgeType="danger"
        />
        <CardBody>
          <div style={{ fontSize: "14px", fontWeight: 800, marginBottom: "16px" }}>يجب أن تكون قادراً تقنياً على:</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
             <ReadyBox icon={<Smartphone size={16} />} label="استقبال الطلبات" />
             <ReadyBox icon={<Construction size={16} />} label="تجهيز الأكل" />
             <ReadyBox icon={<Package size={16} />} label="إدارة التوصيل" />
          </div>

          <div style={{ padding: "20px", background: "#fff1f2", borderRadius: "16px", border: "1px solid rgba(225,29,72,0.1)" }}>
             <div style={{ fontSize: "14px", fontWeight: 900, color: TOKENS.colors.danger, marginBottom: "8px" }}>الاختبار الحاسم:</div>
             <div style={{ fontSize: "16px", fontWeight: 800, color: TOKENS.colors.text.title }}>هل أستطيع استقبال 20 طلباً "اليوم" بدون فوضى؟</div>
             <div style={{ fontSize: "13px", fontWeight: 600, color: TOKENS.colors.text.muted, marginTop: "4px" }}>إذا كان الجواب (لا) → فأنت لست جاهزاً للانطلاق بعد.</div>
          </div>
        </CardBody>
      </BaseCard>

      {/* 5. Soft Launch */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="إطلاق تجريبي" 
          subtitle="Soft Launch"
          icon={<PlayCircle size={24} />}
          badge="مرحلة الصفر"
        />
        <CardBody>
          <div style={{ fontSize: "14px", fontWeight: 800, marginBottom: "16px" }}>قبل الإطلاق الرسمي، نفذ هذه الخطة:</div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
             <TestPlan label="تجربة مع 10-20 عميل" />
             <TestPlan label="اختبار فعلي للتوصيل" />
             <TestPlan label="جمع الملاحظات الأولية" />
          </div>

          <div style={{ padding: "16px", background: "rgba(99, 102, 241, 0.05)", borderRadius: "12px", border: `1px solid ${TOKENS.colors.border}`, display: "flex", alignItems: "center", gap: 12 }}>
             <div style={{ color: TOKENS.colors.primary }}><ShieldCheck size={20} /></div>
             <div style={{ fontSize: "14px", fontWeight: 800 }}>الهدف: اكتشاف المشاكل التشغيلية ومعالجتها قبل التوسع.</div>
          </div>
        </CardBody>
      </BaseCard>

      {/* 6. First Traffic Push */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="أول حملة تسويق" 
          subtitle="First Traffic Push"
          icon={<Megaphone size={24} />}
          badge="جذب العملاء"
          badgeType="success"
        />
        <CardBody>
          <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "16px", border: `1px solid ${TOKENS.colors.border}`, marginBottom: "20px" }}>
             <div style={{ fontSize: "15px", fontWeight: 900, marginBottom: "12px" }}>لا تنتظر العملاء.. اذهب إليهم:</div>
             <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <CheckItem text="إعلان فيديو بسيط وجذاب على TikTok" />
                <CheckItem text="استهداف جغرافي ضيق (3-5 كم) حول موقعك" />
                <CheckItem text="تقديم عرض افتتاحي مغرٍ (عرض الـ 50 طلب الأوائل)" />
             </div>
          </div>

          <div style={{ padding: "12px 16px", background: "#f0fdf4", border: `1px solid rgba(16,185,129,0.2)`, borderRadius: "10px", fontSize: "14px", fontWeight: 800, color: TOKENS.colors.secondary }}>
             مثال: "خصم 20% لأول 50 طلب عبر التطبيق"
          </div>
        </CardBody>
      </BaseCard>

      {/* 7. Post-Launch Optimization */}
      <BaseCard>
        <CardHeader 
          title="تحسين سريع بعد الإطلاق" 
          subtitle="Post-Launch Optimization"
          icon={<RefreshCw size={24} />}
          badge="تطوير رشيقة"
        />
        <CardBody>
          <div style={{ fontSize: "14px", fontWeight: 800, marginBottom: "16px" }}>بعد الأسبوع الأول من التشغيل الفعلي:</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
             <OptimizationStep title="احذف" desc="المنتجات الضعيفة" />
             <OptimizationStep title="حسن" desc="الأسعار والهوامش" />
             <OptimizationStep title="عدل" desc="طريقة العرض" />
          </div>

          <div style={{ padding: "16px", borderRight: `4px solid ${TOKENS.colors.danger}`, background: "rgba(225, 29, 72, 0.03)", fontSize: "14px", fontWeight: 800, color: TOKENS.colors.danger }}>
             ❗ تنبيه هام: لا تتمسك بأي قرار اتخذته سابقاً؛ في هذه المرحلة كل شيء قابل للتعديل والتغيير والتحسين.
          </div>
        </CardBody>
      </BaseCard>

      {/* 8. Stabilization Phase */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="تثبيت أول نجاح" 
          subtitle="Stabilization Phase"
          icon={<Flag size={24} />}
          badge="مرحلة الاستقرار"
        />
        <CardBody>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", background: "linear-gradient(to right, #4f46e5, #6366f1)", padding: "24px", borderRadius: "20px", color: "#fff" }}>
             <div>
                <div style={{ fontSize: "12px", fontWeight: 700, opacity: 0.8 }}>هدفك النهائي للاستقرار</div>
                <div style={{ fontSize: "28px", fontWeight: 900 }}>20-30 طلب يومي ثابت</div>
             </div>
             <Trophy size={48} opacity={0.3} />
          </div>

          <div style={{ fontSize: "14px", fontWeight: 900, marginBottom: "12px" }}>كيف تصل لهذا الاستقرار؟</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
             <StabilizeItem title="التجربة" desc="تحسين تجربة العميل" />
             <StabilizeItem title="الولاء" desc="التركيز على عملاء العودة" />
             <StabilizeItem title="الضبط" desc="ميكنة ومنهجة العمليات" />
          </div>
          
          <div style={{ marginTop: "24px", textAlign: "center", fontSize: "14px", fontWeight: 700, color: TOKENS.colors.text.muted }}>
             عند الوصول لهذا الرقم الثابت، تبدأ المرحلة الحقيقية للنمو والتوسع.
          </div>
        </CardBody>
      </BaseCard>

    </div>
  );
};

// --- HELPER COMPONENTS ---

const StrategyBox = ({ label, icon, isGood }: any) => (
  <div style={{ flex: 1, padding: "16px", background: isGood ? "#f0fdf4" : "rgba(0,0,0,0.02)", border: `1px solid ${isGood ? "rgba(16,185,129,0.1)" : TOKENS.colors.border}`, borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
     <div style={{ color: isGood ? TOKENS.colors.secondary : TOKENS.colors.text.muted }}>{icon}</div>
     <div style={{ fontSize: "14px", fontWeight: 900, color: isGood ? TOKENS.colors.secondary : TOKENS.colors.text.muted }}>{isGood ? "✅" : "❌"} {label}</div>
  </div>
);

const ActionIconBox = ({ icon, title, desc }: any) => (
  <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "16px", border: `1px solid ${TOKENS.colors.border}`, textAlign: "center" }}>
     <div style={{ color: TOKENS.colors.primary, marginBottom: "10px", display: "flex", justifyContent: "center" }}>{icon}</div>
     <div style={{ fontSize: "13px", fontWeight: 800, color: TOKENS.colors.text.title, marginBottom: "4px" }}>{title}</div>
     <div style={{ fontSize: "11px", fontWeight: 500, color: TOKENS.colors.text.muted }}>{desc}</div>
  </div>
);

const CheckItem = ({ text }: any) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "13.5px", fontWeight: 600 }}>
     <CheckCircle2 size={16} color={TOKENS.colors.secondary} />
     {text}
  </div>
);

const ReadyBox = ({ icon, label }: any) => (
  <div style={{ padding: "12px", background: "#fff", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "12px", display: "flex", alignItems: "center", gap: 8, fontSize: "12px", fontWeight: 700 }}>
     <div style={{ color: TOKENS.colors.primary }}>{icon}</div>
     {label}
  </div>
);

const TestPlan = ({ label }: any) => (
  <div style={{ flex: 1, padding: "12px", background: "#fff", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "12px", textAlign: "center", fontSize: "12px", fontWeight: 800 }}>
     {label}
  </div>
);

const OptimizationStep = ({ title, desc }: any) => (
  <div style={{ padding: "16px", background: "#f8fafc", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "14px", textAlign: "center" }}>
     <div style={{ fontSize: "16px", fontWeight: 900, color: TOKENS.colors.primary, marginBottom: "4px" }}>{title}</div>
     <div style={{ fontSize: "11px", color: TOKENS.colors.text.muted, fontWeight: 700 }}>{desc}</div>
  </div>
);

const StabilizeItem = ({ title, desc }: any) => (
  <div style={{ padding: "12px", background: "#fff", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "12px", textAlign: "center" }}>
     <div style={{ fontSize: "13px", fontWeight: 800, color: TOKENS.colors.text.title, marginBottom: "4px" }}>{title}</div>
     <div style={{ fontSize: "10px", color: TOKENS.colors.text.muted, fontWeight: 600 }}>{desc}</div>
  </div>
);

const Trophy = ({ size, opacity }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity }}><path d="m6 9 6 6 6-6"/><path d="M12 21V15"/><path d="M7 21h10"/><path d="M12 3a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"/></svg>
);
