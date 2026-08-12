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
  Users,
  ChevronUp
} from 'lucide-react';
import { getTabPath } from '../../utils/routes';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

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
      {/* Dimmed page overlay backdrop (leaves the bottom navbar completely clear & visible) */}
      {activeDropdown && (
        <div 
          tabIndex={-1}
          role="button"
          aria-label="إغلاق القائمة"
          className="lg:hidden fixed inset-0 bottom-20 z-[90] bg-black/25 backdrop-blur-[2px] transition-opacity duration-200 animate-in fade-in-0 cursor-pointer"
          onClick={() => setActiveDropdown(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
              setActiveDropdown(null);
            }
          }}
        />
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div 
        id="tour-mobile-bottom-nav" 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] w-full border-0 bg-background/95 backdrop-blur-xl shadow-xl pb-[max(env(safe-area-inset-bottom),0.5rem)] transition-all duration-300 ease-in-out"
      >
        <div className="grid grid-cols-5 h-16 items-center w-full max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-6 relative">
          {navItems.map((item) => {
            let isActive = activeTab === item.id;
            if (item.id === 'project-ideas') isActive = isProjectIdeasActive;
            if (item.id === 'new-plan') isActive = isNewPlanActive;

            const isMenuOpen = activeDropdown === item.id;

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

            // Center Action Button (+)
            if (item.isCenter) {
              return (
                <Popover 
                  key={item.id} 
                  open={isMenuOpen} 
                  onOpenChange={(open) => setActiveDropdown(open ? 'new-plan' : null)}
                >
                  <div className="flex items-center justify-center relative h-full">
                    <PopoverTrigger asChild>
                      <a
                        id={`tour-mobile-${item.id}`}
                        href={getTabPath(item.id)}
                        onClick={handleClick}
                        className={cn(
                          "absolute -top-5 sm:-top-6 flex h-13 w-13 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-all duration-300 active:scale-95 touch-manipulation hover:bg-primary/90 cursor-pointer",
                          isMenuOpen && "rotate-45 bg-amber-600 ring-4 ring-amber-500/30 scale-105 shadow-amber-600/20"
                        )}
                        aria-label={item.label}
                        title={item.label}
                      >
                        <item.icon className="size-6 sm:size-7 transition-transform duration-300" strokeWidth={2.5} />
                      </a>
                    </PopoverTrigger>
                  </div>

                  {/* Upward Popover Content for New Plan */}
                  <PopoverContent 
                    side="top" 
                    align="center" 
                    sideOffset={22}
                    dir="rtl"
                    className="z-[110] w-[calc(100vw-1.5rem)] max-w-xl rounded-2xl border-0 bg-background/98 p-3 sm:p-4 shadow-2xl ring-1 ring-foreground/10"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/40 px-1">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                          <Plus className="size-3.5" strokeWidth={2.5} />
                        </div>
                        <span className="text-xs font-bold text-foreground">إنشاء مشروع جديد</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">اختر نموذج البناء المناسب</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {newPlanOptions.map((opt) => {
                        const isOptActive = activeTab === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleSelectOption(opt.id)}
                            className={cn(
                              "flex items-center gap-2.5 p-2.5 rounded-xl border-0 text-right transition-all duration-200 active:scale-[0.98] cursor-pointer",
                              isOptActive 
                                ? "bg-primary text-primary-foreground font-bold shadow-sm" 
                                : "bg-card/90 hover:bg-accent/70 text-foreground shadow-2xs"
                            )}
                          >
                            <div className={cn(
                              "flex size-8 shrink-0 items-center justify-center rounded-lg",
                              isOptActive ? "bg-primary-foreground/15 text-primary-foreground" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
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
                  </PopoverContent>
                </Popover>
              );
            }

            // Project Ideas Dropdown Item
            if (item.id === 'project-ideas') {
              return (
                <Popover 
                  key={item.id} 
                  open={isMenuOpen} 
                  onOpenChange={(open) => setActiveDropdown(open ? 'project-ideas' : null)}
                >
                  <PopoverTrigger asChild>
                    <a
                      id={`tour-mobile-${item.id}`}
                      href={getTabPath(item.id)}
                      onClick={handleClick}
                      className={cn(
                        "flex flex-col items-center justify-center gap-0.5 min-h-[48px] w-full touch-manipulation transition-all duration-200 px-1 cursor-pointer rounded-xl relative",
                        isMenuOpen && "bg-primary/10 text-primary font-bold shadow-2xs"
                      )}
                      aria-label={item.label}
                    >
                      <div className="flex flex-col items-center justify-center relative">
                        {isMenuOpen && (
                          <ChevronUp className="size-3.5 text-primary animate-bounce absolute -top-3" strokeWidth={2.5} />
                        )}
                        <item.icon 
                          className={cn(
                            "size-5 sm:size-6 transition-transform duration-200",
                            (isActive || isMenuOpen) ? "text-primary scale-110" : "text-muted-foreground"
                          )} 
                          strokeWidth={isActive || isMenuOpen ? 2.5 : 2} 
                        />
                        <span className={cn(
                          "text-[10px] sm:text-xs font-medium tracking-tight truncate max-w-full text-center mt-0.5 transition-colors",
                          (isActive || isMenuOpen) ? "text-primary font-bold" : "text-muted-foreground"
                        )}>
                          {item.label}
                        </span>
                      </div>
                    </a>
                  </PopoverTrigger>

                  {/* Upward Popover Content for Project Ideas */}
                  <PopoverContent 
                    side="top" 
                    align="start" 
                    sideOffset={14}
                    dir="rtl"
                    className="z-[110] w-[calc(100vw-1.5rem)] max-w-xl rounded-2xl border-0 bg-background/98 p-3 sm:p-4 shadow-2xl ring-1 ring-foreground/10"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/40 px-1">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400">
                          <Lightbulb className="size-3.5" strokeWidth={2.5} />
                        </div>
                        <span className="text-xs font-bold text-foreground">استكشاف أفكار المشاريع</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">اختر المسار للاستكشاف</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {projectIdeasOptions.map((opt) => {
                        const isOptActive = activeTab === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleSelectOption(opt.id)}
                            className={cn(
                              "flex items-center gap-2.5 p-2.5 rounded-xl border-0 text-right transition-all duration-200 active:scale-[0.98] cursor-pointer",
                              isOptActive 
                                ? "bg-primary text-primary-foreground font-bold shadow-sm" 
                                : "bg-card/90 hover:bg-accent/70 text-foreground shadow-2xs"
                            )}
                          >
                            <div className={cn(
                              "flex size-8 shrink-0 items-center justify-center rounded-lg",
                              isOptActive ? "bg-primary-foreground/15 text-primary-foreground" : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
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
                  </PopoverContent>
                </Popover>
              );
            }

            // Standard Navigation Items
            return (
              <a
                key={item.id}
                id={`tour-mobile-${item.id}`}
                href={getTabPath(item.id)}
                onClick={handleClick}
                className="flex flex-col items-center justify-center gap-0.5 min-h-[48px] w-full touch-manipulation transition-colors px-1 cursor-pointer rounded-xl"
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
    </>
  );
};

