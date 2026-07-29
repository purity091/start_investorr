import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CloudCog, Zap, Briefcase, ChevronLeft } from 'lucide-react';
import { EmptyState } from '@/components/ui/PageStates';

export const SaaSIdeasGallery: React.FC = () => {
  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 font-sans">
      <div className="flex flex-col gap-2 mb-4">
        <Badge variant="secondary" className="w-fit bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-0">
          استلهم فكرتك التقنية القادمة
        </Badge>
        <h1 className="text-3xl font-black text-foreground tracking-tight">أفكار مشاريع SaaS (البرمجيات كخدمة)</h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
          قاعدة بيانات لأفكار ومشاكل سوقية تبحث عن حلول تقنية عبر نماذج SaaS. استعرض الأفكار التي تتمتع بطلب مرتفع ونموذج اشتراكات قابل للتوسع، واختر فكرتك القادمة لتبدأ بدراستها.
        </p>
      </div>

      <EmptyState 
        icon={CloudCog}
        title="قريباً.. مكتبة أفكار الـ SaaS"
        description="نعمل على بناء فهرس شامل يضم أبرز الاحتياجات والأفكار لقطاع الأعمال B2B و B2C والتي يمكن تحويلها إلى خدمات برمجية مربحة."
      />
    </div>
  );
};
