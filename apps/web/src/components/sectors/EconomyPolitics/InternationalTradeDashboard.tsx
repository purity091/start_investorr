import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Globe, Ship, Anchor, BarChart3, TrendingUp, DollarSign, Cpu, Truck } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'التجارة الدولية وتبادل السلع',
  titleEn: 'International Trade & Global Goods',
  subtitle: 'تحليل حركة الصادرات والواردات العالمية، اتفاقيات التجارة الحرة، وهيمنة الآلات والإلكترونيات على التجارة الدولية',
  icon: Globe,
  accent: 'indigo',
  pdfLabel: 'تقرير التجارة العالمية (PDF)',

  kpis: [
    { label: 'حجم صادرات السلع العالمي', value: '25', unit: 'ترليون $', icon: Ship },
    { label: 'صادرات الصين للعالم', value: '3.38', unit: 'ترليون $', icon: Globe },
    { label: 'واردات أمريكا من الصين', value: '427', unit: 'مليار $', icon: DollarSign },
  ],

  topMarkets: [
    { 
      label: 'المصدر الأول عالمياً', 
      country: 'الصين', 
      note: 'تتصدر العالم كأكبر مصدّر للسلع، مدفوعة بقطاعات الإلكترونيات والآلات والسيارات الكهربائية.',
      icon: Globe
    },
    { 
      label: 'المستورد الأول عالمياً', 
      country: 'الولايات المتحدة', 
      note: 'أكبر سوق استهلاكي للواردات في العالم وثاني أكبر مصدّر للسلع والخدمات عالية القيمة.',
      icon: DollarSign
    },
    { 
      label: 'محرك التجارة الأوروبي', 
      country: 'ألمانيا', 
      note: 'ثالث أكبر مصدّر عالمي والقوة التجارية الأولى في أوروبا، وتشتهر بتصدير الآلات والكيماويات.',
      icon: Ship
    }
  ],

  navItems: ['نظرة عامة', 'أقسام التجارة', 'السلع الأكثر تداولاً', 'قادة التصدير', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'العمود الفقري للاقتصاد العالمي',
      subtitle: 'Indispensable Component of Global Economy',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تعد التجارة الدولية عنصراً حيوياً في الاقتصاد العالمي، حيث تشمل حركة السلع والخدمات عبر الحدود. تُسهل هذه التجارة اتفاقيات كبرى مثل السوق الأوروبية الموحدة واتفاقية التجارة الحرة لأمريكا الشمالية (NAFTA)، التي تهدف لإلغاء التعريفات الجمركية.
          </p>
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-4">
             <Anchor className="text-indigo-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-indigo-900 leading-tight">الاعتماد المتبادل</p>
                <p className="text-sm text-indigo-700/80 mt-2">
                  تستورد معظم الدول السلع التي لا تستطيع تصنيعها محلياً أو التي تكون تكلفة إنتاجها مرتفعة، مما يجعل الترابط الاقتصادي العالمي ضرورة استراتيجية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'نمو التجارة والارتباط بالناتج المحلي',
      subtitle: 'Trade volume & GDP Relationship',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تظهر الاتجاهات العالمية ارتباطاً وثيقاً بين نمو الناتج المحلي الإجمالي (GDP) وحجم التجارة. بعد أزمة 2009، استمر حجم التبادل التجاري في الارتفاع ليصل إلى مستويات تاريخية في عام 2022 رغم التوترات السياسية والجائحة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-indigo-600 mb-2" size={20} />
                <p className="font-black text-slate-900">حجم التجارة 2022</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">سجلت صادرات السلع العالمية رقماً قياسياً بحوالي 25 تريليون دولار، مما يعكس مرونة سلاسل التوريد.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-indigo-600 mb-2" size={20} />
                <p className="font-black text-slate-900">توقعات 2027</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يتوقع المحللون استمرار التوسع التجاري مدفوعاً بالتحول الرقمي وزيادة الطلب في الأسواق الناشئة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'commodities',
      title: 'الآلات الكهربائية: السلعة الأكثر تداولاً',
      subtitle: 'Machinery as the Most Traded Commodity',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تتصدر الآلات والمعدات الكهربائية قائمة السلع الأكثر تداولاً عالمياً، حيث يتم تداولها غالباً في شكل سلع رأسمالية أو وسيطة تدخل في صناعات أخرى.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Cpu className="text-indigo-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">قطاع الإلكترونيات</p>
                <p className="text-sm text-slate-400">تعتبر رقائق الكمبيوتر ومعدات الاتصالات العمود الفقري للتجارة بين الصين وجنوب شرق آسيا وبقية العالم.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Truck className="text-indigo-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">النقل والمعدات</p>
                <p className="text-sm text-slate-400">تحل معدات النقل والسيارات في المرتبة الثانية من حيث القيمة، مع بروز الصين كمصدر رئيسي للسيارات الكهربائية.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'China', country: 'Asia', note: 'المصدر الأول في العالم بـ 3.38 تريليون دولار في 2023 وقائد التصنيع العالمي' },
    { name: 'United States', country: 'North America', note: 'المستورد الأول وثاني أكبر مصدر عالمي للسلع والخدمات المتقدمة' },
    { name: 'Germany', country: 'Europe', note: 'المصدر الصناعي الأكبر في أوروبا والمتخصص في الآلات والسيارات الفاخرة' },
    { name: 'Word Trade Organization', country: 'Global', note: 'المنظمة الدولية التي تنظم قواعد التجارة وتفصل في المنازعات بين الدول' },
  ],

  definition: 'تشمل التجارة الدولية حركة السلع (مثل النفط، الآلات، المواد الخام) والخدمات عبر الحدود الجغرافية، والمدعومة باتفاقيات قانونية وتجارية دولية.',

  industryInsights: [
    'الصين والولايات المتحدة تشكلان أضخم علاقة تجارية ثنائية في التاريخ رغم التوترات الجيوسياسية',
    'الآلات الكهربائية تتجاوز قيمة تجارة النفط والغاز كأهم قطاع في التبادل التجاري العالمي الحديث',
    'رقمنة مستندات الشحن والجمارك تساهم في خفض تكاليف التجارة الدولية بنسبة تصل إلى 15%',
  ],

  tags: ['International Trade', 'Export', 'Import', 'China Trade', 'Global Economy', 'WTO'],
};

const InternationalTradeDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default InternationalTradeDashboard;
