import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Lightbulb, Target, Settings2 } from 'lucide-react';
import { EmptyState } from '@/components/ui/PageStates';

export const MicroSaaSIdeasGallery: React.FC = () => {
  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:py-8 sm:px-6 lg:px-8 font-sans">
      <div className="flex flex-col gap-2 mb-4">
        <Badge variant="secondary" className="w-fit bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 border-0">
          مشاريع صغيرة وعوائد مستقرة
        </Badge>
        <h1 className="text-3xl font-black text-foreground tracking-tight">أفكار مشاريع Micro-SaaS</h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
          المشاريع البرمجية المصغرة (Micro-SaaS) هي الحل الأمثل للمطورين الأفراد ورواد الأعمال الذين يبحثون عن حل مشكلة دقيقة (Niche) لجمهور محدد. تصفح أفكاراً سهلة البناء، سريعة الإطلاق، وذات تكلفة تشغيلية منخفضة جداً.
        </p>
      </div>

      <EmptyState 
        icon={Settings2}
        title="قريباً.. دليل الـ Micro-SaaS"
        description="نحن بصدد تجهيز قائمة بأفضل أفكار البرمجيات المصغرة التي يمكنك بناؤها خلال أيام أو أسابيع قليلة والبدء بجني الإيرادات."
      />
    </div>
  );
};
