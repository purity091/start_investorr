"use client";

import { useState } from "react";
import {
  Building,
  CheckCircle2,
  ExternalLink,
  Globe,
  Layers,
  ChevronDown,
  ChevronUp,
  FileJson,
  Activity,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Company } from "@/types";

const TOC_SECTIONS = [
  {
    id: "main-section-1",
    title: "01. هوية ومعلومات الشركة",
    icon: <FileJson className="h-4 w-4 text-sky-500 shrink-0" />,
    colorClass: "text-sky-700 dark:text-sky-300",
    bgHover: "hover:bg-sky-500/10",
    subItems: [
      { id: "section-about", label: "حول ونشاطات الشركة" },
      { id: "section-strategy", label: "النموذج الربحي والمكانة" },
      { id: "section-details", label: "التفاصيل القانونية" },
      { id: "section-tech", label: "بيانات التقنية والزيارات" },
    ],
  },
  {
    id: "main-section-2",
    title: "02. المحيط التنافسي والهيكل",
    icon: <Building className="h-4 w-4 text-violet-500 shrink-0" />,
    colorClass: "text-violet-700 dark:text-violet-300",
    bgHover: "hover:bg-violet-500/10",
    subItems: [
      { id: "section-competitors", label: "الشركات المنافسة" },
      { id: "section-suborgs", label: "الشركات التابعة" },
      { id: "section-similar-companies-table", label: "الشركات المماثلة" },
      { id: "section-related-sectors-table", label: "القطاعات المرتبطة" },
    ],
  },
  {
    id: "main-section-3",
    title: "03. التمويل والاستثمارات",
    icon: <Activity className="h-4 w-4 text-emerald-500 shrink-0" />,
    colorClass: "text-emerald-700 dark:text-emerald-300",
    bgHover: "hover:bg-emerald-500/10",
    subItems: [
      { id: "section-funding", label: "جولات التمويل" },
      { id: "section-investments", label: "الاستثمارات الممنوحة" },
    ],
  },
  {
    id: "main-section-4",
    title: "04. التحليل الاستراتيجي (Pro)",
    icon: <Target className="h-4 w-4 text-amber-500 shrink-0" />,
    colorClass: "text-amber-700 dark:text-amber-300",
    bgHover: "hover:bg-amber-500/10",
    subItems: [
      { id: "section-swot", label: "تحليل SWOT المالي" },
      { id: "section-business-tech", label: "نموذج العمل والحل" },
      { id: "section-expansion", label: "استراتيجية التوسع" },
      { id: "section-lessons-evidence", label: "الدروس وشواهد التوثيق" },
    ],
  },
  {
    id: "main-section-5",
    title: "05. مصفوفة العملاء والجمهور",
    icon: <Users className="h-4 w-4 text-indigo-500 shrink-0" />,
    colorClass: "text-indigo-700 dark:text-indigo-300",
    bgHover: "hover:bg-indigo-500/10",
    subItems: [
      { id: "section-target-audience", label: "مصفوفة العملاء (ICP)" },
      { id: "section-strategic-matrix", label: "المقارنة الاستراتيجية" },
    ],
  },
];

export function CompanyHeader({ company }: { company: Company }) {
  // Collapsed by default so it takes zero extra screen space
  const [isTocOpen, setIsTocOpen] = useState(false);

  return (
    <Card id="section-summary" className="border-0 shadow-sm shadow-slate-200/60 dark:shadow-none bg-card rounded-2xl sm:rounded-3xl overflow-hidden">
      <CardContent className="p-4 sm:p-7 space-y-4">
        {/* Main Info Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full md:w-auto">
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-muted/30 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 p-2 border border-muted/30">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className="w-full h-full object-contain rounded-xl" referrerPolicy="no-referrer" />
              ) : (
                <Building className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground/60" />
              )}
            </div>
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-foreground">{company.name}</h2>
                <Badge variant="secondary" className="font-bold text-[10px] sm:text-xs gap-1 px-2 py-0.5 border-0 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  شركة معتمدة
                </Badge>
              </div>
              <p className="text-[11px] sm:text-sm text-muted-foreground max-w-3xl leading-relaxed font-medium">
                {company.shortDescription}
              </p>
              {company.categories?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {company.categories.map((category, index) => (
                    <Badge key={index} variant="secondary" className="text-[11px] font-semibold bg-muted/60 text-muted-foreground border-0 px-2.5 py-0.5">
                      {category}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto shrink-0 pt-1 md:pt-0">
            {/* TOC Toggle Button directly inside the header div */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="flex-1 sm:flex-initial gap-2 font-bold text-xs sm:text-sm h-10 sm:h-11 px-4 border border-muted/80 hover:bg-muted/50 bg-background/80"
              title={isTocOpen ? "إخفاء الفهرس" : "عرض فهرس المحتويات"}
            >
              <Layers className="h-4 w-4 text-primary shrink-0" />
              <span>فهرس المحتويات</span>
              {isTocOpen ? (
                <ChevronUp className="h-4 w-4 shrink-0 opacity-70" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0 opacity-70" />
              )}
            </Button>

            {company.website && (
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-initial shrink-0">
                <Button variant="default" size="lg" className="w-full gap-2 font-bold shadow-xs px-5 text-xs sm:text-sm border-0 h-10 sm:h-11">
                  <Globe className="h-4 w-4" />
                  زيارة الموقع
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Integrated Collapsible Index Panel inside First Div */}
        {isTocOpen && (
          <div className="pt-4 border-t border-muted/40 animate-in fade-in duration-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                فهرس أقسام الشركة (انقر للانتقال السريع)
              </span>
              <span className="text-[11px] text-muted-foreground font-normal">
                (مطوي افتراضياً لتوفير مساحة الشاشة)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TOC_SECTIONS.map((sec) => (
                <div key={sec.id} className="p-3 bg-muted/20 hover:bg-muted/40 rounded-xl transition-colors space-y-1.5 border border-muted/30">
                  <a
                    href={`#${sec.id}`}
                    onClick={() => setIsTocOpen(false)}
                    className={`flex items-center gap-2 text-xs font-bold ${sec.colorClass} hover:underline`}
                  >
                    {sec.icon}
                    <span className="truncate">{sec.title}</span>
                  </a>
                  <div className="pr-5 flex flex-col gap-1 text-[11px] text-muted-foreground">
                    {sec.subItems.map((sub) => (
                      <a
                        key={sub.id}
                        href={`#${sub.id}`}
                        onClick={() => setIsTocOpen(false)}
                        className="hover:text-foreground hover:underline truncate"
                      >
                        • {sub.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
