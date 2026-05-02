import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Flame, Timer, Lock, CheckCircle2, CircleDot } from 'lucide-react';
import { HackathonState } from '../types';
import { sprintDays } from '../constants';

interface HackathonHeaderProps {
  state: HackathonState;
  remainingTime: string;
  progress: number;
  isStageComplete: (stage: number) => boolean;
  goToStage: (stage: number) => void;
}

export const HackathonHeader: React.FC<HackathonHeaderProps> = ({ state, remainingTime, progress, isStageComplete, goToStage }) => (
  <header className="mb-6 flex flex-col items-stretch gap-4 sm:mb-10 sm:gap-6 lg:flex-row">
    <div className="bg-white border border-slate-200 shadow-sm flex flex-1 flex-col justify-between rounded-[2.5rem] p-6 sm:p-8 lg:p-10">
      <div className="mb-6 flex items-start justify-between sm:mb-8">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-100">
            <Radio size={24} className="animate-pulse" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">Operation: Pulse Execution</h2>
            <h1 className="text-2xl sm:text-4xl font-black leading-tight text-slate-900">غرفة العمليات الاستخباراتية</h1>
          </div>
        </div>

        <div className="hidden items-center gap-5 sm:flex">
          <div className="text-right">
            <p className="text-[10px] font-black uppercase text-slate-400">Intensity Score</p>
            <p className="text-2xl font-black text-indigo-600">{state.intensityScore}%</p>
          </div>
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-slate-100">
            <svg className="h-full w-full -rotate-90 transform">
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-indigo-600"
                strokeDasharray="176"
                strokeDashoffset={176 - (176 * state.intensityScore) / 100}
                strokeLinecap="round"
              />
            </svg>
            <Flame size={24} className="absolute text-indigo-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7 sm:gap-4">
        {sprintDays.map((day) => {
          const isLocked = day.day > 1 && !isStageComplete(day.day - 1);
          const isActive = state.currentStage === day.day;
          const isDone = isStageComplete(day.day);

          return (
            <button
              key={day.day}
              onClick={() => goToStage(day.day)}
              className={`rounded-[1.5rem] border p-3 text-right transition-all ${
                isActive ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-600/5' : 'border-slate-100 bg-slate-50 opacity-60'
              } ${isLocked ? 'cursor-not-allowed grayscale' : 'hover:bg-white hover:border-indigo-200'}`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className={`text-[8px] font-black uppercase tracking-wider ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>{day.codename.split(' ')[0]}</span>
                {isDone ? (
                  <CheckCircle2 size={14} className="text-emerald-500" />
                ) : isLocked ? (
                  <Lock size={14} className="text-slate-300" />
                ) : (
                  <CircleDot size={14} className={isActive ? 'text-indigo-600' : 'text-slate-300'} />
                )}
              </div>
              <h3 className={`text-[11px] font-black leading-tight ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>{day.title.split(': ')[1]}</h3>
            </button>
          );
        })}
      </div>
    </div>

    <div className="bg-slate-900 relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[2.5rem] p-8 lg:w-[420px] shadow-2xl text-white">
      <div className="absolute right-0 top-0 p-6 opacity-20">
        <Timer size={24} />
      </div>
      <p className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">Time Remaining</p>
      <div className="text-5xl sm:text-7xl font-black tracking-tighter text-white tabular-nums">{remainingTime}</div>

      <div className="mt-10 w-full">
        <div className="mb-3 flex justify-between text-[10px] font-black uppercase text-indigo-200">
          <span>Project Readiness</span>
          <span>{progress}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-white/10 p-0.5 border border-white/5">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-rose-500 via-indigo-500 to-emerald-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
        </div>
      </div>
      
      {/* Decorative pulse for the dark timer block */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
    </div>
  </header>
);
