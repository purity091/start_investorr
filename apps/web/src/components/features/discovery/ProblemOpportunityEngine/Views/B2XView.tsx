import React from 'react';
import { motion } from 'framer-motion';
import { Building2, ChevronLeft, Target, AlertCircle, ArrowLeft, Check } from 'lucide-react';
import { B2X_MODELS, DATA } from '../constants';
import { Problem } from '../types';
import { ScoreBadge, getPainTag, CountryTag, CountryList } from '../SubComponents';
import { MinimalistCard } from '../MinimalistCard';

interface B2XViewProps {
  view: string;
  selectedB2X: string | null;
  setView: (v: any) => void;
  setSelectedB2X: (v: any) => void;
  distributedData: any[];
  goToOpportunity: (prob: Problem, fromView: any) => void;
}

export const B2XView: React.FC<B2XViewProps> = ({
  view,
  selectedB2X,
  setView,
  setSelectedB2X,
  distributedData,
  goToOpportunity
}) => {
  const b2xProblems = React.useMemo(() => {
    if (!selectedB2X) return [];
    const all: any[] = [];
    distributedData.forEach(sec => sec.subs.forEach((sub: any) => sub.problems.forEach((p: any) => {
      if (p.b2x === selectedB2X) {
        all.push({ ...p, sectorName: sec.name, sectorColor: sec.color, subName: sub.name });
      }
    })));
    return all;
  }, [selectedB2X]);

  const activeModel = B2X_MODELS.find(m => m.id === selectedB2X);

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 overflow-x-auto no-scrollbar py-2 mb-2">
          <button onClick={() => { setView('b2x_gateway'); setSelectedB2X(null); }} className={`hover:text-indigo-600 transition-colors shrink-0 ${view === 'b2x_gateway' ? 'text-indigo-600' : ''}`}>نماذج الأعمال الاستراتيجية</button>
          {view === 'b2x_problems' && activeModel && (
             <>
                <ChevronLeft size={12} className="shrink-0" />
                <span className="text-indigo-600 shrink-0">{activeModel.title}</span>
             </>
          )}
      </div>

      <motion.div 
        key={view}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
      >
        {view === 'b2x_gateway' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {B2X_MODELS.map(model => (
             <button key={model.id} onClick={() => { setSelectedB2X(model.id); setView('b2x_problems'); }}
               className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-indigo-200 shadow-sm hover:shadow-xl transition-all text-right flex flex-col items-center sm:items-start relative overflow-hidden"
             >
               <div className={`w-14 h-14 rounded-2xl bg-${model.color}-50 text-${model.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-all border border-${model.color}-100`}><model.icon size={28} /></div>
               <h3 className="text-xl font-black text-slate-900 mb-1">{model.title}</h3>
               <span className="text-[10px] font-black text-slate-400 mb-4 block">{model.subtitle}</span>
               <p className="text-sm font-bold text-slate-500 mb-6 leading-relaxed">{model.desc}</p>
               <div className="space-y-2 mb-8">
                  {model.traits.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                       <Check size={14} className="text-emerald-500" /> <span>{t}</span>
                    </div>
                  ))}
               </div>
               <div className="mt-auto w-full pt-6 border-t border-slate-50 flex items-center justify-between">
                 <span className="text-xs font-black text-indigo-600">استطلاع المشاكل</span>
                 <ChevronLeft size={18} className="text-slate-300 group-hover:text-indigo-500 group-hover:-translate-x-1 transition-all" />
               </div>
             </button>
           ))}
         </div>
        )}

        {view === 'b2x_problems' && selectedB2X && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {b2xProblems.map(problem => (
              <MinimalistCard 
                key={problem.id} 
                problem={problem} 
                onNavigate={() => goToOpportunity(problem, 'b2x_problems')} 
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
