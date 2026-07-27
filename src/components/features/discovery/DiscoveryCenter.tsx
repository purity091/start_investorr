import React, { useMemo, useState } from 'react';
import * as LucideIcons from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

const SafeIcon = ({ iconName, ...props }: { iconName: string; [key: string]: any }) => {
  const Icon = (LucideIcons as Record<string, React.ComponentType<any>>)[iconName] ?? LucideIcons.HelpCircle;
  return <Icon {...props} />;
};

interface DiscoverySector {
  id: string;
  label: string;
  exists: boolean;
  isNew?: boolean;
}

interface DiscoveryGroup {
  title: string;
  iconName: string;
  tone: {
    card: string;
    icon: string;
    badge: string;
    item: string;
    itemActive: string;
  };
  description: string;
  sectors: DiscoverySector[];
  gatekeepers: string[];
}

const DISCOVERY_DATA: DiscoveryGroup[] = [
  {
    title: 'الإعلانات والتسويق',
    iconName: 'Megaphone',
    description: 'قطاعات مناسبة للمشاريع التي تبني الطلب، تعزز الوصول، أو تحسن أداء القنوات التسويقية.',
    gatekeepers: ['Google', 'Meta', 'TikTok', 'Publicis'],
    tone: {
      card: 'border-sky-200 bg-sky-50/70',
      icon: 'border-sky-200 bg-white text-sky-700',
      badge: 'border-sky-200 bg-sky-100 text-sky-900',
      item: 'border-sky-200 bg-white hover:border-sky-300',
      itemActive: 'border-sky-400 bg-sky-50',
    },
    sectors: [
      { id: 'advertising-dashboard', label: 'الإعلانات الرقمية والتقليدية', exists: true },
      { id: 'marketing-dashboard', label: 'الاستراتيجيات التسويقية', exists: true },
      { id: 'brands-leaders-dashboard', label: 'العلامات التجارية والقيادة السوقية', exists: true },
      { id: 'influencer-marketing-dashboard', label: 'التسويق عبر المؤثرين', exists: true, isNew: true },
      { id: 'seo-content-marketing', label: 'تحسين الظهور والمحتوى', exists: true },
    ],
  },
  {
    title: 'الزراعة والموارد الطبيعية',
    iconName: 'Sprout',
    description: 'للمشاريع المرتبطة بالإنتاج الزراعي، الأمن الغذائي، والاستثمار في سلاسل الإمداد الطبيعية.',
    gatekeepers: ['Bayer', 'Nutrien', 'John Deere', 'Syngenta'],
    tone: {
      card: 'border-emerald-200 bg-emerald-50/70',
      icon: 'border-emerald-200 bg-white text-emerald-700',
      badge: 'border-emerald-200 bg-emerald-100 text-emerald-900',
      item: 'border-emerald-200 bg-white hover:border-emerald-300',
      itemActive: 'border-emerald-400 bg-emerald-50',
    },
    sectors: [
      { id: 'farming-dashboard', label: 'الإنتاج الزراعي والمحاصيل', exists: true },
      { id: 'fisheries-aquaculture-dashboard', label: 'الثروة السمكية والاستزراع', exists: true },
      { id: 'forestry-dashboard', label: 'الغابات والأخشاب', exists: true },
      { id: 'agritech-dashboard', label: 'التقنيات الزراعية', exists: true, isNew: true },
      { id: 'seeds-crop-protection-dashboard', label: 'البذور وحماية المحاصيل', exists: true, isNew: true },
    ],
  },
  {
    title: 'الكيمياء والموارد',
    iconName: 'FlaskConical',
    description: 'مفيد لدراسة صناعات المواد الخام، الصناعات الكيميائية، والتحويل الصناعي.',
    gatekeepers: ['BASF', 'Dow', 'SABIC', 'Sinopec'],
    tone: {
      card: 'border-violet-200 bg-violet-50/75',
      icon: 'border-violet-200 bg-white text-violet-700',
      badge: 'border-violet-200 bg-violet-100 text-violet-900',
      item: 'border-violet-200 bg-white hover:border-violet-300',
      itemActive: 'border-violet-400 bg-violet-50',
    },
    sectors: [
      { id: 'chemical-industry-dashboard', label: 'الصناعات الكيميائية', exists: true },
      { id: 'fossil-fuels-dashboard', label: 'الوقود الأحفوري', exists: true },
      { id: 'mining-dashboard', label: 'التعدين والمعادن الخام', exists: true },
      { id: 'petroleum-refinery-dashboard', label: 'التكرير والمشتقات النفطية', exists: true },
      { id: 'plastic-rubber-dashboard', label: 'البلاستيك والمطاط', exists: true },
    ],
  },
  {
    title: 'البناء والإنشاءات',
    iconName: 'Building2',
    description: 'يخدم المستثمر الذي يبحث عن فرص في العقود، البناء الذكي، أو مكونات التطوير العمراني.',
    gatekeepers: ['Bechtel', 'VINCI', 'Larsen & Toubro'],
    tone: {
      card: 'border-amber-200 bg-amber-50/75',
      icon: 'border-amber-200 bg-white text-amber-700',
      badge: 'border-amber-200 bg-amber-100 text-amber-900',
      item: 'border-amber-200 bg-white hover:border-amber-300',
      itemActive: 'border-amber-400 bg-amber-50',
    },
    sectors: [
      { id: 'building-construction-dashboard', label: 'البناء والإنشاءات العامة', exists: true },
      { id: 'heavy-construction-dashboard', label: 'المشاريع الثقيلة والبنية التحتية', exists: true },
      { id: 'smart-construction-bim-dashboard', label: 'البناء الذكي وBIM', exists: true },
      { id: 'modular-prefab-construction-dashboard', label: 'البناء المعياري والمسبق الصنع', exists: true, isNew: true },
    ],
  },
  {
    title: 'السلع الاستهلاكية',
    iconName: 'ShoppingBag',
    description: 'لفحص فرص المنتجات اليومية، سلوك الشراء، والتوسع في أسواق الاستهلاك السريع.',
    gatekeepers: ['Unilever', 'P&G', 'Nestle', 'PepsiCo'],
    tone: {
      card: 'border-rose-200 bg-rose-50/75',
      icon: 'border-rose-200 bg-white text-rose-700',
      badge: 'border-rose-200 bg-rose-100 text-rose-900',
      item: 'border-rose-200 bg-white hover:border-rose-300',
      itemActive: 'border-rose-400 bg-rose-50',
    },
    sectors: [
      { id: 'food-nutrition-dashboard', label: 'الأغذية والتغذية', exists: true },
      { id: 'cleaning-products-dashboard', label: 'منتجات التنظيف', exists: true },
      { id: 'cosmetics-personal-care-dashboard', label: 'التجميل والعناية الشخصية', exists: true },
      { id: 'furniture-household-dashboard', label: 'الأثاث والمنتجات المنزلية', exists: true },
      { id: 'packaged-foods-dashboard', label: 'الأغذية المعبأة', exists: true },
    ],
  },
  {
    title: 'التجارة الإلكترونية',
    iconName: 'ShoppingCart',
    description: 'مناسب للمشاريع الرقمية التي تعتمد على المتاجر، المنصات، أو تحسين رحلة الشراء.',
    gatekeepers: ['Amazon', 'Alibaba', 'Shopify', 'Noon'],
    tone: {
      card: 'border-cyan-200 bg-cyan-50/75',
      icon: 'border-cyan-200 bg-white text-cyan-700',
      badge: 'border-cyan-200 bg-cyan-100 text-cyan-900',
      item: 'border-cyan-200 bg-white hover:border-cyan-300',
      itemActive: 'border-cyan-400 bg-cyan-50',
    },
    sectors: [
      { id: 'b2b-ecommerce-dashboard', label: 'التجارة الإلكترونية بين الشركات', exists: true },
      { id: 'b2c-ecommerce-dashboard', label: 'التجارة الإلكترونية للمستهلك', exists: true },
      { id: 'c2c-ecommerce-dashboard', label: 'التجارة بين الأفراد', exists: true },
      { id: 'digital-shopping-behaviour-dashboard', label: 'سلوك الشراء الرقمي', exists: true },
      { id: 'ecommerce-key-figures-dashboard', label: 'مؤشرات التجارة الإلكترونية', exists: true },
    ],
  },
  {
    title: 'المال والتأمين',
    iconName: 'Landmark',
    description: 'لبناء قرارات في الخدمات المالية، التأمين، والمدفوعات والاستثمار المؤسسي.',
    gatekeepers: ['Visa', 'Mastercard', 'BlackRock', 'AIG'],
    tone: {
      card: 'border-lime-200 bg-lime-50/75',
      icon: 'border-lime-200 bg-white text-lime-700',
      badge: 'border-lime-200 bg-lime-100 text-lime-900',
      item: 'border-lime-200 bg-white hover:border-lime-300',
      itemActive: 'border-lime-400 bg-lime-50',
    },
    sectors: [
      { id: 'financial-institutions-dashboard', label: 'المؤسسات المالية', exists: true },
      { id: 'financial-services-dashboard', label: 'الخدمات المالية', exists: true },
      { id: 'investments-dashboard', label: 'الاستثمار وإدارة الأصول', exists: true },
      { id: 'insurance-dashboard', label: 'التأمين', exists: true },
    ],
  },
  {
    title: 'الصحة والأدوية',
    iconName: 'HeartPulse',
    description: 'لمراجعة فرص الرعاية، الحلول الصحية، والخدمات الطبية ذات القيمة العالية.',
    gatekeepers: ['Pfizer', 'Roche', 'Cleveland Clinic', 'UnitedHealth'],
    tone: {
      card: 'border-red-200 bg-red-50/75',
      icon: 'border-red-200 bg-white text-red-700',
      badge: 'border-red-200 bg-red-100 text-red-900',
      item: 'border-red-200 bg-white hover:border-red-300',
      itemActive: 'border-red-400 bg-red-50',
    },
    sectors: [
      { id: 'care-support-dashboard', label: 'الرعاية والدعم الصحي', exists: true },
      { id: 'hospitals-health-professionals-dashboard', label: 'المستشفيات والمهنيون الصحيون', exists: true },
      { id: 'health-system-dashboard', label: 'أنظمة الصحة', exists: true },
      { id: 'pharma-market-dashboard', label: 'سوق الأدوية', exists: true },
      { id: 'state-of-health-dashboard', label: 'مؤشرات الحالة الصحية', exists: true },
    ],
  },
  {
    title: 'التكنولوجيا والاتصالات',
    iconName: 'Cpu',
    description: 'واجهة مناسبة لاختيار مسارات البرمجيات، البنية الرقمية، والابتكار التقني.',
    gatekeepers: ['Microsoft', 'Google Cloud', 'Oracle', 'Cisco'],
    tone: {
      card: 'border-indigo-200 bg-indigo-50/75',
      icon: 'border-indigo-200 bg-white text-indigo-700',
      badge: 'border-indigo-200 bg-indigo-100 text-indigo-900',
      item: 'border-indigo-200 bg-white hover:border-indigo-300',
      itemActive: 'border-indigo-400 bg-indigo-50',
    },
    sectors: [
      { id: 'software-dashboard', label: 'البرمجيات', exists: true },
      { id: 'it-services-dashboard', label: 'خدمات تقنية المعلومات', exists: true },
      { id: 'telecommunications-dashboard', label: 'الاتصالات', exists: true },
      { id: 'artificial-intelligence-dashboard', label: 'الذكاء الاصطناعي', exists: true, isNew: true },
      { id: 'cloud-services-dashboard', label: 'الخدمات السحابية', exists: true, isNew: true },
    ],
  },
  {
    title: 'النقل واللوجستيات',
    iconName: 'Truck',
    description: 'لفهم سلاسل التوريد، النقل الذكي، والبنية التشغيلية للأسواق المتحركة.',
    gatekeepers: ['DHL', 'Maersk', 'Uber Freight', 'FedEx'],
    tone: {
      card: 'border-orange-200 bg-orange-50/75',
      icon: 'border-orange-200 bg-white text-orange-700',
      badge: 'border-orange-200 bg-orange-100 text-orange-900',
      item: 'border-orange-200 bg-white hover:border-orange-300',
      itemActive: 'border-orange-400 bg-orange-50',
    },
    sectors: [
      { id: 'logistics-dashboard', label: 'الخدمات اللوجستية', exists: true },
      { id: 'public-transport-dashboard', label: 'النقل العام', exists: true },
      { id: 'rail-transport-dashboard', label: 'النقل بالسكك الحديدية', exists: true },
      { id: 'vehicles-road-traffic-dashboard', label: 'المركبات وحركة الطرق', exists: true },
      { id: 'autonomous-vehicles-dashboard', label: 'المركبات الذاتية', exists: true, isNew: true },
    ],
  },
  {
    title: 'السياحة والضيافة',
    iconName: 'PlaneTakeoff',
    description: 'للمشاريع التي تستهدف تجربة الزائر، التشغيل الفندقي، أو خدمات السفر المتخصصة.',
    gatekeepers: ['Booking', 'Airbnb', 'Marriott', 'Amadeus'],
    tone: {
      card: 'border-fuchsia-200 bg-fuchsia-50/75',
      icon: 'border-fuchsia-200 bg-white text-fuchsia-700',
      badge: 'border-fuchsia-200 bg-fuchsia-100 text-fuchsia-900',
      item: 'border-fuchsia-200 bg-white hover:border-fuchsia-300',
      itemActive: 'border-fuchsia-400 bg-fuchsia-50',
    },
    sectors: [
      { id: 'accommodation-dashboard', label: 'الإقامة والفنادق', exists: true },
      { id: 'business-travel-dashboard', label: 'سفر الأعمال', exists: true },
      { id: 'food-drink-services-dashboard', label: 'خدمات الطعام والشراب', exists: true },
      { id: 'leisure-travel-dashboard', label: 'السفر الترفيهي', exists: true },
      { id: 'travel-technology-dashboard', label: 'تقنيات السفر', exists: true, isNew: true },
    ],
  },
  {
    title: 'الطاقة والبيئة',
    iconName: 'Leaf',
    description: 'لتحليل مسارات الطاقة، المناخ، الموارد المستدامة، والحلول البيئية الجديدة.',
    gatekeepers: ['Siemens Energy', 'Shell', 'Tesla Energy', 'Veolia'],
    tone: {
      card: 'border-teal-200 bg-teal-50/75',
      icon: 'border-teal-200 bg-white text-teal-700',
      badge: 'border-teal-200 bg-teal-100 text-teal-900',
      item: 'border-teal-200 bg-white hover:border-teal-300',
      itemActive: 'border-teal-400 bg-teal-50',
    },
    sectors: [
      { id: 'energy-dashboard', label: 'الطاقة', exists: true },
      { id: 'climate-dashboard', label: 'المناخ', exists: true },
      { id: 'water-dashboard', label: 'المياه', exists: true },
      { id: 'waste-dashboard', label: 'إدارة النفايات', exists: true },
      { id: 'renewable-energy-infrastructure-dashboard', label: 'البنية التحتية للطاقة المتجددة', exists: true, isNew: true },
    ],
  },
];

