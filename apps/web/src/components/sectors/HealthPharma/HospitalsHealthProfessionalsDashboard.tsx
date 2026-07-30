import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Stethoscope, Building2, Users, UserCog, Activity, BarChart3, TrendingUp, ShieldPlus } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'المستشفيات والمهنيين الصحيين',
  titleEn: 'Hospitals & Health Professionals',
  subtitle: 'تحليل توزيع المستشفيات، تعداد الأطباء والممرضين، سعة الأسرة، وإدارة المرافق الصحية',
  icon: Stethoscope,
  accent: 'cyan',
  pdfLabel: 'تقرير الموارد الصحية العالمي (PDF)',

  kpis: [
    { label: 'عدد المستشفيات في أمريكا', value: '6,120', unit: 'مرفق', icon: Building2 },
    { label: 'عدد الأطباء في أمريكا', value: '1.07', unit: 'مليون طبيب', icon: UserCog },
    { label: 'نسبة الممرضين لكل طبيب', value: '3:1', icon: Users },
  ],

  topMarkets: [
    { 
      label: 'أكبر إنفاق صحي عالمي', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر العالم في الإنفاق على الرعاية الصحية، ومقر لأضخم أنظمة المستشفيات الربحية وغير الربحية.',
      icon: Building2
    },
    { 
      label: 'أعلى سعة استيعابية أوروبية', 
      country: 'ألمانيا', 
      note: 'تمتلك واحداً من أعلى معدلات الأسرة لكل 1000 نسمة في أوروبا، مع نظام مستشفيات متطور تقنياً.',
      icon: Activity
    },
    { 
      label: 'الرائد في رعاية المسنين', 
      country: 'اليابان', 
      note: 'تمتلك أعلى عدد أسرة مستشفيات للفرد عالمياً، وتقود الابتكار في دمج الروبوتات الطبية والتمريض.',
      icon: ShieldPlus
    }
  ],

  navItems: ['نظرة عامة', 'إحصاءات المستشفيات', 'المهنيون الصحيون', 'السعة التشغيلية', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'العمود الفقري لتقديم الرعاية',
      subtitle: 'Healthcare Delivery Backbone',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تشكل المستشفيات ومقدمو الرعاية الصحية الواجهة المباشرة والأكثر وضوحاً لأي نظام صحي وطني. يعتمد نجاح القطاع على التوازن بين البنية التحتية الصلبة (المستشفيات) والموارد البشرية الكفؤة (الأطباء والتمريض).
          </p>
          <div className="p-6 bg-cyan-50 rounded-2xl border border-cyan-100 flex items-start gap-4">
             <ShieldPlus className="text-cyan-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-cyan-900 leading-tight">أنواع المستشفيات</p>
                <p className="text-sm text-cyan-700/80 mt-2">
                  تتنوع المرافق بين مستشفيات عامة مجتمعية، مستشفيات جامعية تعليمية، ومراكز تخصصية خاصة، حيث تلعب المستشفيات غير الربحية دوراً هاماً في دول مثل الولايات المتحدة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'hospitals',
      title: 'إحصاءات المرافق الصحية والسعة',
      subtitle: 'Hospital Infrastructure & Capacity',
      content: (
        <div className="space-y-6 text-right">
          <p>
            يُعد "عدد الأسرة لكل 1000 نسمة" من أهم المؤشرات التي تقيس مرونة النظام الصحي في أوقات الأزمات. وتبرز اليابان وألمانيا كقادة عالميين في هذا المؤشر.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Building2 className="text-cyan-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق العمليات الجراحية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">هناك اتجاه متزايد نحو الجراحات الخارجية (Outpatient Surgeries) لتقليل تكاليف الإقامة في المستشفيات.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Activity className="text-cyan-600 mb-2" size={20} />
                <p className="font-black text-slate-900">معدلات الإشغال</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تراقب المستشفيات معدل دوران الأسرة ومدة الإقامة (ALOS) كمؤشرات رئيسية للكفاءة التشغيلية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'professionals',
      title: 'القوى العاملة الصحية',
      subtitle: 'Economic Impact of Health Workers',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يمثل الأطباء والممرضون المورد الأكثر قيمة وندرة في القطاع الصحي. تواجه العديد من الدول نقصاً حاداً في طواقم التمريض المتخصصة.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
             <div className="p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center shrink-0 w-full md:w-64 text-center">
                <BarChart3 size={40} className="text-cyan-400 mb-4" />
                <p className="text-3xl font-black text-white">4.2M+</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">عدد الممرضين المسجلين في أمريكا</p>
             </div>
             <div className="flex-1 space-y-4">
                <p className="text-slate-400">
                  تعتبر تخصصات الرعاية الحرجة وطب الطوارئ من أكثر المهن طلباً وأعلاها أجراً، مع تحولات ديموغرافية تتطلب المزيد من المتخصصين في طب الشيخوخة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'HCA Healthcare', country: 'USA', note: 'أكبر مشغل للمستشفيات الربحية في العالم' },
    { name: 'Ascension Health', country: 'USA', note: 'واحدة من أكبر أنظمة الرعاية غير الربحية الكاثوليكية' },
    { name: 'Ramsay Health Care', country: 'Australia', note: 'مشغل عالمي للمستشفيات في آسيا وأوروبا' },
    { name: 'Fresenius Helios', country: 'Germany', note: 'أكبر مجموعة مستشفيات خاصة في أوروبا' },
  ],

  definition: 'يشمل هذا القطاع مرافق الرعاية الصحية السريرية (المستشفيات، العيادات، مراكز الجراحة الخارجية) والقوى العاملة اللازمة لتشغيلها من أطباء وممرضين وفنيين وإداريين.',

  industryInsights: [
    'الأتمتة والذكاء الاصطناعي يخففان من الأعباء الإدارية على الأطباء بنسبة قد تصل إلى 40%',
    'الارتحال الطبي (Medical Tourism) ينمو كقطاع تصديري هام لعدة دول مثل تايلاند وتركيا والمكسيك',
    'نقص التمريض العالمي يُقدر بـ 6 ملايين ممرض وممرضة، مما يرفع تكاليف التوظيف والتدريب',
  ],

  tags: ['Hospitals', 'Physicians', 'Nursing', 'Health Workforce', 'Medical Facilities'],
};

const HospitalsHealthProfessionalsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default HospitalsHealthProfessionalsDashboard;
