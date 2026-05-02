import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  type FC,
} from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { SectorDashboardProps } from './types';
import { useAccentVars } from '../../../../hooks/useAccentVars';
import { LightCard, DarkCard, KpiCard, MarketCard } from './SectionCards';
import { OpportunitiesSection } from './BusinessOpportunities';
import { LeadersSection } from './LeadersSection';
import { BottomRow } from './BottomRow';
import { buildNav, buildNavMap } from './NavHelpers';
import { SwotSection } from './SwotSection';
import { OPPORTUNITIES_REGISTRY } from '../../../../data/opportunitiesRegistry';
import { SWOT_REGISTRY } from '../../../../data/swotRegistry';
import './mobile-responsive.css';

const SectorDashboardTemplate: FC<SectorDashboardProps> = ({
  title,
  subtitle,
  icon: Icon,
  accent,
  accentHex,
  pdfLabel = 'تحميل التقرير (PDF)',
  kpis,
  sections,
  leaders = [],
  definition,
  industryInsights = [],
  tags = [],
  topMarkets = [],
  businessOpportunities: manualOpportunities = [],
  onBack,
  onBuildPlan,
  parentCategory = 'استكشاف السوق',
  sectorId,
  swotAnalysis: manualSwot,
}) => {
  // Inject CSS vars
  useAccentVars(accent, accentHex);

  // Auto-fetch opportunities if not provided manually
  const registryOpportunities = sectorId ? OPPORTUNITIES_REGISTRY[sectorId] : [];
  const businessOpportunities = (manualOpportunities && manualOpportunities.length > 0) ? manualOpportunities : registryOpportunities;

  // Auto-fetch SWOT if not provided manually
  const registrySwot = sectorId ? SWOT_REGISTRY[sectorId] : undefined;
  const swot = manualSwot || registrySwot;

  const hasLeaders = leaders.length > 0;
  const hasDefinition = !!definition;
  const hasOpportunities = (businessOpportunities && businessOpportunities.length > 0);
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef<Set<string>>(new Set());

  // Scroll to top on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  // Nav click → smooth scroll
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
        const navH = navRef.current?.offsetHeight ?? 60;
        
        // Calculate position relative to container
        const elTop = el.getBoundingClientRect().top;
        const containerTop = container.getBoundingClientRect().top;
        const currentScroll = container.scrollTop;
        
        const targetScroll = elTop - containerTop + currentScroll - navH - 20;

        container.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    },
    [navMap],
  );

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;

    const tracked: Element[] = [];

    sections.forEach((s) => {
      const el = root.querySelector(`[data-section="${s.id}"]`);
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
          for (const [label, sid] of Object.entries(navMap)) {
            if (sid === sectionId && nav.includes(label)) {
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
      }
    );

    tracked.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections, navMap, nav]);

  return (
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
            
            {/* Right Column (Text Content) */}
            <div className="sd-light-hero-content">
              <div className="sd-light-badge">
                دراسة قطاع {parentCategory}
              </div>
              <h1 style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 900, color: '#020617', margin: 0, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                {title}
              </h1>
              <p style={{ maxWidth: '100%', fontSize: 16, lineHeight: 1.8, color: '#475569', margin: 0 }}>
                {subtitle}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
                <button className="sd-download-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 12, background: '#0f172a', padding: '12px 20px', fontSize: 14, fontWeight: 900, color: '#fff', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>
                  تحميل التقرير الكامل
                  <Download size={16} />
                </button>
                <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff', padding: '12px 20px', fontSize: 14, fontWeight: 900, color: '#334155', cursor: 'pointer', transition: 'background 0.2s' }}>
                  الرجوع لاستكشاف القطاعات
                </button>
              </div>
            </div>

            {/* Left Column (KPI Grid) */}
            <div className="sd-light-kpi-grid">
              {kpis.slice(0, 4).map((kpi, i) => (
                <KpiCard key={i} kpi={kpi} />
              ))}
            </div>

          </div>
        </div>
      </header>

      <nav ref={navRef} style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(24px)', borderBottom: '1px solid #f1f5f9' }}>
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
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>


      <main ref={mainRef} className="sd-container" style={{ paddingTop: '40px', paddingBottom: '160px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* 1. Introduction & Context */}
        <BottomRow
          definition={definition}
          industryInsights={industryInsights}
          tags={tags}
          title={title}
        />

        {/* 2. Strategic Context (SWOT) */}
        {hasSwot && (
          <SwotSection swot={swot} title={title} />
        )}

        {/* 3. Actionable Value (Opportunities) */}
        {hasOpportunities && (
          <OpportunitiesSection opportunities={businessOpportunities} onBuildPlan={onBuildPlan} />
        )}

        {/* 4. Detailed Analysis Sections */}
        {sections.map((section) => (
          <div key={section.id} data-section={section.id}>
            {section.variant === 'dark' ? <DarkCard section={section} /> : <LightCard section={section} />}
          </div>
        ))}

        {/* 5. Ecosystem & Proof (Leaders) */}
        {hasLeaders && (
          <LeadersSection leaders={leaders} title={title} />
        )}
      </main>
    </div>
  );
};

export default SectorDashboardTemplate;
export * from './types';
