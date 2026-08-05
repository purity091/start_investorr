'use client';

import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import {
  Sparkles,
  Rocket,
  Search,
  CheckCircle2,
  Clock,
  Laptop,
  BrainCircuit,
  Database,
  Zap,
  Wrench,
  ChevronLeft,
  ArrowLeft,
  Rss,
  Mail,
  Filter,
  Check,
  ShieldCheck,
  Star
} from 'lucide-react';

type CategoryFilter = 'all' | 'feature' | 'ai' | 'data' | 'enhancement' | 'fix';

interface ChangelogItem {
  version: string;
  date: string;
  title: string;
  category: CategoryFilter;
  categoryLabel: string;
  status: 'live' | 'upcoming' | 'beta';
  statusLabel: string;
  description: string;
  highlights: string[];
  badges: string[];
}

const changelogData: ChangelogItem[] = [
  {
    version: 'v2.4.0',
    date: 'أغسطس 2026',
    title: 'إطلاق الهيدر المطور، شريط البحث السريع (Ctrl+K)، وحاسبة MRR/ARR التفاعلية',
    category: 'feature',
    categoryLabel: 'مميزات جديدة ✨',
    status: 'live',
    statusLabel: 'مباشر 🟢',
    description: 'تحديث شامل لتجربة التصفح والبحث واستكشاف الفرص في منصة خطة بمظهر احترافي يعتمد معايير Shadcn UI.',
    highlights: [
      'قوائم منسدلة عملاقة (Mega Menus) لاستكشاف الأدوات وقواعد البيانات والمصادر بلمسة واحدة.',
      'شريط ومودال البحث السريع لدعم اختصار لوحة المفاتيح Ctrl+K للوصول الفوري لكافة أقسام المنصة.',
      'حاسبة الإيرادات والمؤشرات المالية التفاعلية (MRR, ARR, Churn, LTV) مع تحليل جاهزية الاستثمار.',
      'شريط إعلاني علوي ذكي للتنبيه بأحدث الميزات والإصدارات القادمة.'
    ],
    badges: ['Shadcn UI', 'Mega Menu', 'Command Palette', 'SaaS Calculator']
  },
  {
    version: 'v2.3.0',
    date: 'يوليو 2026',
    title: 'قاعدة بيانات أفكار Micro-SaaS وأدوات الإطلاق السريع',
    category: 'data',
    categoryLabel: 'قواعد البيانات 📊',
    status: 'live',
    statusLabel: 'مباشر 🟢',
    description: 'تمت إضافة قسم مخصص لأفكار المشاريع البرمجية المصغرة المناسبة للمطورين المستقلين ورواد الأعمال الفرديين.',
    highlights: [
      'توفير +100 فكرة Micro-SaaS جاهزة للتنفيذ مع دراسة متطلبات التقنية والهيكل المالي.',
      'تحديد متطلبات زمن الإطلاق المتوقع (2 إلى 4 أسابيع) وتكلفة البنية التحتية الأولية.',
      'إمكانية التصفية حسب نماذج الاشتراك (Freemium, One-Time, Tiered Subscriptions).'
    ],
    badges: ['Micro-SaaS', 'Solopreneurs', 'Market Database']
  },
  {
    version: 'v2.2.0',
    date: 'يوليو 2026',
    title: 'محرك تقييم الاستراتيجية ونموذج العمل التجاري (BMC) بالذكاء الاصطناعي',
    category: 'ai',
    categoryLabel: 'الذكاء الاصطناعي 🤖',
    status: 'live',
    statusLabel: 'مباشر 🟢',
    description: 'دمج تقنيات التقييم الذكي لمساعدة رواد الأعمال على اكتشاف الفجوات في نماذج أعمالهم وتدعيم القيمة الفريدة.',
    highlights: [
      'تحليل فوري وتوليد مؤشرات جاهزية لكل عنصر من العناصر التسعة لنموذج الـ BMC.',
      'توليد سيناريوهات المخاطر وتوصيات مخصصة لتقوية نقاط الضعف قبل تقديم الدراسة للمستثمرين.',
      'صياغة مقترحات آلية لشريحة العملاء المستهدفة وقنوات التوزيع.'
    ],
    badges: ['AI Engine', 'BMC Evaluator', 'Risk Scenarios']
  },
  {
    version: 'v2.1.0',
    date: 'يونيو 2026',
    title: 'إطلاق أكاديمية المنصة وتوثيق منهجية الـ 24 خطوة (MIT Framework)',
    category: 'enhancement',
    categoryLabel: 'تحسينات ومصادر 🚀',
    status: 'live',
    statusLabel: 'مباشر 🟢',
    description: 'توفير مركز معرفي متكامل يحتوي على المقالات والحالات الدراسية لتعزيز الفهم الميداني لمؤشرات نمو الشركات.',
    highlights: [
      'إطلاق 18 مقال وحالة دراسية تفاعلية تشرح المقاييس المالية المتقدمة (CAC, LTV, Churn, Payback Period).',
      'دعم وضع القراءة المريح والنظيف وتصنيف الموضوعات حسب مستويات الخبرة (مبتدئ / متوسط / متقدم).',
      'ربط مقالات الأكاديمية بالأدوات التفاعلية داخل المنصة لتطبيق المفاهيم فورياً.'
    ],
    badges: ['Platform Academy', 'MIT 24 Steps', 'SaaS Knowledge']
  },
  {
    version: 'v2.0.0',
    date: 'مايو 2026',
    title: 'إعادة هيكلة جدول المشاريع الميدانية وتحليلات الشركات المتعثرة',
    category: 'data',
    categoryLabel: 'قواعد البيانات 📊',
    status: 'live',
    statusLabel: 'مباشر 🟢',
    description: 'تحديث المحرك الأساسي لجدول المشاريع والشركات الناجحة والمتعثرة لتوفير تجربة تصفح سريعة وموثوقة.',
    highlights: [
      'إضافة قسم "دراسة أسباب فشل الشركات الناشئة" لتوثيق الدروس المستفادة وتجنب الأخطاء المكلفة.',
      'بطاقات تفاعلية لنماذج عمل SaaS في مجالات B2B, Creator Economy, Dev Infrastructure.',
      'تسريع زمن تحميل البيانات المالية والمنافسين بنسبة 45%.'
    ],
    badges: ['Proven Projects', 'Failed Startups', 'Fast Performance']
  },
  {
    version: 'v2.5.0',
    date: 'قريباً في سبتمبر 2026',
    title: 'تصدير التقارير التفاعلية بصيغة PDF وتكامل مساحات العمل الجماعية (Team Workspaces)',
    category: 'feature',
    categoryLabel: 'قريباً 🔮',
    status: 'upcoming',
    statusLabel: 'قريباً 🟡',
    description: 'نعمل حالياً على تطوير ميزات تصدير التقارير الاحترافية المجهزة للعرض على المستثمرين ومشاركة الفريق.',
    highlights: [
      'تصدير نموذج العمل التجاري والدراسة المالية بنقرة واحدة كملف PDF عالي الجودة بهوية مشروعك.',
      'دعوة أعضاء الفريق والاستشاريين للتعاون الحاد والتعليق المباشر على عناصر الدراسة.',
      'مزامنة التعديلات سحابياً فوراً مع تنبيهات البريد الإلكتروني.'
    ],
    badges: ['PDF Export', 'Team Workspaces', 'Live Collaboration']
  }
];

