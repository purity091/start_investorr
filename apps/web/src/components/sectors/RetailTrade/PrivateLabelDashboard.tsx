import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Tag, ShoppingCart, Zap, Globe, BarChart3, TrendingUp, Package, ShieldCheck } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع العلامات التجارية الخاصة (Private Label)',
  titleEn: 'Private Label Goods Industry',
  subtitle: 'تحليل منتجات "ماركة المتجر"، مقارنة الجودة مقابل السعر، اختراق السوق الأوروبي، وهيمنة العلامات الخاصة في قطاع السلع الاستهلاكية',
  icon: Tag,
  accent: 'blue',
  pdfLabel: 'تقرير سوق العلامات الخاصة (PDF)',

  kpis: [
    { label: 'حصة القيمة السوقية (أوروبا)', value: '36-52%', icon: Globe },
    { label: 'قيمة المبيعات (أمريكا)', value: '236', unit: 'مليار $', icon: BarChart3 },
    { label: 'حصة Walmart من السوق الخاص', value: '28.2%', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'أعلى معدل اختراق عالمي', 
      country: 'سويسرا', 
      note: 'تتصدر العالم في حصة العلامات الخاصة من إجمالي مبيعات التجزئة، حيث يثق المستهلكون السويسريون بشدة في ماركات المتاجر المحلية.',
      icon: ShieldCheck
    },
    { 
      label: 'معقل متاجر العلامات الخاصة', 
      country: 'ألمانيا', 
      note: 'موطن Aldi و Lidl، حيث تعتمد تجربة التسوق بالكامل على العلامات الخاصة عالية الجودة والمنخفضة التكلفة.',
      icon: Globe
    },
    { 
      label: 'أضخم حجم مبيعات نقدية', 
      country: 'الولايات المتحدة', 
      note: 'تشهد نمواً متسارعاً بقيادة عمالقة مثل Walmart و Costco (عبر علامة Kirkland) في ظل التوجه نحو توفير النفقات.',
      icon: BarChart3
    }
  ],

  navItems: ['نظرة عامة', 'أقسام السوق', 'اتجاهات المستهلك', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'بديل الجودة والقيمة الاقتصادية',
      subtitle: 'Comparable Quality & Superior Value',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            العلامات الخاصة هي منتجات تباع تحت علامة تجارية مملوكة لبائع التجزئة نفسه. تشهد هذه المنتجات نمواً أسرع من العلامات التجارية الوطنية، حيث أدرك المستهلكون أنها توفر جودة مماثلة أو متفوقة بأسعار أقل، خاصة في ظل موجة التضخم الحالية.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <ShieldCheck className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">الريادة الأوروبية</p>
                <p className="text-sm text-blue-700/80 mt-2">
                   تمتلك أوروبا أعلى معدل اختراق للعلامات الخاصة في العالم، حيث تشكل هذه المنتجات ما بين 21% و 52% من مبيعات السوبر ماركت اعتماداً على الدولة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'من المواد الغذائية إلى الأدوات المنزلية',
      subtitle: 'Market Segments & Product Categories',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تغطي العلامات الخاصة كافة أقسام السوبر ماركت، من اللحوم المبردة والخضروات إلى منتجات التنظيف. في أمريكا، يعتبر قسم "المبردات" هو الأكثر نجاحاً للعلامات الخاصة، حيث يستحوذ على ثلث المبيعات الإجمالية للقسم.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Package className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">السلع الاستهلاكية (FMCG)</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تتفوق العلامات الخاصة في قطاع السلع سريعة الدوران بفضل قدرتها على التحكم الكامل في سلاسل التوريد.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سويسرا وبريطانيا</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تمتلك سويسرا أعلى حصة من مبيعات العلامات الخاصة في أوروبا، تليها المملكة المتحدة وألمانيا.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'التضخم كمحرك للنمو المستدام',
      subtitle: 'Inflation & Consumer Shift to House Brands',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
             ساهم ارتفاع التضخم في تقليل إنفاق المستهلكين على العلامات التجارية الوطنية الشهيرة والتحول نحو علامات المتجر (House Brands) التي أصبحت تقدم مستويات جودة "بريميوم".
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Zap className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تغير الولاء للعلامة</p>
                <p className="text-sm text-slate-400">تحول الولاء من "العلامة التجارية" إلى "القيمة والجودة"، مما عزز مكانة بائعي التجزئة كمنتجين ومسوقين في آن واحد.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <ShoppingCart className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">استراتيجية المستودعات</p>
                <p className="text-sm text-slate-400">تعد Costco رائدة في هذا المجال بفضل علامتها Kirkland Signature التي تولد حوالي 15% من إجمالي مبيعات العلامة الخاصة في أمريكا.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Walmart (Great Value)', country: 'USA', note: 'يستحوذ على أعلى حصة في سوق العلامات الخاصة الأمريكي بنسبة تتجاوز 28%' },
    { name: 'Costco (Kirkland Signature)', country: 'USA', note: 'نموذج النجاح الأول عالمياً لعلامة خاصة تفوقت في الجودة على الماركات الوطنية' },
    { name: 'Aldi / Lidl', country: 'Germany', note: 'القادة في أوروبا الذين تعتمد استراتيجيتهم بالكامل تقريباً على العلامات الخاصة عالية الجودة' },
    { name: 'Migros / Coop', country: 'Switzerland', note: 'المتصدرون تاريخياً في حصة سوق العلامات الخاصة على مستوى القارة الأوروبية' },
  ],

  definition: 'تغطي العلامات الخاصة السلع الاستهلاكية التي يتم تصنيعها بواسطة طرف ثالث ولكن يتم بيعها حصرياً تحت العلامة التجارية الخاصة بمتجر التجزئة (مثل علامات السوبر ماركت).',

  industryInsights: [
    'العلامات الخاصة تحقق هوامش ربح أعلى لبائعي التجزئة مقارنة ببيع العلامات التجارية الوطنية الشهيرة',
    'الابتكار في قطاع "العلامات الخاصة الفاخرة" (Premium Private Labels) هو الاتجاه الأقوى حالياً في الأسواق المتقدمة',
    'منطقة أمريكا اللاتينية واليابان تمثلان فرص نمو هائلة للعلامات الخاصة لضعف اختراقهما الحالي مقارنة بأوروبا',
  ],

  tags: ['Private Label', 'Retail Brands', 'Supply Chain', 'Walmart', 'Costco', 'FMCG', 'Consumer Behavior'],
};

const PrivateLabelDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default PrivateLabelDashboard;
