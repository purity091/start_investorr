import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Hammer, Home, Sprout, Globe, BarChart3, TrendingUp, ShoppingBag, Paintbrush } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'تجارة تحسين المنازل (DIY)',
  titleEn: 'DIY Retail Industry',
  subtitle: 'تحليل سوق "افعلها بنفسك"، أدوات البناء، تجهيزات الحدائق، وطفرة مراكز تحسين المنازل العالمية',
  icon: Hammer,
  accent: 'orange',
  pdfLabel: 'تقرير سوق DIY العالمي (PDF)',

  kpis: [
    { label: 'إيرادات مواد البناء العالمية', value: '1.7', unit: 'مليار $', icon: BarChart3 },
    { label: 'مبيعات مراكز المنازل (أمريكا)', value: '379', unit: 'مليار $', icon: Home },
    { label: 'عدد متاجر الخردوات (ألمانيا)', value: '2,050', unit: 'متجر', icon: ShoppingBag },
  ],

  topMarkets: [
    { 
      label: 'أضخم سوق DIY عالمياً', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أكبر حصة من الإنفاق العالمي على تحسين المنازل وموطن للعمالقة مثل Home Depot و Lowe\'s.',
      icon: Home
    },
    { 
      label: 'أكبر قاعدة متاجر احترافية', 
      country: 'ألمانيا', 
      note: 'تتميز بأكبر عدد من متاجر DIY (Baumärkte) في أوروبا ومركز ابتكار في مجال أدوات ومعدات الحرف اليدوية.',
      icon: ShoppingBag
    },
    { 
      label: 'المركز الأوروبي للتوسع', 
      country: 'فرنسا / المملكة المتحدة', 
      note: 'أسواق رئيسية لشركات كبرى مثل Kingfisher وLeroy Merlin، مع تركيز عالٍ على الديكور والبستنة.',
      icon: Sprout
    }
  ],

  navItems: ['نظرة عامة', 'أقسام السوق', 'ثورة الـ Omnichannel', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'ثقافة "افعلها بنفسك" والنمو العقاري',
      subtitle: 'Home Improvement & Lifestyle Changes',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تهدف صناعة DIY إلى مساعدة العملاء على تحسين منازلهم دون الحاجة لمساعدة مهنية. يتمتع هذا السوق بنمو قوي مدفوعاً بقطاع العقارات السكنية وتغير أنماط الحياة، خاصة في مجالات الديكور والحدائق والمساحات الخارجية.
          </p>
          <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-4">
             <Paintbrush className="text-orange-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-orange-900 leading-tight">هيمنة مواد البناء</p>
                <p className="text-sm text-orange-700/80 mt-2">
                  تولد الأدوات ومواد البناء أعلى إيرادات في الصناعة مقارنة بالأقسام الأخرى مثل طلاء المنازل والأدوات الصحية، مع توقعات بوصول المبيعات السنوية لمستويات قياسية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'أقسام السوق: من الأرضيات إلى الحدائق',
      subtitle: 'Flooring, Decor & Gardening Segments',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد الأرضيات والديكور والبستنة من أهم أقسام السوق. من المتوقع أن يصل سوق الأرضيات العالمي وحده إلى 420 مليار دولار بحلول عام 2031 نتيجة زيادة الإنفاق الإنشائي.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-orange-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق مراكز المنازل</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تولد غالبية إيرادات السوق في مراكز المنازل الكبيرة (Home Centers)، خاصة في الأسواق الناضجة كأمريكا وأوروبا.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-orange-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الصين وأوروبا</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">بينما تقود أمريكا المبيعات، تمتلك أوروبا أوسع نطاق من شركات الـ DIY المنتشرة في كافة دول القارة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'omnichannel',
      title: 'نهج التسوق المتكامل والدروس الرقمية',
      subtitle: 'Establishing an Omnichannel Experience',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبحت الراحة التي توفرها المتاجر الإلكترونية اتجاهاً رئيسياً، حيث يفضل المستهلكون البحث عبر الإنترنت ثم الشراء أو الاستلام من المتجر الفعلي (BOPIS).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-orange-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">القنوات التعليمية</p>
                <p className="text-sm text-slate-400">تساعد قنوات الدروس التعليمية (Tutorial Channels) على تحفيز العملاء لخوض مشاريع تحسين منازلهم بأنفسهم، مما يرفع المبيعات.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Sprout className="text-orange-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الحدائق المنزلية</p>
                <p className="text-sm text-slate-400">تعتبر فئة "الحديقة الداخلية" هي الأكثر ربحية لعمالقة مثل Home Depot، حيث تتجاوز مبيعاتها 15 مليار دولار سنوياً.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'The Home Depot', country: 'USA', note: 'الرائد العالمي في تجارة DIY وصاحب أعلى مبيعات سنوية (153 مليار $)' },
    { name: 'Lowe\'s', country: 'USA', note: 'المنافس الأكبر في أمريكا الشمالية ويركز على حلول تحسين المنازل المتكاملة' },
    { name: 'Kingfisher', country: 'UK', note: 'عملاق أوروبي يمتلك علامات تجارية كبرى مثل B&Q و Castorama' },
    { name: 'IKEA', country: 'Sweden', note: 'رغم تخصصها في الأثاث، إلا أنها تلعب دوراً محورياً في قسم الديكور وتحسين المساحات' },
  ],

  definition: 'تشمل تجارة DIY توزيع وبيع المنتجات المستخدمة في إصلاح وتزيين وتحسين المنازل والحدائق من قبل المستهلكين الأفراد، وتغطي مواد البناء، الأرضيات، الطلاء، والأدوات.',

  industryInsights: [
    'الولايات المتحدة هي السوق الأكثر نضجاً في عالم DIY بفضل ثقافة الصيانة المنزلية الذاتية',
    'النمو في سوق العقارات السكنية هو المحرك المباشر لزيادة مبيعات مراكز تحسين المنازل',
    'التحول نحو "المنازل الذكية" يخلق فرصاً ضخمة في قسم الأدوات الكهربائية والتركيبات المتقدمة',
  ],

  tags: ['DIY Retail', 'Home Improvement', 'Hardware', 'Home Depot', 'Gardening', 'Omnichannel'],
};

const DIYRetailDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default DIYRetailDashboard;
