import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Shield, Umbrella, HeartPulse, Car, Home, TrendingUp, Activity, BarChart3, Globe, Zap, Users } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع التأمين العالمي',
  titleEn: 'Insurance Sector',
  subtitle: 'تحليل سوق الأقساط التأمينية، تأثيرات التضخم، وصعود منصات التأمين المفتوح (Open Insurance)',
  icon: Shield,
  accent: 'indigo',
  pdfLabel: 'تقرير قطاع التأمين (PDF)',

  kpis: [
    { label: 'إجمالي أقساط التأمين عالمياً', value: '6.8', unit: 'تريليون $', icon: BarChart3 },
    { label: 'إيرادات أكبر شركة (Berkshire)', value: '300', unit: 'مليار $', icon: TrendingUp },
    { label: 'مستخدمو التأمين المفتوح (2032)', value: '800', unit: 'مليون', icon: Users },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق تأمين في العالم', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر القائمة بفرق هائل، حيث تتجاوز أقساطها المكتتبة مجموع أكبر 8 أسواق تالية.',
      icon: Globe
    },
    { 
      label: 'عملاق النمو الآسيوي', 
      country: 'الصين', 
      note: 'ثاني أكبر سوق عالمي وموطن للعلامة التجارية الأغلى (Ping An)، مع نمو سريع للطبقة الوسطى.',
      icon: Shield
    },
    { 
      label: 'مركز التأمين العالمي', 
      country: 'المملكة المتحدة', 
      note: 'تعد لندن المركز التاريخي والتقني للتأمين الدولي وإعادة التأمين المتخصص.',
      icon: Umbrella
    }
  ],

  navItems: ['نظرة عامة', 'أقسام السوق', 'التوجهات والابتكار', 'القادة العالميون', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'أضخم من اقتصادات دول: عظمة قطاع التأمين',
      subtitle: 'Larger Than National GDPs',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يُعد قطاع التأمين أحد أضخم الصناعات في العالم، حيث بلغت قيمة الأقساط المكتتبة عالمياً حوالي 6.8 تريليون دولار في عام 2022. لتوضيح ضخامة هذا الرقم، فإن صناعة التأمين العالمية أكبر من إجمالي الناتج المحلي لدول صناعية كبرى مثل اليابان، ألمانيا، والمملكة المتحدة، ولا يتفوق عليها سوى اقتصاد الولايات المتحدة والصين.
          </p>
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-4">
             <Globe className="text-indigo-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-indigo-900 leading-tight">هيمنة السوق الأمريكي</p>
                <p className="text-sm text-indigo-700/80 mt-2">
                  تتصدر الولايات المتحدة السوق العالمي بفارق شاسع، حيث تتجاوز قيمة أقساطها المكتتبة مجموع أكبر 8 أسواق تالية لها مجتمعة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'market-segments',
      title: 'تحول الهيمنة: من التأمين على الحياة إلى التأمين العام',
      subtitle: 'Non-Life vs Life Insurance',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تاريخياً، كان التأمين على الحياة هو الجزء الأكبر من السوق، لكن عام 2017 شهد تحولاً جذرياً حيث استحوذ التأمين العام (تأمين الممتلكات والسيارات والمنازل) على حصة 53% من السوق العالمي.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm flex gap-4 items-center">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                    <Car size={24} />
                </div>
                <div>
                    <p className="font-black text-slate-900">التأمين العام</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">يحمي الممتلكات المادية مثل المنازل، السيارات، والحوادث.</p>
                </div>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm flex gap-4 items-center">
                <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center text-pink-600">
                    <HeartPulse size={24} />
                </div>
                <div>
                    <p className="font-black text-slate-900">التأمين على الحياة</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">يغطي المخاطر المتعلقة بالحياة، الوفاة، والخدمات الصحية.</p>
                </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends-innovation',
      title: 'التضخم والتأمين المفتوح: الوجه الجديد للقطاع',
      subtitle: 'Modern Trends & Open Insurance',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يواجه القطاع حالياً تحديين متناقضين؛ التضخم الذي يرفع تكاليف المطالبات، وارتفاع أسعار الفائدة الذي يحسن عوائد الاستثمار لشركات التأمين. في الوقت نفسه، يبرز "التأمين المفتوح" (Open Insurance) كالثورة القادمة، حيث يتيح مشاركة البيانات عبر APIs، مما سيرفع عدد المستخدمين إلى 800 مليون بحلول 2032.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <Activity className="text-indigo-400 mx-auto mb-3" size={32} />
                <p className="font-black text-white text-lg">تأثير التضخم</p>
                <p className="text-xs text-slate-400 mt-2">زيادة تكاليف الإصلاحات الطبية والمادية ترفع قيمة المطالبات وتضغط على أرباح الشركات.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <Zap className="text-indigo-400 mx-auto mb-3" size={32} />
                <p className="font-black text-white text-lg">Insurtech</p>
                <p className="text-xs text-slate-400 mt-2">التكنولوجيا المالية المخصصة للتأمين تسرع عمليات التسوية وتخفض التكاليف التشغيلية.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <TrendingUp className="text-indigo-400 mx-auto mb-3" size={32} />
                <p className="font-black text-white text-lg">أسعار الفائدة</p>
                <p className="text-xs text-slate-400 mt-2">ارتفاع الفائدة يعوض خسائر التضخم عبر تحسين عوائد المحافظ الاستثمارية الضخمة للشركات.</p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leaders',
      title: 'القوى المهيمنة على سوق التأمين',
      subtitle: 'Global Insurance Giants',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تتصدر Berkshire Hathaway (شركة وارن بافيت) القائمة بإيرادات تتخطى 300 مليار دولار، تليها عمالقة الصين مثل Ping An و China Life، وشركة Allianz الألمانية. هؤلاء اللاعبون يمثلون القوة الضاربة التي تحرك السيولة في الأسواق المالية العالمية والبنك الاستثماري.
          </p>
          <div className="p-6 bg-slate-900 text-white rounded-[2rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/10 to-transparent"></div>
              <div className="relative z-10 flex items-center justify-between">
                  <div>
                      <p className="text-indigo-400 font-black text-xs uppercase tracking-widest">العلامة التجارية الأغلى</p>
                      <h4 className="text-3xl font-black mt-1">Ping An</h4>
                      <p className="text-slate-400 text-sm mt-2">تعتبر الشركة الصينية Ping An هي العلامة التجارية الأكثر قيمة في العالم في هذا القطاع.</p>
                  </div>
                  <BarChart3 className="text-indigo-500/20 group-hover:scale-110 transition-transform" size={100} />
              </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Berkshire Hathaway', country: 'الولايات المتحدة', note: 'المتصدر العالمي من حيث الإيرادات بإجمالي يتجاوز 300 مليار دولار' },
    { name: 'Ping An Insurance', country: 'الصين', note: 'العلامة التجارية الأكثر قيمة عالمياً ورائدة الابتكار التكنولوجي' },
    { name: 'Allianz Group', country: 'ألمانيا', note: 'أكبر شركة تأمين في أوروبا ومن أهم المستثمرين المؤسسيين عالمياً' },
    { name: 'China Life Insurance', country: 'الصين', note: 'اللاعب الأكبر في سوق التأمين على الحياة في قارة آسيا' },
  ],

  definition: 'قطاع التأمين هو نظام مالي يهدف إلى تحويل المخاطر من الفرد إلى المجموعة عبر تجميع الأموال واستثمارها لتغطية الخسائر المحتملة الناتجة عن الأمراض، الوفاة، أو أضرار الممتلكات.',

  industryInsights: [
    'سوق التأمين العالمي أكبر من إجمالي الناتج المحلي لدول مثل اليابان أو ألمانيا',
    '800 مليون مستخدم متوقع لمنصات التأمين المفتوح (Open Insurance) بحلول عام 2032',
    'الولايات المتحدة الأمريكية تستحوذ وحده على حصة تفوق الثمانية أسواق الكبرى التالية لها مجتمعة',
  ],

  tags: ['Insurance', 'Finance', 'Fintech', 'Open Insurance', 'Allianz', 'Ping An', 'Berkshire Hathaway'],
};

const InsuranceDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default InsuranceDashboard;
