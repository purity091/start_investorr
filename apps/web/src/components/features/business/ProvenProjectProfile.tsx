import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Globe,
  ExternalLink,
  Lightbulb,
  Rocket,
  Settings,
  Building2,
  UserCircle2,
  Code,
  ShieldCheck,
  FileText,
  Check,
  TrendingUp,
  Database,
  Cloud,
  Bot,
  CreditCard,
  Layout,
  MonitorPlay,
  Mails,
  Link as LinkIcon,
  Boxes,
  Zap,
  BookOpen,
  Fingerprint,
  ChevronDown,
  ChevronUp,
  Users,
  AlertTriangle,
  PieChart,
  HelpCircle,
  Award,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProvenProjectProps {
  project: any;
  onBack: () => void;
}

const getCountryInfo = (location: string) => {
  if (!location) return { name: 'عالمي', flag: '🌍' };
  const loc = location.toLowerCase();

  if (loc.includes('السعودية') || loc.includes('saudi') || loc.includes('مكة') || loc.includes('الرياض') || loc.includes('جدة')) {
    return { name: 'المملكة العربية السعودية', flag: '🇸🇦' };
  }
  if (loc.includes('مصر') || loc.includes('القاهرة') || loc.includes('النوبارية') || loc.includes('البحيرة') || loc.includes('قنا') || loc.includes('egypt')) {
    return { name: 'مصر', flag: '🇪🇬' };
  }
  if (loc.includes('الإمارات') || loc.includes('دبي') || loc.includes('أبوظبي') || loc.includes('uae') || loc.includes('dubai')) {
    return { name: 'الإمارات العربية المتحدة', flag: '🇦🇪' };
  }
  if (loc.includes('الأردن') || loc.includes('عمّان') || loc.includes('عمان') || loc.includes('jordan')) {
    return { name: 'الأردن', flag: '🇯🇴' };
  }
  if (loc.includes('الكويت') || loc.includes('kuwait')) {
    return { name: 'الكويت', flag: '🇰🇼' };
  }
  if (loc.includes('قطر') || loc.includes('الدوحة') || loc.includes('qatar')) {
    return { name: 'قطر', flag: '🇶🇦' };
  }
  if (loc.includes('البحرين') || loc.includes('المنامة') || loc.includes('bahrain')) {
    return { name: 'البحرين', flag: '🇧🇭' };
  }
  if (loc.includes('المغرب') || loc.includes('الدار البيضاء') || loc.includes('morocco')) {
    return { name: 'المغرب', flag: '🇲🇦' };
  }
  if (loc.includes('الجزائر') || loc.includes('algeria')) {
    return { name: 'الجزائر', flag: '🇩🇿' };
  }
  if (loc.includes('لبنان') || loc.includes('بيروت') || loc.includes('lebanon')) {
    return { name: 'لبنان', flag: '🇱🇧' };
  }
  if (
    loc.includes('florida') || loc.includes('atlanta') || loc.includes('united states') || loc.includes('usa') ||
    loc.includes('california') || loc.includes('نيويورك') || loc.includes('سان فرانسيسكو') || loc.includes('مينلو بارك') ||
    loc.includes('بيتسبرغ') || loc.includes('لوس أنجلوس') || loc.includes('لوس جاتوس') || loc.includes('لوس غاتوس') ||
    loc.includes('جورجيا') || loc.includes('أورلاندو') || loc.includes('san francisco') || loc.includes('new york') || loc.includes('us')
  ) {
    return { name: 'الولايات المتحدة', flag: '🇺🇸' };
  }
  if (loc.includes('uk') || loc.includes('london') || loc.includes('المملكة المتحدة') || loc.includes('بريطانيا')) {
    return { name: 'المملكة المتحدة', flag: '🇬🇧' };
  }
  if (loc.includes('canada') || loc.includes('أوتاوا') || loc.includes('كندا')) {
    return { name: 'كندا', flag: '🇨🇦' };
  }
  if (loc.includes('singapore') || loc.includes('سنغافورة')) {
    return { name: 'سنغافورة', flag: '🇸🇬' };
  }
  if (loc.includes('فرنسا') || loc.includes('france') || loc.includes('باريس')) {
    return { name: 'فرنسا', flag: '🇫🇷' };
  }
  if (loc.includes('السويد') || loc.includes('ستوكهولم') || loc.includes('sweden')) {
    return { name: 'السويد', flag: '🇸🇪' };
  }
  if (loc.includes('أستراليا') || loc.includes('سيدني') || loc.includes('australia')) {
    return { name: 'أستراليا', flag: '🇦🇺' };
  }
  if (loc.includes('أوكرانيا') || loc.includes('ukraine')) {
    return { name: 'أوكرانيا', flag: '🇺🇦' };
  }
  if (loc.includes('غير مذكور') || loc.includes('غير مؤكد') || loc.includes('غير متاح')) {
    return { name: 'غير محدد', flag: '🌐' };
  }

  return { name: 'عالمي', flag: '🌍' };
};

