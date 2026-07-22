
import React from 'react';
import { 
  History, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Settings, 
  ArrowLeft,
  Calendar,
  ChevronLeft,
  Package,
  CheckCircle2
} from 'lucide-react';

interface UpdateItem {
  id: string;
  version: string;
  date: string;
  title: string;
  description: string;
  type: 'feature' | 'improvement' | 'security' | 'fix';
  points?: string[];
}

const UPDATES: UpdateItem[] = [
  {
    id: '1',
    version: 'v1.2.5',
    date: '04 ديسمبر 2025',
    title: 'تحسين تجربة واجهة المستخدم',
    description: 'قمنا بإعادة بناء واجهة المستخدم لتكون أكثر استجابة وسهولة في التنقل، مع تحسين استهلاك الموارد في المتصفح.',
    type: 'improvement',
    points: [
      'تحديث نظام الألوان للهوية البصرية الجديدة',
      'تحسين سرعة تحميل الصفحات بنسبة 40%',
      'إضافة دعم كامل لإيماءات اللمس على الأجهزة المحمولة'
    ]
  },
  {
    id: '2',
    version: 'v1.2.0',
    date: '28 نوفمبر 2025',
    title: 'نظام المصادقة الثنائية (2FA)',
    description: 'تعزيز أمان الحسابات من خلال إضافة خيار التحقق بخطوتين عبر البريد الإلكتروني أو تطبيقات المصادقة.',
    type: 'security'
  },
  {
    id: '3',
    version: 'v1.1.0',
    date: '15 نوفمبر 2025',
    title: 'مساعد الكتابة بالذكاء الاصطناعي',
    description: 'إطلاق ميزة توليد المحتوى الذكي التي تساعدك على كتابة أقسام خطة العمل بضغطة زر واحدة.',
    type: 'feature',
    points: [
      'توليد الملخص التنفيذي بناءً على فكرة المشروع',
      'تحليل السوق باستخدام بيانات لحظية',
      'اقتراح استراتيجيات تسويقية مخصصة'
    ]
  },
  {
    id: '4',
    version: 'v1.0.0',
    date: '01 نوفمبر 2025',
    title: 'إطلاق المنصة الرسمي',
    description: 'النسخة الأولى المستقرة من منصة "خطة" لبناء ومشاركة خطط الأعمال الاحترافية.',
    type: 'feature'
  }
];

export const Changelog: React.FC = () => {
  const getTypeStyles = (type: UpdateItem['type']) => {
    switch (type) {
      case 'feature':
        return { 
          label: 'ميزة جديدة', 
          color: 'text-emerald-600', 
          bg: 'bg-emerald-50', 
          border: 'border-emerald-100',
          icon: Sparkles
        };
      case 'security':
        return { 
          label: 'تحديث أمني', 
          color: 'text-rose-600', 
          bg: 'bg-rose-50', 
          border: 'border-rose-100',
          icon: ShieldCheck
        };
      case 'fix':
        return { 
          label: 'إصلاح أخطاء', 
          color: 'text-amber-600', 
          bg: 'bg-amber-50', 
          border: 'border-amber-100',
          icon: Settings
        };
      default:
        return { 
          label: 'تحسين', 
          color: 'text-primary-600', 
          bg: 'bg-primary-50', 
          border: 'border-primary-100',
          icon: Zap
        };
    }
  };

  return (
    <div className="app-page-shell-wide py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header Section */}
      <div className="surface-card text-center mb-10 p-8 lg:p-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-950 rounded-[1.5rem] text-white shadow-lg mb-6">
          <History size={32} strokeWidth={2.5} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">سجل التحديثات</h1>
        <p className="text-gray-400 font-bold text-lg max-w-xl mx-auto leading-relaxed">
          نحن نعمل باستمرار على تطوير "خطة" لنقدم لك أفضل الأدوات لبناء مستقبلك المهني.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative">
        {/* Central Vertical Line */}
        <div className="absolute top-0 bottom-0 right-[27px] w-0.5 bg-gradient-to-b from-primary-200 via-gray-100 to-transparent hidden md:block"></div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {UPDATES.map((update, index) => {
            const styles = getTypeStyles(update.type);
            const Icon = styles.icon;

            return (
              <div key={update.id} className="relative flex flex-col md:flex-row gap-8 group">
                {/* Timeline Dot & Icon */}
                <div className="hidden md:flex absolute right-0 items-center justify-center w-14 h-14 bg-white border-4 border-[#F8FAFC] rounded-2xl shadow-xl z-10 transition-transform group-hover:scale-110 group-hover:rotate-6">
                  <div className={`w-full h-full rounded-xl flex items-center justify-center ${styles.bg} ${styles.color}`}>
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Content Side */}
                <div className="md:mr-20 flex-1">
                  <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-primary-100/20 transition-all duration-500 group-hover:border-primary-100">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${styles.bg} ${styles.color} ${styles.border}`}>
                          {styles.label}
                        </span>
                        <span className="text-[11px] font-bold text-gray-300 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                          {update.version}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                        <Calendar size={14} />
                        {update.date}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {update.title}
                    </h3>
                    <p className="text-gray-500 font-bold text-sm leading-relaxed mb-6">
                      {update.description}
                    </p>

                    {update.points && (
                      <div className="space-y-3 pt-6 border-t border-gray-50">
                        {update.points.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-3">
                            <div className="mt-1 w-5 h-5 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 size={12} strokeWidth={3} />
                            </div>
                            <span className="text-sm font-bold text-gray-600">{point}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-8 flex justify-end">
                      <button className="flex items-center gap-2 text-[11px] font-bold text-primary-600 hover:gap-3 transition-all group/btn">
                        عرض التفاصيل الفنية
                        <ChevronLeft size={14} className="group-hover/btn:-translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-20 p-10 bg-gray-50 rounded-[3rem] border border-gray-100 text-center relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-100 rounded-full blur-3xl opacity-30"></div>
        <div className="relative z-10">
          <Package size={40} className="text-primary-200 mx-auto mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">هل لديك اقتراح لميزة جديدة؟</h4>
          <p className="text-gray-400 font-bold text-sm mb-6">نحن نستمع دائماً لمجتمعنا لتطوير أفضل تجربة ممكنة.</p>
          <button className="px-8 py-3 bg-gray-900 text-white rounded-2xl text-xs font-bold hover:bg-black transition-all shadow-xl shadow-gray-200">
            إرسال اقتراح
          </button>
        </div>
      </div>
    </div>
  );
};
