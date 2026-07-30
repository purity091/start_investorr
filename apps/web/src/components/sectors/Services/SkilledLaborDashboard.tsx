import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { GraduationCap, ShieldCheck, Palette, Lightbulb, BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'العمالة الماهرة والمهن التخصصية',
  titleEn: 'Skilled Labor & Professional Services',
  subtitle: 'تحليل قطاع المحاماة، الهندسة المعمارية، خدمات الأمن المتقدمة، وبرامج التدريب والتطوير المهني العالمية',
  icon: GraduationCap,
  accent: 'blue',
  pdfLabel: 'تقرير سوق العمالة الماهرة (PDF)',

  kpis: [
    { label: 'سوق الخدمات القانونية (أمريكا)', value: '348.6', unit: 'مليار $', icon: BarChart3 },
    { label: 'موظفي الأمن في اليابان', value: '1.24', unit: 'مليون', icon: ShieldCheck },
    { label: 'المهندسين المعماريين (بريطانيا)', value: '43.9', unit: 'ألف', icon: Palette },
  ],

  topMarkets: [
    { 
      label: 'أقوى سوق خدمات قانونية', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أضخم صناعة للمحاماة في العالم، مع وجود أكبر مكاتب المحاماة الدولية ومعدلات تقاضي عالية.',
      icon: BarChart3
    },
    { 
      label: 'مركز الامتياز الأمني', 
      country: 'اليابان', 
      note: 'تتميز بأكبر قطاع لخدمات الأمن الخاص والخدمات المهنية المنظمة بدقة عالية.',
      icon: ShieldCheck
    },
    { 
      label: 'رائد التدريب والتطوير الرقمي', 
      country: 'دولي (أوروبا/أمريكا)', 
      note: 'تقود العالم في منصات التعلم المستمر وصناعة إعادة تأهيل الكوادر (Upskilling) لمواكبة سوق العمل المتغير.',
      icon: GraduationCap
    }
  ],

  navItems: ['نظرة عامة', 'الخدمات القانونية', 'الأمن والهندسة', 'التدريب والتطوير', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'رأس المال البشري المتخصص',
      subtitle: 'Knowledge-based High Skilled Workforce',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تعتمد العمالة الماهرة على أفراد ذوي تعليم عالٍ وتدريب متخصص يقدمون خدمات في قطاعات متنوعة. مع ارتفاع مستويات التعليم عالمياً، شهدت مهن مثل المحاماة والهندسة المعمارية نمواً مطرداً، مع بروز تحديات في مطابقة العرض مع الطلب المحلي والهجرة الدولية للكفاءات.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Lightbulb className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">التعلم المستمر ضرورة قصوى</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  نظراً لاعتماد هذا القطاع على المعرفة، يحتاج العاملون إلى تدريب منتظم لمواكبة الاتجاهات والتقنيات الجديدة، مما يجعل الاستثمار في التعلم والتطوير (L&D) استراتيجية حيوية للشركات.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'legal',
      title: 'الخدمات القانونية والتكنولوجيا',
      subtitle: 'Law Firms & GenAI Implementation',
      content: (
        <div className="space-y-6 text-right">
          <p>
            يقدم المهنيون القانونيون خبرات في مجالات متنوعة من قانون الأسرة إلى قانون الشركات والضرائب. يتوزع السوق بين شركات المحاماة الكبرى والشاملة، وبين "مكاتب البوتيك" المتخصصة في مجالات حصرية ضيقة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الذكاء الاصطناعي القانوني</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يتزايد استخدام الذكاء الاصطناعي التوليدي (GenAI) في مكاتب المحاماة العالمية لتحليل الوثائق وصياغة العقود بكفاءة أعلى.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Users className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق العمل الحر (Freelance)</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">ارتفع عدد الخبراء المستقلين في مجالات الاستشارات القانونية والهندسية، مما يوفر مرونة للشركات والمؤسسات.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'security-architecture',
      title: 'الأمن الحديث والهندسة المستدامة',
      subtitle: 'Global Security Trends & Green Buildings',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تطور الأمن من الحراسة البدنية إلى الأمن السيبراني المتقدم (IT Security). وفي الهندسة المعمارية، أصبحت "المباني الخضراء" والمستدامة هي المعيار الجديد لتقليل التأثير البيئي.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <ShieldCheck className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الأمن المدار (Managed Security)</p>
                <p className="text-sm text-slate-400">ينمو سوق خدمات الأمن السيبراني بفضل التهديدات الرقمية المتزايدة، مما يرفع الاستثمار في البحث والتطوير (R&D) الأمني.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Palette className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الهندسة المستدامة</p>
                <p className="text-sm text-slate-400">يركز المعماريون الآن على استخدام مواد مستدامة وقابلة لإعادة التدوير وتصميم مساحات تعزز كفاءة الطاقة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Global Law Firms', country: 'Global', note: 'مكاتب المحاماة الدولية الكبرى التي تهيمن على قانون الشركات والاستحواذات' },
    { name: 'Major Architecture Firms', country: 'Europe/USA', note: 'الشركات الهندسية الرائدة في تصميم الأيقونات المعمارية والمباني الذكية' },
    { name: 'Security Solutions Providers', country: 'Japan/Global', note: 'القادة في خدمات الأمن المتكاملة من الحراسة إلى الحماية السيبرانية' },
    { name: 'L&D Platforms', country: 'Global', note: 'منصات التعلم والتطوير الرقمي التي تقود ثورة إعادة تأهيل الكوادر (Upskilling)' },
  ],

  definition: 'تشمل العمالة الماهرة القوى العاملة ذات المستويات العالية من التعليم والخبرة التي تحقق قيمة اقتصادية كبيرة، وتضم أطباء، محامين، مهندسين، معماريين، وأساتذة جامعيين.',

  industryInsights: [
    'سوق التدريب في مكان العمل (Workplace Training) تحول بشكل كبير نحو التعلم الرقمي والمدعوم ذاتياً',
    'الطلب على المحامين المتخصصين في "قانون التكنولوجيا" والخصوصية يشهد أعلى معدلات النمو عالمياً',
    'العمارة الخضراء (Green Architecture) أصبحت مطلباً تنظيمياً في معظم العواصم الكبرى لخفض البصمة الكربونية',
  ],

  tags: ['Skilled Labor', 'Legal Services', 'Architecture', 'Professional Training', 'Security Services', 'Green Building'],
};

const SkilledLaborDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default SkilledLaborDashboard;
