import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Tag, 
  Clock, 
  CheckCircle2, 
  Lightbulb, 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
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
  ExternalLink,
  Loader2,
  FolderOpen
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

// Interfaces matching our JSON schema
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

// Icon Mapping Helper
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
  FileText
};

const getIconComponent = (iconName: string) => {
  return ICON_MAP[iconName] || BookOpen;
};

export const PlatformAcademyView: React.FC<{ setActiveTab?: (tab: string) => void }> = ({ setActiveTab }) => {
  const [categories, setCategories] = useState<AcademyCategory[]>([]);
  const [articlesIndex, setArticlesIndex] = useState<AcademyArticleIndexItem[]>([]);
  const [isLoadingIndex, setIsLoadingIndex] = useState(true);

  // Selected Article & Full Article JSON State
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [fullArticle, setFullArticle] = useState<AcademyFullArticle | null>(null);
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);

  // Filtering & UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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

  // 1. Fetch index.json on mount
  useEffect(() => {
    const loadIndex = async () => {
      try {
        setIsLoadingIndex(true);
        const res = await fetch('/data/academy/index.json');
        if (res.ok) {
          const data = await res.json();
          setCategories(data.categories || []);
          setArticlesIndex(data.articles || []);

          // Initialize expand all categories in sidebar
          const initialExpandState: Record<string, boolean> = {};
          (data.categories || []).forEach((cat: AcademyCategory) => {
            initialExpandState[cat.id] = true;
          });
          setExpandedCategories(initialExpandState);

          // Check if there is an article in URL
          const params = new URLSearchParams(window.location.search);
          const articleParam = params.get('article');
          if (articleParam) {
            setSelectedSlug(articleParam);
          } else if (data.articles && data.articles.length > 0) {
            // Default to first article
            setSelectedSlug(data.articles[0].slug);
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

  // 2. Fetch full article JSON when selectedSlug changes
  useEffect(() => {
    if (!selectedSlug) return;

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

          // Update URL query param without full refresh
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
  }, [selectedSlug]);

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

  // Filtered Articles Index based on search & category
  const filteredArticles = useMemo(() => {
    return articlesIndex.filter((article) => {
      const matchesCategory = selectedCategory === 'all' || article.categoryId === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q)) ||
        article.keyTakeaway.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [articlesIndex, searchQuery, selectedCategory]);

  // Find next and previous articles for navigation at bottom of article
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
      <div dir="rtl" className="flex min-h-[450px] w-full flex-col items-center justify-center gap-3">
        <Loader2 className="size-10 animate-spin text-slate-800" />
        <p className="text-sm font-bold text-slate-600">جاري تحميل مكتبة أكاديمية المنصة JSON...</p>
      </div>
    );
  }

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-[1550px] flex-col gap-6 px-3 py-4 sm:px-6 lg:px-8 font-sans animate-in fade-in duration-300">
      
      {/* Top Header & Search Bar (Better Docs Top Bar) */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <Menu className="size-5" />
            </button>
            <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm shrink-0">
              <BookOpen className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-slate-300 bg-slate-100 text-slate-800 font-bold text-[11px]">
                  BetterDocs Knowledge Hub
                </Badge>
                <span className="text-xs font-bold text-slate-400">| {articlesIndex.length} مقال تنفيذي مفصل</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-0.5">
                أكاديمية المنصة والمفاهيم الاستراتيجية
              </h1>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              type="text"
              placeholder="ابحث في كافة المفاهيم والمصطلحات (مثل: نقطة التعادل، LTV، الخندق التنافسي)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-slate-50/80 border-slate-200 text-slate-900 placeholder:text-slate-400 font-medium rounded-xl h-10 text-xs sm:text-sm focus-visible:ring-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center gap-1.5 whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              selectedCategory === 'all'
                ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>كافة الأقسام</span>
            <span className={`px-1.5 py-0.5 rounded-md text-[10px] tabular-nums ${selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
              {articlesIndex.length}
            </span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = articlesIndex.filter((a) => a.categoryId === cat.id).length;
            const CatIcon = getIconComponent(cat.icon);

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <CatIcon className="size-3.5" />
                <span>{cat.title}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] tabular-nums ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main BetterDocs Layout Grid: (Left Sidebar + Center Content + Right ToC) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sub-Sidebar: Categories & Articles Tree */}
        <aside
          className={`
            fixed inset-y-0 right-0 z-40 w-72 bg-white p-5 border-l border-slate-200 shadow-2xl transition-transform duration-300 lg:static lg:z-0 lg:w-auto lg:col-span-3 lg:border lg:rounded-3xl lg:shadow-sm lg:translate-x-0 overflow-y-auto max-h-[85vh]
            ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 lg:hidden">
            <h3 className="text-sm font-black text-slate-900">فهرس الأكاديمية</h3>
            <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 text-slate-500">
              <X className="size-5" />
            </button>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">الأقسام والموضوعات</span>
              <span className="text-[11px] font-bold text-slate-400">{filteredArticles.length} مقال</span>
            </div>

            {categories.map((cat) => {
              const catArticles = filteredArticles.filter((a) => a.categoryId === cat.id);
              if (catArticles.length === 0 && selectedCategory !== 'all') return null;

              const isExpanded = expandedCategories[cat.id] ?? true;
              const CatIcon = getIconComponent(cat.icon);

              return (
                <div key={cat.id} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-2 space-y-1">
                  {/* Category Header Button */}
                  <button
                    onClick={() => toggleCategoryExpand(cat.id)}
                    className="flex w-full items-center justify-between p-2 text-right rounded-xl hover:bg-slate-100 text-slate-900 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-white text-slate-900 shadow-2xs border border-slate-200/60">
                        <CatIcon className="size-3.5" />
                      </span>
                      <span className="text-xs font-black text-slate-900">{cat.title}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded-md border border-slate-200">
                        {catArticles.length}
                      </span>
                      <ChevronDown className={`size-4 text-slate-400 transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
                    </div>
                  </button>

                  {/* Article List under Category */}
                  {isExpanded && (
                    <div className="mr-3 border-r-2 border-slate-200 pr-2 space-y-1 pt-1">
                      {catArticles.map((art) => {
                        const isActive = art.slug === selectedSlug;
                        const ArtIcon = getIconComponent(art.icon);

                        return (
                          <button
                            key={art.id}
                            onClick={() => {
                              setSelectedSlug(art.slug);
                              setIsMobileSidebarOpen(false);
                            }}
                            className={`
                              flex w-full items-center justify-between gap-2 p-2 rounded-xl text-right text-xs font-bold transition-all
                              ${isActive
                                ? 'bg-slate-950 text-white shadow-sm'
                                : 'text-slate-700 hover:bg-white hover:text-slate-950'}
                            `}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <ArtIcon className={`size-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                              <span className="truncate">{art.title}</span>
                            </div>
                            <span className={`text-[10px] shrink-0 font-medium ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
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

        {/* Center Main Content Area: Article Reading View */}
        <main className="lg:col-span-6 flex flex-col gap-6">
          {isLoadingArticle ? (
            <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-12">
              <Loader2 className="size-8 animate-spin text-slate-800 mb-2" />
              <p className="text-sm font-bold text-slate-600">جاري قراءة محتوى المقال الموسّع من ملف JSON...</p>
            </div>
          ) : fullArticle ? (
            <div className="flex flex-col gap-6 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              
              {/* Article Top Meta & Breadcrumb */}
              <div className="flex flex-col gap-3 border-b border-slate-100 pb-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <span>أكاديمية المنصة</span>
                    <ChevronLeft className="size-3 text-slate-400" />
                    <span className="text-slate-900">{fullArticle.categoryName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => toggleSaveArticle(fullArticle.id, e)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 transition-colors"
                    >
                      {savedArticles.includes(fullArticle.id) ? (
                        <>
                          <BookmarkCheck className="size-4 text-amber-500 fill-amber-500" />
                          <span>محفوظ</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="size-4 text-slate-400" />
                          <span>حفظ المقال</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 leading-tight">
                  {fullArticle.title}
                </h1>
                
                {fullArticle.subtitle && (
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    {fullArticle.subtitle}
                  </p>
                )}

                {/* Badges & Metrics */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Badge variant="outline" className="border-slate-300 bg-slate-100 text-slate-800 font-bold">
                    {fullArticle.categoryName}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
                    <Clock className="size-3.5 text-slate-400" />
                    {fullArticle.readTime}
                  </span>
                  <span className="text-xs font-bold text-slate-400">•</span>
                  <span className="text-xs font-bold text-slate-500">المستوى: {fullArticle.difficulty}</span>
                  <span className="text-xs font-bold text-slate-400">•</span>
                  <span className="text-xs font-bold text-slate-400">آخر تحديث: {fullArticle.updatedAt}</span>
                </div>
              </div>

              {/* Executive Summary & Key Takeaway Box */}
              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 text-amber-900">
                  <Lightbulb className="size-5 text-amber-600 shrink-0" />
                  <h3 className="text-xs font-black uppercase tracking-wider">الخلاصة التنفيذية المستفادة</h3>
                </div>
                <p className="text-sm font-bold text-amber-950 leading-relaxed">
                  {fullArticle.keyTakeaway}
                </p>
              </div>

              {/* Platform Application Box */}
              <div className="rounded-2xl border border-blue-200/80 bg-blue-50/70 p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 text-blue-900">
                  <CheckCircle2 className="size-5 text-blue-600 shrink-0" />
                  <h3 className="text-xs font-black uppercase tracking-wider">كيف يُستخدم هذا المفهوم داخل منصتنا؟</h3>
                </div>
                <p className="text-sm font-bold text-blue-950 leading-relaxed">
                  {fullArticle.platformApplication}
                </p>
              </div>

              {/* Article Sections Rendered from JSON */}
              <div className="space-y-8 pt-2">
                {fullArticle.sections.map((sec) => (
                  <section id={sec.id} key={sec.id} className="space-y-3 scroll-mt-20">
                    <h2 className="text-xl font-black text-slate-950 flex items-center gap-2 border-b border-slate-100 pb-2">
                      <span className="size-2 rounded-full bg-slate-900 inline-block" />
                      {sec.heading}
                    </h2>
                    
                    <p className="text-sm sm:text-base font-medium text-slate-700 leading-loose whitespace-pre-line">
                      {sec.content}
                    </p>

                    {/* Section Callout Box if exists */}
                    {sec.callout && (
                      <div className="my-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-1">
                        <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                          <Sparkles className="size-4 text-amber-500" />
                          <span>{sec.callout.title}</span>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                          {sec.callout.text}
                        </p>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <Tag className="size-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-500">الكلمات المفتاحية:</span>
                {fullArticle.tags.map((t, idx) => (
                  <span key={idx} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                    #{t}
                  </span>
                ))}
              </div>

              {/* Next / Previous Article Footer Nav */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
                {prevArticle ? (
                  <button
                    onClick={() => setSelectedSlug(prevArticle.slug)}
                    className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-right w-full sm:w-auto transition-colors"
                  >
                    <ChevronRight className="size-5 text-slate-400 shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block">المقال السابق</span>
                      <span className="text-xs font-black text-slate-900">{prevArticle.title}</span>
                    </div>
                  </button>
                ) : <div />}

                {nextArticle && (
                  <button
                    onClick={() => setSelectedSlug(nextArticle.slug)}
                    className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-left w-full sm:w-auto transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block">المقال التالي</span>
                      <span className="text-xs font-black text-slate-900">{nextArticle.title}</span>
                    </div>
                    <ChevronLeft className="size-5 text-slate-400 shrink-0" />
                  </button>
                )}
              </div>

            </div>
          ) : (
            <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <FolderOpen className="size-10 text-slate-400 mb-2" />
              <h3 className="text-base font-black text-slate-900">اختر مقالاً من القائمة لقراءته</h3>
            </div>
          )}
        </main>

        {/* Right Sticky Table of Contents (On-page ToC for Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-6 space-y-4 rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <List className="size-4 text-slate-900" />
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">جدول محتويات المقال</h3>
          </div>

          {fullArticle && fullArticle.tableOfContents && fullArticle.tableOfContents.length > 0 ? (
            <nav className="space-y-1">
              {fullArticle.tableOfContents.map((toc) => {
                const isActive = activeSectionId === toc.id;
                return (
                  <button
                    key={toc.id}
                    onClick={() => scrollToSection(toc.id)}
                    className={`
                      flex w-full items-center gap-2 p-2 rounded-xl text-right text-xs font-bold transition-all
                      ${isActive
                        ? 'bg-slate-100 text-slate-950 font-black border-r-2 border-slate-950'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'}
                    `}
                  >
                    <span className="size-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span className="truncate">{toc.title}</span>
                  </button>
                );
              })}
            </nav>
          ) : (
            <p className="text-xs font-medium text-slate-400">لا يوجد أقسام فرعية بهذا المقال</p>
          )}

          {/* Quick Action Box */}
          <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
            <div className="rounded-xl bg-slate-50 p-3 text-center space-y-2">
              <HelpCircle className="size-5 text-slate-700 mx-auto" />
              <p className="text-[11px] font-bold text-slate-700">تريد تطبيق هذا المفهوم على مشروعك؟</p>
              {setActiveTab && (
                <Button
                  onClick={() => setActiveTab('strategic-dashboard')}
                  className="w-full bg-slate-950 text-white font-bold text-xs h-8 hover:bg-slate-800"
                >
                  انتقل للنموذج الاحترافي
                </Button>
              )}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default PlatformAcademyView;
