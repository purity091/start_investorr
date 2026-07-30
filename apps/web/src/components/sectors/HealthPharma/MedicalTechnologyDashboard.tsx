import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Scan, Cpu, Radio, Activity, Zap, BarChart3, TrendingUp, Microscope } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'التكنولوجيا الطبية (MedTech)',
  titleEn: 'Medical Technology Sector',
  subtitle: 'تحليل الأجهزة الطبية، التشخيص المخبري، التصوير الطبي، والابتكارات في الجراحة الروبوتية',
  icon: Scan,
  accent: 'indigo',
  pdfLabel: 'تقرير الابتكار الطبي العالمي (PDF)',

  kpis: [
    { label: 'سوق الأجهزة الطبية العالمي', value: '600', unit: 'مليار $', icon: Zap },
    { label: 'حصة التشخيص المخبري (IVD)', value: '15%', icon: BarChart3 },
    { label: 'استثمارات تقنيات القلب', value: '70', unit: 'مليار $', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'رائد الابتكار الطبي العالمي', 
      country: 'الولايات المتحدة', 
      note: 'تسيطر الشركات الأمريكية على أكثر من 40% من السوق العالمي للأجهزة الطبية، وتقود الابتكار في براءات الاختراع.',
      icon: Zap
    },
    { 
      label: 'مركز الهندسة الطبية الأوروبي', 
      country: 'ألمانيا', 
      note: 'تُعد مركزاً عالمياً للتصوير الطبي والتشخيص، وتضم عمالقة مثل Siemens Healthineers.',
      icon: Scan
    },
    { 
      label: 'قائد التكنولوجيا الروبوتية', 
      country: 'اليابان', 
      note: 'تتصدر الابتكار في دمج الروبوتات في الجراحات الدقيقة وأجهزة الرعاية الطبية المنزلية المساعدة.',
      icon: Cpu
    }
  ],

  navItems: ['نظرة عامة', 'فئات السوق', 'براءات الاختراع', 'القادة الجدد', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'عصر الابتكار الطبي المتسارع',
      subtitle: 'MedTech Innovation Era',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يُعد قطاع التكنولوجيا الطبية المحرك الرئيسي لتحسين جودة الحياة وإطالة مأمول العمر. من الأجهزة القابلة للزرع إلى تقنيات التصوير بالرنين المغناطيسي، يساهم هذا القطاع في جعل التشخيص أكثر دقة والعلاج أقل بضعاً.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
             <div className="p-5 border border-indigo-100 rounded-2xl bg-indigo-50/50">
                <Microscope className="text-indigo-600 mb-2" size={20} />
                <p className="font-black text-slate-900">أدوات التشخيص (Diagnostics)</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تمثل التكنولوجيا المعتمدة على التشخيص المختبري (IVD) أكبر شريحة فردية في سوق MedTech العالمي.</p>
             </div>
             <div className="p-5 border border-indigo-100 rounded-2xl bg-indigo-50/50">
                <Cpu className="text-indigo-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الجراحة الروبوتية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يشهد هذا المجال طفرة هائلة مع دخول الذكاء الاصطناعي في توجيه العمليات الجراحية الدقيقة.</p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'القطاعات المهيمنة في MedTech',
      subtitle: 'Key Market Segments',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تستحوذ ثلاثة مجالات رئيسية على أكثر من 40% من السوق العالمي للأجهزة الطبية: التشخيص المخبري، وأجهزة القلب، والتصوير الطبي.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
             <div className="p-8 bg-slate-900 rounded-2xl border border-indigo-500/30 flex flex-col items-center shrink-0 w-full md:w-64 text-center">
                <Activity size={40} className="text-indigo-400 mb-4" />
                <p className="text-3xl font-black text-white">IVD</p>
                <p className="text-[10px] font-bold text-indigo-300 mt-1 uppercase">التشخيص المختبري هو القائد</p>
             </div>
             <div className="flex-1 space-y-4">
                <p className="text-slate-600">
                  مع تزايد الطلب على الفحوصات الجينية والكشوفات المبكرة، يتوقع المحللون أن يستمر قطاع التشخيص في النمو بمعدلات أسرع من الأطراف الصناعية أو الأدوات الجراحية التقليدية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'patents',
      title: 'براءات الاختراع والملكية الفكرية',
      subtitle: 'Intellectual Property Trends',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يُعتبر قطاع MedTech من أكثر القطاعات غزارة في تقديم طلبات براءات الاختراع، متجاوزاً أحياناً قطاع تكنولوجيا المعلومات والاتصالات الرقمية.
          </p>
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4">
             <Radio className="text-indigo-400 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-white leading-tight">الريادة في مكتب براءات الاختراع الأوروبي</p>
                <p className="text-sm text-slate-400 mt-2">
                  تحتل التكنولوجيا الطبية باستمرار المرتبة الأولى أو الثانية في عدد طلبات براءات الاختراع المقدمة سنوياً إلى المكتب الأوروبي لبراءات الاختراع (EPO).
                </p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Medtronic', country: 'Ireland/USA', note: 'أكبر شركة أجهزة طبية في العالم مع تنوع هائل في المنتجات' },
    { name: 'Johnson & Johnson MedTech', country: 'USA', note: 'رائد في الجراحة والحلول البصرية وتقويم العظام' },
    { name: 'Siemens Healthineers', country: 'Germany', note: 'العملاق العالمي في تقنيات التصوير الطبي والتشخيص' },
    { name: 'Stryker', country: 'USA', note: 'رائد في تكنولوجيا العظام والأدوات الجراحية المتقدمة' },
    { name: 'Abbott Laboratories', country: 'USA', note: 'قوة مهيمنة في أجهزة القلب والتشخيص المخبري' },
  ],

  definition: 'يشمل قطاع التكنولوجيا الطبية (MedTech) مجموعة واسعة من أدوات الرعاية الصحية المستخدمة لتشخيص ومراقبة وعلاج الأمراض والظروف المادية، بدءاً من الضمادات البسيطة إلى أنظمة الروبوتات الجراحية المعقدة.',

  industryInsights: [
    'الأجهزة الطبية المتصلة (IoMT) تتيح مراقبة المرضى عن بُعد في الوقت الفعلي بشكل لم يسبق له مثيل',
    'الطباعة ثلاثية الأبعاد تغير قواعد اللعبة في تصنيع الأطراف الصناعية وزراعة العظام المخصصة لكل مريض',
    'الابتكار في MedTech يقلل من مدة الإقامة في المستشفيات بنسبة 30% بفضل الجراحات الأقل بضعاً (Minimally Invasive)',
  ],

  tags: ['MedTech', 'Medical Devices', 'Diagnostics', 'Surgical Robotics', 'Imaging'],
};

const MedicalTechnologyDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default MedicalTechnologyDashboard;
