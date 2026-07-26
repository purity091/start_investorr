
import React, { memo, useMemo, useState } from 'react';
import {
  ShieldPlus,
  Recycle,
  CloudSun,
  FileText,
  Download,
  BrainCircuit,
  BarChart3,
  LayoutDashboard,
  Plus,
  Settings,
  Rocket,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Share2,
  Trash2,
  CreditCard,
  Bell,
  Palette,
  ListTodo,
  Home,
  ArrowRightLeft,
  Zap,
  Star,
  Shield,
  Users,
  Database,
  PieChart,
  LogOut,
  Activity,
  UserCheck,
  UserX,
  FileCheck,
  Lock,
  Key,
  Mail,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  Receipt,
  Calculator,
  Globe,
  Languages,
  Palette as PaletteIcon,
  ImageIcon,
  Cpu,
  Server,
  HardDrive,
  Cloud,
  DownloadCloud,
  UploadCloud,
  RefreshCw,
  Eye,
  EyeOff,
  Search,
  Filter,
  SortAsc,
  MessageSquareWarning,
  Flag,
  Ban,
  CheckCircle,
  XCircle,
  Clock3,
  Calendar,
  BellRing,
  Send,
  Inbox,
  Archive,
  FolderOpen,
  FileBarChart,
  LineChart,
  AreaChart,
  ScrollText,
  Award,
  BookOpen,
  GraduationCap,
  Video,
  Phone,
  MessageCircle,
  LifeBuoy,
  Bug,
  Wrench,
  GitBranch,
  GitCommit,
  Terminal,
  Code,
  FileJson,
  FileCode2,
  FileCog,
  Sliders,
  ToggleLeft,
  ShieldCheck,
  ShieldAlert,
  Fingerprint,
  ScanFace,
  History,
  RotateCcw,
  Copy,
  Link,
  ExternalLink,
  QrCode,
  Tag,
  Bookmark,
  Star as StarIcon,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Dice5,
  HeartPulse,
  MessageSquareMore,
  Sparkles,
  Layers,
  Target,
  Compass,
  Trello,
  LayoutGrid,
  PhoneCall,
  BarChart2,
  Ship,
  Megaphone,
  Sprout,
  Waves,
  TreePine,
  FlaskConical,
  Flame,
  Mountain,
  Factory,
  Shirt,
  FileBox,
  Building2,
  HardHat,
  Utensils,
  Armchair,
  Flower2,
  Hammer,
  PawPrint,
  Gamepad2,
  Briefcase,
  ShoppingCart,
  Handshake,
  Hash,
  PlayCircle,
  Coffee,
  Landmark,
  Map,
  Hospital,
  Scan,
  Stethoscope,
  Pill,
  Leaf,
  Droplets,
  Smartphone,
  Signal,
  Play,
  MousePointer2,
  Mic2,
  Newspaper,
  Tv,
  Plane,
  Train,
  Anchor,
  Car,
  Warehouse,
  ShoppingBag,
  Trophy,
  Truck,
  Bus,
  Bed,
  Box
  ,Crown
} from 'lucide-react';
import { User } from '../../types';
import { getTabPath } from '../../utils/routes';

// ─── Data Configuration ───────────────────────────────────────────────────

/**
 * Single entry point for Market Discovery to keep sidebar clean.
 */
