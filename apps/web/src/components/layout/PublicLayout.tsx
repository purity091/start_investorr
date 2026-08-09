import React from 'react';
import Link from 'next/link';
import { LandingNavbar } from '@/components/layout/LandingNavbar';

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 flex flex-col">
      {/* Header Navigation */}
      <LandingNavbar />

      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-muted/30 text-muted-foreground py-10 md:py-12 relative overflow-hidden mt-auto">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 mb-8">
            
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center size-9 rounded-xl bg-primary text-primary-foreground font-black text-base shadow-xs">
                  خ
                </div>
                <span className="text-xl font-black tracking-tight text-foreground">خطة<span className="text-primary">.</span></span>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xs mb-4">
                الجيل الجديد من دراسات الجدوى. نقدم أدوات ذكية تعتمد على الذكاء الاصطناعي لتحويل أفكارك إلى خطط تنفيذية ونماذج عمل قابلة للنجاح والاستثمار.
              </p>
            </div>

            <div>
              <h4 className="text-foreground font-bold text-xs sm:text-sm mb-3">المنصة والحلول</h4>
              <ul className="space-y-2 text-xs sm:text-sm font-medium">
                <li><Link href="/features" className="text-muted-foreground hover:text-primary transition-colors">المميزات الرئيسية</Link></li>
                <li><Link href="/pricing-plans" className="text-muted-foreground hover:text-primary transition-colors">خطط الأسعار</Link></li>
                <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">الأسئلة الشائعة</Link></li>
                <li><Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">إنشاء حساب جديد</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-bold text-xs sm:text-sm mb-3">المصادر والأكاديمية</h4>
              <ul className="space-y-2 text-xs sm:text-sm font-medium">
                <li><Link href="/platform-academy" className="text-muted-foreground hover:text-primary transition-colors">أكاديمية خطة</Link></li>
                <li><Link href="/changelog" className="text-muted-foreground hover:text-primary transition-colors">سجل الإصدارات والتحديثات</Link></li>
                <li><Link href="/contact-us" className="text-muted-foreground hover:text-primary transition-colors">الدعم والمساعدة</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">عن منصة خطة</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-bold text-xs sm:text-sm mb-3">السياسات والحقوق القانونية</h4>
              <ul className="space-y-2 text-xs sm:text-sm font-medium">
                <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">سياسة الخصوصية وحماية البيانات</Link></li>
                <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">شروط وأحكام الخدمة</Link></li>
                <li><Link href="/refund-policy" className="text-muted-foreground hover:text-primary transition-colors">سياسة الاسترجاع والإلغاء</Link></li>
                <li><Link href="/fulfillment-policy" className="text-muted-foreground hover:text-primary transition-colors">سياسة التسليم وتوفير الخدمة</Link></li>
              </ul>
            </div>
            
          </div>

          {/* Bottom Bar Footer Section - Centered & Compact RTL */}
          <div className="pt-6 border-t border-border/60 flex items-center justify-center text-center w-full" dir="rtl">
            <p dir="rtl" className="text-xs sm:text-sm text-muted-foreground font-medium text-center flex flex-wrap items-center justify-center gap-1.5">
              <span>© {new Date().getFullYear()}</span>
              <span className="font-extrabold text-foreground">منصة خطة</span>.
              <span>جميع الحقوق محفوظة.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
