import React, { useMemo, useState } from 'react';
import * as LucideIcons from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/Input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const SafeIcon = ({ iconName, ...props }: { iconName: string; [key: string]: any }) => {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<any>>)[iconName] ?? LucideIcons.HelpCircle;
  return <Icon {...props} />;
};

interface DiscoverySector {
  id: string;
  label: string;
  exists: boolean;
  isNew?: boolean;
}

interface DiscoveryGroup {
  title: string;
  iconName: string;
  tone: {
    card: string;
    icon: string;
    badge: string;
    item: string;
    itemActive: string;
  };
  description: string;
  sectors: DiscoverySector[];
  gatekeepers: string[];
}

const DISCOVERY_DATA: DiscoveryGroup[] = [
  {
    title: 'الإعلانات والتسويق',
    iconName: 'Megaphone',
    description: 'قطاعات مناسبة للمشاريع التي تبني الطلب، تعزز الوصول، أو تحسن أداء القنوات التسويقية.',
    gatekeepers: ['Google', 'Meta', 'TikTok', 'Publicis'],
    tone: {
      card: 'border-sky-200 bg-sky-50/70',
      icon: 'border-sky-200 bg-white text-sky-700',
      badge: 'border-sky-200 bg-sky-100 text-sky-900',
      item: 'border-sky-200 bg-white hover:border-sky-300',
      itemActive: 'border-sky-400 bg-sky-50',
    },
    sectors: [
      { id: 'advertising-dashboard', label: 'الإعلانات الرقمية والتقليدية', exists: true },
      { id: 'marketing-dashboard', label: 'الاستراتيجيات التسويقية', exists: true },
      { id: 'brands-leaders-dashboard', label: 'العلامات التجارية والقيادة السوقية', exists: true },
      { id: 'influencer-marketing-dashboard', label: 'التسويق عبر المؤثرين', exists: true, isNew: true },
      { id: 'seo-content-marketing', label: 'تحسين الظهور والمحتوى SEO', exists: true },
    ],
  },
  {
    title: 'الزراعة والموارد الطبيعية',
    iconName: 'Sprout',
    description: 'للمشاريع المرتبطة بالإنتاج الزراعي، الأمن الغذائي، والاستثمار في سلاسل الإمداد الطبيعية.',
    gatekeepers: ['Bayer', 'Nutrien', 'John Deere', 'Syngenta'],
    tone: {
      card: 'border-emerald-200 bg-emerald-50/70',
      icon: 'border-emerald-200 bg-white text-emerald-700',
      badge: 'border-emerald-200 bg-emerald-100 text-emerald-900',
      item: 'border-emerald-200 bg-white hover:border-emerald-300',
      itemActive: 'border-emerald-400 bg-emerald-50',
    },
    sectors: [
      { id: 'farming-dashboard', label: 'الإنتاج الزراعي والمحاصيل', exists: true },
      { id: 'fisheries-aquaculture-dashboard', label: 'الثروة السمكية والاستزراع', exists: true },
      { id: 'forestry-dashboard', label: 'الغابات والأخشاب', exists: true },
      { id: 'agritech-dashboard', label: 'التقنيات الزراعية Agritech', exists: true, isNew: true },
      { id: 'seeds-crop-protection-dashboard', label: 'البذور وحماية المحاصيل', exists: true, isNew: true },
    ],
  },
  {
    title: 'الكيمياء والموارد',
    iconName: 'FlaskConical',
    description: 'مفيد لدراسة صناعات المواد الخام، الصناعات الكيميائية، والتحويل الصناعي.',
    gatekeepers: ['BASF', 'Dow', 'SABIC', 'Sinopec'],
    tone: {
      card: 'border-violet-200 bg-violet-50/75',
      icon: 'border-violet-200 bg-white text-violet-700',
      badge: 'border-violet-200 bg-violet-100 text-violet-900',
      item: 'border-violet-200 bg-white hover:border-violet-300',
      itemActive: 'border-violet-400 bg-violet-50',
    },
    sectors: [
      { id: 'chemical-industry-dashboard', label: 'الصناعات الكيميائية', exists: true },
      { id: 'fossil-fuels-dashboard', label: 'الوقود الأحفوري والطاقة التقليدية', exists: true },
      { id: 'mining-dashboard', label: 'التعدين والمعادن الخام', exists: true },
      { id: 'petroleum-refinery-dashboard', label: 'التكرير والمشتقات النفطية', exists: true },
      { id: 'plastic-rubber-dashboard', label: 'البلاستيك والمطاط', exists: true },
    ],
  },
  {
    title: 'البناء والإنشاءات',
    iconName: 'Building2',
    description: 'يخدم المستثمر الذي يبحث عن فرص في العقود، البناء الذكي، أو مكونات التطوير العمراني.',
    gatekeepers: ['Bechtel', 'VINCI', 'Larsen & Toubro'],
    tone: {
      card: 'border-amber-200 bg-amber-50/75',
      icon: 'border-amber-200 bg-white text-amber-700',
      badge: 'border-amber-200 bg-amber-100 text-amber-900',
      item: 'border-amber-200 bg-white hover:border-amber-300',
      itemActive: 'border-amber-400 bg-amber-50',
    },
    sectors: [
      { id: 'building-construction-dashboard', label: 'البناء والإنشاءات العامة', exists: true },
      { id: 'heavy-construction-dashboard', label: 'المشاريع الثقيلة والبنية التحتية', exists: true },
      { id: 'smart-construction-bim-dashboard', label: 'البناء الذكي ونمذجة BIM', exists: true },
      { id: 'modular-prefab-construction-dashboard', label: 'البناء المعياري والمسبق الصنع', exists: true, isNew: true },
    ],
  },
  {
    title: 'السلع الاستهلاكية FMCG',
    iconName: 'ShoppingBag',
    description: 'لفحص فرص المنتجات اليومية، سلوك الشراء، والتوسع في أسواق الاستهلاك السريع.',
    gatekeepers: ['Unilever', 'P&G', 'Nestle', 'PepsiCo'],
    tone: {
      card: 'border-rose-200 bg-rose-50/75',
      icon: 'border-rose-200 bg-white text-rose-700',
      badge: 'border-rose-200 bg-rose-100 text-rose-900',
      item: 'border-rose-200 bg-white hover:border-rose-300',
      itemActive: 'border-rose-400 bg-rose-50',
    },
    sectors: [
      { id: 'food-nutrition-dashboard', label: 'الأغذية والتغذية', exists: true },
      { id: 'cleaning-products-dashboard', label: 'منتجات التنظيف', exists: true },
      { id: 'cosmetics-personal-care-dashboard', label: 'التجميل والعناية الشخصية', exists: true },
      { id: 'furniture-household-dashboard', label: 'الأثاث والمنتجات المنزلية', exists: true },
      { id: 'packaged-foods-dashboard', label: 'الأغذية المعبأة', exists: true },
    ],
  },
  {
    title: 'التجارة الإلكترونية',
    iconName: 'ShoppingCart',
    description: 'مناسب للمشاريع الرقمية التي تعتمد على المتاجر، المنصات، أو تحسين رحلة الشراء.',
    gatekeepers: ['Amazon', 'Alibaba', 'Shopify', 'Noon'],
    tone: {
      card: 'border-cyan-200 bg-cyan-50/75',
      icon: 'border-cyan-200 bg-white text-cyan-700',
      badge: 'border-cyan-200 bg-cyan-100 text-cyan-900',
      item: 'border-cyan-200 bg-white hover:border-cyan-300',
      itemActive: 'border-cyan-400 bg-cyan-50',
    },
    sectors: [
      { id: 'b2b-ecommerce-dashboard', label: 'التجارة الإلكترونية بين الشركات (B2B)', exists: true },
      { id: 'b2c-ecommerce-dashboard', label: 'التجارة الإلكترونية للمستهلك (B2C)', exists: true },
      { id: 'c2c-ecommerce-dashboard', label: 'التجارة بين الأفراد (C2C)', exists: true },
      { id: 'digital-shopping-behaviour-dashboard', label: 'سلوك الشراء الرقمي', exists: true },
      { id: 'paid-content-dashboard', label: 'المحتوى والخدمات الرقمية المدفوعة', exists: true },
    ],
  },
  {
    title: 'الاقتصاد والسياسة العامة',
    iconName: 'Landmark',
    description: 'دراسة مؤشرات التنمية، التجارة العالمية، والاستراتيجيات الحكومية والجيوسياسية.',
    gatekeepers: ['World Bank', 'IMF', 'OECD', 'WTO'],
    tone: {
      card: 'border-purple-200 bg-purple-50/75',
      icon: 'border-purple-200 bg-white text-purple-700',
      badge: 'border-purple-200 bg-purple-100 text-purple-900',
      item: 'border-purple-200 bg-white hover:border-purple-300',
      itemActive: 'border-purple-400 bg-purple-50',
    },
    sectors: [
      { id: 'economy-dashboard', label: 'الاقتصاد الكلي والتنمية', exists: true },
      { id: 'international-trade-dashboard', label: 'التجارة الدولية والتبادل', exists: true },
      { id: 'politics-dashboard', label: 'السياسات الحكومية والحوكمة', exists: true },
      { id: 'public-policy-economic-strategy-dashboard', label: 'الاستراتيجيات الاقتصادية والسياسة العامة', exists: true },
      { id: 'geopolitical-risk-global-trade-analysis-dashboard', label: 'المخاطر الجيوسياسية والتجارة العالمية', exists: true, isNew: true },
    ],
  },
  {
    title: 'المال والتأمين والـ Fintech',
    iconName: 'Coins',
    description: 'لبناء قرارات في الخدمات المالية، التأمين، والمدفوعات والاستثمار المؤسسي.',
    gatekeepers: ['Visa', 'Mastercard', 'BlackRock', 'Stripe'],
    tone: {
      card: 'border-lime-200 bg-lime-50/75',
      icon: 'border-lime-200 bg-white text-lime-700',
      badge: 'border-lime-200 bg-lime-100 text-lime-900',
      item: 'border-lime-200 bg-white hover:border-lime-300',
      itemActive: 'border-lime-400 bg-lime-50',
    },
    sectors: [
      { id: 'financial-institutions-dashboard', label: 'المؤسسات المالية والبنوك', exists: true },
      { id: 'financial-services-dashboard', label: 'الخدمات المالية المتخصصة', exists: true },
      { id: 'investments-dashboard', label: 'الاستثمار وإدارة الأصول', exists: true },
      { id: 'insurance-dashboard', label: 'التأمين والخدمات الإكتوارية', exists: true },
      { id: 'digital-payments-dashboard', label: 'المدفوعات الرقمية Fintech', exists: true, isNew: true },
    ],
  },
  {
    title: 'الصحة والأدوية والتقنيات الطبية',
    iconName: 'HeartPulse',
    description: 'لمراجعة فرص الرعاية، الحلول الصحية، والخدمات الطبية ذات القيمة العالية.',
    gatekeepers: ['Pfizer', 'Roche', 'Cleveland Clinic', 'UnitedHealth'],
    tone: {
      card: 'border-red-200 bg-red-50/75',
      icon: 'border-red-200 bg-white text-red-700',
      badge: 'border-red-200 bg-red-100 text-red-900',
      item: 'border-red-200 bg-white hover:border-red-300',
      itemActive: 'border-red-400 bg-red-50',
    },
    sectors: [
      { id: 'care-support-dashboard', label: 'الرعاية والدعم الصحي', exists: true },
      { id: 'hospitals-health-professionals-dashboard', label: 'المستشفيات والمهنيون الصحيون', exists: true },
      { id: 'health-system-dashboard', label: 'أنظمة وإدارة الصحة', exists: true },
      { id: 'pharma-market-dashboard', label: 'سوق الأدوية والتصنيع الدوائي', exists: true },
      { id: 'digital-health-dashboard', label: 'الصحة الرقمية والطب عن بعد', exists: true, isNew: true },
    ],
  },
  {
    title: 'التكنولوجيا والاتصالات',
    iconName: 'Cpu',
    description: 'واجهة مناسبة لاختيار مسارات البرمجيات، البنية الرقمية، والابتكار التقني.',
    gatekeepers: ['Microsoft', 'Google Cloud', 'Oracle', 'Cisco'],
    tone: {
      card: 'border-indigo-200 bg-indigo-50/75',
      icon: 'border-indigo-200 bg-white text-indigo-700',
      badge: 'border-indigo-200 bg-indigo-100 text-indigo-900',
      item: 'border-indigo-200 bg-white hover:border-indigo-300',
      itemActive: 'border-indigo-400 bg-indigo-50',
    },
    sectors: [
      { id: 'software-dashboard', label: 'البرمجيات وحلول السحاب SaaS', exists: true },
      { id: 'it-services-dashboard', label: 'خدمات تقنية المعلومات والاستشارات', exists: true },
      { id: 'telecommunications-dashboard', label: 'الاتصالات والبنية التحتية', exists: true },
      { id: 'artificial-intelligence-dashboard', label: 'منصات الذكاء الاصطناعي AI', exists: true, isNew: true },
      { id: 'cloud-services-dashboard', label: 'الخدمات والحوسبة السحابية', exists: true, isNew: true },
    ],
  },
  {
    title: 'النقل واللوجستيات',
    iconName: 'Truck',
    description: 'لفهم سلاسل التوريد، النقل الذكي، والبنية التشغيلية للأسواق المتحركة.',
    gatekeepers: ['DHL', 'Maersk', 'Uber Freight', 'FedEx'],
    tone: {
      card: 'border-orange-200 bg-orange-50/75',
      icon: 'border-orange-200 bg-white text-orange-700',
      badge: 'border-orange-200 bg-orange-100 text-orange-900',
      item: 'border-orange-200 bg-white hover:border-orange-300',
      itemActive: 'border-orange-400 bg-orange-50',
    },
    sectors: [
      { id: 'logistics-dashboard', label: 'الخدمات اللوجستية والتخزين', exists: true },
      { id: 'public-transport-dashboard', label: 'النقل العام والتنقل', exists: true },
      { id: 'rail-transport-dashboard', label: 'النقل بالسكك الحديدية', exists: true },
      { id: 'vehicles-road-traffic-dashboard', label: 'المركبات وحركة الطرق', exists: true },
      { id: 'autonomous-vehicles-dashboard', label: 'المركبات الذاتية القيادة', exists: true, isNew: true },
    ],
  },
  {
    title: 'السياحة والضيافة',
    iconName: 'PlaneTakeoff',
    description: 'للمشاريع التي تستهدف تجربة الزائر، التشغيل الفندقي، أو خدمات السفر المتخصصة.',
    gatekeepers: ['Booking', 'Airbnb', 'Marriott', 'Amadeus'],
    tone: {
      card: 'border-fuchsia-200 bg-fuchsia-50/75',
      icon: 'border-fuchsia-200 bg-white text-fuchsia-700',
      badge: 'border-fuchsia-200 bg-fuchsia-100 text-fuchsia-900',
      item: 'border-fuchsia-200 bg-white hover:border-fuchsia-300',
      itemActive: 'border-fuchsia-400 bg-fuchsia-50',
    },
    sectors: [
      { id: 'accommodation-dashboard', label: 'الإقامة والفنادق والمنتجعات', exists: true },
      { id: 'business-travel-dashboard', label: 'سفر الأعمال وتنظيم المؤتمرات', exists: true },
      { id: 'food-drink-services-dashboard', label: 'المطاعم والضيافة', exists: true },
      { id: 'leisure-travel-dashboard', label: 'السفر الترفيهي والسياحة', exists: true },
      { id: 'travel-technology-dashboard', label: 'تقنيات وحلول السفر الذكي', exists: true, isNew: true },
    ],
  },
  {
    title: 'الطاقة والبيئة والتقنيات الخضراء',
    iconName: 'Leaf',
    description: 'لتحليل مسارات الطاقة، المناخ، الموارد المستدامة، والحلول البيئية الجديدة.',
    gatekeepers: ['Siemens Energy', 'Shell', 'Tesla Energy', 'Veolia'],
    tone: {
      card: 'border-teal-200 bg-teal-50/75',
      icon: 'border-teal-200 bg-white text-teal-700',
      badge: 'border-teal-200 bg-teal-100 text-teal-900',
      item: 'border-teal-200 bg-white hover:border-teal-300',
      itemActive: 'border-teal-400 bg-teal-50',
    },
    sectors: [
      { id: 'energy-dashboard', label: 'إنتاج وتوزيع الطاقة', exists: true },
      { id: 'climate-dashboard', label: 'حلول المناخ والانبعاثات', exists: true },
      { id: 'water-dashboard', label: 'تقنيات وإدارة المياه', exists: true },
      { id: 'waste-dashboard', label: 'إدارة وتدوير النفايات', exists: true },
      { id: 'renewable-energy-infrastructure-dashboard', label: 'البنية التحتية للطاقة المتجددة', exists: true, isNew: true },
    ],
  },
  {
    title: 'الإعلام والنشر الرقمي والترفيه',
    iconName: 'Tv',
    description: 'مشاريع الصوتيات، البث الرقمي، الألعاب الإلكترونية والنشر الرقمي الحديث.',
    gatekeepers: ['Spotify', 'Netflix', 'Sony Interactive', 'Tencent'],
    tone: {
      card: 'border-pink-200 bg-pink-50/75',
      icon: 'border-pink-200 bg-white text-pink-700',
      badge: 'border-pink-200 bg-pink-100 text-pink-900',
      item: 'border-pink-200 bg-white hover:border-pink-300',
      itemActive: 'border-pink-400 bg-pink-50',
    },
    sectors: [
      { id: 'audio-dashboard', label: 'الصوتيات والمحتوى الصوتي', exists: true },
      { id: 'books-publishing-dashboard', label: 'النشر والكتب الرقمية', exists: true },
      { id: 'news-dashboard', label: 'الصحافة والإعلام الإخباري', exists: true },
      { id: 'tv-video-film-dashboard', label: 'التلفزيون والسينما والإنتاج', exists: true },
      { id: 'video-gaming-esports-dashboard', label: 'الألعاب والرياضات الإلكترونية', exists: true, isNew: true },
    ],
  },
  {
    title: 'المعادن والصناعات الإلكترونية',
    iconName: 'CircuitBoard',
    description: 'صناعة المعدات، أشباه الموصلات، التصنيع المتقدم، والطيران.',
    gatekeepers: ['TSMC', 'Intel', 'Boeing', 'ASML'],
    tone: {
      card: 'border-slate-200 bg-slate-100/80',
      icon: 'border-slate-300 bg-white text-slate-800',
      badge: 'border-slate-300 bg-slate-200 text-slate-900',
      item: 'border-slate-300 bg-white hover:border-slate-400',
      itemActive: 'border-slate-500 bg-slate-100',
    },
    sectors: [
      { id: 'aerospace-defense-dashboard', label: 'الطيران والدفاع', exists: true },
      { id: 'electronics-dashboard', label: 'الإلكترونيات والمكونات', exists: true },
      { id: 'industrial-machinery-dashboard', label: 'الآلات والمعدات الصناعية', exists: true },
      { id: 'metals-dashboard', label: 'صناعات المعادن والصلب', exists: true },
      { id: 'semiconductors-dashboard', label: 'أشباه الموصلات والرقائق', exists: true, isNew: true },
    ],
  },
  {
    title: 'العقارات والتطوير العمراني',
    iconName: 'Building',
    description: 'الاستثمار العقاري المباشر، التمويل، وإدارة الأملاك والتقنيات العقارية PropTech.',
    gatekeepers: ['CBRE', 'JLL', 'Compass', 'Zillow'],
    tone: {
      card: 'border-blue-200 bg-blue-50/75',
      icon: 'border-blue-200 bg-white text-blue-700',
      badge: 'border-blue-200 bg-blue-100 text-blue-900',
      item: 'border-blue-200 bg-white hover:border-blue-300',
      itemActive: 'border-blue-400 bg-blue-50',
    },
    sectors: [
      { id: 'commercial-real-estate-dashboard', label: 'العقارات التجارية والمكاتب', exists: true },
      { id: 'industrial-real-estate-dashboard', label: 'العقارات الصناعية والمستودعات', exists: true },
      { id: 'mortgages-financing-dashboard', label: 'التمويل العقاري والرهن', exists: true },
      { id: 'property-services-dashboard', label: 'إدارة الأملاك والخدمات العقارية', exists: true },
      { id: 'residential-real-estate-dashboard', label: 'العقارات السكنية والمشاريع', exists: true },
    ],
  },
  {
    title: 'التجزئة وسلاسل التوريد',
    iconName: 'Store',
    description: 'تحليل سلوك التجزئة، إدارة المخزون، وشبكات التوزيع والتوريد.',
    gatekeepers: ['Walmart', 'Costco', 'Target', 'IKEA'],
    tone: {
      card: 'border-yellow-200 bg-yellow-50/75',
      icon: 'border-yellow-200 bg-white text-yellow-700',
      badge: 'border-yellow-200 bg-yellow-100 text-yellow-900',
      item: 'border-yellow-200 bg-white hover:border-yellow-300',
      itemActive: 'border-yellow-400 bg-yellow-50',
    },
    sectors: [
      { id: 'diy-retail-dashboard', label: 'تجزئة الأدوات والحلول المنزلية', exists: true },
      { id: 'fashion-accessories-dashboard', label: 'تجزئة الموضة والإكسسوارات', exists: true },
      { id: 'food-beverage-retail-dashboard', label: 'تجزئة الأغذية والمشروبات', exists: true },
      { id: 'furniture-retail-dashboard', label: 'تجزئة الأثاث والديكور', exists: true },
      { id: 'supply-chain-dashboard', label: 'سلاسل التوريد والتوزيع', exists: true, isNew: true },
    ],
  },
  {
    title: 'خدمات الأعمال وتعهيد العمليات',
    iconName: 'Briefcase',
    description: 'استشارات الأعمال، الكفاءات البشرية، ومراكز التعهيد BPO.',
    gatekeepers: ['McKinsey', 'Accenture', 'Deloitte', 'Teleperformance'],
    tone: {
      card: 'border-stone-200 bg-stone-100/80',
      icon: 'border-stone-300 bg-white text-stone-800',
      badge: 'border-stone-300 bg-stone-200 text-stone-900',
      item: 'border-stone-300 bg-white hover:border-stone-400',
      itemActive: 'border-stone-500 bg-stone-100',
    },
    sectors: [
      { id: 'business-services-dashboard', label: 'الخدمات الاستشارية والتنفيذية', exists: true },
      { id: 'skilled-labor-dashboard', label: 'إدارة الكفاءات والعمالة الماهرة', exists: true },
      { id: 'digital-transformation-consulting-dashboard', label: 'استشارات التحول الرقمي', exists: true, isNew: true },
      { id: 'bpo-dashboard', label: 'تعهيد العمليات BPO', exists: true, isNew: true },
    ],
  },
  {
    title: 'المجتمع والتحليل الديموغرافي',
    iconName: 'Users2',
    description: 'التعليم، أنظمة القانون، والتحليلات السكانية والتنمية الحضرية.',
    gatekeepers: ['UNESCO', 'Pearson', 'Coursera'],
    tone: {
      card: 'border-emerald-200 bg-emerald-50/70',
      icon: 'border-emerald-200 bg-white text-emerald-700',
      badge: 'border-emerald-200 bg-emerald-100 text-emerald-900',
      item: 'border-emerald-200 bg-white hover:border-emerald-300',
      itemActive: 'border-emerald-400 bg-emerald-50',
    },
    sectors: [
      { id: 'demographics-dashboard', label: 'التحليلات الديموغرافية ومؤشرات السكان', exists: true },
      { id: 'education-science-dashboard', label: 'التعليم والعلوم والابتكار', exists: true },
      { id: 'crime-law-enforcement-dashboard', label: 'الأمان وأنظمة إنفاذ القانون', exists: true },
      { id: 'urban-development-smart-cities-policy-dashboard', label: 'التنمية الحضرية والسياسات Smart Cities', exists: true, isNew: true },
    ],
  },
  {
    title: 'الرياضة والأنشطة الترفيهية',
    iconName: 'Trophy',
    description: 'الفعاليات الرياضية، الاستجمام، الثقافة، والرياضات الرقمية.',
    gatekeepers: ['Nike', 'Adidas', 'Formula 1', 'Peloton'],
    tone: {
      card: 'border-red-200 bg-red-50/75',
      icon: 'border-red-200 bg-white text-red-700',
      badge: 'border-red-200 bg-red-100 text-red-900',
      item: 'border-red-200 bg-white hover:border-red-300',
      itemActive: 'border-red-400 bg-red-50',
    },
    sectors: [
      { id: 'art-culture-dashboard', label: 'الفنون والثقافة والفعاليات', exists: true },
      { id: 'sports-fitness-dashboard', label: 'الرياضة واللياقة البدنية', exists: true },
      { id: 'wellness-spas-dashboard', label: 'الاستجمام والصحة النفسية والبدنية', exists: true },
      { id: 'esports-gaming-industry-dashboard', label: 'صناعة الألعاب والرياضات الإلكترونية', exists: true, isNew: true },
    ],
  },
];