const MARKET_DISCOVERY_DASHBOARDS = [
  'advertising-dashboard', 'brands-leaders-dashboard', 'marketing-dashboard', 'farming-dashboard',
  'fisheries-aquaculture-dashboard', 'forestry-dashboard', 'chemical-industry-dashboard',
  'fossil-fuels-dashboard', 'mining-dashboard', 'pulp-paper-dashboard',
  'plastic-rubber-dashboard', 'petroleum-refinery-dashboard', 'apparel-shoes-dashboard',
  'non-alcoholic-beverages-dashboard', 'economy-dashboard', 'building-construction-dashboard',
  'heavy-construction-dashboard', 'cleaning-products-dashboard', 'cosmetics-personal-care-dashboard',
  'food-nutrition-dashboard', 'furniture-household-dashboard', 'garden-patio-dashboard',
  'home-improvement-dashboard', 'pet-supplies-dashboard', 'toys-dashboard',
  'b2b-ecommerce-dashboard', 'b2c-ecommerce-dashboard', 'c2c-ecommerce-dashboard',
  'digital-shopping-behaviour-dashboard', 'ecommerce-key-figures-dashboard', 'paid-content-dashboard',
  'international-trade-dashboard', 'politics-dashboard', 'climate-dashboard',
  'emissions-dashboard', 'energy-dashboard', 'greentech-dashboard',
  'waste-dashboard', 'water-dashboard', 'financial-services-dashboard', 'financial-institutions-dashboard', 
  'investments-dashboard', 'insurance-dashboard', 'care-support-dashboard',
  'hospitals-health-professionals-dashboard', 'health-system-dashboard', 'medical-technology-dashboard',
  'pharma-market-dashboard', 'state-of-health-dashboard', 'cyber-crime-security-dashboard',
  'internet-demographics-dashboard', 'mobile-internet-apps-dashboard', 'online-search-dashboard',
  'online-video-entertainment-dashboard', 'reach-traffic-dashboard', 'social-media-dashboard',
  'celebrities-dashboard', 'family-friends-dashboard', 'personality-behavior-dashboard',
  'holidays-dashboard', 'audio-dashboard', 'books-publishing-dashboard',
  'news-dashboard', 'tv-video-film-dashboard', 'video-gaming-esports-dashboard', 'communications-dashboard',
  'aerospace-defense-dashboard', 'electronics-dashboard', 'industrial-machinery-dashboard',
  'metals-dashboard', 'rolling-stock-dashboard', 'shipbuilding-dashboard',
  'vehicle-manufacturing-dashboard', 'commercial-real-estate-dashboard', 'industrial-real-estate-dashboard',
  'mortgages-financing-dashboard', 'property-services-dashboard', 'residential-real-estate-dashboard',
  'diy-retail-dashboard', 'fashion-accessories-dashboard', 'food-beverage-retail-dashboard',
  'furniture-retail-dashboard', 'general-merchandise-dashboard', 'health-hygiene-dashboard',
  'office-supplies-dashboard', 'private-label-dashboard', 'retail-technology-dashboard',
  'shopping-behavior-dashboard', 'sports-leisure-retail-dashboard', 'subscriptions-direct-selling-dashboard',
  'supply-chain-dashboard', 'wholesale-dashboard', 'business-services-dashboard',
  'skilled-labor-dashboard', 'crime-law-enforcement-dashboard', 'demographics-dashboard',
  'education-science-dashboard', 'geography-nature-dashboard', 'historical-data-dashboard',
  'art-culture-dashboard', 'gambling-dashboard', 'hobbies-dashboard',
  'parks-outdoors-dashboard', 'professional-sports-dashboard', 'sports-fitness-dashboard',
  'wellness-spas-dashboard', 'consumer-electronics-dashboard', 'hardware-dashboard',
  'household-appliances-dashboard', 'it-services-dashboard', 'software-dashboard',
  'telecommunications-dashboard', 'aviation-dashboard', 'logistics-dashboard',
  'public-transport-dashboard', 'rail-transport-dashboard', 'vehicles-road-traffic-dashboard',
  'water-transport-dashboard', 'accommodation-dashboard', 'business-travel-dashboard',
  'food-drink-services-dashboard', 'leisure-travel-dashboard'
];

// ─── Sub-components ────────────────────────────────────────────────────────

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href?: string;
  variant?: 'default' | 'danger' | 'ai' | 'active-project';
  active?: boolean;
  onClick?: () => void;
  badge?: string | number;
  isNew?: boolean;
  isCollapsed?: boolean;
  isAdminMode?: boolean;
  id?: string;
}

/**
 * Memoized NavItem for maximum performance.
 * Prevents re-renders unless props actually change.
 */