export default function ChangelogPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredItems = React.useMemo(() => {
    return changelogData.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.badges.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <PublicLayout>
      {/* Header & Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-24 border-b border-border/50 bg-muted/20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="container relative mx-auto px-4 text-center max-w-4xl space-y-6">
          <Badge
            variant="outline"
            className="px-4 py-1.5 text-xs font-bold text-primary bg-primary/10 border-primary/20 gap-2 rounded-full mx-auto"
          >
            <Sparkles className="size-3.5 text-amber-500" />
            تحديثات وإصدارات مستمرة 🚀
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.2] text-center mx-auto">
            سجل التحديثات <span className="text-primary">والميزات الجديدة</span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-2xl leading-relaxed text-center mx-auto">
            نعمل باستمرار على تحسين وتطوير منصة خطة لزودك بأفضل أدوات نمذجة المشاريع، وقواعد البيانات الميدانية، ومؤشرات الأداء العالمية.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-muted-foreground">
            <div className="px-3.5 py-1.5 rounded-full bg-card border border-border flex items-center gap-2 shadow-2xs">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>الإصدار الحالي: <strong className="text-foreground">v2.4.0</strong></span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-card border border-border flex items-center gap-2 shadow-2xs">
              <Clock className="size-3.5 text-primary" />
              <span>آخر تحديث: <strong className="text-foreground">أغسطس 2026</strong></span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-card border border-border flex items-center gap-2 shadow-2xs">
              <Star className="size-3.5 text-amber-500" />
              <span>تحديثات عام 2026: <strong className="text-foreground">+12 إصدار</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 container mx-auto px-4 max-w-5xl">
        {/* Search & Filter Bar */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start w-full sm:w-auto">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'feature', label: 'مميزات جديدة ✨' },
                { id: 'ai', label: 'ذكاء اصطناعي 🤖' },
                { id: 'data', label: 'قواعد بيانات 📊' },
                { id: 'enhancement', label: 'تحسينات 🚀' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as CategoryFilter)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-primary text-primary-foreground shadow-2xs'
                      : 'bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full sm:w-72 shrink-0">
              <Search className="size-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                type="text"
                placeholder="ابحث في سجل التحديثات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-9 pl-3 text-xs font-medium rounded-xl h-10 border-border bg-card shadow-2xs focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Timeline View Feed */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-card rounded-2xl border border-border p-8">
            <Search className="size-10 text-muted-foreground mx-auto" />
            <h3 className="text-base font-bold text-foreground">لم نجد نتائج تطابق بحثك</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              جرب تغيير كلمات البحث أو إعادة ضبط تصنيفات التحديثات.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold mt-2"
            >
              عرض كافة التحديثات
            </Button>
          </div>
        ) : (
          <div className="relative border-r-2 border-border/80 pr-6 sm:pr-8 space-y-12">
            {filteredItems.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Dot Icon */}
                <div
                  className={`absolute -right-[31px] sm:-right-[39px] top-1.5 size-7 rounded-full flex items-center justify-center border-2 border-background shadow-2xs transition-transform group-hover:scale-110 ${
                    item.status === 'upcoming'
                      ? 'bg-amber-500 text-white'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {item.status === 'upcoming' ? (
                    <Clock className="size-3.5" />
                  ) : (
                    <Check className="size-3.5 stroke-[3]" />
                  )}
                </div>

                {/* Card Container */}
                <Card className="p-6 sm:p-7 border-border shadow-2xs hover:shadow-md transition-all bg-card rounded-2xl space-y-5">
                  {/* Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg sm:text-xl font-black text-primary tracking-tight">
                        {item.version}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
                          item.status === 'upcoming'
                            ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20'
                            : 'bg-primary/10 text-primary border border-primary/20'
                        }`}
                      >
                        {item.statusLabel}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Clock className="size-3.5 text-muted-foreground" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Body Title & Description */}
                  <div className="space-y-2">
                    <h2 className="text-base sm:text-lg font-black text-foreground leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Feature Highlights List */}
                  <div className="space-y-2.5 bg-muted/30 p-4 rounded-xl border border-border/50">
                    <h4 className="text-xs font-black text-foreground uppercase tracking-wider">
                      أبرز ما يتضمنه التحديث:
                    </h4>
                    <ul className="space-y-2 text-xs text-foreground font-medium">
                      {item.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Badges / Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.badges.map((b, bIdx) => (
                      <span
                        key={bIdx}
                        className="px-2.5 py-1 rounded-lg bg-muted text-muted-foreground text-[10px] font-extrabold border border-border/40"
                      >
                        #{b}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Subscribe to Changelog Updates CTA */}
      <section className="py-16 bg-muted/40 border-t border-border/60">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col items-center text-center space-y-6">
            <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-2xs">
              <Rss className="size-7" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                لا تفوت أي تحديث قادم للمنصة
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                اشترك في النشرة البريدية ليصلك ملخص أسبوعي بأحدث أدوات نمذجة المشاريع، أفكار الـ SaaS، والتحديثات التقنية فور إطلاقها.
              </p>
            </div>

            <div className="w-full max-w-md flex flex-col sm:flex-row gap-2 pt-2">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني..."
                className="h-11 text-xs font-medium rounded-xl border-border bg-background shadow-2xs text-right"
              />
              <Button size="lg" className="h-11 text-xs font-bold px-6 shrink-0 gap-2">
                <span>اشترك الآن</span>
                <Mail className="size-4" />
              </Button>
            </div>

            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-600 inline" />
              نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت بنقرة واحدة.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
