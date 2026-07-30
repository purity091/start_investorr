import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Mountain, TreePine, Map, Tent, BarChart3, TrendingUp, Globe, Sparkles } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'المنتزهات والمساحات الخارجية',
  titleEn: 'Parks & Outdoors Industry',
  subtitle: 'تحليل المتنزهات الترفيهية، الحدائق الوطنية، سياحة المغامرات، ومعدات التخييم والمساحات الخضراء العالمية',
  icon: TreePine,
  accent: 'blue',
  pdfLabel: 'تقرير المساحات الخارجية (PDF)',

  kpis: [
    { label: 'أعلى إيرادات (ديزني)', value: 'Disney', unit: 'Brand', icon: Sparkles },
    { label: 'أكبر متنزه وطني (جرينلاند)', value: 'NorthEast', unit: 'Park', icon: Mountain },
    { label: 'أطول مسار مشي (كندا)', value: 'GreatTrail', unit: 'Track', icon: Map },
  ],

  topMarkets: [
    { 
      label: 'رائد المتنزهات الترفيهية', 
      country: 'الولايات المتحدة', 
      note: 'تضم أضخم مدن الملاهي عالمياً (مثل ديزني ويونيفرسال) وتقود صناعة الترفيه والضيافة الخارجية بمليارات الدولارات.',
      icon: Sparkles
    },
    { 
      label: 'أفضل نظام متنزهات وطنية', 
      country: 'الولايات المتحدة / كندا', 
      note: 'تمتلكان أضخم مساحات محمية طبيعية ومسارات مشي مجهزة، مما يدعم سياحة الطبيعة والمغامرات بشكل مستدام.',
      icon: Mountain
    },
    { 
      label: 'سوق الترفيه الخارجي الناشئ', 
      country: 'الصين', 
      note: 'تشهد طفرة في بناء المدن الترفيهية والمساحات الخضراء الحضرية والاهتمام المتزايد بمعدات التخييم من قبل الطبقة المتوسطة.',
      icon: TreePine
    }
  ],

  navItems: ['نظرة عامة', 'المتنزهات والترفيه', 'التخييم والمشي', 'القادة والشركات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'الترفيه في أحضان الطبيعة',
      subtitle: 'Nature & Outdoor Recreation',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يشير الترفيه في الهواء الطلق إلى أي نشاط ترفيهي يتم في بيئة خارجية، للاستمتاع بالطبيعة، تعزيز الصحة واللياقة، أو بناء مهارات العمل الجماعي. لهذا القطاع تأثير اقتصادي كبير يمتد من المتنزهات الترفيهية الكبرى إلى معدات التخييم والمراكب الشراعية.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Tent className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">العودة للطبيعة بعد الجائحة</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  أدت الإغلاقات إلى زيادة غير مسبوقة في الاهتمام بأنشطة التخييم والمشي لمسافات طويلة، مما دفع المستهلكين ذوي الدخل المرتفع للاستثمار في معدات الـ RV والتخييم الفاخر.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'theme-parks',
      title: 'المتنزهات الترفيهية والمياه',
      subtitle: 'Amusement & Theme Parks',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد المتنزهات الترفيهية المحرك الاقتصادي الأبرز في هذا القطاع. تهيمن شركات مثل ديزني ويونيفرسال ستوديوز على السوق عالمياً، تليها شركات مثل Six Flags و OCT Parks في الصين.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الحضور العالمي</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تستقبل مدن الملاهي الكبرى ملايين الزوار سنوياً، مما يساهم بمليارات الدولارات في قطاع السياحة والخدمات.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">إيرادات ديزني</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تحافظ ديزني على المركز الأول كأعلى شركة ملاهي من حيث الإيرادات، مدعومة بقوة علاماتها التجارية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'outdoor-activities',
      title: 'التخييم والمشي والحياة البرية',
      subtitle: 'Camping, Hiking & Wildlife',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            توفر المتنزهات الوطنية والحياة البرية فرصاً للأنشطة الخارجية مثل الصيد، التجديف، والتزلج. ينفق المستهلكون مبالغ كبيرة على معدات التخييم، الحقائب، والمراكب الترفيهية لتعزيز تجربتهم.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Tent className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">سوق معدات التخييم</p>
                <p className="text-sm text-slate-400">تشهد مبيعات الخيام، أكياس النوم، ومركبات الـ RV نمواً مستمراً مع توجه العائلات نحو سياحة "البقاء في الخارج".</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الملابس الخارجية (Outerwear)</p>
                <p className="text-sm text-slate-400">تتصدر Nike و North Face مبيعات الملابس والمعدات الخارجية، مع نجاح كبير في دمج الموضة مع الأداء العملي.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'The Walt Disney Company', country: 'USA', note: 'المشغل رقم 1 للمتنزهات الترفيهية في العالم من حيث الإيرادات والحضور' },
    { name: 'Universal Studios', country: 'Global', note: 'منافس رئيسي يقدم تجارب غامرة مبنية على أشهر الأفلام العالمية' },
    { name: 'NorthFace / Nike', country: 'Global', note: 'القادة في سوق الملابس والمعدات التقنية المخصصة للأنشطة الخارجية' },
    { name: 'National Park Service', country: 'USA', note: 'تدير أفضل نظام للمتنزهات الوطنية في العالم وتدعم سياحة الطبيعة' },
  ],

  definition: 'تغطي صناعة المنتزهات والمساحات الخارجية الأسواق المتصلة بالأنشطة الترفيهية في الهواء الطلق، من مدن الملاهي إلى الحدائق الوطنية ومعدات التخييم.',

  industryInsights: [
    'المتنزهات المائية والترفيهية تشهد تحولاً نحو الاستدامة البيئية لتقليل استهلاك الطاقة والمياه',
    'الاهتمام بالصحة النفسية يدفع المزيد من المستهلكين نحو سياحة "الغابات" والمشي لمسافات طويلة (Hiking)',
    'تكنولوجيا الواقع المعزز (AR) بدأت تُستخدم في المتنزهات الوطنية لتعريف الزوار بالحياة البرية والتاريخ الطبيعي',
  ],

  tags: ['Parks', 'Outdoors', 'Theme Parks', 'Camping', 'Hiking', 'Disney', 'National Parks'],
};

const ParksOutdoorsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default ParksOutdoorsDashboard;
