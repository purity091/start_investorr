import React, { useMemo } from 'react';
import { Crown, Eye, Medal, MessageSquareWarning, ShieldCheck, Sparkles, Trophy, Users } from 'lucide-react';
import { ParticipantRecord, TaskId } from '../types';

interface LeadershipBoardProps {
  participants: ParticipantRecord[];
  currentUserId: string;
  taskIds: TaskId[];
}

const scoreTotal = (participant: ParticipantRecord) =>
  Math.round(participant.score.idea * 0.35 + participant.score.success * 0.35 + participant.score.accuracy * 0.3);

const statusStyles: Record<ParticipantRecord['status'], string> = {
  active: 'border-lime-400/30 bg-lime-500/10 text-lime-300',
  'at-risk': 'border-amber-400/30 bg-amber-500/10 text-amber-300',
  blocked: 'border-red-400/30 bg-red-500/10 text-red-300',
};

export const LeadershipBoard: React.FC<LeadershipBoardProps> = ({ participants, currentUserId, taskIds }) => {
  const leaderboard = useMemo(() => [...participants].sort((a, b) => scoreTotal(b) - scoreTotal(a)), [participants]);
  const top3 = leaderboard.slice(0, 3);
  const currentIndex = leaderboard.findIndex((member) => member.id === currentUserId);
  const currentUser = currentIndex >= 0 ? leaderboard[currentIndex] : leaderboard[0];
  const currentProgress = Math.round((Object.values(currentUser.taskStatus).filter(Boolean).length / taskIds.length) * 100);

  return (
    <section className="bg-white border border-slate-200 rounded-[2rem] p-5 shadow-sm">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Leadership</p>
          <h3 className="mt-1 text-xl font-black leading-tight text-slate-900">ترتيب الهاكاثون</h3>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-500">
          <Users size={14} className="text-indigo-500" />
          25
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
        <div className="mb-4 flex items-center gap-3">
          <img src={currentUser.avatar} alt={currentUser.name} className="h-12 w-12 rounded-full border-2 border-white bg-slate-100 shadow-sm" />
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500">مركزك الحالي</p>
            <p className="text-xl font-black text-slate-900 leading-none">#{currentIndex + 1}</p>
          </div>
        </div>
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-500">{currentUser.project}</span>
          <span className="font-black text-indigo-600">{scoreTotal(currentUser)}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-indigo-600 shadow-lg shadow-indigo-200" style={{ width: `${currentProgress}%` }} />
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="https://api.dicebear.com/9.x/adventurer/svg?seed=admin-mentor" alt="المشرف" className="h-10 w-10 rounded-full border border-white bg-slate-200" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Admin Mentor</p>
              <p className="truncate text-sm font-black text-slate-900">نواف الراشد</p>
            </div>
          </div>
          <span className="rounded-lg border border-emerald-100 bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-600">Live</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-white border border-slate-100 p-2 shadow-sm">
            <Eye size={14} className="mx-auto mb-1 text-indigo-500" />
            <p className="text-[9px] font-black text-slate-600">يراقب</p>
          </div>
          <div className="rounded-xl bg-white border border-slate-100 p-2 shadow-sm">
            <MessageSquareWarning size={14} className="mx-auto mb-1 text-amber-500" />
            <p className="text-[9px] font-black text-slate-600">8 ملاحظات</p>
          </div>
          <div className="rounded-xl bg-white border border-slate-100 p-2 shadow-sm">
            <ShieldCheck size={14} className="mx-auto mb-1 text-emerald-500" />
            <p className="text-[9px] font-black text-slate-600">آخر فحص 6m</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Medal size={14} />
          Top 3 Strategic Leaders
        </div>
        <div className="space-y-2">
          {top3.map((member, index) => {
            const RankIcon = index === 0 ? Crown : Trophy;
            return (
              <div key={member.id} className="rounded-2xl border border-slate-100 bg-white p-3 hover:border-indigo-100 transition-colors">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="w-5 shrink-0 text-xs font-black text-slate-300">#{index + 1}</span>
                    <img src={member.avatar} alt={member.name} className="h-8 w-8 shrink-0 rounded-full bg-slate-100" />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-black text-slate-900">{member.name}</p>
                      <p className="truncate text-[10px] font-bold text-slate-400">{member.project}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-sm font-black text-slate-900">{scoreTotal(member)}</span>
                    <RankIcon size={16} className={index === 0 ? 'text-amber-500' : 'text-slate-300'} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-4">
        <div className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Trophy size={14} />
          Full Operation List
        </div>
        <div className="custom-scrollbar max-h-[280px] space-y-2 overflow-y-auto pr-2">
          {leaderboard.map((member, index) => {
            const isCurrent = member.id === currentUser.id;
            return (
              <div key={member.id} className={`rounded-xl border transition-all p-3 ${isCurrent ? 'border-indigo-200 bg-white shadow-sm ring-2 ring-indigo-50' : 'border-slate-100 bg-white'}`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="w-5 shrink-0 text-[10px] font-black text-slate-300">#{index + 1}</span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-black text-slate-900">{member.name}</p>
                      <p className="truncate text-[10px] font-bold text-slate-400">{member.project}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs font-black text-slate-900">{scoreTotal(member)}</p>
                    <span className={`rounded-md px-2 py-0.5 text-[9px] font-black border ${
                      member.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      member.status === 'at-risk' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>{member.status}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 text-[11px] font-bold leading-relaxed text-slate-400">
        <Sparkles size={14} className="mt-0.5 shrink-0 text-amber-500" />
        الترتيب يتطور ديناميكياً مع كل نقطة بيانات يتم توثيقها في الخطة.
      </div>
    </section>
  );
};
