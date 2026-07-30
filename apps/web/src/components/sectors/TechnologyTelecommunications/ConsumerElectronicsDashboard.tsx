import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Smartphone, Tv, Watch, BarChart3, TrendingUp, Globe, Sparkles, Recycle } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الإلكترونيات الاستهلاكية',
  titleEn: 'Consumer Electronics Industry',
  subtitle: 'تحليل سوق الهواتف الذكية، الأجهزة القابلة للارتداء، تقنيات العرض، وتوجهات الاستدامة في المنتجات التقنية',
  icon: Smartphone,
  accent: 'blue',
  pdfLabel: 'تقرير الإلكترونيات الاستهلاكية (PDF)',

  kpis: [
    { label: 'الإنفاق العالمي 2023', value: '685', unit: 'مليار $', icon: Globe },
    { label: 'حجم السوق (وحدات)', value: '8.3', unit: 'مليار وحدة', icon: BarChart3 },
    { label: 'قائد السوق العالمي', value: 'Apple', unit: 'Brand', icon: Sparkles },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق مبيعات إلكترونيات', 
      country: 'الصين', 
      note: 'تتصدر العالم في حجم الاستهلاك المحلي وتعد المركز الأول لإنتاج الهواتف الذكية.',
      icon: Globe
    },
    { 
      label: 'رائد القيمة والبرمجيات', 
      country: 'الولايات المتحدة', 
      note: 'تسيطر على معظم أرباح القطاع بفضل قوة العلامات التجارية وتكامل الأنظمة البرمجية.',
      icon: Smartphone
    },
    { 
      label: 'مركز الدقة والتصنيع', 
      country: 'اليابان', 
      note: 'موطن الابتكار في الكاميرات، أجهزة الصوت، وتقنيات العرض المتقدمة.',
      icon: Sparkles
    }
  ],

  navItems: ['نظرة عامة', 'قطاعات السوق', 'الواقع الممتد XR', 'الاستدامة والتدوير', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'سوق يتجاوز التريليون دولار',
      subtitle: 'A Trillion-Dollar Consumer Market',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            رغم التباطؤ الاقتصادي العالمي في 2022، أظهر قطاع الإلكترونيات الاستهلاكية مرونة مذهلة. من المتوقع أن يصل حجم السوق إلى 1.13 تريليون دولار بحلول عام 2025، مدفوعاً بالابتكار المستمر في الهواتف الذكية وأجهزة الترفيه المنزلي.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Smartphone className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">هيمنة الهواتف الذكية</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تظل الهواتف الذكية المنتج الأكثر ربحية، حيث تم شحن حوالي 1.2 مليار وحدة عالمياً في عام 2023 وحده.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات النمو والابتكار',
      subtitle: 'Market Segments & Innovation',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تتعدد قطاعات السوق لتشمل التلفزيونات، أجهزة الكمبيوتر الشخصية، الأجهزة اللوحية، والساعات الذكية. تشهد تقنيات العرض الحديثة والذكاء الاصطناعي دمجاً متزايداً في هذه المنتجات لجذب المستهلكين.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Watch className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الأجهزة القابلة للارتداء</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تكتسب الساعات الذكية وسماعات الأذن شعبية متزايدة كملحقات أساسية للهواتف.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Tv className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">تقنيات العرض</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">توقعات بارتفاع مبيعات التلفزيونات الذكية بفضل دقة الشاشات العالية والمحتوى المتصل.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'sustainability',
      title: 'الاستدامة وتدوير الإلكترونيات',
      subtitle: 'Sustainability & Electronics Recycling',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبحت الاستدامة موضوعاً رئيسياً؛ حيث يُتوقع أن يتجاوز سوق إعادة تدوير الإلكترونيات 57 مليار دولار بحلول 2025. تساهم إعادة التدوير في تخفيف أزمة نقص الرقائق وتوفير منتجات مجددة للمستهلكين.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Recycle className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الاقتصاد الدائري</p>
                <p className="text-sm text-slate-400">تتبنى شركات مثل Apple و Samsung برامج استرجاع الأجهزة لإعادة استخدام المواد الثمينة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الأجهزة المجددة</p>
                <p className="text-sm text-slate-400">ينمو سوق الهواتف المجددة (Refurbished) بسرعة كبيرة خاصة في الأسواق الناشئة والولايات المتحدة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Apple Inc.', country: 'USA', note: 'الشركة الرائدة عالمياً في القيمة السوقية والابتكار في الهواتف والأجهزة القابلة للارتداء' },
    { name: 'Samsung Electronics', country: 'South Korea', note: 'عملاق تقني يسيطر على حصص كبيرة في الهواتف الذكية وتكنولوجيا الشاشات' },
    { name: 'Sony Group', country: 'Japan', note: 'رائدة في قطاع الترفيه المنزلي، الكاميرات، ومنصات الألعاب الاحترافية' },
    { name: 'LG Electronics', country: 'South Korea', note: 'مبتكر رئيسي في تقنيات الشاشات OLED والأجهزة المنزلية الذكية' },
  ],

  definition: 'تشمل صناعة الإلكترونيات الاستهلاكية الأجهزة المستخدمة للتواصل والترفيه والمعلومات، مثل الهواتف، التلفزيونات، الحواسيب، وأجهزة الواقع الافتراضي.',

  industryInsights: [
    'الواقع الممتد (XR) بما يشمل AR و VR يمثل القطاع الأسرع نمواً في مستقبل التفاعل الرقمي',
    'الذكاء الاصطناعي التوليدي سيقود موجة الترقية القادمة في الهواتف الذكية لزيادة الإنتاجية',
    'تقليل البصمة الكربونية أصبح معياراً تنافسياً بين العمالقة لجذب الجيل الجديد من المستهلكين الواعين بيئياً',
  ],

  tags: ['Consumer Electronics', 'Smartphones', 'Wearables', 'Apple', 'Samsung', 'Recycling', 'XR'],
};

const ConsumerElectronicsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default ConsumerElectronicsDashboard;
