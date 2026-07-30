import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { GraduationCap, Microscope, BookOpen, Lightbulb, BarChart3, TrendingUp, Globe, Award } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'التعليم والعلوم',
  titleEn: 'Education & Science Industry',
  subtitle: 'تحليل جودة التعليم، تصنيف الجامعات العالمية، والإنفاق على البحث والتطوير (R&D) والابتكار',
  icon: GraduationCap,
  accent: 'blue',
  pdfLabel: 'تقرير التعليم والبحث (PDF)',

  kpis: [
    { label: 'الأمية (أفريقيا جنوب الصحراء)', value: '34.7', unit: '%', icon: BookOpen },
    { label: 'أفضل جامعة (توب رانك)', value: 'Harvard', unit: 'Index', icon: Award },
    { label: 'الإنفاق على البحث (أمريكا)', value: '700+', unit: 'مليار $', icon: Microscope },
  ],

  topMarkets: [
    { 
      label: 'القوة العلمية والبحثية الأولى', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر العالم في الإنفاق على البحث والتطوير (R&D) وتمتلك أعرق الجامعات البحثية عالمياً.',
      icon: Microscope
    },
    { 
      label: 'مصنع المهارات التقنية', 
      country: 'الصين', 
      note: 'تشهد طفرة هائلة في عدد خريجي الهندسة والعلوم (STEM) وحجم المنشورات العلمية الصادرة سنوياً.',
      icon: TrendingUp
    },
    { 
      label: 'مركز الجذب التعليمي', 
      country: 'المملكة المتحدة', 
      note: 'تعد وجهة رائدة للطلاب الدوليين وتضم جامعات تاريخية تقود الابتكار والبحث الأكاديمي.',
      icon: GraduationCap
    }
  ],

  navItems: ['نظرة عامة', 'مستويات التعليم', 'المؤسسات والسوق', 'العلوم والبحث', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'الحق في التعليم والنمو العالمي',
      subtitle: 'Education as a Human Right',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تختلف أولويات التعليم والعلوم في جميع أنحاء العالم. بينما يعد التعليم إجبارياً في بعض البلدان، فإنه محجوز لمجموعات محددة في أماكن أخرى. يتفق المجتمع العالمي على أن التعليم حق للجميع، وهو الهدف الرابع ضمن أهداف التنمية المستدامة للأمم المتحدة.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Lightbulb className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">التعليم المستمر ميزة تنافسية</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  لم يعد التعليم حكراً على المدارس والجامعات؛ حيث أصبح التعلم مدى الحياة ضرورة في اقتصاد المعرفة الحديث للبقاء في المنافسة الوظيفية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'levels-skills',
      title: 'مستويات التعليم والمهارات',
      subtitle: 'Education Levels & Skills Gap',
      content: (
        <div className="space-y-6 text-right">
          <p>
            بينما يصبح السكان في بعض البلدان أكثر تعليماً، لا يزال مستوى التعليم العام في بلدان أخرى يتخلف عن الركب. يؤثر الفشل في إكمال التعليم الأساسي بشكل سلبي على معدلات الأمية والإنتاجية الاقتصادية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">التعليم في أوروبا</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تمتلك دول مثل فنلندا والمانيا أنظمة تعليمية متطورة تركز على الابتكار والتدريب المهني العالي.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">التعليم الإلكتروني</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يشهد سوق التعليم الرقمي (E-learning) نمواً هائلاً، خاصة في الولايات المتحدة والصين، مما يسهل الوصول للمعرفة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'science-research',
      title: 'العلوم والبحث والتطوير',
      subtitle: 'Science & Global R&D Expenditure',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            زاد إجمالي الإنفاق العالمي على البحث والتطوير (R&D) بشكل كبير في العقود الماضية. تتصدر الولايات المتحدة والصين المشهد باستثمارات هائلة في تحسين المنتجات واكتشاف تقنيات جديدة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Microscope className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الاستثمار في الابتكار</p>
                <p className="text-sm text-slate-400">تعتبر قيمة الملكية الفكرية وبراءات الاختراع مقياساً لقوة الدول الاقتصادية في عصر التكنولوجيا الفائقة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Award className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تصنيفات الجامعات</p>
                <p className="text-sm text-slate-400">تحافظ جامعات Ivy League وهارفارد على تفوقها العالمي بفضل جودة البحث والرواتب المرتفعة لخريجيها.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Harvard University', country: 'USA', note: 'تعتبر أفضل جامعة في العالم في معظم التصنيفات الأكاديمية العالمية' },
    { name: 'Wharton School', country: 'USA', note: 'كلية الأعمال التي يحصل خريجوها على أعلى الرواتب في المتوسط عالمياً' },
    { name: 'Times Higher Education', country: 'UK', note: 'المؤسسة الرائدة في تصنيف وإصدار تقارير جودة التعليم العالي' },
    { name: 'National Science Foundation', country: 'USA', note: 'تدير وتدعم آلاف المشاريع البحثية العلمية المتقدمة سنوياً' },
  ],

  definition: 'تقدم فئة التعليم والعلوم بيانات عن الأنظمة التعليمية بالإضافة إلى البحث والتطوير في جميع أنحاء العالم، مع التركيز على المهارات والمؤسسات والإنفاق العلمي.',

  industryInsights: [
    'الاستثمار في البحث والتطوير يولد عائداً اقتصادياً يصل إلى 20-30% على المدى الطويل للدول المبتكرة',
    'الذكاء الاصطناعي في التعليم يساهم في تخصيص المناهج التعليمية وتحسين نتائج الطلاب بنسبة 40%',
    'الفجوة في المهارات التقنية تظل أكبر تحدي يواجه سوق العمل في الدول الصناعية المتقدمة',
  ],

  tags: ['Education', 'Science', 'Research', 'University Ranking', 'R&D', 'Innovation'],
};

const EducationScienceDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default EducationScienceDashboard;
