import React, { useState } from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CollapsibleContainerProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string | number;
}

export const CollapsibleContainer: React.FC<CollapsibleContainerProps> = ({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
  badge,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        'ui-card mb-6 overflow-hidden rounded-[24px] transition-all duration-300',
        isOpen ? 'border-slate-300 shadow-[0_16px_40px_rgba(15,23,42,0.08)]' : 'hover:border-slate-300',
      )}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center justify-between bg-white p-6 select-none"
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'rounded-2xl p-3 transition-colors duration-200',
              isOpen ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-500',
            )}
          >
            <Icon size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className={cn('text-lg font-black transition-colors', isOpen ? 'text-slate-950' : 'text-slate-600')}>
              {title}
            </h2>
            {!isOpen && badge && (
              <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                {badge}
              </span>
            )}
          </div>
        </div>

        <div className={cn('rounded-xl p-2 transition-all duration-200', isOpen ? 'rotate-180 bg-slate-100 text-slate-900' : 'text-slate-300')}>
          <ChevronDown size={20} strokeWidth={3} />
        </div>
      </div>

      <div
        className={cn(
          'transition-all duration-500 ease-in-out',
          isOpen ? 'max-h-[2000px] px-8 pb-8 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="mb-8 h-px bg-gradient-to-l from-transparent via-slate-200 to-transparent"></div>
        {children}
      </div>
    </div>
  );
};
