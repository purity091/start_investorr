"use client";

import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronsDownUp,
  ChevronsUpDown,
  Info,
  ListChecks,
  RotateCcw,
} from "lucide-react";
import { Kanban, Willow } from "@svar-ui/react-kanban";
import type { ColumnConfig, KanbanCard, KanbanInstanceApi } from "@svar-ui/react-kanban";
import "@svar-ui/react-kanban/all.css";

import { Button } from "@/components/ui/Button";
import { PLAN_MONTHS } from "./first90DaysTaskUtils";
import type { PlanMonth, TaskItem } from "./first90DaysTaskUtils";

type KanbanGroupBy = "status" | "month";

const statusColumns: ColumnConfig[] = [
  { id: "active", label: "قيد التنفيذ" },
  { id: "done", label: "مكتملة" },
];

const monthNames = [
  "كانون الثاني",
  "شباط",
  "آذار",
  "نيسان",
  "أيار",
  "حزيران",
  "تموز",
  "آب",
  "أيلول",
  "تشرين الأول",
  "تشرين الثاني",
  "كانون الأول",
];

const monthColumns: ColumnConfig[] = PLAN_MONTHS.map((month) => ({
  id: `month-${month}`,
  label: `الشهر ${month} · ${monthNames[month - 1]}`,
}));

