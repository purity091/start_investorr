import React from "react";
import { BaseCard, CardHeader, CardBody, TOKENS } from "./CardDesignSystem";
import { 
  Target, 
  Brain, 
  Clock, 
  Construction, 
  Rocket, 
  BarChart3, 
  RefreshCw, 
  Compass,
  CheckCircle2,
  AlertCircle,
  Zap,
  ArrowRight,
  ClipboardList,
  Layers,
  Calculator
} from "lucide-react";

export const ExecutionResults = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
      
      {/* 1. Where You Start */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="تحديد نقطة الانطلاق الفعلية" 
          subtitle="Where You Start"
          icon={<Target size={24} />}
          badge="نقطة الصفر"
        />
        <CardBody>
          <div style={{ marginBottom: "20px" }}>
             أنت لست في مرحلة "إطلاق مشروع" تقليدي، بل في مرحلة "اختبار صلاحية الفكرة" (Validation).
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
             <StartBadge icon={<CoinsSmall />} label="رأس مال محدد" />
             <StartBadge icon={<AlertCircle size={14} />} label="سوق تنافسي" />
             <StartBadge icon={<Zap size={14} />} label="مخاطرة عالية" />
          </div>
          <div style={{ padding: "20px", background: "rgba(99, 102, 241, 0.05)", borderRadius: "16px", border: `1px solid ${TOKENS.colors.primary}` }}>
             <div style={{ fontSize: "16px", fontWeight: 900, color: TOKENS.colors.primary, marginBottom: "8px" }}>الاستنتاج التنفيذي:</div>
             <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: TOKENS.colors.danger, textDecoration: "line-through" }}>❌ لا تبدأ كمطعم كامل</div>
                <ArrowRight size={18} />
                <div style={{ fontSize: "15px", fontWeight: 900, color: TOKENS.colors.secondary }}>✅ ابدأ كنموذج خفيف (Lean Model)</div>
             </div>
          </div>
        </CardBody>
      </BaseCard>

      {/* 2. Execution Strategy */}
      <BaseCard>
        <CardHeader 
          title="اختيار المسار التنفيذي الذكي" 
          subtitle="Execution Strategy"
          icon={<Brain size={24} />}
          badge="المسار المختار"
          badgeType="success"
        />
        <CardBody>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
             <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", color: TOKENS.colors.secondary }}>
                <Layers size={20} />
             </div>
             <div style={{ fontSize: "18px", fontWeight: 900, color: TOKENS.colors.text.title }}>Cloud Kitchen / Lean Startup</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
             <CompareCard title="مطعم تقليدي" risk="خطر عالي" cost="تكلفة عالية" isBad />
             <CompareCard title="Cloud Kitchen" risk="خطر منخفض" cost="سرعة أعلى" isBad={false} />
          </div>

          <div style={{ fontSize: "14px", fontWeight: 800, marginBottom: "12px" }}>لماذا هذا الخيار؟</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
             <CheckItem text="أقل تكلفة تشغيلية ممكنة للبداية" />
             <CheckItem text="أسرع دخول للسوق (Time-to-Market)" />
             <CheckItem text="مرونة عالية جداً بالتجربة والتعديل" />
          </div>
        </CardBody>
      </BaseCard>

      {/* 3. Critical Launch Window */}
      <BaseCard variant="danger">
        <CardHeader 
          title="أول 48 ساعة" 
          subtitle="Critical Launch Window"
          icon={<Clock size={24} />}
          badge="حرجة جداً"
          badgeType="danger"
        />
        <CardBody>
          <div style={{ background: "#fff1f2", padding: "16px", borderRadius: "14px", border: "1px solid rgba(225, 29, 72, 0.1)", marginBottom: "20px" }}>
             <div style={{ fontSize: "14px", fontWeight: 800, color: TOKENS.colors.danger, display: "flex", alignItems: "center", gap: 8 }}>
                <AlertCircle size={18} />
                أول يومين تحدد مصير المشروع بالكامل
             </div>
          </div>
          
          <div style={{ fontSize: "14px", fontWeight: 900, marginBottom: "16px" }}>المطلوب فوراً (Action List):</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "20px" }}>
             <ActionBox title="مطبخ سحابي" desc="ارسم قائمة تواصل" />
             <ActionBox title="عروض أسعار" desc="تحقق من الأسعار" />
             <ActionBox title="واقع الأرقام" desc="افهم التكاليف" />
          </div>

          <div style={{ textAlign: "center", padding: "16px", background: "#f8fafc", borderRadius: "12px", border: `2px dashed ${TOKENS.colors.border}` }}>
             <div style={{ fontSize: "13px", fontWeight: 800, color: TOKENS.colors.text.muted }}>الهدف النهائي من الـ 48 ساعة:</div>
             <div style={{ fontSize: "18px", fontWeight: 900, color: TOKENS.colors.primary }}>تحويل "التوقعات" ⟵ "أرقام واقعية"</div>
          </div>
        </CardBody>
      </BaseCard>

      {/* 4. Operational Setup */}
      <BaseCard>
        <CardHeader 
          title="بناء الأساس التشغيلي" 
          subtitle="Operational Setup"
          icon={<Construction size={24} />}
          badge="تجهيز فني"
        />
        <CardBody>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
             <SetupItem icon={<ClipboardList size={20} />} title="منيو بسيط" desc="3-5 منتجات فقط" />
             <SetupItem icon={<Layers size={20} />} title="موردين" desc="موثوقين ومجربين" />
             <SetupItem icon={<Rocket size={20} />} title="نظام توصيل" desc="تفعيل القنوات" />
          </div>

          <AlertBox 
            type="warning" 
            title="تجنب هذا الخطأ" 
            text="إعداد قائمة طويلة ومعقدة سيستنزف وقتك ومالك. القاعدة الذهبية: ابدأ صغيراً جداً، ووسع لاحقاً بناءً على الطلب الفعلي." 
          />
          
          <div style={{ marginTop: "16px", padding: "12px 16px", background: "#f0fdf4", borderRight: `4px solid ${TOKENS.colors.secondary}`, color: TOKENS.colors.secondary, fontWeight: 900 }}>
             📍 القاعدة: قائمة مركزة وسريعة التنفيذ = نجاح أسرع.
          </div>
        </CardBody>
      </BaseCard>

      {/* 5. Soft Launch Strategy */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="إطلاق أول نسخة" 
          subtitle="Soft Launch Strategy"
          icon={<Rocket size={24} />}
          badge="خطة الانطلاق"
        />
        <CardBody>
          <div style={{ fontSize: "18px", fontWeight: 900, color: TOKENS.colors.primary, marginBottom: "20px" }}>لا تنتظر الكمال.. ابدأ الآن!</div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
             <StepItem step="01" title="إطلاق تجريبي صامت (Soft Launch)" />
             <StepItem step="02" title="الحد من عدد الطلبات لاختبار القدرة" />
             <StepItem step="03" title="مراقبة حثيثة لكل تفاصيل الأداء" />
          </div>

          <div style={{ fontSize: "14px", fontWeight: 800, marginBottom: "12px" }}>ماذا تراقب فعلياً؟</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
             <MonitorCard label="وقت التوصيل" val="سرعة التنفيذ" />
             <MonitorCard label="رضا العملاء" val="تجربة العميل" />
             <MonitorCard label="جودة المنتج" val="المذاق/التغليف" />
          </div>
        </CardBody>
      </BaseCard>

      {/* 6. Execution Metrics */}
      <BaseCard>
        <CardHeader 
          title="قياس الأداء اليومي" 
          subtitle="Execution Metrics"
          icon={<BarChart3 size={24} />}
          badge="لوحة التحكم"
        />
        <CardBody>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
             <MetricCircle label="طلبات يومية" value="28" icon={<Zap size={16} />} />
             <MetricCircle label="متوسط الطلب" value="$28" icon={<CoinsSmall />} />
             <MetricCircle label="نسبة العودة" value="35%" icon={<RefreshCw size={16} />} />
          </div>

          <div style={{ padding: "16px", borderRight: `4px solid ${TOKENS.colors.primary}`, background: "#f8fafc", fontSize: "14px", fontWeight: 700 }}>
             لماذا هذه الأرقام؟ لأنهم المحرك الحقيقي للنمو. قاعدة ذهبية: ما لا يتم قياسه لا يمكن تحسينه أبداً.
          </div>
        </CardBody>
      </BaseCard>

      {/* 7. Rapid Iteration Loop */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="التعديل السريع" 
          subtitle="Rapid Iteration Loop"
          icon={<RefreshCw size={24} />}
          badge="تطوير مستمر"
        />
        <CardBody>
          <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "20px" }}>كل أسبوع، يجب أن تمر بهذه الحلقة:</div>
          
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
             <IterationBox icon={<Layers size={18} />} title="عدل القائمة" />
             <IterationBox icon={<Calculator size={18} />} title="حسن التسعير" />
             <IterationBox icon={<Zap size={18} />} title="جرب عروض" />
          </div>

          <div style={{ padding: "16px", background: "rgba(0,0,0,0.02)", borderRadius: "12px", border: `1px solid ${TOKENS.colors.border}`, display: "flex", alignItems: "flex-start", gap: 12 }}>
             <div style={{ padding: "8px", borderRadius: "10px", background: "#fff", border: `1px solid ${TOKENS.colors.border}` }}>
                💡
             </div>
             <div>
                <div style={{ fontSize: "14px", fontWeight: 900, marginBottom: "4px" }}>مثال تنفيذي:</div>
                <div style={{ fontSize: "13px", color: TOKENS.colors.text.body, fontWeight: 500 }}>إذا منتج ما لا يبيع أو أرباحه منخفضة → احذفه فوراً من القائمة دون تردد.</div>
             </div>
          </div>
          
          <div style={{ marginTop: "16px", fontWeight: 800, color: TOKENS.colors.primary }}>
             مشروعك هو تجربة مستمرة وليس خطة ثابتة ومحفوظة.
          </div>
        </CardBody>
      </BaseCard>

      {/* 8. Scale Decision Point */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="الانتقال للمرحلة التالية" 
          subtitle="Scale Decision Point"
          icon={<Compass size={24} />}
          badge="60-90 يوم"
        />
        <CardBody>
          <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "24px" }}>بعد شهرين إلى ثلاثة، يجب أن تقرر بناءً على البيانات:</div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
             <DecisionPath 
               title="متى تتوسع؟" 
               icon={<Rocket size={20} color={TOKENS.colors.secondary} />}
               items={["الطلب ثابت ومستقر", "الربحية واضحة", "العمليات مستقرة"]}
             />
             <DecisionPath 
               title="متى تتوقف؟" 
               icon={<AlertCircle size={20} color={TOKENS.colors.danger} />}
               items={["الطلب ضعيف جداً", "التكاليف أعلى من الدخل", "عدم وجود ولاء"]}
             />
          </div>

          <div style={{ padding: "20px", background: "linear-gradient(135deg, #0f172a, #1e293b)", borderRadius: "20px", color: "#fff", textAlign: "center" }}>
             <div style={{ fontSize: "13px", opacity: 0.7, fontWeight: 700, marginBottom: "8px" }}>الخلاصة الذكية</div>
             <div style={{ fontSize: "16px", fontWeight: 900, marginBottom: "12px" }}>أنت لا تبني "مطعم"، أنت تبني "آلة اختبار سوق".</div>
             <div style={{ fontSize: "14px", fontWeight: 600 }}>إذا نجحت → توسع بقوة. إذا فشلت → عدل واتخذ قراراً ذكياً بتغيير الاتجاه.</div>
          </div>
        </CardBody>
      </BaseCard>

    </div>
  );
};

