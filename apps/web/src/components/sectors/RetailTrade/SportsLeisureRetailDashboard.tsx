import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Trophy, Gamepad2, Dog, Globe, BarChart3, TrendingUp, Armchair, ShoppingBag } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع الرياضة، الترفيه والحيوانات الأليفة',
  titleEn: 'Sports, Leisure & Pet Retail',
  subtitle: 'تحليل سوق المعدات الرياضية، الألعاب والهوايات، تجارة الحيوانات الأليفة، ونمو العلامات التجارية المتخصصة',
  icon: Trophy,
  accent: 'blue',
  pdfLabel: 'تقرير سوق الرياضة والترفيه (PDF)',

  kpis: [
    { label: 'مبيعات الأجهزة الرياضية (U.S.)', value: '121.7', unit: 'مليار $', icon: BarChart3 },
    { label: 'سوق الألعاب والهوايات (U.S.)', value: '21.9', unit: 'مليار $', icon: Gamepad2 },
    { label: 'إنفاق الفرد على معدات الموسيقى', value: 'مرتفع', icon: Trophy },
  ],

  topMarkets: [
    { 
      label: 'أقوى سوق للمعدات والحيوانات', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر العالم في الإنفاق على رعاية الحيوانات الأليفة والمعدات الرياضية الفاخرة للأفراد والمحترفين.',
      icon: Dog
    },
    { 
      label: 'مركز ابتكار الملابس الرياضية', 
      country: 'ألمانيا', 
      note: 'مقر لشركات عالمية كبرى (Adidas, Puma) وتقود الابتكار في تصميم الملابس والأدوات الرياضية التنافسية.',
      icon: Trophy
    },
    { 
      label: 'رائد الهوايات والألعاب التعليمية', 
      country: 'الدنمارك / اليابان', 
      note: 'مواطن لعلامات تجارية أيقونية مثل LEGO وتتميز بثقافة قوية في دعم الهوايات الجماعية والألعاب المادية.',
      icon: Gamepad2
    }
  ],

  navItems: ['نظرة عامة', 'سوق الهوايات والألعاب', 'سوق الحيوانات الأليفة', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'الترفيه كنمط حياة وصحة',
      subtitle: 'Leisure & Sporting Lifestyle Choice',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
             تكتسب الأنشطة الترفيهية والرياضية مكانة بارزة في المشهد الاجتماعي كخيار نمط حياة صحي. يبحث الموظفون عالمياً عن طرق للاسترخاء خارج العمل، مما زاد من الطلب على مجموعة واسعة من الهوايات والأنشطة البدنية للكبار والأطفال.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Trophy className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">هيمنة السلاسل الكبرى</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تمتلك السلاسل الضخمة مثل Nike و Adidas ميزة في تخزين تشكيلة واسعة من السلع، بينما تتنافس الشركات الصغيرة عبر تقديم تخصصات عميقة أو خدمات إصلاح محلية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'hobbies',
      title: 'سوق الهوايات: من الموسيقى إلى الألعاب',
      subtitle: 'Hobby Stores & Recreational Needs',
      content: (
        <div className="space-y-6 text-right">
          <p>
            يشمل "متجر الهوايات" متاجر الآلات الموسيقية، أدوات الصيد، نماذج الطائرات، والقطع المجمّعة. يلبي هذا القطاع الاحتياجات الترفيهية العميقة للهواة، مع مبيعات شهرية قوية تسجل دائماً في أمريكا وكندا.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Gamepad2 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">متاجر الألعاب Hobby</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تحقق متاجر الألعاب والهوايات في أمريكا مبيعات سنوية تتجاوز 21 مليار دولار، مدعومة بمجتمعات المهتمين.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">GameStop</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تظل GameStop القوة الأكبر في تجزئة ألعاب الفيديو رغم التحول الرقمي، بفضل ثقافة الجمع والقطع المادية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'pets',
      title: 'سوق الحيوانات الأليفة ونمو الرعاية',
      subtitle: 'Pet Stores & The Care Market',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يمتلك نصف الأسر في أمريكا تقريباً كلباً، مما خلق سوقاً ضخماً لمتاجر الحيوانات الأليفة. تهيمن أسماء مثل PetSmart و Chewy على هذا المشهد المتنامي.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Dog className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الطفرة الرقمية للحيوانات</p>
                <p className="text-sm text-slate-400">ينمو سوق رعاية الحيوانات الأليفة عبر الإنترنت (مثل Chewy) بمعدل أسرع بكثير من المتاجر التقليدية سنوياً.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">نمط الحياة النشط</p>
                <p className="text-sm text-slate-400">تنمو مبيعات الملابس الرياضية وأدوات اللياقة البدنية المنزلية استجابة للتغيير في ثقافة العمل المكتبي الطويل.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Nike / Adidas', country: 'USA/Germany', note: 'العمالقة في قطاع الملابس والمعدات الرياضية بانتشار وجاذبية عالمية' },
    { name: 'PetSmart / Chewy', country: 'USA', note: 'القادة في سوق رعاية الحيوانات الأليفة سواء عبر المتاجر أو رقمياً' },
    { name: 'Dick\'s Sporting Goods', country: 'USA', note: 'أكبر سلسلة متاجر تجزئة للسلع الرياضية في الولايات المتحدة' },
    { name: 'LEGO Group', country: 'Denmark', note: 'العلامة التجارية الأهم في قطاع الهوايات والألعاب التعليمية والترفيهية' },
  ],

  definition: 'يغطي هذا القطاع تجزئة الأنشطة الرياضية والترفيهية، وينقسم إلى ثلاثة أقسام رئيسية: متاجر الهوايات (آلات موسيقية، ألعاب)، متاجر الحيوانات الأليفة، ومتاجر السلع والأجهزة الرياضية.',

  industryInsights: [
    'التوجه نحو "الصحة والعافية" (Wellness) جعل الإنفاق على المعدات الرياضية المنزلية أولوية للمستهلكين',
    'الحيوانات الأليفة أصبحت تُعامل كأفراد من العائلة، مما رفع الطلب على الأغذية "البريميوم" والخدمات المتخصصة',
    'سوق الهوايات المتخصصة (مثل ركوب الدراجات الفاخرة) يحقق هوامش ربح أعلى بكثير من المنتجات الرياضية العامة',
  ],

  tags: ['Sports Retail', 'Leisure', 'Pet Care', 'Nike', 'Hobby Stores', 'Fitness Equipment'],
};

const SportsLeisureRetailDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default SportsLeisureRetailDashboard;
