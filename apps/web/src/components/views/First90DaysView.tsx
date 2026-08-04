import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Target,
  Sparkles,
  ListTodo,
  Rocket,
  ArrowRight,
  Check,
  Flame,
  Trophy,
  Lightbulb,
  Circle,
  Pencil,
  ArrowUp,
  ArrowDown,
  Plus,
  RotateCcw,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  SlidersHorizontal,
  GripVertical
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export interface TaskItem {
  id: string;
  month: 1 | 2 | 3;
  week: number;
  title: string;
  description: string;
  deliverable: string;
  whyItMatters: string;
  category: 'validation' | 'product' | 'marketing' | 'operations';
  completed: boolean;
}

const INITIAL_TASKS: TaskItem[] = [
  // Month 1
  {
    id: 'm1-1',
    month: 1,
    week: 1,
    title: 'إجراء 10 مقابلات استكشافية مع عملاء محتملين',
    description: 'التحدث المباشر مع 10 أشخاص من الشريحة المستهدفة للتحقق من وجود ألم حقيقي قبل بناء أي جزء من المنتج.',
    deliverable: '10 مقابلات موثقة بمشاكل العميل الحقيقية',
    whyItMatters: 'تجنب إضاعة الوقت والأموال في بناء حل لا يريده أحد. التوثيق المباشر يمنحك ميزة تنافسية ضخمة.',
    category: 'validation',
    completed: true,
  },
  {
    id: 'm1-2',
    month: 1,
    week: 2,
    title: 'صياغة القيمة المقترحة الفائقة (Value Proposition)',
    description: 'تحديد ما الذي يجعلك فريداً بوضوح شديد في جملة واحدة يفهمها العميل في 5 ثوانٍ دون غموض.',
    deliverable: 'صياغة عروض القيمة في جملة ناطقة بـ Value Proposition',
    whyItMatters: 'العميل لا يشتري مواصفات تقنية بل يشتري النتيجة والتحول السريع الذي يمنحه له عرضك.',
    category: 'validation',
    completed: true,
  },
  {
    id: 'm1-3',
    month: 1,
    week: 3,
    title: 'تصميم النموذج الأول المبسط (Wireframe / Prototype)',
    description: 'رسم واجهات أو خطوات الخدمة على الورق أو باستخدام أدوات بسيطة لاختبار تفاعل العميل المبدئي.',
    deliverable: 'مخطط الواجهات أو مسار الخدمة المبسط واختباره',
    whyItMatters: 'رؤية نموذج ملموس تسهم في كشف الثغرات المنطقية قبل البدء في التطوير البرمجي أو التشغيلي المكلف.',
    category: 'product',
    completed: false,
  },
  {
    id: 'm1-4',
    month: 1,
    week: 4,
    title: 'إعداد صفحة الهبوط وتجميع أول 50 مهتم (Waitlist)',
    description: 'إنشاء صفحة بسيطة تشرح الفكرة وتطلب البريد أو الهاتف للانضمام لقائمة الانتظار المبكرة.',
    deliverable: 'صفحة هبوط شغالة مع 50 بريد/عميل مهتم مسجل',
    whyItMatters: 'قائمة الانتظار هي دليل السوق الأولي القابل للقياس وتمنحك قاعدة انطلاق حقيقية عند الإطلاق.',
    category: 'marketing',
    completed: false,
  },

  // Month 2
  {
    id: 'm2-1',
    month: 2,
    week: 5,
    title: 'إطلاق النسخة الأولية القابلة للتجربة (MVP Launch)',
    description: 'تقديم أصغر نسخة تعمل وتؤدي الخدمة الأساسية بدون تعقيدات أو ميزات إضافية زائدة.',
    deliverable: 'رابط النسخة الأولية MVP جاهز للاستخدام المباشر',
    whyItMatters: 'الإطلاق السريع يمنحك التغذية الراجعة الواقعية من الاستخدام بدلاً من الاستغراق في التكهنات.',
    category: 'product',
    completed: false,
  },
  {
    id: 'm2-2',
    month: 2,
    week: 6,
    title: 'الحصول على أول عميل يدفع مقابل الخدمة (First Paying Customer)',
    description: 'إغلاق عملية بيع حقيقية مقابل مقابل مالي ولو رمزياً لاختبار الجاهزية الفعلية للدفع.',
    deliverable: 'إغلاق أول صفقة وتحصيل مقابل مالي حقيقي',
    whyItMatters: 'الدفع المالي هو الدليل الحاسم والوحيد على وجود مشروع تجاري ناجح وليس مجرد مجاملات لطيفة.',
    category: 'operations',
    completed: false,
  },
  {
    id: 'm2-3',
    month: 2,
    week: 7,
    title: 'جمع وتدوين التغذية الراجعة من المستخدمين الأوائل',
    description: 'التواصل الفردي مع كل مستخدم جرب MVP ومعرفة نقاط الصعوبة والرضا لديه.',
    deliverable: 'تقرير الملاحظات والتعديلات المطلوبة للنسخة القادمة',
    whyItMatters: 'المستخدمون الأوائل هم البوصلة الحقيقية التي توجه تطوير المنتج للوصول للملاءمة مع السوق (PMF).',
    category: 'validation',
    completed: false,
  },
  {
    id: 'm2-4',
    month: 2,
    week: 8,
    title: 'تحديد تكلفة جذب العميل الأولي (CAC Baseline)',
    description: 'حساب النفقات والجهد المبذول للحصول على كل عميل جديد لمعرفة مدى استدامة النموذج.',
    deliverable: 'معادلة تكلفة العميل المبكرة (CAC) واضحة ومقاسة',
    whyItMatters: 'فهم معادلة الاقتصاديات المبكرة يساعدك في تقدير الاحتياج المالي للنمو وتجنب الاستنزاف.',
    category: 'operations',
    completed: false,
  },

  // Month 3
  {
    id: 'm3-1',
    month: 3,
    week: 9,
    title: 'تحسين تجربة المستخدم وسد الثغرات التشغيلية',
    description: 'تعديل الرحلة وتسهيل استخدام المنتج بناءً على الملاحظات المستلمة في الشهر الثاني.',
    deliverable: 'نسخة محسنة وسريعة تضمن استمرارية الاستخدام',
    whyItMatters: 'رفع نسبة رضا العميل الحالي يقلل التسرب ويجعل النمو أسرع وأقل تكلفة.',
    category: 'product',
    completed: false,
  },
  {
    id: 'm3-2',
    month: 3,
    week: 10,
    title: 'اختبار قناة تسويق واحدة متكررة (Repeatable Channel)',
    description: 'التركيز على قناة واحدة (محتوى، تسويق مباشر، إعلانات) وااختبار استدامتها.',
    deliverable: 'قناة جذب واحدة تولد مهتمين بشكل أسبوعي ثابت',
    whyItMatters: 'الشركات الناجحة لا تشتت جهودها بل تتقن قناة استقطاب رئيسية واحدة تضمن لها التدفق.',
    category: 'marketing',
    completed: false,
  },
  {
    id: 'm3-3',
    month: 3,
    week: 11,
    title: 'قياس نسبة الاحتفاظ وتكرار التعامل (Retention Rate)',
    description: 'معرفة كم نسبة العملاء الذين يعودون لاستخدام أو طلب الخدمة مجدداً.',
    deliverable: 'مؤشر عودة العملاء ورضاهم فوق نسبة 30%',
    whyItMatters: 'الاحتفاظ بالعملاء أهم من تجنيد عملاء جدد لتجنب مشكلة "سطل الماء المثقوب".',
    category: 'operations',
    completed: false,
  },
  {
    id: 'm3-4',
    month: 3,
    week: 12,
    title: 'تقييم الـ 90 يوم واتخاذ القرار الاستراتيجي (Pivot / Scale)',
    description: 'مراجعة كافة الأرقام والمؤشرات ومقارنتها بالأهداف الموضوعة لاتخاذ القرار المستقبلي.',
    deliverable: 'وثيقة القرار: التوسع في النمو أو تعديل مسار المشروع',
    whyItMatters: 'نهاية 90 يوم هي نقطة مفصلية للمؤسس لوضع استراتيجية المرحلة التالية أو تعديل الاتجاه بنجاح.',
    category: 'operations',
    completed: false,
  },
];