// --- HELPER COMPONENTS ---

const StartBadge = ({ icon, label }: any) => (
  <div style={{ padding: "10px", background: "#f8fafc", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "12px", display: "flex", alignItems: "center", gap: 8, fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.title }}>
     {icon}
     {label}
  </div>
);

const CoinsSmall = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18.1"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>
);

const CompareCard = ({ title, risk, cost, isBad }: any) => (
  <div style={{ padding: "16px", borderRadius: "16px", background: isBad ? "#fff1f2" : "#f0fdf4", border: `1px solid ${isBad ? "rgba(225,29,72,0.1)" : "rgba(16,185,129,0.1)"}` }}>
     <div style={{ fontSize: "14px", fontWeight: 900, marginBottom: "8px", color: isBad ? TOKENS.colors.danger : TOKENS.colors.secondary }}>{title}</div>
     <div style={{ fontSize: "12px", fontWeight: 700, opacity: 0.8 }}>⚠️ {risk}</div>
     <div style={{ fontSize: "12px", fontWeight: 700, opacity: 0.8 }}>💰 {cost}</div>
  </div>
);

const CheckItem = ({ text }: any) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "14px", fontWeight: 600 }}>
     <CheckCircle2 size={16} color={TOKENS.colors.secondary} />
     {text}
  </div>
);

