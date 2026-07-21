import React, { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';

// Using a safe icon loader
const SafeIcon = ({ iconName, ...props }: { iconName: string; [key: string]: any }) => {
  const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
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
  sectors: DiscoverySector[];
  gatekeepers: string[];
}

// Visual Themes for the Cards
const CARD_THEMES = [
  { bg: 'bg-[#F0F7FF]', border: 'border-blue-100', accent: 'bg-blue-600', text: 'text-blue-700', icon: 'text-blue-500', hover: 'hover:bg-blue-100/50' },
  { bg: 'bg-[#F0FDF4]', border: 'border-emerald-100', accent: 'bg-emerald-600', text: 'text-emerald-700', icon: 'text-emerald-500', hover: 'hover:bg-emerald-100/50' },
  { bg: 'bg-[#F5F3FF]', border: 'border-indigo-100', accent: 'bg-indigo-600', text: 'text-indigo-700', icon: 'text-indigo-500', hover: 'hover:bg-indigo-100/50' },
  { bg: 'bg-[#FFF7ED]', border: 'border-amber-100', accent: 'bg-amber-600', text: 'text-amber-700', icon: 'text-amber-500', hover: 'hover:bg-amber-100/50' },
  { bg: 'bg-[#FAF5FF]', border: 'border-purple-100', accent: 'bg-purple-600', text: 'text-purple-700', icon: 'text-purple-500', hover: 'hover:bg-purple-100/50' },
  { bg: 'bg-[#FEF2F2]', border: 'border-rose-100', accent: 'bg-rose-600', text: 'text-rose-700', icon: 'text-rose-500', hover: 'hover:bg-rose-100/50' },
  { bg: 'bg-[#F0FDFA]', border: 'border-teal-100', accent: 'bg-teal-600', text: 'text-teal-700', icon: 'text-teal-500', hover: 'hover:bg-teal-100/50' },
];

const DISCOVERY_DATA: DiscoveryGroup[] = [
  {
    title: 'الإعلانات والتسويق',
    iconName: 'Megaphone',
    gatekeepers: ['Google', 'Meta', 'WPP', 'Publicis', 'TikTok'],
    sectors: [
      { id: 'advertising-dashboard', label: 'الإعلانات الرقمية والتقليدية', exists: true },
      { id: 'marketing-dashboard', label: 'استراتيجيات التسويق الحديثة', exists: true },
      { id: 'brands-leaders-dashboard', label: 'العباقرة ورواد العلامات', exists: true },
      { id: 'influencer-marketing-dashboard', label: 'التسويق عبر المؤثرين', exists: true, isNew: true },
      { id: 'seo-content-marketing', label: 'تحسين محركات البحث SEO', exists: true },
    ]
  },
  {
    title: 'الزراعة والموارد الطبيعية',
    iconName: 'Sprout',
    gatekeepers: ['Cargill', 'Bayer', 'Nutrien', 'John Deere', 'Syngenta'],
    sectors: [
      { id: 'farming-dashboard', label: 'الإنتاج الزراعي والمحاصيل', exists: true, isNew: true },
      { id: 'fisheries-aquaculture-dashboard', label: 'الثروة السمكية والاستزراع', exists: true },
      { id: 'forestry-dashboard', label: 'إدارة الغابات والأخشاب', exists: true },
      { id: 'agritech-dashboard', label: 'تكنولوجيا الزراعة الذكية', exists: true, isNew: true },
      { id: 'seeds-crop-protection-dashboard', label: 'البذور وحماية المحاصيل', exists: true, isNew: true },
    ]
  },
  {
    title: 'الكيمياء والموارد',
    iconName: 'FlaskConical',
    gatekeepers: ['BASF', 'Dow', 'Sinopec', 'LyondellBasell', 'SABIC'],
    sectors: [
      { id: 'chemical-industry-dashboard', label: 'الصناعات الكيماوية والمواد', exists: true },
      { id: 'fossil-fuels-dashboard', label: 'الوقود الأحفوري والطاقة', exists: true },
      { id: 'mining-dashboard', label: 'التعدين والمعادن الثمينة', exists: true },
      { id: 'petroleum-refinery-dashboard', label: 'تكرير البترول والبتروكيماويات', exists: true },
      { id: 'plastic-rubber-dashboard', label: 'البلاستيك والمطاط الصناعي', exists: true },
      { id: 'pulp-paper-dashboard', label: 'الورق ومنتجاته', exists: true, isNew: true },
    ]
  },
  {
    title: 'البناء والإنشاءات',
    iconName: 'Building2',
    gatekeepers: ['Vinci', 'ACS', 'Bechtel', 'BOUYGUES', 'CSCEC'],
    sectors: [
      { id: 'building-construction-dashboard', label: 'تطوير وبناء العقارات', exists: true },
      { id: 'heavy-construction-dashboard', label: 'البناء الثقيل والبنية التحتية', exists: true },
      { id: 'smart-construction-bim-dashboard', label: 'البنية التحتية الذكية وBIM', exists: true, isNew: true },
      { id: 'modular-prefab-construction-dashboard', label: 'البناء المعياري والجاهز', exists: true, isNew: true },
    ]
  },
  {
    title: 'السلع الاستهلاكية (FMCG)',
    iconName: 'ShoppingBag',
    gatekeepers: ['Nestlé', 'P&G', 'Unilever', 'PepsiCo', 'Coca-Cola'],
    sectors: [
      { id: 'apparel-shoes-dashboard', label: 'الملابس والأحذية والموضة', exists: true },
      { id: 'cosmetics-personal-care-dashboard', label: 'التجميل والعناية الشخصية', exists: true },
      { id: 'food-nutrition-dashboard', label: 'الغذاء والتغذية العالمية', exists: true },
      { id: 'furniture-household-dashboard', label: 'الأثاث والسلوك الاستهلاكي', exists: true },
      { id: 'non-alcoholic-beverages-dashboard', label: 'المشروبات غير الكحولية', exists: true },
      { id: 'alcoholic-beverages-dashboard', label: 'المشروبات الكحولية', exists: true, isNew: true },
      { id: 'cannabis-dashboard', label: 'القنب القانوني', exists: true, isNew: true },
      { id: 'cleaning-products-dashboard', label: 'منتجات التنظيف', exists: true, isNew: true },
      { id: 'garden-patio-dashboard', label: 'الحديقة والأثاث الخارجي', exists: true, isNew: true },
      { id: 'home-improvement-dashboard', label: 'تحسين المنزل', exists: true, isNew: true },
      { id: 'pet-supplies-dashboard', label: 'مستلزمات الحيوانات الأليفة', exists: true, isNew: true },
      { id: 'tobacco-dashboard', label: 'التبغ', exists: true, isNew: true },
      { id: 'toys-dashboard', label: 'الألعاب', exists: true, isNew: true },
      { id: 'packaged-foods-dashboard', label: 'الأغذية المعبأة', exists: true, isNew: true },
    ]
  },
  {
    title: 'التجارة الإلكترونية',
    iconName: 'ShoppingCart',
    gatekeepers: ['Amazon', 'Alibaba', 'eBay', 'Shopify', 'Noon'],
    sectors: [
      { id: 'b2b-ecommerce-dashboard', label: 'تجارة الأعمال B2B', exists: true },
      { id: 'b2c-ecommerce-dashboard', label: 'تجارة المستهلك B2C', exists: true },
      { id: 'c2c-ecommerce-dashboard', label: 'تجارة المستهلك C2C', exists: true, isNew: true },
      { id: 'digital-shopping-behaviour-dashboard', label: 'سلوك التسوق الرقمي', exists: true },
      { id: 'ecommerce-key-figures-dashboard', label: 'أرقام ومؤشرات السوق', exists: true },
      { id: 'paid-content-dashboard', label: 'المحتوى والخدمات المدفوعة', exists: true },
    ]
  },
  {
    title: 'الاقتصاد والسياسة',
    iconName: 'Globe',
    gatekeepers: ['IMF', 'World Bank', 'WTO', 'OECD', 'FED'],
    sectors: [
      { id: 'economy-dashboard', label: 'المؤشرات الاقتصادية الكلية', exists: true },
      { id: 'international-trade-dashboard', label: 'التجارة الدولية والصادرات', exists: true },
      { id: 'politics-dashboard', label: 'السياسة والحكومة واللوائح', exists: true },
      { id: 'public-policy-economic-strategy-dashboard', label: 'السياسة العامة والاستراتيجية الاقتصادية', exists: true, isNew: true },
      { id: 'geopolitical-risk-global-trade-analysis-dashboard', label: 'تحليل المخاطر الجيوسياسية والتجارة العالمية', exists: true, isNew: true },
    ]
  },
  {
    title: 'الطاقة والبيئة',
    iconName: 'Zap',
    gatekeepers: ['Shell', 'Exxon', 'NextEra', 'Vestas', 'Total'],
    sectors: [
      { id: 'climate-dashboard', label: 'المناخ والبيئة العالمية', exists: true },
      { id: 'energy-dashboard', label: 'قطاع الطاقة المتجددة', exists: true },
      { id: 'waste-dashboard', label: 'إدارة النفايات والتدوير', exists: true },
      { id: 'water-dashboard', label: 'المياه والصرف الصحي', exists: true },
      { id: 'greentech-dashboard', label: 'التكنولوجيات الخضراء', exists: true },
      { id: 'emissions-dashboard', label: 'الانبعاثات الكربونية', exists: true, isNew: true },
      { id: 'renewable-energy-infrastructure-dashboard', label: 'بنية الطاقة المتجددة', exists: true, isNew: true },
      { id: 'carbon-capture-climate-tech-dashboard', label: 'تقنيات احتجاز الكربون', exists: true, isNew: true },
    ]
  },
  {
    title: 'التمويل والتأمين',
    iconName: 'CreditCard',
    gatekeepers: ['JPMorgan', 'Visa', 'Allianz', 'Goldman Sachs', 'PayPal'],
    sectors: [
      { id: 'financial-institutions-dashboard', label: 'البنوك والمؤسسات المالية', exists: true },
      { id: 'investments-dashboard', label: 'الاستثمارات والأوراق المالية', exists: true },
      { id: 'financial-services-dashboard', label: 'الخدمات المالية المتخصصة', exists: true },
      { id: 'insurance-dashboard', label: 'قطاع التأمين وإدارة المخاطر', exists: true },
    ]
  },
  {
    title: 'الصحة والأدوية',
    iconName: 'HeartPulse',
    gatekeepers: ['Pfizer', 'J&J', 'Roche', 'Mayo Clinic', 'Sanofi'],
    sectors: [
      { id: 'care-support-dashboard', label: 'الرعاية الصحية والدعم', exists: true },
      { id: 'hospitals-health-professionals-dashboard', label: 'المستشفيات والكوادر', exists: true },
      { id: 'health-system-dashboard', label: 'الأنظمة الصحية العالمية', exists: true },
      { id: 'medical-technology-dashboard', label: 'التكنولوجيا الطبية الحديثة', exists: true },
      { id: 'pharma-market-dashboard', label: 'سوق الأدوية العالمي', exists: true },
      { id: 'state-of-health-dashboard', label: 'حالة الصحة العامة', exists: true, isNew: true },
    ]
  },
  {
    title: 'الإنترنت والاتصالات',
    iconName: 'Signal',
    gatekeepers: ['Alphabet', 'Meta', 'Cisco', 'Verizon', 'Netflix'],
    sectors: [
      { id: 'communications-dashboard', label: 'شبكات الاتصالات الرقمية', exists: true },
      { id: 'cyber-crime-security-dashboard', label: 'الأمن السيبراني والجرائم', exists: true },
      { id: 'mobile-internet-apps-dashboard', label: 'تطبيقات الهواتف الذكية', exists: true },
      { id: 'online-search-dashboard', label: 'محركات البحث العالمية', exists: true },
      { id: 'social-media-dashboard', label: 'منصات التواصل الاجتماعي', exists: true },
      { id: 'internet-demographics-dashboard', label: 'ديموغرافية الإنترنت والاستخدام', exists: true, isNew: true },
      { id: 'online-video-entertainment-dashboard', label: 'ترفيه الفيديو онлайн', exists: true, isNew: true },
      { id: 'reach-traffic-dashboard', label: 'الوصول وحركة المرور', exists: true, isNew: true },
    ]
  },
  {
    title: 'الحياة والمجتمع',
    iconName: 'Heart',
    gatekeepers: ['Tinder', 'WW', 'Ancestry', 'Meetup', 'Bumble'],
    sectors: [
      { id: 'celebrities-dashboard', label: 'المشاهير والشخصيات العامة', exists: true },
      { id: 'family-friends-dashboard', label: 'العلاقات الاجتماعية والأسرة', exists: true },
      { id: 'personality-behavior-dashboard', label: 'السلوك البشري والسمات', exists: true },
      { id: 'holidays-dashboard', label: 'العطلات والمناسبات', exists: true },
      { id: 'love-sex-dashboard', label: 'الحب والعلاقات الحميمة', exists: true, isNew: true },
      { id: 'mental-health-wellbeing-economy-dashboard', label: 'اقتصاد الصحة النفسية والعافية', exists: true, isNew: true },
      { id: 'longevity-human-performance-dashboard', label: 'صناعة طول العمر والأداء البشري', exists: true, isNew: true },
    ]
  },
  {
    title: 'الإعلام والترفيه',
    iconName: 'Tv',
    gatekeepers: ['Disney', 'Netflix', 'Sony', 'Spotify', 'Warner'],
    sectors: [
      { id: 'audio-dashboard', label: 'الصوتيات والموسيقى والبودكاست', exists: true },
      { id: 'books-publishing-dashboard', label: 'صناعة النشر والكتب', exists: true },
      { id: 'news-dashboard', label: 'الصحافة ووسائل الإعلام', exists: true },
      { id: 'tv-video-film-dashboard', label: 'السينما والتلفزيون والبث', exists: true },
      { id: 'video-gaming-esports-dashboard', label: 'الألعاب والرياضة الإلكترونية', exists: true },
    ]
  },
  {
    title: 'المعادن والإلكترونيات',
    iconName: 'Cpu',
    gatekeepers: ['Samsung', 'Apple', 'Intel', 'TSMC', 'Nvidia'],
    sectors: [
      { id: 'aerospace-defense-dashboard', label: 'الطيران والدفاع والفضاء', exists: true },
      { id: 'electronics-dashboard', label: 'صناعة الإلكترونيات الاستهلاكية', exists: true },
      { id: 'industrial-machinery-dashboard', label: 'الآلات الصناعية والمعدات', exists: true },
      { id: 'metals-dashboard', label: 'التعدين والمعادن والصلب', exists: true },
      { id: 'vehicle-manufacturing-dashboard', label: 'تصنيع المركبات والسيارات', exists: true },
      { id: 'rolling-stock-dashboard', label: 'صناعة عربات السكك الحديدية', exists: true, isNew: true },
      { id: 'shipbuilding-dashboard', label: 'صناعة السفن', exists: true, isNew: true },
      { id: 'semiconductors-dashboard', label: 'أشباه الموصلات', exists: true, isNew: true },
      { id: 'advanced-robotics-manufacturing-dashboard', label: 'تصنيع الروبوتات المتقدمة', exists: true, isNew: true },
    ]
  },
  {
    title: 'العقارات والتمويل العقاري',
    iconName: 'Home',
    gatekeepers: ['CBRE', 'JLL', 'Zillow', 'Compass', 'Realogy'],
    sectors: [
      { id: 'commercial-real-estate-dashboard', label: 'العقارات التجارية والمكاتب', exists: true },
      { id: 'industrial-real-estate-dashboard', label: 'العقارات الصناعية والمخازن', exists: true },
      { id: 'mortgages-financing-dashboard', label: 'التمويل والرهن العقاري', exists: true },
      { id: 'property-services-dashboard', label: 'الخدمات وإدارة الأملاك', exists: true },
      { id: 'residential-real-estate-dashboard', label: 'العقارات السكنية والمنازل', exists: true },
      { id: 'proptech-dashboard', label: 'تكنولوجيا العقارات', exists: true, isNew: true },
      { id: 'smart-cities-development-dashboard', label: 'تطوير المدن الذكية', exists: true, isNew: true },
    ]
  },
  {
    title: 'التجزئة والتجارة',
    iconName: 'ShoppingBag',
    gatekeepers: ['Walmart', 'Costco', 'Inditex', 'Amazon', 'IKEA'],
    sectors: [
      { id: 'fashion-accessories-dashboard', label: 'الأزياء والإكسسوارات', exists: true },
      { id: 'food-beverage-retail-dashboard', label: 'تجارة الأغذية والمشروبات', exists: true },
      { id: 'general-merchandise-dashboard', label: 'تجارة السلع العامة', exists: true },
      { id: 'retail-technology-dashboard', label: 'تقنيات تجارة التجزئة', exists: true },
      { id: 'supply-chain-dashboard', label: 'سلاسل التوريد والخدمات', exists: true },
      { id: 'wholesale-dashboard', label: 'تجارة الجملة والتوريد', exists: true },
      { id: 'diy-retail-dashboard', label: 'تجارة تحسين المنزل DIY', exists: true, isNew: true },
      { id: 'furniture-retail-dashboard', label: 'تجارة الأثاث', exists: true, isNew: true },
      { id: 'health-hygiene-dashboard', label: 'الصحة والنظافة', exists: true, isNew: true },
      { id: 'office-supplies-dashboard', label: 'مستلزمات المكاتب', exists: true, isNew: true },
      { id: 'private-label-dashboard', label: 'العلامات الخاصة', exists: true, isNew: true },
      { id: 'shopping-behavior-dashboard', label: 'سلوك التسوق', exists: true, isNew: true },
      { id: 'sports-leisure-retail-dashboard', label: 'تجارة الرياضة والترفيه', exists: true, isNew: true },
      { id: 'subscriptions-direct-selling-dashboard', label: 'الاشتراكات والبيع المباشر', exists: true, isNew: true },
      { id: 'ecommerce-logistics-fulfillment-dashboard', label: 'لوجستيات التجارة الإلكترونية', exists: true, isNew: true },
      { id: 'omnichannel-retail-systems-dashboard', label: 'أنظمة التجزئة متعددة القنوات', exists: true, isNew: true },
    ]
  },
  {
    title: 'الخدمات والمجتمع',
    iconName: 'Briefcase',
    gatekeepers: ['Accenture', 'Deloitte', 'UN', 'KPMG', 'PwC'],
    sectors: [
      { id: 'business-services-dashboard', label: 'خدمات الاستشارات والأعمال', exists: true },
      { id: 'skilled-labor-dashboard', label: 'العمالة الماهرة والتدريب', exists: true },
      { id: 'education-science-dashboard', label: 'التعليم والعلوم والبحث', exists: true },
      { id: 'demographics-dashboard', label: 'الديموغرافيا والنمو السكاني', exists: true },
      { id: 'historical-data-dashboard', label: 'البيانات التاريخية والتوجهات', exists: true },
      { id: 'digital-transformation-consulting-dashboard', label: 'استشارات التحول الرقمي', exists: true, isNew: true },
      { id: 'bpo-dashboard', label: 'تعهدات العمليات التجارية', exists: true, isNew: true },
      { id: 'crime-law-enforcement-dashboard', label: 'الجريمة وإنفاذ القانون', exists: true, isNew: true },
      { id: 'geography-nature-dashboard', label: 'الجغرافيا والطبيعة', exists: true, isNew: true },
      { id: 'religion-dashboard', label: 'الدين', exists: true, isNew: true },
      { id: 'urban-development-smart-cities-policy-dashboard', label: 'التطوير الحضري والسياسة', exists: true, isNew: true },
      { id: 'population-analytics-demographic-intelligence-dashboard', label: 'التحليلات السكانية', exists: true, isNew: true },
    ]
  },
  {
    title: 'الرياضة والاستجمام',
    iconName: 'Activity',
    gatekeepers: ['Nike', 'FIFA', 'Adidas', 'UFC', 'NBA'],
    sectors: [
      { id: 'professional-sports-dashboard', label: 'الرياضات الاحترافية والبطولات', exists: true },
      { id: 'sports-fitness-dashboard', label: 'اللياقة البدنية والصحة', exists: true },
      { id: 'wellness-spas-dashboard', label: 'الاستجمام والعافية والمنتجعات', exists: true },
      { id: 'art-culture-dashboard', label: 'الفن والثقافة والمتاحف', exists: true },
      { id: 'gambling-dashboard', label: 'القمار والمراهنات', exists: true, isNew: true },
      { id: 'hobbies-dashboard', label: 'الهوايات', exists: true, isNew: true },
      { id: 'parks-outdoors-dashboard', label: 'الحدائق والأنشطة الخارجية', exists: true, isNew: true },
      { id: 'sports-analytics-performance-tech-dashboard', label: 'تحليلات الأداء الرياضي', exists: true, isNew: true },
      { id: 'esports-gaming-industry-dashboard', label: 'صناعة الألعاب التنافسية', exists: true, isNew: true },
    ]
  },
  {
    title: 'التكنولوجيا والاتصالات',
    iconName: 'Smartphone',
    gatekeepers: ['Apple', 'Microsoft', 'Google', 'Meta', 'Amazon'],
    sectors: [
      { id: 'consumer-electronics-dashboard', label: 'الإلكترونيات الاستهلاكية الذكية', exists: true },
      { id: 'software-dashboard', label: 'صناعة البرمجيات وSaaS', exists: true },
      { id: 'it-services-dashboard', label: 'خدمات تقنية المعلومات', exists: true },
      { id: 'hardware-dashboard', label: 'الأجهزة والعتاد التكنولوجي', exists: true },
      { id: 'telecommunications-dashboard', label: 'قطاع الاتصالات والشبكات', exists: true },
      { id: 'household-appliances-dashboard', label: 'الأجهزة المنزلية', exists: true, isNew: true },
      { id: 'artificial-intelligence-dashboard', label: 'الذكاء الاصطناعي', exists: true, isNew: true },
      { id: 'cloud-services-dashboard', label: 'الخدمات السحابية', exists: true, isNew: true },
    ]
  },
  {
    title: 'النقل واللوجستيات',
    iconName: 'Truck',
    gatekeepers: ['FedEx', 'DHL', 'Maersk', 'Uber', 'Tesla'],
    sectors: [
      { id: 'aviation-dashboard', label: 'قطاع الطيران والنقل الجوي', exists: true },
      { id: 'logistics-dashboard', label: 'الخدمات اللوجستية والشحن', exists: true },
      { id: 'public-transport-dashboard', label: 'النقل العام والتنقل الحضري', exists: true },
      { id: 'vehicles-road-traffic-dashboard', label: 'المركبات وحركة المرور', exists: true },
      { id: 'water-transport-dashboard', label: 'النقل البحري والموانئ', exists: true },
      { id: 'rail-transport-dashboard', label: 'النقل بالسكك الحديدية', exists: true, isNew: true },
      { id: 'autonomous-vehicles-dashboard', label: 'المركبات ذاتية القيادة', exists: true, isNew: true },
      { id: 'ev-infrastructure-dashboard', label: 'بنية المركبات الكهربائية', exists: true, isNew: true },
    ]
  },
  {
    title: 'السياحة والضيافة',
    iconName: 'Bed',
    gatekeepers: ['Marriott', 'Booking', 'Airbnb', 'Hilton', 'Expedia'],
    sectors: [
      { id: 'accommodation-dashboard', label: 'قطاع الفنادق وأماكن الإقامة', exists: true },
      { id: 'food-drink-services-dashboard', label: 'خدمات الأطعمة والمشروبات', exists: true },
      { id: 'leisure-travel-dashboard', label: 'سياحة الترفه والرحلات', exists: true },
      { id: 'business-travel-dashboard', label: 'سفر الأعمال والمؤتمرات', exists: true },
      { id: 'medical-tourism-dashboard', label: 'السياحة العلاجية', exists: true, isNew: true },
      { id: 'travel-technology-dashboard', label: 'تكنولوجيا السفر', exists: true, isNew: true },
    ]
  }
];

export function DiscoveryCenter({
  setActiveTab,
  onSelectSector,
}: {
  setActiveTab: (tab: string) => void;
  onSelectSector?: (sector: { id: string; label: string; groupTitle: string }) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = useMemo(() => {
    try {
      return DISCOVERY_DATA.map(group => ({
        ...group,
        sectors: group.sectors.filter(s => 
          (s.label || '').toLowerCase().includes((searchTerm || '').toLowerCase())
        )
      })).filter(group => group.sectors.length > 0);
    } catch (e) {
      console.error('Filtering error:', e);
      return [];
    }
  }, [searchTerm]);

  const renderCard = (group: DiscoveryGroup, index: number) => {
    // Pick theme based on index
    const theme = CARD_THEMES[index % CARD_THEMES.length];
    
    return (
      <div 
        key={group.title} 
        className={`h-full flex flex-col p-5 sm:p-6 rounded-[2rem] border ${theme.border} ${theme.bg} transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 group w-full sm:max-w-none`}
      >
        {/* Header Block */}
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className={`w-1.5 h-6 ${theme.accent} rounded-full`} />
          <div className="flex items-center gap-2">
            <SafeIcon iconName={group.iconName} size={20} className={theme.icon} />
            <h2 className={`text-[16px] sm:text-[17px] font-black ${theme.text} tracking-tight`}>{group.title}</h2>
          </div>
        </div>

        {/* Content - Grows to fill space */}
        <div className="flex-1 space-y-1.5 mb-8">
          {(group.sectors || []).map((sector) => (
            <button
              key={sector.id}
              onClick={() => {
                onSelectSector?.({ id: sector.id, label: sector.label, groupTitle: group.title });
                setActiveTab(sector.id);
              }}
              className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-right transition-all group/item ${theme.hover}`}
            >
              <div className="flex items-center gap-2">
                <LucideIcons.ChevronLeft size={14} className="text-blue-500 opacity-60 group-hover/item:opacity-100 group-hover/item:-translate-x-1 transition-all" />
                <span className="text-[13px] font-bold text-blue-600 group-hover/item:underline underline-offset-4 decoration-2">
                  {sector.label}
                </span>
              </div>
            </button>
          ))}
        </div>


      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-right pb-32" dir="rtl" style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}>
      {/* Sleek Strategic Intelligence Banner */}
      <div className="relative w-full overflow-hidden bg-[#0A0C10] py-12 sm:py-16 px-5 sm:px-12 border-b border-white/5">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/10 to-transparent blur-[100px] opacity-40" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-indigo-600/10 to-transparent blur-[100px] opacity-40" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="space-y-4 max-w-4xl">

              
              <div className="space-y-4">
                 <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                   رادار استكشاف الأسواق <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">والفرص الاستثمارية</span>
                 </h1>
                 <p className="text-[15px] sm:text-[17px] md:text-[18px] text-slate-300 font-medium leading-relaxed max-w-2xl opacity-90">
                   بوابتك الذكية لاستكشاف مئات الصناعات العالمية وتحليل اتجاهات السوق لدعم قراراتك الاستثمارية وبناء خطة عمل ناجحة.
                 </p>
              </div>


           </div>

           <div className="hidden lg:flex relative mr-12 shrink-0">
              <div className="w-32 h-32 rounded-full bg-blue-600/10 blur-[60px] absolute inset-0 animate-pulse" />
              <LucideIcons.Globe size={100} className="text-white/5 relative z-10 rotate-12" />
           </div>
        </div>
      </div>

      {/* Advanced Filter & Search Terminal - Permanent Glow Mode */}
      <div className="relative -mt-6 sm:-mt-10 py-4 px-4 sm:px-12 z-40">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            {/* Permanent High-Tech Glow */}
            <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-2xl opacity-100 animate-pulse transition-opacity" />
            
            <div className="relative flex items-center bg-white border-2 border-blue-500/30 rounded-2xl shadow-[0_20px_60px_rgba(59,130,246,0.2)] overflow-hidden focus-within:border-blue-500 transition-all">
              <div className="pr-6 pl-2">
                <LucideIcons.Search className="text-blue-600" size={22} />
              </div>
              <input 
                type="text"
                placeholder="ابحث عن قطاع، صناعة، أو قادة السوق..."
                className="w-full py-4 sm:py-5 pr-2 pl-6 bg-transparent text-[14px] sm:text-[16px] font-bold text-slate-800 focus:outline-none placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="px-6 text-slate-300 hover:text-slate-600 transition-colors"
                >
                  <LucideIcons.X size={20} />
                </button>
              )}
            </div>

            {/* Smart Suggestions Dropdown */}
            {searchTerm && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="p-3 border-b border-slate-50 bg-slate-50/50">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">أفضل النتائج المقترحة</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredGroups.flatMap(g => g.sectors).slice(0, 8).map((sector) => (
                    <button
                      key={sector.id}
                      onClick={() => {
                        const parentGroup = filteredGroups.find((group) => group.sectors.some((candidate) => candidate.id === sector.id));
                        onSelectSector?.({
                          id: sector.id,
                          label: sector.label,
                          groupTitle: parentGroup?.title || 'قطاع غير مصنف',
                        });
                        setActiveTab(sector.id);
                        setSearchTerm('');
                      }}
                      className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-none text-right"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-[14px] font-bold text-slate-700">{sector.label}</span>
                      </div>
                      <LucideIcons.ChevronLeft size={16} className="text-slate-300" />
                    </button>
                  ))}
                  {filteredGroups.length === 0 && (
                    <div className="p-8 text-center text-slate-400 font-medium">
                      لا توجد اقتراحات مطابقة لـ "{searchTerm}"
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-5 sm:px-12 mt-16 sm:mt-24">
        {/* Main Smart Grid - Using Grid Auto Rows for consistent row height */}
        {/* Center grid items on mobile, align to start on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pb-32">
          {filteredGroups.map((group, index) => renderCard(group, index))}
        </div>

        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <div className="py-40 text-center space-y-6">
             <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-50 rounded-full text-slate-200 border-2 border-dashed border-slate-200">
               <LucideIcons.Orbit size={48} />
             </div>
             <div>
                <p className="text-slate-900 font-black text-xl mb-2">لم نجد بيانات تطابق بحثك</p>
                <p className="text-slate-400 font-bold text-sm">جرب البحث بكلمات أبسط مثل "زراعة" أو "تكنولوجيا"</p>
             </div>
             <button onClick={() => setSearchTerm('')} className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm hover:scale-105 transition-transform">
               إعادة تعيين المحرك
             </button>
          </div>
        )}
      </div>


    </div>
  );
}

DiscoveryCenter.displayName = 'DiscoveryCenter';
