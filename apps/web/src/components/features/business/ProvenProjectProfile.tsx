import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
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
  Link,
  Boxes,
  Zap,
  BookOpen,
  Fingerprint,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  PanelRightOpen,
  Users,
  Layers,
  Briefcase,
  MapPin,
  Calendar,
  Bookmark,
  Sparkles,
  Compass,
  Store,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { fetchPublicJson } from '@/lib/publicData';

interface ProvenProjectProps {
  project: any;
  onBack: () => void;
  onSelectProject?: (project: any) => void;
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
    return { icon: <Database className="size-4" />, colors: "bg-emerald-50 text-emerald-700 border-emerald-200" };
  }
  if (t.includes('aws') || t.includes('google cloud') || t.includes('digitalocean') || t.includes('vercel')) {
    return { icon: <Cloud className="size-4" />, colors: "bg-sky-50 text-sky-700 border-sky-200" };
  }
  if (t.includes('openai') || t.includes('claude') || t.includes('gpt') || t.includes('elevenlabs') || t.includes('ai') || t.includes('ذكاء')) {
    return { icon: <Bot className="size-4" />, colors: "bg-purple-50 text-purple-700 border-purple-200" };
  }
  if (t.includes('stripe') || t.includes('payment') || t.includes('مدفوعات') || t.includes('paypal')) {
    return { icon: <CreditCard className="size-4" />, colors: "bg-indigo-50 text-indigo-700 border-indigo-200" };
  }
  if (t.includes('tailwind') || t.includes('css') || t.includes('webflow') || t.includes('framer') || t.includes('design')) {
    return { icon: <Layout className="size-4" />, colors: "bg-cyan-50 text-cyan-700 border-cyan-200" };
  }
  if (t.includes('auth') || t.includes('magic link') || t.includes('security') || t.includes('مصادقة')) {
    return { icon: <Fingerprint className="size-4" />, colors: "bg-rose-50 text-rose-700 border-rose-200" };
  }
  if (t.includes('email') || t.includes('mailgun') || t.includes('postmark') || t.includes('intercom') || t.includes('slack') || t.includes('بريد')) {
    return { icon: <Mails className="size-4" />, colors: "bg-amber-50 text-amber-700 border-amber-200" };
  }
  if (t.includes('youtube') || t.includes('wistia') || t.includes('video')) {
    return { icon: <MonitorPlay className="size-4" />, colors: "bg-red-50 text-red-700 border-red-200" };
  }
  if (t.includes('zapier') || t.includes('make') || t.includes('automation') || t.includes('أتمتة')) {
    return { icon: <Zap className="size-4" />, colors: "bg-orange-50 text-orange-700 border-orange-200" };
  }
  if (t.includes('notion') || t.includes('linear') || t.includes('gitbook') || t.includes('canny')) {
    return { icon: <BookOpen className="size-4" />, colors: "bg-slate-100 text-slate-700 border-slate-300" };
  }
  if (t.includes('react') || t.includes('next') || t.includes('node') || t.includes('angular') || t.includes('.net') || t.includes('typescript') || t.includes('javascript') || t.includes('تطبيقات') || t.includes('موبايل')) {
    return { icon: <Boxes className="size-4" />, colors: "bg-blue-50 text-blue-700 border-blue-200" };
  }
  if (t.includes('github') || t.includes('cursor') || t.includes('git')) {
    return { icon: <Code className="size-4" />, colors: "bg-zinc-100 text-zinc-800 border-zinc-300" };
  }

  return { icon: <Code className="size-4" />, colors: "bg-primary/5 text-primary border-primary/20" };
};

