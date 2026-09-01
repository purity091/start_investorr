export type PlanMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const PLAN_MONTHS: PlanMonth[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export interface TaskItem {
  id: string;
  month: PlanMonth;
  week: number;
  title: string;
  description: string;
  deliverable: string;
  whyItMatters: string;
  category: 'validation' | 'product' | 'marketing' | 'operations';
  completed: boolean;
  /** Stored as a local calendar date (YYYY-MM-DD) for stable localStorage values. */
  startDate?: string;
  endDate?: string;
}

export const PLAN_START_STORAGE_KEY = 'first_90_days_start_date';

const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_TASK_DURATION_DAYS = 12;
const LEGACY_TASK_DURATION_DAYS = 7;

export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const startOfToday = () => {
  const result = new Date();
  result.setHours(0, 0, 0, 0);
  return result;
};

export const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const fromDateKey = (value?: string) => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  const result = new Date(year, month - 1, day);
  if (
    result.getFullYear() !== year ||
    result.getMonth() !== month - 1 ||
    result.getDate() !== day
  ) {
    return null;
  }
  result.setHours(0, 0, 0, 0);
  return result;
};

export const getPlanStartDate = () => {
  if (typeof window !== 'undefined') {
    const saved = fromDateKey(window.localStorage.getItem(PLAN_START_STORAGE_KEY) ?? undefined);
    if (saved) return saved;
  }
  return startOfToday();
};

export const getGlobalWeek = (task: Pick<TaskItem, 'month' | 'week'>) => {
  const safeWeek = Number.isFinite(task.week) ? Math.max(1, Math.floor(task.week)) : 1;
  const weekInMonth = ((safeWeek - 1) % 4) + 1;
  return (task.month - 1) * 4 + weekInMonth;
};

export const getDefaultTaskDates = (
  task: Pick<TaskItem, 'month' | 'week'>,
  planStartDate: Date,
) => {
  const start = addDays(planStartDate, (getGlobalWeek(task) - 1) * 7);
  return {
    startDate: toDateKey(start),
    endDate: toDateKey(addDays(start, DEFAULT_TASK_DURATION_DAYS)),
  };
};

const hasLegacyGeneratedDates = (
  task: Pick<TaskItem, 'month' | 'week' | 'startDate' | 'endDate'>,
  planStartDate: Date,
) => {
  const start = fromDateKey(task.startDate);
  const end = fromDateKey(task.endDate);
  if (!start || !end || end <= start) return false;

  const legacyStart = addDays(planStartDate, (getGlobalWeek(task) - 1) * 7);
  const legacyEnd = addDays(legacyStart, LEGACY_TASK_DURATION_DAYS);
  return toDateKey(start) === toDateKey(legacyStart) && toDateKey(end) === toDateKey(legacyEnd);
};

export const normalizeTask = (task: TaskItem, planStartDate: Date): TaskItem => {
  const start = fromDateKey(task.startDate);
  const end = fromDateKey(task.endDate);
  if (start && end && end > start && !hasLegacyGeneratedDates(task, planStartDate)) {
    return {
      ...task,
      startDate: toDateKey(start),
      endDate: toDateKey(end),
    };
  }

  return {
    ...task,
    ...getDefaultTaskDates(task, planStartDate),
  };
};

export const normalizeTasks = (tasks: TaskItem[], planStartDate: Date) =>
  tasks.map((task) => normalizeTask(task, planStartDate));

export const getScheduleMeta = (startDate: Date, planStartDate: Date) => {
  const elapsedDays = Math.max(
    0,
    Math.round((startDate.getTime() - planStartDate.getTime()) / DAY_MS),
  );

  return {
    month: Math.min(12, Math.max(1, Math.floor(elapsedDays / 30) + 1)) as PlanMonth,
    week: Math.max(1, Math.floor(elapsedDays / 7) + 1),
  };
};
