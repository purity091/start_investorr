import React, { type FC } from 'react';

export const BottomRow: FC<{
  definition?: string;
  industryInsights?: string[];
  tags?: string[];
  title: string;
}> = ({ definition, industryInsights = [], tags = [], title }) => {
  const hasDefinition = !!definition;
  const hasInsights = industryInsights.length > 0;
  if (!hasDefinition && !hasInsights && tags.length === 0) return null;

  return (
    <div className={`sd-bottom-grid ${hasDefinition && hasInsights ? 'has-split' : ''}`} style={{ direction: 'rtl' }}>
      {hasDefinition && (
        <div 
          id="definition-section" 
          data-section="definition" 
          className="sd-section-card" 
          style={{ 
            background: '#fff', 
            borderRadius: 24, 
            border: '1px solid #e2e8f0', 
            padding: '32px',
            position: 'relative', 
            overflow: 'hidden' 
          }}
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, direction: 'rtl' }}>
              <div style={{ width: 4, height: 32, background: 'var(--acc)', borderRadius: 4, flexShrink: 0 }} />
              <h3 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>
                تعريف {title.replace(/^(قطاع|صناعة)\s*/, '')}
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: 16, color: '#475569', fontWeight: 500, lineHeight: 2, direction: 'rtl' }}>{definition}</p>
            {tags.length > 0 && (
              <div style={{ marginTop: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, direction: 'rtl' }}>
                  <div style={{ width: 24, height: 1, background: '#e2e8f0' }} />
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>الموضوعات المرتبطة</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, direction: 'rtl' }}>
                  {tags.map((tag, i) => (
                    <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: 13, fontWeight: 700, color: '#475569', transition: 'all 0.2s' }}>
                      <span style={{ color: i === 0 ? 'var(--acc)' : '#94a3b8' }}>#</span>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {hasInsights && (
        <div id="insights-section" data-section="insights-bottom" className="sd-section-card" style={{ background: '#fff', borderRadius: 24, border: '1px solid #e2e8f0', padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 24px', fontSize: 22, fontWeight: 900, color: '#0f172a', direction: 'rtl', letterSpacing: '-0.02em' }}>أبرز النقاط</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
            {industryInsights.map((insight, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, direction: 'rtl' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--acc)', flexShrink: 0, marginTop: 8 }} />
                <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: '#475569', lineHeight: 1.7 }}>{insight}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
