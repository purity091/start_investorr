import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  Download,
  Flame,
  Globe,
  Info,
  Layers,
  Minus,
  PieChart,
  RefreshCw,
  Rocket,
  Sparkles,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';

interface BenchmarkRange {
  min: number;
  avg: number;
  max: number;
  unit: string;
  higherIsBetter: boolean;
}

interface SectorBenchmark {
  sector: string;
  sectorAr: string;
  accent: string;
  icon: React.ElementType;
  metrics: Record<string, BenchmarkRange>;
}

const BENCHMARK_LIBRARY: Record<string, SectorBenchmark> = {
  saas: {
    sector: 'SaaS',
    sectorAr: 'البرمجيات كخدمة',
    accent: 'text-indigo-700 bg-indigo-50',
    icon: Layers,
    metrics: {
      revenueGrowth: { min: 20, avg: 85, max: 300, unit: '%/yr', higherIsBetter: true },
      grossMargin: { min: 50, avg: 72, max: 90, unit: '%', higherIsBetter: true },
      cac: { min: 50, avg: 300, max: 800, unit: '$', higherIsBetter: false },
      ltv: { min: 500, avg: 2400, max: 8000, unit: '$', higherIsBetter: true },
      burnRate: { min: 30, avg: 150, max: 500, unit: 'k$/mo', higherIsBetter: false },
      churnRate: { min: 1, avg: 5, max: 12, unit: '%/mo', higherIsBetter: false },
      marketSize: { min: 100, avg: 800, max: 5000, unit: '$M', higherIsBetter: true },
      nrrRetention: { min: 95, avg: 110, max: 140, unit: '%', higherIsBetter: true },
    },
  },
  ecommerce: {
    sector: 'E-Commerce',
    sectorAr: 'التجارة الإلكترونية',
    accent: 'text-amber-700 bg-amber-50',
    icon: DollarSign,
    metrics: {
      revenueGrowth: { min: 15, avg: 55, max: 200, unit: '%/yr', higherIsBetter: true },
      grossMargin: { min: 20, avg: 38, max: 60, unit: '%', higherIsBetter: true },
      cac: { min: 10, avg: 45, max: 120, unit: '$', higherIsBetter: false },
      ltv: { min: 50, avg: 250, max: 900, unit: '$', higherIsBetter: true },
      burnRate: { min: 20, avg: 100, max: 400, unit: 'k$/mo', higherIsBetter: false },
      churnRate: { min: 5, avg: 20, max: 40, unit: '%/yr', higherIsBetter: false },
      marketSize: { min: 200, avg: 1200, max: 8000, unit: '$M', higherIsBetter: true },
      nrrRetention: { min: 80, avg: 92, max: 105, unit: '%', higherIsBetter: true },
    },
  },
  fintech: {
    sector: 'FinTech',
    sectorAr: 'التقنية المالية',
    accent: 'text-emerald-700 bg-emerald-50',
    icon: Activity,
    metrics: {
      revenueGrowth: { min: 30, avg: 100, max: 400, unit: '%/yr', higherIsBetter: true },
      grossMargin: { min: 40, avg: 60, max: 80, unit: '%', higherIsBetter: true },
      cac: { min: 30, avg: 180, max: 600, unit: '$', higherIsBetter: false },
      ltv: { min: 300, avg: 1800, max: 6000, unit: '$', higherIsBetter: true },
      burnRate: { min: 50, avg: 200, max: 700, unit: 'k$/mo', higherIsBetter: false },
      churnRate: { min: 2, avg: 8, max: 18, unit: '%/yr', higherIsBetter: false },
      marketSize: { min: 500, avg: 2000, max: 10000, unit: '$M', higherIsBetter: true },
      nrrRetention: { min: 90, avg: 115, max: 145, unit: '%', higherIsBetter: true },
    },
  },
  marketplace: {
    sector: 'Marketplace',
    sectorAr: 'المنصات والأسواق',
    accent: 'text-sky-700 bg-sky-50',
    icon: Users,
    metrics: {
      revenueGrowth: { min: 25, avg: 90, max: 350, unit: '%/yr', higherIsBetter: true },
      grossMargin: { min: 30, avg: 55, max: 75, unit: '%', higherIsBetter: true },
      cac: { min: 20, avg: 120, max: 400, unit: '$', higherIsBetter: false },
      ltv: { min: 100, avg: 800, max: 3000, unit: '$', higherIsBetter: true },
      burnRate: { min: 40, avg: 180, max: 600, unit: 'k$/mo', higherIsBetter: false },
      churnRate: { min: 3, avg: 10, max: 25, unit: '%/yr', higherIsBetter: false },
      marketSize: { min: 300, avg: 1500, max: 9000, unit: '$M', higherIsBetter: true },
      nrrRetention: { min: 85, avg: 105, max: 130, unit: '%', higherIsBetter: true },
    },
  },
};

