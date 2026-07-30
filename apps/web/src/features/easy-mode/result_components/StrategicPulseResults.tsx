import React from "react";
import { BaseCard, CardHeader, CardBody, TOKENS } from "./CardDesignSystem";
import { 
  BarChart3, 
  AlertTriangle, 
  Activity, 
  Zap, 
  Target, 
  ShieldAlert, 
  Rocket, 
  Compass, 
  TrendingUp, 
  Search,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from "lucide-react";

export const StrategicPulseResults = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
      
      {/* 1. Project Snapshot */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="قراءة سريعة لوضع المشروع" 
          subtitle="Project Snapshot"
          icon={<BarChart3 size={24} />}
          badge="نظرة تشخيصية"
        />
        <CardBody>
          <div style={{ marginBottom: "20px" }}>
             مشروعك حالياً في مرحلة ما قبل الانطلاق الفعلي مع جاهزية تشغيلية متوسطة.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "16px", marginBottom: "24px" }}>
            <DataMiniCard label="رأس المال" value="$5,000" subValue="محدود" icon={<TrendingUp size={18} />} color={TOKENS.colors.primary} />
            <DataMiniCard label="الهدف" value="$6,000/شهرياً" subValue="هدف طموح" icon={<Target size={18} />} color={TOKENS.colors.secondary} />
            <DataMiniCard label="الجاهزية" value="44%" subValue="تحت الـ 50%" icon={<Activity size={18} />} color={TOKENS.colors.warning} />
            <DataMiniCard label="الفجوة" value="مرتفعة" subValue="تحتاج عمل" icon={<AlertTriangle size={18} />} color={TOKENS.colors.danger} />
          </div>
          <AlertBox 
            type="info" 
            title="التحليل الاستراتيجي" 
            text="هناك عدم توازن واضح بين الطموح والإمكانيات الحالية، وهذا طبيعي في البداية لكن يحتاج ضبط سريع." 
          />
          <div style={{ marginTop: "16px", fontWeight: 800, color: TOKENS.colors.primary, display: "flex", alignItems: "center", gap: 8 }}>
            <ArrowRight size={18} />
            الخلاصة: أنت لست متأخر… لكنك بحاجة إلى إعادة ضبط المسار قبل التنفيذ.
          </div>
        </CardBody>
      </BaseCard>

      {/* 2. Target Gap Analysis */}
      <BaseCard variant="danger">
        <CardHeader 
          title="فجوة الاستهداف" 
          subtitle="Target Gap Analysis"
          icon={<AlertTriangle size={24} />}
          badge="-48% فجوة"
          badgeType="danger"
        />
        <CardBody>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "20px" }}>
             <div style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", color: TOKENS.colors.text.muted, marginBottom: "4px" }}>الإيراد المتوقع (شهر 12)</div>
                <div style={{ fontSize: "20px", fontWeight: 900, color: TOKENS.colors.text.title }}>$3,200</div>
             </div>
             <div style={{ width: "1px", height: "40px", background: TOKENS.colors.border }} />
             <div style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", color: TOKENS.colors.text.muted, marginBottom: "4px" }}>الهدف المطلوب</div>
                <div style={{ fontSize: "20px", fontWeight: 900, color: TOKENS.colors.text.title }}>$6,000</div>
             </div>
          </div>
          
          <ProgressBar progress={53} color={TOKENS.colors.danger} label="الفجوة السلبية" />

          <AlertBox 
            type="warning" 
            title="تحليل الفجوة" 
            text="هذه الفجوة تعني أنك تحتاج إلى زيادة الطلبات اليومية بنسبة ~50% أو رفع متوسط الطلب (AOV) أو الجمع بين الاثنين." 
          />
          <div style={{ marginTop: "16px", padding: "12px 16px", background: "rgba(99, 102, 241, 0.05)", borderRadius: "12px", fontSize: "14px", fontWeight: 700, color: TOKENS.colors.text.title }}>
             💡 <span style={{ color: TOKENS.colors.primary, marginRight: 8 }}>بصيرة:</span> المشكلة ليست في الفكرة… بل في المعادلة التشغيلية الحالية.
          </div>
        </CardBody>
      </BaseCard>

      {/* 3. Readiness Index */}
      <BaseCard>
        <CardHeader 
          title="مؤشر الجاهزية التشغيلية" 
          subtitle="Readiness Index"
          icon={<Activity size={24} />}
          badge="تحتاج تطوير"
          badgeType="warning"
        />
        <CardBody>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center", marginBottom: "20px" }}>
             <div style={{ width: 120, height: 120, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                <svg width="120" height="120" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke={TOKENS.colors.warning} strokeWidth="8" strokeDasharray="282.7" strokeDashoffset={282.7 * (1 - 0.44)} strokeLinecap="round" transform="rotate(-90 50 50)" />
                </svg>
                <div style={{ position: "absolute", fontSize: "24px", fontWeight: 900, color: TOKENS.colors.text.title }}>44%</div>
             </div>
             <div style={{ flex: "1 1 250px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <StatusItem status="success" label="فكرة واضحة ومحددة" />
                <StatusItem status="warning" label="تنفيذ العمليات لا يزال غير مكتمل" />
                <StatusItem status="danger" label="نظام التشغيل غير جاهز بالكامل" />
             </div>
          </div>
          <AlertBox 
            type="info" 
            title="تحليل الجاهزية" 
            text="هذا المستوى يعني أن المشروع قابل للانطلاق، لكنه ليس جاهزاً للتوسع؛ أي خطأ قد يعني استنزافاً سريعاً للميزانية." 
          />
          <div style={{ marginTop: "16px", fontWeight: 800, color: TOKENS.colors.secondary }}>
             📍 التوجيه الاستراتيجي: ابدأ بنسخة خفيفة (Lean Version) وليس بالمشروع الكامل حالياً.
          </div>
        </CardBody>
      </BaseCard>

      {/* 4. Core Bottleneck */}
      <BaseCard variant="danger">
        <CardHeader 
          title="عنق الزجاجة الرئيسي" 
          subtitle="Core Bottleneck"
          icon={<ShieldAlert size={24} />}
          badge="حرج جداً"
          badgeType="danger"
        />
        <CardBody>
          <div style={{ background: "#fff1f2", padding: "20px", borderRadius: "16px", border: "1px solid rgba(225, 29, 72, 0.1)", marginBottom: "20px" }}>
             <div style={{ fontSize: "16px", fontWeight: 900, color: TOKENS.colors.danger, marginBottom: "8px", display: "flex", alignItems: "center", gap: 8 }}>
                <AlertCircle size={20} />
                المشكلة الأساسية: عجز رأس المال التشغيلي
             </div>
             <div style={{ fontSize: "14px", color: TOKENS.colors.text.body, fontWeight: 500 }}>
                الميزانية الحالية تغطي فقط 17% من الاحتياج الفعلي للتأسيس والتشغيل، مما يخلق فجوة تمويلية بنسبة 83%.
             </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "20px" }}>
             <div style={{ padding: "16px", borderRadius: "12px", border: `1px solid ${TOKENS.colors.border}`, background: "#fff" }}>
                <div style={{ fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.muted }}>مستوى التغطية ميزانية</div>
                <div style={{ fontSize: "20px", fontWeight: 900, color: TOKENS.colors.danger }}>17%</div>
             </div>
             <div style={{ padding: "16px", borderRadius: "12px", border: `1px solid ${TOKENS.colors.border}`, background: "#fff" }}>
                <div style={{ fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.muted }}>فجوة التمويل</div>
                <div style={{ fontSize: "20px", fontWeight: 900, color: TOKENS.colors.danger }}>-83%</div>
             </div>
          </div>
          <div style={{ padding: "12px 16px", borderRight: `4px solid ${TOKENS.colors.danger}`, background: "rgba(0,0,0,0.02)", fontSize: "14px", fontWeight: 600 }}>
             هذا أخطر شيء حالياً: ليس لأن الفكرة ضعيفة، بل لأن النموذج الحالي أكبر من ميزانيتك. الاستمرار بنفس الطريقة يعني الفشل قبل الإطلاق.
          </div>
          <div style={{ marginTop: "16px", fontWeight: 900, color: TOKENS.colors.secondary, background: "rgba(16, 185, 129, 0.1)", padding: "10px 16px", borderRadius: "8px", width: "fit-content" }}>
             👉 الحل الفوري: تقليل CAPEX (تكاليف التأسيس) فوراً.
          </div>
        </CardBody>
      </BaseCard>

      {/* 5. AI Decision */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="القرار الاستراتيجي الذكي" 
          subtitle="AI Decision"
          icon={<Zap size={24} />}
          badge="قرار مقترح"
        />
        <CardBody>
          <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
             <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: TOKENS.colors.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CheckCircle2 size={24} />
             </div>
             <div>
                <div style={{ fontSize: "18px", fontWeight: 900, color: TOKENS.colors.primary, marginBottom: "4px" }}>Proceed with Adjustments</div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: TOKENS.colors.text.title }}>التحول إلى نموذج المطبخ السحابي (Cloud Kitchen / Lean Model)</div>
             </div>
          </div>
          
          <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px" }}>
             <ReasonCard title="تقليل التكاليف" desc="خفض المصاريف الثابتة بنسبة 60%" />
             <ReasonCard title="سرعة الوصول" desc="دخول السوق في أقل من 30 يوم" />
             <ReasonCard title="أمان أعلى" desc="تقليل مخاطر رأس المال المفقود" />
          </div>

          <div style={{ marginTop: "20px", padding: "16px", background: "linear-gradient(135deg, #4f46e5, #6366f1)", borderRadius: "16px", color: "#fff" }}>
             <div style={{ fontSize: "13px", opacity: 0.8, fontWeight: 600, marginBottom: "4px" }}>بصيرة استراتيجية قوية</div>
             <div style={{ fontSize: "15px", fontWeight: 800 }}>أنت لا تحتاج إلى مطعم مادي كامل في هذه المرحلة؛ أنت تحتاج أولاً إلى "إثبات الطلب" (Proof of Demand).</div>
          </div>
        </CardBody>
      </BaseCard>

      {/* 6. Financial Safety */}
      <BaseCard>
        <CardHeader 
          title="تحليل الأمان المالي" 
          subtitle="Financial Safety"
          icon={<Compass size={24} />}
          badge="مخاطرة متوسطة"
          badgeType="warning"
        />
        <CardBody>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "24px" }}>
             <KPIMiniBox label="نقطة التعادل" value="الشهر 8" sub="متأخر قليلاً" />
             <KPIMiniBox label="السيناريو" value="متحفظ" sub="واقعي جداً" />
             <KPIMiniBox label="المخاطر" value="متوسطة ⟵ عالية" sub="تحتاج مراقبة" />
          </div>
          
          <AlertBox 
            type="danger" 
            title="تحذير مالي" 
            text="إذا لم يتم تعديل النموذج، فإن السيولة ستنتهي قبل تحقيق التعادل المالي، مما سيؤثر على جودة التشغيل ويؤدي لضغط هائل." 
          />

          <div style={{ marginTop: "20px" }}>
             <div style={{ fontSize: "14px", fontWeight: 800, marginBottom: "12px", color: TOKENS.colors.text.title }}>التوجيه المالي التنفيذي:</div>
             <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <CheckItem text="خفّض التكاليف الثابتة بنسبة 40% على الأقل" />
                <CheckItem text="ركز على التدفق النقدي (Cash Flow) كأولوية قصوى قبل الأرباح" />
             </div>
          </div>
        </CardBody>
      </BaseCard>

      {/* 7. Acceleration Strategy */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="خطة تسريع الوصول للهدف" 
          subtitle="Acceleration Strategy"
          icon={<Rocket size={24} />}
          badge="خطة نمو"
          badgeType="success"
        />
        <CardBody>
          <div style={{ marginBottom: "20px", fontSize: "15px", fontWeight: 700 }}>
             للوصول إلى هدفك ($6,000) خلال أول 90 يوم، يجب تحقيق هذه الأرقام:
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
             <div style={{ flex: 1, padding: "16px", borderRadius: "16px", background: "#f8fafc", border: `1px solid ${TOKENS.colors.border}` }}>
                <div style={{ fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.muted, marginBottom: "8px" }}>الطلبات اليومية</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                   <span style={{ fontSize: "18px", fontWeight: 700, color: TOKENS.colors.text.muted }}>15</span>
                   <ArrowRight size={16} />
                   <span style={{ fontSize: "24px", fontWeight: 900, color: TOKENS.colors.secondary }}>28</span>
                </div>
             </div>
             <div style={{ flex: 1, padding: "16px", borderRadius: "16px", background: "#f8fafc", border: `1px solid ${TOKENS.colors.border}` }}>
                <div style={{ fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.muted, marginBottom: "8px" }}>متوسط قيمة الطلب (AOV)</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                   <span style={{ fontSize: "18px", fontWeight: 700, color: TOKENS.colors.text.muted }}>$22</span>
                   <ArrowRight size={16} />
                   <span style={{ fontSize: "24px", fontWeight: 900, color: TOKENS.colors.secondary }}>$28</span>
                </div>
             </div>
          </div>

          <div style={{ fontSize: "14px", fontWeight: 800, marginBottom: "12px" }}>إجراءات مباشرة للنمو:</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
             <GrowthTech icon={<Zap size={16} />} title="Upselling" desc="إضافة مشروبات ومقبلات" />
             <GrowthTech icon={<Activity size={16} />} title="TikTok" desc="حملات تيك توك محلية" />
          </div>

          <div style={{ marginTop: "20px", color: TOKENS.colors.text.muted, fontSize: "14px", fontStyle: "italic" }}>
             💡 الخلاصة: النمو لن يأتي من التوسع العرضي حالياً، بل من تحسين الأرقام الحقيقية المذكورة أعلاه.
          </div>
        </CardBody>
      </BaseCard>

      {/* 8. UVP Insight */}
      <BaseCard>
        <CardHeader 
          title="الميزة التنافسية الحقيقية" 
          subtitle="UVP Insight"
          icon={<Search size={24} />}
          badge="تحليل تنافسي"
        />
        <CardBody>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center", marginBottom: "24px" }}>
             <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: "1 1 250px" }}>
                <StatusItem status="success" label="جودة منتج استثنائية (UVP)" />
                <StatusItem status="success" label="تجربة عميل قوية وعاطفية" />
                <StatusItem status="danger" label="سرعة تسليم أقل من المنافسين" />
             </div>
             <div style={{ flex: "1 1 250px", padding: "20px", background: "#f8fafc", borderRadius: "20px", border: `1px solid ${TOKENS.colors.border}` }}>
                <div style={{ fontSize: "13px", fontWeight: 800, color: TOKENS.colors.text.muted, marginBottom: "8px" }}>نصيحة الصراع التنافسي:</div>
                <div style={{ fontSize: "15px", fontWeight: 800, color: TOKENS.colors.text.title }}>لا تحاول منافسة السوق في السرعة. ركز على:</div>
                <div style={{ fontSize: "14px", color: TOKENS.colors.primary, fontWeight: 900, marginTop: "4px" }}>Premium Experience + Quality Positioning</div>
             </div>
          </div>

          <div style={{ fontSize: "14px", color: TOKENS.colors.text.body, fontWeight: 600, padding: "16px", border: "1px dashed #cbd5e1", borderRadius: "16px" }}>
             🚀 استراتيجية ذكية: استهدف عملاء الجودة وليس السعر؛ ابنِ براند (Brand) قوي بدل الدخول في "حرب أسعار" مهلكة. ميزتك ليست السرعة، بل التجربة الفائقة.
          </div>
        </CardBody>
      </BaseCard>

    </div>
  );
};

