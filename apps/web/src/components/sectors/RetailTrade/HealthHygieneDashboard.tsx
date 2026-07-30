import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Pill, Heart, Sparkles, Globe, BarChart3, TrendingUp, ShoppingBag, Stethoscope } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'تجارة الصحة والنظافة الشخصية',
  titleEn: 'Health & Hygiene Retail',
  subtitle: 'تحليل سوق الصيدليات، منتجات العناية بالبشرة، المكملات الغذائية، وتجارة الأدوية المتاحة دون وصفة (OTC)',
  icon: Pill,
  accent: 'emerald',
  pdfLabel: 'تقرير قطاع الصحة والنظافة (PDF)',

  kpis: [
    { label: 'مبيعات أدوية OTC (أمريكا)', value: '43.4', unit: 'مليار $', icon: Pill },
    { label: 'إنفاق الفرد السنوي (أمريكا)', value: '1,209', unit: '$', icon: Heart },
    { label: 'سوق العناية الشخصية العالمي', value: '1.2', unit: 'ترليون $', icon: Sparkles },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق تجزئة للصيدليات', 
      country: 'الولايات المتحدة', 
      note: 'تهيمن عليها السلاسل العملاقة التي تدمج الصيدلة مع التجزئة العامة والاستهلاك اليومي.',
      icon: Pill
    },
    { 
      label: 'سوق النمو في الجمال', 
      country: 'الصين', 
      note: 'أسرع أسواق العالم نمواً في استهلاك منتجات العناية بالبشرة المتميزة والتجارة الإلكترونية الصحية.',
      icon: Sparkles
    },
    { 
      label: 'عاصمة الابتكار التجميلي', 
      country: 'فرنسا', 
      note: 'الرائد العالمي في تطوير مستحضرات العناية الطبية (Dermocosmetique) والعلامات الفاخرة.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'صيدليات التجزئة', 'اتجاهات العناية', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'بين الرعاية الصحية والجمال',
      subtitle: 'Blending Health & Personal Care',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تغطي تجارة الصحة والنظافة مجموعة واسعة من المنتجات، حيث تعتبر الصيدليات (Drugstores) التنسيق الأساسي لها. تشمل المبيعات مستحضرات التجميل، العناية بالبشرة، منتجات النظافة النسائية، والمكملات الغذائية، بالإضافة إلى الأدوية التي لا تتطلب وصفة طبية.
          </p>
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4">
             <Stethoscope className="text-emerald-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-emerald-900 leading-tight">تكامل الخدمات في أمريكا</p>
                <p className="text-sm text-emerald-700/80 mt-2">
                  على عكس أوروبا، تدمج سلاسل التجزئة الأمريكية مثل Walgreens و Walmart خدمات الصيدلية الكاملة مع بيع منتجات العناية الشخصية في مكان واحد.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'pharmacies',
      title: 'تطور تنسيقات الصيدليات والمتاجر',
      subtitle: 'Drugstores & Pharmacy Formats',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعتبر الصيدليات تنسيقاً متعدد الاستخدامات. في أوروبا، تركز بشكل أكبر على منتجات التجميل والنظافة الشخصية، بينما شهدت الفترة الأخيرة نمواً كبيراً في مبيعات الفيتامينات والمعادن عالمياً.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-emerald-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق المكملات الغذائية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تشهد الفيتامينات والمعادن إقبالاً تاريخياً مع تزايد وعي المستهلك بالرعاية الوقائية بعد الجائحة.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-emerald-600 mb-2" size={20} />
                <p className="font-black text-slate-900">التجارة الإلكترونية للجمال</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تحولت وسائل التواصل الاجتماعي إلى المحرك الأول لمبيعات منتجات العناية بالبشرة والشعر عبر الإنترنت.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'هوس العناية والشباب الدائم',
      subtitle: 'The Rise of Self-care & Youth Preservation',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يشهد سوق الجمال نمواً لا ينقطع بفضل وعي المستهلكين بأهمية الحفاظ على مظهر شاب. تعتبر العناية بالبشرة والشعر من أكثر الفئات ربحية عالمياً.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Sparkles className="text-emerald-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تأثير السوشيال ميديا</p>
                <p className="text-sm text-slate-400">المنتجات الأكثر رواجاً على منصات مثل تيك توك وإنستجرام تحقق قفزات مبيعات فورية في الصيدليات والمتاجر.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-emerald-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">نمو قطاع OTC</p>
                <p className="text-sm text-slate-400">تنمو الأدوية المتاحة دون وصفة بمعدل سنوي ثابت، مع تحول مبيعاتها بشكل متزايد نحو قنوات التجزئة العامة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Walgreens Boots Alliance', country: 'USA/UK', note: 'الرائد العالمي في قطاع الصيدليات وتجارة الصحة بآلاف المتاجر' },
    { name: 'CVS Health', country: 'USA', note: 'أحد أكبر مقدمي الرعاية الصحية المتكاملة وتجزئة الأدوية في العالم' },
    { name: 'Procter & Gamble (P&G)', country: 'USA', note: 'المورد الأساسي لمئات العلامات التجارية في قطاع النظافة والعناية الشخصية' },
    { name: 'Sephora (LVMH)', country: 'France/Global', note: 'القائد في تجزئة مستحضرات التجميل والجمال الفاخرة عبر القنوات المتكاملة' },
  ],

  definition: 'تشمل تجارة الصحة والنظافة الصيدليات، محلات العطور، ومتاجر التجزئة المتخصصة في منتجات العناية بالبشرة، الشعر، المكملات الغذائية، والأجهزة الطبية البسيطة.',

  industryInsights: [
    'الصيدليات تتحول تدريجياً إلى مراكز رعاية صحية أولية تقدم اللقاحات والاستشارات البسيطة',
    'قطاع الـ Wellness (العافية) يدمج الآن بين الصحة الجسدية وبين المكملات والمنتجات التجميلية الطبيعية',
    'الرجال يشكلون شريحة نمو جديدة للمنتجات المتخصصة في العناية بالبشرة (Skin Care) عالمياً',
  ],

  tags: ['Health Retail', 'Pharmacy', 'Hygiene', 'Cosmetics', 'OTC Drugs', 'Walgreens', 'CVS'],
};

const HealthHygieneDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default HealthHygieneDashboard;
