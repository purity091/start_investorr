import React from "react";
import { BaseCard, CardHeader, CardBody, TOKENS } from "./CardDesignSystem";
import { 
  CheckCircle2, 
  AlertTriangle, 
  TrendingDown, 
  Zap, 
  Timer, 
  BarChart, 
  Rocket, 
  Brain,
  ArrowRight,
  ShieldCheck,
  Activity,
  Target,
  Flag,
  Lightbulb,
  AlertCircle,
  RefreshCw
} from "lucide-react";

export const FinalDecisionResults = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
      
      {/* 1. Go / No-Go */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="هل المشروع يستحق البدء؟" 
          subtitle="Go / No-Go"
          icon={<CheckCircle2 size={24} />}
          badge="القرار الجوهري"
        />
        <CardBody>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
             <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: TOKENS.colors.secondary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CheckCircle2 size={24} />
             </div>
             <div>
                <div style={{ fontSize: "22px", fontWeight: 900, color: TOKENS.colors.secondary }}>نعم… ولكن بشروط صارمة</div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: TOKENS.colors.text.muted }}>الفكرة قابلة للتنفيذ والسوق متعطش، لكن الموارد الحالية محدودة.</div>
             </div>
          </div>
          <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "14px", border: `1px solid ${TOKENS.colors.border}`, fontSize: "14.5px", fontWeight: 700 }}>
             📍 الخلاصة الاستراتيجية: البدء ممكن ومربح، ولكن ليس بالطريقة التقليدية التي كنت تخطط لها.
          </div>
        </CardBody>
      </BaseCard>

      {/* 2. Real Risk Level */}
      <BaseCard variant="danger">
        <CardHeader 
          title="مستوى المخاطرة الحقيقي" 
          subtitle="Real Risk Level"
          icon={<AlertTriangle size={24} />}
          badge="تحليل المخاطر"
          badgeType="danger"
        />
        <CardBody>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
             <RiskCard label="نموذج مطعم تقليدي" level="عالي جداً" color={TOKENS.colors.danger} isRed />
             <RiskCard label="نموذج الاستنبات الخفيف" level="متوسط - منخفض" color={TOKENS.colors.secondary} isRed={false} />
          </div>
          <AlertBox 
            type="danger" 
            title="لماذا التفاوت في المخاطر؟" 
            text="لأن رأس المال الحالي محدود جداً والسوق تنافسي بشراسة. البداية التقليدية تعني استنزافاً سريعاً للسيولة قبل الوصول لنقطة التعادل." 
          />
        </CardBody>
      </BaseCard>

      {/* 3. Core Gap */}
      <BaseCard variant="danger">
        <CardHeader 
          title="الفجوة الأساسية" 
          subtitle="Core Gap"
          icon={<TrendingDown size={24} />}
          badge="العجز المالي"
          badgeType="danger"
        />
        <CardBody>
          <div style={{ background: "#fff1f2", padding: "20px", borderRadius: "16px", border: "1px solid rgba(225, 29, 72, 0.1)", marginBottom: "20px" }}>
             <div style={{ fontSize: "16px", fontWeight: 900, color: TOKENS.colors.danger, marginBottom: "8px", display: "flex", alignItems: "center", gap: 8 }}>
                <AlertCircle size={20} />
                أكبر مشكلة: عجز رأس المال التشغيلي
             </div>
             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                <div>
                   <div style={{ fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.muted }}>مستوى التغطية الحالي</div>
                   <div style={{ fontSize: "24px", fontWeight: 900, color: TOKENS.colors.danger }}>17% فقط</div>
                </div>
                <div style={{ textAlign: "left" }}>
                   <div style={{ fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.muted }}>فجوة التمويل</div>
                   <div style={{ fontSize: "24px", fontWeight: 900, color: TOKENS.colors.danger }}>-83%</div>
                </div>
             </div>
          </div>
          <div style={{ padding: "12px 16px", background: "rgba(0,0,0,0.02)", borderRadius: "10px", borderRight: `4px solid ${TOKENS.colors.danger}`, fontSize: "14px", fontWeight: 700 }}>
             المعنى الحقيقي: إذا تجاهلت هذه الفجوة وحاولت استئجار محل أو ديكورات، فإن احتمالية فشل المشروع قبل الإطلاق تتجاوز 90%.
          </div>
        </CardBody>
      </BaseCard>

      {/* 4. Smart Strategic Move */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="القرار الاستراتيجي الذكي" 
          subtitle="Smart Strategic Move"
          icon={<Zap size={24} />}
          badge="الحل التقني"
        />
        <CardBody>
          <div style={{ fontSize: "18px", fontWeight: 900, color: TOKENS.colors.primary, marginBottom: "20px" }}>الحل الوحيد: Cloud Kitchen / Lean Startup</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
             <ReasonItem title="تقليل التكاليف" desc="إلغاء الإيجارات العالية" />
             <ReasonItem title="فرص النجاح" desc="زيادة احتمالية الاستمرار" />
             <ReasonItem title="مرونة التجربة" desc="تعديل المنيو فوراً" />
          </div>
          <div style={{ textAlign: "center", padding: "16px", background: "linear-gradient(to right, #4f46e5, #6366f1)", borderRadius: "14px", color: "#fff", fontWeight: 800 }}>
             هذا ليس مجرد "خيار".. بل هو "ضرورة" حتمية للنجاح.
          </div>
        </CardBody>
      </BaseCard>

      {/* 5. Time to Goal */}
      <BaseCard>
        <CardHeader 
          title="سرعة الوصول للهدف" 
          subtitle="Time to Goal"
          icon={<Timer size={24} />}
          badge="الجدول الزمني"
          badgeType="warning"
        />
        <CardBody>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc", padding: "24px", borderRadius: "20px", border: `1px solid ${TOKENS.colors.border}`, marginBottom: "20px" }}>
             <div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.muted, marginBottom: "4px" }}>الهدف المالي المطلوب</div>
                <div style={{ fontSize: "28px", fontWeight: 900, color: TOKENS.colors.secondary }}>$6,000 / شهرياً</div>
             </div>
             <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.muted, marginBottom: "4px" }}>الواقع الزمني</div>
                <div style={{ fontSize: "20px", fontWeight: 900, color: TOKENS.colors.primary }}>3-6 أشهر</div>
             </div>
          </div>
          <AlertBox 
            type="info" 
            title="شرط التحقق" 
            text="هذا الهدف ممكن فقط إذا التزمت بالخطة الرشيقة المقترحة. غير ذلك، سيتأخر الوصول لسنوات أو لن يتحقق أبداً بسبب العجز المالي." 
          />
        </CardBody>
      </BaseCard>

      {/* 6. Success Probability */}
      <BaseCard>
        <CardHeader 
          title="فرص النجاح الفعلية" 
          subtitle="Success Probability"
          icon={<BarChart size={24} />}
          badge="قياس الاحتمالية"
        />
        <CardBody>
          <div style={{ display: "flex", gap: "24px", alignItems: "center", marginBottom: "20px" }}>
             <div style={{ width: 100, height: 100, borderRadius: "50%", border: `8px solid ${TOKENS.colors.warning}`, borderTopColor: "transparent", display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(-45deg)" }}>
                <span style={{ fontSize: "24px", fontWeight: 900, color: TOKENS.colors.text.title, transform: "rotate(45deg)" }}>75%</span>
             </div>
             <div style={{ flex: 1 }}>
                <div style={{ fontSize: "15px", fontWeight: 800, color: TOKENS.colors.warning, marginBottom: "4px" }}>احتمالية نجاح عالية بشرط:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                   <SmallCheck label="الالتزام بالنموذج الخفيف" />
                   <SmallCheck label="تنفيذ سريع للقرارات" />
                   <SmallCheck label="مراقبة الأرقام يومياً" />
                </div>
             </div>
          </div>
          <div style={{ color: TOKENS.colors.danger, fontSize: "13px", fontWeight: 700, fontStyle: "italic" }}>
             ⚠️ بدون هذه الشروط، تنخفض نسبة النجاح بشكل كبير جداً.
          </div>
        </CardBody>
      </BaseCard>

      {/* 7. Final Action Call */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="القرار التنفيذي النهائي" 
          subtitle="Final Action Call"
          icon={<Rocket size={24} />}
          badge="ابدأ الآن"
          badgeType="success"
        />
        <CardBody>
          <div style={{ fontSize: "20px", fontWeight: 900, color: TOKENS.colors.secondary, marginBottom: "20px", display: "flex", alignItems: "center", gap: 10 }}>
             <Rocket size={24} />
             القرار الواضح: ابدأ فوراً ولكن بذكاء
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
             <ActionPathCard title="توقف عن التفكير في:" items={["المحل والديكور", "المصاريف العالية", "الكمال الزائف"]} isDonts />
             <ActionPathCard title="ابدأ فوراً بـ:" items={["المطبخ السحابي", "قائمة طعام بسيطة", "تسويق مباشر مركز"]} isDonts={false} />
          </div>
        </CardBody>
      </BaseCard>

      {/* 8. Execution Mindset */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="عقلية النجاح" 
          subtitle="Execution Mindset"
          icon={<Brain size={24} />}
          badge="التوجيه القيادي"
        />
        <CardBody>
          <div style={{ padding: "20px", background: "linear-gradient(135deg, #0f172a, #1e293b)", borderRadius: "20px", color: "#fff" }}>
             <div style={{ fontSize: "14px", fontWeight: 700, opacity: 0.8, marginBottom: "8px" }}>إذا أردت النجاح الحقيقي:</div>
             <div style={{ fontSize: "18px", fontWeight: 900, marginBottom: "16px", color: TOKENS.colors.primaryLight }}>لا تفكر كصاحب مطعم تقليدي..</div>
             <div style={{ fontSize: "20px", fontWeight: 900, marginBottom: "20px", color: "#fff" }}>👉 فكر كمدير نظام نمو (Growth Operator)</div>
             
             <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                <MindsetItem icon={<Activity size={16} />} text="راقب الأرقام" />
                <MindsetItem icon={<RefreshCw size={16} />} text="عدل بسرعة" />
                <MindsetItem icon={<Target size={16} />} text="اتخذ قرارات" />
             </div>
          </div>
        </CardBody>
      </BaseCard>

    </div>
  );
};

// --- HELPER COMPONENTS ---

const RiskCard = ({ label, level, color, isRed }: any) => (
  <div style={{ padding: "16px", borderRadius: "16px", background: isRed ? "rgba(225,29,72,0.05)" : "rgba(16,185,129,0.05)", border: `1px solid ${isRed ? "rgba(225,29,72,0.1)" : "rgba(16,185,129,0.1)"}` }}>
     <div style={{ fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.muted, marginBottom: "4px" }}>{label}</div>
     <div style={{ fontSize: "16px", fontWeight: 900, color: color }}>مخاطرة {level}</div>
  </div>
);

const AlertBox = ({ type, title, text }: any) => (
  <div style={{ padding: "16px", background: "#fff1f2", borderRadius: "14px", border: "1px solid #ffe4e6", marginTop: "12px" }}>
     <div style={{ fontSize: "13px", fontWeight: 900, color: "#9f1239", marginBottom: "4px" }}>{title}</div>
     <div style={{ fontSize: "13.5px", color: TOKENS.colors.text.body, fontWeight: 500, lineHeight: 1.5 }}>{text}</div>
  </div>
);

const ReasonItem = ({ title, desc }: any) => (
  <div style={{ padding: "12px", background: "#fff", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "14px", textAlign: "center" }}>
     <div style={{ fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.title, marginBottom: "4px" }}>{title}</div>
     <div style={{ fontSize: "10px", color: TOKENS.colors.text.muted, fontWeight: 600 }}>{desc}</div>
  </div>
);

const SmallCheck = ({ label }: any) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "12px", fontWeight: 700, color: TOKENS.colors.text.title }}>
     <CheckCircle2 size={14} color={TOKENS.colors.secondary} />
     {label}
  </div>
);

