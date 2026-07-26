
import React from 'react';
import { 
  Menu, Bell, Settings as SettingsIcon, ChevronLeft, 
  Home as HomeIcon, Compass, Zap, User as UserIcon, 
  Briefcase, CreditCard, LogOut, Sparkles, Clock3, Check, Crown
} from 'lucide-react';
import { User } from '../../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  subTabLabel?: string | null;
  setSubTabLabel?: (label: string | null) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isTourRunning: boolean;
  setIsTourRunning: (running: boolean) => void;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  notificationRef: React.RefObject<HTMLDivElement>;
  profileRef: React.RefObject<HTMLDivElement>;
  user: User;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  subTabLabel,
  setSubTabLabel,
  isNotificationsOpen,
  setIsNotificationsOpen,
  isProfileOpen,
  setIsProfileOpen,
  setIsTourRunning,
  setIsSidebarCollapsed,
  setIsMobileMenuOpen,
  notificationRef,
  profileRef,
  user
}) => {
  const notifications = [
    { 
      id: 1, 
      type: 'ai', 
      priority: 'high',
      title: 'تحليل SWOT جـاهز', 
      msg: 'أكمل الذكاء الاصطناعي تحليل نقاط القوة والضعف لمشروعك الاستراتيجي. يمكنك الآن مراجعة النتائج.', 
      time: 'منذ 5 دقائق', 
      icon: Sparkles, 
      color: 'text-purple-600 bg-purple-50',
      action: 'مراجعة التحليل'
    },
    { 
      id: 2, 
      type: 'task', 
      priority: 'urgent',
      title: 'مهمة قريبة الموعد', 
      msg: 'بقي أقل من 24 ساعة على الموعد النهائي لتسليم خطة التسويق الرقمي.', 
      time: 'منذ ساعة', 
      icon: Clock3, 
      color: 'text-amber-600 bg-amber-50',
      action: 'انتقل للمهام'
    },
    { 
      id: 3, 
      type: 'system', 
      priority: 'low',
      title: 'تجديد اشتراك PRO', 
      msg: 'تم تجديد اشتراكك السنوي بنجاح؛ استمتع بكامل ميزات المنصة والذكاء الاصطناعي.', 
      time: 'منذ يوم', 
      icon: Check, 
      color: 'text-emerald-600 bg-emerald-50',
      action: 'تفاصيل الفاتورة'
    },
  ];

  return (
    <div className="ui-header-surface sticky top-0 z-40 flex w-full max-w-full items-center justify-between px-3 py-2 sm:px-4 sm:py-3 md:px-6 lg:px-12">
       <div className="flex items-center gap-2 sm:gap-3 lg:gap-6">
          {/* Mobile Back Button / Hamburger Toggle */}
          {['editor', 'brand-identity', 'site-map'].includes(activeTab) ? (
            <button
              onClick={() => setActiveTab('home')}
              className="lg:hidden p-2 text-primary-600 bg-primary-50 rounded-xl hover:bg-primary-100 transition-all shrink-0"
              aria-label="العودة للرئيسية"
            >
              <ChevronLeft size={20} className="rotate-180" />
            </button>
          ) : (
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-600 rounded-xl hover:bg-gray-50 transition-all shrink-0"
              aria-label="فتح القائمة"
            >
              <Menu size={20} />
            </button>
          )}

          {/* Mobile Logo / Home Trigger */}
          <button 
            onClick={() => setActiveTab('home')}
            className="lg:hidden flex items-center group active:scale-95 transition-all"
          >
            <div className="w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
              <Sparkles size={20} />
            </div>
          </button>

          {/* Dynamic Breadcrumb UI */}
          <nav className="hidden sm:flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10.5px] font-bold group">
             <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-1.5 sm:gap-2 text-gray-400 hover:text-primary-600 transition-colors p-1.5 sm:p-0"
             >
                <HomeIcon size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">الرئيسية</span>
             </button>

             {activeTab !== 'home' && (
               <>
                <ChevronLeft size={10} className="text-gray-300 w-3 h-3 sm:w-4 sm:h-4" />
                
                {(activeTab.includes('-dashboard') || activeTab === 'seo-content-marketing' || activeTab === 'agritech') && 
                  activeTab !== 'admin-dashboard' && activeTab !== 'strategic-dashboard' && (
                  <>
                    <button 
                      onClick={() => setActiveTab('market-discovery')}
                      className="text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      اكتشاف السوق
                    </button>
                    <ChevronLeft size={10} className="text-gray-300 w-3 h-3 sm:w-4 sm:h-4" />
                  </>
                )}

                <button 
                  onClick={() => {
                    setActiveTab(activeTab);
                    if (setSubTabLabel) setSubTabLabel(null);
                  }}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-1.5 border rounded-full transition-all duration-500 max-w-[180px] sm:max-w-none truncate ${
                    subTabLabel 
                      ? 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-900 active:scale-95' 
                      : 'bg-gray-50 border-gray-100 text-gray-700'
                  }`}
                >
                   <span className={`w-1 h-1 rounded-full flex-shrink-0 ${subTabLabel ? 'bg-slate-300' : 'bg-primary-500'}`}></span>
                   <span className="truncate">
                     {activeTab === 'market-discovery' && 'اكتشاف السوق'}
                     {activeTab === 'workspace' && 'مساحة المشروع'}
                     {(activeTab === 'subscriber-hub' || activeTab === 'customer-dashboard') && 'بوابة العميل'}
                     {activeTab === 'customer-projects' && 'مشاريع العميل'}
                     {activeTab === 'customer-subscription' && 'الاشتراك والفوترة'}
                     {activeTab === 'customer-usage' && 'الاستخدام والصلاحيات'}
                     {activeTab === 'customer-activity' && 'النشاط والتنبيهات'}
                     {activeTab === 'customer-account' && 'الحساب والهوية'}
                     {activeTab === 'customer-support' && 'الدعم والطلبات'}
                     {activeTab === 'profile' && 'الملف الشخصي'}
                     {activeTab === 'settings' && 'إعدادات الحساب'}
                     {activeTab === 'pricing' && 'الاشتراكات'}
                     {activeTab === 'my-plans' && 'مشاريعي'}
                     {activeTab === 'new-plan' && 'خلق فكرة'}
                     {activeTab === 'unicorn-benchmark' && 'رادار اليونيكورن'}
                     {activeTab.includes('dashboard') && activeTab.replace('-dashboard', '').replace(/-/g, ' ')}
                     {activeTab === 'strategic-dashboard' && 'النبض الاستراتيجي'}
                     {activeTab === 'admin-dashboard' && 'لوحة الإدارة'}
                     {activeTab === 'contact-us' && 'اتصل بنا'}
                   </span>
                </button>

                {subTabLabel && (
                   <>
                     <ChevronLeft size={10} className="text-gray-300 w-3 h-3 sm:w-4 sm:h-4" />
                     <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-1.5 bg-primary-50 border border-primary-100 rounded-full text-primary-700 animate-in fade-in slide-in-from-right-2 duration-500 max-w-[150px] sm:max-w-none truncate">
                        <span className="w-1 h-1 bg-primary-500 rounded-full flex-shrink-0 animate-pulse"></span>
                        <span className="truncate font-black">{subTabLabel}</span>
                     </div>
                   </>
                 )}
               </>
             )}
          </nav>
       </div>
       
       <div className="flex items-center gap-2 sm:gap-4">
          {/* Tour Trigger */}
          <button
            id="tour-site-tour-trigger-header"
            onClick={() => { setIsTourRunning(true); setIsSidebarCollapsed(false); }}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all group border border-indigo-100/50 active:scale-95"
          >
            <Compass size={18} className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] font-black hidden sm:inline">جولة تعريفية</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsProfileOpen(false); }}
              className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all relative active:scale-95 ${isNotificationsOpen ? 'bg-primary-50 text-primary-600' : 'text-gray-400 hover:bg-gray-100'}`}
            >
              <Bell size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {isNotificationsOpen && (
              <div className="fixed sm:absolute top-[70px] sm:top-auto sm:mt-4 left-4 right-4 sm:left-0 sm:right-auto sm:w-[380px] bg-white border border-slate-100 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-[100] animate-in fade-in slide-in-from-top-4 duration-500 overflow-hidden rtl text-right">
                <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div>
                    <h3 className="font-black text-base sm:text-lg text-slate-900 leading-none">مركز التنبيهات</h3>
                    <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider sm:tracking-widest">3 تنبيهات غير مقروءة</p>
                  </div>
                  <button className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <SettingsIcon size={14} className="text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="max-h-[50vh] sm:max-h-[460px] overflow-y-auto no-scrollbar py-2">
                   {notifications.map((notif) => (
                    <div key={notif.id} className="mx-2 sm:mx-3 my-1 p-3 sm:p-4 flex gap-3 sm:gap-4 hover:bg-slate-50/80 rounded-[1.5rem] sm:rounded-[1.8rem] transition-all cursor-pointer border border-transparent hover:border-slate-100 group">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${notif.color} group-hover:shadow-current/5`}>
                        <notif.icon size={18} strokeWidth={2.5} className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[12px] sm:text-[13px] font-black text-slate-900">{notif.title}</h4>
                        <p className="text-[11px] sm:text-[12px] text-slate-500 line-clamp-2 leading-relaxed font-medium mb-2">{notif.msg}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationsOpen(false); }}
              className={`flex items-center justify-center gap-2 sm:gap-3 p-0.5 sm:p-1 pr-0.5 sm:pr-3 border border-gray-100 rounded-full transition-all group active:scale-95 ${isProfileOpen ? 'bg-primary-50 border-primary-100' : 'hover:bg-gray-50'}`}
            >
              <span className={`text-[10px] sm:text-[11px] font-black transition-colors hidden sm:inline ${isProfileOpen ? 'text-primary-700' : 'text-gray-500'}`}>{user.name}</span>
              <img src={user.avatar} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white shadow-sm" alt="Profile" />
            </button>

            {isProfileOpen && (
              <div className="fixed sm:absolute top-[70px] sm:top-auto sm:mt-3 left-4 right-4 sm:left-0 sm:right-auto sm:w-72 bg-white border border-gray-100 rounded-[2rem] shadow-2xl z-[100] animate-in fade-in slide-in-from-top-2 duration-300 overflow-hidden rtl text-right">
                 <div className="p-4 sm:p-5 bg-slate-50 border-b border-gray-100">
                    <div className="flex items-center gap-3 sm:gap-4 mb-3">
                       <img src={user.avatar} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border-2 border-white shadow-sm" alt="Avatar" />
                       <div className="min-w-0">
                           <h4 className="font-black text-xs sm:text-sm text-gray-900 truncate">{user.name}</h4>
                           <p className="text-[9px] sm:text-[10px] text-gray-400 truncate">{user.email}</p>
                       </div>
                    </div>
                 </div>

                 <div className="p-2 sm:p-3 py-3 sm:py-4">
                    <button onClick={() => { setIsProfileOpen(false); setActiveTab('profile'); }} className="w-full flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-[12px] font-bold text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-all group">
                       <UserIcon size={14} className="group-hover:scale-110 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
                       <span>ملفي الشخصي</span>
                    </button>
                    <button onClick={() => { setIsProfileOpen(false); setActiveTab('my-plans'); }} className="w-full flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-[12px] font-bold text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-all group">
                       <Briefcase size={14} className="group-hover:scale-110 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
                       <span>مشاريعي</span>
                    </button>
                    <button onClick={() => { setIsProfileOpen(false); setActiveTab('customer-dashboard'); }} className="w-full flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-[12px] font-bold text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-all group">
                       <Crown size={14} className="group-hover:scale-110 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
                       <span>بوابة العميل</span>
                    </button>
                    <div className="h-px bg-gray-50 my-2 sm:my-3 mx-3 sm:mx-4"></div>
                    <button className="w-full flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-[12px] font-bold text-red-500 hover:bg-red-50 transition-all group">
                       <LogOut size={14} className="group-hover:translate-x-[-2px] transition-transform w-4 h-4 sm:w-5 sm:h-5" />
                       <span>تسجيل الخروج</span>
                    </button>
                 </div>
              </div>
            )}
          </div>
       </div>
    </div>
  );
};
