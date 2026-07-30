import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Gamepad2, Hammer, Music, TreePine, BarChart3, TrendingUp, ShoppingCart, Globe } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الهوايات والترفيه',
  titleEn: 'Hobbies Industry',
  subtitle: 'تحليل سوق هوايات الـ DIY، ألعاب الطاولة، الأدوات الموسيقية، وتجارة الألعاب والاهتمامات الشخصية',
  icon: Gamepad2,
  accent: 'blue',
  pdfLabel: 'تقرير سوق الهوايات (PDF)',

  kpis: [
    { label: 'سوق التجارة الإلكترونية للهوايات', value: '703', unit: 'مليار $', icon: Globe },
    { label: 'سوق ألعاب الطاولة (توقعات)', value: '4+', unit: 'مليار $', icon: Gamepad2 },
    { label: 'بيع أدوات الفنون (أمريكا)', value: '1.2', unit: 'مليار $', icon: ShoppingCart },
  ],

  topMarkets: [
    { 
      label: 'أضخم سوق لمعدات الهوايات', 
      country: 'الصين', 
      note: 'تعد المركز العالمي لتصنيع وتصدير الألعاب، الآلات الموسيقية، ومعدات الحرف اليدوية بأسعار تنافسية.',
      icon: Globe
    },
    { 
      label: 'رائد الهوايات الإبداعية والـ DIY', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أكبر سوق استهلاكي للأدوات الفنية، تحسين المنازل، ومنصات بيع الأعمال اليدوية (مثل Etsy).',
      icon: ShoppingCart
    },
    { 
      label: 'عاصمة الآلات الموسيقية', 
      country: 'اليابان', 
      note: 'موطن لأضخم الشركات العالمية في صناعة الموسيقى (مثل Yamaha) وتقود الابتكار في الأدوات الصوتية.',
      icon: Music
    }
  ],

  navItems: ['نظرة عامة', 'الألعاب والآلات الموسيقية', 'سوق DIY والحدائق', 'القادة والنمو', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'الهوايات كمحرك للتجارة الإلكترونية',
      subtitle: 'Hobbies in the Digital Age',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يظهر الارتفاع الكبير لمواقع التجارة الإلكترونية المتخصصة في الفنون والحرف اليدوية الأهمية الاقتصادية للهوايات. تظل الموسيقى، الطبخ، والمشاريع الإبداعية من بين الاهتمامات العليا للناس عالمياً، مع تفوق الصين كمصدر رئيسي لمعدات الألعاب والرياضة.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <ShoppingCart className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">طفرة المبيعات أثناء الجائحة</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  دفع العزل المنزلي المستهلكين نحو ألعاب الطاولة ومشاريع تحسين المنازل، مما أدى لنمو مبيعات التجزئة عبر الإنترنت بنسبة تجاوزت 45% في بعض الأسواق الكبرى.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'ألعاب الطاولة والآلات الموسيقية',
      subtitle: 'Tabletop Games & Musical Instruments',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تشهد ألعاب الطاولة (Board Games) والآلات الموسيقية نمواً مستقراً. يتوقع أن يتجاوز سوق الألعاب اللوحية 4 مليار دولار بحلول 2031، بينما تحافظ العلامات التجارية الكبرى في الموسيقى على أداء مالي قوي.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Music className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق الآلات الموسيقية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تتصدر شركات مثل Yamaha المبيعات العالمية، حيث تمثل الآلات الموسيقية 70% من إيراداتها.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نمو ألعاب الورق</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تعد ألعاب التداول مثل Pokémon محركاً رئيسياً في أسواق اليابان والولايات المتحدة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'diy-gardening',
      title: 'سوق الحدائق وتحسين المنازل',
      subtitle: 'Gardening & Home Improvement',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبحت زراعة النباتات والحدائق المنزلية من أكثر الهوايات شعبية وتكلفة في الدول المتقدمة. بلغت قيمة هذا القطاع في أمريكا الشمالية حوالي 17.2 مليار دولار، متفوقة على قطاعات الهوايات التقليدية الأخرى.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Hammer className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">قطاع DIY والحرف</p>
                <p className="text-sm text-slate-400">تنمو منصات مثل Etsy لتمكين الحرفيين من بيع منتجاتهم الفريدة مباشرة لملايين المشترين حول العالم.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TreePine className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تجهيزات الحدائق</p>
                <p className="text-sm text-slate-400">ينفق المستهلكون في المملكة المتحدة وكندا مبالغ متزايدة على معدات العناية بالحدائق والنباتات المنزلية.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Yamaha Corporation', country: 'Japan', note: 'الرائدة عالمياً في تصنيع الآلات الموسيقية والمعدات الصوتية' },
    { name: 'Etsy Inc.', country: 'USA', note: 'أكبر منصة تجارة إلكترونية متخصصة في الفنون والحرف اليدوية والهوايات الفريدة' },
    { name: 'Ravensburger', country: 'Germany', note: 'شركة عالمية بارزة في صناعة الألغاز وألعاب الطاولة والألعاب التعليمية' },
    { name: 'Pokémon TCG', country: 'Global', note: 'تهيمن على سوق ألعاب بطاقات التداول بمبيعات مليارية ونمو مستدام' },
  ],

  definition: 'تعتبر الهوايات أنشطة وقت الفراغ التي تستهدف المتعة والاسترخاء. يشمل القطاع: الفنون والحرف، البستنة، الآلات الموسيقية، وألعاب الطاولة.',

  industryInsights: [
    'التجارة الإلكترونية أعادت إحياء الهوايات التقليدية عبر توفير سهولة الوصول للمواد التعليمية والمعدات النادرة',
    'ألعاب الطاولة تشهد "عصراً ذهبياً" مع توجه البالغين نحو النشاطات غير الرقمية للتواصل الاجتماعي',
    'هوايات العناية بالنباتات والزراعة الحضرية ترتبط بزيادة الوعي بالصحة النفسية والبيئية بين جيل الألفية',
  ],

  tags: ['Hobbies', 'DIY', 'Music Instruments', 'Tabletop Games', 'Gardening', 'Etsy', 'Crafts'],
};

const HobbiesDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default HobbiesDashboard;