const DEFAULT_VISIBLE_SECTORS = 3;

export function DiscoveryCenter({
  setActiveTab,
  onSelectSector,
}: {
  setActiveTab: (tab: string) => void;
  onSelectSector?: (sector: { id: string; label: string; groupTitle: string }) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'new'>('all');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);

  const normalizedGroups = useMemo(
    () =>
      DISCOVERY_DATA.map(group => ({
        ...group,
        sectors: group.sectors.map(sector => ({
          ...sector,
          groupTitle: group.title,
        })),
      })),
    [],
  );

  const filteredGroups = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    let groups = normalizedGroups;

    if (filterType === 'new') {
      groups = groups.map(group => ({
        ...group,
        sectors: group.sectors.filter(s => s.isNew)
      }));
    }

    if (!query) {
      return groups.filter(group => group.sectors.length > 0);
    }

    return groups
      .map(group => ({
        ...group,
        sectors: group.sectors.filter(
          sector =>
            sector.label.toLowerCase().includes(query) ||
            sector.id.toLowerCase().includes(query) ||
            group.title.toLowerCase().includes(query),
        ),
      }))
      .filter(group => group.sectors.length > 0);
  }, [normalizedGroups, searchTerm, filterType]);

  const allSectors = useMemo(
    () =>
      normalizedGroups.flatMap(group =>
        group.sectors.map(sector => ({
          ...sector,
          groupTitle: group.title,
        })),
      ),
    [normalizedGroups],
  );

  const quickResults = useMemo(() => {
    const source = searchTerm ? filteredGroups : normalizedGroups;
    return source.flatMap(group =>
      group.sectors.slice(0, 2).map(sector => ({
        ...sector,
        groupTitle: group.title,
      })),
    );
  }, [filteredGroups, normalizedGroups, searchTerm]);

  const totalSectors = allSectors.length;
  const totalNewSectors = allSectors.filter(sector => sector.isNew).length;
  const matchingSectors = filteredGroups.reduce((count, group) => count + group.sectors.length, 0);

  const tableRecords = useMemo(() => {
    return filteredGroups.flatMap(group => 
      group.sectors.map(sector => ({
        ...sector,
        groupTitle: group.title,
        groupIcon: group.iconName,
        gatekeepers: group.gatekeepers,
        tone: group.tone
      }))
    );
  }, [filteredGroups]);

  const openSector = (sector: { id: string; label: string; groupTitle: string }) => {
    setSelectedSectorId(sector.id);
    onSelectSector?.(sector);
    setActiveTab(sector.id);
  };

  return (
    <div
      className="min-h-screen bg-background pb-16 font-['IBM_Plex_Sans_Arabic'] text-right text-foreground"
    >
      <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-2 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4 lg:max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <span className="me-2 flex size-1.5 rounded-full bg-primary"></span>
              مساحة القرار الاستثماري
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                رادار استكشاف الأسواق والفرص الاستثمارية
              </h1>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                واجهة منظمة لاكتشاف القطاعات، مقارنة المسارات، والانتقال السريع إلى السوق المناسب لبناء دراسة جدوى أكثر دقة.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 rounded-2xl bg-muted/30 px-6 py-4 sm:gap-10">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">المجموعات</span>
              <span className="text-3xl font-bold tracking-tight text-foreground">{normalizedGroups.length}</span>
            </div>
            <div className="h-10 w-px bg-border/60"></div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">القطاعات</span>
              <span className="text-3xl font-bold tracking-tight text-foreground">{totalSectors}</span>
            </div>
            <div className="h-10 w-px bg-border/60"></div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">القطاعات الجديدة</span>
              <span className="flex items-center gap-2 text-3xl font-bold tracking-tight text-foreground">
                {totalNewSectors}
                {totalNewSectors > 0 && <span className="flex size-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>}
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 rounded-xl border bg-muted/20 p-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-2 rounded-lg bg-background shadow-sm">
                  <LucideIcons.Filter className="size-4" />
                  تصفية: {filterType === 'all' ? 'الكل' : 'القطاعات الجديدة'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 text-right" >
                <DropdownMenuLabel>حالة القطاع</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem 
                  checked={filterType === 'all'} 
                  onCheckedChange={() => setFilterType('all')}
                >
                  الكل
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={filterType === 'new'} 
                  onCheckedChange={() => setFilterType('new')}
                >
                  القطاعات الجديدة فقط
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="mx-1 h-5 w-[1px] bg-border" />
            
            <Badge variant="outline" className="h-9 rounded-lg bg-background px-3 font-medium text-sm">
              النتائج: {matchingSectors}
            </Badge>

            <HoverCard openDelay={100}>
              <HoverCardTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="h-9 w-9 shrink-0 rounded-lg text-muted-foreground"
                >
                  <LucideIcons.CircleAlert className="size-4" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent align="start" className="w-[360px] space-y-3 text-right" >
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-foreground">كيف تستخدم الرادار؟</div>
                  <p className="text-xs leading-6 text-muted-foreground">
                    ابدأ من المجموعة الأقرب لفكرة المشروع، ثم ادخل إلى القطاع المناسب لمراجعة السوق وبناء تصور أعمق للفرصة.
                  </p>
                </div>
                <div className="space-y-2 text-xs leading-6 text-muted-foreground">
                  <div className="rounded-lg border bg-muted/30 px-3 py-2">
                    اختر مجموعة رئيسية تمثل نوع السوق الذي تنوي تحليله قبل الانتقال إلى القطاعات الفرعية.
                  </div>
                  <div className="rounded-lg border bg-muted/30 px-3 py-2">
                    استخدم البحث للوصول السريع عندما يكون لديك اتجاه محدد أو صناعة واضحة.
                  </div>
                  <div className="rounded-lg border bg-muted/30 px-3 py-2">
                    انتقل إلى القطاع المطلوب لبدء القراءة أو استكمال بقية رحلة المشروع داخل المنصة.
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {searchTerm && !isSearchOpen && (
              <Badge variant="secondary" className="h-9 gap-1.5 pr-2.5 text-sm">
                {searchTerm}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="h-5 w-5 rounded-full p-0 hover:bg-background/80"
                  onClick={() => setSearchTerm('')}
                >
                  <LucideIcons.X className="size-3" />
                </Button>
              </Badge>
            )}
            
            <div 
              className={cn(
                "flex items-center overflow-hidden transition-all duration-300 ease-in-out",
                isSearchOpen ? "w-full opacity-100 sm:w-64" : "w-0 opacity-0"
              )}
            >
              <div className="relative w-full">
                <LucideIcons.Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={event => setSearchTerm(event.target.value)}
                  placeholder="ابحث عن قطاع أو سوق..."
                  className="h-9 w-full bg-background pr-9 text-sm focus-visible:ring-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="absolute left-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-md text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setIsSearchOpen(false);
                    if (!searchTerm) setSearchTerm('');
                  }}
                >
                  <LucideIcons.X className="size-3.5" />
                </Button>
              </div>
            </div>

            {!isSearchOpen && (
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => setIsSearchOpen(true)}
                className="h-9 w-9 shrink-0 bg-background rounded-lg shadow-sm"
              >
                <LucideIcons.Search className="size-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="space-y-6">
            {tableRecords.length > 0 ? (
              <Card className="shadow-sm overflow-hidden border-border">
                <div className="overflow-x-auto">
                  <Table >
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="text-right font-semibold h-10">اسم القطاع</TableHead>
                        <TableHead className="text-right font-semibold h-10">المجموعة الرئيسية</TableHead>
                        <TableHead className="text-right font-semibold h-10">أبرز اللاعبين</TableHead>
                        <TableHead className="text-right font-semibold h-10">الحالة</TableHead>
                        <TableHead className="w-[80px] text-left font-semibold h-10">عرض</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tableRecords.map(record => {
                        const isActive = selectedSectorId === record.id;
                        return (
                          <TableRow 
                            key={record.id} 
                            data-state={isActive ? "selected" : undefined}
                            className="cursor-pointer group hover:bg-muted/30 transition-colors"
                            onClick={() => openSector({ id: record.id, label: record.label, groupTitle: record.groupTitle })}
                          >
                            <TableCell className="font-medium text-[13px] sm:text-sm py-3">
                              {record.label}
                            </TableCell>
                            <TableCell className="py-3">
                              <div className="flex items-center gap-2">
                                <div className={cn('flex size-6 shrink-0 items-center justify-center rounded-md border', record.tone.icon)}>
                                  <SafeIcon iconName={record.groupIcon} className="size-3" />
                                </div>
                                <span className="text-[13px] text-muted-foreground">{record.groupTitle}</span>
                              </div>
                            </TableCell>
                            <TableCell className="py-3">
                              <div className="flex flex-wrap gap-1">
                                {record.gatekeepers.slice(0, 2).map((gk, i) => (
                                  <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0 font-normal bg-muted/60">
                                    {gk}
                                  </Badge>
                                ))}
                                {record.gatekeepers.length > 2 && (
                                  <span className="text-[10px] text-muted-foreground self-center">+{record.gatekeepers.length - 2}</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="py-3">
                              <div className="flex items-center gap-1.5">
                                {record.isNew ? (
                                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-medium bg-primary/5 text-primary border-primary/20 shadow-none">
                                    جديد
                                  </Badge>
                                ) : null}
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal text-muted-foreground">
                                  {record.exists ? 'جاهز' : 'قيد الإعداد'}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell className="text-left py-3">
                              <Button 
                                variant="ghost" 
                                size="icon-sm" 
                                className="h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-background border shadow-sm"
                              >
                                <LucideIcons.ChevronLeft className="size-3" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            ) : (
              <Card className="border-dashed shadow-sm">
                <CardContent className="flex min-h-[320px] flex-col items-center justify-center gap-4 p-8 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full border bg-muted/40">
                    <LucideIcons.Orbit className="size-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-semibold">لا توجد نتائج مطابقة</div>
                    <p className="max-w-md text-sm leading-7 text-muted-foreground">
                      جرّب وصفاً أعم مثل الزراعة أو التقنية أو التمويل للوصول إلى مجموعة أوسع من الأسواق.
                    </p>
                  </div>
                  <Button type="button" variant="outline" onClick={() => setSearchTerm('')}>
                    إعادة ضبط البحث
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
