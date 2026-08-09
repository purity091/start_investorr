import React from 'react';
import Link from 'next/link';

interface DashboardFooterProps {
  setActiveTab?: (tab: string) => void;
}

export const DashboardFooter: React.FC<DashboardFooterProps> = ({ setActiveTab }) => {
  const handleNav = (e: React.MouseEvent, tab: string) => {
    if (setActiveTab) {
      e.preventDefault();
      setActiveTab(tab);
    }
  };

  return (
    <footer className="mt-auto border-t border-border/60 bg-card/60 backdrop-blur-xs py-3 px-4 sm:px-6 text-xs text-muted-foreground transition-all">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-medium">
        
        {/* Right side: Copyright & Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-extrabold text-foreground tracking-tight">خطة<span className="text-primary">.</span></span>
          <span className="text-border">|</span>
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة.</p>
        </div>

        {/* Center / Left side: Important Pages (One Line) */}
        <nav className="flex items-center flex-wrap justify-center gap-x-4 gap-y-1.5 text-muted-foreground">
          <a
            href="/my-projects"
            onClick={(e) => handleNav(e, 'my-projects')}
            className="hover:text-primary transition-colors text-xs font-semibold"
          >
            مشاريعي
          </a>
          <span className="text-border/60 text-[10px]">•</span>
          <a
            href="/market-discovery"
            onClick={(e) => handleNav(e, 'market-discovery')}
            className="hover:text-primary transition-colors text-xs"
          >
            استكشاف القطاعات
          </a>
          <span className="text-border/60 text-[10px]">•</span>
          <a
            href="/proven-projects"
            onClick={(e) => handleNav(e, 'proven-projects')}
            className="hover:text-primary transition-colors text-xs"
          >
            شركات ناجحة
          </a>
          <span className="text-border/60 text-[10px]">•</span>
          <a
            href="/platform-academy"
            onClick={(e) => handleNav(e, 'platform-academy')}
            className="hover:text-primary transition-colors text-xs"
          >
            الأكاديمية
          </a>
          <span className="text-border/60 text-[10px]">•</span>
          <a
            href="/pricing-plans"
            onClick={(e) => handleNav(e, 'pricing-plans')}
            className="hover:text-primary transition-colors text-xs"
          >
            الأسعار
          </a>
          <span className="text-border/60 text-[10px]">•</span>
          <a
            href="/faq"
            onClick={(e) => handleNav(e, 'faq')}
            className="hover:text-primary transition-colors text-xs"
          >
            الأسئلة الشائعة
          </a>
          <span className="text-border/60 text-[10px]">•</span>
          <a
            href="/privacy"
            onClick={(e) => handleNav(e, 'privacy')}
            className="hover:text-primary transition-colors text-xs"
          >
            الخصوصية
          </a>
          <span className="text-border/60 text-[10px]">•</span>
          <a
            href="/terms"
            onClick={(e) => handleNav(e, 'terms')}
            className="hover:text-primary transition-colors text-xs"
          >
            الشروط
          </a>
          <span className="text-border/60 text-[10px]">•</span>
          <Link
            href="/refund-policy"
            className="hover:text-primary transition-colors text-xs"
          >
            الاسترجاع
          </Link>
          <span className="text-border/60 text-[10px]">•</span>
          <Link
            href="/fulfillment-policy"
            className="hover:text-primary transition-colors text-xs"
          >
            التسليم
          </Link>
        </nav>

      </div>
    </footer>
  );
};