// --- HELPER COMPONENTS ---

const DataMiniCard = ({ label, value, subValue, icon, color }: any) => (
  <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "20px", border: `1px solid ${TOKENS.colors.border}`, display: "flex", flexDirection: "column", gap: "4px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
       <span style={{ fontSize: "11px", fontWeight: 800, color: TOKENS.colors.text.muted }}>{label}</span>
       <div style={{ color: color }}>{icon}</div>
    </div>
    <div style={{ fontSize: "18px", fontWeight: 900, color: TOKENS.colors.text.title }}>{value}</div>
    <div style={{ fontSize: "10px", fontWeight: 900, opacity: 0.6, color: color }}>{subValue}</div>
  </div>
);

const AlertBox = ({ type, title, text }: any) => {
  const isWarning = type === "warning";
  const isDanger = type === "danger";
  const bgColor = isWarning ? "#fffbeb" : isDanger ? "#fff1f2" : "#eff6ff";
  const border = isWarning ? "#fef3c7" : isDanger ? "#ffe4e6" : "#dbeafe";
  const color = isWarning ? "#92400e" : isDanger ? "#9f1239" : "#1e40af";

  return (
    <div style={{ padding: "16px", background: bgColor, borderRadius: "14px", border: `1px solid ${border}`, marginTop: "12px" }}>
      <div style={{ fontSize: "13px", fontWeight: 900, color: color, marginBottom: "4px" }}>{title}</div>
      <div style={{ fontSize: "13.5px", color: TOKENS.colors.text.body, fontWeight: 500, lineHeight: 1.5 }}>{text}</div>
    </div>
  );
};

