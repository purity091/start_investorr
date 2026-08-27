import React, { useState, useMemo } from 'react';
import { Calendar, CheckCircle2, History, Sparkles, Wrench, Zap, Check, Radio, Search, Filter, Activity, Layers } from 'lucide-react';

import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { cn } from '@/lib/utils';

type CategoryFilter = 'all' | 'feature' | 'fix' | 'improvement';

interface ReleaseItem {
  id: string;
  version: string;
  date: string;
  title: string;
  summary: string;
  category: CategoryFilter;
  features: string[];
  fixes: string[];
  improvements: string[];
  tags: string[];
}

const RELEASES: ReleaseItem[] = [
  {
    id: 'v2.7.0',
    version: 'v2.7.0',
    date: '27 أغسطس 2026',
    title: 'مرصد التوزيعات السكانية والاقتصادية وتحديث دليل التمويل الاستثماري',
    summary: 'إطلاق المرصد الديموغرافي والاقتصادي التفاعلي الشامل لدول الوطن العربي، وتحديث بيانات وروابط دليل جهات التمويل والاستثمار الجريء.',
    category: 'feature',
    features: [
      'المرصد الديموغرافي التفاعلي: إطلاق لوحة "التوزيعات السكانية والاقتصادية بالوطن العربي" بخريطة تفاعلية ذكية تركز تلقائياً على 22 دولة عربية.',
      'التلميح التفاعلي العائم (Dynamic Floating Tooltip): إمكانية تتبع مؤشر الفأرة لحظياً لعرض إحصائيات السكان، الناتج المحلي الإجمالي (GDP)، ومتوسط دخل الفرد بأسلوب بصري فاخر.',
      'واجهة الجوال المخصصة (Touch-Optimized Layout): شريط بيانات سفلي تفاعلي يظهر عند النقر على أي دولة عبر الهواتف الذكية مع تصنيفات مرنة للأقاليم.',
      'تحديث دليل التمويل الاستثماري: مراجعة ومزامنة وتطوير المواقع الإلكترونية الرسمية لأكثر من 198 جهة تمويلية وصندوق استثمار جريء في المنطقة.',
      'محرك البحث والتصنيف الإقليمي: إمكانية تصفية وبحث ترتيب الدول العربية حسب السكان، الناتج المحلي، دخل الفرد، والمساحة الجغرافية.'
    ],
    fixes: [
      'تعديل تموضع التلمح التفاعلي ليكون أعلى مؤشر الفأرة مباشرة مع دعم الانقلاب التلقائي عند الحواف العلوية لعدم حجب الرؤية.',
      'إعادة تصميم جداول دليل التمويل وحذف الوسوم غير الضرورية لضمان مظهر SaaS خالي من الحواف الزائدة (Border-0 Aesthetic).'
    ],
    improvements: [
      'ترشيق مقاسات أزرار التحكم والتبويبات على الأجهزة الذكية والمتوسطة لتقليل الازدحام وتوفير مساحة تصفح أوسع.',
      'اعتماد التنسيق الرقمي القياسي العالمي للأرقام والمبالغ المالية مع الحفاظ الكامل على الهوية العربية والاتجاه RTL.'
    ],
    tags: ['التوزيعات السكانية', 'خرائط تفاعلية', 'دليل التمويل', 'الوطن العربي', 'تجربة الجوال', 'بيانات اقتصادية']
  },
  {
    id: 'v2.6.0',
    version: 'v2.6.0',
    date: '13 أغسطس 2026',
    title: 'تحديث شامل لتجربة الدخول والمشاريع والاعتمادية',
    summary: 'تحسينات واسعة تجعل التنقل، إنشاء المشاريع، إدارة الحساب، والمشاركة أكثر وضوحاً واستقراراً.',
    category: 'improvement',
    features: [
      'تحسين تسجيل الدخول وإنشاء الحساب من النافذة المنبثقة في الصفحة الرئيسية.',
      'إعادة توجيه المستخدم مباشرة إلى لوحة العمل بعد نجاح الدخول أو إنشاء الحساب.',
      'إضافة إدارة أكثر وضوحاً للباقات وطلبات الترقية وإرفاق إيصال التحويل.',
      'تحديث أعداد المشاريع في القائمة الجانبية لتعرض المشاريع الفعلية فقط.',
      'تحسين مشاركة المشاريع والخطط مع نافذة واضحة للحالات والخيارات المتاحة.'
    ],
    fixes: [
      'إصلاح ظهور نافذة التسجيل بدلاً من تسجيل الدخول عند اختيار زر الدخول.',
      'إصلاح إعادة تحميل المشاريع عند الانتقال بين التبويبات.',
      'إصلاح احتساب الأمثلة التوضيحية ضمن عدد مشاريع المستخدم.',
      'إصلاح حالات التعليق والأخطاء في بعض عمليات الحفظ والمزامنة.',
      'إصلاح مشاكل العرض والتوافق في النماذج العربية واتجاه RTL.',
      'إصلاح أخطاء واجهة الهوية والخيارات التفاعلية داخل النماذج.'
    ],
    improvements: [
      'توحيد حالات التحميل والفراغ والخطأ وإتاحة إعادة المحاولة في الشاشات المهمة.',
      'تحسين سرعة التنقل وتقليل القراءات المتكررة للمشاريع والإشعارات.',
      'تحسين استقرار إنشاء المشاريع عند الاستخدام المتزامن.',
      'تحسين رسائل الخطأ والنجاح لتكون مفهومة للمستخدم بدلاً من الرسائل التقنية.',
      'تحسين التحقق من الجلسة قبل تنفيذ العمليات الحساسة.',
      'تنظيف ملفات التطوير المؤقتة وتحسين جاهزية تشغيل التطبيق محلياً.',
      'تحسين التحقق العام من البناء والتوافق عبر صفحات التطبيق.'
    ],
    tags: ['تجربة الدخول', 'إدارة المشاريع', 'الباقات', 'المشاركة', 'أداء أفضل', 'RTL']
  },
  {
    id: 'v2.5.0',
    version: 'v2.5.0',
    date: '05 أغسطس 2026',
    title: 'مشاركة الخطط ونماذج العمل + بناء 10 دراسات مجاناً وتسهيل الدخول',
    summary: 'تحديث رئيسي لتبسيط الوصول، تحسين الأمان، وإتاحة مشاركة النماذج والدراسات.',
    category: 'feature',
    features: [
      'مشاركة الخطط ونماذج العمل عبر روابط آمنة بالباقات المدفوعة',
      'بناء حتى 10 دراسات جدوى بـ $0 في الباقة المجانية عبر باني المنصة',
      'نافذة التسجيل والدخول المرنة (Modal Auth)'
    ],
    fixes: [
      'حذف حقل التحقق الأمني المعقد في التسجيل لسهولة الوصول',
      'توحيد أحجام الخطوط في تفاصيل الشركات وتثبيت الواجهة',
      'إصلاح التباين المحاذي في الواجهات العربية (RTL)'
    ],
    improvements: [
      'تبسيط شريط التنقل Navbar وإزالة Mega Menu المعقدة',
      'تحديث صفحة الأسعار وإبراز الباقات المباشرة ($0، $9، $19)'
    ],
    tags: ['Sharing Links', 'BMC Builder', 'Auth Modal', 'Clean UX']
  },
  {
    id: 'v2.4.0',
    version: 'v2.4.0',
    date: '20 يوليو 2026',
    title: 'استوديو نموذج العمل التجاري (BMC Studio) وحاسبة الإيرادات',
    summary: 'إضافة محرك النمذجة الهيكلية للمشاريع وحاسبة المؤشرات المالية.',
    category: 'feature',
    features: [
      'استوديو نموذج العمل التجاري (BMC Studio)',
      'حاسبة الإيرادات المالية التفاعلية (MRR, ARR, LTV)',
      'تقييم الجاهزية الاستثمارية والفرضيات المعتمد من MIT'
    ],
    fixes: [
      'معالجة بطء تصفح جداول المشاريع وحل أخطاء التباعد'
    ],
    improvements: [
      'الاعتماد الكامل على متغيرات ألوان Shadcn UI القياسية'
    ],
    tags: ['BMC Studio', 'Financial Calculator', 'MIT Framework']
  }
];

