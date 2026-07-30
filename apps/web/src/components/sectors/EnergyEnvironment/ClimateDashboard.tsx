import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { CloudSun, Thermometer, Waves, CloudRain, Leaf, Zap, Globe, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'المناخ والطقس',
  titleEn: 'Climate & Weather',
  subtitle: 'تحليل المتغيرات المناخية، الكوارث الطبيعية، واستثمارات الطاقة النظيفة عالمياً',
  icon: CloudSun,
  accent: 'emerald',
  pdfLabel: 'تقرير المناخ العالمي (PDF)',

  kpis: [
    { label: 'شذوذ درجة حرارة الأرض والمحيطات', value: '1.19°C', unit: 'درجة مئوية', icon: Thermometer },
    { label: 'أقصى امتداد للجليد البحري (القطب الشمالي)', value: '14.4M', unit: 'مليون كم²', icon: Waves },
    { label: 'انحراف مستوى سطح البحر عالمياً', value: '1.3', unit: 'مم / سنة', icon: Globe },
  ],

  topMarkets: [
    { 
      label: 'أعلى مخاطر كوارث', 
      country: 'الفلبين', 
      note: 'تتصدر العالم في مؤشر المخاطر العالمي 2024 نظراً لموقعها الجغرافي المعرض للأعاصير والفيضانات.',
      icon: AlertTriangle
    },
    { 
      label: 'أكبر مستثمر مناخي', 
      country: 'الصين', 
      note: 'تقود العالم في الاستثمار في تكنولوجيا الطاقة النظيفة وألواح الطاقة الشمسية لتقليل البصمة الكربونية.',
      icon: Leaf
    },
    { 
      label: 'رائد التمويل الأخضر', 
      country: 'أوروبا (تكتل)', 
      note: 'تمتلك الإطار التنظيمي الأكثر تقدماً للسندات الخضراء والتمويل المستدام لمكافحة الاحتباس الحراري.',
      icon: DollarSign
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق العالمي', 'تفتيت السوق', 'تغير المناخ', 'الكوارث الطبيعية', 'التوجهات التقنية', 'التمويل المناخي', 'نظرة إقليمية', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعتمد دراسة المناخ والطقس على ملايين الملاحظات الجوية المسجلة عالمياً. بينما يمثل الطقس حالة الغلاف الجوي اليومية وتغيراتها قصيرة المدى، فإن المناخ يشكل سلوك الغلاف الجوي على فترات زمنية طويلة.
          </p>
          <p>
            في العقود الأخيرة، زادت انبعاثات الغازات الدفيئة البشرية المنشأ بشكل كبير، مما تسبب في تأثير الاحتباس الحراري، وبالتالي التأثير على توازن الظروف المناخية مما أدى إلى تغيرات كبيرة في أنماط الطقس.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق العالمي لخدمات الطقس والمناخ',
      subtitle: 'Global Market Size',
      content: (
        <div className="space-y-6 text-right">
          <p>
            يُقدر سوق خدمات الطقس العالمية بنحو <strong>4.2 مليار دولار أمريكي</strong> في عام 2023، مع توقعات بوصوله إلى أكثر من <strong>6.5 مليار دولار</strong> بحلول عام 2030، بمعدل نمو سنوي مركب (CAGR) قدره 7.2%.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-2xl font-black text-emerald-600">$4.2B</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">حجم السوق 2023</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-2xl font-black text-emerald-600">7.2%</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">معدل النمو السنوي</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-2xl font-black text-emerald-600">$6.5B</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">التوقعات لعام 2030</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'market-segments',
      title: 'تفتيت السوق والقطاعات الرئيسية',
      subtitle: 'Market Segmentation',
      content: (
        <div className="space-y-6 text-right">
          <p>
            ينقسم سوق خدمات المناخ والطقس إلى عدة قطاعات حيوية تعتمد بشكل كلي على دقة البيانات الجوية:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {[
              { t: 'الطيران والدفاع', d: 'تحسين المسارات وتقليل مخاطر الاضطرابات الجوية.' },
              { t: 'الزراعة الذكية', d: 'تحديد مواعيد الزرع والحصاد بناءً على أنماط المطر.' },
              { t: 'الطاقة المتجددة', d: 'توقع إنتاج الطاقة الشمسية وطاقة الرياح.' },
              { t: 'النقل واللوجستيات', d: 'تأمين سلاسل الإمداد البحرية والبرية من العواصف.' }
            ].map((s, i) => (
              <li key={i} className="flex gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-emerald-50/30 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 text-sm">{s.t}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{s.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'climate-change',
      title: 'تغير المناخ: الرأي العام',
      subtitle: 'Climate Change & Public Opinion',
      content: (
        <div className="space-y-6 text-right">
          <p>
            في عام 2024، وافق حوالي 23% من المشاركين في استطلاع عالمي على أن التأثير السلبي لتغير المناخ بعيد جداً في المستقبل مما لا يستدعي القلق.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
            <div className="flex-1 space-y-4">
              <p>
                سجلت <strong>الهند</strong> أعلى نسبة من الأشخاص الذين يعتقدون أن هذه التأثيرات ليست مصدر قلق وشيك، بينما تزداد المخاوف في دول أخرى تشهد آثار التغير المناخي بشكل ملموس مثل تايلاند والمكسيك.
              </p>
            </div>
            <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center shrink-0 w-full md:w-64 text-center">
               <TrendingUp size={40} className="text-emerald-600 mb-4" />
               <p className="text-3xl font-black text-emerald-900">23%</p>
               <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">متوسط القلق العالمي</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'disasters',
      title: 'الكوارث الطبيعية وتكلفتها',
      subtitle: 'Natural Catastrophes',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            بلغ الخسارة الاقتصادية من الكوارث الطبيعية المرتبطة بالطقس في عام 2023 حوالي <strong>281 مليار دولار أمريكي</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                 <Zap className="text-emerald-400" size={20} />
                 <p className="text-lg font-black text-white">العواصف الشديدة</p>
              </div>
              <p className="text-sm text-slate-300">تسببت في حوالي ثلث إجمالي الخسائر الاقتصادية العالمية.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                 <Waves className="text-emerald-400" size={20} />
                 <p className="text-lg font-black text-white">الفيضانات</p>
              </div>
              <p className="text-sm text-slate-300">بلغت تكلفتها 85 مليار دولار، مما يجعلها ثاني أكثر الكوارث تأثيراً.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'tech-trends',
      title: 'التوجهات التقنية والابتكار المناخي',
      subtitle: 'Technological Trends',
      content: (
        <div className="space-y-6 text-right">
          <p>
            الابتكار الرقمي يعيد رسم ملامح القطاع من خلال دمج تقنيات متقدمة لتحسين دقة التوقعات:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="p-6 border border-slate-100 rounded-3xl bg-slate-50 shadow-sm">
               <Globe className="text-emerald-600 mb-3" size={24} />
               <p className="font-bold text-slate-900 mb-2">الذكاء الاصطناعي (AI Pathfinding)</p>
               <p className="text-xs text-slate-500 leading-relaxed font-bold">استخدام الشبكات العصبية للتنبؤ بأنماط الطقس المتطرفة بدقة أعلى بـ 10 مرات من النماذج التقليدية.</p>
            </div>
            <div className="p-6 border border-slate-100 rounded-3xl bg-slate-50 shadow-sm">
               <CloudSun className="text-emerald-600 mb-3" size={24} />
               <p className="font-bold text-slate-900 mb-2">الأقمار الصناعية الصغيرة (CubeSats)</p>
               <p className="text-xs text-slate-500 leading-relaxed font-bold">إطلاق مجموعات من الأقمار الصناعية منخفضة التكلفة لتوفير تغطية جغرافية لحظية وشاملة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'finance',
      title: 'التمويل المناخي والاستثمارات',
      subtitle: 'Climate Finance',
      content: (
        <div className="space-y-6">
          <p className="text-right">
            ارتفع الدعم المالي نحو تحول الطاقة لمكافحة الاحتباس الحراري مع الاعتراف بالتدهور البيئي. تدعم العديد من الدول التقنيات التي تساعد في تقليل انبعاثات الغازات الدفيئة لتحقيق التنمية المستدامة.
          </p>
          <div className="flex items-start gap-4 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
            <DollarSign className="text-emerald-600 shrink-0 mt-1" size={24} />
            <div className="text-right flex-1">
              <p className="font-bold text-emerald-900 uppercase text-xs mb-1">سندات خضراء واستثمارات الطاقة</p>
              <p className="text-slate-700 text-sm leading-relaxed font-bold">
                تجاوزت الاستثمارات في تكنولوجيا تحول الطاقة عتبة الـ <strong>1000 مليار دولار</strong> سنوياً مؤخراً، مع تركيز كبير على تقنيات احتجاز الكربون والنقل النظيف.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'regional',
      title: 'النظرة الإقليمية والمخاطر',
      subtitle: 'Regional Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تتعرض الدول النامية الواقعة في الجنوب العالمي لأشد الأضرار الناجمة عن الكوارث الطبيعية. معظم الكوارث المبلغ عنها مرتبطة بالمناخ.
          </p>
          <div className="p-6 border border-slate-100 rounded-3xl space-y-4 shadow-sm bg-white">
             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="bg-red-100 text-red-700 text-[10px] px-2.5 py-1 rounded-lg font-black uppercase tracking-wider">High Risk Index</span>
                <span className="font-bold text-slate-900 text-sm">مؤشر المخاطر العالمي 2024</span>
             </div>
             <div className="flex flex-wrap gap-2 justify-end">
                {['الفلبين', 'إندونيسيا', 'الهند', 'كولومبيا', 'المكسيك'].map((country, idx) => (
                   <span key={idx} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 shadow-sm hover:border-emerald-200 transition-colors">
                    {idx + 1}. {country}
                  </span>
                ))}
             </div>
          </div>
        </div>
      ),
    },
  ],


  leaders: [
    { name: 'الفلبين', country: 'Southeast Asia', note: 'الدولة ذات أعلى مؤشر مخاطر كوارث عالمياً' },
    { name: 'إندونيسيا', country: 'Southeast Asia', note: 'مخاطر عالية من الفيضانات والنشاط الزلزالي' },
    { name: 'الهند', country: 'South Asia', note: 'تحديات مناخية كبرى وتأثير اقتصادي واسع للكوارث' },
    { name: 'كولومبيا', country: 'South America', note: 'معرضة بشدة لظواهر الطقس المتطرفة' },
    { name: 'المكسيك', country: 'North America', note: 'مواجهة مستمرة للأعاصير والجفاف' },
  ],

  definition: `تقدم فئة "المناخ والطقس" بيانات جوية على المستويين العالمي والمحلي إلى جانب بيانات تتعلق بتغير المناخ. توفر ستاتيستا معلومات حول الكوارث الطبيعية والخسائر الاقتصادية المرتبطة بها، بالإضافة إلى بيانات المسح حول الاحتباس الحراري والعيش المستدام والمخاطر المناخية المحتملة.`,

  industryInsights: [
    'الخسائر الاقتصادية من الكوارث الطبيعية وصلت لمستويات قياسية تجاوزت 280 مليار دولار سنوياً',
    'الاستثمارات في تكنولوجيا الطاقة النظيفة أصبحت المحرك الرئيسي للتمويل المناخي العالمي',
    'الفلبين وإندونيسيا تتصدران قائمة الدول الأكثر عرضة للمخاطر المناخية في 2024',
    'ارتفاع مستوى سطح البحر بمتوسط 1.3 مم سنوياً يهدد المناطق الساحلية والكبرى حول العالم',
  ],

  tags: ['Climate Change', 'Weather', 'Natural Disasters', 'Green Finance', 'COP28', 'Sustainability', 'Emissions'],
};

const ClimateDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default ClimateDashboard;
