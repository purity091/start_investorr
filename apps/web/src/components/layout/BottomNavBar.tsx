import React, { useState } from 'react';
import { 
  Plus, 
  Layers,
  Lightbulb,
  Sparkles,
  TrendingDown,
  CloudCog,
  Settings2,
  Compass,
  Activity,
  LayoutDashboard,
  AlertCircle,
  Wand2,
  Briefcase,
  Target,
  LayoutGrid,
  Palette,
  Users
} from 'lucide-react';
import { getTabPath } from '../../utils/routes';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';

interface BottomNavBarProps {
  activeTab?: string;
  setActiveTab?: (tab: any) => void;
  onMenuClick?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, setActiveTab }) => {
  const [activeDropdown, setActiveDropdown] = useState<'project-ideas' | 'new-plan' | null>(null);

  const projectIdeasOptions = [
    { id: 'proven-projects', icon: Sparkles, label: 'أفكار شركات ناجحة', desc: 'تحليل أسرار ونماذج الدخل' },
    { id: 'failed-projects', icon: TrendingDown, label: 'شركات فشلت', desc: 'دروس وتعثر الشركات' },
    { id: 'saas-ideas', icon: CloudCog, label: 'أفكار SaaS', desc: 'برمجيات نمط الاشتراكات' },
    { id: 'micro-saas-ideas', icon: Settings2, label: 'أفكار Micro-SaaS', desc: 'مشاريع مصغرة وسريعة' },
    { id: 'market-discovery', icon: Compass, label: 'قطاعات السوق', desc: 'تحليل الفرص الاستثمارية' },
    { id: 'problem-engine', icon: Activity, label: 'المشكلات والفرص', desc: 'رادار اكتشاف الفرص' },
  ];

  const newPlanOptions = [
    { id: 'new-plan', icon: Wand2, label: 'المعالج الذكي السريع', desc: 'بناء الخطة بالذكاء الاصطناعي' },
    { id: 'new-plan-pro', icon: Briefcase, label: 'النموذج الاحترافي الشامل', desc: 'تحليل مالي واستثماري كامل' },
    { id: 'new-plan-mit24', icon: Target, label: 'منهجية MIT الـ 24 خطوة', desc: 'منهجية ريادة الأعمال' },
    { id: 'bmc', icon: LayoutGrid, label: 'نموذج العمل BMC', desc: 'مخطط القيمة والشركاء' },
    { id: 'brand-identity', icon: Palette, label: 'استوديو الهوية التجارية', desc: 'تصميم العلامة والشعار' },
    { id: 'new-plan-family', icon: Users, label: 'نموذج العائلة والأصدقاء', desc: 'عرض مبسط للمستثمرين' },
  ];

  const PROJECT_IDEAS_TABS = [
    'project-ideas',
    'proven-projects',
    'failed-projects',
    'saas-ideas',
    'micro-saas-ideas',
    'market-discovery',
    'problem-engine'
  ];

  const NEW_PLAN_TABS = [
    'new-plan',
    'new-plan-pro',
    'new-plan-mit24',
    'bmc',
    'new-plan-bmc',
    'brand-identity',
    'new-plan-family'
  ];

  const isProjectIdeasActive = PROJECT_IDEAS_TABS.includes(activeTab || '');
  const isNewPlanActive = NEW_PLAN_TABS.includes(activeTab || '');

  const navItems = [
    { id: 'project-ideas', icon: Lightbulb, label: 'أفكار مشاريع', isDropdown: true },
    { id: 'workspace', icon: LayoutDashboard, label: 'المساحة' },
    { id: 'new-plan', icon: Plus, label: 'مشروع جديد', isCenter: true, isDropdown: true },
    { id: 'my-plans', icon: Layers, label: 'مشاريعي' },
    { id: 'problem-engine', icon: AlertCircle, label: 'الفرص والمشاكل' },
  ];

  const handleSelectOption = (optionId: string) => {
    setActiveDropdown(null);
    if (setActiveTab) {
      setActiveTab(optionId);
    } else {
      window.location.href = getTabPath(optionId);
    }
  };

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <div 
        id="tour-mobile-bottom-nav" 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] w-full border-t border-border/40 bg-background/90 backdrop-blur-xl pb-[max(env(safe-area-inset-bottom),0.5rem)] transition-all duration-300 ease-in-out"
      >
        <div className="grid grid-cols-5 h-16 items-center w-full max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-6 relative">
          {navItems.map((item) => {
            let isActive = activeTab === item.id;
            if (item.id === 'project-ideas') isActive = isProjectIdeasActive;
            if (item.id === 'new-plan') isActive = isNewPlanActive;

            const handleClick = (event: React.MouseEvent) => {
              if (item.isDropdown) {
                event.preventDefault();
                const dropdownKey = item.id as 'project-ideas' | 'new-plan';
                setActiveDropdown((prev) => (prev === dropdownKey ? null : dropdownKey));
                return;
              }

              setActiveDropdown(null);
              if (setActiveTab) {
                event.preventDefault();
                setActiveTab(item.id);
              }
            };

            if (item.isCenter) {
              return (
                <div key={item.id} className="flex items-center justify-center relative h-full">
                  <a
                    id={`tour-mobile-${item.id}`}
                    href={getTabPath(item.id)}
                    onClick={handleClick}
                    className={cn(
                      "absolute -top-5 sm:-top-6 flex h-13 w-13 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background transition-all active:scale-95 touch-manipulation hover:bg-primary/90",
                      activeDropdown === 'new-plan' && "rotate-45 bg-amber-600"
                    )}
                    aria-label={item.label}
                    title={item.label}
                  >
                    <item.icon className="size-6 sm:size-7 transition-transform" strokeWidth={2.5} />
                  </a>
                </div>
              );
            }

            return (
              <a
                key={item.id}
                id={`tour-mobile-${item.id}`}
                href={getTabPath(item.id)}
                onClick={handleClick}
                className="flex flex-col items-center justify-center gap-0.5 min-h-[48px] w-full touch-manipulation transition-colors px-1 cursor-pointer"
                aria-label={item.label}
              >
                <div 
                  className={`flex flex-col items-center justify-center transition-all duration-200 w-full ${
                    isActive ? 'text-primary scale-105 font-bold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <item.icon 
                    className="size-5 sm:size-6 mb-0.5" 
                    strokeWidth={isActive ? 2.5 : 2} 
                  />
                  <span className="text-[10px] sm:text-xs font-medium tracking-tight truncate max-w-full text-center">
                    {item.label}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Project Ideas Options Sheet */}
      <Sheet open={activeDropdown === 'project-ideas'} onOpenChange={(open) => !open && setActiveDropdown(null)} modal={false}>
        <SheetContent 
          side="bottom" 
          dir="rtl" 
          className="z-[110] bottom-[calc(4.25rem+max(env(safe-area-inset-bottom),0.5rem))] inset-x-2.5 sm:left-auto sm:right-6 translate-y-0 transform-none w-[calc(100vw-1.25rem)] max-w-xl rounded-2xl border border-border/80 bg-background/98 p-3 sm:p-4 shadow-none ring-1 ring-border/50"
        >
          <div className="grid grid-cols-2 gap-2">
            {projectIdeasOptions.map((opt) => {
              const isOptActive = activeTab === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className={cn(
                    "flex items-center gap-2.5 p-2.5 rounded-xl border text-right transition-all duration-150 active:scale-[0.98] cursor-pointer",
                    isOptActive 
                      ? "bg-primary text-primary-foreground border-primary font-bold shadow-none" 
                      : "bg-card border-border/70 hover:bg-accent/60 hover:border-border text-foreground"
                  )}
                >
                  <div className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg border",
                    isOptActive ? "bg-primary-foreground/15 border-primary-foreground/30 text-primary-foreground" : "bg-muted/50 border-border/40 text-primary"
                  )}>
                    <opt.icon className="size-4 shrink-0" />
                  </div>
                  <div className="flex flex-col min-w-0 overflow-hidden text-right leading-tight">
                    <span className={cn("text-xs font-bold truncate", isOptActive ? "text-primary-foreground" : "text-foreground")}>
                      {opt.label}
                    </span>
                    <span className={cn("text-[10px] truncate mt-0.5 font-medium", isOptActive ? "text-primary-foreground/80" : "text-muted-foreground")}>
                      {opt.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* New Project Options Sheet */}
      <Sheet open={activeDropdown === 'new-plan'} onOpenChange={(open) => !open && setActiveDropdown(null)} modal={false}>
        <SheetContent 
          side="bottom" 
          dir="rtl" 
          className="z-[110] bottom-[calc(4.25rem+max(env(safe-area-inset-bottom),0.5rem))] inset-x-2.5 sm:mx-auto translate-y-0 transform-none w-[calc(100vw-1.25rem)] max-w-xl rounded-2xl border border-border/80 bg-background/98 p-3 sm:p-4 shadow-none ring-1 ring-border/50"
        >
          <div className="grid grid-cols-2 gap-2">
            {newPlanOptions.map((opt) => {
              const isOptActive = activeTab === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className={cn(
                    "flex items-center gap-2.5 p-2.5 rounded-xl border text-right transition-all duration-150 active:scale-[0.98] cursor-pointer",
                    isOptActive 
                      ? "bg-primary text-primary-foreground border-primary font-bold shadow-none" 
                      : "bg-card border-border/70 hover:bg-accent/60 hover:border-border text-foreground"
                  )}
                >
                  <div className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg border",
                    isOptActive ? "bg-primary-foreground/15 border-primary-foreground/30 text-primary-foreground" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  )}>
                    <opt.icon className="size-4 shrink-0" />
                  </div>
                  <div className="flex flex-col min-w-0 overflow-hidden text-right leading-tight">
                    <span className={cn("text-xs font-bold truncate", isOptActive ? "text-primary-foreground" : "text-foreground")}>
                      {opt.label}
                    </span>
                    <span className={cn("text-[10px] truncate mt-0.5 font-medium", isOptActive ? "text-primary-foreground/80" : "text-muted-foreground")}>
                      {opt.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
