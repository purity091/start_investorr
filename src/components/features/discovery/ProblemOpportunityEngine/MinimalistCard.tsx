import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Activity, Globe } from 'lucide-react';
import { CountryList } from './SubComponents';

interface MinimalistCardProps {
  problem: any;
  onNavigate: () => void;
}

export const MinimalistCard: React.FC<MinimalistCardProps> = ({ problem, onNavigate }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.005 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group overflow-hidden h-full relative"
    >
      {/* Decorative Gradient Glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-50/30 blur-[80px] rounded-full group-hover:bg-indigo-100/30 transition-colors duration-500" />

      {/* Top Bar: Strategic Context */}
      <div className="px-6 pt-6 pb-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 group/cat">
              <Activity size={12} className="text-slate-400 group-hover/cat:text-indigo-500 transition-colors" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none">{problem.sectorName}</span>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <div className="p-1 bg-white border border-slate-50 rounded-lg shadow-sm">
              <CountryList countryIds={problem.countries} />
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6 relative z-10 flex-1 space-y-3">
        <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors duration-300">
          {problem.title}
        </h3>
        <p className="text-[13px] font-medium text-slate-500 leading-relaxed line-clamp-3">
          {problem.desc}
        </p>
      </div>

      {/* Footer: Action */}
      <div className="px-6 py-5 mt-auto border-t border-slate-50 bg-slate-50/50 group-hover:bg-white transition-colors duration-300 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="text-right">
               <div className="text-[10px] font-black text-slate-900">{problem.money}</div>
               <div className="text-[8px] font-bold text-slate-400 uppercase">عائد متوقع</div>
            </div>
         </div>
         <button 
           onClick={onNavigate}
           className="h-9 px-5 bg-slate-900 text-white rounded-xl flex items-center gap-2 hover:bg-indigo-600 transition-all duration-300 shadow-md text-[10px] font-black uppercase tracking-wider"
         >
           <span>استكشاف</span>
           <ArrowLeft size={14} className="rotate-180" />
         </button>
      </div>
    </motion.div>
  );
};
