import React from 'react';
import {
  BadgeCheck,
  Building2,
  Compass,
  CreditCard,
  Crown,
  Home,
  LayoutDashboard,
  Lightbulb,
  Palette,
  Radar,
  Route,
  Settings,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

interface MobileSiteMapProps {
  setActiveTab: (tab: string) => void;
}

const groups = [
  {
    title: 'الوصول السريع',
    description: 'الصفحات التي يعود لها المستخدم بشكل يومي.',
    items: [
      { label: 'الرئيسية', id: 'home', icon: Home },
      { label: 'مشاريعي', id: 'my-plans', icon: LayoutDashboard },
    ],
  },
  {
    title: 'بناء دراسة جدوى مشروع',
    description: 'مسارات بناء المشروع من الفكرة إلى نموذج العمل.',
    items: [
      { label: 'النموذج السهل', id: 'new-plan-family', icon: Sparkles },
      { label: 'النموذج الاحترافي', id: 'new-plan-pro', icon: BadgeCheck },
      { label: 'منهجية MIT 24 Steps', id: 'new-plan-mit24', icon: Route },
      { label: 'بناء نموذج العمل BMC', id: 'new-plan-bmc', icon: Building2 },
      { label: 'منهجية Lean Startup', id: 'new-plan-lean', icon: Route },
    ],
  },
  {
    title: 'أفكار مشاريع',
    description: 'استكشاف السوق والمشكلات والفرص قبل اختيار الاتجاه.',
    items: [
      { label: 'استكشاف السوق', id: 'market-discovery', icon: Compass },
      { label: 'المشكلات والفرص', id: 'problem-engine', icon: Lightbulb },
      { label: 'رادار اليونيكورن', id: 'unicorn-benchmark', icon: Radar },
    ],
  },
  {
    title: 'ملحقات المشروع',
    description: 'أدوات مساعدة لإكمال تصور المشروع وتسليمه.',
    items: [
      { label: 'الهوية البصرية', id: 'brand-identity', icon: Palette },
    ],
  },
  {
    title: 'إدارة المستخدم',
    description: 'تم تجميع كل ما يخص المستخدم في 3 صفحات فقط.',
    items: [
      { label: 'حسابي الشخصي', id: 'customer-dashboard', icon: Crown },
      { label: 'ملف التعريف', id: 'profile', icon: Settings },
      { label: 'اشتراكي', id: 'pricing', icon: CreditCard },
    ],
  },
];

export const MobileSiteMap: React.FC<MobileSiteMapProps> = ({ setActiveTab }) => {
  return (
    <main className="app-page-shell-wide space-y-6 text-right" dir="rtl">
      <section className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <Badge variant="secondary" className="w-fit">خريطة الموقع</Badge>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">كل واجهات المنصة في مكان واحد</h1>
              <p className="text-sm leading-7 text-muted-foreground">
                تم تبسيط منطقة المستخدم لتصبح مبنية على ثلاث صفحات فقط: حسابي الشخصي، ملف التعريف، واشتراكي.
              </p>
            </div>
          </div>
          <Button onClick={() => setActiveTab('home')} className="w-full sm:w-fit">
            العودة للرئيسية
          </Button>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {groups.map((group) => (
          <Card key={group.title} className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{group.title}</CardTitle>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    type="button"
                    variant="ghost"
                    onClick={() => setActiveTab(item.id)}
                    className="h-auto justify-start gap-3 rounded-lg px-3 py-2.5 text-right"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                      <Icon className="size-4" />
                    </span>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default MobileSiteMap;