const MOCK_PLAN_METRICS: Record<string, Record<string, number>> = {
  saas: { revenueGrowth: 62, grossMargin: 68, cac: 380, ltv: 1900, burnRate: 120, churnRate: 6.5, marketSize: 450, nrrRetention: 108 },
  ecommerce: { revenueGrowth: 40, grossMargin: 32, cac: 55, ltv: 180, burnRate: 80, churnRate: 22, marketSize: 800, nrrRetention: 90 },
  fintech: { revenueGrowth: 85, grossMargin: 55, cac: 220, ltv: 1400, burnRate: 180, churnRate: 10, marketSize: 1200, nrrRetention: 112 },
  marketplace: { revenueGrowth: 70, grossMargin: 48, cac: 150, ltv: 600, burnRate: 140, churnRate: 12, marketSize: 900, nrrRetention: 100 },
};

const METRIC_LABELS: Record<string, { ar: string; icon: React.ElementType }> = {
  revenueGrowth: { ar: 'نمو الإيرادات', icon: TrendingUp },
  grossMargin: { ar: 'هامش الربح', icon: PieChart },
  cac: { ar: 'تكلفة اكتساب العميل', icon: Target },
  ltv: { ar: 'القيمة الدائمة للعميل', icon: Star },
  burnRate: { ar: 'الحرق النقدي', icon: Flame },
  churnRate: { ar: 'تسرب العملاء', icon: TrendingDown },
  marketSize: { ar: 'حجم السوق', icon: Globe },
  nrrRetention: { ar: 'الاحتفاظ الصافي', icon: Activity },
};

const STATUS = {
  strong: { label: 'قوي', className: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
  moderate: { label: 'متوسط', className: 'bg-amber-50 text-amber-700', icon: Minus },
  weak: { label: 'يحتاج تطوير', className: 'bg-rose-50 text-rose-700', icon: AlertTriangle },
};

function computeMetricScore(value: number, benchmark: BenchmarkRange) {
  const { min, avg, max, higherIsBetter } = benchmark;
  const normalized = higherIsBetter
    ? Math.min(1, Math.max(0, (value - min) / (max - min)))
    : Math.min(1, Math.max(0, (max - value) / (max - min)));
  const score = Math.round(normalized * 100);
  const status: keyof typeof STATUS = score >= 65 ? 'strong' : score >= 35 ? 'moderate' : 'weak';

  const percentile = higherIsBetter
    ? value >= avg
      ? 50 + Math.round(((value - avg) / (max - avg)) * 45)
      : Math.round(((value - min) / (avg - min)) * 50)
    : value <= avg
      ? 50 + Math.round(((avg - value) / (avg - min)) * 45)
      : Math.round(((max - value) / (max - avg)) * 50);

  return { score, status, percentile: Math.max(5, Math.min(95, percentile)) };
}

function generateInsights(planMetrics: Record<string, number>, benchmarks: Record<string, BenchmarkRange>) {
  return Object.entries(planMetrics).slice(0, 5).map(([key, value]) => {
    const benchmark = benchmarks[key];
    const label = METRIC_LABELS[key]?.ar ?? key;
    const score = computeMetricScore(value, benchmark);

    if (score.status === 'strong') {
      return {
        type: 'strong' as const,
        text: `${label} أعلى من مستوى جيد في هذا القطاع. هذا مؤشر يمكن استخدامه في عرض الاستثمار كقوة واضحة.`,
      };
    }

    if (score.status === 'weak') {
      return {
        type: 'weak' as const,
        text: `${label} أقل من معيار القطاع. تحسين هذا المؤشر سيؤثر مباشرة على جاذبية المشروع وقابلية نموه.`,
      };
    }

    return {
      type: 'moderate' as const,
      text: `${label} ضمن نطاق مقبول، لكنه يحتاج ضبطاً قبل اعتباره ميزة تنافسية قوية.`,
    };
  });
}

const AnimatedCounter: React.FC<{ target: number }> = ({ target }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = Math.max(1, target / 36);
    const timer = window.setInterval(() => {
      start += step;
      if (start >= target) {
        setCurrent(target);
        window.clearInterval(timer);
      } else {
        setCurrent(Math.round(start));
      }
    }, 16);

    return () => window.clearInterval(timer);
  }, [target]);

  return <>{current}</>;
};

