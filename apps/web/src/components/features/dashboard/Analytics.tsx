
import React from 'react';
import { 
  BarChart3, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Layout
} from 'lucide-react';

export const Analytics: React.FC = () => {
  const stats = [
    { label: 'إجمالي الأجيال', value: '35', icon: Cpu, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', trend: '+5% هاد الأسبوع' },
    { label: 'أجيال ناجحة', value: '35', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', trend: '100% نجاح' },
    { label: 'أجيال فاشلة', value: '0', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', trend: 'ثبات ممتاز' },
    { label: 'إجمالي الرموز', value: '2,187', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', trend: 'استهلاك ذكي' },
  ];

  const monthlyPlans = [
    { month: '2025-12', count: 2, total: 50 },
    { month: '2025-11', count: 45, total: 50 },
  ];

  const planProgress = [
    { title: 'خطة عمل test1', status: 'مسودة', progress: 100, date: '21-11-2025' },
    { title: 'خطة عمل asd', status: 'مكتملة', progress: 100, date: '29-11-2025' },
    { title: 'خطة عمل test2', status: 'مكتملة', progress: 100, date: '29-11-2025' },
    { title: 'خطة عمل eslam', status: 'مكتملة', progress: 100, date: '30-11-2025' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">تحليلات متقدمة</h1>
          <p className="text-gray-400 font-bold text-sm">رؤية شاملة عن أدائك واستخدام الذكاء الاصطناعي في النظام.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
          <Calendar size={16} />
          آخر 30 يوم
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`relative group p-6 bg-white border ${stat.border} rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-gray-100 transition-all duration-500 overflow-hidden`}>
            <div className={`absolute -right-4 -top-4 w-24 h-24 ${stat.bg} rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700`}></div>
            <div className="relative z-10">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-inner`}>
                <stat.icon size={24} strokeWidth={2.5} />
              </div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                <Activity size={12} className={stat.color} />
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Monthly Plans Chart Card */}
        <div className="lg:col-span-1 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">الخطط الشهرية</h3>
            <div className="p-2 bg-primary-50 text-primary-600 rounded-xl">
              <TrendingUp size={18} strokeWidth={2.5} />
            </div>
          </div>
          <div className="space-y-8">
            {monthlyPlans.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-gray-400">{item.month}</span>
                  <span className="text-sm font-bold text-gray-900">{item.count} خطة</span>
                </div>
                <div className="h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                  <div 
                    className="h-full bg-gradient-to-l from-primary-600 to-blue-400 rounded-full shadow-lg shadow-primary-100 transition-all duration-1000" 
                    style={{ width: `${(item.count / item.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-4 bg-primary-50/50 rounded-2xl border border-primary-100">
            <p className="text-[11px] font-bold text-primary-700 text-center">
              زيادة ملحوظة بنسبة <span className="font-bold">225%</span> في إنتاجية الشهر الحالي مقارنة بالشهر السابق.
            </p>
          </div>
        </div>

        {/* Project Progress List */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">تقدم الإكمال</h3>
            <div className="flex items-center gap-2">
              <button className="text-[11px] font-bold text-primary-600 hover:underline">عرض الكل</button>
            </div>
          </div>
          <div className="space-y-4">
            {planProgress.map((plan, idx) => (
              <div key={idx} className="group flex items-center gap-6 p-4 rounded-3xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-primary-600 group-hover:border-primary-100 transition-all shadow-sm">
                  <Layout size={20} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{plan.title}</h4>
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${
                      plan.status === 'مكتملة' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {plan.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-600 rounded-full" style={{ width: `${plan.progress}%` }}></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-900">{plan.progress}%</span>
                  </div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-[9px] font-bold text-gray-300 uppercase mb-1">تاريخ الإنشاء</p>
                  <p className="text-[11px] font-bold text-gray-500">{plan.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
