'use client';

import React, { useState, useMemo } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import {
  Sparkles,
  Wrench,
  Zap,
  Search,
  CheckCircle2,
  Clock,
  Check,
  ShieldCheck,
  Layers,
  Radio,
  Share2,
  FileText,
  Lock,
  ArrowUpRight,
  Filter,
  History,
  Tag,
  ChevronLeft,
  ChevronRight,
  Rss,
  Mail,
  Activity,
  CheckCircle,
  Linkedin,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';

type CategoryFilter = 'all' | 'feature' | 'fix' | 'improvement';

interface Contributor {
  name: string;
  linkedin: string;
}

interface ReleaseHighlight {
  title: string;
  items: string[];
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface ReleaseUpdate {
  id: string;
  version: string;
  date: string;
  isLatest?: boolean;
  title: string;
  summary: string;
  category: CategoryFilter;
  badgeText: string;
  highlights: ReleaseHighlight[];
  contributors?: Contributor[];
  tags: string[];
}

const releases: ReleaseUpdate[] = [
  {
    id: 'v2.7.0',
    version: 'v2.7.0',
    date: '27 أغسطس 2026',
    isLatest: true,
    title: 'مرصد التوزيعات السكانية والاقتصادية وتحديث دليل التمويل الاستثماري',
    summary: 'إطلاق المرصد الديموغرافي والاقتصادي التفاعلي الشامل لدول الوطن العربي، وتحديث بيانات وروابط دليل جهات التمويل والاستثمار الجريء.',
    category: 'feature',
    badgeText: 'الإصدار الحالي v2.7.0',
    highlights: [
      {
        title: 'المميزات الرئيسية والجديدة',
        icon: Sparkles,
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/20',
        items: [
          'المرصد الديموغرافي التفاعلي: إطلاق لوحة "التوزيعات السكانية والاقتصادية بالوطن العربي" بخريطة تفاعلية ذكية تركز تلقائياً على 22 دولة عربية.',
          'التلميح التفاعلي العائم (Dynamic Floating Tooltip): إمكانية تتبع مؤشر الفأرة لحظياً لعرض إحصائيات السكان، الناتج المحلي الإجمالي (GDP)، ومتوسط دخل الفرد بأسلوب بصري فاخر.',
          'واجهة الجوال المخصصة (Touch-Optimized Layout): شريط بيانات سفلي تفاعلي يظهر عند النقر على أي دولة عبر الهواتف الذكية مع تصنيفات مرنة للأقاليم.',
          'تحديث دليل التمويل الاستثماري: مراجعة ومزامنة وتطوير المواقع الإلكترونية الرسمية لأكثر من 198 جهة تمويلية وصندوق استثمار جريء في المنطقة.',
          'محرك البحث والتصنيف الإقليمي: إمكانية تصفية وبحث ترتيب الدول العربية حسب السكان، الناتج المحلي، دخل الفرد، والمساحة الجغرافية.'
        ]
      },
      {
        title: 'الإصلاحات وحل المشكلات',
        icon: Wrench,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        items: [
          'تعديل تموضع التلمح التفاعلي ليكون أعلى مؤشر الفأرة مباشرة مع دعم الانقلاب التلقائي عند الحواف العلوية لعدم حجب الرؤية.',
          'إعادة تصميم جداول دليل التمويل وحذف الوسوم غير الضرورية لضمان مظهر SaaS خالي من الحواف الزائدة (Border-0 Aesthetic).'
        ]
      },
      {
        title: 'تحسينات التجربة والأداء',
        icon: Zap,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/20',
        items: [
          'ترشيق مقاسات أزرار التحكم والتبويبات على الأجهزة الذكية والمتوسطة لتقليل الازدحام وتوفير مساحة تصفح أوسع.',
          'اعتماد التنسيق الرقمي القياسي العالمي للأرقام والمبالغ المالية مع الحفاظ الكامل على الهوية العربية والاتجاه RTL.'
        ]
      }
    ],
    tags: ['التوزيعات السكانية', 'خرائط تفاعلية', 'دليل التمويل', 'الوطن العربي', 'تجربة الجوال', 'بيانات اقتصادية']
  },
  {
    id: 'v2.6.0',
    version: 'v2.6.0',
    date: '24 أغسطس 2026',
    isLatest: false,
    title: 'تحديث تجربة التصفح للجوال، الفلاتر الذكية، وتوحيد الفوتر الموحد',
    summary: 'إصدار جديد يركز على جعل تجربة التصفح صديقة للجوال أولاً، إتاحة كبسولات وتصفية سريعة للمشاكل والفرص، استقرار استجابة الخادم والمتصفح، وتوحيد الفوتر العام للمنصة.',
    category: 'feature',
    badgeText: 'إصدار سابق v2.6.0',
    highlights: [
      {
        title: 'المميزات الرئيسية والجديدة',
        icon: Sparkles,
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/20',
        items: [
          'تطوير النوافذ المنبثقة (Modals): إصلاح نافذة مشاركة المشاريع ونوافذ التفاصيل لتفتح بسلاسة على الجوال دون تعليق.',
          'واجهة تصفية للجوال (Mobile-First): إضافة درج سفلي (Drawer) وكبسولات تفاعلية بنقرة واحدة لتصفية الفرص والمشاكل.',
          'أنيميشن خفيف للأسئلة (FAQ Accordion): حركة فتح وإغلاق سلسة لأسئلة منصة خطة بدون مكتبات خارجية ثقيلة.',
          'تحديث الفوتر العام وشريط التنقل: تنظيم روابط المنتج والمصادر مع إبراز حالة تسجيل الدخول للمستخدم.'
        ]
      },
      {
        title: 'الإصلاحات وحل المشكلات',
        icon: Wrench,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        items: [
          'إصلاح التوافق بين الخادم والمتصفح (SSR Hydration Mismatch) في جداول المشاريع ورادار القطاعات.',
          'تثبيت استجابة النوافذ التفاعلية وشريط التصفح العلوي على أجهزة iOS والجوال.'
        ]
      },
      {
        title: 'تحسينات الأداء والتصفح',
        icon: Zap,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/20',
        items: [
          'تسريع استجابة الجداول والتمرير الميداني على كافة الأجهزة.',
          'دعم محاذاة واستجابة الواجهات العربية (RTL).'
        ]
      }
    ],
    contributors: [
      {
        name: 'Aya Akour',
        linkedin: 'https://www.linkedin.com/in/aya-akour-uiux-gamedev-and-trainer',
      },
      {
        name: 'Sameer Dodin',
        linkedin: 'https://www.linkedin.com/in/sameer-dodin-b81b76348',
      },
      {
        name: 'Afrah Ali Alhamayiduh',
        linkedin: 'https://www.linkedin.com/in/afrah-ali-alhamayiduh',
      },
      {
        name: 'Osama Mashal',
        linkedin: 'https://www.linkedin.com/in/osama-mashal-257100150',
      },
      {
        name: 'Raghad Abdullah',
        linkedin: 'https://www.linkedin.com/in/raghad-abdullah-b05221319',
      },
      {
        name: 'Hamzah Almasri',
        linkedin: 'https://www.linkedin.com/in/hamzah-almasri-aa916934a',
      },
    ],
    tags: ['Mobile-First Filters', 'Hydration Fix', 'Footer Modernization', 'Navbar Auth', 'RTL Layout']
  },
  {
    id: 'v2.5.0',
    version: 'v2.5.0',
    date: '05 أغسطس 2026',
    isLatest: false,
    title: 'تحديث المحرك الأساسي: مشاركة الخطط، بناء 10 دراسات، وتسهيل تسجيل الدخول',
    summary: 'إصدار رئيسي يركز على إتاحة مشاركة الخطط ونماذج الأعمال عبر روابط آمنة، تمكين بناء 10 دراسات جدوى عبر الباني الخاص، وإزالة تعقيدات صفحة الدخول.',
    category: 'feature',
    badgeText: 'إصدار سابق v2.5.0',
    highlights: [
      {
        title: 'المميزات الرئيسية والجديدة',
        icon: Sparkles,
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/20',
        items: [
          'إمكانية مشاركة الخطط ونماذج العمل (BMC) عبر روابط تفاعلية آمنة في الباقات المدفوعة.',
          'تمكين بناء حتى 10 دراسات جدوى ونماذج عمل عبر باني المنصة الخاص.',
          'تفعيل نافذة التسجيل والدخول المرنة (Modal Auth) دون الحاجة لمغادرة الصفحة الحالية.'
        ]
      },
      {
        title: 'الإصلاحات وحل المشكلات',
        icon: Wrench,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        items: [
          'حذف حقل التحقق الأمني المعقد في صفحة تسجيل الدخول لتقليل زمن الدخول.',
          'توحيد مقاسات الخطوط وتثبيت واجهة التصفح لصفحات الشركات الناجحة والمتعثرة.',
          'إصلاح التباين المحاذي في القوائم والواجهات العربية (RTL).'
        ]
      },
      {
        title: 'تحسينات التجربة والأداء',
        icon: Zap,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/20',
        items: [
          'إزالة القوائم العملاقة (Mega Menu) المعقدة من شريط التنقل واستبدالها بروابط مباشرة أسرع.',
          'تعديل جدول مقارنة الباقات والأسعار وتوضيح الأسعار الأساسية ($0، $9، $19).'
        ]
      }
    ],
    tags: ['Sharing Links', 'BMC Builder', 'Auth Modal', 'Navbar Upgrade', 'RTL Fixes']
  },
  {
    id: 'v2.4.0',
    version: 'v2.4.0',
    date: '20 يوليو 2026',
    isLatest: false,
    title: 'إطلاق استوديو نموذج العمل التجاري (BMC Studio) وحاسبة الإيرادات',
    summary: 'توفير محرك النمذجة الهيكلية للشركات وحاسبة الإيرادات والمؤشرات المالية التفاعلية.',
    category: 'feature',
    badgeText: 'إصدار سابق v2.4.0',
    highlights: [
      {
        title: 'المميزات الرئيسية',
        icon: Sparkles,
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/20',
        items: [
          'استوديو بناء نموذج العمل التجاري (BMC Studio) التفاعلي المنظم.',
          'حاسبة الإيرادات والمؤشرات المالية التفاعلية (MRR, ARR, Churn, LTV).',
          'تقييم الجاهزية الاستثمارية والفرضيات المعتمد من منهجية MIT.'
        ]
      },
      {
        title: 'الإصلاحات والتحسينات',
        icon: Wrench,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        items: [
          'معالجة بطء تصفح جداول المشاريع وحل أخطاء التكرار في المعرفات.',
          'تثبيت متغيرات ألوان Shadcn UI القياسية على كافة الواجهات.'
        ]
      }
    ],
    tags: ['BMC Studio', 'Financial Calculator', 'MIT Framework']
  },
  {
    id: 'v2.3.0',
    version: 'v2.3.0',
    date: '02 يوليو 2026',
    isLatest: false,
    title: 'قاعدة أفكار Micro-SaaS ودراسات تعثر الشركات الناشئة',
    summary: 'إثراء المحتوى الميداني وتوثيق الدروس المستفادة من الشركات المتعثرة.',
    category: 'improvement',
    badgeText: 'إصدار سابق v2.3.0',
    highlights: [
      {
        title: 'المميزات والتحديثات',
        icon: Sparkles,
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/20',
        items: [
          'دليل أفكار Micro-SaaS وشرح نماذج التسعير والنمو الميداني لكل فكرة.',
          'قسم تحليل أسباب تعثر وفشل الشركات لتوثيق الدروس المستفادة.'
        ]
      },
      {
        title: 'التحسينات والأداء',
        icon: Zap,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/20',
        items: [
          'إصلاح استجابة الشاشات الصغيرة وتعديل الهوامش الزائدة.',
          'تسريع استعلامات تصفح مقالات الأكاديمية والمصادر.'
        ]
      }
    ],
    tags: ['Micro-SaaS', 'Market Discovery', 'Performance']
  }
];

export default function ChangelogPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReleases = useMemo(() => {
    return releases.filter((rel) => {
      const matchesCategory = selectedCategory === 'all' || rel.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        rel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rel.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rel.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <PublicLayout>
      <div dir="rtl" className="w-full bg-background text-foreground font-sans min-h-screen pb-16">

        {/* Compact Header */}
        <header className="border-b border-border/70 bg-gradient-to-b from-muted/30 via-muted/10 to-background py-8">
          <div className="container mx-auto px-4 max-w-6xl space-y-3">
            <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight leading-tight">
              سجل التحديثات <span className="text-primary">والميزات الجديدة</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal max-w-2xl leading-relaxed">
              عرض تفصيلي شفاف لجميع التحديثات المباشرة، الإصلاحات، والتحسينات المطبقة في المنصة.
            </p>
          </div>
        </header>

        {/* Main Layout 70-30 Split */}
        <main className="container mx-auto px-4 max-w-6xl py-8">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">

            {/* Main Content Area (70% - 7 Columns) */}
            <div className="lg:col-span-7 space-y-8">
              {filteredReleases.length === 0 ? (
                <Card className="p-8 text-center border-border/60 shadow-2xs">
                  <Search className="size-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-bold text-foreground">لم نجد نتائج تطابق بحثك</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="mt-3 text-xs font-bold"
                  >
                    عرض كل التحديثات
                  </Button>
                </Card>
              ) : (
                filteredReleases.map((rel) => (
                  <article key={rel.id} className="relative group">
                    <Card className={cn(
                      "border shadow-2xs rounded-2xl overflow-hidden transition-all bg-card",
                      rel.isLatest ? "border-primary/40 shadow-xs" : "border-border/80"
                    )}>
                      {/* Release Card Header */}
                      <div className={cn(
                        "p-4 sm:p-5 border-b flex flex-wrap items-center justify-between gap-3 text-right",
                        rel.isLatest ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-border/60"
                      )}>
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-black text-primary font-mono tracking-tight">
                            {rel.version}
                          </span>
                          <Badge
                            variant={rel.isLatest ? 'default' : 'secondary'}
                            className="text-xs font-bold px-2.5 py-0.5 rounded-md"
                          >
                            {rel.badgeText}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                          <Clock className="size-3.5" />
                          <span>{rel.date}</span>
                        </div>
                      </div>

                      {/* Release Card Body */}
                      <div className="p-5 sm:p-6 space-y-5 text-right">

                        {/* Title & Summary */}
                        <div className="space-y-1.5">
                          <h2 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                            {rel.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
                            {rel.summary}
                          </p>
                        </div>

                        {/* Highlights Grid Breakdown */}
                        <div className="grid grid-cols-1 gap-3.5 pt-1">
                          {rel.highlights.map((group, gIdx) => {
                            const Icon = group.icon;
                            return (
                              <div
                                key={gIdx}
                                className={cn(
                                  "p-4 rounded-xl border space-y-3 bg-muted/20",
                                  group.borderColor
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <div className={cn("p-1.5 rounded-lg shrink-0", group.bgColor, group.color)}>
                                    <Icon className="size-4" />
                                  </div>
                                  <h3 className="text-xs font-bold text-foreground">
                                    {group.title}
                                  </h3>
                                </div>

                                <ul className="space-y-2 text-xs text-foreground font-normal pr-1">
                                  {group.items.map((item, iIdx) => (
                                    <li key={iIdx} className="flex items-start gap-2">
                                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                      <span className="leading-relaxed">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>

                        {/* Contributors Acknowledgement Section */}
                        {rel.contributors && rel.contributors.length > 0 && (
                          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-lg shrink-0 bg-primary/10 text-primary">
                                <Heart className="size-4 fill-primary/20" />
                              </div>
                              <h3 className="text-xs sm:text-sm font-bold text-foreground">
                                شكر خاص لشركاء التحديث والمساهمين
                              </h3>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              تتقدم منصة خطة بخالص الشكر والتقدير للخبراء والمستخدمين المتميزين الذين شاركونا ملاحظاتهم وتجاربهم الميدانية وكانوا جزءاً أساسياً من نجاح وتطوير هذا التحديث:
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {rel.contributors.map((c, cIdx) => (
                                <a
                                  key={cIdx}
                                  href={c.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/20 bg-background hover:bg-primary hover:text-primary-foreground text-foreground font-bold text-xs shadow-2xs transition-all active:scale-95 group"
                                >
                                  <Linkedin className="size-3.5 text-[#0A66C2] group-hover:text-white transition-colors" />
                                  <span>{c.name}</span>
                                  <ArrowUpRight className="size-3 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tags Footer */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/40 text-xs">
                          <div className="flex flex-wrap gap-1.5">
                            {rel.tags.map((tag, tIdx) => (
                              <Badge
                                key={tIdx}
                                variant="outline"
                                className="text-[10px] font-semibold py-0.5 px-2 bg-muted/50 border-border/60"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <span className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1">
                            <ShieldCheck className="size-3.5 text-emerald-600 inline" />
                            مستقر ومعتمد
                          </span>
                        </div>

                      </div>
                    </Card>
                  </article>
                ))
              )}
            </div>

            {/* Sidebar Controls Area (30% - 3 Columns Sticky) */}
            <aside className="lg:col-span-3 space-y-5 lg:sticky lg:top-20">

              {/* Search Box Card */}
              <Card className="p-4 border-border/80 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-foreground flex items-center gap-2">
                  <Search className="size-4 text-primary" />
                  <span>البحث في التحديثات</span>
                </h3>
                <div className="relative w-full">
                  <Input
                    type="text"
                    placeholder="ابحث بالاسم أو الوسم..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-xs font-medium rounded-xl h-9 border-border/80 bg-background text-right"
                  />
                </div>
              </Card>

              {/* Categories Filter Card */}
              <Card className="p-4 border-border/80 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-foreground flex items-center gap-2">
                  <Filter className="size-4 text-primary" />
                  <span>تصنيفات التحديثات</span>
                </h3>
                <div className="space-y-1.5">
                  {[
                    { id: 'all', label: 'كافة التحديثات', count: releases.length, icon: Layers },
                    { id: 'feature', label: 'مميزات جديدة', count: releases.filter(r => r.category === 'feature').length, icon: Sparkles },
                    { id: 'fix', label: 'إصلاحات وحلول', count: releases.filter(r => r.category === 'fix').length, icon: Wrench },
                    { id: 'improvement', label: 'تحسينات الواجهة', count: releases.filter(r => r.category === 'improvement').length, icon: Zap },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const active = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border",
                          active
                            ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                            : "bg-muted/40 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="size-3.5" />
                          <span>{cat.label}</span>
                        </span>
                        <Badge
                          variant={active ? 'secondary' : 'outline'}
                          className="text-[10px] px-2 py-0.2"
                        >
                          {cat.count}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* Version Jump Index */}
              <Card className="p-4 border-border/80 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-foreground flex items-center gap-2">
                  <History className="size-4 text-primary" />
                  <span>فهرس الإصدارات</span>
                </h3>
                <div className="space-y-1 text-xs">
                  {releases.map((r) => (
                    <a
                      key={r.id}
                      href={`#${r.id}`}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all"
                    >
                      <span className="font-mono font-bold text-primary">{r.version}</span>
                      <span className="text-[11px] font-normal">{r.date}</span>
                    </a>
                  ))}
                </div>
              </Card>

              {/* System Quick Stats Card */}
              <Card className="p-4 border-border/80 shadow-2xs space-y-3 bg-muted/20">
                <h3 className="text-xs font-bold text-foreground flex items-center gap-2">
                  <Activity className="size-4 text-emerald-600" />
                  <span>حالة النظام والبيانات</span>
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-border/40">
                    <span className="text-muted-foreground">الإصدار النشط:</span>
                    <strong className="font-mono text-foreground">v2.7.0</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/40">
                    <span className="text-muted-foreground">حالة الخوادم:</span>
                    <strong className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="size-3" />
                      مستقر
                    </strong>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">التغييرات هذا الشهر:</span>
                    <strong className="text-foreground">+12 تحسين</strong>
                  </div>
                </div>
              </Card>

            </aside>

          </div>
        </main>

      </div>
    </PublicLayout>
  );
}
