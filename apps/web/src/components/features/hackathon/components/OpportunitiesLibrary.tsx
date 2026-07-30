import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Database, Target, Zap, ChevronLeft } from 'lucide-react';
import { OPPORTUNITIES } from '../constants';

interface OpportunitiesLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (oppId: string) => void;
}

export const OpportunitiesLibrary: React.FC<OpportunitiesLibraryProps> = ({ isOpen, onClose, onSelect }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-full max-w-xl bg-white z-[101] shadow-2xl overflow-hidden flex flex-col"
            dir="rtl"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <div>
                  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                     <Database className="text-indigo-600" size={24} />
                     رادار فجوات السوق
                  </h2>
                  <p className="text-xs font-bold text-slate-400 mt-1">فرص استثمارية تم رصدها بناءً على معايير الجدوى</p>
               </div>
               <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-400">
                  <X size={24} />
               </button>
            </div>

            <div className="p-6 bg-white border-b border-slate-100">
               <div className="relative">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="ابحث عن قطاع أو فجوة معينة..." 
                    className="w-full bg-slate-100 border-none rounded-2xl py-4 pr-12 pl-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                  />
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
               {OPPORTUNITIES.map((opp) => (
                  <motion.div
                    key={opp.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => onSelect(opp.id)}
                    className="group cursor-pointer p-6 rounded-3xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all relative overflow-hidden"
                  >
                     <div className="flex items-start justify-between gap-4 relative z-10">
                        <div className="flex-1">
                           <div className="flex items-center gap-2 mb-3">
                              <span className="px-3 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-black text-indigo-600 uppercase tracking-widest">{opp.sector}</span>
                              <div className="flex items-center gap-1 text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-1 rounded-lg">
                                 <Zap size={10} fill="currentColor" />
                                 ألم: {opp.pain}/10
                              </div>
                           </div>
                           <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors">{opp.title}</h3>
                           <p className="text-sm font-medium text-slate-500 leading-relaxed">{opp.desc}</p>
                        </div>
                        <div className="shrink-0 self-center">
                           <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                              <ChevronLeft size={20} />
                           </div>
                        </div>
                     </div>
                     <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <Target size={80} />
                     </div>
                  </motion.div>
               ))}
            </div>

            <div className="p-8 bg-slate-900 text-white">
               <p className="text-xs font-bold text-slate-400 mb-2">نصيحة الخبراء:</p>
               <p className="text-sm font-medium leading-relaxed">
                  اختر الفجوة التي تشعر أنك تملك ميزة تنافسية فيها، سواء كانت تقنية أو معرفية بالسوق. الألم الأعلى يعني فرصة استثمارية أكبر.
               </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
