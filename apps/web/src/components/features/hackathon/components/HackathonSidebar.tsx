import React from 'react';
import { Database, Search, X } from 'lucide-react';

interface HackathonSidebarProps {
  opportunities: any[];
  selectedId: string;
  query: string;
  compact?: boolean;
  onSelect: (item: any) => void;
  onQueryChange: (value: string) => void;
  onClearSelection: () => void;
  onClose?: () => void;
}

export const HackathonSidebar: React.FC<HackathonSidebarProps> = ({ opportunities, selectedId, query, compact = false, onSelect, onQueryChange, onClearSelection, onClose }) => (
  <aside className={`glass-panel flex h-full flex-col space-y-4 rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/50 backdrop-blur-2xl ${compact ? 'p-4 sm:p-5' : 'p-5 sm:p-8'}`}>
    <div className="mb-1 flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-base font-black text-white sm:text-lg">
        <Database size={16} className="text-blue-400 sm:h-[18px] sm:w-[18px]" />
        بوابة الفرص
      </h2>
      <div className="flex items-center gap-2">
        <span className="rounded-lg bg-blue-500/20 px-2 py-1 text-[10px] font-black text-blue-300">Optional</span>
        {onClose && (
          <button onClick={onClose} className="rounded-lg border border-white/10 p-1.5 text-slate-300 transition hover:bg-white/10" aria-label="إغلاق لوحة الفرص">
            <X size={14} />
          </button>
        )}
      </div>
    </div>

    <p className="text-xs font-semibold leading-6 text-slate-400">خيار إضافي فقط. يمكنك اختيار فرصة جاهزة، أو كتابة فرصتك الخاصة مباشرة في المهام.</p>

    <button onClick={onClearSelection} className="w-full rounded-xl border border-white/10 bg-white/[.04] py-2 text-xs font-black text-slate-300 transition hover:bg-white/10">
      متابعة بدون اختيار فرصة
    </button>

    <div className="relative">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
      <input
        type="text"
        placeholder="ابحث داخل الفرص..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white focus:border-blue-500/50 focus:outline-none"
      />
    </div>

    <div className={`custom-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto pr-1 ${compact ? 'max-h-none' : 'max-h-[600px]'}`}>
      {opportunities.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className={`w-full rounded-2xl border p-3 text-right transition-all sm:p-4 ${selectedId === item.id ? 'border-blue-500/50 bg-blue-600/20' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-[10px] font-black text-lime-400">Pain: {item.pain}/10</span>
            <h4 className="text-sm font-black text-white">{item.title}</h4>
          </div>
          <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">{item.desc}</p>
        </button>
      ))}
    </div>
  </aside>
);
