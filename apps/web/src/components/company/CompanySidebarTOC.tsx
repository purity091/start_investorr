import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import {
  Layers,
  FileJson,
  Building,
  Activity,
  Target,
  Users,
  ChevronDown,
  ChevronUp,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  colorClass: string;
  hoverBg: string;
  dotColor: string;
  subItems: { id: string; label: string }[];
}

const SECTIONS: SectionItem[] = [
  {
    id: "main-section-1",
    title: "هوية ومعلومات الشركة",
    icon: <FileJson className="h-4 w-4 text-sky-500 shrink-0" />,
    colorClass: "text-sky-700 dark:text-sky-300",
    hoverBg: "hover:bg-sky-500/10",
    dotColor: "bg-sky-500",
    subItems: [
      { id: "section-about", label: "حول ونشاطات الشركة" },
      { id: "section-strategy", label: "النموذج الربحي والمكانة" },
      { id: "section-details", label: "التفاصيل القانونية" },
      { id: "section-tech", label: "بيانات التقنية والزيارات" },
    ],
  },
  {
    id: "main-section-2",
    title: "المحيط التنافسي والهيكل",
    icon: <Building className="h-4 w-4 text-violet-500 shrink-0" />,
    colorClass: "text-violet-700 dark:text-violet-300",
    hoverBg: "hover:bg-violet-500/10",
    dotColor: "bg-violet-500",
    subItems: [
      { id: "section-competitors", label: "الشركات المنافسة" },
      { id: "section-suborgs", label: "الشركات التابعة" },
      { id: "section-similar-companies-table", label: "الشركات المماثلة" },
      { id: "section-related-sectors-table", label: "القطاعات المرتبطة" },
    ],
  },
  {
    id: "main-section-3",
    title: "التمويل والاستثمارات",
    icon: <Activity className="h-4 w-4 text-emerald-500 shrink-0" />,
    colorClass: "text-emerald-700 dark:text-emerald-300",
    hoverBg: "hover:bg-emerald-500/10",
    dotColor: "bg-emerald-500",
    subItems: [
      { id: "section-funding", label: "جولات التمويل" },
      { id: "section-investments", label: "الاستثمارات الممنوحة" },
    ],
  },
  {
    id: "main-section-4",
    title: "التحليل الاستراتيجي (Pro)",
    icon: <Target className="h-4 w-4 text-amber-500 shrink-0" />,
    colorClass: "text-amber-700 dark:text-amber-300",
    hoverBg: "hover:bg-amber-500/10",
    dotColor: "bg-amber-500",
    subItems: [
      { id: "section-swot", label: "تحليل SWOT المالي" },
      { id: "section-business-tech", label: "نموذج العمل والحل" },
      { id: "section-expansion", label: "استراتيجية التوسع" },
      { id: "section-lessons-evidence", label: "الدروس وشواهد التوثيق" },
    ],
  },
  {
    id: "main-section-5",
    title: "مصفوفة العملاء والجمهور",
    icon: <Users className="h-4 w-4 text-indigo-500 shrink-0" />,
    colorClass: "text-indigo-700 dark:text-indigo-300",
    hoverBg: "hover:bg-indigo-500/10",
    dotColor: "bg-indigo-500",
    subItems: [
      { id: "section-target-audience", label: "مصفوفة العملاء (ICP Matrix)" },
      { id: "section-strategic-matrix", label: "المقارنة الاستراتيجية الشاملة" },
    ],
  },
];

export const CompanySidebarTOC: React.FC = () => {
  // Collapsed by default on small screens (<1024px) and expanded on desktop (>=1024px)
  const [isMainOpen, setIsMainOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMainOpen(window.innerWidth >= 1024);
      }
    };
    handleResize();
  }, []);

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCollapsedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className={cn(
        "sticky top-16 sm:top-24 z-20 transition-all duration-300 shrink-0",
        isMainOpen ? "w-full lg:w-64" : "w-auto"
      )}
    >
      <Card
        className={cn(
          "shadow-2xs shadow-slate-200/50 dark:shadow-none bg-card rounded-2xl border-0 overflow-hidden transition-all duration-200",
          isMainOpen ? "p-3 sm:p-4" : "p-1.5"
        )}
      >
        {/* Toggle Button in First Div */}
        <button
          type="button"
          onClick={() => setIsMainOpen(!isMainOpen)}
          className={cn(
            "text-xs font-bold text-foreground rounded-xl flex items-center cursor-pointer select-none transition-colors w-full",
            isMainOpen
              ? "px-3 py-2.5 bg-muted/40 hover:bg-muted/70 justify-between"
              : "px-3 py-2 bg-muted/40 hover:bg-muted/70 justify-center gap-2"
          )}
          title={isMainOpen ? "إخفاء الفهرس" : "عرض الفهرس"}
        >
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary shrink-0" />
            <span className={cn(isMainOpen ? "block" : "hidden sm:inline")}>
              فهرس المحتويات
            </span>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground">
            {!isMainOpen && (
              <span className="text-[11px] font-normal text-muted-foreground hidden lg:inline">
                عرض
              </span>
            )}
            {isMainOpen ? (
              <PanelRightClose className="h-4 w-4 shrink-0" />
            ) : (
              <PanelRightOpen className="h-4 w-4 shrink-0" />
            )}
          </div>
        </button>

        {/* Navigation Content */}
        {isMainOpen && (
          <nav className="flex flex-col gap-2 pt-3 text-xs animate-in fade-in duration-200">
            {SECTIONS.map((sec) => {
              const isSecCollapsed = !!collapsedSections[sec.id];

              return (
                <div key={sec.id} className="space-y-1 pb-1">
                  {/* Parent Section Header */}
                  <div className="flex items-center justify-between group">
                    <a
                      href={`#${sec.id}`}
                      className={cn(
                        "flex-1 flex items-center gap-2 px-2.5 py-1.5 rounded-xl font-bold transition-colors",
                        sec.colorClass,
                        sec.hoverBg
                      )}
                    >
                      {sec.icon}
                      <span className="truncate">{sec.title}</span>
                    </a>

                    {sec.subItems.length > 0 && (
                      <button
                        type="button"
                        onClick={(e) => toggleSection(sec.id, e)}
                        className="p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors"
                        title={isSecCollapsed ? "توسعة" : "طي"}
                      >
                        {isSecCollapsed ? (
                          <ChevronDown className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronUp className="h-3.5 w-3.5" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Sub-items */}
                  {!isSecCollapsed && sec.subItems.length > 0 && (
                    <div className="mr-3 pr-2 flex flex-col gap-0.5 text-[11px] border-r-2 border-muted/40 my-1">
                      {sec.subItems.map((sub) => (
                        <a
                          key={sub.id}
                          href={`#${sub.id}`}
                          className="py-1 px-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors font-medium flex items-center gap-2"
                        >
                          <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", sec.dotColor)} />
                          <span className="truncate">{sub.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        )}
      </Card>
    </div>
  );
};
