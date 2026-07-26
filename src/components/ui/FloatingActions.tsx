import React, { useEffect, useState } from 'react';
import { ArrowUp, Wand2 } from 'lucide-react';
import { getTabFromPathname } from '../../utils/routes';
import { Button } from './Button';

export const FloatingActions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');

  useEffect(() => {
    const updateTab = () => {
      setActiveTab(getTabFromPathname(window.location.pathname));
    };

    updateTab();
    window.addEventListener('popstate', updateTab);
    window.addEventListener('khotta:navigate', updateTab as EventListener);
    return () => {
      window.removeEventListener('popstate', updateTab);
      window.removeEventListener('khotta:navigate', updateTab as EventListener);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-3">
      {activeTab !== 'contact-us' && (
        <Button
          size="icon"
          className="group relative h-14 w-14 rounded-full bg-slate-950 text-white shadow-[0_18px_32px_rgba(15,23,42,0.18)] hover:scale-105 hover:bg-slate-800"
          title="المساعد الذكي"
        >
          <Wand2 size={24} />
          <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-slate-950 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            المساعد الذكي
          </span>
        </Button>
      )}

      <Button
        onClick={scrollToTop}
        variant="outline"
        size="icon"
        className="rounded-full bg-white text-slate-600 shadow-sm hover:text-slate-950"
        title="أعلى الصفحة"
      >
        <ArrowUp size={20} />
      </Button>
    </div>
  );
};
