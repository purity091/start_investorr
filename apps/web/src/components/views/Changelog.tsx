import React from 'react';
import { Calendar, CheckCircle2, History, Sparkles, Wrench, Zap, Check, Radio } from 'lucide-react';

import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface ReleaseItem {
  id: string;
  version: string;
  date: string;
  title: string;
  summary: string;
  features: string[];
  fixes: string[];
  improvements: string[];
  tags: string[];
}

const RELEASES: ReleaseItem[] = [
  {
    id: 'v2.5.0',
    version: 'v2.5.0',
    date: '05 أغسطس 2026',
    title: 'مشاركة الخطط ونماذج العمل + بناء 10 دراسات مجاناً وتسهيل الدخول',
    summary: 'تحديث رئيسي لتبسيط الوصول، تحسين الأمان، وإتاحة مشاركة النماذج والدراسات.',
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
  return (
    <div className="w-full space-y-6 py-4" dir="rtl">
      {/* Header Bar */}
      <Card className="border-border/60 shadow-2xs bg-card p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-xs font-bold gap-1.5 rounded-full">
                <Radio className="size-3 text-emerald-400 animate-pulse" />
                <span>سجل التغييرات والإصدارات</span>
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">v2.5.0</span>
            </div>
            <h1 className="text-lg font-bold text-foreground">تطور المنصة والميزات الجديدة</h1>
            <p className="text-xs text-muted-foreground font-normal">
              تغطية موثوقة لكافة الميزات والتحديثات المطبقة على منصة خطة.
            </p>
          </div>
        </div>
      </Card>

      {/* World-class Linear style timeline */}
      <div className="relative border-r border-border/60 pr-6 space-y-8">
        {RELEASES.map((release) => (
          <div key={release.id} className="relative group">
            
            {/* Timeline Point */}
            <div className="absolute -right-[31px] top-1.5 size-3.5 rounded-full bg-primary border-4 border-background shadow-2xs group-hover:scale-125 transition-transform" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              
              {/* Left Version Info */}
              <div className="md:col-span-3 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-primary font-mono tracking-tight">{release.version}</span>
                  <Badge variant="secondary" className="text-[9px] font-bold">مباشر</Badge>
                </div>
                <div className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                  <Calendar className="size-3" />
                  <span>{release.date}</span>
                </div>
              </div>

              {/* Right Content Box */}
              <div className="md:col-span-9 bg-card border border-border/70 rounded-xl p-4 shadow-2xs space-y-3 text-right">
                
                <div className="border-b border-border/40 pb-2.5">
                  <h3 className="text-sm font-bold text-foreground">{release.title}</h3>
                  <p className="text-xs text-muted-foreground font-normal mt-0.5">{release.summary}</p>
                </div>

                <div className="space-y-2.5">
                  {release.features.length > 0 && (
                    <div className="space-y-1">
                      <h4 className="text-[11px] font-bold text-foreground flex items-center gap-1">
                        <Sparkles className="size-3 text-amber-500" />
                        <span>مميزات جديدة</span>
                      </h4>
                      <ul className="space-y-1 text-xs text-muted-foreground font-normal pr-2">
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
                    <div className="space-y-1">
                      <h4 className="text-[11px] font-bold text-foreground flex items-center gap-1">
                        <Wrench className="size-3 text-blue-500" />
                        <span>إصلاحات</span>
                      </h4>
                      <ul className="space-y-1 text-xs text-muted-foreground font-normal pr-2">
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
                    <div className="space-y-1">
                      <h4 className="text-[11px] font-bold text-foreground flex items-center gap-1">
                        <Zap className="size-3 text-emerald-500" />
                        <span>تحسينات</span>
                      </h4>
                      <ul className="space-y-1 text-xs text-muted-foreground font-normal pr-2">
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

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