const RadarChart = ({ scores }: { scores: number[] }) => {
  const size = 280;
  const center = size / 2;
  const radius = 96;
  const step = (2 * Math.PI) / scores.length;
  const toPoint = (index: number, value: number) => {
    const angle = index * step;
    return {
      x: center + radius * (value / 100) * Math.sin(angle),
      y: center - radius * (value / 100) * Math.cos(angle),
    };
  };
  const polygon = scores.map((score, index) => toPoint(index, score)).map((point) => `${point.x},${point.y}`).join(' ');

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto aspect-square w-full max-w-[280px]" role="img" aria-label="رسم رادار الأداء">
      {[0.25, 0.5, 0.75, 1].map((ring) => {
        const points = scores.map((_, index) => toPoint(index, ring * 100)).map((point) => `${point.x},${point.y}`).join(' ');
        return <polygon key={ring} points={points} fill="none" stroke="hsl(var(--border))" strokeWidth="1" />;
      })}
      {scores.map((_, index) => {
        const point = toPoint(index, 100);
        return <line key={index} x1={center} y1={center} x2={point.x} y2={point.y} stroke="hsl(var(--border))" strokeWidth="1" />;
      })}
      <polygon points={polygon} fill="oklch(0.205 0 0 / 0.08)" stroke="oklch(0.205 0 0)" strokeWidth="2" />
      {scores.map((score, index) => {
        const point = toPoint(index, score);
        return <circle key={index} cx={point.x} cy={point.y} r="4" fill="oklch(0.205 0 0)" />;
      })}
    </svg>
  );
};

