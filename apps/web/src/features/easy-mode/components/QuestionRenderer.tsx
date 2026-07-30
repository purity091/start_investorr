import React from 'react';
import * as Lucide from 'lucide-react';

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
      boxShadow: `0 10px 25px ${themeColor}22`,
      transform: 'scale(1.01)',
    };
  }

  return {
    background: '#ffffff',
    color: '#0f172a',
    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
  };
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
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2.5">
        {question.options?.map((opt: any) => {
          const val = opt.val || opt.id;
          const active = isMulti ? currentSelection?.includes(val) : selected === val;
          const styles = getDynamicStyles(active, themeColor);

          return (
            <button
              key={val}
              onClick={() => handleToggle(val)}
              style={styles}
              className="group relative flex max-w-full min-w-[130px] flex-1 flex-col items-start rounded-2xl p-3 text-right transition-all duration-300 sm:min-w-[140px] sm:max-w-[180px]"
            >
              <div
                style={{
                  background: active ? 'rgba(255,255,255,0.18)' : 'rgba(15,23,42,0.04)',
                  color: active ? '#fff' : themeColor,
                }}
                className={`mb-2 flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-300 ${active ? '' : 'group-hover:scale-105'}`}
              >
                <LucideIcon name={opt.icon || question.icon || 'Box'} size={16} />
              </div>

              <div className="w-full pr-1 text-right">
                <div
                  style={{ color: active ? '#fff' : '#0f172a' }}
                  className="mb-0.5 text-[12px] font-black tracking-tight"
                >
                  {opt.title || opt.label}
                </div>
                <div
                  style={{ color: active ? 'rgba(255,255,255,0.75)' : 'rgba(15,23,42,0.55)' }}
                  className="text-[9px] font-bold leading-relaxed"
                >
                  {opt.desc}
                </div>
              </div>

              {active ? (
                <div className="absolute left-2.5 top-2.5">
                  <Lucide.CheckCircle2 size={12} />
                </div>
              ) : null}
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
  themeColor,
}) => {
  const current = tempAnswer || {};
  const icons = ['Eye', 'Ear', 'Brain', 'AlertTriangle'];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {question.options?.map((opt: any, i: number) => (
          <div
            key={opt.val}
            className={`rounded-[1.2rem] p-4 transition-all duration-300 ${
              current[opt.val] ? 'bg-white shadow-sm' : 'bg-slate-50/70 shadow-inner'
            }`}
          >
            <div className="mb-3 flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-xl"
                style={{ background: `${themeColor || '#6366f1'}15`, color: themeColor }}
              >
                <LucideIcon name={icons[i]} size={16} />
              </div>
              <span className="text-[10px] font-black text-slate-900 tracking-tight">{opt.label}</span>
            </div>

            <textarea
              placeholder="صف ملاحظتك والتحليل هنا..."
              value={current[opt.val] || ''}
              onChange={(e) => setTempAnswer({ ...current, [opt.val]: e.target.value })}
              className="h-20 w-full resize-none rounded-xl bg-white p-3 text-[10px] font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
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
  themeColor,
}) => {
  const [focused, setFocused] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className={`relative transition-all duration-300 ${focused ? 'scale-[1.005]' : 'scale-100'}`}>
        <textarea
          placeholder={question.placeholder}
          value={tempAnswer?.text || ''}
          onChange={(e) => setTempAnswer({ ...tempAnswer, text: e.target.value })}
          rows={4}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="relative w-full resize-none rounded-[1.5rem] bg-white p-4 text-[13px] font-bold leading-relaxed text-slate-900 shadow-sm transition-all focus:outline-none md:text-base"
          style={{
            boxShadow: focused
              ? `0 0 0 2px ${themeColor}20, 0 12px 30px rgba(15, 23, 42, 0.06)`
              : '0 1px 3px rgba(15, 23, 42, 0.08)',
          }}
        />
      </div>

      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
        {question.options?.map((opt: any) => {
          const active = (tempAnswer || {}).type === opt.val;

          return (
            <button
              key={opt.val}
              onClick={() => setTempAnswer({ ...(tempAnswer || {}), type: active ? null : opt.val })}
              style={{
                background: active ? themeColor : '#fff',
                color: active ? '#fff' : '#0f172a',
                boxShadow: active
                  ? `0 10px 25px ${themeColor}22`
                  : '0 1px 3px rgba(15, 23, 42, 0.08)',
              }}
              className="flex items-center justify-between rounded-xl p-3.5 transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-xl transition-all group-hover:scale-105"
                  style={{
                    background: active ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.04)',
                    color: active ? '#fff' : themeColor,
                  }}
                >
                  <LucideIcon name={opt.icon || 'Target'} size={16} />
                </div>
                <span className="text-[10px] font-black tracking-tight">{opt.label}</span>
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
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="rounded-2xl bg-white p-3 shadow-sm">
          <div className="mb-2 flex items-center gap-2 opacity-60">
            {item.icon ? <LucideIcon name={item.icon} size={13} /> : null}
            <div className="text-[9px] font-black uppercase tracking-tighter text-slate-400">{item.label}</div>
          </div>

          <div className="flex flex-wrap gap-2">
            {item.options.map((opt: string) => {
              const active = (tempAnswer || {})[item.id] === opt;

              return (
                <button
                  key={opt}
                  onClick={() => setTempAnswer({ ...(tempAnswer || {}), [item.id]: active ? null : opt })}
                  style={{
                    background: active ? '#0f172a' : '#fff',
                    color: active ? '#fff' : '#64748b',
                    boxShadow: active
                      ? '0 8px 20px rgba(15,23,42,0.16)'
                      : '0 1px 2px rgba(15,23,42,0.06)',
                  }}
                  className="rounded-xl px-3.5 py-2 text-[10px] font-black transition-all"
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
  themeColor,
}) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {question.options?.map((opt: any) => {
        const active = (tempAnswer || {}).competition === opt.val;

        return (
          <button
            key={opt.val}
            onClick={() =>
              setTempAnswer({ ...(tempAnswer || {}), competition: active ? null : opt.val })
            }
            style={{
              background: active ? themeColor : '#fff',
              color: active ? '#fff' : '#0f172a',
              boxShadow: active
                ? `0 10px 25px ${themeColor}22`
                : '0 1px 3px rgba(15, 23, 42, 0.08)',
            }}
            className="flex flex-col items-start rounded-[1.3rem] p-4 text-right transition-all duration-300"
          >
            <div
              className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${
                active ? 'bg-white/20' : 'bg-slate-50 text-slate-400'
              }`}
            >
              <LucideIcon name={opt.icon || 'Layers'} size={18} />
            </div>
            <div className="mb-1 text-xs font-black tracking-tight">{opt.title}</div>
            <div className={`text-[9px] font-bold ${active ? 'text-indigo-100' : 'text-slate-400'}`}>
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
  themeColor = '#6366f1',
}) => (
  <div className="space-y-2.5">
    {question.options?.map((opt: any) => {
      const active = selected === opt.val;

      return (
        <button
          key={opt.val}
          onClick={() => onSelect(active ? null : opt.val)}
          className="group flex w-full items-center gap-4 rounded-[1.3rem] p-4 transition-all duration-300"
          style={{
            background: active ? themeColor : '#fff',
            color: active ? '#fff' : '#0f172a',
            boxShadow: active
              ? `0 8px 20px ${themeColor}20`
              : '0 1px 3px rgba(15, 23, 42, 0.08)',
          }}
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-2xl"
            style={{
              background: active ? 'rgba(255,255,255,0.2)' : `${themeColor}10`,
              color: active ? '#fff' : themeColor,
            }}
          >
            <LucideIcon name={opt.icon || 'Check'} size={20} />
          </div>

          <div className="flex-1 text-right">
            <div className="mb-0.5 text-[13px] font-black tracking-tight">{opt.title}</div>
            <div
              className="text-[9px] font-bold leading-relaxed"
              style={{ color: active ? 'rgba(255,255,255,0.75)' : '#94a3b8' }}
            >
              {opt.desc}
            </div>
          </div>

          <div className="flex gap-1" dir="rtl">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full transition-all duration-500 ${
                  i < (opt.score || 0) ? 'scale-125' : ''
                }`}
                style={{
                  background:
                    i < (opt.score || 0)
                      ? active
                        ? '#fff'
                        : '#10b981'
                      : active
                        ? 'rgba(255,255,255,0.25)'
                        : '#e2e8f0',
                }}
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
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {question.options?.map((opt: any) => {
          const active = selectedList.includes(opt.val);

          return (
            <button
              key={opt.val}
              onClick={() => {
                if (active) {
                  setTempAnswer(selectedList.filter((v: any) => v !== opt.val));
                  return;
                }
                setTempAnswer([...selectedList, opt.val]);
              }}
              style={{
                background: active ? '#fff1f2' : '#fff',
                color: active ? '#e11d48' : '#0f172a',
                boxShadow: active
                  ? '0 8px 20px rgba(244,63,94,0.14)'
                  : '0 1px 3px rgba(15, 23, 42, 0.08)',
              }}
              className="flex items-center gap-3.5 rounded-xl p-4 transition-all duration-300"
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  active ? 'bg-rose-500 text-white shadow-lg shadow-rose-100' : 'bg-slate-50 text-slate-400'
                }`}
              >
                <LucideIcon name={opt.icon || 'AlertTriangle'} size={18} />
              </div>
              <span className="text-[11px] font-black tracking-tight">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
