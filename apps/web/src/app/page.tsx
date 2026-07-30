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
            <Link href="/workspace">
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
      <footer className="border-t border-border bg-muted/20 py-12 text-center">
        <div className="container mx-auto px-4">
          <div className="text-2xl font-black text-primary mx-auto mb-6 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">خطة<span className="text-foreground">.</span></div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} منصة خطة. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
}
