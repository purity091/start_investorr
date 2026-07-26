import React from 'react';
import { AlertTriangle, CheckCircle2, FolderOpen, SearchX, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';

type PageStateTone = 'default' | 'success' | 'error' | 'info';

interface PageStateCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondaryAction?: () => void;
  tone?: PageStateTone;
}

const toneClasses: Record<PageStateTone, string> = {
  default: 'bg-slate-50 text-slate-700',
  success: 'bg-emerald-50 text-emerald-700',
  error: 'bg-rose-50 text-rose-700',
  info: 'bg-blue-50 text-blue-700',
};

export const PageStateCard: React.FC<PageStateCardProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondaryAction,
  tone = 'default',
}) => (
  <Card className="surface-card p-6 sm:p-7">
    <div className="flex flex-col items-center justify-center text-center">
      <div className={`flex h-16 w-16 items-center justify-center rounded-[1.75rem] ${toneClasses[tone]}`}>
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-black text-slate-950">{title}</h3>
      <p className="mt-3 max-w-2xl text-sm font-bold leading-8 text-slate-600">{description}</p>
      {(actionLabel || secondaryLabel) ? (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {actionLabel ? (
            <Button onClick={onAction} size="lg">
              {actionLabel}
            </Button>
          ) : null}
          {secondaryLabel ? (
            <Button onClick={onSecondaryAction} variant="outline" size="lg">
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  </Card>
);

export const FirstUseState: React.FC<{
  title?: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
}> = ({ title = 'ابدأ أول مشروع لك', description, actionLabel, onAction }) => (
  <PageStateCard
    icon={<Sparkles size={28} />}
    title={title}
    description={description}
    actionLabel={actionLabel}
    onAction={onAction}
    tone="info"
  />
);

export const EmptyState: React.FC<{
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}> = ({ title, description, actionLabel, onAction }) => (
  <PageStateCard
    icon={<FolderOpen size={28} />}
    title={title}
    description={description}
    actionLabel={actionLabel}
    onAction={onAction}
  />
);

export const NoResultsState: React.FC<{
  description: string;
  resetLabel?: string;
  onReset?: () => void;
}> = ({ description, resetLabel = 'إعادة ضبط البحث', onReset }) => (
  <PageStateCard
    icon={<SearchX size={28} />}
    title="لا توجد نتائج مطابقة"
    description={description}
    actionLabel={resetLabel}
    onAction={onReset}
    tone="default"
  />
);

export const ErrorState: React.FC<{
  title?: string;
  description: string;
  retryLabel?: string;
  onRetry?: () => void;
}> = ({ title = 'تعذر تحميل المحتوى', description, retryLabel = 'إعادة المحاولة', onRetry }) => (
  <PageStateCard
    icon={<AlertTriangle size={28} />}
    title={title}
    description={description}
    actionLabel={retryLabel}
    onAction={onRetry}
    tone="error"
  />
);

export const InlineStatusBanner: React.FC<{
  tone?: PageStateTone;
  title: string;
  description: string;
}> = ({ tone = 'success', title, description }) => (
  <div className={`ui-status-banner rounded-[1.5rem] border px-4 py-4 text-right ${toneClasses[tone]}`}>
    <div className="flex items-start gap-3">
      <div className="mt-0.5">
        {tone === 'success' ? <CheckCircle2 size={18} /> : tone === 'error' ? <AlertTriangle size={18} /> : <Sparkles size={18} />}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-black">{title}</p>
        <p className="mt-1 text-xs font-bold leading-7 opacity-90">{description}</p>
      </div>
    </div>
  </div>
);

export const PageSectionSkeleton: React.FC<{
  blocks?: number;
  compact?: boolean;
}> = ({ blocks = 3, compact = false }) => (
  <Card className="surface-card p-5 sm:p-6">
    <div className="space-y-4">
      <div className="ui-skeleton h-5 w-40 rounded-full" />
      <div className="ui-skeleton h-4 w-64 rounded-full" />
      <div className={`grid gap-4 ${compact ? 'sm:grid-cols-2 xl:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-4'}`}>
        {Array.from({ length: blocks }).map((_, index) => (
          <div key={index} className="rounded-[1.5rem] border border-slate-100 p-4">
            <div className="ui-skeleton h-4 w-24 rounded-full" />
            <div className="ui-skeleton mt-4 h-7 w-20 rounded-full" />
            <div className="ui-skeleton mt-4 h-24 w-full rounded-[1rem]" />
          </div>
        ))}
      </div>
    </div>
  </Card>
);
