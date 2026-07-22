import React, { useState, useMemo } from 'react';
import { 
  Users, Search, Filter, Plus, MoreVertical, Edit2, 
  Trash2, ShieldOff, ShieldCheck, Mail, Shield, Clock,
  ChevronLeft, ChevronRight, X, AlertCircle, CheckCircle2,
  MoreHorizontal
} from 'lucide-react';

// Mock Data Types
type UserRole = 'admin' | 'manager' | 'user';
type UserStatus = 'active' | 'pending' | 'suspended';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  registrationDate: string;
  avatar: string;
}

// Mock Database
const MOCK_USERS: User[] = Array.from({ length: 45 }).map((_, i) => ({
  id: `USR-${1000 + i}`,
  name: ['أحمد محمد', 'سارة خالد', 'خالد عبد الله', 'نورة العتيبي', 'عمر الفاروق', 'فهد الدوسري', 'ريم السالم'][i % 7] + (i > 6 ? ` ${i}` : ''),
  email: `user${i}@example.com`,
  role: (['admin', 'manager', 'user', 'user', 'user'][i % 5]) as UserRole,
  status: (['active', 'active', 'pending', 'suspended', 'active'][i % 5]) as UserStatus,
  registrationDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
  avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=f1f5f9`
}));

export const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter Logic
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchSearch = user.name.includes(searchQuery) || user.email.includes(searchQuery);
      const matchRole = roleFilter === 'all' || user.role === roleFilter;
      const matchStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handlers
  const handleDelete = (id: string) => {
    if(window.confirm('هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleToggleStatus = (id: string, currentStatus: UserStatus) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: currentStatus === 'active' ? 'suspended' : 'active' };
      }
      return u;
    }));
  };

  return (
    <div className="font-['IBM_Plex_Sans_Arabic'] space-y-8 animate-in fade-in duration-700 pb-24">
      
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-100 mb-3">
            <Shield size={12} />
            لوحة الإدارة التنفيذية
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">إدارة المستخدمين</h1>
          <p className="text-slate-500 font-normal text-sm mt-2">التحكم الكامل بصلاحيات وحسابات جميع مستخدمي المنصة.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-0.5"
          >
            <Plus size={18} />
            إضافة مستخدم جديد
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي المستخدمين', value: users.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'نشط', value: users.filter(u => u.status === 'active').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'بانتظار التفعيل', value: users.filter(u => u.status === 'pending').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'موقوف', value: users.filter(u => u.status === 'suspended').length, icon: ShieldOff, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, idx) => (
          <div key={idx} className="surface-card p-5 rounded-[20px] flex items-center justify-between">
             <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <h4 className="text-2xl font-black text-slate-800">{stat.value}</h4>
             </div>
             <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={22} strokeWidth={2.5} />
             </div>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="surface-card rounded-[20px] p-4 flex flex-col xl:flex-row xl:items-center gap-4">
        <div className="relative flex-1 w-full">
           <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
           <input 
             type="text" 
             placeholder="ابحث بالاسم أو البريد الإلكتروني..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full bg-slate-50 border border-slate-100 rounded-xl pr-12 pl-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all text-slate-800 font-medium"
           />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
           <div className="relative w-full md:w-40 flex-shrink-0">
             <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl pr-9 pl-4 py-3 text-xs font-bold text-slate-600 focus:outline-none focus:border-amber-400 appearance-none cursor-pointer"
             >
                <option value="all">جميع الأدوار</option>
                <option value="admin">مدير نظام</option>
                <option value="manager">مشرف</option>
                <option value="user">مستخدم</option>
             </select>
           </div>
           
           <div className="relative w-full md:w-40 flex-shrink-0">
             <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl pr-9 pl-4 py-3 text-xs font-bold text-slate-600 focus:outline-none focus:border-amber-400 appearance-none cursor-pointer"
             >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="pending">بانتظار التفعيل</option>
                <option value="suspended">موقوف</option>
             </select>
           </div>
        </div>
      </div>

      {/* Users DataTable */}
      <div className="surface-card rounded-[20px] shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">المستخدم</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">الدور (Role)</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">حالة الحساب</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">تاريخ التسجيل</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-slate-200 bg-white" />
                        <div>
                          <p className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{user.name}</p>
                          <div className="flex items-center gap-1.5 text-slate-400 mt-0.5">
                            <Mail size={12} />
                            <span className="text-xs font-normal font-sans">{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        user.role === 'admin' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        user.role === 'manager' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {user.role === 'admin' && <Shield size={10} />}
                        {user.role === 'manager' && <CheckCircle2 size={10} />}
                        {user.role === 'user' && <Users size={10} />}
                        {user.role === 'admin' ? 'مدير نظام' : user.role === 'manager' ? 'مشرف' : 'مستخدم'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        user.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        user.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          user.status === 'active' ? 'bg-emerald-500' :
                          user.status === 'pending' ? 'bg-amber-500 animate-pulse' :
                          'bg-rose-500'
                        }`}></div>
                        {user.status === 'active' ? 'نشط' : user.status === 'pending' ? 'بانتظار التفعيل' : 'موقوف'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-bold text-slate-600">{user.registrationDate}</p>
                    </td>
                    <td className="py-4 px-6 text-left">
                       <div className="flex items-center justify-end gap-2 transition-opacity">
                         <button className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-600 flex items-center justify-center transition-colors shadow-sm" title="تعديل">
                           <Edit2 size={14} />
                         </button>
                         <button 
                           onClick={() => handleToggleStatus(user.id, user.status)}
                           className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shadow-sm ${
                              user.status === 'active' 
                                ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' 
                                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                           }`} 
                           title={user.status === 'active' ? 'إيقاف الحساب' : 'تفعيل الحساب'}
                         >
                           {user.status === 'active' ? <ShieldOff size={14} /> : <ShieldCheck size={14} />}
                         </button>
                         <button 
                           onClick={() => handleDelete(user.id)}
                           className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-colors shadow-sm" title="حذف">
                           <Trash2 size={14} />
                         </button>
                       </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={5} className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400 space-y-3">
                         <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200">
                           <Search size={24} className="text-slate-300" />
                         </div>
                         <p className="text-sm font-bold">لا يوجد مستخدمين يطابقون بحثك</p>
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="mt-auto border-t border-slate-100 p-4 flex items-center justify-between bg-slate-50/50">
             <p className="text-xs font-bold text-slate-500">
               عرض <span className="text-slate-900 mx-1">{paginatedUsers.length}</span> من أصل <span className="text-slate-900 mx-1">{filteredUsers.length}</span> مستخدم
             </p>
             <div className="flex items-center gap-1.5">
               <button 
                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                 disabled={currentPage === 1}
                 className="p-2 border border-slate-200 rounded-xl bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                 <ChevronRight size={16} /> {/* Right points to previous in RTL */}
               </button>
               
               {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  let pageNum = i + 1;
                  // Complex pagination logic if totalPages > 5 could go here, simplified for display
                  if (totalPages > 5 && currentPage > 3) {
                     pageNum = currentPage - 2 + i;
                  }
                  if (pageNum > totalPages) return null;
                  
                  return (
                    <button 
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
                        currentPage === pageNum 
                          ? 'bg-slate-900 text-white shadow-md' 
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
               })}

               <button 
                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                 disabled={currentPage === totalPages}
                 className="p-2 border border-slate-200 rounded-xl bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                 <ChevronLeft size={16} /> {/* Left points to next in RTL */}
               </button>
             </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[24px] w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col">
             
             {/* Modal Header */}
             <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-inner">
                      <Plus size={20} />
                   </div>
                   <h3 className="text-xl font-bold text-slate-900">إضافة مستخدم جديد</h3>
                </div>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-8 h-8 bg-white border border-slate-200 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                  <X size={16} />
                </button>
             </div>

             {/* Modal Body (Form) */}
             <form className="p-6 space-y-5 flex-1 overflow-y-auto no-scrollbar" onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); }}>
                
                <div className="space-y-4">
                   <div>
                     <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">الاسم الكامل <span className="text-rose-500">*</span></label>
                     <input type="text" required placeholder="أدخل اسم المستخدم الثلاثي" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-slate-800 font-medium transition-all" />
                   </div>
                   
                   <div>
                     <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">البريد الإلكتروني <span className="text-rose-500">*</span></label>
                     <input type="email" required placeholder="name@company.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-slate-800 font-medium font-sans text-left transition-all dir-ltr" />
                   </div>

                   <div>
                     <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">كلمة المرور المؤقتة <span className="text-rose-500">*</span></label>
                     <input type="password" required placeholder="********" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-slate-800 font-medium font-sans text-left transition-all dir-ltr" />
                     <p className="text-[10px] text-slate-400 font-bold mt-1.5 flex items-center gap-1"><AlertCircle size={10} /> سيُطلب من المستخدم تغيير كلمة المرور عند تسجيل الدخول الأول.</p>
                   </div>

                   <div>
                     <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">دور المستخدم <span className="text-rose-500">*</span></label>
                     <div className="grid grid-cols-3 gap-3">
                        {/* Role Selection Radios */}
                        {[
                          { id: 'admin', label: 'مدير نظام', desc: 'صلاحيات كاملة', icon: Shield },
                          { id: 'manager', label: 'مشرف', desc: 'إدارة المحتوى', icon: CheckCircle2 },
                          { id: 'user', label: 'مستخدم', desc: 'صلاحيات محدودة', icon: Users }
                        ].map(role => (
                          <label key={role.id} className="cursor-pointer group relative">
                            <input type="radio" name="role" value={role.id} className="peer sr-only" defaultChecked={role.id === 'user'} />
                            <div className="border border-slate-200 rounded-xl p-3 hover:bg-slate-50 peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:ring-1 peer-checked:ring-amber-500 transition-all flex flex-col items-center justify-center text-center gap-1.5">
                               <role.icon size={16} className="text-slate-400 peer-checked:text-amber-600 transition-colors" />
                               <span className="text-xs font-bold text-slate-700 peer-checked:text-amber-800">{role.label}</span>
                            </div>
                          </label>
                        ))}
                     </div>
                   </div>
                </div>

                {/* Modal Footer */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                   <button type="submit" className="flex-1 py-3.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:bg-black transition-colors">إضافة المستخدم</button>
                   <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-3.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors">إلغاء</button>
                </div>
             </form>
          </div>
        </div>
      )}

    </div>
  );
};
