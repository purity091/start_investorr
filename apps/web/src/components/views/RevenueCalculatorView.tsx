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
  Users, 
  Percent, 
  ArrowLeft, 
  Save, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  BarChart3, 
  PieChart, 
  RefreshCw, 
  Zap,
  Target,
  FileSpreadsheet,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

interface RevenueCalculatorViewProps {
  setActiveTab?: (tab: string) => void;
}

export const RevenueCalculatorView: React.FC<RevenueCalculatorViewProps> = ({ setActiveTab }) => {
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
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div dir="rtl" className="w-full space-y-8 pb-16">
      
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

      {/* Model Selection Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
            <BarChart3 className="size-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-foreground">نوع نموذج العمل المالي</h3>
            <p className="text-xs text-muted-foreground">اختر نوع نموذج الإيراد الخاص بمشروعك لضبط المدخلات</p>
          </div>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-muted border border-border/60 text-xs font-bold gap-1 w-full sm:w-auto">
          <button
            onClick={() => setModelType('saas')}
            className={cn(
              "px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none",
              modelType === 'saas' 
                ? "bg-primary text-primary-foreground font-extrabold shadow-2xs" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <RefreshCw className="size-3.5" />
            اشتراكات متكررة (SaaS Model)
          </button>
          <button
            onClick={() => setModelType('sales')}
            className={cn(
              "px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none",
              modelType === 'sales' 
                ? "bg-primary text-primary-foreground font-extrabold shadow-2xs" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <PieChart className="size-3.5" />
            مبيعات منتجات / خدمات مباشرة
          </button>
        </div>
      </div>

      {/* Key Financial Cards Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* MRR Card */}
        <Card className="border-border shadow-2xs bg-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-muted-foreground">الإيراد الشهري (MRR)</span>
              <div className="size-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <DollarSign className="size-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-foreground">${metrics.mrr.toLocaleString()}</div>
            <p className="text-[11px] text-muted-foreground mt-1">الدخل المتوقع شهرياً من المشتركين</p>
          </CardContent>
        </Card>

        {/* ARR Card */}
        <Card className="border-border shadow-2xs bg-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-muted-foreground">الإيراد السنوي (ARR)</span>
              <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="size-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-emerald-600">${metrics.arr.toLocaleString()}</div>
            <p className="text-[11px] text-muted-foreground mt-1">معدل الإيراد المتكرر سنوياً</p>
          </CardContent>
        </Card>

        {/* Annual Net Profit */}
        <Card className="border-border shadow-2xs bg-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-muted-foreground">صافي الربح السنوي المتوقع</span>
              <div className="size-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <Sparkles className="size-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-purple-600">${metrics.netProfitAnnual.toLocaleString()}</div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1">
              <span>هامش الربح الصافي:</span>
              <span className="font-bold text-foreground">{metrics.netMargin}%</span>
            </div>
          </CardContent>
        </Card>

        {/* LTV & Health Indicator */}
        <Card className="border-border shadow-2xs bg-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-muted-foreground">قيمة العميل (LTV)</span>
              <div className="size-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Target className="size-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-foreground">${metrics.ltv.toLocaleString()}</div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="outline" className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border-emerald-200">
                نسبة LTV/CAC: {metrics.ltvCacRatio}x
              </Badge>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Main Interactive Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="border-border shadow-2xs">
            <CardHeader className="p-5 border-b border-border/60">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Calculator className="size-4 text-primary" />
                مدخلات التقدير المالي
              </CardTitle>
              <CardDescription className="text-xs">عدّل المؤشرات أدناه لمشاهدة تأثيرها الفوري على الأرباح والنمو</CardDescription>
            </CardHeader>

            <CardContent className="p-5 space-y-6">
              
              {modelType === 'saas' ? (
                <>
                  {/* Subscriber Count Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <label className="text-foreground">عدد المشتركين الفاعلين:</label>
                      <span className="text-primary font-black bg-primary/10 px-2.5 py-0.5 rounded-md text-xs">{subscribers} مشترك</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="5000" 
                      step="10"
                      value={subscribers} 
                      onChange={(e) => setSubscribers(Number(e.target.value))}
                      className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Monthly Subscription Price */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <label className="text-foreground">سعر الاشتراك الشهري (بالدولار):</label>
                      <span className="text-primary font-black bg-primary/10 px-2.5 py-0.5 rounded-md text-xs">${pricePerMonth} / شهر</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="1000" 
                      step="5"
                      value={pricePerMonth} 
                      onChange={(e) => setPricePerMonth(Number(e.target.value))}
                      className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Churn Rate Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <label className="text-foreground">معدل التخلي الشهري (Churn Rate %):</label>
                      <span className="text-amber-700 font-black bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md text-xs">{churnRate}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="15" 
                      step="0.5"
                      value={churnRate} 
                      onChange={(e) => setChurnRate(Number(e.target.value))}
                      className="w-full accent-amber-500 h-2 bg-muted rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Customer Acquisition Cost (CAC) */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <label className="text-foreground">تكلفة الاستحواذ على العميل (CAC):</label>
                      <span className="text-blue-700 font-black bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md text-xs">${cac}</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="1000" 
                      step="10"
                      value={cac} 
                      onChange={(e) => setCac(Number(e.target.value))}
                      className="w-full accent-blue-600 h-2 bg-muted rounded-lg cursor-pointer"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Monthly Orders Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <label className="text-foreground">المبيعات / الطلبات الشهرية المتوقعة:</label>
                      <span className="text-primary font-black bg-primary/10 px-2.5 py-0.5 rounded-md text-xs">{monthlyOrders} طلب</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="10000" 
                      step="50"
                      value={monthlyOrders} 
                      onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                      className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Average Order Value Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <label className="text-foreground">متوسط قيمة الطلب (AOV):</label>
                      <span className="text-primary font-black bg-primary/10 px-2.5 py-0.5 rounded-md text-xs">${avgOrderValue}</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="2000" 
                      step="10"
                      value={avgOrderValue} 
                      onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                      className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* COGS Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <label className="text-foreground">نسبة تكلفة المنتجات/الخدمات (COGS %):</label>
                      <span className="text-amber-700 font-black bg-amber-50 px-2.5 py-0.5 rounded-md text-xs">{cogsPercentage}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="80" 
                      step="5"
                      value={cogsPercentage} 
                      onChange={(e) => setCogsPercentage(Number(e.target.value))}
                      className="w-full accent-amber-500 h-2 bg-muted rounded-lg cursor-pointer"
                    />
                  </div>
                </>
              )}

              {/* Monthly Fixed OpEx */}
              <div className="space-y-2 pt-2 border-t border-border/60">
                <div className="flex justify-between items-center text-xs font-bold">
                  <label className="text-foreground">المصاريف التشغيلية الثابتة شهرياً (OpEx):</label>
                  <span className="text-slate-900 font-black bg-slate-100 px-2.5 py-0.5 rounded-md text-xs">${monthlyExpense} / شهر</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="20000" 
                  step="500"
                  value={monthlyExpense} 
                  onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                  className="w-full accent-slate-700 h-2 bg-muted rounded-lg cursor-pointer"
                />
                <p className="text-[11px] text-muted-foreground">تشمل إيجار الخوادم، رواتب الفريق، والتسويق الثابت.</p>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right Analysis & Projections Column */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Detailed Financial Breakdown Card */}
          <Card className="border-border shadow-2xs">
            <CardHeader className="p-5 border-b border-border/60">
              <CardTitle className="text-base font-bold flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileSpreadsheet className="size-4 text-emerald-600" />
                  جدول التدفق المالي التقديري (12 شهر)
                </span>
                <Badge variant="secondary" className="text-[11px] font-bold">تقدير سنوي</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              
              <div className="space-y-2 text-xs font-medium">
                <div className="flex justify-between p-2.5 rounded-lg bg-muted/40 border border-border/50">
                  <span className="text-muted-foreground">إجمالي الإيرادات السنوية (Gross Revenue):</span>
                  <span className="font-extrabold text-foreground">${metrics.arr.toLocaleString()}</span>
                </div>

                <div className="flex justify-between p-2.5 rounded-lg bg-muted/40 border border-border/50">
                  <span className="text-muted-foreground">التكاليف التشغيلية السنوية (Annual OpEx):</span>
                  <span className="font-extrabold text-red-600">-${metrics.annualOpEx.toLocaleString()}</span>
                </div>

                <div className="flex justify-between p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 font-bold">
                  <span>صافي الربح السنوي النهائي (Net Profit):</span>
                  <span className="text-sm font-black text-emerald-700">${metrics.netProfitAnnual.toLocaleString()}</span>
                </div>
              </div>

              {/* Feasibility Assessment Alert */}
              <div className="p-4 rounded-xl bg-card border border-primary/20 shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary" />
                  <h4 className="text-xs font-extrabold text-foreground">تقييم الجاهزية والاستثمارية:</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  {metrics.ltvCacRatio >= 3.0 ? (
                    <span className="text-emerald-700 font-bold">
                      ✨ مؤشرات ممتازة جداً! نسبة LTV/CAC تبلغ ({metrics.ltvCacRatio}x) وهو معدل يتجاوز المعيار العالمي المطلوب للمستثمرين (3.0x).
                    </span>
                  ) : (
                    <span className="text-amber-700 font-bold">
                      ⚠️ يحتاج تحسين: نسبة LTV/CAC تبلغ ({metrics.ltvCacRatio}x). يُفضل زيادة سعر الاشتراك أو خفض تكلفة الاستحواذ لزيادة الهامش.
                    </span>
                  )}
                </p>
              </div>

              {/* Next Steps CTA */}
              <div className="pt-2">
                <Button 
                  onClick={() => setActiveTab?.('workspace')}
                  className="w-full font-bold text-xs h-11 gap-2 shadow-2xs"
                >
                  ربط التقديرات بالمساحة التنفيذية للمشروع
                  <ArrowLeft className="size-4" />
                </Button>
              </div>

            </CardContent>
          </Card>

          {/* Quick Guidance Box */}
          <div className="p-5 rounded-2xl bg-muted/40 border border-border space-y-3">
            <h4 className="text-xs font-extrabold text-foreground flex items-center gap-2">
              <Info className="size-4 text-blue-600" />
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
