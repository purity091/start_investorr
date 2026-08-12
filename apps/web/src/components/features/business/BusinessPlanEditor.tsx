import React, { useEffect, useMemo, useState } from 'react';
import { BarChart3, Briefcase, CheckCircle2, DollarSign, Edit3, FileText, Lightbulb, Save, Target, Users } from 'lucide-react';
import { PlanSection } from '../../../types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export const SECTION_CONFIG: Record<string, { icon: React.ElementType; label: string }> = {
  الملخص: { icon: FileText, label: 'الملخص التنفيذي' },
  السوق: { icon: BarChart3, label: 'تحليل السوق' },
  العمل: { icon: Lightbulb, label: 'فكرة العمل' },
  التسويق: { icon: Target, label: 'التسويق والمبيعات' },
  الهيكل: { icon: Users, label: 'الفريق والهيكل' },
  المالية: { icon: DollarSign, label: 'المالية' },
  default: { icon: Briefcase, label: 'قسم الخطة' },
};

export const getSectionIcon = (title: string) => {
  const entry = Object.entries(SECTION_CONFIG).find(([key]) => key !== 'default' && title.includes(key));
  return entry ? entry[1].icon : SECTION_CONFIG.default.icon;
};

const renderSectionIcon = (title: string, className: string) =>
  React.createElement(getSectionIcon(title), { className });

interface BusinessPlanEditorProps {
  sections: PlanSection[];
  onSectionUpdate: (id: string, updates: Partial<PlanSection>) => void;
  expandedSectionId: string | null;
  onSectionExpand: (id: string | null) => void;
  setActiveTab: (tab: string) => void;
  onWorkspaceSync?: (sections: PlanSection[]) => void;
}

export const BusinessPlanEditor: React.FC<BusinessPlanEditorProps> = ({
  sections,
  onSectionUpdate,
  expandedSectionId,
  onSectionExpand,
  setActiveTab,
  onWorkspaceSync,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

  const completedCount = sections.filter((section) => section.isCompleted).length;
  const progress = sections.length ? Math.round((completedCount / sections.length) * 100) : 0;

  const activeSection = useMemo(() => {
    return sections.find((section) => section.id === expandedSectionId) ?? sections[0] ?? null;
  }, [expandedSectionId, sections]);

  useEffect(() => {
    onWorkspaceSync?.(sections);
  }, [onWorkspaceSync, sections]);

  const startEditing = () => {
    if (!activeSection) return;
    setEditingId(activeSection.id);
    setDraft(activeSection.content ?? '');
  };

  const saveDraft = () => {
    if (!activeSection) return;
    onSectionUpdate(activeSection.id, {
      content: draft,
      isCompleted: draft.trim().length > 50,
      progress: draft.trim().length > 50 ? 100 : Math.min(activeSection.progress ?? 0, 60),
      lastEdited: 'الآن',
    });
    setEditingId(null);
  };

  if (!activeSection) {
    return (
      <main className="app-page-shell-wide text-right" dir="rtl">
        <Card className="shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Briefcase className="mb-3 size-10 text-muted-foreground" />
            <h1 className="text-xl font-semibold text-foreground">لا توجد أقسام للخطة</h1>
            <p className="mt-2 text-sm text-muted-foreground">ابدأ من صفحة بناء دراسة جدوى مشروع لإنشاء الأقسام الأساسية.</p>
            <Button className="mt-5" onClick={() => setActiveTab('new-plan-family')}>بدء نموذج جديد</Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="w-full space-y-3 sm:space-y-4 px-2 py-2 sm:px-4 lg:px-6 text-right" dir="rtl">
      <section className="rounded-xl bg-card p-4 sm:p-5 shadow-sm ring-1 ring-border/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <Badge variant="secondary" className="w-fit">محرر دراسة الجدوى</Badge>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">تطوير خطة المشروع</h1>
              <p className="text-sm leading-7 text-muted-foreground">
                مساحة كتابة منظمة لكل أقسام دراسة الجدوى، بدون مساعدين جانبيين أو عناصر مشتتة.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={() => setActiveTab('workspace')} className="sm:w-fit">
              مساحة المشروع
            </Button>
            <Button onClick={startEditing} className="sm:w-fit">
              <Edit3 className="size-4" />
              تحرير القسم الحالي
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">اكتمال الخطة</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{progress}%</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">الأقسام المكتملة</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{completedCount}/{sections.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">القسم الحالي</p>
            <p className="mt-1 truncate text-base font-semibold text-foreground">{activeSection.title}</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
        <Card className="shadow-sm">
          <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-3">
            <CardTitle>أقسام الخطة</CardTitle>
            <CardDescription>اختر القسم الذي تريد مراجعته أو تحريره.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 p-4 sm:p-6 pt-0 sm:pt-0">
            {sections.map((section) => {
              const isActive = section.id === activeSection.id;
              return (
                <Button
                  key={section.id}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className="h-auto w-full justify-start gap-3 px-3 py-3 text-right"
                  onClick={() => {
                    onSectionExpand(section.id);
                    setEditingId(null);
                  }}
                >
                  {renderSectionIcon(section.title, 'size-4 shrink-0')}
                  <span className="min-w-0 flex-1 truncate">{section.title}</span>
                  {section.isCompleted && <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="p-4 sm:p-6 pb-4 sm:pb-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                  {renderSectionIcon(activeSection.title, 'size-5')}
                </div>
                <div>
                  <CardTitle>{activeSection.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {activeSection.isCompleted ? 'هذا القسم جاهز للمراجعة.' : 'هذا القسم يحتاج محتوى أو تحسين قبل التصدير.'}
                  </CardDescription>
                </div>
              </div>
              <Badge variant={activeSection.isCompleted ? 'default' : 'outline'}>
                {activeSection.isCompleted ? 'مكتمل' : 'مسودة'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            {editingId === activeSection.id ? (
              <div className="space-y-4">
                <Textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  rows={14}
                  className="min-h-[360px] resize-y leading-7"
                  placeholder="اكتب محتوى هذا القسم بطريقة واضحة وقابلة للتسليم..."
                />
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <Button variant="outline" onClick={() => setEditingId(null)}>إلغاء</Button>
                  <Button onClick={saveDraft}>
                    <Save className="size-4" />
                    حفظ المسودة
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  'min-h-[360px] rounded-lg bg-muted/35 p-4 sm:p-5 text-sm leading-8 text-muted-foreground',
                  activeSection.content && 'bg-transparent text-foreground ring-1 ring-border/60',
                )}
              >
                {activeSection.content ? (
                  <p className="whitespace-pre-wrap">{activeSection.content}</p>
                ) : (
                  <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                    <FileText className="mb-3 size-10 text-muted-foreground" />
                    <h3 className="text-base font-semibold text-foreground">القسم فارغ حالياً</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                      ابدأ بكتابة مسودة أولى. الواجهة هنا مخصصة للتصميم وتجهيز تجربة المستخدم، ويمكن ربطها بالمنطق لاحقاً.
                    </p>
                    <Button className="mt-5" onClick={startEditing}>بدء الكتابة</Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
};
