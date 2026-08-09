import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Sparkles } from 'lucide-react';
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
        <footer className="border-t border-border/60 bg-muted/30 text-muted-foreground py-16 md:py-20 relative overflow-hidden mt-auto">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-14">
              
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center justify-center size-10 rounded-xl bg-primary text-primary-foreground font-black text-lg shadow-xs">
                    خ
                  </div>
                  <span className="text-2xl font-black tracking-tight text-foreground">خطة<span className="text-primary">.</span></span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
                  الجيل الجديد من دراسات الجدوى. نقدم أدوات ذكية تعتمد على الذكاء الاصطناعي لتحويل أفكارك إلى خطط تنفيذية ونماذج عمل قابلة للنجاح والاستثمار.
                </p>
              </div>

              <div>
                <h4 className="text-foreground font-bold text-sm mb-4">المنصة والحلول</h4>
                <ul className="space-y-3">
                  <li><Link href="/features" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">المميزات الرئيسية</Link></li>
                  <li><Link href="/pricing-plans" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">خطط الأسعار</Link></li>
                  <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">الأسئلة الشائعة</Link></li>
                  <li><Link href="/login" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">إنشاء حساب جديد</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-foreground font-bold text-sm mb-4">المصادر والأكاديمية</h4>
                <ul className="space-y-3">
                  <li><Link href="/platform-academy" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">أكاديمية خطة</Link></li>
                  <li><Link href="/changelog" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">سجل الإصدارات والتحديثات</Link></li>
                  <li><Link href="/contact-us" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">الدعم والمساعدة</Link></li>
                  <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">عن منصة خطة</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-foreground font-bold text-sm mb-4">السياسات والامتثال القانوني (Stripe)</h4>
                <ul className="space-y-3">
                  <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">سياسة الخصوصية وحماية البيانات</Link></li>
                  <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">شروط وأحكام الخدمة</Link></li>
                  <li><Link href="/refund-policy" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">سياسة الاسترجاع والإلغاء</Link></li>
                  <li><Link href="/fulfillment-policy" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">سياسة التسليم وتوفير الخدمة</Link></li>
                </ul>
              </div>
              
              
            </div>

            <div className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-muted-foreground text-sm font-medium">
                © {new Date().getFullYear()} منصة خطة. جميع الحقوق محفوظة.
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
                <span className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
                  </span>
                  الأنظمة تعمل بكفاءة عالية
                </span>
                <span>تطوير بحب للمستثمرين في العالم العربي</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
};
