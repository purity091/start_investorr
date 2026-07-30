
import React, { useState, useEffect, useMemo, memo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import {
  LayoutGrid,
  TrendingUp,
  Globe,
  Award,
  DollarSign,
  Info,
  ChevronLeft,
  Search,
  ArrowRight,
  ExternalLink,
  Zap,
  Target,
  Maximize2,
  Filter,
  Download
} from 'lucide-react';
import {
  fetchBrandsData,
  fetchAgenciesData,
  fetchAdvertisersData,
  fetchQuickFacts,
  BrandValue,
  AgencyNetwork,
  AdvertiserSpend,
  QuickFact
} from '../../../services/brandsService';

// --- Reusable Components ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md border border-slate-100 p-4 shadow-2xl rounded-2xl animate-in zoom-in-95 duration-200">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-center gap-3">
          <div className="text-xl font-black text-slate-900">
            {payload[0].value.toLocaleString()}
          </div>
          <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-lg">
            {payload[0].name === 'spend' || payload[0].name === 'value' ? '$B' : 'Points'}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const SectionHeader = ({ title, subtitle, id }: { title: string; subtitle?: string; id?: string }) => (
  <div id={id} className="mb-8 scroll-mt-24">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-1 bg-primary-600 rounded-full"></div>
      <h3 className="text-[11px] font-black text-primary-600 uppercase tracking-[0.3em]">{title}</h3>
    </div>
    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">{subtitle}</h2>
  </div>
);

const InfoCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white border border-slate-100/80 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group ${className}`}>
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-3xl"></div>
    <div className="relative z-10">{children}</div>
  </div>
);

// --- Main Dashboard Component ---

const BrandsDashboard: React.FC = memo(() => {
  const [brandsData, setBrandsData] = useState<BrandValue[]>([]);
  const [agenciesData, setAgenciesData] = useState<AgencyNetwork[]>([]);
  const [advertisersData, setAdvertisersData] = useState<AdvertiserSpend[]>([]);
  const [quickFacts, setQuickFacts] = useState<QuickFact[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState('overview');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [brands, agencies, advertisers, facts] = await Promise.all([
          fetchBrandsData(),
          fetchAgenciesData(),
          fetchAdvertisersData(),
          fetchQuickFacts()
        ]);
        setBrandsData(brands);
        setAgenciesData(agencies);
        setAdvertisersData(advertisers);
        setQuickFacts(facts);
      } catch (error) {
        console.error("Error loading brands data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const navItems = [
    { id: 'overview', label: 'نظرة عامة', icon: LayoutGrid },
    { id: 'insights', label: 'رؤى الصناعة', icon: Zap },
    { id: 'advertisers', label: 'كبار المعلنين', icon: Target },
    { id: 'agencies', label: 'تصنيف الوكالات', icon: Award },
    { id: 'brand-value', icon: DollarSign, label: 'قيمة العلامة' },
    { id: 'definition', label: 'تعريف الصناعة', icon: Info }
  ];

  const scrollTo = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] gap-4">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <p className="font-black text-slate-400 animate-pulse">جاري تحليل بيانات العباقرة والرواد...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-24 rtl animate-in fade-in duration-700">
      
      {/* 1. Header & Quick Facts Area */}
      <section id="overview" className="relative pt-8 pb-12 sm:pt-12 sm:pb-20 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-50/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4"></div>
        </div>

        <div className="max-w-4xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-primary-600 text-white text-[10px] font-black rounded-full shadow-lg shadow-primary-200 uppercase tracking-widest">
              الرواد والعلامات
            </span>
            <div className="h-px w-12 bg-slate-200"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              تقرير 2025
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-none mb-8">
            Brands & <span className="text-primary-600">Leaders</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed max-w-3xl">
            صناعة الإعلانات والتسويق هي تنين متعدد الرؤوس. الرأس الأول هو <span className="text-slate-900 font-black">Procter & Gamble</span>، أكبر معلن في العالم. 
            وتعتبر <span className="text-slate-900 font-black">Apple</span> - العلامة التجارية الأكثر قيمة عالمياً - رأساً آخر. 
            أما الرأس الثالث فيتمثل في <span className="text-slate-900 font-black">الولايات المتحدة</span>، كونها السوق الإعلاني الأكثر إبداعاً عالمياً. 
            ومع ذلك، بما أن التسويق والإعلان صناعات سريعة الخطى، فإن هذه الرؤوس قد تتبدل في أي وقت.
          </p>
        </div>

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {quickFacts.map((fact, i) => (
            <div key={i} className="group relative">
               <div className="absolute inset-0 bg-primary-600 rounded-[2.5rem] rotate-1 group-hover:rotate-0 transition-transform duration-500 opacity-5"></div>
               <div className="relative bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 hover:translate-y-[-8px] transition-all duration-500">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{fact.title === "Largest advertiser worldwide" ? "أكبر معلن عالمياً" : fact.title === "Most valuable brand worldwide" ? "أغلى علامة تجارية" : "أكثر الأسواق إبداعاً"}</p>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">{fact.value === "Procter & Gamble" ? "بروكتر آند جامبل" : fact.value === "Apple" ? "آبل" : "الولايات المتحدة"}</h4>
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                      {i === 0 ? <TrendingUp size={24} /> : i === 1 ? <DollarSign size={24} /> : <Globe size={24} />}
                    </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Sticky Navigation Bar */}
      <div className="sticky top-20 z-40 px-2 sm:px-0">
        <div className="max-w-max mx-auto bg-white/80 backdrop-blur-2xl border border-slate-100 rounded-full p-1.5 shadow-2xl shadow-slate-200/50 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-black whitespace-nowrap transition-all duration-500 ${activeNav === item.id ? 'bg-primary-600 text-white shadow-xl shadow-primary-200' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <item.icon size={14} strokeWidth={2.5} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Industry Insights Section */}
      <section id="insights" className="scroll-mt-32">
        <SectionHeader title="رؤى الصناعة" subtitle="Brand Insights & Categories" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'قيمة العلامة', 'العلامات على التواصل الاجتماعي', 'علامات المشروبات', 'علامات الوجبات السريعة',
            'علامات التجزئة في أمريكا', 'وكالات الإعلان الأمريكية', 'علامات السيارات', 'علامات التجميل والمؤثرين'
          ].map((topic, i) => (
            <button key={i} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/10 transition-all duration-500 group">
              <span className="font-bold text-slate-700 group-hover:text-primary-600 transition-colors uppercase tracking-tight text-[13px]">{topic}</span>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all">
                <ArrowRight size={14} className="rotate-180" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Largest Advertisers Section */}
      <section id="advertisers" className="scroll-mt-32">
        <SectionHeader title="أكبر المعلنين" subtitle="Leading advertisers worldwide in 2023" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <InfoCard>
            <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
              الإنفاق الإعلاني بمليارات الدولارات الأمريكية
            </h3>
            <div className="h-[400px] w-full rtl-charts">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={advertisersData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  barSize={20}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 800, fill: '#64748B' }}
                    width={90}
                    textAnchor="start"
                    dx={-85}
                  />
                  <Tooltip cursor={{ fill: '#F8FAFC' }} content={<CustomTooltip />} />
                  <Bar dataKey="spend" radius={[0, 4, 4, 0]}>
                    {advertisersData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#0F172A' : '#3B82F6'} />
                    ))}
                    <LabelList 
                      dataKey="spend" 
                      position="right" 
                      style={{ fontSize: 10, fontWeight: 900, fill: '#64748B' }}
                      formatter={(val: any) => `$${val}B`}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">المصدر: Statista Research</p>
              <button className="text-[10px] font-black text-primary-600 flex items-center gap-1 hover:gap-2 transition-all">
                مشاهدة الإحصائية الأصلية <ArrowRight size={12} className="rotate-180" />
              </button>
            </div>
          </InfoCard>

          <div className="space-y-6">
            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
              <h4 className="text-xl font-black mb-4 relative z-10">تحليل كبار المنفقين</h4>
              <p className="text-slate-300 leading-relaxed font-medium">
                يمكن أن يمثل الإنفاق الإعلاني جزءاً كبيراً من نفقات الشركة، وغالباً ما يأتي أكبر المعلنين من قطاع السلع النهائية، حيث يسوقون الأطعمة أو المشروبات أو مستحضرات التجميل للمستهلكين النهائيين. 
                يذهب لقب أكبر معلن عالمي إلى <span className="text-white font-black">Procter & Gamble</span> - وهو عملاق عالمي يمتلك العديد من العلامات التجارية للعناية الشخصية والمنزلية. 
                لو كانت هذه الشركة دولة، لكانت المركز الرابع عشر كأكبر سوق إعلاني في العالم، متفوقة على لاعبين رئيسيين مثل روسيا أو إسبانيا.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-3xl hover:border-primary-500 transition-all group">
                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600">
                  <Maximize2 size={18} />
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">تعمق أكثر</p>
                  <p className="text-[12px] font-black text-slate-900">أكبر معلني العرض في أمريكا</p>
                </div>
              </button>
              <button className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-3xl hover:border-primary-500 transition-all group">
                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600">
                  <TrendingUp size={18} />
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">اتجاهات</p>
                  <p className="text-[12px] font-black text-slate-900">أسرع المعلنين نمواً</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Agency Rankings Section */}
      <section id="agencies" className="scroll-mt-32">
        <SectionHeader title="تصنيف الوكالات" subtitle="Most creative agency networks worldwide in 2025" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 lg:order-1 text-right">
            <h3 className="text-2xl font-black text-slate-900 leading-tight">تكريم التميز والابتكار</h3>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              يمكن تصنيف الوكالات باستخدام العديد من المقاييس - رسوم الدخل، الإبداع، الفعالية، أو عدد الاستحواذات، على سبيل المثال لا الحصر. 
              الإبداع هو المقياس الذي ينتج أكبر قدر من الضجيج. في عام 2023، تم اختيار حملة 'HP Streetcode' لشركة Hewlett Packard، التي طورتها Edelman، كأكثر حملة إبداعية في العالم. في جوهرها، عالجت الفجوة الرقمية الموجودة في إندونيسيا من خلال فن الشوارع.
            </p>
            <div className="flex flex-wrap gap-2 justify-end">
              {['PR Campaigns', 'Ad Agencies', 'Media Holdings'].map((tag, i) => (
                <span key={i} className="px-5 py-2 bg-slate-100 text-slate-600 rounded-full text-[11px] font-black uppercase tracking-wider">{tag}</span>
              ))}
            </div>
          </div>

          <InfoCard className="order-1 lg:order-2">
            <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              نقاط التقييم القائمة على الإبداع (Index Score)
            </h3>
            <div className="h-[400px] w-full rtl-charts">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                   data={agenciesData}
                   layout="vertical"
                   margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                   barSize={18}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 800, fill: '#64748B' }} 
                    width={110}
                    textAnchor="start"
                    dx={-105}
                  />
                  <Tooltip cursor={{ fill: '#F8FAFC' }} content={<CustomTooltip />} />
                  <Bar dataKey="points" radius={[0, 4, 4, 0]}>
                    {agenciesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#4F46E5' : '#818CF8'} />
                    ))}
                    <LabelList 
                      dataKey="points" 
                      position="right" 
                      style={{ fontSize: 10, fontWeight: 900, fill: '#64748B' }}
                      formatter={(val: any) => val.toLocaleString()}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </InfoCard>
        </div>
      </section>

      {/* 6. Brand Value Section */}
      <section id="brand-value" className="scroll-mt-32">
        <SectionHeader title="قيمة العلامة" subtitle="Leading brands worldwide in 2025, by brand value" />
        <div className="bg-slate-50 rounded-[3rem] p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                 <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50">
                    <h4 className="text-sm font-black text-slate-900 mb-8 uppercase tracking-widest text-center">أغلى 10 علامات تجارية في العالم ($B)</h4>
                    <div className="h-[500px] w-full rtl-charts">
                       <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={brandsData} 
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                             <XAxis 
                               dataKey="name" 
                               axisLine={false} 
                               tickLine={false} 
                               tick={{ fontSize: 10, fontWeight: 800, fill: '#94A3B8' }} 
                             />
                             <YAxis hide />
                             <Tooltip cursor={{ fill: '#F8FAFC' }} content={<CustomTooltip />} />
                             <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                                {brandsData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={index < 3 ? '#F59E0B' : '#E2E8F0'} />
                                ))}
                                <LabelList dataKey="value" position="top" style={{ fontSize: 11, fontWeight: 900, fill: '#0F172A' }} formatter={(val: any) => `$${val}`} />
                             </Bar>
                          </BarChart>
                       </ResponsiveContainer>
                    </div>
                 </div>
              </div>
              <div className="lg:col-span-4 flex flex-col justify-center gap-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">هيمنة قطاع التكنولوجيا</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      تتمتع العلامات التجارية ذات القيمة العالية بتقدير كبير، مما يسهل تسويق منتجاتها وبناء ولاء العملاء. على المستوى العالمي، احتلت العلامات التكنولوجية مثل <span className="text-primary-600 font-black">Apple وGoogle وMicrosoft</span> المراكز الأولى في تصنيفات قيمة العلامات التجارية لفترة طويلة.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                      <span className="text-[12px] font-black text-slate-700">المملكة المتحدة</span>
                      <span className="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black rounded-lg uppercase">Vodafone</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                      <span className="text-[12px] font-black text-slate-700">البرازيل</span>
                      <span className="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black rounded-lg uppercase">Itaú</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                      <span className="text-[12px] font-black text-slate-700">اليابان</span>
                      <span className="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black rounded-lg uppercase">Toyota</span>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </section>

      {/* 7. Industry Definition Section */}
      <section id="definition" className="scroll-mt-32">
        <div className="bg-gradient-to-br from-primary-600 to-indigo-700 rounded-[3rem] p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute -top-24 -left-24 w-96 h-96 border-[40px] border-white rounded-full"></div>
             <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] bg-white rounded-full blur-[100px]"></div>
          </div>
          
          <div className="max-w-3xl relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-8">تعريف الصناعة: Brands & Leaders</h2>
            <div className="space-y-6 text-primary-50 font-medium text-lg leading-relaxed">
              <p>
                تعرض فئة "Brands and Leaders" الأفضل والأكبر والأكثر قيمة في صناعة الإعلانات والتسويق. بدءاً من الإنفاق الإعلاني وإيرادات الإعلانات وصولاً إلى تصنيفات كبار المعلنين والحيازات الإعلامية، يمكن العثور هنا على بيانات حول جميع الأسماء المهمة في مجال الإعلان.
              </p>
              <p>
                بالإضافة إلى ذلك، يقدم هذا القسم تصنيفات إبداعية للوكالات والمسوقين الداخليين والحملات الفردية لمختلف القطاعات الفرعية للتسويق. تكمل قيم العلامات التجارية وتصنيفات قيم العلامات لمناطق وصناعات متعددة الصورة الكاملة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-12 border-t border-slate-100 flex flex-col items-center text-center gap-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">هل تحتاج لمزيد من التفاصيل؟</p>
          <h2 className="text-3xl font-black text-slate-900">نحن هنا لمساعدتكم في فهم المشهد الاستراتيجي</h2>
          <button className="px-10 py-5 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-primary-600 hover:shadow-2xl hover:shadow-primary-300 transition-all duration-500 flex items-center gap-3">
             تواصل معنا الآن <ArrowRight size={20} className="rotate-180" />
          </button>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .rtl-charts .recharts-cartesian-axis-tick-value {
          direction: ltr;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

    </div>
  );
});

BrandsDashboard.displayName = 'BrandsDashboard';

export default BrandsDashboard;
