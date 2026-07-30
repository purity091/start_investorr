import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Recycle, Trash2, Truck, Battery, Box, Globe, TrendingUp, BarChart3, Building2, FlaskConical } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'إدارة النفايات العالمي',
  titleEn: 'Global Waste Management',
  subtitle: 'تحليل توليد النفايات، معدلات إعادة التدوير، معالجة النفايات الإلكترونية والخطرة، وقادة الاستدامة',
  icon: Recycle,
  accent: 'lime',
  pdfLabel: 'تقرير إدارة النفايات (PDF)',

  kpis: [
    { label: 'توليد النفايات البلاستيكية سنوياً', value: '399M', unit: 'مليون طن', icon: Box },
    { label: 'توليد النفايات الإلكترونية عالمياً', value: '61.9M', unit: 'مليون طن', icon: Trash2 },
    { label: 'إجمالي النفايات السنوية المتولدة', value: '2B', unit: 'مليار طن متري', icon: Globe },
  ],

  topMarkets: [
    { 
      label: 'القوة العالمية لإدارة البيئة', 
      country: 'فرنسا', 
      note: 'مقر لشركة Veolia، أكبر شركة لإدارة النفايات في العالم، وتقود الابتكار في معالجة مياه الصرف والنفايات.',
      icon: Building2
    },
    { 
      label: 'أضخم سوق لمعالجة النفايات', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أكبر بنية تحتية لجمع النفايات البلدية وتوليد الطاقة من النفايات لخدمة استهلاكها الضخم.',
      icon: Truck
    },
    { 
      label: 'رائد معدلات إعادة التدوير', 
      country: 'ألمانيا', 
      note: 'تتصدر العالم في نسب إعادة التدوير بفضل سياسات صارمة وبنية تحتية متطورة لفرز وتدوير المواد.',
      icon: Recycle
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'القطاعات', 'معدلات التدوير', 'توجهات البطاريات', 'القادة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            لا تحمي صناعة إدارة النفايات صحة الإنسان فحسب، بل تحمي البيئة أيضاً. ومع ذلك، أدت زيادة عدد السكان والنزعة الاستهلاكية والنمو الاقتصادي والتحضر المتزايد إلى ارتفاع هائل في توليد النفايات عالمياً.
          </p>
          <p>
             في المتوسط، يتم توليد ما يقرب من <strong>ملياري طن متري</strong> من النفايات كل عام، ومن المتوقع أن ينمو هذا الرقم في العقود القادمة، مما يضغط على قطاع النفايات لتطوير بنية تحتية أكثر كفاءة.
          </p>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات النفايات الرئيسية',
      subtitle: 'Market Segments',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تنقسم إدارة النفايات إلى ثلاثة أنواع رئيسية: النفايات الصناعية، النفايات الخطرة، والنفايات الصلبة البلدية. تغطي هذه القطاعات مجموعة واسعة من المواد من الأغذية والبلاستيك إلى الكيماويات والالكترونيات.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-6 bg-lime-50 rounded-2xl border border-lime-100 flex items-start gap-4">
              <Building2 className="text-lime-600 shrink-0" size={24} />
              <div>
                <p className="font-bold text-slate-900">النفايات الصناعية والبلدية</p>
                <p className="text-xs text-slate-600 mt-1">تشكل الحجم الأكبر من النفايات اليومية وتتضمن الأغذية والمواد المنزلية غير الخطرة.</p>
              </div>
            </div>
            <div className="p-6 bg-lime-50 rounded-2xl border border-lime-100 flex items-start gap-4">
              <FlaskConical className="text-lime-600 shrink-0" size={24} />
              <div>
                <p className="font-bold text-slate-900">النفايات الخطرة</p>
                <p className="text-xs text-slate-600 mt-1">تتطلب معالجة خاصة نظراً لسميتها، وتشمل المواد الكيماوية والمواد الطبية والإشعاعية.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'recycling',
      title: 'معدلات إعادة التدوير العالمية',
      subtitle: 'Recycling Rates',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد إعادة تدوير النفايات الآن أكثر أهمية من أي وقت مضى، ومع ذلك لا تزال معدلات التدوير في العديد من البلدان أقل بكثير مما هو مطلوب لمواجهة الأزمات البيئية.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center shrink-0 w-full md:w-64 text-center">
               <TrendingUp size={40} className="text-lime-400 mb-4" />
               <p className="text-3xl font-black text-white">25%</p>
               <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase text-center">معدل التدوير في الولايات المتحدة</p>
            </div>
            <div className="flex-1 space-y-4">
              <p className="text-slate-300">
                في الولايات المتحدة، كانت نسبة التدوير أقل من 25% طبقاً لأحدث البيانات. بينما تتصدر دول مثل <strong>سلوفينيا وألمانيا وكوريا الجنوبية</strong> القائمة بمعدلات تقترب من 60% بفضل السياسات الحكومية الصارمة.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'batteries',
      title: 'طفرة تدوير البطاريات',
      subtitle: 'Battery Recycling Trends',
      content: (
        <div className="space-y-6 text-right">
          <p>
            مع نمو تبني المركبات الكهربائية، أصبح تدوير البطاريات سوقاً مركزياً لضمان الاستدامة وتقليل الاعتماد على استخراج المعادن الخام.
          </p>
          <div className="flex items-start gap-5 p-6 bg-lime-50 rounded-2xl border border-lime-200">
             <Battery className="text-lime-700 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-slate-900">الريادة الصينية في سعة التدوير</p>
                <p className="text-sm text-slate-700 leading-relaxed mt-2">
                  اعتباراً من عام 2023، تمتلك الصين أكبر قدرة في العالم على إعادة تدوير البطاريات، حيث تبلغ حوالي <strong>500 ألف طن متري</strong>، تليها الولايات المتحدة وأوروبا بفارق كبير.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leaders',
      title: 'قادة صناعة إدارة النفايات',
      subtitle: 'Industry Leaders',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد شركة <strong>Veolia</strong> الفرنسية هي أكبر شركة لإدارة النفايات في العالم بعد استحواذها على منافستها السابقة Suez. ومع ذلك، تعمل العديد من كبرى الشركات داخل الولايات المتحدة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
             {[
               { name: 'Veolia', country: 'France', rev: '$45B+' },
               { name: 'Waste Management Inc', country: 'U.S.', rev: '$20B' },
               { name: 'Republic Services', country: 'U.S.', rev: '$14B' },
             ].map((company, idx) => (
               <div key={idx} className="p-5 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-xs font-black text-lime-600 mb-1">{company.country}</p>
                  <p className="font-black text-slate-800">{company.name}</p>
                  <p className="text-[10px] text-slate-400 mt-1">الإيرادات: {company.rev}</p>
               </div>
             ))}
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Veolia', country: 'France', note: 'العملاق العالمي للمياه والنفايات بعد الاستحواذ على Suez' },
    { name: 'Waste Management Inc', country: 'United States', note: 'أكبر شركة لجمع ومعالجة النفايات في أمريكا الشمالية' },
    { name: 'Republic Services', country: 'United States', note: 'ثاني أكبر مزود لخدمات التخلص من النفايات غير الخطرة في الولايات المتحدة' },
    { name: 'Remondis', country: 'Germany', note: 'شركة رائدة في تدوير المياه والمواد في أوروبا وآسيا' },
    { name: 'Waste Connections', country: 'Canada', note: 'مزود متكامل للنفايات الصلبة في أسواق الولايات المتحدة وكندا' },
  ],

  definition: `تقدم فئة إدارة النفايات إحصاءات وتقارير حول جميع الجوانب المتعلقة بقطاعات النفايات البلدية والتجارية والصناعية. وتشمل هذه المواضيع توليد النفايات، وجمعها، ومعالجتها، والتخلص منها، فضلاً عن تلوث النفايات وتجارتها العالمية.`,

  industryInsights: [
    'مليارا طن من النفايات يتم توليدها سنوياً مع توقعات بزيادة مطردة في العقود القادمة',
    'النفايات الإلكترونية (E-waste) وصلت إلى 61.9 مليون طن، مما يضغط لاستخلاص المعادن النمينة منها',
    'سوق تدوير بطاريات الليثيوم ينمو بقوة ليصبح العمود الفقري لاستدامة النقل الكهربائي',
    'الولايات المتحدة تولد أكبر كمية نفايات للفرد مع معدل تدوير كلي منخفض نسبياً (25%)',
  ],

  tags: ['Waste Management', 'Recycling', 'Plastic Waste', 'E-waste', 'Circular Economy', 'Sustainability', 'Municipal Waste', 'Battery Recycling'],
};

const WasteDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default WasteDashboard;
