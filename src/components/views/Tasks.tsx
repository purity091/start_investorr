
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  Calendar, 
  User as UserIcon, 
  FileText, 
  Plus, 
  Search,
  MoreVertical,
  ChevronLeft,
  ListTodo,
  TrendingUp,
  Filter
} from 'lucide-react';
import { Task } from '../../types';

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'مراجعة الملخص التنفيذي',
    description: 'تأكد من أن الأرقام المالية تتوافق مع التوقعات الجديدة في القسم المالي.',
    status: 'completed',
    priority: 'medium',
    relatedPlan: 'خطة عمل test1',
    assignedBy: 'Admin User',
    dueDate: '27-11-2025',
    timestamp: 'منذ شهر'
  },
  {
    id: '2',
    title: 'تحليل المنافسين في السوق الرياضي',
    description: 'إضافة قائمة بالمنافسين المباشرين وغير المباشرين في منطقة الرياض.',
    status: 'completed',
    priority: 'high',
    relatedPlan: 'مشروع صالة ألعاب رياضية',
    assignedBy: 'Admin User',
    dueDate: '22-11-2025',
    timestamp: 'منذ شهر'
  },
  {
    id: '3',
    title: 'تحديد مصادر الإيرادات البديلة',
    description: 'البحث عن 3 مصادر إيرادات إضافية لتعزيز التدفق النقدي في السنة الأولى.',
    status: 'in_progress',
    priority: 'high',
    relatedPlan: 'خطة عمل eslam',
    assignedBy: 'Admin User',
    dueDate: '05-12-2025',
    timestamp: 'منذ يومين'
  },
  {
    id: '4',
    title: 'تصميم الهوية البصرية الأولية',
    description: 'استخدام المولد الذكي لإنشاء شعار ولوحة ألوان تعكس حداثة المشروع.',
    status: 'pending',
    priority: 'low',
    relatedPlan: 'خطة عمل test2',
    assignedBy: 'Admin User',
    dueDate: '10-12-2025',
    timestamp: 'منذ أسبوع'
  }
];

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(t => t.status === filter);

  const getPriorityStyles = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'medium': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'low': return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
      case 'completed': return { label: 'مكتملة', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' };
      case 'in_progress': return { label: 'قيد التنفيذ', color: 'bg-primary-50 text-primary-600 border-primary-100' };
      case 'pending': return { label: 'قيد الانتظار', color: 'bg-gray-50 text-gray-400 border-gray-100' };
    }
  };

  const counts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-10">
        <div className="text-center md:text-right">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-slate-200">
              <ListTodo size={24} strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight uppercase leading-none">مهامي</h1>
          </div>
          <p className="text-gray-400 font-bold text-sm max-w-md mx-auto md:mx-0 leading-relaxed italic">جميع المهام المعينة لي لإتمام خطط العمل بنجاح وتحويل الأهداف إلى واقع.</p>
        </div>
        <button className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-primary-600 text-white rounded-[1.8rem] text-sm font-black shadow-2xl shadow-primary-100 hover:scale-[1.03] active:scale-95 transition-all">
          <Plus size={20} strokeWidth={3} />
          <span>إضافة مهمة جديدة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ù…Ù‡Ø§Ù…', value: counts.all, tone: 'text-slate-900 bg-slate-100' },
          { label: 'Ù‚ÙŠØ¯ Ø§Ù„ØªÙ†ÙÙŠØ°', value: counts.in_progress, tone: 'text-blue-700 bg-blue-50' },
          { label: 'Ù…ÙƒØªÙ…Ù„Ø©', value: counts.completed, tone: 'text-emerald-700 bg-emerald-50' },
          { label: 'Ù‚ÙŠØ¯ Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø±', value: counts.pending, tone: 'text-amber-700 bg-amber-50' },
        ].map((stat) => (
          <div key={stat.label} className="surface-card p-5 flex items-center justify-between">
            <div className="text-right">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
              <p className="mt-2 text-3xl font-black text-slate-950">{stat.value}</p>
            </div>
            <div className={`rounded-2xl px-3 py-2 text-xs font-black ${stat.tone}`}>Live</div>
          </div>
        ))}
      </div>

      {/* Tabs / Filters - Redesigned for Mobile */}
      <div className="surface-card p-1.5 sm:p-2 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] ring-1 ring-black/5">
        {/* Desktop View: Horizontal */}
        <div className="hidden sm:flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'الكل', count: counts.all },
            { id: 'pending', label: 'قيد الانتظار', count: counts.pending },
            { id: 'in_progress', label: 'قيد التنفيذ', count: counts.in_progress },
            { id: 'completed', label: 'مكتملة', count: counts.completed },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-[12px] font-black transition-all ${
                filter === tab.id
                  ? 'bg-primary-600 text-white shadow-xl shadow-primary-200'
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[9px] sm:text-[10px] min-w-[18px] sm:min-w-[20px] h-4 sm:h-5 rounded-md sm:rounded-lg flex items-center justify-center font-black ${filter === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile View: 2x2 Grid */}
        <div className="grid sm:hidden grid-cols-2 gap-1.5">
          {[
            { id: 'all', label: 'الكل', count: counts.all },
            { id: 'pending', label: 'انتظار', count: counts.pending },
            { id: 'in_progress', label: 'تنفيذ', count: counts.in_progress },
            { id: 'completed', label: 'مكتملة', count: counts.completed },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`flex flex-col items-center justify-center gap-1 px-2 py-2.5 rounded-xl text-[10px] font-bold transition-all min-h-[56px] ${
                filter === tab.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <span className="truncate w-full text-center">{tab.label}</span>
              <span className={`text-[9px] min-w-[16px] h-4 rounded flex items-center justify-center font-black px-1.5 ${filter === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List - Improved for Mobile */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
        {filteredTasks.length === 0 ? (
          <div className="xl:col-span-2 py-20 sm:py-24 text-center bg-white border border-dashed border-gray-200 rounded-[2rem] sm:rounded-[3rem]">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center text-gray-300 mx-auto mb-4 sm:mb-6">
              <ListTodo size={32} strokeWidth={1.5} className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">لا توجد مهام في هذا القسم</h3>
            <p className="text-gray-400 font-bold text-xs sm:text-sm">أنت مواكب لجميع مهامك حالياً، أحسنت!</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const statusStyle = getStatusLabel(task.status);
            return (
              <div key={task.id} className="group relative surface-card rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-6 md:p-8 hover:shadow-2xl hover:shadow-primary-100/30 transition-all duration-500 overflow-hidden h-full">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">

                  <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h3 className="text-base sm:text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                        {task.title}
                      </h3>
                      <div className="flex gap-1.5 sm:gap-2">
                        <span className={`text-[8px] sm:text-[9px] font-bold px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg border uppercase tracking-wider ${getPriorityStyles(task.priority)}`}>
                          {task.priority === 'high' ? 'عالية' : task.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                        </span>
                        <span className={`text-[8px] sm:text-[9px] font-bold px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg border ${statusStyle.color}`}>
                          {statusStyle.label}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-gray-500 leading-relaxed">
                      {task.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-y-2 sm:gap-y-3 gap-x-3 sm:gap-x-6 pt-1 sm:pt-2">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold text-primary-600 bg-primary-50/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-primary-100/50">
                        <FileText size={12} className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate max-w-[140px] sm:max-w-none">{task.relatedPlan}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold text-gray-400">
                        <UserIcon size={12} className="text-gray-300 w-3 h-3 sm:w-4 sm:h-4" />
                        من: <span className="text-gray-600 truncate max-w-[120px] sm:max-w-none">{task.assignedBy}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold text-gray-400">
                        <Calendar size={12} className="text-gray-300 w-3 h-3 sm:w-4 sm:h-4" />
                        الموعد: <span className="text-gray-600">{task.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold text-gray-400">
                        <Clock size={12} className="text-gray-300 w-3 h-3 sm:w-4 sm:h-4" />
                        {task.timestamp}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto border-t md:border-t-0 border-gray-50 pt-4 sm:pt-0 mt-3 sm:mt-0">
                    <button className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-[12px] font-bold transition-all min-h-[48px] ${
                      task.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        : 'bg-primary-600 text-white shadow-xl shadow-primary-100 hover:bg-primary-700'
                    }`}>
                      {task.status === 'completed' ? <CheckCircle2 size={14} strokeWidth={3} className="w-4 h-4 sm:w-5 sm:h-5" /> : <Circle size={14} strokeWidth={3} className="w-4 h-4 sm:w-5 sm:h-5" />}
                      <span className="truncate">{task.status === 'completed' ? 'تم الإكمال' : 'تحديد كمكتمل'}</span>
                    </button>
                    <button className="p-2 sm:p-3 bg-white border border-gray-100 text-gray-400 rounded-xl sm:rounded-2xl hover:text-primary-600 hover:border-primary-100 transition-all min-h-[44px] min-w-[44px]">
                      <MoreVertical size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                {/* Left Accent Bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 transition-all ${
                  task.priority === 'high' ? 'bg-rose-500' : task.priority === 'medium' ? 'bg-amber-400' : 'bg-blue-500'
                }`}></div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Insight */}
      <div className="p-8 bg-gradient-to-r from-gray-900 to-slate-800 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-primary-400">
            <TrendingUp size={28} />
          </div>
          <div>
            <h4 className="text-xl font-bold mb-1">معدل الإنتاجية</h4>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest opacity-80">لقد أنجزت 8 مهام هذا الأسبوع</p>
          </div>
        </div>
        <div className="flex gap-2">
           {[...Array(7)].map((_, i) => (
             <div key={i} className={`w-1.5 h-10 rounded-full ${i < 5 ? 'bg-primary-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/10'}`}></div>
           ))}
        </div>
      </div>
    </div>
  );
};
