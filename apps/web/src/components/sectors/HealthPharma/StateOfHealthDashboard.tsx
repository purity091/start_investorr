import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Activity, Heart, Thermometer, Waves, Timer, BarChart3, TrendingUp, ShieldAlert, Biohazard } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'حالة الصحة العامة والوقاية',
  titleEn: 'State of Health & Prevention',
  subtitle: 'تحليل انتشار الأمراض المزمنة، مأمول العمر، الأوبئة العالمية، وعوامل الخطر الصحية',
  icon: Activity,
  accent: 'emerald',
  pdfLabel: 'تقرير الحالة الصحية العالمية (PDF)',

  kpis: [
    { label: 'مأمول العمر العالمي (2025)', value: '73.4', unit: 'سنة', icon: Timer },
    { label: 'وفيات الأمراض غير المعدية', value: '74%', unit: 'من الوفيات العالمية', icon: Heart },
    { label: 'انتشار السمنة عالمياً', value: '13%', icon: ShieldAlert },
  ],

  topMarkets: [
    { 
      label: 'أعلى مأمول عمر في العالم', 
      country: 'اليابان', 
      note: 'تتصدر العالم في طول العمر بفضل نظامها الغذائي والرعاية الصحية المتقدمة، وتعد نموذجاً عالمياً للشيخوخة الصحية.',
      icon: Timer
    },
    { 
      label: 'أفضل جودة حياة صحية أوروبية', 
      country: 'سويسرا', 
      note: 'تُصنف باستمرار ضمن أفضل الدول في كفاءة النظام الصحي وجودة النتائج الطبية لمواطنيها.',
      icon: ShieldAlert
    },
    { 
      label: 'رائد الكفاءة الصحية الآسيوي', 
      country: 'سنغافورة', 
      note: 'تمتلك واحداً من أكفأ الأنظمة الصحية في العالم، مع تحقيق نتائج صحية مذهلة بإنفاق مدروس وفعال.',
      icon: Activity
    }
  ],

  navItems: ['نظرة عامة', 'الأمراض المزمنة', 'مأمول العمر', 'عوامل الخطر', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'خارطة الصحة العالمية الحالية',
      subtitle: 'Global Health Landscape',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            طرأت تغييرات جوهرية على حالة الصحة العالمية في العقود الأخيرة. بينما تم القضاء على العديد من الأمراض المعدية، برزت الأمراض المزمنة (مثل السكري والقلب) كأكبر مهدد للصحة العامة والاقتصاد العالمي.
          </p>
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4">
             <Biohazard className="text-emerald-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-emerald-900 leading-tight">تأثير الأوبئة الحديثة</p>
                <p className="text-sm text-emerald-700/80 mt-2">
                  أعادت جائحة كورونا تعريف أولويات الصحة العامة، مع التركيز المكثف على أنظمة الترصد الوبائي وتطوير اللقاحات السريعة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'chronic-diseases',
      title: 'عبء الأمراض غير المعدية (NCDs)',
      subtitle: 'Chronic Diseases Burden',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد أمراض القلب والأوعية الدموية والسرطان والسكري مسؤولية عن الغالبية العظمى من الوفيات في الدول المتقدمة والنامية على حد سواء.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Thermometer className="text-emerald-600 mb-2" size={20} />
                <p className="font-black text-slate-900">السكري والسمنة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">وصلت معدلات السمنة إلى مستويات وبائية، مما أدى إلى زيادة حادة في حالات السكري من النوع الثاني عالمياً.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-emerald-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الصحة النفسية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">هناك اعتراف متزايد بعبء اضطرابات الصحة النفسية (مثل الاكتئاب والقلق) على الإنتاجية العالمية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'longevity',
      title: 'مأمول العمر وجودة الحياة',
      subtitle: 'Life Expectancy Trends',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            شهد مأمول العمر زيادة مطردة بفضل التحسينات في التغذية والصرف الصحي والطب، لكن هذه الزيادة تفرض تحديات اقتصادية تتعلق برعاية المسنين.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
             <div className="p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center shrink-0 w-full md:w-64 text-center">
                <BarChart3 size={40} className="text-emerald-400 mb-4" />
                <p className="text-3xl font-black text-white">84.7</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">أعلى مأمول عمر عالمياً (اليابان)</p>
             </div>
             <div className="flex-1 space-y-4">
                <p className="text-slate-400">
                  تضيق الفجوة في مأمول العمر بين الدول الغنية والفقيرة ببطء، بفضل برامج التحصين العالمية والحد من وفيات الأمهات والأطفال.
                </p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'WHO', country: 'International', note: 'المنظمة الرائدة عالمياً في تنسيق الاستجابات الصحية العامة' },
    { name: 'CDC', country: 'USA', note: 'المرجع العالمي الأول في مكافحة الأمراض والوقاية منها' },
    { name: 'Gavi', country: 'International', note: 'تحالف عالمي لتوفير اللقاحات للدول منخفضة الدخل' },
  ],

  definition: 'تشير حالة الصحة إلى العبء الإجمالي للمرض والوفيات داخل السكان، بينما تشمل الوقاية التدخلات المصممة للحد من مخاطر الأمراض قبل وقوعها أو تقليل مضاعفاتها.',

  industryInsights: [
    'الوقاية الأولية توفر للدول حوالي 4 دولارات مقابل كل دولار يُنفق في الرعاية الصحية اللاحقة',
    'تلعب المحددات الاجتماعية للصحة (مثل التعليم والدخل) دوراً أكبر من الخدمات الطبية في تحديد مأمول العمر',
    'التحول نحو "الصحة الواحدة" (One Health) يربط بين صحة الإنسان والحيوان والبيئة لمنع الأوبئة المستقبلية',
  ],

  tags: ['Public Health', 'Epidemiology', 'Chronic Disease', 'Prevention', 'Longevity'],
};

const StateOfHealthDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default StateOfHealthDashboard;
