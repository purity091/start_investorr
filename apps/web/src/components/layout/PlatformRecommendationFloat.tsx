import React, { useState } from 'react';
import { Lightbulb, ChevronLeft, ArrowLeft, Minimize2 } from 'lucide-react';
import { useProjectWorkspace } from '@/features/workspace/ProjectWorkspaceContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const PlatformRecommendationFloat: React.FC<{
  setActiveTab: (tab: string) => void;
}> = ({ setActiveTab }) => {
  const { workspace } = useProjectWorkspace();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const recommendations = workspace.recommendations || [];
  if (recommendations.length === 0) return null;

  const currentRec = recommendations[currentIndex % recommendations.length];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendations.length);
  };

  const handleAction = () => {
    setActiveTab(currentRec.targetTab);
  };

  if (!isOpen) {
    return (
      <div dir="rtl" className="fixed top-16 left-4 z-40 sm:top-20 sm:left-6 transition-all duration-300">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 rounded-full border border-amber-500/60 bg-gradient-to-r from-amber-500/15 to-amber-500/5 px-3.5 py-1.5 text-xs font-bold text-amber-900 shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:bg-amber-500/20 dark:bg-amber-950/85 dark:text-amber-300 dark:border-amber-700/60 ring-2 ring-amber-400/30 animate-pulse"
          title="عرض توصيات واقتراحات المنصة"
        >
          <div className="relative flex size-4 items-center justify-center">
            <Lightbulb className="size-4 text-amber-600 dark:text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-amber-500 animate-ping" />
          </div>
          <span>توصية المنصة</span>
          <Badge variant="secondary" className="mr-0.5 h-4 px-1.5 text-[10px] font-bold bg-amber-200/80 text-amber-950 dark:bg-amber-900 dark:text-amber-100">
            {recommendations.length}
          </Badge>
        </button>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="fixed top-16 left-4 z-40 sm:top-20 sm:left-6 w-[calc(100vw-2rem)] max-w-xs sm:max-w-sm transition-all duration-300 animate-in fade-in slide-in-from-top-3"
    >
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-card/85 p-4 shadow-xl backdrop-blur-md transition-all dark:bg-card/85 dark:border-amber-700/40 ring-1 ring-black/5">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Lightbulb className="size-4" />
            </div>
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              توصية المنصة الذكية
              {recommendations.length > 1 && (
                <span className="text-[10px] font-normal text-muted-foreground tabular-nums">
                  ({currentIndex + 1} من {recommendations.length})
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {recommendations.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                title="التوصية التالية"
                className="flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <ChevronLeft className="size-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              title="تصغير التوصية"
              className="flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Minimize2 className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="pt-3 space-y-2.5">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-foreground leading-snug">{currentRec.title}</h4>
            <p className="text-[11px] leading-relaxed text-muted-foreground">{currentRec.description}</p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <Button
              size="xs"
              onClick={handleAction}
              className="gap-1.5 text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 shadow-2xs"
            >
              <span>{currentRec.actionLabel}</span>
              <ArrowLeft className="size-3" />
            </Button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-medium text-muted-foreground hover:text-foreground hover:underline"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
