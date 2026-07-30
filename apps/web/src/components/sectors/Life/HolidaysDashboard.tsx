import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Calendar, Gift, Star, Moon, Sun, ShoppingCart, BarChart3, TrendingUp, Map } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'العطلات الرسمية والدينية',
  titleEn: 'Public & Religious Holidays',
  subtitle: 'تحليل المناسبات الدينية الكبرى، عادات التسوق في الأعياد، حركة السياحة الموسمية، وتقاليد العطلات العالمية',
  icon: Calendar,
  accent: 'amber',
  pdfLabel: 'تقرير العطلات والمواسم (PDF)',

  kpis: [
    { label: 'المحتفلون برمضان عالمياً', value: '2.0', unit: 'مليار شخص', icon: Moon },
    { label: 'سياح المهرجان الربيعي (الصين)', value: '308', unit: 'مليون شخص', icon: Map },
    { label: 'أهم حدث وطني (أمريكا)', value: 'Memorial', unit: 'يوم الذكرى', icon: Star },
  ],

  navItems: ['نظرة عامة', 'عيد الميلاد (Christmas)', 'رمضان وعيد الفطر', 'رأس السنة القمرية', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'أهمية العطلات في الثقافة والاقتصاد',
      subtitle: 'Cultural & Economic Impact',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تختلف العطلات الرسم والدينية من بلد لآخر، وتلعب دوراً محورياً في تعزيز الروابط الاجتماعية وتحفيز النشاط الاقتصادي. فبينما تتعلق بعض العطلات بأديان محددة (مثل رمضان والكريسماس)، تكتسب مناسبات أخرى مثل "عيد الحب" شعبية تجارية عالمية مطردة.
          </p>
          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
             <ShoppingCart className="text-amber-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-amber-900 leading-tight">الاستهلاك الموسمي</p>
                <p className="text-sm text-amber-700/80 mt-2">
                  تعد مواسم الأعياد المحرك الأكبر لقطاع التجزئة عالمياً، حيث يسجل الإنفاق على الهدايا والاحتفالات أرقاماً قياسية سنوياً في معظم دول العالم.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'christmas',
      title: 'عيد الميلاد: الحدث الديني الأكبر',
      subtitle: 'Christmas & Global Retail',
      content: (
        <div className="space-y-6 text-right">
          <p>
            مع ما يقرب من 2.4 مليار مسيحي، يعتبر الكريسماس أكبر حدث ديني عالمي. وعلى الرغم من اختلاف التقاليد، إلا أن وتيرة الاستهلاك والإنفاق تتزايد بشكل هائل في جميع أنحاء العالم حول شهر ديسمبر.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Gift className="text-amber-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الإنفاق على الهدايا</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يتوقع المستهلكون في الولايات المتحدة إنفاق مبالغ ضخمة على الهدايا سنوياً، مما يجعله الموسم الأهم لشركات التجزئة.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-amber-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سياحة الأعياد</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تشهد المطارات والفنادق إشغالاً كاملاً خلال عطلات نهاية العام، مع توجه الناس للسفر والاجتماع بالعائلة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ramadan-lunar',
      title: 'رمضان ورأس السنة القمرية',
      subtitle: 'Ramadan & Lunar New Year',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تتميز هذه العطلات بكونها تعتمد على التقاويم القمرية، مما يجعل توقيتها يتغير سنوياً، وهي تشهد أكبر هجرات بشرية (في الصين) وتجمعات دينية (في العالم الإسلامي).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Moon className="text-amber-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">رمضان وعيد الفطر</p>
                <p className="text-sm text-slate-400">يحتفل أكثر من 2 مليار مسلم برمضان، وينتهي بمهرجان عيد الفطر الذي يستمر 3 أيام من الطعام والروابط العائلية.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Sun className="text-amber-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">رأس السنة الصينية</p>
                <p className="text-sm text-slate-400">تعتبر أكبر هجرة بشرية سنوية في العالم، حيث يسافر ملايين الصينيين للعودة إلى مدنهم الأصلية في مهرجان الربيع.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Holiday Retail Sector', country: 'Global', note: 'المستفيد الأكبر من مواسم الأعياد والأنشطة الشرائية المكثفة' },
    { name: 'Tourism & Travel Industry', country: 'International', note: 'يسجل ذروة النشاط خلال رأس السنة الصينية وأعياد الميلاد' },
    { name: 'E-commerce Platforms', country: 'Global', note: 'تشهد تضاعفاً في مبيعاتها خلال "الجمعة السوداء" ومواسم التخفيضات المرتبطة بالأعياد' },
  ],

  definition: 'يوفر هذا القطاع بيانات حول مختلف العطلات المهمة عالمياً، بما في ذلك الأعياد الدينية الرئيسية (الكريسماس، رمضان، رأس السنة القمرية) والعطلات التجارية والوطنية.',

  industryInsights: [
    'عيد الحب (Valentine\'s) تحول من مناسبة بسيطة إلى حدث تجاري ضخم يدر مليارات الدولارات سنوياً',
    'يؤدي شهر رمضان إلى تغيير جذري في أنماط الاستهلاك الغذائي وبث المحتوى الترفيهي (مسلسلات رمضان)',
    'عيد الشكر في أمريكا يعد بوابة الدخول لموسم التسوق الأكبر في العام (الجمعة السوداء)',
  ],

  tags: ['Holidays', 'Traditions', 'Christmas', 'Ramadan', 'Lunar New Year', 'Gifts'],
};

const HolidaysDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default HolidaysDashboard;
