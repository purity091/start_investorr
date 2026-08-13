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
  ArrowRight,
  Lightbulb
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const StrategicPulseResults = () => {
  return (
    <div className="flex flex-col gap-5 w-full text-right" dir="rtl">
      
      {/* 1. Project Snapshot */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="قراءة سريعة لوضع المشروع" 
          subtitle="Project Snapshot"
          icon={<BarChart3 size={20} />}
          badge="نظرة تشخيصية"
        />
        <CardBody>
          <div className="mb-4 text-xs sm:text-sm font-medium text-foreground">
             مشروعك حالياً في مرحلة ما قبل الانطلاق الفعلي مع جاهزية تشغيلية متوسطة.
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <DataMiniCard label="رأس المال" value="$5,000" subValue="محدود" icon={<TrendingUp size={16} />} color="text-indigo-600 dark:text-indigo-400" />
            <DataMiniCard label="الهدف" value="$6,000/شهرياً" subValue="هدف طموح" icon={<Target size={16} />} color="text-emerald-600 dark:text-emerald-400" />
            <DataMiniCard label="الجاهزية" value="44%" subValue="تحت الـ 50%" icon={<Activity size={16} />} color="text-amber-600 dark:text-amber-400" />
            <DataMiniCard label="الفجوة" value="مرتفعة" subValue="تحتاج عمل" icon={<AlertTriangle size={16} />} color="text-rose-600 dark:text-rose-400" />
          </div>
          <AlertBox 
            type="info" 
            title="التحليل الاستراتيجي" 
            text="هناك عدم توازن واضح بين الطموح والإمكانيات الحالية، وهذا طبيعي في البداية لكن يحتاج ضبط سريع." 
          />
          <div className="mt-4 font-bold text-xs text-primary flex items-center gap-2">
            <ArrowRight size={16} />
            <span>الخلاصة: أنت لست متأخر… لكنك بحاجة إلى إعادة ضبط المسار قبل التنفيذ.</span>
          </div>
        </CardBody>
      </BaseCard>

      {/* 2. Target Gap Analysis */}
      <BaseCard variant="danger">
        <CardHeader 
          title="فجوة الاستهداف" 
          subtitle="Target Gap Analysis"
          icon={<AlertTriangle size={20} />}
          badge="-48% فجوة"
          badgeType="danger"
        />
        <CardBody>
          <div className="flex items-center gap-6 mb-4">
             <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">الإيراد المتوقع (شهر 12)</div>
                <div className="text-lg sm:text-xl font-bold text-foreground">$3,200</div>
             </div>
             <div className="w-px h-10 bg-muted shrink-0" />
             <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">الهدف المطلوب</div>
                <div className="text-lg sm:text-xl font-bold text-foreground">$6,000</div>
             </div>
          </div>
          
          <ProgressBar progress={53} label="الفجوة السلبية" />

          <AlertBox 
            type="warning" 
            title="تحليل الفجوة" 
            text="هذه الفجوة تعني أنك تحتاج إلى زيادة الطلبات اليومية بنسبة ~50% أو رفع متوسط الطلب (AOV) أو الجمع بين الاثنين." 
          />
          <div className="mt-4 p-3 rounded-xl bg-muted/50 text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
             <Lightbulb size={16} className="text-primary shrink-0" />
             <div><span className="text-primary mr-1">بصيرة:</span> المشكلة ليست في الفكرة… بل في المعادلة التشغيلية الحالية.</div>
          </div>
        </CardBody>
      </BaseCard>

      {/* 3. Readiness Index */}
      <BaseCard>
        <CardHeader 
          title="مؤشر الجاهزية التشغيلية" 
          subtitle="Readiness Index"
          icon={<Activity size={20} />}
          badge="تحتاج تطوير"
          badgeType="warning"
        />
        <CardBody>
          <div className="flex flex-wrap gap-6 items-center mb-4">
             <div className="size-28 relative flex items-center justify-center mx-auto sm:mx-0 shrink-0">
                <svg width="110" height="110" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" className="stroke-muted" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#f59e0b" strokeWidth="8" strokeDasharray="263.8" strokeDashoffset={263.8 * (1 - 0.44)} strokeLinecap="round" transform="rotate(-90 50 50)" />
                </svg>
                <div className="absolute text-xl font-bold text-foreground">44%</div>
             </div>
             <div className="flex-1 min-w-[240px] space-y-2">
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
          <div className="mt-4 font-bold text-xs text-emerald-600 dark:text-emerald-400">
             التوجيه الاستراتيجي: ابدأ بنسخة خفيفة (Lean Version) وليس بالمشروع الكامل حالياً.
          </div>
        </CardBody>
      </BaseCard>

      {/* 4. Core Bottleneck */}
      <BaseCard variant="danger">
        <CardHeader 
          title="عنق الزجاجة الرئيسي" 
          subtitle="Core Bottleneck"
          icon={<ShieldAlert size={20} />}
          badge="حرج جداً"
          badgeType="danger"
        />
        <CardBody>
          <div className="bg-rose-500/10 p-4 rounded-xl mb-4">
             <div className="text-sm font-bold text-rose-600 dark:text-rose-400 mb-1 flex items-center gap-2">
                <AlertCircle size={18} />
                <span>المشكلة الأساسية: عجز رأس المال التشغيلي</span>
             </div>
             <div className="text-xs text-foreground font-medium">
                الميزانية الحالية تغطي فقط 17% من الاحتياج الفعلي للتأسيس والتشغيل، مما يخلق فجوة تمويلية بنسبة 83%.
             </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
             <div className="p-3.5 rounded-xl bg-card">
                <div className="text-xs font-semibold text-muted-foreground">مستوى التغطية</div>
                <div className="text-lg font-bold text-rose-600 dark:text-rose-400">17%</div>
             </div>
             <div className="p-3.5 rounded-xl bg-card">
                <div className="text-xs font-semibold text-muted-foreground">فجوة التمويل</div>
                <div className="text-lg font-bold text-rose-600 dark:text-rose-400">-83%</div>
             </div>
          </div>
          <div className="p-3 bg-muted/40 text-xs font-medium text-foreground rounded-lg">
             هذا أخطر شيء حالياً: ليس لأن الفكرة ضعيفة، بل لأن النموذج الحالي أكبر من ميزانيتك. الاستمرار بنفس الطريقة يعني الفشل قبل الإطلاق.
          </div>
          <div className="mt-3 font-bold text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg w-fit">
             الحل الفوري: تقليل CAPEX (تكاليف التأسيس) فوراً.
          </div>
        </CardBody>
      </BaseCard>

      {/* 5. AI Decision */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="القرار الاستراتيجي الذكي" 
          subtitle="AI Decision"
          icon={<Zap size={20} />}
          badge="قرار مقترح"
        />
        <CardBody>
          <div className="flex gap-4 items-start">
             <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
             </div>
             <div>
                <div className="text-sm font-bold text-primary">Proceed with Adjustments</div>
                <div className="text-xs sm:text-sm font-bold text-foreground">التحول إلى نموذج المطبخ السحابي (Cloud Kitchen / Lean Model)</div>
             </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
             <ReasonCard title="تقليل التكاليف" desc="خفض المصاريف الثابتة بنسبة 60%" />
             <ReasonCard title="سرعة الوصول" desc="دخول السوق في أقل من 30 يوم" />
             <ReasonCard title="أمان أعلى" desc="تقليل مخاطر رأس المال المفقود" />
          </div>

          <div className="mt-4 p-4 bg-primary text-primary-foreground rounded-xl">
             <div className="text-xs opacity-80 font-medium mb-1">بصيرة استراتيجية قوية</div>
             <div className="text-xs sm:text-sm font-bold">أنت لا تحتاج إلى مطعم مادي كامل في هذه المرحلة؛ أنت تحتاج أولاً إلى "إثبات الطلب" (Proof of Demand).</div>
          </div>
        </CardBody>
      </BaseCard>

      {/* 6. Financial Safety */}
      <BaseCard>
        <CardHeader 
          title="تحليل الأمان المالي" 
          subtitle="Financial Safety"
          icon={<Compass size={20} />}
          badge="مخاطرة متوسطة"
          badgeType="warning"
        />
        <CardBody>
          <div className="grid grid-cols-3 gap-3 mb-4">
             <KPIMiniBox label="نقطة التعادل" value="الشهر 8" sub="متأخر قليلاً" />
             <KPIMiniBox label="السيناريو" value="متحفظ" sub="واقعي جداً" />
             <KPIMiniBox label="المخاطر" value="متوسطة" sub="تحتاج مراقبة" />
          </div>
          
          <AlertBox 
            type="danger" 
            title="تحذير مالي" 
            text="إذا لم يتم تعديل النموذج، فإن السيولة ستنتهي قبل تحقيق التعادل المالي، مما سيؤثر على جودة التشغيل ويؤدي لضغط هائل." 
          />

          <div className="mt-4 space-y-2">
             <div className="text-xs font-bold text-foreground">التوجيه المالي التنفيذي:</div>
             <div className="flex flex-col gap-1.5 text-xs text-foreground">
                <CheckItem text="خفّض التكاليف الثابتة بنسبة 40% على الأقل" />
                <CheckItem text="ركز على التدفق النقدي (Cash Flow) كأولوية قصوى قبل الأرباح" />
             </div>
          </div>
        </CardBody>
      </BaseCard>
    </div>
  );
};

// --- HELPER COMPONENTS (BORDERLESS SHADCN) ---

const DataMiniCard = ({ label, value, subValue, icon, color }: any) => (
  <div className="p-3.5 bg-muted/40 rounded-xl flex flex-col gap-1">
    <div className="flex justify-between items-center mb-1">
       <span className="text-[11px] font-semibold text-muted-foreground">{label}</span>
       <div className={color}>{icon}</div>
    </div>
    <div className="text-base font-bold text-foreground">{value}</div>
    <div className={`text-[10px] font-semibold opacity-80 ${color}`}>{subValue}</div>
  </div>
);

const AlertBox = ({ type, title, text }: any) => {
  const isWarning = type === "warning";
  const isDanger = type === "danger";
  const bgClass = isWarning ? "bg-amber-500/10 text-amber-900 dark:text-amber-300" : isDanger ? "bg-rose-500/10 text-rose-900 dark:text-rose-300" : "bg-primary/10 text-primary-900";

  return (
    <div className={`p-3.5 rounded-xl ${bgClass} mt-3`}>
      <div className="text-xs font-bold mb-0.5">{title}</div>
      <div className="text-xs leading-relaxed font-medium">{text}</div>
    </div>
  );
};

const ProgressBar = ({ progress, label }: any) => (
  <div className="my-4 space-y-1.5">
    <div className="flex justify-between text-xs font-semibold">
       <span>{label}</span>
       <span className="text-rose-600 dark:text-rose-400 font-bold">{progress}%</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
       <div className="h-full bg-rose-600 dark:bg-rose-500 transition-all duration-500" style={{ width: `${progress}%` }} />
    </div>
  </div>
);

const StatusItem = ({ status, label }: any) => {
  const bgClass = status === "success" ? "bg-emerald-500" : status === "warning" ? "bg-amber-500" : "bg-rose-500";
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-foreground">
       <div className={`size-2 rounded-full ${bgClass}`} />
       <span>{label}</span>
    </div>
  );
};

const ReasonCard = ({ title, desc }: any) => (
  <div className="p-3 bg-card rounded-xl">
     <div className="text-xs font-bold text-foreground mb-0.5">{title}</div>
     <div className="text-[11px] font-medium text-muted-foreground">{desc}</div>
  </div>
);

const KPIMiniBox = ({ label, value, sub }: any) => (
  <div className="p-3 bg-muted/40 rounded-xl text-center space-y-0.5">
     <div className="text-[11px] font-semibold text-muted-foreground">{label}</div>
     <div className="text-sm font-bold text-foreground">{value}</div>
     <div className="text-[10px] text-muted-foreground">{sub}</div>
  </div>
);

const CheckItem = ({ text }: any) => (
  <div className="flex items-center gap-2 text-xs font-medium text-foreground">
     <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
     <span>{text}</span>
  </div>
);
