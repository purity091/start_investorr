import React from 'react';
import { MessageSquareWarning, RefreshCw } from 'lucide-react';
import { SprintDay, HackathonState } from '../types';
import { HackathonTaskItem } from './HackathonTaskItem';

interface HackathonTaskBoardProps {
  currentDay: SprintDay;
  state: HackathonState;
  mentorMessage: string;
  onUpdateAnswer: (id: any, val: any) => void;
  onCompleteDossier: () => void;
  canCompleteDossier: boolean;
  onReset: () => void;
}

export const HackathonTaskBoard: React.FC<HackathonTaskBoardProps> = ({
  currentDay,
  state,
  mentorMessage,
  onUpdateAnswer,
  onCompleteDossier,
  canCompleteDossier,
  onReset,
}) => (
  <section className="bg-white border border-slate-200 shadow-sm rounded-[2.5rem] p-6 sm:p-10">
    <div className="mb-8 flex flex-col justify-between gap-6 sm:mb-12 md:flex-row md:items-center md:gap-8">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-black text-white shadow-lg shadow-indigo-100">{currentDay.day < 10 ? `0${currentDay.day}` : currentDay.day}</span>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{currentDay.codename}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black leading-tight text-slate-900">{currentDay.title}</h2>
      </div>

      <div className="max-w-full rounded-[2rem] border border-indigo-100 bg-indigo-50/50 p-6 sm:max-w-md">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-indigo-100 flex items-center justify-center shrink-0 shadow-sm text-indigo-600">
             <MessageSquareWarning size={24} />
          </div>
          <p className="text-sm font-bold leading-relaxed text-slate-700">
            <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-indigo-500">AI Mentor Insight</span>
            {mentorMessage}
          </p>
        </div>
      </div>
    </div>

    <div className="space-y-6 sm:space-y-10">
      {currentDay.tasks.map((task) => (
        <HackathonTaskItem
          key={task.id}
          task={task}
          isDone={state.taskStatus[task.id]}
          answer={state.answers[task.id]}
          onUpdate={(val) => onUpdateAnswer(task.id, val)}
          onCompleteDossier={onCompleteDossier}
          canCompleteDossier={canCompleteDossier}
        />
      ))}
    </div>

    <div className="mt-12 flex flex-col gap-6 border-t border-slate-100 pt-8 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-2">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((s) => (
          <div key={s} className={`h-2 rounded-full transition-all duration-500 ${state.currentStage === s ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'}`} />
        ))}
      </div>
      <button
        onClick={() => {
          if (confirm('هل أنت متأكد؟ سيتم حذف كل التقدم المنجز.')) onReset();
        }}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-rose-500"
      >
        <RefreshCw size={14} />
        Reset Operation
      </button>
    </div>
  </section>
);
