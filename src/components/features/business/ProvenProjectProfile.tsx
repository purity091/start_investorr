import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowRight, CheckCircle2, DollarSign, Users, Globe, ExternalLink, Lightbulb, Rocket, Settings, Info, Briefcase, Clock, FileText, Building2, UserCircle2, MapPin, Search, Database, Code, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProvenProjectProps {
  project: any;
  onBack: () => void;
}

export const ProvenProjectProfile: React.FC<ProvenProjectProps> = ({ project, onBack }) => {
  const [activeId, setActiveId] = useState<string>('company');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { root: null, rootMargin: '-20% 0px -60% 0px' }
    );

    const elements = document.querySelectorAll('.profile-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { id: 'directory-snapshot', label: 'لمحة الدليل' },
    { id: 'company', label: 'حقائق الشركة' },
    { id: 'problem-and-product', label: 'المشكلة والمنتج' },
    { id: 'origin-story', label: 'المؤسس وقصة البداية' },
    { id: 'build-and-launch', label: 'البناء والإطلاق' },
    { id: 'costs-and-operations', label: 'التكاليف والتشغيل' },
    { id: 'monetization', label: 'نموذج الربح والتسعير' },
    { id: 'growth', label: 'النمو والاستحواذ' },
    { id: 'tools', label: 'التقنيات والأدوات' },
    { id: 'revenue-timeline', label: 'المخطط الزمني للإيرادات' },
    { id: 'lessons', label: 'دروس مستفادة' },
    { id: 'sources', label: 'المصادر' },
    { id: 'data-quality', label: 'دقة البيانات' },
  ];

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 font-sans pb-32">
      
      {/* Topbar */}
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="size-4" />
          العودة للقائمة
        </button>
        <div className="flex gap-2">
          <a href={project.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
            الموقع الرسمي
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col gap-4">
        <Badge variant="secondary" className="w-fit bg-primary/10 text-primary">{project.category}</Badge>
        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">{project.name}</h1>
        <h2 className="text-xl md:text-2xl font-bold text-muted-foreground">{project.headline}</h2>
        <p className="text-base text-muted-foreground max-w-4xl leading-relaxed mt-2">{project.summary}</p>
      </div>

      {/* Alert Notice */}
      <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 text-sm mt-2 flex items-start gap-3">
        <Info className="size-5 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong>طبيعة البيانات:</strong> هذه الصفحة تحتوي على معلومات وأرقام عامة وواقعية وُثقت في مقابلات ودراسات حالة. لا تحتوي على بيانات خاصة أو تسريبات غير قانونية. الأرقام تُمثل فترة إعداد دراسة الحالة وقد تتغير بمرور الوقت.
        </p>
      </div>

      {/* Layout Grid */}
      <div className="grid lg:grid-cols-[220px_1fr] gap-10 mt-4 items-start">
        
        {/* Sidebar TOC (Right Side in RTL) */}
        <aside className="hidden lg:block relative">
          <div className="sticky top-24 flex flex-col gap-2">
            <h3 className="font-semibold text-sm text-foreground mb-1">محتويات الصفحة</h3>
            <div className="flex flex-col border-r border-border/40 pr-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "w-full text-right py-1.5 text-[13px] transition-colors focus:outline-none",
                    activeId === item.id
                      ? "text-foreground font-semibold" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Sections */}
        <div className="flex flex-col gap-8 min-w-0">
          
          <section id="directory-snapshot" className="profile-section scroll-mt-24">
            <h3 className="text-xl font-bold mb-4">لقطة الدليل (Directory Snapshot)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="shadow-none border-border/50">
                <CardContent className="p-5 flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">الإيرادات الشهرية</span>
                  <strong className="text-lg font-black text-foreground">{project.directory_snapshot.monthly_revenue}</strong>
                </CardContent>
              </Card>
              <Card className="shadow-none border-border/50">
                <CardContent className="p-5 flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">الزيارات الشهرية</span>
                  <strong className="text-lg font-black text-foreground">{project.directory_snapshot.monthly_traffic}</strong>
                </CardContent>
              </Card>
              <Card className="shadow-none border-border/50">
                <CardContent className="p-5 flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">الإيراد لكل زائر</span>
                  <strong className="text-lg font-black text-foreground">{project.directory_snapshot.revenue_per_visitor}</strong>
                </CardContent>
              </Card>
              <Card className="shadow-none border-border/50 bg-primary/5 border-primary/20">
                <CardContent className="p-5 flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider">نقاط السولو (Solo)</span>
                  <strong className="text-lg font-black text-primary">{project.directory_snapshot.solopreneur_score}</strong>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="company" className="profile-section scroll-mt-24">
            <Card className="shadow-none border-border/50">
              <CardHeader className="border-b border-border/30 bg-muted/20 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="size-5 text-primary" />
                  حقائق الشركة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/30">
                    <dt className="text-[11px] font-bold text-muted-foreground mb-1 uppercase tracking-wider">نموذج العمل</dt>
                    <dd className="font-semibold text-sm">{project.company.business_model}</dd>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30">
                    <dt className="text-[11px] font-bold text-muted-foreground mb-1 uppercase tracking-wider">نوع العميل</dt>
                    <dd className="font-semibold text-sm">{project.company.customer_type}</dd>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30">
                    <dt className="text-[11px] font-bold text-muted-foreground mb-1 uppercase tracking-wider">المؤسس</dt>
                    <dd className="font-semibold text-sm">{project.company.founder}</dd>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30">
                    <dt className="text-[11px] font-bold text-muted-foreground mb-1 uppercase tracking-wider">دور المؤسس</dt>
                    <dd className="font-semibold text-sm">{project.company.founder_role}</dd>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30">
                    <dt className="text-[11px] font-bold text-muted-foreground mb-1 uppercase tracking-wider">عدد المؤسسين / الموظفين</dt>
                    <dd className="font-semibold text-sm">{project.company.founders_count} مؤسس • {project.company.employees}</dd>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30">
                    <dt className="text-[11px] font-bold text-muted-foreground mb-1 uppercase tracking-wider">تاريخ التأسيس / الموقع</dt>
                    <dd className="font-semibold text-sm">{project.company.started} • {project.company.location}</dd>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30">
                    <dt className="text-[11px] font-bold text-muted-foreground mb-1 uppercase tracking-wider">التمويل</dt>
                    <dd className="font-semibold text-sm">{project.company.funding}</dd>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <dt className="text-[11px] font-bold text-primary mb-1 uppercase tracking-wider">الربحية والإيراد المعلن</dt>
                    <dd className="font-semibold text-sm">{project.company.public_revenue_claim}</dd>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="problem-and-product" className="profile-section scroll-mt-24">
            <Card className="shadow-none border-border/50">
              <CardHeader className="border-b border-border/30 bg-muted/20 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="size-5 text-primary" />
                  المشكلة والمنتج
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {project.problem_and_product.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-6">
                      <div className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="origin-story" className="profile-section scroll-mt-24">
            <Card className="shadow-none border-border/50">
              <CardHeader className="border-b border-border/30 bg-muted/20 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <UserCircle2 className="size-5 text-primary" />
                  المؤسس وقصة البداية
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {project.origin_story.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-6">
                      <div className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="build-and-launch" className="profile-section scroll-mt-24">
            <Card className="shadow-none border-border/50">
              <CardHeader className="border-b border-border/30 bg-muted/20 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Rocket className="size-5 text-primary" />
                  البناء والإطلاق
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {project.build_and_launch.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-6">
                      <div className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="costs-and-operations" className="profile-section scroll-mt-24">
            <Card className="shadow-none border-border/50">
              <CardHeader className="border-b border-border/30 bg-muted/20 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="size-5 text-primary" />
                  التكاليف والتشغيل
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {project.costs_and_operations.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-6">
                      <div className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="monetization" className="profile-section scroll-mt-24">
            <Card className="shadow-none border-border/50">
              <CardHeader className="border-b border-border/30 bg-muted/20 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="size-5 text-primary" />
                  نموذج الربح والتسعير
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {project.monetization.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-6">
                      <div className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="growth" className="profile-section scroll-mt-24">
            <Card className="shadow-none border-border/50">
              <CardHeader className="border-b border-border/30 bg-muted/20 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="size-5 text-primary" />
                  النمو والاستحواذ
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {project.growth.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-6">
                      <div className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="tools" className="profile-section scroll-mt-24">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Code className="size-5 text-primary" />
              التقنيات والأدوات المستخدمة
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool: string, i: number) => (
                <Badge key={i} variant="outline" className="bg-muted/30 hover:bg-muted/50 border-border/60 text-sm font-semibold px-4 py-1.5 rounded-full">
                  {tool}
                </Badge>
              ))}
            </div>
          </section>

          <section id="revenue-timeline" className="profile-section scroll-mt-24">
            <h3 className="text-xl font-bold mb-4">المخطط الزمني للإيرادات</h3>
            <div className="grid gap-4">
              {project.revenue_timeline.map((rt: any, i: number) => (
                <div key={i} className="grid grid-cols-[145px_1fr] gap-4 p-4 rounded-xl border border-border/60 bg-muted/10">
                  <div className="text-sm font-bold text-muted-foreground">{rt.date}</div>
                  <div>
                    <div className="text-xl font-black text-foreground">{rt.amount}</div>
                    <div className="text-xs font-bold text-primary uppercase mt-1">{rt.type}</div>
                    <div className="text-sm text-muted-foreground mt-2">{rt.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="lessons" className="profile-section scroll-mt-24">
            <Card className="shadow-none border-emerald-200/50">
              <CardHeader className="border-b border-emerald-100 bg-emerald-50 pb-4">
                <CardTitle className="text-lg flex items-center gap-2 text-emerald-800">
                  <FileText className="size-5 text-emerald-600" />
                  دروس مستفادة رئيسية
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {project.lessons.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 text-emerald-900 leading-6 font-medium text-sm">
                      <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="sources" className="profile-section scroll-mt-24">
            <h3 className="text-xl font-bold mb-4">المصادر</h3>
            <div className="grid gap-3">
              {project.sources.map((src: any, i: number) => (
                <div key={i} className="p-4 border border-border/60 rounded-xl bg-muted/10">
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline block mb-1">
                    {src.label}
                  </a>
                  <p className="text-xs text-muted-foreground">{src.coverage}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="data-quality" className="profile-section scroll-mt-24">
            <h3 className="text-xl font-bold mb-4">ملاحظات دقة البيانات والجودة</h3>
            <ul className="space-y-3">
              {project.data_quality.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-6">
                  <ShieldCheck className="size-4 text-muted-foreground shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>

      </div>
    </div>
  );
};