const DEFAULT_VISIBLE_SECTORS = 3;

export function DiscoveryCenter({
  setActiveTab,
  onSelectSector,
}: {
  setActiveTab: (tab: string) => void;
  onSelectSector?: (sector: { id: string; label: string; groupTitle: string }) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);

  const normalizedGroups = useMemo(
    () =>
      DISCOVERY_DATA.map(group => ({
        ...group,
        sectors: group.sectors.map(sector => ({
          ...sector,
          groupTitle: group.title,
        })),
      })),
    [],
  );

  const filteredGroups = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return normalizedGroups;
    }

    return normalizedGroups
      .map(group => ({
        ...group,
        sectors: group.sectors.filter(
          sector =>
            sector.label.toLowerCase().includes(query) ||
            sector.id.toLowerCase().includes(query) ||
            group.title.toLowerCase().includes(query),
        ),
      }))
      .filter(group => group.sectors.length > 0);
  }, [normalizedGroups, searchTerm]);

  const allSectors = useMemo(
    () =>
      normalizedGroups.flatMap(group =>
        group.sectors.map(sector => ({
          ...sector,
          groupTitle: group.title,
        })),
      ),
    [normalizedGroups],
  );

  const quickResults = useMemo(() => {
    const source = searchTerm ? filteredGroups : normalizedGroups;
    return source.flatMap(group =>
      group.sectors.slice(0, 2).map(sector => ({
        ...sector,
        groupTitle: group.title,
      })),
    );
  }, [filteredGroups, normalizedGroups, searchTerm]);

  const totalSectors = allSectors.length;
  const totalNewSectors = allSectors.filter(sector => sector.isNew).length;
  const matchingSectors = filteredGroups.reduce((count, group) => count + group.sectors.length, 0);

  const openSector = (sector: { id: string; label: string; groupTitle: string }) => {
    setSelectedSectorId(sector.id);
    onSelectSector?.(sector);
    setActiveTab(sector.id);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-background pb-16 font-['IBM_Plex_Sans_Arabic'] text-right text-foreground"
    >
      <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        <Card className="border-border shadow-sm">
          <CardHeader className="gap-5">
            <div className="lg:flex lg:items-start lg:justify-between lg:gap-5">
            <div className="space-y-3">
              <Badge variant="outline" className="w-fit rounded-md px-3 py-1 text-xs font-medium">
                مساحة القرار الاستثماري
              </Badge>
              <div className="space-y-2">
                <CardTitle className="text-2xl leading-tight sm:text-3xl">رادار استكشاف الأسواق والفرص الاستثمارية</CardTitle>
                <CardDescription className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
                  واجهة منظمة لاكتشاف القطاعات، مقارنة المسارات، والانتقال السريع إلى السوق المناسب لبناء دراسة جدوى أكثر دقة.
                </CardDescription>
              </div>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-3 lg:w-[560px]">
              <div className="rounded-xl border bg-muted/30 p-4">
                <div className="text-xs font-medium text-muted-foreground">المجموعات</div>
                <div className="mt-2 text-2xl font-semibold text-foreground">{normalizedGroups.length}</div>
              </div>
              <div className="rounded-xl border bg-muted/30 p-4">
                <div className="text-xs font-medium text-muted-foreground">القطاعات</div>
                <div className="mt-2 text-2xl font-semibold text-foreground">{totalSectors}</div>
              </div>
              <div className="rounded-xl border bg-muted/30 p-4">
                <div className="text-xs font-medium text-muted-foreground">القطاعات الجديدة</div>
                <div className="mt-2 text-2xl font-semibold text-foreground">{totalNewSectors}</div>
              </div>
            </div>
            </div>

            <div className="flex flex-col gap-4 rounded-xl border bg-muted/20 p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0 text-right">
                  <div className="text-sm font-semibold text-foreground">شرح استخدام الرادار</div>
                  <div className="text-xs text-muted-foreground">اضغط على علامة التعجب لعرض خطوات الاستخدام.</div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="rounded-md px-3 py-1 font-medium">
                    النتائج الحالية: {matchingSectors}
                  </Badge>
                  <HoverCard openDelay={100}>
                    <HoverCardTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        className="shrink-0 rounded-full"
                        aria-label="كيف تستخدم الرادار؟"
                      >
                        <LucideIcons.CircleAlert className="size-4" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent align="start" className="w-[360px] space-y-3 text-right" dir="rtl">
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-foreground">كيف تستخدم الرادار؟</div>
                        <p className="text-xs leading-6 text-muted-foreground">
                          ابدأ من المجموعة الأقرب لفكرة المشروع، ثم ادخل إلى القطاع المناسب لمراجعة السوق وبناء تصور أعمق للفرصة.
                        </p>
                      </div>
                      <div className="space-y-2 text-xs leading-6 text-muted-foreground">
                        <div className="rounded-lg border bg-muted/30 px-3 py-2">
                          اختر مجموعة رئيسية تمثل نوع السوق الذي تنوي تحليله قبل الانتقال إلى القطاعات الفرعية.
                        </div>
                        <div className="rounded-lg border bg-muted/30 px-3 py-2">
                          استخدم البحث للوصول السريع عندما يكون لديك اتجاه محدد أو صناعة واضحة.
                        </div>
                        <div className="rounded-lg border bg-muted/30 px-3 py-2">
                          انتقل إلى القطاع المطلوب لبدء القراءة أو استكمال بقية رحلة المشروع داخل المنصة.
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  {searchTerm ? (
                    <Button type="button" variant="outline" size="sm" onClick={() => setSearchTerm('')}>
                      مسح البحث
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="relative w-full">
                <LucideIcons.Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={event => setSearchTerm(event.target.value)}
                  placeholder="ابحث عن قطاع، سوق، أو فرصة استثمارية"
                  className="pr-10 text-right"
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6">
          <div className="space-y-6">
            <div className="hidden items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
              <div className="min-w-0 text-right">
                <div className="text-sm font-semibold text-foreground">شرح استخدام الرادار</div>
                <div className="text-xs text-muted-foreground">اضغط على علامة التعجب لعرض خطوات الاستخدام.</div>
              </div>
              <HoverCard openDelay={100}>
                <HoverCardTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    className="shrink-0 rounded-full"
                    aria-label="كيف تستخدم الرادار؟"
                  >
                    <LucideIcons.CircleAlert className="size-4" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent align="start" className="w-[360px] space-y-3 text-right" dir="rtl">
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-foreground">كيف تستخدم الرادار؟</div>
                    <p className="text-xs leading-6 text-muted-foreground">
                      ابدأ من المجموعة الأقرب لفكرة المشروع، ثم ادخل إلى القطاع المناسب لمراجعة السوق وبناء تصور أعمق للفرصة.
                    </p>
                  </div>
                  <div className="space-y-2 text-xs leading-6 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 px-3 py-2">
                      اختر مجموعة رئيسية تمثل نوع السوق الذي تنوي تحليله قبل الانتقال إلى القطاعات الفرعية.
                    </div>
                    <div className="rounded-lg border bg-muted/30 px-3 py-2">
                      استخدم البحث للوصول السريع عندما يكون لديك اتجاه محدد أو صناعة واضحة.
                    </div>
                    <div className="rounded-lg border bg-muted/30 px-3 py-2">
                      انتقل إلى القطاع المطلوب لبدء القراءة أو استكمال بقية رحلة المشروع داخل المنصة.
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <Card className="hidden border-border shadow-sm">
              <CardContent className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full lg:max-w-xl">
                  <LucideIcons.Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                    placeholder="ابحث عن قطاع، سوق، أو فرصة استثمارية"
                    className="pr-10 text-right"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="rounded-md px-3 py-1 font-medium">
                    النتائج الحالية: {matchingSectors}
                  </Badge>
                  {searchTerm ? (
                    <Button type="button" variant="outline" size="sm" onClick={() => setSearchTerm('')}>
                      مسح البحث
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>

            {filteredGroups.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {filteredGroups.map(group => {
                  const expanded = expandedGroups[group.title] ?? false;
                  const hasSearch = searchTerm.trim().length > 0;
                  const visibleSectors = hasSearch || expanded ? group.sectors : group.sectors.slice(0, DEFAULT_VISIBLE_SECTORS);
                  const hiddenCount = Math.max(group.sectors.length - DEFAULT_VISIBLE_SECTORS, 0);

                  return (
                    <Card key={group.title} className={cn('shadow-sm', group.tone.card)}>
                      <CardHeader className="gap-4 pb-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-lg leading-7 text-foreground">{group.title}</CardTitle>
                              <Badge className={cn('rounded-md border px-2.5 py-1 text-xs font-medium', group.tone.badge)}>
                                {group.sectors.length} قطاع
                              </Badge>
                            </div>
                            <CardDescription className="text-sm leading-7 text-muted-foreground">
                              {group.description}
                            </CardDescription>
                          </div>

                          <div className={cn('flex size-11 shrink-0 items-center justify-center rounded-xl border', group.tone.icon)}>
                            <SafeIcon iconName={group.iconName} className="size-5" />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {group.gatekeepers.map(gatekeeper => (
                            <Badge key={gatekeeper} variant="outline" className={cn('rounded-md border bg-background/80 text-xs', group.tone.badge)}>
                              {gatekeeper}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          {visibleSectors.map(sector => {
                            const isActive = selectedSectorId === sector.id;

                            return (
                              <button
                                key={sector.id}
                                type="button"
                                onClick={() => openSector({ id: sector.id, label: sector.label, groupTitle: group.title })}
                                className={cn(
                                  'flex w-full items-start justify-between gap-3 rounded-xl border px-4 py-3 text-right transition-colors',
                                  group.tone.item,
                                  isActive && group.tone.itemActive,
                                )}
                              >
                                <div className="space-y-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-semibold leading-6 text-foreground">{sector.label}</span>
                                    {sector.isNew ? (
                                      <Badge variant="outline" className="rounded-md border bg-background text-[11px] font-medium">
                                        جديد
                                      </Badge>
                                    ) : null}
                                    <Badge variant="outline" className="rounded-md border bg-background text-[11px] font-medium text-muted-foreground">
                                      {sector.exists ? 'جاهز للعرض' : 'قيد الإعداد'}
                                    </Badge>
                                  </div>
                                  <p className="text-xs leading-6 text-muted-foreground">{group.title}</p>
                                </div>
                                <LucideIcons.ChevronLeft className="mt-1 size-4 shrink-0 text-muted-foreground" />
                              </button>
                            );
                          })}
                        </div>

                        {!hasSearch && hiddenCount > 0 ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="w-full justify-center rounded-xl border border-dashed bg-background text-sm font-medium hover:bg-accent"
                            onClick={() =>
                              setExpandedGroups(current => ({
                                ...current,
                                [group.title]: !expanded,
                              }))
                            }
                          >
                            {expanded ? 'عرض أقل' : `عرض المزيد (${hiddenCount})`}
                          </Button>
                        ) : null}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="border-dashed shadow-sm">
                <CardContent className="flex min-h-[320px] flex-col items-center justify-center gap-4 p-8 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full border bg-muted/40">
                    <LucideIcons.Orbit className="size-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-semibold">لا توجد نتائج مطابقة</div>
                    <p className="max-w-md text-sm leading-7 text-muted-foreground">
                      جرّب وصفاً أعم مثل الزراعة أو التقنية أو التمويل للوصول إلى مجموعة أوسع من الأسواق.
                    </p>
                  </div>
                  <Button type="button" variant="outline" onClick={() => setSearchTerm('')}>
                    إعادة ضبط البحث
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="hidden space-y-4">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
              <div className="min-w-0 text-right">
                <div className="text-sm font-semibold text-foreground">شرح استخدام الرادار</div>
                <div className="text-xs text-muted-foreground">اضغط على علامة التعجب لعرض خطوات الاستخدام.</div>
              </div>
              <HoverCard openDelay={100}>
                <HoverCardTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    className="shrink-0 rounded-full"
                    aria-label="كيف تستخدم الرادار؟"
                  >
                    <LucideIcons.CircleAlert className="size-4" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent align="start" className="w-[360px] space-y-3 text-right" dir="rtl">
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-foreground">كيف تستخدم الرادار؟</div>
                    <p className="text-xs leading-6 text-muted-foreground">
                      ابدأ من المجموعة الأقرب لفكرة المشروع، ثم ادخل إلى القطاع المناسب لمراجعة السوق وبناء تصور أعمق للفرصة.
                    </p>
                  </div>
                  <div className="space-y-2 text-xs leading-6 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 px-3 py-2">
                      اختر مجموعة رئيسية تمثل نوع السوق الذي تنوي تحليله قبل الانتقال إلى القطاعات الفرعية.
                    </div>
                    <div className="rounded-lg border bg-muted/30 px-3 py-2">
                      استخدم البحث للوصول السريع عندما يكون لديك اتجاه محدد أو صناعة واضحة.
                    </div>
                    <div className="rounded-lg border bg-muted/30 px-3 py-2">
                      انتقل إلى القطاع المطلوب لبدء القراءة أو استكمال بقية رحلة المشروع داخل المنصة.
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <Card className="hidden border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">كيف تستخدم الرادار؟</CardTitle>
                <CardDescription className="text-sm leading-7">
                  ابدأ من المجموعة الأقرب لفكرة المشروع، ثم ادخل إلى القطاع المناسب لمراجعة السوق وبناء تصور أعمق للفرصة.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
                <div className="rounded-xl border bg-muted/20 p-4">
                  اختر مجموعة رئيسية تمثل نوع السوق الذي تنوي تحليله قبل الانتقال إلى القطاعات الفرعية.
                </div>
                <div className="rounded-xl border bg-muted/20 p-4">
                  استخدم البحث للوصول السريع عندما يكون لديك اتجاه محدد أو صناعة واضحة.
                </div>
                <div className="rounded-xl border bg-muted/20 p-4">
                  انتقل إلى القطاع المطلوب لبدء القراءة أو استكمال بقية رحلة المشروع داخل المنصة.
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">نتائج سريعة</CardTitle>
                <CardDescription className="text-sm">
                  اختصارات مهيأة لأقرب القطاعات المطابقة للبحث الحالي.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickResults.slice(0, 6).map(result => (
                  <button
                    key={result.id}
                    type="button"
                    onClick={() => openSector({ id: result.id, label: result.label, groupTitle: result.groupTitle })}
                    className="flex w-full items-center justify-between gap-3 rounded-lg border bg-background px-3 py-2.5 text-right transition-colors hover:bg-accent"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-foreground">{result.label}</div>
                      <div className="truncate text-[11px] text-muted-foreground">{result.groupTitle}</div>
                    </div>
                    <LucideIcons.ChevronLeft className="size-4 shrink-0 text-muted-foreground" />
                  </button>
                ))}

                {quickResults.length === 0 ? (
                  <div className="rounded-lg border border-dashed px-3 py-4 text-center text-xs leading-6 text-muted-foreground">
                    ابدأ بكتابة اسم سوق أو قطاع لعرض النتائج السريعة هنا.
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

DiscoveryCenter.displayName = 'DiscoveryCenter';