export const First90DaysKanban: React.FC<{
  tasks: TaskItem[];
  onTaskCompletionChange: (id: string, completed: boolean) => void;
  onTaskMonthChange: (id: string, month: PlanMonth) => void;
  onTaskEdit: (id: string) => void;
}> = ({ tasks, onTaskCompletionChange, onTaskMonthChange, onTaskEdit }) => {
  const [groupBy, setGroupBy] = useState<KanbanGroupBy>("status");
  const [cardView, setCardView] = useState({
    description: true,
    progress: true,
    tags: true,
  });
  const [collapsedColumns, setCollapsedColumns] = useState<Record<KanbanGroupBy, Record<string, boolean>>>({
    status: {},
    month: {},
  });

  const baseColumns = groupBy === "month" ? monthColumns : statusColumns;
  const columns = useMemo(
    () => baseColumns.map((column) => ({
      ...column,
      collapsed: collapsedColumns[groupBy][String(column.id)] ?? false,
    })),
    [baseColumns, collapsedColumns, groupBy],
  );

  const cards = useMemo<KanbanCard[]>(
    () => tasks.map((task) => ({
      id: task.id,
      label: task.title,
      description: task.description,
      progress: task.completed ? 100 : 0,
      tags: [
        task.category === "validation"
          ? "تحقق وسوق"
          : task.category === "product"
            ? "بناء وتطوير"
            : task.category === "marketing"
              ? "تسويق وجذب"
              : "تشغيل ومالية",
      ],
      column: groupBy === "month" ? `month-${task.month}` : task.completed ? "done" : "active",
    })),
    [groupBy, tasks],
  );

  const handleInit = (api: KanbanInstanceApi) => {
    api.intercept("add-card", () => false);
    api.intercept("delete-card", () => false);
    api.intercept("update-card", () => false);
  };

  const handleUpdateColumn = ({ id, column }: { id: string | number; column: Partial<ColumnConfig> }) => {
    if (typeof column.collapsed !== "boolean") return;

    setCollapsedColumns((current) => ({
      ...current,
      [groupBy]: {
        ...current[groupBy],
        [String(id)]: column.collapsed,
      },
    }));
  };

  const handleSelectCard = ({ id }: { id: string | number | null }) => {
    if (typeof id === "string") onTaskEdit(id);
  };

  const setAllColumnsCollapsed = (collapsed: boolean) => {
    setCollapsedColumns((current) => ({
      ...current,
      [groupBy]: Object.fromEntries(baseColumns.map((column) => [String(column.id), collapsed])),
    }));
  };

  const resetCollapsedColumns = () => {
    setCollapsedColumns((current) => ({ ...current, [groupBy]: {} }));
  };

  const handleMoveCard = ({ id, column }: { id: string | number; column?: string | number }) => {
    if (typeof id !== "string" || !column) return;

    const task = tasks.find((item) => item.id === id);
    if (!task) return;

    if (groupBy === "status") {
      const completed = String(column) === "done";
      if (task.completed !== completed) onTaskCompletionChange(id, completed);
      return;
    }

    const monthValue = Number(String(column).replace("month-", ""));
    if (PLAN_MONTHS.includes(monthValue as PlanMonth)) {
      const month = monthValue as PlanMonth;
      if (task.month !== month) onTaskMonthChange(id, month);
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <section dir="rtl" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-card px-4 py-3 text-right shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="size-4 text-primary" />
            <span>
              {groupBy === "status"
                ? "اسحب البطاقات بين أعمدة الحالة لتحديث الإنجاز، ثم اضغط «حفظ التعديلات»."
                : "اسحب البطاقات بين أعمدة الشهور لتغيير شهر المهمة، ثم اضغط «حفظ التعديلات»."}
            </span>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-muted/50 p-1" aria-label="طريقة تجميع أعمدة كانبان">
            <Button
              type="button"
              size="xs"
              variant={groupBy === "status" ? "default" : "ghost"}
              onClick={() => setGroupBy("status")}
              className="h-7 rounded-md px-2.5 text-[11px] font-semibold"
            >
              <ListChecks className="size-3.5" />
              حسب الحالة
            </Button>
            <Button
              type="button"
              size="xs"
              variant={groupBy === "month" ? "default" : "ghost"}
              onClick={() => setGroupBy("month")}
              className="h-7 rounded-md px-2.5 text-[11px] font-semibold"
            >
              <CalendarDays className="size-3.5" />
              حسب الشهر
            </Button>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-muted/50 p-1" aria-label="التحكم في أعمدة كانبان">
            <Button
              type="button"
              size="xs"
              variant="ghost"
              onClick={() => setAllColumnsCollapsed(true)}
              className="h-7 rounded-md px-2 text-[11px] font-semibold"
              title="طي جميع الأعمدة"
            >
              <ChevronsDownUp className="size-3.5" />
              طي الكل
            </Button>
            <Button
              type="button"
              size="xs"
              variant="ghost"
              onClick={() => setAllColumnsCollapsed(false)}
              className="h-7 rounded-md px-2 text-[11px] font-semibold"
              title="توسيع جميع الأعمدة"
            >
              <ChevronsUpDown className="size-3.5" />
              توسيع الكل
            </Button>
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              onClick={resetCollapsedColumns}
              className="text-muted-foreground"
              title="إعادة ضبط عرض الأعمدة"
              aria-label="إعادة ضبط عرض الأعمدة"
            >
              <RotateCcw className="size-3.5" />
            </Button>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-muted/50 p-1" aria-label="تفاصيل بطاقات كانبان">
            <span className="px-1 text-[10px] font-bold text-muted-foreground">تفاصيل:</span>
            <Button
              type="button"
              size="xs"
              variant={cardView.description ? "default" : "ghost"}
              onClick={() => setCardView((current) => ({ ...current, description: !current.description }))}
              aria-pressed={cardView.description}
              className="h-7 rounded-md px-2 text-[11px] font-semibold"
            >
              الوصف
            </Button>
            <Button
              type="button"
              size="xs"
              variant={cardView.progress ? "default" : "ghost"}
              onClick={() => setCardView((current) => ({ ...current, progress: !current.progress }))}
              aria-pressed={cardView.progress}
              className="h-7 rounded-md px-2 text-[11px] font-semibold"
            >
              التقدم
            </Button>
            <Button
              type="button"
              size="xs"
              variant={cardView.tags ? "default" : "ghost"}
              onClick={() => setCardView((current) => ({ ...current, tags: !current.tags }))}
              aria-pressed={cardView.tags}
              className="h-7 rounded-md px-2 text-[11px] font-semibold"
            >
              التصنيفات
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <CheckCircle2 className="size-4 text-emerald-600" />
          <span>{completedCount} من {tasks.length} مكتملة</span>
        </div>
      </div>

      <div className="first-90-days-kanban h-[min(680px,75vh)] min-h-[520px] w-full overflow-hidden rounded-2xl bg-card shadow-xs">
        <Willow fonts={false}>
          <Kanban
            key={groupBy}
            init={handleInit}
            cards={cards}
            columns={columns}
            readonly={false}
            card={{
              description: cardView.description,
              progress: cardView.progress ? { showLabel: true } : false,
              tags: cardView.tags,
              menu: false,
            }}
            onMoveCard={handleMoveCard}
            onUpdateColumn={handleUpdateColumn}
            onSelectCard={handleSelectCard}
          />
        </Willow>
      </div>
    </section>
  );
};
