import React, { type FC } from 'react';
import { SectorLeader } from './types';

export const LeadersSection: FC<{
  leaders: SectorLeader[];
  title: string;
}> = ({ leaders, title }) => (
  <div
    id="leaders-section"
    data-section="leaders"
    className="sd-section-card"
    style={{ 
      background: '#fff', 
      borderRadius: 24, 
      border: '1px solid #e2e8f0',
      padding: '32px'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, direction: 'rtl' }}>
      <div style={{ width: 4, height: 32, background: 'var(--acc)', borderRadius: 4, flexShrink: 0 }} />
      <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>
        أبرز قادة {title.replace(/^(قطاع|صناعة)\s*/, '')}
      </h2>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, direction: 'rtl' }}>
      {leaders.map((leader, idx) => (
        <div
          key={idx}
          className="sd-leader-card"
          style={{ 
            position: 'relative', 
            background: '#f8fafc', 
            borderRadius: 16, 
            border: '1px solid #e2e8f0', 
            padding: '24px 24px 24px 48px', 
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
          <div style={{ position: 'absolute', top: 24, left: 20, width: 28, height: 28, borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: '#64748b', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            {idx + 1}
          </div>
          <p style={{ margin: 0, fontSize: 18, fontWeight: 900, color: '#0f172a', lineHeight: 1.2 }}>{leader.name}</p>
          <p style={{ margin: '6px 0 0', fontSize: 14, fontWeight: 600, color: '#64748b' }}>{leader.country}</p>
          {leader.note && (
            <p style={{ margin: '16px 0 0', paddingTop: 16, borderTop: '1px solid #f1f5f9', fontSize: 13, fontWeight: 500, color: '#475569', lineHeight: 1.6 }}>{leader.note}</p>
          )}
        </div>
      ))}
    </div>
  </div>
);
