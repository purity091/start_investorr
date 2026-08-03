"use client";

import React, { useMemo, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from '@tanstack/react-table';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

interface SectorRecord {
  id: string;
  label: string;
  groupTitle: string;
  groupIcon: string;
  gatekeepers: string[];
  isNew?: boolean;
  exists: boolean;
  tone: {
    icon: string;
  };
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
      badge: 'border-yellow-200 bg-white text-yellow-700',
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

function DiscoveryTanStackTable({
  data,
  groups,
  onOpenSector,
  selectedSectorId,
}: {
  data: SectorRecord[];
  groups: DiscoveryGroup[];
  onOpenSector: (sector: { id: string; label: string; groupTitle: string }) => void;
  selectedSectorId: string | null;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [savedSectors, setSavedSectors] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem('saved_discovery_sectors') || '{}');
    } catch {
      return {};
    }
  });

  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  const uniqueGroupTitles = useMemo(() => {
    return Array.from(new Set(groups.map((g) => g.title))).sort();
  }, [groups]);

  const columns = useMemo<ColumnDef<SectorRecord>[]>(
    () => [
      {
        id: 'save',
        header: '',
        size: 45,
        cell: ({ row }) => {
          const item = row.original;
          const isSaved = savedSectors[item.id];

          const toggleSave = (e: React.MouseEvent) => {
            e.stopPropagation();
            const nextSaved = !isSaved;
            setSavedSectors((prev) => {
              const updated = { ...prev, [item.id]: nextSaved };
              try {
                localStorage.setItem('saved_discovery_sectors', JSON.stringify(updated));
              } catch (err) {}
              return updated;
            });
          };

          return (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={toggleSave}
              className={cn(
                "size-8 rounded-lg transition-colors",
                isSaved
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "text-muted-foreground hover:text-primary hover:bg-muted"
              )}
              title={isSaved ? "إلغاء حفظ القطاع" : "حفظ القطاع"}
            >
              {isSaved ? (
                <LucideIcons.BookmarkCheck className="size-4 text-primary fill-primary/20" />
              ) : (
                <LucideIcons.Bookmark className="size-4" />
              )}
            </Button>
          );
        },
      },
      {
        accessorKey: 'label',
        id: 'label',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-1 text-right font-bold hover:bg-transparent text-xs sm:text-sm text-foreground"
          >
            <span>القطاع</span>
            <LucideIcons.ArrowUpDown className="mr-1.5 size-3.5 text-muted-foreground" />
          </Button>
        ),
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-3">
              <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary font-bold shadow-2xs", item.tone.icon)}>
                <SafeIcon iconName={item.groupIcon} className="size-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs sm:text-sm text-foreground truncate" title={item.label}>
                  {item.label}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground truncate">
                  {item.groupTitle}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'groupTitle',
        id: 'groupTitle',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-1 text-right font-bold hover:bg-transparent text-xs sm:text-sm text-foreground"
          >
            <span>المجموعة الرئيسية</span>
            <LucideIcons.ArrowUpDown className="mr-1.5 size-3.5 text-muted-foreground" />
          </Button>
        ),
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue || filterValue === 'all') return true;
          return row.getValue(columnId) === filterValue;
        },
        cell: ({ row }) => (
          <Badge variant="secondary" className="font-bold text-[11px] px-2.5 py-0.5 bg-slate-100 text-slate-700 border-0 rounded-md">
            {row.original.groupTitle}
          </Badge>
        ),
      },
      {
        accessorKey: 'gatekeepers',
        id: 'gatekeepers',
        header: 'أبرز اللاعبين',
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1 max-w-[200px]">
            {row.original.gatekeepers.slice(0, 2).map((gk, i) => (
              <Badge key={i} variant="outline" className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-50 text-slate-700 border-slate-200 rounded-md">
                {gk}
              </Badge>
            ))}
            {row.original.gatekeepers.length > 2 && (
              <span className="text-[10px] font-bold text-muted-foreground self-center">+{row.original.gatekeepers.length - 2}</span>
            )}
          </div>
        ),
      },
      {
        id: 'status',
        header: 'الحالة',
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue || filterValue === 'all') return true;
          if (filterValue === 'new') return !!row.original.isNew;
          if (filterValue === 'ready') return !!row.original.exists;
          return true;
        },
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5">
            {row.original.isNew ? (
              <Badge variant="outline" className="text-[11px] px-2.5 py-0.5 font-bold bg-emerald-50 text-emerald-700 border-0 ring-1 ring-inset ring-emerald-600/20 rounded-md">
                جديد
              </Badge>
            ) : null}
            <Badge variant="outline" className="text-[11px] px-2.5 py-0.5 font-bold text-slate-600 bg-slate-100/70 border-0 rounded-md">
              {row.original.exists ? 'جاهز' : 'قيد الإعداد'}
            </Badge>
          </div>
        ),
      },
      {
        id: 'actions',
        size: 60,
        cell: ({ row }) => (
          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={(e) => {
                e.stopPropagation();
                onOpenSector({
                  id: row.original.id,
                  label: row.original.label,
                  groupTitle: row.original.groupTitle,
                });
              }}
              className="size-8 rounded-lg border border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary text-muted-foreground shadow-2xs transition-all active:scale-95"
              title="عرض التفاصيل"
            >
              <LucideIcons.ChevronLeft className="size-4" />
            </Button>
          </div>
        ),
      },
    ],
    [onOpenSector, savedSectors]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const groupFilterVal = (table.getColumn('groupTitle')?.getFilterValue() as string) || '';
  const statusFilterVal = (table.getColumn('status')?.getFilterValue() as string) || '';
  const isAnyFilterActive = globalFilter || groupFilterVal || statusFilterVal;

  const resetAllFilters = () => {
    setGlobalFilter('');
    table.getColumn('groupTitle')?.setFilterValue('');
    table.getColumn('status')?.setFilterValue('');
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Table Toolbar matching ProvenProjectsTable style */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <LucideIcons.Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="ابحث عن قطاع، مجموعة، لاعبين..."
              value={globalFilter ?? ''}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="pl-3 pr-9 h-10 w-full bg-background border-border focus-visible:ring-1 rounded-xl font-medium text-sm shadow-xs"
            />
          </div>

          {/* Group Filter Dropdown */}
          <Select
            value={groupFilterVal || 'all'}
            onValueChange={(val) => table.getColumn('groupTitle')?.setFilterValue(val === 'all' ? '' : val)}
          >
            <SelectTrigger className="h-10 w-full sm:w-[170px] bg-background border-border rounded-xl font-bold text-sm text-foreground">
              <SelectValue placeholder="المجموعة الرئيسية" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border" dir="rtl">
              <SelectItem value="all" className="font-bold cursor-pointer">كل المجموعات</SelectItem>
              {uniqueGroupTitles.map((groupTitle) => (
                <SelectItem key={groupTitle} value={groupTitle} className="font-bold cursor-pointer">
                  {groupTitle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter Dropdown */}
          <Select
            value={statusFilterVal || 'all'}
            onValueChange={(val) => table.getColumn('status')?.setFilterValue(val === 'all' ? '' : val)}
          >
            <SelectTrigger className="h-10 w-full sm:w-[150px] bg-background border-border rounded-xl font-bold text-sm text-foreground">
              <SelectValue placeholder="حالة القطاع" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border" dir="rtl">
              <SelectItem value="all" className="font-bold cursor-pointer">كل حالات القطاعات</SelectItem>
              <SelectItem value="new" className="font-bold cursor-pointer text-emerald-600">القطاعات الجديدة</SelectItem>
              <SelectItem value="ready" className="font-bold cursor-pointer">القطاعات الجاهزة</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Filters Button */}
          {isAnyFilterActive && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetAllFilters}
              className="h-10 px-3 text-xs font-bold text-red-600 hover:bg-red-500/10 hover:text-red-700 rounded-xl gap-1.5"
            >
              <LucideIcons.X className="size-3.5" />
              إلغاء التصفية
            </Button>
          )}
        </div>

        {/* Columns View Menu */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto h-10 font-bold border-border rounded-xl text-foreground hover:bg-muted/50 mt-1 sm:mt-0">
              الأعمدة
              <LucideIcons.ChevronDown className="mr-auto sm:ml-2 sm:mr-0 size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px] rounded-xl border-border">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                let label = column.id;
                if (label === 'label') label = 'القطاع';
                if (label === 'groupTitle') label = 'المجموعة الرئيسية';
                if (label === 'gatekeepers') label = 'أبرز اللاعبين';
                if (label === 'status') label = 'الحالة';

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize font-medium text-sm cursor-pointer"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {label}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active Filter Pills Indicator */}
      {(groupFilterVal || statusFilterVal) && (
        <div className="flex flex-wrap items-center gap-2 px-1">
          <span className="text-xs font-medium text-muted-foreground">الفلاتر المحددة:</span>
          {groupFilterVal && (
            <Badge className="bg-primary text-primary-foreground font-bold gap-1 text-xs py-0.5 px-2.5 rounded-lg">
              المجموعة: {groupFilterVal}
              <button
                onClick={() => table.getColumn('groupTitle')?.setFilterValue('')}
                className="mr-1 opacity-80 hover:opacity-100"
              >
                <LucideIcons.X className="size-3" />
              </button>
            </Badge>
          )}
          {statusFilterVal && (
            <Badge className="bg-emerald-600 text-white font-bold gap-1 text-xs py-0.5 px-2.5 rounded-lg">
              الحالة: {statusFilterVal === 'new' ? 'الجديدة' : 'الجاهزة'}
              <button
                onClick={() => table.getColumn('status')?.setFilterValue('')}
                className="mr-1 opacity-80 hover:opacity-100"
              >
                <LucideIcons.X className="size-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Main Table Container */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <Table dir="rtl">
          <TableHeader className="bg-slate-50/80 border-b border-slate-200/80">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                {headerGroup.headers.map((header) => {
                  let widthClass = '';
                  if (header.id === 'save') widthClass = 'w-[44px] min-w-[44px] max-w-[44px] text-center px-1';
                  if (header.id === 'label') widthClass = 'w-[280px] max-w-[340px] min-w-[220px]';
                  if (header.id === 'groupTitle') widthClass = 'w-[160px]';
                  if (header.id === 'gatekeepers') widthClass = 'w-[220px]';
                  if (header.id === 'status') widthClass = 'w-[140px]';
                  if (header.id === 'actions') widthClass = 'w-[60px] text-left';

                  return (
                    <TableHead key={header.id} className={cn("h-9 text-slate-500 font-bold text-[11px] uppercase tracking-wider px-2 sm:px-3 whitespace-nowrap", widthClass)}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => {
                const isActive = selectedSectorId === row.original.id;
                return (
                  <TableRow
                    key={row.id}
                    data-state={isActive ? 'selected' : undefined}
                    className="cursor-pointer hover:bg-blue-50/50 transition-colors border-b border-slate-100/80 group"
                    onClick={() =>
                      onOpenSector({
                        id: row.original.id,
                        label: row.original.label,
                        groupTitle: row.original.groupTitle,
                      })
                    }
                  >
                    {row.getVisibleCells().map((cell) => {
                      let widthClass = '';
                      if (cell.column.id === 'save') widthClass = 'w-[44px] min-w-[44px] max-w-[44px] text-center px-1';
                      if (cell.column.id === 'label') widthClass = 'w-[280px] max-w-[340px] min-w-[220px]';
                      if (cell.column.id === 'groupTitle') widthClass = 'w-[160px]';
                      if (cell.column.id === 'gatekeepers') widthClass = 'w-[220px]';
                      if (cell.column.id === 'status') widthClass = 'w-[140px]';
                      if (cell.column.id === 'actions') widthClass = 'w-[60px]';

                      return (
                        <TableCell key={cell.id} className={cn("py-2 px-2 sm:px-3 align-middle text-xs", widthClass)}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-slate-500 font-medium">
                  لا توجد قطاعات مطابقة للبحث المحدد.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Bar matching ProvenProjectsTable style */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-2 pt-4 gap-4">
        {/* Page Size Selector on the right side in RTL */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-start">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">عرض:</span>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(val) => {
              table.setPageSize(Number(val));
            }}
          >
            <SelectTrigger className="h-9 w-[115px] bg-white border-slate-200 rounded-xl font-bold text-xs text-slate-700 shadow-xs">
              <SelectValue placeholder="10 نتائج" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200 min-w-[115px]" dir="rtl">
              <SelectItem value="10" className="font-bold cursor-pointer text-xs">10 نتائج</SelectItem>
              <SelectItem value="20" className="font-bold cursor-pointer text-xs">20 نتيجة</SelectItem>
              <SelectItem value="50" className="font-bold cursor-pointer text-xs">50 نتيجة</SelectItem>
              <SelectItem value="100" className="font-bold cursor-pointer text-xs">100 نتيجة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Centered Pagination Controls */}
        <div className="flex items-center justify-center space-x-2 space-x-reverse sm:flex-none">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-9 w-9 p-0 border-slate-200 rounded-lg shadow-sm"
          >
            <LucideIcons.ChevronRight className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center text-sm font-bold text-slate-700 min-w-[4rem]">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-9 w-9 p-0 border-slate-200 rounded-lg shadow-sm"
          >
            <LucideIcons.ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Info Text */}
        <div className="flex-1 text-xs sm:text-sm font-medium text-slate-500 text-center sm:text-left w-full sm:w-auto">
          عرض {table.getRowModel().rows.length} من أصل {table.getFilteredRowModel().rows.length} قطاع
        </div>
      </div>
    </div>
  );
}

export function DiscoveryCenter({
  setActiveTab,
  onSelectSector,
}: {
  setActiveTab: (tab: string) => void;
  onSelectSector?: (sector: { id: string; label: string; groupTitle: string }) => void;
}) {
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

  const totalSectors = allSectors.length;
  const totalNewSectors = allSectors.filter(sector => sector.isNew).length;

  const tableRecords: SectorRecord[] = useMemo(() => {
    return normalizedGroups.flatMap(group => 
      group.sectors.map(sector => ({
        ...sector,
        groupTitle: group.title,
        groupIcon: group.iconName,
        gatekeepers: group.gatekeepers,
        tone: group.tone
      }))
    );
  }, [normalizedGroups]);

  const openSector = (sector: { id: string; label: string; groupTitle: string }) => {
    setSelectedSectorId(sector.id);
    onSelectSector?.(sector);
    setActiveTab(sector.id);
  };

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Sleek Integrated Header with Compact Summary Pills matching ProvenProjectsGallery style */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="w-fit bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-0 font-bold px-3 py-1">
              <LucideIcons.Compass className="size-3.5 me-1.5 inline-block" />
              مساحة القرار الاستثماري
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">استكشاف قطاعات السوق</h1>
          <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
            واجهة منظمة لاكتشاف القطاعات، مقارنة المسارات، والانتقال السريع إلى السوق المناسب لبناء دراسة جدوى أكثر دقة.
          </p>
        </div>

        {/* Compact Quick Stats Pills */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
            <LucideIcons.Layers className="size-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-600">المجموعات:</span>
            <span className="text-sm font-black text-slate-900">{normalizedGroups.length}</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/90 border border-slate-200/70">
            <LucideIcons.LayoutGrid className="size-4 text-slate-600" />
            <span className="text-xs font-bold text-slate-600">إجمالي القطاعات:</span>
            <span className="text-sm font-black text-slate-900">{totalSectors}</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50/90 border border-emerald-200/70">
            <LucideIcons.Sparkles className="size-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-800">قطاعات جديدة:</span>
            <span className="text-sm font-black text-emerald-700">{totalNewSectors}</span>
          </div>
        </div>
      </div>

      {/* Main Table section */}
      <div className="w-full">
        <DiscoveryTanStackTable
          data={tableRecords}
          groups={DISCOVERY_DATA}
          onOpenSector={openSector}
          selectedSectorId={selectedSectorId}
        />
      </div>
    </div>
  );
}
