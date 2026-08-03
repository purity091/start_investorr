import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from './Button';

export const FloatingActions: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-3">
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

