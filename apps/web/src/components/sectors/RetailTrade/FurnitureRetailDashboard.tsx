import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Armchair, Home, Zap, Globe, BarChart3, TrendingUp, Cpu, Recycle } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'تجارة الأثاث والديكور',
  titleEn: 'Furniture Retail Industry',
  subtitle: 'تحليل سوق المفروشات المنزلية، الابتكار في الأثاث المستدام، استخدام الواقع المعزز (AR)، وهيمنة شركات الأثاث العالمية',
  icon: Armchair,
  accent: 'blue',
  pdfLabel: 'تقرير سوق الأثاث العالمي (PDF)',

  kpis: [
    { label: 'إيرادات السوق العالمي (2028)', value: '921.6', unit: 'مليار $', icon: TrendingUp },
    { label: 'إيرادات أثاث أمريكا', value: '254', unit: 'مليار $', icon: Home },
    { label: 'مبيعات الأثاث الإلكترونية (U.S.)', value: '125', unit: 'مليار $', icon: Zap },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق استهلاكي للأثاث', 
      country: 'الولايات المتحدة', 
      note: 'تعد السوق الأكبر مبيعاً للأثاث المنزلي والديكور، مع نمو هائل في التجارة الإلكترونية للأثاث الثقيل.',
      icon: Home
    },
    { 
      label: 'المنتج والمصدّر الأول', 
      country: 'الصين', 
      note: 'تهيمن على الإنتاج العالمي وتصدير الأثاث بأسعار تنافسية، وتعد مركزاً لتصنيع أغلب العلامات التجارية العالمية.',
      icon: Globe
    },
    { 
      label: 'رائد التصميم والاستدامة', 
      country: 'السويد / ألمانيا', 
      note: 'موطن شركة إيكيا والعديد من العلامات التي تركز على التصميم الوظيفي والأثاث المستدام والصديق للبيئة.',
      icon: Armchair
    }
  ],

  navItems: ['نظرة عامة', 'أقسام السوق', 'الابتكار والواقع المعزز', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'سوق متعدد المليارات يعتمد على الذوق الشخصي',
      subtitle: 'Home Furnishings & Global Market Growth',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تسمح صناعة تجارة الأثاث للمستهلكين بجعل منازلهم انعكاساً لذوقهم الخاص. بلغت إيرادات السوق العالمي 738 مليار دولار في 2023، مع توقعات بالنمو لتصل إلى 922 مليار دولار بحلول 2028، مدعومة بتحسن اللوجستيات وخيارات التوصيل.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Recycle className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">الاستدامة والأثاث المستعمل</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  أصبحت رغبة المستهلكين في الاستدامة والحد من إزالة الغابات تدفع نحو ابتكار "أثاث صديق للبيئة" وتزايد الاهتمام بسوق الأثاث المستعمل.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'هيمنة السوق الأمريكي وأثاث غرف النوم',
      subtitle: 'Market Leaders & Bedding Segments',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تظل الولايات المتحدة هي السوق الرائد عالمياً، تليها الصين وألمانيا. ينمو قطاع أثاث غرف النوم (المراتب، الخزائن، والأسرة) بشكل مضطرد، حيث يتوقع وصول إيرادات قطاع الأسرة وحده لمستويات تاريخية بحلول 2029.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق هوم وير (Ecommerce)</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تمثل تجارة الأثاث والديكور الإلكترونية حوالي 9% من إجمالي قطاع التجارة الإلكترونية في أمريكا.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الصين كأكبر مصدر</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تتصدر الصين إنتاج وتصدير الأثاث عالمياً، موفرة قطعاً تجمع بين الكفاءة السعرية والتصاميم العصرية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'innovation',
      title: 'الواقع المعزز (AR): ثورة التسوق المنزلي',
      subtitle: 'AR/VR & The Digital Purchase Decision',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يمكّن الواقع المعزز المتسوقين من تخيل كيف ستبدو قطعة الأثاث في منازلهم قبل الشراء، مما يسهل قرار الشراء ويقلل من معدلات الإرجاع المكلفة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Cpu className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الاستثمار في AR/VR</p>
                <p className="text-sm text-slate-400">تستثمر كبرى شركات الأثاث مليارات الدولارات في تقنيات الواقع المعزز لربط تجربة التسوق الرقمية بالواقع الفعلي.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Home className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">إيكيا: القائد المطلق</p>
                <p className="text-sm text-slate-400">تظل IKEA أكبر بائع تجزئة للأثاث في العالم، مع أكثر من 470 متجراً وتصاميم تجمع بين البساطة وسهولة التجميع.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'IKEA', country: 'Sweden/Netherlands', note: 'بائع الأثاث الأول في العالم والعلامة الأكثر قيمة في هذا القطاع لسنوات' },
    { name: 'Wayfair', country: 'USA', note: 'العملاق الذي أحدث ثورة في تجارة الأثاث والديكور عبر الإنترنت حصرياً' },
    { name: 'Williams-Sonoma', country: 'USA', note: 'مجموعة رائدة في الأثاث المنزلي الفاخر وتجهيزات المطابخ العصرية' },
    { name: 'Haier Smart Home', country: 'China', note: 'رائد في دمج تقنيات "المنزل الذكي" ضمن تجهيزات الأثاث والأجهزة المنزلية' },
  ],

  definition: 'تشمل تجارة الأثاث والديكور بيع المفروشات المنزلية، أثاث المكاتب، الأسرة، الديكور الداخلي، وتجهيزات الإضاءة، سواء عبر القنوات التقليدية أو التجارة الإلكترونية.',

  industryInsights: [
    'المستهلكون يميلون للبحث عن الأثاث الثقيل عبر الإنترنت ولكن يفضلون إتمام الشراء داخل المتجر الفعلي',
    'الواقع المعزز (AR) سيصبح معياراً أساسياً لكافة تطبيقات تجارة الأثاث بحلول 2030 لزيادة ثقة المشتري',
    'أثاث المكاتب المنزلية شهد نمواً استثنائياً منذ تحول الملايين نحو نموذج العمل عن بعد المستدام',
  ],

  tags: ['Furniture Retail', 'IKEA', 'Decor', 'Home Furnishings', 'AR Shopping', 'Sustainability'],
};

const FurnitureRetailDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default FurnitureRetailDashboard;
