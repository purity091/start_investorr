import React, { type FC } from 'react';
import { SectorKPI, SectorSection, SectorMarket } from './types';

const parseContent = (content: string, dark: boolean): React.ReactNode => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {content.split('\n').map((line, i) => {
        const t = line.trim();
        if (!t) return <div key={i} style={{ height: 4 }} />;

        if (/^[•\-\*]/.test(t)) {
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: dark ? 'var(--acc)' : '#cbd5e1', marginTop: 8, flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: 14, color: dark ? '#cbd5e1' : '#475569', lineHeight: 1.6, fontWeight: 500 }}>{t.substring(1).trim()}</p>
            </div>
          );
        }
        return <p key={i} style={{ margin: 0, fontSize: 15, color: dark ? '#cbd5e1' : '#475569', lineHeight: 1.7, fontWeight: 500 }}>{t}</p>;
      })}
    </div>
  );
};

export const LightCard: FC<{ section: SectorSection }> = ({ section }) => (
  <div
    className="sd-section-light sd-section-card"
    style={{
      position: 'relative',
      background: '#fff',
      borderRadius: 24,
      border: '1px solid #e2e8f0',
      padding: '32px',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.boxShadow = '0 30px 60px -12px rgba(0,0,0,0.08), 0 18px 36px -18px rgba(0,0,0,0.05)';
      (e.currentTarget as HTMLElement).style.borderColor = '#cbd5e1';
      (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0';
      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, direction: 'rtl' }}>
      <div style={{ width: 4, height: 32, background: 'var(--acc)', borderRadius: 4 }} />
      <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>{section.title}</h2>
    </div>
    <div className="sd-section-light-body" style={{ direction: 'rtl' }}>
      {typeof section.content === 'string' ? parseContent(section.content, false) : section.content}
    </div>
  </div>
);

export const DarkCard: FC<{ section: SectorSection }> = ({ section }) => (
  <div
    className="sd-section-dark sd-section-card"
    style={{ position: 'relative', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}
  >
    <div className="sd-glow" style={{ position: 'absolute', top: -80, left: -80, width: 280, height: 280, borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 20, direction: 'rtl' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div className="sd-section-dark-bar" style={{ width: 4, height: 44, borderRadius: 4 }} />
          <div className="sd-section-dark-bar-glow" style={{ position: 'absolute', inset: 0, borderRadius: 4, filter: 'blur(6px)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 className="sd-section-title" style={{ margin: 0, fontWeight: 800, color: '#f8fafc', lineHeight: 1.2, letterSpacing: '-0.02em' }}>{section.title}</h2>
          {section.subtitle && <p style={{ margin: '4px 0 0', fontSize: 10, fontWeight: 700, color: 'var(--acc-60)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{section.subtitle}</p>}
        </div>
      </div>
      <div style={{ direction: 'rtl' }}>
        {typeof section.content === 'string' ? parseContent(section.content, true) : section.content}
      </div>
    </div>
  </div>
);

export const KpiCard: FC<{ kpi: SectorKPI }> = ({ kpi }) => (
  <div
    style={{
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: 16,
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'default'
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.background = '#ffffff';
      (e.currentTarget as HTMLElement).style.borderColor = '#cbd5e1';
      (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.05)';
      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.background = '#f8fafc';
      (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0';
      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
    }}
  >
    {kpi.icon && (
      <div style={{ marginBottom: 12, display: 'inline-flex', width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: '#ffffff', color: '#334155', border: '1px solid #f1f5f9', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <kpi.icon size={16} strokeWidth={2.5} />
      </div>
    )}
    <div style={{ fontSize: 26, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1 }}>{kpi.value}</div>
    <div style={{ marginTop: 6, fontSize: 13, fontWeight: 700, color: '#334155' }}>{kpi.label}</div>
    <div style={{ marginTop: 2, fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{kpi.unit}</div>
  </div>
);

export const MarketCard: FC<{ market: SectorMarket }> = ({ market }) => (
  <div
    className="sd-market-card"
    style={{ background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: 14, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'default' }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(15,23,42,0.6)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(15,23,42,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}
  >
    {market.icon && (
      <div className="sd-market-icon-bg" style={{ borderRadius: 10, padding: 8, display: 'flex', flexShrink: 0, background: 'rgba(255,255,255,0.05)' }}>
        <market.icon className="sd-market-icon" size={18} color="#fff" strokeWidth={1.5} />
      </div>
    )}
    <div className="sd-market-card-content" style={{ flex: 1, minWidth: 0 }}>
      <p style={{ margin: '0 0 2px', fontSize: 9, fontWeight: 700, color: 'var(--acc-60)', textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1 }}>{market.label}</p>
      <div style={{ marginTop: 2 }}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 900, color: '#f8fafc', lineHeight: 1.2 }}>{market.country}</p>
        {market.note && (
          <p style={{ margin: '4px 0 0', fontSize: 10, color: '#94a3b8', fontWeight: 500, lineHeight: 1.5, opacity: 0.8, maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{market.note}</p>
        )}
      </div>
    </div>
  </div>
);
