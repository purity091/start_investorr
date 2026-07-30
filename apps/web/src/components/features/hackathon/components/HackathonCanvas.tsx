import React from 'react';
import { Layout, CheckCircle2, Circle } from 'lucide-react';
import { HackathonState } from '../types';
import { sprintDays } from '../constants';

interface HackathonCanvasProps {
  state: HackathonState;
}

export const HackathonCanvas: React.FC<HackathonCanvasProps> = ({ state }) => {
  const allTasks = sprintDays.flatMap((d) => d.tasks);

  return (
    <div className="glass-panel mt-6 rounded-[2.5rem] border-lime-500/10 p-4 sm:mt-8 sm:p-8">
      <div className="mb-6 flex items-start gap-3 sm:mb-8">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-lime-500/20 bg-lime-500/20 text-lime-400 sm:h-10 sm:w-10">
          <Layout size={18} className="sm:h-5 sm:w-5" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-black text-white sm:text-xl">لوحة الاستراتيجية الشاملة (Strategy Canvas)</h2>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500 sm:text-xs sm:tracking-widest">Real-time Project Synthesis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allTasks
          .filter((t) => t.id !== 'dossier')
          .map((task) => {
            const isDone = state.taskStatus[task.id];
            const answer = state.answers[task.id];

            return (
              <div key={task.id} className={`rounded-2xl border p-4 transition-all sm:p-5 ${isDone ? 'border-white/10 bg-white/5' : 'border-dashed border-white/5 bg-white/[0.02] opacity-40'}`}>
                <div className="mb-2 flex items-center justify-between sm:mb-3">
                  <span className="line-clamp-1 pr-2 text-[10px] font-black uppercase text-slate-500">{task.title}</span>
                  {isDone ? <CheckCircle2 size={14} className="shrink-0 text-lime-400" /> : <Circle size={14} className="shrink-0 text-slate-700" />}
                </div>
                <div className="line-clamp-3 text-xs font-medium leading-relaxed text-slate-400">{isDone ? (typeof answer === 'string' ? answer : JSON.stringify(answer)) : 'في انتظار التنفيذ...'}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
