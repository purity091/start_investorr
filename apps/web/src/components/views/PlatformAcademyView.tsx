"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Tag, 
  Clock, 
  CheckCircle2, 
  Lightbulb, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles,
  TrendingUp,
  DollarSign,
  Zap,
  Target,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Compass,
  FileText,
  List,
  Menu,
  HelpCircle,
  Loader2,
  FolderOpen,
  Folder,
  ArrowRight,
  LayoutGrid,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Type,
  AlertTriangle,
  Info,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { fetchPublicJson } from '@/lib/publicData';

export interface AcademyCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TableOfContentItem {
  id: string;
  title: string;
}

export interface SectionCallout {
  type: 'tip' | 'warning' | 'info' | 'example';
  title: string;
  text: string;
}

export interface ArticleSection {
  id: string;
  heading: string;
  content: string;
  callout?: SectionCallout;
}

export interface AcademyArticleIndexItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  categoryId: string;
  categoryName: string;
  readTime: string;
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
  updatedAt: string;
  icon: string;
  tags: string[];
  summary: string;
  keyTakeaway: string;
  tableOfContents?: TableOfContentItem[];
}

export interface AcademyFullArticle extends AcademyArticleIndexItem {
  platformApplication: string;
  sections: ArticleSection[];
  relatedArticles?: string[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  DollarSign,
  TrendingUp,
  Target,
  CheckCircle2,
  Sparkles,
  Compass,
  Lightbulb,
  BookOpen,
  FileText,
  Folder
};

const getIconComponent = (iconName: string) => {
  return ICON_MAP[iconName] || Folder;
};

const getCategoryStyle = (index: number) => {
  const styles = [
    { iconBg: 'bg-blue-500/10 text-blue-600 border-blue-200/50', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/60', hoverBorder: 'hover:border-blue-300' },
    { iconBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/50', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60', hoverBorder: 'hover:border-emerald-300' },
    { iconBg: 'bg-purple-500/10 text-purple-600 border-purple-200/50', badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/60', hoverBorder: 'hover:border-purple-300' },
    { iconBg: 'bg-amber-500/10 text-amber-600 border-amber-200/50', badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/60', hoverBorder: 'hover:border-amber-300' },
    { iconBg: 'bg-teal-500/10 text-teal-600 border-teal-200/50', badgeBg: 'bg-teal-50 text-teal-700 border-teal-200/60', hoverBorder: 'hover:border-teal-300' },
    { iconBg: 'bg-indigo-500/10 text-indigo-600 border-indigo-200/50', badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/60', hoverBorder: 'hover:border-indigo-300' },
  ];
  return styles[index % styles.length];
};

const getDifficultyBadge = (difficulty: 'مبتدئ' | 'متوسط' | 'متقدم' | string) => {
  switch (difficulty) {
    case 'مبتدئ':
      return (
        <Badge variant="outline" className="text-[10px] font-semibold px-1.5 py-0 bg-emerald-50 text-emerald-700 border-emerald-200/80 shrink-0">
          مبتدئ
        </Badge>
      );
    case 'متوسط':
      return (
        <Badge variant="outline" className="text-[10px] font-semibold px-1.5 py-0 bg-amber-50 text-amber-700 border-amber-200/80 shrink-0">
          متوسط
        </Badge>
      );
    case 'متقدم':
      return (
        <Badge variant="outline" className="text-[10px] font-semibold px-1.5 py-0 bg-violet-50 text-violet-700 border-violet-200/80 shrink-0">
          متقدم
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="text-[10px] font-semibold px-1.5 py-0 shrink-0">
          {difficulty}
        </Badge>
      );
  }
};

const renderCallout = (callout: SectionCallout, bodyFontSizeClass: string) => {
  const type = callout.type || 'info';
  
  const config = {
    tip: {
      bg: "bg-emerald-50/80 border-emerald-200/80 text-emerald-950",
      icon: Lightbulb,
      iconColor: "text-emerald-600",
      titleColor: "text-emerald-900"
    },
    warning: {
      bg: "bg-amber-50/80 border-amber-200/80 text-amber-950",
      icon: AlertTriangle,
      iconColor: "text-amber-600",
      titleColor: "text-amber-900"
    },
    info: {
      bg: "bg-sky-50/80 border-sky-200/80 text-sky-950",
      icon: Info,
      iconColor: "text-sky-600",
      titleColor: "text-sky-900"
    },
    example: {
      bg: "bg-purple-50/80 border-purple-200/80 text-purple-950",
      icon: Sparkles,
      iconColor: "text-purple-600",
      titleColor: "text-purple-900"
    }
  }[type] || {
    bg: "bg-muted/60 border-border text-foreground",
    icon: Sparkles,
    iconColor: "text-primary",
    titleColor: "text-foreground"
  };

  const IconComp = config.icon;

  return (
    <div className={cn("my-3 rounded-lg border p-3 space-y-1 transition-colors shadow-2xs", config.bg)}>
      <div className={cn("flex items-center gap-2 font-bold text-xs", config.titleColor)}>
        <IconComp className={cn("size-4 shrink-0", config.iconColor)} />
        <span>{callout.title}</span>
      </div>
      <p className={cn("text-xs leading-relaxed opacity-90 pr-6", bodyFontSizeClass)}>
        {callout.text}
      </p>
    </div>
  );
};

type FontSizeOption = 'sm' | 'base' | 'lg' | 'xl';

export const PlatformAcademyView: React.FC<{
  setActiveTab?: (tab: string) => void;
  initialCategories?: AcademyCategory[];
  initialArticles?: AcademyArticleIndexItem[];
}> = ({ setActiveTab, initialCategories, initialArticles }) => {
  const [categories, setCategories] = useState<AcademyCategory[]>(initialCategories || []);
  const [articlesIndex, setArticlesIndex] = useState<AcademyArticleIndexItem[]>(initialArticles || []);
  const [isLoadingIndex, setIsLoadingIndex] = useState(!initialCategories || !initialArticles);

  // View Mode: 'grid' vs 'reader'
  const [viewMode, setViewMode] = useState<'grid' | 'reader'>('grid');

  // Selected Article & Full Article JSON State
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [fullArticle, setFullArticle] = useState<AcademyFullArticle | null>(null);
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);

  // Collapsible Sidebars State
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);

  // Article Font Size State ('sm', 'base', 'lg', 'xl')
  const [fontSize, setFontSize] = useState<FontSizeOption>(() => {
    try {
      const stored = localStorage.getItem('start_investor_academy_font_size');
      return (stored as FontSizeOption) || 'base';
    } catch {
      return 'base';
    }
  });

  // Filtering & UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  // Bookmarking State
  const [savedArticles, setSavedArticles] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('start_investor_academy_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save Font Size preference
  const updateFontSize = (size: FontSizeOption) => {
    setFontSize(size);
    try {
      localStorage.setItem('start_investor_academy_font_size', size);
    } catch (err) {
      console.error('Failed to save font size', err);
    }
  };

  // 1. Load index.json on mount
  useEffect(() => {
    const loadIndex = async () => {
      try {
        setIsLoadingIndex(!initialCategories || !initialArticles);
        const data = initialCategories && initialArticles
          ? { categories: initialCategories, articles: initialArticles }
          : await fetchPublicJson<{ categories?: AcademyCategory[]; articles?: AcademyArticleIndexItem[] }>('/api/public-data/academy');
        setCategories(data.categories || []);
        setArticlesIndex(data.articles || []);

        const initialExpandState: Record<string, boolean> = {};
        (data.categories || []).forEach((cat: AcademyCategory) => {
          initialExpandState[cat.id] = true;
        });
        setExpandedCategories(initialExpandState);

        const params = new URLSearchParams(window.location.search);
        const articleParam = params.get('article');
        if (articleParam) {
          setSelectedSlug(articleParam);
          setViewMode('reader');
        }
      } catch (err) {
        console.error('Failed to load Academy Index JSON:', err);
      } finally {
        setIsLoadingIndex(false);
      }
    };

    loadIndex();
  }, [initialArticles, initialCategories]);

  // 2. Load article JSON when selectedSlug changes and viewMode is 'reader'
  useEffect(() => {
    if (!selectedSlug || viewMode !== 'reader') return;

    const loadFullArticle = async () => {
      try {
        setIsLoadingArticle(true);
        const articleData = await fetchPublicJson<AcademyFullArticle>(`/data/academy/articles/${selectedSlug}.json`);
        setFullArticle(articleData);
        if (articleData.tableOfContents && articleData.tableOfContents.length > 0) {
          setActiveSectionId(articleData.tableOfContents[0].id);
        }

        const url = new URL(window.location.href);
        url.searchParams.set('article', selectedSlug);
        window.history.pushState({}, '', url.toString());
      } catch (err) {
        console.error(`Failed to load article JSON for ${selectedSlug}:`, err);
      } finally {
        setIsLoadingArticle(false);
      }
    };

    loadFullArticle();
  }, [selectedSlug, viewMode]);

  const openArticle = (slug: string) => {
    setSelectedSlug(slug);
    setViewMode('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const returnToGrid = () => {
    setViewMode('grid');
    const url = new URL(window.location.href);
    url.searchParams.delete('article');
    window.history.pushState({}, '', url.toString());
  };

  const toggleSaveArticle = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSavedArticles((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('start_investor_academy_saved', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save article preferences', err);
      }
      return updated;
    });
  };

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  const filteredArticles = useMemo(() => {
    return articlesIndex.filter((article) => {
      const matchesCategory = selectedCategoryFilter === 'all' || article.categoryId === selectedCategoryFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q)) ||
        article.keyTakeaway.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [articlesIndex, searchQuery, selectedCategoryFilter]);

  const currentArticleIndex = useMemo(() => {
    return articlesIndex.findIndex((a) => a.slug === selectedSlug);
  }, [articlesIndex, selectedSlug]);

  const prevArticle = currentArticleIndex > 0 ? articlesIndex[currentArticleIndex - 1] : null;
  const nextArticle = currentArticleIndex < articlesIndex.length - 1 ? articlesIndex[currentArticleIndex + 1] : null;

  const scrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Calculate dynamic center column grid span based on sidebar collapse states
  const mainContentGridSpan = useMemo(() => {
    if (isLeftSidebarCollapsed && isRightSidebarCollapsed) return 'lg:col-span-12';
    if (isLeftSidebarCollapsed && !isRightSidebarCollapsed) return 'lg:col-span-9';
    if (!isLeftSidebarCollapsed && isRightSidebarCollapsed) return 'lg:col-span-9';
    return 'lg:col-span-6';
  }, [isLeftSidebarCollapsed, isRightSidebarCollapsed]);

  // Article Font Size Class Mapping
  const bodyFontSizeClass = useMemo(() => {
    switch (fontSize) {
      case 'sm': return 'text-xs leading-relaxed';
      case 'base': return 'text-xs sm:text-sm leading-relaxed';
      case 'lg': return 'text-sm sm:text-base leading-relaxed';
      case 'xl': return 'text-base sm:text-lg leading-relaxed';
      default: return 'text-xs sm:text-sm leading-relaxed';
    }
  }, [fontSize]);

  const headingFontSizeClass = useMemo(() => {
    switch (fontSize) {
      case 'sm': return 'text-xs font-bold';
      case 'base': return 'text-sm sm:text-base font-bold';
      case 'lg': return 'text-base sm:text-lg font-bold';
      case 'xl': return 'text-lg sm:text-xl font-bold';
      default: return 'text-sm sm:text-base font-bold';
    }
  }, [fontSize]);

  if (isLoadingIndex) {
    return (
      <div dir="rtl" className="flex min-h-[350px] w-full flex-col items-center justify-center gap-2">
        <Loader2 className="size-7 animate-spin text-primary" />
        <p className="text-xs font-medium text-muted-foreground">جاري تحميل المعرفة الأكاديمية...</p>
      </div>
    );
  }

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-[1600px] flex-col gap-3.5 p-2 sm:p-4 font-sans">
      
      {/* Sleek Hero Header & Clean Segmented Filter Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-2xs">
        
        {/* Top Hero Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl border border-input bg-background text-foreground hover:bg-accent transition-colors shrink-0 mt-0.5"
            >
              <Menu className="size-4" />
            </button>

            <div className="flex size-10 sm:size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0 shadow-2xs">
              <GraduationCap className="size-5 sm:size-6" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                  أكاديمية المنصة والمفاهيم
                </h1>
                <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0">
                  {articlesIndex.length} مقال
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium max-w-2xl leading-relaxed">
                دليل المفاهيم والمصطلحات والتحليلات الميدانية لخطة الاستثمار وتطوير الأعمال
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="بحث في المقالات والمفاهيم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-9.5 pl-8 bg-background h-10 text-xs focus-visible:ring-1 focus-visible:ring-primary rounded-xl border-input shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Clean Segmented Filter Bar & View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border/60 pt-3">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 bg-muted/60 p-1 rounded-xl border border-border/50">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all shrink-0",
                selectedCategoryFilter === 'all'
                  ? "bg-background text-foreground shadow-2xs font-bold border border-border/70"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50 font-medium"
              )}
            >
              <span>الكل</span>
              <span className="text-[11px] font-semibold text-muted-foreground">({articlesIndex.length})</span>
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategoryFilter === cat.id;
              const count = articlesIndex.filter((a) => a.categoryId === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryFilter(cat.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap shrink-0",
                    isSelected
                      ? "bg-background text-foreground shadow-2xs font-bold border border-border/70"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50 font-medium"
                  )}
                >
                  <span>{cat.title}</span>
                  <span className="text-[11px] font-semibold text-muted-foreground">({count})</span>
                </button>
              );
            })}
          </div>

          {/* View Switcher Segmented Control */}
          <div className="flex items-center gap-1 shrink-0 bg-muted/60 p-1 rounded-xl border border-border/50 self-end sm:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all",
                viewMode === 'grid'
                  ? "bg-background text-foreground shadow-2xs font-bold border border-border/70"
                  : "text-muted-foreground hover:text-foreground font-medium"
              )}
            >
              <LayoutGrid className="size-3.5" />
              <span>الأقسام</span>
            </button>
            {selectedSlug && (
              <button
                onClick={() => setViewMode('reader')}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all",
                  viewMode === 'reader'
                    ? "bg-background text-foreground shadow-2xs font-bold border border-border/70"
                    : "text-muted-foreground hover:text-foreground font-medium"
                )}
              >
                <FileText className="size-3.5" />
                <span>المقال الحالي</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODE 1: Category Cards Grid View                                         */}
      {/* ========================================================================= */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 items-start">
          {categories.map((cat, catIdx) => {
            if (selectedCategoryFilter !== 'all' && selectedCategoryFilter !== cat.id) return null;

            const catArticles = filteredArticles.filter((a) => a.categoryId === cat.id);
            if (catArticles.length === 0 && searchQuery) return null;

            const CatIcon = getIconComponent(cat.icon);
            const style = getCategoryStyle(catIdx);

            return (
              <Card
                key={cat.id}
                className={cn(
                  "flex flex-col justify-between border border-border bg-card p-4 rounded-xl shadow-2xs transition-all duration-200 hover:shadow-xs",
                  style.hoverBorder
                )}
              >
                <div className="space-y-3">
                  {/* Category Header */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-border/60">
                    <div className="flex items-center gap-2.5">
                      <div className={cn("flex size-9 items-center justify-center rounded-xl shrink-0 border", style.iconBg)}>
                        <CatIcon className="size-4.5" />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-card-foreground leading-snug">
                          {cat.title}
                        </h2>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    <Badge variant="outline" className={cn("text-[11px] font-bold px-2 py-0.5 shrink-0 rounded-full", style.badgeBg)}>
                      {catArticles.length}
                    </Badge>
                  </div>

                  {/* Articles List */}
                  <div className="space-y-1">
                    {catArticles.slice(0, 5).map((art) => (
                      <button
                        key={art.id}
                        onClick={() => openArticle(art.slug)}
                        className="group flex w-full items-center justify-between gap-2 p-2 rounded-lg text-right hover:bg-muted/70 transition-all border border-transparent hover:border-border/60"
                      >
                        <div className="flex items-center gap-2 text-xs font-medium text-card-foreground group-hover:text-primary transition-colors min-w-0">
                          <div className="size-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all shrink-0" />
                          <span className="truncate">{art.title}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {getDifficultyBadge(art.difficulty)}
                          <ChevronLeft className="size-3.5 text-muted-foreground/60 group-hover:text-primary group-hover:-translate-x-0.5 transition-all" />
                        </div>
                      </button>
                    ))}

                    {catArticles.length === 0 && (
                      <div className="py-4 text-center rounded-lg border border-dashed border-border/60 bg-muted/20">
                        <p className="text-xs text-muted-foreground">لا توجد مقالات مطابقة للبحث</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Explore Button */}
                {catArticles.length > 0 && (
                  <div className="mt-3.5 pt-2.5 border-t border-border/60">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openArticle(catArticles[0].slug)}
                      className="w-full text-xs font-bold justify-between h-8 text-primary hover:bg-primary/10 hover:text-primary px-2.5 rounded-lg"
                    >
                      <span>تصفح مقالات القسم ({catArticles.length})</span>
                      <ChevronLeft className="size-4" />
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: Article Reader View with Sidebar Collapsing & Font Controls       */}
      {/* ========================================================================= */}
      {viewMode === 'reader' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
          
          {/* Controls Bar above Article Reader: Collapsible Sidebars & Font Size Stepper */}
          <div className="lg:col-span-12 flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-border bg-card p-2 px-3 text-xs font-medium shadow-2xs">
            {/* Left Sidebar Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed)}
              className="h-8 text-xs px-2.5 gap-1.5 text-foreground rounded-lg hover:bg-accent"
              title={isLeftSidebarCollapsed ? "توسيع قائمة الدروس" : "طي قائمة الدروس"}
            >
              {isLeftSidebarCollapsed ? (
                <>
                  <PanelLeftOpen className="size-4 text-primary" />
                  <span>إظهار شجرة الدروس</span>
                </>
              ) : (
                <>
                  <PanelLeftClose className="size-4 text-muted-foreground" />
                  <span>طي شجرة الدروس</span>
                </>
              )}
            </Button>

            {/* Font Size Adjuster Controls */}
            <div className="flex items-center gap-1.5 bg-muted/60 border border-border/60 rounded-lg p-1">
              <Type className="size-3.5 text-muted-foreground ml-1 mr-0.5" />
              <span className="text-[11px] font-bold text-foreground shrink-0 ml-1">حجم النص:</span>
              
              {(['sm', 'base', 'lg', 'xl'] as FontSizeOption[]).map((size) => {
                const labels: Record<FontSizeOption, string> = {
                  sm: 'صغير',
                  base: 'عادي',
                  lg: 'كبير',
                  xl: 'كبير جداً'
                };
                return (
                  <button
                    key={size}
                    onClick={() => updateFontSize(size)}
                    className={cn(
                      "px-2 py-0.5 text-[11px] font-semibold rounded-md transition-all",
                      fontSize === size
                        ? "bg-background text-foreground shadow-2xs font-bold border border-border/60"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    )}
                  >
                    {labels[size]}
                  </button>
                );
              })}
            </div>

            {/* Right Sidebar Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRightSidebarCollapsed(!isRightSidebarCollapsed)}
              className="h-8 text-xs px-2.5 gap-1.5 text-foreground rounded-lg hover:bg-accent"
              title={isRightSidebarCollapsed ? "توسيع فهرس المحتويات" : "طي فهرس المحتويات"}
            >
              {isRightSidebarCollapsed ? (
                <>
                  <PanelRightOpen className="size-4 text-primary" />
                  <span>إظهار فهرس المحتوى</span>
                </>
              ) : (
                <>
                  <PanelRightClose className="size-4 text-muted-foreground" />
                  <span>طي فهرس المحتوى</span>
                </>
              )}
            </Button>
          </div>

          {/* Left Sub-Sidebar: Categories & Articles Tree (Collapsible) */}
          {!isLeftSidebarCollapsed && (
            <aside
              className={cn(
                "fixed inset-y-0 right-0 z-40 w-72 bg-card p-3 border-l border-border shadow-lg transition-transform duration-200 lg:static lg:z-0 lg:w-auto lg:col-span-3 lg:border lg:rounded-xl lg:shadow-2xs overflow-y-auto max-h-[82vh]",
                isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
              )}
            >
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <div className="flex items-center gap-1.5">
                  <FolderOpen className="size-4 text-primary" />
                  <span className="text-xs font-bold text-foreground">الأقسام والدروس</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsLeftSidebarCollapsed(true)}
                    className="hidden lg:block p-1 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted"
                    title="طي هذا الشريط"
                  >
                    <PanelLeftClose className="size-3.5" />
                  </button>
                  <button onClick={() => setIsMobileSidebarOpen(false)} className="lg:hidden p-1 text-muted-foreground">
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                {categories.map((cat, idx) => {
                  const catArticles = filteredArticles.filter((a) => a.categoryId === cat.id);
                  if (catArticles.length === 0 && selectedCategoryFilter !== 'all') return null;

                  const isExpanded = expandedCategories[cat.id] ?? true;
                  const CatIcon = getIconComponent(cat.icon);
                  const style = getCategoryStyle(idx);

                  return (
                    <div key={cat.id} className="rounded-lg border border-border/60 bg-muted/20 p-1.5 space-y-1">
                      <button
                        onClick={() => toggleCategoryExpand(cat.id)}
                        className="flex w-full items-center justify-between p-1.5 text-right rounded-md hover:bg-muted/80 text-foreground transition-colors text-xs font-bold"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={cn("flex size-6 items-center justify-center rounded-md shrink-0 border", style.iconBg)}>
                            <CatIcon className="size-3.5" />
                          </div>
                          <span className="truncate">{cat.title}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4 font-semibold">
                            {catArticles.length}
                          </Badge>
                          <ChevronDown className={cn("size-3.5 text-muted-foreground transition-transform duration-200", isExpanded ? "" : "-rotate-90")} />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="mr-2 border-r-2 border-border/60 pr-1.5 space-y-0.5 pt-0.5">
                          {catArticles.map((art) => {
                            const isActive = art.slug === selectedSlug;

                            return (
                              <button
                                key={art.id}
                                onClick={() => {
                                  openArticle(art.slug);
                                  setIsMobileSidebarOpen(false);
                                }}
                                className={cn(
                                  "flex w-full items-center justify-between gap-1.5 p-1.5 rounded-md text-right text-xs transition-all",
                                  isActive
                                    ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
                                )}
                              >
                                <span className="truncate">{art.title}</span>
                                <span className={cn("text-[9px] shrink-0 font-medium opacity-80", isActive ? "text-primary-foreground" : "text-muted-foreground")}>
                                  {art.readTime}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </aside>
          )}

          {/* Center Main Article Content (Dynamic Column Grid & Font Size) */}
          <main className={cn("flex flex-col gap-3.5", mainContentGridSpan)}>
            {isLoadingArticle ? (
              <div className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-xl border border-border bg-card p-6 shadow-2xs">
                <Loader2 className="size-7 animate-spin text-primary mb-2" />
                <p className="text-xs font-medium text-muted-foreground">جاري تحميل محتوى المقال...</p>
              </div>
            ) : fullArticle ? (
              <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:p-6 shadow-2xs">
                
                {/* Article Header & Meta */}
                <div className="flex flex-col gap-2.5 border-b border-border pb-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <button onClick={returnToGrid} className="hover:text-primary transition-colors font-medium">الأكاديمية</button>
                      <ChevronLeft className="size-3" />
                      <span className="text-foreground font-bold">{fullArticle.categoryName}</span>
                    </div>

                    <Button
                      variant={savedArticles.includes(fullArticle.id) ? "secondary" : "outline"}
                      size="sm"
                      onClick={(e) => toggleSaveArticle(fullArticle.id, e)}
                      className={cn(
                        "h-7 text-xs px-2.5 gap-1.5 rounded-lg transition-colors",
                        savedArticles.includes(fullArticle.id) ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100" : ""
                      )}
                    >
                      {savedArticles.includes(fullArticle.id) ? (
                        <>
                          <BookmarkCheck className="size-3.5 text-amber-600 fill-amber-600" />
                          <span className="font-semibold">محفوظ</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="size-3.5 text-muted-foreground" />
                          <span>حفظ المقال</span>
                        </>
                      )}
                    </Button>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-black text-foreground leading-snug tracking-tight mt-1">
                    {fullArticle.title}
                  </h1>
                  
                  {fullArticle.subtitle && (
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                      {fullArticle.subtitle}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary border-0">
                      {fullArticle.categoryName}
                    </Badge>
                    <span className="text-muted-foreground/40">•</span>
                    <span className="flex items-center gap-1 font-medium text-muted-foreground">
                      <Clock className="size-3.5 text-muted-foreground" />
                      {fullArticle.readTime}
                    </span>
                    <span className="text-muted-foreground/40">•</span>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground font-medium">المستوى:</span>
                      {getDifficultyBadge(fullArticle.difficulty)}
                    </div>
                  </div>
                </div>

                {/* Key Takeaway Box */}
                <div className="rounded-xl border border-amber-200/80 bg-amber-50/70 p-3.5 sm:p-4 space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                    <div className="flex size-6 items-center justify-center rounded-md bg-amber-500/20 text-amber-700 shrink-0">
                      <Lightbulb className="size-3.5" />
                    </div>
                    <span className="text-amber-950 font-bold">الخلاصة التنفيذية المستفادة</span>
                  </div>
                  <p className={cn("font-medium text-amber-950 pr-8 leading-relaxed", bodyFontSizeClass)}>
                    {fullArticle.keyTakeaway}
                  </p>
                </div>

                {/* Platform Application Box */}
                <div className="rounded-xl border border-blue-200/80 bg-blue-50/70 p-3.5 sm:p-4 space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
                    <div className="flex size-6 items-center justify-center rounded-md bg-blue-500/20 text-blue-700 shrink-0">
                      <CheckCircle2 className="size-3.5" />
                    </div>
                    <span className="text-blue-950 font-bold">كيف يُستخدم هذا المفهوم داخل منصتنا؟</span>
                  </div>
                  <p className={cn("font-medium text-blue-950 pr-8 leading-relaxed", bodyFontSizeClass)}>
                    {fullArticle.platformApplication}
                  </p>
                </div>

                {/* Article Content Sections */}
                <div className="space-y-6 pt-2">
                  {fullArticle.sections.map((sec) => (
                    <section id={sec.id} key={sec.id} className="space-y-2 scroll-mt-20">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-border/80">
                        <div className="size-2 rounded-full bg-primary shrink-0" />
                        <h2 className={cn("text-foreground font-bold tracking-tight", headingFontSizeClass)}>
                          {sec.heading}
                        </h2>
                      </div>
                      
                      <p className={cn("text-foreground/90 whitespace-pre-line font-normal leading-relaxed", bodyFontSizeClass)}>
                        {sec.content}
                      </p>

                      {sec.callout && renderCallout(sec.callout, bodyFontSizeClass)}
                    </section>
                  ))}
                </div>

                {/* Article Tags */}
                <div className="mt-4 pt-3.5 border-t border-border flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1 font-bold text-foreground">
                    <Tag className="size-3.5 text-primary" />
                    <span>الكلمات المفتاحية:</span>
                  </div>
                  {fullArticle.tags.map((t, idx) => (
                    <Badge key={idx} variant="outline" className="text-[10px] font-medium px-2 py-0.5 bg-muted/40 hover:bg-muted transition-colors border-border/80">
                      #{t}
                    </Badge>
                  ))}
                </div>

                {/* Next / Prev Navigation */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border">
                  {prevArticle ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openArticle(prevArticle.slug)}
                      className="h-auto py-2 px-3 justify-start gap-2 text-right w-full sm:w-auto text-xs rounded-xl hover:border-primary/40"
                    >
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                      <div className="truncate max-w-[200px]">
                        <span className="text-[10px] text-muted-foreground font-medium block">المقال السابق</span>
                        <span className="font-bold text-foreground truncate block">{prevArticle.title}</span>
                      </div>
                    </Button>
                  ) : <div />}

                  {nextArticle && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openArticle(nextArticle.slug)}
                      className="h-auto py-2 px-3 justify-end gap-2 text-left w-full sm:w-auto text-xs rounded-xl hover:border-primary/40"
                    >
                      <div className="truncate max-w-[200px]">
                        <span className="text-[10px] text-muted-foreground font-medium block">المقال التالي</span>
                        <span className="font-bold text-foreground truncate block">{nextArticle.title}</span>
                      </div>
                      <ChevronLeft className="size-4 shrink-0 text-muted-foreground" />
                    </Button>
                  )}
                </div>

              </div>
            ) : (
              <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-6 text-center">
                <FolderOpen className="size-10 text-muted-foreground/60 mb-3" />
                <h3 className="text-sm font-bold text-foreground">اختر مقالاً من القائمة الجانبية لقراءته</h3>
                <p className="text-xs text-muted-foreground mt-1">تصفح أقسام الأكاديمية واستكشف التحليلات</p>
              </div>
            )}
          </main>

          {/* Right Sticky Table of Contents (Collapsible) */}
          {!isRightSidebarCollapsed && (
            <aside className="hidden lg:block lg:col-span-3 sticky top-4 space-y-3 rounded-xl border border-border bg-card p-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <div className="flex items-center gap-2">
                  <List className="size-4 text-primary" />
                  <h3 className="text-xs font-bold text-foreground">محتويات المقال</h3>
                </div>
                <button
                  onClick={() => setIsRightSidebarCollapsed(true)}
                  className="p-1 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted"
                  title="طي محتويات المقال"
                >
                  <PanelRightClose className="size-3.5" />
                </button>
              </div>

              {fullArticle && fullArticle.tableOfContents && fullArticle.tableOfContents.length > 0 ? (
                <nav className="space-y-1">
                  {fullArticle.tableOfContents.map((toc) => {
                    const isActive = activeSectionId === toc.id;
                    return (
                      <button
                        key={toc.id}
                        onClick={() => scrollToSection(toc.id)}
                        className={cn(
                          "flex w-full items-center gap-2 p-1.5 rounded-lg text-right text-xs transition-all",
                          isActive
                            ? "bg-primary/10 text-primary font-bold border-r-2 border-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/60 font-medium"
                        )}
                      >
                        <div className={cn("size-1.5 rounded-full shrink-0 transition-colors", isActive ? "bg-primary" : "bg-muted-foreground/40")} />
                        <span className="truncate">{toc.title}</span>
                      </button>
                    );
                  })}
                </nav>
              ) : (
                <p className="text-xs text-muted-foreground py-2 text-center">لا توجد أقسام فرعية</p>
              )}

              <div className="mt-4 pt-3 border-t border-border">
                <div className="rounded-xl bg-muted/40 border border-border/80 p-3 text-center space-y-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto">
                    <HelpCircle className="size-4" />
                  </div>
                  <p className="text-xs font-bold text-foreground leading-snug">تطبيق هذا المفهوم على مشروعك</p>
                  <p className="text-[11px] text-muted-foreground">استخدم أدوات المنصة لتفعيل هذه المفاهيم في عملك</p>
                  {setActiveTab && (
                    <Button
                      onClick={() => setActiveTab('strategic-dashboard')}
                      size="sm"
                      className="w-full text-xs h-8 font-bold px-2 rounded-lg"
                    >
                      انتقل للنموذج الاحترافي
                    </Button>
                  )}
                </div>
              </div>
            </aside>
          )}

        </div>
      )}

    </div>
  );
};

export default PlatformAcademyView;
