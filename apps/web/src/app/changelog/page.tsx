'use client';

import React, { useState, useMemo } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
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
  Tag,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

type CategoryFilter = 'all' | 'feature' | 'fix' | 'improvement';

interface ReleaseItem {
  id: string;
  version: string;
  date: string;
  title: string;
  category: CategoryFilter;
  statusLabel: string;
  summary: string;
  features: string[];
  fixes: string[];
  improvements: string[];
  tags: string[];
}

const releasesData: ReleaseItem[] = [
  {
    id: 'v2.5.0',
    version: 'v2.5.0',
    date: '05 أغسطس 2026',
    title: 'مشاركة الخطط ونماذج العمل + بناء 10 دراسات مجاناً وتسهيل تسجيل الدخول',
    category: 'feature',
    statusLabel: 'الإصدار الحالي',
    summary: 'تحديث رئيسي لتمكين مشاركة النماذج والدراسات عبر روابط آمنة، بناء 10 دراسات مجانية عبر باني المنصة، وتسهيل عملية التسجيل.',
    features: [
      'مشاركة الخطط ونماذج العمل (BMC) عبر روابط تفاعلية آمنة في الباقات المدفوعة.',
      'إتاحة بناء حتى 10 دراسات جدوى ونماذج عمل مجاناً عبر باني المنصة الخاص.',
      'فتح مودال التسجيل والدخول التفاعلي السريع دون مغادرة الصفحة الحالية.'
    ],
    fixes: [
      'إلغاء حقل التحقق الأمني المعقد في التسجيل لتقليل زمن الدخول وتسهيل التجربة.',
      'توحيد أحجام الخطوط واستقرار الهيكل البصري في صفحات تفاصيل الشركات الناجحة.',
      'إصلاح التباين البصري وتناسق الهوامش في الواجهات العربية (RTL).'
    ],
    improvements: [
      'تبسيط شريط التنقل (Navbar) والتخلص من القوائم العملاقة المعقدة لصالح روابط مباشرة وأسرع.',
      'إعادة هيكلة صفحة الأسعار وتوضيح الباقات الأساسية ($0، $9، $19) مع جدول مقارنة شامل.'
    ],
    tags: ['Sharing Links', 'BMC Builder', 'Auth Modal', 'Clean UX']
  },
  {
    id: 'v2.4.0',
    version: 'v2.4.0',
    date: '20 يوليو 2026',
    title: 'استوديو نموذج العمل التجاري (BMC Studio) وحاسبة الإيرادات المالية',
    category: 'feature',
    statusLabel: 'إصدار سابق',
    summary: 'إطلاق أدوات النمذجة الهيكلية للشركات وحاسبة مؤشرات النمو المالي.',
    features: [
      'استوديو بناء نموذج العمل التجاري (BMC Studio) التفاعلي المنظم.',
      'حاسبة الإيرادات والمؤشرات المالية التفاعلية (MRR, ARR, Churn, LTV).',
      'نموذج تقييم الجاهزية الاستثمارية والفرضيات المعتمد من منهجية MIT.'
    ],
    fixes: [
      'معالجة البطء في تصفح جداول المشاريع وتحديث استعلامات الأداء.',
      'إصلاح خطأ تكرار المعرفات في المكونات التفاعلية.'
    ],
    improvements: [
      'تطبيق ألوان Shadcn UI القياسية على كافة المكونات وإلغاء التعتيم القسري.'
    ],
    tags: ['BMC Studio', 'Financial Calculator', 'MIT Framework']
  },
  {
    id: 'v2.3.0',
    version: 'v2.3.0',
    date: '02 يوليو 2026',
    title: 'مكتبة أفكار Micro-SaaS ودراسات أسباب تعثر الشركات',
    category: 'improvement',
    statusLabel: 'إصدار سابق',
    summary: 'تحديث قواعد البيانات الميدانية بالدراسات الواقعية وأفكار المشاريع البرمجية المصغرة.',
    features: [
      'دليل أفكار Micro-SaaS وشرح نماذج التسعير والنمو الميداني لكل فكرة.',
      'قسم تحليل أسباب تعثر وفشل الشركات لتوثيق الدروس المستفادة.'
    ],
    fixes: [
      'إصلاح استجابة الشاشات الصغيرة والمتوسطة على جداول القطاعات.',
      'تعديل المسافات والهوامش الزائدة في بطاقات التصفح.'
    ],
    improvements: [
      'تسريع زمن تحميل وتصفح مقالات الأكاديمية والمصادر التعليمية.'
    ],
    tags: ['Micro-SaaS', 'Market Discovery', 'Performance']
  }
];

