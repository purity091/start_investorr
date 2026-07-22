
import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, 
  Clock, CheckCircle2, 
  TrendingUp, LayoutGrid, 
  Share2, Trash2, 
  FileDown, ArrowRight, Star,
  List, Activity
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  sector: string;
  status: 'ready' | 'review' | 'draft';
  progress: {
    market: number;
    product: number;
    financial: number;
  };
  aiScore: number;
  lastEdited: string;
  marketCap: string;
  isFavorite: boolean;
}

const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1', name: 'أكاديمية الذكاء الاصطناعي', sector: 'EdTech', status: 'ready',
    progress: { market: 100, product: 90, financial: 95 },
    aiScore: 94, lastEdited: 'منذ ساعتين', marketCap: '$1.4M', isFavorite: true
  },
  {
    id: 'p2', name: 'منصة الحصاد الذكي', sector: 'AgriTech', status: 'review',
    progress: { market: 85, product: 70, financial: 40 },
    aiScore: 78, lastEdited: 'منذ 5 ساعات', marketCap: '$800K', isFavorite: false
  },
  {
    id: 'p3', name: 'بوابة الدفع الإقليمية', sector: 'FinTech', status: 'draft',
    progress: { market: 40, product: 20, financial: 10 },
    aiScore: 45, lastEdited: 'أمس', marketCap: '$5.2M', isFavorite: false
  },
  {
    id: 'p4', name: 'عقارات فيرتشوال', sector: 'Property', status: 'ready',
    progress: { market: 100, product: 100, financial: 90 },
    aiScore: 91, lastEdited: 'منذ يومين', marketCap: '$12M', isFavorite: true
  }
];

interface MyProjectsProps {
  setActiveTab?: (tab: string) => void;
}

