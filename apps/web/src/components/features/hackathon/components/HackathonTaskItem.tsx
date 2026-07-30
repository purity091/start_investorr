import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Download } from 'lucide-react';
import { SprintTask } from '../types';

interface HackathonTaskItemProps {
  task: SprintTask;
  isDone: boolean;
  answer: any;
  onUpdate: (val: any) => void;
  onCompleteDossier?: () => void;
  canCompleteDossier?: boolean;
}

export const HackathonTaskItem: React.FC<HackathonTaskItemProps> = ({ task, isDone, answer, onUpdate, onCompleteDossier, canCompleteDossier }) => {
  const Icon = task.icon;

  return (
    <motion.article className="group rounded-[2.5rem] border border-slate-100 bg-white p-6 transition-all hover:border-indigo-200 hover:shadow-xl sm:p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-[1.5rem] border transition-all sm:h-20 sm:w-20 ${
            isDone ? 'border-emerald-500/50 bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-100' : 'border-slate-100 bg-slate-50 text-slate-400 group-hover:border-indigo-500 group-hover:text-indigo-600 group-hover:scale-105'
          }`}
        >
          <Icon size={32} className="sm:h-10 sm:w-10" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-xl font-black leading-tight text-slate-900 sm:text-3xl">{task.title}</h3>
            {isDone && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full">
                <CheckCircle2 size={12} /> مكتمل
              </span>
            )}
            <span className="inline-flex items-center px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full">
              متطلب استثماري (Mandatory)
            </span>
          </div>
          
          <div className="relative mt-4 rounded-2xl bg-slate-50 border border-slate-100 p-5 before:absolute before:right-0 before:top-4 before:h-8 before:w-1 before:bg-indigo-500 before:rounded-l-full">
            <p className="text-sm font-bold leading-relaxed text-slate-600 sm:text-base">
              <span className="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">توجيهات الخبراء الاستراتيجية:</span>
              {task.detail}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {task.id === 'dossier' ? (
          <button
            onClick={onCompleteDossier}
            disabled={!canCompleteDossier}
            className="flex w-full items-center justify-center gap-4 rounded-3xl bg-slate-900 py-6 text-xl font-black text-white shadow-2xl shadow-slate-200 transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-20 sm:py-8 sm:text-3xl"
          >
            <Download size={32} />
            تفعيل الكيان الاستثماري النهائي
          </button>
        ) : task.type === 'swot' ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {['قوة', 'ضعف', 'فرص', 'تهديدات'].map((label) => (
              <div key={label} className="relative group/field">
                <span className="absolute right-6 top-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within/field:text-indigo-500 transition-colors">{label}</span>
                <textarea
                  className="h-44 w-full resize-none rounded-3xl border-2 border-slate-100 bg-slate-50/50 p-6 pt-12 text-base font-bold text-slate-900 transition-all focus:bg-white focus:border-indigo-500 focus:outline-none focus:shadow-2xl focus:shadow-indigo-100/50 sm:p-8 sm:pt-12"
                  placeholder="وثق تحليلك هنا..."
                  value={answer?.[label] || ''}
                  onChange={(e) => onUpdate({ ...answer, [label]: e.target.value })}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative group/field">
            <textarea
              className="min-h-[200px] w-full rounded-3xl border-2 border-slate-100 bg-slate-50/50 p-6 text-base font-bold leading-relaxed text-slate-900 transition-all placeholder:text-slate-300 focus:bg-white focus:border-indigo-500 focus:outline-none focus:shadow-2xl focus:shadow-indigo-100/50 sm:min-h-[250px] sm:p-8"
              placeholder={task.placeholder}
              value={answer || ''}
              onChange={(e) => onUpdate(e.target.value)}
            />
            <div className="absolute left-6 bottom-6 opacity-0 group-focus-within/field:opacity-100 transition-opacity">
               <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Entry in Progress...</span>
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
};
