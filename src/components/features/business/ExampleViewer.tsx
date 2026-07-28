import React from 'react';
import { ArrowRight, BarChart3, BriefcaseBusiness, CheckCircle2, Gauge, LayoutGrid, Lightbulb, LineChart, PieChart, Rocket, ShieldAlert, Target, Users, Zap } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';

export type IntroMode = 'family' | 'easy' | 'bmc' | 'mit24';

interface ExampleViewerProps {
  mode: IntroMode;
  onBack: () => void;
}

export const ExampleViewer: React.FC<ExampleViewerProps> = ({ mode, onBack }) => {
  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-3 py-3 sm:px-4 lg:px-5 pb-20">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={onBack} className="gap-2">
          <ArrowRight className="size-4" />
          العودة للمسارات
        </Button>
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
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="size-5 text-destructive" />
              المشكلة
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm leading-6 text-muted-foreground">
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
        <CardHeader className="pb-3 border-b border-primary/10">
          <CardTitle className="text-lg flex items-center gap-2 text-primary">
            <BriefcaseBusiness className="size-5" />
            الملخص التنفيذي
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid md:grid-cols-2 gap-6">
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
          <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="size-5 text-blue-500" />
              تحليل السوق (TAM/SAM/SOM)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
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
        <CardContent className="pt-4 grid md:grid-cols-4 gap-4">
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
          <CardContent className="pt-4 grid sm:grid-cols-2 gap-4">
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
    <div className="flex flex-col gap-4">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl text-primary">ClinicSync - حجز العيادات السحابي</CardTitle>
              <CardDescription className="mt-2 text-base text-foreground/80">نظام حجز وإدارة مبسط لعيادات الأسنان المستقلة للحد من تغيب المرضى.</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10">MIT 24 Steps</Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-3">
        {[
          { step: 'الخطوة 1: تقسيم السوق', title: 'تحديد الأسواق المحتملة', desc: 'تم استبعاد المستشفيات الكبيرة وعيادات التجميل، والتركيز على عيادات الأسنان المستقلة في العاصمة.' },
          { step: 'الخطوة 2: السوق المبدئي (Beachhead)', title: 'اختيار السوق الأولي', desc: '100 عيادة أسنان في مدينة الرياض، تعاني من نسبة تخلف عن المواعيد تتجاوز 30%.' },
          { step: 'الخطوة 3: شخصية العميل (Persona)', title: 'من هو العميل الفعلي؟', desc: 'د. خالد (45 عاماً)، مالك عيادة أسنان، يدير العيادة بنفسه ويزعجه هدر الوقت بسبب عدم التزام المرضى، ولا يجيد استخدام أنظمة معقدة.' },
          { step: 'الخطوة 6: دورة حياة العميل', title: 'كيف يجدنا ويشتري؟', desc: 'يتعرف علينا عبر إعلانات لينكد إن -> يجرب النظام مجاناً لمدة أسبوع ببطاقة ائتمان -> يتحول لاشتراك شهري تلقائي.' },
          { step: 'الخطوة 10: جوهر العمل (Core)', title: 'الميزة التنافسية غير القابلة للنسخ', desc: 'خوارزمية قادرة على التنبؤ باحتمالية غياب المريض، وإرسال رسائل واتساب ذكية لتأكيد الحضور أو إعادة الجدولة فوراً.' },
          { step: 'الخطوة 15: نموذج الإيرادات', title: 'كيف نجني المال؟', desc: 'رسم تأسيس قدره 100$ لتنظيف بياناتهم القديمة، واشتراك شهري 49$ يتضمن 500 رسالة واتساب.' },
        ].map((item, i) => (
          <Card key={i} className="shadow-none">
            <CardContent className="p-4 flex gap-4 items-start">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted font-bold text-muted-foreground">{i + 1}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px]">{item.step}</Badge>
                  <h4 className="font-bold text-sm text-foreground">{item.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-6">{item.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
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
