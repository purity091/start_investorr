import React, { useEffect, useState, useMemo } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  RefreshCcw,
  Star,
  Target,
  Zap,
  Beaker,
  PieChart,
  ArrowRightCircle,
  Lightbulb,
  Users,
  Workflow,
  LayoutGrid,
  Clock,
  Rocket,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProjectWorkspace } from '@/features/workspace/ProjectWorkspaceContext';

const Label = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
    {children}
  </label>
);

// Types
type TestType = 'مقابلات' | 'استبيان' | 'صفحة هبوط' | 'إعلان ممول' | 'MVP' | 'بيع يدوي' | 'تجربة مجانية';

interface Hypothesis {
  id: string;
  text: string;
  importance: number;
  isCritical: boolean;
  testType?: TestType;
  setup: Record<string, string | number>;
  results: Record<string, string | number>;
  analysis?: { successRate: number; explanation: string };
  decision?: 'continue' | 'tweak' | 'pivot';
}

export default function LeanStartupWizard() {
  const { workspace, updateWorkspace } = useProjectWorkspace();
  const savedLean = workspace.feasibilityModels?.lean as unknown as {
    step?: number;
    idea?: { name: string; pitch: string; problem: string; solution: string };
    hypInputs?: {
      customerType: string;
      specificCustomer: string;
      problem: string;
      currentAlternative: string;
      whySwitch: string;
    };
    hypotheses?: Hypothesis[];
  } | undefined;
  const [step, setStep] = useState(savedLean?.step ?? 1);

  // Stage 1 State
  const [idea, setIdea] = useState(savedLean?.idea ?? { name: '', pitch: '', problem: '', solution: '' });

  // Stage 2 State
  const [hypInputs, setHypInputs] = useState(savedLean?.hypInputs ?? {
    customerType: '',
    specificCustomer: '',
    problem: '',
    currentAlternative: '',
    whySwitch: '',
  });

  // Stage 3-8 State (Hypotheses)
  const [hypotheses, setHypotheses] = useState<Hypothesis[]>(savedLean?.hypotheses ?? []);

  useEffect(() => {
    updateWorkspace((current) => ({
      feasibilityModels: {
        ...current.feasibilityModels,
        lean: { step, idea, hypInputs, hypotheses },
      },
      profile: {
        ...current.profile,
        name: idea.name || current.profile.name,
        opportunitySummary: idea.pitch || current.profile.opportunitySummary,
      },
    }));
  }, [hypInputs, hypotheses, idea, step, updateWorkspace]);

  // Helpers
  const nextStep = () => setStep((s) => Math.min(s + 1, 8));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const generateHypotheses = () => {
    const h1 = `نعتقد أن [${hypInputs.specificCustomer || hypInputs.customerType}] يعانون من مشكلة [${hypInputs.problem}].`;
    const h2 = `نعتقد أن هؤلاء العملاء مستعدون للدفع وتغيير طريقتهم الحالية لأن [${hypInputs.whySwitch}].`;
    const h3 = `نعتقد أن الحل المقترح (${idea.solution}) سيتفوق على البدائل الحالية (${hypInputs.currentAlternative}).`;

    setHypotheses([
      { id: '1', text: h1, importance: 0, isCritical: false, setup: {}, results: {} },
      { id: '2', text: h2, importance: 0, isCritical: false, setup: {}, results: {} },
      { id: '3', text: h3, importance: 0, isCritical: false, setup: {}, results: {} },
    ]);
    nextStep();
  };

  const updateHypothesis = (id: string, updates: Partial<Hypothesis>) => {
    setHypotheses((prev) => prev.map((h) => (h.id === id ? { ...h, ...updates } : h)));
  };

  const sortHypotheses = () => {
    const sorted = [...hypotheses].sort((a, b) => {
      // Critical first
      if (a.isCritical && !b.isCritical) return -1;
      if (!a.isCritical && b.isCritical) return 1;
      // Then by importance
      return b.importance - a.importance;
    });
    setHypotheses(sorted);
    nextStep();
  };

  const calculateAnalysis = () => {
    const updated = hypotheses.map((h) => {
      let successRate = 0;
      let explanation = '';

      if (h.testType === 'مقابلات') {
        const total = Number(h.results.total) || 1;
        const yes = Number(h.results.yes) || 0;
        successRate = Math.round((yes / total) * 100);
        if (successRate > 70) explanation = 'الشريحة المستهدفة تعاني من المشكلة بوضوح وأبدت اهتماماً كبيراً.';
        else if (successRate > 40) explanation = 'يوجد اهتمام متوسط، لكن المشكلة قد لا تكون ملحة كفاية للشريحة الحالية.';
        else explanation = 'العملاء لا يرون هذه المشكلة كأولوية قصوى تستحق الدفع.';
      } else if (h.testType === 'صفحة هبوط') {
        const visitors = Number(h.results.visitors) || 1;
        const signups = Number(h.results.signups) || 0;
        successRate = Math.round((signups / visitors) * 100);
        // Normal conversion is usually lower, but let's normalize to a 100% scale for the score
        // 10% conversion is huge in real life, so let's multiply by 10 for the "Success Rate" score
        successRate = Math.min(successRate * 10, 100);
        if (successRate > 80) explanation = 'معدل التحويل ممتاز! رسالة المنتج واضحة وهناك طلب عالي.';
        else if (successRate > 40) explanation = 'معدل تحويل مقبول. قد تحتاج لتعديل الرسالة التسويقية أو السعر.';
        else explanation = 'معدل التحويل ضعيف جداً. العرض الحالي لا يغري الزوار.';
      } else {
        // Fallback generic calculation
        const metric = Number(h.results.metric) || 0;
        const target = Number(h.results.target) || 1;
        successRate = Math.min(Math.round((metric / target) * 100), 100);
        if (successRate > 70) explanation = 'التجربة أثبتت نجاح الفرضية بنسبة مقبولة.';
        else explanation = 'التجربة لم تحقق الأرقام المستهدفة بالكامل.';
      }

      return { ...h, analysis: { successRate, explanation } };
    });
    setHypotheses(updated);
    nextStep();
  };

  const getOverallReadiness = () => {
    if (hypotheses.length === 0 || !hypotheses[0].analysis) return 0;
    const total = hypotheses.reduce((sum, h) => sum + (h.analysis?.successRate || 0), 0);
    return Math.round(total / hypotheses.length);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Progress Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-3 py-2.5 sm:px-4 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">Lean Startup</Badge>
            <h1 className="font-bold text-foreground text-xs sm:text-base">دورة البناء والتعلم (Build-Measure-Learn)</h1>
          </div>
          <div className="text-xs sm:text-sm font-semibold text-muted-foreground flex items-center gap-2">
            مرحلة {step} من 8
          </div>
        </div>
        <div className="h-1 bg-muted w-full">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step / 8) * 100}%` }} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-2.5 py-3.5 sm:px-4 sm:py-8">
        {/* Stage 1: Idea */}
        {step === 1 && (
          <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-1 mb-4 sm:mb-8 text-center">
              <Lightbulb className="size-8 sm:size-10 text-primary mx-auto mb-1 sm:mb-2" />
              <h2 className="text-xl sm:text-3xl font-black">المرحلة الأولى: فكرة المشروع</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">الهدف من هذه المرحلة فهم ما الذي تريد اختباره بالتحديد.</p>
            </div>
            <Card className="shadow-none border-border/50">
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label>ما اسم المشروع؟</Label>
                  <Input placeholder="مثال: مناديب" value={idea.name} onChange={(e) => setIdea({ ...idea, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>صف المشروع في سطر واحد</Label>
                  <Textarea placeholder="مثال: منصة تربط المطاعم بمندوبي التوصيل المستقلين." value={idea.pitch} onChange={(e) => setIdea({ ...idea, pitch: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>ما المشكلة التي يحلها؟</Label>
                  <Textarea placeholder="مثال: أصحاب المطاعم يقضون ساعات في البحث عن مناديب وقت الذروة." value={idea.problem} onChange={(e) => setIdea({ ...idea, problem: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>ما الحل المقترح؟</Label>
                  <Textarea placeholder="مثال: تطبيق يرسل طلب توصيل لأقرب 10 مناديب فوراً." value={idea.solution} onChange={(e) => setIdea({ ...idea, solution: e.target.value })} />
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-end">
              <Button onClick={nextStep} size="lg" className="w-full sm:w-auto">التالي <ArrowLeft className="size-4 mr-2" /></Button>
            </div>
          </div>
        )}

        {/* Stage 2: Hypotheses Building */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2 mb-8 text-center">
              <Beaker className="size-10 text-primary mx-auto mb-2" />
              <h2 className="text-3xl font-black">المرحلة الثانية: بناء الفرضيات</h2>
              <p className="text-muted-foreground">كل مشروع هو مجموعة فرضيات. ساعدنا لنبنيها لك.</p>
            </div>
            <Card className="shadow-none border-border/50">
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label>من هو العميل المستهدف؟</Label>
                  <Select value={hypInputs.customerType} onValueChange={(v) => setHypInputs({ ...hypInputs, customerType: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الشريحة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="شركات (B2B)">شركات (B2B)</SelectItem>
                      <SelectItem value="أفراد (B2C)">أفراد (B2C)</SelectItem>
                      <SelectItem value="متاجر إلكترونية">متاجر إلكترونية</SelectItem>
                      <SelectItem value="مطاعم ومقاهي">مطاعم ومقاهي</SelectItem>
                      <SelectItem value="أخرى">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>العميل بالتحديد</Label>
                  <Input placeholder="مثال: مالك مطعم صغير لا يملك أسطول توصيل" value={hypInputs.specificCustomer} onChange={(e) => setHypInputs({ ...hypInputs, specificCustomer: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>ما هي مشكلته اليومية؟</Label>
                  <Textarea placeholder="مثال: تتأخر الطلبات في أوقات الذروة بسبب نقص المناديب." value={hypInputs.problem} onChange={(e) => setHypInputs({ ...hypInputs, problem: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>كيف يحلها الآن؟ (البديل)</Label>
                  <Textarea placeholder="مثال: يكلم المناديب في قروب واتساب." value={hypInputs.currentAlternative} onChange={(e) => setHypInputs({ ...hypInputs, currentAlternative: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>لماذا سيترك الواتساب ويستخدم منتجك؟</Label>
                  <Textarea placeholder="مثال: لأنه أسرع ويوفر تتبعاً مباشراً للطلب." value={hypInputs.whySwitch} onChange={(e) => setHypInputs({ ...hypInputs, whySwitch: e.target.value })} />
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-between">
              <Button onClick={prevStep} variant="ghost">السابق</Button>
              <Button onClick={generateHypotheses} size="lg">بناء الفرضيات <Zap className="size-4 mr-2" /></Button>
            </div>
          </div>
        )}

        {/* Stage 3: Prioritize */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2 mb-8 text-center">
              <Target className="size-10 text-primary mx-auto mb-2" />
              <h2 className="text-3xl font-black">المرحلة الثالثة: تقييم وترتيب الفرضيات</h2>
              <p className="text-muted-foreground">ليست كل الفرضيات بنفس الأهمية. قيمها لنرتب أولويات الاختبار.</p>
            </div>

            <div className="space-y-4">
              {hypotheses.map((h, index) => (
                <Card key={h.id} className="shadow-none border-border/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-primary/20" />
                  <CardContent className="pt-5 pb-5 pl-5 pr-6 space-y-4">
                    <p className="font-semibold text-foreground text-lg leading-7">
                      <span className="text-muted-foreground text-sm font-normal ml-2">فرضية {index + 1}:</span>
                      {h.text}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">مدى الأهمية</Label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`size-6 cursor-pointer transition-colors ${star <= h.importance ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
                              onClick={() => updateHypothesis(h.id, { importance: star })}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">إذا كانت خاطئة، هل يفشل المشروع بالكامل؟</Label>
                        <div className="flex gap-2">
                          <Button variant={h.isCritical ? "default" : "outline"} size="sm" onClick={() => updateHypothesis(h.id, { isCritical: true })}>نعم، يفشل</Button>
                          <Button variant={h.isCritical === false ? "default" : "outline"} size="sm" onClick={() => updateHypothesis(h.id, { isCritical: false })}>لا، نعدل فقط</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between">
              <Button onClick={prevStep} variant="ghost">السابق</Button>
              <Button onClick={sortHypotheses} size="lg">ترتيب المتابعة <ArrowLeft className="size-4 mr-2" /></Button>
            </div>
          </div>
        )}

        {/* Stage 4: Test Selection */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2 mb-8 text-center">
              <Beaker className="size-10 text-primary mx-auto mb-2" />
              <h2 className="text-3xl font-black">المرحلة الرابعة: اختيار تجربة الاختبار</h2>
              <p className="text-muted-foreground">تم ترتيب الفرضيات (الأخطر أولاً). كيف تريد اختبار كل منها؟</p>
            </div>

            <div className="space-y-4">
              {hypotheses.map((h, index) => (
                <Card key={h.id} className="shadow-none border-border/50">
                  <CardHeader className="pb-3 bg-muted/20">
                    <CardTitle className="text-sm flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-background">{index + 1}</Badge>
                        الأولوية: {h.isCritical ? 'حرجة جداً' : 'متوسطة'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <p className="font-semibold text-foreground">{h.text}</p>
                    <div className="space-y-2">
                      <Label>طريقة الاختبار الأفضل:</Label>
                      <Select value={h.testType} onValueChange={(v: TestType) => updateHypothesis(h.id, { testType: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر التجربة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="مقابلات">مقابلات شخصية (Interviews)</SelectItem>
                          <SelectItem value="صفحة هبوط">صفحة هبوط (Landing Page)</SelectItem>
                          <SelectItem value="MVP">نموذج أولي (MVP)</SelectItem>
                          <SelectItem value="استبيان">استبيان رقمي</SelectItem>
                          <SelectItem value="إعلان ممول">إعلان ممول وهمي (Fake Door)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between">
              <Button onClick={prevStep} variant="ghost">السابق</Button>
              <Button onClick={nextStep} size="lg" disabled={hypotheses.some(h => !h.testType)}>إعداد التجارب <ArrowLeft className="size-4 mr-2" /></Button>
            </div>
          </div>
        )}

        {/* Stage 5: Setup */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2 mb-8 text-center">
              <Workflow className="size-10 text-primary mx-auto mb-2" />
              <h2 className="text-3xl font-black">المرحلة الخامسة: إعداد التجارب</h2>
              <p className="text-muted-foreground">حدد معالم كل تجربة بدقة لكي تتمكن من قياسها لاحقاً.</p>
            </div>

            <div className="space-y-6">
              {hypotheses.map((h) => (
                <Card key={h.id} className="shadow-none border-primary/20">
                  <CardHeader className="pb-3 border-b border-border/50">
                    <CardTitle className="text-base text-primary flex items-center gap-2">
                      {h.testType === 'مقابلات' && <Users className="size-5" />}
                      {h.testType === 'صفحة هبوط' && <LayoutGrid className="size-5" />}
                      {h.testType === 'MVP' && <Rocket className="size-5" />}
                      إعداد تجربة: {h.testType}
                    </CardTitle>
                    <CardDescription>{h.text}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    {h.testType === 'مقابلات' && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>العدد المستهدف للمقابلات</Label>
                          <Input type="number" placeholder="مثال: 10" value={h.setup.targetCount || ''} onChange={(e) => updateHypothesis(h.id, { setup: { ...h.setup, targetCount: e.target.value } })} />
                        </div>
                        <div className="space-y-2">
                          <Label>الفئة المستهدفة</Label>
                          <Input placeholder="مثال: أصحاب مطاعم صغيرة" value={h.setup.segment || ''} onChange={(e) => updateHypothesis(h.id, { setup: { ...h.setup, segment: e.target.value } })} />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label>أهم سؤالين ستطرحهما</Label>
                          <Textarea placeholder="1. كيف تحل المشكلة اليوم؟&#10;2. كم تنفق عليها؟" value={h.setup.questions || ''} onChange={(e) => updateHypothesis(h.id, { setup: { ...h.setup, questions: e.target.value } })} />
                        </div>
                      </div>
                    )}

                    {h.testType === 'صفحة هبوط' && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2 sm:col-span-2">
                          <Label>رسالة الصفحة (Headline)</Label>
                          <Input placeholder="مثال: أول نظام محاسبي يفهم مطعمك." value={h.setup.headline || ''} onChange={(e) => updateHypothesis(h.id, { setup: { ...h.setup, headline: e.target.value } })} />
                        </div>
                        <div className="space-y-2">
                          <Label>نص زر الدعوة (CTA)</Label>
                          <Input placeholder="مثال: سجل في القائمة البريدية" value={h.setup.cta || ''} onChange={(e) => updateHypothesis(h.id, { setup: { ...h.setup, cta: e.target.value } })} />
                        </div>
                        <div className="space-y-2">
                          <Label>الزوار المستهدفين (للاختبار)</Label>
                          <Input type="number" placeholder="مثال: 500" value={h.setup.visitors || ''} onChange={(e) => updateHypothesis(h.id, { setup: { ...h.setup, visitors: e.target.value } })} />
                        </div>
                      </div>
                    )}

                    {(h.testType !== 'مقابلات' && h.testType !== 'صفحة هبوط') && (
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label>ما الذي ستبنيه/تفعله بالضبط؟</Label>
                          <Textarea placeholder="وصف التجربة..." value={h.setup.desc || ''} onChange={(e) => updateHypothesis(h.id, { setup: { ...h.setup, desc: e.target.value } })} />
                        </div>
                        <div className="space-y-2">
                          <Label>المؤشر المستهدف للنجاح</Label>
                          <Input placeholder="مثال: الحصول على 5 مبيعات" value={h.setup.successMetric || ''} onChange={(e) => updateHypothesis(h.id, { setup: { ...h.setup, successMetric: e.target.value } })} />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between">
              <Button onClick={prevStep} variant="ghost">السابق</Button>
              <Button onClick={nextStep} size="lg">محاكاة إجراء التجارب <Clock className="size-4 mr-2" /></Button>
            </div>
          </div>
        )}

        {/* Stage 6: Results Input */}
        {step === 6 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2 mb-8 text-center">
              <CheckCircle2 className="size-10 text-primary mx-auto mb-2" />
              <h2 className="text-3xl font-black">المرحلة السادسة: إدخال النتائج</h2>
              <p className="text-muted-foreground">لنفترض أنك أجريت التجارب. أدخل الأرقام الواقعية التي حصلت عليها.</p>
            </div>

            <div className="space-y-6">
              {hypotheses.map((h) => (
                <Card key={h.id} className="shadow-none border-border/50 bg-muted/10">
                  <CardHeader className="pb-3 border-b border-border/50">
                    <CardTitle className="text-base text-foreground flex items-center gap-2">
                      نتائج تجربة: {h.testType}
                    </CardTitle>
                    <CardDescription className="line-clamp-1">{h.text}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    {h.testType === 'مقابلات' && (
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>إجمالي الأشخاص</Label>
                          <Input type="number" placeholder="20" value={h.results.total || ''} onChange={(e) => updateHypothesis(h.id, { results: { ...h.results, total: e.target.value } })} />
                        </div>
                        <div className="space-y-2">
                          <Label>أكدوا المشكلة (نعم)</Label>
                          <Input type="number" placeholder="16" value={h.results.yes || ''} onChange={(e) => updateHypothesis(h.id, { results: { ...h.results, yes: e.target.value } })} />
                        </div>
                        <div className="space-y-2">
                          <Label>أبدوا استعداداً للدفع</Label>
                          <Input type="number" placeholder="5" value={h.results.paid || ''} onChange={(e) => updateHypothesis(h.id, { results: { ...h.results, paid: e.target.value } })} />
                        </div>
                      </div>
                    )}

                    {h.testType === 'صفحة هبوط' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>عدد الزوار الفعلي (Visitors)</Label>
                          <Input type="number" placeholder="500" value={h.results.visitors || ''} onChange={(e) => updateHypothesis(h.id, { results: { ...h.results, visitors: e.target.value } })} />
                        </div>
                        <div className="space-y-2">
                          <Label>عدد المسجلين (Signups/Clicks)</Label>
                          <Input type="number" placeholder="20" value={h.results.signups || ''} onChange={(e) => updateHypothesis(h.id, { results: { ...h.results, signups: e.target.value } })} />
                        </div>
                      </div>
                    )}

                    {(h.testType !== 'مقابلات' && h.testType !== 'صفحة هبوط') && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>الرقم المستهدف</Label>
                          <Input type="number" placeholder="مثال: 100" value={h.results.target || ''} onChange={(e) => updateHypothesis(h.id, { results: { ...h.results, target: e.target.value } })} />
                        </div>
                        <div className="space-y-2">
                          <Label>الرقم المحقق فعلياً</Label>
                          <Input type="number" placeholder="مثال: 45" value={h.results.metric || ''} onChange={(e) => updateHypothesis(h.id, { results: { ...h.results, metric: e.target.value } })} />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between">
              <Button onClick={prevStep} variant="ghost">السابق</Button>
              <Button onClick={calculateAnalysis} size="lg">تحليل البيانات <PieChart className="size-4 mr-2" /></Button>
            </div>
          </div>
        )}

        {/* Stage 7: Analysis */}
        {step === 7 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2 mb-8 text-center">
              <PieChart className="size-10 text-primary mx-auto mb-2" />
              <h2 className="text-3xl font-black">المرحلة السابعة: تحليل النتائج</h2>
              <p className="text-muted-foreground">حساب معدلات النجاح واستخلاص النتائج وفق قواعد محددة.</p>
            </div>

            <div className="space-y-4">
              {hypotheses.map((h) => {
                const isSuccess = h.analysis && h.analysis.successRate >= 60;
                const isFail = h.analysis && h.analysis.successRate < 40;
                return (
                  <Card key={h.id} className={`shadow-none border ${isSuccess ? 'bg-emerald-500/5 border-emerald-500/20' : isFail ? 'bg-red-500/5 border-red-500/20' : 'bg-amber-500/5 border-amber-500/20'}`}>
                    <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-1 space-y-2 text-center md:text-right w-full">
                        <Badge variant="outline" className={isSuccess ? 'text-emerald-700' : isFail ? 'text-red-700' : 'text-amber-700'}>
                          نسبة التحقق: {h.analysis?.successRate}%
                        </Badge>
                        <p className="font-semibold text-foreground text-sm mt-2">{h.text}</p>
                        <p className="text-sm text-muted-foreground leading-6">{h.analysis?.explanation}</p>
                      </div>
                      <div className="shrink-0 text-center space-y-2">
                        <div className={`text-4xl font-black ${isSuccess ? 'text-emerald-600' : isFail ? 'text-red-600' : 'text-amber-600'}`}>
                          {h.analysis?.successRate}%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-between">
              <Button onClick={prevStep} variant="ghost">السابق</Button>
              <Button onClick={nextStep} size="lg">صناعة القرار <ArrowLeft className="size-4 mr-2" /></Button>
            </div>
          </div>
        )}

        {/* Stage 8: Decision */}
        {step === 8 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2 mb-8 text-center">
              <ArrowRightCircle className="size-10 text-primary mx-auto mb-2" />
              <h2 className="text-3xl font-black">المرحلة الثامنة: القرار (ماذا بعد؟)</h2>
              <p className="text-muted-foreground">جوهر Lean Startup هو التعلم واتخاذ قرار بالاستمرار، التعديل، أو التغيير الجذري (Pivot).</p>
            </div>

            <div className="space-y-4 mb-8">
              {hypotheses.map((h) => (
                <Card key={h.id} className="shadow-none border-border/50">
                  <CardContent className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground mb-1">الفرضية ({h.analysis?.successRate}%):</p>
                      <p className="text-xs text-muted-foreground">{h.text}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant={h.decision === 'continue' ? 'default' : 'outline'} size="sm" className={h.decision === 'continue' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'text-emerald-600 border-emerald-200'} onClick={() => updateHypothesis(h.id, { decision: 'continue' })}>استمر</Button>
                      <Button variant={h.decision === 'tweak' ? 'default' : 'outline'} size="sm" className={h.decision === 'tweak' ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'text-amber-600 border-amber-200'} onClick={() => updateHypothesis(h.id, { decision: 'tweak' })}>عدّل</Button>
                      <Button variant={h.decision === 'pivot' ? 'default' : 'outline'} size="sm" className={h.decision === 'pivot' ? 'bg-red-600 hover:bg-red-700 text-white' : 'text-red-600 border-red-200'} onClick={() => updateHypothesis(h.id, { decision: 'pivot' })}>غيّر الاتجاه</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Overall Decision Box */}
            {hypotheses.every(h => h.decision) && (
              <Card className="bg-primary/5 border-primary/20 animate-in zoom-in-95 duration-500">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="inline-flex items-center justify-center p-4 bg-background rounded-full mb-2">
                    <Rocket className="size-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground">الخطوة القادمة لمشروعك</h3>
                  <div className="text-lg font-semibold text-primary">
                    متوسط نجاح الفرضيات: {getOverallReadiness()}%
                  </div>
                  <p className="text-muted-foreground leading-7 max-w-xl mx-auto">
                    {getOverallReadiness() > 70
                      ? 'النتائج ممتازة والأدلة تدعم الاستمرار. نوصي بالانتقال إلى بناء نموذج العمل التجاري (Business Model Canvas) أو النموذج الاحترافي لحساب التكاليف.'
                      : getOverallReadiness() > 40
                        ? 'النتائج متفاوتة. يجب إعادة صياغة الفرضيات التي فشلت وتصميم تجارب جديدة للتحقق منها قبل بناء المنتج.'
                        : 'الفرضيات الأساسية لم تثبت صحتها. نوصي بتغيير الشريحة المستهدفة أو تعديل فكرة المشروع جذرياً (Pivot) بدلاً من حرق رأس المال.'}
                  </p>

                  <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
                    <Button onClick={() => window.location.reload()} variant="outline">بدء دورة تعلم جديدة</Button>
                    {getOverallReadiness() > 70 && (
                      <Button>الانتقال للنموذج الاحترافي <ArrowLeft className="size-4 mr-2" /></Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-start">
              <Button onClick={prevStep} variant="ghost">السابق</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