const getToolBranding = (tool: string) => {
  const t = tool.toLowerCase();

  if (t.includes('mongo') || t.includes('mysql') || t.includes('postgres') || t.includes('prisma') || t.includes('supabase') || t.includes('planetscale')) {
    return { icon: <Database className="size-3.5" />, label: tool };
  }
  if (t.includes('aws') || t.includes('google cloud') || t.includes('digitalocean') || t.includes('vercel')) {
    return { icon: <Cloud className="size-3.5" />, label: tool };
  }
  if (t.includes('openai') || t.includes('claude') || t.includes('gpt') || t.includes('elevenlabs') || t.includes('ai') || t.includes('ذكاء')) {
    return { icon: <Bot className="size-3.5" />, label: tool };
  }
  if (t.includes('stripe') || t.includes('payment') || t.includes('مدفوعات') || t.includes('paypal')) {
    return { icon: <CreditCard className="size-3.5" />, label: tool };
  }
  if (t.includes('tailwind') || t.includes('css') || t.includes('webflow') || t.includes('framer') || t.includes('design')) {
    return { icon: <Layout className="size-3.5" />, label: tool };
  }
  if (t.includes('auth') || t.includes('magic link') || t.includes('security') || t.includes('مصادقة')) {
    return { icon: <Fingerprint className="size-3.5" />, label: tool };
  }
  if (t.includes('email') || t.includes('mailgun') || t.includes('postmark') || t.includes('intercom') || t.includes('slack') || t.includes('بريد')) {
    return { icon: <Mails className="size-3.5" />, label: tool };
  }
  if (t.includes('youtube') || t.includes('wistia') || t.includes('video')) {
    return { icon: <MonitorPlay className="size-3.5" />, label: tool };
  }
  if (t.includes('zapier') || t.includes('make') || t.includes('automation') || t.includes('أتمتة')) {
    return { icon: <Zap className="size-3.5" />, label: tool };
  }
  if (t.includes('notion') || t.includes('linear') || t.includes('gitbook') || t.includes('canny')) {
    return { icon: <BookOpen className="size-3.5" />, label: tool };
  }
  if (t.includes('react') || t.includes('next') || t.includes('node') || t.includes('angular') || t.includes('.net') || t.includes('typescript') || t.includes('javascript') || t.includes('تطبيقات') || t.includes('موبايل')) {
    return { icon: <Boxes className="size-3.5" />, label: tool };
  }

  return { icon: <Code className="size-3.5" />, label: tool };
};

const getDisplayText = (value: unknown): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return value.map(getDisplayText).filter(Boolean).join('، ');
  if (typeof value !== 'object') return String(value);

  const record = value as Record<string, unknown>;
  const title = getDisplayText(record.title || record.name || record.label || record.metric || record.date);
  const description = getDisplayText(
    record.description ||
    record.text ||
    record.note ||
    record.summary ||
    record.value ||
    record.amount ||
    record.examples,
  );

  if (title && description) return `${title}: ${description}`;
  if (title) return title;
  if (description) return description;

  return Object.entries(record)
    .map(([key, itemValue]) => {
      const text = getDisplayText(itemValue);
      return text ? `${key}: ${text}` : '';
    })
    .filter(Boolean)
    .join('، ');
};

