import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Calculator,
  Compass,
  FileText,
  LayoutGrid,
  Lightbulb,
  FolderKanban,
  Edit3,
  Check,
  Building2,
  Globe2,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useProjectWorkspace } from './ProjectWorkspaceContext';
import { cn } from '@/lib/utils';

export const UnifiedWorkspace: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const { workspace, updateProfile } = useProjectWorkspace();
  const [isEditingName, setIsEditingName] = useState(false);
  const [projectNameInput, setProjectNameInput] = useState(workspace.profile.name || '');

  const projectName = workspace.profile.name || 'المشروع النشط الحالي';
  const sectorName = workspace.profile.sectorLabel || 'التقنية والخدمات الرقمية';
  const countryName = workspace.profile.countryLabel || 'السعودية والخليج';
  const customerType = workspace.profile.customerType || 'B2B / B2C';

  const sections = workspace.planSections || [];
  const completedSections = sections.filter((s) => s.content && s.content.trim().length > 30).length;
  const totalSections = sections.length || 10;
  const realReadinessScore = Math.round((completedSections / (totalSections || 1)) * 100);

  const financialEstimates = workspace.financialEstimates || [];
  const activeEstimate = financialEstimates[0];

  const handleSaveProjectName = () => {
    if (projectNameInput.trim()) {
      updateProfile({ name: projectNameInput.trim() });
    }
    setIsEditingName(false);
  };

  const tools = [
    {
      id: 'editor',
      title: 'محرر دراسة الجدوى',
      badge: 'إكمال الوثيقة',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: FileText,
      iconColor: 'text-blue-600',
      description: `كتابة وتنسيق وثيقة دراسة الجدوى الاقتصادية الشاملة المخصصة لـ (${projectName}).`,
      statLabel: `تم إكمال ${completedSections} من أصل ${totalSections} أقسام في دراسة (${projectName})`,
      buttonText: `إكمال دراسة ${projectName}`,
      hoverBorder: 'hover:border-blue-500/60',
    },
    {
      id: 'financial-calculator',
      title: 'حاسبة الأرباح والمؤشرات',
      badge: 'النمذجة المالية',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Calculator,
      iconColor: 'text-emerald-600',
      description: `حساب التقديرات المالية والإيرادات المتكررة ونقطة التعادل الخاصة بـ (${projectName}).`,
      statLabel: activeEstimate
        ? `MRR المحسوب للمشروع: $${activeEstimate.mrr.toLocaleString()} (LTV/CAC: ${activeEstimate.ltvCacRatio}x)`
        : `حساب التقديرات والتدفقات المالية لـ ${projectName}`,
      buttonText: `حساب أرباح ${projectName}`,
      hoverBorder: 'hover:border-emerald-500/60',
    },
    {
      id: 'business-model-canvas',
      title: 'نموذج العمل التجاري (BMC)',
      badge: 'هيكل القيمة',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: LayoutGrid,
      iconColor: 'text-indigo-600',
      description: `تعديل وصياغة أحجار بناء القيمة والشرائح المستهدفة لمشروع (${projectName}).`,
      statLabel: `تعديل نموذج القيمة والشرائح لـ ${projectName}`,
      buttonText: `تعديل نموذج العمل لـ ${projectName}`,
      hoverBorder: 'hover:border-indigo-500/60',
    },
    {
      id: 'market-discovery',
      title: 'اكتشاف وتحليل الفرص بالسوق',
      badge: 'تحليل المنافسة',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: Compass,
      iconColor: 'text-purple-600',
      description: `تحليل الفجوات السوقية والتحقق المباشر من رغبة العملاء في قطاع (${sectorName}).`,
      statLabel: `مستوى التحقق السوقي الحالي: ${workspace.metrics.validationScore}%`,
      buttonText: `تحليل سوق قطاع ${sectorName}`,
      hoverBorder: 'hover:border-purple-500/60',
    },
    {
      id: 'saas-ideas',
      title: 'معرض أفكار الـ SaaS والمشاريع',
      badge: 'تجارب مشابهة',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      icon: Lightbulb,
      iconColor: 'text-sky-600',
      description: 'استعراض دراسات حالة وأفكار مشاريع مشابهة للاستفادة منها في تطوير مشروعك.',
      statLabel: 'استلهم من مشاريع SaaS ناجحة في نفس القطاع',
      buttonText: 'تصفح النماذج المشابهة',
      hoverBorder: 'hover:border-sky-500/60',
    },
    {
      id: 'platform-academy',
      title: 'أكاديمية المنصة ودليل المفاهيم',
      badge: 'مرجع تعليمي',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: BookOpen,
      iconColor: 'text-amber-600',
      description: 'دليل شامل لمفاهيم دراسات الجدوى والتحليلات الميدانية لمساعدتك في إكمال دراستك.',
      statLabel: '18 مقال وتحليل ميداني لبناء خطة استثمار ناجحة',
      buttonText: 'تصفح أدلة الأكاديمية',
      hoverBorder: 'hover:border-amber-500/60',
    },
  ];

  return (
    <main dir="rtl" className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 text-right lg:px-8">
      
      {/* CLEAR SPECIFIC PROJECT IDENTIFICATION CARD */}
      <section className="rounded-2xl border-2 border-primary/20 bg-card p-6 shadow-2xs space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                المشروع النشط حالياً
              </span>
              <span className="text-xs text-muted-foreground">
                كافة الأدوات أدناه مربوطة مباشرة بهذا المشروع
              </span>
            </div>

            {isEditingName ? (
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={projectNameInput}
                  onChange={(e) => setProjectNameInput(e.target.value)}
                  className="rounded-lg border border-primary px-3 py-1.5 text-base font-black text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="أدخل اسم المشروع..."
                  autoFocus
                />
                <Button size="sm" onClick={handleSaveProjectName} className="gap-1 font-bold text-xs">
                  <Check className="size-4" />
                  حفظ الاسم
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                  {projectName}
                </h1>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-xs font-bold text-muted-foreground hover:text-primary flex items-center gap-1 bg-muted/60 px-2.5 py-1 rounded-md transition-colors"
                  title="تعديل اسم المشروع"
                >
                  <Edit3 className="size-3.5" />
                  <span>تعديل الاسم</span>
                </button>
              </div>
            )}
          </div>

          <Button
            onClick={() => setActiveTab('my-plans')}
            variant="outline"
            size="sm"
            className="gap-2 font-bold text-xs shadow-2xs border-primary/30 shrink-0"
          >
            <FolderKanban className="size-4 text-primary" />
            <span>تغيير المشروع / قائمة مشاريعي</span>
          </Button>
        </div>

        {/* Project Context Metadata Pills */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-border/60 text-xs font-extrabold text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Building2 className="size-4 text-primary" />
            <span>القطاع: <strong className="text-foreground">{sectorName}</strong></span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Globe2 className="size-4 text-primary" />
            <span>السوق: <strong className="text-foreground">{countryName}</strong></span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Users className="size-4 text-primary" />
            <span>العملاء: <strong className="text-foreground">{customerType}</strong></span>
          </div>
        </div>
      </section>

      {/* CORE LAUNCHER GRID TIED DIRECTLY TO THIS PROJECT */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const ToolIcon = tool.icon;

          return (
            <Card
              key={tool.id}
              onClick={() => setActiveTab(tool.id)}
              className={cn(
                'group cursor-pointer border border-border shadow-2xs transition-all duration-200 hover:shadow-xs relative overflow-hidden flex flex-col justify-between',
                tool.hoverBorder
              )}
            >
              <CardHeader className="pb-3 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={cn('text-[10px] font-bold border', tool.badgeColor)}>
                    {tool.badge}
                  </Badge>
                  <div className="p-2 rounded-xl bg-muted/40 group-hover:bg-primary/10 transition-colors">
                    <ToolIcon className={cn('size-5 transition-transform group-hover:scale-110', tool.iconColor)} />
                  </div>
                </div>

                <div className="space-y-1">
                  <CardTitle className="text-base font-black text-foreground group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-4">
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50 text-[11px] font-bold text-muted-foreground">
                  {tool.statLabel}
                </div>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab(tool.id);
                  }}
                  className="w-full gap-2 font-bold text-xs shadow-2xs h-9"
                >
                  <span>{tool.buttonText}</span>
                  <ArrowLeft className="size-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </section>

    </main>
  );
};
