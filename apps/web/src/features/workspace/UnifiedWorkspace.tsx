import React from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Compass,
  FileText,
  Layers,
  Lightbulb,
  Target,
  Timer,
  Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/separator';
import { WorkspaceExecutionTask, WorkspaceJourneyStage } from '../../types';
import { useProjectWorkspace } from './ProjectWorkspaceContext';
import { getExecutionCategoryLabel } from './workspaceUtils';

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

const statusLabel: Record<WorkspaceExecutionTask['status'], string> = {
  pending: 'لم يبدأ',
  in_progress: 'قيد العمل',
  completed: 'مكتمل',
};

const priorityLabel: Record<WorkspaceExecutionTask['priority'], string> = {
  high: 'أولوية عالية',
  medium: 'أولوية متوسطة',
  low: 'أولوية منخفضة',
};

const getPercent = (value: string, target: string) => {
  const numericValue = Number.parseInt(value, 10) || 0;
  const numericTarget = Number.parseInt(target, 10) || 1;
  return Math.min(100, Math.round((numericValue / numericTarget) * 100));
};

export const UnifiedWorkspace: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const { workspace, cycleAutoTaskStatus, cycleFirstCustomerTaskStatus } = useProjectWorkspace();

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
      <section className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">مساحة العمل الموحدة</Badge>
              <Badge variant="outline">{currentStageInfo.label}</Badge>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">محطة نمو المشروع</h1>
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                لوحة خفيفة تجمع المرحلة الحالية، المهام، مؤشرات التنفيذ، والخطوة التالية حتى لا يضيع المستخدم بين صفحات كثيرة.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            <Button onClick={() => setActiveTab('market-discovery')} size="sm">
              اكتشاف الفرص
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button onClick={() => setActiveTab('editor')} variant="outline" size="sm">
              <FileText className="h-4 w-4" />
              مراجعة الدراسة
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-4">
        <MetricCard label="تقدم الرحلة" value={`${workspace.metrics.journeyProgress}%`} hint="من الفكرة إلى التنفيذ" />
        <MetricCard label="جاهزية المشروع" value={`${workspace.metrics.readinessScore}%`} hint="جودة التحضير الحالي" />
        <MetricCard label="تحقق السوق" value={`${workspace.metrics.validationScore}%`} hint="قوة الدليل السوقي" />
        <MetricCard label="إنجاز المهام" value={`${taskProgress}%`} hint={`${completedTasks} من ${allTasks.length} مهام`} />
      </section>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-base">
                <CurrentStageIcon className="h-4 w-4 text-muted-foreground" />
                مسار بناء المشروع
              </CardTitle>
              <CardDescription>{currentStageInfo.goal}</CardDescription>
            </div>
            <Badge variant="secondary">المرحلة {currentStageIndex + 1} من {STAGE_ORDER.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-5">
            {STAGE_ORDER.map((stage, index) => {
              const info = STAGE_CONFIG[stage];
              const Icon = info.icon;
              const isCurrent = workspace.currentStage === stage;
              const isDone = currentStageIndex > index;

              return (
                <div
                  key={stage}
                  className={[
                    'rounded-lg px-3 py-3 ring-1 transition-colors',
                    isCurrent
                      ? 'bg-primary text-primary-foreground ring-primary'
                      : isDone
                        ? 'bg-muted text-foreground ring-border'
                        : 'bg-background text-muted-foreground ring-border',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background/70 text-foreground">
                      {isDone ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs opacity-75">مرحلة {index + 1}</p>
                      <p className="truncate text-sm font-semibold">{info.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {currentTask ? (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-2">
                <Badge>{getExecutionCategoryLabel(currentTask.category)}</Badge>
                <div className="space-y-1">
                  <CardTitle className="text-lg">{currentTask.title}</CardTitle>
                  <CardDescription className="max-w-3xl leading-6">{currentTask.description}</CardDescription>
                </div>
              </div>
              <Button
                onClick={() =>
                  currentTask.id.startsWith('lead-')
                    ? cycleFirstCustomerTaskStatus(currentTask.id)
                    : cycleAutoTaskStatus(currentTask.id)
                }
                size="sm"
              >
                <CheckCircle2 className="h-4 w-4" />
                تحديث الحالة
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            <InfoPill label="الحالة" value={statusLabel[currentTask.status]} />
            <InfoPill label="الأولوية" value={priorityLabel[currentTask.priority]} />
            <InfoPill label="المدى الزمني" value={currentTask.dueWindow} />
          </CardContent>
        </Card>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Timer className="h-4 w-4 text-muted-foreground" />
              خطة 90 يوم
            </CardTitle>
            <CardDescription>أهداف تشغيلية مختصرة لكل مرحلة زمنية.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-0">
            {workspace.execution.phasePlan.map((phase, index) => (
              <React.Fragment key={phase.id}>
                <article className="grid gap-3 py-4 md:grid-cols-[160px_1fr]">
                  <div className="space-y-1">
                    <Badge variant="outline">{phase.label}</Badge>
                    <p className="text-sm font-semibold text-foreground">{phase.focus}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phase.outcomes.map((outcome) => (
                      <Badge key={outcome} variant="secondary">
                        {outcome}
                      </Badge>
                    ))}
                  </div>
                </article>
                {index < workspace.execution.phasePlan.length - 1 ? <Separator /> : null}
              </React.Fragment>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4 text-muted-foreground" />
              مؤشرات الأداء
            </CardTitle>
            <CardDescription>قراءة سريعة للفجوة بين الحالي والمستهدف.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {workspace.execution.kpis.map((kpi) => {
              const progress = getPercent(kpi.value, kpi.target);

              return (
                <div key={kpi.id} className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-foreground">{kpi.label}</p>
                    <p className="text-xs text-muted-foreground">{kpi.value} / {kpi.target}</p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs leading-5 text-muted-foreground">{kpi.insight}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <TaskGroup
          title="Sprint العميل الأول"
          description="مهام التحقق من أول عميل أو أول إشارة طلب."
          tasks={firstCustomerTasks}
          onTaskClick={cycleFirstCustomerTaskStatus}
        />
        <TaskGroup
          title="مهام التأسيس"
          description="أعمال تشغيلية مطلوبة لبناء أساس المشروع."
          tasks={autoTasks}
          onTaskClick={cycleAutoTaskStatus}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              العوائق الحرجة
            </CardTitle>
            <CardDescription>نقاط يجب الانتباه لها قبل التوسع أو الاستثمار.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {workspace.execution.bottlenecks.length ? (
              workspace.execution.bottlenecks.map((item) => (
                <div key={item} className="rounded-lg bg-muted/40 px-3 py-2 text-sm leading-6 text-muted-foreground">
                  {item}
                </div>
              ))
            ) : (
              <p className="rounded-lg bg-muted/40 px-3 py-6 text-center text-sm text-muted-foreground">
                لا توجد عوائق حالية.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
              توصيات عملية
            </CardTitle>
            <CardDescription>اقتراحات واجهة تساعد المستخدم على الانتقال للصفحة الصحيحة.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((rec) => (
              <div key={rec.id} className="rounded-lg bg-muted/40 p-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">{rec.title}</p>
                    <p className="text-sm leading-6 text-muted-foreground">{rec.description}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab(rec.targetTab)}>
                    {rec.actionLabel}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

const MetricCard: React.FC<{ label: string; value: string; hint: string }> = ({ label, value, hint }) => (
  <Card>
    <CardContent className="p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </CardContent>
  </Card>
);

const InfoPill: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-lg bg-muted/40 px-3 py-2">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
  </div>
);

const TaskGroup: React.FC<{
  title: string;
  description: string;
  tasks: WorkspaceExecutionTask[];
  onTaskClick: (id: string) => void;
}> = ({ title, description, tasks, onTaskClick }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      {tasks.map((task) => (
        <Button
          key={task.id}
          type="button"
          variant="ghost"
          onClick={() => onTaskClick(task.id)}
          className="h-auto w-full justify-between whitespace-normal bg-muted/30 px-3 py-3 text-right hover:bg-muted"
        >
          <div className="min-w-0 space-y-1">
            <p className="truncate text-sm font-medium text-foreground">{task.title}</p>
            <p className="text-xs text-muted-foreground">
              {getExecutionCategoryLabel(task.category)} · {task.dueWindow}
            </p>
          </div>
          <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
            {statusLabel[task.status]}
          </Badge>
        </Button>
      ))}
    </CardContent>
  </Card>
);
