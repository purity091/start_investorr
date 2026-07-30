import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, Key, Users,
  Lock, Unlock, Search, Filter, AlertTriangle,
  History, UserX, UserCheck, RefreshCw, Eye,
  Settings2, Activity, ShieldBan, ServerCrash,
  FileCode2, UserCog, MailWarning
} from 'lucide-react';

// Types
type Role = 'admin' | 'moderator' | 'investor' | 'startup';
type Severity = 'low' | 'medium' | 'high' | 'critical';

interface PermissionStatus {
  id: string;
  name: string;
  enabled: boolean;
}

interface RoleConfig {
  id: Role;
  title: string;
  description: string;
  usersCount: number;
  color: string;
  bg: string;
  icon: React.ElementType;
  permissions: PermissionStatus[];
}

interface AuditLog {
  id: string;
  user: string;
  email: string;
  action: string;
  target?: string;
  severity: Severity;
  timestamp: string;
  ip: string;
}

// Mock Data
const INITIAL_ROLES: RoleConfig[] = [
  {
    id: 'admin', title: 'مدير نظام كامل', description: 'يملك صلاحيات مطلقة على كافة إعدادات المنصة والمستخدمين.', usersCount: 3,
    color: 'text-rose-600', bg: 'bg-rose-50 border-rose-200', icon: ShieldAlert,
    permissions: [
      { id: 'p1', name: 'تعديل أو حذف حسابات المستخدمين', enabled: true },
      { id: 'p2', name: 'الوصول لإعدادات النظام والفوترة', enabled: true },
      { id: 'p3', name: 'إدارة قواعد البيانات وتصديرها', enabled: true },
    ]
  },
  {
    id: 'moderator', title: 'مشرف محتوى', description: 'تقتصر صلاحياته على إدارة المشاريع، الخطط، والردود.', usersCount: 12,
    color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200', icon: UserCog,
    permissions: [
      { id: 'p4', name: 'مراجعة وتعديل خطط الأعمال', enabled: true },
      { id: 'p5', name: 'حظر المشاريع المخالفة', enabled: true },
      { id: 'p6', name: 'الوصول المستقل لإعدادات النظام', enabled: false },
    ]
  },
  {
    id: 'startup', title: 'ريادي أعمال (صاحب مشروع)', description: 'مستخدم أساسي يبني خطط الأعمال ويطلب استثمار.', usersCount: 8450,
    color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', icon: Users,
    permissions: [
      { id: 'p7', name: 'إنشاء ותعديل المشاريع الخاصة', enabled: true },
      { id: 'p8', name: 'مشاركة الخطة مع المستثمرين', enabled: true },
      { id: 'p9', name: 'الوصول لبيانات مستخدمين آخرين', enabled: false },
    ]
  },
  {
    id: 'investor', title: 'مستثمر', description: 'يتصفح المشاريع ويتواصل مع رواد الأعمال.', usersCount: 1240,
    color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: Eye,
    permissions: [
      { id: 'p10', name: 'استعراض الخطط الاستثمارية المتاحة', enabled: true },
      { id: 'p11', name: 'التواصل المباشر عبر المنصة', enabled: true },
      { id: 'p12', name: 'تصدير التقارير المالية للمشاريع', enabled: false },
    ]
  }
];

const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: 'L1', user: 'أحمد محمد', email: 'admin@system.com', action: 'تغيير صلاحيات حساب', target: 'حساب "خالد السالم"', severity: 'high', timestamp: 'منذ 5 دقائق', ip: '192.168.1.5' },
  { id: 'L2', user: 'IP غير معروف', email: '-', action: 'محاولة تسجيل دخول فاشلة (5 مرات)', target: 'حساب "سارة خالد"', severity: 'critical', timestamp: 'منذ 18 دقيقة', ip: '45.33.22.1' },
  { id: 'L3', user: 'مؤيد حسين', email: 'mod@startinvestor.com', action: 'حظر حساب بسبب سبام', target: 'مشروع "التقنية الحديثة"', severity: 'medium', timestamp: 'منذ ساعتين', ip: '172.16.0.4' },
  { id: 'L4', user: 'نورة العتيبي', email: 'investor@mail.com', action: 'تسجيل دخول ناجح', severity: 'low', timestamp: 'منذ 3 ساعات', ip: '192.168.1.18' },
];

