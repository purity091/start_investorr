import React, { useEffect } from 'react';
import { ArrowRight, BarChart3, BriefcaseBusiness, CheckCircle2, Gauge, LayoutGrid, Lightbulb, LineChart, PieChart, Rocket, ShieldAlert, Target, Users, Zap } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';

export type IntroMode = 'family' | 'easy' | 'bmc' | 'mit24' | 'lean';

interface ExampleViewerProps {
  mode: IntroMode;
  onBack: () => void;
}

export const ExampleViewer: React.FC<ExampleViewerProps> = ({ mode, onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [mode]);
  return (
    <div dir="rtl" className="flex w-full flex-col gap-3 px-2 py-2 sm:px-4 lg:px-6 pb-20">
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-xl font-bold">مثال توضيحي لنتيجة البناء</h2>
          <p className="text-sm text-muted-foreground">هكذا ستبدو مخرجات مشروعك بعد إكمال هذا المسار.</p>
        </div>
      </div>

      <div className="mt-4">
        {mode === 'family' && <FamilyModeExample />}
        {mode === 'easy' && <ProModeExample />}
        {mode === 'mit24' && <Mit24Example />}
        {mode === 'bmc' && <BmcExample />}
      </div>
    </div>
  );
};

function FamilyModeExample() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl text-primary">LinkSync - أداة ربط الحسابات</CardTitle>
              <CardDescription className="mt-2 text-base text-foreground/80">أداة سحابية خفيفة تربط بين منصات الدفع وخدمات البريد الإلكتروني للمتاجر الصغيرة دون الحاجة لأي كود.</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10">النموذج السهل</Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="shadow-none">
          <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-3 border-b border-border/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="size-5 text-destructive" />
              المشكلة
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-4 sm:pt-4 text-sm leading-6 text-muted-foreground">
            المتاجر الإلكترونية الصغيرة لا تملك مبرمجين لربط خدمات الدفع (مثل ميسر) بخدمات التسويق (مثل Mailchimp)، مما يضطرهم لنقل البيانات يدوياً وتضييع الوقت وفقدان العملاء المحتملين.
          </CardContent>
        </Card>
        
        <Card className="shadow-none">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="size-5 text-amber-500" />
              الحل
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm leading-6 text-muted-foreground">
            منصة وسيطة (No-Code) تسمح لمدير المتجر باختيار المنصات التي يستخدمها، ويتم الربط بينها بضغطة زر واحدة لتنتقل البيانات فوراً عند كل عملية شراء.
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="size-5 text-blue-500" />
              العميل المستهدف
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm leading-6 text-muted-foreground">
            أصحاب المتاجر المستقلة على منصات (شوبيفاي، زد، سلة) الذين تتراوح مبيعاتهم بين 10-50 ألف دولار شهرياً في السوق السعودي والإماراتي.
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="size-5 text-emerald-500" />
              كيف نربح؟
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm leading-6 text-muted-foreground">
            اشتراك شهري مبسط بقيمة 9$ للمتاجر المبتدئة (حتى 500 عملية ربط)، واشتراك 29$ للمتاجر المتقدمة. تكلفة التشغيل الأساسية هي الخوادم السحابية فقط.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProModeExample() {
  return (
    <div className="flex flex-col gap-6 font-sans mt-4">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-3">
          <Badge className="bg-primary/20 text-primary hover:bg-primary/20 rounded-md border-0">دراسة جدوى احترافية</Badge>
          <span className="text-sm text-muted-foreground">تاريخ الإصدار: أكتوبر 2026</span>
        </div>
        <h1 className="text-3xl font-black text-foreground mt-2">FormAI - صانع نماذج ذكي</h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          منصة سحابية متقدمة لإنشاء نماذج جمع البيانات والاستبيانات باستخدام الذكاء الاصطناعي، مصممة خصيصاً لدعم اللغة العربية وتحليل استجابات الجمهور العربي بكفاءة عالية.
        </p>
      </div>

      {/* Executive Summary */}
      <Card className="border-primary/10 shadow-none bg-primary/[0.02]">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-3 border-b border-primary/10">
          <CardTitle className="text-lg flex items-center gap-2 text-primary">
            <BriefcaseBusiness className="size-5" />
            الملخص التنفيذي
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-4 sm:pt-4 grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-sm mb-1 text-foreground">المشكلة الجوهرية</h4>
              <p className="text-sm leading-6 text-muted-foreground">الشركات ووكالات التسويق في الشرق الأوسط تعاني من أدوات جمع البيانات الأجنبية (مثل Typeform) التي لا تدعم الـ RTL بشكل ممتاز، وتفتقر لأدوات ذكاء اصطناعي تفهم السياق واللهجات العربية لتحليل الإجابات النصية.</p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1 text-foreground">الحل المقترح (UVP)</h4>
              <p className="text-sm leading-6 text-muted-foreground">منصة بناء نماذج لا تعتمد على الكود (No-code) تنشئ استبيانات بضغطة زر بناءً على وصف نصي، مع لوحة تحكم تحلل المشاعر والكلمات المفتاحية في الردود العربية فورياً.</p>
            </div>
          </div>
          <div className="space-y-4 bg-background p-4 rounded-xl border border-border/50">
            <div>
              <h4 className="font-bold text-sm mb-1 text-foreground">الرؤية الاستراتيجية</h4>
              <p className="text-sm leading-6 text-muted-foreground">أن نكون البنية التحتية القياسية لجمع البيانات وتحليلها بالذكاء الاصطناعي للشركات في منطقة MENA بحلول عام 2028.</p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1 text-foreground">التمويل المطلوب</h4>
              <p className="text-sm leading-6 text-emerald-600 font-semibold">150,000 دولار أمريكي - لتمويل أول 18 شهر من التشغيل والتسويق.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Market Analysis */}
        <Card className="shadow-none border-border/50">
          <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-3 border-b border-border/50 bg-muted/20">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="size-5 text-blue-500" />
              تحليل السوق (TAM/SAM/SOM)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-4 sm:pt-4 space-y-4">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">حجم السوق الكلي (TAM)</div>
              <div className="font-bold text-sm">$450M - سوق الاستبيانات العالمي</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">السوق القابل للخدمة والمستهدف (SAM/SOM)</div>
              <div className="font-bold text-sm">$35M (السوق الإقليمي) / $2.5M (الهدف لأول 3 سنوات)</div>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1 text-foreground">تحليل المنافسة</h4>
              <p className="text-sm leading-6 text-muted-foreground">Typeform (ضعف دعم العربية)، Google Forms (بدائي). عوائق الدخول: تكلفة تطوير نماذج ذكاء اصطناعي تفهم اللهجات.</p>
            </div>
          </CardContent>
        </Card>

        {/* Marketing & Sales (GTM) */}
        <Card className="shadow-none border-border/50">
          <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="size-5 text-amber-500" />
              استراتيجية الاختراق (GTM)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div>
              <h4 className="font-bold text-sm mb-1 text-foreground">قنوات الاستحواذ الرئيسية</h4>
              <p className="text-sm leading-6 text-muted-foreground">التسويق بالمحتوى B2B عبر LinkedIn، الشراكات مع مسرعات الأعمال لتقديم قسائم خصم، وإعلانات Google Search.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-3 border border-border/50 rounded-lg">
                 <div className="text-xs text-muted-foreground mb-1">دورة المبيعات المتوقعة</div>
                 <div className="font-bold text-sm">14 - 21 يوماً</div>
               </div>
               <div className="p-3 border border-border/50 rounded-lg">
                 <div className="text-xs text-muted-foreground mb-1">استراتيجية الاحتفاظ</div>
                 <div className="font-bold text-sm">عقود سنوية مخفضة 20%</div>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Projections */}
      <Card className="shadow-none border-border/50">
        <CardHeader className="pb-3 border-b border-border/50 bg-emerald-500/5">
          <CardTitle className="text-base flex items-center gap-2 text-emerald-700">
            <LineChart className="size-5" />
            المؤشرات المالية (Unit Economics)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-4 sm:pt-4 grid md:grid-cols-4 gap-4">
          <div className="p-4 bg-background border border-border/50 rounded-xl text-center">
            <div className="text-xs text-muted-foreground mb-1">التأسيس (CAPEX)</div>
            <div className="text-lg font-bold">12,000$ تراخيص وسيرفرات</div>
          </div>
          <div className="p-4 bg-background border border-border/50 rounded-xl text-center">
            <div className="text-xs text-muted-foreground mb-1">تكلفة استحواذ العميل (CAC)</div>
            <div className="text-lg font-bold text-red-500">65$ للعميل</div>
          </div>
          <div className="p-4 bg-background border border-border/50 rounded-xl text-center">
            <div className="text-xs text-muted-foreground mb-1">القيمة العمرية للعميل (LTV)</div>
            <div className="text-lg font-bold text-emerald-600">450$ كمتوسط</div>
          </div>
          <div className="p-4 bg-background border border-border/50 rounded-xl text-center">
            <div className="text-xs text-muted-foreground mb-1">التشغيل الشهري (OPEX)</div>
            <div className="text-lg font-bold">8,000$ رواتب وتسويق</div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* SWOT */}
        <Card className="shadow-none border-border/50">
          <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldAlert className="size-5 text-purple-500" />
              تحليل SWOT والمخاطر
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-4 sm:pt-4 grid sm:grid-cols-2 gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <h4 className="font-bold text-emerald-700 text-sm mb-2">نقاط القوة (S)</h4>
              <p className="text-xs text-emerald-900/80 leading-5">معمارية النظام مصممة للغة العربية أساساً، وفريق مؤسس بخبرة فنية سابقة.</p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <h4 className="font-bold text-red-700 text-sm mb-2">نقاط الضعف (W)</h4>
              <p className="text-xs text-red-900/80 leading-5">ميزانية تسويق محدودة في البداية وعدم وجود قاعدة عملاء سابقة.</p>
            </div>
            <div className="sm:col-span-2 mt-2 p-3 bg-muted/30 rounded-lg">
              <h4 className="font-bold text-sm mb-1 text-foreground">خطة تخفيف المخاطر</h4>
              <p className="text-xs leading-5 text-muted-foreground">بناء طبقة Middleware تتيح التبديل بين مزودي الذكاء الاصطناعي (OpenAI, Claude) فوراً لتجنب الاحتكار. الاعتماد على التسويق بالمحتوى لخفض تكلفة التسويق.</p>
            </div>
          </CardContent>
        </Card>

        {/* Roadmap */}
        <Card className="shadow-none border-border/50">
          <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
            <CardTitle className="text-base flex items-center gap-2">
              <Gauge className="size-5 text-indigo-500" />
              خطة التنفيذ (Roadmap)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="relative border-r-2 border-primary/20 pr-4 space-y-6 my-2">
              <div className="relative">
                <div className="absolute w-3 h-3 bg-primary rounded-full -right-[23px] top-1"></div>
                <h4 className="font-bold text-sm text-foreground">الربع الأول (Q1)</h4>
                <p className="text-xs text-muted-foreground leading-5 mt-1">تطوير النسخة الأولية (MVP)، إغلاق جولة التمويل (Pre-seed)، وتوظيف مطور واجهات. إطلاق مغلق (Private Beta) لـ 20 شركة.</p>
              </div>
              <div className="relative">
                <div className="absolute w-3 h-3 bg-primary/40 rounded-full -right-[23px] top-1"></div>
                <h4 className="font-bold text-sm text-foreground">الأرباع التالية (Q2-Q4)</h4>
                <p className="text-xs text-muted-foreground leading-5 mt-1">الإطلاق العام. الوصول إلى أول 100 عميل مدفوع (MRR: 5000$). إطلاق التكاملات (Integrations) مع Hubspot و Zapier.</p>
              </div>
              <div className="relative">
                <div className="absolute w-3 h-3 bg-primary/20 rounded-full -right-[23px] top-1"></div>
                <h4 className="font-bold text-sm text-foreground">مؤشرات الأداء (KPIs)</h4>
                <p className="text-xs text-muted-foreground leading-5 mt-1">1. تكلفة الاستحواذ (CAC) أقل من 70$. 2. معدل الاحتفاظ (Retention) أعلى من 85%. 3. نمو الإيراد الشهري (MRR) بنسبة 15%.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