const NavItem = memo(({ icon: Icon, label, href, variant = 'default', active, onClick, badge, isNew, isCollapsed, isAdminMode, id }: NavItemProps) => {
  const baseClasses = `w-full flex items-center ${isCollapsed ? 'justify-center p-0 h-9 sm:h-10 w-9 sm:w-10 mx-auto mb-0.5' : 'gap-2 px-2.5 sm:px-3 py-1.5'} rounded-[0.85rem] sm:rounded-[1rem] text-[11px] sm:text-[12px] font-bold transition-all duration-300 group relative`;

  const variants = {
    default: active
      ? (isAdminMode ? "bg-amber-500 text-white shadow-lg shadow-amber-200" : "bg-primary-600 text-white shadow-lg shadow-primary-200")
      : (isAdminMode ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200" : "text-gray-500 hover:bg-white hover:text-gray-900"),
    ai: active
      ? "bg-purple-600 text-white shadow-lg shadow-purple-200"
      : "text-purple-600 hover:bg-purple-50 hover:shadow-purple-100/20",
    danger: "text-red-400 hover:bg-red-50 hover:text-red-600",
    'active-project': "bg-primary-600 text-white shadow-lg shadow-primary-200"
  };

  return (
    <a
      id={id}
      href={href || '#'}
      onClick={(event) => {
        event.preventDefault();
        onClick?.();
      }}
      className={`${baseClasses} ${variants[variant]}`}
      title={isCollapsed ? label : ''}
    >
      <div className={`${isCollapsed ? 'p-1.5' : 'p-1 sm:p-1.5'} rounded-lg transition-all duration-500 ${
        active
          ? 'bg-white/20 text-white'
          : (isAdminMode ? 'bg-transparent group-hover:bg-slate-700/50 group-hover:scale-110' : 'bg-transparent group-hover:bg-gray-50 group-hover:scale-110')
      }`}>
        <Icon size={isCollapsed ? 16 : 15} strokeWidth={active ? 2.5 : 2} className="w-4 h-4" />
      </div>

      {!isCollapsed && (
        <>
          <span className={`flex-1 text-right transition-transform duration-300 ${active ? 'translate-x-[-2px]' : 'group-hover:translate-x-[-4px]'}`}>
            {label}
          </span>

          {isNew && (
            <span className="bg-amber-400 text-amber-950 text-[6px] sm:text-[7px] font-black px-1 sm:px-1.5 py-0.5 rounded-lg mr-1 sm:mr-2 animate-pulse">جديد</span>
          )}

          {badge && (
            <div className="relative mr-1 sm:mr-2">
              <span className="bg-red-500 text-white text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.5 rounded-full font-bold shadow-lg shadow-red-200">
                {badge}
              </span>
            </div>
          )}
        </>
      )}

      {isCollapsed && isNew && (
        <div className="absolute top-0.5 sm:top-1 right-0.5 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full border-2 border-white shadow-sm"></div>
      )}
      {isCollapsed && badge && (
        <div className="absolute top-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-500 text-white text-[7px] sm:text-[7.5px] rounded-full flex items-center justify-center border-2 border-white font-black shadow-sm ring-1 ring-red-200">
           {badge}
        </div>
      )}
    </a>
  );
});

interface NavGroupProps {
  title: string;
  children: React.ReactNode;
  isAdminMode?: boolean;
}

const NavGroup = memo(({ title, children, isCollapsed, isAdminMode }: NavGroupProps & { isCollapsed: boolean }) => (
  <div className="mb-2 sm:mb-3">
    {!isCollapsed && (
      <div className="px-3 sm:px-5 mb-1.5 sm:mb-2 flex items-center justify-between animate-in fade-in duration-500">
        <h3 className={`text-[8px] sm:text-[9px] font-black ${isAdminMode ? 'text-slate-500' : 'text-gray-400'} uppercase tracking-[0.16em] sm:tracking-[0.2em]`}>{title}</h3>
        <div className={`h-[1px] flex-1 ${isAdminMode ? 'bg-slate-800' : 'bg-gray-100/60'} mr-2 sm:mr-3`}></div>
      </div>
    )}
    {isCollapsed && (
      <div className="px-3 sm:px-6 mb-2 sm:mb-3 flex justify-center">
         <div className={`h-[2px] w-5 sm:w-6 ${isAdminMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-full`}></div>
      </div>
    )}
    <div className={`space-y-0.5 ${isCollapsed ? 'px-1 sm:px-1.5' : 'px-2 sm:px-2.5'}`}>
      {children}
    </div>
  </div>
));

// ─── Main Sidebar Component ───────────────────────────────────────────────

interface SidebarProps {
  user: User;
  isOpen?: boolean;
  isCollapsed?: boolean;
  onCollapseToggle?: () => void;
  activeTab?: string;
  setActiveTab?: (tab: any) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, isOpen = true, isCollapsed = false, onCollapseToggle, activeTab, setActiveTab }) => {
  const adminTabs = ['admin-dashboard', 'users-management', 'admin-plans', 'admin-analytics', 'admin-security'];
  const isAdminMode = adminTabs.includes(activeTab || '');
  const tabHref = (tab: string) => getTabPath(tab);
  const isCustomerPortalActive = ['subscriber-hub', 'customer-dashboard', 'customer-projects', 'customer-subscription', 'customer-usage', 'customer-activity', 'customer-account', 'customer-support'].includes(activeTab || '');


  const sidebarBg = isAdminMode
    ? 'bg-slate-950 border-slate-900 shadow-[20px_0_40px_rgba(0,0,0,0.5)]'
    : 'sidebar-glass border-gray-100 shadow-2xl';

  // Automatically compute if market discovery group is active based on its children
  const isMarketDiscoveryActive = useMemo(() => {
    return activeTab === 'market-discovery' || MARKET_DISCOVERY_DASHBOARDS.includes(activeTab || '');
  }, [activeTab]);

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isOpen && (
        <div
          onClick={onCollapseToggle}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[45] lg:hidden animate-in fade-in duration-300"
        />
      )}

      <aside className={`${isCollapsed ? 'w-18 sm:w-20' : 'w-60 sm:w-64'} ${sidebarBg} h-screen fixed right-0 top-0 border-l flex flex-col z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>

        {/* Collapse Toggle Button */}
        <button
          onClick={onCollapseToggle}
          className={`hidden lg:flex absolute -left-4 top-10 w-8 h-8 sm:w-9 sm:h-9 ${isAdminMode ? 'bg-slate-800 border-slate-700 text-amber-500' : 'bg-white border-gray-100 text-primary-600'} rounded-full items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 z-[60] group ${isCollapsed ? 'rotate-180' : ''}`}
        >
          <ChevronLeft size={16} className="transition-transform group-active:translate-x-[-2px]" strokeWidth={3} />
        </button>

        {/* Premium Branding Section */}
        <div className={`p-3 sm:p-4 ${isCollapsed ? 'px-3 sm:px-3.5' : 'pb-2 sm:pb-3'}`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2 sm:gap-3'} group cursor-pointer`} onClick={() => setActiveTab?.(isAdminMode ? 'admin-dashboard' : 'home')}>
            {!isCollapsed && (
              <div className="animate-in fade-in duration-500 text-right">
                <h2 className={`text-base sm:text-lg font-black tracking-tight leading-none mb-0.5 ${isAdminMode ? 'text-white' : 'text-gray-900'}`}>{isAdminMode ? 'واجهة الإدارة' : 'خطة'}</h2>
                <div className="flex items-center gap-1 justify-end">
                  <span className={`w-1 h-1 ${isAdminMode ? 'bg-amber-400' : 'bg-success'} rounded-full animate-pulse`}></span>
                  <p className={`text-[7px] font-black ${isAdminMode ? 'text-slate-400' : 'text-gray-400'} uppercase tracking-[0.18em]`}>{isAdminMode ? 'System Admin' : 'Business AI Platform'}</p>
                </div>
              </div>
            )}
            {isCollapsed && (
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${isAdminMode ? 'bg-amber-500' : 'bg-primary-600'}`}>
                {isAdminMode ? <Shield size={16} strokeWidth={2.5} className="w-4 h-4 sm:w-5 sm:h-5" /> : <Zap size={16} strokeWidth={2.5} className="w-4 h-4 sm:w-5 sm:h-5" />}
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation Area */}
        <nav className="flex-1 py-0.5 overflow-hidden">
          {isAdminMode ? (
            <>
              <NavGroup title="القلب النابض" isCollapsed={isCollapsed} isAdminMode={isAdminMode}>
                <NavItem icon={LayoutDashboard} label="الصفحة الرئيسية" href={tabHref('admin-dashboard')} active={activeTab === 'admin-dashboard'} onClick={() => setActiveTab?.('admin-dashboard')} isCollapsed={isCollapsed} isAdminMode={isAdminMode} />
                <NavItem icon={AreaChart} label="تحليلات المنصة" href={tabHref('admin-analytics')} active={activeTab === 'admin-analytics'} onClick={() => setActiveTab?.('admin-analytics')} isAdminMode={isAdminMode} isCollapsed={isCollapsed} />
              </NavGroup>

              <NavGroup title="إدارة النظام" isCollapsed={isCollapsed} isAdminMode={isAdminMode}>
                <NavItem icon={Users} label="قاعدة المستخدمين" href={tabHref('users-management')} active={activeTab === 'users-management'} onClick={() => setActiveTab?.('users-management')} isAdminMode={isAdminMode} isCollapsed={isCollapsed} badge={248} />
                <NavItem icon={FileText} label="أرشيف الخطط" href={tabHref('admin-plans')} active={activeTab === 'admin-plans'} onClick={() => setActiveTab?.('admin-plans')} isAdminMode={isAdminMode} isCollapsed={isCollapsed} />
                {!isCollapsed && <NavItem icon={Shield} label="بروتوكولات الأمان" href={tabHref('admin-security')} active={activeTab === 'admin-security'} onClick={() => setActiveTab?.('admin-security')} isAdminMode={isAdminMode} isCollapsed={isCollapsed} />}
              </NavGroup>

              {!isCollapsed && (
                <NavGroup title="النظام" isCollapsed={isCollapsed} isAdminMode={isAdminMode}>
                  <NavItem icon={LogOut} label="تسجيل الخروج Safe" variant="danger" isAdminMode={isAdminMode} isCollapsed={isCollapsed} />
                </NavGroup>
              )}
            </>
          ) : (
            <>
              <NavGroup title="القلب النابض" isCollapsed={isCollapsed}>
                <NavItem id="tour-home" icon={Home} label="الصفحة الرئيسية" href={tabHref('home')} active={activeTab === 'home'} onClick={() => setActiveTab?.('home')} isCollapsed={isCollapsed} />
                <NavItem id="tour-projects" icon={Layers} label="مشاريعي" href={tabHref('my-plans')} active={activeTab === 'my-plans'} onClick={() => setActiveTab?.('my-plans')} isCollapsed={isCollapsed} />
                <NavItem id="tour-new-plan" icon={Rocket} label="خلق فكرة" href={tabHref('new-plan')} active={activeTab === 'new-plan'} onClick={() => setActiveTab?.('new-plan')} isCollapsed={isCollapsed} />
                <NavItem id="tour-workspace" icon={LayoutDashboard} label="مساحة المشروع" href={tabHref('workspace')} active={activeTab === 'workspace'} onClick={() => setActiveTab?.('workspace')} isCollapsed={isCollapsed} isNew />
              </NavGroup>

              <NavGroup title="مختبر الاستراتيجية" isCollapsed={isCollapsed}>
                <NavItem id="tour-unicorn" icon={Globe} label="رادار اليونيكورن" href={tabHref('unicorn-benchmark')} active={activeTab === 'unicorn-benchmark'} onClick={() => setActiveTab?.('unicorn-benchmark')} isCollapsed={isCollapsed} isNew />
                
                {/* Market Discovery Link */}
                <NavItem 
                  id="tour-market-discovery" 
                  icon={Compass} 
                  label="استكشاف السوق" 
                  href={tabHref('market-discovery')}
                  active={isMarketDiscoveryActive} 
                  onClick={() => setActiveTab?.('market-discovery')} 
                  isCollapsed={isCollapsed}
                  isNew
                />

                <NavItem 
                  id="tour-problem-engine" 
                  icon={Activity} 
                  label="المشاكل والفرص" 
                  href={tabHref('problem-engine')}
                  active={activeTab === 'problem-engine'} 
                  onClick={() => setActiveTab?.('problem-engine')} 
                  isCollapsed={isCollapsed}
                  isNew
                />

                <NavItem 
                  id="tour-hackathon"
                  icon={Zap}
                  label="هاكاثون المستثمر"
                  href={tabHref('hackathon')}
                  active={activeTab === 'hackathon'}
                  onClick={() => setActiveTab?.('hackathon')}
                  isCollapsed={isCollapsed}
                  isNew
                />

                <NavItem 
                  id="tour-bmc"
                  icon={LayoutGrid}
                  label="نموذج العمل (BMC)"
                  href={tabHref('bmc')}
                  active={activeTab === 'bmc'}
                  onClick={() => setActiveTab?.('bmc')}
                  isCollapsed={isCollapsed}
                  isNew
                />

                <NavItem id="tour-brand" icon={Palette} label="استوديو الهوية" href={tabHref('brand-identity')} active={activeTab === 'brand-identity'} onClick={() => setActiveTab?.('brand-identity')} isCollapsed={isCollapsed} />
                {!isCollapsed && <NavItem icon={ArrowRightLeft} label="مقارنة السيناريوهات" href={tabHref('comparison')} active={activeTab === 'comparison'} onClick={() => setActiveTab?.('comparison')} isCollapsed={isCollapsed} />}
              </NavGroup>

              {!isCollapsed ? (
                <>
                  <NavGroup title="مركز العمليات" isCollapsed={isCollapsed}>
                    <NavItem icon={FileText} id="tour-editor" label="محرر الخطط" href={tabHref('editor')} active={activeTab === 'editor'} onClick={() => setActiveTab?.('editor')} isCollapsed={isCollapsed} variant={activeTab === 'editor' ? 'active-project' : 'default'} />
                    <NavItem icon={Trello} id="tour-tasks" label="المهام والجدولة" href={tabHref('tasks')} active={activeTab === 'tasks'} onClick={() => setActiveTab?.('tasks')} isCollapsed={isCollapsed} badge={2} />
                  </NavGroup>

                  <NavGroup title="الإدارة والضبط" isCollapsed={isCollapsed}>
                    <NavItem icon={Bell} label="التنبيهات" href={tabHref('notifications')} active={activeTab === 'notifications'} onClick={() => setActiveTab?.('notifications')} isCollapsed={isCollapsed} badge={3} />
                    <NavItem icon={CreditCard} label="الاشتراكات والأسعار" href={tabHref('pricing')} active={activeTab === 'pricing'} onClick={() => setActiveTab?.('pricing')} isCollapsed={isCollapsed} />
                    <NavItem icon={Crown} label="بوابة العميل" href={tabHref('customer-dashboard')} active={isCustomerPortalActive} onClick={() => setActiveTab?.('customer-dashboard')} isCollapsed={isCollapsed} isNew />
                    <NavItem icon={Settings} label="إعدادات المنصة" href={tabHref('settings')} active={activeTab === 'settings'} onClick={() => setActiveTab?.('settings')} isCollapsed={isCollapsed} />
                  </NavGroup>

                  <div className="px-4 py-2 animate-in fade-in duration-500">
                    <div className="rounded-2xl border border-gray-200 bg-slate-50 p-3 relative overflow-hidden group">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 relative z-10">الدعم الاستراتيجي</h4>
                      <p className="text-[10px] font-bold text-gray-600 mb-2 leading-relaxed relative z-10">تحتاج لخبرة استثمارية؟</p>
                      <button onClick={() => setActiveTab?.('contact-us')} className="w-full py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-black text-gray-800 hover:bg-gray-900 hover:text-white transition-all shadow-sm relative z-10">تحدث مع مستشار</button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="px-2 mt-4 space-y-4">
                  <NavItem icon={Bell} label="التنبيهات" href={tabHref('notifications')} active={activeTab === 'notifications'} onClick={() => setActiveTab?.('notifications')} isCollapsed={isCollapsed} badge={3} />
                  <NavItem icon={Settings} label="الإعدادات" href={tabHref('settings')} active={activeTab === 'settings'} onClick={() => setActiveTab?.('settings')} isCollapsed={isCollapsed} />
                </div>
              )}
            </>
          )}
        </nav>

        {/* User Footer Card */}
        <div className={`p-2.5 sm:p-3 ${isAdminMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'} border-t ${isCollapsed ? 'flex flex-col items-center' : 'flex flex-col'} gap-2 transition-colors duration-500`}>
          <button
            onClick={() => setActiveTab?.(isAdminMode ? 'home' : 'admin-dashboard')}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center p-2.5 sm:p-3' : 'justify-center gap-1.5 py-2 px-3'} rounded-[1rem] text-[10px] font-black transition-all duration-300 group ${
              isAdminMode
                ? 'bg-amber-500/10 border border-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-white shadow-sm'
                : 'bg-white border border-amber-200 text-amber-600 hover:bg-amber-50 hover:border-amber-400 shadow-sm'
            }`}
            title={isAdminMode ? "العودة لحساب المستخدم" : "لوحة تحكم المسؤول"}
          >
            {isAdminMode ? <LogOut size={isCollapsed ? 18 : 14} className="group-hover:-translate-x-1 transition-transform w-4 h-4 sm:w-5 sm:h-5" /> : <Shield size={isCollapsed ? 18 : 14} className="group-hover:scale-110 transition-transform w-4 h-4 sm:w-5 sm:h-5" />}
            {!isCollapsed && (isAdminMode ? 'العودة لواجهة المستخدم' : 'لوحة تحكم الآدمن')}
          </button>

          {!isCollapsed && (
            <div className="flex justify-center animate-in slide-in-from-bottom-2 duration-500">
              <p className={`text-[7px] font-black ${isAdminMode ? 'text-slate-600' : 'text-gray-300'} uppercase tracking-[0.18em]`}>KHOTTA • ENGINE 2.5</p>
            </div>
          )}
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
      </aside>
    </>
  );
};
