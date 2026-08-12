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
      <footer className="border-t border-border/60 bg-muted/30 text-muted-foreground py-10 md:py-12 relative overflow-hidden mt-auto">
        <div className="container mx-auto px-4 relative z-10">
          
          {/* Upper Footer Grid: Product, Sectors, Resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 mb-10">
            
            {/* Brand Intro Column */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center justify-center size-9 rounded-xl bg-primary text-primary-foreground font-black text-base shadow-xs">
                  خ
                </div>
                <span className="text-xl font-black tracking-tight text-foreground">خطة<span className="text-primary">.</span></span>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xs">
                منظومة التخطيط والتحليل الاستثماري الذكي. نقدم أدوات تعتمد على الذكاء الاصطناعي لتوليد نماذج العمل ودراسة القطاعات بالكامل.
              </p>
            </div>

            {/* Column 1: Product & Tools */}
            <div>
              <h4 className="text-foreground font-bold text-xs sm:text-sm mb-3">المنتج والأدوات</h4>
              <ul className="space-y-2 text-xs sm:text-sm font-medium">
                <li><Link href="/features" className="text-muted-foreground hover:text-primary transition-colors">المميزات الرئيسية</Link></li>
                <li><Link href="/#features" className="text-muted-foreground hover:text-primary transition-colors">مولد نموذج العمل (BMC)</Link></li>
                <li><Link href="/#calculator" className="text-muted-foreground hover:text-primary transition-colors">حاسبة الإيرادات SaaS</Link></li>
                <li><Link href="/pricing-plans" className="text-muted-foreground hover:text-primary transition-colors">الأسعار والاشتراكات</Link></li>
              </ul>
            </div>

            {/* Column 2: Sectors & Databases */}
            <div>
              <h4 className="text-foreground font-bold text-xs sm:text-sm mb-3">القطاعات والدراسات</h4>
              <ul className="space-y-2 text-xs sm:text-sm font-medium">
                <li><Link href="/market-discovery" className="text-muted-foreground hover:text-primary transition-colors">رادار استكشاف القطاعات</Link></li>
                <li><Link href="/saas-ideas" className="text-muted-foreground hover:text-primary transition-colors">أفكار مشاريع SaaS</Link></li>
                <li><Link href="/micro-saas-ideas" className="text-muted-foreground hover:text-primary transition-colors">أفكار Micro-SaaS</Link></li>
                <li><Link href="/proven-projects" className="text-muted-foreground hover:text-primary transition-colors">دراسات حالة الشركات</Link></li>
              </ul>
            </div>

            {/* Column 3: Platform Resources */}
            <div>
              <h4 className="text-foreground font-bold text-xs sm:text-sm mb-3">المصادر والمنصة</h4>
              <ul className="space-y-2 text-xs sm:text-sm font-medium">
                <li><Link href="/platform-academy" className="text-muted-foreground hover:text-primary transition-colors">أكاديمية خطة</Link></li>
                <li><Link href="/changelog" className="text-muted-foreground hover:text-primary transition-colors">سجل التحديثات</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">عن منصة خطة</Link></li>
                <li><Link href="/contact-us" className="text-muted-foreground hover:text-primary transition-colors">الدعم والتواصل</Link></li>
              </ul>
            </div>
            
          </div>

          {/* Bottom Bar Footer Section: Single Line Right & Left */}
          <div className="pt-6 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4 w-full text-xs font-medium text-muted-foreground" dir="rtl">
            
            {/* Right: Copyright */}
            <p dir="rtl" className="flex items-center gap-1.5 shrink-0 text-center sm:text-right">
              <span>© {new Date().getFullYear()}</span>
              <span className="font-extrabold text-foreground">منصة خطة</span>.
              <span>جميع الحقوق محفوظة.</span>
            </p>

            {/* Left: Legal Policy Links Inline */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 text-[11px] sm:text-xs">
              <Link href="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية وحماية البيانات</Link>
              <span className="text-border/80">•</span>
              <Link href="/terms" className="hover:text-primary transition-colors">شروط وأحكام الخدمة</Link>
              <span className="text-border/80">•</span>
              <Link href="/refund-policy" className="hover:text-primary transition-colors">سياسة الاسترجاع والإلغاء</Link>
              <span className="text-border/80">•</span>
              <Link href="/fulfillment-policy" className="hover:text-primary transition-colors">سياسة التسليم وتوفير الخدمة</Link>
            </div>

          </div>

        </div>
      </footer>

      {/* Render BottomNavBar when user is logged in */}
      {user && <BottomNavBar activeTab="" />}
    </div>
  );
};
