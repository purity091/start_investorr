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

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, setActiveTab, onMenuClick }) => {
  const navItems = [
    { id: 'market-discovery', icon: Globe, label: 'استكشاف السوق' },
    { id: 'workspace', icon: LayoutDashboard, label: 'المساحة' },
    { id: 'new-plan', icon: Plus, label: 'خلق فكرة', isCenter: true },
    { id: 'my-plans', icon: Layers, label: 'مشاريعي' },
    { id: 'problem-engine', icon: AlertCircle, label: 'الفرص والمشاكل' },
  ];

  return (
    <div id="tour-mobile-bottom-nav" className="lg:hidden fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] sm:w-[92%] max-w-[400px] sm:max-w-[440px] pb-[env(safe-area-inset-bottom)]">
      <div className="rounded-[2rem] border border-border bg-background p-1.5 sm:p-2 shadow-sm ring-1 ring-border/60 flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          const handleClick = () => {
            setActiveTab(item.id);
          };

          if (item.isCenter) {
            return (
              <a
                key={item.id}
                id={`tour-mobile-${item.id}`}
                href={getTabPath(item.id)}
                onClick={(event) => {
                  event.preventDefault();
                  handleClick();
                }}
                className="relative -top-4 sm:-top-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-border bg-primary text-primary-foreground shadow-sm transition-colors touch-manipulation hover:bg-primary/95"
                aria-label={item.label}
              >
                <item.icon size={22} className="sm:w-6 sm:h-6" />
              </a>
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
              className={`flex min-h-[48px] flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 sm:gap-1 sm:px-2 sm:py-2 transition-colors touch-manipulation ${isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'}`}
              aria-label={item.label}
            >
              <div className={`rounded-lg p-1.5 sm:p-2 ${isActive ? 'bg-background ring-1 ring-border' : ''}`}>
                <item.icon size={18} strokeWidth={2} className="w-5 h-5 sm:w-5 sm:h-5" />
              </div>
              <span className={`text-[8px] sm:text-[9px] font-semibold tracking-tight ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
