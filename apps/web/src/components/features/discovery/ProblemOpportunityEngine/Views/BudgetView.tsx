import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ChevronLeft, Target, AlertCircle, ArrowLeft, AlertTriangle, TrendingUp } from 'lucide-react';
import { BUDGET_TIERS, DATA } from '../constants';
import { Problem } from '../types';
import { ScoreBadge, getPainTag, CountryTag, CountryList } from '../SubComponents';
import { MinimalistCard } from '../MinimalistCard';

interface BudgetViewProps {
  view: string;
  selectedBudget: string | null;
  setView: (v: any) => void;
  setSelectedBudget: (b: any) => void;
  distributedData: any[];
  goToOpportunity: (prob: Problem, fromView: any) => void;
}

export const BudgetView: React.FC<BudgetViewProps> = ({
  view,
  selectedBudget,
  setView,
  setSelectedBudget,
  distributedData,
  goToOpportunity
}) => {
  const budgetProblems = React.useMemo(() => {
    if (!selectedBudget) return [];
    const all: any[] = [];
    distributedData.forEach(sec => sec.subs.forEach((sub: any) => sub.problems.forEach((p: any) => {
      if (p.budget === selectedBudget) {
        all.push({ ...p, sectorName: sec.name, sectorColor: sec.color, subName: sub.name });
      }
    })));
    return all;
  }, [selectedBudget]);

  const activeTier = BUDGET_TIERS.find(t => t.id === selectedBudget);

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 overflow-x-auto no-scrollbar py-2 mb-2">
          <button onClick={() => { setView('budget_tiers'); setSelectedBudget(null); }} className={`hover:text-indigo-600 transition-colors shrink-0 ${view === 'budget_tiers' ? 'text-indigo-600' : ''}`}>ميزانيات الاستثمار</button>
          {view === 'budget_problems' && activeTier && (
             <>
                <ChevronLeft size={12} className="shrink-0" />
                <span className="text-indigo-600 shrink-0">{activeTier.title}</span>
             </>
          )}
      </div>

      <motion.div 
        key={view}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
      >
        {view === 'budget_tiers' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BUDGET_TIERS.map(tier => (
              <button key={tier.id} onClick={() => { setSelectedBudget(tier.id); setView('budget_problems'); }}
                className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-indigo-200 shadow-sm hover:shadow-xl transition-all text-right flex flex-col items-center sm:items-start relative overflow-hidden"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${tier.color}-50 text-${tier.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-all border border-${tier.color}-100`}><tier.icon size={28} /></div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{tier.title}</h3>
                <p className="text-sm font-bold text-slate-400 mb-6 leading-relaxed">{tier.desc}</p>
                <div className="mt-auto w-full pt-6 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-500">{tier.subtitle}</span>
                  <ChevronLeft size={18} className="text-slate-300 group-hover:text-indigo-500 group-hover:-translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>
        )}

        {view === 'budget_problems' && selectedBudget && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {budgetProblems.map(problem => (
              <MinimalistCard 
                key={problem.id} 
                problem={problem} 
                onNavigate={() => goToOpportunity(problem, 'budget_problems')} 
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
