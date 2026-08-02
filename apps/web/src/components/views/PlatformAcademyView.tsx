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
  Minus,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

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

type FontSizeOption = 'sm' | 'base' | 'lg' | 'xl';

export const PlatformAcademyView: React.FC<{ setActiveTab?: (tab: string) => void }> = ({ setActiveTab }) => {
  const [categories, setCategories] = useState<AcademyCategory[]>([]);
  const [articlesIndex, setArticlesIndex] = useState<AcademyArticleIndexItem[]>([]);
  const [isLoadingIndex, setIsLoadingIndex] = useState(true);

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
        setIsLoadingIndex(true);
        const res = await fetch('/data/academy/index.json');
        if (res.ok) {
          const data = await res.json();
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
        }
      } catch (err) {
        console.error('Failed to load Academy Index JSON:', err);
      } finally {
        setIsLoadingIndex(false);
      }
    };

    loadIndex();
  }, []);

  // 2. Load article JSON when selectedSlug changes and viewMode is 'reader'
  useEffect(() => {
    if (!selectedSlug || viewMode !== 'reader') return;

    const loadFullArticle = async () => {
      try {
        setIsLoadingArticle(true);
        const res = await fetch(`/data/academy/articles/${selectedSlug}.json`);
        if (res.ok) {
          const articleData = await res.json();
          setFullArticle(articleData);
          if (articleData.tableOfContents && articleData.tableOfContents.length > 0) {
            setActiveSectionId(articleData.tableOfContents[0].id);
          }

          const url = new URL(window.location.href);
          url.searchParams.set('article', selectedSlug);
          window.history.pushState({}, '', url.toString());
        }
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
      case 'sm': return 'text-xs leading-normal';
      case 'base': return 'text-xs sm:text-sm leading-relaxed';
      case 'lg': return 'text-sm sm:text-base leading-relaxed';
      case 'xl': return 'text-base sm:text-lg leading-relaxed';
      default: return 'text-xs sm:text-sm leading-relaxed';
    }
  }, [fontSize]);

  const headingFontSizeClass = useMemo(() => {
    switch (fontSize) {
      case 'sm': return 'text-xs font-bold';
      case 'base': return 'text-sm font-bold';
      case 'lg': return 'text-base font-bold';
      case 'xl': return 'text-lg sm:text-xl font-bold';
      default: return 'text-sm sm:text-bold';
    }
  }, [fontSize]);

  if (isLoadingIndex) {
    return (
      <div dir="rtl" className="flex min-h-[350px] w-full flex-col items-center justify-center gap-2">
        <Loader2 className="size-7 animate-spin text-muted-foreground" />
        <p className="text-xs font-medium text-muted-foreground">جاري تحميل المعرفة الأكاديمية...</p>
      </div>
    );
  }

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 p-2 sm:p-3 font-sans">
      
      {/* Header & Search Toolbar */}
      <div className="flex flex-col gap-2.5 rounded-xl border border-border bg-card p-3 shadow-2xs">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden p-1.5 rounded-md border border-input bg-background text-foreground hover:bg-accent"
            >
              <Menu className="size-4" />
            </button>
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
              <BookOpen className="size-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-foreground tracking-tight">
                  أكاديمية المنصة والمفاهيم
                </h1>
                <Badge variant="secondary" className="text-[10px] font-semibold px-1.5 py-0">
                  {articlesIndex.length} مقال
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">
                دليل المفاهيم والمصطلحات والتحليلات الميدانية لخطة الاستثمار
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="بحث في المفاهيم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-8 bg-background h-8 text-xs focus-visible:ring-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
        </div>

        {/* View Switcher & Category Filter Pills */}
        <div className="flex items-center justify-between gap-2 border-t border-border/60 pt-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={cn(
                "px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors border",
                selectedCategoryFilter === 'all'
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-input hover:bg-accent hover:text-accent-foreground"
              )}
            >
              الكل ({categories.length})
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategoryFilter === cat.id;
              const count = articlesIndex.filter((a) => a.categoryId === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryFilter(cat.id)}
                  className={cn(
                    "px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors border whitespace-nowrap",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-input hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {cat.title} ({count})
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-7 text-xs font-medium px-2 gap-1"
            >
              <LayoutGrid className="size-3.5" />
              <span>الأقسام</span>
            </Button>
            {selectedSlug && (
              <Button
                variant={viewMode === 'reader' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('reader')}
                className="h-7 text-xs font-medium px-2 gap-1"
              >
                <FileText className="size-3.5" />
                <span>المقال</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: Category Cards Grid View                                         */}
      {/* ========================================================================= */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
          {categories.map((cat) => {
            if (selectedCategoryFilter !== 'all' && selectedCategoryFilter !== cat.id) return null;

            const catArticles = filteredArticles.filter((a) => a.categoryId === cat.id);
            if (catArticles.length === 0 && searchQuery) return null;

            const CatIcon = getIconComponent(cat.icon);

            return (
              <Card
                key={cat.id}
                className="flex flex-col justify-between border border-border bg-card p-3 rounded-xl shadow-2xs hover:border-primary/40 transition-colors"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-md bg-muted text-foreground shrink-0 border border-border">
                        <CatIcon className="size-3.5" />
                      </div>
                      <div>
                        <h2 className="text-xs font-bold text-card-foreground leading-snug">
                          {cat.title}
                        </h2>
                        <p className="text-[10px] text-muted-foreground line-clamp-1">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    <Badge variant="secondary" className="text-[10px] font-semibold px-1.5 py-0 shrink-0">
                      {catArticles.length}
                    </Badge>
                  </div>

                  {/* Articles List */}
                  <div className="mt-2 space-y-0.5">
                    {catArticles.slice(0, 4).map((art) => (
                      <button
                        key={art.id}
                        onClick={() => openArticle(art.slug)}
                        className="group flex w-full items-center justify-between gap-2 p-1.5 rounded-md text-right hover:bg-muted/60 transition-colors"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-medium text-card-foreground group-hover:text-primary transition-colors truncate">
                          <FileText className="size-3 text-muted-foreground shrink-0 group-hover:text-primary" />
                          <span className="truncate">{art.title}</span>
                        </div>
                        <ChevronLeft className="size-3 text-muted-foreground shrink-0 opacity-60 group-hover:opacity-100" />
                      </button>
                    ))}

                    {catArticles.length === 0 && (
                      <p className="text-[11px] text-muted-foreground py-1.5 text-center">لا توجد مقالات</p>
                    )}
                  </div>
                </div>

                {/* Explore Button */}
                {catArticles.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-border/60">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openArticle(catArticles[0].slug)}
                      className="w-full text-xs font-medium justify-between h-7 text-primary hover:bg-primary/10 hover:text-primary px-2"
                    >
                      <span>استكشف ({catArticles.length})</span>
                      <ChevronLeft className="size-3.5" />
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
          
          {/* Controls Bar above Article Reader: Collapsible Sidebars & Font Size Stepper */}
          <div className="lg:col-span-12 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            {/* Left Sidebar Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed)}
              className="h-7 text-xs px-2 gap-1 text-foreground"
              title={isLeftSidebarCollapsed ? "توسيع قائمة الدروس" : "طي قائمة الدروس"}
            >
              {isLeftSidebarCollapsed ? (
                <>
                  <PanelLeftOpen className="size-3.5 text-primary" />
                  <span>إظهار شجرة الأقسام</span>
                </>
              ) : (
                <>
                  <PanelLeftClose className="size-3.5" />
                  <span>طي شجرة الأقسام</span>
                </>
              )}
            </Button>

            {/* Font Size Adjuster Controls (حجم الخط) */}
            <div className="flex items-center gap-1 bg-background border border-border/80 rounded-md px-2 py-0.5 shadow-2xs">
              <Type className="size-3.5 text-muted-foreground ml-1" />
              <span className="text-[11px] font-bold text-foreground shrink-0 ml-1">حجم الخط:</span>
              
              <button
                onClick={() => updateFontSize('sm')}
                className={cn(
                  "px-1.5 py-0.5 text-[10px] font-semibold rounded transition-colors",
                  fontSize === 'sm' ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
                )}
              >
                صغير
              </button>
              <button
                onClick={() => updateFontSize('base')}
                className={cn(
                  "px-1.5 py-0.5 text-[10px] font-semibold rounded transition-colors",
                  fontSize === 'base' ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
                )}
              >
                عادي
              </button>
              <button
                onClick={() => updateFontSize('lg')}
                className={cn(
                  "px-1.5 py-0.5 text-[10px] font-semibold rounded transition-colors",
                  fontSize === 'lg' ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
                )}
              >
                كبير
              </button>
              <button
                onClick={() => updateFontSize('xl')}
                className={cn(
                  "px-1.5 py-0.5 text-[10px] font-semibold rounded transition-colors",
                  fontSize === 'xl' ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
                )}
              >
                كبير جداً
              </button>
            </div>

            {/* Right Sidebar Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsRightSidebarCollapsed(!isRightSidebarCollapsed)}
              className="h-7 text-xs px-2 gap-1 text-foreground"
              title={isRightSidebarCollapsed ? "توسيع فهرس المحتويات" : "طي فهرس المحتويات"}
            >
              {isRightSidebarCollapsed ? (
                <>
                  <PanelRightOpen className="size-3.5 text-primary" />
                  <span>إظهار محتويات المقال</span>
                </>
              ) : (
                <>
                  <PanelRightClose className="size-3.5" />
                  <span>طي محتويات المقال</span>
                </>
              )}
            </Button>
          </div>

          {/* Left Sub-Sidebar: Categories & Articles Tree (Collapsible) */}
          {!isLeftSidebarCollapsed && (
            <aside
              className={cn(
                "fixed inset-y-0 right-0 z-40 w-72 bg-card p-2.5 border-l border-border shadow-md transition-transform duration-200 lg:static lg:z-0 lg:w-auto lg:col-span-3 lg:border lg:rounded-xl lg:shadow-2xs overflow-y-auto max-h-[82vh]",
                isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
              )}
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-border">
                <span className="text-xs font-bold text-foreground">الأقسام والدروس</span>
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

              <div className="space-y-1.5 pt-1.5">
                {categories.map((cat) => {
                  const catArticles = filteredArticles.filter((a) => a.categoryId === cat.id);
                  if (catArticles.length === 0 && selectedCategoryFilter !== 'all') return null;

                  const isExpanded = expandedCategories[cat.id] ?? true;
                  const CatIcon = getIconComponent(cat.icon);

                  return (
                    <div key={cat.id} className="rounded-md border border-border/60 bg-muted/20 p-1 space-y-0.5">
                      <button
                        onClick={() => toggleCategoryExpand(cat.id)}
                        className="flex w-full items-center justify-between p-1 text-right rounded-md hover:bg-muted text-foreground transition-colors text-xs font-semibold"
                      >
                        <div className="flex items-center gap-1.5">
                          <CatIcon className="size-3 text-muted-foreground" />
                          <span className="truncate">{cat.title}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="text-[9px] px-1 py-0 h-4">
                            {catArticles.length}
                          </Badge>
                          <ChevronDown className={cn("size-3 text-muted-foreground transition-transform", isExpanded ? "" : "-rotate-90")} />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="mr-1.5 border-r border-border pr-1.5 space-y-0.5 pt-0.5">
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
                                  "flex w-full items-center justify-between gap-1.5 p-1 rounded-md text-right text-xs transition-colors",
                                  isActive
                                    ? "bg-primary text-primary-foreground font-semibold"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                              >
                                <span className="truncate">{art.title}</span>
                                <span className="text-[9px] shrink-0 opacity-70">{art.readTime}</span>
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
          <main className={cn("flex flex-col gap-3", mainContentGridSpan)}>
            {isLoadingArticle ? (
              <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-xl border border-border bg-card p-6">
                <Loader2 className="size-6 animate-spin text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">جاري تحميل المقال...</p>
              </div>
            ) : fullArticle ? (
              <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:p-5 shadow-2xs">
                
                {/* Article Header & Breadcrumbs */}
                <div className="flex flex-col gap-1.5 border-b border-border pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <button onClick={returnToGrid} className="hover:text-foreground underline">الأكاديمية</button>
                      <ChevronLeft className="size-3" />
                      <span className="text-foreground font-medium">{fullArticle.categoryName}</span>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => toggleSaveArticle(fullArticle.id, e)}
                      className="h-6 text-xs px-2 gap-1"
                    >
                      {savedArticles.includes(fullArticle.id) ? (
                        <>
                          <BookmarkCheck className="size-3.5 text-amber-500 fill-amber-500" />
                          <span>محفوظ</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="size-3.5 text-muted-foreground" />
                          <span>حفظ</span>
                        </>
                      )}
                    </Button>
                  </div>

                  <h1 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                    {fullArticle.title}
                  </h1>
                  
                  {fullArticle.subtitle && (
                    <p className="text-xs text-muted-foreground font-normal">
                      {fullArticle.subtitle}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-[10px] font-medium px-1.5 py-0">
                      {fullArticle.categoryName}
                    </Badge>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {fullArticle.readTime}
                    </span>
                    <span>•</span>
                    <span>المستوى: {fullArticle.difficulty}</span>
                  </div>
                </div>

                {/* Key Takeaway */}
                <div className="rounded-lg border border-amber-200/80 bg-amber-50/60 p-2.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                    <Lightbulb className="size-3.5 text-amber-600 shrink-0" />
                    <span>الخلاصة التنفيذية المستفادة</span>
                  </div>
                  <p className={cn("font-medium text-amber-950", bodyFontSizeClass)}>
                    {fullArticle.keyTakeaway}
                  </p>
                </div>

                {/* Platform Application */}
                <div className="rounded-lg border border-blue-200/80 bg-blue-50/60 p-2.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs">
                    <CheckCircle2 className="size-3.5 text-blue-600 shrink-0" />
                    <span>كيف يُستخدم هذا المفهوم داخل منصتنا؟</span>
                  </div>
                  <p className={cn("font-medium text-blue-950", bodyFontSizeClass)}>
                    {fullArticle.platformApplication}
                  </p>
                </div>

                {/* Article Content Sections (Dynamic Font Size Applied) */}
                <div className="space-y-4 pt-1">
                  {fullArticle.sections.map((sec) => (
                    <section id={sec.id} key={sec.id} className="space-y-1.5 scroll-mt-16">
                      <h2 className={cn("text-foreground border-b border-border/60 pb-1", headingFontSizeClass)}>
                        {sec.heading}
                      </h2>
                      
                      <p className={cn("text-foreground/90 whitespace-pre-line font-normal", bodyFontSizeClass)}>
                        {sec.content}
                      </p>

                      {sec.callout && (
                        <div className="my-2 rounded-md border border-border bg-muted/40 p-2 space-y-0.5">
                          <div className="flex items-center gap-1.5 text-foreground font-semibold text-xs">
                            <Sparkles className="size-3.5 text-amber-500" />
                            <span>{sec.callout.title}</span>
                          </div>
                          <p className={cn("text-muted-foreground", bodyFontSizeClass)}>
                            {sec.callout.text}
                          </p>
                        </div>
                      )}
                    </section>
                  ))}
                </div>

                {/* Article Tags */}
                <div className="mt-3 pt-3 border-t border-border flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  <Tag className="size-3.5" />
                  <span>الكلمات المفتاحية:</span>
                  {fullArticle.tags.map((t, idx) => (
                    <Badge key={idx} variant="outline" className="text-[10px] font-normal px-1.5 py-0">
                      #{t}
                    </Badge>
                  ))}
                </div>

                {/* Next / Prev Navigation */}
                <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-3 border-t border-border">
                  {prevArticle ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openArticle(prevArticle.slug)}
                      className="h-auto py-1.5 px-2.5 justify-start gap-2 text-right w-full sm:w-auto text-xs"
                    >
                      <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
                      <div className="truncate">
                        <span className="text-[9px] text-muted-foreground block">السابق</span>
                        <span className="font-semibold truncate block">{prevArticle.title}</span>
                      </div>
                    </Button>
                  ) : <div />}

                  {nextArticle && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openArticle(nextArticle.slug)}
                      className="h-auto py-1.5 px-2.5 justify-end gap-2 text-left w-full sm:w-auto text-xs"
                    >
                      <div className="truncate">
                        <span className="text-[9px] text-muted-foreground block">التالي</span>
                        <span className="font-semibold truncate block">{nextArticle.title}</span>
                      </div>
                      <ChevronLeft className="size-3.5 shrink-0 text-muted-foreground" />
                    </Button>
                  )}
                </div>

              </div>
            ) : (
              <div className="flex min-h-[250px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-6 text-center">
                <FolderOpen className="size-8 text-muted-foreground mb-2" />
                <h3 className="text-xs font-bold text-foreground">اختر مقالاً لقراءته</h3>
              </div>
            )}
          </main>

          {/* Right Sticky Table of Contents (Collapsible) */}
          {!isRightSidebarCollapsed && (
            <aside className="hidden lg:block lg:col-span-3 sticky top-4 space-y-2 rounded-xl border border-border bg-card p-2.5 shadow-2xs">
              <div className="flex items-center justify-between border-b border-border pb-1.5">
                <div className="flex items-center gap-1.5">
                  <List className="size-3.5 text-foreground" />
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
                <nav className="space-y-0.5">
                  {fullArticle.tableOfContents.map((toc) => {
                    const isActive = activeSectionId === toc.id;
                    return (
                      <button
                        key={toc.id}
                        onClick={() => scrollToSection(toc.id)}
                        className={cn(
                          "flex w-full items-center gap-1.5 p-1 rounded-md text-right text-xs transition-colors",
                          isActive
                            ? "bg-accent text-accent-foreground font-semibold border-r-2 border-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <span className="size-1 rounded-full bg-muted-foreground shrink-0" />
                        <span className="truncate">{toc.title}</span>
                      </button>
                    );
                  })}
                </nav>
              ) : (
                <p className="text-[11px] text-muted-foreground">لا يوجد أقسام فرعية</p>
              )}

              <div className="mt-3 pt-2 border-t border-border space-y-1">
                <div className="rounded-md bg-muted/40 p-2 text-center space-y-1">
                  <HelpCircle className="size-3.5 text-muted-foreground mx-auto" />
                  <p className="text-[10px] font-medium text-foreground">تطبيق هذا المفهوم على مشروعك</p>
                  {setActiveTab && (
                    <Button
                      onClick={() => setActiveTab('strategic-dashboard')}
                      size="sm"
                      className="w-full text-xs h-6.5 font-medium px-1"
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
