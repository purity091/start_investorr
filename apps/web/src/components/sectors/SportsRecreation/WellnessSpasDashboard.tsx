import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { HeartPulse, Sparkles, Footprints, BarChart3, TrendingUp, Globe, ShoppingBag, Coffee } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الاستجمام والمنتجعات الصحية',
  titleEn: 'Wellness & Spas Industry',
  subtitle: 'تحليل سوق الـ Wellness العالمي، المنتجعات الصحية، خدمات الصحة النفسية، ورفاهية الموظفين في العمل',
  icon: HeartPulse,
  accent: 'blue',
  pdfLabel: 'تقرير الرفاهية والاستجمام (PDF)',

  kpis: [
    { label: 'سوق الـ Wellness العالمي', value: '4.27', unit: 'تريليون $', icon: Globe },
    { label: 'إيرادات السبا (أمريكا)', value: '18.1', unit: 'مليار $', icon: BarChart3 },
    { label: 'زيارات السبا (أمريكا)', value: '173', unit: 'مليون', icon: Footprints },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق للـ Wellness والمنتجات الصحية', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر العالم في حجم الإنفاق على خدمات الرفاهية، التغذية الصحية، وبرامج الصحة المؤسسية (Corporate Wellness).',
      icon: HeartPulse
    },
    { 
      label: 'رائد السياحة العلاجية والاسترخاء', 
      country: 'اليابان / تايلاند', 
      note: 'تجمعان بين التقاليد العريقة والخدمات العصرية في المنتجعات الصحية والينابيع، مما يجذب ملايين السياح الباحثين عن الاستشفاء.',
      icon: Sparkles
    },
    { 
      label: 'عاصمة الرفاهية والسبا الأوروبية', 
      country: 'ألمانيا / فرنسا', 
      note: 'تمتلكان ثقافة عريقة في العلاج بالمياه والتردد على المصحات والمنتجعات الصحية المدمجة في النظام الصحي الوطني.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'حجم السوق والنمو', 'قطاعات السوق', 'رفاهية العمل', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'الرفاهية كأولوية في الحياة اليومية',
      subtitle: 'Wellness as a Modern Priority',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            أصبح الاهتمام بالصحة والرفاهية اعتباراً متزايد الأهمية في حياتنا اليومية. ونتيجة لذلك، تطور قطاع الـ Wellness والمنتجعات الصحية إلى صناعة بمليارات الدولارات، حيث يبحث المستهلكون عن طرق للاسترخاء من ضغوط الحياة الحديثة.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Sparkles className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">تأثير ما بعد الجائحة</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  أصبح الناس أكثر وعياً بصحتهم الجسدية والعقلية. أدى ذلك لفرض معايير صحية وصحية أكثر صرامة في المنتجعات، مع زيادة الطلب على خدمات التدليك والعناية بالأظافر واليوغا.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'market-segments',
      title: 'قطاعات السوق: من التدليك إلى التجميل',
      subtitle: 'Spa Segments & Massage Services',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تشمل الصناعة المنتجعات اليومية، صالونات الأظافر، مراكز التدليك، والساونا. تبلغ قيمة قطاع خدمات التدليك في الولايات المتحدة وحدها أكثر من 17 مليار دولار، مع توظيف مئات الآلاف من المتخصصين.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <ShoppingBag className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">منتجات الرفاهية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">ينفق المستهلكون مبالغ طائلة على زيوت التدليك، كريمات العناية بالبشرة، والمنتجات الطبيعية التي تعزز الاسترخاء.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">التوقعات المستقبلية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">من المتوقع أن ينمو سوق السبا العالمي بنسبة 7.6% سنوياً حتى عام 2030، مع استعادة الجمهور لثقته في المنشآت الصحية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'workplace-wellness',
      title: 'رفاهية الموظفين في مكان العمل',
      subtitle: 'Corporate Wellness & Productivity',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبحت رفاهية مكان العمل صناعة مزدهرة تُقدر قيمتها بـ 66 مليار دولار عالمياً. تدرك الشركات أن القوة العاملة الصحية والسعيدة هي قوة عاملة منتجة، فبدأت بتقديم برامج اللياقة البدنية والحلول المريحة للعمل.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Coffee className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">برامج صحة الموظفين</p>
                <p className="text-sm text-slate-400">تشمل مراكز العمل مكاتب الوقوف، فحوصات طبية دورية، وحوافز لممارسة الرياضة لتقليل التغيب وزيادة التركيز.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <HeartPulse className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الاستجمام النفسي</p>
                <p className="text-sm text-slate-400">تتصدر تطبيقات التأمل (Mindfulness) وخدمات الكوتشينج النفسي قائمة الحلول التي تتبناها الشركات الكبرى لموظفيها.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Global Wellness Institute', country: 'Global', note: 'المنظمة الرائدة عالمياً في أبحاث وبيانات صناعة الرفاهية والاستجمام' },
    { name: 'ISPA', country: 'USA', note: 'الجمعية الدولية للمنتجعات الصحية التي تحدد معايير الجودة والمهنية في القطاع' },
    { name: 'Planet Fitness / Peloton', country: 'USA', note: 'قادة في توفير حلول اللياقة والرفاهية المدمجة مع التكنولوجيا في العمل والمنزل' },
    { name: 'Japan Hot Springs', country: 'Japan', note: 'أكبر سوق للسياحة العلاجية والاسترخاء التقليدي عبر الينابيع الساخنة' },
  ],

  definition: 'الرفاهية هي اتخاذ خيارات نمط حياة صحي والحفاظ على الصحة البدنية والعقلية. تشمل الصناعة: الأكل الصحي، اللياقة، الطب البديل، وصناعة السبا وبرامج الرفاهية المؤسسية.',

  industryInsights: [
    'سياحة الرفاهية (Wellness Tourism) تنمو بوتيرة أسرع بمرتين من السياحة العادية عالمياً',
    'الشركات التي تستثمر في "ويلنس" الموظفين تحقق عائداً على الاستثمار (ROI) يصل إلى 3 دولارات مقابل كل دولار مُنفق',
    'دمج الحلول الذكية مثل الساونا والتدليك بتقنيات إنترنت الأشياء (IoT) هو التوجه القادم في الفنادق الفاخرة',
  ],

  tags: ['Wellness', 'Spas', 'Corporate Wellness', 'Massage', 'Healthy Life', 'Mental Health'],
};

const WellnessSpasDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default WellnessSpasDashboard;
