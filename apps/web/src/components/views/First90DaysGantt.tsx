"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  MouseEvent as ReactMouseEvent,
  UIEvent as ReactUIEvent,
  WheelEvent as ReactWheelEvent,
} from "react";
import { CalendarDays, Info, RotateCcw, Trash2, ZoomIn, ZoomOut } from "lucide-react";
import { Gantt, Willow } from "@svar-ui/react-gantt";
import type { IApi, IColumnConfig, ILink, ITask } from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";

import { Button } from "@/components/ui/Button";
import type { TaskItem } from "./first90DaysTaskUtils";
import {
  addDays,
  fromDateKey,
  getDefaultTaskDates,
} from "./first90DaysTaskUtils";

const DAY_MS = 24 * 60 * 60 * 1000;
const PLAN_DAYS = 365;
const TIMELINE_PADDING_DAYS = 14;
const DEFAULT_DAY_WIDTH = 42;
const MIN_DAY_WIDTH = 24;
const MAX_DAY_WIDTH = 84;

const getTaskRange = (task: TaskItem, planStartDate: Date) => {
  const fallback = getDefaultTaskDates(task, planStartDate);
  const start = fromDateKey(task.startDate) ?? fromDateKey(fallback.startDate)!;
  const end = fromDateKey(task.endDate) ?? fromDateKey(fallback.endDate)!;

  return {
    start,
    end: end > start ? end : addDays(start, 1),
  };
};

const getDuration = (start: Date, end: Date) =>
  Math.max(1, Math.round((end.getTime() - start.getTime()) / DAY_MS));

const categoryLabels: Record<TaskItem["category"], string> = {
  validation: "تحقق وسوق",
  product: "بناء وتطوير",
  marketing: "تسويق وجذب",
  operations: "تشغيل ومالية",
};

const columns: IColumnConfig[] = [
  {
    id: "text",
    header: "المهمة",
    width: 340,
    flexgrow: 1,
    align: "left",
    sort: false,
  },
];

type GanttUpdateEvent = {
  id: string | number;
  task: Partial<ITask>;
  inProgress?: boolean;
};

export type PersistedGanttLink = ILink & { id: string | number };

type GanttLinkEvent = {
  id?: string | number;
  link: Partial<ILink>;
};

type GanttDeleteLinkEvent = {
  id: string | number;
};

type GanttShowEditorEvent = {
  id: string | number;
};

const isTaskId = (value: unknown): value is string | number =>
  (typeof value === "string" && value.length > 0) || typeof value === "number";

const isLinkType = (value: unknown): value is ILink["type"] =>
  value === "s2s" || value === "s2e" || value === "e2s" || value === "e2e";

const sameId = (left: string | number, right: string | number) => String(left) === String(right);

