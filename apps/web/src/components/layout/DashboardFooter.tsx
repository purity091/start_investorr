import React from 'react';
import Link from 'next/link';

interface DashboardFooterProps {
  setActiveTab?: (tab: string) => void;
}

const internalLinks = new Set(['my-plans', 'market-discovery', 'proven-projects', 'platform-academy']);

export const DashboardFooter: React.FC<DashboardFooterProps> = ({ setActiveTab }) => {
  const handleInternalNav = (e: React.MouseEvent, tab: string) => {
    if (!setActiveTab || !internalLinks.has(tab)) return;

    e.preventDefault();
    setActiveTab(tab);
  };

  return (
    <footer className="mt-auto border-t border-border/60 bg-card/60 backdrop-blur-xs py-3 px-4 sm:px-6 text-xs text-muted-foreground transition-all">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-medium">
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-extrabold text-foreground tracking-tight">
            خطة<span className="text-primary">.</span>
          </span>
          <span className="text-border">|</span>
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة.</p>
        </div>

        <nav className="flex items-center flex-wrap justify-center gap-x-4 gap-y-1.5 text-muted-foreground">
          <Link
            href="/my-plans"
            onClick={(e) => handleInternalNav(e, 'my-plans')}
            className="hover:text-primary transition-colors text-xs font-semibold"
          >
            مشاريعي
          </Link>
          <span className="text-border/60 text-[10px]">•</span>
          <Link
            href="/market-discovery"
            onClick={(e) => handleInternalNav(e, 'market-discovery')}
            className="hover:text-primary transition-colors text-xs"
          >
            استكشاف القطاعات
          </Link>
          <span className="text-border/60 text-[10px]">•</span>
          <Link
            href="/proven-projects"
            onClick={(e) => handleInternalNav(e, 'proven-projects')}
            className="hover:text-primary transition-colors text-xs"
          >
            شركات ناجحة
          </Link>
          <span className="text-border/60 text-[10px]">•</span>
          <Link
            href="/platform-academy"
            onClick={(e) => handleInternalNav(e, 'platform-academy')}
            className="hover:text-primary transition-colors text-xs"
          >
            الأكاديمية
          </Link>
          <span className="text-border/60 text-[10px]">•</span>
          <Link href="/pricing-plans" className="hover:text-primary transition-colors text-xs">
            الأسعار
          </Link>
          <span className="text-border/60 text-[10px]">•</span>
          <Link href="/faq" className="hover:text-primary transition-colors text-xs">
            الأسئلة الشائعة
          </Link>
          <span className="text-border/60 text-[10px]">•</span>
          <Link href="/privacy" className="hover:text-primary transition-colors text-xs">
            الخصوصية
          </Link>
          <span className="text-border/60 text-[10px]">•</span>
          <Link href="/terms" className="hover:text-primary transition-colors text-xs">
            الشروط
          </Link>
          <span className="text-border/60 text-[10px]">•</span>
          <Link href="/refund-policy" className="hover:text-primary transition-colors text-xs">
            الاسترجاع
          </Link>
          <span className="text-border/60 text-[10px]">•</span>
          <Link href="/fulfillment-policy" className="hover:text-primary transition-colors text-xs">
            التسليم
          </Link>
        </nav>
      </div>
    </footer>
  );
};