const getStatusMeta = (status: string) => {
  switch (status) {
    case 'verified':
      return { label: 'موثق بمصدر أولي', className: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    case 'verified_historical_calculation':
      return { label: 'مشتق بحسابات موثقة', className: 'bg-sky-100 text-sky-800 border-sky-300' };
    case 'verified_using_operational_proxies':
      return { label: 'مؤشرات تشغيل موثقة', className: 'bg-purple-100 text-purple-800 border-purple-300' };
    case 'verified_as_not_publicly_disclosed':
      return { label: 'غير مفصح عنه رسمياً', className: 'bg-amber-100 text-amber-800 border-amber-300' };
    default:
      return { label: 'مُحقَّق', className: 'bg-slate-100 text-slate-800 border-slate-300' };
  }
};

const getShortRevenueDisplay = (value: unknown) => {
  const revenueStr = getValuationText(value);
  if (!revenueStr) return 'غير مفصح رسمياً';

  if (
    revenueStr.includes('غير') ||
    revenueStr.includes('لا تنشر') ||
    revenueStr.includes('لا تفصح') ||
    revenueStr.includes('لا تكشف') ||
    revenueStr.includes('لم تعلن') ||
    revenueStr.includes('لم تكشف') ||
    revenueStr.includes('مغلق')
  ) {
    return 'غير مفصح رسمياً';
  }

  if (revenueStr.length < 20) return revenueStr;

  const amountMatch = revenueStr.match(/(\$\d+(?:\.\d+)?\s*(?:B|M|K)?|نحو \d+(?:\.\d+)?\s*(?:مليار|ملايين|مليون|ألف)\s*(?:دولار|درهم|جنيه)?)/i);
  if (amountMatch) return amountMatch[0];

  return 'غير مفصح رسمياً';
};

const getShortTrafficDisplay = (value: unknown) => {
  const trafficStr = getValuationText(value);
  if (!trafficStr) return 'غير مفصح رسمياً';

  if (
    trafficStr.includes('غير') ||
    trafficStr.includes('لا تنشر') ||
    trafficStr.includes('لا تفصح') ||
    trafficStr.includes('لا تكشف') ||
    trafficStr.includes('لم تعلن') ||
    trafficStr.includes('لم تكشف')
  ) {
    return 'غير مفصح رسمياً';
  }

  if (trafficStr.length < 20) return trafficStr;

  const trafficMatch = trafficStr.match(/(\d+(?:\.\d+)?\s*(?:B|M|K|مليون|ألف)\s*(?:عميل|زائر|مستخدم|بريد|مشترك)?)/i);
  if (trafficMatch) return trafficMatch[0];

  return 'غير مفصح رسمياً';
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

const getShortValuationDisplay = (value: unknown) => {
  const valStr = getValuationText(value);
  if (!valStr) return 'غير مفصح رسمياً';

  if (
    valStr.includes('غير') ||
    valStr.includes('لا تنشر') ||
    valStr.includes('لا تفصح') ||
    valStr.includes('لا تكشف') ||
    valStr.includes('لم تعلن') ||
    valStr.includes('لم تكشف')
  ) {
    return 'غير مفصح رسمياً';
  }

  if (valStr.length < 20) return valStr;

  const valMatch = valStr.match(/(\$\d+(?:\.\d+)?\s*(?:B|M|K)?|\d+(?:\.\d+)?\s*(?:مليار|ملايين|مليون|ألف)\s*(?:دولار|درهم|جنيه)?)/i);
  if (valMatch) return valMatch[0];

  if (valStr.includes('Nasdaq') || valStr.includes('عامة')) return 'شركة عامة';

  return 'غير مفصح رسمياً';
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

const toTextList = (value: unknown): string[] => {
  if (!value) return [];
  const values = Array.isArray(value) ? value : [value];
  return values.map(getDisplayText).filter(Boolean);
};

const translateConfidence = (level: unknown): string => {
  if (!level) return 'بيانات موثقة';
  const l = String(level).toLowerCase();
  if (l === 'high' || l === 'very_high') return 'درجة ثقة عالية';
  if (l === 'medium_high' || l === 'medium') return 'درجة ثقة متوسطة';
  if (l === 'low') return 'تقدير أولي';
  return 'بيانات رسمية';
};

const translateClaimType = (claim: unknown): string => {
  if (!claim) return 'بيانات مالية موثقة';
  const c = String(claim).toLowerCase();
  if (c.includes('implied_on_air') || c.includes('implied')) return 'تقييم موثق في المقابلات الرسمية';
  if (c.includes('official') || c.includes('reported') || c.includes('public')) return 'إفصاح مالي رسمي معلن';
  if (c.includes('bootstrapped')) return 'تمويل ذاتي 100%';
  if (c.includes('venture') || c.includes('seed')) return 'استثمار رأس مال جريء';
  return getDisplayText(claim).replace(/_/g, ' ');
};

const getCategoryTokens = (rawCategory: unknown, rawCustomerType?: unknown): string[] => {
  const rawList: string[] = [];

  if (rawCategory) {
    const text = getDisplayText(rawCategory);
    if (text) rawList.push(...text.split(/[\/,\n]+/));
  }

  if (rawCustomerType) {
    const text = getDisplayText(rawCustomerType);
    if (text) rawList.push(...text.split(/[\/,\n]+/));
  }

  const tokens: string[] = [];
  rawList.forEach(item => {
    const trimmed = item.trim();
    if (!trimmed) return;

    if (trimmed.includes(' & ')) {
      const parts = trimmed.split(' & ').map(p => p.trim()).filter(Boolean);
      tokens.push(...parts);
    } else {
      tokens.push(trimmed);
    }
  });

  return Array.from(new Set(tokens.filter(t => t.length > 0)));
};

interface StructuredToolItem {
  brandBadge?: string;
  title: string;
  description: string;
}

const parseToolItem = (rawTool: string): StructuredToolItem => {
  let cleaned = rawTool.trim();

  // 1. Fix typo where English word is attached to Arabic text without a space (e.g. "Shopifyلتشغيل")
  cleaned = cleaned.replace(/([A-Za-z0-9]+)([\u0600-\u06FF])/g, '$1 $2');
  cleaned = cleaned.replace(/([\u0600-\u06FF])([A-Za-z0-9]+)/g, '$1 $2');

  // 2. Extract leading English brand if present
  const engLeading = cleaned.match(/^([A-Za-z0-9\s\&\-\+\.]{2,})/);
  if (engLeading && !/^[\s0-9]+$/.test(engLeading[1])) {
    const brand = engLeading[1].trim();
    let rest = cleaned.substring(engLeading[0].length).trim();
    rest = rest.replace(/^[:\-–—\s]+/, '');
    return {
      brandBadge: brand,
      title: brand,
      description: rest || cleaned
    };
  }

  // 3. Extract title before connectors like 'لـ', 'لتشغيل', 'وفق', ':', '،'
  const splitMatch = cleaned.match(/^([^:\,،\n]+?)(?:[:،]\s*|\s+(?:لـ|لتشغيل|تخدم|تشمل|تسوّقها|وفق)\s+)(.*)/);
  if (splitMatch && splitMatch[1] && splitMatch[2]) {
    const titlePart = splitMatch[1].trim();
    const descPart = splitMatch[2].trim();
    
    const brandMatch = titlePart.match(/([A-Za-z0-9\s\&\-\+\.]{2,})/);
    return {
      brandBadge: brandMatch ? brandMatch[0].trim() : undefined,
      title: titlePart,
      description: descPart
    };
  }

  const brandMatch = cleaned.match(/([A-Za-z0-9\s\&\-\+\.]{2,})/);
  return {
    brandBadge: brandMatch ? brandMatch[0].trim() : undefined,
    title: cleaned,
    description: cleaned
  };
};

const getCleanDomain = (url?: string): string => {
  if (!url) return '';
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  }
};

export const ProvenProjectProfile: React.FC<ProvenProjectProps> = ({ project: rawProject, onBack, onSelectProject }) => {
  const [activeId, setActiveId] = useState<string>('overview');
  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState<boolean>(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState<boolean>(false);
  const [isQualityOpen, setIsQualityOpen] = useState<boolean>(false);
  const [similarProjects, setSimilarProjects] = useState<any[]>([]);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    const loadSimilar = async () => {
      setIsLoadingSimilar(true);
      try {
        const allProjects = await fetchPublicJson<any[]>('/api/public-data/proven-projects');
        if (Array.isArray(allProjects) && isMounted) {
          const currentId = (rawProject.id || rawProject.slug || '').toLowerCase();

          // Exclude current project
          const candidates = allProjects.filter((p: any) => {
            const pId = (p.id || p.slug || '').toLowerCase();
            return pId && pId !== currentId;
          });

          // Extract category tokens from rawProject
          const catStr = rawProject.category || '';
          const tokens = catStr.split(/[\/\,\-\–\—\+]/).map((t: string) => t.trim()).filter(Boolean);

          // Compute relevance score for each candidate
          const scored = candidates.map((p: any) => {
            let score = 0;
            const pCat = (p.category || '').toLowerCase();
            const pHeadline = (p.headline || '').toLowerCase();

            tokens.forEach((token: string) => {
              const tokLower = token.toLowerCase();
              if (tokLower.length > 2) {
                if (pCat.includes(tokLower)) score += 4;
                if (pHeadline.includes(tokLower)) score += 2;
              }
            });

            // Location score
            const pLoc = p.company?.location || '';
            const currentLoc = rawProject.company?.location || '';
            if (pLoc && currentLoc) {
              if (pLoc.includes('السعودية') && currentLoc.includes('السعودية')) score += 1;
              if (pLoc.includes('الإمارات') && currentLoc.includes('الإمارات')) score += 1;
              if (pLoc.includes('مصر') && currentLoc.includes('مصر')) score += 1;
            }

            return { ...p, score };
          });

          scored.sort((a, b) => b.score - a.score);
          setSimilarProjects(scored.slice(0, 6));
        }
      } catch (err) {
        console.error("Failed to load similar projects from JSON DB", err);
      } finally {
        if (isMounted) setIsLoadingSimilar(false);
      }
    };

    loadSimilar();
    return () => { isMounted = false; };
  }, [rawProject.id, rawProject.slug, rawProject.category]);

  const evidenceMap = rawProject.evidence_map || {};

  // Extract key verified evidence insights
  const revenueEvidence = evidenceMap['$.directory_snapshot.monthly_revenue'];
  const trafficEvidence = evidenceMap['$.directory_snapshot.monthly_traffic'];
  const modelEvidence = evidenceMap['$.company.business_model'];
  const locationEvidence = evidenceMap['$.company.location'];
  const valuationEvidence = evidenceMap['$.financials.valuation'];

  // Smartly resolve official website URL from all possible locations
  const officialSourceRef = (rawProject.source_references || rawProject.verification?.source_references || []).find(
    (ref: any) => ref?.url && (ref?.source_type === 'official_company_website' || ref?.source_type?.includes('official'))
  );
  const officialSource = (rawProject.sources || []).find(
    (s: any) => s?.url && (s?.type === 'official' || s?.source_type === 'official_company_website' || s?.source_type?.includes('official'))
  );

  const resolvedWebsite = rawProject.website || 
    rawProject.company?.website || 
    officialSourceRef?.url ||
    officialSource?.url;

  // Normalize project data completely without hardcoded company fallbacks
  const project = {
    ...rawProject,
    website: resolvedWebsite,
    company: rawProject.company || {},
    financials: rawProject.financials || {},
    directory_snapshot: rawProject.directory_snapshot || {},
    problem_and_product: toTextList(rawProject.problem_and_product || [
      rawProject.overview?.problem?.text && `المشكلة: ${rawProject.overview.problem.text}`,
      rawProject.overview?.problem?.impact && `الأثر الداعم: ${rawProject.overview.problem.impact}`,
      rawProject.overview?.solution?.text && `الحل المبتكر: ${rawProject.overview.solution.text}`
    ].filter(Boolean)),
    origin_story: toTextList(rawProject.origin_story || [
      rawProject.financials?.initial_investment && `جولات الاستثمار والتمويل: ${getDisplayText(rawProject.financials.initial_investment)}`,
      rawProject.market_data?.target_audience && `الجمهور المستهدف: ${getDisplayText(rawProject.market_data.target_audience)}`
    ].filter(Boolean)),
    build_and_launch: toTextList(rawProject.build_and_launch || [
      rawProject.company?.started && `عام التأسيس: ${getDisplayText(rawProject.company.started)}`,
      rawProject.financials?.valuation && `التقييم والتوسع: ${getValuationText(rawProject.financials.valuation)}`
    ].filter(Boolean)),
    costs_and_operations: toTextList(rawProject.costs_and_operations || [
      rawProject.company?.employees && `حجم القوى العاملة: ${getDisplayText(rawProject.company.employees)}`,
      rawProject.company?.location && `المقر والانتشار: ${getDisplayText(rawProject.company.location)}`
    ].filter(Boolean)),
    monetization: toTextList(rawProject.monetization || rawProject.financials?.revenue_streams || []),
    growth: toTextList(rawProject.growth || [
      rawProject.market_data?.growth_rate && `معدل النمو: ${getDisplayText(rawProject.market_data.growth_rate)}`,
      rawProject.market_data?.market_size && `حجم السوق المستهدف: ${getDisplayText(rawProject.market_data.market_size)}`
    ].filter(Boolean)),
    tools: toTextList(rawProject.tools || []),
    revenue_timeline: rawProject.revenue_timeline || (
      rawProject.directory_snapshot?.monthly_revenue ? [
        {
          date: 'الإيراد الموثق',
          amount: getShortRevenueDisplay(rawProject.directory_snapshot.monthly_revenue),
          type: 'إفصاح موثق',
          note: rawProject.company?.public_revenue_claim || rawProject.directory_snapshot.monthly_revenue
        }
      ] : []
    ),
    lessons: (rawProject.lessons || []).map((l: any) => {
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
    }),
    sources: rawProject.sources || [],
    data_quality: toTextList(rawProject.data_quality || (rawProject.verification?.important_notes || [])),
  };

  // Helper to generate standardized international Revenue Model details
  const getGlobalRevenueModelInfo = (rawModel: any, customerType: string, category: string) => {
    const modelText = getDisplayText(rawModel) || '';
    const textLower = (modelText + ' ' + (customerType || '') + ' ' + (category || '')).toLowerCase();

    let streams: { title: string; desc: string; badge: string }[] = [];
    let summaryText = modelText;

    if (textLower.includes('saas') || textLower.includes('اشتراك') || textLower.includes('برمجيات') || textLower.includes('سحاب')) {
      streams = [
        { title: 'اشتراكات دورية (Recurring Subscriptions)', desc: 'باقات شهرية وسنوية متدرجة تعتمد على حجم استخدام المؤسسة وعدد المستخدمين النشطين.', badge: 'SaaS Subscription' },
        { title: 'عقود وحلول المؤسسات (Enterprise Contracts)', desc: 'تراخيص خاصة بالمؤسسات الكبيرة تشتمل على اتفاقيات مستوى الخدمة (SLA) والدعم الفني المباشر.', badge: 'Enterprise License' },
        { title: 'خدمات التكامل والتخصيص (Professional Services)', desc: 'رسوم إعداد وبناء تكاملات برمجية مخصصة (API Integration) بحسب متطلبات العميل.', badge: 'Add-on Services' }
      ];
    } else if (textLower.includes('تجارة') || textLower.includes('متجر') || textLower.includes('e-commerce') || textLower.includes('منتجات')) {
      streams = [
        { title: 'مبيعات المنتجات المباشرة (Direct Product Margin)', desc: 'هامش ربح مباشر يتولّد من عمليات البيع الرقمي بالتجزئة والجملة للمستهلكين والتجار.', badge: 'Direct Sales' },
        { title: 'خدمات الشحن والتنفيذ (Fulfillment & Shipping)', desc: 'عوائد تشغيلية إضافية عبر تقديم خدمات التغليف والشحن السريع والمستودعات.', badge: 'Logistics Revenue' },
        { title: 'اشتراكات التكرار الدوري (Subscription Boxes)', desc: 'إتاحة خيار الشراء الدوري الأوتوماتيكي للعملاء لتأمين تدفقات نقدية مستقرة ورابحة.', badge: 'Recurring Sub' }
      ];
    } else if (textLower.includes('منصة') || textLower.includes('وساطة') || textLower.includes('marketplace') || textLower.includes('عمولة')) {
      streams = [
        { title: 'عمولة الاقتطاع المباشر (Take Rate Commission)', desc: 'نسبة اقتطاع مئوية من قيمة كل عملية تجارية تكتمل بنجاح عبر المنصة.', badge: 'Take Rate' },
        { title: 'اشتراكات مزودي الخدمات (Vendor Memberships)', desc: 'رسوم عضوية شهرية لمزودي الخدمات والتجار للحصول على أدوات تسويقية وتفوق في النتائج.', badge: 'Vendor Subscription' },
        { title: 'الترويج والإعلانات الموجهة (Featured Listings)', desc: 'رسوم إضافية لإبراز العروض والمنتجات في مقدمة نتائج البحث والمقترحات.', badge: 'Ad Monetization' }
      ];
    } else {
      streams = [
        { title: 'عقود تجارية مباشرة (B2B Commercial Contracts)', desc: 'اتفاقيات توريد وخدمات طويلة الأمد مع الشركات والشركاء التجاريين.', badge: 'B2B Contracts' },
        { title: 'رسوم الاستخدام التشغيلي (Usage-based Pricing)', desc: 'تحصيل عوائد مرنة ترتبط مباشرة بحجم استهلاك الخدمات وحجم المعاملات المنجزة.', badge: 'Usage-based' },
        { title: 'خدمات الدعم الاستراتيجي (Premium Support)', desc: 'تقديم باقات دعم فني متقدم وإدارة حسابات مخصصة لكبار العملاء.', badge: 'Premium Support' }
      ];
    }

    if (!summaryText || summaryText === 'غير مفصح عنه رسمياً' || summaryText.length < 10) {
      summaryText = `يعتمد المشروع على نموذج ربحي عالمي مستدام يتكامل مع احتياجات السوق المستهدف عبر الجمع بين التدفقات النقدية المباشرة والاشتراكات الدورية.`;
    }

    return { streams, summaryText };
  };

  const getGlobalOperatingModelInfo = (rawLocation: any, customerType: string, category: string) => {
    const locText = getDisplayText(rawLocation) || '';
    const textLower = (locText + ' ' + (customerType || '') + ' ' + (category || '')).toLowerCase();

    let opsPillars: { title: string; desc: string }[] = [];

    if (textLower.includes('saas') || textLower.includes('برمجيات') || textLower.includes('تقني')) {
      opsPillars = [
        { title: 'بنية سحابية ذاتية التوسع (Cloud Infrastructure)', desc: 'إدارة السيرفرات الموزعة سحابياً لضمان الجاهزية العالية وتقديم أفضل سرعة استجابة.' },
        { title: 'أتمتة الدعم والخدمات (Automated Operations)', desc: 'تطبيق أدوات الأتمتة والذكاء الاصطناعي لرفع كفاءة خدمة العملاء وإدارة التذاكر.' },
        { title: 'إدارة المنتجات والنشر المستمر (Continuous Delivery)', desc: 'دورة تطوير مرنة تضمن تحديث الميزات الأمنية والبرمجية بدون انقطاع الخدمة.' }
      ];
    } else if (textLower.includes('تجارة') || textLower.includes('لوجست') || textLower.includes('متجر')) {
      opsPillars = [
        { title: 'إدارة المستودعات الرقمية (Automated Fulfillment)', desc: 'ربط أنظمة إدارة المخزون والمستودعات رقمياً لسرعة تجهيز الطلبات وتفادي النقص.' },
        { title: 'سلسلة إمداد مرنة (Digital Supply Chain)', desc: 'الاعتماد على شبكة شركاء لوجستيين معتمدين لتسليم الطلبات وتتبع الشحنات لحظياً.' },
        { title: 'خدمة العملاء الشاملة (Omnichannel Operations)', desc: 'إدارة تجربة العملاء والمرتجعات عبر مركز عمليات موحد يضمن رضا المستفيدين.' }
      ];
    } else {
      opsPillars = [
        { title: 'إدارة عمليات عالية الكفاءة (Lean Operational Framework)', desc: 'تركيز الكادر التشغيلي على المهام الجوهرية وتقليل الهدر الإداري والتنفيذي.' },
        { title: 'شبكة شركاء ومزودين معتمدين (Partner Network)', desc: 'بناء علاقات استراتيجية موثوقة مع المصنعين والمزودين لضمان استمرارية الإمداد.' },
        { title: 'ضمان الجودة والامتثال (Quality & Compliance)', desc: 'معايير جودة صارمة لضمان موثوقية الخدمات والامتثال للتشريعات المحلية والدولية.' }
      ];
    }

    let locationSummary = locText;
    if (!locationSummary || locationSummary === 'غير مفصح عنه رسمياً' || locationSummary.length < 10) {
      locationSummary = `تدار العمليات عبر مقر تشغيلي منظم وبنية إدارية تضمن التوسع السلس وتلبية متطلبات السوق المستهدف بكفاءة.`;
    }

    return { opsPillars, locationSummary };
  };

  const revenueInfo = getGlobalRevenueModelInfo(project.company?.business_model, project.company?.customer_type, project.category);
  const opsInfo = getGlobalOperatingModelInfo(project.company?.location, project.company?.customer_type, project.category);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !tocRef.current) return;
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const headerHeight = 100;
      if (containerTop <= headerHeight) {
        tocRef.current.style.position = 'fixed';
        tocRef.current.style.top = `${headerHeight}px`;
        tocRef.current.style.width = '250px';
      } else {
        tocRef.current.style.position = 'relative';
        tocRef.current.style.top = '0';
        tocRef.current.style.width = 'auto';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { root: null, rootMargin: '-20% 0px -60% 0px' }
    );

    const elements = document.querySelectorAll('.profile-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { id: 'overview', number: '01', label: 'الهوية والأرقام القياسية' },
    { id: 'problem-and-solution', number: '02', label: 'المشكلة والحل المبتكر' },
    { id: 'revenue-model', number: '03', label: 'نموذج الربح ومصادر الإيرادات' },
    { id: 'operating-model', number: '04', label: 'نموذج التشغيل والإدارة الفنية' },
    { id: 'financial-growth', number: '05', label: 'النمو والجدول الزمني للإيراد' },
    { id: 'tech-stack', number: '06', label: 'البنية التقنية والأدوات' },
    { id: 'lessons-and-sources', number: '07', label: 'الدروس وشواهد التوثيق' },
    { id: 'related-companies-and-sectors', number: '08', label: 'شركات مماثلة وقطاعات مرتبطة' },
  ];

  const allSourcesList: Array<{ title: string; url: string; publisher?: string; locator?: string; supports?: string }> = [];

  (project.sources || []).forEach((src: any) => {
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

  const foundersText = getDisplayText(project.company.founder || project.company.founders) || 'غير مذكور رسمياً';
  const hasVerifiedFounder = foundersText && !foundersText.includes('غير مذكور');
  const hasVerifiedYear = project.company.started && !String(project.company.started).includes('غير');
  const employeesText = getDisplayText(project.company.employees) || 'غير مفصح عنه';
  const locationInfo = getCountryInfo(getDisplayText(project.company.location));

  const categoryTokens = getCategoryTokens(project.category, project.company?.customer_type);

  const shortTools = project.tools.filter((t: string) => t.length <= 35);
  const descriptiveTools = project.tools.filter((t: string) => t.length > 35);

  const categorizedTools = {
    frontend: shortTools.filter((t: string) => {
      const lower = t.toLowerCase();
      return lower.includes('react') || lower.includes('next') || lower.includes('vue') || lower.includes('tailwind') || lower.includes('css') || lower.includes('ui') || lower.includes('figma');
    }),
    backend: shortTools.filter((t: string) => {
      const lower = t.toLowerCase();
      return lower.includes('node') || lower.includes('python') || lower.includes('postgres') || lower.includes('mongo') || lower.includes('aws') || lower.includes('vercel') || lower.includes('supabase') || lower.includes('docker');
    }),
    ai: shortTools.filter((t: string) => {
      const lower = t.toLowerCase();
      return lower.includes('ai') || lower.includes('gpt') || lower.includes('openai') || lower.includes('claude') || lower.includes('bot') || lower.includes('ml');
    }),
    shortOther: shortTools.filter((t: string) => {
      const lower = t.toLowerCase();
      return !lower.includes('react') && !lower.includes('next') && !lower.includes('vue') && !lower.includes('tailwind') && !lower.includes('css') && !lower.includes('ui') && !lower.includes('figma') && !lower.includes('node') && !lower.includes('python') && !lower.includes('postgres') && !lower.includes('mongo') && !lower.includes('aws') && !lower.includes('vercel') && !lower.includes('supabase') && !lower.includes('docker') && !lower.includes('ai') && !lower.includes('gpt') && !lower.includes('openai') && !lower.includes('claude') && !lower.includes('bot') && !lower.includes('ml');
    })
  };

  const hasShortBadges = categorizedTools.frontend.length > 0 || categorizedTools.backend.length > 0 || categorizedTools.ai.length > 0 || categorizedTools.shortOther.length > 0;

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 font-sans pb-24">

      {/* Crunchbase Sticky Horizontal Sub-Nav Bar */}
      <div className="sticky top-14 z-20 bg-background/95 backdrop-blur-md border-b border-border/60 py-2.5 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 transition-all">
        <div className="flex items-center justify-between gap-2 max-w-7xl mx-auto overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "py-2 px-3.5 text-xs rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-2 border shadow-2xs",
                  activeId === item.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground border-border/60"
                )}
              >
                <span className="font-mono text-[10px] opacity-80">{item.number}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsTocOpen(!isTocOpen)}
            className="gap-2 text-xs font-bold border-border/80 bg-card hover:bg-muted shrink-0 hidden lg:flex rounded-xl"
          >
            <PanelRightOpen className="size-3.5 text-primary" />
            <span>{isTocOpen ? 'طي الفهرس الجانبي' : 'عرض الفهرس الجانبي'}</span>
          </Button>
        </div>
      </div>

      <div 
        ref={containerRef} 
        className={cn(
          "grid gap-8 items-start relative transition-all duration-300",
          isTocOpen ? "lg:grid-cols-[260px_1fr]" : "grid-cols-1"
        )}
      >

        {/* Collapsible Right Sidebar TOC */}
        {isTocOpen && (
          <aside className="hidden lg:block sticky top-24 z-10 animate-in fade-in slide-in-from-right-4 duration-200">
            <div ref={tocRef} className="flex flex-col bg-card rounded-2xl border border-border/60 shadow-xs p-3.5 space-y-3">
              
              {/* Header with Title and Collapse Button */}
              <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <Layout className="size-4 text-primary" />
                  <span className="font-bold text-xs uppercase tracking-wider text-foreground">فهرس الدراسة</span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsTocOpen(false)}
                  title="طي الفهرس جانباً"
                  className="size-7 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0"
                >
                  <ChevronLeft className="size-4" />
                </Button>
              </div>

              {/* Sections Nav Buttons List */}
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      "w-full text-right py-2 px-3 text-xs rounded-xl transition-all focus:outline-none flex items-center justify-between group",
                      activeId === item.id
                        ? "bg-primary/10 text-primary font-bold shadow-2xs"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground font-medium"
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={cn(
                        "text-[10px] font-extrabold px-1.5 py-0.5 rounded-md font-mono",
                        activeId === item.id ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/20"
                      )}>
                        {item.number}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>
                    {activeId === item.id && (
                      <div className="size-2 rounded-full bg-primary shrink-0" />
                    )}
                  </button>
                ))}
              </div>

            </div>
          </aside>
        )}

        <div className="flex flex-col gap-10 min-w-0">

          <section id="overview" className="profile-section scroll-mt-24 space-y-4">
            {/* Crunchbase 1:1 Shadcn Profile Header Card */}
            <Card className="shadow-xs border-border/60 overflow-hidden rounded-2xl bg-card">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  
                  {/* Left: Crunchbase White Square Logo Box */}
                  <div className="size-24 sm:size-28 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-center shrink-0 p-3 relative overflow-hidden">
                    <div className="size-full rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 text-white text-4xl sm:text-5xl font-black flex items-center justify-center shadow-inner">
                      {project.name.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  {/* Right: Crunchbase Header Content Stack */}
                  <div className="flex-1 min-w-0 space-y-3.5">
                    
                    {/* Line 1: Company Title + Scores/Badges + Top-Right Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      
                      <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
                          {project.name}
                        </h1>

                        {rawProject.verification && (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/80 font-bold text-xs px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                            <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
                            <span>
                              {rawProject.verification.verified_on ? `موثق: ${getDisplayText(rawProject.verification.verified_on)}` : 'موثق رسمياً'}
                            </span>
                          </Badge>
                        )}

                        {/* Trust Score Badge */}
                        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/70 px-2.5 py-0.5 rounded-md text-xs font-bold shadow-2xs">
                          <span className="text-slate-500 dark:text-slate-400 font-normal">درجة الثقة</span>
                          <span className="bg-amber-100 dark:bg-amber-900/80 px-1.5 py-0.2 rounded text-[11px]">عالية</span>
                        </div>
                      </div>

                      {/* Top-Right Action Buttons (Save & Actions) */}
                      <div className="flex items-center gap-2 shrink-0">
                        <Button size="sm" className="gap-1.5 font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-2xs text-xs px-3.5">
                          <Bookmark className="size-3.5" />
                          حفظ
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1.5 font-bold border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs px-3">
                          <span>إجراءات</span>
                          <ChevronDown className="size-3.5 text-slate-400" />
                        </Button>
                      </div>

                    </div>

                    {/* Line 2: Headline / Description */}
                    {project.headline && (
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                        {project.headline}
                      </p>
                    )}

                    {/* Line 3: Crunchbase Metadata Icons Row */}
                    <div className="flex items-center gap-x-5 gap-y-2 flex-wrap text-xs text-slate-600 dark:text-slate-400 font-medium pt-0.5">
                      
                      {/* Founded */}
                      {hasVerifiedYear && (
                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                          <Calendar className="size-3.5 text-slate-400 shrink-0" />
                          <span>تأسست {getDisplayText(project.company.started)}</span>
                        </div>
                      )}

                      {/* Operating Type */}
                      {project.company.customer_type && (
                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                          <Building2 className="size-3.5 text-slate-400 shrink-0" />
                          <span>{project.company.customer_type}</span>
                        </div>
                      )}

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                        <MapPin className="size-3.5 text-emerald-600 shrink-0" />
                        <span>{locationInfo.flag} {locationInfo.name}</span>
                      </div>

                      {/* Team Size */}
                      {employeesText && employeesText !== 'غير مفصح عنه' && (
                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                          <Users className="size-3.5 text-indigo-500 shrink-0" />
                          <span>{employeesText}</span>
                        </div>
                      )}

                      {/* Official Website Link */}
                      {project.website && (
                        <a
                          href={project.website.startsWith('http') ? project.website : `https://${project.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline transition-all dir-ltr"
                          title="زيارة الموقع الرسمي للشركة"
                        >
                          <Globe className="size-3.5 text-blue-500 shrink-0" />
                          <span>{getCleanDomain(project.website)}</span>
                          <ExternalLink className="size-3 text-slate-400" />
                        </a>
                      )}
                    </div>

                    {/* Line 4: Category Pill Badges (Crunchbase Rounded-Full Chips) */}
                    {categoryTokens.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
                        {categoryTokens.map((token: string, idx: number) => (
                          <span
                            key={idx}
                            className="font-semibold text-xs text-blue-800 dark:text-blue-200 bg-blue-50 dark:bg-blue-950/80 px-3.5 py-1 rounded-full border border-blue-200/70 dark:border-blue-800/60 hover:bg-blue-100 hover:border-blue-300 transition-all cursor-pointer shadow-2xs"
                          >
                            {token}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>

                </div>
              </CardContent>

              <CardContent className="p-4 sm:p-6 bg-card space-y-4 border-t border-border/40">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  
                  <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-900/60 flex flex-col justify-between gap-1.5 min-h-[96px] shadow-2xs">
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">الإيراد الشهري الموثق</span>
                    <span 
                      className="text-base sm:text-lg font-extrabold text-emerald-700 dark:text-emerald-300 tracking-tight dir-ltr text-right break-words leading-tight"
                      title={getValuationText(project.directory_snapshot?.monthly_revenue)}
                    >
                      {getShortRevenueDisplay(project.directory_snapshot?.monthly_revenue)}
                    </span>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium leading-normal">
                      {translateConfidence(revenueEvidence?.confidence)}
                    </span>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between gap-1.5 min-h-[96px] shadow-2xs">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">الزيارات والانتشار</span>
                    <span 
                      className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 dir-ltr text-right break-words leading-tight"
                      title={getValuationText(project.directory_snapshot?.monthly_traffic)}
                    >
                      {getShortTrafficDisplay(project.directory_snapshot?.monthly_traffic)}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-normal">
                      {translateConfidence(trafficEvidence?.confidence)}
                    </span>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between gap-1.5 min-h-[96px] shadow-2xs">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">نموذج التمويل</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-tight break-words" title={getDisplayText(project.company?.funding || project.financials?.initial_investment)}>
                      {getDisplayText(project.company?.funding) || (project.financials?.initial_investment ? 'جولة استثمارية' : 'تمويل ذاتي')}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-normal">
                      {project.company?.bootstrapped ? 'تمويل ذاتي (Bootstrapped)' : (project.financials?.initial_investment ? 'استثمار معلن' : 'تمويل تشغيلي')}
                    </span>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between gap-1.5 min-h-[96px] shadow-2xs">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">التقييم / الاستحواذ</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-tight break-words" title={getValuationText(project.financials?.valuation)}>
                      {getShortValuationDisplay(project.financials?.valuation)}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-normal">
                      {translateClaimType(valuationEvidence?.claim_type)}
                    </span>
                  </div>
                </div>



                {revenueEvidence?.calculation && (
                  <div className="p-3.5 bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-900/60 rounded-xl text-sky-950 dark:text-sky-100 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="font-bold text-sky-900 dark:text-sky-200 flex items-center gap-1.5">
                        <TrendingUp className="size-4 text-sky-600 dark:text-sky-400" />
                        المعادلة الحسابية الموثقة من التقارير الرسمية:
                      </span>
                      <p className="text-sky-800 dark:text-sky-300 font-medium leading-relaxed">
                        {getDisplayText(revenueEvidence.evidence_summary) || `الإيراد المعلن يعطي متوسطاً قدره ${getDisplayText(revenueEvidence.calculation.rounded_display_value)}.`}
                      </p>
                    </div>
                    {revenueEvidence.calculation.formula && (
                      <Badge variant="outline" className="bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 border-sky-300 dark:border-sky-700 font-mono text-xs font-bold shrink-0 dir-ltr">
                        {getDisplayText(revenueEvidence.calculation.formula)} = {getDisplayText(revenueEvidence.calculation.rounded_display_value)}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Crunchbase Overview Key-Value Details Grid */}
            <Card className="shadow-xs border-border/60 rounded-2xl overflow-hidden bg-card">
              <CardHeader className="border-b border-border/40 p-4 sm:p-5 bg-muted/20">
                <CardTitle className="text-base font-bold flex items-center justify-between gap-2 text-foreground">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                      <Building2 className="size-4" />
                    </div>
                    <span>بيانات الشركة والتشغيل الأساسية (Overview Details)</span>
                  </div>
                  <Badge variant="outline" className="text-xs font-bold bg-background text-muted-foreground border-border">
                    حقائق موثقة
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/40 space-y-1">
                    <span className="text-muted-foreground font-medium block text-[11px]">المؤسسون</span>
                    <span className="font-bold text-foreground block text-sm">{foundersText}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/40 space-y-1">
                    <span className="text-muted-foreground font-medium block text-[11px]">عام التأسيس</span>
                    <span className="font-bold text-foreground block text-sm">{hasVerifiedYear ? getDisplayText(project.company.started) : 'غير مفصح'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/40 space-y-1">
                    <span className="text-muted-foreground font-medium block text-[11px]">المقر الرئيسي</span>
                    <span className="font-bold text-foreground block text-sm">{locationInfo.flag} {locationInfo.name}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/40 space-y-1">
                    <span className="text-muted-foreground font-medium block text-[11px]">حجم القوى العاملة</span>
                    <span className="font-bold text-foreground block text-sm">{employeesText}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/40 space-y-1">
                    <span className="text-muted-foreground font-medium block text-[11px]">نموذج الربح والتشغيل</span>
                    <span className="font-bold text-foreground block text-sm">{getDisplayText(project.company.business_model) || 'غير مفصح'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/40 space-y-1">
                    <span className="text-muted-foreground font-medium block text-[11px]">طبيعة التمويل</span>
                    <span className="font-bold text-foreground block text-sm">{project.company?.bootstrapped ? 'تمويل ذاتي (Bootstrapped)' : (project.financials?.initial_investment ? 'جولة استثمارية' : 'تمويل تشغيلي')}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/40 space-y-1">
                    <span className="text-muted-foreground font-medium block text-[11px]">التقييم وسقف النمو</span>
                    <span className="font-bold text-foreground block text-sm">{getShortValuationDisplay(project.financials?.valuation)}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/40 space-y-1">
                    <span className="text-muted-foreground font-medium block text-[11px]">الموقع الرسمي</span>
                    {project.website ? (
                      <a
                        href={project.website.startsWith('http') ? project.website : `https://${project.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-primary hover:underline block text-sm truncate dir-ltr text-right"
                      >
                        {getCleanDomain(project.website)}
                      </a>
                    ) : (
                      <span className="font-bold text-foreground block text-sm">غير متاح</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 02: المشكلة والحل المبتكر */}
          <section id="problem-and-solution" className="profile-section scroll-mt-24 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/40 pb-2">
              <span className="bg-primary text-primary-foreground font-mono text-xs font-bold px-2 py-0.5 rounded-md">02</span>
              <h2 className="text-lg font-bold text-foreground">المشكلة والحل المبتكر</h2>
            </div>

            <Card className="shadow-xs border-border/60 rounded-2xl overflow-hidden bg-card">
              <CardHeader className="border-b border-border/40 bg-muted/20 p-4 sm:p-5">
                <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <Lightbulb className="size-4" />
                  </div>
                  <span>تحليل المشكلة والحل المبتكر المقدم</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                {project.problem_and_product.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/30 border border-border/40">
                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground font-medium leading-relaxed">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Section 03: نموذج الربح ومصادر الإيرادات */}
          <section id="revenue-model" className="profile-section scroll-mt-24 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/40 pb-2">
              <span className="bg-emerald-600 text-white font-mono text-xs font-bold px-2 py-0.5 rounded-md">03</span>
              <h2 className="text-lg font-bold text-foreground">نموذج الربح ومصادر الإيرادات (Monetization & Revenue Model)</h2>
            </div>

            <Card className="shadow-xs border-emerald-200/70 dark:border-emerald-900/60 rounded-2xl overflow-hidden bg-card">
              <CardHeader className="border-b border-emerald-200/50 dark:border-emerald-900/40 p-4 sm:p-5 bg-emerald-50/30 dark:bg-emerald-950/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <CardTitle className="text-base font-bold flex items-center gap-2 text-emerald-950 dark:text-emerald-200">
                    <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      <DollarSign className="size-4" />
                    </div>
                    <span>تحليل استراتيجيات الربح وهيكلية العوائد المالية</span>
                  </CardTitle>

                  {modelEvidence && (
                    <Badge variant="outline" className={cn("text-[10px] font-bold py-0.5 px-2.5 rounded-md", getStatusMeta(modelEvidence.verification_status).className)}>
                      {getStatusMeta(modelEvidence.verification_status).label}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-4 sm:p-6 space-y-4">
                {project.company.customer_type && (
                  <div className="flex items-center gap-2 flex-wrap pb-1">
                    {getCategoryTokens(null, project.company.customer_type).map((typeToken: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="font-bold text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-200/60">
                        {typeToken}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Revenue Overview Text */}
                <div className="p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
                    ملخص آليات التسييل وتحقيق الإيراد:
                  </span>
                  <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">
                    {revenueInfo.summaryText}
                  </p>
                </div>

                {/* Documented Revenue Streams (if available) */}
                {project.monetization && project.monetization.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-emerald-200/40 dark:border-emerald-900/40">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider block">
                      مسارات الإيرادات والمنتجات المدفوعة الموثقة:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {project.monetization.map((mStream: string, idx: number) => (
                        <div key={idx} className="p-3 rounded-lg bg-emerald-50/30 dark:bg-emerald-950/30 border border-emerald-200/40 dark:border-emerald-900/40 flex items-start gap-2.5">
                          <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">{mStream}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Revenue Streams Grid */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-extrabold text-foreground uppercase tracking-wider block">
                    هيكلية قنوات التدفق النقدي المعيارية (Global Revenue Streams):
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {revenueInfo.streams.map((st, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-border/60 bg-muted/20 space-y-2 flex flex-col justify-between">
                        <div className="space-y-1">
                          <h4 className="font-bold text-xs sm:text-sm text-foreground">{st.title}</h4>
                          <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                            {st.desc}
                          </p>
                        </div>
                        <Badge variant="secondary" className="w-fit text-[10px] font-bold bg-emerald-100/70 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60">
                          {st.badge}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 04: نموذج التشغيل والإدارة الفنية */}
          <section id="operating-model" className="profile-section scroll-mt-24 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/40 pb-2">
              <span className="bg-blue-600 text-white font-mono text-xs font-bold px-2 py-0.5 rounded-md">04</span>
              <h2 className="text-lg font-bold text-foreground">نموذج التشغيل والإدارة الفنية (Operating Model & Execution Framework)</h2>
            </div>

            <Card className="shadow-xs border-blue-200/70 dark:border-blue-900/60 rounded-2xl overflow-hidden bg-card">
              <CardHeader className="border-b border-blue-200/50 dark:border-blue-900/40 p-4 sm:p-5 bg-blue-50/30 dark:bg-blue-950/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <CardTitle className="text-base font-bold flex items-center gap-2 text-blue-950 dark:text-blue-200">
                    <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      <Settings className="size-4" />
                    </div>
                    <span>تحليل الهيكل التشغيلي وآلية إدارة العمليات</span>
                  </CardTitle>

                  {locationEvidence && (
                    <Badge variant="outline" className={cn("text-[10px] font-bold py-0.5 px-2.5 rounded-md", getStatusMeta(locationEvidence.verification_status).className)}>
                      {getStatusMeta(locationEvidence.verification_status).label}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 space-y-4">
                {/* Operations Location Summary */}
                <div className="p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 space-y-1.5">
                  <span className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-blue-600" />
                    نطاق التشغيل والمقر الجغرافي:
                  </span>
                  <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">
                    {opsInfo.locationSummary}
                  </p>
                </div>

                {/* Documented Operations & Costs (if available) */}
                {project.costs_and_operations && project.costs_and_operations.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-blue-200/40 dark:border-blue-900/40">
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wider block">
                      تفاصيل الهيكل التشغيلي والتوسع الميداني:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {project.costs_and_operations.map((cOp: string, idx: number) => (
                        <div key={idx} className="p-3 rounded-lg bg-blue-50/30 dark:bg-blue-950/30 border border-blue-200/40 dark:border-blue-900/40 flex items-start gap-2.5">
                          <Settings className="size-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">{cOp}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Operational Pillars Grid */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-extrabold text-foreground uppercase tracking-wider block">
                    ركائز النموذج التشغيلي العالمي (Operating Engine):
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {opsInfo.opsPillars.map((op, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-border/60 bg-muted/20 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            <Zap className="size-3.5" />
                          </div>
                          <h4 className="font-bold text-xs sm:text-sm text-foreground">{op.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                          {op.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="financial-growth" className="profile-section scroll-mt-24 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/40 pb-2">
              <span className="bg-emerald-600 text-white font-mono text-xs font-bold px-2 py-0.5 rounded-md">05</span>
              <h2 className="text-lg font-bold text-foreground">النمو والجدول الزمني للإيراد</h2>
            </div>

            <Card className="shadow-xs border-border/60 rounded-2xl overflow-hidden bg-card">
              <CardHeader className="border-b border-border/40 bg-muted/20 p-4 sm:p-5">
                <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                  <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    <TrendingUp className="size-4" />
                  </div>
                  <span>المخطط الزمني للإيرادات والتوسع المالي</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {project.revenue_timeline.map((rt: any, i: number) => (
                  <div key={i} className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-background text-xs font-bold border-border">
                          {getDisplayText(rt.date)}
                        </Badge>
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-0 font-bold text-[11px]">
                          {getDisplayText(rt.type)}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mt-2">{getDisplayText(rt.note)}</p>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-700 tracking-tight dir-ltr">
                      {getDisplayText(rt.amount)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-xs border-border/60 rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600">
                    <UserCircle2 className="size-4" />
                  </div>
                  المؤسس وقصة البداية والتمويل
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                {project.origin_story.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/30 border border-border/40">
                    <div className="size-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                    <p className="text-sm text-foreground font-medium leading-relaxed">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-xs border-border/60 rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600">
                    <Globe className="size-4" />
                  </div>
                  معدلات النمو والتوسع الميداني
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                {project.growth.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/30 border border-border/40">
                    <TrendingUp className="size-4 text-cyan-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground font-medium leading-relaxed">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section id="tech-stack" className="profile-section scroll-mt-24 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/40 pb-2">
              <span className="bg-primary text-primary-foreground font-mono text-xs font-bold px-2 py-0.5 rounded-md">06</span>
              <h2 className="text-lg font-bold text-foreground">البنية التقنية والأدوات</h2>
            </div>

            <Card className="shadow-xs border-border/60 bg-card rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-border/40 bg-muted/20 p-4 sm:p-5">
                <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <Code className="size-4" />
                  </div>
                  <span>المكونات والتقنيات البرمجية والتشغيلية (Tech & Infrastructure)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6">
                
                {/* Short Tech Badges Grid */}
                {hasShortBadges && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categorizedTools.frontend.length > 0 && (
                      <div className="p-4 rounded-xl bg-background border border-border/60 space-y-2.5">
                        <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <Layout className="size-3.5 text-primary" />
                          الواجهة والتصميم (Frontend & Design)
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {categorizedTools.frontend.map((t: string, idx: number) => (
                            <Badge key={idx} variant="outline" className={cn("text-xs font-bold px-2.5 py-1 rounded-lg border", getToolBranding(t).colors)}>
                              {getToolBranding(t).icon}
                              <span className="ms-1.5">{t}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {categorizedTools.backend.length > 0 && (
                      <div className="p-4 rounded-xl bg-background border border-border/60 space-y-2.5">
                        <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <Database className="size-3.5 text-blue-600" />
                          الخلفية والسحابة (Backend & Cloud)
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {categorizedTools.backend.map((t: string, idx: number) => (
                            <Badge key={idx} variant="outline" className={cn("text-xs font-bold px-2.5 py-1 rounded-lg border", getToolBranding(t).colors)}>
                              {getToolBranding(t).icon}
                              <span className="ms-1.5">{t}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {categorizedTools.ai.length > 0 && (
                      <div className="p-4 rounded-xl bg-background border border-border/60 space-y-2.5">
                        <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <Bot className="size-3.5 text-amber-600" />
                          الذكاء الاصطناعي والأتمتة (AI & Automation)
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {categorizedTools.ai.map((t: string, idx: number) => (
                            <Badge key={idx} variant="outline" className={cn("text-xs font-bold px-2.5 py-1 rounded-lg border", getToolBranding(t).colors)}>
                              {getToolBranding(t).icon}
                              <span className="ms-1.5">{t}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {categorizedTools.shortOther.length > 0 && (
                      <div className="p-4 rounded-xl bg-background border border-border/60 space-y-2.5">
                        <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <Boxes className="size-3.5 text-slate-600" />
                          أدوات وتقنيات مساعدة
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {categorizedTools.shortOther.map((t: string, idx: number) => (
                            <Badge key={idx} variant="outline" className={cn("text-xs font-bold px-2.5 py-1 rounded-lg border", getToolBranding(t).colors)}>
                              {getToolBranding(t).icon}
                              <span className="ms-1.5">{t}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Descriptive Operational Tools Grid */}
                {descriptiveTools.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2">
                      <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <Boxes className="size-4 text-primary" />
                        الأدوات والتكاملات والبنية التشغيلية
                      </h4>
                      <Badge variant="outline" className="text-[10px] font-bold bg-muted text-muted-foreground border-border">
                        {descriptiveTools.length} عناصر ومرافق
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {descriptiveTools.map((tool: string, idx: number) => {
                        const parsed = parseToolItem(tool);

                        return (
                          <div 
                            key={idx} 
                            className="p-4 rounded-xl bg-background border border-border/60 shadow-2xs hover:border-primary/40 transition-all flex flex-col justify-between gap-2.5 group"
                          >
                            <div className="space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Code className="size-3.5" />
                                  </div>
                                  <h5 className="font-bold text-xs sm:text-sm text-foreground leading-snug" title={parsed.title}>
                                    {parsed.title}
                                  </h5>
                                </div>

                                {parsed.brandBadge && (
                                  <Badge variant="secondary" className="font-mono text-[10px] font-bold bg-muted text-muted-foreground border border-border shrink-0">
                                    {parsed.brandBadge}
                                  </Badge>
                                )}
                              </div>

                              {parsed.description && (
                                <p className="text-xs text-muted-foreground font-medium leading-relaxed bg-muted/20 p-2.5 rounded-lg border border-border/40">
                                  {parsed.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {project.tools.length === 0 && (
                  <p className="text-xs text-muted-foreground font-medium text-center py-4">
                    لم يتم رصد قائمة أدوات تقنية محددة رسمياً لهذه الشركة.
                  </p>
                )}
              </CardContent>
            </Card>
          </section>

          <section id="lessons-and-sources" className="profile-section scroll-mt-24 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/40 pb-2">
              <span className="bg-amber-600 text-white font-mono text-xs font-bold px-2 py-0.5 rounded-md">07</span>
              <h2 className="text-lg font-bold text-foreground">الدروس وشواهد التوثيق</h2>
            </div>

            <Card className="shadow-xs border-border/60 bg-card rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-border/40 bg-muted/20 p-4 sm:p-5">
                <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                  <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                    <FileText className="size-4" />
                  </div>
                  <span>خلاصة الدروس المستفادة والاستراتيجيات للمؤسسين</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                {project.lessons.map((item: any, i: number) => (
                  <div key={i} className="p-4 rounded-xl bg-background border border-amber-200/60 shadow-xs flex items-start gap-3">
                    <div className="p-1 rounded bg-amber-100 text-amber-700 shrink-0 mt-0.5">
                      <Check className="size-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
                      {item.description && (
                        <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {rawProject.verification && (
              <Card className="border-emerald-200/80 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs rounded-2xl overflow-hidden">
                <CardHeader className="p-4 sm:p-5 bg-emerald-50/40 dark:bg-emerald-950/40">
                  <button
                    type="button"
                    onClick={() => setIsPolicyOpen(!isPolicyOpen)}
                    className="w-full flex items-center justify-between gap-4 text-right focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 shrink-0">
                        <ShieldCheck className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                          سياسة التوثيق وحدود الاستدلال الدقيقة
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5 line-clamp-1">
                          {getDisplayText(rawProject.verification.source_policy)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-300 font-bold text-xs">
                        {isPolicyOpen ? 'عرض أقل' : 'مطوي'}
                      </Badge>
                      <div className="p-1.5 rounded-lg bg-emerald-100/60 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                        {isPolicyOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                      </div>
                    </div>
                  </button>
                </CardHeader>

                {isPolicyOpen && (
                  <CardContent className="p-4 sm:p-5 border-t border-emerald-200/60 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-3">
                    <div className="p-3 rounded-xl bg-background/80 border border-emerald-200/60 text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      {getDisplayText(rawProject.verification.source_policy)}
                    </div>
                    {rawProject.verification.important_notes && rawProject.verification.important_notes.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider block">
                          حدود الاستدلال الشفافة والملاحظات الميدانية:
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                          {toTextList(rawProject.verification.important_notes).map((note: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2 bg-background p-2.5 rounded-lg border border-emerald-200/60 shadow-2xs">
                              <div className="size-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                              <span className="leading-relaxed">{note}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            )}

            <Card className="shadow-xs border-border/60 rounded-2xl overflow-hidden">
              <CardHeader className="p-4 sm:p-5 bg-card">
                <button
                  type="button"
                  onClick={() => setIsSourcesOpen(!isSourcesOpen)}
                  className="w-full flex items-center justify-between gap-4 text-right focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Link className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                        المصادر الرسمية وتقارير التوثيق الميداني
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">
                        انقر للفتح أو الطي ({allSourcesList.length} مصادر رسمية ومستندات موثقة)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-border text-xs font-bold">
                      {isSourcesOpen ? 'عرض أقل' : 'مطوي'}
                    </Badge>
                    <div className="p-1.5 rounded-lg bg-muted/40 text-muted-foreground">
                      {isSourcesOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                    </div>
                  </div>
                </button>
              </CardHeader>

              {isSourcesOpen && (
                <CardContent className="p-4 sm:p-5 border-t border-border/40 bg-muted/20 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {allSourcesList.map((src, idx) => (
                      <div key={idx} className="p-3.5 border border-border/60 rounded-xl bg-card hover:border-primary/40 transition-colors space-y-1.5">
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-primary hover:underline flex items-center justify-between gap-2 text-xs"
                        >
                          <span className="line-clamp-1">{getDisplayText(src.title)}</span>
                          <ExternalLink className="size-3.5 shrink-0" />
                        </a>
                        {(src.publisher || src.locator) && (
                          <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground flex-wrap">
                            <span>{getDisplayText(src.publisher)}</span>
                            {src.locator && (
                              <>
                                <span>•</span>
                                <span className="font-mono text-foreground font-bold">{getDisplayText(src.locator)}</span>
                              </>
                            )}
                          </div>
                        )}
                        {src.supports && (
                          <div className="pt-1.5 border-t border-border/40">
                            <p className="text-xs text-foreground font-medium leading-relaxed">
                              ✓ {getDisplayText(src.supports)}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>

            <Card className="shadow-xs border-border/60 rounded-2xl overflow-hidden">
              <CardHeader className="p-4 sm:p-5 bg-card">
                <button
                  type="button"
                  onClick={() => setIsQualityOpen(!isQualityOpen)}
                  className="w-full flex items-center justify-between gap-4 text-right focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shrink-0">
                      <CheckCircle2 className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">
                        معايير التوثيق وجودة البيانات
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">
                        انقر للفتح أو الطي ({project.data_quality?.length || 0} معايير جودة وتدقيق)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-border text-xs font-bold">
                      {isQualityOpen ? 'عرض أقل' : 'مطوي'}
                    </Badge>
                    <div className="p-1.5 rounded-lg bg-muted/40 text-muted-foreground">
                      {isQualityOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                    </div>
                  </div>
                </button>
              </CardHeader>

              {isQualityOpen && (
                <CardContent className="p-4 sm:p-5 border-t border-border/40 bg-muted/20">
                  <div className="space-y-2.5">
                    {project.data_quality.map((item: string, i: number) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-card border border-border/40 text-xs font-medium text-foreground leading-relaxed">
                        <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </section>

          {/* Section 06: Similar Companies & Related Sectors */}
          <section id="related-companies-and-sectors" className="profile-section scroll-mt-24 space-y-6">
            <div className="flex items-center gap-2 border-b border-border/40 pb-2">
              <span className="bg-teal-600 text-white font-mono text-xs font-bold px-2 py-0.5 rounded-md">08</span>
              <h2 className="text-lg font-bold text-foreground">شركات مماثلة وقطاعات مرتبطة</h2>
            </div>

            {/* Subsection 1: Separate Table for Similar Companies (جدول الشركات المماثلة) */}
            <Card className="shadow-xs border-border/60 rounded-2xl overflow-hidden bg-card">
              <CardHeader className="border-b border-border/40 bg-muted/20 p-4 sm:p-5">
                <CardTitle className="text-base font-bold flex items-center justify-between gap-2 text-foreground">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
                      <Building2 className="size-4" />
                    </div>
                    <span>جدول الشركات المماثلة والمنافسة في المجال</span>
                  </div>
                  <Badge variant="outline" className="text-xs font-bold bg-background text-muted-foreground border-border">
                    مقارنة معيارية (Benchmarking Table)
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {isLoadingSimilar ? (
                  <div className="py-12 flex items-center justify-center text-muted-foreground gap-2 text-xs">
                    <Loader2 className="size-4 animate-spin text-teal-600" />
                    <span>جاري جلب بيانات الشركات المماثلة من قاعدة البيانات...</span>
                  </div>
                ) : similarProjects.length > 0 ? (
                  <div className="w-full">
                    <Table>
                      <TableHeader className="bg-muted/40 border-b border-border/60">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-[280px] font-bold text-xs">المشروع والنشاط</TableHead>
                          <TableHead className="w-[140px] font-bold text-xs">التصنيف</TableHead>
                          <TableHead className="w-[150px] font-bold text-xs">الدولة والمقر</TableHead>
                          <TableHead className="w-[120px] font-bold text-xs">حالة البيانات</TableHead>
                          <TableHead className="w-[100px] font-bold text-xs text-center">الإجراء</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {similarProjects.map((comp: any) => {
                          const country = getCountryInfo(comp.company?.location || '');
                          const badgeLabel = (comp.category || 'شركة مماثلة').split('/')[0].trim();
                          const isVerified = Boolean(comp.verification || comp.evidence_map);

                          return (
                            <TableRow
                              key={comp.id || comp.slug}
                              onClick={() => onSelectProject?.(comp)}
                              className="cursor-pointer hover:bg-teal-50/40 dark:hover:bg-teal-950/20 transition-colors border-b border-border/40 group"
                            >
                              {/* Company Name & Headline */}
                              <TableCell className="py-3 font-medium">
                                <div className="flex items-center gap-3">
                                  <div className="size-8 rounded-lg bg-teal-600/10 text-teal-700 dark:bg-teal-950 dark:text-teal-300 font-bold text-xs flex items-center justify-center border border-teal-200 dark:border-teal-800 shrink-0 group-hover:scale-105 transition-transform">
                                    {comp.name ? comp.name.charAt(0).toUpperCase() : 'C'}
                                  </div>
                                  <div className="flex flex-col min-w-0">
                                    <span className="font-bold text-foreground text-xs sm:text-sm group-hover:text-teal-600 transition-colors truncate flex items-center gap-1">
                                      {comp.name}
                                      {isVerified && (
                                        <span title="شركة موثقة بمصادر رسمية">
                                          <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
                                        </span>
                                      )}
                                    </span>
                                    <span className="text-[11px] text-muted-foreground truncate max-w-[200px]" title={comp.headline}>
                                      {comp.headline || comp.company?.business_model || 'تحليل ومقارنة نشاط الشركة'}
                                    </span>
                                  </div>
                                </div>
                              </TableCell>

                              {/* Category */}
                              <TableCell className="py-3">
                                <Badge variant="secondary" className="text-[11px] font-bold bg-muted text-muted-foreground border border-border/60 max-w-[130px] truncate">
                                  {badgeLabel}
                                </Badge>
                              </TableCell>

                              {/* Location */}
                              <TableCell className="py-3">
                                <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                                  <span>{country.flag}</span>
                                  <span className="truncate max-w-[120px]">{country.name}</span>
                                </div>
                              </TableCell>

                              {/* Data Status */}
                              <TableCell className="py-3">
                                <Badge variant="outline" className="text-[10px] font-bold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200">
                                  {isVerified ? 'موثقة رسمياً' : 'مقارنة سوقية'}
                                </Badge>
                              </TableCell>

                              {/* Action */}
                              <TableCell className="py-3 text-center">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectProject?.(comp);
                                  }}
                                  className="h-8 px-2.5 text-xs font-bold text-teal-700 hover:text-teal-800 hover:bg-teal-100/60 dark:text-teal-300 dark:hover:bg-teal-900/60 rounded-lg gap-1 transition-all"
                                >
                                  <span>استعراض</span>
                                  <ChevronLeft className="size-3.5 text-teal-600" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-muted-foreground font-medium">
                    لا تتوفر شركات مماثلة إضافية في هذا القطاع حالياً.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subsection 2: Separate Table for Related Sectors (جدول القطاعات المرتبطة) */}
            <Card className="shadow-xs border-border/60 rounded-2xl overflow-hidden bg-card">
              <CardHeader className="border-b border-border/40 bg-muted/20 p-4 sm:p-5">
                <CardTitle className="text-base font-bold flex items-center justify-between gap-2 text-foreground">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      <Compass className="size-4" />
                    </div>
                    <span>جدول القطاعات وفرص النمو المرتبطة</span>
                  </div>
                  <Badge variant="outline" className="text-xs font-bold bg-background text-muted-foreground border-border">
                    تحليل فرص التوسع الرقمي
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="w-full overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/40 border-b border-border/60">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[220px] font-bold text-xs">القطاع / المجال المرتبط</TableHead>
                        <TableHead className="w-[180px] font-bold text-xs">نوع الفرصة السوقية</TableHead>
                        <TableHead className="min-w-[280px] font-bold text-xs">طبيعة الطلب والقيمة المضافة</TableHead>
                        <TableHead className="w-[140px] font-bold text-xs">درجة الجاهزية</TableHead>
                        <TableHead className="w-[140px] font-bold text-xs text-center">التوجيه الإستراتيجي</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(categoryTokens.length > 0 ? categoryTokens : ['التجارة الرقمية والخدمات اللوجستية', 'حلول المدفوعات والتمويل المباشر']).map((token: string, idx: number) => {
                        const isEven = idx % 2 === 0;
                        const sectorTitle = token.startsWith('قطاع') ? token : `قطاع ${token}`;

                        let oppType = isEven ? "بنية تحتية وحلول سحابية B2B" : "منصات وتكامل خدمات مباشرة";
                        let desc = isEven 
                          ? `توفير أدوات وأنظمة تشغيلية ترفع كفاءة الأعمال وتخفض تكاليف الإدارة المباشرة في سوق ${token}.`
                          : `فرص إحلال وتطوير قنوات بيع وخدمات عملاء مبتكرة في قطاع ${token} تخدم شريحة متنامية.`;
                        let readiness = isEven ? "طلب إقليمي مرتفع" : "نمو سوقي واعد";
                        let action = isEven ? "تطوير حل برمجي مخصص" : "ربط شبكي وتكامل API";

                        if (token.toLowerCase().includes('saas') || token.toLowerCase().includes('برمجيات')) {
                          oppType = "اشتراكات سحابية B2B";
                          desc = "حلول برمجية بنظام الاشتراك الشهرية لتمكين الشركات والأفراد من إدارة الأعمال بسهولة.";
                          readiness = "أولوية عالية جداً";
                          action = "بناء بنية سحابية";
                        } else if (token.toLowerCase().includes('تجارة') || token.toLowerCase().includes('إلكترونية')) {
                          oppType = "تكامل التجارة الرقمية";
                          desc = "ربط المتاجر، المدفوعات، والشحن في منصة موحدة تخدم تجار المنطقة.";
                          readiness = "سوق ضخم وجاهز";
                          action = "تكامل القنوات والمبيعات";
                        }

                        return (
                          <TableRow key={idx} className="hover:bg-muted/30 transition-colors border-b border-border/40">
                            {/* Sector Name */}
                            <TableCell className="py-3 font-bold text-xs sm:text-sm text-foreground">
                              <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0">
                                  <Layers className="size-3.5" />
                                </div>
                                <span>{sectorTitle}</span>
                              </div>
                            </TableCell>

                            {/* Opportunity Type */}
                            <TableCell className="py-3">
                              <Badge variant="outline" className="text-[11px] font-bold bg-primary/5 text-primary border-primary/20 max-w-[170px] truncate">
                                {oppType}
                              </Badge>
                            </TableCell>

                            {/* Description */}
                            <TableCell className="py-3 text-xs text-muted-foreground font-medium leading-relaxed">
                              {desc}
                            </TableCell>

                            {/* Readiness */}
                            <TableCell className="py-3">
                              <Badge variant="secondary" className="text-[10px] font-bold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200/60">
                                {readiness}
                              </Badge>
                            </TableCell>

                            {/* Strategic Action */}
                            <TableCell className="py-3 text-center">
                              <Badge variant="outline" className="text-[10px] font-bold bg-background text-foreground border-border">
                                {action}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </section>

        </div>

      </div>
    </div>
  );
};
