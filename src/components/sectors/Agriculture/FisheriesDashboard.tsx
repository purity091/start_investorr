import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, LineChart, Line, Legend, Cell, PieChart, Pie
} from 'recharts';
import { 
  Waves, 
  Anchor, 
  Fish, 
  TrendingUp, 
  Globe, 
  AlertCircle,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Maximize2,
  Box,
  Compass
} from 'lucide-react';
import { fisheriesService, GlobalFishProduction, MarketSegment, RegionalProduction } from '../services/fisheriesService';
import { escapeReportHtml, slugifyReportName } from '../../../utils/reportDownloads';
import { exportElementToPdf } from '../../../utils/pdfExport';

const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-2xl text-right">
        <p className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-end gap-3 mt-1">
            <span className="text-white font-black text-sm">{entry.value.toLocaleString()}</span>
            <span className="text-xs font-bold" style={{ color: entry.color || entry.fill }}>{entry.name}</span>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const FisheriesDashboard: React.FC<any> = (props) => {
  const [productionData, setProductionData] = useState<GlobalFishProduction[]>([]);
  const [segmentData, setSegmentData] = useState<MarketSegment[]>([]);
  const [regionalData, setRegionalData] = useState<RegionalProduction[]>([]);
  const [activeNav, setActiveNav] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prod, seg, reg] = await Promise.all([
          fisheriesService.fetchGlobalProduction(),
          fisheriesService.fetchMarketSegments(),
          fisheriesService.fetchRegionalProduction()
        ]);
        setProductionData(prod);
        setSegmentData(seg);
        setRegionalData(reg);
      } catch (error) {
        console.error("Error loading fisheries data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDownloadReport = async () => {
    setIsDownloading(true);

    const generatedAt = new Intl.DateTimeFormat('ar', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date());

    const productionRows = productionData
      .slice(-8)
      .map(
        (item) =>
          `<tr><td>${escapeReportHtml(String(item.year))}</td><td>${escapeReportHtml(String(item.volume))}</td></tr>`,
      )
      .join('');

    const segmentRows = segmentData
      .slice(-6)
      .map(
        (item) =>
          `<tr><td>${escapeReportHtml(String(item.year))}</td><td>${escapeReportHtml(String(item.fishing))}</td><td>${escapeReportHtml(String(item.aquaculture))}</td></tr>`,
      )
      .join('');

    const regionalRows = regionalData
      .slice(0, 10)
      .map(
        (item) =>
          `<tr><td>${escapeReportHtml(item.name)}</td><td>${escapeReportHtml(String(item.value))}</td></tr>`,
      )
      .join('');

    const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>تقرير مصايد الأسماك وتربية الأحياء المائية</title>
  <style>
    body { margin: 0; padding: 32px; font-family: "IBM Plex Sans Arabic", "Tajawal", sans-serif; background: #f8fafc; color: #0f172a; }
    .shell { max-width: 1120px; margin: 0 auto; display: grid; gap: 20px; }
    .panel { background: #fff; border: 1px solid #e2e8f0; border-radius: 28px; padding: 28px; }
    .hero { background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%); }
    .badge { display: inline-block; border: 1px solid #cbd5e1; border-radius: 999px; padding: 8px 14px; font-size: 12px; color: #475569; background: #fff; }
    h1 { margin: 14px 0 8px; font-size: 38px; }
    p { margin: 0; color: #475569; line-height: 1.9; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
    .metric { border: 1px solid #e2e8f0; border-radius: 20px; padding: 18px; background: #fff; }
    .metric strong { display: block; font-size: 28px; margin-top: 8px; }
    ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 12px; }
    li { border: 1px solid #e2e8f0; border-radius: 16px; padding: 14px 16px; background: #fff; line-height: 1.8; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border-bottom: 1px solid #e2e8f0; padding: 12px 10px; text-align: right; }
    th { font-size: 12px; color: #64748b; }
    @media (max-width: 900px) { .grid-3 { grid-template-columns: 1fr; } h1 { font-size: 30px; } }
  </style>
</head>
<body>
  <div class="shell">
    <section class="panel hero">
      <span class="badge">تقرير سوقي جاهز للمشاركة • ${escapeReportHtml(generatedAt)}</span>
      <h1>مصايد الأسماك وتربية الأحياء المائية</h1>
      <p>تقرير تنفيذي مبني على بيانات لوحة القطاع الحالية، ويصلح للمراجعة الداخلية أو لمشاركة سريعة مع شريك أو مستثمر.</p>
    </section>
    <section class="grid-3">
      <div class="metric"><span>الإنتاج السمكي العالمي</span><strong>184.6M</strong><p>طن متري</p></div>
      <div class="metric"><span>الدولة الرائدة</span><strong>الصين</strong><p>المرتبة الأولى عالمياً</p></div>
      <div class="metric"><span>العاملون في القطاع</span><strong>58.5M</strong><p>صياد ومزارع</p></div>
    </section>
    <section class="panel">
      <h2 style="margin:0 0 16px;font-size:24px;">خلاصات تنفيذية</h2>
      <ul>
        <li>الإنتاج السمكي العالمي يواصل النمو مدفوعاً بارتفاع الطلب على البروتين البحري.</li>
        <li>الاستزراع المائي تجاوز الصيد التقليدي كخيار أكثر استدامة للنمو.</li>
        <li>الصين ما تزال اللاعب الأكثر تأثيراً في الطاقة الإنتاجية والبنية التحتية للقطاع.</li>
      </ul>
    </section>
    <section class="panel">
      <h2 style="margin:0 0 16px;font-size:24px;">الإنتاج العالمي الأخير</h2>
      <table>
        <thead><tr><th>السنة</th><th>الإنتاج</th></tr></thead>
        <tbody>${productionRows}</tbody>
      </table>
    </section>
    <section class="panel">
      <h2 style="margin:0 0 16px;font-size:24px;">الصيد مقابل الاستزراع</h2>
      <table>
        <thead><tr><th>السنة</th><th>الصيد</th><th>الاستزراع</th></tr></thead>
        <tbody>${segmentRows}</tbody>
      </table>
    </section>
    <section class="panel">
      <h2 style="margin:0 0 16px;font-size:24px;">أكبر الدول المنتجة</h2>
      <table>
        <thead><tr><th>الدولة</th><th>القيمة</th></tr></thead>
        <tbody>${regionalRows}</tbody>
      </table>
    </section>
  </div>
</body>
</html>`;

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-99999px';
    container.style.top = '0';
    container.style.width = '1240px';
    container.style.background = '#ffffff';
    container.innerHTML = html;
    document.body.appendChild(container);

    try {
      await exportElementToPdf({
        element: container,
        fileName: `${
          slugifyReportName(`fisheries-report-${new Date().toISOString().slice(0, 10)}`) || 'fisheries-report'
        }.pdf`,
      });
    } finally {
      container.remove();
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[600px] items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-sky-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-sky-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-8 font-['Inter',sans-serif] text-right" dir="rtl">
      {/* Top Header Section */}
      <header className="mb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-sky-600 rounded-2xl shadow-lg shadow-sky-100 flex items-center justify-center text-white">
                <Waves size={28} />
              </div>
              <h1 className="text-4xl lg:text-5xl font-[900] text-slate-900 tracking-tight">
                مصايد الأسماك وتربية الأحياء المائية
              </h1>
            </div>
            <p className="text-slate-500 font-bold text-lg mr-14">تحليل شامل لحجم السوق، الإنتاج العالمي، والتوجهات الإستراتيجية</p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-3xl shadow-sm border border-slate-100">
            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm transition-all hover:bg-sky-600"
            >
              <Download size={18} />
              <span>{isDownloading ? 'جاري تجهيز التقرير...' : 'تحميل التقرير'}</span>
            </button>
            <button className="p-3 text-slate-400 hover:text-sky-600 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'الإنتاج السمكي العالمي', value: '184.6M', unit: 'طن متري', icon: Fish, color: 'text-sky-600', bg: 'bg-sky-50' },
            { label: 'المنتج الرائد للأسماك', value: 'الصين', unit: 'المرتبة الأولى', icon: Globe, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'العاملون في القطاع', value: '58.5M', unit: 'صياد ومزارع', icon: Anchor, color: 'text-emerald-600', bg: 'bg-emerald-50' }
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 ${kpi.bg} ${kpi.color} rounded-2xl group-hover:scale-110 transition-transform`}>
                  <kpi.icon size={28} />
                </div>
                <ArrowUpRight className="text-slate-200 group-hover:text-sky-500 transition-colors" size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-black text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900 tracking-tight">{kpi.value}</span>
                  <span className="text-sm font-bold text-slate-500">{kpi.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar border-b border-slate-100">
        {[
          { id: 'overview', label: 'نظرة عامة', icon: Box },
          { id: 'insights', label: 'رؤى الصناعة', icon: TrendingUp },
          { id: 'segments', label: 'قطاعات السوق', icon: Filter },
          { id: 'regional', label: 'التحليل الإقليمي', icon: Globe }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveNav(tab.id)}
            className={`
              flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-500 text-sm font-bold whitespace-nowrap
              ${activeNav === tab.id 
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-200 scale-105' 
                : 'text-slate-500 hover:bg-white hover:text-sky-600'}
            `}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {activeNav === 'overview' && (
          <>
            {/* Grid of Key Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 1. Global Fish Production Chart */}
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="flex flex-col gap-2 mb-8 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">الإنتاج السمكي العالمي (2002-2025)</h2>
                    <div className="w-1.5 h-8 bg-sky-500 rounded-full"></div>
                  </div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Total global fish production (million metric tons)</p>
                </div>
                
                <div className="h-[350px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={productionData}>
                      <defs>
                        <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} dx={-10} />
                      <Tooltip content={<CustomChartTooltip />} />
                      <Area type="monotone" dataKey="volume" name="الإنتاج" stroke="#0ea5e9" strokeWidth={4} fillOpacity={1} fill="url(#colorProd)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-50">
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">وصل الإنتاج العالمي المقدر إلى 186.6 مليون طن متري بحلول عام 2023، مع نمو مستمر مدفوع بالطلب المتزايد على البروتين البحري.</p>
                </div>
              </div>

              {/* 2. Fishing vs Aquaculture Crossover Chart */}
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="flex flex-col gap-2 mb-8 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">الصيد التقليدي مقابل الاستزراع المائي</h2>
                    <div className="w-1.5 h-8 bg-indigo-500 rounded-full"></div>
                  </div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Wild Capture vs Aquaculture Production (Million Metric Tons)</p>
                </div>
                
                <div className="h-[350px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={segmentData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} dx={-10} />
                      <Tooltip content={<CustomChartTooltip />} />
                      <Legend verticalAlign="top" align="left" wrapperStyle={{paddingBottom: 20}} />
                      <Line type="monotone" dataKey="fishing" name="صيد طبيعي" stroke="#6366f1" strokeWidth={3} dot={{r: 4}} activeDot={{r: 8}} />
                      <Line type="monotone" dataKey="aquaculture" name="استزراع مائي" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 8}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-50">
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">في عام 2022، وصل إنتاج الاستزراع المائي إلى 96 مليون طن متري، متجاوزاً الصيد الطبيعي لأول مرة في التاريخ كخيار أكثر استدامة.</p>
                </div>
              </div>

              {/* 3. Top 10 Fishing Nations */}
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="flex flex-col gap-2 mb-8 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">أكبر 10 دول منتجة للأسماك (2021)</h2>
                    <div className="w-1.5 h-8 bg-emerald-500 rounded-full"></div>
                  </div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Top 10 Fishing Nations (Capture in Million Metric Tons)</p>
                </div>
                
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={regionalData} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#1e293b', fontSize: 10, fontWeight: 800}} orientation="right" width={100} />
                      <Tooltip content={<CustomChartTooltip />} />
                      <Bar dataKey="value" fill="#38bdf8" radius={[0, 8, 8, 0]} barSize={20} name="الإنتاج">
                        {regionalData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#0c4a6e' : '#38bdf8'} fillOpacity={1 - index * 0.08} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-50">
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">تتصدر الصين كعملاق عالمي بإنتاج يتجاوز 13.4 مليون طن متري، وهو ضعف إنتاج إندونيسيا التي تأتي في المرتبة الثانية.</p>
                </div>
              </div>

              {/* 4. Industry Insights Card */}
              <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-6 flex items-center gap-3 justify-end text-sky-400 text-right">
                    رؤية السوق الصينية
                    <Globe size={24} />
                  </h3>
                  <div className="space-y-6 text-right">
                    <p className="text-slate-300 font-medium leading-loose text-sm">تعتبر الصين القوة الضاربة في هذا القطاع، حيث لا يقتصر تفوقها على الصيد البحري فقط، بل تمتلك أضخم بنية تحتية للاستزراع المائي في العالم.</p>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="bg-white/5 p-4 rounded-3xl border border-white/10">
                        <p className="text-xs font-bold text-slate-400 mb-1">حصة آسيا</p>
                        <p className="text-xl font-black text-white">6 من 10</p>
                        <p className="text-[10px] text-sky-400">أكبر منتجين عالمياً</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-3xl border border-white/10">
                        <p className="text-xs font-bold text-slate-400 mb-1">النمو السنوي</p>
                        <p className="text-xl font-black text-white">+30M</p>
                        <p className="text-[10px] text-emerald-400">طن في العقد الأخير</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Footer Insights */}
            <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm text-right">
                <h2 className="text-3xl font-black text-slate-900 mb-8 border-r-8 border-sky-500 pr-6 uppercase tracking-tighter">الاستدامة والأمن الغذائي</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-medium text-slate-600 leading-loose text-lg">
                    <div className="space-y-6">
                        <p>تعتبر مصايد الأسماك وتربية الأحياء المائية ركيزة أساسية لتغذية سكان العالم الآخذين في الازدياد، لكن المخاوف بشأن الاستدامة أصبحت تشكل مستقبل هذا القطاع.</p>
                        <p>يهدد الصيد الجائر سبل عيش مئات الملايين من الناس، وتعتبر منطقة بحر الصين الجنوبي مثالاً صارخاً على المناطق المهددة بانهيار المخزون السمكي.</p>
                    </div>
                    <div className="space-y-6 p-8 bg-slate-50 rounded-[3rem] border border-slate-100 italic">
                        "ينظر إلى الاستزراع المائي بشكل متزايد كبديل أكثر استدامة يمكن أن يساعد في تأمين الإمدادات الغذائية لسكان العالم المتزايدين، خاصة في القارة الآسيوية."
                    </div>
                </div>
            </div>
          </>
        )}

        {/* Other tabs placeholders for future roadmap */}
        {activeNav === 'insights' && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {['صناعة الأسماك في كندا', 'صناعة الأسماك في اليابان', 'سوق السلمون العالمي', 'الصيد البحري في إندونيسيا', 'تربية الأحياء المائية في فيتنام', 'سوق المأكولات البحرية في المملكة المتحدة'].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-sky-500 transition-all group cursor-pointer text-right">
                  <div className="flex justify-between items-center mb-6">
                     <div className="bg-sky-50 p-3 rounded-2xl text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all">
                        <Compass size={24} />
                     </div>
                     <ArrowUpRight size={20} className="text-slate-300 group-hover:text-sky-500 transition-all" />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">{item}</h3>
                  <p className="text-slate-500 text-sm font-medium">دراسة مكثفة حول اتجاهات السوق، القوانين المحلية، والعائد المادي لهذا القطاع.</p>
                </div>
             ))}
           </div>
        )}

        {/* Global Definition Section */}
        <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm text-right">
            <h2 className="text-3xl font-black text-slate-900 mb-8 border-r-8 border-sky-600 pr-6">تعريف الصناعة ونطاق العمل</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-medium text-slate-600 leading-loose text-lg">
                <div className="space-y-4">
                    <p>تقدم فئة مصايد الأسماك وتربية الأحياء المائية بيانات عن الأعمال التجارية لتربية وحصاد الأسماك والحيوانات المائية الأخرى.</p>
                    <p>يتضمن الصيد التجاري حصاد الأسماك البرية من المسطحات المائية المفتوحة.</p>
                </div>
                <div className="space-y-4">
                    <p>في المقابل، فإن الاستزراع المائي هو زراعة وحصاد المجموعات المائية في ظروف خاضعة للرقابة للاستهلاك البشري.</p>
                    <p>تغطي البيانات المقدمة معلومات حول عمليات الصيد، قيم الإنتاج، إيرادات الصناعة، والمنتجات النهائية.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FisheriesDashboard;
