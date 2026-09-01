import React from 'react';
import Link from 'next/link';
import { getTabPath } from '../../utils/routes';

interface DashboardFooterProps {
  setActiveTab?: (tab: string) => void;
}

const internalLinks = new Set(['platform-academy']);

export const DashboardFooter: React.FC<DashboardFooterProps> = ({ setActiveTab }) => {
  const handleInternalNav = (e: React.MouseEvent, tab: string) => {
    if (!setActiveTab || !internalLinks.has(tab)) return;

    e.preventDefault();
    setActiveTab(tab);
  };

  return (
    <footer className="relative block w-full mt-3 border-t border-border/60 bg-card py-2 px-3 sm:px-6 lg:px-8 text-[11px] text-muted-foreground/80 font-normal">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={getTabPath('home')}
            onClick={(e) => {
              if (setActiveTab) {
                e.preventDefault();
                setActiveTab('home');
              }
            }}
            className="font-extrabold text-foreground tracking-tight hover:text-primary transition-colors cursor-pointer"
            title="الانتقال إلى الرئيسية"
          >
            خطة<span className="text-primary">.</span>
          </a>
          <span className="text-border">|</span>
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة.</p>
        </div>

        <nav className="flex items-center flex-wrap justify-center gap-x-3.5 gap-y-1 text-muted-foreground">
          <Link
            href="/platform-academy"
            onClick={(e) => handleInternalNav(e, 'platform-academy')}
            className="text-foreground/80 hover:text-primary transition-colors font-medium hover:underline underline-offset-4 text-xs"
          >
            الأكاديمية
          </Link>
          <span className="text-border/80 text-[10px]">•</span>
          <Link href="/changelog" className="text-foreground/90 hover:text-primary transition-colors font-bold hover:underline underline-offset-4 text-xs">
            سجل التغييرات
          </Link>
          <span className="text-border/80 text-[10px]">•</span>
          <Link href="/pricing" className="text-foreground/90 hover:text-primary transition-colors font-bold hover:underline underline-offset-4 text-xs">
            الأسعار
          </Link>
          <span className="text-border/80 text-[10px]">•</span>
          <Link href="/faq" className="text-foreground/80 hover:text-primary transition-colors font-medium hover:underline underline-offset-4 text-xs">
            الأسئلة الشائعة
          </Link>
          <span className="text-border/80 text-[10px]">•</span>
          <Link href="/privacy" className="text-foreground/80 hover:text-primary transition-colors font-medium hover:underline underline-offset-4 text-xs">
            الخصوصية
          </Link>
          <span className="text-border/80 text-[10px]">•</span>
          <Link href="/terms" className="text-foreground/80 hover:text-primary transition-colors font-medium hover:underline underline-offset-4 text-xs">
            الشروط
          </Link>
          <span className="text-border/80 text-[10px]">•</span>
          <Link href="/refund-policy" className="text-foreground/80 hover:text-primary transition-colors font-medium hover:underline underline-offset-4 text-xs">
            الاسترجاع
          </Link>
          <span className="text-border/80 text-[10px]">•</span>
          <Link href="/fulfillment-policy" className="text-foreground/80 hover:text-primary transition-colors font-medium hover:underline underline-offset-4 text-xs">
            التسليم
          </Link>
        </nav>
      </div>
    </footer>
  );
};