const getValuationText = (value: unknown): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toLocaleString('en-US');
  if (Array.isArray(value)) return value.map(getValuationText).filter(Boolean).join('، ');
  if (typeof value !== 'object') return String(value);

  const record = value as Record<string, unknown>;
  const preferredKeys = [
    'official_current_valuation',
    'current_valuation',
    'current_value_usd',
    'current_implied_valuation_usd',
    'current_market_cap_usd',
    'latest_publicly_reported_valuation_usd',
    'historical_value_usd',
    'historical_claim',
    'broadcast_deal_implied_valuation',
    'broadcast_ask_implied_valuation',
    'note',
    'status',
  ];

  for (const key of preferredKeys) {
    const text = getValuationText(record[key]);
    if (text) return text;
  }

  const firstReadable = Object.values(record).map(getValuationText).find(Boolean);
  return firstReadable || '';
};

const getShortRevenueDisplay = (value: unknown) => {
  const revenueStr = getValuationText(value);
  if (!revenueStr) return '-';
  if (revenueStr.length < 25) return revenueStr;

  const amountMatch = revenueStr.match(/(\$\d+(?:\.\d+)?\s*(?:B|M|K)?|نحو \d+(?:\.\d+)?\s*(?:مليار|ملايين|مليون|ألف)\s*(?:دولار|درهم|جنيه)?)/i);
  if (amountMatch) return amountMatch[0];

  if (revenueStr.includes('غير معلن') || revenueStr.includes('غير متوفر')) return 'غير مفصح رسمياً';
  if (revenueStr.includes('مغلق')) return 'مغلق';

  return revenueStr.slice(0, 22) + '...';
};

const getShortTrafficDisplay = (value: unknown) => {
  const trafficStr = getValuationText(value);
  if (!trafficStr) return '-';
  if (trafficStr.length < 25) return trafficStr;

  const trafficMatch = trafficStr.match(/(\d+(?:\.\d+)?\s*(?:B|M|K|مليون|ألف)\s*(?:عميل|زائر|مستخدم|بريد|مشترك)?)/i);
  if (trafficMatch) return trafficMatch[0];

  if (trafficStr.includes('غير معلن') || trafficStr.includes('غير متوفر') || trafficStr.includes('غير مناسب')) return 'غير مفصح رسمياً';

  return trafficStr.slice(0, 22) + '...';
};

const getShortValuationDisplay = (value: unknown) => {
  const valStr = getValuationText(value);
  if (!valStr) return '-';
  if (valStr.length < 25) return valStr;

  const valMatch = valStr.match(/(\$\d+(?:\.\d+)?\s*(?:B|M|K)?|\d+(?:\.\d+)?\s*(?:مليار|ملايين|مليون|ألف)\s*(?:دولار|درهم|جنيه)?)/i);
  if (valMatch) return valMatch[0];

  if (valStr.includes('Nasdaq') || valStr.includes('عامة')) return 'شركة عامة';
  if (valStr.includes('لم تكشف') || valStr.includes('غير معلن') || valStr.includes('غير متوفر')) return 'غير مفصح رسمياً';

  return valStr.slice(0, 22) + '...';
};

const toTextList = (value: unknown): string[] => {
  if (!value) return [];
  const values = Array.isArray(value) ? value : [value];
  return values.map(getDisplayText).filter(Boolean);
};

