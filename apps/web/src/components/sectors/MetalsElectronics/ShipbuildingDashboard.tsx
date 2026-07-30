import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Anchor, Ship, Waves, Globe, BarChart3, TrendingUp, Shield, Recycle } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع بناء السفن',
  titleEn: 'Shipbuilding Industry',
  subtitle: 'تحليل تصنيع السفن التجارية، ناقلات النفط، سفن الحاويات، والتحول نحو التكنولوجيا الصديقة للبيئة في البحار',
  icon: Anchor,
  accent: 'blue',
  pdfLabel: 'تقرير سوق بناء السفن العالمي (PDF)',

  kpis: [
    { label: 'حجم سوق بناء السفن العالمي', value: '175', unit: 'مليار $', icon: BarChart3 },
    { label: 'الدولة الرائدة عالمياً', value: 'China', unit: 'الصين', icon: Ship },
    { label: 'أكبر فئة من حيث الوزن', value: 'Tankers', unit: 'الناقلات', icon: Waves },
  ],

  topMarkets: [
    { 
      label: 'المنتج المهيمن عالمياً', 
      country: 'الصين', 
      note: 'تمتلك أكبر حصة سوقية في بناء السفن التجارية وسفن الصب الجاف، وتنافس بقوة في سوق ناقلات الحاويات.',
      icon: Ship
    },
    { 
      label: 'رائد التكنولوجيا والغاز', 
      country: 'كوريا الجنوبية', 
      note: 'تتصدر العالم في بناء السفن عالية القيمة والتعقيد، خاصة ناقلات الغاز الطبيعي المسال (LNG) والسفن الصديقة للبيئة.',
      icon: Anchor
    },
    { 
      label: 'مركز الجودة والابتكار', 
      country: 'اليابان', 
      note: 'تحتل المرتبة الثالثة عالمياً وتركز على بناء السفن بابتكارات تقنية تزيد من كفاءة الوقود وتخفض الانبعاثات.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'أنواع السفن', 'البيئة والشحن', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'صناعة استراتيجية كثيفة رأس المال',
      subtitle: 'Cyclical & Capital Intensive Business',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يعد بناء السفن قطاعاً دورياً يتطلب استثمارات ضخمة. تتصدر الصين وكوريا الجنوبية واليابان هذا المشهد العالمي، حيث تنتج السفن التجارية العملاقة التي تنقل التجارة الدولية عبر المحيطات.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Ship className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">ناقلات النفط والحاويات</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تمثل ناقلات النفط وسفن البضائع السائبة والحاويات العمود الفقري للأسطول العالمي، مع زيادة كبيرة في طلبات سفن الحاويات الجديدة مؤخراً.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'market-insights',
      title: 'رؤى السوق وتسليم السفن',
      subtitle: 'Global Deliveries & Order Books',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعتبر "سفن البضائع السائبة" (Bulk Carriers) هي الفئة الرائدة من حيث التسليمات العالمية، بينما تظل السفن السياحية قطاعاً متخصصاً يتطلب تكنولوجيا متقدمة ورفاهية عالية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Shield className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">اللوائح البيئية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">دخلت لوائح بيئية مشددة حيز التنفيذ في 2020، مما حفز الطلب على تقنيات تقليل الانبعاثات وفلاتر العادم (Scrubbers).</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سعة الحاويات</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">من المتوقع أن يضيف الأسطول الجديد من سفن الحاويات سعة ضخمة للأسطول العالمي خلال السنوات القادمة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'recycling',
      title: 'تفكيك السفن وإعادة التدوير',
      subtitle: 'Shipbreaking & Environment',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يواجه قطاع تفكيك السفن ضغوطاً لتبني معايير دولية جديدة لحماية البيئة والعمال، مما يغير وجه صناعة إعادة تدوير السفن القديمة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Globe className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">كوريا الجنوبية واليابان</p>
                <p className="text-sm text-slate-400">تظل كوريا واليابان بؤرتين أساسيتين للابتكار في بناء السفن المتخصصة عالية القيمة مثل ناقلات الغاز المسال.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Recycle className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الاستدامة البحرية</p>
                <p className="text-sm text-slate-400">يزداد التوجه نحو استخدام أنواع وقود بديلة (مثل الأمونيا والميثانول) لتشغيل المحركات البحرية العملاقة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'China State Shipbuilding', country: 'China', note: 'المجمع الأكبر لبناء السفن في العالم من حيث حجم الطلبيات' },
    { name: 'HD Hyundai', country: 'South Korea', note: 'الرائد العالمي في بناء ناقلات الغاز والحلول البحرية ذكية' },
    { name: 'Imabari Shipbuilding', country: 'Japan', note: 'أكبر شركة لبناء السفن في اليابان متخصصة في الحاويات والناقلات' },
    { name: 'Philly Shipyard', country: 'USA', note: 'لاعب رئيسي في بناء السفن التجارية في الولايات المتحدة' },
  ],

  definition: 'يغطي قطاع بناء السفن تصنيع السفن التجارية بما في ذلك الناقلات، سفن الحاويات، السفن السياحية، واليخوت الضخمة، بالإضافة إلى تفكيك وإعادة تدوير السفن.',

  industryInsights: [
    'ارتفاع أسعار الشحن في 2021 أدى إلى طفرة تاريخية في طلبات بناء السفن الجديدة',
    'التحول نحو بناء السفن السياحية العملاقة يتطلب خبرات هندسية وفنية نادرة جداً',
    'تقنيات الملاحة الذاتية بدأت تظهر في تصميمات الجيل القادم من سفن الشحن',
  ],

  tags: ['Shipbuilding', 'Maritime', 'Tankers', 'Containers', 'China', 'South Korea'],
};

const ShipbuildingDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default ShipbuildingDashboard;
