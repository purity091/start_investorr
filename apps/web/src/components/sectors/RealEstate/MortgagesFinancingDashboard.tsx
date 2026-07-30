import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { DollarSign, Percent, Landmark, BarChart3, TrendingUp, ShieldCheck, Wallet, PieChart } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'التمويل والرهون العقارية',
  titleEn: 'Mortgages & Financing Market',
  subtitle: 'تحليل ديون القروض العقارية، أسعار الفائدة العالمية، حصص كبار المقرضين، وتأثير التضخم على التمويل',
  icon: Landmark,
  accent: 'emerald',
  pdfLabel: 'تقرير التمويل العقاري العالمي (PDF)',

  kpis: [
    { label: 'ديون الرهن العقاري (أمريكا)', value: '20.2', unit: 'ترليون $', icon: DollarSign },
    { label: 'ديون الرهن العقاري (ألمانيا)', value: '1.9', unit: 'ترليون €', icon: Landmark },
    { label: 'حصة أكبر مقرض (Lloyds)', value: '17%', icon: PieChart },
  ],

  topMarkets: [
    { 
      label: 'أضخم سوق ديون عقارية', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أكبر سوق رهون عقارية في العالم بقيمة تتجاوز 20 تريليون دولار، وتعتبر محركاً للسياسات المالية العالمية.',
      icon: DollarSign
    },
    { 
      label: 'أعلى معدلات تملك بتمويل', 
      country: 'النرويج', 
      note: 'تتصدر العالم في نسبة الأسر التي تمتلك منازلها عبر قروض عقارية، مدعومة بنظام مالي مستقر ودخل مرتفع.',
      icon: ShieldCheck
    },
    { 
      label: 'أكبر سوق مالي أوروبي', 
      country: 'المملكة المتحدة', 
      note: 'تتميز بسوق تمويل عقاري تنافسي للغاية يضم أكبر جمعيات البناء والمقرضين الرقميين في أوروبا.',
      icon: Landmark
    }
  ],

  navItems: ['نظرة عامة', 'أسعار الفائدة', 'القادة والمقرضون', 'سوق القروض', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'أهم أدوات التملك العقاري في العالم',
      subtitle: 'The Most Common Way to Finance a Home',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يعتبر الرهن العقاري الوسيلة الأكثر شيوعاً لتمويل شراء المنازل. من منظور اقتصادي، تعمل الرهون كأداة مالية تساعد في تنظيم الإنفاق والتضخم، حيث بلغت ديون الرهن في الولايات المتحدة رقماً قياسياً يتجاوز 20 تريليون دولار.
          </p>
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4">
             <Percent className="text-emerald-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-emerald-900 leading-tight">تأثير أسعار الفائدة</p>
                <p className="text-sm text-emerald-700/80 mt-2">
                  أدت الزيادات الهجومية في أسعار الفائدة من قبل البنوك المركزية عالمياً لمواجهة التضخم إلى ارتفاع تكاليف الاقتراض وتباطؤ ملحوظ في سوق الإسكان العالمي.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'interest-rates',
      title: 'اتجاهات أسعار الفائدة عالمياً',
      subtitle: 'Mortgage Rate Trends & Inflation',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تتأثر أسعار الفائدة بعوامل العرض والطلب الكلي والتضخم. بينما شهدت بعض الدول الأوروبية مثل البرتغال وبلجيكا أدنى معدلات الفائدة، عانت أسواق أخرى من قفزات تاريخية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-emerald-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سلوك المشتري المتكرر</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">في أمريكا، يمتلك المشترون المتكررون دفعة أولى متوسطة بنسبة 19%، بينما يملك المشترون لأول مرة 8% فقط.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <ShieldCheck className="text-emerald-600 mb-2" size={20} />
                <p className="font-black text-slate-900">معدلات التملك والرهن</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">في النرويج، يمتلك أكثر من 60% من الأسر منازل بتمويل عقاري، بينما تنخفض هذه النسبة في رومانيا إلى 1% فقط.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leaders',
      title: 'كبار المقرضين والمؤسسات المالية',
      subtitle: 'Market Leaders & Banking Groups',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تسيطر البنوك الكبرى وجمعيات البناء على سوق التمويل. في المملكة المتحدة، يستحوذ أكبر 10 مقرضين على أكثر من 80% من سوق التمويل العقاري.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Wallet className="text-emerald-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">Lloyds Banking Group</p>
                <p className="text-sm text-slate-400">تحتل الصدارة كأكبر مقرض في المملكة المتحدة بحصة سوقية تبلغ حوالي 17% من إجمالي الإقراض.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <BarChart3 className="text-emerald-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">القروض التجارية</p>
                <p className="text-sm text-slate-400">تمثل القروض العقارية التجارية قطاعاً ضخماً يتأثر بشكل مباشر بصحة الأعمال ومعدلات الإشغال في المكاتب.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Lloyds Banking Group', country: 'UK', note: 'أكبر مقرض عقاري في المملكة المتحدة بحصة سوقية رائدة' },
    { name: 'Nationwide BS', country: 'UK', note: 'أكبر جمعية بناء في العالم ومن كبار ممولي الإسكان' },
    { name: 'Wells Fargo', country: 'USA', note: 'أحد أكبر مقرضي الرهن العقاري في الولايات المتحدة تاريخياً' },
    { name: 'JP Morgan Chase', country: 'USA', note: 'عملاق مالي يستحوذ على حصة كبرى في سوق التمويل السكني والتجاري' },
  ],

  definition: 'الرهن العقاري هو قرض مخصص لتمويل شراء العقارات، يتم سداده عبر دفعات محددة مسبقاً. تختلف الرهون بناءً على الأجل ونوع الفائدة (ثابتة أو متغيرة).',

  industryInsights: [
    'تعد القروض العقارية السكنية فئة الأصول الأكثر أماناً في كشوف ميزانية معظم البنوك العالمية',
    'التحول نحو "الرهن العقاري الأخضر" (Green Mortgages) يوفر فوائد أقل للمنازل عالية الكفاءة طاقياً',
    'أزمة تكلفة المعيشة أدت لزيادة الطلب على القروض ذات الفائدة الثابتة طويلة الأمد لتأمين الاستقرار المالي',
  ],

  tags: ['Mortgages', 'Financing', 'Interest Rates', 'Home Loans', 'Lending', 'Real Estate Debt'],
};

const MortgagesFinancingDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default MortgagesFinancingDashboard;
