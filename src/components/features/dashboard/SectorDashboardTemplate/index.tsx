import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  type FC,
} from 'react';
import { Download } from 'lucide-react';
import { SectorDashboardProps } from './types';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { cn } from '../../../../lib/utils';
import { useAccentVars } from '../../../../hooks/useAccentVars';
import { LightCard, DarkCard, KpiCard } from './SectionCards';
import { OpportunitiesSection } from './BusinessOpportunities';
import { LeadersSection } from './LeadersSection';
import { BottomRow } from './BottomRow';
import { buildNav, buildNavMap } from './NavHelpers';
import { SwotSection } from './SwotSection';
import { OPPORTUNITIES_REGISTRY } from '../../../../data/opportunitiesRegistry';
import { SWOT_REGISTRY } from '../../../../data/swotRegistry';
import { exportElementToPdf } from '../../../../utils/pdfExport';
import { slugifyReportName } from '../../../../utils/reportDownloads';
import './mobile-responsive.css';

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('ar', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);

const SectorDashboardTemplate: FC<SectorDashboardProps> = ({
  title,
  subtitle,
  accent,
  accentHex,
  pdfLabel = 'تحميل التقرير (PDF)',
  kpis,
  sections,
  leaders = [],
  definition,
  industryInsights = [],
  tags = [],
  businessOpportunities: manualOpportunities = [],
  onBack,
  onBuildPlan,
  parentCategory = 'استكشاف السوق',
  sectorId,
  swotAnalysis: manualSwot,
}) => {
  useAccentVars(accent, accentHex);

  const reportRef = useRef<HTMLDivElement>(null);
  const registryOpportunities = sectorId ? OPPORTUNITIES_REGISTRY[sectorId] : [];
  const businessOpportunities =
    manualOpportunities && manualOpportunities.length > 0 ? manualOpportunities : registryOpportunities;

  const registrySwot = sectorId ? SWOT_REGISTRY[sectorId] : undefined;
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

  const [activeNav, setActiveNav] = useState<string>(nav[0] ?? '');
  const [isDownloading, setIsDownloading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  // The active nav state is handled by regular React state.
  // We no longer need the IntersectionObserver since we are using a tabbed view instead of scrolling.

  const handleDownloadReport = useCallback(async () => {
    if (!reportRef.current) return;

    setIsDownloading(true);

    try {
      await exportElementToPdf({
        element: reportRef.current,
        fileName:
          `${slugifyReportName(`${title}-${new Date().toISOString().slice(0, 10)}`) || 'sector-report'}.pdf`,
      });
    } finally {
      setIsDownloading(false);
    }
  }, [title]);

  return (
    <>
      <div
        dir="rtl"
        ref={scrollContainerRef}
        className="relative h-screen min-h-screen overflow-y-auto bg-background font-['IBM_Plex_Sans_Arabic',system-ui,sans-serif]"
      >
        <header className="relative border-b border-border bg-background px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1700px]">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_500px]">
              <div className="space-y-4">
                <Badge variant="secondary" className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary hover:bg-primary/20">
                  دراسة قطاع {parentCategory}
                </Badge>
                <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                  {title}
                </h1>
                <p className="max-w-3xl text-sm font-medium leading-relaxed text-muted-foreground sm:text-base">
                  {subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    onClick={handleDownloadReport}
                    className="h-10 gap-2 rounded-lg px-5 font-bold text-[13px]"
                    disabled={isDownloading}
                  >
                    {isDownloading ? 'جاري التجهيز...' : pdfLabel}
                    <Download className="size-4" />
                  </Button>
                  <Button
                    onClick={onBack}
                    variant="outline"
                    className="h-10 rounded-lg px-5 font-bold text-[13px]"
                  >
                    الرجوع
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 self-center">
                {kpis.slice(0, 4).map((kpi, index) => (
                  <KpiCard key={index} kpi={kpi} />
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:px-8">
          {/* Sidebar Navigation */}
          <aside className="w-full shrink-0 lg:w-64">
            <div className="sticky top-24 flex flex-col gap-1 rounded-2xl border border-border bg-background p-3">
              {nav.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={cn(
                    "flex w-full items-center justify-start rounded-xl px-4 py-3 text-right text-[13px] font-bold transition-all",
                    activeNav === item 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content Area */}
          <main ref={mainRef} className="flex-1 min-w-0">
            {navMap[activeNav] === 'definition' && (
              <BottomRow definition={definition} industryInsights={industryInsights} tags={tags} title={title} />
            )}

            {navMap[activeNav] === 'swot-analysis' && hasSwot && swot && (
              <SwotSection swot={swot} title={title} />
            )}

            {navMap[activeNav] === 'opportunities-section' && hasOpportunities && (
              <OpportunitiesSection opportunities={businessOpportunities} onBuildPlan={onBuildPlan} />
            )}

            {sections.find(s => s.id === navMap[activeNav]) && (
              <div key={navMap[activeNav]} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {sections.find(s => s.id === navMap[activeNav])?.variant === 'dark' 
                  ? <DarkCard section={sections.find(s => s.id === navMap[activeNav])!} /> 
                  : <LightCard section={sections.find(s => s.id === navMap[activeNav])!} />
                }
              </div>
            )}

            {navMap[activeNav] === 'leaders' && hasLeaders && (
              <LeadersSection leaders={leaders} title={title} />
            )}
          </main>
        </div>
      </div>

      <div className="fixed left-[-99999px] top-0 z-[-1] w-[1240px] bg-white p-8 text-slate-900" aria-hidden="true">
        <div ref={reportRef} dir="rtl" className="bg-white">
          <section className="rounded-[32px] border border-slate-200 p-8">
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[12px] font-black text-slate-600">
              تقرير قطاعي جاهز للمشاركة • {formatDate(new Date())}
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
                      : 'هذا القسم يتضمن عرضاً مرئياً داخل الصفحة الأصلية، وتمت الإشارة إليه داخل التقرير كجزء من التحليل التفصيلي.'}
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
