import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Settings, PieChart, 
  Folder, Bell, Shield, ChevronLeft, LogOut, Search
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

const SIDEBAR_STRUCTURE: SidebarGroup[] = [
  {
    title: 'الرئيسية',
    items: [
      { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
      { id: 'analytics', label: 'التحليلات والمقاييس', icon: PieChart, badge: 'جديد' },
    ]
  },
  {
    title: 'الإدارة',
    items: [
      { id: 'projects', label: 'المشاريع والمهام', icon: Folder },
      { id: 'users', label: 'المستخدمين والصلاحيات', icon: Users, badge: '3' },
      { id: 'security', label: 'سجل الأمان', icon: Shield },
    ]
  },
  {
    title: 'النظام',
    items: [
      { id: 'notifications', label: 'الإشعارات', icon: Bell },
      { id: 'settings', label: 'الإعدادات العامة', icon: Settings },
    ]
  }
];

export const ModernSidebarSkeleton: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('dashboard');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <aside 
      className={`relative h-screen flex flex-col transition-all duration-500 ease-in-out bg-slate-950 border-l border-slate-800/50 shadow-2xl ${
        isCollapsed ? 'w-24' : 'w-72'
      }`}
      dir="rtl"
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-4 top-10 w-8 h-8 bg-slate-800 border-2 border-slate-950 text-slate-300 rounded-full flex items-center justify-center hover:bg-slate-700 hover:text-white hover:scale-110 transition-all z-50 shadow-md"
      >
        <ChevronLeft size={16} className={`transition-transform duration-500 ${isCollapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Header / Logo Space */}
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'} border-b border-slate-800/50`}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 flex-shrink-0">
           <Shield size={20} className="text-white" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col animate-in fade-in duration-300">
             <h2 className="text-lg font-bold text-white tracking-wide">المنصة الإدارية</h2>
             <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">v2.0.1 Enterprise</p>
          </div>
        )}
      </div>

      {/* Quick Search Space */}
      {!isCollapsed && (
        <div className="px-6 py-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-2.5 flex items-center gap-3 group focus-within:bg-slate-900 focus-within:border-indigo-500/50 transition-colors cursor-text">
             <Search size={16} className="text-slate-500 group-focus-within:text-indigo-400" />
             <span className="text-xs text-slate-500 font-medium">بحث سريع (Ctrl+K)...</span>
          </div>
        </div>
      )}

      {/* Navigation Space */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6 no-scrollbar">
        {SIDEBAR_STRUCTURE.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-2">
             {!isCollapsed ? (
               <h3 className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                 {group.title}
               </h3>
             ) : (
               <div className="flex justify-center mb-3">
                 <div className="w-6 h-px bg-slate-800"></div>
               </div>
             )}

             <ul className="space-y-1.5">
               {group.items.map((item) => {
                 const isActive = activeItem === item.id;
                 return (
                   <li key={item.id}>
                     <button
                       onClick={() => setActiveItem(item.id)}
                       className={`w-full flex items-center ${isCollapsed ? 'justify-center p-0 h-12' : 'gap-3 px-4 py-3'} rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                         isActive 
                           ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[inset_0_0_20px_rgba(99,102,241,0.05)]' 
                           : 'text-slate-400 border border-transparent hover:bg-slate-800/40 hover:text-slate-200'
                       }`}
                     >
                        {/* Active Indicator Glow */}
                        {isActive && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-indigo-500 rounded-l-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                        )}

                        <item.icon 
                          size={isCollapsed ? 22 : 18} 
                          className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'} ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} 
                        />
                        
                        {!isCollapsed && (
                          <span className={`flex-1 text-right transition-transform duration-300 ${isActive ? 'translate-x-[-2px]' : 'group-hover:translate-x-[-4px]'}`}>
                            {item.label}
                          </span>
                        )}

                        {!isCollapsed && item.badge && (
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                            isActive 
                              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20' 
                              : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                          }`}>
                            {item.badge}
                          </span>
                        )}

                        {/* Collapsed Tooltip (Mock Representation) */}
                        {isCollapsed && (
                          <div className="absolute right-full mr-4 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 whitespace-nowrap shadow-xl">
                            {item.label}
                          </div>
                        )}
                     </button>
                   </li>
                 );
               })}
             </ul>
          </div>
        ))}
      </nav>

      {/* Footer Profile Space */}
      <div className={`p-4 border-t border-slate-800/50 mt-auto bg-slate-900/30`}>
        <div className={`p-3 rounded-2xl flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} border border-slate-800 bg-slate-900 hover:bg-slate-800 hover:border-slate-700 cursor-pointer transition-all group`}>
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden flex-shrink-0 border border-slate-600 group-hover:border-indigo-500 transition-colors">
                 <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin" alt="Admin" className="w-full h-full object-cover" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-200">المدير العام</span>
                  <span className="text-[10px] text-slate-500 group-hover:text-slate-400">admin@system.com</span>
                </div>
              )}
           </div>
           
           {!isCollapsed && (
             <button className="text-slate-500 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-rose-400/10">
               <LogOut size={16} />
             </button>
           )}
        </div>
      </div>

    </aside>
  );
};
