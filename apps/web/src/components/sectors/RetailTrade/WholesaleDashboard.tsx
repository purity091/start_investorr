import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Box, Truck, Zap, Globe, BarChart3, TrendingUp, LayoutGrid, DollarSign } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع تجارة الجملة والتوزيع',
  titleEn: 'Wholesale Industry',
  subtitle: 'تحليل إدارة سلاسل التوزيع، تجارة السلع المتينة وغير المتينة، نوادي المستودعات، ودور "تجار الجملة المجهزين" في الاقتصاد',
  icon: Box,
  accent: 'blue',
  pdfLabel: 'تقرير سوق الجملة العالمي (PDF)',

  kpis: [
    { label: 'مبيعات الجملة (أمريكا)', value: '9.7', unit: 'ترليون $', icon: BarChart3 },
    { label: 'إجمالي مبيعات الاتحاد الأوروبي', value: '10.4', unit: 'ترليون $', icon: Globe },
    { label: 'مبيعات الجملة في كندا', value: '864', unit: 'مليار $', icon: DollarSign },
  ],

  topMarkets: [
    { 
      label: 'أضخم سوق جملة وتوزيع', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أضخم حجم مبيعات جملة عالمياً وتعد مركزاً لشركات التوزيع العملاقة في مجالات الأغذية والأدوية والسلع الصناعية.',
      icon: BarChart3
    },
    { 
      label: 'المركز الأوروبي للشراء', 
      country: 'ألمانيا', 
      note: 'تتميز بأقوى اتحادات الشراء بالجملة في القارة وتقود العمليات اللوجستية وتوزيع السلع الاستهلاكية للاتحاد الأوروبي.',
      icon: Globe
    },
    { 
      label: 'رائد الجملة الرقمية (B2B)', 
      country: 'الصين', 
      note: 'مقر لمجموعة علي بابا، وتعد المحرك الأول لتجارة الجملة العابرة للحدود والربط الرقمي بين المصانع والمشترين عالمياً.',
      icon: Box
    }
  ],

  navItems: ['نظرة عامة', 'أقسام السوق', 'قادة الصناعة والتوزيع', 'المستودعات الذكية', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'محرك الربط بين المصنع والتجزئة',
      subtitle: 'Management & Transfer of Goods',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تشير سوق الجملة العالمية إلى إدارة ونقل السلع في سلسلة التوليد من المُصنِّع إلى بائع التجزئة. ينظم تجار الجملة بيع السلع للمؤسسات أو تجار التجزئة الآخرين، بالإضافة إلى تداول المواد الخام المستخدمة في الإنتاج.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Truck className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">التعافي من الجائحة</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تتعافى تجارة الجملة تدريجياً من الانخفاض الدراماتيكي الذي تسببت فيه الجائحة، مع ظهور اتجاهات جديدة نحو الرقمنة والبيع المباشر من تاجر الجملة للشركات الصغيرة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'السلع المتينة مقابل غير المتينة',
      subtitle: 'Durable & Non-durable Goods',
      content: (
        <div className="space-y-6 text-right">
          <p>
            يمكن تقسيم سوق الجملة إلى فئتين كبيرتين: السلع المتينة (مثل الآلات والمعدات) وغير المتينة (مثل الأغذية والمنسوجات). تحقق السلع المتينة عادة هوامش ربح إجمالية أعلى لتجار الجملة Merchant Wholesalers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">هوامش الربح</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تُظهر السلع المتينة استقراراً أكبر في الهوامش الربحية، بينما تتأثر السلع غير المتينة بتقلبات الأسعار السريعة لمدخلات الإنتاج.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق اليابان</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تعد اليابان واحدة من أهم أسواق الجملة المنظمة والمترابطة تاريخياً بين الشركات الكبرى والموردين الصغار.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'warehouse-intelligence',
      title: 'نوادي المستودعات والقوة الشرائية',
      subtitle: 'Warehouse Clubs & Brand Value',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبحت نوادي المستودعات مثل Costco قوة مهيمنة في الاقتصاد، حيث تتجاوز قيمتها السوقية عمالقة التجزئة واللوجستيات الرقمية، بفضل نموذج مبيعات الحجم الكبير والاشتراكات.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <LayoutGrid className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">Costco Wholesale</p>
                <p className="text-sm text-slate-400">تتفوق كوستكو في مبيعات المستودعات بمتوسط مبيعات مذهل لكل مستودع، وتتوسع بقوة في المكسيك واليابان وكوريا الجنوبية.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الرقمنة المباشرة</p>
                <p className="text-sm text-slate-400">تجار الجملة يتبنون الآن منصات E-wholesale للبيع المباشر لخدمة المتاجر الصغيرة وتجاوز حلقات التوزيع التقليدية المعقدة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Costco Wholesale Corp', country: 'USA', note: 'الرائد في نموذج نوادي المستودعات وتجارة الجملة الموجهة للأعضاء' },
    { name: 'Alibaba Group', country: 'China', note: 'المحرك الأكبر لتجارة الجملة العالمية عبر الحدود ومنصة الربط بين المصنعين والمشترين' },
    { name: 'McKesson Corporation', country: 'USA', note: 'عملاق توزيع الأدوية والمستلزمات الطبية بالجملة على مستوى العالم' },
    { name: 'Schwarz-Gruppe', country: 'Germany', note: 'تعد واحدة من أكبر قوى الشراء والتوزيع في أوروبا لقطاع السلع الاستهلاكية' },
  ],

  definition: 'تشمل تجارة الجملة كافة المؤسسات التي تبيع السلع لمؤسسات أخرى (متاجر تجزئة، مصانع، أو مكاتب مهنية) دون استهلاكها النهائي، وتضم تجار الجملة المجهزين، المصدرين، والجمعيات التعاونية للشراء.',

  industryInsights: [
    'تجارة الجملة تشكل العصب الحساس لحركة الاستيراد والتصدير وضمان استقرار الأسعار في الأسواق المحلية',
    'التحول نحو "سلاسل التوريد الذكية" يقلل من الفاقد في السلع غير المتينة (مثل الأغذية) بنسبة 30%',
    'المستودعات الآلية القائمة على السحابة تسمح لتجار الجملة بإدارة مخزونات ضخمة بفعالية تشغيلية عالية',
  ],

  tags: ['Wholesale', 'Distribution', 'Costco', 'Supply Chain', 'Merchant Wholesalers', 'Global Trade'],
};

const WholesaleDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default WholesaleDashboard;
