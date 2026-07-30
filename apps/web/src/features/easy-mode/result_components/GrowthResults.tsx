import React from "react";
import { BaseCard, CardHeader, CardBody, TOKENS } from "./CardDesignSystem";
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  Users, 
  Megaphone, 
  Zap, 
  BarChart, 
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Timer,
  ShoppingBag,
  Share2,
  Trophy
} from "lucide-react";

export const GrowthResults = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
      
      {/* 1. Core Growth Engine */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="محرك النمو الأساسي" 
          subtitle="Core Growth Engine"
          icon={<Rocket size={24} />}
          badge="المحرك المفرد"
        />
        <CardBody>
          <div style={{ marginBottom: "20px", fontSize: "15px", fontWeight: 700 }}>
             مشروعك لا ينمو عشوائياً؛ هناك محرك واحد محدد يجب التركيز عليه حالياً:
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "#f8fafc", borderRadius: "20px", marginBottom: "20px", border: `1px solid ${TOKENS.colors.border}` }}>
             <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <GrowthFactor label="زيادة الطلبات" />
                <span style={{ fontSize: "24px", fontWeight: 900, color: TOKENS.colors.primary }}>×</span>
                <GrowthFactor label="رفع قيمة الطلب" />
                <span style={{ fontSize: "24px", fontWeight: 900, color: TOKENS.colors.secondary }}>=</span>
                <GrowthFactor label="النمو المتسارع" isResult />
             </div>
          </div>
          <AlertBox 
            type="info" 
            title="لماذا هذا المحرك؟" 
            text="السوق تنافسي جداً ولا تملك رفاهية الوقت؛ المعادلة بسيطة: النمو = (عدد الطلبات) × (متوسط قيمة الطلب الواحد)." 
          />
        </CardBody>
      </BaseCard>

      {/* 2. Target Customer Focus */}
      <BaseCard>
        <CardHeader 
          title="تحديد العميل المثالي" 
          subtitle="Target Customer Focus"
          icon={<Target size={24} />}
          badge="تركيز استراتيجي"
          badgeType="success"
        />
        <CardBody>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
             <div style={{ padding: "16px", background: "#fff1f2", borderRadius: "16px", border: "1px solid rgba(225,29,72,0.1)", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: "14px", fontWeight: 800, color: TOKENS.colors.danger }}>❌ استهداف الجميع</span>
             </div>
             <div style={{ padding: "16px", background: "#f0fdf4", borderRadius: "16px", border: "1px solid rgba(16,185,129,0.1)", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: "14px", fontWeight: 800, color: TOKENS.colors.secondary }}>✅ شريحة محددة بدقة</span>
             </div>
          </div>

          <div style={{ fontSize: "14px", fontWeight: 900, marginBottom: "12px", color: TOKENS.colors.text.title }}>من هو عميلك الحقيقي؟</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "20px" }}>
             <CustomerTrait icon={<Timer size={16} />} text="يطلب توصيل بشكل متكرر" />
             <CustomerTrait icon={<Trophy size={16} />} text="يهتم بالجودة فوق السعر" />
             <CustomerTrait icon={<Target size={16} />} text="يسكن في محيط 3-5 كم" />
          </div>

          <div style={{ padding: "12px 16px", background: "rgba(99, 102, 241, 0.05)", borderRight: `4px solid ${TOKENS.colors.primary}`, borderRadius: "4px", fontSize: "14px", fontWeight: 700 }}>
             النتيجة: كل ميزانية التسويق ستصبح أدق تأثيراً وأرخص تكلفة للاستحواذ.
          </div>
        </CardBody>
      </BaseCard>

      {/* 3. AOV Boost Strategy */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="رفع متوسط قيمة الطلب" 
          subtitle="AOV Boost Strategy"
          icon={<TrendingUp size={24} />}
          badge="+27% زيادة"
          badgeType="success"
        />
        <CardBody>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: "24px", background: "#f8fafc", padding: "16px", borderRadius: "16px" }}>
             <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: "11px", fontWeight: 800, color: TOKENS.colors.text.muted }}>الوضع الحالي</div>
                <div style={{ fontSize: "20px", fontWeight: 900, color: TOKENS.colors.text.muted }}>$22</div>
             </div>
             <ArrowRight size={20} color={TOKENS.colors.primary} />
             <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: "11px", fontWeight: 800, color: TOKENS.colors.primary }}>الهدف المالي</div>
                <div style={{ fontSize: "24px", fontWeight: 900, color: TOKENS.colors.secondary }}>$28</div>
             </div>
          </div>

          <div style={{ fontSize: "14px", fontWeight: 900, marginBottom: "16px" }}>تكتيكات التنفيذ الفوري:</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "20px" }}>
             <BoostCard title="Combo Meals" desc="وجبات جانبية مكملة" />
             <BoostCard title="Cross-Sell" desc="أضف مقابل سعر أقل" />
             <BoostCard title="Upsell" desc="مشروبات بـ $2+ فقط" />
          </div>

          <div style={{ fontSize: "14px", fontWeight: 700, color: TOKENS.colors.secondary, background: "rgba(16, 185, 129, 0.1)", padding: "10px 16px", borderRadius: "12px" }}>
             📍 النتيجة الذكية: زيادة الأرباح المباشرة بدون الحاجة لزيادة عدد العملاء.
          </div>
        </CardBody>
      </BaseCard>

      {/* 4. Retention Machine */}
      <BaseCard>
        <CardHeader 
          title="بناء عملاء دائمين" 
          subtitle="Retention Machine"
          icon={<Users size={24} />}
          badge="الولاء أولاً"
        />
        <CardBody>
          <div style={{ background: "#eff6ff", padding: "20px", borderRadius: "16px", marginBottom: "24px" }}>
             <div style={{ fontSize: "16px", fontWeight: 900, color: "#1e40af", marginBottom: "8px" }}>الربح الحقيقي = العملاء المتكررين</div>
             <div style={{ fontSize: "13.5px", color: "#1e40af", fontWeight: 500, lineHeight: 1.5 }}>
                تكلفة اكتساب العميل المتكرر تساوي "صفراً" تقريباً، وهم يشترون أكثر بنسبة 40% مع مرور الوقت.
             </div>
          </div>

          <div style={{ fontSize: "14px", fontWeight: 800, marginBottom: "12px" }}>كيف تضمن عودتهم؟</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
             <CheckItem text="نظام عروض خاص للطلبات المتكررة" />
             <CheckItem text="كود خصم (Welcome Back) يرسل تلقائياً بعد أول طلب" />
             <CheckItem text="تجربة جودة وتغليف استثنائية (The Wow Moment)" />
          </div>
        </CardBody>
      </BaseCard>

      {/* 5. Acquisition Channel */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="قناة النمو الأسرع" 
          subtitle="Acquisition Channel"
          icon={<Megaphone size={24} />}
          badge="أولوية التسويق"
        />
        <CardBody>
          <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginBottom: "20px" }}>
             <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${TOKENS.colors.border}`, color: TOKENS.colors.primary }}>
                <Share2 size={32} />
             </div>
             <div>
                <div style={{ fontSize: "18px", fontWeight: 900, color: TOKENS.colors.text.title }}>TikTok + إعلانات محلية</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: TOKENS.colors.text.muted }}>القناة الأكثر كفاءة حالياً لمشاريع الأكل.</div>
             </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
             <AdStrategyItem title="محتوى Viral" desc="فيديوهات تحضير وتغليف" />
             <AdStrategyItem title="استهداف جغرافي" desc="إعلانات ممولة لنطاق 5 كم" />
          </div>

          <div style={{ fontSize: "14px", fontWeight: 800, color: TOKENS.colors.primary }}>تتميز بـ: تكلفة منخفضة جداً + وصول سريع للجمهور المحلي.</div>
        </CardBody>
      </BaseCard>

      {/* 6. Growth Sprint Plan */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="تسريع النمو خلال 90 يوم" 
          subtitle="Growth Sprint Plan"
          icon={<Zap size={24} />}
          badge="خطة الـ 90 يوم"
          badgeType="warning"
        />
        <CardBody>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
             <div style={{ fontSize: "13px", fontWeight: 700, color: TOKENS.colors.text.muted, marginBottom: "4px" }}>الهدف بنهاية الشهر الثالث</div>
             <div style={{ fontSize: "36px", fontWeight: 900, color: TOKENS.colors.secondary }}>$6,000 / ش</div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
             <MetricBox label="طلبات يومية" val="35" />
             <MetricBox label="متوسط السلة" val="$28" />
          </div>

          <div style={{ fontSize: "14px", fontWeight: 900, marginBottom: "12px" }}>خطة الاندفاع (The Sprint):</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
             <SprintStep text="إطلاق حملات إعلانية أسبوعية موجهة" />
             <SprintStep text="التحسين المستمر للعروض (AB Testing)" />
             <SprintStep text="متابعة دقيقة للأرقام اليومية (Daily Review)" />
          </div>
        </CardBody>
      </BaseCard>

      {/* 7. Scaling Logic */}
      <BaseCard>
        <CardHeader 
          title="تحليل الأداء والتوسع" 
          subtitle="Scaling Logic"
          icon={<BarChart size={24} />}
          badge="قرار التوسع"
        />
        <CardBody>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
             <ScaleCondition 
               title="متى تتوسع؟" 
               items={["الطلب مستقر ومستمر", "هامش الربح واضح ومريح", "العمليات منظمة تماماً"]} 
               isGood
             />
             <ScaleCondition 
               title="متى تتوقف؟" 
               items={["العمليات غير مستقرة", "فقدان السيطرة على الجودة", "تكاليف أعلى من الإيرادات"]} 
               isGood={false}
             />
          </div>
          <div style={{ padding: "16px", border: "1px dashed #cbd5e1", borderRadius: "16px", background: "#f8fafc" }}>
             <div style={{ fontSize: "14px", fontWeight: 800, color: TOKENS.colors.text.title, marginBottom: "8px" }}>خطوات التوسع الذكي:</div>
             <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <SmallBadge>زيادة ميزانية الإعلانات</SmallBadge>
                <SmallBadge>إضافة أصناف جديدة</SmallBadge>
                <SmallBadge>توسيع نطاق التوصيل</SmallBadge>
             </div>
          </div>
        </CardBody>
      </BaseCard>

      {/* 8. Growth Advantage */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="ميزة تنافسية ذكية" 
          subtitle="Growth Advantage"
          icon={<Trophy size={24} />}
          badge="نقطة القوة"
        />
        <CardBody>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "24px", alignItems: "center" }}>
             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <StatusItem status="danger" label="لا تنافس بالسعر" />
                <StatusItem status="danger" label="لا تنافس بالسرعة" />
                <StatusItem status="success" label="نافس بالجودة والتجربة" />
             </div>
             <div style={{ padding: "20px", background: "linear-gradient(135deg, #4f46e5, #6366f1)", borderRadius: "20px", color: "#fff" }}>
                <div style={{ fontSize: "15px", fontWeight: 900, marginBottom: "8px" }}>لماذا الجودة والتجربة؟</div>
                <div style={{ fontSize: "13.5px", fontWeight: 500, lineHeight: 1.5, opacity: 0.9 }}>
                   لأنها أصعب شيء ينسخه المنافس؛ هي التي تبني البراند وتجعل العميل يعود مرة تلو الأخرى.
                </div>
             </div>
          </div>
        </CardBody>
      </BaseCard>

    </div>
  );
};

// --- HELPER COMPONENTS ---

const GrowthFactor = ({ label, isResult }: any) => (
  <div style={{ padding: isResult ? "12px 24px" : "12px 18px", background: isResult ? TOKENS.colors.secondary : "#fff", border: `1px solid ${isResult ? TOKENS.colors.secondary : TOKENS.colors.border}`, borderRadius: "14px", color: isResult ? "#fff" : TOKENS.colors.text.title, fontSize: "14px", fontWeight: 900 }}>
     {label}
  </div>
);

const AlertBox = ({ type, title, text }: any) => (
  <div style={{ padding: "16px", background: "#eff6ff", borderRadius: "14px", border: "1px solid #dbeafe", marginTop: "12px" }}>
     <div style={{ fontSize: "13px", fontWeight: 900, color: "#1e40af", marginBottom: "4px" }}>{title}</div>
     <div style={{ fontSize: "13.5px", color: TOKENS.colors.text.body, fontWeight: 500, lineHeight: 1.5 }}>{text}</div>
  </div>
);

const CustomerTrait = ({ icon, text }: any) => (
  <div style={{ padding: "12px", background: "#fff", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
     <div style={{ color: TOKENS.colors.primary }}>{icon}</div>
     <div style={{ fontSize: "11px", fontWeight: 700, color: TOKENS.colors.text.title }}>{text}</div>
  </div>
);

const BoostCard = ({ title, desc }: any) => (
  <div style={{ padding: "12px", background: "#fff", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "14px", textAlign: "center" }}>
     <div style={{ fontSize: "13px", fontWeight: 800, color: TOKENS.colors.text.title, marginBottom: "4px" }}>{title}</div>
     <div style={{ fontSize: "10px", color: TOKENS.colors.text.muted, fontWeight: 600 }}>{desc}</div>
  </div>
);

const CheckItem = ({ text }: any) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "14px", fontWeight: 600 }}>
     <CheckCircle2 size={16} color={TOKENS.colors.secondary} />
     {text}
  </div>
);

const AdStrategyItem = ({ title, desc }: any) => (
  <div style={{ padding: "14px", background: "#fff", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "14px", display: "flex", alignItems: "center", gap: 12 }}>
     <div style={{ width: 8, height: 8, borderRadius: "50%", background: TOKENS.colors.primary }} />
     <div>
        <div style={{ fontSize: "13px", fontWeight: 800, color: TOKENS.colors.text.title }}>{title}</div>
        <div style={{ fontSize: "11px", color: TOKENS.colors.text.muted, fontWeight: 500 }}>{desc}</div>
     </div>
  </div>
);

const MetricBox = ({ label, val }: any) => (
  <div style={{ flex: 1, padding: "16px", background: "#f8fafc", borderRadius: "16px", border: `1px solid ${TOKENS.colors.border}`, textAlign: "center" }}>
     <div style={{ fontSize: "11px", fontWeight: 800, color: TOKENS.colors.text.muted, marginBottom: "4px" }}>{label}</div>
     <div style={{ fontSize: "24px", fontWeight: 900, color: TOKENS.colors.text.title }}>{val}</div>
  </div>
);

const SprintStep = ({ text }: any) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "13.5px", fontWeight: 600 }}>
     <Zap size={16} color={TOKENS.colors.warning} />
     {text}
  </div>
);

const ScaleCondition = ({ title, items, isGood }: any) => (
  <div>
     <div style={{ fontSize: "14px", fontWeight: 900, color: isGood ? TOKENS.colors.secondary : TOKENS.colors.danger, marginBottom: "12px" }}>{title}</div>
     <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "12px", fontWeight: 600, color: TOKENS.colors.text.body }}>
             <div style={{ width: 4, height: 4, borderRadius: "50%", background: TOKENS.colors.border }} />
             {item}
          </div>
        ))}
     </div>
  </div>
);

const SmallBadge = ({ children }: any) => (
  <div style={{ padding: "6px 12px", background: "#fff", border: `1px solid ${TOKENS.colors.border}`, borderRadius: "100px", fontSize: "11px", fontWeight: 800, color: TOKENS.colors.text.muted }}>
     {children}
  </div>
);

const StatusItem = ({ status, label }: any) => {
  const isDanger = status === "danger";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
       <div style={{ width: 6, height: 6, borderRadius: "50%", background: isDanger ? TOKENS.colors.danger : TOKENS.colors.secondary }} />
       <div style={{ fontSize: "13px", fontWeight: 700, color: isDanger ? TOKENS.colors.text.muted : TOKENS.colors.text.title, textDecoration: isDanger ? "line-through" : "none" }}>{label}</div>
    </div>
  );
};
