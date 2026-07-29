import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, TrendingDown, BookOpen, Clock } from 'lucide-react';
import { EmptyState } from '@/components/ui/PageStates';

export const FailedProjectsGallery: React.FC = () => {
  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 font-sans">
      <div className="flex flex-col gap-2 mb-4">
        <Badge variant="destructive" className="w-fit bg-red-500/10 text-red-600 hover:bg-red-500/20 border-0">
          تجارب ودروس مستفادة
        </Badge>
        <h1 className="text-3xl font-black text-foreground tracking-tight">مشاريع فشلت (Post-Mortem)</h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
          التعلم من أخطاء الآخرين يختصر عليك الكثير من الوقت والمال. نستعرض هنا دراسات حالة لمشاريع تقنية لم يكتب لها النجاح، مع تحليل أسباب الفشل والدروس المستفادة منها حتى لا تكررها.
        </p>
      </div>

      {/* Temporary Empty State - Ready to populate with data */}
      <EmptyState 
        icon={TrendingDown}
        title="قريباً.. مستودع تجارب الفشل"
        description="نعمل حالياً على جمع وتحليل بيانات دراسات الحالة لمشاريع حقيقية فشلت في السوق العربي والعالمي لنقدم لك خلاصة الأخطاء وكيفية تجنبها."
      />
    </div>
  );
};
