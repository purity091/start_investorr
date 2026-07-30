import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Dice5, Smartphone, Globe, BarChart3, TrendingUp, ShieldCheck, Zap, DollarSign } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'المقامرة والألعاب',
  titleEn: 'Gambling Industry',
  subtitle: 'تحليل سوق المراهنات الرياضية، الكازينوهات، والألعاب عبر الإنترنت وقوانين التنظيم العالمية',
  icon: Dice5,
  accent: 'blue',
  pdfLabel: 'تقرير سوق المقامرة (PDF)',

  kpis: [
    { label: 'أكبر منطقة (عقارياً)', value: 'Europe', unit: 'Region', icon: Globe },
    { label: 'أعلى موقع حركة مرور', value: 'Bet365', unit: 'Brand', icon: Smartphone },
    { label: 'أكبر كازينو (مساحة)', value: '600k', unit: 'sq ft', icon: Zap },
  ],

  topMarkets: [
    { 
      label: 'عاصمة المقامرة العالمية', 
      country: 'ماكاو (الصين)', 
      note: 'تتفوق على لاس فيغاس في إجمالي الإيرادات السنوية وتعد الوجهة الأولى للاعبين في المنطقة الآسيوية.',
      icon: Globe
    },
    { 
      label: 'السوق الرقمي والرياضي الأكبر', 
      country: 'المملكة المتحدة', 
      note: 'تمتلك واحداً من أكثر الأسواق تنظيماً ونضجاً للمراهنات الرياضية والمقامرة عبر الإنترنت عالمياً.',
      icon: Smartphone
    },
    { 
      label: 'محرك النمو الجديد', 
      country: 'الولايات المتحدة', 
      note: 'تشهد طفرة نمو هائلة بعد تقنين المراهنات الرياضية في أغلب الولايات، مما جذب استثمارات تقنية تريليونية.',
      icon: DollarSign
    }
  ],

  navItems: ['نظرة عامة', 'السوق التقليدي vs الرقمي', 'الاتجاهات التقنية', 'القادة والنمو', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'مرونة الصناعة والتحول الرقمي',
      subtitle: 'Industry Resilience & Digital Shift',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            رغم تأثيرات الجائحة الكبيرة، ارتدت صناعة المقامرة للعودة لمستويات ما قبل الأزمة. بينما تشهد المؤسسات التقليدية (Brick-and-mortar) تراجعاً، ينمو قطاع المقامرة عبر الإنترنت بشكل متسارع بفضل الرقمنة وتغيير القوانين العالمية.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <ShieldCheck className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">تشريع المراهنات في أمريكا</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  يعد تقنين المراهنات الرياضية في الولايات المتحدة خطوة رئيسية نحو النمو العالمي، مما يفتح سوقاً استهلاكياً ضخماً وجديداً.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'online-market',
      title: 'صعود المقامرة عبر الإنترنت',
      subtitle: 'Growth of Online Platforms',
      content: (
        <div className="space-y-6 text-right">
          <p>
            توقع الخبراء نمو سوق المقامرة الإلكترونية نتيجة مرونته العالية وتوفيره الراحة للاعبين للمشاركة من أي مكان وفي أي وقت. تشمل القطاعات النامية المراهنات الرياضية، البوكر، والبنغو الإلكتروني.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Smartphone className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">ألعاب الكازينو المحمولة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أصبحت التطبيقات الذكية هي القناة الرئيسية للمراهنات الرياضية، مما يزيد من إيرادات الشركات الرقمية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الإيرادات العالمية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">ظل حجم السوق مستقراً عالمياً مع توقعات بزيادة حصة السوق الرقمي لتتجاوز التقليدي في العقد القادم.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'tech-trends',
      title: 'مستقبل الصناعة: VR وكريبتو',
      subtitle: 'The Future: Crypto & VR Casinos',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تشكل تقنيات مثل المقامرة بالعملات المشفرة، وكازينوهات الواقع الافتراضي (VR)، والذكاء الاصطناعي لتحليل سلوك اللاعبين، مستقبل الصناعة نحو تجربة أكثر غامرة وأماناً.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Zap className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الرقمنة السريعة</p>
                <p className="text-sm text-slate-400">تنمو الشركات الرقمية مثل Bet365 بسرعة تتفوق على الكازينوهات التقليدية من حيث القيمة السوقية وحركة المستخدمين.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <DollarSign className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تحول العلامات التجارية</p>
                <p className="text-sm text-slate-400">تركز الشركات الرائدة مثل Wynn Resorts الآن على دمج الحلول الرقمية في مرافق الفنادق والكازينوهات الفاخرة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Bet365', country: 'UK', note: 'الشركة الرائدة عالمياً في حركة مرور المواقع والمراهنات الرياضية عبر الإنترنت' },
    { name: 'Wynn Resorts', country: 'USA', note: 'تتصدر قيمة العلامة التجارية في قطاع الكازينوهات والفنادق الفاخرة' },
    { name: 'WinStar World Casino', country: 'USA', note: 'أكبر كازينو في العالم من حيث المساحة والقدرة الاستيعابية للمنشآت' },
    { name: 'Sands China', country: 'Macao', note: 'أكبر مشغل للكازينوهات في ماكاو، عاصمة المقامرة في آسيا' },
  ],

  definition: 'تسمح صناعة المقامرة للمستهلكين بالمراهنة على أحداث ذات نتائج غير مؤكدة بهدف الفوز. تشمل القطاعات: الكازينوهات، اليانصيب، المراهنات الرياضية، والمقامرة عبر الإنترنت.',

  industryInsights: [
    'المراهنات الرياضية في أمريكا تشهد انفجاراً في النمو بعد تغيير القوانين الفيدرالية والمحلية',
    'العملات المشفرة توفر شفافية أكبر وسرعة في التحويلات المالية داخل منصات المقامرة الإلكترونية',
    'كازينوهات الواقع الافتراضي ستكون "التحول الكبير القادم" لجذب الأجيال الشابة وتوفير تجربة اجتماعية غامرة',
  ],

  tags: ['Gambling', 'Sports Betting', 'Casinos', 'Online Gaming', 'Betting Law', 'Crypto Gambling'],
};

const GamblingDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default GamblingDashboard;