export const ProvenProjectProfile: React.FC<ProvenProjectProps> = ({ project: rawProject, onBack }) => {
  const [isSourcesOpen, setIsSourcesOpen] = useState<boolean>(false);

  const evidenceMap = rawProject.evidence_map || {};

  // Normalize project structure
  const company = rawProject.company || {};
  const financials = rawProject.financials || {};
  const snapshot = rawProject.directory_snapshot || {};
  const analysis = rawProject.analysis || null;
  const verification = rawProject.verification || null;

  const problemAndProductList = Array.isArray(rawProject.problem_and_product)
    ? rawProject.problem_and_product
    : (rawProject.problem_and_product ? [rawProject.problem_and_product] : []);

  const originStoryList = Array.isArray(rawProject.origin_story)
    ? rawProject.origin_story
    : (rawProject.origin_story ? [rawProject.origin_story] : []);

  const buildAndLaunchList = Array.isArray(rawProject.build_and_launch)
    ? rawProject.build_and_launch
    : (rawProject.build_and_launch ? [rawProject.build_and_launch] : []);

  const costsAndOperationsList = Array.isArray(rawProject.costs_and_operations)
    ? rawProject.costs_and_operations
    : (rawProject.costs_and_operations ? [rawProject.costs_and_operations] : []);

  const monetizationList = Array.isArray(rawProject.monetization)
    ? rawProject.monetization
    : (financials.revenue_streams ? financials.revenue_streams : []);

  const growthList = Array.isArray(rawProject.growth)
    ? rawProject.growth
    : (rawProject.growth ? [rawProject.growth] : []);

  const toolsList = toTextList(rawProject.tools || []);

  const revenueTimelineList = rawProject.revenue_timeline || (
    snapshot.monthly_revenue ? [
      {
        date: 'الإيراد الموثق',
        amount: getShortRevenueDisplay(snapshot.monthly_revenue),
        type: 'إفصاح موثق',
        note: company.public_revenue_claim || snapshot.monthly_revenue
      }
    ] : []
  );

  const lessonsList = (rawProject.lessons || []).map((l: any) => {
    if (typeof l === 'string') {
      const parts = l.split(': ');
      return {
        title: parts.length > 1 ? parts[0] : 'درس مستفاد',
        description: parts.length > 1 ? parts.slice(1).join(': ') : l
      };
    }
    return {
      title: getDisplayText(l.title || l.name) || 'درس مستفاد',
      description: getDisplayText(l.description || l.text || l.note || l.examples || '')
    };
  });

  const dataQualityList = toTextList(rawProject.data_quality || (verification?.important_notes || []));

  // Collect all sources for collapsed panel
  const allSourcesList: Array<{ title: string; url: string; publisher?: string; locator?: string; supports?: string }> = [];

  (rawProject.sources || []).forEach((src: any) => {
    allSourcesList.push({
      title: src.title || src.label || 'مصدر رسمي',
      url: src.url,
      publisher: src.publisher || src.coverage,
      supports: Array.isArray(src.supports) ? src.supports.join(' • ') : src.supports
    });
  });

  Object.values(evidenceMap).forEach((evItem: any) => {
    if (evItem?.source_references && Array.isArray(evItem.source_references)) {
      evItem.source_references.forEach((ref: any) => {
        if (ref?.url && !allSourcesList.some(s => s.url === ref.url)) {
          allSourcesList.push({
            title: ref.title || 'مرجع إثبات',
            url: ref.url,
            publisher: ref.publisher,
            locator: ref.source_locator,
            supports: ref.supports
          });
        }
      });
    }
  });

  const foundersText = getDisplayText(company.founder || company.founders) || 'غير مذكور رسمياً';
  const foundersCountText = company.founders_count
    ? `${company.founders_count} مؤسسين`
    : (company.founder || company.founders ? 'مؤسسو الشركة' : 'غير مذكور');
  const employeesText = getDisplayText(company.employees) || 'غير مفصح عنه';
  const locationInfo = getCountryInfo(getDisplayText(company.location));

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 font-sans pb-24">

      {/* Top Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="gap-2 font-medium text-foreground cursor-pointer"
        >
          <ArrowRight className="size-4" />
          <span>العودة لدليل الشركات</span>
        </Button>
      </div>

      {/* Standardized Fixed Hero Section */}
      <Card className="border-border/60 shadow-xs overflow-hidden">
        <CardHeader className="bg-card p-5 sm:p-6 border-b border-border/40 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center size-14 rounded-xl bg-primary text-primary-foreground text-xl font-bold shrink-0">
                {rawProject.name?.charAt(0).toUpperCase()}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                    {rawProject.name}
                  </h1>
                  {verification && (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-300 font-medium text-xs flex items-center gap-1">
                      <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
                      <span>موثق بمصادر رسمية</span>
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {rawProject.category && (
                    <Badge variant="secondary" className="font-medium text-xs">
                      {rawProject.category}
                    </Badge>
                  )}
                  <Badge variant="outline" className="font-medium text-xs flex items-center gap-1">
                    <span>{locationInfo.flag}</span>
                    <span>{locationInfo.name}</span>
                  </Badge>
                  {rawProject.website && (
                    <a
                      href={rawProject.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <span>الموقع الرسمي</span>
                      <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {rawProject.headline && (
            <p className="text-sm font-semibold text-foreground leading-relaxed pt-2 border-t border-border/40">
              {rawProject.headline}
            </p>
          )}

          {rawProject.summary && (
            <p className="text-sm text-muted-foreground font-normal leading-relaxed">
              {rawProject.summary}
            </p>
          )}
        </CardHeader>

        {/* Standardized Fixed 4 KPI Cards Grid */}
        <CardContent className="p-4 sm:p-6 bg-muted/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-card border border-border/60 flex flex-col justify-between gap-1">
              <span className="text-xs font-semibold text-muted-foreground">الإيراد الشهري</span>
              <span className="text-lg font-bold text-emerald-600 dir-ltr text-right">
                {getShortRevenueDisplay(snapshot.monthly_revenue)}
              </span>
              <span className="text-xs text-muted-foreground font-normal truncate">
                {company.public_revenue_claim ? 'إفصاح مؤخر' : 'بيانات موثقة'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border/60 flex flex-col justify-between gap-1">
              <span className="text-xs font-semibold text-muted-foreground">الزيارات والانتشار</span>
              <span className="text-lg font-bold text-foreground dir-ltr text-right">
                {getShortTrafficDisplay(snapshot.monthly_traffic)}
              </span>
              <span className="text-xs text-muted-foreground font-normal truncate">مؤشر حركة شهري</span>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border/60 flex flex-col justify-between gap-1">
              <span className="text-xs font-semibold text-muted-foreground">نموذج التمويل</span>
              <span className="text-sm font-bold text-foreground truncate" title={getDisplayText(company.funding || financials.initial_investment)}>
                {getDisplayText(company.funding) || (financials.initial_investment ? 'جولة تمويلية' : 'تمويل ذاتي')}
              </span>
              <span className="text-xs text-muted-foreground font-normal truncate">
                {company.bootstrapped ? 'Bootstrapped' : 'هيكل التمويل'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border/60 flex flex-col justify-between gap-1">
              <span className="text-xs font-semibold text-muted-foreground">التقييم الحالي</span>
              <span className="text-sm font-bold text-foreground truncate" title={getValuationText(financials.valuation)}>
                {getShortValuationDisplay(financials.valuation)}
              </span>
              <span className="text-xs text-muted-foreground font-normal truncate">التقييم والسوق</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Standardized Unified Main Navigation Tabs */}
      <Tabs defaultValue="overview" className="w-full space-y-6">
        <TabsList className="w-full justify-start h-12 bg-muted/60 p-1 rounded-xl border border-border/60 overflow-x-auto">
          <TabsTrigger value="overview" className="gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg cursor-pointer">
            <Building2 className="size-4" />
            <span>حقائق الشركة ورأس المال</span>
          </TabsTrigger>
          <TabsTrigger value="product" className="gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg cursor-pointer">
            <Lightbulb className="size-4" />
            <span>المشكلة والحل التقني</span>
          </TabsTrigger>
          <TabsTrigger value="growth" className="gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg cursor-pointer">
            <TrendingUp className="size-4" />
            <span>النمو والعمليات والتسعير</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg cursor-pointer">
            <Award className="size-4" />
            <span>التحليل الاستراتيجي والدروس</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Company Facts & Overview */}
        <TabsContent value="overview" className="space-y-6 outline-none">
          <Card className="border-border/60 shadow-xs">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <Building2 className="size-4 text-primary" />
                <span>حقائق الشركة الهيكلية والموقع</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-border/40">
                <div className="p-4 sm:p-5 space-y-1.5">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">نموذج العمل والربح</span>
                  <p className="text-sm font-bold text-foreground">{getDisplayText(company.customer_type) || 'نموذج التشغيل والتسويق'}</p>
                  <p className="text-sm text-muted-foreground font-normal leading-relaxed">{getDisplayText(company.business_model) || 'غير مفصح عنه رسمياً'}</p>
                </div>
                <div className="p-4 sm:p-5 space-y-1.5">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">المقر والتأسيس</span>
                  <p className="text-sm font-bold text-foreground">{locationInfo.flag} {locationInfo.name}</p>
                  <p className="text-sm text-muted-foreground font-normal leading-relaxed">{getDisplayText(company.location) || 'غير مذكور'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-border/40 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-border/40">
                <div className="p-4 sm:p-5 space-y-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">المؤسسون</span>
                  <p className="text-sm font-bold text-foreground">{foundersText}</p>
                  <span className="text-xs text-muted-foreground font-normal block">{foundersCountText}</span>
                </div>
                <div className="p-4 sm:p-5 space-y-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">عام التأسيس</span>
                  <p className="text-sm font-bold text-foreground">{getDisplayText(company.started) || 'غير مذكور'}</p>
                  <span className="text-xs text-muted-foreground font-normal block">{locationInfo.name}</span>
                </div>
                <div className="p-4 sm:p-5 space-y-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">حجم الفريق</span>
                  <p className="text-sm font-bold text-foreground">{employeesText}</p>
                  {company.work_model && (
                    <span className="text-xs text-muted-foreground font-normal block leading-tight">{getDisplayText(company.work_model)}</span>
                  )}
                </div>
              </div>

              {/* Equity Ownership Breakdown Table */}
              {company.ownership?.holders && Array.isArray(company.ownership.holders) && (
                <div className="p-4 sm:p-5 border-t border-border/40 bg-card space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <PieChart className="size-4 text-primary" />
                      <span>جدول الملكية وحصص المؤسسين وفريق العمل ({company.ownership.as_of || 'إفصاح موثق'}):</span>
                    </h4>
                    {company.ownership.caveat && (
                      <span className="text-xs text-muted-foreground font-normal">{company.ownership.caveat}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                    {company.ownership.holders.map((holder: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-lg bg-muted/30 border border-border/40 flex flex-col justify-between gap-2">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-foreground">{holder.name}</span>
                          <span className="text-primary font-bold dir-ltr">{holder.percentage}%</span>
                        </div>
                        <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: `${Math.min(holder.percentage, 100)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Revenue Timeline Card */}
          {revenueTimelineList.length > 0 && (
            <Card className="border-border/60 shadow-xs">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="size-4 text-emerald-600" />
                  <span>المخطط الزمني للإيرادات والتوسع المالي</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                {revenueTimelineList.map((rt: any, i: number) => (
                  <div key={i} className="p-4 rounded-xl border border-border/60 bg-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs font-semibold">
                          {getDisplayText(rt.date)}
                        </Badge>
                        <Badge variant="secondary" className="text-xs font-medium">
                          {getDisplayText(rt.type)}
                        </Badge>
                      </div>
                      <p className="text-sm font-normal text-muted-foreground mt-1">{getDisplayText(rt.note)}</p>
                    </div>
                    <div className="text-lg font-bold text-emerald-600 dir-ltr">
                      {getDisplayText(rt.amount)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab 2: Problem & Product */}
        <TabsContent value="product" className="space-y-6 outline-none">
          <Card className="border-border/60 shadow-xs">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <Lightbulb className="size-4 text-amber-500" />
                <span>المشكلة والحل التقني</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-3">
              {problemAndProductList.map((item: any, i: number) => {
                if (typeof item === 'object' && item !== null) {
                  return (
                    <div key={i} className="p-4 rounded-xl bg-card border border-border/60 space-y-1.5">
                      {item.stage && (
                        <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300 font-medium text-xs mb-1">
                          {item.stage}
                        </Badge>
                      )}
                      <p className="text-sm text-foreground font-normal leading-relaxed">{item.text || getDisplayText(item)}</p>
                    </div>
                  );
                }
                return (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-card border border-border/60">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground font-normal leading-relaxed">{getDisplayText(item)}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Tech Stack & Tools */}
          {toolsList.length > 0 && (
            <Card className="border-border/60 shadow-xs">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Code className="size-4 text-primary" />
                  <span>التقنيات والأدوات والتكاملات</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-wrap gap-2">
                  {toolsList.map((tool: string, i: number) => {
                    const branding = getToolBranding(tool);
                    return (
                      <Badge
                        key={i}
                        variant="outline"
                        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-lg border-border/60 bg-card"
                      >
                        {branding.icon}
                        <span>{tool}</span>
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab 3: Growth & Operations */}
        <TabsContent value="growth" className="space-y-6 outline-none">
          {/* Origin Story */}
          {originStoryList.length > 0 && (
            <Card className="border-border/60 shadow-xs">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <UserCircle2 className="size-4 text-primary" />
                  <span>قصة البداية والتمويل</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                {originStoryList.map((item: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-card border border-border/60">
                    <div className="flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-foreground font-normal leading-relaxed">{getDisplayText(item)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Build and Launch */}
          {buildAndLaunchList.length > 0 && (
            <Card className="border-border/60 shadow-xs">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Rocket className="size-4 text-primary" />
                  <span>البناء والتطور التاريخي للمنتج</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                {buildAndLaunchList.map((item: any, i: number) => {
                  const textStr = getDisplayText(item);
                  const parts = textStr.split(': ');
                  const title = parts.length > 1 ? parts[0] : null;
                  const text = parts.length > 1 ? parts.slice(1).join(': ') : textStr;

                  return (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-card border border-border/60">
                      <div className="p-1 rounded bg-primary/10 text-primary shrink-0 mt-0.5">
                        <Check className="size-3.5" />
                      </div>
                      <div className="space-y-0.5">
                        {title && <h4 className="text-xs font-semibold text-primary">{title}</h4>}
                        <p className="text-sm text-foreground font-normal leading-relaxed">{text}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* Costs and Operations */}
          {costsAndOperationsList.length > 0 && (
            <Card className="border-border/60 shadow-xs">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Settings className="size-4 text-primary" />
                  <span>التكاليف التشغيلية ومؤشرات الإدارة</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {costsAndOperationsList.map((item: any, i: number) => {
                    if (typeof item === 'object' && item !== null) {
                      return (
                        <div key={i} className="p-4 rounded-xl bg-card border border-border/60 space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">{item.item || 'عنصر تشغيلي'}</h4>
                            {item.status && (
                              <Badge variant="outline" className="text-xs font-medium">
                                {item.status}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground font-normal leading-relaxed">
                            {item.detail || getDisplayText(item)}
                          </p>
                        </div>
                      );
                    }
                    return (
                      <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-card border border-border/60 md:col-span-2">
                        <div className="size-2 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                        <p className="text-sm text-foreground font-normal leading-relaxed">{getDisplayText(item)}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Monetization & Pricing */}
          {monetizationList.length > 0 && (
            <Card className="border-border/60 shadow-xs">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <DollarSign className="size-4 text-emerald-600" />
                  <span>نموذج الربح وهيكلية التسعير</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {monetizationList.map((item: any, i: number) => {
                    if (typeof item === 'object' && item !== null && (item.stream || item.pricing)) {
                      return (
                        <div key={i} className="p-4 rounded-xl bg-card border border-border/60 flex flex-col justify-between gap-3">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-bold text-foreground">{item.stream || `خطة ${i + 1}`}</h4>
                              {item.transaction_fee && (
                                <Badge variant="outline" className="text-xs font-medium">
                                  رسوم: {item.transaction_fee}
                                </Badge>
                              )}
                            </div>

                            {item.pricing && (
                              <div className="text-base font-bold text-emerald-600 dir-ltr text-right">
                                {item.pricing}
                              </div>
                            )}

                            {item.capacity && (
                              <p className="text-xs font-semibold text-muted-foreground">
                                السعة: {item.capacity}
                              </p>
                            )}

                            {item.features && (
                              <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
                                {item.features}
                              </p>
                            )}
                          </div>

                          {item.caveat && (
                            <span className="text-xs text-muted-foreground font-normal italic block pt-1">
                              * {item.caveat}
                            </span>
                          )}
                        </div>
                      );
                    }
                    return (
                      <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-card border border-border/60 md:col-span-2 lg:col-span-3">
                        <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground font-normal leading-relaxed">{getDisplayText(item)}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Growth Strategies */}
          {growthList.length > 0 && (
            <Card className="border-border/60 shadow-xs">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Globe className="size-4 text-primary" />
                  <span>استراتيجيات النمو والتوسع</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                {growthList.map((item: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-card border border-border/60">
                    <TrendingUp className="size-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground font-normal leading-relaxed">{getDisplayText(item)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab 4: Strategic Insights & Lessons */}
        <TabsContent value="insights" className="space-y-6 outline-none">
          {/* Strategic Analysis */}
          {analysis && (
            <Card className="border-border/60 shadow-xs">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Award className="size-4 text-primary" />
                  <span>{analysis.title || 'التحليل الاستراتيجي والخندق التنافسي للشركة'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6">
                {analysis.strategic_thesis && (
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide block">الفرضية الاستراتيجية للشركة:</span>
                    <p className="text-sm text-foreground font-normal leading-relaxed">
                      {analysis.strategic_thesis}
                    </p>
                  </div>
                )}

                {analysis.competitive_moat && Array.isArray(analysis.competitive_moat) && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">عناصر الخندق التنافسي:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {analysis.competitive_moat.map((moat: string, idx: number) => (
                        <div key={idx} className="p-3 rounded-lg bg-card border border-border/60 flex items-start gap-2.5 text-sm text-foreground font-normal leading-relaxed">
                          <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{moat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.key_risks && Array.isArray(analysis.key_risks) && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">أبرز المخاطر والتحديات التشغيلية:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {analysis.key_risks.map((risk: string, idx: number) => (
                        <div key={idx} className="p-3 rounded-lg bg-card border border-border/60 flex items-start gap-2.5 text-sm text-foreground font-normal leading-relaxed">
                          <AlertTriangle className="size-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.bottom_line && (
                  <div className="p-4 rounded-xl bg-primary text-primary-foreground space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider block">خلاصة التقييم:</span>
                    <p className="text-sm font-normal leading-relaxed opacity-95">
                      {analysis.bottom_line}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Lessons Learned */}
          {lessonsList.length > 0 && (
            <Card className="border-border/60 shadow-xs">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <FileText className="size-4 text-primary" />
                  <span>الدروس المستفادة والاستراتيجيات</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                {lessonsList.map((item: any, i: number) => (
                  <div key={i} className="p-4 rounded-xl bg-card border border-border/60 flex items-start gap-3">
                    <div className="p-1 rounded bg-primary/10 text-primary shrink-0 mt-0.5">
                      <Check className="size-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
                      {item.description && (
                        <p className="text-sm text-muted-foreground font-normal leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Verification Policy */}
          {verification && (
            <Card className="border-border/60 shadow-xs">
              <CardHeader className="border-b border-border/40 pb-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="size-5 text-emerald-600 shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground text-base">
                        سياسة التوثيق وحدود الاستدلال الدقيقة
                      </h3>
                      <p className="text-xs text-muted-foreground font-normal mt-0.5">
                        {getDisplayText(verification.source_policy)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-5 space-y-4">
                {verification.primary_corrections && Array.isArray(verification.primary_corrections) && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                      تصحيحات البيانات الأولية والأرقام المغلوطة:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-foreground font-normal">
                      {verification.primary_corrections.map((corr: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 bg-card p-2.5 rounded-lg border border-border/60">
                          <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{corr}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Sources Accordion */}
          <Card className="border-border/60 shadow-xs overflow-hidden">
            <CardHeader className="p-4 bg-card">
              <button
                type="button"
                onClick={() => setIsSourcesOpen(!isSourcesOpen)}
                className="w-full flex items-center justify-between gap-4 text-right focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <LinkIcon className="size-4 text-primary shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      المصادر الرسمية وتقارير التوثيق ({allSourcesList.length})
                    </h3>
                  </div>
                </div>
                <div className="p-1 rounded bg-muted text-muted-foreground">
                  {isSourcesOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </div>
              </button>
            </CardHeader>

            {isSourcesOpen && (
              <CardContent className="p-4 border-t border-border/40 bg-muted/20 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {allSourcesList.map((src, idx) => (
                    <div key={idx} className="p-3 border border-border/60 rounded-lg bg-card space-y-1">
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary hover:underline flex items-center justify-between gap-2 text-xs"
                      >
                        <span className="line-clamp-1">{getDisplayText(src.title)}</span>
                        <ExternalLink className="size-3 shrink-0" />
                      </a>
                      {src.publisher && (
                        <p className="text-xs text-muted-foreground font-normal">{getDisplayText(src.publisher)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
