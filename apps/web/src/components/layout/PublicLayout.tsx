import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 flex flex-col">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black text-primary">خطة<span className="text-foreground">.</span></Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">من نحن</Link>
            <Link href="/contact-us" className="text-muted-foreground hover:text-foreground transition-colors">اتصل بنا</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">شروط الاستخدام</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">تسجيل الدخول</Button>
            </Link>
            <Link href="/home">
              <Button className="gap-2">
                ابدأ رحلتك الآن
                <ArrowLeft className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-slate-950 text-slate-300 py-16 md:py-24 relative overflow-hidden mt-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-full max-w-3xl h-48 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
            
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground font-black text-lg shadow-lg shadow-primary/20">
                  L
                </div>
                <span className="text-2xl font-black tracking-tight text-white">خطة<span className="text-primary">.</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-8">
                الجيل الجديد من دراسات الجدوى. نقدم أدوات ذكية تعتمد على الذكاء الاصطناعي لتحويل أفكارك إلى خطط تنفيذية ونماذج عمل قابلة للنجاح والاستثمار.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">المنتج</h4>
              <ul className="space-y-4">
                <li><Link href="/market-discovery" className="text-slate-400 hover:text-primary transition-colors text-sm">استكشاف السوق</Link></li>
                <li><Link href="/problem-engine" className="text-slate-400 hover:text-primary transition-colors text-sm">محرك المشكلات</Link></li>
                <li><Link href="/brand-identity" className="text-slate-400 hover:text-primary transition-colors text-sm">بناء الهوية البصرية</Link></li>
                <li><Link href="/unicorn-benchmark" className="text-slate-400 hover:text-primary transition-colors text-sm">رادار اليونيكورن</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">المصادر</h4>
              <ul className="space-y-4">
                <li><Link href="/saas-ideas" className="text-slate-400 hover:text-primary transition-colors text-sm">أفكار مشاريع SaaS</Link></li>
                <li><Link href="/micro-saas-ideas" className="text-slate-400 hover:text-primary transition-colors text-sm">أفكار Micro-SaaS</Link></li>
                <li><Link href="/proven-projects" className="text-slate-400 hover:text-primary transition-colors text-sm">مشاريع أثبتت نجاحها</Link></li>
                <li><Link href="/failed-projects" className="text-slate-400 hover:text-primary transition-colors text-sm">تفكيك مشاريع فشلت</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">الشركة</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-slate-400 hover:text-primary transition-colors text-sm">من نحن</Link></li>
                <li><Link href="/contact-us" className="text-slate-400 hover:text-primary transition-colors text-sm">اتصل بنا</Link></li>
                <li><Link href="/privacy" className="text-slate-400 hover:text-primary transition-colors text-sm">سياسة الخصوصية</Link></li>
                <li><Link href="/terms" className="text-slate-400 hover:text-primary transition-colors text-sm">شروط الاستخدام</Link></li>
              </ul>
            </div>
            
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} منصة خطة. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
                </span>
                الأنظمة تعمل بكفاءة
              </span>
              <span>تطوير بحب في العالم العربي</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
