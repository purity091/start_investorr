
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Zap, 
  Clock, 
  CreditCard, 
  Settings, 
  Globe, 
  Bell, 
  Camera,
  ChevronLeft,
  KeyRound,
  CheckCircle2,
  Briefcase,
  Target
} from 'lucide-react';

interface ProfileProps {
  user: {
    name: string;
    email: string;
    avatar: string;
    credits: number;
    totalCredits: number;
  };
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [activeSubTab, setActiveSubTab] = useState<'general' | 'security' | 'billing'>('general');

  const stats = [
    { label: 'الخطط المنجزة', value: '14', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'معدل جودة AI', value: '92%', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'ساعات العمل', value: '120h', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <div className="app-page-shell-wide animate-in fade-in slide-in-from-bottom-4 duration-700" dir="rtl">
      
      {/* 1. IDENTITY HEADER */}
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-emerald-500/10 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
        <div className="surface-card relative flex flex-col items-center gap-8 rounded-[1.75rem] p-8 md:flex-row">
          
          {/* Avatar Area */}
          <div className="relative">
            <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl relative group/avatar">
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover transition-transform group-hover/avatar:scale-110 duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera className="text-white" size={24} />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-white">
              <ShieldCheck size={20} />
            </div>
          </div>

          {/* Info Area */}
          <div className="flex-1 text-center md:text-right space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user.name}</h1>
              <span className="bg-indigo-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg shadow-indigo-100 uppercase tracking-widest">PRO Member</span>
            </div>
            <p className="text-slate-500 font-bold flex items-center justify-center md:justify-start gap-2 text-sm opacity-80">
              <Mail size={14} className="text-indigo-400" />
              {user.email}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
              <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-black text-slate-600 uppercase tracking-tighter">
                <Globe size={12} className="text-blue-500" />
                المنطقة: الشرق الأوسط
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-black text-slate-600 uppercase tracking-tighter">
                <Zap size={12} className="text-emerald-500" />
                رصيد الذكاء: {user.credits}/{user.totalCredits}
              </span>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="hidden lg:flex items-center gap-4 bg-emerald-50/50 border border-emerald-100 p-4 rounded-3xl">
             <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <CheckCircle2 className="text-emerald-600" size={20} />
             </div>
             <div>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Account Verified</p>
                <p className="text-xs font-bold text-slate-600">هويتك مؤكدة بنسبة 100%</p>
             </div>
          </div>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="mb-8 grid grid-cols-1 gap-4 xl:grid-cols-3 md:grid-cols-2">
        {stats.map((stat, i) => (
          <div key={i} className="surface-card relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-0.5">
            <div className={`absolute top-0 right-0 w-full h-1 bg-gradient-to-l ${stat.color === 'text-indigo-600' ? 'from-indigo-500' : 'from-emerald-500'} to-transparent opacity-0 group-hover:opacity-20 transition-opacity`}></div>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner`}>
                <stat.icon size={24} strokeWidth={2.5} />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900 leading-none">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. MAIN CONTENT TABS */}
      <div className="surface-card min-h-[500px] rounded-[1.75rem] p-4 lg:p-6">
        {/* Navigation Sub-Tabs */}
        <div className="surface-toolbar mb-8 flex items-center gap-2 overflow-x-auto p-1.5 no-scrollbar">
          {[
            { id: 'general', label: 'البيانات الأساسية', icon: User },
            { id: 'security', label: 'الأمان والخصوصية', icon: KeyRound },
            { id: 'billing', label: 'الاشتراك والفوترة', icon: CreditCard }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${
                activeSubTab === tab.id 
                  ? 'bg-white text-indigo-600 shadow-xl shadow-indigo-100 border border-indigo-50' 
                  : 'text-slate-400 hover:bg-white/50 hover:text-slate-600'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="px-2 lg:px-6">
          {activeSubTab === 'general' && (
            <div className="grid grid-cols-1 gap-10 2xl:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)] xl:grid-cols-2 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-6">
                <div>
                   <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                      البيانات الشخصية
                      <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
                   </h3>
                   <div className="space-y-4">
                      <div className="group">
                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 mr-1">الاسم الكامل</label>
                        <input 
                          type="text" 
                          defaultValue={user.name} 
                          className="w-full bg-slate-50/50 border border-slate-100 p-4 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 mr-1">البريد الإلكتروني</label>
                        <input 
                          type="email" 
                          defaultValue={user.email} 
                          disabled
                          className="w-full bg-slate-100/50 border border-slate-100 p-4 rounded-2xl text-sm font-bold text-slate-400 cursor-not-allowed italic"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 mr-1">رقم الهاتف</label>
                        <input 
                          type="text" 
                          placeholder="+966 5X XXX XXXX"
                          className="w-full bg-slate-50/50 border border-slate-100 p-4 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                        />
                      </div>
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                 <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                      تفضيلات المنصة
                      <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                 </h3>
                 <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 space-y-6">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                             <Bell size={16} />
                          </div>
                          <div>
                             <p className="text-xs font-black text-slate-800">التنبيهات الذكية</p>
                             <p className="text-[10px] text-slate-500 font-bold">تلقي تحديثات دورية عن مشاريعك</p>
                          </div>
                       </div>
                       <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner">
                          <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all translate-x-5"></div>
                       </div>
                    </div>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                             <Zap size={16} />
                          </div>
                          <div>
                             <p className="text-xs font-black text-slate-800">وضع التوفير (Lite Mode)</p>
                             <p className="text-[10px] text-slate-500 font-bold">تقليل استهلاك البيانات</p>
                          </div>
                       </div>
                       <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                          <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all"></div>
                       </div>
                    </div>
                 </div>
                 
                 <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black shadow-xl shadow-indigo-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                    حفظ التغييرات
                    <ChevronLeft size={16} />
                 </button>
              </div>
            </div>
          )}

          {activeSubTab === 'security' && (
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-left-4 duration-500 text-right">
              <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-start gap-4">
                 <ShieldCheck className="text-rose-600 shrink-0" size={24} />
                 <div>
                    <p className="text-xs font-black text-rose-700 mb-1 tracking-tight">حماية حسابك في أمان</p>
                    <p className="text-[10px] text-rose-600 font-bold opacity-80">آخر تغيير لكلمة المرور كان منذ 3 أشهر. ننصح بتغييرها دورياً.</p>
                 </div>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 mr-1">كلمة المرور الحالية</label>
                  <div className="relative">
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm font-bold text-slate-800" />
                    <KeyRound className="absolute left-4 top-4 text-slate-300" size={18} />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 mr-1">كلمة المرور الجديدة</label>
                  <div className="relative">
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm font-bold text-slate-800" />
                    <KeyRound className="absolute left-4 top-4 text-slate-300" size={18} />
                  </div>
                </div>
                <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-rose-600 transition-colors shadow-lg">تحديث الأمان</button>
              </div>
            </div>
          )}

          {activeSubTab === 'billing' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-gradient-to-br from-slate-900 to-indigo-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                     <div className="space-y-4 text-center md:text-right">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                           <Zap size={14} className="text-emerald-400" />
                           <span className="text-[10px] font-black tracking-widest uppercase">Current Subscription</span>
                        </div>
                        <h3 className="text-3xl font-black italic">باقة المحترفين PRO</h3>
                        <p className="text-sm opacity-60 font-bold">يتم تجديد اشتراكك تلقائياً في 15 مايو 2025</p>
                     </div>
                     <div className="flex flex-col items-center gap-2">
                        <div className="text-4xl font-black">$49<span className="text-sm font-bold opacity-50 block">شهرياً</span></div>
                        <button className="px-6 py-2 bg-white text-indigo-900 rounded-xl text-xs font-black hover:bg-indigo-50 transition-all">إدارة الاشتراك</button>
                     </div>
                  </div>
               </div>

               <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden">
                  <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                     <h4 className="text-sm font-black text-slate-800">سجل الفواتير</h4>
                     <CreditCard size={18} className="text-slate-400" />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-right">
                      <thead>
                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <th className="px-6 py-4">رقم الفاتورة</th>
                          <th className="px-6 py-4">التاريخ</th>
                          <th className="px-6 py-4">المبلغ</th>
                          <th className="px-6 py-4">الحالة</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-bold text-slate-600 uppercase tracking-tighter">
                        <tr className="border-t border-slate-50 hover:bg-slate-50/50 transition-all">
                          <td className="px-6 py-4">#INV-8821</td>
                          <td className="px-6 py-4">15 مارس 2025</td>
                          <td className="px-6 py-4">$49.00</td>
                          <td className="px-6 py-4"><span className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg border border-emerald-100">PAID</span></td>
                        </tr>
                        <tr className="border-t border-slate-50 hover:bg-slate-50/50 transition-all">
                          <td className="px-6 py-4">#INV-7712</td>
                          <td className="px-6 py-4">15 فبراير 2025</td>
                          <td className="px-6 py-4">$49.00</td>
                          <td className="px-6 py-4"><span className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg border border-emerald-100">PAID</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
