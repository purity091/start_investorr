import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowRight, CheckCircle2, DollarSign, Users, Globe, ExternalLink, Lightbulb, Rocket, Settings, Info, Briefcase, Clock, FileText } from 'lucide-react';

interface ProvenProjectProps {
  project: any;
  onBack: () => void;
}

export const ProvenProjectProfile: React.FC<ProvenProjectProps> = ({ project, onBack }) => {
  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 font-sans">
      
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

      {/* Directory Snapshot Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-none border-border/50">
          <CardContent className="p-5 flex flex-col gap-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">الإيرادات الشهرية</span>
            <strong className="text-xl font-black text-foreground">{project.directory_snapshot.monthly_revenue}</strong>
          </CardContent>
        </Card>
        <Card className="shadow-none border-border/50">
          <CardContent className="p-5 flex flex-col gap-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">الزيارات الشهرية</span>
            <strong className="text-xl font-black text-foreground">{project.directory_snapshot.monthly_traffic}</strong>
          </CardContent>
        </Card>
        <Card className="shadow-none border-border/50">
          <CardContent className="p-5 flex flex-col gap-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">الإيراد لكل زائر</span>
            <strong className="text-xl font-black text-foreground">{project.directory_snapshot.revenue_per_visitor}</strong>
          </CardContent>
        </Card>
        <Card className="shadow-none border-border/50 bg-primary/5 border-primary/20">
          <CardContent className="p-5 flex flex-col gap-1">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">نقاط رواد الأعمال</span>
            <strong className="text-xl font-black text-primary">{project.directory_snapshot.solopreneur_score}</strong>
          </CardContent>
        </Card>
      </div>

      {/* Layout Grid */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-6 mt-4 items-start">
        
        {/* Main Content Sections */}
        <div className="flex flex-col gap-6">
          
          <Card className="shadow-none border-border/50" id="company">
            <CardHeader className="border-b border-border/30 bg-muted/20 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="size-5 text-primary" />
                حقائق الشركة
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/30">
                  <dt className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">نموذج العمل</dt>
                  <dd className="font-semibold text-sm">{project.company.business_model}</dd>
                </div>
                <div className="p-4 rounded-xl bg-muted/30">
                  <dt className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">نوع العميل</dt>
                  <dd className="font-semibold text-sm">{project.company.customer_type}</dd>
                </div>
                <div className="p-4 rounded-xl bg-muted/30">
                  <dt className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">المؤسس</dt>
                  <dd className="font-semibold text-sm">{project.company.founder} ({project.company.founder_role})</dd>
                </div>
                <div className="p-4 rounded-xl bg-muted/30">
                  <dt className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">التمويل</dt>
                  <dd className="font-semibold text-sm">{project.company.funding}</dd>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-border/50" id="problem_product">
            <CardHeader className="border-b border-border/30 bg-muted/20 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="size-5 text-primary" />
                المشكلة والمنتج
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {project.problem_and_product.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-6">
                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-none border-border/50" id="timeline">
            <CardHeader className="border-b border-border/30 bg-muted/20 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="size-5 text-primary" />
                البناء والإطلاق
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative border-r-2 border-border/50 pr-6 space-y-6">
                {project.build_and_launch.map((item: string, i: number) => {
                  const [date, text] = item.split(': ');
                  return (
                    <div key={i} className="relative">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -right-[29.5px] top-1.5 ring-4 ring-background" />
                      <h4 className="text-sm font-bold text-primary mb-1">{date}</h4>
                      <p className="text-sm text-muted-foreground leading-6">{text}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-none border-border/50" id="monetization">
              <CardHeader className="border-b border-border/30 bg-muted/20 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="size-5 text-primary" />
                  نموذج الربح
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 list-disc list-inside text-sm leading-6 text-foreground marker:text-muted-foreground">
                  {project.monetization.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-none border-border/50" id="growth">
              <CardHeader className="border-b border-border/30 bg-muted/20 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Rocket className="size-5 text-primary" />
                  النمو والاستحواذ
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 list-disc list-inside text-sm leading-6 text-foreground marker:text-muted-foreground">
                  {project.growth.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-none border-border/50" id="lessons">
            <CardHeader className="border-b border-border/30 bg-emerald-50 pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-emerald-800">
                <FileText className="size-5 text-emerald-600" />
                دروس مستفادة
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {project.lessons.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                    <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-emerald-900 leading-6 font-medium">{item}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

        </div>

        {/* Sidebar Info */}
        <div className="flex flex-col gap-6 sticky top-24">
          <Card className="shadow-none border-border/50">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Settings className="size-4 text-primary" />
                التقنيات والأدوات المستخدمة
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex flex-wrap gap-2">
              {project.tools.map((tool: string, i: number) => (
                <Badge key={i} variant="outline" className="bg-muted/30 hover:bg-muted/50 border-border/60 text-xs font-semibold px-3 py-1">
                  {tool}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-none border-border/50 bg-muted/10">
            <CardContent className="p-4">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">تحديث الإيرادات</h4>
              {project.revenue_timeline.map((rt: any, i: number) => (
                <div key={i} className="bg-background border border-border/50 rounded-xl p-4 shadow-sm">
                  <div className="text-xs font-bold text-muted-foreground mb-1">{rt.date}</div>
                  <div className="text-lg font-black text-primary mb-1">{rt.amount}</div>
                  <div className="text-xs font-bold text-foreground mb-2">{rt.type}</div>
                  <div className="text-[11px] text-muted-foreground leading-5">{rt.note}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};
