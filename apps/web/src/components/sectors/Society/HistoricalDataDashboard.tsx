import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { History, Landmark, ShieldCheck, Microscope, BarChart3, TrendingUp, Globe, Clock } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'البيانات التاريخية',
  titleEn: 'Historical Data Industry',
  subtitle: 'تحليل الاتجاهات التاريخية طويلة الأمد، الصراعات، التطور الطبي، والتحولات السياسية والاقتصادية عبر القرون',
  icon: History,
  accent: 'blue',
  pdfLabel: 'تقرير التاريخ والاتجاهات (PDF)',

  kpis: [
    { label: 'عدد ملوك بريطانيا (منذ 827)', value: '67', unit: 'ملك/ة', icon: Landmark },
    { label: 'إجمالي خسائر معركة السوم', value: '1.1', unit: 'مليون', icon: ShieldCheck },
    { label: 'استئصال الجدري عالمياً', value: '1980', unit: 'سنة', icon: Microscope },
  ],

  topMarkets: [
    { 
      label: 'أضخم أرشيف تاريخي وسياسي', 
      country: 'المملكة المتحدة / أوروبا', 
      note: 'تمتلك أقدم السجلات التاريخية والأرشيفات الاستعمارية التي توثق تشكل الدول والحدود العالمية المعاصرة.',
      icon: Landmark
    },
    { 
      label: 'قائد التوثيق التاريخي الرقمي', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر العالم في رقمنة السجلات التاريخية وإتاحة البيانات الضخمة للباحثين عبر الأرشيفات الوطنية (NARA).',
      icon: Clock
    },
    { 
      label: 'مهد الحضارات والبيانات الأثرية', 
      country: 'مصر / العراق / الصين', 
      note: 'مراكز رئيسية للبحث في تاريخ الحضارات القديمة التي شكلت أسس التجارة والعلوم الإنسانية المبكرة.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'ديموغرافيا تاريخية', 'السياسة والحروب', 'الطب والاقتصاد', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'فهم الحاضر عبر الماضي',
      subtitle: 'Understanding the World State',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تتيح لنا دراسة التاريخ فهم كيف ولماذا وصل العالم إلى حالته الحالية، وتعطي رؤى حول المكان الذي نتجه إليه وكيفية التخطيط للمستقبل. يتم باستمرار مراجعة المفاهيم التقليدية للأحداث الماضية مع ظهور بيانات تاريخية جديدة.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Clock className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">التاريخ من "الأسفل إلى الأعلى"</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  أصبح دراسة تجارب الأفراد داخل الفئات أو المجتمعات أكثر شعبية، مما وسع معرفتنا الجماعية بالماضي بما يتجاوز مجرد سرد سير القادة والملوك.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'historical-trends',
      title: 'التحولات الديموغرافية والسياسية',
      subtitle: 'Demographic Transition & Political Leadership',
      content: (
        <div className="space-y-6 text-right">
          <p>
            اجتاح تحول ديموغرافي العالم في القرنين الماضيين، حيث أدى تراجع الوفيات (خاصة بين الرضع) إلى طفرة سكانية هائلة وزيادة في متوسط العمر المتوقع.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سكان العالم 10,000 ق.م</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تُظهر البيانات التاريخية نمواً أُسياً للسكان بعد الثورة الصناعية والتحسينات في الزراعة والطب.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Landmark className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">التحول للديمقراطية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تم استبدال الانظمة الملكية تدريجياً بالديمقراطيات الدستورية، مع توسيع حق الاقتراع ليشمل شرائح أكبر.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'war-medicine-economy',
      title: 'الحروب، الطب، والنمو الاقتصادي',
      subtitle: 'Conflict, Medicine, & Economic Globalization',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أدت الرغبة في التجارة العابرة للقارات إلى عصر الاستعمار وإنشاء العالم المعولم الذي نعيش فيه اليوم. وفي الجانب الطبي، تحول التهديد من الفيروسات القاتلة إلى الأمراض المزمنة بفضل التطعيمات.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <ShieldCheck className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تطور الصراعات المسلحة</p>
                <p className="text-sm text-slate-400">نمت الحروب في حجمها ولكنها تقل في وتيرتها مع مرور الوقت، حيث يتم التركيز الآن على الدبلوماسية الدولية.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <BarChart3 className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">العولمة الاقتصادية</p>
                <p className="text-sm text-slate-400">تُظهر بيانات الـ GDP عبر القرون كيف أثرت الكساد والحروب العالمية على ثروات الأمم واستقرار مواطنيها.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'British Empire History', country: 'UK', note: 'الدراسة التاريخية للتوسع الاستعماري وتأثيره على الحدود السياسية الحالية' },
    { name: 'World Health Organization', country: 'Global', note: 'المصدر الرئيسي لبيانات استئصال الأمراض وتاريخ الصحة العامة' },
    { name: 'U.S. National Archives', country: 'USA', note: 'مخزن ضخم للبيانات التاريخية والوثائق التي شكلت السياسة العالمية' },
    { name: 'Historical Olympics Data', country: 'Global', note: 'تحليل تطور الرياضة كأداة للدبلوماسية والقوة الناعمة عبر العصور' },
  ],

  definition: 'لا تتعامل بيانات ستاتيستا التاريخية مع الأحداث الفردية من الماضي فحسب، بل تنظر أيضاً في كيفية تطور اتجاهات معينة بمرور الوقت، وكيف يتم تصور الماضي اليوم.',

  industryInsights: [
    'تحليل البيانات التاريخية يساعد في التنبؤ بالأزمات الاقتصادية القادمة عبر دراسة دورات السوق الماضية',
    'التحول من الأمراض المعدية إلى المزمنة هو أكبر تحول ديموغرافي صحي في تاريخ البشرية الحديث',
    'استخدام الذكاء الاصطناعي لاسترجاع وتحليل المخطوطات القديمة يفتح آفاقاً جديدة لاكتشاف حقائق تاريخية ضائعة',
  ],

  tags: ['History', 'Leadership', 'War', 'Pandemics', 'Global Trade', 'Demographic Transition'],
};

const HistoricalDataDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default HistoricalDataDashboard;
