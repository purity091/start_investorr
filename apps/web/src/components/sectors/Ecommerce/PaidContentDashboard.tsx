import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { PlayCircle, Globe, TrendingUp, Music, Tv } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'المحتوى الرقمي والخدمات المدفوعة',
  titleEn: 'Paid Content',
  subtitle: 'اقتصاد الاشتراكات، خدمات البث (Streaming)، وتحول صناعة الترفيه والتعليم إلى النموذج الرقمي',
  icon: PlayCircle,
  accent: 'rose',
  pdfLabel: 'تقرير المحتوى الرقمي (PDF)',

  kpis: [
    { label: 'إيرادات الميديا الرقمية عالمياً', value: '560B', unit: 'مليار دولار أمريكي', icon: Globe },
    { label: 'مشتركي سبوتيفاي بريميوم', value: '236M', unit: 'مليون مشترك نشط', icon: Music },
    { label: 'مبيعات الكتب الإلكترونية (أمريكا)', value: '1B', unit: 'مليار دولار سنوياً', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'محور صناعة الترفيه العالمي', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر العالم في إنفاق المستهلكين على المحتوى الرقمي، ومقر لأكبر شركات البث مثل Netflix وDisney+.',
      icon: Tv
    },
    { 
      label: 'أعلى معدل دفع مقابل الأخبار', 
      country: 'النرويج', 
      note: 'تمتلك أعلى نسبة مستخدمين في العالم مستعدين للدفع مقابل الأخبار والمحتوى التعليمي الرقمي بجودة عالية.',
      icon: Globe
    },
    { 
      label: 'عملاق الألعاب والمعاملات الدقيقة', 
      country: 'الصين', 
      note: 'أضخم سوق عالمي للألعاب والمحتوى الترفيهي عبر المحمول، وتتميز بنماذج تسييل مبتكرة داخل التطبيقات الاجتماعية.',
      icon: TrendingUp
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'نماذج الاشتراكات', 'اتجاهات الميتافيرس', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            في الماضي، كان الاستهلاك الثقافي يتطلب شراء منتج مادي (أسطوانات، كتب، أشرطة). اليوم، أصبح من الطبيعي اكتساب المحتوى في شكل رقمي. أدت سهولة الدفع عبر الإنترنت إلى زيادة الاهتمام بشراء وتحميل المحتوى الرقمي والاشتراك في خدمات البث.
          </p>
          <p>
            تجعل المنصات الرقمية من السهل تجربة المسلسلات والأفلام والكتب الصوتية والموسيقى وألعاب الفيديو التي يحبها الناس، مما خلق قطاعاً اقتصادياً ضخماً تقوده علامات تجارية مثل Netflix و Spotify و Amazon.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق العالمي',
      subtitle: 'Paid Content Worldwide',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                نما الدفع مقابل المحتوى الرقمي ليصبح ركيزة أساسية في صناعة الترفيه. عالمياً، يتضاعف المحتوى الرقمي ويصبح أكثر شعبية، مع تزايد عدد المستهلكين المنفتحين على فكرة الدفع مقابل الجودة والراحة.
              </p>
              <p>
                تتصدر دول مثل <strong>النرويج وتشيلي والولايات المتحدة</strong> قائمة أعلى نسب مستخدمي الإنترنت الذين يدفعون شهرياً مقابل المحتوى الرقمي، مما يوضح نضج هذه الأسواق استهلاكياً.
              </p>
            </div>
            <div className="p-8 bg-rose-50 rounded-2xl border border-rose-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <Globe size={48} className="text-rose-600 mb-4" />
               <p className="text-2xl font-black text-rose-900">$560 مليار</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">إيرادات الميديا الرقمية</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'subscriptions',
      title: 'نماذج الاشتراكات (Subscription Logic)',
      subtitle: 'The Core Business Model',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            يعتبر نموذج الاشتراك هو الركيزة الأساسية في عالم المحتوى الرقمي المدفوع، سواء كان ذلك للبث الموسيقي أو الترفيه المرئي أو الأخبار الرقمية أو الكتب الصوتية.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-rose-400">نموذج الاشتراك الشهري</p>
              <p className="text-sm text-slate-300 mt-2">يوفر تدفقاً نقدياً مستداماً للشركات وإمكانية وصول غير محدودة للمستهلك.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-rose-400">المعاملات لمرة واحدة</p>
              <p className="text-sm text-slate-300 mt-2">تشمل شراء التطبيقات، الكتب الإلكترونية، والعملات الافتراضية داخل الألعاب.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'اتجاهات المستقبل: الميتافيرس والألعاب',
      subtitle: 'Monetization in the Digital Era',
      content: (
        <div className="space-y-6">
          <p>
            بينما واجهت الصحف والمجلات تحديات كبيرة في تحقيق الدخل الرقمي، استفادت صناعة <strong>ألعاب الفيديو</strong> بشكل هائل من العصر الرقمي ومن المتوقع أن تستمر في النمو.
          </p>
          <div className="flex items-start gap-4 p-6 bg-rose-50 rounded-2xl border border-rose-100">
            <TrendingUp className="text-rose-600 shrink-0 mt-1" size={24} />
            <div>
              <p className="font-bold text-rose-900">ألعاب الميتافيرس</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                من المتوقع أن تشهد إيرادات سوق ألعاب الميتافيرس تغيراً جذرياً ونمواً متسارعاً حتى عام 2030، مما يفتح آفاقاً جديدة للمحتوى الافتراضي المدفوع.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Netflix', country: 'الولايات المتحدة', note: 'الرائد في بث الفيديو بـ 200+ مليون مشترك' },
    { name: 'Spotify', country: 'السويد', note: 'المتصدر العالمي في بث الموسيقى (36% من المشتركين في أوروبا)' },
    { name: 'Disney Plus', country: 'الولايات المتحدة', note: 'أسرع نمو في تاريخ منصات البث لامتلاكه مكتبة ضخمة' },
    { name: 'Amazon Prime Video', country: 'الولايات المتحدة', note: 'تكامل فريد مع خدمات التجارة الإلكترونية' },
    { name: 'Apple (App Store)', country: 'الولايات المتحدة', note: 'المنصة الأكبر لتوزيع وتحصيل إيرادات التطبيقات والمحتوى' },
  ],

  definition: `تغطي فئة المحتوى المدفوع رؤية شاملة للمحتوى الرقمي الذي يشتريه المستهلكون؛ من الفيديو حسب الطلب (VOD)، والاشتراكات الرقمية، وبث الموسيقى، والمواد المقروءة إلكترونياً، وصولاً إلى تسييل إيرادات ألعاب الفيديو.`,

  industryInsights: [
    'المحتوى الرقمي تجاوز المادي كخيار استهلاكي أول في أغلب أسواق العالم المتقدم',
    'نموذج الاشتراك (Subscription) هو المحرك المالي الأكثر استقراراً وقوة في صناعة الميديا حالياً',
    'أوروبا وأمريكا الشمالية تستحوذان على أكثر من 60% من قاعدة مشتركي سبوتيفاي بريميوم',
    'ألعاب الفيديو هي القطاع الأكثر نجاحاً في ابتكار طرق تسييل (Monetization) جديدة ومستمرة',
  ],

  tags: ['Paid Content', 'Streaming', 'Netflix', 'Spotify', 'Digital Media', 'Subscriptions', 'VOD'],
};

const PaidContentDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default PaidContentDashboard;
