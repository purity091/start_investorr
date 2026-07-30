import React from 'react';
import { motion } from 'framer-motion';
import { Globe, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import { COUNTRIES } from './constants';

export const ScoreBadge = ({ label, score, colorClass }: { label: string, score: number, colorClass: string }) => {
  return (
    <div className="flex items-center gap-4 w-full group/score">
      <div className="flex flex-col flex-1">
         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</span>
         <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${score * 10}%` }}
               className={`h-full ${colorClass.replace('text-', 'bg-')} rounded-full`}
            />
         </div>
      </div>
      <div className={`text-lg font-black ${colorClass} min-w-[32px] text-left`}>{score}</div>
    </div>
  );
};

export const getPainTag = (pain: number) => {
  if (pain >= 9) return { label: 'حرج جداً', color: 'bg-rose-600 text-white', class: 'bg-rose-50 text-rose-600 border-rose-100', icon: 'AlertTriangle' };
  if (pain >= 7) return { label: 'مرتفع', color: 'bg-orange-500 text-white', class: 'bg-orange-50 text-orange-600 border-orange-100', icon: 'TrendingUp' };
  return { label: 'متوسط', color: 'bg-amber-500 text-white', class: 'bg-amber-50 text-amber-600 border-amber-100', icon: 'Activity' };
};

export const CountryList = ({ countryIds }: { countryIds: any[] }) => {
  if (!countryIds || countryIds.length === 0 || countryIds.includes('ALL')) {
     return <span className="text-[10px] font-black text-slate-400 flex items-center gap-1.5 bg-slate-50/50 px-3 py-1.5 rounded-lg border border-slate-100/50"><Globe size={13} className="text-slate-400" /> عالمي</span>;
  }
  
  const displayCount = 3;
  const visibleIds = countryIds.slice(0, displayCount);
  const remainingCount = countryIds.length - displayCount;

  return (
    <div className="flex items-center">
        <div className="flex -space-x-2.5 rtl:space-x-reverse">
          {visibleIds.map((item, idx) => {
             // Handle simple ID strings (Static Data)
             if (typeof item === 'string') {
                const c = COUNTRIES.find(x => x.id === item);
                return c ? (
                  <div key={item} className="w-8 h-8 rounded-full border-[2.5px] border-white bg-slate-50 flex items-center justify-center text-lg shadow-sm hover:z-10 transition-all cursor-help" title={c.name}>
                    {c.flag}
                  </div>
                ) : null;
             }
             // Handle Objects {name, flag} (Dynamic JSON Data)
             return (
               <div key={idx} className="w-8 h-8 rounded-full border-[2.5px] border-white bg-slate-50 flex items-center justify-center text-lg shadow-sm hover:z-10 transition-all cursor-help" title={item.name}>
                 {item.flag}
               </div>
             );
          })}
          {remainingCount > 0 && (
             <div className="w-8 h-8 rounded-full border-[2.5px] border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600 shadow-sm">
                +{remainingCount}
             </div>
          )}
        </div>
    </div>
  );
};

export const CountryTag = ({ countryId }: { countryId: string }) => {
  const c = COUNTRIES.find(x => x.id === countryId);
  if (!c || countryId === 'ALL') return null;
  return (
    <div className="w-6 h-6 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-xs shadow-sm" title={c.name}>
       {c.flag}
    </div>
  );
};
