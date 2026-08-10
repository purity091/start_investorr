import React from 'react';
import { 
  Plus, 
  Layers,
  Globe,
  AlertCircle,
  LayoutDashboard
} from 'lucide-react';
import { getTabPath } from '../../utils/routes';

interface BottomNavBarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  onMenuClick?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'market-discovery', icon: Globe, label: 'قطاعات السوق' },
    { id: 'workspace', icon: LayoutDashboard, label: 'المساحة' },
    { id: 'new-plan', icon: Plus, label: 'مشروع جديد', isCenter: true },
    { id: 'my-plans', icon: Layers, label: 'مشاريعي' },
    { id: 'problem-engine', icon: AlertCircle, label: 'الفرص والمشاكل' },
  ];

  return (
    <div 
      id="tour-mobile-bottom-nav" 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] w-full border-t border-border/40 bg-background/90 backdrop-blur-xl pb-[max(env(safe-area-inset-bottom),0.5rem)]"
    >
      <div className="grid grid-cols-5 h-16 items-center w-full max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-6 relative">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          const handleClick = () => {
            setActiveTab(item.id);
          };

          if (item.isCenter) {
            return (
              <div key={item.id} className="flex items-center justify-center relative h-full">
                <a
                  id={`tour-mobile-${item.id}`}
                  href={getTabPath(item.id)}
                  onClick={(event) => {
                    event.preventDefault();
                    handleClick();
                  }}
                  className="absolute -top-5 sm:-top-6 flex h-13 w-13 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background transition-transform active:scale-95 touch-manipulation hover:bg-primary/90"
                  aria-label={item.label}
                  title={item.label}
                >
                  <item.icon className="size-6 sm:size-7" strokeWidth={2.5} />
                </a>
              </div>
            );
          }

          return (
            <a
              key={item.id}
              id={`tour-mobile-${item.id}`}
              href={getTabPath(item.id)}
              onClick={(event) => {
                event.preventDefault();
                handleClick();
              }}
              className="flex flex-col items-center justify-center gap-0.5 min-h-[48px] w-full touch-manipulation transition-colors px-1"
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
  );
};
