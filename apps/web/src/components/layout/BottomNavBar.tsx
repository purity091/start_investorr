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
    <div 
      id="tour-mobile-bottom-nav" 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] w-full border-t border-border/40 bg-background/85 backdrop-blur-xl pb-[max(env(safe-area-inset-bottom),0.5rem)]"
    >
      <div className="flex h-16 items-center justify-around px-2 max-w-md mx-auto relative">
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
                className="relative -top-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background transition-transform active:scale-95 touch-manipulation"
                aria-label={item.label}
              >
                <item.icon size={26} strokeWidth={2.5} />
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
              className="flex flex-1 flex-col items-center justify-center gap-1 min-h-[48px] touch-manipulation transition-colors"
              aria-label={item.label}
            >
              <div 
                className={`flex flex-col items-center justify-center transition-all duration-200 ${
                  isActive ? 'text-primary scale-110' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 2} 
                  className="mb-1"
                />
                <span className="text-[10px] font-medium tracking-tight">
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