export const MyProjects: React.FC<MyProjectsProps> = ({ setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'ready' | 'draft'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter(p => {
      const matchSearch = p.name.includes(searchTerm) || p.sector.includes(searchTerm);
      const matchFilter = filterMode === 'all' ? true : p.status === filterMode;
      return matchSearch && matchFilter;
    });
  }, [searchTerm, filterMode]);

  return (
    <div dir="rtl" className="app-page-shell-wide min-h-screen pb-20 font-['IBM_Plex_Sans_Arabic'] animate-in fade-in duration-700">
      
      {/* Header Strip - Clean and Scannable */}
      <div className="pt-6 sm:pt-8 mb-6">
        <div className="surface-card flex flex-col items-start justify-between gap-5 p-4 sm:p-6 xl:flex-row xl:items-center">
           
           {/* Title Section */}
           <div className="flex items-center justify-between lg:justify-start w-full lg:w-auto">
              <div className="flex items-center gap-3 sm:gap-4">
                 <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
                   <Activity size={24} className="sm:w-7 sm:h-7" strokeWidth={2.5} />
                 </div>
                 <div>
                   <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-0.5 sm:mb-1 leading-none uppercase tracking-tight">مشاريعي</h1>
                   <p className="text-xs sm:text-sm font-bold text-slate-500">{MOCK_PROJECTS.length} خطط أعمال</p>
                 </div>
              </div>
              
              {/* Mobile View Toggle */}
              <div className="flex sm:hidden bg-slate-100 p-1 rounded-xl shrink-0">
                 <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg flex items-center justify-center transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>
                   <List size={16} strokeWidth={2.5} />
                 </button>
                 <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg flex items-center justify-center transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>
                   <LayoutGrid size={16} strokeWidth={2.5} />
                 </button>
              </div>
           </div>
           
           <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center xl:w-auto">
              {/* Desktop View Toggle */}
              <div className="hidden sm:flex bg-slate-100 p-1 rounded-xl shrink-0">
                 <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-lg flex items-center justify-center transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                   <List size={18} strokeWidth={2.5} />
                 </button>
                 <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-lg flex items-center justify-center transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                   <LayoutGrid size={18} strokeWidth={2.5} />
                 </button>
              </div>

              <div className="relative group w-full xl:min-w-[360px] 2xl:min-w-[420px]">
                 <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                 <input 
                   type="text" 
                   placeholder="ابحث عن مشروع..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full pr-11 pl-4 py-3 sm:py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm font-bold text-slate-800 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all"
                 />
              </div>
              <button 
                onClick={() => setActiveTab?.('new-plan')}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-black shadow-lg shadow-blue-200/50 flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all shrink-0">
                 <Plus size={18} strokeWidth={3} />
                 <span>مشروع جديد</span>
              </button>
           </div>
        </div>
      </div>

      {/* Content Container */}
      <div>
        {viewMode === 'list' ? (
          <div className="flex flex-col gap-3">
             {/* List Header (Desktop Only) */}
             <div className="hidden xl:flex items-center px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <div className="flex-[2] flex items-center">
                   <div className="w-[42px] shrink-0"></div> {/* Space for star icon */}
                   <div className="pl-4">المشروع / القطاع</div>
                </div>
                <div className="flex-[2] flex items-center">
                   <div className="flex-1 pr-2">التقدم</div>
                   <div className="flex-1 text-center">تقييم الذكاء الاصطناعي</div>
                </div>
                <div className="flex-[2] flex items-center">
                   <div className="flex-1 text-center">الحالة</div>
                   <div className="flex-1 text-left pl-4">الإجراءات</div>
                </div>
             </div>
             
             {/* List Items */}
             {filteredProjects.map(project => (
               <ProjectListRow key={project.id} project={project} setActiveTab={setActiveTab} />
             ))}

             <div 
               onClick={() => setActiveTab?.('new-plan')}
               className="border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center p-6 group hover:border-blue-400 transition-all cursor-pointer hover:bg-blue-50/30 gap-4 mt-2">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                   <Plus size={20} strokeWidth={3} />
                </div>
                <span className="text-sm font-black text-slate-400 group-hover:text-blue-600">إضافة مشروع جديد</span>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 sm:gap-6">
             {filteredProjects.map(project => (
               <ProjectGridCard key={project.id} project={project} setActiveTab={setActiveTab} />
             ))}
             
             <div 
               onClick={() => setActiveTab?.('new-plan')}
               className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 group hover:border-blue-400 transition-all cursor-pointer hover:bg-blue-50/30 min-h-[250px] sm:min-h-[300px]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all mb-4">
                   <Plus size={24} className="sm:w-7 sm:h-7" strokeWidth={3} />
                </div>
                <span className="text-xs sm:text-sm font-black text-slate-400 group-hover:text-blue-600">إضافة مشروع</span>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectListRow: React.FC<{ project: Project; setActiveTab?: (tab: string) => void }> = ({ project, setActiveTab }) => {
  const averageProgress = Math.round((project.progress.market + project.progress.product + project.progress.financial) / 3);
  
  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-4 relative overflow-hidden">
      
      {/* Row 1 on Mobile / Col 1 & 2 on Desktop */}
      <div className="flex items-center justify-between w-full md:w-auto md:flex-[2] mb-3 md:mb-0">
        
        {/* Favorite (Desktop only) */}
        <button className={`hidden md:block shrink-0 p-2 rounded-xl transition-all mr-0 ml-4 ${project.isFavorite ? 'text-amber-400 bg-amber-50' : 'text-slate-300 hover:text-amber-400 bg-slate-50'}`}>
           <Star size={18} fill={project.isFavorite ? 'currentColor' : 'none'} strokeWidth={2.5} />
        </button>

        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
           <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <LayoutGrid size={20} strokeWidth={2.5} className="w-5 h-5" />
           </div>
           <div className="min-w-0">
              <h3 className="text-sm font-black text-slate-900 mb-0.5 md:mb-1 group-hover:text-blue-600 transition-colors cursor-pointer truncate" onClick={() => setActiveTab?.('editor')}>
                {project.name}
              </h3>
              <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold text-slate-400 flex-wrap">
                 <span className="px-1.5 md:px-2 py-0.5 bg-slate-100 rounded text-slate-500 uppercase tracking-wider">{project.sector}</span>
                 <span className="hidden sm:inline">•</span>
                 <span className="flex items-center gap-1"><Clock size={10} /> <span className="hidden sm:inline">آخر تعديل</span> {project.lastEdited}</span>
              </div>
           </div>
        </div>

        {/* Favorite (Mobile only) */}
        <button className={`md:hidden shrink-0 p-2 rounded-xl transition-all ${project.isFavorite ? 'text-amber-400 bg-amber-50' : 'text-slate-300 hover:text-amber-400 bg-slate-50'}`}>
           <Star size={16} fill={project.isFavorite ? 'currentColor' : 'none'} strokeWidth={2.5} />
        </button>
      </div>

      {/* Row 2 on Mobile / Col 3 & 4 on Desktop */}
      <div className="grid grid-cols-2 md:flex w-full md:w-auto md:flex-[2] items-center gap-4 md:gap-0 mb-3 md:mb-0">
         {/* Progress Bar */}
         <div className="w-full md:flex-1 md:pr-2 lg:pr-6 md:pl-2">
            <div className="flex justify-between items-center text-[10px] font-black text-slate-400 mb-1.5 uppercase">
               <span>التقدم</span>
               <span className="text-slate-700">{averageProgress}%</span>
            </div>
            <div className="flex items-center gap-0.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-blue-600" style={{ width: `${project.progress.market / 3}%` }}></div>
               <div className="h-full bg-emerald-500" style={{ width: `${project.progress.product / 3}%` }}></div>
               <div className="h-full bg-amber-500" style={{ width: `${project.progress.financial / 3}%` }}></div>
            </div>
         </div>

         {/* AI Score */}
         <div className="w-full md:flex-1 flex justify-start md:justify-center items-center">
            <div className="flex items-center justify-center w-full md:w-auto gap-2 bg-blue-50/50 px-3 py-1.5 rounded-lg border border-blue-50 text-blue-700">
               <Activity size={14} className="text-blue-500" />
               <span className="text-xs md:text-sm font-black">{project.aiScore}%</span>
            </div>
         </div>
      </div>

      {/* Row 3 on Mobile / Col 5 & 6 on Desktop */}
      <div className="flex items-center justify-between md:justify-end w-full md:w-auto md:flex-[2] pt-3 md:pt-0 border-t border-slate-50 md:border-t-0 gap-2">
         {/* Status Badge */}
         <div className="md:flex-1 flex justify-start md:justify-center items-center">
           <div className={`flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold border ${project.status === 'ready' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : project.status === 'review' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
              {project.status === 'ready' ? <CheckCircle2 size={12} className="md:w-[14px] md:h-[14px]" /> : project.status === 'review' ? <Clock size={12} className="md:w-[14px] md:h-[14px]" /> : <TrendingUp size={12} className="md:w-[14px] md:h-[14px]" />}
              <span>{project.status === 'ready' ? 'جاهز' : project.status === 'review' ? 'مراجعة' : 'مسودة'}</span>
           </div>
         </div>

         {/* Actions */}
         <div className="md:flex-1 flex items-center justify-end gap-2">
            <div className="flex gap-1 md:opacity-0 md:-translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:flex">
               <ActionIcon icon={<Share2 size={14} />} color="slate" />
               <ActionIcon icon={<FileDown size={14} />} color="slate" />
            </div>
            <button 
              onClick={() => setActiveTab?.('editor')}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-blue-600 transition-colors flex items-center gap-2 shrink-0">
               <span>فتح</span>
               <ArrowRight size={14} className="rtl:rotate-180" />
            </button>
         </div>
      </div>
    </div>
  );
};

const ProjectGridCard: React.FC<{ project: Project; setActiveTab?: (tab: string) => void }> = ({ project, setActiveTab }) => {
  const averageProgress = Math.round((project.progress.market + project.progress.product + project.progress.financial) / 3);

  return (
    <div className="group bg-white border border-slate-100 rounded-3xl p-4 sm:p-5 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 relative flex flex-col h-full">
       
       {/* Card Header: Favorite & Menu */}
       <div className="flex justify-between items-start mb-4">
          <button className={`p-2 rounded-xl transition-all ${project.isFavorite ? 'text-amber-400 bg-amber-50' : 'text-slate-300 hover:text-amber-400 bg-slate-50'}`}>
             <Star size={16} fill={project.isFavorite ? 'currentColor' : 'none'} strokeWidth={2.5} />
          </button>
          <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border flex items-center gap-1 ${project.status === 'ready' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : project.status === 'review' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
             {project.status === 'ready' ? <CheckCircle2 size={12} /> : project.status === 'review' ? <Clock size={12} /> : <TrendingUp size={12} />}
             <span>{project.status === 'ready' ? 'جاهز' : project.status === 'review' ? 'مراجعة' : 'مسودة'}</span>
          </div>
       </div>

       {/* Icon & Details */}
       <div className="flex flex-col items-center text-center mb-5 sm:mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition-transform duration-300">
             <LayoutGrid size={24} className="sm:w-7 sm:h-7" strokeWidth={2} />
          </div>
          <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
            {project.name}
          </h3>
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase">
            {project.sector}
          </span>
       </div>

       {/* Stats Grid */}
       <div className="grid grid-cols-2 gap-2 mb-5 sm:mb-6">
          <div className="bg-slate-50 rounded-xl p-2 sm:p-2.5 text-center border border-slate-100">
             <span className="block text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase mb-1">التقدم</span>
             <span className="text-xs sm:text-sm font-black text-slate-700">{averageProgress}%</span>
          </div>
          <div className="bg-blue-50 rounded-xl p-2 sm:p-2.5 text-center border border-blue-100">
             <span className="block text-[8px] sm:text-[9px] font-bold text-blue-400 uppercase mb-1">تقييم AI</span>
             <span className="text-xs sm:text-sm font-black text-blue-700">{project.aiScore}%</span>
          </div>
       </div>

       {/* Action Buttons Hub */}
       <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-2">
          <button 
            onClick={() => setActiveTab?.('editor')}
            className="flex-1 py-2 sm:py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 hover:bg-blue-600 transition-colors">
             <span>فتح الخطة</span>
          </button>
          
          <div className="flex gap-1.5 shrink-0">
             <ActionIcon icon={<Share2 size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />} color="slate" />
             <ActionIcon icon={<FileDown size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />} color="slate" />
          </div>
       </div>
    </div>
  );
};

const ActionIcon = ({ icon, color }: { icon: React.ReactNode, color: string }) => {
  const styles: any = {
    blue: 'text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white',
    slate: 'text-slate-500 bg-slate-50 hover:bg-slate-800 hover:text-white border border-slate-100',
    red: 'text-red-600 bg-red-50 hover:bg-red-600 hover:text-white'
  };
  return (
    <button className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all ${styles[color]}`}>
       {icon}
    </button>
  );
};