const ActionBox = ({ title, desc }: any) => (
  <div style={{ padding: "12px", background: "#fff", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "12px", textAlign: "center" }}>
     <div style={{ fontSize: "13px", fontWeight: 800, color: TOKENS.colors.text.title, marginBottom: "2px" }}>{title}</div>
     <div style={{ fontSize: "10px", color: TOKENS.colors.text.muted, fontWeight: 600 }}>{desc}</div>
  </div>
);

const SetupItem = ({ icon, title, desc }: any) => (
  <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "16px", border: `1px solid ${TOKENS.colors.border}`, textAlign: "center" }}>
     <div style={{ color: TOKENS.colors.primary, marginBottom: "8px", display: "flex", justifyContent: "center" }}>{icon}</div>
     <div style={{ fontSize: "13.5px", fontWeight: 800, color: TOKENS.colors.text.title, marginBottom: "4px" }}>{title}</div>
     <div style={{ fontSize: "11px", fontWeight: 600, color: TOKENS.colors.text.muted, lineHeight: 1.3 }}>{desc}</div>
  </div>
);

const AlertBox = ({ type, title, text }: any) => {
  const isWarning = type === "warning";
  const bg = isWarning ? "#fffbeb" : "#eff6ff";
  const color = isWarning ? "#92400e" : "#1e40af";
  return (
    <div style={{ padding: "16px", background: bg, borderRadius: "14px", border: `1px solid ${bg}`, marginTop: "12px" }}>
       <div style={{ fontSize: "13px", fontWeight: 900, color: color, marginBottom: "4px" }}>{title}</div>
       <div style={{ fontSize: "13.5px", color: TOKENS.colors.text.body, fontWeight: 500, lineHeight: 1.5 }}>{text}</div>
    </div>
  );
};

