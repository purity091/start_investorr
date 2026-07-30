import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { ShieldPlus, HeartPulse, Activity, Globe, Users, Building2, BarChart3, Clock, Zap, Microscope } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'نظام الرعاية الصحية والمستشفيات',
  titleEn: 'Health System & Hospitals',
  subtitle: 'تحليل البنية التحتية الطبية، الإنفاق الصحي العالمي، القوى العاملة، وتقنيات الرعاية الرقمية',
  icon: ShieldPlus,
  accent: 'teal',
  pdfLabel: 'تقرير الرعاية الصحية العالمي (PDF)',

  kpis: [
    { label: 'متوسط العمر المتوقع عالمياً', value: '73.4', unit: 'سنة (متوسط)', icon: HeartPulse },
    { label: 'الإنفاق الصحي العالمي', value: '$10T+', unit: 'تريليون دولار سنوي استهدف', icon: BarChart3 },
    { label: 'نقص القوى العاملة الصحية (2030)', value: '15M', unit: 'مليون مهني صحي', icon: Users },
  ],

  navItems: ['نظرة عامة', 'الإنفاق الصحي', 'المستشفيات', 'القوى العاملة', 'التقنيات الصحية', 'القادة'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد أنظمة الرعاية الصحية من أكثر القطاعات حيوية وتطوراً في العالم، حيث تشمل المستشفيات، العيادات، خدمات الرعاية المتخصصة، وشبكات الدعم الطبي.
          </p>
          <p>
            يواجه النظام الصحي العالمي تحديات مزدوجة: زيادة الطلب بسبب شيخوخة السكان وارتفاع الأمراض المزمنة، مقابل نقص حاد في الكوادر الطبية المتخصصة وضغط مستمر على ميزانيات الرعاية العامة والخاصة.
          </p>
        </div>
      ),
    },
    {
      id: 'expenditure',
      title: 'الإنفاق الصحي العالمي',
      subtitle: 'Global Health Expenditure',
      content: (
        <div className="space-y-6 text-right">
          <p>
            وصل الإنفاق العالمي على الصحة إلى مستويات تاريخية، حيث تنفق الدول المتقدمة في المتوسط حوالي 10-17% من ناتجها المحلي الإجمالي على الرعاية الصحية.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
            <div className="p-8 bg-teal-50 rounded-2xl border border-teal-100 flex flex-col items-center shrink-0 w-full md:w-64 text-center">
               <Globe size={40} className="text-teal-600 mb-4" />
               <p className="text-3xl font-black text-teal-900">$12,000</p>
               <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">متوسط إنفاق الفرد في الولايات المتحدة</p>
            </div>
            <div className="flex-1 space-y-4">
              <p>
                تتصدر الولايات المتحدة دول العالم من حيث الإنفاق لكل فرد، بينما تشهد الأسواق الناشئة في آسيا وأفريقيا زيادة متسارعة في الاستثمارات لبناء بنية تحتية طبية حديثة تلبي احتياجات الملايين.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'hospitals',
      title: 'البنية التحتية والمستشفيات',
      subtitle: 'Hospital Infrastructure',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            يتحول مفهوم المستشفيات التقليدية إلى "المستشفيات الذكية" التي تعتمد على الربط الكامل للبيانات والتحكم الآلي لتحسين جودة الرعاية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <Building2 className="text-teal-400 mb-3" size={24} />
              <p className="font-bold text-white">المستشفيات المتخصصة</p>
              <p className="text-xs text-slate-400">ارتفاع الطلب على مراكز التميز في الأورام، القلب، وجراحات العظام المتقدمة.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <Activity className="text-teal-400 mb-3" size={24} />
              <p className="font-bold text-white">الرعاية الحرجة</p>
              <p className="text-xs text-slate-400">توسعة غرف العناية المركزة (ICU) وتطوير بروتوكولات الاستجابة السريعة للأوبئة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'digital-health',
      title: 'التحول الرقمي وصحة المستقبل',
      subtitle: 'Digital Health Revolution',
      content: (
        <div className="space-y-6 text-right">
          <p>
            أصبح الطب عن بعد (Telemedicine) والذكاء الاصطناعي التشخيصي ركائز أساسية لتقليل الضغط على المرافق الطبية الفعلية.
          </p>
          <div className="flex items-start gap-5 p-6 bg-teal-50 rounded-2xl border border-teal-200">
             <Zap className="text-teal-700 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-slate-900 leading-tight">الذكاء الاصطناعي في التشخيص</p>
                <p className="text-sm text-slate-700 leading-relaxed mt-2">
                  يساهم استخدام خوارزميات التعلم العميق في قراءة صور الأشعة والتحاليل في زيادة دقة التشخيص المبكر للسرطان والأمراض النادرة بنسبة تتجاوز 90%.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leaders',
      title: 'قادة قطاع الرعاية الصحية',
      subtitle: 'Health Sector Leaders',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تهيمن الشركات الأمريكية الكبرى على تقديم الرعاية والتأمين الصحي، بينما تبرز أنظمة الرعاية الحكومية في أوروبا كبدائل نموذجية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
             {[
               { name: 'UnitedHealth Group', country: 'U.S.', val: 'World Leader' },
               { name: 'CVS Health', country: 'U.S.', note: 'Integrated Care' },
               { name: 'Mayo Clinic', country: 'U.S.', val: '#1 Hospital' },
               { name: 'HCA Healthcare', country: 'U.S.', note: 'Hospital Op' },
               { name: 'Charité', country: 'Germany', val: 'Europe Leader' },
             ].map((company, idx) => (
               <div key={idx} className="p-5 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-xs font-black text-teal-600 mb-1">{company.country}</p>
                  <p className="font-black text-slate-800">{company.name}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{company.val || company.note}</p>
               </div>
             ))}
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'UnitedHealth Group', country: 'United States', note: 'أكبر شركة رعاية صحية في العالم من حيث الإيرادات والخدمات المتنوعة' },
    { name: 'Mayo Clinic', country: 'United States', note: 'يُصنف كأفضل مستشفى في العالم بفضل أبحاثه وجودة رعايته التخصصية' },
    { name: 'CVS Health', country: 'United States', note: 'مجموعة متكاملة تجمع بين الصيدليات، الرعاية الأولية، والتأمين الصحي' },
    { name: 'HCA Healthcare', country: 'United States', note: 'من أكبر مشغلي المستشفيات الخاصة ومرافق الرعاية الجراحية' },
    { name: 'Siemens Healthineers', country: 'Germany', note: 'الرائد العالمي في تكنولوجيا التصوير الطبي والتشخيص المختبري' },
  ],

  definition: `يشمل قطاع نظام الرعاية الصحية والمستشفيات جميع المؤسسات المسؤولة عن تقديم الخدمات الطبية، بما في ذلك المستشفيات العامة والخاصة، الرعاية المنزلية، المختبرات، وإدارة التأمين الصحي والسياسات الصحية العامة.`,

  industryInsights: [
    'متوسط العمر المتوقع العالمي يرتفع لمستويات قياسية لكن الفجوة بين الدول الغنية والفقيرة تظل تحدياً أخلاقياً',
    'التحول نحو "المستشفيات الذكية" يقلل من الأخطاء الطبية ويزيد كفاءة التشغيل بنسبة 30%',
    'من المتوقع حدوث نقص عالمي بـ 15 مليون عامل صحي بحلول 2030، مما يستوجب الاستثمار في الأتمتة الطبية',
    'الولايات المتحدة تظل أضخم سوق صحي في العالم بإنفاق يتجاوز 4 تريليون دولار سنوياً',
  ],

  tags: ['Healthcare', 'Hospitals', 'Digital Health', 'Medical workforce', 'Life Expectancy', 'Public Health', 'Telemedicine'],
};

const HealthCareDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default HealthCareDashboard;
