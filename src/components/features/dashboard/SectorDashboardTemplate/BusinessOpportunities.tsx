import React, { useState, type FC } from 'react';
import { ChevronDown, CheckCircle2, ExternalLink } from 'lucide-react';
import { BusinessOpportunity } from './types';

export const OpportunityCard: FC<{ opp: BusinessOpportunity; index: number; onBuildPlan?: (p?: string) => void }> = ({
  opp,
  index,
  onBuildPlan,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const Icon = opp.icon;

  return (
    <div
      className="sd-opp-card"
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 24,
        padding: '24px',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = '#6366f1';
        el.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)';
        el.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = '#e2e8f0';
        el.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
        el.style.transform = 'translateY(0)';
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 20,
        }}
      >
        <div style={{ 
          width: 48, height: 48, borderRadius: 14, 
          background: '#f8fafc', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', 
          color: '#6366f1', border: '1px solid #f1f5f9',
        }}>
          {Icon && <Icon size={22} strokeWidth={2.5} />}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24, fontWeight: 900, color: '#f1f5f9', lineHeight: 1, userSelect: 'none' }}>
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: isOpen ? '#6366f1' : '#f8fafc',
              color: isOpen ? '#fff' : '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              border: '1px solid #f1f5f9',
              cursor: 'pointer'
            }}
          >
            <ChevronDown size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <h4 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.01em' }}>{opp.title}</h4>

      {/* Expandable Content (Open by Default) */}
      <div style={{
        maxHeight: isOpen ? '1200px' : '0',
        opacity: isOpen ? 1 : 0,
        overflow: 'hidden',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        paddingTop: isOpen ? 8 : 0,
      }}>
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 4, height: 16, background: '#6366f1', borderRadius: 2 }} />
            <p style={{ margin: 0, fontSize: 11, fontWeight: 900, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em' }}>المسارات الاستثمارية المقترحة:</p>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {opp.examples.map((ex, i) => (
              <li key={i}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBuildPlan?.(ex);
                  }}
                  className="sd-touch-btn"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#475569',
                    padding: '14px',
                    background: '#f8fafc',
                    border: '1px solid #f1f5f9',
                    borderRadius: 14,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'right',
                    direction: 'rtl',
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }} />
                  <span style={{ flex: 1 }}>{ex}</span>
                  <ExternalLink size={14} style={{ opacity: 0.3 }} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const OpportunitiesSection: FC<{ opportunities: BusinessOpportunity[]; onBuildPlan?: (p?: string) => void }> = ({
  opportunities,
  onBuildPlan,
}) => {
  return (
    <div
      id="opportunities-section"
      data-section="opportunities-section"
      className="sd-section-card"
      style={{
        background: '#fff',
        borderRadius: 24,
        border: '1px solid #e2e8f0',
        padding: '32px',
        direction: 'rtl',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div
          style={{ width: 4, height: 32, background: 'var(--acc)', borderRadius: 4, flexShrink: 0, marginTop: 4 }}
        />
        <div style={{ textAlign: 'right', flex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
            <h3
              style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 900,
                color: '#0f172a',
                letterSpacing: '-0.02em',
              }}
            >
              نماذج الأعمال والفرص الاستثمارية
            </h3>
            <span
              style={{
                background: '#0f172a',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 900,
                padding: '4px 12px',
                borderRadius: '100px',
                letterSpacing: '0.05em'
              }}
            >
              فرص واعدة
            </span>
          </div>
          <p
            style={{
              margin: '8px 0 0',
              fontSize: 16,
              fontWeight: 500,
              color: '#64748b',
              lineHeight: 1.6,
              maxWidth: 800
            }}
          >
            أبرز مسارات العمل المتاحة في هذا القطاع وكيفية البدء في تنفيذها من خلال نماذج عمل واقعية ومجربة.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="sd-opp-grid">
        {opportunities.map((opp, idx) => (
          <OpportunityCard key={opp.id} opp={opp} index={idx} onBuildPlan={onBuildPlan} />
        ))}
      </div>
    </div>
  );
};

