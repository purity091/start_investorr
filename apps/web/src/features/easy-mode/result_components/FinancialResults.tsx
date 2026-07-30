import React from "react";
import { BaseCard, CardHeader, CardBody, TOKENS } from "./CardDesignSystem";
import { 
  BarChart3, 
  AlertTriangle, 
  DollarSign, 
  PieChart, 
  TrendingDown, 
  Calculator, 
  Calendar, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Target,
  Coins,
  Scale,
  Activity,
  Rocket
} from "lucide-react";

export const FinancialResults = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
      
      {/* 1. Current Financial Reality */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="الواقع المالي الحالي" 
          subtitle="Current Financial Reality"
          icon={<Calculator size={24} />}
          badge="نظرة مالية"
        />
        <CardBody>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
            <MetricBox label="رأس المال" value="$5,000" color={TOKENS.colors.primary} />
            <MetricBox label="الإيراد المتوقع (ش12)" value="$3,200" color={TOKENS.colors.text.muted} />
            <MetricBox label="الهدف المطلوب" value="$6,000" color={TOKENS.colors.secondary} />
          </div>

          <ProgressBar progress={52} color={TOKENS.colors.danger} label="نسبة الوصول للهدف" />
          
          <AlertBox 
            type="info" 
            title="تحليل الواقع المالي" 
            text="مشروعك حالياً لا يصل لهدفه المالي ضمن النموذج الحالي. المشكلة ليست في الإيراد فقط، بل في هيكل التكاليف ونموذج التشغيل المعتمد." 
          />
          
          <div style={{ marginTop: "16px", padding: "12px", borderRight: `4px solid ${TOKENS.colors.danger}`, background: "rgba(225, 29, 72, 0.05)", fontSize: "14px", fontWeight: 700 }}>
             📍 الخلاصة: أنت تعمل ضمن نموذج "غير متناسب" إطلاقاً مع ميزانيتك الحالية.
          </div>
        </CardBody>
      </BaseCard>

      {/* 2. Cost Structure Breakdown */}
      <BaseCard variant="danger">
        <CardHeader 
          title="تحليل التكاليف" 
          subtitle="Cost Structure Breakdown"
          icon={<PieChart size={24} />}
          badge="توزيع غير متوازن"
          badgeType="danger"
        />
        <CardBody>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
             <CostTag label="تكاليف ثابتة (إيجار/تجهيز)" level="high" desc="مرتفعة جداً" />
             <CostTag label="تكاليف متغيرة (مواد/توصيل)" level="medium" desc="متوسطة" />
             <CostTag label="تسويق وإعلانات" level="low" desc="منخفض حالياً" />
          </div>

          <AlertBox 
            type="danger" 
            title="خطر مالي مكتشف" 
            text="أكبر خطر يواجهك هو أن التكاليف الثابتة تستهلك نسبة كبيرة من رأس المال. إذا كانت الإيجارات والتجهيزات تمثل 60% من ميزانيتك، فأنت فعلياً بدأت بخسارة مرونة التشغيل." 
          />
          
          <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: 10, color: TOKENS.colors.primary, fontWeight: 900 }}>
             <ArrowRight size={18} />
             التوجيه الأساسي: قلل التكاليف الثابتة (CAPEX) قبل أي خطوة تنفيذية.
          </div>
        </CardBody>
      </BaseCard>

      {/* 3. Funding Gap Analysis */}
      <BaseCard variant="danger">
        <CardHeader 
          title="فجوة التمويل" 
          subtitle="Funding Gap Analysis"
          icon={<TrendingDown size={24} />}
          badge="فجوة حرجة"
          badgeType="danger"
        />
        <CardBody>
          <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
             <div style={{ flex: 1 }}>
                <div style={{ fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.muted, marginBottom: "4px" }}>التكلفة الفعلية المتوقعة</div>
                <div style={{ fontSize: "24px", fontWeight: 900, color: TOKENS.colors.danger }}>~$30,000</div>
             </div>
             <div style={{ width: "2px", background: TOKENS.colors.border }} />
             <div style={{ flex: 1 }}>
                <div style={{ fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.muted, marginBottom: "4px" }}>ميزانيتك المتاحة</div>
                <div style={{ fontSize: "24px", fontWeight: 900, color: TOKENS.colors.primary }}>$5,000</div>
             </div>
          </div>

          <div style={{ padding: "20px", background: "#f8fafc", borderRadius: "16px", border: `1px solid ${TOKENS.colors.border}`, display: "flex", alignItems: "center", gap: 20 }}>
             <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#fff", border: `4px solid ${TOKENS.colors.danger}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 900, color: TOKENS.colors.danger, flexShrink: 0 }}>
                -83%
             </div>
             <div>
                <div style={{ fontSize: "15px", fontWeight: 800, color: TOKENS.colors.text.title }}>عجز مالي صارخ</div>
                <div style={{ fontSize: "13px", color: TOKENS.colors.text.body, fontWeight: 500 }}>لا يمكنك تشغيل النموذج التقليدي بالميزانية الحالية. أي محاولة تعني استنزافاً كاملاً قبل الانطلاق.</div>
             </div>
          </div>

          <div style={{ marginTop: "16px", padding: "12px 16px", background: "rgba(99, 102, 241, 0.05)", borderRadius: "12px", fontSize: "14px", fontWeight: 700, color: TOKENS.colors.text.title }}>
             💡 <span style={{ color: TOKENS.colors.primary, marginRight: 8 }}>بصيرة مالية:</span> المشكلة ليست "نقصاً بسيطاً"، بل Mismatch (عدم تطابق) كامل بين الفكرة والقدرة المالية الحالية.
          </div>
        </CardBody>
      </BaseCard>

      {/* 4. Revenue Engine */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="معادلة الإيرادات" 
          subtitle="Revenue Engine"
          icon={<BarChart3 size={24} />}
          badge="محرك النمو"
        />
        <CardBody>
          <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "20px" }}>الإيراد = (عدد الطلبات × متوسط الطلب)</div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
             <RevenuePlan title="الوضع الحالي" orders="15" aov="$22" daily="$330" isTarget={false} />
             <RevenuePlan title="الوضع المطلوب" orders="28" aov="$28" daily="$784" isTarget={true} />
          </div>

          <AlertBox 
            type="info" 
            title="تحليل الأداء" 
            text="للوصول لهدفك، تحتاج لمضاعفة الأداء تقريباً (أو تحسين الطلبات والقيمة معاً). لا تركز على عامل واحد فقط، بل على تحسين النظام التشغيلي بالكامل." 
          />
          
          <div style={{ marginTop: "16px", fontWeight: 900, color: TOKENS.colors.primary, display: "flex", alignItems: "center", gap: 8 }}>
             <ArrowRight size={18} />
             التوجيه: ركز على رفع "قيمة السلة" بالتوازي مع عدد العملاء الجدد.
          </div>
        </CardBody>
      </BaseCard>

      {/* 5. Break-even Analysis */}
      <BaseCard>
        <CardHeader 
          title="نقطة التعادل" 
          subtitle="Break-even Analysis"
          icon={<Calendar size={24} />}
          badge="أمان متوسط"
          badgeType="warning"
        />
        <CardBody>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "32px", background: "linear-gradient(to right, #f8fafc, #fff, #f8fafc)", borderRadius: "20px", marginBottom: "20px" }}>
             <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "13px", fontWeight: 800, color: TOKENS.colors.text.muted, marginBottom: "8px" }}>نقطة التعادل المتوقعة</div>
                <div style={{ fontSize: "42px", fontWeight: 900, color: TOKENS.colors.primary }}>الشهر 8</div>
                <div style={{ fontSize: "13px", color: TOKENS.colors.text.body, fontWeight: 700, background: "#eef2ff", padding: "4px 12px", borderRadius: "100px", marginTop: "8px" }}>رقم مقبول بشروط</div>
             </div>
          </div>

          <AlertBox 
            type="warning" 
            title="مخاطر نقطة التعادل" 
            text="هذه النتيجة مشروطة بعدم وجود أخطاء تشغيلية وثبات في الإيرادات. أي تأخير في الوصول للتعادل يعني ضغطاً مالياً هائلاً قد يهدد استمرار المشروع." 
          />

          <div style={{ marginTop: "20px" }}>
             <div style={{ fontSize: "14px", fontWeight: 900, marginBottom: "12px" }}>خطة اختصار الوقت:</div>
             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <SmallActionBox icon={<TrendingDown size={14} />} text="تقليل التكاليف المتغيرة" />
                <SmallActionBox icon={<Zap size={14} />} text="تسريع تدفق الإيرادات" />
             </div>
          </div>
        </CardBody>
      </BaseCard>

      {/* 6. Scenario Simulation */}
      <BaseCard>
        <CardHeader 
          title="السيناريو المتفائل مقابل الحذر" 
          subtitle="Scenario Simulation"
          icon={<Scale size={24} />}
          badge="محاكاة مالية"
        />
        <CardBody>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
             <ScenarioCard 
               type="optimistic" 
               title="سيناريو متفائل" 
               stats={[
                 { label: "نمو الإيراد", val: "+25%" },
                 { label: "هامش الربح", val: "42%" },
                 { label: "الاسترداد", val: "5.5 شهر" }
               ]} 
             />
             <ScenarioCard 
               type="conservative" 
               title="سيناريو حذر" 
               stats={[
                 { label: "نمو الإيراد", val: "بطيء" },
                 { label: "هامش الربح", val: "ضغط تكاليف" },
                 { label: "التعادل", val: "يتأخر" }
               ]} 
             />
          </div>

          <AlertBox 
            type="info" 
            title="تحليل السيناريو" 
            text="الفرق بين السيناريوهين يعتمد كلياً على سرعة دخول السوق، جودة التنفيذ، والتسويق المبكر. النجاح هنا ليس مجرد حظ، بل هو نتيجة لسرعة التنفيذ والقرارات الذكية." 
          />
        </CardBody>
      </BaseCard>

      {/* 7. Fastest Path to $6K */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="أسرع طريقة للوصول لهدفك" 
          subtitle="Fastest Path to $6K"
          icon={<Rocket size={24} />}
          badge="خطة تنفيذية"
          badgeType="success"
        />
        <CardBody>
          <div style={{ padding: "20px", background: "linear-gradient(135deg, #10b981, #059669)", borderRadius: "20px", color: "#fff", marginBottom: "24px" }}>
             <div style={{ fontSize: "14px", fontWeight: 800, marginBottom: "12px", opacity: 0.9 }}>تغييرات الأرقام الجوهرية (KPI Change):</div>
             <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <KPIGrowthBox label="رفع AOV" from="$22" to="$28" />
                <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.2)" }} />
                <KPIGrowthBox label="زيادة الطلبات" from="15" to="28" />
             </div>
          </div>

          <div style={{ fontSize: "14px", fontWeight: 900, marginBottom: "12px", color: TOKENS.colors.text.title }}>خطوات عملية فورية:</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
             <ActionStep title="إضافة Upsell" desc="لكل طلب يتم استقباله" />
             <ActionStep title="تحسين العروض" desc="Bundles / وجبات عائلية" />
             <ActionStep title="استهداف محلي" desc="تركيز على نطاق 5 كم" />
          </div>

          <div style={{ marginTop: "20px", padding: "12px 16px", borderRight: `4px solid ${TOKENS.colors.secondary}`, background: "rgba(16, 185, 129, 0.05)", fontSize: "14px", fontWeight: 700 }}>
             📍 الخلاصة: النمو الذكي يبدأ من تحسين الأرقام الحالية، وليس بتعقيد المشروع أو فتحه في مناطق جديدة.
          </div>
        </CardBody>
      </BaseCard>

      {/* 8. Final Financial Decision */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="القرار المالي النهائي" 
          subtitle="Financial Decision"
          icon={<CheckCircle2 size={24} />}
          badge="قرار نهائي"
        />
        <CardBody>
          <div style={{ fontSize: "20px", fontWeight: 900, color: TOKENS.colors.primary, marginBottom: "20px", display: "flex", alignItems: "center", gap: 10 }}>
             <Zap size={24} />
             القرار: ابدأ… ولكن بعد تعديل النموذج بالكامل
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
             <ConditionItem label="تقليل التكاليف الثابتة" value="بنسبة 40% على الأقل" />
             <ConditionItem label="اعتماد المطبخ السحابي" value="Cloud Kitchen Mode" />
             <ConditionItem label="التركيز المطلق" value="Cash Flow First" />
          </div>

          <div style={{ padding: "20px", borderRadius: "16px", background: "#f8fafc", border: `2px dashed ${TOKENS.colors.primary}` }}>
             <div style={{ fontSize: "15px", fontWeight: 800, color: TOKENS.colors.text.title, marginBottom: "8px" }}>ماذا لو بدأت الآن؟</div>
             <ul style={{ margin: 0, paddingRight: "20px", fontSize: "13.5px", color: TOKENS.colors.text.body, fontWeight: 500, lineHeight: 1.6 }}>
                <li>إذا التزمت بالشروط: المشروع قابل للنجاح والمخاطر ستنخفض للحد الأدنى.</li>
                <li>إذا تجاهلت التحليل: احتمالية الفشل عالية جداً (High Risk) قبل الوصول للإطلاق الفعلي.</li>
             </ul>
          </div>
        </CardBody>
      </BaseCard>

    </div>
  );
};