const categoryLabels: Record<TaskItem['category'], { label: string; className: string }> = {
  validation: { label: 'تحقق وسوق', className: 'bg-sky-500/10 text-sky-700 dark:text-sky-300' },
  product: { label: 'بناء وتطوير', className: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300' },
  marketing: { label: 'تسويق وجذب', className: 'bg-amber-500/10 text-amber-700 dark:text-amber-300' },
  operations: { label: 'تشغيل ومالية', className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' },
};

export const First90DaysView: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem('first_90_days_tasks');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_TASKS;
  });

  const [activeMonthFilter, setActiveMonthFilter] = useState<number>(0);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDeliverable, setNewTaskDeliverable] = useState('');
  const [newTaskWhy, setNewTaskWhy] = useState('');
  const [newTaskMonth, setNewTaskMonth] = useState<1 | 2 | 3>(1);
  const [newTaskWeek, setNewTaskWeek] = useState<number>(1);
  const [newTaskCategory, setNewTaskCategory] = useState<TaskItem['category']>('validation');

  // Save tasks to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('first_90_days_tasks', JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const updateTaskTitle = (id: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle.trim() } : t))
    );
  };

  const updateFullTask = (updatedTask: TaskItem) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setEditingTask(null);
  };

  const moveTask = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= tasks.length) return;

    const updated = [...tasks];
    const [movedItem] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, movedItem);
    setTasks(updated);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const resetToInitialTasks = () => {
    setIsResetConfirmOpen(true);
  };

  const confirmResetToInitialTasks = () => {
    setTasks(INITIAL_TASKS);
    localStorage.removeItem('first_90_days_tasks');
    setIsResetConfirmOpen(false);
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: TaskItem = {
      id: `custom-${Date.now()}`,
      month: newTaskMonth,
      week: newTaskWeek,
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim() || 'مهمة مخصصة أضيفت بواسطة المستخدم.',
      deliverable: newTaskDeliverable.trim() || 'إنجاز المخرج المحدد للمهمة',
      whyItMatters: newTaskWhy.trim() || 'تسهم في تسريع تحقيق أهداف المرحلة',
      category: newTaskCategory,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setIsAddDialogOpen(false);
    // Reset form
    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskDeliverable('');
    setNewTaskWhy('');
  };

  const filteredTasks = activeMonthFilter === 0
    ? tasks
    : tasks.filter((t) => t.month === activeMonthFilter);

  const month1Tasks = tasks.filter((t) => t.month === 1);
  const month2Tasks = tasks.filter((t) => t.month === 2);
  const month3Tasks = tasks.filter((t) => t.month === 3);

  return (
    <main dir="rtl" className="mx-auto w-full max-w-5xl space-y-8 px-4 py-6 text-right lg:px-6" style={{ direction: 'rtl' }}>
      {/* Header Banner - Clean Surface Composition (No borders) */}
      <section className="rounded-2xl bg-card p-6 shadow-xs">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1.5 font-semibold text-xs px-2.5 py-0.5">
                <Rocket className="size-3.5 text-primary" />
                رحلة الـ 90 يوماً
              </Badge>
              <Badge variant="secondary" className="font-medium text-xs gap-1">
                <Flame className="size-3 text-amber-500 fill-amber-500" />
                دليل التنفيذ الإستراتيجي
              </Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              خارطة أول 90 يوم للمشروع
            </h1>
            <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
              الانضباط في الشهور الثلاثة الأولى هو الذي يفصل الشركات الناجحة عن الأفكار المنسية. تتبع خطواتك أسبوعاً بأسبوع وحول أفكارك إلى نتائج ملموسة.
            </p>
          </div>

          {/* Gamified Stat Surface & Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 items-start lg:items-start">
            <div className="flex items-center gap-3.5 rounded-xl bg-muted/40 p-3.5">
              <div className="size-12 shrink-0 rounded-xl bg-primary/10 flex flex-col items-center justify-center font-bold text-primary text-xs">
                <span>{completedCount}</span>
                <span className="text-[10px] text-muted-foreground font-normal">من {tasks.length}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                  <Trophy className="size-3.5 text-amber-500 shrink-0" />
                  <span>نسبة الإنجاز الإستراتيجي</span>
                </div>
                <p className="text-xl font-bold text-foreground tabular-nums">{progressPercent}%</p>
                <div className="w-28 bg-muted h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button onClick={() => setIsAddDialogOpen(true)} size="sm" className="gap-1.5 text-xs font-semibold rounded-lg shadow-2xs flex-1 sm:flex-initial">
                <Plus className="size-3.5" />
                مهمة جديدة
              </Button>
              <Button onClick={() => setActiveTab('workspace')} variant="outline" size="sm" className="gap-2 text-xs font-medium rounded-lg">
                <ArrowRight className="size-3.5" />
                مساحة العمل
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabs Navigation - shadcn tabs composition */}
      <Tabs defaultValue="tasks" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-xl h-10">
          <TabsTrigger value="tasks" className="gap-2 text-xs font-semibold rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-xs">
            <ListTodo className="size-3.5 text-primary" />
            إدارة المهام (Task App View)
          </TabsTrigger>
          <TabsTrigger value="timeline" className="gap-2 text-xs font-semibold rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-xs">
            <CalendarIcon className="size-3.5 text-primary" />
            الخط الزمني (Timeline)
          </TabsTrigger>
        </TabsList>

        {/* ================= TAB 1: POPULAR TASKS APP VIEW ================= */}
        <TabsContent value="tasks" className="space-y-5 pt-1">
          {/* Controls Bar: Month Filter + Reset + Count */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-card p-3.5 shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                <SlidersHorizontal className="size-3.5 text-primary" />
                تصفية الشهود:
              </span>
              <div className="flex flex-wrap gap-1">
                <Button
                  size="xs"
                  variant={activeMonthFilter === 0 ? 'default' : 'ghost'}
                  onClick={() => setActiveMonthFilter(0)}
                  className="font-medium rounded-md text-xs"
                >
                  الكل ({tasks.length})
                </Button>
                <Button
                  size="xs"
                  variant={activeMonthFilter === 1 ? 'default' : 'ghost'}
                  onClick={() => setActiveMonthFilter(1)}
                  className="font-medium rounded-md text-xs"
                >
                  الشهر 1
                </Button>
                <Button
                  size="xs"
                  variant={activeMonthFilter === 2 ? 'default' : 'ghost'}
                  onClick={() => setActiveMonthFilter(2)}
                  className="font-medium rounded-md text-xs"
                >
                  الشهر 2
                </Button>
                <Button
                  size="xs"
                  variant={activeMonthFilter === 3 ? 'default' : 'ghost'}
                  onClick={() => setActiveMonthFilter(3)}
                  className="font-medium rounded-md text-xs"
                >
                  الشهر 3
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                size="xs"
                variant="ghost"
                onClick={resetToInitialTasks}
                className="text-xs text-muted-foreground hover:text-destructive gap-1"
                title="إعادة القائمة للتصميم والمهام الافتراضية"
              >
                <RotateCcw className="size-3" />
                إعادة ضبط
              </Button>
              <span className="text-xs font-medium text-muted-foreground tabular-nums border-r border-border pr-3">
                عرض {filteredTasks.length} مهمة
              </span>
            </div>
          </div>

          {/* Interactive Modern Task App List */}
          <div className="space-y-2.5">
            {filteredTasks.length === 0 ? (
              <div className="p-8 text-center bg-card rounded-2xl space-y-2 text-muted-foreground">
                <p className="text-sm font-medium">لا توجد مهام في هذا التصنيف حالياً.</p>
                <Button size="sm" variant="outline" onClick={() => setIsAddDialogOpen(true)} className="gap-1.5 text-xs">
                  <Plus className="size-3.5" />
                  إضافة مهمة جديدة
                </Button>
              </div>
            ) : (
              filteredTasks.map((task) => {
                const globalIndex = tasks.findIndex((t) => t.id === task.id);
                return (
                  <TaskRowItem
                    key={task.id}
                    task={task}
                    index={globalIndex}
                    totalCount={tasks.length}
                    toggleTask={toggleTask}
                    updateTaskTitle={updateTaskTitle}
                    moveTask={moveTask}
                    deleteTask={deleteTask}
                    openEditDialog={() => setEditingTask(task)}
                  />
                );
              })
            )}
          </div>
        </TabsContent>

        {/* ================= TAB 2: VERTICAL TIMELINE ROADMAP ================= */}
        <TabsContent value="timeline" className="space-y-10 pt-1">
          {/* MONTH 1 SECTION */}
          <MonthTimelineBlock
            monthNumber={1}
            title="الشهر الأول: التحقق وتثبيت الأساسات"
            period="الأيام 1 - 30"
            badgeText="المرحلة الاستكشافية"
            goal="التركيز الكامل على التحدث مع العملاء وفهم الألم الفعلي قبل استثمار الوقت أو المال في بناء أي شيء."
            tasks={month1Tasks}
            allTasks={tasks}
            toggleTask={toggleTask}
            updateTaskTitle={updateTaskTitle}
            moveTask={moveTask}
            deleteTask={deleteTask}
            openEditDialog={(t) => setEditingTask(t)}
          />

          {/* MONTH 2 SECTION */}
          <MonthTimelineBlock
            monthNumber={2}
            title="الشهر الثاني: إطلاق النسخة الأولية والعميل الأول"
            period="الأيام 31 - 60"
            badgeText="مرحلة الجاذبية والإطلاق"
            goal="تقديم أصغر نسخة تعمل (MVP) وحصد أول مقابل مالي حقيقي من عميل يدفع للخدمة."
            tasks={month2Tasks}
            allTasks={tasks}
            toggleTask={toggleTask}
            updateTaskTitle={updateTaskTitle}
            moveTask={moveTask}
            deleteTask={deleteTask}
            openEditDialog={(t) => setEditingTask(t)}
          />

          {/* MONTH 3 SECTION */}
          <MonthTimelineBlock
            monthNumber={3}
            title="الشهر الثالث: التحسين والتمهيد للنمو"
            period="الأيام 61 - 90"
            badgeText="مرحلة الاستقرار والتوسع"
            goal="تثبيت الجودة وقناة الجذب المتكررة وقياس نسبة عودة العملاء لاتخاذ قرار التوسع."
            tasks={month3Tasks}
            allTasks={tasks}
            toggleTask={toggleTask}
            updateTaskTitle={updateTaskTitle}
            moveTask={moveTask}
            deleteTask={deleteTask}
            openEditDialog={(t) => setEditingTask(t)}
          />

          {/* Bottom Motivational Quote Card */}
          <section className="rounded-2xl bg-card p-6 text-center space-y-2 shadow-xs">
            <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="size-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">
              &quot;كل شركة ناجحة بدأت بأول 90 يوماً من الانضباط والتنفيذ المبكر&quot;
            </h3>
            <p className="max-w-md mx-auto text-xs leading-relaxed text-muted-foreground">
              استمر في إغلاق مهامك أسبوعاً بعد أسبوع لتحويل الفكرة إلى قصة نجاح حقيقية.
            </p>
          </section>
        </TabsContent>
      </Tabs>

      {/* ================= EDIT TASK DIALOG (SHADCN UI) ================= */}
      {editingTask && (
        <TaskEditDialog
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={updateFullTask}
        />
      )}

      {/* ================= ADD NEW TASK DIALOG (SHADCN UI) ================= */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md text-right font-sans">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">إضافة مهمة جديدة لخارطة 90 يوماً</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddNewTask} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">عنوان المهمة</label>
              <Input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="أدخل عنوان المهمة التنفيذية..."
                required
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-foreground">الشهر</label>
                <select
                  value={newTaskMonth}
                  onChange={(e) => setNewTaskMonth(Number(e.target.value) as 1 | 2 | 3)}
                  className="w-full h-9 rounded-md border border-input bg-background px-2 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value={1}>الشهر 1</option>
                  <option value={2}>الشهر 2</option>
                  <option value={3}>الشهر 3</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-foreground">الأسبوع</label>
                <Input
                  type="number"
                  min={1}
                  max={12}
                  value={newTaskWeek}
                  onChange={(e) => setNewTaskWeek(Number(e.target.value))}
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-foreground">التصنيف</label>
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value as TaskItem['category'])}
                  className="w-full h-9 rounded-md border border-input bg-background px-2 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="validation">تحقق وسوق</option>
                  <option value="product">بناء وتطوير</option>
                  <option value="marketing">تسويق وجذب</option>
                  <option value="operations">تشغيل ومالية</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">الوصف الإستراتيجي</label>
              <Textarea
                value={newTaskDesc}
                onChange={(e) => setNewTaskDesc(e.target.value)}
                placeholder="شرح مختصر للخطوات والمطلوب..."
                rows={2}
                className="text-xs resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">المخرج الحاسم (Deliverable)</label>
              <Input
                value={newTaskDeliverable}
                onChange={(e) => setNewTaskDeliverable(e.target.value)}
                placeholder="ما النتيجة الملموسة بعد الإنجاز؟"
                className="text-xs"
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit" size="sm" className="gap-1">
                <Plus className="size-3.5" />
                إضافة المهمة
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={isResetConfirmOpen} onOpenChange={setIsResetConfirmOpen}>
        <DialogContent className="sm:max-w-[440px]" dir="rtl">
          <DialogHeader className="text-right">
            <DialogTitle>إعادة ضبط قائمة المهام</DialogTitle>
          </DialogHeader>
          <p className="text-sm leading-7 text-muted-foreground">
            سيتم حذف التعديلات الحالية وإرجاع قائمة المهام إلى الحالة الافتراضية.
          </p>
          <DialogFooter>
            <Button variant="destructive" onClick={confirmResetToInitialTasks}>
              إعادة الضبط
            </Button>
            <Button variant="outline" onClick={() => setIsResetConfirmOpen(false)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

/* ================= TASK ROW ITEM (TODOIST / LINEAR STYLE SHADCN UI) ================= */
interface TaskRowItemProps {
  task: TaskItem;
  index: number;
  totalCount: number;
  toggleTask: (id: string) => void;
  updateTaskTitle: (id: string, newTitle: string) => void;
  moveTask: (index: number, direction: 'up' | 'down') => void;
  deleteTask: (id: string) => void;
  openEditDialog: () => void;
}

const TaskRowItem: React.FC<TaskRowItemProps> = ({
  task,
  index,
  totalCount,
  toggleTask,
  updateTaskTitle,
  moveTask,
  deleteTask,
  openEditDialog,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleText, setTitleText] = useState(task.title);
  const [isExpanded, setIsExpanded] = useState(false);

  const catMeta = categoryLabels[task.category];

  const handleSaveTitle = () => {
    if (titleText.trim() && titleText !== task.title) {
      updateTaskTitle(task.id, titleText);
    }
    setIsEditingTitle(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      setTitleText(task.title);
      setIsEditingTitle(false);
    }
  };

  return (
    <Card className={cn(
      "bg-card shadow-2xs rounded-xl border-0 transition-all duration-200 hover:shadow-xs group relative",
      task.completed && "bg-muted/20"
    )}>
      <CardContent className="p-3 sm:p-4 space-y-3">
        <div className="flex items-center gap-2.5 sm:gap-3.5">

          {/* Reorder Buttons (Up/Down) */}
          <div className="flex flex-col gap-0.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => moveTask(index, 'up')}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
              title="تحريك للأعلى"
            >
              <ArrowUp className="size-3.5" />
            </button>
            <button
              type="button"
              disabled={index === totalCount - 1}
              onClick={() => moveTask(index, 'down')}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
              title="تحريك للأسفل"
            >
              <ArrowDown className="size-3.5" />
            </button>
          </div>

          {/* Interactive Todo Checkbox */}
          <button
            type="button"
            onClick={() => toggleTask(task.id)}
            className={cn(
              'flex size-6 shrink-0 items-center justify-center rounded-lg transition-all duration-200 shadow-2xs',
              task.completed
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            )}
            title={task.completed ? 'تعيين كغير مكتمل' : 'تعيين كمكتمل'}
          >
            {task.completed ? <Check className="size-4 stroke-[3]" /> : null}
          </button>

          {/* Main Title / Inline Input Area */}
          <div className="flex-1 min-w-0">
            {isEditingTitle ? (
              <div className="flex items-center gap-2">
                <Input
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="h-8 text-xs font-semibold bg-background"
                />
                <Button size="xs" onClick={handleSaveTitle} className="h-8 px-2.5 font-bold">
                  <Check className="size-3.5" />
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => {
                    setTitleText(task.title);
                    setIsEditingTitle(false);
                  }}
                  className="h-8 px-2"
                >
                  <X className="size-3.5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <h3
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    'cursor-pointer text-sm font-semibold leading-snug text-foreground transition-colors hover:text-primary',
                    task.completed && 'line-through opacity-55'
                  )}
                >
                  {task.title}
                </h3>

                {/* Edit Title Button inline */}
                <button
                  type="button"
                  onClick={() => {
                    setTitleText(task.title);
                    setIsEditingTitle(true);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-all p-1 rounded-md"
                  title="تعديل اسم المهمة سريعاً"
                >
                  <Pencil className="size-3" />
                </button>
              </div>
            )}

            {/* Badges & Meta strip */}
            {!isEditingTitle && (
              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                <Badge variant="secondary" className={cn('text-[10px] font-medium rounded-md px-1.5 py-0', catMeta.className)}>
                  {catMeta.label}
                </Badge>
                <Badge variant="outline" className="text-[10px] font-normal rounded-md border-0 bg-muted/40 px-1.5 py-0">
                  الشهر {task.month} • الأسبوع {task.week}
                </Badge>
                {task.deliverable && (
                  <span className="text-[11px] text-muted-foreground truncate max-w-[240px] font-medium hidden sm:inline-block">
                    • {task.deliverable}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions Strip */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Expand / Collapse Details Button */}
            <Button
              size="icon-xs"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground hover:text-foreground"
              title={isExpanded ? "اخفاء التفاصيل" : "عرض التفاصيل الإستراتيجية"}
            >
              {isExpanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
            </Button>

            {/* Dropdown Menu for Extra Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon-xs" variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <MoreVertical className="size-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 text-right font-sans">
                <DropdownMenuItem onClick={() => setIsEditingTitle(true)} className="gap-2 text-xs">
                  <Pencil className="size-3.5 text-primary" />
                  تعديل الاسم سريعاً
                </DropdownMenuItem>
                <DropdownMenuItem onClick={openEditDialog} className="gap-2 text-xs">
                  <SlidersHorizontal className="size-3.5 text-indigo-500" />
                  تعديل التفاصيل والمخرجات
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => moveTask(index, 'up')}
                  disabled={index === 0}
                  className="gap-2 text-xs"
                >
                  <ArrowUp className="size-3.5" />
                  تحريك للأعلى
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => moveTask(index, 'down')}
                  disabled={index === totalCount - 1}
                  className="gap-2 text-xs"
                >
                  <ArrowDown className="size-3.5" />
                  تحريك للأسفل
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => deleteTask(task.id)}
                  className="gap-2 text-xs text-destructive focus:text-destructive"
                >
                  <Trash2 className="size-3.5" />
                  حذف المهمة
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Collapsible Details Panel */}
        {isExpanded && (
          <div className="pt-2 border-t border-border/40 grid gap-2.5 sm:grid-cols-2 text-xs">
            <div className="rounded-lg bg-muted/40 p-3 leading-relaxed text-foreground">
              <span className="font-semibold flex items-center gap-1.5 mb-1 text-muted-foreground">
                <Target className="size-3.5 text-primary shrink-0" />
                <span>المخرج المطلوب (Deliverable):</span>
              </span>
              <p className="font-medium text-foreground">{task.deliverable}</p>
            </div>

            <div className="rounded-lg bg-muted/40 p-3 leading-relaxed text-foreground">
              <span className="font-semibold flex items-center gap-1.5 mb-1 text-muted-foreground">
                <Lightbulb className="size-3.5 text-amber-500 shrink-0" />
                <span>لماذا هي مهمة؟</span>
              </span>
              <p className="font-medium text-foreground">{task.whyItMatters}</p>
            </div>

            <div className="sm:col-span-2 rounded-lg bg-muted/30 p-2.5 text-[11px] text-muted-foreground leading-relaxed">
              <strong className="text-foreground font-semibold">الشرح: </strong>
              {task.description}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

/* ================= MONTH TIMELINE BLOCK COMPONENT ================= */
const MonthTimelineBlock: React.FC<{
  monthNumber: number;
  title: string;
  period: string;
  badgeText: string;
  goal: string;
  tasks: TaskItem[];
  allTasks: TaskItem[];
  toggleTask: (id: string) => void;
  updateTaskTitle: (id: string, newTitle: string) => void;
  moveTask: (index: number, direction: 'up' | 'down') => void;
  deleteTask: (id: string) => void;
  openEditDialog: (task: TaskItem) => void;
}> = ({
  monthNumber,
  title,
  period,
  badgeText,
  goal,
  tasks,
  allTasks,
  toggleTask,
  updateTaskTitle,
  moveTask,
  deleteTask,
  openEditDialog,
}) => {
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <section className="space-y-4">
      {/* Month Header Banner */}
      <div className="rounded-xl bg-muted/50 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0">
              م{monthNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-foreground">{title}</h2>
                <Badge variant="secondary" className="text-[11px] font-medium">
                  {badgeText}
                </Badge>
              </div>
              <p className="text-[11px] font-medium text-muted-foreground mt-0.5">{period}</p>
            </div>
          </div>

          <Badge variant="outline" className="self-start sm:self-auto font-medium text-[11px] border-0 bg-background/80 tabular-nums">
            إنجاز {completedCount} من {tasks.length} مهام
          </Badge>
        </div>
        <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground max-w-3xl">
          {goal}
        </p>
      </div>

      {/* Task Rows in Month Section */}
      <div className="space-y-2.5">
        {tasks.map((task) => {
          const globalIndex = allTasks.findIndex((t) => t.id === task.id);
          return (
            <TaskRowItem
              key={task.id}
              task={task}
              index={globalIndex}
              totalCount={allTasks.length}
              toggleTask={toggleTask}
              updateTaskTitle={updateTaskTitle}
              moveTask={moveTask}
              deleteTask={deleteTask}
              openEditDialog={() => openEditDialog(task)}
            />
          );
        })}
      </div>
    </section>
  );
};

/* ================= EDIT TASK DETAILS DIALOG ================= */
const TaskEditDialog: React.FC<{
  task: TaskItem;
  onClose: () => void;
  onSave: (updatedTask: TaskItem) => void;
}> = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [deliverable, setDeliverable] = useState(task.deliverable);
  const [whyItMatters, setWhyItMatters] = useState(task.whyItMatters);
  const [category, setCategory] = useState<TaskItem['category']>(task.category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...task,
      title: title.trim(),
      description: description.trim(),
      deliverable: deliverable.trim(),
      whyItMatters: whyItMatters.trim(),
      category,
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg text-right font-sans">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">تعديل معلومات المهمة التنفيذية</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">عنوان المهمة</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="text-xs font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">التصنيف الإستراتيجي</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskItem['category'])}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="validation">تحقق وسوق</option>
              <option value="product">بناء وتطوير</option>
              <option value="marketing">تسويق وجذب</option>
              <option value="operations">تشغيل ومالية</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">الوصف الإستراتيجي</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="text-xs resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">المخرج المطلوب (Deliverable)</label>
            <Input
              value={deliverable}
              onChange={(e) => setDeliverable(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">لماذا هي مهمة؟ (Why It Matters)</label>
            <Textarea
              value={whyItMatters}
              onChange={(e) => setWhyItMatters(e.target.value)}
              rows={2}
              className="text-xs resize-none leading-relaxed"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit" size="sm" className="gap-1.5">
              <Check className="size-3.5" />
              حفظ التعديلات
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