const ActionPathCard = ({ title, items, isDonts }: any) => (
  <div style={{ padding: "16px", borderRadius: "16px", background: isDonts ? "#f8fafc" : TOKENS.colors.primaryGlow, border: `1px solid ${isDonts ? TOKENS.colors.border : TOKENS.colors.primary}` }}>
     <div style={{ fontSize: "14px", fontWeight: 900, marginBottom: "12px", color: isDonts ? TOKENS.colors.text.title : TOKENS.colors.primary }}>{title}</div>
     <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "12px", fontWeight: 600 }}>
             {isDonts ? <AlertCircle size={14} color={TOKENS.colors.danger} /> : <CheckCircle2 size={14} color={TOKENS.colors.secondary} />}
             {item}
          </div>
        ))}
     </div>
  </div>
);

const MindsetItem = ({ icon, text }: any) => (
  <div style={{ padding: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
     <div style={{ color: TOKENS.colors.primaryLight }}>{icon}</div>
     <div style={{ fontSize: "11px", fontWeight: 800 }}>{text}</div>
  </div>
);

const MetricBox = ({ label, value, color }: any) => (
  <div style={{ padding: "16px", textAlign: "center", background: "#f8fafc", borderRadius: "16px", border: `1px solid ${TOKENS.colors.border}` }}>
     <div style={{ fontSize: "11px", fontWeight: 800, color: TOKENS.colors.text.muted, marginBottom: "4px" }}>{label}</div>
     <div style={{ fontSize: "20px", fontWeight: 900, color: color }}>{value}</div>
  </div>
);
