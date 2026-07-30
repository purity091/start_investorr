import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Cpu, Battery, Zap, Globe, BarChart3, TrendingUp, Settings, Recycle } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع الإلكترونيات',
  titleEn: 'Electronics Sector',
  subtitle: 'تحليل المكونات الكهربائية، البطاريات المتطورة، الأتمتة الصناعية، وإنترنت الأشياء (IIoT)',
  icon: Cpu,
  accent: 'blue',
  pdfLabel: 'تقرير سوق الإلكترونيات العالمي (PDF)',

  kpis: [
    { label: 'إيرادات السوق الصينية', value: '2', unit: 'ترليون $', icon: Globe },
    { label: 'إيرادات صناعة الأقمار الصناعية', value: '279', unit: 'مليار $', icon: Zap },
    { label: 'عائدات الأتمتة (ألمانيا)', value: '13.6', unit: 'مليار €', icon: Settings },
  ],

  topMarkets: [
    { 
      label: 'أكبر منتج إلكترونيات عالمي', 
      country: 'الصين', 
      note: 'تستحوذ على الحصة الأكبر من التصنيع العالمي وتتصدر في إنتاج المكونات والبطاريات.',
      icon: Globe
    },
    { 
      label: 'رائد التصميم والابتكار', 
      country: 'الولايات المتحدة', 
      note: 'تقود العالم في تصميم الرقائق المتقدمة، البرمجيات المدمجة، وتكنولوجيا الفضاء.',
      icon: Cpu
    },
    { 
      label: 'مركز الدقة والتكنولوجيا', 
      country: 'اليابان', 
      note: 'تتميز في صناعة المكونات الدقيقة، الروبوتات الصناعية، والإلكترونيات الاستهلاكية الراقية.',
      icon: Settings
    }
  ],

  navItems: ['نظرة عامة', 'الأتمتة والروبوتات', 'تكنولوجيا البطاريات', 'الاستدامة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'محرك التقدم التكنولوجي الحديث',
      subtitle: 'The Building Blocks of Innovation',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            منذ نشأته، يوفر قطاع الإلكترونيات المعدات والمكونات التي تجعل التطور التكنولوجي ممكناً. تعتمد الصناعات الحديثة مثل التجارة الإلكترونية، والسيارات الذكية، والتصنيع على اللبنات الأساسية التي توفرها المكونات الكهربائية.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Cpu className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">الاعتماد العالمي المتبادل (B2B)</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  يعتبر قطاع الإلكترونيات صناعة قائمة على الشركات (B2B) بشكل أساسي، حيث تخدم أسواقه الكبرى كلاً من الصين، الولايات المتحدة، اليابان، كوريا الجنوبية، وألمانيا.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'automation',
      title: 'الأتمتة والروبوتات الصناعية',
      subtitle: 'Automation & Robotics Trends',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد الأتمتة في الإنتاج الصناعي و"إنترنت الأشياء الصناعي" (IIoT) من التوجهات الرئيسية، حيث تواجه الصناعة طلباً متزايداً على الروبوتات الذكية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">صمود سوق آسيا</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">برزت آسيا كأكثر المناطق مرونة، حيث حققت الصين وحدها إيرادات تخطت 2 ترليون دولار في عام 2021.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">إنترنت الأشياء (IoT)</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أصبح دمج المستشعرات والذكاء الرقمي في المعدات التقليدية هو القاعدة الجديدة لزيادة الإنتاجية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'batteries',
      title: 'ثورة البطاريات والطاقة النظيفة',
      subtitle: 'The Energy Storage Revolution',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبح تصنيع بطاريات الليثيوم أيون العمود الفقري للانتقال إلى الطاقة النظيفة، خاصة في صناعة السيارات الكهربائية.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Battery className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">ريادة CATL الصينية</p>
                <p className="text-sm text-slate-400">تتصدر شركة CATL مشهد تصنيع البطاريات عالمياً، مما يعزز مكانة الصين كقوة عظمى في سلاسل توريد الطاقة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Recycle className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">إعادة تدوير الإلكترونيات</p>
                <p className="text-sm text-slate-400">يمثل التخلص من النفايات الإلكترونية تحدياً بيئياً، ولكنه يخلق أيضاً فرصاً استثمارية في مجال إعادة تدوير المعادن الثمينة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Samsung Electronics', country: 'South Korea', note: 'الرائد العالمي في إنتاج أشباه الموصلات والمكونات الإلكترونية' },
    { name: 'CATL', country: 'China', note: 'المصنع الأكبر لبطاريات الليثيوم أيون في العالم' },
    { name: 'Siemens', country: 'Germany', note: 'العملاق المتخصص في الأتمتة الصناعية والأنظمة الكهربائية الذكية' },
    { name: 'ABB Group', country: 'Switzerland', note: 'قائد عالمي في تقنيات الروبوتات والشبكات الكهربائية المتطورة' },
  ],

  definition: 'يشمل قطاع الإلكترونيات تصميم وتصنيع الأنظمة والمكونات الإلكترونية، مثل البطاريات، أنظمة الإضاءة، المستشعرات، المحركات، والروبوتات الصناعية.',

  industryInsights: [
    'تعد الصين المورد الأول للمكونات الإلكترونية لمعظم الصناعات التحويلية في العالم',
    'الطلب على "إلكترونيات السيارات" يتضاعف مع التحول نحو القيادة الذاتية والسيارات الكهربائية',
    'تقنيات الطباعة ثلاثية الأبعاد (Additive Manufacturing) بدأت في تغيير نموذج إنتاج المكونات المعقدة',
  ],

  tags: ['Electronics', 'Automation', 'Robotics', 'IoT', 'Batteries', 'Semiconductors'],
};

const ElectronicsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default ElectronicsDashboard;
