import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Plane, Shield, Navigation, Globe, BarChart3, TrendingUp, DollarSign, Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'تصنيع الطيران والدفاع',
  titleEn: 'Aerospace & Defense Manufacturing',
  subtitle: 'تحليل صناعة الطائرات التجارية، تكنولوجيا الدفاع، استكشاف الفضاء الخاص، والتعافي الصناعي العالمي',
  icon: Plane,
  accent: 'blue',
  pdfLabel: 'تقرير الطيران والدفاع (PDF)',

  kpis: [
    { label: 'حجم أسطول الطائرات العالمي', value: '28,398', unit: 'طائرة', icon: Plane },
    { label: 'إيرادات بويينغ السنوية', value: '77.8', unit: 'مليار $', icon: DollarSign },
    { label: 'سوق الخدمات (أمريكا الشمالية)', value: '1', unit: 'ترليون $', icon: Globe },
  ],

  topMarkets: [
    { 
      label: 'القوة الجوية والدفاعية الأولى', 
      country: 'الولايات المتحدة', 
      note: 'تستحوذ على 40% من الإنفاق العسكري العالمي وموطن عمالقة الصناعة مثل بويينغ ولوكهيد مارتن.',
      icon: Shield
    },
    { 
      label: 'قطب تصنيع الطيران الأوروبي', 
      country: 'فرنسا', 
      note: 'تعد المركز الرئيسي لشركة إيرباص وتمتلك واحدة من أكثر سلاسل التوريد تقدماً في مكونات الطائرات والمحركات.',
      icon: Plane
    },
    { 
      label: 'رائد تكنولوجيا الفضاء الخاص', 
      country: 'الولايات المتحدة (SpaceX)', 
      note: 'أحدثت ثورة في تكاليف الوصول إلى الفضاء عبر الصواريخ القابلة لإعادة الاستخدام، وتهيمن على سوق الإطلاق التجاري.',
      icon: Rocket
    }
  ],

  navItems: ['نظرة عامة', 'الدفاع والتسلح', 'سباق الفضاء الجديد', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'صناعة الطيران: رحلة التعافي والنمو',
      subtitle: 'Aerospace Recovery & Expansion',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تمر صناعة الطيران بمرحلة تعافي قوية بعد الجائحة، مع زيادة مطردة في طلبات الطائرات الجديدة. ومع ذلك، يواجه القطاع تحديات تتعلق بنقص المهارات وارتفاع التكاليف، مع التركيز المتزايد على تقنيات تقليل التأثير البيئي للطيران.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Navigation className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">هيمنة ثنائي "إيرباص وبويينغ"</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  يشكل عمالقة الصناعة إيرباص وبويينغ احتكاراً واقعياً لسوق طائرات الركاب الكبيرة، مع نماذج ناجحة جداً مثل A320 وB737.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'defense',
      title: 'تكنولوجيا الدفاع والإنفاق العسكري',
      subtitle: 'Modern Defense Manufacturing',
      content: (
        <div className="space-y-6 text-right">
          <p>
            حافظ الفصاع الدفاعي على اتجاه تصاعدي، حيث تستحوذ الولايات المتحدة على حوالي 40% من الإنفاق العسكري العالمي.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Shield className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الاستخبارات والدرونز</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أصبحت تقنيات الاستطلاع (ISTAR) والطائرات المسيرة (UAVs) المحرك الرئيسي لنمو مبيعات الدفاع العالمية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الأمن السيبراني الدفاعي</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تزايد الطلب على حلول حماية البنية التحتية العسكرية من الهجمات الرقمية كجزء من استراتيجيات الدفاع الحديثة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'space-race',
      title: 'سباق الفضاء الجديد والقطاع الخاص',
      subtitle: 'The New Private Space Race',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            شهدت السنوات الأخيرة تحولاً جذرياً من سيطرة الوكالات الحكومية إلى ريادة القطاع الخاص (مثل SpaceX وBlue Origin) في استكشاف الفضاء.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Rocket className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">صواريخ قابلة لإعادة الاستخدام</p>
                <p className="text-sm text-slate-400">يركز الابتكار الحالي على بناء مركبات فضائية قابلة لإعادة الاستخدام لخفض تكاليف إطلاق الأقمار الصناعية والرحلات البشرية.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الاستثمار في الفضاء</p>
                <p className="text-sm text-slate-400">تستقطب الشركات الناشئة في مجال الفضاء مليارات الدولارات من رأس المال الجريء لتطوير بنية تحتية مدارية جديدة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Boeing', country: 'USA', note: 'الرائد العالمي في صناعة الطائرات التجارية والدفاعية (إيرادات 77.8 مليار $)' },
    { name: 'Airbus', country: 'France/EU', note: 'المنافس الأكبر لبويينغ وصاحب أكبر عدد من الطلبات المؤكدة لعام 2024' },
    { name: 'Lockheed Martin', country: 'USA', note: 'أكبر شركة دفاعية في العالم متخصصة في الطائرات المقاتلة (F-35)' },
    { name: 'SpaceX', country: 'USA', note: 'المحرك الرئيسي لثورة الفضاء الخاص وتقنيات الإطلاق القابلة لإعادة الاستخدام' },
  ],

  definition: 'يشمل قطاع تصنيع الطيران والدفاع إنتاج الطائرات التجارية والعسكرية، مركبات الفضاء، المحركات وقطع الغيار، بالإضافة إلى خدمات الصيانة والإصلاح (MRO).',

  industryInsights: [
    'الولايات المتحدة وفرنسا وألمانيا هي الدول الرائدة في تصدير منتجات الطيران عالمياً',
    'التركيز على تقنيات "الطيران المستدام" سيحدد قادة الصناعة في العقد القادم',
    'تغيرت موازين القوى في الفضاء مع دخول الشركات الخاصة التي توفر خدمات الإطلاق بأسعار تنافسية',
  ],

  tags: ['Aerospace', 'Defense', 'Aviation', 'Space Race', 'Boeing', 'Airbus'],
};

const AerospaceDefenseDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default AerospaceDefenseDashboard;
