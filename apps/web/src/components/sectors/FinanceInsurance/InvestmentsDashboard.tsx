import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { LineChart, TrendingUp, BarChart2, Globe, ShieldCheck, PieChart, Coins, DollarSign, Wallet, ArrowUpRight } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الأدوات المالية والاستثمارات',
  titleEn: 'Financial Instruments & Investments',
  subtitle: 'تحليل أسواق الأسهم العالمية، السندات السيادية، العملات المشفرة، وتوجهات الاستثمار المستدام ESG',
  icon: LineChart,
  accent: 'violet',
  pdfLabel: 'تقرير الاستثمار العالمي 2024 (PDF)',

  kpis: [
    { label: 'أدنى مستوى لمؤشر S&P 500', value: '3,808', unit: 'نقطة (2023)', icon: TrendingUp },
    { label: 'معدل التضخم العالمي المتوقع', value: '5.8%', unit: 'في عام 2024', icon: Globe },
    { label: 'سوق العملات المشفرة', value: '$2.74T', unit: 'تريليون دولار', icon: Coins },
  ],

  topMarkets: [
    { 
      label: 'أضخم سوق لرأس المال', 
      country: 'الولايات المتحدة', 
      note: 'موطن بورصتي NYSE وNASDAQ اللتين تسيطران على أكثر من 53 تريليون دولار من القيمة السوقية العالمية.',
      icon: LineChart
    },
    { 
      label: 'قوة النمو الآسيوي', 
      country: 'الصين', 
      note: 'تمتلك ثالث أكبر بورصة في العالم وتعد المحرك الأول للاستثمارات في التكنولوجيا المالية والذكاء الاصطناعي.',
      icon: TrendingUp
    },
    { 
      label: 'المركز المالي الأوروبي', 
      country: 'المملكة المتحدة', 
      note: 'تظل لندن المركز التاريخي الأهم في أوروبا لتداول السندات الدولية وصناديق الاستثمار العابرة للحدود.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'أسواق الأسهم', 'الأسهم والسندات', 'استثمار ESG', 'قادة الصناعة', 'سوق العملات'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            شهد سوق الاستثمار العالمي تقلبات ملحوظة في عام 2024، مدفوعاً بالتوترات الجيوسياسية والمنافسة بين القوى الاقتصادية الكبرى، مما أثر على سلاسل التوريد وثقة المستثمرين.
          </p>
          <p>
            دفعت معدلات التضخم المرتفعة البنوك المركزية إلى رفع أسعار الفائدة بقوة، مما أدى إلى تقلبات دراماتيكية في أسواق الأسهم والسندات بينما يحاول المستثمرون التنقل في هذا المشهد المعقد.
          </p>
        </div>
      ),
    },
    {
      id: 'stock-exchanges',
      title: 'أكبر البورصات العالمية',
      subtitle: 'Largest Stock Exchanges',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد الولايات المتحدة موطناً لأكبر بورصتين في العالم: NYSE و NASDAQ في نيويورك. تتجاوز القيمة السوقية المجمعة للشركات المدرجة فيهما 53 تريليون دولار.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
            <div className="p-8 bg-violet-50 rounded-2xl border border-violet-100 flex flex-col items-center shrink-0 w-full md:w-64 text-center">
               <ArrowUpRight size={40} className="text-violet-600 mb-4" />
               <p className="text-3xl font-black text-violet-900">$53T+</p>
               <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">قيمة NYSE و NASDAQ معاً</p>
            </div>
            <div className="flex-1 space-y-4">
              <p>
                هذه القيمة تتجاوز مجموع أكبر ثمانية مشغلي أسواق أسهم تالين في القائمة، مما يؤكد الهيمنة الأمريكية المطلقة على أسواق رأس المال، تليها بورصة يورونكست وخمس بورصات آسيوية كبرى.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'أداء الأصول: الأسهم مقابل السندات',
      subtitle: 'Equities vs Bonds',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            تفوقت الأسهم على السندات في الأداء الاستثماري على مدار العشرين عاماً الماضية، رغم المخاطر المرتفعة المرتبطة بها.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <PieChart className="text-violet-400 mb-3" size={24} />
              <p className="font-bold text-white">الأسهم (Equities)</p>
              <p className="text-xs text-slate-400">تمثل ملكية جزء من الشركة؛ تحقق عوائد أعلى ولكنها تتسم بتقلبات سعرية كبيرة.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <ShieldCheck className="text-violet-400 mb-3" size={24} />
              <p className="font-bold text-white">السندات (Bonds)</p>
              <p className="text-xs text-slate-400">استثمار منخفض المخاطر بأسعار ثابتة؛ تأثرت مؤخراً بقرارات أسعار الفائدة عالمياً.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'esg',
      title: 'نمو الاستثمار المستدام ESG',
      subtitle: 'ESG Investing Trends',
      content: (
        <div className="space-y-6 text-right">
          <p>
            يعكس الاستثمار البيئي والاجتماعي والحوكمة (ESG) التأثير الإجمالي للاستثمار. يدفع نمو هذا القطاع عاملان: القلق من أزمة المناخ وتغير المواقف تجاه القضايا الاجتماعية.
          </p>
          <div className="flex items-start gap-5 p-6 bg-violet-50 rounded-2xl border border-violet-200">
             <Globe className="text-violet-700 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-slate-900 leading-tight">تخصيص الصناديق المتداولة (ETFs)</p>
                <p className="text-sm text-slate-700 leading-relaxed mt-2">
                  يخطط غالبية المستثمرين المحترفين في الولايات المتحدة وأوروبا والصين لزيادة حصة صناديق الاستثمار المتداولة التي تلتزم بمعايير ESG في محافظهم الاستثمارية خلال عام 2024.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'crypto',
      title: 'سوق العملات المشفرة والابتكار',
      subtitle: 'Cryptocurrency Market',
      content: (
        <div className="space-y-6 text-right">
          <p>
            بعد عام 2023 الصعب الذي شهد انهيار بعض الأصول الرقمية البارزة، عاد سوق العملات المشفرة للنمو لتبلغ قيمته الإجمالية 2.74 تريليون دولار في 2024.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
             {[
               { label: 'بيتكوين (BTC)', desc: 'الأصل الرقمي الأكبر' },
               { label: 'إيثيريوم (ETH)', desc: 'منصة العقود الذكية' },
               { label: 'Blockchain', desc: 'التقنية الموزعة الأساسية' },
               { label: 'Stablecoin', desc: 'العملات المرتبطة بالدولار' },
             ].map((item, idx) => (
               <div key={idx} className="p-4 border border-slate-100 rounded-xl hover:bg-violet-50 transition-colors">
                  <Coins size={20} className="text-violet-600 mb-2" />
                  <p className="font-bold text-slate-800 text-sm">{item.label}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'BlackRock', country: 'United States', note: 'أكبر مدير أصول في العالم وبطل صناديق الاستثمار المتداولة ETFs' },
    { name: 'NYSE & NASDAQ', country: 'United States', note: 'تستضيف أكبر أحجام تداول وقيمة سوقية للأسهم عالمياً' },
    { name: 'Shenzhen Stock Exchange', country: 'China', note: 'ثالث أكبر بورصة في العالم من حيث حجم التداول الإلكتروني' },
    { name: 'Vanguard Group', country: 'United States', note: 'رائد في استثمارات الصناديق المشتركة ومنخفضة التكلفة' },
    { name: 'London Stock Exchange', country: 'United Kingdom', note: 'المركز التاريخي والمالي الأهم في القارة الأوروبية' },
  ],

  definition: `تعد الأدوات المالية والاستثمارات وسيلة للتخصيص الفعال للموارد النقدية في الاقتصاد. تتيح هذه الأدوات (مثل الأسهم والسندات والعملات والمشتقات) لأصحاب الفوائض المالية تمويل الشركات والأفراد مقابل عوائد متوقعة.`,

  industryInsights: [
    'NYSE و NASDAQ يمثلان وحدهما أكثر من 53 تريليون دولار من القيمة السوقية العالمية',
    'الأسهم تفوقت تاريخياً على السندات كعائد حقيقي رغم التقلبات الحادة',
    'الاستثمار المستدام (ESG) لم يعد خياراً ثانوياً بل أصبح جزءاً أصيلاً من استراتيجية كبار المستثمرين',
    'سوق العملات المشفرة يستعيد زخمه بقيمة إجمالية تقارب 2.74 تريليون دولار في 2024',
  ],

  tags: ['Stocks', 'Bonds', 'Crypto', 'ESG', 'Asset Management', 'S&P 500', 'Financial Instruments', 'Capital Markets'],
};

const InvestmentsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default InvestmentsDashboard;
