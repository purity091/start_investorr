import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Cloud, Briefcase, ShieldCheck, BarChart3, TrendingUp, Globe, Users, Database } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'خدمات تقنية المعلومات',
  titleEn: 'IT Services Industry',
  subtitle: 'تحليل قطاعات الحوسبة السحابية، التحول الرقمي، خدمات الأمن السيبراني، وحلول الذكاء الاصطناعي للمؤسسات',
  icon: Briefcase,
  accent: 'blue',
  pdfLabel: 'تقرير خدمات IT (PDF)',

  kpis: [
    { label: 'الإنفاق على IT عالمياً 2024', value: '5.1', unit: 'تريليون $', icon: Globe },
    { label: 'الإنفاق على خدمات IT', value: '1.59', unit: 'تريليون $', icon: BarChart3 },
    { label: 'أكبر سوق إقليمي', value: 'Americas', unit: 'Region', icon: Database },
  ],

  topMarkets: [
    { 
      label: 'محرك الابتكار والخدمات السحابية', 
      country: 'الولايات المتحدة', 
      note: 'مقر كبرى شركات الخدمات السحابية والذكاء الاصطناعي (Azure, AWS)، وتسيطر على 40% من الإنفاق العالمي على خدمات IT.',
      icon: Cloud
    },
    { 
      label: 'مركز التعهيد (Outsourcing) العالمي', 
      country: 'الهند', 
      note: 'القوة الضاربة في تقديم خدمات تطوير البرمجيات والدعم الفني عبر شركات عملاقة مثل TCS وInfosys.',
      icon: Users
    },
    { 
      label: 'قائد التحول الرقمي الأوروبي', 
      country: 'ألمانيا / بريطانيا', 
      note: 'مراكز هامة لاستشارات التحول الرقمي وتطوير الحلول البرمجية المتخصصة للقطاعات الصناعية والمالية.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'الحوسبة السحابية', 'أمن البيانات والـ AI', 'التحول الرقمي', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'إدارة الرقمية في عصر المعلومات',
      subtitle: 'Managing Digital in the Information Age',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تعتمد الشركات اليوم على خدمات تقنية المعلومات للتنقل في عالم التكنولوجيا المعقد ودعم وظائف الأعمال المتنوعة. يشمل هذا القطاع الاستشارات، تطوير البرمجيات، تكامل الأنظمة، والتعليم التقني، مع نمو هائل في حلول الذكاء الاصطناعي.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Cloud className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">الحوسبة السحابية كمحرك للابتكار</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تظل الخدمات السحابية الجزء الأسرع نمواً، حيث تتيح للشركات مرونة تشغيلية عالية وتقليل التكاليف المرتبطة بالبنية التحتية المادية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'market-segments',
      title: 'قطاعات السوق المتنامية',
      subtitle: 'Growth Segments & Managed Services',
      content: (
        <div className="space-y-6 text-right">
          <p>
            يتنوع سوق خدمات IT ليشمل الخدمات المدارة، خدمات الأمن، وإدارة البيانات. يزداد تعقيد البنية التحتية التقنية مما يرفع الطلب على الشركاء المتخصصين لضمان كفاءة العمليات وحماية الأمن السيبراني.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <ShieldCheck className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الأمن السيبراني</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أصبح تأمين البيانات أولوية قصوى مع زيادة التهديدات الرقمية عالمياً وتطور تقنيات الاختراق.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Database className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">إدارة البنية التحتية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">وصل الإنفاق العالمي على أنظمة مراكز البيانات إلى مستويات قياسية لدعم طفرة الذكاء الاصطناعي.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'work-trends',
      title: 'مستقبل العمل والتعاون الرقمي',
      subtitle: 'Hybrid Work & Collaboration Tools',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أتاحت خدمات IT إمكانية التعاون من مواقع مختلفة، مما مهد الطريق لنماذج العمل الهجين. توفر هذه الخدمات الأدوات والمنصات اللازمة لضمان الإنتاجية والتواصل الفعال بعيداً عن مقار العمل التقليدية.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Users className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">العمل عن بعد</p>
                <p className="text-sm text-slate-400">زادت معدلات الاعتماد على المنصات التشاركية، مما سرع من وتيرة التحول الرقمي في بيئات العمل.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الشراكة الاستراتيجية</p>
                <p className="text-sm text-slate-400">تحولت شركات الخدمات من مجرد مزودين تقنيين إلى شركاء أعمال يسهمون في تحقيق الأهداف الاستراتيجية لعملائهم.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Microsoft (Azure)', country: 'USA', note: 'الرائدة في تقديم الخدمات السحابية وحلول الإنتاجية للمؤسسات عالمياً' },
    { name: 'Amazon Web Services (AWS)', country: 'USA', note: 'أكبر مزود لخدمات البنية التحتية السحابية من حيث الحصة السوقية والإيرادات' },
    { name: 'IBM', country: 'USA', note: 'تركز على الذكاء الاصطناعي للأعمال (Watson) والحلول الاستشارية التقنية المعقدة' },
    { name: 'Accenture', country: 'Ireland/Global', note: 'عملاق الاستشارات التقنية والتحول الرقمي الذي يخدم معظم شركات Fortune 500' },
  ],

  definition: 'تشمل صناعة خدمات تقنية المعلومات كافة الأنشطة التي تساعد المنظمات على إدارة ومعالجة المعلومات، من الاستشارات والسحابية إلى الأمن والدعم الفني.',

  industryInsights: [
    'التوجه نحو "كل شيء كخدمة" (XaaS) يغير ميزانيات الشركات من الإنفاق الرأسمالي إلى التشغيلي',
    'الذكاء الاصطناعي يعيد تعريف مراكز خدمة العملاء (Help Desks) عبر الأتمتة الذكية والتحليل التنبؤي',
    'الفجوة في المهارات التقنية تظل التحدي الأكبر لنمو القطاع، مما يرفع قيمة الكوادر المتخصصة بالأمن والـ AI',
  ],

  tags: ['IT Services', 'Cloud Computing', 'SaaS', 'Digital Transformation', 'Microsoft', 'AWS', 'Cybersecurity'],
};

const ITServicesDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default ITServicesDashboard;