const ProgressBar = ({ progress, color, label }: any) => (
  <div style={{ margin: "20px 0" }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
       <span style={{ fontSize: "13px", fontWeight: 800 }}>{label}</span>
       <span style={{ fontSize: "13px", fontWeight: 900, color: color }}>{progress}%</span>
    </div>
    <div style={{ height: "10px", background: "#f1f5f9", borderRadius: "100px", overflow: "hidden" }}>
       <div style={{ height: "100%", background: color, width: `${progress}%`, transition: "width 1s ease-out" }} />
    </div>
  </div>
);

const StatusItem = ({ status, label }: any) => {
  const color = status === "success" ? TOKENS.colors.secondary : status === "warning" ? TOKENS.colors.warning : TOKENS.colors.danger;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
       <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
       <div style={{ fontSize: "14px", fontWeight: 600, color: TOKENS.colors.text.title }}>{label}</div>
    </div>
  );
};

const ReasonCard = ({ title, desc }: any) => (
  <div style={{ padding: "12px", background: "#fff", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "12px" }}>
     <div style={{ fontSize: "13px", fontWeight: 800, color: TOKENS.colors.text.title, marginBottom: "4px" }}>{title}</div>
     <div style={{ fontSize: "11px", fontWeight: 500, color: TOKENS.colors.text.muted }}>{desc}</div>
  </div>
);

const KPIMiniBox = ({ label, value, sub }: any) => (
  <div style={{ padding: "12px", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "12px", textAlign: "center" }}>
     <div style={{ fontSize: "11px", fontWeight: 800, color: TOKENS.colors.text.muted, marginBottom: "4px" }}>{label}</div>
     <div style={{ fontSize: "16px", fontWeight: 900, color: TOKENS.colors.text.title }}>{value}</div>
     <div style={{ fontSize: "10px", color: TOKENS.colors.text.muted }}>{sub}</div>
  </div>
);

const CheckItem = ({ text }: any) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "13.5px", fontWeight: 600 }}>
     <CheckCircle2 size={16} color={TOKENS.colors.secondary} />
     {text}
  </div>
);

const GrowthTech = ({ icon, title, desc }: any) => (
  <div style={{ padding: "14px", background: "#fff", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "14px", display: "flex", alignItems: "center", gap: 12 }}>
     <div style={{ color: TOKENS.colors.primary }}>{icon}</div>
     <div>
        <div style={{ fontSize: "13px", fontWeight: 800, color: TOKENS.colors.text.title }}>{title}</div>
        <div style={{ fontSize: "11px", color: TOKENS.colors.text.muted }}>{desc}</div>
     </div>
  </div>
);