export const UnicornBenchmarking: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState('saas');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  const sectorData = BENCHMARK_LIBRARY[selectedSector];
  const planMetrics = MOCK_PLAN_METRICS[selectedSector];
  const metricKeys = Object.keys(sectorData.metrics);
  const metricScores = useMemo(
    () => metricKeys.map((key) => computeMetricScore(planMetrics[key], sectorData.metrics[key])),
    [metricKeys, planMetrics, sectorData.metrics],
  );
  const overallScore = Math.round(metricScores.reduce((sum, item) => sum + item.score, 0) / metricScores.length);
  const scoreStatus = overallScore >= 65 ? 'strong' : overallScore >= 40 ? 'moderate' : 'weak';
  const insights = generateInsights(planMetrics, sectorData.metrics);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setHasAnalyzed(false);
    window.setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 900);
  };

  return (
    <div dir="rtl" className="app-page-shell-wide space-y-6 py-8 text-right">
      <section className="rounded-lg bg-background px-1 py-2">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-4xl">
            <Badge variant="secondary" className="h-7 px-3 text-[11px]">
              معيار نمو الشركات عالية القيمة
            </Badge>
            <h1 className="mt-4 text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              رادار اليونيكورن
            </h1>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-muted-foreground">
              قارن مؤشرات مشروعك مع نماذج مرجعية للشركات الناشئة عالية النمو. الصفحة تعرض قراءة عملية للجاهزية
              الاستثمارية بدون واجهة داكنة أو عمود جانبي مشتت.
            </p>
          </div>
          <Button type="button" onClick={handleAnalyze} disabled={isAnalyzing}>
            {isAnalyzing ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} />}
            {isAnalyzing ? 'جارٍ التحليل...' : 'تشغيل المقارنة'}
          </Button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Object.entries(BENCHMARK_LIBRARY).map(([key, sector]) => {
            const Icon = sector.icon;
            const isActive = selectedSector === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelectedSector(key);
                  setHasAnalyzed(false);
                  setExpandedMetric(null);
                }}
                className={`rounded-lg p-4 text-right transition ${
                  isActive ? 'bg-primary text-primary-foreground shadow-sm ring-2 ring-ring/20' : 'bg-muted/55 text-foreground hover:bg-muted'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`rounded-md p-2 ${isActive ? 'bg-primary-foreground/15' : sector.accent}`}>
                    <Icon size={18} />
                  </span>
                  {isActive ? <CheckCircle2 size={16} /> : null}
                </div>
                <p className="mt-4 text-[11px] font-semibold opacity-70">{sector.sector}</p>
                <p className="mt-1 text-sm font-black">{sector.sectorAr}</p>
              </button>
            );
          })}
        </div>
      </section>

      {isAnalyzing ? (
        <section className="rounded-lg bg-muted/55 p-8 text-center">
          <RefreshCw className="mx-auto animate-spin text-muted-foreground" size={28} />
          <h2 className="mt-4 text-lg font-black text-foreground">جاري قراءة مؤشرات المشروع</h2>
          <p className="mt-2 text-sm font-medium text-muted-foreground">يتم تجهيز مقارنة مختصرة مع معيار القطاع المحدد.</p>
        </section>
      ) : null}

      {!hasAnalyzed && !isAnalyzing ? (
        <section className="rounded-lg bg-muted/55 p-8 text-center">
          <BarChart3 className="mx-auto text-muted-foreground" size={34} />
          <h2 className="mt-4 text-lg font-black text-foreground">ابدأ من اختيار القطاع</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-7 text-muted-foreground">
            اختر القطاع الأقرب للمشروع ثم شغّل المقارنة لعرض المؤشرات، الرادار، والتوصيات التنفيذية.
          </p>
        </section>
      ) : null}

      {hasAnalyzed ? (
        <div className="space-y-6">
          <section className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-lg bg-background p-5 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-muted-foreground">درجة المعايرة</p>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-6xl font-black text-foreground">
                  <AnimatedCounter target={overallScore} />
                </span>
                <span className="pb-2 text-xl font-black text-muted-foreground">/100</span>
              </div>
              <span className={`mt-4 inline-flex rounded-md px-2.5 py-1 text-xs font-bold ${STATUS[scoreStatus].className}`}>
                {STATUS[scoreStatus].label}
              </span>
              <p className="mt-4 text-sm font-medium leading-7 text-muted-foreground">
                هذه الدرجة تلخص قرب مؤشرات المشروع من متوسط الشركات عالية النمو في قطاع {sectorData.sectorAr}.
              </p>
            </div>

            <div className="rounded-lg bg-background p-5 shadow-sm lg:col-span-2">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-black text-foreground">رادار الأداء المقارن</h2>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">قراءة سريعة لمواطن القوة والفجوات.</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download size={16} />
                  تصدير القراءة
                </Button>
              </div>
              <RadarChart scores={metricScores.map((item) => item.score)} />
            </div>
          </section>

          <section className="rounded-lg bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-foreground">مصفوفة المؤشرات</h2>
                <p className="mt-1 text-sm font-medium text-muted-foreground">اضغط على أي مؤشر لعرض نطاق المعيار.</p>
              </div>
              <Badge variant="secondary">{sectorData.sectorAr}</Badge>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {metricKeys.map((key, index) => {
                const benchmark = sectorData.metrics[key];
                const score = metricScores[index];
                const MetricIcon = METRIC_LABELS[key]?.icon ?? BarChart3;
                const StatusIcon = STATUS[score.status].icon;
                const isExpanded = expandedMetric === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setExpandedMetric(isExpanded ? null : key)}
                    className="rounded-lg bg-muted/55 p-4 text-right transition hover:bg-muted"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-md bg-background p-2 text-foreground shadow-sm">
                        <MetricIcon size={17} />
                      </span>
                      <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold ${STATUS[score.status].className}`}>
                        <StatusIcon size={13} />
                        {STATUS[score.status].label}
                      </span>
                    </div>
                    <h3 className="mt-4 text-sm font-black text-foreground">{METRIC_LABELS[key]?.ar}</h3>
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-medium text-muted-foreground">قيمة المشروع</p>
                        <p className="mt-1 text-lg font-black text-foreground">{planMetrics[key]} {benchmark.unit}</p>
                      </div>
                      <p className="text-sm font-black text-muted-foreground">{score.score}%</p>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-background">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${score.score}%` }} />
                    </div>
                    {isExpanded ? (
                      <div className="mt-4 space-y-2 rounded-lg bg-background p-3 text-[12px] font-medium text-muted-foreground">
                        <div className="flex justify-between"><span>الحد الأدنى</span><span>{benchmark.min} {benchmark.unit}</span></div>
                        <div className="flex justify-between"><span>المتوسط</span><span>{benchmark.avg} {benchmark.unit}</span></div>
                        <div className="flex justify-between"><span>الأداء المتميز</span><span>{benchmark.max} {benchmark.unit}</span></div>
                        <div className="flex justify-between text-foreground"><span>أفضل من</span><span>{score.percentile}%</span></div>
                      </div>
                    ) : null}
                    <ChevronDown className={`mx-auto mt-3 text-muted-foreground transition ${isExpanded ? 'rotate-180' : ''}`} size={15} />
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-lg bg-background p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-muted p-2 text-foreground"><Sparkles size={18} /></span>
              <div>
                <h2 className="text-lg font-black text-foreground">توصيات القراءة</h2>
                <p className="text-sm font-medium text-muted-foreground">مخرجات موجزة تساعد المبرمج لاحقاً في بناء المنطق الحقيقي.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {insights.map((insight, index) => {
                const Icon = STATUS[insight.type].icon;
                return (
                  <div key={index} className="rounded-lg bg-muted/55 p-4">
                    <div className="flex items-start gap-3">
                      <span className={`rounded-md p-2 ${STATUS[insight.type].className}`}>
                        <Icon size={16} />
                      </span>
                      <p className="text-sm font-medium leading-7 text-muted-foreground">{insight.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="flex items-start gap-2 rounded-lg bg-muted/55 p-4 text-sm font-medium leading-7 text-muted-foreground">
            <Info className="mt-1 shrink-0" size={16} />
            <p>الأرقام الحالية واجهة مرجعية فقط، والربط الفعلي مع بيانات المشروع أو قواعد السوق سيتم لاحقاً من قبل المبرمج.</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
