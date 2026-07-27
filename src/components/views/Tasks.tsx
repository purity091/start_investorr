import React, { useState } from 'react';
import { Calendar, CheckCircle2, Circle, Clock, FileText, ListTodo, Plus } from 'lucide-react';

import { Task } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'مراجعة الملخص التنفيذي',
    description: 'تأكد من أن الأرقام المالية متوافقة مع التوقعات الجديدة في القسم المالي.',
    status: 'completed',
    priority: 'medium',
    relatedPlan: 'خطة عمل متجر عطور',
    assignedBy: 'فريق المنصة',
    dueDate: '27-11-2026',
    timestamp: 'منذ شهر',
  },
  {
    id: '2',
    title: 'تحليل المنافسين في السوق الرياضي',
    description: 'إضافة قائمة بالمنافسين المباشرين وغير المباشرين في منطقة الرياض.',
    status: 'completed',
    priority: 'high',
    relatedPlan: 'مشروع صالة ألعاب رياضية',
    assignedBy: 'فريق المنصة',
    dueDate: '22-11-2026',
    timestamp: 'منذ شهر',
  },
  {
    id: '3',
    title: 'تحديد مصادر الإيرادات البديلة',
    description: 'البحث عن 3 مصادر إيرادات إضافية لتعزيز التدفق النقدي في السنة الأولى.',
    status: 'in_progress',
    priority: 'high',
    relatedPlan: 'منصة خدمات لوجستية',
    assignedBy: 'فريق المنصة',
    dueDate: '05-12-2026',
    timestamp: 'منذ يومين',
  },
  {
    id: '4',
    title: 'تصميم الهوية البصرية الأولية',
    description: 'اختيار اتجاه شعار ولوحة ألوان تعكس شخصية المشروع قبل تسليم brief للمصمم.',
    status: 'pending',
    priority: 'low',
    relatedPlan: 'هوية مشروع جديد',
    assignedBy: 'فريق المنصة',
    dueDate: '10-12-2026',
    timestamp: 'منذ أسبوع',
  },
];

type TaskFilter = 'all' | 'pending' | 'in_progress' | 'completed';

const filterOptions: Array<{ id: TaskFilter; label: string }> = [
  { id: 'all', label: 'الكل' },
  { id: 'pending', label: 'قيد الانتظار' },
  { id: 'in_progress', label: 'قيد التنفيذ' },
  { id: 'completed', label: 'مكتملة' },
];

export const Tasks: React.FC = () => {
  const [filter, setFilter] = useState<TaskFilter>('all');

  const filteredTasks = filter === 'all'
    ? MOCK_TASKS
    : MOCK_TASKS.filter((task) => task.status === filter);

  const counts = {
    all: MOCK_TASKS.length,
    pending: MOCK_TASKS.filter((task) => task.status === 'pending').length,
    in_progress: MOCK_TASKS.filter((task) => task.status === 'in_progress').length,
    completed: MOCK_TASKS.filter((task) => task.status === 'completed').length,
  };

  return (
    <div className="app-page-shell-wide space-y-6 py-6" dir="rtl">
      <section className="rounded-xl bg-card p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 space-y-2">
            <Badge variant="secondary">مركز المهام</Badge>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                مهامي
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
                واجهة مختصرة لمتابعة المهام المرتبطة بالمشاريع ودراسات الجدوى، مع حالات واضحة قابلة للربط لاحقاً.
              </p>
            </div>
          </div>
          <Button>
            <Plus className="size-4" />
            إضافة مهمة
          </Button>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="إجمالي المهام" value={counts.all} />
        <Metric label="قيد التنفيذ" value={counts.in_progress} />
        <Metric label="مكتملة" value={counts.completed} />
        <Metric label="قيد الانتظار" value={counts.pending} />
      </section>

      <section className="flex flex-col gap-3 rounded-xl bg-card p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">فلترة المهام</h2>
          <p className="mt-1 text-xs text-muted-foreground">تبديل سريع بين حالات المهمة.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <Button
              key={option.id}
              variant={filter === option.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(option.id)}
            >
              {option.label}
              <Badge variant={filter === option.id ? 'secondary' : 'outline'} className="mr-1">
                {counts[option.id]}
              </Badge>
            </Button>
          ))}
        </div>
      </section>

      <Card className="border-transparent shadow-sm">
        <CardHeader className="p-5">
          <CardTitle>قائمة المهام</CardTitle>
          <CardDescription>جدول مضغوط وواضح بدلاً من بطاقات ضخمة.</CardDescription>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          {filteredTasks.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center rounded-lg bg-muted/45 p-6 text-center">
              <ListTodo className="mb-3 size-9 text-muted-foreground" />
              <h3 className="text-base font-semibold text-foreground">لا توجد مهام في هذا القسم</h3>
              <p className="mt-2 text-sm text-muted-foreground">غيّر الفلتر أو أضف مهمة جديدة.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المهمة</TableHead>
                  <TableHead>الخطة المرتبطة</TableHead>
                  <TableHead>الأولوية</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الموعد</TableHead>
                  <TableHead>الإجراء</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="min-w-[260px]">
                      <p className="font-medium text-foreground">{task.title}</p>
                      <p className="mt-1 max-w-xl truncate text-xs text-muted-foreground">{task.description}</p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <FileText className="size-4" />
                        {task.relatedPlan}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{priorityLabel(task.priority)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={task.status === 'completed' ? 'success' : 'outline'}>
                        {statusLabel(task.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-4" />
                        {task.dueDate}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        {task.status === 'completed' ? <CheckCircle2 className="size-4" /> : <Circle className="size-4" />}
                        {task.status === 'completed' ? 'مكتملة' : 'تحديد كمكتملة'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <section className="rounded-xl bg-card p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Clock className="size-5 text-muted-foreground" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-foreground">مؤشر الإنتاجية</h2>
              <p className="mt-1 text-xs text-muted-foreground">أنجزت 2 من 4 مهام ضمن هذا العرض التجريبي.</p>
            </div>
          </div>
          <Badge variant="outline">واجهة فقط</Badge>
        </div>
      </section>
    </div>
  );
};

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <Card className="border-transparent shadow-sm">
      <CardContent className="p-4">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-2 text-xl font-semibold text-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}

function statusLabel(status: Task['status']) {
  if (status === 'completed') return 'مكتملة';
  if (status === 'in_progress') return 'قيد التنفيذ';
  return 'قيد الانتظار';
}

function priorityLabel(priority: Task['priority']) {
  if (priority === 'high') return 'عالية';
  if (priority === 'medium') return 'متوسطة';
  return 'منخفضة';
}
