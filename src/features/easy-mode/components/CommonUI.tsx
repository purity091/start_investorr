
import React from 'react';
import { THEME } from '../constants';
import * as Lucide from 'lucide-react';

// --- Glass Card (Tailwind Mixed) ---
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", glow = false }) => (
  <div className={`
    bg-white border border-slate-100 rounded-[2rem] p-6 relative overflow-hidden transition-all duration-300
    ${glow ? 'shadow-2xl shadow-indigo-100/50' : 'shadow-sm hover:shadow-md'}
    ${className}
  `}>
    {children}
  </div>
);

// --- Badge (Premium Level) ---
interface BadgeProps {
  children: React.ReactNode;
  type?: 'default' | 'green' | 'red' | 'amber' | 'gold' | 'blue' | 'purple';
}

export const Badge: React.FC<BadgeProps> = ({ children, type = "default" }) => {
  const themes = {
    default: "bg-slate-100 text-slate-500 border-slate-200",
    green: "bg-emerald-50 text-emerald-600 border-emerald-100",
    red: "bg-rose-50 text-rose-600 border-rose-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    gold: "bg-amber-100 text-amber-700 border-amber-200",
    purple: "bg-indigo-50 text-indigo-600 border-indigo-100",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${themes[type]}`}>
      {children}
    </span>
  );
};

// --- Step Wizard (NEW ICONIC VERSION) ---
interface StepWizardProps {
  steps: { icon: string; id: string }[];
  current: number;
}

export const ProgressDots: React.FC<StepWizardProps> = ({ steps, current }) => (
  <div className="flex items-center gap-1.5" dir="rtl">
    {steps.map((s, i) => {
      const isCompleted = i < current;
      const isActive = i === current;
      const IconComp = (Lucide as any)[s.icon] || Lucide.Circle;

      return (
        <React.Fragment key={s.id}>
          {/* Step Bubble */}
          <div className="relative group">
            <div className={`
              w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-500 relative z-10
              ${isCompleted ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100 rotate-[360deg]' : 
                isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 animate-in zoom-in-75' : 
                'bg-slate-50 text-slate-300 border border-slate-100'}
            `}>
              {isCompleted ? <Lucide.Check size={14} strokeWidth={4} /> : <IconComp size={isActive ? 14 : 12} strokeWidth={isActive ? 2.5 : 2} />}
              
              {/* Active Pulse Glow */}
              {isActive && (
                <div className="absolute inset-0 rounded-lg bg-indigo-500 animate-ping opacity-20 -z-10"></div>
              )}
            </div>
            
            {/* Tooltip hint on hover (Hidden by default, shown for UX density) */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[8px] font-black text-slate-400 uppercase tracking-tighter">
               STEP {i+1}
            </div>
          </div>

          {/* Connector Line */}
          {i < steps.length - 1 && (
            <div className={`h-[2px] w-3 rounded-full transition-all duration-700 ${isCompleted ? 'bg-emerald-500' : 'bg-slate-100'}`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);