const StepItem = ({ step, title }: any) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
     <div style={{ fontSize: "11px", fontWeight: 900, color: TOKENS.colors.primary, background: TOKENS.colors.primaryGlow, width: "32px", height: "30px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {step}
     </div>
     <div style={{ fontSize: "14px", fontWeight: 700, color: TOKENS.colors.text.title }}>{title}</div>
  </div>
);

const MonitorCard = ({ label, val }: any) => (
  <div style={{ padding: "12px", background: "#f8fafc", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "12px", textAlign: "center" }}>
     <div style={{ fontSize: "11px", fontWeight: 800, color: TOKENS.colors.text.muted, marginBottom: "2px" }}>{label}</div>
     <div style={{ fontSize: "12px", fontWeight: 900 }}>{val}</div>
  </div>
);

const MetricCircle = ({ label, value, icon }: any) => (
  <div style={{ textAlign: "center" }}>
     <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fff", border: `1px solid ${TOKENS.colors.border}`, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", color: TOKENS.colors.primary, boxShadow: TOKENS.shadows.soft }}>
        {icon}
     </div>
     <div style={{ fontSize: "20px", fontWeight: 900, color: TOKENS.colors.text.title, marginBottom: "2px" }}>{value}</div>
     <div style={{ fontSize: "11px", fontWeight: 800, color: TOKENS.colors.text.muted }}>{label}</div>
  </div>
);

const IterationBox = ({ icon, title }: any) => (
  <div style={{ flex: 1, padding: "16px", background: "#fff", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "16px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
     <div style={{ color: TOKENS.colors.primary }}>{icon}</div>
     <div style={{ fontSize: "14px", fontWeight: 800 }}>{title}</div>
  </div>
);

const DecisionPath = ({ title, icon, items }: any) => (
  <div style={{ padding: "16px", background: "#fff", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "20px" }}>
     <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "16px" }}>
        {icon}
        <div style={{ fontSize: "15px", fontWeight: 900 }}>{title}</div>
     </div>
     <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.map((item: string, idx: number) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "13px", fontWeight: 600, color: TOKENS.colors.text.body }}>
             <div style={{ width: 4, height: 4, borderRadius: "50%", background: TOKENS.colors.border }} />
             {item}
          </div>
        ))}
     </div>
  </div>
);