const getStableLinkId = (link: Partial<ILink>, eventId?: string | number) => {
  if (isTaskId(eventId)) return eventId;
  if (isTaskId(link.id)) return link.id;
  if (isTaskId(link.source) && isTaskId(link.target) && isLinkType(link.type)) {
    return `link-${link.source}-${link.target}-${link.type}`;
  }
  return `link-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

const normalizeLinks = (value: unknown): PersistedGanttLink[] => {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item, index) => {
    if (!item || typeof item !== "object") return [];

    const candidate = item as Partial<ILink>;
    if (!isTaskId(candidate.source) || !isTaskId(candidate.target) || !isLinkType(candidate.type)) {
      return [];
    }

    const id = isTaskId(candidate.id)
      ? candidate.id
      : isTaskId(candidate.source) && isTaskId(candidate.target) && isLinkType(candidate.type)
        ? `link-${candidate.source}-${candidate.target}-${candidate.type}`
        : `link-${index}`;
    return [
      {
        id,
        source: candidate.source,
        target: candidate.target,
        type: candidate.type,
        ...(typeof candidate.lag === "number" ? { lag: candidate.lag } : {}),
      },
    ];
  });
};

const asValidDate = (value: unknown) => {
  const date = value instanceof Date ? new Date(value) : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
};

export const First90DaysGantt: React.FC<{
  tasks: TaskItem[];
  planStartDate: Date;
  links: PersistedGanttLink[];
  onLinksChange: (links: PersistedGanttLink[]) => void;
  onTaskDatesChange: (id: string, start: Date, end: Date) => void;
  onTaskEdit: (id: string) => void;
}> = ({ tasks, planStartDate, links, onLinksChange, onTaskDatesChange, onTaskEdit }) => {
  const ganttApiRef = useRef<IApi | null>(null);
  const ganttContainerRef = useRef<HTMLDivElement | null>(null);
  const timelineScrollbarRef = useRef<HTMLDivElement | null>(null);
  const [dayWidth, setDayWidth] = useState(DEFAULT_DAY_WIDTH);
  const [timelineWidth, setTimelineWidth] = useState(0);
  const [selectedLinkId, setSelectedLinkId] = useState<string | number | null>(null);

  const projectEnd = useMemo(() => {
    return addDays(planStartDate, PLAN_DAYS + TIMELINE_PADDING_DAYS);
  }, [planStartDate]);

  useEffect(() => {
    let animationFrame = 0;
    let disposed = false;
    let chart: HTMLElement | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const measureTimeline = () => {
      if (disposed) return;

      const container = ganttContainerRef.current;
      chart = container?.querySelector<HTMLElement>(".wx-chart") ?? null;

      if (!chart) {
        animationFrame = window.requestAnimationFrame(measureTimeline);
        return;
      }

      setTimelineWidth(Math.max(chart.scrollWidth, chart.clientWidth));

      if (timelineScrollbarRef.current) {
        timelineScrollbarRef.current.scrollLeft = chart.scrollLeft;
      }
    };

    const syncScrollbar = () => {
      if (timelineScrollbarRef.current && chart) {
        timelineScrollbarRef.current.scrollLeft = chart.scrollLeft;
      }
    };

    const attachChartListener = () => {
      chart = ganttContainerRef.current?.querySelector<HTMLElement>(".wx-chart") ?? null;
      if (!chart) {
        animationFrame = window.requestAnimationFrame(attachChartListener);
        return;
      }

      chart.addEventListener("scroll", syncScrollbar, { passive: true });
      resizeObserver = new ResizeObserver(measureTimeline);
      resizeObserver.observe(chart);
      if (ganttContainerRef.current) resizeObserver.observe(ganttContainerRef.current);
      measureTimeline();
    };

    animationFrame = window.requestAnimationFrame(attachChartListener);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      chart?.removeEventListener("scroll", syncScrollbar);
      resizeObserver?.disconnect();
    };
  }, [dayWidth, projectEnd, tasks.length]);

  const ganttTasks = useMemo<ITask[]>(() => {
    return tasks.map((task) => {
      const range = getTaskRange(task, planStartDate);
      const duration = getDuration(range.start, range.end);

      return {
        id: task.id,
        text: task.title,
        details: `${task.description}\n\nالمخرج: ${task.deliverable}\n\nلماذا تهم: ${task.whyItMatters}`,
        phase: `الشهر ${task.month} · ${categoryLabels[task.category]}`,
        weekLabel: `الأسبوع ${task.week}`,
        statusLabel: task.completed ? "مكتملة" : "قيد التنفيذ",
        start: range.start,
        end: range.end,
        duration,
        durationLabel: `${duration} يوم`,
        progress: task.completed ? 100 : 0,
        type: "task",
      };
    });
  }, [planStartDate, tasks]);

  const visibleLinks = useMemo(() => {
    const taskIds = new Set<string | number>();
    tasks.forEach((task) => {
      taskIds.add(task.id);
      taskIds.add(String(task.id));
    });

    return links.filter(
      (link) =>
        taskIds.has(link.source) &&
        taskIds.has(link.target),
    );
  }, [links, tasks]);

  const scales = useMemo(
    () => [
      {
        unit: "month" as const,
        step: 1,
        format: (date: Date) => new Intl.DateTimeFormat("ar", { month: "long" }).format(date),
      },
      {
        unit: "day" as const,
        step: 1,
        format: (date: Date) => new Intl.DateTimeFormat("ar", { day: "numeric" }).format(date),
      },
    ],
    [],
  );

  const handleInit = (api: IApi) => {
    ganttApiRef.current = api;
    api.intercept("add-task", () => false);
    api.intercept("delete-task", () => false);
    api.intercept("copy-task", () => false);
    api.intercept("move-task", () => false);
    api.intercept("indent-task", () => false);
    api.intercept("show-editor", ({ id }: GanttShowEditorEvent) => {
      onTaskEdit(String(id));
      return false;
    });
    api.intercept("drag-task", (event) => {
      if (event && typeof event === "object" && "top" in event) return false;
    });
  };

  const handleUpdateTask = ({ id, task, inProgress }: GanttUpdateEvent) => {
    if (inProgress || typeof id !== "string") return;

    const start = asValidDate(task.start);
    const end = asValidDate(task.end);
    if (!start || !end || end <= start) return;

    onTaskDatesChange(id, start, end);
  };

  const handleAddLink = ({ id, link }: GanttLinkEvent) => {
    const normalizedLink = normalizeLinks([
      { ...link, id: getStableLinkId(link, id) },
    ])[0];
    if (!normalizedLink) return;

    onLinksChange([
      ...links.filter((currentLink) => !sameId(currentLink.id, normalizedLink.id)),
      normalizedLink,
    ]);
  };

  const handleUpdateLink = ({ id, link }: GanttLinkEvent) => {
    if (!isTaskId(id)) return;

    const currentLink = links.find((item) => sameId(item.id, id));
    const normalizedLink = normalizeLinks([{ ...currentLink, ...link, id }])[0];
    if (!normalizedLink) return;

    onLinksChange(links.map((item) => (sameId(item.id, id) ? normalizedLink : item)));
  };

  const removeLinkFromState = (id: string | number) => {
    onLinksChange(links.filter((link) => !sameId(link.id, id)));
    setSelectedLinkId((currentId) => (
      currentId !== null && sameId(currentId, id) ? null : currentId
    ));
  };

  const handleDeleteLink = ({ id }: GanttDeleteLinkEvent) => {
    removeLinkFromState(id);
  };

  const handleDeleteSelectedLink = () => {
    if (selectedLinkId === null) return;

    const linkId = selectedLinkId;
    removeLinkFromState(linkId);
    void ganttApiRef.current?.exec("delete-link", { id: linkId });
  };

  const handleGanttClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const linkElement = target.closest("[data-link-id]");
    if (!linkElement) {
      if (!target.closest(".wx-delete-button")) setSelectedLinkId(null);
      return;
    }

    const domLinkId = linkElement.getAttribute("data-link-id");
    if (!domLinkId) return;

    const decodedLinkId = domLinkId.startsWith(":") ? domLinkId.slice(1) : domLinkId;
    const selectedLink = links.find((link) => String(link.id) === decodedLinkId);
    if (selectedLink) setSelectedLinkId(selectedLink.id);
  };

  const handleHorizontalWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!event.shiftKey || event.deltaY === 0) return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    const chart = target.closest<HTMLElement>(".wx-chart");
    if (!chart || chart.scrollWidth <= chart.clientWidth) return;

    chart.scrollLeft += event.deltaY;
    event.preventDefault();
  };

  const handleTimelineScrollbar = (event: ReactUIEvent<HTMLDivElement>) => {
    const chart = ganttContainerRef.current?.querySelector<HTMLElement>(".wx-chart");
    if (chart) chart.scrollLeft = event.currentTarget.scrollLeft;
  };

  if (tasks.length === 0) {
    return (
      <div dir="ltr" className="flex min-h-[360px] flex-col items-center justify-center gap-3 rounded-2xl bg-card p-8 text-center text-muted-foreground shadow-xs">
        <CalendarDays className="size-10 text-primary/70" />
        <p className="text-sm font-semibold">لا توجد مهام لعرضها في مخطط جانت.</p>
        <p className="text-xs">أضف مهمة جديدة من تبويب إدارة المهام لتظهر هنا.</p>
      </div>
    );
  }

  return (
    <section
      className="space-y-4"
      dir="ltr"
      style={{ direction: "ltr", textAlign: "left" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-card px-4 py-3 text-left shadow-xs">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Info className="size-4 text-primary" />
          <span>انقر مرتين على اسم المهمة لفتح نافذة التعديل.</span>
          <span>استخدم شريط التمرير السفلي أو Shift مع عجلة الماوس للتنقل أفقياً، وحدد خط الوصلة ثم استخدم زر «حذف الوصلة».</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="xs"
            variant="ghost"
            onClick={handleDeleteSelectedLink}
            disabled={selectedLinkId === null}
            className="gap-1.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
            title="حدد خط الوصلة ثم احذفه"
            aria-label="حذف الوصلة المحددة"
          >
            <Trash2 className="size-3.5" />
            حذف الوصلة
          </Button>
          <span className="text-xs font-semibold text-muted-foreground">عرض يومي</span>
          <div className="flex items-center gap-1 rounded-lg bg-muted/50 p-1" aria-label="أدوات تكبير المخطط">
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              onClick={() => setDayWidth((current) => Math.max(MIN_DAY_WIDTH, current - 6))}
              disabled={dayWidth === MIN_DAY_WIDTH}
              title="ضغط العرض الزمني"
              aria-label="ضغط العرض الزمني"
            >
              <ZoomOut className="size-3.5" />
            </Button>
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              onClick={() => setDayWidth(DEFAULT_DAY_WIDTH)}
              title="إعادة العرض الافتراضي"
              aria-label="إعادة العرض الافتراضي"
            >
              <RotateCcw className="size-3.5" />
            </Button>
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              onClick={() => setDayWidth((current) => Math.min(MAX_DAY_WIDTH, current + 6))}
              disabled={dayWidth === MAX_DAY_WIDTH}
              title="توسيع العرض الزمني"
              aria-label="توسيع العرض الزمني"
            >
              <ZoomIn className="size-3.5" />
            </Button>
          </div>
          <span className="text-xs font-semibold text-foreground">{tasks.length} مهمة · تحرير زمني مباشر</span>
        </div>
      </div>

      <div
        ref={ganttContainerRef}
        className="first-90-days-gantt h-[min(680px,75vh)] min-h-[520px] w-full overflow-hidden rounded-2xl bg-card shadow-xs"
        dir="ltr"
        style={{ direction: "ltr", textAlign: "left" }}
        onClickCapture={handleGanttClickCapture}
        onWheelCapture={handleHorizontalWheel}
      >
        <Willow fonts={false}>
          <Gantt
            tasks={ganttTasks}
            readonly={false}
            columns={columns}
            scales={scales}
            start={planStartDate}
            end={projectEnd}
            lengthUnit="day"
            zoom={false}
            autoScale={false}
            cellWidth={dayWidth}
            cellHeight={44}
            scaleHeight={36}
            init={handleInit}
            onUpdateTask={handleUpdateTask}
            links={visibleLinks}
            onAddLink={handleAddLink}
            onUpdateLink={handleUpdateLink}
            onDeleteLink={handleDeleteLink}
          />
        </Willow>
      </div>

      <div
        ref={timelineScrollbarRef}
        className="first-90-days-gantt-scrollbar w-full overflow-x-auto overflow-y-hidden rounded-full bg-muted"
        onScroll={handleTimelineScrollbar}
        aria-label="التمرير الأفقي للمخطط الزمني"
        role="region"
        tabIndex={0}
      >
        <div style={{ width: `${timelineWidth}px`, minWidth: "100%", height: 1 }} />
      </div>
    </section>
  );
};
