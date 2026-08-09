import React from 'react';
import * as Lucide from 'lucide-react';
import { cn } from '@/lib/utils';

interface RendererProps {
  question: any;
  onSelect: (val: any) => void;
  selected: any;
  tempAnswer: any;
  setTempAnswer: (val: any) => void;
  themeColor?: string;
}

const LucideIcon: React.FC<{ name: string; size?: number; className?: string }> = ({
  name,
  size = 20,
  className = '',
}) => {
  const IconComponent = (Lucide as any)[name] || Lucide.HelpCircle;
  return <IconComponent size={size} className={className} strokeWidth={2.25} />;
};

const getDynamicStyles = (active: boolean, themeColor: string) => {
  if (active) {
    return {
      background: themeColor,
      color: '#fff',
      boxShadow: `0 4px 12px ${themeColor}20`,
    };
  }

  return {};
};

export const QuestionCards: React.FC<RendererProps> = ({
  question,
  onSelect,
  selected,
  tempAnswer,
  setTempAnswer,
  themeColor = '#6366f1',
}) => {
  const isMulti = question.multi;
  const currentSelection = isMulti ? tempAnswer || [] : selected;

  const handleToggle = (val: string) => {
    if (isMulti) {
      if (currentSelection?.includes(val)) {
        setTempAnswer(currentSelection.filter((v: string) => v !== val));
      } else {
        setTempAnswer([...(currentSelection || []), val]);
      }
      return;
    }

    if (selected === val) {
      onSelect(null);
      return;
    }

    onSelect(val);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {question.options?.map((opt: any) => {
          const val = opt.val || opt.id;
          const active = isMulti ? currentSelection?.includes(val) : selected === val;

          return (
            <button
              key={val}
              type="button"
              onClick={() => handleToggle(val)}
              className={cn(
                "group relative flex flex-col items-start rounded-xl p-2.5 sm:p-3 text-right transition-all border cursor-pointer",
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-xs font-bold"
                  : "bg-card border-border text-card-foreground hover:bg-accent/60 hover:border-border"
              )}
            >
              <div
                className={cn(
                  "mb-1.5 flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                  active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-foreground/80"
                )}
              >
                <LucideIcon name={opt.icon || question.icon || 'Box'} size={15} />
              </div>

              <div className="w-full text-right space-y-0.5">
                <div className="text-xs font-bold tracking-tight">
                  {opt.title || opt.label}
                </div>
                {opt.desc && (
                  <div className={cn("text-[11px] leading-tight font-medium line-clamp-2", active ? "text-primary-foreground/85" : "text-muted-foreground")}>
                    {opt.desc}
                  </div>
                )}
              </div>

              {active && (
                <div className="absolute left-2 top-2 flex items-center justify-center size-4 rounded-full bg-primary-foreground/20 text-primary-foreground">
                  <Lucide.Check size={11} strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const EmpathyMapRenderer: React.FC<RendererProps> = ({
  question,
  tempAnswer,
  setTempAnswer,
}) => {
  const current = tempAnswer || {};
  const icons = ['Eye', 'AlertTriangle', 'Volume2', 'TrendingDown'];

  const placeholders: Record<string, string> = {
    status: "مثال: يرى المنافسين ينشئون منصات ذكية ويكسبون حصة سوقية أكبر...",
    fear: "مثال: يخشى من تعثر السيولة النقدية وعدم قدرته على تغطية الرواتب والإيجارات...",
    efficiency: "مثال: يسمع توصيات المستشارين بضرورة أتمتة المبيعات والحلول التقنية...",
    pains: "مثال: يعاني من ارتفاع تكلفة الاستحواذ على العملاء الجدد وتأخر التحصيل...",
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
        {question.options?.map((opt: any, i: number) => (
          <div
            key={opt.val}
            className={cn(
              "rounded-xl p-3 transition-all border",
              current[opt.val] ? 'bg-card border-primary/40 shadow-2xs' : 'bg-card border-border/80'
            )}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <LucideIcon name={icons[i]} size={14} />
                </div>
                <span className="text-xs font-bold text-foreground tracking-tight">{opt.label}</span>
              </div>
            </div>

            <textarea
              placeholder={placeholders[opt.val] || "اكتب التحليل والملاحظة هنا..."}
              value={current[opt.val] || ''}
              onChange={(e) => setTempAnswer({ ...current, [opt.val]: e.target.value })}
              className="h-18 w-full resize-none rounded-lg bg-background border border-input p-2.5 text-xs font-medium text-foreground transition-all placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const QuestionTextAreaChoice: React.FC<RendererProps> = ({
  question,
  tempAnswer,
  setTempAnswer,
}) => {
  const [focused, setFocused] = React.useState(false);
  const defaultPlaceholder = "مثال تطبيقي: تعاني المتاجر المحلية من صعوبة تتبع التكاليف غير المباشرة يدوياً، مما يؤدي إلى انخفاض هامش الربح بقدر 20%...";

  return (
    <div className="space-y-3">
      <div className={`relative transition-all duration-300 ${focused ? 'scale-[1.001]' : 'scale-100'}`}>
        <textarea
          placeholder={question.placeholder || defaultPlaceholder}
          value={tempAnswer?.text || ''}
          onChange={(e) => setTempAnswer({ ...tempAnswer, text: e.target.value })}
          rows={3}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="relative w-full resize-none rounded-xl bg-card border border-input p-3 text-xs sm:text-sm font-medium leading-relaxed text-foreground shadow-2xs transition-all focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground/60"
        />
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground px-1 font-medium">
          <Lucide.Lightbulb className="size-3.5 text-amber-500 shrink-0" />
          <span>تلميح: كلما كانت إجابتك محددة بمثال رقمي أو واقعي، كانت دراسة الجدوى المولدة أكثر دقة.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {question.options?.map((opt: any) => {
          const active = (tempAnswer || {}).type === opt.val;

          return (
            <button
              key={opt.val}
              type="button"
              onClick={() => setTempAnswer({ ...(tempAnswer || {}), type: active ? null : opt.val })}
              className={cn(
                "flex items-center justify-between rounded-xl p-2.5 transition-all text-right border cursor-pointer",
                active 
                  ? "bg-primary text-primary-foreground border-primary shadow-xs font-bold"
                  : "bg-card border-border text-foreground hover:bg-accent/60"
              )}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                    active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-foreground/80"
                  )}
                >
                  <LucideIcon name={opt.icon || 'Target'} size={15} />
                </div>
                <span className="text-xs font-bold tracking-tight">{opt.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const MultiSelectionRenderer: React.FC<
  RendererProps & { items: any[]; fieldPrefix: string }
> = ({ items, tempAnswer, setTempAnswer }) => {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="rounded-xl bg-card border border-border p-3 shadow-2xs">
          <div className="mb-2 flex items-center gap-2 opacity-70">
            {item.icon ? <LucideIcon name={item.icon} size={13} /> : null}
            <div className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">{item.label}</div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {item.options.map((opt: string) => {
              const active = (tempAnswer || {})[item.id] === opt;

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setTempAnswer({ ...(tempAnswer || {}), [item.id]: active ? null : opt })}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-medium transition-all border cursor-pointer",
                    active
                      ? "bg-primary text-primary-foreground border-primary font-bold shadow-2xs"
                      : "bg-background text-foreground border-border hover:bg-accent/50"
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export const CompetitionMap: React.FC<RendererProps> = ({
  question,
  tempAnswer,
  setTempAnswer,
}) => (
  <div className="space-y-3">
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {question.options?.map((opt: any) => {
        const active = (tempAnswer || {}).competition === opt.val;

        return (
          <button
            key={opt.val}
            type="button"
            onClick={() =>
              setTempAnswer({ ...(tempAnswer || {}), competition: active ? null : opt.val })
            }
            className={cn(
              "flex flex-col items-start rounded-xl p-3 text-right transition-all border cursor-pointer",
              active
                ? "bg-primary text-primary-foreground border-primary shadow-xs font-bold"
                : "bg-card border-border text-foreground hover:bg-accent/60"
            )}
          >
            <div
              className={cn(
                "mb-2 flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
              )}
            >
              <LucideIcon name={opt.icon || 'Layers'} size={15} />
            </div>
            <div className="mb-0.5 text-xs font-bold tracking-tight">{opt.title}</div>
            <div className={cn("text-[11px] font-medium leading-tight", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
              {opt.desc}
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

export const ValidationScale: React.FC<RendererProps> = ({
  question,
  onSelect,
  selected,
}) => (
  <div className="space-y-2">
    {question.options?.map((opt: any) => {
      const active = selected === opt.val;

      return (
        <button
          key={opt.val}
          type="button"
          onClick={() => onSelect(active ? null : opt.val)}
          className={cn(
            "group flex w-full items-center gap-3 rounded-xl p-3 transition-all border cursor-pointer text-right",
            active
              ? "bg-primary text-primary-foreground border-primary shadow-xs font-bold"
              : "bg-card border-border text-foreground hover:bg-accent/60"
          )}
        >
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors shrink-0",
              active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-primary"
            )}
          >
            <LucideIcon name={opt.icon || 'Check'} size={16} />
          </div>

          <div className="flex-1 text-right">
            <div className="text-xs font-bold tracking-tight">{opt.title}</div>
            <div
              className={cn("text-[11px] font-medium leading-tight", active ? "text-primary-foreground/80" : "text-muted-foreground")}
            >
              {opt.desc}
            </div>
          </div>

          <div className="flex gap-1 shrink-0" dir="rtl">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  i < (opt.score || 0)
                    ? active ? "bg-primary-foreground" : "bg-emerald-500"
                    : active ? "bg-primary-foreground/30" : "bg-muted-foreground/30"
                )}
              />
            ))}
          </div>
        </button>
      );
    })}
  </div>
);

export const FearSelect: React.FC<RendererProps> = ({ question, tempAnswer, setTempAnswer }) => {
  const selectedList = tempAnswer || [];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {question.options?.map((opt: any) => {
          const active = selectedList.includes(opt.val);

          return (
            <button
              key={opt.val}
              type="button"
              onClick={() => {
                if (active) {
                  setTempAnswer(selectedList.filter((v: any) => v !== opt.val));
                  return;
                }
                setTempAnswer([...selectedList, opt.val]);
              }}
              className={cn(
                "flex items-center gap-3 rounded-xl p-3 transition-all border cursor-pointer text-right",
                active
                  ? "bg-destructive/10 text-destructive border-destructive/40 font-bold shadow-2xs"
                  : "bg-card border-border text-foreground hover:bg-accent/60"
              )}
            >
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg transition-colors shrink-0",
                  active ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                <LucideIcon name={opt.icon || 'AlertTriangle'} size={15} />
              </div>
              <span className="text-xs font-bold tracking-tight">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