// --- HELPER COMPONENTS ---

const MetricBox = ({ label, value, color }: any) => (
  <div style={{ padding: "16px", textAlign: "center", background: "#f8fafc", borderRadius: "16px", border: `1px solid ${TOKENS.colors.border}` }}>
     <div style={{ fontSize: "11px", fontWeight: 800, color: TOKENS.colors.text.muted, marginBottom: "4px" }}>{label}</div>
     <div style={{ fontSize: "20px", fontWeight: 900, color: color }}>{value}</div>
  </div>
);

const ProgressBar = ({ progress, color, label }: any) => (
  <div style={{ margin: "20px 0" }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
       <span style={{ fontSize: "13.5px", fontWeight: 800 }}>{label}</span>
       <span style={{ fontSize: "13.5px", fontWeight: 900, color: color }}>{progress}%</span>
    </div>
    <div style={{ height: "10px", background: "#f1f5f9", borderRadius: "100px", overflow: "hidden" }}>
       <div style={{ height: "100%", background: color, width: `${progress}%`, transition: "width 1s ease-out" }} />
    </div>
  </div>
);

const AlertBox = ({ type, title, text }: any) => {
  const isWarning = type === "warning";
  const isDanger = type === "danger";
  const color = isWarning ? "#92400e" : isDanger ? "#9f1239" : "#1e40af";
  const bg = isWarning ? "#fffbeb" : isDanger ? "#fff1f2" : "#eff6ff";
  return (
    <div style={{ padding: "16px", background: bg, borderRadius: "14px", border: `1px solid ${bg}`, marginTop: "12px" }}>
       <div style={{ fontSize: "13px", fontWeight: 900, color: color, marginBottom: "4px" }}>{title}</div>
       <div style={{ fontSize: "13.5px", color: TOKENS.colors.text.body, fontWeight: 500, lineHeight: 1.5 }}>{text}</div>
    </div>
  );
};

const CostTag = ({ label, level, desc }: any) => {
  const color = level === "high" ? TOKENS.colors.danger : level === "medium" ? TOKENS.colors.warning : TOKENS.colors.secondary;
  return (
    <div style={{ padding: "10px 16px", background: "#f8fafc", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "12px", display: "flex", gap: 10, alignItems: "center" }}>
       <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
       <div>
          <div style={{ fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.title }}>{label}</div>
          <div style={{ fontSize: "10px", fontWeight: 700, color: TOKENS.colors.text.muted }}>{desc}</div>
       </div>
    </div>
  );
};

const RevenuePlan = ({ title, orders, aov, daily, isTarget }: any) => (
  <div style={{ padding: "16px", background: isTarget ? "rgba(99, 102, 241, 0.05)" : "#f8fafc", borderRadius: "16px", border: `1px solid ${isTarget ? TOKENS.colors.primary : TOKENS.colors.border}` }}>
     <div style={{ fontSize: "12px", fontWeight: 800, color: isTarget ? TOKENS.colors.primary : TOKENS.colors.text.muted, marginBottom: "12px" }}>{title}</div>
     <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           <span style={{ fontSize: "12px", color: TOKENS.colors.text.muted }}>عدد الطلبات</span>
           <span style={{ fontSize: "16px", fontWeight: 900 }}>{orders}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           <span style={{ fontSize: "12px", color: TOKENS.colors.text.muted }}>متوسط الطلب</span>
           <span style={{ fontSize: "16px", fontWeight: 900 }}>{aov}</span>
        </div>
        <div style={{ height: "1px", background: TOKENS.colors.border, margin: "4px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           <span style={{ fontSize: "13px", fontWeight: 800 }}>الدخل اليومي</span>
           <span style={{ fontSize: "18px", fontWeight: 900, color: isTarget ? TOKENS.colors.secondary : TOKENS.colors.text.title }}>{daily}</span>
        </div>
     </div>
  </div>
);

const SmallActionBox = ({ icon, text }: any) => (
  <div style={{ padding: "12px", borderRadius: "12px", background: "#f8fafc", border: `1px solid ${TOKENS.colors.border}`, display: "flex", alignItems: "center", gap: 8, fontSize: "12px", fontWeight: 700 }}>
     <div style={{ color: TOKENS.colors.primary }}>{icon}</div>
     {text}
  </div>
);

const ScenarioCard = ({ type, title, stats }: any) => {
  const isOpt = type === "optimistic";
  const color = isOpt ? TOKENS.colors.secondary : TOKENS.colors.danger;
  return (
    <div style={{ padding: "16px", borderRadius: "16px", border: `1px solid ${TOKENS.colors.border}`, background: "#fff" }}>
       <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "16px" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
          <div style={{ fontSize: "14px", fontWeight: 900, color: color }}>{title}</div>
       </div>
       <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {stats.map((s: any, idx: number) => (
            <div key={idx} style={{ display: "flex", justifyContent: "space-between" }}>
               <span style={{ fontSize: "12px", color: TOKENS.colors.text.muted }}>{s.label}</span>
               <span style={{ fontSize: "13px", fontWeight: 800 }}>{s.val}</span>
            </div>
          ))}
       </div>
    </div>
  );
};

const KPIGrowthBox = ({ label, from, to }: any) => (
  <div style={{ flex: 1 }}>
     <div style={{ fontSize: "11px", fontWeight: 700, marginBottom: "4px", opacity: 0.8 }}>{label}</div>
     <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: "16px", fontWeight: 600, opacity: 0.7 }}>{from}</span>
        <ArrowRight size={14} />
        <span style={{ fontSize: "22px", fontWeight: 900 }}>{to}</span>
     </div>
  </div>
);

const ActionStep = ({ title, desc }: any) => (
  <div style={{ padding: "12px", borderRadius: "12px", background: "#fff", border: `1px solid ${TOKENS.colors.border}` }}>
     <div style={{ fontSize: "13px", fontWeight: 800, color: TOKENS.colors.text.title, marginBottom: "4px" }}>{title}</div>
     <div style={{ fontSize: "11px", color: TOKENS.colors.text.muted, fontWeight: 500 }}>{desc}</div>
  </div>
);

const ConditionItem = ({ label, value }: any) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#fff", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "12px" }}>
     <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <CheckCircle2 size={16} color={TOKENS.colors.secondary} />
        <span style={{ fontSize: "13.5px", fontWeight: 800 }}>{label}</span>
     </div>
     <span style={{ fontSize: "13.5px", fontWeight: 900, color: TOKENS.colors.primary }}>{value}</span>
  </div>
);