function Mit24Example() {
  return (
    <div className="flex flex-col gap-6 font-sans mt-4">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-3">
          <Badge className="bg-primary/20 text-primary hover:bg-primary/20 rounded-md border-0">MIT 24 Steps</Badge>
          <span className="text-sm text-muted-foreground">منهجية ريادة الأعمال المنضبطة</span>
        </div>
        <h1 className="text-3xl font-black text-foreground mt-2">ClinicSync - نظام إدارة العيادات</h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          نظام حجز وإدارة مبسط جداً لعيادات الأسنان المستقلة لتقليل الهدر المالي الناتج عن تخلف المرضى عن المواعيد بنسبة 40%.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Theme 1: Who is your customer? */}
        <Card className="shadow-none border-border/50">
          <CardHeader className="pb-3 border-b border-border/50 bg-blue-500/5">
            <CardTitle className="text-base flex items-center gap-2 text-blue-700">
              <Users className="size-5" />
              من هو العميل؟ (Who is your customer?)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px]">الخطوة 1 و 2</Badge>
                  <h4 className="font-bold text-sm text-foreground">السوق الأولي (Beachhead Market)</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-5">عيادات الأسنان المستقلة (1-3 كراسي) في الرياض. العدد الكلي: 450 عيادة. التركيز الأولي على 50 عيادة تعاني من نسبة تخلف عن المواعيد تتجاوز 25%.</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px]">الخطوة 3</Badge>
                  <h4 className="font-bold text-sm text-foreground">شخصية العميل (End User Persona)</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-5">د. طارق، 42 عاماً، طبيب أسنان ومالك العيادة. يعمل 10 ساعات يومياً. يخسر حوالي 5,000 ريال أسبوعياً بسبب المرضى الذين يحجزون ولا يحضرون.</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px]">الخطوة 5</Badge>
                  <h4 className="font-bold text-sm text-foreground">خريطة العميل (Customer Persona Profile)</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-5">يعتمد على موظف استقبال واحد، يكره البرمجيات الطبية المعقدة التي تتطلب تدريباً طويلاً، ويبحث عن حل يعمل في الخلفية "Plug-and-Play".</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme 2: What can you do for your customer? */}
        <Card className="shadow-none border-border/50">
          <CardHeader className="pb-3 border-b border-border/50 bg-emerald-500/5">
            <CardTitle className="text-base flex items-center gap-2 text-emerald-700">
              <Lightbulb className="size-5" />
              ماذا تفعل للعميل؟ (What can you do?)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px]">الخطوة 6 و 7</Badge>
                  <h4 className="font-bold text-sm text-foreground">دورة حياة العميل والمواصفات عالية المستوى</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-5">النظام يرتبط بتقويم Google/Apple الحالي للعيادة. يُرسل رسائل تأكيد عبر واتساب تلقائياً للمرضى. إذا اعتذر المريض، يُرسل النظام فوراً لمن هم في قائمة الانتظار.</p>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px] bg-background">الخطوة 8</Badge>
                  <h4 className="font-bold text-sm text-emerald-900">عرض القيمة الكمي (Quantified Value Proposition)</h4>
                </div>
                <p className="text-xs text-emerald-800 leading-5 font-medium">تقليل نسبة التخلف عن المواعيد (No-shows) من 25% إلى 5%. مما يضيف حوالي 15,000 ريال شهرياً لإيرادات العيادة الواحدة بدون أي جهد إضافي للتسويق.</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px]">الخطوة 10 و 11</Badge>
                  <h4 className="font-bold text-sm text-foreground">الجوهر والمركز التنافسي (Core & Positioning)</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-5"><b>Core:</b> خوارزمية ذكية تتنبأ باحتمالية الغياب وتقدم الحوافز. <br/><b>Positioning:</b> أبسط أداة في السوق (إعداد في 5 دقائق)، لا يحتاج لتغيير نظام العيادة الحالي.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme 3: How does your customer acquire your product? */}
        <Card className="shadow-none border-border/50">
          <CardHeader className="pb-3 border-b border-border/50 bg-amber-500/5">
            <CardTitle className="text-base flex items-center gap-2 text-amber-700">
              <Target className="size-5" />
              كيف يستحوذ العميل؟ (How does customer acquire?)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px]">الخطوة 12 و 13</Badge>
                  <h4 className="font-bold text-sm text-foreground">وحدة اتخاذ القرار (DMU) وعملية الشراء</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-5"><b>صانع القرار:</b> مالك العيادة. <b>المؤثر:</b> موظف الاستقبال. عملية الشراء سريعة جداً وتتم عبر تجربة مجانية لمدة 14 يوماً مع ربط فوري للبطاقة الائتمانية.</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px]">الخطوة 18</Badge>
                  <h4 className="font-bold text-sm text-foreground">خريطة عملية المبيعات (Sales Process)</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-5">تواصل مباشر (Cold Outreach) للأطباء المالكين لعيادات عبر لينكد إن + إعلانات فيس بوك مخصصة للعيادات. الهدف: تحويل 10% من الزيارات إلى اشتراك تجريبي.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme 4: How do you make money? */}
        <Card className="shadow-none border-border/50">
          <CardHeader className="pb-3 border-b border-border/50 bg-purple-500/5">
            <CardTitle className="text-base flex items-center gap-2 text-purple-700">
              <BarChart3 className="size-5" />
              النموذج المالي (How do you make money?)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3 mb-2">
               <div className="p-3 border border-border/50 rounded-lg text-center bg-background">
                 <div className="text-[10px] text-muted-foreground mb-1">LTV (القيمة العمرية)</div>
                 <div className="font-bold text-sm text-emerald-600">3,600 ريال</div>
               </div>
               <div className="p-3 border border-border/50 rounded-lg text-center bg-background">
                 <div className="text-[10px] text-muted-foreground mb-1">COCA (تكلفة الاستحواذ)</div>
                 <div className="font-bold text-sm text-red-500">450 ريال</div>
               </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px]">الخطوة 15 و 16</Badge>
                  <h4 className="font-bold text-sm text-foreground">نموذج الإيرادات والتسعير</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-5">نموذج اشتراك شهري (SaaS) بقيمة 299 ريال/الشهر للفرع الواحد يتضمن 1000 رسالة واتساب آلية. تسعير مبني على القيمة (القيمة المستردة للعيادة تتجاوز 15,000 ريال).</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px]">الخطوة 23</Badge>
                  <h4 className="font-bold text-sm text-foreground">إثبات افتراضات العمل (Show the Dogs Will Eat)</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-5">تم توقيع خطابات نوايا (LOI) مع 7 عيادات وافقوا على الدفع المسبق بقيمة 2000 ريال للحصول على اشتراك سنوي بمجرد الإطلاق، مما يثبت القيمة الحقيقية للحل.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function BmcExample() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl text-primary">MenuQR - منيو المطاعم التفاعلي</CardTitle>
              <CardDescription className="mt-2 text-base text-foreground/80">خدمة سريعة لتحويل قوائم الطعام التقليدية إلى قوائم رقمية تفاعلية بمسح الـ QR.</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10">Business Model Canvas</Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-10 gap-2 p-2 bg-muted/20 rounded-xl">
        {/* Row 1 */}
        <div className="col-span-2 space-y-2">
          <BmcBox title="الشركاء الرئيسيون" items={['مطابع محلية (لطباعة الـ QR)', 'شركات بوابات الدفع']} />
        </div>
        <div className="col-span-2 space-y-2 flex flex-col">
          <BmcBox title="الأنشطة الرئيسية" items={['تطوير المنصة', 'صيانة السيرفرات', 'خدمة العملاء']} className="flex-1" />
          <BmcBox title="الموارد الرئيسية" items={['مطور ويب', 'استضافة سحابية', 'فريق مبيعات']} className="flex-1" />
        </div>
        <div className="col-span-2 space-y-2">
          <BmcBox title="القيمة المقترحة" items={['تحديث فوري لأسعار المنيو بدون طباعة', 'تقليل احتكاك الزبائن بالقوائم الورقية', 'زيادة المبيعات عبر صور جذابة للوجبات']} className="bg-primary/5 border-primary/20" />
        </div>
        <div className="col-span-2 space-y-2 flex flex-col">
          <BmcBox title="العلاقات مع العملاء" items={['دعم فني عبر الواتساب', 'خدمة ذاتية كاملة']} className="flex-1" />
          <BmcBox title="القنوات" items={['الزيارات الميدانية المباشرة', 'إعلانات انستجرام', 'الإحالة']} className="flex-1" />
        </div>
        <div className="col-span-2 space-y-2">
          <BmcBox title="شرائح العملاء" items={['المقاهي المختصة الناشئة', 'عربات الطعام (Food Trucks)', 'المطاعم الشعبية']} />
        </div>

        {/* Row 2 */}
        <div className="col-span-5 space-y-2 mt-1">
          <BmcBox title="هيكل التكاليف" items={['تكاليف الاستضافة: 50$ شهرياً', 'عمولات المبيعات الميدانية', 'تكلفة رسائل التفعيل']} />
        </div>
        <div className="col-span-5 space-y-2 mt-1">
          <BmcBox title="مصادر الإيرادات" items={['اشتراك سنوي: 150$', 'خدمة إدخال المنيو لمرة واحدة: 50$', 'إيرادات الإعلانات داخل المنيو للمطاعم الكبيرة']} />
        </div>
      </div>
    </div>
  );
}

function BmcBox({ title, items, className = '' }: { title: string; items: string[]; className?: string }) {
  return (
    <Card className={`shadow-none rounded-lg h-full p-3 ${className}`}>
      <h4 className="text-xs font-bold text-foreground mb-2">{title}</h4>
      <ul className="text-[11px] text-muted-foreground space-y-1.5 list-disc list-inside">
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </Card>
  );
}
