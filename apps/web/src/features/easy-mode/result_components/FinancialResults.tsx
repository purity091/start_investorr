import React from "react";
import { BaseCard, CardHeader, CardBody } from "./CardDesignSystem";
import { 
  BarChart3, 
  AlertTriangle, 
  PieChart, 
  TrendingDown, 
  Calculator, 
  Calendar, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Rocket,
  Scale
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const FinancialResults = () => {
  return (
    <div className="flex flex-col gap-5 w-full text-right" dir="rtl">
      
      {/* 1. Current Financial Reality */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="الواقع المالي الحالي" 
          subtitle="Current Financial Reality"
          icon={<Calculator size={20} />}
          badge="نظرة مالية"
        />
        <CardBody>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <MetricBox label="رأس المال" value="$5,000" color="text-primary" />
            <MetricBox label="الإيراد المتوقع (ش12)" value="$3,200" color="text-muted-foreground" />
            <MetricBox label="الهدف المطلوب" value="$6,000" color="text-emerald-600 dark:text-emerald-400" />
          </div>

          <ProgressBar progress={52} label="نسبة الوصول للهدف" />
          
          <AlertBox 
            type="info" 
            title="تحليل الواقع المالي" 
            text="مشروعك حالياً لا يصل لهدفه المالي ضمن النموذج الحالي. المشكلة ليست في الإيراد فقط، بل في هيكل التكاليف ونموذج التشغيل المعتمد." 
          />
          
          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 text-xs sm:text-sm font-bold text-rose-700 dark:text-rose-400">
             📍 الخلاصة: أنت تعمل ضمن نموذج "غير متناسب" إطلاقاً مع ميزانيتك الحالية.
          </div>
        </CardBody>
      </BaseCard>

      {/* 2. Cost Structure Breakdown */}
      <BaseCard variant="danger">
        <CardHeader 
          title="تحليل التكاليف" 
          subtitle="Cost Structure Breakdown"
          icon={<PieChart size={20} />}
          badge="توزيع غير متوازن"
          badgeType="danger"
        />
        <CardBody>
          <div className="flex flex-wrap gap-2.5 mb-4">
             <CostTag label="تكاليف ثابتة (إيجار/تجهيز)" level="high" desc="مرتفعة جداً" />
             <CostTag label="تكاليف متغيرة (مواد/توصيل)" level="medium" desc="متوسطة" />
             <CostTag label="تسويق وإعلانات" level="low" desc="منخفض حالياً" />
          </div>

          <AlertBox 
            type="danger" 
            title="خطر مالي مكتشف" 
            text="أكبر خطر يواجهك هو أن التكاليف الثابتة تستهلك نسبة كبيرة من رأس المال. إذا كانت الإيجارات والتجهيزات تمثل 60% من ميزانيتك، فأنت فعلياً بدأت بخسارة مرونة التشغيل." 
          />
          
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-primary">
             <ArrowRight size={16} />
             <span>التوجيه الأساسي: قلل التكاليف الثابتة (CAPEX) قبل أي خطوة تنفيذية.</span>
          </div>
        </CardBody>
      </BaseCard>

      {/* 3. Funding Gap Analysis */}
      <BaseCard variant="danger">
        <CardHeader 
          title="فجوة التمويل" 
          subtitle="Funding Gap Analysis"
          icon={<TrendingDown size={20} />}
          badge="فجوة حرجة"
          badgeType="danger"
        />
        <CardBody>
          <div className="flex items-center gap-6 mb-4">
             <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">التكلفة الفعلية المتوقعة</div>
                <div className="text-lg sm:text-xl font-bold text-rose-600 dark:text-rose-400">~$30,000</div>
             </div>
             <div className="w-px h-10 bg-muted shrink-0" />
             <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">ميزانيتك المتاحة</div>
                <div className="text-lg sm:text-xl font-bold text-primary">$5,000</div>
             </div>
          </div>

          <div className="p-4 bg-muted/40 rounded-xl flex items-center gap-4">
             <div className="size-12 rounded-full bg-rose-500/10 flex items-center justify-center text-xs font-bold text-rose-600 shrink-0">
                -83%
             </div>
             <div>
                <div className="text-sm font-bold text-foreground">عجز مالي صارخ</div>
                <div className="text-xs text-muted-foreground font-medium">لا يمكنك تشغيل النموذج التقليدي بالميزانية الحالية. أي محاولة تعني استنزافاً كاملاً قبل الانطلاق.</div>
             </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-muted/50 text-xs sm:text-sm font-semibold text-foreground">
             💡 <span className="text-primary mr-1">بصيرة مالية:</span> المشكلة ليست "نقصاً بسيطاً"، بل Mismatch كامل بين الفكرة والقدرة المالية الحالية.
          </div>
        </CardBody>
      </BaseCard>

      {/* 4. Revenue Engine */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="معادلة الإيرادات" 
          subtitle="Revenue Engine"
          icon={<BarChart3 size={20} />}
          badge="محرك النمو"
        />
        <CardBody>
          <div className="text-xs font-bold text-foreground mb-3">الإيراد = (عدد الطلبات × متوسط الطلب)</div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
             <RevenuePlan title="الوضع الحالي" orders="15" aov="$22" daily="$330" isTarget={false} />
             <RevenuePlan title="الوضع المطلوب" orders="28" aov="$28" daily="$784" isTarget={true} />
          </div>

          <AlertBox 
            type="info" 
            title="تحليل الأداء" 
            text="للوصول لهدفك، تحتاج لمضاعفة الأداء تقريباً (أو تحسين الطلبات والقيمة معاً). لا تركز على عامل واحد فقط، بل على تحسين النظام التشغيلي بالكامل." 
          />
          
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-primary">
             <ArrowRight size={16} />
             <span>التوجيه: ركز على رفع "قيمة السلة" بالتوازي مع عدد العملاء الجدد.</span>
          </div>
        </CardBody>
      </BaseCard>

      {/* 5. Break-even Analysis */}
      <BaseCard>
        <CardHeader 
          title="نقطة التعادل" 
          subtitle="Break-even Analysis"
          icon={<Calendar size={20} />}
          badge="أمان متوسط"
          badgeType="warning"
        />
        <CardBody>
          <div className="flex items-center justify-center p-6 bg-muted/40 rounded-xl mb-4 text-center">
             <div>
                <div className="text-xs font-semibold text-muted-foreground mb-1">نقطة التعادل المتوقعة</div>
                <div className="text-3xl font-bold text-primary">الشهر 8</div>
                <Badge variant="secondary" className="mt-2 text-xs font-semibold">رقم مقبول بشروط</Badge>
             </div>
          </div>

          <AlertBox 
            type="warning" 
            title="مخاطر نقطة التعادل" 
            text="هذه النتيجة مشروطة بعدم وجود أخطاء تشغيلية وثبات في الإيرادات. أي تأخير في الوصول للتعادل يعني ضغطاً مالياً هائلاً قد يهدد استمرار المشروع." 
          />
        </CardBody>
      </BaseCard>

      {/* 6. Scenario Simulation */}
      <BaseCard>
        <CardHeader 
          title="السيناريو المتفائل مقابل الحذر" 
          subtitle="Scenario Simulation"
          icon={<Scale size={20} />}
          badge="محاكاة مالية"
        />
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
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

      {/* 7. Final Financial Decision */}
      <BaseCard variant="highlight">
        <CardHeader 
          title="القرار المالي النهائي" 
          subtitle="Financial Decision"
          icon={<CheckCircle2 size={20} />}
          badge="قرار نهائي"
        />
        <CardBody>
          <div className="text-base font-bold text-primary mb-4 flex items-center gap-2">
             <Zap size={20} />
             <span>القرار: ابدأ… ولكن بعد تعديل النموذج بالكامل</span>
          </div>

          <div className="space-y-2 mb-4">
             <ConditionItem label="تقليل التكاليف الثابتة" value="بنسبة 40% على الأقل" />
             <ConditionItem label="اعتماد المطبخ السحابي" value="Cloud Kitchen Mode" />
             <ConditionItem label="التركيز المطلق" value="Cash Flow First" />
          </div>

          <div className="p-4 rounded-xl bg-muted/40 space-y-2">
             <div className="text-xs font-bold text-foreground">ماذا لو بدأت الآن؟</div>
             <ul className="list-disc list-inside text-xs text-muted-foreground font-medium leading-relaxed space-y-1">
                <li>إذا التزمت بالشروط: المشروع قابل للنجاح والمخاطر ستنخفض للحد الأدنى.</li>
                <li>إذا تجاهلت التحليل: احتمالية الفشل عالية جداً قبل الوصول للإطلاق الفعلي.</li>
             </ul>
          </div>
        </CardBody>
      </BaseCard>
    </div>
  );
};

// --- HELPER COMPONENTS (BORDERLESS SHADCN) ---

const MetricBox = ({ label, value, color }: any) => (
  <div className="p-3.5 bg-muted/40 rounded-xl text-center">
     <div className="text-[11px] font-semibold text-muted-foreground mb-0.5">{label}</div>
     <div className={`text-base font-bold ${color}`}>{value}</div>
  </div>
);

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

const CostTag = ({ label, level, desc }: any) => {
  const colorClass = level === "high" ? "bg-rose-500" : level === "medium" ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div className="p-2.5 bg-card rounded-xl flex items-center gap-2.5">
       <div className={`size-2 rounded-full ${colorClass}`} />
       <div>
          <div className="text-xs font-bold text-foreground">{label}</div>
          <div className="text-[10px] font-semibold text-muted-foreground">{desc}</div>
       </div>
    </div>
  );
};

const RevenuePlan = ({ title, orders, aov, daily, isTarget }: any) => (
  <div className={`p-3.5 rounded-xl ${isTarget ? "bg-primary/10" : "bg-card"}`}>
     <div className={`text-xs font-bold mb-2 ${isTarget ? "text-primary" : "text-muted-foreground"}`}>{title}</div>
     <div className="space-y-1.5 text-xs font-medium">
        <div className="flex justify-between">
           <span className="text-muted-foreground">عدد الطلبات</span>
           <span className="font-bold">{orders}</span>
        </div>
        <div className="flex justify-between">
           <span className="text-muted-foreground">متوسط الطلب</span>
           <span className="font-bold">{aov}</span>
        </div>
        <div className="flex justify-between pt-1.5 text-foreground font-bold">
           <span>الدخل اليومي</span>
           <span className={isTarget ? "text-emerald-600" : ""}>{daily}</span>
        </div>
     </div>
  </div>
);

const ScenarioCard = ({ type, title, stats }: any) => {
  const isOpt = type === "optimistic";
  const colorClass = isOpt ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400";
  return (
    <div className="p-3.5 bg-card rounded-xl space-y-2">
       <div className={`text-xs font-bold ${colorClass}`}>{title}</div>
       <div className="space-y-1 text-xs font-medium">
          {stats.map((s: any, idx: number) => (
            <div key={idx} className="flex justify-between">
               <span className="text-muted-foreground">{s.label}</span>
               <span className="font-semibold">{s.val}</span>
            </div>
          ))}
       </div>
    </div>
  );
};

const ConditionItem = ({ label, value }: any) => (
  <div className="flex items-center justify-between p-3 bg-card rounded-xl text-xs font-medium">
     <div className="flex items-center gap-2">
        <CheckCircle2 size={16} className="text-emerald-600" />
        <span className="font-bold">{label}</span>
     </div>
     <span className="font-bold text-primary">{value}</span>
  </div>
);
