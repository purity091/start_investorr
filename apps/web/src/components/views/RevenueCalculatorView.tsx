"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { PageHeader } from '@/components/ui/PageHeader';
import { cn } from '@/lib/utils';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  ArrowLeft, 
  Save, 
  Sparkles, 
  CheckCircle2, 
  BarChart3, 
  PieChart, 
  RefreshCw, 
  Target,
  FileSpreadsheet,
  ShieldCheck,
  Info
} from 'lucide-react';

import { useProjectWorkspace } from '@/features/workspace/ProjectWorkspaceContext';
import { WorkspaceFinancialEstimate } from '@/types';

interface RevenueCalculatorViewProps {
  setActiveTab?: (tab: string) => void;
}

export const RevenueCalculatorView: React.FC<RevenueCalculatorViewProps> = ({ setActiveTab }) => {
  let projectWorkspaceContext: ReturnType<typeof useProjectWorkspace> | null = null;
  try {
    projectWorkspaceContext = useProjectWorkspace();
  } catch {
    projectWorkspaceContext = null;
  }

  // Calculator Model Type
  const [modelType, setModelType] = useState<'saas' | 'sales'>('saas');

  // SaaS Calculator Inputs
  const [subscribers, setSubscribers] = useState<number>(250);
  const [pricePerMonth, setPricePerMonth] = useState<number>(49);
  const [churnRate, setChurnRate] = useState<number>(3.0);
  const [cac, setCac] = useState<number>(120); // Customer Acquisition Cost
  const [monthlyExpense, setMonthlyExpense] = useState<number>(3500); // Fixed Monthly OpEx

  // One-time Sales Inputs
  const [monthlyOrders, setMonthlyOrders] = useState<number>(400);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(85);
  const [cogsPercentage, setCogsPercentage] = useState<number>(40); // Cost of Goods Sold %

  const [isSaved, setIsSaved] = useState(false);

  // Calculations
  const metrics = useMemo(() => {
    if (modelType === 'saas') {
      const mrr = subscribers * pricePerMonth;
      const arr = mrr * 12;
      const ltv = churnRate > 0 ? (pricePerMonth / (churnRate / 100)) : 0;
      const ltvCacRatio = cac > 0 ? (ltv / cac) : 0;
      const paybackMonths = pricePerMonth > 0 ? Math.ceil(cac / pricePerMonth) : 0;
      const annualOpEx = monthlyExpense * 12;
      const netProfitAnnual = Math.max(0, arr - annualOpEx);
      const netMargin = arr > 0 ? ((netProfitAnnual / arr) * 100) : 0;

      return {
        mrr: Math.round(mrr),
        arr: Math.round(arr),
        ltv: Math.round(ltv),
        ltvCacRatio: parseFloat(ltvCacRatio.toFixed(1)),
        paybackMonths,
        annualOpEx: Math.round(annualOpEx),
        netProfitAnnual: Math.round(netProfitAnnual),
        netMargin: Math.round(netMargin)
      };
    } else {
      const grossMonthlyRevenue = monthlyOrders * avgOrderValue;
      const grossAnnualRevenue = grossMonthlyRevenue * 12;
      const cogsMonthly = grossMonthlyRevenue * (cogsPercentage / 100);
      const grossProfitMonthly = grossMonthlyRevenue - cogsMonthly;
      const annualOpEx = monthlyExpense * 12;
      const netProfitAnnual = Math.max(0, (grossProfitMonthly * 12) - annualOpEx);
      const netMargin = grossAnnualRevenue > 0 ? ((netProfitAnnual / grossAnnualRevenue) * 100) : 0;

      return {
        mrr: Math.round(grossMonthlyRevenue),
        arr: Math.round(grossAnnualRevenue),
        ltv: Math.round(avgOrderValue * 2.5),
        ltvCacRatio: 3.2,
        paybackMonths: 1,
        annualOpEx: Math.round(annualOpEx),
        netProfitAnnual: Math.round(netProfitAnnual),
        netMargin: Math.round(netMargin)
      };
    }
  }, [modelType, subscribers, pricePerMonth, churnRate, cac, monthlyExpense, monthlyOrders, avgOrderValue, cogsPercentage]);

  const handleSaveToWorkspace = () => {
    setIsSaved(true);

    if (projectWorkspaceContext) {
      const { workspace, updateWorkspace } = projectWorkspaceContext;
      const existingEstimates = workspace.financialEstimates || [];

      const newEstimate: WorkspaceFinancialEstimate = {
        id: `est-${Date.now()}`,
        modelType,
        modelTitle: modelType === 'saas' ? 'نموذج اشتراكات SaaS المتكررة' : 'نموذج المبيعات والخدمات المباشرة',
        mrr: metrics.mrr,
        arr: metrics.arr,
        ltv: metrics.ltv,
        cac: modelType === 'saas' ? cac : 0,
        ltvCacRatio: metrics.ltvCacRatio,
        paybackMonths: metrics.paybackMonths,
        monthlyExpense,
        annualOpEx: metrics.annualOpEx,
        netProfitAnnual: metrics.netProfitAnnual,
        netMargin: metrics.netMargin,
        feasibilityGrade: metrics.ltvCacRatio >= 3.0 ? 'ممتازة (3x+)' : 'تستدعي التحسين',
        savedAt: new Date().toISOString(),
      };

      const filtered = existingEstimates.filter((est) => est.modelType !== modelType);
      const updatedEstimates = [newEstimate, ...filtered];

      const updatedKpis = [...(workspace.execution.kpis || [])];
      const mrrKpiIndex = updatedKpis.findIndex((k) => k.id === 'fin-kpi-mrr' || k.label.includes('الإيراد الشهري'));
      if (mrrKpiIndex >= 0) {
        updatedKpis[mrrKpiIndex] = {
          ...updatedKpis[mrrKpiIndex],
          value: `$${metrics.mrr.toLocaleString()}`,
          insight: `محدث بحسب تقديرات ${newEstimate.modelTitle}`,
        };
      } else {
        updatedKpis.push({
          id: 'fin-kpi-mrr',
          label: 'الإيراد الشهري (MRR)',
          value: `$${metrics.mrr.toLocaleString()}`,
          target: `$${(metrics.mrr * 1.5).toLocaleString()}`,
          insight: `تقدير حي مأخوذ من حاسبة الأرباح والمؤشرات.`,
        });
      }

      updateWorkspace({
        financialEstimates: updatedEstimates,
        execution: {
          ...workspace.execution,
          kpis: updatedKpis,
        },
      });
    }

    setTimeout(() => setIsSaved(false), 4000);
  };

  return (
    <div dir="rtl" className="w-full space-y-6 pb-12">
      
      {/* Page Header */}
      <PageHeader
        title="حاسبة الأرباح والمؤشرات المالية"
        description="نموذج تحليلي تفاعلي مخصص لتقدير الإيرادات المتكررة، التكاليف التشغيلية، القيمة الممتدة للعميل (LTV)، وهامش الربح السنوي للمشروع."
        badge="ملحقات المشروع"
        actions={[
          {
            label: isSaved ? "تم الحفظ في كراسة المشروع" : "حفظ التقديرات في المشروع",
            onClick: handleSaveToWorkspace,
            variant: isSaved ? "secondary" : "default",
            icon: isSaved ? <CheckCircle2 className="size-4 text-emerald-600" /> : <Save className="size-4" />
          }
        ]}
      />

      {/* Model Selection Toolbar */}
      <Card className="p-4 border-border shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
              <BarChart3 className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">نوع نموذج العمل المالي</h3>
              <p className="text-xs text-muted-foreground">اختر نوع نموذج الإيراد الخاص بمشروعك لضبط المدخلات</p>
            </div>
          </div>

          <div className="inline-flex p-1 rounded-lg bg-muted border border-border text-xs font-semibold gap-1 w-full sm:w-auto">
            <button
              onClick={() => setModelType('saas')}
              className={cn(
                "px-3.5 py-1.5 rounded-md transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none cursor-pointer",
                modelType === 'saas' 
                  ? "bg-background text-foreground font-bold shadow-xs border border-border" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <RefreshCw className="size-3.5" />
              اشتراكات متكررة (SaaS)
            </button>
            <button
              onClick={() => setModelType('sales')}
              className={cn(
                "px-3.5 py-1.5 rounded-md transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none cursor-pointer",
                modelType === 'sales' 
                  ? "bg-background text-foreground font-bold shadow-xs border border-border" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <PieChart className="size-3.5" />
              مبيعات / خدمات مباشرة
            </button>
          </div>
        </div>
      </Card>

      {/* Key Financial Cards Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* MRR Card */}
        <Card className="border-border shadow-xs">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted-foreground">الإيراد الشهري (MRR)</span>
              <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <DollarSign className="size-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-foreground">${metrics.mrr.toLocaleString()}</div>
            <p className="text-[11px] text-muted-foreground mt-1">الدخل المتوقع شهرياً من العمليات</p>
          </CardContent>
        </Card>

        {/* ARR Card */}
        <Card className="border-border shadow-xs">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted-foreground">الإيراد السنوي (ARR)</span>
              <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="size-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-emerald-600">${metrics.arr.toLocaleString()}</div>
            <p className="text-[11px] text-muted-foreground mt-1">معدل الإيراد المتكرر سنوياً</p>
          </CardContent>
        </Card>

        {/* Annual Net Profit */}
        <Card className="border-border shadow-xs">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted-foreground">صافي الربح السنوي المتوقع</span>
              <div className="size-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <Sparkles className="size-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-purple-600">${metrics.netProfitAnnual.toLocaleString()}</div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1">
              <span>هامش الربح الصافي:</span>
              <span className="font-bold text-foreground">{metrics.netMargin}%</span>
            </div>
          </CardContent>
        </Card>

        {/* LTV & Health Indicator */}
        <Card className="border-border shadow-xs">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted-foreground">قيمة العميل (LTV)</span>
              <div className="size-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Target className="size-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-foreground">${metrics.ltv.toLocaleString()}</div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="outline" className="text-[10px] font-semibold">
                نسبة LTV/CAC: {metrics.ltvCacRatio}x
              </Badge>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Main Interactive Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="border-border shadow-xs">
            <CardHeader className="p-5 border-b border-border">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Calculator className="size-4 text-primary" />
                مدخلات التقدير المالي
              </CardTitle>
              <CardDescription className="text-xs">عدّل الأرقام أدناه لمشاهدة تأثيرها المباشر على المؤشرات المالية</CardDescription>
            </CardHeader>

            <CardContent className="p-5 space-y-5">
              
              {modelType === 'saas' ? (
                <>
                  {/* Subscriber Count Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <label className="text-foreground">عدد المشتركين الفاعلين</label>
                      <span className="text-xs text-muted-foreground">مشترك</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min={1}
                        max={50000}
                        value={subscribers}
                        onChange={(e) => setSubscribers(Math.max(1, Number(e.target.value)))}
                        className="w-28 text-left text-xs font-bold"
                      />
                      <input 
                        type="range" 
                        min="10" 
                        max="5000" 
                        step="10"
                        value={subscribers} 
                        onChange={(e) => setSubscribers(Number(e.target.value))}
                        className="flex-1 accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Monthly Subscription Price */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <label className="text-foreground">سعر الاشتراك الشهري ($)</label>
                      <span className="text-xs text-muted-foreground">دولار / شهر</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min={1}
                        max={5000}
                        value={pricePerMonth}
                        onChange={(e) => setPricePerMonth(Math.max(1, Number(e.target.value)))}
                        className="w-28 text-left text-xs font-bold"
                      />
                      <input 
                        type="range" 
                        min="5" 
                        max="1000" 
                        step="5"
                        value={pricePerMonth} 
                        onChange={(e) => setPricePerMonth(Number(e.target.value))}
                        className="flex-1 accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Churn Rate Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <label className="text-foreground">معدل التخلي الشهري (Churn Rate %)</label>
                      <span className="text-xs text-muted-foreground">% شهرياً</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        step="0.1"
                        min={0}
                        max={50}
                        value={churnRate}
                        onChange={(e) => setChurnRate(Math.max(0, Number(e.target.value)))}
                        className="w-28 text-left text-xs font-bold"
                      />
                      <input 
                        type="range" 
                        min="0.5" 
                        max="15" 
                        step="0.5"
                        value={churnRate} 
                        onChange={(e) => setChurnRate(Number(e.target.value))}
                        className="flex-1 accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* CAC Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <label className="text-foreground">تكلفة الاستحواذ على العميل (CAC $)</label>
                      <span className="text-xs text-muted-foreground">دولار / عميل</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min={0}
                        max={5000}
                        value={cac}
                        onChange={(e) => setCac(Math.max(0, Number(e.target.value)))}
                        className="w-28 text-left text-xs font-bold"
                      />
                      <input 
                        type="range" 
                        min="10" 
                        max="1000" 
                        step="10"
                        value={cac} 
                        onChange={(e) => setCac(Number(e.target.value))}
                        className="flex-1 accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Monthly Orders Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <label className="text-foreground">المبيعات / الطلبات الشهرية</label>
                      <span className="text-xs text-muted-foreground">طلب / شهرياً</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min={1}
                        max={100000}
                        value={monthlyOrders}
                        onChange={(e) => setMonthlyOrders(Math.max(1, Number(e.target.value)))}
                        className="w-28 text-left text-xs font-bold"
                      />
                      <input 
                        type="range" 
                        min="20" 
                        max="10000" 
                        step="50"
                        value={monthlyOrders} 
                        onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                        className="flex-1 accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Average Order Value Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <label className="text-foreground">متوسط قيمة الطلب (AOV $)</label>
                      <span className="text-xs text-muted-foreground">دولار / طلب</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min={1}
                        max={10000}
                        value={avgOrderValue}
                        onChange={(e) => setAvgOrderValue(Math.max(1, Number(e.target.value)))}
                        className="w-28 text-left text-xs font-bold"
                      />
                      <input 
                        type="range" 
                        min="10" 
                        max="2000" 
                        step="10"
                        value={avgOrderValue} 
                        onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                        className="flex-1 accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* COGS Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <label className="text-foreground">نسبة تكلفة المنتجات (COGS %)</label>
                      <span className="text-xs text-muted-foreground">% من الإيراد</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min={0}
                        max={95}
                        value={cogsPercentage}
                        onChange={(e) => setCogsPercentage(Math.max(0, Number(e.target.value)))}
                        className="w-28 text-left text-xs font-bold"
                      />
                      <input 
                        type="range" 
                        min="10" 
                        max="80" 
                        step="5"
                        value={cogsPercentage} 
                        onChange={(e) => setCogsPercentage(Number(e.target.value))}
                        className="flex-1 accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Monthly Fixed OpEx */}
              <div className="space-y-2 pt-3 border-t border-border">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <label className="text-foreground">المصاريف التشغيلية الثابتة شهرياً (OpEx $)</label>
                  <span className="text-xs text-muted-foreground">دولار / شهرياً</span>
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    min={0}
                    max={100000}
                    value={monthlyExpense}
                    onChange={(e) => setMonthlyExpense(Math.max(0, Number(e.target.value)))}
                    className="w-28 text-left text-xs font-bold"
                  />
                  <input 
                    type="range" 
                    min="500" 
                    max="20000" 
                    step="500"
                    value={monthlyExpense} 
                    onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                    className="flex-1 accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">تشمل إيجار الخوادم، رواتب الفريق، والتسويق الثابت.</p>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right Analysis & Projections Column */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Detailed Financial Breakdown Card */}
          <Card className="border-border shadow-xs">
            <CardHeader className="p-5 border-b border-border">
              <CardTitle className="text-base font-bold flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileSpreadsheet className="size-4 text-emerald-600" />
                  جدول التدفق المالي التقديري (12 شهر)
                </span>
                <Badge variant="secondary" className="text-[11px] font-semibold">تقدير سنوي</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              
              <div className="space-y-2 text-xs font-medium">
                <div className="flex justify-between p-3 rounded-lg bg-muted/40 border border-border">
                  <span className="text-muted-foreground">إجمالي الإيرادات السنوية (Gross Revenue):</span>
                  <span className="font-extrabold text-foreground">${metrics.arr.toLocaleString()}</span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-muted/40 border border-border">
                  <span className="text-muted-foreground">التكاليف التشغيلية السنوية (Annual OpEx):</span>
                  <span className="font-extrabold text-destructive">-${metrics.annualOpEx.toLocaleString()}</span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-foreground font-bold">
                  <span>صافي الربح السنوي النهائي (Net Profit):</span>
                  <span className="text-sm font-black text-emerald-600">${metrics.netProfitAnnual.toLocaleString()}</span>
                </div>
              </div>

              {/* Feasibility Assessment Alert */}
              <div className="p-4 rounded-xl bg-card border border-border shadow-xs space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary" />
                  <h4 className="text-xs font-bold text-foreground">تقييم الجاهزية والاستثمارية:</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  {metrics.ltvCacRatio >= 3.0 ? (
                    <span className="text-emerald-600 font-semibold">
                      ✨ مؤشرات ممتازة جداً! نسبة LTV/CAC تبلغ ({metrics.ltvCacRatio}x) وهو معدل يتجاوز المعيار العالمي المطلوب للمستثمرين (3.0x).
                    </span>
                  ) : (
                    <span className="text-amber-600 font-semibold">
                      ⚠️ يحتاج تحسين: نسبة LTV/CAC تبلغ ({metrics.ltvCacRatio}x). يُفضل زيادة سعر الاشتراك أو خفض تكلفة الاستحواذ لزيادة الهامش.
                    </span>
                  )}
                </p>
              </div>

              {/* Next Steps CTA */}
              <div className="pt-2">
                <Button 
                  onClick={() => setActiveTab?.('workspace')}
                  className="w-full font-bold text-xs h-10 gap-2 shadow-xs cursor-pointer"
                >
                  ربط التقديرات بالمساحة التنفيذية للمشروع
                  <ArrowLeft className="size-4" />
                </Button>
              </div>

            </CardContent>
          </Card>

          {/* Quick Guidance Box */}
          <div className="p-5 rounded-xl bg-muted/30 border border-border space-y-3">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
              <Info className="size-4 text-primary" />
              كيف تحسب مؤشرات مشروعك بدقة؟
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>MRR:</strong> يمثل الدخل الذي يمكنك الاعتماد عليه كل بداية شهر من الاشتراكات.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>LTV/CAC Ratio:</strong> المقياس الذهبي للمستثمرين؛ يوضح كم دولاراً يولده العميل مقابل كل دولار تُنفقه للاستحواذ عليه.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
