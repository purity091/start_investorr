import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Bus, Globe, BarChart3, TrendingUp, ShieldCheck, Smartphone, Zap, Map, HeartPulse } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'النقل العام والتنقل',
  titleEn: 'Public Transport & Mobility',
  subtitle: 'تحليل أنظمة المترو، الحافلات، خدمات مشاركة الرحلات (Ride-hailing)، وتوجهات التنقل كخدمة (MaaS)',
  icon: Bus,
  accent: 'blue',
  pdfLabel: 'تقرير النقل العام (PDF)',

  kpis: [
    { label: 'سوق مشاركة الرحلات', value: '154', unit: 'مليار $', icon: Globe },
    { label: 'مستخدمو تطبيقات التوصيل', value: '1.7', unit: 'مليار مستخدم', icon: Smartphone },
    { label: 'المنطقة الرائدة (المترو)', value: 'Asia-Pac', unit: 'Region', icon: Map },
  ],

  topMarkets: [
    { 
      label: 'أضخم شبكة نقل حضري', 
      country: 'الصين', 
      note: 'تمتلك أطول شبكات مترو في العالم (شنغهاي وبكين) وتقود سوق مشاركة الرحلات عبر شركة DiDi.',
      icon: Map
    },
    { 
      label: 'رائد خدمات النقل الذكي', 
      country: 'الولايات المتحدة', 
      note: 'موطن عمالقة التكنولوجيا مثل Uber وLyft، وتسيطر على الابتكار في نماذج خدمات التنقل كخدمة (MaaS).',
      icon: Smartphone
    },
    { 
      label: 'نموذج النقل المستدام المتكامل', 
      country: 'ألمانيا / اليابان', 
      note: 'يتميزان بدقة المواعيد الفائقة وتكامل أنظمة الحافلات والقطارات الذكية التي تدعم التنقل الأخضر.',
      icon: Zap
    }
  ],

  navItems: ['نظرة عامة', 'المترو والنقل الحضري', 'خدمات التنقل الذكي', 'القادة والتوجهات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'العمود الفقري للمدن المستدامة',
      subtitle: 'The Backbone of Sustainable Cities',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يشكل النقل العام جوهر النقل المشترك في العالم، حيث تنقل أنظمة السكك الحديدية والحافلات والمترو الملايين يومياً بفاعلية بيئية واقتصادية تتفوق على السيارات الخاصة. ومع صعود الهواتف الذكية، ظهرت "خدمات التنقل المبتكرة" لتكمل الشبكات التقليدية بمرونة أعلى.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Zap className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">التنقل كخدمة (MaaS)</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تتلاشى الحدود تدريجياً بين النقل العام والخدمات الخاصة، حيث يسعى مقدمو الخدمة لدمج كافة خيارات النقل في تطبيق واحد يسهل رحلة العميل.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'metro-urban',
      title: 'أنظمة المترو والازدحام',
      subtitle: 'Metro Systems & Urban Pressures',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد منطقة آسيا والمحيط الهادئ هي الأكثر كثافة واستخداماً لأنظمة المترو. تفرض المدن الكبرى قيوداً متزايدة على السيارات الخاصة وتوجه الاستثمارات نحو البنية التحتية للنقل العام لتحسين جودة الهواء وتقليل الزحام.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">أكثر الشبكات ازدحاماً</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تتصدر شبكات مترو بكين وشنغهاي وطوكيو عدد الرحلات السنوية بمليارات الرحلات لكل منها.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">حافز الاستخدام</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تتجه دول مثل ألمانيا لإطلاق تذاكر مخفضة شاملة (Deutschlandticket) لتشجيع المواطنين على التخلي عن سياراتهم.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'smart-mobility',
      title: 'عمالقة مشاركة الرحلات',
      subtitle: 'Ride-Hailing Giants & Micromobility',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تهيمن شركات مثل Uber و Lyft و DiDi على سوق التنقل الجديد. وإلى جانب السيارات، انتشرت خدمات "التنقل الدقيق" (Micro-mobility) مثل الدراجات الهوائية والسكوتر الكهربائي كحلول مثالية للمسافات القصيرة في المدن.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Smartphone className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">توسع Uber العالمي</p>
                <p className="text-sm text-slate-400">توسعت Uber من مجرد تطبيق لطلب السيارات إلى خدمات توصيل الطعام والبريد، مع مئات الملايين من الرحلات ربع سنوياً.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <HeartPulse className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">التنقل النشط</p>
                <p className="text-sm text-slate-400">تحفز المدن الأوروبية ركوب الدراجات كوسيلة صحية وبديلة تقلل من انبعاثات الكربون والازدحام المروري.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Uber Technologies', country: 'USA/Global', note: 'اللاعب العالمي الأبرز في خدمات مشاركة الرحلات وتوصيل الطعام' },
    { name: 'DiDi Global', country: 'China', note: 'تهيمن على سوق مشاركة الرحلات في الصين، أكبر سوق للنقل في العالم' },
    { name: 'Lyft', country: 'USA', note: 'المنافس الأكبر لـ Uber في أمريكا الشمالية مع تركيز على تجربة الركاب والسائقين' },
    { name: 'Deutsche Bahn', country: 'Germany', note: 'أكبر مشغل للنقل العام في أوروبا وأحد قادة ابتكار تذاكر النقل الشاملة' },
  ],

  definition: 'تشمل فئة النقل العام مشغلي الحافلات والقطارات والمترو، بالإضافة إلى خدمات التنقل الذكي (Ride-hailing) وحلول التنقل كخدمة (MaaS).',

  industryInsights: [
    'التنقل الهجين (Hybrid Solutions) بدمج النقل العام مع المواصلات الخاصة حسب الطلب يسد فجوات الخدمة في المناطق الطرفية',
    'المدن الذكية تعتمد على البيانات الضخمة لتحسين جداول الحافلات وتوقيت إشارات المرور لتقليل زمن الرحلة',
    'أمن البيانات وخصوصية المستخدمين هي التحدي القانوني الأكبر الذي يواجه تطبيقات النقل الذكي حالياً',
  ],

  tags: ['Public Transport', 'Metro', 'Ride-hailing', 'Uber', 'DiDi', 'MaaS', 'Sustainability', 'Micro-mobility'],
};

const PublicTransportDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default PublicTransportDashboard;
