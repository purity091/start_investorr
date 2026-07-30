import React from 'react';
import { AlertTriangle, CalendarRange, CheckCircle2, Siren, Target } from 'lucide-react';
import { ExecutionKPI, ExecutionMilestone, PriorityAlert } from '../types';

interface ExecutionCommandCenterProps {
  unlocked: boolean;
  milestones: ExecutionMilestone[];
  kpis: ExecutionKPI[];
  alerts: PriorityAlert[];
}

export const ExecutionCommandCenter: React.FC<ExecutionCommandCenterProps> = ({ unlocked, milestones, kpis, alerts }) => {
  if (!unlocked) {
    return (
      <section className="glass-panel rounded-[2.5rem] p-4 sm:p-8">
        <p className="text-xs font-black uppercase tracking-widest text-slate-500">Execution Command Center</p>
        <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">لوحة تنفيذ 100 يوم</h3>
        <p className="mt-3 text-sm font-semibold text-slate-400">يتم فتح اللوحة تلقائيا بعد إكمال مهام اليوم الثالث، ثم تتحول الخطة إلى milestones أسبوعية قابلة للمتابعة.</p>
      </section>
    );
  }

  const statusClass: Record<ExecutionMilestone['status'], string> = {
    focus: 'text-blue-300 bg-blue-500/10 border-blue-400/30',
    stable: 'text-lime-300 bg-lime-500/10 border-lime-400/30',
    'at-risk': 'text-amber-300 bg-amber-500/10 border-amber-400/30',
  };

  return (
    <section className="bg-white border border-slate-200 shadow-sm rounded-[2.5rem] p-6 sm:p-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Execution Command Center</p>
          <h3 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">لوحة تشغيل أول 100 يوم</h3>
        </div>
        <span className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-2.5 text-xs font-black text-emerald-600 shadow-sm shadow-emerald-50">Mission Operating Mode</span>
      </div>

      <div className="mb-8 grid gap-4 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:bg-white hover:shadow-sm transition-all">
            <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
              <Target size={16} className="text-indigo-500" />
              {kpi.label}
            </p>
            <p className="text-2xl font-black text-slate-900 sm:text-3xl leading-none">{kpi.current}</p>
            <p className="mt-2 text-xs font-bold text-slate-400">Target: <span className="text-indigo-600">{kpi.target}</span></p>
          </div>
        ))}
      </div>

      <div className="mb-8 rounded-[2rem] border border-rose-100 bg-rose-50/50 p-6">
        <p className="mb-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-500">
          <Siren size={16} />
          تنبيهات الأولوية (Priority Alerts)
        </p>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div key={`${alert.title}-${index}`} className="bg-white rounded-2xl border border-rose-100 p-4 shadow-sm">
              <p className={`text-sm font-black ${alert.level === 'high' ? 'text-rose-600' : 'text-amber-600'}`}>{alert.title}</p>
              <p className="mt-2 text-xs font-bold leading-relaxed text-slate-500">{alert.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-slate-100 bg-slate-50/50 p-6 sm:p-8">
        <p className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <CalendarRange size={16} className="text-indigo-500" />
          المراحل الأسبوعية (Weekly Milestones)
        </p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {milestones.map((milestone) => (
            <div key={`${milestone.week}-${milestone.title}`} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:border-indigo-100 transition-all">
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Week {milestone.week}</span>
                <span className={`rounded-lg border px-2.5 py-1 text-[9px] font-black ${
                   milestone.status === 'focus' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                   milestone.status === 'stable' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                   'bg-amber-50 text-amber-600 border-amber-100'
                }`}>{milestone.status.toUpperCase()}</span>
              </div>
              <p className="text-sm font-black text-slate-900 leading-snug">{milestone.title}</p>
              <p className="mt-2 text-[11px] font-bold text-slate-400">Owner: <span className="text-slate-600">{milestone.owner}</span></p>
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-[11px] font-black text-indigo-600">
                <CheckCircle2 size={14} />
                KPI: {milestone.kpi}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-2 text-[11px] font-bold text-slate-400">
        <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" />
        يتم تحديث التوصيات تلقائيا حسب سيناريو CAC/Churn وزمن أول إيراد المحاكي في غرفة العمليات.
      </div>
    </section>
  );
};
