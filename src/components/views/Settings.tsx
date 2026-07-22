
import React, { useState } from 'react';
import { 
  User, Shield, CreditCard, Receipt, 
  ExternalLink, Save, Camera, CheckCircle2, 
  AlertCircle, Mail, Briefcase, MapPin, 
  Fingerprint, Key, Globe, ShieldCheck,
  Layout, Sparkles, Pencil, Lock,
  Smartphone, History, Plus, Download,
  CreditCard as CardIcon, CreditCard as VisaIcon,
  Search, Filter
} from 'lucide-react';
import { User as UserType } from '../../types';

interface SettingsProps {
  user: UserType;
}

export const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'security' | 'billing' | 'subscription' | 'invoices'>('profile');
  const [isSaving, setIsSaving] = useState(false);

  const menuItems = [
    { id: 'profile', label: 'الملف الشخصي', icon: User, group: 'الإعدادات' },
    { id: 'security', label: 'الأمان والخصوصية', icon: Shield, group: 'الإعدادات' },
    { id: 'billing', label: 'طرق الدفع', icon: CreditCard, group: 'الفوترة' },
    { id: 'subscription', label: 'اشتراكي الحالي', icon: Receipt, group: 'الفوترة' },
    { id: 'invoices', label: 'سجل الفواتير', icon: ExternalLink, group: 'الفوترة' },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  return (
    <div className="app-page-shell-wide flex w-full flex-col gap-8 py-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 overflow-x-hidden xl:flex-row">
      {/* Sidebar Navigation - Fixed on desktop, Tabs on mobile */}
      <aside className="w-full lg:w-72 flex-shrink-0">
        <div className="lg:sticky lg:top-24 space-y-4">
          <div className="surface-card overflow-x-auto p-2 sm:p-3 no-scrollbar lg:overflow-visible">
            <div className="flex lg:flex-col min-w-max lg:min-w-0">
              {['الإعدادات', 'الفوترة'].map((group) => (
                <div key={group} className="flex lg:flex-col lg:mb-6 last:mb-0">
                  <h3 className="hidden lg:block px-5 py-3 text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">{group}</h3>
                  <div className="flex lg:flex-col gap-1 p-1">
                    {menuItems.filter(item => item.group === group).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSubTab(item.id as any)}
                        className={`flex items-center gap-3 lg:gap-4 px-4 lg:px-5 py-2.5 lg:py-3.5 rounded-xl lg:rounded-2xl text-[11px] lg:text-[13px] font-black transition-all duration-300 group whitespace-nowrap ${
                          activeSubTab === item.id 
                            ? 'bg-primary-600 text-white shadow-xl shadow-primary-200 lg:translate-x-[-4px]' 
                            : 'text-gray-500 hover:bg-gray-50 hover:text-primary-600'
                        }`}
                      >
                        <item.icon size={16} className={`lg:w-[18px] lg:h-[18px] ${activeSubTab === item.id ? 'text-white' : 'text-gray-300 group-hover:text-primary-600'} transition-colors`} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Health Card - Hidden on very small screens, visible on LG */}
          <div className="hidden lg:block surface-card rounded-[1.75rem] p-6 relative overflow-hidden group bg-[linear-gradient(180deg,#0f172a_0%,#1e293b_100%)] text-white">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={20} className="text-white/80" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">أمان الحساب</span>
              </div>
              <h4 className="text-xl font-bold mb-1">ممتاز جداً</h4>
              <p className="text-white/70 text-[11px] font-bold mb-4">لقد قمت بتفعيل كافة تدابير الحماية الموصى بها.</p>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[92%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Form Area */}
      <div className="flex-1">
        <div className="surface-card overflow-hidden rounded-[1.75rem]">
          
          {activeSubTab === 'profile' && (
            <div className="flex flex-col">
              {/* Profile Cover & Avatar Section */}
              <div className="relative h-40 sm:h-48 bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-700">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 sm:left-auto sm:right-10 sm:translate-x-0 flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
                  <div className="relative group">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[2.5rem] sm:rounded-[2.8rem] bg-white p-1 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                      <div className="w-full h-full rounded-[2rem] sm:rounded-[2.3rem] bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden border border-gray-100">
                        <img src={user.avatar} className="w-full h-full object-cover" alt="Avatar" />
                      </div>
                    </div>
                    <button className="absolute bottom-0 left-0 p-2.5 sm:p-3 bg-primary-600 text-white rounded-xl sm:rounded-2xl shadow-xl hover:bg-primary-700 transition-all border-4 border-white">
                      <Camera size={16} sm:size={18} strokeWidth={3} />
                    </button>
                  </div>
                  <div className="pb-4 text-center sm:text-right">
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-none mb-3 sm:mb-2">{user.name}</h2>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
                      <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                        <Globe size={12} className="text-primary-500" />
                        الرياض، السعودية
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-black text-success bg-success/10 px-3 py-1.5 rounded-full border border-success/20 uppercase tracking-widest">مستخدم موثق</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacing for Avatar */}
              <div className="h-24 sm:h-20"></div>

              {/* Form Content */}
              <div className="p-6 sm:p-10 space-y-12">
                {/* Section 1: Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="md:col-span-2 flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                      <User size={20} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-base font-black text-gray-800 tracking-tight">المعلومات الشخصية</h3>
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                      الاسم الكامل
                      <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary-500 transition-colors" size={18} />
                      <input 
                        type="text" 
                        defaultValue={user.name}
                        className="w-full pr-12 pl-5 py-4 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] focus:bg-white focus:border-primary-500 focus:ring-8 focus:ring-primary-50 outline-none transition-all font-bold text-gray-700 shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                      البريد الإلكتروني الأساسي
                    </label>
                    <div className="relative">
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary-500 transition-colors" size={18} />
                      <input 
                        type="email" 
                        defaultValue={user.email}
                        className="w-full pr-12 pl-5 py-4 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] focus:bg-white focus:border-primary-500 focus:ring-8 focus:ring-primary-50 outline-none transition-all font-bold text-gray-700 shadow-inner"
                      />
                    </div>
                  </div>
                </div>
              </div>

               {/* Sticky Footer Action Bar */}
               <div className="p-6 sm:p-8 bg-gray-50/80 backdrop-blur-md border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-5 sm:gap-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-8 h-8 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0">
                    <CheckCircle2 size={16} strokeWidth={3} />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest leading-relaxed">تتم مزامنة كافة التغييرات بشكل آمن</span>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`w-full sm:w-auto flex items-center justify-center gap-3 px-10 sm:px-12 py-3.5 sm:py-4 rounded-xl sm:rounded-[1.5rem] text-sm font-black transition-all shadow-2xl active:scale-95 ${
                      isSaving 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed translate-y-1' 
                        : 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-200 hover:translate-y-[-2px]'
                    }`}
                  >
                    {isSaving ? (
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Save size={18} strokeWidth={2.5} />
                    )}
                    <span>{isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'security' && (
            <div className="p-6 sm:p-10 space-y-10 animate-in fade-in slide-in-from-left-4 duration-500">
               <div>
                  <h3 className="text-xl font-black text-gray-900 mb-1">الأمان والخصوصية</h3>
                  <p className="text-gray-400 text-xs sm:text-sm font-bold">إدارة كلمات المرور وجلسات الدخول النشطة</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                     <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-primary-600">
                           <Lock size={20} />
                           <h4 className="font-bold text-sm">تغيير كلمة المرور</h4>
                        </div>
                        <input type="password" placeholder="كلمة المرور الحالية" className="w-full px-5 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-500" />
                        <input type="password" placeholder="كلمة المرور الجديدة" className="w-full px-5 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-500" />
                        <button className="bg-primary-600 text-white py-3 rounded-xl font-bold text-xs hover:bg-primary-700 transition-all">تحـديث</button>
                     </div>

                     <div className="p-6 bg-white border border-gray-100 rounded-3xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                              <Smartphone size={20} />
                           </div>
                           <div>
                              <h4 className="font-bold text-sm">التوثيق الثنائي (2FA)</h4>
                              <p className="text-[10px] text-gray-400 font-bold">أضف طبقة إضافية من الحماية</p>
                           </div>
                        </div>
                        <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                           <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-sm text-gray-800">جلسات الدخول النشطة</h4>
                        <button className="text-[10px] font-bold text-red-500">خروج من الكل</button>
                     </div>
                     {[1, 2].map(i => (
                        <div key={i} className="p-4 bg-white border border-gray-100 rounded-2xl flex items-center gap-4 group hover:border-primary-200 transition-all">
                           <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-primary-600">
                              <History size={18} />
                           </div>
                           <div className="flex-1">
                              <h5 className="text-[12px] font-bold text-gray-800">Chrome on MacBook Pro</h5>
                              <p className="text-[10px] text-gray-400 font-bold">الرياض، السعودية • نشط الآن</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          )}

          {activeSubTab === 'billing' && (
            <div className="p-6 sm:p-10 space-y-10 animate-in fade-in slide-in-from-left-4 duration-500 text-right">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-1">طرق الدفع والفوترة</h3>
                    <p className="text-gray-400 text-xs sm:text-sm font-bold">إدارة البطاقات ووسائل الدفع المفضلة</p>
                  </div>
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-xl text-xs font-black hover:shadow-lg hover:shadow-primary-100 transition-all">
                    <Plus size={16} />
                     إضافة بطاقة
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="relative h-44 sm:h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 text-white shadow-2xl overflow-hidden group shrink-0">
                      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                      <div className="relative z-10 h-full flex flex-col justify-between">
                         <div className="flex justify-between items-start">
                            <CardIcon size={32} strokeWidth={1.5} className="text-white/40" />
                            <span className="font-bold text-xs bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest text-primary-400">Primary</span>
                         </div>
                         <div>
                            <p className="text-lg font-black tracking-[0.2em] mb-1">•••• •••• •••• 8821</p>
                            <div className="flex justify-between items-center opacity-60 text-[10px] font-bold">
                               <span>ABDULLAH MOHAMMED</span>
                               <span>12/28</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   <button className="h-48 border-2 border-dashed border-gray-100 rounded-[2rem] flex flex-col items-center justify-center gap-4 text-gray-300 hover:border-primary-200 hover:text-primary-600 hover:bg-primary-50/50 transition-all group">
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                         <Plus size={24} />
                      </div>
                      <span className="font-bold text-xs uppercase tracking-widest">إضافة وسيلة دفع جديدة</span>
                   </button>
                </div>
            </div>
          )}

          {activeSubTab === 'subscription' && (
            <div className="p-6 sm:p-10 space-y-10 animate-in fade-in slide-in-from-left-4 duration-500">
               <div className="flex flex-col lg:flex-row justify-between items-center sm:items-start lg:items-center bg-primary-600 p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] text-white shadow-2xl shadow-primary-200 relative overflow-hidden gap-8">
                  <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                  <div className="relative z-10 space-y-3 sm:space-y-4 text-center sm:text-right">
                     <span className="inline-block bg-white/20 text-white text-[9px] sm:text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">باقة المحترفين PRO</span>
                     <h3 className="text-3xl sm:text-4xl font-black italic">$29<span className="text-lg opacity-60 font-bold">/Month</span></h3>
                     <p className="text-white/60 font-black text-xs sm:text-sm max-w-xs leading-relaxed italic">تجديد تلقائي في 25 أكتوبر 2023 عبر بطاقتك الأساسية.</p>
                  </div>
                  <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
                     <button className="flex-1 bg-white text-primary-600 px-8 py-3 rounded-xl sm:rounded-2xl font-black text-xs hover:bg-gray-100 transition-all shadow-xl whitespace-nowrap">ترقية الاشتراك</button>
                     <button className="flex-1 bg-transparent border border-white/20 text-white/60 px-8 py-3 rounded-xl sm:rounded-2xl font-bold text-xs hover:bg-white/5 transition-all whitespace-nowrap">إلغاء الاشتراك</button>
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { label: 'رصيد نقاط AI', value: '85', total: '100', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'عدد الخطط النشطة', value: '3', total: '10', icon: Layout, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'تصدير المستندات', value: '12', total: 'Unlimited', icon: Download, color: 'text-emerald-600', bg: 'bg-emerald-50' }
                  ].map((stat, i) => (
                    <div key={i} className="p-5 sm:p-6 bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all">
                       <div className="flex items-center gap-3 mb-4">
                          <div className={`w-9 h-9 sm:w-10 sm:h-10 ${stat.bg} ${stat.color} rounded-lg sm:rounded-xl flex items-center justify-center`}>
                             <stat.icon size={18} sm:size={20} />
                          </div>
                          <span className="text-[11px] sm:text-xs font-bold text-gray-500">{stat.label}</span>
                       </div>
                       <div className="flex justify-between items-end mb-2">
                          <span className="text-xl sm:text-2xl font-black text-gray-900">{stat.value}</span>
                          <span className="text-[9px] sm:text-[10px] font-bold text-gray-300">/ {stat.total}</span>
                       </div>
                       <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                          <div className={`h-full ${stat.color.replace('text', 'bg')} rounded-full`} style={{ width: stat.total === 'Unlimited' ? '100%' : `${(parseInt(stat.value)/parseInt(stat.total))*100}%` }}></div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeSubTab === 'invoices' && (
            <div className="p-6 sm:p-10 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <div>
                   <h3 className="text-xl font-black text-gray-900 mb-1">سجل الفواتير والمدفوعات</h3>
                   <p className="text-gray-400 text-xs sm:text-sm font-bold">تحميل ومعاينة كافة الفواتير السابقة</p>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-2xl sm:rounded-[2rem] no-scrollbar shadow-inner">
                   <table className="w-full text-right min-w-[600px]">
                      <thead>
                         <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">رقم الفاتورة</th>
                            <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">التاريخ</th>
                            <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">المبلغ</th>
                            <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">الحالة</th>
                            <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">الإجراء</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                         {[
                           { id: 'INV-2023-001', date: '25 سبتمبر 2023', amount: '$29.00', status: 'مدفوعة' },
                           { id: 'INV-2023-002', date: '25 أغسطس 2023', amount: '$29.00', status: 'مدفوعة' },
                           { id: 'INV-2023-003', date: '25 يوليو 2023', amount: '$29.00', status: 'مدفوعة' },
                         ].map((inv, i) => (
                           <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-8 py-5 text-sm font-bold text-gray-800">{inv.id}</td>
                              <td className="px-8 py-5 text-xs font-bold text-gray-500">{inv.date}</td>
                              <td className="px-8 py-5 text-sm font-black text-gray-900">{inv.amount}</td>
                              <td className="px-8 py-5">
                                 <span className="bg-success/10 text-success text-[10px] font-bold px-3 py-1 rounded-full border border-success/20">
                                    {inv.status}
                                 </span>
                              </td>
                              <td className="px-8 py-5 text-center">
                                 <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">
                                    <Download size={18} />
                                 </button>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ArrowRight = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 19 7-7-7-7"/>
    <path d="M19 12H5"/>
  </svg>
);
