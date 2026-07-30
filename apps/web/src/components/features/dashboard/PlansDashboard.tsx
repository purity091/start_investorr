
import React, { useState } from 'react';
import { 
  Search, LayoutGrid, List, Plus, 
  MoreVertical, FileText, CheckCircle2, 
  Clock, TrendingUp, Archive, 
  Edit3, Eye, Briefcase, ChevronRight
} from 'lucide-react';

interface Plan {
  id: string;
  title: string;
  status: 'draft' | 'completed';
  progress: number;
  chapters: number;
  lastEdited: string;
  category: string;
}

const MOCK_PLANS: Plan[] = [
  { id: '1', title: 'خطة عمل eslam', status: 'completed', progress: 100, chapters: 7, lastEdited: 'منذ أسبوع', category: 'تقنية' },
  { id: '2', title: 'خطة عمل ورع', status: 'draft', progress: 0, chapters: 7, lastEdited: 'منذ 5 أيام', category: 'تجارة' },
  { id: '3', title: 'خطة عمل eslam eslam', status: 'draft', progress: 10, chapters: 6, lastEdited: 'منذ أسبوع', category: 'خدمات' },
  { id: '4', title: 'خطة عمل test2', status: 'completed', progress: 100, chapters: 6, lastEdited: 'منذ 3 أسابيع', category: 'صناعة' },
  { id: '5', title: 'خطة عمل qweqwe', status: 'draft', progress: 0, chapters: 6, lastEdited: 'منذ أسبوع', category: 'عقارات' },
  { id: '6', title: 'خطة عمل jdsj', status: 'draft', progress: 0, chapters: 6, lastEdited: 'منذ أسبوع', category: 'أخرى' },
];

export const PlansDashboard: React.FC<any> = (props) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 1. Statistics Summary - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {[
          { label: 'إجمالي الخطط', value: '47', icon: Archive, color: 'bg-primary-50 text-primary-600', trend: '+12%' },
          { label: 'خطط مكتملة', value: '12', icon: CheckCircle2, color: 'bg-success/10 text-success' },
          { label: 'قيد العمل', value: '35', icon: Clock, color: 'bg-amber-50 text-amber-600' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-xl font-bold text-gray-900 leading-none">{stat.value}</h3>
              </div>
            </div>
            {stat.trend && <span className="text-success font-bold text-[9px] bg-success/10 px-2 py-0.5 rounded-lg">{stat.trend}</span>}
          </div>
        ))}
      </div>

      {/* 2. Enhanced Compact Toolbar - Responsive Stack */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-3 bg-white/60 backdrop-blur-md p-2 rounded-2xl border border-gray-100 mb-6 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="ابحث عن خطة عمل..."
            className="w-full pr-10 pl-4 py-2.5 bg-white border border-gray-100 rounded-xl outline-none focus:border-primary-200 transition-all font-bold text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto">
          <div className="flex bg-gray-100/50 p-1 rounded-xl border border-gray-100">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-400'}`}><LayoutGrid size={16} /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-400'}`}><List size={16} /></button>
          </div>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all active:scale-95 shadow-md">
            <Plus size={16} strokeWidth={3} />
            <span>خطة جديدة</span>
          </button>
        </div>
      </div>

      {/* 3. Plans Layout - Optimized for Mobile */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-4">
          {MOCK_PLANS.map(plan => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-x-auto shadow-sm">
           <table className="w-full text-right text-xs min-w-[600px]">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">اسم الخطة</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">الحالة</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">الإنجاز</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_PLANS.map(plan => (
                <tr key={plan.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 font-bold text-gray-800">{plan.title}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${plan.status === 'completed' ? 'text-success border-success/20 bg-success/5' : 'text-amber-600 border-amber-200 bg-amber-50'}`}>{plan.status === 'completed' ? 'مكتمل' : 'مسودة'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">{plan.progress}%</span>
                  </td>
                  <td className="px-6 py-4 text-left">
                     <button className="p-2 text-gray-400 hover:text-primary-600 group-hover:scale-110 transition-transform"><Eye size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Compact Pagination */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-1.5">
          <button className="p-2 border border-gray-100 bg-white rounded-xl text-gray-400 hover:text-gray-900"><ChevronRight size={14} /></button>
          {[1, 2, 3].map(i => (
            <button key={i} className={`w-8 h-8 rounded-xl text-[10px] font-bold transition-all ${i === 1 ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-gray-400 border border-gray-100'}`}>
              {i}
            </button>
          ))}
          <button className="p-2 border border-gray-100 bg-white rounded-xl text-gray-400 hover:text-gray-900 rotate-180"><ChevronRight size={14} /></button>
        </div>
      </div>
    </div>
  );
};

