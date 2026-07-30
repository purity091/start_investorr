import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Cpu, Server, Monitor, BarChart3, TrendingUp, Globe, Zap, ShieldCheck } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الأجهزة والعتاد',
  titleEn: 'IT Hardware Industry',
  subtitle: 'تحليل سوق الحواسيب، البنية التحتية لمراكز البيانات، الرقائق وأشباه الموصلات، وتأثير طفرة الذكاء الاصطناعي',
  icon: Cpu,
  accent: 'blue',
  pdfLabel: 'تقرير الأجهزة والعتاد (PDF)',

  kpis: [
    { label: 'الإنفاق على الأجهزة 2024', value: '732.3', unit: 'مليار $', icon: Globe },
    { label: 'سوق أشباه الموصلات', value: '630.9', unit: 'مليار $', icon: Cpu },
    { label: 'الإنفاق على مراكز البيانات', value: '259.7', unit: 'مليار $', icon: Server },
  ],

  topMarkets: [
    { 
      label: 'رائد تصميم الرقائق والابتكار', 
      country: 'الولايات المتحدة', 
      note: 'موطن عمالقة التكنولوجيا (Nvidia, Intel, Apple) وتسيطر على برمجيات وتصاميم المعالجات الأكثر تقدماً.',
      icon: Cpu
    },
    { 
      label: 'مركز تصنيع أشباه الموصلات', 
      country: 'تـايوان', 
      note: 'تضم شركة TSMC التي تنتج أكثر من 90% من الرقائق الأكثر تقدماً في العالم، مما يجعلها نقطة ارتكاز استراتيجية.',
      icon: ShieldCheck
    },
    { 
      label: 'أضخم مصنع ومستهلك للعتاد', 
      country: 'الصين', 
      note: 'تعد القاعدة التصنيعية الأكبر للحواسيب والمكونات التقنية، وتمتلك سوقاً محلياً ضخماً يتجه نحو الاكتفاء الذاتي.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'سوق الحواسيب الشخصية', 'مراكز البيانات والـ AI', 'أشباه الموصلات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'طريق التعافي والابتكار',
      subtitle: 'The Road to Recovery & Innovation',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يشهد سوق العتاد التقني تحولاً سريعاً. بعد تراجع طفيف في 2023، تشير التوقعات لعام 2024 إلى انتعاش مدفوع بالطلب المتزايد على منتجات الذكاء الاصطناعي وتحديث البنية التحتية السحابية عالمياً.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Monitor className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">عصر حواسيب الـ AI</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  يمثل ظهور أجهزة الكمبيوتر الشخصية القادرة على معالجة مهام الذكاء الاصطناعي محلياً (AI PCs) نقطة تحول كبرى لتنشيط مبيعات الحواسيب.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'datacenters',
      title: 'مراكز البيانات والذكاء الاصطناعي',
      subtitle: 'Data Centers & AI Chips',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تستثمر الشركات الكبرى مليارات الدولارات في مراكز البيانات لدعم تطبيقات الذكاء الاصطناعي التوليدي وخدمات 5G. يتطلب هذا الجيل الجديد رقائق متخصصة عالية الأداء (GPUs) ونظم تبريد متطورة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Zap className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">كفاءة الطاقة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أصبح استهلاك الطاقة في مراكز البيانات تحدياً رئيسياً يدفع نحو حلول مستدامة.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <ShieldCheck className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">أمن الرقائق</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تزايد التركيز على "جذر الثقة" في العتاد لحماية البيانات الحساسة من الاختراقات المادية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'semiconductors',
      title: 'سوق أشباه الموصلات العالمي',
      subtitle: 'Global Semiconductor Supply Chain',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبحت أشباه الموصلات "النفط الجديد" للاقتصاد الرقمي. تشتد المنافسة بين الدول لتأمين سلاسل التوريد وبناء مسابك محلية (Foundries) لضمان الاستقرار الاستراتيجي والتقني.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Cpu className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">عمالقة المعالجات</p>
                <p className="text-sm text-slate-400">تهيمن Nvidia و Intel و AMD على سوق المعالجات، مع تركيز كبير على وحدات المعالجة العصبية.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">نمو قطاع السيارات</p>
                <p className="text-sm text-slate-400">يزداد الطلب على الرقائق في صناعة السيارات الكهربائية والقيادة الذاتية بشكل مطرد.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Nvidia Corporation', country: 'USA', note: 'الشركة الرائدة في وحدات معالجة الرسومات (GPUs) ورقائق الذكاء الاصطناعي' },
    { name: 'Intel Corporation', country: 'USA', note: 'أحد أكبر مصنعي المعالجات المركزية (CPUs) وتوسيع قدرات التصنيع العالمية' },
    { name: 'Apple Mac / iPad', country: 'USA', note: 'رائدة في تصميم رقائق السيليكون الخاصة بها لرفع كفاءة أجهزتها الشخصية' },
    { name: 'Lenovo Group', country: 'China/Global', note: 'المتصدر العالمي في سوق شحنات أجهزة الكمبيوتر الشخصية لفترات طويلة' },
  ],

  definition: 'تضم صناعة الأجهزة والعتاد (Hardware) تصنيع أجهزة الكمبيوتر، المكونات المحيطة، البنية التحتية لمراكز البيانات، وأشباه الموصلات.',

  industryInsights: [
    'تأمين إمدادات أشباه الموصلات أصبح أولوية للأمن القومي للقوى العظمى عالمياً',
    'مراكز البيانات المتطورة (Edge Data Centers) تقرب قوة المعالجة من المستخدم النهائي لتقليل التأخير',
    'الذكاء الاصطناعي يعيد تعريف معايير تصميم العتاد ليركز على المعالجة المتوازية الضخمة',
  ],

  tags: ['Hardware', 'Semiconductors', 'AI Chips', 'Nvidia', 'Data Centers', 'PCs', 'Servers'],
};

const HardwareDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default HardwareDashboard;
