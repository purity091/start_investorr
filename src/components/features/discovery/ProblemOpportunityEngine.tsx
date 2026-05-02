import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, LayoutGrid, Building2, Wallet, Globe, Search, Sparkles, ChevronDown, ArrowLeft } from 'lucide-react';

// Modules
import { Sector, SubSector, Problem } from './ProblemOpportunityEngine/types';
import { DATA, COUNTRIES } from './ProblemOpportunityEngine/constants.tsx';
import { OpportunityDetail } from './ProblemOpportunityEngine/OpportunityDetail';

// Views
import { SectorsView } from './ProblemOpportunityEngine/Views/SectorsView';
import { BudgetView } from './ProblemOpportunityEngine/Views/BudgetView';
import { MarketsView } from './ProblemOpportunityEngine/Views/MarketsView';
import { B2XView } from './ProblemOpportunityEngine/Views/B2XView';

// Dynamic Services
import { loadDynamicOpportunities } from '../../../services/opportunityService';

export const ProblemOpportunityEngine: React.FC = () => {
  // Navigation & Control State
  const [exploreMode, setExploreMode] = useState<'sectors' | 'budget' | 'markets' | 'b2x' | 'search_results'>('sectors');
  const [activeView, setActiveView] = useState<string>('sectors');
  const [lastView, setLastView] = useState<string>('problems');
  const [searchContext, setSearchContext] = useState<{ query: string; results: any[] }>({ query: '', results: [] });

  // Selection State
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [selectedSub, setSelectedSub] = useState<SubSector | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedB2X, setSelectedB2X] = useState<string | null>(null);
  const [selectedContinent, setSelectedContinent] = useState('middle_east');
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);

  // Dynamic Content State
  const [dynamicProblems, setDynamicProblems] = useState<any[]>([]);

  // Filter & Search State
  const [marketSearchTerm, setMarketSearchTerm] = useState('');
  const [currentMarketPage, setCurrentMarketPage] = useState(1);
  const [cmdQuery, setCmdQuery] = useState('');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const commandInputRef = useRef<HTMLInputElement>(null);

  const ITEMS_PER_PAGE = 5;

  // ─── Effects ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.mode) {
        setExploreMode(e.state.mode);
        if (e.state.activeView) setActiveView(e.state.activeView);
        if (e.state.searchQuery) setCmdQuery(e.state.searchQuery);
      } else {
        setExploreMode('sectors');
        setActiveView('sectors');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (isCommandOpen) setTimeout(() => commandInputRef.current?.focus(), 100);
  }, [isCommandOpen]);

  // Load Dynamic Opportunities
  useEffect(() => {
    loadDynamicOpportunities().then(probs => {
      setDynamicProblems(probs);
    });
  }, []);

  // ─── Memoized Data ────────────────────────────────────────────────────────
  const allProblemsFlattened = useMemo(() => {
    const all: any[] = [];
    DATA.forEach(sec => sec.subs.forEach(sub => sub.problems.forEach(p => {
      const pCountriesNames = p.countries.map(cId => COUNTRIES.find(c => c.id === cId)?.name || '');
      const searchString = `${p.title} ${p.desc} ${sec.name} ${sub.name} ${pCountriesNames.join(' ')} ${p.b2x}`.toLowerCase();
      all.push({ ...p, sectorName: sec.name, sectorColor: sec.color, searchString });
    })));
    dynamicProblems.forEach(p => {
      const countryNames = p.countries.map((cId: string) => {
        const c = COUNTRIES.find(curr => curr.id === cId);
        return c ? `${c.name} ${cId}` : cId;
      }).join(' ');
      const searchString = `${p.title} ${p.desc} ${p.sectorName} ${p.subSectorName} ${countryNames} ${p.b2x}`.toLowerCase();
      const parentSector = DATA.find(s => s.id === p.sectorId);
      const sectorColor = parentSector?.color || "indigo";
      all.push({ ...p, sectorName: p.sectorName || "فرص استخباراتية", sectorColor: sectorColor, searchString });
    });
    return all;
  }, [dynamicProblems]);

  const filteredData = useMemo(() => {
    const baseSectors = DATA.map(sector => ({
      ...sector,
      subs: sector.subs.map(sub => ({ ...sub, problems: [...sub.problems] }))
    }));
    dynamicProblems.forEach(p => {
      let targetSector = baseSectors.find(s => s.id === p.sectorId);
      if (!targetSector && p.sectorId !== 'dynamic_sector') {
        targetSector = { id: p.sectorId || 'dynamic_sector', icon: Sparkles, name: p.sectorName || 'قطاع جديد', count: 0, color: 'indigo', subs: [] };
        baseSectors.push(targetSector);
      }
      if (targetSector) {
        let targetSub = targetSector.subs.find(sub => sub.name === p.subSectorName || sub.id === p.subSectorId);
        if (targetSub) { targetSub.problems.push(p); } 
        else { targetSector.subs.push({ id: `dyn_sub_${p.subSectorName}`, name: p.subSectorName || 'عام', count: 1, problems: [p] }); }
      }
    });
    const filtered = baseSectors.map(sector => {
      const filteredSubs = sector.subs.map(sub => {
        const filteredProblems = sub.problems.filter(p => selectedCountry === 'ALL' || p.countries.includes(selectedCountry) || p.countries.includes('ALL') || p.countries.some((c: any) => (typeof c === 'object' ? c.name : c) === selectedCountry));
        return { ...sub, problems: filteredProblems, count: filteredProblems.length };
      }).filter(s => s.problems.length > 0);
      return { ...sector, subs: filteredSubs, count: filteredSubs.reduce((a, b) => a + b.count, 0) };
    }).filter(s => s.subs.length > 0);
    if (dynamicProblems.length > 0) {
      const dynamicSector: Sector = { id: 'dynamic_sector', icon: Sparkles, name: 'فرص استخباراتية حية', count: dynamicProblems.length, color: 'indigo', subs: [{ id: 'dynamic_general', name: 'الفرص المضافة حديثاً', count: dynamicProblems.length, problems: dynamicProblems }] };
      return [dynamicSector, ...filtered];
    }
    return filtered;
  }, [selectedCountry, dynamicProblems]);

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const goToProblems = (sub: SubSector) => { setSelectedSub(sub); setActiveView('problems'); setLastView('problems'); };
  const goToOpportunity = (prob: Problem, fromView: any) => { setSelectedProblem(prob); setActiveView('opportunity'); setLastView(fromView); };
  const handleSearchCommit = () => {
    if (!cmdQuery.trim()) return;
    const terms = cmdQuery.toLowerCase().split(' ').filter(c => c);
    const results = allProblemsFlattened.filter(p => terms.every(term => p.searchString.includes(term)));
    setSearchContext({ query: cmdQuery, results });
    window.history.pushState({ mode: 'search_results', searchQuery: cmdQuery }, '');
    setExploreMode('search_results');
    setIsCommandOpen(false);
  };

  // ─── RENDERING BRANCH: OPPORTUNITY DETAIL ─────────────────────
  if (activeView === 'opportunity' && selectedProblem) {
    return (
      <div className="w-full min-h-screen bg-[#f8fafc] font-tajawal text-right" dir="rtl">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <OpportunityDetail 
              selectedProblem={selectedProblem} 
              selectedSector={selectedSector} 
              selectedSub={selectedSub}
              lastView={lastView} 
              setView={setActiveView} 
              goToProblems={goToProblems}
            />
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ─── RENDERING BRANCH: SEARCH RESULTS (REUSED & POLISHED) ──────
  if (exploreMode === 'search_results') {
    const total = searchContext.results.length;
    return (
      <div className="w-full h-screen bg-white font-tajawal text-right overflow-hidden flex flex-col" dir="rtl">
        <header className="sticky top-0 z-[100] h-20 shrink-0 bg-white border-b border-slate-100 px-10 flex items-center justify-between gap-10">
           <div className="flex items-center gap-5">
              <button onClick={() => { setExploreMode('sectors'); setActiveView('sectors'); }} className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 flex items-center justify-center transition-all border border-slate-100 group shrink-0">
                 <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <div>
                 <h1 className="text-lg font-black text-slate-900 leading-tight">نتائج الاستعلام الذكي</h1>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Intelligence Intelligence Output</p>
              </div>
           </div>
           
           <div className="flex-1 max-w-2xl px-10">
              <div className="relative group">
                 <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                 <input 
                   type="text" value={cmdQuery} onChange={(e) => setCmdQuery(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSearchCommit()}
                   placeholder="تصفية النتائج الحالية..."
                   className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pr-11 pl-6 text-slate-900 text-xs font-bold focus:bg-white focus:border-indigo-400 transition-all outline-none"
                 />
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-xl">
                 <Activity size={18} />
              </div>
           </div>
        </header>

        <div className="flex-1 flex bg-[#f8fafc]">
            <main className="flex-1 overflow-y-auto p-4 no-scrollbar">
              <div className="w-full space-y-6">
                 {searchContext.results.length === 0 ? (
                   <div className="py-32 text-center space-y-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300"><Search size={32} /></div>
                      <p className="text-slate-400 text-sm font-black">لا توجد بيانات مطابقة لهذا الاستعلام</p>
                      <button onClick={() => setExploreMode('sectors')} className="text-xs font-black text-indigo-600 underline">العودة للبحث العام</button>
                   </div>
                 ) : (
                   <div className="grid grid-cols-1 gap-4">
                      {searchContext.results.map(p => (
                         <motion.div 
                           key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                           onClick={() => goToOpportunity(p, 'search_results')}
                           className="group bg-white p-5 rounded-3xl border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/5 transition-all cursor-pointer flex items-center gap-6"
                         >
                            <div className="w-14 h-14 bg-slate-50 group-hover:bg-indigo-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0">
                               <Globe size={24} />
                            </div>
                            <div className="flex-1 text-right">
                               <div className="flex items-center gap-3 mb-1">
                                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{p.sectorName}</span>
                                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                  <span className="text-[10px] font-bold text-slate-400">#{p.id.slice(0,5)}</span>
                               </div>
                               <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{p.title}</h3>
                               <p className="text-[13px] font-medium text-slate-500 line-clamp-1 opacity-80">{p.desc}</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-all">
                               <ArrowLeft size={18} />
                            </div>
                         </motion.div>
                      ))}
                   </div>
                 )}
              </div>
            </main>
        </div>
      </div>
    );
  }

  // ─── MAIN DASHBOARD LAYOUT (HIGH FIDELITY) ──────────────────────
  return (
    <div className="w-full h-screen bg-[#f8fafc] font-tajawal text-right flex overflow-hidden" dir="rtl">
      
      {/* ─── SIDEBAR NAVIGATION ─── */}
      <aside className="w-80 h-full bg-white border-l border-slate-100 flex flex-col shrink-0 relative z-[101]">
         <div className="p-8 border-b border-slate-50">
            <div className="flex items-center gap-3 mb-2">
               <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
                  <Activity size={20} />
               </div>
               <div>
                  <h1 className="text-xl font-black text-slate-900 tracking-tight">محرك الفرص</h1>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Intelligence</p>
               </div>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
            <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">أنماط الاستكشاف</p>
            {[
              { id: 'sectors', label: 'تصفح القطاعات', icon: LayoutGrid, startView: 'sectors', desc: 'استكشاف حسب نوع النشاط' },
              { id: 'markets', label: 'الأسواق العالمية', icon: Globe, startView: 'continents_gateway', desc: 'توزيع الفرص جغرافياً' },
              { id: 'budget', label: 'ميزانية الاستثمار', icon: Wallet, startView: 'budget_tiers', desc: 'فرص حسب حجم رأس المال' },
              { id: 'b2x', label: 'نماذج العمل', icon: Building2, startView: 'b2x_gateway', desc: 'B2B, B2C, G2B' },
            ].map((m) => (
              <button 
                key={m.id} 
                onClick={() => { setExploreMode(m.id as any); setActiveView(m.startView); }}
                className={`w-full flex flex-col gap-1 p-4 rounded-2xl transition-all duration-300 text-right group ${
                  exploreMode === m.id ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                   <m.icon size={20} className={exploreMode === m.id ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-900'} />
                   <span className="font-black text-sm">{m.label}</span>
                </div>
                <p className={`text-[10px] font-bold ${exploreMode === m.id ? 'text-slate-400' : 'text-slate-400'}`}>
                  {m.desc}
                </p>
              </button>
            ))}
         </div>

         <div className="p-6">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
               <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-slate-900 uppercase">Live Intelligence</span>
               </div>
               <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                  نظام التتبع لدينا يراقب حالياً <span className="text-slate-900 font-black">+{allProblemsFlattened.length}</span> فرصة حية موثقة.
               </p>
            </div>
         </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ─── */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
         
         {/* Top Bar / Search */}
         <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-10 flex items-center justify-between sticky top-0 z-[100]">
            <div className="flex-1 max-w-2xl">
               <div className="relative group">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <input 
                    ref={commandInputRef} type="text" value={cmdQuery} onChange={(e) => setCmdQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchCommit()}
                    placeholder="ابحث عن فرص في التعليم، التكنولوجيا، المملكة العربية السعودية..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-[1.2rem] py-3 pr-12 pl-6 text-sm font-bold text-slate-900 focus:bg-white focus:border-indigo-400 transition-all outline-none shadow-sm shadow-slate-100/50"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                     <span className="hidden sm:block px-2 py-1 bg-white border border-slate-200 rounded-md text-[9px] font-black text-slate-400">CTRL + K</span>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-6 mr-10">
               <div className="text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Market</p>
                  <div className="flex items-center gap-2">
                     <span className="text-sm font-black text-slate-900">الشرق الأوسط</span>
                     <ChevronDown size={14} className="text-slate-400" />
                  </div>
               </div>
               <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-indigo-100">
                  <Sparkles size={24} />
               </div>
            </div>
         </header>

         {/* View Content */}
         <div className="flex-1 overflow-y-auto no-scrollbar p-6 bg-[#f8fafc]">
            <div className="w-full">
               <AnimatePresence mode="wait">
                  {exploreMode === 'sectors' && (
                    <SectorsView 
                      view={activeView} filteredData={filteredData} selectedSector={selectedSector} selectedSub={selectedSub}
                      selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} setSelectedSector={setSelectedSector} setSelectedSub={setSelectedSub}
                      setView={setActiveView} goToProblems={goToProblems} goToOpportunity={goToOpportunity}
                    />
                  )}
                  {exploreMode === 'budget' && (
                    <BudgetView view={activeView} selectedBudget={selectedBudget} setView={setActiveView} setSelectedBudget={setSelectedBudget} goToOpportunity={goToOpportunity} distributedData={filteredData} />
                  )}
                  {exploreMode === 'markets' && (
                    <MarketsView 
                      view={activeView} selectedContinent={selectedContinent} selectedMarket={selectedMarket} marketSearchTerm={marketSearchTerm} currentMarketPage={currentMarketPage} ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                      setView={setActiveView} setSelectedContinent={setSelectedContinent} setSelectedMarket={setSelectedMarket} setMarketSearchTerm={setMarketSearchTerm} setCurrentMarketPage={setCurrentMarketPage} goToOpportunity={goToOpportunity} distributedData={filteredData}
                    />
                  )}
                  {exploreMode === 'b2x' && (
                    <B2XView view={activeView} selectedB2X={selectedB2X} setView={setActiveView} setSelectedB2X={setSelectedB2X} goToOpportunity={goToOpportunity} distributedData={filteredData} />
                  )}
               </AnimatePresence>
            </div>
         </div>

         {/* Decorative elements */}
         <div className="absolute bottom-0 right-0 p-8 pointer-events-none opacity-20">
            <Activity size={300} className="text-slate-200" />
         </div>
      </main>
    </div>
  );
};

