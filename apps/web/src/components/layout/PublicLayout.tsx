'use client';

import React from 'react';
import Link from 'next/link';
import { LandingNavbar } from '@/components/layout/LandingNavbar';
import { BottomNavBar } from '@/components/layout/BottomNavBar';
import { useAuth } from '@/features/auth/AuthContext';

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div dir="rtl" className={`min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 flex flex-col ${user ? 'pb-16 lg:pb-0' : ''}`}>
      {/* Header Navigation */}
      <LandingNavbar />

      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-muted/30 text-muted-foreground py-3 sm:py-4 relative overflow-hidden mt-auto">
        <div className="container mx-auto px-4 relative z-10">
          {/* Upper Footer Grid for Public Pages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-3 pb-3 border-b border-border/60">
            {/* Brand Intro Column */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center justify-center size-9 rounded-xl bg-primary text-primary-foreground font-black text-base shadow-xs">
                  خ
                </div>
                <span className="text-xl font-black tracking-tight text-foreground">
                  خطة<span className="text-primary">.</span>
                </span>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xs">
                المنصة العربية الأولى لبناء وتوثيق نماذج العمل التجاري ودراسة قطاعات السوق وفق المنهجيات الريادية العالمية.
              </p>
            </div>

            {/* Column 1: المنتج والخيارات */}
            <div>
              <h4 className="text-foreground font-black text-xs sm:text-sm mb-3 tracking-tight">المنتج والخيارات</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/pricing" className="text-foreground/85 hover:text-primary transition-colors font-bold hover:underline underline-offset-4">
                    الأسعار
                  </Link>
                </li>
                <li>
                  <Link href="/market-discovery" className="text-foreground/75 hover:text-primary transition-colors font-medium hover:underline underline-offset-4">
                    استكشاف قطاعات السوق
                  </Link>
                </li>
                <li>
                  <Link href="/saas-ideas" className="text-foreground/75 hover:text-primary transition-colors font-medium hover:underline underline-offset-4">
                    أفكار مشاريع SaaS
                  </Link>
                </li>
                <li>
                  <Link href="/micro-saas-ideas" className="text-foreground/75 hover:text-primary transition-colors font-medium hover:underline underline-offset-4">
                    أفكار Micro-SaaS
                  </Link>
                </li>
                <li>
                  <Link href="/proven-projects" className="text-foreground/75 hover:text-primary transition-colors font-medium hover:underline underline-offset-4">
                    أفكار شركات ناجحة
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: المصادر والأكاديمية */}
            <div>
              <h4 className="text-foreground font-black text-xs sm:text-sm mb-3 tracking-tight">المصادر والأكاديمية</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/platform-academy" className="text-foreground/75 hover:text-primary transition-colors font-medium hover:underline underline-offset-4">
                    أكاديمية خطة والمفاهيم
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="text-foreground/85 hover:text-primary transition-colors font-bold hover:underline underline-offset-4">
                    سجل التحديثات
                  </Link>
                </li>
                <li>
                  <Link href="/failed-projects" className="text-foreground/75 hover:text-primary transition-colors font-medium hover:underline underline-offset-4">
                    تحليل الشركات التي فشلت
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="text-foreground/75 hover:text-primary transition-colors font-medium hover:underline underline-offset-4">
                    الأسئلة الشائعة
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: الشركة والخصوصية */}
            <div>
              <h4 className="text-foreground font-black text-xs sm:text-sm mb-3 tracking-tight">الشركة والخصوصية</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/about" className="text-foreground/75 hover:text-primary transition-colors font-medium hover:underline underline-offset-4">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="text-foreground/75 hover:text-primary transition-colors font-medium hover:underline underline-offset-4">
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-foreground/75 hover:text-primary transition-colors font-medium hover:underline underline-offset-4">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-foreground/75 hover:text-primary transition-colors font-medium hover:underline underline-offset-4">
                    شروط الاستخدام
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar Footer Section: Single Line Right & Left (Compact & Lightweight) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 w-full text-[11px] sm:text-xs text-muted-foreground font-normal" dir="rtl">
            {/* Right: Copyright */}
            <p dir="rtl" className="flex items-center gap-1 shrink-0 text-center sm:text-right whitespace-nowrap">
              <span>© {new Date().getFullYear()}</span>
              <span className="font-bold text-foreground">منصة خطة</span>.
              <span>جميع الحقوق محفوظة.</span>
            </p>

            {/* Left: Legal Policy Links Inline */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 text-[11px] whitespace-nowrap">
              <Link href="/privacy" className="text-foreground/75 hover:text-primary transition-colors font-medium hover:underline underline-offset-4">سياسة الخصوصية وحماية البيانات</Link>
              <span className="text-border/80">•</span>
              <Link href="/terms" className="text-foreground/75 hover:text-primary transition-colors font-medium hover:underline underline-offset-4">شروط وأحكام الخدمة</Link>
              <span className="text-border/80">•</span>
              <Link href="/refund-policy" className="text-foreground/75 hover:text-primary transition-colors font-medium hover:underline underline-offset-4">سياسة الاسترجاع والإلغاء</Link>
              <span className="text-border/80">•</span>
              <Link href="/fulfillment-policy" className="text-foreground/75 hover:text-primary transition-colors font-medium hover:underline underline-offset-4">سياسة التسليم وتوفير الخدمة</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Render BottomNavBar when user is logged in */}
      {user && <BottomNavBar activeTab="" />}
    </div>
  );
};
