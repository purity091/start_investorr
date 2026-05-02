import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ChevronLeft, Target, AlertCircle, ArrowLeft, Search, AlertTriangle, TrendingUp } from 'lucide-react';
import { CONTINENTS, COUNTRIES, DATA } from '../constants.tsx';
import { Problem } from '../types';
import { ScoreBadge, getPainTag, CountryTag, CountryList } from '../SubComponents';
import { MinimalistCard } from '../MinimalistCard';

interface MarketsViewProps {
  view: string;
  selectedContinent: string;
  selectedMarket: string | null;
  marketSearchTerm: string;
  currentMarketPage: number;
  ITEMS_PER_PAGE: number;
  setView: (v: any) => void;
  setSelectedContinent: (v: string) => void;
  setSelectedMarket: (v: string) => void;
  setMarketSearchTerm: (v: string) => void;
  setCurrentMarketPage: (v: number) => void;
  distributedData: any[];
  goToOpportunity: (prob: Problem, fromView: any) => void;
}

export const MarketsView: React.FC<MarketsViewProps> = ({
  view,
  selectedContinent,
  selectedMarket,
  marketSearchTerm,
  currentMarketPage,
  ITEMS_PER_PAGE,
  setView,
  setSelectedContinent,
  setSelectedMarket,
  setMarketSearchTerm,
  setCurrentMarketPage,
  distributedData,
  goToOpportunity
}) => {
  const marketProblems = React.useMemo(() => {
    const all: any[] = [];
    distributedData.forEach(sec => sec.subs.forEach((sub: any) => sub.problems.forEach((p: any) => {
      if ((selectedMarket === 'ALL' || p.countries.includes(selectedMarket || '') || p.countries.includes('ALL'))) {
         all.push({ ...p, sectorName: sec.name, sectorColor: sec.color, subName: sub.name });
      }
    })));
    return all.filter(p => p.title.includes(marketSearchTerm) || p.desc.includes(marketSearchTerm));
  }, [selectedMarket, marketSearchTerm]);

  const currentMarketList = marketProblems.slice((currentMarketPage - 1) * ITEMS_PER_PAGE, currentMarketPage * ITEMS_PER_PAGE);

  const country = COUNTRIES.find(c => c.id === selectedMarket);
  const continent = CONTINENTS.find(c => c.id === selectedContinent);

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 overflow-x-auto no-scrollbar py-2 mb-2">
          <button onClick={() => { setView('continents_gateway'); setSelectedMarket(''); }} className={`hover:text-indigo-600 transition-colors shrink-0 ${view === 'continents_gateway' ? 'text-indigo-600' : ''}`}>استخبارات الأسواق</button>
          
          {view === 'market_problems' && continent && (
             <>
                <ChevronLeft size={12} className="shrink-0" />
                <button onClick={() => { setView('continents_gateway'); setSelectedMarket(''); }} className="hover:text-indigo-600 transition-colors shrink-0">{continent.name}</button>
             </>
          )}
          {view === 'market_problems' && country && (
             <>
                <ChevronLeft size={12} className="shrink-0" />
                <span className="text-indigo-600 shrink-0">{country.name}</span>
             </>
          )}
      </div>

      <motion.div 
        key={view}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
      >
        {view === 'continents_gateway' && (
          <div className="space-y-16">
            {CONTINENTS.map(continent => (
              <div key={continent.id} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-100" />
                  <h2 className="text-xl font-black text-slate-900 bg-white px-4">{continent.name}</h2>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {continent.countries.map(cId => {
                    const country = COUNTRIES.find(cc => cc.id === cId);
                    return (
                      <button key={cId} onClick={() => { setSelectedMarket(cId); setView('market_problems'); }}
                        className="group bg-white p-5 rounded-2xl border border-slate-100 hover:border-indigo-200 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
                      >
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{country?.flag}</div>
                        <div className="text-sm font-black text-slate-900 mb-1">{country?.name}</div>
                        <div className="text-[10px] font-bold text-slate-400">استكشف الفرص</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'market_problems' && selectedMarket && (
           <div className="space-y-6">
              <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                 <div className="flex items-center gap-4">
                    <div className="text-4xl">{country?.flag}</div>
                    <div>
                       <h3 className="text-xl font-black text-slate-900">سوق {country?.name}</h3>
                       <p className="text-xs font-bold text-slate-400">تحليل فجوات السوق المحلي المكتشفة ({marketProblems.length})</p>
                    </div>
                 </div>
                 <div className="relative w-full sm:w-64">
                    <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input placeholder="ابحث في فجوات هذا السوق..." value={marketSearchTerm} onChange={e => setMarketSearchTerm(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-10 py-2.5 text-xs font-bold outline-none focus:ring-2 ring-indigo-500/10 transition-all"
                    />
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {currentMarketList.map(problem => (
                  <MinimalistCard 
                    key={problem.id} 
                    problem={problem} 
                    onNavigate={() => goToOpportunity(problem, 'market_problems')} 
                  />
                ))}
              </div>

              {/* simple pagination */}
              {marketProblems.length > ITEMS_PER_PAGE && (
                <div className="flex justify-center items-center gap-4 pt-6">
                   <button disabled={currentMarketPage === 1} onClick={() => setCurrentMarketPage(currentMarketPage - 1)} className="p-2 rounded-lg bg-white border border-slate-100 disabled:opacity-50"><ChevronLeft size={20} className="rotate-180" /></button>
                   <span className="text-xs font-black">صفحة {currentMarketPage}</span>
                   <button disabled={currentMarketPage * ITEMS_PER_PAGE >= marketProblems.length} onClick={() => setCurrentMarketPage(currentMarketPage + 1)} className="p-2 rounded-lg bg-white border border-slate-100 disabled:opacity-50"><ChevronLeft size={20} /></button>
                </div>
              )}
           </div>
        )}
      </motion.div>
    </div>
  );
};