export const AdminSecurityDashboard: React.FC<any> = (props) => {
  const [activeTab, setActiveTab] = useState<'permissions' | 'audit'>('permissions');
  const [roles, setRoles] = useState<RoleConfig[]>(INITIAL_ROLES);
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle permission helper
  const handleTogglePermission = (roleId: string, permId: string) => {
    setRoles(prev => prev.map(r => {
      if (r.id === roleId) {
         return {
           ...r,
           permissions: r.permissions.map(p => p.id === permId ? { ...p, enabled: !p.enabled } : p)
         }
      }
      return r;
    }));
  };

  const getSeverityStyles = (severity: Severity) => {
    switch(severity) {
      case 'critical': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'high': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'medium': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'low': return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="font-['IBM_Plex_Sans_Arabic'] space-y-8 animate-in fade-in duration-700 pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 text-white rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-700 mb-3 shadow-md">
            <Lock size={12} />
            أمان النظام والصلاحيات
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">الدرع الواقي والإدارة</h1>
          <p className="text-slate-500 font-normal text-sm mt-2">راقب الأنشطة الحساسة، أدر صلاحيات الوصول للمنصة، وتعامل مع التهديدات.</p>
        </div>
        
        {/* Global Security Status Card */}
        <div className="bg-white border border-emerald-100 p-4 rounded-2xl shadow-[0_8px_30px_rgba(16,185,129,0.1)] flex items-center gap-4">
           <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
             <ShieldCheck size={24} />
           </div>
           <div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">حالة أمان الخوادم</p>
             <h4 className="text-lg font-black text-emerald-600">آمنة ومستقرة</h4>
           </div>
        </div>
      </div>

      {/* Internal Tabs */}
      <div className="bg-slate-100/50 p-1.5 rounded-[20px] inline-flex mb-2">
        <button 
          onClick={() => setActiveTab('permissions')}
          className={`flex items-center gap-2 px-6 py-3 rounded-[14px] text-sm font-bold transition-all ${
            activeTab === 'permissions' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
          }`}
        >
          <Key size={16} /> الإدارة والصلاحيات
        </button>
        <button 
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-6 py-3 rounded-[14px] text-sm font-bold transition-all ${
            activeTab === 'audit' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
          }`}
        >
          <History size={16} /> سجل نشاطات الأمان (Audit)
        </button>
      </div>

      {activeTab === 'permissions' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">الأدوار والمجموعات</h2>
            <button className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors">
               <Settings2 size={16} /> إضافة دور مخصص
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {roles.map(role => (
              <div key={role.id} className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
                
                {/* Role Header */}
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-100">
                  <div className="flex gap-4">
                     <div className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center border ${role.bg} ${role.color}`}>
                       <role.icon size={28} strokeWidth={2} />
                     </div>
                     <div>
                       <h3 className="text-xl font-black text-slate-800 tracking-tight">{role.title}</h3>
                       <p className="text-xs text-slate-500 mt-1">{role.description}</p>
                     </div>
                  </div>
                  <div className="text-center bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                     <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">المستخدمين</span>
                     <span className="block text-lg font-black text-slate-700">{role.usersCount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Permissions Toggles */}
                <div className="space-y-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">إعدادات الوصول والصلاحيات المخصصة</p>
                  {role.permissions.map(perm => (
                    <div key={perm.id} className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${perm.enabled ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-100 opacity-60'}`}>
                      <span className={`text-sm font-bold ${perm.enabled ? 'text-slate-700' : 'text-slate-400'}`}>{perm.name}</span>
                      
                      {/* Custom Toggle Switch */}
                      <button 
                        onClick={() => handleTogglePermission(role.id, perm.id)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${perm.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                      >
                         <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${perm.enabled ? 'left-1' : 'left-7'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          
          {/* Quick Control Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <button className="bg-white border border-slate-100 p-5 rounded-[24px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-right group">
               <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <ShieldBan size={20} />
               </div>
               <h3 className="font-bold text-slate-800 mb-1">تعطيل حساب مشبوه</h3>
               <p className="text-[10px] text-slate-500">إيقاف مؤقت لحين المراجعة</p>
            </button>
            <button className="bg-white border border-slate-100 p-5 rounded-[24px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-right group">
               <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <RefreshCw size={20} />
               </div>
               <h3 className="font-bold text-slate-800 mb-1">تفريغ الجلسات المرتبطة</h3>
               <p className="text-[10px] text-slate-500">طرد جميع المستخدمين من النظام</p>
            </button>
            <button className="bg-white border border-slate-100 p-5 rounded-[24px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-right group">
               <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <Key size={20} />
               </div>
               <h3 className="font-bold text-slate-800 mb-1">إعادة تعيين كلمات مرور</h3>
               <p className="text-[10px] text-slate-500">فرض تغيير पासवर्ड لدواعي أمنية</p>
            </button>
            <button className="bg-rose-50 border border-rose-100 p-5 rounded-[24px] shadow-sm hover:shadow-md hover:-translate-y-1 hover:bg-rose-100 transition-all text-right group">
               <div className="w-10 h-10 bg-rose-200 text-rose-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <ServerCrash size={20} />
               </div>
               <h3 className="font-bold text-rose-800 mb-1">حظر عناوين IP</h3>
               <p className="text-[10px] text-rose-600">القائمة السوداء للحماية من الهجمات</p>
            </button>
          </div>

          <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
            
            {/* Table Toolbar */}
            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between bg-slate-50/50">
              <div className="relative w-full md:w-96">
                <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="ابحث بالاسم، الإجراء، أو IP الإتصال..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pr-10 pl-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                />
              </div>
              <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm font-bold">
                <Filter size={16} /> تصفية متقدمة
              </button>
            </div>

            {/* Audit Logs Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-100 text-slate-400">
                    <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">الحدث أو الإجراء</th>
                    <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">المستخدم / المصدر</th>
                    <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">الهدف (Target)</th>
                    <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">الخطورة</th>
                    <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">IP / الوقت</th>
                    <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">خيارات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {MOCK_AUDIT_LOGS.filter(log => log.user.includes(searchQuery) || log.action.includes(searchQuery) || log.ip.includes(searchQuery)).map(log => (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {log.severity === 'critical' || log.severity === 'high' ? (
                            <AlertTriangle size={18} className="text-rose-500 flex-shrink-0" />
                          ) : (
                            <Activity size={18} className="text-slate-400 flex-shrink-0" />
                          )}
                          <span className={`text-sm font-bold ${log.severity === 'critical' ? 'text-rose-700' : 'text-slate-800'}`}>
                            {log.action}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="block text-sm font-bold text-slate-800">{log.user}</span>
                        <span className="block text-xs text-slate-500">{log.email}</span>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 font-medium">{log.target || '-'}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-3 py-1 text-[10px] font-bold border rounded-lg uppercase tracking-wider ${getSeverityStyles(log.severity)}`}>
                           {log.severity === 'critical' ? 'شديدة الخطورة' : 
                            log.severity === 'high' ? 'عالية' : 
                            log.severity === 'medium' ? 'متوسطة' : 'عادية'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="block text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded w-fit mb-1">{log.ip}</span>
                        <span className="block text-[10px] font-bold text-slate-400">{log.timestamp}</span>
                      </td>
                      <td className="py-4 px-6">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {MOCK_AUDIT_LOGS.filter(log => log.user.includes(searchQuery) || log.action.includes(searchQuery) || log.ip.includes(searchQuery)).length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500">
                        لا يوجد سجلات أمنية مطابقة للبحث.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
