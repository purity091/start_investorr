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
  LayoutGrid
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

export const PlatformAcademyView: React.FC<{ setActiveTab?: (tab: string) => void }> = ({ setActiveTab }) => {
  const [categories, setCategories] = useState<AcademyCategory[]>([]);
  const [articlesIndex, setArticlesIndex] = useState<AcademyArticleIndexItem[]>([]);
  const [isLoadingIndex, setIsLoadingIndex] = useState(true);

  // View Mode: 'grid' (Categorized Cards view) vs 'reader' (Full Article Reader view)
  const [viewMode, setViewMode] = useState<'grid' | 'reader'>('grid');

  // Selected Article & Full Article JSON State
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [fullArticle, setFullArticle] = useState<AcademyFullArticle | null>(null);
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);

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

  if (isLoadingIndex) {
    return (
      <div dir="rtl" className="flex min-h-[350px] w-full flex-col items-center justify-center gap-2">
        <Loader2 className="size-7 animate-spin text-muted-foreground" />
        <p className="text-xs font-medium text-muted-foreground">جاري تحميل المعرفة الأكاديمية...</p>
      </div>
    );
  }

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-3 sm:p-4 lg:p-6 font-sans">
      
      {/* Shadcn Clean Toolbar & Search Section */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-2xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden p-1.5 rounded-md border border-input bg-background text-foreground hover:bg-accent"
            >
              <Menu className="size-4" />
            </button>
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
              <BookOpen className="size-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-foreground tracking-tight">
                  أكاديمية المنصة والمفاهيم
                </h1>
                <Badge variant="secondary" className="text-[11px] font-semibold">
                  {articlesIndex.length} مقال
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground font-normal">
                دليل المفاهيم والمصطلحات والتحليلات الميدانية لخطة الاستثمار
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80 shrink-0">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="بحث في المفاهيم والمصطلحات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-9 bg-background h-9 text-xs focus-visible:ring-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* View Switcher & Category Filter Pills */}
        <div className="flex items-center justify-between gap-2 border-t border-border/60 pt-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium transition-colors border",
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
                    "px-3 py-1 rounded-md text-xs font-medium transition-colors border whitespace-nowrap",
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

          <div className="flex items-center gap-1.5 shrink-0">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8 text-xs font-medium px-2.5 gap-1.5"
            >
              <LayoutGrid className="size-3.5" />
              <span>شبكة الأقسام</span>
            </Button>
            {selectedSlug && (
              <Button
                variant={viewMode === 'reader' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('reader')}
                className="h-8 text-xs font-medium px-2.5 gap-1.5"
              >
                <FileText className="size-3.5" />
                <span>قراءة المقال</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: Category Cards Grid View (Clean Shadcn Cards Grid)               */}
      {/* ========================================================================= */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {categories.map((cat) => {
            if (selectedCategoryFilter !== 'all' && selectedCategoryFilter !== cat.id) return null;

            const catArticles = filteredArticles.filter((a) => a.categoryId === cat.id);
            if (catArticles.length === 0 && searchQuery) return null;

            const CatIcon = getIconComponent(cat.icon);

            return (
              <Card
                key={cat.id}
                className="flex flex-col justify-between border border-border bg-card p-4 rounded-xl shadow-2xs hover:border-primary/50 transition-colors"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-border/60">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-md bg-muted text-foreground shrink-0 border border-border">
                        <CatIcon className="size-4" />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-card-foreground leading-snug">
                          {cat.title}
                        </h2>
                        <p className="text-[11px] text-muted-foreground line-clamp-1">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    <Badge variant="secondary" className="text-[11px] font-semibold px-2 py-0.5 shrink-0">
                      {catArticles.length}
                    </Badge>
                  </div>

                  {/* Articles List */}
                  <div className="mt-3 space-y-1">
                    {catArticles.slice(0, 4).map((art) => (
                      <button
                        key={art.id}
                        onClick={() => openArticle(art.slug)}
                        className="group flex w-full items-center justify-between gap-2 p-2 rounded-md text-right hover:bg-muted/60 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-xs font-medium text-card-foreground group-hover:text-primary transition-colors truncate">
                          <FileText className="size-3.5 text-muted-foreground shrink-0 group-hover:text-primary" />
                          <span className="truncate">{art.title}</span>
                        </div>
                        <ChevronLeft className="size-3.5 text-muted-foreground shrink-0 opacity-60 group-hover:opacity-100" />
                      </button>
                    ))}

                    {catArticles.length === 0 && (
                      <p className="text-xs text-muted-foreground py-2 text-center">لا توجد مقالات</p>
                    )}
                  </div>
                </div>

                {/* Explore More Button */}
                {catArticles.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-border/60">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openArticle(catArticles[0].slug)}
                      className="w-full text-xs font-medium justify-between h-8 text-primary hover:bg-primary/10 hover:text-primary"
                    >
                      <span>استكشف مقالات {cat.title} ({catArticles.length})</span>
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
      {/* MODE 2: Article Reader View (Clean 3-Column Shadcn Layout)                */}
      {/* ========================================================================= */}
      {viewMode === 'reader' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          
          {/* Left Sub-Sidebar: Categories & Articles Tree */}
          <aside
            className={cn(
              "fixed inset-y-0 right-0 z-40 w-72 bg-card p-4 border-l border-border shadow-md transition-transform duration-200 lg:static lg:z-0 lg:w-auto lg:col-span-3 lg:border lg:rounded-xl lg:shadow-2xs overflow-y-auto max-h-[82vh]",
              isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
            )}
          >
            <div className="flex items-center justify-between pb-3 border-b border-border lg:hidden">
              <h3 className="text-xs font-bold text-foreground">فهرس الأكاديمية</h3>
              <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 text-muted-foreground">
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">الأقسام والدروس</span>
                <span className="text-[11px] text-muted-foreground">{filteredArticles.length} مقال</span>
              </div>

              {categories.map((cat) => {
                const catArticles = filteredArticles.filter((a) => a.categoryId === cat.id);
                if (catArticles.length === 0 && selectedCategoryFilter !== 'all') return null;

                const isExpanded = expandedCategories[cat.id] ?? true;
                const CatIcon = getIconComponent(cat.icon);

                return (
                  <div key={cat.id} className="rounded-lg border border-border/60 bg-muted/30 p-1.5 space-y-1">
                    <button
                      onClick={() => toggleCategoryExpand(cat.id)}
                      className="flex w-full items-center justify-between p-1.5 text-right rounded-md hover:bg-muted text-foreground transition-colors text-xs font-bold"
                    >
                      <div className="flex items-center gap-2">
                        <CatIcon className="size-3.5 text-muted-foreground" />
                        <span>{cat.title}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          {catArticles.length}
                        </Badge>
                        <ChevronDown className={cn("size-3.5 text-muted-foreground transition-transform", isExpanded ? "" : "-rotate-90")} />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="mr-2 border-r border-border pr-2 space-y-0.5 pt-1">
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
                                "flex w-full items-center justify-between gap-2 p-1.5 rounded-md text-right text-xs transition-colors",
                                isActive
                                  ? "bg-primary text-primary-foreground font-semibold"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              )}
                            >
                              <span className="truncate">{art.title}</span>
                              <span className="text-[10px] shrink-0 opacity-70">{art.readTime}</span>
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

          {/* Center Main Article Content */}
          <main className="lg:col-span-6 flex flex-col gap-4">
            {isLoadingArticle ? (
              <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-xl border border-border bg-card p-8">
                <Loader2 className="size-6 animate-spin text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">جاري تحميل المقال...</p>
              </div>
            ) : fullArticle ? (
              <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:p-6 shadow-2xs">
                
                {/* Article Header & Breadcrumbs */}
                <div className="flex flex-col gap-2 border-b border-border pb-4">
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
                      className="h-7 text-xs px-2 gap-1"
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

                  <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-snug">
                    {fullArticle.title}
                  </h1>
                  
                  {fullArticle.subtitle && (
                    <p className="text-xs sm:text-sm text-muted-foreground font-normal">
                      {fullArticle.subtitle}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-[11px] font-medium">
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
                <div className="rounded-lg border border-amber-200/80 bg-amber-50/60 p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                    <Lightbulb className="size-4 text-amber-600 shrink-0" />
                    <span>الخلاصة التنفيذية المستفادة</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-amber-950 leading-relaxed">
                    {fullArticle.keyTakeaway}
                  </p>
                </div>

                {/* Platform Application */}
                <div className="rounded-lg border border-blue-200/80 bg-blue-50/60 p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0" />
                    <span>كيف يُستخدم هذا المفهوم داخل منصتنا؟</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-blue-950 leading-relaxed">
                    {fullArticle.platformApplication}
                  </p>
                </div>

                {/* Article Content Sections */}
                <div className="space-y-6 pt-2">
                  {fullArticle.sections.map((sec) => (
                    <section id={sec.id} key={sec.id} className="space-y-2 scroll-mt-16">
                      <h2 className="text-base sm:text-lg font-bold text-foreground border-b border-border/60 pb-1">
                        {sec.heading}
                      </h2>
                      
                      <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-line font-normal">
                        {sec.content}
                      </p>

                      {sec.callout && (
                        <div className="my-3 rounded-md border border-border bg-muted/40 p-3 space-y-1">
                          <div className="flex items-center gap-1.5 text-foreground font-semibold text-xs">
                            <Sparkles className="size-3.5 text-amber-500" />
                            <span>{sec.callout.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {sec.callout.text}
                          </p>
                        </div>
                      )}
                    </section>
                  ))}
                </div>

                {/* Article Tags */}
                <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  <Tag className="size-3.5" />
                  <span>الكلمات المفتاحية:</span>
                  {fullArticle.tags.map((t, idx) => (
                    <Badge key={idx} variant="outline" className="text-[11px] font-normal">
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
                      className="h-auto py-2 px-3 justify-start gap-2 text-right w-full sm:w-auto text-xs"
                    >
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                      <div className="truncate">
                        <span className="text-[10px] text-muted-foreground block">السابق</span>
                        <span className="font-semibold truncate block">{prevArticle.title}</span>
                      </div>
                    </Button>
                  ) : <div />}

                  {nextArticle && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openArticle(nextArticle.slug)}
                      className="h-auto py-2 px-3 justify-end gap-2 text-left w-full sm:w-auto text-xs"
                    >
                      <div className="truncate">
                        <span className="text-[10px] text-muted-foreground block">التالي</span>
                        <span className="font-semibold truncate block">{nextArticle.title}</span>
                      </div>
                      <ChevronLeft className="size-4 shrink-0 text-muted-foreground" />
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

          {/* Right Sticky Table of Contents */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-4 space-y-3 rounded-xl border border-border bg-card p-4 shadow-2xs">
            <div className="flex items-center gap-1.5 border-b border-border pb-2">
              <List className="size-3.5 text-foreground" />
              <h3 className="text-xs font-bold text-foreground">محتويات المقال</h3>
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
                        "flex w-full items-center gap-1.5 p-1.5 rounded-md text-right text-xs transition-colors",
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
              <p className="text-xs text-muted-foreground">لا يوجد أقسام فرعية</p>
            )}

            <div className="mt-4 pt-3 border-t border-border space-y-2">
              <div className="rounded-md bg-muted/50 p-2.5 text-center space-y-1.5">
                <HelpCircle className="size-4 text-muted-foreground mx-auto" />
                <p className="text-[11px] font-medium text-foreground">تطبيق هذا المفهوم على مشروعك</p>
                {setActiveTab && (
                  <Button
                    onClick={() => setActiveTab('strategic-dashboard')}
                    size="sm"
                    className="w-full text-xs h-7 font-medium"
                  >
                    انتقل للنموذج الاحترافي
                  </Button>
                )}
              </div>
            </div>
          </aside>

        </div>
      )}

    </div>
  );
};

export default PlatformAcademyView;
