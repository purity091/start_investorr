import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  type FC,
} from 'react';
import { Download, Rocket, ArrowRight, Layers } from 'lucide-react';
import { SectorDashboardProps } from './types';
import { Button } from '../../../ui/Button';
import { Badge } from '../../../ui/Badge';
import { cn } from '../../../../lib/utils';
import { useAccentVars } from '../../../../hooks/useAccentVars';
import { LightCard, DarkCard, KpiCard } from './SectionCards';
import { OpportunitiesSection } from './BusinessOpportunities';
import { LeadersSection } from './LeadersSection';
import { BottomRow } from './BottomRow';
import { buildNav, buildNavMap } from './NavHelpers';
import { SwotSection } from './SwotSection';
import { fetchPublicJson } from '../../../../lib/publicData';
import './mobile-responsive.css';

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('ar-SA-u-nu-latn', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);

const SectorDashboardTemplate: FC<SectorDashboardProps> = ({
  title,
  subtitle,
  accent,
  accentHex,
  pdfLabel = 'تصدير الدراسة (PDF)',
  kpis,
  sections,
  leaders = [],
  definition,
  industryInsights = [],
  tags = [],
  businessOpportunities: manualOpportunities = [],
  onBack,
  onBuildPlan,
  parentCategory = 'استكشاف قطاعات السوق',
  sectorId,
  swotAnalysis: manualSwot,
}) => {
  useAccentVars(accent, accentHex);

  const reportRef = useRef<HTMLDivElement>(null);
  const [registryOpportunities, setRegistryOpportunities] = useState<any[]>([]);
  const [registrySwot, setRegistrySwot] = useState<any | undefined>(undefined);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const hasManualOpportunities = Boolean(manualOpportunities && manualOpportunities.length > 0);
  const hasManualSwot = Boolean(manualSwot);

  useEffect(() => {
    if (!sectorId) return;

    const fetchSectorData = async () => {
      setIsDataLoading(true);
      try {
        if (!hasManualOpportunities) {
          const oppData = await fetchPublicJson<any[]>(`/data/opportunities/${sectorId}.json`);
          setRegistryOpportunities(oppData);
        }
        
        if (!hasManualSwot) {
          const swotData = await fetchPublicJson<any>(`/data/swot/${sectorId}.json`);
          setRegistrySwot(swotData);
        }
      } catch (err) {
        console.error("Failed to fetch sector data", err);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchSectorData();
  }, [sectorId, hasManualOpportunities, hasManualSwot]);

  const businessOpportunities =
    manualOpportunities && manualOpportunities.length > 0 ? manualOpportunities : registryOpportunities;

  const swot = manualSwot || registrySwot;

  const hasLeaders = leaders.length > 0;
  const hasDefinition = !!definition;
  const hasOpportunities = businessOpportunities.length > 0;
  const hasSwot = !!swot;

  const nav = useMemo(
    () => buildNav(sections, hasLeaders, hasDefinition, hasOpportunities, hasSwot),
    [sections, hasLeaders, hasDefinition, hasOpportunities, hasSwot],
  );

  const navMap = useMemo(
    () => buildNavMap(sections, hasLeaders, hasDefinition, hasOpportunities, hasSwot),
    [sections, hasLeaders, hasDefinition, hasOpportunities, hasSwot],
  );

  const [activeId, setActiveId] = useState<string>(navMap[nav[0]] || '');
  const [isDownloading, setIsDownloading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { root: null, rootMargin: '-20% 0px -60% 0px' }
    );

    // Timeout ensures DOM elements are rendered
    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll('.dashboard-section');
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [navMap, nav]);

  const handleNavClick = (item: string) => {
    const id = navMap[item];
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadReport = useCallback(async () => {
    setIsDownloading(true);

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert('تم نسخ رابط مشاركة لوحة القطاع بنجاح!');
      }
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return (
    <>
      <div
        dir="rtl"
        ref={scrollContainerRef}
        className="relative h-screen min-h-screen overflow-y-auto bg-background font-['IBM_Plex_Sans_Arabic',system-ui,sans-serif]"
      >
        {/* Modern Header Hero */}
        <header className="relative border-b border-border bg-card px-4 py-6 sm:px-6 lg:px-8 shadow-xs">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_500px]">
              <div className="space-y-3 text-right">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary hover:bg-primary/20">
                    <Layers className="size-3.5 ml-1 inline-block text-primary" />
                    دراسة قطاعية • {parentCategory}
                  </Badge>
                </div>

                <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl leading-tight">
                  {title}
                </h1>
                
                <p className="max-w-3xl text-sm font-medium leading-relaxed text-muted-foreground">
                  {subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  {onBuildPlan && (
                    <Button
                      onClick={() => onBuildPlan?.()}
                      size="default"
                      className="h-9 gap-2 rounded-lg px-4 font-semibold text-xs sm:text-sm shadow-xs"
                    >
                      <Rocket className="size-4" />
                      ابدأ بناء مشروعك في هذا القطاع
                    </Button>
                  )}

                  <Button
                    onClick={handleDownloadReport}
                    variant="outline"
                    className="h-9 gap-2 rounded-lg px-3.5 font-semibold text-xs sm:text-sm border-border"
                    disabled={isDownloading}
                  >
                    <Download className="size-4" />
                    {isDownloading ? 'جاري التحضير...' : pdfLabel}
                  </Button>

                  <Button
                    onClick={onBack}
                    variant="ghost"
                    className="h-9 gap-2 rounded-lg px-3.5 font-semibold text-xs sm:text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ArrowRight className="size-4" />
                    العودة للاستكشاف
                  </Button>
                </div>
              </div>

              {/* Top KPIs */}
              <div className="grid grid-cols-2 gap-3 self-center">
                {kpis.slice(0, 4).map((kpi, index) => (
                  <KpiCard key={index} kpi={kpi} />
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Horizontal TOC Pills Bar */}
        <div className="lg:hidden sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-4 py-2 overflow-x-auto scrollbar-none flex gap-2">
          {nav.map((item, idx) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={cn(
                "shrink-0 rounded-md px-3 py-1 text-xs font-semibold transition-all border",
                activeId === navMap[item]
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8 items-start relative">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-60 shrink-0 sticky top-20 self-start">
            <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-border pb-2 px-1">
                <h3 className="font-bold text-xs text-foreground">محتويات القطاع</h3>
                <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md">
                  {nav.length} المحاور
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                {nav.map((item, idx) => {
                  const isActive = activeId === navMap[item];
                  return (
                    <button
                      key={item}
                      onClick={() => handleNavClick(item)}
                      className={cn(
                        "group flex items-center justify-between w-full text-right px-2.5 py-2 rounded-lg text-xs transition-all duration-150 focus:outline-none",
                        isActive
                          ? "bg-primary/10 text-primary font-bold border-r-2 border-primary pr-2" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
                      )}
                    >
                      <span className="truncate">{item}</span>
                      <span className={cn(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 mr-2",
                        isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-background"
                      )}>
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content Area - Ordered logically: Definition -> Detailed Sections -> SWOT -> Opportunities -> Leaders */}
          <main ref={mainRef} className="flex-1 min-w-0 flex flex-col gap-6 pb-24">
            {hasDefinition && (
              <div id="definition" className="dashboard-section scroll-mt-20">
                <BottomRow definition={definition} industryInsights={industryInsights} tags={tags} title={title} />
              </div>
            )}

            {sections.map(section => (
               <div id={section.id} key={section.id} className="dashboard-section scroll-mt-20">
                 {section.variant === 'dark' 
                   ? <DarkCard section={section} /> 
                   : <LightCard section={section} />
                 }
               </div>
            ))}

            {hasLeaders && (
              <div id="leaders" className="dashboard-section scroll-mt-20">
                <LeadersSection leaders={leaders} title={title} />
              </div>
            )}

            {hasSwot && swot && (
              <div id="swot-analysis" className="dashboard-section scroll-mt-20">
                 <SwotSection swot={swot} title={title} />
              </div>
            )}

            {hasOpportunities && (
              <div id="opportunities-section" className="dashboard-section scroll-mt-20">
                <OpportunitiesSection opportunities={businessOpportunities} />
              </div>
            )}
          </main>
        </div>
      </div>

      <div className="fixed left-[-99999px] top-0 z-[-1] w-[1240px] bg-white p-8 text-slate-900" aria-hidden="true">
        <div ref={reportRef} dir="rtl" className="bg-white">
          <section className="rounded-[32px] border border-slate-200 p-8">
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[12px] font-black text-slate-600">
              دراسة قطاعية شاملة • {formatDate(new Date())}
            </span>
            <h1 className="mt-5 text-4xl font-black text-slate-950">{title}</h1>
            <p className="mt-3 text-base font-bold leading-8 text-slate-600">{subtitle}</p>
            <div className="mt-6 grid grid-cols-4 gap-4">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-right">
                  <p className="text-[11px] font-black text-slate-400">{kpi.label}</p>
                  <p className="mt-2 text-3xl font-black text-slate-950">{kpi.value}</p>
                  <p className="mt-2 text-[12px] font-bold text-slate-500">{kpi.unit}</p>
                </div>
              ))}
            </div>
          </section>

          {(definition || tags.length > 0 || industryInsights.length > 0) && (
            <section className="mt-6 rounded-[28px] border border-slate-200 p-6 text-right">
              <h2 className="text-2xl font-black text-slate-950">تعريف القطاع والسياق</h2>
              {definition && <p className="mt-4 text-[14px] leading-8 text-slate-600">{definition}</p>}
              {tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {industryInsights.length > 0 && (
                <div className="mt-5 space-y-3">
                  {industryInsights.map((item, index) => (
                    <div key={`${item}-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-[14px] leading-8 text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {hasSwot && swot && (
            <section className="mt-6 rounded-[28px] border border-slate-200 p-6 text-right">
              <h2 className="text-2xl font-black text-slate-950">تحليل SWOT</h2>
              <p className="mt-4 text-[14px] leading-8 text-slate-600">{swot.description}</p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {[
                  { title: 'نقاط القوة', items: swot.strengths },
                  { title: 'نقاط الضعف', items: swot.weaknesses },
                  { title: 'الفرص', items: swot.opportunities },
                  { title: 'التهديدات', items: swot.threats },
                ].map((group) => (
                  <div key={group.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-slate-900">{group.title}</h3>
                    <div className="mt-4 space-y-2">
                      {group.items.map((item, index) => (
                        <div key={`${group.title}-${index}`} className="rounded-2xl bg-white px-4 py-3">
                          <p className="text-[13px] leading-7 text-slate-700">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[13px] leading-8 text-slate-500">{swot.insight}</p>
            </section>
          )}

          {hasOpportunities && (
            <section className="mt-6 rounded-[28px] border border-slate-200 p-6 text-right">
              <h2 className="text-2xl font-black text-slate-950">فرص البناء داخل القطاع</h2>
              <div className="mt-5 space-y-4">
                {businessOpportunities.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-[13px] leading-8 text-slate-600">
                      {item.description || item.note || 'فرصة تنفيذية قابلة للبناء داخل هذا القطاع.'}
                    </p>
                    {item.examples.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {item.examples.map((example, index) => (
                          <div key={`${item.id}-${index}`} className="rounded-2xl bg-white px-4 py-3">
                            <p className="text-[13px] leading-7 text-slate-700">{example}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mt-6 rounded-[28px] border border-slate-200 p-6 text-right">
            <h2 className="text-2xl font-black text-slate-950">محاور التحليل التفصيلية</h2>
            <div className="mt-5 space-y-4">
              {sections.map((section) => (
                <div key={section.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-black text-slate-900">{section.title}</h3>
                  {section.subtitle && <p className="mt-2 text-[12px] font-bold text-slate-500">{section.subtitle}</p>}
                  <p className="mt-3 text-[13px] leading-8 text-slate-600">
                    {typeof section.content === 'string'
                      ? section.content
                      : 'هذا القسم يتضمن عرضاً مرئياً داخل الصفحة الأصلية، وتمت الإشارة إليه كجزء من التحليل التفصيلي للقطاع.'}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {hasLeaders && (
            <section className="mt-6 rounded-[28px] border border-slate-200 p-6 text-right">
              <h2 className="text-2xl font-black text-slate-950">اللاعبون والرواد</h2>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {leaders.map((leader, index) => (
                  <div key={`${leader.name}-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-slate-900">{leader.name}</h3>
                    <p className="mt-2 text-[12px] font-bold text-slate-500">{leader.country}</p>
                    {leader.note && <p className="mt-3 text-[13px] leading-8 text-slate-600">{leader.note}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default SectorDashboardTemplate;
export * from './types';
