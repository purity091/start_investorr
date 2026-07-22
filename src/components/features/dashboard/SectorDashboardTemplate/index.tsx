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
  const visibleRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const handleNavClick = useCallback(
    (label: string) => {
      setActiveNav(label);
      const sectionId = navMap[label];
      if (!sectionId) return;

      const el =
        document.querySelector<HTMLElement>(`[data-section="${sectionId}"]`) ??
        document.getElementById(`${sectionId}-section`);

      if (el && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const navHeight = navRef.current?.offsetHeight ?? 60;
        const targetScroll =
          el.getBoundingClientRect().top -
          container.getBoundingClientRect().top +
          container.scrollTop -
          navHeight -
          20;

        container.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    },
    [navMap],
  );

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;

    const tracked: Element[] = [];

    sections.forEach((section) => {
      const el = root.querySelector(`[data-section="${section.id}"]`);
      if (el) tracked.push(el);
    });

    ['opportunities-section', 'leaders', 'definition', 'insights-bottom', 'swot-analysis'].forEach((id) => {
      const el = document.querySelector(`[data-section="${id}"]`) || document.getElementById(id);
      if (el) tracked.push(el);
    });

    visibleRef.current.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute('data-section') ?? entry.target.id ?? '';
          if (entry.isIntersecting) {
            visibleRef.current.add(id);
          } else {
            visibleRef.current.delete(id);
          }
        }

        for (const sectionId of visibleRef.current) {
          for (const [label, navSectionId] of Object.entries(navMap)) {
            if (navSectionId === sectionId && nav.includes(label)) {
              setActiveNav(label);
              return;
            }
          }
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: '-120px 0px -40% 0px',
        threshold: [0, 0.2],
      },
    );

    tracked.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections, navMap, nav]);

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
        className="sd-mobile-safe"
        style={{
          minHeight: '100vh',
          background: '#f8fafc',
          fontFamily: "'Cairo', 'Tajawal', 'IBM Plex Sans Arabic', system-ui, sans-serif",
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <header className="sd-light-hero-section">
          <div className="sd-container">
            <div className="sd-light-hero-grid">
              <div className="sd-light-hero-content">
                <div className="sd-light-badge">دراسة قطاع {parentCategory}</div>
                <h1
                  style={{
                    fontSize: 'clamp(36px, 5vw, 48px)',
                    fontWeight: 900,
                    color: '#020617',
                    margin: 0,
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {title}
                </h1>
                <p style={{ maxWidth: '100%', fontSize: 16, lineHeight: 1.8, color: '#475569', margin: 0 }}>
                  {subtitle}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
                  <button
                    onClick={handleDownloadReport}
                    className="sd-download-btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      borderRadius: 12,
                      background: '#0f172a',
                      padding: '12px 20px',
                      fontSize: 14,
                      fontWeight: 900,
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    {isDownloading ? 'جاري تجهيز ملف PDF...' : pdfLabel}
                    <Download size={16} />
                  </button>
                  <button
                    onClick={onBack}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      borderRadius: 12,
                      border: '1px solid #e2e8f0',
                      background: '#fff',
                      padding: '12px 20px',
                      fontSize: 14,
                      fontWeight: 900,
                      color: '#334155',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    الرجوع لاستكشاف القطاعات
                  </button>
                </div>
              </div>

              <div className="sd-light-kpi-grid">
                {kpis.slice(0, 4).map((kpi, index) => (
                  <KpiCard key={index} kpi={kpi} />
                ))}
              </div>
            </div>
          </div>
        </header>

        <nav
          ref={navRef}
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid #f1f5f9',
          }}
        >
          <div className="sd-container" style={{ height: 72 }}>
            <div className="sd-nav-container">
              {nav.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`sd-nav-btn ${activeNav === item ? 'active' : ''}`}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '100px',
                    border: '1px solid transparent',
                    background: activeNav === item ? '#0f172a' : 'transparent',
                    color: activeNav === item ? '#fff' : '#475569',
                    fontSize: 14,
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main
          ref={mainRef}
          className="sd-container"
          style={{
            paddingTop: '40px',
            paddingBottom: '160px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <BottomRow definition={definition} industryInsights={industryInsights} tags={tags} title={title} />

          {hasSwot && <SwotSection swot={swot} title={title} />}

          {hasOpportunities && (
            <OpportunitiesSection opportunities={businessOpportunities} onBuildPlan={onBuildPlan} />
          )}

          {sections.map((section) => (
            <div key={section.id} data-section={section.id}>
              {section.variant === 'dark' ? <DarkCard section={section} /> : <LightCard section={section} />}
            </div>
          ))}

          {hasLeaders && <LeadersSection leaders={leaders} title={title} />}
        </main>
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
