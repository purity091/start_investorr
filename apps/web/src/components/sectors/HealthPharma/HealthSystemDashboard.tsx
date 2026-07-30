import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Landmark, Globe, Activity, Heart, ShieldEllipsis, Users, TrendingUp, DollarSign } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'النظام الصحي العالمي',
  titleEn: 'Global Health System',
  subtitle: 'تحليل الإنفاق الصحي، أنظمة الرعاية، التغطية الصحية الشاملة، والسياسات الصحية للدول',
  icon: Landmark,
  accent: 'blue',
  pdfLabel: 'تقرير ميزانيات الصحة العالمية (PDF)',

  kpis: [
    { label: 'إجمالي نفقات الصحة العالمية', value: '9', unit: 'ترليون $', icon: DollarSign },
    { label: 'الإنفاق الصحي في أمريكا/GDP', value: '18.3%', unit: 'من الناتج المحلي', icon: TrendingUp },
    { label: 'الرعاية الممولة من الحكومة', value: '60%', icon: ShieldEllipsis },
  ],

  topMarkets: [
    { 
      label: 'أعلى إنفاق صحي للفرد', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أكبر سوق للرعاية الصحية في العالم بإنفاق يتجاوز 4 تريليون دولار سنوياً، وتقود الابتكار الطبي العالمي.',
      icon: DollarSign
    },
    { 
      label: 'رائد التمويل العام (NHS)', 
      country: 'المملكة المتحدة', 
      note: 'تُعد النموذج الأبرز عالمياً للأنظمة الصحية الممولة حكومياً بالكامل والوصول المجاني للخدمات عند الحاجة.',
      icon: Landmark
    },
    { 
      label: 'أفضل توازن جودة ووصول', 
      country: 'فرنسا', 
      note: 'تُصنف باستمرار كواحدة من أفضل الأنظمة الصحية في العالم من حيث نتائج الرعاية ورضا المرضى وتغطية التكاليف.',
      icon: ShieldEllipsis
    }
  ],

  navItems: ['نظرة عامة', 'نفقات الصحة', 'الرعاية العامة', 'المؤشرات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'بنية الأنظمة الصحية العالمية',
      subtitle: 'Healthcare Infrastructure',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تتفاوت الأنظمة الصحية عالمياً بشكل كبير بين النماذج الممولة من الضرائب (مثل المملكة المتحدة) والنماذج التي تعتمد على التأمين الصحي الخاص (مثل الولايات المتحدة). يعد فهم هذه الهياكل ضرورياً لتقييم كفاءة تقديم الرعاية وجودة النتائج الصحية.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Globe className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">التغطية الصحية الشاملة (UHC)</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تسعى معظم الدول المتقدمة والعديد من الدول النامية إلى تحقيق التغطية الصحية الشاملة، حيث يتم تأمين وصول جميع المواطنين إلى الخدمات الصحية الأساسية دون مواجهة صعوبات مالية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'spending',
      title: 'اقتصاديات الصحة: أين تُنفق الأموال؟',
      subtitle: 'Health Expenditure Analysis',
      content: (
        <div className="space-y-6 text-right">
          <p>
            وصل الإنفاق الصحي العالمي إلى مستويات قياسية تاريخية، خاصة في أعقاب جائحة كورونا وتزايد نفقات رعاية المسنين في الدول الغنية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <DollarSign className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الولايات المتحدة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تُعد الولايات المتحدة صاحبة أعلى إنفاق صحي للفرد في العالم، ومع ذلك تواجه تحديات في إمكانية الوصول والتكاليف.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Users className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">دول الـ OECD</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يبلغ متوسط الإنفاق الصحي في دول منظمة التعاون الاقتصادي والتنمية حوالي 9-10% من الناتج المحلي الإجمالي.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'insurance',
      title: 'الرعاية العامة والخاصة',
      subtitle: 'Public vs Private Sector',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            في معظم دول العالم، يتم تمويل حصة الأسد من الرعاية الصحية من خلال القطاع العام (الضرائب أو اشتراكات التأمين الاجتماعي الإجباري).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <ShieldEllipsis className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">التمويل الحكومي</p>
                <p className="text-sm text-slate-400">يوفر الاستدامة والمساواة في الوصول، ولكنه قد يعاني من فترات انتظار طويلة للخدمات غير العاجلة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Heart className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">التمويل الخاص</p>
                <p className="text-sm text-slate-400">يشمل مدفوعات التأمين التجاري والمدفوعات المباشرة من الجيب، ويوفر خيارات أسرع وخدمات بمستوى رفاهية أعلى.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Mayo Clinic', country: 'USA', note: 'تُصنف باستمرار كأفضل نظام مستشفيات في العالم' },
    { name: 'NHS', country: 'United Kingdom', note: 'أكبر نظام صحي ممول من الضرائب عالمياً' },
    { name: 'Cleveland Clinic', country: 'International', note: 'رائد في نماذج الرعاية المتكاملة والجراحة المتقدمة' },
  ],

  definition: 'يشمل النظام الصحي جميع المنظمات والمؤسسات والموارد المخصصة لإنتاج الإجراءات الصحية، بهدف تحسين الصحة والوقاية من الأمراض وتوفير رعاية عادلة وكفؤة للسكان.',

  industryInsights: [
    'التحول الرقمي (Telehealth) يقلل من تكلفة تقديم الرعاية بنسبة تصل إلى 20% في بعض الأنظمة',
    'التركيز العالمي ينتقل من "علاج المرض" إلى "الرعاية الوقائية" لتقليل الأعباء الاقتصادية طويلة الأمد',
    'التعاون الدولي في ترصد الأوبئة (Pandemic Surveillance) أصبح ركيزة في السياسات الصحية الوطنية',
  ],

  tags: ['Healthcare System', 'Public Health', 'Health Economics', 'Policy', 'Insurance'],
};

const HealthSystemDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default HealthSystemDashboard;
