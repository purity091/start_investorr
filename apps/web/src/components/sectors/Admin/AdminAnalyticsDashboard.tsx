import React, { useState } from 'react';
import { 
  Users, UserCheck, UserPlus, 
  FileText, Clock, FileCheck, AlertCircle,
  BrainCircuit, Sparkles, Activity, ShieldAlert,
  ListTodo, CheckCircle2, ThumbsUp, GitBranch,
  TrendingUp, TrendingDown, MoreVertical, Calendar,
  ArrowUpRight, ArrowDownRight, Zap
} from 'lucide-react';

export const AdminAnalyticsDashboard: React.FC<any> = (props) => {
  const [timeRange, setTimeRange] = useState('7days');

  // Helper for mock mini charts
  const MiniChart = ({ data, color }: { data: number[], color: string }) => (
    <div className="flex items-end gap-1 h-8 mt-2">
      {data.map((val, i) => (
        <div 
          key={i} 
          className={`w-full rounded-t-sm ${color} opacity-80 hover:opacity-100 transition-opacity`} 
          style={{ height: `${val}%` }}
        ></div>
      ))}
    </div>
  );

  return (
    <div className="font-['IBM_Plex_Sans_Arabic'] space-y-8 animate-in fade-in duration-700 pb-24">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-100 mb-3">
            <Activity size={12} />
            مركز التحليلات والإحصائيات
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">نظرة عامة على أداء المنصة</h1>
          <p className="text-slate-500 font-normal text-sm mt-2">راقب نمو المستخدمين، تفاعلهم، واستهلاك موارد الذكاء الاصطناعي بدقة.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white border border-slate-200 p-1 rounded-2xl shadow-sm w-full md:w-auto overflow-hidden">
          {[
            { id: 'today', label: 'اليوم' },
            { id: '7days', label: 'آخر 7 أيام' },
            { id: '30days', label: 'هذا الشهر' },
            { id: 'year', label: 'هذا العام' }
          ].map(range => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                timeRange === range.id 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Users KPI */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] group relative overflow-hidden">
           <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                 <Users size={22} strokeWidth={2.5} />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                <ArrowUpRight size={12} /> +14.5%
              </span>
           </div>
           <div className="relative z-10">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">إجمالي المستخدمين</p>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-2">12,450</h3>
              <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-100 pt-3 mt-3">
                 <span className="flex items-center gap-1"><UserCheck size={12} className="text-emerald-500"/> 8,240 نشط</span>
                 <span className="flex items-center gap-1"><UserPlus size={12} className="text-blue-500"/> 420 جديد</span>
              </div>
           </div>
           <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
        </div>

        {/* Projects KPI */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] group relative overflow-hidden">
           <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                 <FileText size={22} strokeWidth={2.5} />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                <ArrowUpRight size={12} /> +8.2%
              </span>
           </div>
           <div className="relative z-10">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">المشاريع النشطة</p>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-2">3,120</h3>
              <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-100 pt-3 mt-3">
                 <span className="flex items-center gap-1"><FileCheck size={12} className="text-emerald-500"/> 1.2k مكتمل</span>
                 <span className="flex items-center gap-1"><Clock size={12} className="text-amber-500"/> 450 قيد المراجعة</span>
              </div>
           </div>
           <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
        </div>

        {/* AI Usage KPI */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] group relative overflow-hidden">
           <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                 <BrainCircuit size={22} strokeWidth={2.5} />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} /> استهلاك عالٍ
              </span>
           </div>
           <div className="relative z-10">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">عمليات توليد الذكاء الاصطناعي</p>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-2">84.5k</h3>
              <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-100 pt-3 mt-3">
                 <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-500"/> 98% نجاح</span>
                 <span className="flex items-center gap-1"><ShieldAlert size={12} className="text-rose-500"/> 2% فشل</span>
              </div>
           </div>
           <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors"></div>
        </div>

        {/* Activity & Tasks KPI */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] group relative overflow-hidden">
           <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                 <Zap size={22} strokeWidth={2.5} />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                <ArrowUpRight size={12} /> +22.4%
              </span>
           </div>
           <div className="relative z-10">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">تفاعل واستجابة المستخدمين</p>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-2">15,200</h3>
              <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-100 pt-3 mt-3">
                 <span className="flex items-center gap-1"><ListTodo size={12} className="text-blue-500"/> مهام منجزة</span>
                 <span className="flex items-center gap-1"><ThumbsUp size={12} className="text-amber-500"/> توصيات مقبولة</span>
              </div>
           </div>
           <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors"></div>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart (Mock Graph) */}
        <div className="lg:col-span-2 bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900">معدل نمو المنصة والمشاريع</h3>
              <p className="text-xs text-slate-500">تمثيل بياني لنمو المستخدمين الجدد مقابل المشاريع المنشأة.</p>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400">
              <MoreVertical size={18} />
            </button>
          </div>
          
          <div className="h-[250px] flex items-end justify-between gap-2 md:gap-4 relative w-full border-b border-slate-100 pb-2">
            {/* Background Grid Lines Mock */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-2">
              <div className="w-full border-t border-slate-50 border-dashed"></div>
              <div className="w-full border-t border-slate-50 border-dashed"></div>
              <div className="w-full border-t border-slate-50 border-dashed"></div>
              <div className="w-full border-t border-slate-50 border-dashed"></div>
            </div>

            {/* CSS Bar Chart */}
            {[40, 55, 30, 75, 50, 85, 60, 95, 70, 90, 65, 100].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative z-10 h-full justify-end">
                <div 
                  className="w-full max-w-[24px] bg-slate-100 rounded-t-lg relative overflow-hidden group-hover:bg-slate-200 transition-colors"
                  style={{ height: '100%' }}
                >
                  <div 
                    className="absolute bottom-0 w-full bg-blue-500 rounded-t-md transition-all duration-1000 group-hover:bg-blue-600"
                    style={{ height: `${val}%` }}
                  ></div>
                  <div 
                    className="absolute bottom-0 w-full bg-indigo-600 rounded-t-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ height: `${val / 2}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">{i + 1}</span>
                
                {/* Tooltip */}
                <div className="absolute -top-10 bg-slate-900 text-white text-[10px] py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                  المشاريع: {val * 120} <br/> المستخدمين: {val * 350}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
               <span className="w-3 h-3 rounded-full bg-blue-500"></span>
               مستخدمون جدد
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
               <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
               مشاريع منشأة
            </div>
          </div>
        </div>

        {/* AI Performance Panel */}
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">أداء أنظمة الذكاء الاصطناعي</h3>
            <p className="text-xs text-slate-500">حالة الخوادم والأرصدة المتبقية.</p>
          </div>

          <div className="flex-1 space-y-6">
            {/* Metric 1 */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-700">الرصيد المتبقي (Tokens)</span>
                <span className="text-emerald-600">65% متبقي</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full w-[65%] shadow-sm shadow-emerald-200"></div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">يُتوقع نفاذ الرصيد خلال 14 يوم بمعظم الاستهلاك الحالي.</p>
            </div>

            {/* Metric 2 */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-700">جودة التوليد للخطط</span>
                <span className="text-blue-600">92% جودة عالية</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full w-[92%] shadow-sm shadow-blue-200"></div>
              </div>
            </div>

            {/* Metric 3 */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-700">استقرار الخوادم الـ API</span>
                <span className="text-purple-600">99.9% Uptime</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full w-[99.9%] shadow-sm shadow-purple-200"></div>
              </div>
            </div>

            {/* Quick Action */}
            <div className="mt-8 pt-6 border-t border-slate-100">
               <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm rounded-xl transition-colors border border-slate-200 flex items-center justify-center gap-2">
                 <Sparkles size={16} className="text-purple-500" />
                 إدارة خوادم الذكاء الاصطناعي
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities Timeline / Table */}
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">سجل النشاطات الحي</h3>
            <p className="text-xs text-slate-500">أحدث الإجراءات المتخذة على المنصة من قبل المستخدمين.</p>
          </div>
          <button className="text-xs font-bold text-blue-600 hover:text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
            عرض السجل الكامل
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">النشاط والإجراء</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">المستخدم</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">النوع</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">الوقت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { action: 'إنشاء خطة عمل جديدة', user: 'محمد أسعد', type: 'توليد ذكاء اصطناعي', time: 'منذ 5 دقائق', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50' },
                { action: 'تم سداد اشتراك الخطة الاحترافية', user: 'شركة الأفق ذ.م.م', type: 'عملية مالية', time: 'منذ 18 دقيقة', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { action: 'تم تصدير الهوية البصرية للعلامة', user: 'نورة السالم', type: 'تصدير بيانات', time: 'منذ ساعة', icon: FileCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
                { action: 'تغيير حالة المشروع إلى (مؤجل)', user: 'أحمد محمد', type: 'إدارة مشاريع', time: 'منذ ساعتين', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
                { action: 'تسجيل حساب مستخدم جديد', user: 'خالد عبدالله', type: 'نظام', time: 'منذ 3 ساعات', icon: UserPlus, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              ].map((activity, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${activity.bg} ${activity.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <activity.icon size={14} strokeWidth={2.5} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{activity.action}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-600">{activity.user}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex px-2 py-1 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-md">
                      {activity.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-400 font-medium">
                     <span className="flex items-center gap-1.5"><Clock size={12} /> {activity.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
