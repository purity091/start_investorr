"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { 
  ArrowLeft, 
  BarChart3, 
  BrainCircuit, 
  CheckCircle2, 
  Compass, 
  Layers, 
  Lightbulb, 
  Rocket, 
  Target, 
  TrendingUp,
  ShieldCheck,
  Zap,
  Sparkles,
  Palette
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';

export default function LandingPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-black text-primary">خطة<span className="text-foreground">.</span></div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">المميزات</a>
            <a href="#methodologies" className="text-muted-foreground hover:text-foreground transition-colors">المنهجيات</a>
            <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">الأمان</a>
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

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="container relative mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 border-primary/20 hover:bg-primary/20 transition-colors">
              <Sparkles className="size-4 ml-2 inline-block text-amber-500" />
              الجيل الجديد من منصات بناء المشاريع
            </Badge>
            <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15]">
              حوّل فكرتك الطموحة إلى <span className="text-primary">مشروع حقيقي</span> قابل للنمو
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              منصة متكاملة تساعدك على دراسة السوق، بناء نموذج العمل التجاري، واختبار الفرضيات باستخدام أقوى المنهجيات العالمية مثل Lean Startup و MIT 24 Steps.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/home">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 h-12 gap-2">
                  ابدأ بناء مشروعك مجاناً
                  <Rocket className="size-4" />
                </Button>
              </Link>
              <Link href="/market-discovery">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 h-12 gap-2">
                  <Compass className="size-4" />
                  استكشف الفرص والسوق
                </Button>
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-16 pt-8 border-t border-border/50">
              <p className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">مبني على أسس ومنهجيات عالمية</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale">
                <div className="flex items-center gap-2 font-bold text-xl"><Layers className="size-6"/> Business Model Canvas</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Zap className="size-6"/> Lean Startup</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Target className="size-6"/> MIT 24 Steps</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-black text-foreground sm:text-4xl">كل ما تحتاجه لإطلاق مشروعك</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                أدوات ذكية متكاملة ترافقك من لحظة الإلهام وحتى كتابة الخطة التنفيذية الجاهزة للمستثمرين.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'استكشاف السوق الذكي',
                  description: 'تصفح أكثر من 100 قطاع وسوق. اكتشف الاتجاهات، وحجم الفرص، والتحديات في ثوانٍ.',
                  icon: Compass,
                  color: 'text-blue-500',
                  bg: 'bg-blue-500/10'
                },
                {
                  title: 'محرك المشكلات والفرص',
                  description: 'لا تبحث عن أفكار، ابحث عن مشاكل حقيقية. محرك مخصص لتحويل الآلام في السوق لفرص.',
                  icon: Target,
                  color: 'text-amber-500',
                  bg: 'bg-amber-500/10'
                },
                {
                  title: 'نماذج عمل احترافية',
                  description: 'ابنِ نموذج العمل الخاص بك (BMC) بواجهة تفاعلية سهلة الاستخدام ومترابطة.',
                  icon: Layers,
                  color: 'text-emerald-500',
                  bg: 'bg-emerald-500/10'
                },
                {
                  title: 'رادار اليونيكورن',
                  description: 'قارن مشروعك الناشئ بمقاييس ومسارات نمو الشركات المليارية لتتأكد من قوتك.',
                  icon: BarChart3,
                  color: 'text-purple-500',
                  bg: 'bg-purple-500/10'
                },
                {
                  title: 'بناء الهوية البصرية',
                  description: 'حدد نبرة صوت علامتك التجارية واصنع دليلاً بصرياً متكاملاً (Brand Book) بضغطة زر.',
                  icon: Palette,
                  color: 'text-pink-500',
                  bg: 'bg-pink-500/10'
                },
                {
                  title: 'تقييم الذكاء الاصطناعي',
                  description: 'احصل على تحليل فوري لخطتك، وتقييم الجاهزية ونسب التنفيذ لتكون مستعداً للمستثمر.',
                  icon: BrainCircuit,
                  color: 'text-primary',
                  bg: 'bg-primary/10'
                }
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <Card key={i} className="border-border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className={`size-12 rounded-lg flex items-center justify-center mb-6 ${feature.bg}`}>
                        <Icon className={`size-6 ${feature.color}`} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Security & RLS Section */}
        <section id="security" className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-2">
                <div className="p-10 md:p-16 flex flex-col justify-center">
                  <Badge variant="outline" className="w-fit mb-6 text-emerald-400 border-emerald-400/30 bg-emerald-400/10">أمان من الدرجة الأولى</Badge>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
                    بياناتك ومشاريعك في أمان تام ومحفوظة سحابياً
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    نستخدم أحدث تقنيات قواعد البيانات مع تفعيل سياسات الأمان على مستوى الصف (Row Level Security). لا أحد يستطيع رؤية مشاريعك أو أفكارك سواك، حتى نحن!
                  </p>
                  <ul className="space-y-4">
                    {[
                      'تشفير كامل للبيانات وحفظ سحابي فوري.',
                      'إمكانية إنشاء رابط مشاركة (Public Link) للمستثمرين فقط عند رغبتك.',
                      'لوحة تحكم كاملة بحسابك واشتراكك.'
                    ].map((point, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative bg-slate-800/50 p-10 flex items-center justify-center overflow-hidden border-r border-slate-800">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0,transparent_60%)]"></div>
                  <ShieldCheck className="size-48 text-emerald-500/20 absolute -right-10 -bottom-10" />
                  <div className="relative z-10 w-full max-w-sm bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-slate-800 flex items-center justify-center">
                          <Target className="size-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">مشروع منصة عقارية</p>
                          <p className="text-xs text-slate-400">خاص (Private)</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20">محمي</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-slate-800 rounded-full w-3/4"></div>
                      <div className="h-2 bg-slate-800 rounded-full w-1/2"></div>
                      <div className="h-2 bg-slate-800 rounded-full w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-24 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-black mb-6">هل أنت مستعد لتحويل فكرتك إلى واقع؟</h2>
            <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed">
              انضم إلى رواد الأعمال والمبتكرين الذين يستخدمون منصة خطة لبناء دراسات جدوى حديثة ونماذج عمل قابلة للنمو السريع.
            </p>
            <Link href="/home">
              <Button size="lg" variant="secondary" className="text-lg px-10 h-14 font-bold gap-3">
                ابدأ رحلتك مجاناً الآن
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-slate-950 text-slate-300 py-16 md:py-24 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-full max-w-3xl h-48 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
            
            {/* Brand Column */}
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
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all">
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all">
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all">
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 014.658 0c-.467 3.124-2.434 4.64-2.434 4.64A8.48 8.48 0 0112 20.547z" clipRule="evenodd"></path></svg>
                </a>
              </div>
            </div>

            {/* Links Columns */}
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
                <li><Link href="/proven-projects" className="text-slate-400 hover:text-primary transition-colors text-sm">أفكار شركات ناجحة</Link></li>
                <li><Link href="/failed-projects" className="text-slate-400 hover:text-primary transition-colors text-sm">شركات فشلت</Link></li>
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
}
