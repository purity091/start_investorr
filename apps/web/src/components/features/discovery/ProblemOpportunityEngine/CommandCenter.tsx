
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Target, ArrowLeft, X } from 'lucide-react';

interface CommandCenterProps {
  isCommandOpen: boolean;
  setIsCommandOpen: (open: boolean) => void;
  cmdQuery: string;
  setCmdQuery: (q: string) => void;
  commandInputRef: React.RefObject<HTMLInputElement | null>;
  cmdResults: any[];
  goToOpportunity: (prob: any, fromView: string) => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  isCommandOpen,
  setIsCommandOpen,
  cmdQuery,
  setCmdQuery,
  commandInputRef,
  cmdResults,
  goToOpportunity
}) => {
  return (
    <AnimatePresence>
      {isCommandOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 sm:px-6"
          onKeyDown={(e) => e.key === 'Escape' && setIsCommandOpen(false)}
        >
          {/* Backdrop with sophisticated blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCommandOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Search Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border border-slate-200/50 overflow-hidden"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-8 py-6 border-b border-slate-100">
               <Search size={22} className="text-indigo-500 shrink-0" />
               <input 
                 ref={commandInputRef}
                 type="text"
                 placeholder="ابحث بالدولة، القطاع، أو نوع الفجوة..."
                 value={cmdQuery}
                 onChange={(e) => setCmdQuery(e.target.value)}
                 className="w-full bg-transparent border-none outline-none px-6 text-lg font-black text-slate-900 placeholder:text-slate-300 placeholder:font-bold"
               />
               <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[9px] font-black text-slate-400">
                     <span className="font-sans">ESC</span>
                     <span>للإغلاق</span>
                  </div>
                  <button 
                    onClick={() => setIsCommandOpen(false)}
                    className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
                  >
                    <X size={20} />
                  </button>
               </div>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto no-scrollbar pb-6">
               {cmdQuery.trim() === '' ? (
                 <div className="px-10 py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                       <Search size={32} />
                    </div>
                    <div className="space-y-1">
                       <p className="text-sm font-black text-slate-900">رادار البحث الاستخباراتي</p>
                       <p className="text-xs font-bold text-slate-400 leading-relaxed max-w-[280px] mx-auto text-center">
                          ابدأ الكتابة للبحث في مليارات البيانات المرتبطة بالفجوات السوقية والفرص الاستثمارية الناشئة.
                       </p>
                    </div>
                 </div>
               ) : cmdResults.length === 0 ? (
                 <div className="px-10 py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-300">
                       <Target size={32} />
                    </div>
                    <p className="text-sm font-black text-slate-600">عذراً، لم نجد نتائج تطابق "{cmdQuery}"</p>
                 </div>
               ) : (
                 <div className="p-4 space-y-2">
                    <p className="px-6 py-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">النتائج الاستخباراتية ({cmdResults.length})</p>
                    {cmdResults.map((result, idx) => (
                      <button 
                        key={idx}
                        onClick={() => {
                          goToOpportunity(result, 'search');
                          setIsCommandOpen(false);
                        }}
                        className="w-full flex items-center gap-6 p-6 rounded-[1.8rem] hover:bg-indigo-50/50 group transition-all text-right border border-transparent hover:border-indigo-100"
                      >
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 group-hover:scale-110 transition-transform shadow-sm">
                            <Globe size={20} className="group-hover:text-indigo-500 transition-colors" />
                         </div>
                         <div className="flex-1 space-y-1.5">
                            <div className="flex items-center gap-2">
                               <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-100/30 rounded text-[9px] font-black uppercase tracking-wide">قطاع {result.sectorName}</span>
                               <span className="text-[10px] font-bold text-slate-300">|</span>
                               <span className="text-[10px] font-black text-slate-400">{result.countries.join(', ')}</span>
                            </div>
                            <h4 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{result.title}</h4>
                            <p className="text-xs font-medium text-slate-400 line-clamp-1">{result.desc}</p>
                         </div>
                         <ArrowLeft size={18} className="text-slate-200 group-hover:text-indigo-500 group-hover:-translate-x-1 transition-all" />
                      </button>
                    ))}
                 </div>
               )}
            </div>

            {/* Footer Tip */}
            <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[9px] font-black text-slate-400 uppercase">تحديثات حية</span>
                  </div>
               </div>
               <p className="text-[9px] font-bold text-slate-400">نظام البحث الذكي مدفوع ببيانات السوق اللحظية</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