export default function ChangelogPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReleases = useMemo(() => {
    return releasesData.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <PublicLayout>
      <div dir="rtl" className="w-full bg-background text-foreground font-sans min-h-screen">
        
        {/* World-Class Minimal Header */}
        <section className="border-b border-border/60 bg-muted/20 py-8">
          <div className="container mx-auto px-4 max-w-5xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-xs font-bold gap-1.5 px-2.5 py-0.5 rounded-full">
                    <Radio className="size-3 text-emerald-400 animate-pulse" />
                    <span>سجل التغييرات والإصدارات</span>
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">Linear / Vercel Style</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                  تحديثات وإصدارات المنصة
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground font-normal max-w-xl">
                  تغطية شفافة لكافة الميزات الجديدة، الإصلاحات، والتحسينات المطبقة على منصة خطة.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'الكل', icon: Layers },
                  { id: 'feature', label: 'مميزات', icon: Sparkles },
                  { id: 'fix', label: 'إصلاحات', icon: Wrench },
                  { id: 'improvement', label: 'تحسينات', icon: Zap },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = selectedCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedCategory(tab.id as CategoryFilter)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border",
                        active
                          ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                          : "bg-card text-muted-foreground border-border/80 hover:text-foreground hover:bg-muted/60"
                      )}
                    >
                      <Icon className="size-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Global Timeline Layout */}
        <section className="container mx-auto px-4 max-w-5xl py-8">
          {filteredReleases.length === 0 ? (
            <Card className="p-8 text-center border-border/60 shadow-2xs">
              <Search className="size-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-bold text-foreground">لم نجد نتائج تطابق بحثك</p>
            </Card>
          ) : (
            <div className="relative border-r border-border/60 pr-6 sm:pr-8 space-y-10">
              {filteredReleases.map((release) => (
                <div key={release.id} className="relative group">
                  
                  {/* Timeline Point */}
                  <div className="absolute -right-[31px] sm:-right-[39px] top-1.5 size-4 rounded-full bg-primary border-4 border-background shadow-2xs group-hover:scale-125 transition-transform" />

                  {/* Two-Column Grid Release Item */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    {/* Left Sticky Sidebar (Version & Meta) */}
                    <div className="md:col-span-3 space-y-1.5 md:sticky md:top-24">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-primary font-mono tracking-tight">
                          {release.version}
                        </span>
                        <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0.2">
                          {release.statusLabel}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                        <Clock className="size-3.5" />
                        <span>{release.date}</span>
                      </div>
                    </div>

                    {/* Right Main Body Content */}
                    <div className="md:col-span-9 bg-card border border-border/70 rounded-2xl p-5 shadow-2xs space-y-4 text-right">
                      
                      {/* Release Title & Summary */}
                      <div className="space-y-1.5 border-b border-border/40 pb-3">
                        <h2 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                          {release.title}
                        </h2>
                        <p className="text-xs text-muted-foreground font-normal leading-relaxed">
                          {release.summary}
                        </p>
                      </div>

                      {/* Release Categorized Updates List */}
                      <div className="space-y-3">
                        {/* New Features */}
                        {release.features.length > 0 && (
                          <div className="space-y-2">
                            <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                              <Sparkles className="size-3.5 text-amber-500" />
                              <span>مميزات جديدة</span>
                            </h3>
                            <ul className="space-y-1.5 text-xs text-muted-foreground font-normal pr-2">
                              {release.features.map((feat, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span className="text-foreground leading-relaxed">{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Bug Fixes */}
                        {release.fixes.length > 0 && (
                          <div className="space-y-2 pt-1">
                            <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                              <Wrench className="size-3.5 text-blue-500" />
                              <span>إصلاحات وملاحظات</span>
                            </h3>
                            <ul className="space-y-1.5 text-xs text-muted-foreground font-normal pr-2">
                              {release.fixes.map((fix, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Check className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                                  <span className="text-foreground leading-relaxed">{fix}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Improvements */}
                        {release.improvements.length > 0 && (
                          <div className="space-y-2 pt-1">
                            <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                              <Zap className="size-3.5 text-emerald-500" />
                              <span>تحسينات الأداء والواجهة</span>
                            </h3>
                            <ul className="space-y-1.5 text-xs text-muted-foreground font-normal pr-2">
                              {release.improvements.map((imp, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span className="text-foreground leading-relaxed">{imp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                        {release.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-[10px] font-semibold border border-border/50"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </PublicLayout>
  );
}
