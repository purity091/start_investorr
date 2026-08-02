import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Compass,
  FileText,
  Layers,
  Lightbulb,
  ListTodo,
  Target,
  Timer,
  Zap,
  TrendingUp,
  ShieldCheck,
  Check,
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkspaceExecutionTask, WorkspaceJourneyStage } from '../../types';
import { useProjectWorkspace } from './ProjectWorkspaceContext';
import { getExecutionCategoryLabel } from './workspaceUtils';
import { cn } from '@/lib/utils';

const STAGE_ORDER: WorkspaceJourneyStage[] = ['discovery', 'analysis', 'decision', 'planning', 'execution'];

const STAGE_CONFIG: Record<
  WorkspaceJourneyStage,
  { label: string; icon: React.ElementType; goal: string }
> = {
  discovery: {
    label: 'اكتشاف الفرصة',
    icon: Compass,
    goal: 'العثور على فجوة سوقية واعدة قبل الدخول في تفاصيل التنفيذ.',
  },
  analysis: {
    label: 'تحليل المشكلة',
    icon: Activity,
    goal: 'فهم ألم العميل وحجم الحاجة وقابلية تحويلها إلى مشروع.',
  },
  decision: {
    label: 'القرار الاستراتيجي',
    icon: Target,
    goal: 'تثبيت نموذج العمل واختيار اتجاه واضح للاستمرار أو التعديل.',
  },
  planning: {
    label: 'بناء الخطة',
    icon: Layers,
    goal: 'تحويل القرار إلى دراسة وجدول تشغيل ومخرجات قابلة للتنفيذ.',
  },
  execution: {
    label: 'التشغيل والنمو',
    icon: Zap,
    goal: 'بدء التشغيل، اختبار السوق، والحصول على أول مؤشرات حقيقية.',
  },
};

