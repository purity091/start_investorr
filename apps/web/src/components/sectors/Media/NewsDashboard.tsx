import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Newspaper, ShieldCheck, Globe, MessageCircle, BarChart3, TrendingUp, Zap, Tv } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع الأخبار',
  titleEn: 'Global News Industry',
  subtitle: 'تحليل استهلاك الأخبار عبر المنصات، مستويات الثقة، ونمو النماذج الرقمية مقابل تراجع الورقية',
  icon: Newspaper,
  accent: 'blue',
  pdfLabel: 'تقرير سوق الأخبار العالمي (PDF)',

  kpis: [
    { label: 'القيمة السوقية (News Corp)', value: '7.9', unit: 'مليار $', icon: BarChart3 },
    { label: 'الدولة الأكثر ثقة في الأخبار', value: 'Finland', unit: 'فنلندا', icon: ShieldCheck },
    { label: 'المصدر الأقل ثقة عالمياً', value: 'Social Media', unit: 'منصات التواصل', icon: MessageCircle },
  ],

  topMarkets: [
    { 
      label: 'محرك الأخبار العالمي', 
      country: 'الولايات المتحدة', 
      note: 'موطن لأكبر الوكالات العالمية (AP) والصحف المؤثرة عالمياً، وتقود التحول لنموذج الاشتراكات الرقمية.',
      icon: Newspaper
    },
    { 
      label: 'رائد حرية الصحافة والثقة', 
      country: 'فنلندا', 
      note: 'تحتل المرتبة الأولى عالمياً في مستويات الثقة بالأخبار وتتمتع بأحد أقوى نظم التعليم الإعلامي.',
      icon: ShieldCheck
    },
    { 
      label: 'أكبر مركز إعلامي إقليمي', 
      country: 'الإمارات (دبي)', 
      note: 'تعد مركزاً حيوياً للمؤسسات الإخبارية الدولية والإقليمية مع بنية تحتية رقمية متطورة للإعلام الحر.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'أنماط الاستهلاك', 'الثقة والمصداقية', 'قادة السوق', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'عالم سريع التغير: الرقمية أولاً',
      subtitle: 'Fast-paced News Evolution',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يتطور قطاع الأخبار بسرعة مذهلة متنقلاً من الورقي إلى البث التلفزيوني ثم الرقمي بالكامل. وبينما تكافح المطبوعات التقليدية، تحقق المنصات المجانية عبر الإنترنت نمواً هائلاً في الوصول والانتشار.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Zap className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">الأخبار اللحظية (Live Blogs)</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تحول الاستهلاك نحو التدوينات المباشرة والفيديوهات القصيرة، مما يوفر للمستهلكين تحديثات لحظية للأحداث وقت وقوعها.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'consumption',
      title: 'أين يحصل العالم على أخباره؟',
      subtitle: 'Where People Get Their News',
      content: (
        <div className="space-y-6 text-right">
          <p>
            أصبحت وسائل التواصل الاجتماعي والبث التلفزيوني المصدرين الأكثر شعبية للأخبار عالمياً. ومن المثير للاهتمام أن تيك توك يحقق شعبية متفجرة بين الأجيال الشابة (الجيل Z).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Tv className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">صمود التلفزيون</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">بينما يتراجع الراديو والورقي، لا يزال البث التلفزيوني يحافظ على جماهيرية واسعة وموثوقية عالية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الاشتراكات الرقمية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تحاول الصحف بناء جدران دفع (Paywalls) لتوليد إيرادات مستدامة، رغم مقاومة المستهلكين للدفع مقابل المحتوى.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trust',
      title: 'أزمة الثقة والأخبار المضللة',
      subtitle: 'Trust Issues & Misinformation',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تعتبر منصات التواصل الاجتماعي المصدر الأقل ثقة للأخبار عالمياً بسبب سرعة انتشار الأخبار الزائفة والمعلومات المضللة، ورغم ذلك يزداد الاعتماد عليها لسهولة الوصول.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <ShieldCheck className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">ثقة متزعزعة</p>
                <p className="text-sm text-slate-400">تعتبر الولايات المتحدة من الدول الأقل ثقة في الأخبار عالمياً، بينما تتصدر الدول الإسكندنافية (مثل فنلندا) معدلات الثقة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Globe className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الذكاء الاصطناعي</p>
                <p className="text-sm text-slate-400">بدأ استخدام الذكاء الاصطناعي في غرف الأخبار لزيادة الكفاءة، مما يثير تساؤلات حول المصداقية وجودة الصحافة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'News Corp', country: 'USA', note: 'الشركة الأكبر بقيمة سوقية تبلغ 7.9 مليار دولار ومحفظة إعلامية واسعة' },
    { name: 'The New York Times', country: 'USA', note: 'الرائد في نموذج الاشتراكات الرقمية والنجاح المالي المستدام' },
    { name: 'Daily Mail (DMGT)', country: 'UK', note: 'القائد في سوق الأخبار الرقمية والمطبوعة في المملكة المتحدة' },
    { name: 'Axel Springer', country: 'Germany', note: 'قوة إعلامية كبرى تتوسع في التحول الرقمي الكامل' },
  ],

  definition: 'يغطي قطاع الأخبار صناعة جمع وتحرير وتوزيع الأخبار عبر الوسائط المطبوعة والإذاعية والرقمية، بما في ذلك التقارير المالية والتحليلات وحركات الجمهور.',

  industryInsights: [
    'المستقبل يتجه بشكل حصري نحو "الرقمية أولاً" في الأسواق المعتمدة على المحمول مثل أفريقيا',
    'يظل استهلاك الأخبار المحلية هو الأكثر موثوقية ولكن الأقل استدامة مالياً في العصر الحالي',
    'الفجوة بين سهولة الوصول (عبر السوشيال ميديا) والموثوقية (الصحافة التقليدية) آخذة في الاتساع',
  ],

  tags: ['News Industry', 'Digital News', 'Media Trust', 'Fake News', 'Journalism'],
};

const NewsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default NewsDashboard;
