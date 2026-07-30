import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Users, Globe, Smartphone, Clock, BarChart3, TrendingUp, Monitor, Zap } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'ديموغرافية واستخدام الإنترنت',
  titleEn: 'Internet Demographics & Use',
  subtitle: 'تحليل أعداد مستخدمي الإنترنت، معدلات الانتشار حسب العمر والجنس، والوقت اليومي المستغرق عبر الإنترنت',
  icon: Users,
  accent: 'indigo',
  pdfLabel: 'تقرير استخدام الإنترنت العالمي (PDF)',

  kpis: [
    { label: 'عدد مستخدمي الإنترنت عالمياً', value: '5.3', unit: 'مليار', icon: Globe },
    { label: 'متوسط الوقت اليومي عبر الإنترنت', value: '6:37', unit: 'ساعات', icon: Clock },
    { label: 'الفئة العمرية الأكثر نشاطاً', value: '16-24', unit: 'عاماً', icon: Zap },
  ],

  topMarkets: [
    { 
      label: 'أعلى معدل انتشار عالمي', 
      country: 'شمال أوروبا (الدنمارك/النرويج)', 
      note: 'تحقق هذه الدول أعلى معدلات انتشار للإنترنت في العالم بنسب تقترب من الإشباع الكامل (100%).',
      icon: Globe
    },
    { 
      label: 'أكثر الأسواق نضجاً', 
      country: 'أمريكا الشمالية', 
      note: 'تتميز بأعلى مستويات استخدام الإنترنت اليومي وأكبر قوة شرائية عبر المنصات الرقمية.',
      icon: Monitor
    },
    { 
      label: 'أسرع سرعات إنترنت', 
      country: 'شرق آسيا (كوريا الجنوبية/اليابان)', 
      note: 'تمتلك أفضل بنية تحتية للألياف الضوئية وتتصدر العالم في متوسط سرعات التحميل والاستخدام الكثيف.',
      icon: Zap
    }
  ],

  navItems: ['نظرة عامة', 'معدلات الانتشار', 'الديموغرافية', 'الأجهزة المستخدمة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'اتساع الرقعة الرقمية العالمية',
      subtitle: 'Global Online Population',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يستمر عدد مستخدمي الإنترنت في النمو على مستوى العالم. ومع وصول معدل الانتشار في الدول المتقدمة إلى 100% تقريباً، لا يزال هناك مليارات الأشخاص في المناطق النامية بانتظار الاتصال الأول.
          </p>
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-4">
             <Smartphone className="text-indigo-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-indigo-900 leading-tight">التحول الجوهري نحو الهاتف المحمول</p>
                <p className="text-sm text-indigo-700/80 mt-2">
                  يغير الإنترنت المحمول الطريقة التي يتواصل بها الناس، خاصة في المناطق التي تفتقر للبنية التحتية التقليدية للإنترنت الأرضي.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'penetration',
      title: 'الانتشار حسب المناطق (2024-2025)',
      subtitle: 'Regional Internet Penetration',
      content: (
        <div className="space-y-6 text-right">
          <p>
            وصل معدل انتشار الإنترنت العالمي إلى أكثر من 67% بحلول عام 2024. تتصدر شمال أوروبا وأمريكا الشمالية القائمة، بينما تظل أفريقيا الوسطى وجنوب آسيا في مراحل النمو.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-indigo-600 mb-2" size={20} />
                <p className="font-black text-slate-900">شمال أوروبا</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تحقق أعلى معدلات انتشار للإنترنت في العالم بنسبة تقترب من الإشباع الكامل.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-indigo-600 mb-2" size={20} />
                <p className="font-black text-slate-900">المناطق النامية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">من المتوقع أن تشهد المناطق الأقل نمواً زيادة هائلة مع توفر الهواتف الذكية منخفضة الميزانية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'demographics',
      title: 'من هم مستخدمو الإنترنت اليوم؟',
      subtitle: 'User Age & Gender Groups',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يعتبر جيل Z (16-24 عاماً) هم "المواطنون الرقميون" الأكثر نشاطاً، بينما يقضي جيل الألفية والجيل X وقتاً أقل نسبياً مقارنة بالأصغر سناً.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Monitor className="text-indigo-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">توازن الجنسين</p>
                <p className="text-sm text-slate-400">أصبح استخدام الإنترنت متساوياً بين الجنسين في معظم الأسواق الناضجة والناشئة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <BarChart3 className="text-indigo-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">وقت الاستخدام</p>
                <p className="text-sm text-slate-400">يقضي المستخدمون ساعات طويلة بشكل متزايد عبر الهواتف، بينما يتراجع دور الحواسيب المحمولة والأجهزة اللوحية.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Google (Alphabet)', country: 'USA', note: 'يسيطر على حصة الأسد من البحث وتصفح الويب' },
    { name: 'Meta Platforms', country: 'USA', note: 'يدير كبرى المنصات التي تستحوذ على وقت المستخدمين' },
    { name: 'Reliance Jio', country: 'India', note: 'المحرك الرئيسي لزيادة انتشار الإنترنت في الأسواق الناشئة' },
    { name: 'Comcast', country: 'USA', note: 'من أكبر مزودي البنية التحتية والوصول للنطاق العريض' },
  ],

  definition: 'تشمل ديموغرافية الإنترنت الإحصاءات المتعلقة بخصائص مستخدمي الإنترنت مثل العمر والجنس والموقع الجغرافي والوقت الذي يقضونه والأنشطة التي يقومون بها وكيفية وصولهم للشبكة.',

  industryInsights: [
    'الهواتف الذكية هي الوسيلة المهيمنة للوصول للإنترنت بنسبة تزيد عن 91% من البالغين',
    'متوسط الوقت الذي يقضيه الجيل Z عبر الإنترنت يتجاوز 7 ساعات يومياً في بعض المناطق',
    'الفجوة الرقمية بين المناطق الريفية والحضرية تتقلص بفضل تقنيات الأقمار الصناعية والأبراج المحمولة',
  ],

  tags: ['Internet Users', 'Demographics', 'Online Behavior', 'Mobile Share', 'Penetration Rate'],
};

const InternetDemographicsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default InternetDemographicsDashboard;