const statusConfig: Record<WorkspaceExecutionTask['status'], { label: string; className: string }> = {
  pending: { label: 'لم يبدأ', className: 'bg-muted text-muted-foreground border-border' },
  in_progress: { label: 'قيد العمل', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400' },
  completed: { label: 'مكتمل', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400' },
};

const priorityConfig: Record<WorkspaceExecutionTask['priority'], { label: string; className: string }> = {
  high: { label: 'عالية', className: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400' },
  medium: { label: 'متوسطة', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400' },
  low: { label: 'منخفضة', className: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400' },
};

const getPercent = (value: string, target: string) => {
  const numericValue = Number.parseInt(value, 10) || 0;
  const numericTarget = Number.parseInt(target, 10) || 1;
  return Math.min(100, Math.round((numericValue / numericTarget) * 100));
};

export const UnifiedWorkspace: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const { workspace, cycleAutoTaskStatus, cycleFirstCustomerTaskStatus } = useProjectWorkspace();
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('tasks');

  const currentStageIndex = STAGE_ORDER.indexOf(workspace.currentStage);
  const currentStageInfo = STAGE_CONFIG[workspace.currentStage];
  const CurrentStageIcon = currentStageInfo.icon;
  const firstCustomerTasks = workspace.execution.firstCustomerSprint || [];
  const autoTasks = workspace.execution.autoTasks || [];
  const allTasks = [...firstCustomerTasks, ...autoTasks];
  const pendingTasks = allTasks.filter((task) => task.status !== 'completed');
  const currentTask = pendingTasks[0];
  const completedTasks = allTasks.filter((task) => task.status === 'completed').length;
  const taskProgress = allTasks.length ? Math.round((completedTasks / allTasks.length) * 100) : 0;
  const recommendations = workspace.recommendations || [];

  return (
    <main dir="rtl" className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 text-right lg:px-8">
      {/* Top Header Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="gap-1.5 bg-primary/5 text-primary border-primary/20 font-medium">
                <Compass className="size-3.5" />
                مساحة العمل الموحدة
              </Badge>
              <Badge variant="secondary" className="font-semibold">
                المرحلة الحالية: {currentStageInfo.label}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              محطة نمو المشروع
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              مساحة منظمة تجمع مرحلة النمو، أداء المهام، خطة التشغيل، والتوصيات الذكية في مكان واحد.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-2 lg:pt-0">
            <Button onClick={() => setActiveTab('market-discovery')} size="sm" className="gap-2 font-semibold">
              اكتشاف الفرص
              <ArrowLeft className="size-4" />
            </Button>
            <Button onClick={() => setActiveTab('editor')} variant="outline" size="sm" className="gap-2 font-medium">
              <FileText className="size-4 text-muted-foreground" />
              مراجعة الدراسة
            </Button>
          </div>
        </div>
      </section>

      {/* Metric Cards Grid */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="تقدم الرحلة"
          value={`${workspace.metrics.journeyProgress}%`}
          hint="من الفكرة إلى التشغيل"
          icon={TrendingUp}
          iconColor="text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-400"
          progress={workspace.metrics.journeyProgress}
        />
        <MetricCard
          label="جاهزية المشروع"
          value={`${workspace.metrics.readinessScore}%`}
          hint="جودة التحضير والتجهيز"
          icon={ShieldCheck}
          iconColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400"
          progress={workspace.metrics.readinessScore}
        />
        <MetricCard
          label="تحقق السوق"
          value={`${workspace.metrics.validationScore}%`}
          hint="قوة الدليل والأدلة السوقية"
          icon={Target}
          iconColor="text-sky-600 bg-sky-50 dark:bg-sky-950/50 dark:text-sky-400"
          progress={workspace.metrics.validationScore}
        />
        <MetricCard
          label="إنجاز المهام"
          value={`${taskProgress}%`}
          hint={`${completedTasks} من ${allTasks.length} مهام مكتملة`}
          icon={Zap}
          iconColor="text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400"
          progress={taskProgress}
        />
      </section>

      {/* Stage Roadmap Progress Card */}
      <Card className="overflow-hidden border border-border shadow-2xs">
        <CardHeader className="bg-muted/20 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-base font-bold">
                <CurrentStageIcon className="size-4 text-primary" />
                مسار بناء المشروع
              </CardTitle>
              <CardDescription className="text-xs">{currentStageInfo.goal}</CardDescription>
            </div>
            <Badge variant="outline" className="font-semibold bg-background">
              المرحلة {currentStageIndex + 1} من {STAGE_ORDER.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-5">
            {STAGE_ORDER.map((stage, index) => {
              const info = STAGE_CONFIG[stage];
              const isCurrent = workspace.currentStage === stage;
              const isDone = currentStageIndex > index;

              return (
                <div
                  key={stage}
                  className={cn(
                    'flex items-center gap-3 rounded-xl p-3 border transition-all',
                    isCurrent
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : isDone
                      ? 'bg-emerald-50/50 border-emerald-200/80 text-foreground dark:bg-emerald-950/20 dark:border-emerald-900/40'
                      : 'bg-background border-border/80 text-muted-foreground'
                  )}
                >
                  <div
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-lg font-bold text-xs',
                      isCurrent
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : isDone
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {isDone ? <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" /> : index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={cn('text-[11px] font-medium opacity-80', isCurrent ? 'text-primary-foreground/90' : 'text-muted-foreground')}>
                      المرحلة {index + 1}
                    </p>
                    <p className="truncate text-xs font-bold">{info.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Tabbed Layout */}
      <Tabs value={activeWorkspaceTab} onValueChange={setActiveWorkspaceTab} className="w-full space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-muted/60 p-1 rounded-xl h-11">
          <TabsTrigger value="tasks" className="gap-2 text-xs font-bold data-[state=active]:shadow-2xs">
            <ListTodo className="size-4" />
            المهام والتركيز الحالي
          </TabsTrigger>
          <TabsTrigger value="plan" className="gap-2 text-xs font-bold data-[state=active]:shadow-2xs">
            <Timer className="size-4" />
            خطة 90 يوم والمؤشرات
          </TabsTrigger>
          <TabsTrigger value="insights" className="gap-2 text-xs font-bold data-[state=active]:shadow-2xs">
            <Lightbulb className="size-4" />
            التوصيات والعوائق
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Tasks & Focus */}
        <TabsContent value="tasks" className="space-y-6 pt-1">
          {currentTask ? (
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background shadow-2xs">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="default" className="bg-primary text-primary-foreground text-xs font-semibold">
                        المهام العاجلة
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-background">
                        {getExecutionCategoryLabel(currentTask.category)}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground">{currentTask.title}</CardTitle>
                    <CardDescription className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
                      {currentTask.description}
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() =>
                      currentTask.id.startsWith('lead-')
                        ? cycleFirstCustomerTaskStatus(currentTask.id)
                        : cycleAutoTaskStatus(currentTask.id)
                    }
                    size="sm"
                    className="gap-2 font-semibold shadow-xs"
                  >
                    <CheckCircle2 className="size-4" />
                    تغيير حالة المهمة
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-3 pt-2">
                <InfoPill label="الحالة الحالية" value={statusConfig[currentTask.status].label} className={statusConfig[currentTask.status].className} />
                <InfoPill label="الأولوية" value={priorityConfig[currentTask.priority].label} className={priorityConfig[currentTask.priority].className} />
                <InfoPill label="الإطار الزمني" value={currentTask.dueWindow} />
              </CardContent>
            </Card>
          ) : null}

          <section className="grid gap-6 lg:grid-cols-2">
            <TaskGroup
              title="Sprint العميل الأول"
              description="مهام التحقق من أول عميل أو إشارة طلب حقيقية."
              tasks={firstCustomerTasks}
              onTaskClick={cycleFirstCustomerTaskStatus}
            />
            <TaskGroup
              title="مهام التأسيس الرئيسية"
              description="أعمال تشغيلية مطلوبة لبناء أساس المشروع المستدام."
              tasks={autoTasks}
              onTaskClick={cycleAutoTaskStatus}
            />
          </section>
        </TabsContent>

        {/* Tab 2: 90-Day Plan & KPIs */}
        <TabsContent value="plan" className="space-y-6 pt-1">
          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="border border-border shadow-2xs">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-base font-bold">
                  <Timer className="size-4 text-primary" />
                  خطة 90 يوم للتشغيل والنمو
                </CardTitle>
                <CardDescription className="text-xs">أهداف تشغيلية مرحلية مفصلة حسب الجدول الزمني.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-0">
                {workspace.execution.phasePlan.map((phase, index) => (
                  <React.Fragment key={phase.id}>
                    <article className="grid gap-3 py-4 md:grid-cols-[150px_1fr]">
                      <div className="space-y-1">
                        <Badge variant="outline" className="font-semibold bg-muted/40">
                          {phase.label}
                        </Badge>
                        <p className="text-sm font-bold text-foreground">{phase.focus}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center">
                        {phase.outcomes.map((outcome) => (
                          <Badge key={outcome} variant="secondary" className="text-xs bg-muted/60 text-foreground font-normal">
                            ✓ {outcome}
                          </Badge>
                        ))}
                      </div>
                    </article>
                    {index < workspace.execution.phasePlan.length - 1 ? <Separator className="my-1" /> : null}
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-border shadow-2xs">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-base font-bold">
                  <Activity className="size-4 text-primary" />
                  مؤشرات الأداء الرئيسة (KPIs)
                </CardTitle>
                <CardDescription className="text-xs">مقارنة الفجوة بين الأداء الحالي والمستهدف.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {workspace.execution.kpis.map((kpi) => {
                  const progress = getPercent(kpi.value, kpi.target);

                  return (
                    <div key={kpi.id} className="space-y-2 rounded-lg border border-border/60 bg-muted/20 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-bold text-foreground">{kpi.label}</p>
                        <Badge variant="secondary" className="text-xs tabular-nums font-semibold">
                          {kpi.value} / {kpi.target}
                        </Badge>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
                      </div>
                      <p className="text-[11px] leading-relaxed text-muted-foreground">{kpi.insight}</p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        {/* Tab 3: Insights & Bottlenecks */}
        <TabsContent value="insights" className="space-y-6 pt-1">
          <section className="grid gap-6 lg:grid-cols-2">
            <Card className="border border-border shadow-2xs">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-bold">
                  <Lightbulb className="size-4 text-amber-500" />
                  توصيات عمل المنصة
                </CardTitle>
                <CardDescription className="text-xs">اقتراحات موجهة لمساعدتك في الانتقال للخطوة القادمة.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="rounded-xl border border-border/80 bg-muted/20 p-4 transition-colors hover:bg-muted/40">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-foreground">{rec.title}</p>
                        <p className="text-xs leading-relaxed text-muted-foreground">{rec.description}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab(rec.targetTab)} className="shrink-0 gap-1.5 text-xs font-semibold">
                        <span>{rec.actionLabel}</span>
                        <ChevronLeft className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-border shadow-2xs">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-bold text-rose-600 dark:text-rose-400">
                  <AlertTriangle className="size-4 text-rose-500" />
                  العوائق والتحديات الحرجة
                </CardTitle>
                <CardDescription className="text-xs">نقاط الانتباه المطلوب معالجتها لضمان النجاح.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {workspace.execution.bottlenecks.length ? (
                  workspace.execution.bottlenecks.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-xl border border-rose-200/80 bg-rose-50/50 p-3.5 text-xs leading-relaxed text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300">
                      <AlertTriangle className="size-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                    ✓ لا توجد عوائق حالية تعطل تقدم المشروع.
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
};

const MetricCard: React.FC<{
  label: string;
  value: string;
  hint: string;
  icon: React.ElementType;
  iconColor: string;
  progress: number;
}> = ({ label, value, hint, icon: Icon, iconColor, progress }) => (
  <Card className="relative overflow-hidden border border-border shadow-2xs transition-all hover:shadow-xs">
    <CardContent className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <div className={cn('flex size-8 items-center justify-center rounded-lg border border-border/40', iconColor)}>
          <Icon className="size-4" />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight text-foreground tabular-nums">{value}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
        <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
    </CardContent>
  </Card>
);

const InfoPill: React.FC<{ label: string; value: string; className?: string }> = ({ label, value, className }) => (
  <div className={cn('rounded-xl border border-border/60 bg-background p-3 text-right shadow-2xs', className)}>
    <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
    <p className="mt-1 text-xs font-bold text-foreground">{value}</p>
  </div>
);

const TaskGroup: React.FC<{
  title: string;
  description: string;
  tasks: WorkspaceExecutionTask[];
  onTaskClick: (id: string) => void;
}> = ({ title, description, tasks, onTaskClick }) => (
  <Card className="border border-border shadow-2xs">
    <CardHeader className="pb-3">
      <CardTitle className="text-base font-bold text-foreground">{title}</CardTitle>
      <CardDescription className="text-xs">{description}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-2.5">
      {tasks.map((task) => {
        const isDone = task.status === 'completed';
        const isProgress = task.status === 'in_progress';
        const statusMeta = statusConfig[task.status];

        return (
          <div
            key={task.id}
            onClick={() => onTaskClick(task.id)}
            className={cn(
              'group flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-all hover:bg-muted/50',
              isDone
                ? 'border-emerald-200/70 bg-emerald-50/30 dark:border-emerald-900/30 dark:bg-emerald-950/10'
                : 'border-border bg-card'
            )}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1 pl-2">
              <div
                className={cn(
                  'flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors',
                  isDone
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : isProgress
                    ? 'border-amber-500 bg-amber-50 text-amber-600'
                    : 'border-border bg-background text-muted-foreground group-hover:border-primary'
                )}
              >
                {isDone ? <Check className="size-3.5 stroke-[3]" /> : <span className="size-2 rounded-full bg-current" />}
              </div>
              <div className="min-w-0 space-y-0.5 text-right">
                <p className={cn('truncate text-xs font-bold text-foreground', isDone && 'line-through opacity-70')}>
                  {task.title}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {getExecutionCategoryLabel(task.category)} • {task.dueWindow}
                </p>
              </div>
            </div>

            <Badge variant="outline" className={cn('shrink-0 text-[11px] font-semibold border', statusMeta.className)}>
              {statusMeta.label}
            </Badge>
          </div>
        );
      })}
    </CardContent>
  </Card>
);