const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => {
  const isCompleted = plan.status === 'completed';
  
  return (
    <div className="group relative bg-white border border-gray-100 rounded-3xl p-4 md:p-3.5 hover:shadow-xl hover:border-primary-100 transition-all duration-300 flex flex-col md:flex-row items-stretch md:items-center gap-4 overflow-hidden shadow-sm">
      
      {/* Visual status indicator - adapted for responsive stacking */}
      <div className={`absolute top-0 right-0 bottom-0 w-1 ${isCompleted ? 'bg-success' : 'bg-amber-400'} md:block hidden`}></div>
      <div className={`absolute top-0 right-0 left-0 h-1 ${isCompleted ? 'bg-success' : 'bg-amber-400'} md:hidden block`}></div>
      
      {/* 1. Branding & Header Segment */}
      <div className="flex flex-1 items-center gap-3.5 min-w-0">
        <div className={`w-12 h-12 md:w-11 md:h-11 rounded-2xl md:rounded-xl flex-shrink-0 flex items-center justify-center transition-all group-hover:rotate-3 group-hover:scale-105 ${isCompleted ? 'bg-success/10 text-success' : 'bg-amber-50 text-amber-600'}`}>
          <FileText size={24} className="md:w-5 md:h-5" strokeWidth={2.5} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h4 className="text-[15px] md:text-[14px] font-bold text-gray-900 truncate group-hover:text-primary-600 transition-colors leading-none">
              {plan.title}
            </h4>
            <span className={`text-[9px] md:text-[8px] font-bold px-2 py-0.5 rounded-lg md:rounded-md border ${
              isCompleted ? 'bg-success/5 text-success border-success/10' : 'bg-amber-50 text-amber-600 border-amber-100'
            }`}>
              {isCompleted ? 'مكتمل' : 'مسودة'}
            </span>
          </div>
          
          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-[10px] md:text-[9px] font-bold text-gray-400 uppercase tracking-wide">
             <div className="flex items-center gap-1.5">
                <Briefcase size={12} className="opacity-60 md:w-3 md:h-3" />
                <span>{plan.category}</span>
             </div>
             <div className="flex items-center gap-1.5">
                <Clock size={12} className="opacity-60 md:w-3 md:h-3" />
                <span>عدل {plan.lastEdited}</span>
             </div>
          </div>
        </div>

        {/* Mobile-only context menu trigger */}
        <button className="md:hidden p-2 text-gray-300">
           <MoreVertical size={20} />
        </button>
      </div>

      {/* 2. Progress Segment - Full width on mobile, compact on desktop */}
      <div className="flex items-center gap-4 md:gap-6 border-t md:border-t-0 md:border-r border-gray-50 pt-3 md:pt-0 md:pr-4">
        <div className="flex flex-col flex-1 md:flex-none items-end gap-1.5 md:min-w-[110px]">
           <div className="flex justify-between w-full px-0.5">
              <span className="text-[9px] md:text-[8px] font-bold text-gray-300 uppercase">معدل الإنجاز</span>
              <span className={`text-[11px] md:text-[10px] font-bold ${isCompleted ? 'text-success' : 'text-gray-800'}`}>{plan.progress}%</span>
           </div>
           <div className="w-full h-1.5 md:h-1 bg-gray-50 rounded-full overflow-hidden border border-gray-100/50 shadow-inner">
              <div 
                className={`h-full transition-all duration-1000 ${isCompleted ? 'bg-success' : 'bg-amber-400'} relative`}
                style={{ width: `${plan.progress}%` }}
              >
                {isCompleted && <div className="absolute inset-0 bg-white/20 animate-pulse"></div>}
              </div>
           </div>
        </div>
        
        <div className="hidden lg:flex flex-col items-center">
          <span className="text-[8px] font-bold text-gray-300 uppercase">الفصول</span>
          <span className="text-[12px] font-bold text-gray-700">{plan.chapters}</span>
        </div>
      </div>

      {/* 3. Action Buttons - Stacked on Mobile, Row on Desktop */}
      <div className="flex items-center gap-2 mt-1 md:mt-0">
        <button className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 md:px-4 md:py-2 text-white rounded-2xl md:rounded-xl text-[12px] md:text-[10px] font-bold shadow-lg transition-all active:scale-95 active:shadow-inner ${
          isCompleted 
            ? 'bg-success hover:bg-success/90 shadow-success/10' 
            : 'bg-amber-400 hover:bg-amber-500 shadow-amber-50'
        }`}>
          <Eye size={16} className="md:w-4 md:h-4" strokeWidth={3} />
          <span>فتح المشروع</span>
        </button>
        
        <button className="p-3 md:p-2 bg-white border border-gray-100 text-gray-400 rounded-2xl md:rounded-xl hover:text-primary-600 hover:border-primary-100 hover:bg-primary-50 transition-all active:scale-90">
          <Edit3 size={18} className="md:w-4 md:h-4" strokeWidth={2.5} />
        </button>
        
        <button className="hidden md:flex p-1.5 text-gray-300 hover:text-gray-900 transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>
      
      {/* Subtle Gradient Hover Backdrop (Desktop only) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary-50/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none md:block hidden"></div>
    </div>
  );
};
