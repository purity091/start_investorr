import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Truck, Box, Zap, Globe, BarChart3, TrendingUp, Cpu, Recycle } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'سوق سلاسل التوريد والخدمات اللوجستية',
  titleEn: 'Retail Supply Chain Industry',
  subtitle: 'تحليل أتمتة المستودعات، إدارة المخزون الرقمي، استراتيجيات التسليم السريع، والاستدامة في الخدمات اللوجستية',
  icon: Truck,
  accent: 'blue',
  pdfLabel: 'تقرير سلاسل التوريد (PDF)',

  kpis: [
    { label: 'نسبة المخزون إلى المبيعات (U.S.)', value: '1.38', icon: BarChart3 },
    { label: 'شركات تعتمد اللوجستيات الخضراء', value: '59%', icon: Recycle },
    { label: 'نوع التلبية الأكثر شيوعاً', value: 'B2B', icon: Box },
  ],

  topMarkets: [
    { 
      label: 'محرك اللوجستيات العالمي', 
      country: 'الولايات المتحدة', 
      note: 'تقود العالم في ابتكارات تلبية الطلبات (Fulfillment) وأتمتة الميل الأخير، مع وجود مقر شركة أمازون.',
      icon: Globe
    },
    { 
      label: 'المركز اللوجستي الأوروبي', 
      country: 'ألمانيا / هولندا', 
      note: 'تمتلك أهم الموانئ (روتردام) وأكبر شركات الشحن (DHL)، وتعد القلب النابض لسلاسل التوريد في القارة.',
      icon: Truck
    },
    { 
      label: 'رائد كفاءة توريد الأزياء', 
      country: 'إسبانيا', 
      note: 'مقر لشركة Inditex التي تدير واحدة من أسرع سلاسل توريد الملابس الجاهزة عالمياً من التصميم إلى المتجر.',
      icon: Zap
    }
  ],

  navItems: ['نظرة عامة', 'أتمتة المستودعات', 'سلسلة توريد الأزياء', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'ضمان وصول المنتج للمستهلك النهائي',
      subtitle: 'Ensuring Delivery of Finished Consumer Goods',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تضمن سلسلة توريد التجزئة تسليم السلع الاستهلاكية النهائية عبر منافذ متعددة. تبدأ تعقيدات هذا القطاع من إدارة المخزون الرقمي وأنظمة ERP، وصولاً إلى توقع الطلب بكفاءة عالية لتقصير وقت التسليم وخفض التكاليف.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Zap className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">تكامل القنوات (Omnichannel)</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تندمج قنوات البيع عبر الإنترنت والميدانية بشكل متزايد، حيث تتحول المتاجر التقليدية في المناطق الحضرية إلى مرافق "تلبية صغيرة" (Micro-fulfillment) لتقريب المنتج من العميل.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'automation',
      title: 'الأتمتة والذكاء الاصطناعي في المستودعات',
      subtitle: 'Warehouse Automation & AI Efficiency',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد السرعة جوهرية في الربط بين الطلب والتسليم. تساهم تقنيات الرؤية الحاسوبية (Computer Vision) والروبوتات في أتمتة المهام اليدوية مثل الجدولة والبيك، مما يرفع الكفاءة التشغيلية بشكل غير مسبوق.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Cpu className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">روبوتات AGV/AMR</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تتصدر الروبوتات المتنقلة قطاع أتمتة المستودعات، حيث تساعد في نقل السلع ذاتياً دون تدخل بشري مما يقلل الحوادث والأخطاء.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">اللوجستيات الخضراء</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تتجه 59% من الشركات الصغيرة والمتوسطة نحو حلول لوجستية صديقة للبيئة لتقليل الانبعاثات والوفاء بمتطلبات الاستدامة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'fashion-supply',
      title: 'تحديات سلسلة توريد الأزياء السريعة',
      subtitle: 'Fast Fashion Stocks & Waste Concerns',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
             تنتج شركات "الموضة السريعة" مليارات القطع سنوياً بتكاليف منخفضة وسرعة توريد مذهلة، لكن هذا يثير مخاوف بيئية كبيرة بسبب حجم النفايات والبصمة الكربونية.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">سرعة دوران المخزون</p>
                <p className="text-sm text-slate-400">تعتمد شركات مثل Inditex على سلاسل توريد مرنة جداً قادرة على تحويل التصميم إلى منتج في المتاجر خلال أسابيع قليلة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Recycle className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">توقعات المستهلك</p>
                <p className="text-sm text-slate-400">أصبح المستهلكون يتوقعون توصيلاً مجانياً وسريعاً، بالإضافة إلى سياسات إرجاع مرنة، مما يضع ضغوطاً كبرى على اللوجستيات.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Amazon Logistics', country: 'USA', note: 'المعيار العالمي في سرعة التوصيل وابتكار حلول الميل الأخير (Last Mile)' },
    { name: 'Inditex', country: 'Spain', note: 'يمتلك واحدة من أكثر سلاسل توريد الأزياء كفاءة وسرعة في العالم' },
    { name: 'DHL / FedEx', country: 'Global', note: 'القادة في تقديم خدمات الطرف الثالث اللوجستية (3PL) لشركات التجزئة' },
    { name: 'Maersk', country: 'Denmark', note: 'عملاق الشحن البحري الذي يتوسع نحو الحلول اللوجستية المتكاملة برياً وجوياً' },
  ],

  definition: 'تغطي سلسلة توريد التجزئة كافة العمليات من إدارة المخزون، تلبية الطلبات (Fulfillment)، والخدمات اللوجستية، وصولاً إلى تسليم السلع والخدمات للمستهلك النهائي وخدمات الإرجاع.',

  industryInsights: [
    'الاعتماد على الذكاء الاصطناعي في توقع الطلب يقلل من تكديس المخزون بنسبة تصل لـ 20%',
    'تتحول المتاجر التقليدية الكبيرة إلى مراكز لوجستية محلية لخفض تكلفة وزمن التوصيل للمنازل',
    'الاستدامة في سلاسل التوريد لم تعد خياراً بل ضرورة تنظيمية وطلباً استهلاكياً متزايداً',
  ],

  tags: ['Supply Chain', 'Logistics', 'Warehouse Automation', 'Inventory Management', 'Omnichannel', 'Sustainability'],
};

const SupplyChainDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default SupplyChainDashboard;