export const Changelog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReleases = useMemo(() => {
    return RELEASES.filter((rel) => {
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
    <div className="w-full space-y-6 py-4" dir="rtl">
      
      {/* Top Header Card */}
      <Card className="border-border/60 shadow-2xs bg-card p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1 text-right">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-xs font-bold gap-1.5 rounded-full">
                <Radio className="size-3 text-emerald-400 animate-pulse" />
                <span>سجل التحديثات والإصدارات</span>
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">v2.7.0</span>
            </div>
            <h1 className="text-lg font-bold text-foreground">تطور المنصة والميزات الجديدة</h1>
            <p className="text-xs text-muted-foreground font-normal">
              تغطية موثوقة لكافة الميزات والتحديثات المطبقة على منصة خطة.
            </p>
          </div>
        </div>
      </Card>

      {/* 70-30 Split View Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
        
        {/* 70% Left Main Feed Column */}
        <div className="lg:col-span-7 space-y-4">
          {filteredReleases.map((release) => (
            <Card key={release.id} className="border-border/70 shadow-2xs bg-card overflow-hidden text-right">
              <div className="p-4 bg-muted/20 border-b border-border/40 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary font-mono">{release.version}</span>
                  <Badge variant="secondary" className="text-[10px]">مباشر</Badge>
                </div>
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {release.date}
                </span>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-foreground">{release.title}</h3>
                  <p className="text-xs text-muted-foreground font-normal mt-0.5">{release.summary}</p>
                </div>

                <div className="space-y-2 pt-1">
                  {release.features.length > 0 && (
                    <div className="bg-muted/30 p-2.5 rounded-lg border border-border/40 space-y-1">
                      <span className="text-[11px] font-bold text-foreground flex items-center gap-1">
                        <Sparkles className="size-3 text-amber-500" />
                        <span>مميزات جديدة</span>
                      </span>
                      <ul className="space-y-1 text-xs text-muted-foreground font-normal pr-1">
                        {release.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="size-3 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-foreground">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {release.fixes.length > 0 && (
                    <div className="bg-muted/30 p-2.5 rounded-lg border border-border/40 space-y-1">
                      <span className="text-[11px] font-bold text-foreground flex items-center gap-1">
                        <Wrench className="size-3 text-blue-500" />
                        <span>إصلاحات وملاحظات</span>
                      </span>
                      <ul className="space-y-1 text-xs text-muted-foreground font-normal pr-1">
                        {release.fixes.map((fx, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="size-3 text-blue-600 shrink-0 mt-0.5" />
                            <span className="text-foreground">{fx}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {release.improvements.length > 0 && (
                    <div className="bg-muted/30 p-2.5 rounded-lg border border-border/40 space-y-1">
                      <span className="text-[11px] font-bold text-foreground flex items-center gap-1">
                        <Zap className="size-3 text-emerald-500" />
                        <span>تحسينات الأداء</span>
                      </span>
                      <ul className="space-y-1 text-xs text-muted-foreground font-normal pr-1">
                        {release.improvements.map((imp, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="size-3 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-foreground">{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 pt-1.5 border-t border-border/40">
                  {release.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[9px] font-semibold">
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>
            </Card>
          ))}
        </div>

        {/* 30% Right Sidebar Controls Column */}
        <div className="lg:col-span-3 space-y-4 lg:sticky lg:top-20 text-right">
          <Card className="p-4 border-border/80 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-foreground flex items-center gap-2">
              <Search className="size-4 text-primary" />
              <span>البحث</span>
            </h3>
            <Input
              type="text"
              placeholder="بحث بالاسم أو الوسم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs font-medium rounded-xl h-9 border-border/80 bg-background text-right"
            />
          </Card>

          <Card className="p-4 border-border/80 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-foreground flex items-center gap-2">
              <Filter className="size-4 text-primary" />
              <span>التصنيفات</span>
            </h3>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'الكل', count: RELEASES.length, icon: Layers },
                { id: 'feature', label: 'مميزات جديدة', count: RELEASES.filter(r => r.category === 'feature').length, icon: Sparkles },
                { id: 'fix', label: 'إصلاحات', count: RELEASES.filter(r => r.category === 'fix').length, icon: Wrench },
                { id: 'improvement', label: 'تحسينات', count: RELEASES.filter(r => r.category === 'improvement').length, icon: Zap },
              ].map((cat) => {
                const Icon = cat.icon;
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border",
                      active
                        ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                        : "bg-muted/40 text-muted-foreground border-transparent hover:bg-muted"
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      <Icon className="size-3.5" />
                      <span>{cat.label}</span>
                    </span>
                    <Badge variant={active ? 'secondary' : 'outline'} className="text-[9px]">
                      {cat.count}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};
