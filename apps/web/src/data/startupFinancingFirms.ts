export interface VentureFirm {
  id: string;
  nameAr: string;
  nameEn: string;
  countryAr: string;
  countryEn: string;
  flag: string;
  typeAr: string;
  typeCategory: 'vc' | 'accelerator' | 'angel' | 'cvc' | 'gov_dev' | 'fund_of_funds' | 'investment';
  stageAr: string;
  stages: ('pre_seed' | 'seed' | 'series_a' | 'series_b' | 'growth' | 'sme')[];
  sectorsAr: string[];
  websiteUrl: string;
  notesAr?: string;
  featured?: boolean;
}

export const VENTURE_FIRMS: VentureFirm[] = [
  {
    "id": "mena-venture-investments-1",
    "nameAr": "MENA Venture Investments",
    "nameEn": "MENA Venture Investments",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Tech",
      "Fintech",
      "Consumer"
    ],
    "websiteUrl": "https://menavc.com",
    "featured": true
  },
  {
    "id": "global-ventures-africa-2",
    "nameAr": "Global Ventures Africa",
    "nameEn": "Global Ventures Africa",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Fintech",
      "HealthTech",
      "Climate"
    ],
    "websiteUrl": "https://global.vc",
    "featured": false
  },
  {
    "id": "nuwa-capital-3",
    "nameAr": "Nuwa Capital",
    "nameEn": "Nuwa Capital",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series B",
    "stages": [
      "seed",
      "series_b"
    ],
    "sectorsAr": [
      "Technology",
      "Consumer",
      "Fintech"
    ],
    "websiteUrl": "https://nuwacapital.io",
    "featured": false
  },
  {
    "id": "cotu-ventures-4",
    "nameAr": "COTU Ventures",
    "nameEn": "COTU Ventures",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "SaaS",
      "AI",
      "Fintech"
    ],
    "websiteUrl": "https://www.cotu.vc",
    "featured": false
  },
  {
    "id": "venturesouq-5",
    "nameAr": "VentureSouq",
    "nameEn": "VentureSouq",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Fintech",
      "ClimateTech",
      "HealthTech"
    ],
    "websiteUrl": "https://www.venturesouq.com",
    "featured": false
  },
  {
    "id": "mena-tech-fund-6",
    "nameAr": "MENA Tech Fund",
    "nameEn": "MENA Tech Fund",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Software"
    ],
    "websiteUrl": "https://menatechfund.com",
    "featured": false
  },
  {
    "id": "dash-ventures-7",
    "nameAr": "DASH Ventures",
    "nameEn": "DASH Ventures",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech"
    ],
    "websiteUrl": "https://dashventures.com",
    "featured": true
  },
  {
    "id": "sarmayacar-8",
    "nameAr": "Sarmayacar",
    "nameEn": "Sarmayacar",
    "countryAr": "الإمارات والمنطقة",
    "countryEn": "UAE & Region",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Consumer"
    ],
    "websiteUrl": "https://www.sarmayacar.com",
    "featured": false
  },
  {
    "id": "oraseya-capital-9",
    "nameAr": "Oraseya Capital",
    "nameEn": "Oraseya Capital",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "UAE Startups",
      "Technology"
    ],
    "websiteUrl": "https://oraseya.com",
    "featured": false
  },
  {
    "id": "emirates-development-bank-edb-10",
    "nameAr": "Emirates Development Bank – EDB",
    "nameEn": "Emirates Development Bank – EDB",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Development Bank / Financing",
    "typeCategory": "gov_dev",
    "stageAr": "Startup – SME",
    "stages": [
      "sme"
    ],
    "sectorsAr": [
      "Fintech",
      "Industry",
      "Technology"
    ],
    "websiteUrl": "https://www.edb.gov.ae",
    "featured": false
  },
  {
    "id": "emirates-investment-bank-11",
    "nameAr": "Emirates Investment Bank",
    "nameEn": "Emirates Investment Bank",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Investment / Financing",
    "typeCategory": "investment",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "SMEs",
      "Investment"
    ],
    "websiteUrl": "https://www.emiratesinvestmentbank.com",
    "featured": false
  },
  {
    "id": "mubadala-capital-12",
    "nameAr": "Mubadala Capital",
    "nameEn": "Mubadala Capital",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Investment Platform",
    "typeCategory": "investment",
    "stageAr": "Growth – Late Stage",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Healthcare",
      "Financial Services"
    ],
    "websiteUrl": "https://www.mubadalacapital.com",
    "featured": false
  },
  {
    "id": "adq-growth-13",
    "nameAr": "ADQ Growth",
    "nameEn": "ADQ Growth",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Investment",
    "typeCategory": "investment",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Healthcare",
      "Financial Services"
    ],
    "websiteUrl": "https://www.adq.ae",
    "featured": true
  },
  {
    "id": "beco-capital-14",
    "nameAr": "BECO Capital",
    "nameEn": "BECO Capital",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "SaaS",
      "Fintech",
      "Enterprise"
    ],
    "websiteUrl": "https://www.becocapital.com",
    "featured": false
  },
  {
    "id": "wamda-capital-15",
    "nameAr": "Wamda Capital",
    "nameEn": "Wamda Capital",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "SaaS"
    ],
    "websiteUrl": "https://www.wamdacapital.com",
    "featured": false
  },
  {
    "id": "flat6labs-abu-dhabi-16",
    "nameAr": "Flat6Labs Abu Dhabi",
    "nameEn": "Flat6Labs Abu Dhabi",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Accelerator / VC",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "AI",
      "Fintech"
    ],
    "websiteUrl": "https://flat6labs.com",
    "featured": false
  },
  {
    "id": "falcon-ventures-17",
    "nameAr": "Falcon Ventures",
    "nameEn": "Falcon Ventures",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "SaaS",
      "Fintech"
    ],
    "websiteUrl": "https://falcon.ventures",
    "featured": false
  },
  {
    "id": "derayah-ventures-18",
    "nameAr": "Derayah Ventures",
    "nameEn": "Derayah Ventures",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "Consumer"
    ],
    "websiteUrl": "https://www.derayah.com",
    "featured": false
  },
  {
    "id": "sukna-ventures-19",
    "nameAr": "Sukna Ventures",
    "nameEn": "Sukna Ventures",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Consumer",
      "SaaS"
    ],
    "websiteUrl": "https://sukna.vc",
    "featured": true
  },
  {
    "id": "rzm-investment-20",
    "nameAr": "RZM Investment",
    "nameEn": "RZM Investment",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Early – Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech"
    ],
    "websiteUrl": "https://rzm.com.sa",
    "featured": false
  },
  {
    "id": "al-rumaih-investment-21",
    "nameAr": "Al-Rumaih Investment",
    "nameEn": "Al-Rumaih Investment",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Investment / VC",
    "typeCategory": "vc",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Consumer",
      "Services"
    ],
    "websiteUrl": "https://alrumaih.com",
    "featured": false
  },
  {
    "id": "wa-ed-ventures-22",
    "nameAr": "Wa'ed Ventures",
    "nameEn": "Wa'ed Ventures",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Industrial",
      "SaaS"
    ],
    "websiteUrl": "https://www.waed.com",
    "featured": false
  },
  {
    "id": "sab-invest-23",
    "nameAr": "SAB Invest",
    "nameEn": "SAB Invest",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Investment / Asset Management",
    "typeCategory": "investment",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Financial Services",
      "Technology"
    ],
    "websiteUrl": "https://www.sabinvest.com",
    "featured": false
  },
  {
    "id": "snb-capital-24",
    "nameAr": "SNB Capital",
    "nameEn": "SNB Capital",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Investment / Asset Management",
    "typeCategory": "investment",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Financial Services",
      "Technology"
    ],
    "websiteUrl": "https://www.alahlicapital.com",
    "featured": false
  },
  {
    "id": "riyad-capital-25",
    "nameAr": "Riyad Capital",
    "nameEn": "Riyad Capital",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Investment",
    "typeCategory": "investment",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Financial Services",
      "Technology"
    ],
    "websiteUrl": "https://www.riyadcapital.com",
    "featured": true
  },
  {
    "id": "al-rajhi-capital-26",
    "nameAr": "Al Rajhi Capital",
    "nameEn": "Al Rajhi Capital",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Investment",
    "typeCategory": "investment",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Financial Services",
      "Technology"
    ],
    "websiteUrl": "https://www.alrajhi.com",
    "featured": false
  },
  {
    "id": "jadwa-investment-27",
    "nameAr": "Jadwa Investment",
    "nameEn": "Jadwa Investment",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Investment / Private Equity",
    "typeCategory": "investment",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Healthcare",
      "Consumer"
    ],
    "websiteUrl": "https://www.jadwa.com",
    "featured": false
  },
  {
    "id": "sedco-capital-28",
    "nameAr": "SEDCO Capital",
    "nameEn": "SEDCO Capital",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Investment / PE",
    "typeCategory": "investment",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Real Estate",
      "Consumer"
    ],
    "websiteUrl": "https://www.sedcocapital.com",
    "featured": false
  },
  {
    "id": "vision-ventures-29",
    "nameAr": "Vision Ventures",
    "nameEn": "Vision Ventures",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "SaaS",
      "Fintech",
      "Technology"
    ],
    "websiteUrl": "https://visionventures.co",
    "featured": false
  },
  {
    "id": "merak-capital-30",
    "nameAr": "Merak Capital",
    "nameEn": "Merak Capital",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Digital"
    ],
    "websiteUrl": "https://merakcapital.com",
    "featured": false
  },
  {
    "id": "shorooq-partners-saudi-31",
    "nameAr": "Shorooq Partners – Saudi",
    "nameEn": "Shorooq Partners – Saudi",
    "countryAr": "السعودية والمنطقة",
    "countryEn": "KSA & Region",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "AI",
      "Fintech",
      "Web3"
    ],
    "websiteUrl": "https://www.shorooq.com",
    "featured": true
  },
  {
    "id": "sadu-capital-32",
    "nameAr": "Sadu Capital",
    "nameEn": "Sadu Capital",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://saducapital.com",
    "featured": false
  },
  {
    "id": "raed-ventures-33",
    "nameAr": "RAED Ventures",
    "nameEn": "RAED Ventures",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "Consumer"
    ],
    "websiteUrl": "https://raedventures.com",
    "featured": false
  },
  {
    "id": "khwarizmi-ventures-34",
    "nameAr": "Khwarizmi Ventures",
    "nameEn": "Khwarizmi Ventures",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Pre-Seed – Series A",
    "stages": [
      "pre_seed",
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "SaaS",
      "AI",
      "Fintech"
    ],
    "websiteUrl": "https://khwarizmiventures.com",
    "featured": false
  },
  {
    "id": "hala-auto-hala-auto-finance-35",
    "nameAr": "Hala Auto / Hala Auto Finance",
    "nameEn": "Hala Auto / Hala Auto Finance",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture / Financing",
    "typeCategory": "vc",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Fintech",
      "Mobility"
    ],
    "websiteUrl": "https://hala.com",
    "featured": false
  },
  {
    "id": "egypt-ventures-36",
    "nameAr": "Egypt Ventures",
    "nameEn": "Egypt Ventures",
    "countryAr": "مصر",
    "countryEn": "Egypt",
    "flag": "🇪🇬",
    "typeAr": "Government VC / Accelerator",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "Startups"
    ],
    "websiteUrl": "https://egyptventures.com",
    "featured": false
  },
  {
    "id": "alex-angels-37",
    "nameAr": "Alex Angels",
    "nameEn": "Alex Angels",
    "countryAr": "مصر",
    "countryEn": "Egypt",
    "flag": "🇪🇬",
    "typeAr": "Angel Network",
    "typeCategory": "angel",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Consumer"
    ],
    "websiteUrl": "https://alexangels.com",
    "featured": true
  },
  {
    "id": "acasia-ventures-38",
    "nameAr": "Acasia Ventures",
    "nameEn": "Acasia Ventures",
    "countryAr": "مصر",
    "countryEn": "Egypt",
    "flag": "🇪🇬",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "SaaS"
    ],
    "websiteUrl": "https://acasiaventures.com",
    "featured": false
  },
  {
    "id": "disruptech-39",
    "nameAr": "DisrupTech",
    "nameEn": "DisrupTech",
    "countryAr": "مصر",
    "countryEn": "Egypt",
    "flag": "🇪🇬",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Fintech"
    ],
    "websiteUrl": "https://disruptechfund.com",
    "featured": false
  },
  {
    "id": "foundation-ventures-40",
    "nameAr": "Foundation Ventures",
    "nameEn": "Foundation Ventures",
    "countryAr": "مصر",
    "countryEn": "Egypt",
    "flag": "🇪🇬",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "SaaS"
    ],
    "websiteUrl": "https://foundationventures.com",
    "featured": false
  },
  {
    "id": "algebra-ventures-41",
    "nameAr": "Algebra Ventures",
    "nameEn": "Algebra Ventures",
    "countryAr": "مصر",
    "countryEn": "Egypt",
    "flag": "🇪🇬",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "SaaS"
    ],
    "websiteUrl": "https://algebraventures.com",
    "featured": false
  },
  {
    "id": "sawari-ventures-42",
    "nameAr": "Sawari Ventures",
    "nameEn": "Sawari Ventures",
    "countryAr": "مصر",
    "countryEn": "Egypt",
    "flag": "🇪🇬",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "HealthTech",
      "Fintech"
    ],
    "websiteUrl": "https://www.sawari.com",
    "featured": false
  },
  {
    "id": "launch-africa-ventures-43",
    "nameAr": "Launch Africa Ventures",
    "nameEn": "Launch Africa Ventures",
    "countryAr": "أفريقيا والمنطقة",
    "countryEn": "Africa & MENA",
    "flag": "🌍",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "SaaS",
      "Fintech",
      "B2B"
    ],
    "websiteUrl": "https://launchafrica.vc",
    "featured": true
  },
  {
    "id": "janngo-capital-44",
    "nameAr": "Janngo Capital",
    "nameEn": "Janngo Capital",
    "countryAr": "أفريقيا",
    "countryEn": "Africa",
    "flag": "🌍",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Growth / Early",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "Digital"
    ],
    "websiteUrl": "https://www.janngo.com",
    "featured": false
  },
  {
    "id": "flat6labs-bahrain-45",
    "nameAr": "Flat6Labs Bahrain",
    "nameEn": "Flat6Labs Bahrain",
    "countryAr": "البحرين",
    "countryEn": "Bahrain",
    "flag": "🇧🇭",
    "typeAr": "Accelerator / VC",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech"
    ],
    "websiteUrl": "https://flat6labs.com",
    "featured": false
  },
  {
    "id": "tenmou-46",
    "nameAr": "Tenmou",
    "nameEn": "Tenmou",
    "countryAr": "البحرين",
    "countryEn": "Bahrain",
    "flag": "🇧🇭",
    "typeAr": "Angel Network",
    "typeCategory": "angel",
    "stageAr": "Seed",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://www.tenmou.me",
    "featured": false
  },
  {
    "id": "hope-ventures-47",
    "nameAr": "Hope Ventures",
    "nameEn": "Hope Ventures",
    "countryAr": "البحرين",
    "countryEn": "Bahrain",
    "flag": "🇧🇭",
    "typeAr": "Venture / TV Investment",
    "typeCategory": "vc",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Startups",
      "SMEs",
      "Consumer"
    ],
    "websiteUrl": "https://hopefund.bh",
    "featured": false
  },
  {
    "id": "bahrain-development-bank-bdb-48",
    "nameAr": "Bahrain Development Bank – BDB",
    "nameEn": "Bahrain Development Bank – BDB",
    "countryAr": "البحرين",
    "countryEn": "Bahrain",
    "flag": "🇧🇭",
    "typeAr": "Development Bank / Financing",
    "typeCategory": "gov_dev",
    "stageAr": "Startup – SME",
    "stages": [
      "sme"
    ],
    "sectorsAr": [
      "SMEs",
      "Technology",
      "Innovation"
    ],
    "websiteUrl": "https://www.bdb-bh.com",
    "featured": false
  },
  {
    "id": "oqal-49",
    "nameAr": "OQAL",
    "nameEn": "OQAL",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Angel Investor Network",
    "typeCategory": "angel",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://oqal.org",
    "featured": true
  },
  {
    "id": "riyadh-angel-investors-50",
    "nameAr": "Riyadh Angel Investors",
    "nameEn": "Riyadh Angel Investors",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Angel Network",
    "typeCategory": "angel",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups",
      "SMEs"
    ],
    "websiteUrl": "https://riyadhangels.com",
    "featured": false
  },
  {
    "id": "wamda-capital-51",
    "nameAr": "Wamda Capital",
    "nameEn": "Wamda Capital",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A/B",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Tech",
      "SaaS",
      "Fintech"
    ],
    "websiteUrl": "https://www.wamdacapital.com",
    "featured": false
  },
  {
    "id": "global-ventures-52",
    "nameAr": "Global Ventures",
    "nameEn": "Global Ventures",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Fintech",
      "HealthTech",
      "Enterprise"
    ],
    "websiteUrl": "https://global.vc",
    "featured": false
  },
  {
    "id": "shorooq-partners-53",
    "nameAr": "Shorooq Partners",
    "nameEn": "Shorooq Partners",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Fintech",
      "AI",
      "Web3",
      "Software"
    ],
    "websiteUrl": "https://www.shorooq.com",
    "featured": false
  },
  {
    "id": "plusvc-54",
    "nameAr": "PlusVC",
    "nameEn": "PlusVC",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "SaaS",
      "Fintech"
    ],
    "websiteUrl": "https://www.plus.vc",
    "featured": false
  },
  {
    "id": "venturefriends-55",
    "nameAr": "VentureFriends",
    "nameEn": "VentureFriends",
    "countryAr": "الإمارات والمنطقة",
    "countryEn": "UAE & Region",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Fintech",
      "SaaS",
      "Marketplaces"
    ],
    "websiteUrl": "https://venturefriends.vc",
    "featured": true
  },
  {
    "id": "mevp-middle-east-venture-partners-56",
    "nameAr": "MEVP – Middle East Venture Partners",
    "nameEn": "MEVP – Middle East Venture Partners",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "Consumer"
    ],
    "websiteUrl": "https://www.mevp.com",
    "featured": false
  },
  {
    "id": "watar-partners-57",
    "nameAr": "Watar Partners",
    "nameEn": "Watar Partners",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Consumer",
      "Fintech"
    ],
    "websiteUrl": "https://watarpartners.com",
    "featured": false
  },
  {
    "id": "mubadala-ventures-58",
    "nameAr": "Mubadala Ventures",
    "nameEn": "Mubadala Ventures",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital / Investment",
    "typeCategory": "vc",
    "stageAr": "Growth – Late Stage",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Healthcare",
      "AI"
    ],
    "websiteUrl": "https://www.mubadala.com",
    "featured": false
  },
  {
    "id": "adq-59",
    "nameAr": "ADQ",
    "nameEn": "ADQ",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Investment Company",
    "typeCategory": "investment",
    "stageAr": "Growth – Late Stage",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Financial Services",
      "Infrastructure"
    ],
    "websiteUrl": "https://www.adq.ae",
    "featured": false
  },
  {
    "id": "hub71-60",
    "nameAr": "Hub71",
    "nameEn": "Hub71",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Startup Ecosystem / Funding",
    "typeCategory": "investment",
    "stageAr": "Pre-Seed – Growth",
    "stages": [
      "pre_seed",
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "AI",
      "Fintech",
      "SaaS",
      "Web3"
    ],
    "websiteUrl": "https://hub71.com",
    "featured": false
  },
  {
    "id": "dubai-future-district-fund-61",
    "nameAr": "Dubai Future District Fund",
    "nameEn": "Dubai Future District Fund",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Venture Fund",
    "typeCategory": "vc",
    "stageAr": "Early – Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "AI"
    ],
    "websiteUrl": "https://dfdf.vc",
    "featured": true
  },
  {
    "id": "dubai-future-accelerators-dubai-future-foundation-62",
    "nameAr": "Dubai Future Accelerators / Dubai Future Foundation",
    "nameEn": "Dubai Future Accelerators / Dubai Future Foundation",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Government Innovation / Funding",
    "typeCategory": "gov_dev",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "AI",
      "GovTech",
      "DeepTech"
    ],
    "websiteUrl": "https://foundationventures.com",
    "featured": false
  },
  {
    "id": "flat6labs-63",
    "nameAr": "Flat6Labs",
    "nameEn": "Flat6Labs",
    "countryAr": "مصر والمنطقة",
    "countryEn": "Egypt & Region",
    "flag": "🇪🇬",
    "typeAr": "Accelerator / VC",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "SaaS",
      "Fintech"
    ],
    "websiteUrl": "https://flat6labs.com",
    "featured": false
  },
  {
    "id": "disruptech-fund-64",
    "nameAr": "DisrupTech Fund",
    "nameEn": "DisrupTech Fund",
    "countryAr": "مصر",
    "countryEn": "Egypt",
    "flag": "🇪🇬",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Fintech"
    ],
    "websiteUrl": "https://disruptechfund.com",
    "featured": false
  },
  {
    "id": "cairo-angels-65",
    "nameAr": "Cairo Angels",
    "nameEn": "Cairo Angels",
    "countryAr": "مصر",
    "countryEn": "Egypt",
    "flag": "🇪🇬",
    "typeAr": "Angel Investment Network",
    "typeCategory": "angel",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Consumer",
      "Fintech"
    ],
    "websiteUrl": "https://cairoangels.com",
    "featured": false
  },
  {
    "id": "nclude-66",
    "nameAr": "Nclude",
    "nameEn": "Nclude",
    "countryAr": "مصر",
    "countryEn": "Egypt",
    "flag": "🇪🇬",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Fintech",
      "Financial Infrastructure"
    ],
    "websiteUrl": "https://nclude.vc",
    "featured": false
  },
  {
    "id": "ui-investments-67",
    "nameAr": "UI Investments",
    "nameEn": "UI Investments",
    "countryAr": "مصر",
    "countryEn": "Egypt",
    "flag": "🇪🇬",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Fintech",
      "Technology",
      "Healthcare"
    ],
    "websiteUrl": "https://ui-investments.com",
    "featured": true
  },
  {
    "id": "endure-capital-68",
    "nameAr": "Endure Capital",
    "nameEn": "Endure Capital",
    "countryAr": "مصر والمنطقة",
    "countryEn": "Egypt & Region",
    "flag": "🇪🇬",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "SaaS"
    ],
    "websiteUrl": "https://endurecap.com",
    "featured": false
  },
  {
    "id": "flat6labs-riyadh-69",
    "nameAr": "Flat6Labs Riyadh",
    "nameEn": "Flat6Labs Riyadh",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Accelerator / VC",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "SaaS",
      "Fintech"
    ],
    "websiteUrl": "https://flat6labs.com",
    "featured": false
  },
  {
    "id": "impact46-70",
    "nameAr": "Impact46",
    "nameEn": "Impact46",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Fintech",
      "SaaS",
      "Technology"
    ],
    "websiteUrl": "https://impact46.co",
    "featured": false
  },
  {
    "id": "stv-71",
    "nameAr": "STV",
    "nameEn": "STV",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Series A – Growth",
    "stages": [
      "series_a",
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "SaaS"
    ],
    "websiteUrl": "https://stv.vc",
    "featured": false
  },
  {
    "id": "riyadh-valley-company-72",
    "nameAr": "Riyadh Valley Company",
    "nameEn": "Riyadh Valley Company",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "DeepTech",
      "Healthcare"
    ],
    "websiteUrl": "https://rvc.com.sa",
    "featured": false
  },
  {
    "id": "svc-saudi-venture-capital-73",
    "nameAr": "SVC – Saudi Venture Capital",
    "nameEn": "SVC – Saudi Venture Capital",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Government VC / Fund of Funds",
    "typeCategory": "fund_of_funds",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "SMEs"
    ],
    "websiteUrl": "https://svc.com.sa",
    "featured": true
  },
  {
    "id": "arzan-venture-capital-74",
    "nameAr": "Arzan Venture Capital",
    "nameEn": "Arzan Venture Capital",
    "countryAr": "الكويت",
    "countryEn": "Kuwait",
    "flag": "🇰🇼",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "SaaS"
    ],
    "websiteUrl": "https://arzanvc.com",
    "featured": false
  },
  {
    "id": "kisp-ventures-75",
    "nameAr": "KISP Ventures",
    "nameEn": "KISP Ventures",
    "countryAr": "الكويت",
    "countryEn": "Kuwait",
    "flag": "🇰🇼",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech"
    ],
    "websiteUrl": "https://kispventures.com",
    "featured": false
  },
  {
    "id": "faith-capital-76",
    "nameAr": "Faith Capital",
    "nameEn": "Faith Capital",
    "countryAr": "الكويت",
    "countryEn": "Kuwait",
    "flag": "🇰🇼",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Early – Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Consumer",
      "E-commerce"
    ],
    "websiteUrl": "https://www.faithcapital.com",
    "featured": false
  },
  {
    "id": "kuwait-life-sciences-company-77",
    "nameAr": "Kuwait Life Sciences Company",
    "nameEn": "Kuwait Life Sciences Company",
    "countryAr": "الكويت",
    "countryEn": "Kuwait",
    "flag": "🇰🇼",
    "typeAr": "Investment",
    "typeCategory": "investment",
    "stageAr": "Early – Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "HealthTech",
      "Healthcare"
    ],
    "websiteUrl": "https://www.klsc.com.kw",
    "featured": false
  },
  {
    "id": "ithmar-capital-78",
    "nameAr": "Ithmar Capital",
    "nameEn": "Ithmar Capital",
    "countryAr": "المغرب",
    "countryEn": "Morocco",
    "flag": "🇲🇦",
    "typeAr": "Investment / VC",
    "typeCategory": "vc",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Infrastructure",
      "SMEs"
    ],
    "websiteUrl": "https://www.ithmar.gov.ma",
    "featured": false
  },
  {
    "id": "212founders-79",
    "nameAr": "212Founders",
    "nameEn": "212Founders",
    "countryAr": "المغرب",
    "countryEn": "Morocco",
    "flag": "🇲🇦",
    "typeAr": "VC / Accelerator",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Series A",
    "stages": [
      "pre_seed",
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "SaaS",
      "Fintech",
      "AI",
      "Tech"
    ],
    "websiteUrl": "https://212founders.co",
    "featured": true
  },
  {
    "id": "cdg-invest-80",
    "nameAr": "CDG Invest",
    "nameEn": "CDG Invest",
    "countryAr": "المغرب",
    "countryEn": "Morocco",
    "flag": "🇲🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "SMEs",
      "Innovation"
    ],
    "websiteUrl": "https://www.cdg-invest.ma",
    "featured": false
  },
  {
    "id": "azur-innovation-fund-81",
    "nameAr": "Azur Innovation Fund",
    "nameEn": "Azur Innovation Fund",
    "countryAr": "المغرب",
    "countryEn": "Morocco",
    "flag": "🇲🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "Digital"
    ],
    "websiteUrl": "https://azurinnovationfund.com",
    "featured": false
  },
  {
    "id": "africinvest-82",
    "nameAr": "AfricInvest",
    "nameEn": "AfricInvest",
    "countryAr": "تونس والمنطقة",
    "countryEn": "Tunisia & Region",
    "flag": "🇹🇳",
    "typeAr": "Investment Group",
    "typeCategory": "investment",
    "stageAr": "Seed – Growth / PE",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Fintech",
      "Technology",
      "SMEs"
    ],
    "websiteUrl": "https://www.africinvest.com",
    "featured": false
  },
  {
    "id": "mediterrania-capital-partners-83",
    "nameAr": "Mediterrania Capital Partners",
    "nameEn": "Mediterrania Capital Partners",
    "countryAr": "تونس والمنطقة",
    "countryEn": "Tunisia & Region",
    "flag": "🇹🇳",
    "typeAr": "Private Equity",
    "typeCategory": "investment",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "SMEs",
      "Technology",
      "Consumer"
    ],
    "websiteUrl": "https://www.mcapitalp.com",
    "featured": false
  },
  {
    "id": "flat6labs-tunisia-84",
    "nameAr": "Flat6Labs Tunisia",
    "nameEn": "Flat6Labs Tunisia",
    "countryAr": "تونس",
    "countryEn": "Tunisia",
    "flag": "🇹🇳",
    "typeAr": "Accelerator / VC",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "SaaS",
      "Fintech"
    ],
    "websiteUrl": "https://flat6labs.com",
    "featured": false
  },
  {
    "id": "sanabil-investments-85",
    "nameAr": "Sanabil Investments",
    "nameEn": "Sanabil Investments",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Investment / VC",
    "typeCategory": "vc",
    "stageAr": "Venture – Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "SaaS"
    ],
    "websiteUrl": "https://sanabil.com",
    "featured": true
  },
  {
    "id": "jada-fund-of-funds-86",
    "nameAr": "Jada Fund of Funds",
    "nameEn": "Jada Fund of Funds",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Fund of Funds",
    "typeCategory": "fund_of_funds",
    "stageAr": "VC Funds / Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Startups",
      "SMEs"
    ],
    "websiteUrl": "https://jada.com.sa",
    "featured": false
  },
  {
    "id": "wa-ed-87",
    "nameAr": "Wa'ed",
    "nameEn": "Wa'ed",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Entrepreneurship / VC",
    "typeCategory": "vc",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Industrial",
      "Startups"
    ],
    "websiteUrl": "https://www.waed.com",
    "featured": false
  },
  {
    "id": "seedra-ventures-88",
    "nameAr": "Seedra Ventures",
    "nameEn": "Seedra Ventures",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "SaaS"
    ],
    "websiteUrl": "https://seedraventures.com",
    "featured": false
  },
  {
    "id": "b-y-venture-partners-89",
    "nameAr": "B&Y Venture Partners",
    "nameEn": "B&Y Venture Partners",
    "countryAr": "الإمارات والمنطقة",
    "countryEn": "UAE & Region",
    "flag": "🇦🇪",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Fintech",
      "SaaS",
      "Digital"
    ],
    "websiteUrl": "https://byvp.com",
    "featured": false
  },
  {
    "id": "oasis500-90",
    "nameAr": "Oasis500",
    "nameEn": "Oasis500",
    "countryAr": "الأردن",
    "countryEn": "Jordan",
    "flag": "🇯🇴",
    "typeAr": "Accelerator / VC",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Tech",
      "SaaS",
      "Fintech"
    ],
    "websiteUrl": "https://oasis500.com",
    "featured": false
  },
  {
    "id": "beyond-capital-91",
    "nameAr": "Beyond Capital",
    "nameEn": "Beyond Capital",
    "countryAr": "الأردن",
    "countryEn": "Jordan",
    "flag": "🇯🇴",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "SaaS"
    ],
    "websiteUrl": "https://beyondcapital.vc",
    "featured": true
  },
  {
    "id": "ibtikar-fund-92",
    "nameAr": "Ibtikar Fund",
    "nameEn": "Ibtikar Fund",
    "countryAr": "فلسطين",
    "countryEn": "Palestine",
    "flag": "🇵🇸",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "Software",
      "Digital"
    ],
    "websiteUrl": "https://ibtikar.fund",
    "featured": false
  },
  {
    "id": "sadara-ventures-93",
    "nameAr": "Sadara Ventures",
    "nameEn": "Sadara Ventures",
    "countryAr": "فلسطين",
    "countryEn": "Palestine",
    "flag": "🇵🇸",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "ICT",
      "Software"
    ],
    "websiteUrl": "https://sadaraventures.com",
    "featured": false
  },
  {
    "id": "impuls-international-94",
    "nameAr": "Impuls International",
    "nameEn": "Impuls International",
    "countryAr": "الكويت",
    "countryEn": "Kuwait",
    "flag": "🇰🇼",
    "typeAr": "Investment / Angel",
    "typeCategory": "angel",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://impulsinternational.com",
    "featured": false
  },
  {
    "id": "rasmal-ventures-95",
    "nameAr": "Rasmal Ventures",
    "nameEn": "Rasmal Ventures",
    "countryAr": "قطر",
    "countryEn": "Qatar",
    "flag": "🇶🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "SaaS"
    ],
    "websiteUrl": "https://rasmalventures.com",
    "featured": false
  },
  {
    "id": "doha-tech-angels-96",
    "nameAr": "Doha Tech Angels",
    "nameEn": "Doha Tech Angels",
    "countryAr": "قطر",
    "countryEn": "Qatar",
    "flag": "🇶🇦",
    "typeAr": "Angel Network",
    "typeCategory": "angel",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://dohatechangels.com",
    "featured": false
  },
  {
    "id": "qatar-development-bank-qdb-97",
    "nameAr": "Qatar Development Bank (QDB)",
    "nameEn": "Qatar Development Bank (QDB)",
    "countryAr": "قطر",
    "countryEn": "Qatar",
    "flag": "🇶🇦",
    "typeAr": "Development Bank / Funding",
    "typeCategory": "gov_dev",
    "stageAr": "Startup – SME",
    "stages": [
      "sme"
    ],
    "sectorsAr": [
      "Technology",
      "SMEs",
      "Innovation"
    ],
    "websiteUrl": "https://www.qdb.qa",
    "featured": true
  },
  {
    "id": "qatar-science-technology-park-98",
    "nameAr": "Qatar Science & Technology Park",
    "nameEn": "Qatar Science & Technology Park",
    "countryAr": "قطر",
    "countryEn": "Qatar",
    "flag": "🇶🇦",
    "typeAr": "Innovation / Funding Ecosystem",
    "typeCategory": "investment",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "DeepTech",
      "Technology",
      "Research"
    ],
    "websiteUrl": "https://qstp.org.qa",
    "featured": false
  },
  {
    "id": "startup-qatar-99",
    "nameAr": "Startup Qatar",
    "nameEn": "Startup Qatar",
    "countryAr": "قطر",
    "countryEn": "Qatar",
    "flag": "🇶🇦",
    "typeAr": "Startup Funding Ecosystem",
    "typeCategory": "investment",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Innovation"
    ],
    "websiteUrl": "https://startupqatar.qa",
    "featured": false
  },
  {
    "id": "oman-technology-fund-100",
    "nameAr": "Oman Technology Fund",
    "nameEn": "Oman Technology Fund",
    "countryAr": "عُمان",
    "countryEn": "Oman",
    "flag": "🇴🇲",
    "typeAr": "Venture Fund",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Software",
      "Startups"
    ],
    "websiteUrl": "https://otf.om",
    "featured": false
  },
  {
    "id": "phaze-ventures-101",
    "nameAr": "Phaze Ventures",
    "nameEn": "Phaze Ventures",
    "countryAr": "عُمان",
    "countryEn": "Oman",
    "flag": "🇴🇲",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "Energy",
      "Logistics"
    ],
    "websiteUrl": "https://phazeventures.com",
    "featured": false
  },
  {
    "id": "jasoor-ventures-102",
    "nameAr": "Jasoor Ventures",
    "nameEn": "Jasoor Ventures",
    "countryAr": "عُمان",
    "countryEn": "Oman",
    "flag": "🇴🇲",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://jasoor.vc",
    "featured": false
  },
  {
    "id": "oman-investment-authority-future-fund-oman-103",
    "nameAr": "Oman Investment Authority – Future Fund Oman",
    "nameEn": "Oman Investment Authority – Future Fund Oman",
    "countryAr": "عُمان",
    "countryEn": "Oman",
    "flag": "🇴🇲",
    "typeAr": "Government Investment / Fund",
    "typeCategory": "gov_dev",
    "stageAr": "Startup – Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "SMEs",
      "Innovation"
    ],
    "websiteUrl": "https://oia.gov.om",
    "featured": true
  },
  {
    "id": "al-madina-investment-104",
    "nameAr": "Al Madina Investment",
    "nameEn": "Al Madina Investment",
    "countryAr": "عُمان",
    "countryEn": "Oman",
    "flag": "🇴🇲",
    "typeAr": "Investment",
    "typeCategory": "investment",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "SMEs",
      "Technology",
      "Consumer"
    ],
    "websiteUrl": "https://almadinainvestment.com",
    "featured": false
  },
  {
    "id": "bahrain-development-bank-105",
    "nameAr": "Bahrain Development Bank",
    "nameEn": "Bahrain Development Bank",
    "countryAr": "البحرين",
    "countryEn": "Bahrain",
    "flag": "🇧🇭",
    "typeAr": "Development Bank",
    "typeCategory": "gov_dev",
    "stageAr": "Startup – SME",
    "stages": [
      "sme"
    ],
    "sectorsAr": [
      "SMEs",
      "Innovation",
      "Technology"
    ],
    "websiteUrl": "https://www.bdb-bh.com",
    "featured": false
  },
  {
    "id": "bahrain-economic-development-board-startup-bahrain-106",
    "nameAr": "Bahrain Economic Development Board – StartUp Bahrain",
    "nameEn": "Bahrain Economic Development Board – StartUp Bahrain",
    "countryAr": "البحرين",
    "countryEn": "Bahrain",
    "flag": "🇧🇭",
    "typeAr": "Government Startup Ecosystem",
    "typeCategory": "gov_dev",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://startupbahrain.com",
    "featured": false
  },
  {
    "id": "algebra-ventures-ii-107",
    "nameAr": "Algebra Ventures II",
    "nameEn": "Algebra Ventures II",
    "countryAr": "مصر",
    "countryEn": "Egypt",
    "flag": "🇪🇬",
    "typeAr": "Venture Capital Fund",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Fintech",
      "SaaS",
      "Enterprise"
    ],
    "websiteUrl": "https://algebraventures.com",
    "featured": false
  },
  {
    "id": "cairo-angels-syndicate-fund-108",
    "nameAr": "Cairo Angels Syndicate Fund",
    "nameEn": "Cairo Angels Syndicate Fund",
    "countryAr": "مصر",
    "countryEn": "Egypt",
    "flag": "🇪🇬",
    "typeAr": "Angel / Venture Fund",
    "typeCategory": "angel",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Consumer"
    ],
    "websiteUrl": "https://cairoangels.com",
    "featured": false
  },
  {
    "id": "falak-startups-109",
    "nameAr": "Falak Startups",
    "nameEn": "Falak Startups",
    "countryAr": "مصر",
    "countryEn": "Egypt",
    "flag": "🇪🇬",
    "typeAr": "Accelerator / Investment",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Fintech",
      "SaaS",
      "Technology"
    ],
    "websiteUrl": "https://falakstartups.com.eg",
    "featured": true
  },
  {
    "id": "auc-venture-lab-110",
    "nameAr": "AUC Venture Lab",
    "nameEn": "AUC Venture Lab",
    "countryAr": "مصر",
    "countryEn": "Egypt",
    "flag": "🇪🇬",
    "typeAr": "Accelerator / Investment Ecosystem",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "Innovation"
    ],
    "websiteUrl": "https://business.aucegypt.edu/venture-lab",
    "featured": false
  },
  {
    "id": "500-global-mena-111",
    "nameAr": "500 Global – MENA",
    "nameEn": "500 Global – MENA",
    "countryAr": "المنطقة (MENA)",
    "countryEn": "MENA Region",
    "flag": "🌐",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Pre-Seed – Series A",
    "stages": [
      "pre_seed",
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "SaaS",
      "Fintech"
    ],
    "websiteUrl": "https://500.co",
    "featured": false
  },
  {
    "id": "antler-mena-112",
    "nameAr": "Antler MENA",
    "nameEn": "Antler MENA",
    "countryAr": "المنطقة (MENA)",
    "countryEn": "MENA Region",
    "flag": "🌐",
    "typeAr": "VC / Startup Builder",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "SaaS",
      "AI"
    ],
    "websiteUrl": "https://www.antler.co",
    "featured": false
  },
  {
    "id": "endeavor-catalyst-113",
    "nameAr": "Endeavor Catalyst",
    "nameEn": "Endeavor Catalyst",
    "countryAr": "المنطقة (MENA)",
    "countryEn": "MENA Region",
    "flag": "🌐",
    "typeAr": "Venture Fund",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "High-Growth Technology"
    ],
    "websiteUrl": "https://endeavor.org/catalyst",
    "featured": false
  },
  {
    "id": "cedar-mundi-ventures-114",
    "nameAr": "Cedar Mundi Ventures",
    "nameEn": "Cedar Mundi Ventures",
    "countryAr": "لبنان",
    "countryEn": "Lebanon",
    "flag": "🇱🇧",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "Digital",
      "Consumer"
    ],
    "websiteUrl": "https://cedarmundiventures.com",
    "featured": false
  },
  {
    "id": "im-capital-115",
    "nameAr": "IM Capital",
    "nameEn": "IM Capital",
    "countryAr": "لبنان",
    "countryEn": "Lebanon",
    "flag": "🇱🇧",
    "typeAr": "Venture Capital / Fund",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "SMEs",
      "Startups"
    ],
    "websiteUrl": "https://im-capital.com",
    "featured": true
  },
  {
    "id": "b-y-venture-partners-lebanon-116",
    "nameAr": "B&Y Venture Partners – Lebanon",
    "nameEn": "B&Y Venture Partners – Lebanon",
    "countryAr": "لبنان والمنطقة",
    "countryEn": "Lebanon & Region",
    "flag": "🇱🇧",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Fintech",
      "SaaS",
      "Technology"
    ],
    "websiteUrl": "https://byvp.com",
    "featured": false
  },
  {
    "id": "phoenician-funds-117",
    "nameAr": "Phoenician Funds",
    "nameEn": "Phoenician Funds",
    "countryAr": "لبنان",
    "countryEn": "Lebanon",
    "flag": "🇱🇧",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Digital"
    ],
    "websiteUrl": "https://phoenicianfunds.com",
    "featured": false
  },
  {
    "id": "flat6labs-beirut-118",
    "nameAr": "Flat6Labs Beirut",
    "nameEn": "Flat6Labs Beirut",
    "countryAr": "لبنان",
    "countryEn": "Lebanon",
    "flag": "🇱🇧",
    "typeAr": "Accelerator / VC",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "SaaS",
      "Fintech"
    ],
    "websiteUrl": "https://flat6labs.com",
    "featured": false
  },
  {
    "id": "middle-east-venture-partners-lebanon-119",
    "nameAr": "Middle East Venture Partners – Lebanon",
    "nameEn": "Middle East Venture Partners – Lebanon",
    "countryAr": "لبنان والمنطقة",
    "countryEn": "Lebanon & Region",
    "flag": "🇱🇧",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech"
    ],
    "websiteUrl": "https://mevp.com",
    "featured": false
  },
  {
    "id": "b-y-venture-partners-jordan-120",
    "nameAr": "B&Y Venture Partners – Jordan",
    "nameEn": "B&Y Venture Partners – Jordan",
    "countryAr": "الأردن والمنطقة",
    "countryEn": "Jordan & Region",
    "flag": "🇯🇴",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech"
    ],
    "websiteUrl": "https://byvp.com",
    "featured": false
  },
  {
    "id": "zinc-zain-innovation-campus-121",
    "nameAr": "ZINC – Zain Innovation Campus",
    "nameEn": "ZINC – Zain Innovation Campus",
    "countryAr": "الأردن",
    "countryEn": "Jordan",
    "flag": "🇯🇴",
    "typeAr": "Startup / Investment Ecosystem",
    "typeCategory": "investment",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Digital"
    ],
    "websiteUrl": "https://zinc.jo",
    "featured": true
  },
  {
    "id": "issf-innovative-startups-and-smes-fund-122",
    "nameAr": "ISSF – Innovative Startups and SMEs Fund",
    "nameEn": "ISSF – Innovative Startups and SMEs Fund",
    "countryAr": "الأردن",
    "countryEn": "Jordan",
    "flag": "🇯🇴",
    "typeAr": "Government / Fund",
    "typeCategory": "gov_dev",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "SMEs"
    ],
    "websiteUrl": "https://issfjo.com",
    "featured": false
  },
  {
    "id": "jordan-enterprise-development-corporation-jedco-123",
    "nameAr": "Jordan Enterprise Development Corporation – JEDCO",
    "nameEn": "Jordan Enterprise Development Corporation – JEDCO",
    "countryAr": "الأردن",
    "countryEn": "Jordan",
    "flag": "🇯🇴",
    "typeAr": "Government Funding",
    "typeCategory": "gov_dev",
    "stageAr": "Startup – SME",
    "stages": [
      "sme"
    ],
    "sectorsAr": [
      "SMEs",
      "Innovation"
    ],
    "websiteUrl": "https://jedco.gov.jo",
    "featured": false
  },
  {
    "id": "flat6labs-amman-124",
    "nameAr": "Flat6Labs Amman",
    "nameEn": "Flat6Labs Amman",
    "countryAr": "الأردن",
    "countryEn": "Jordan",
    "flag": "🇯🇴",
    "typeAr": "Accelerator / VC",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "SaaS",
      "Fintech"
    ],
    "websiteUrl": "https://flat6labs.com",
    "featured": false
  },
  {
    "id": "oasis500-fund-125",
    "nameAr": "Oasis500 Fund",
    "nameEn": "Oasis500 Fund",
    "countryAr": "الأردن",
    "countryEn": "Jordan",
    "flag": "🇯🇴",
    "typeAr": "Venture Fund",
    "typeCategory": "vc",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Digital"
    ],
    "websiteUrl": "https://oasis500.com",
    "featured": false
  },
  {
    "id": "216-capital-126",
    "nameAr": "216 Capital",
    "nameEn": "216 Capital",
    "countryAr": "تونس",
    "countryEn": "Tunisia",
    "flag": "🇹🇳",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "SaaS",
      "Fintech"
    ],
    "websiteUrl": "https://216capital.com",
    "featured": false
  },
  {
    "id": "capsa-capital-partners-127",
    "nameAr": "Capsa Capital Partners",
    "nameEn": "Capsa Capital Partners",
    "countryAr": "تونس",
    "countryEn": "Tunisia",
    "flag": "🇹🇳",
    "typeAr": "Investment / VC",
    "typeCategory": "vc",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "SMEs"
    ],
    "websiteUrl": "https://capsacapital.com",
    "featured": true
  },
  {
    "id": "flat6labs-tunis-128",
    "nameAr": "Flat6Labs Tunis",
    "nameEn": "Flat6Labs Tunis",
    "countryAr": "تونس",
    "countryEn": "Tunisia",
    "flag": "🇹🇳",
    "typeAr": "Accelerator / VC",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "SaaS",
      "Fintech"
    ],
    "websiteUrl": "https://flat6labs.com",
    "featured": false
  },
  {
    "id": "smart-capital-129",
    "nameAr": "Smart Capital",
    "nameEn": "Smart Capital",
    "countryAr": "تونس",
    "countryEn": "Tunisia",
    "flag": "🇹🇳",
    "typeAr": "Government Startup Fund / Ecosystem",
    "typeCategory": "gov_dev",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Innovation"
    ],
    "websiteUrl": "https://smartcapital.tn",
    "featured": false
  },
  {
    "id": "startup-tunisia-130",
    "nameAr": "Startup Tunisia",
    "nameEn": "Startup Tunisia",
    "countryAr": "تونس",
    "countryEn": "Tunisia",
    "flag": "🇹🇳",
    "typeAr": "Government Startup Ecosystem",
    "typeCategory": "gov_dev",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Innovation"
    ],
    "websiteUrl": "https://startup.gov.tn",
    "featured": false
  },
  {
    "id": "um6p-ventures-131",
    "nameAr": "UM6P Ventures",
    "nameEn": "UM6P Ventures",
    "countryAr": "المغرب",
    "countryEn": "Morocco",
    "flag": "🇲🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "DeepTech",
      "AI",
      "AgriTech"
    ],
    "websiteUrl": "https://um6pventures.com",
    "featured": false
  },
  {
    "id": "algeria-venture-132",
    "nameAr": "Algeria Venture",
    "nameEn": "Algeria Venture",
    "countryAr": "الجزائر",
    "countryEn": "Algeria",
    "flag": "🇩🇿",
    "typeAr": "Government Accelerator / Investment Ecosystem",
    "typeCategory": "accelerator",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups",
      "Innovation"
    ],
    "websiteUrl": "https://algeriaventure.dz",
    "featured": false
  },
  {
    "id": "flat6labs-algeria-133",
    "nameAr": "Flat6Labs Algeria",
    "nameEn": "Flat6Labs Algeria",
    "countryAr": "الجزائر",
    "countryEn": "Algeria",
    "flag": "🇩🇿",
    "typeAr": "Accelerator / VC",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "SaaS",
      "Fintech"
    ],
    "websiteUrl": "https://flat6labs.com",
    "featured": true
  },
  {
    "id": "mena-fund-134",
    "nameAr": "MENA Fund",
    "nameEn": "MENA Fund",
    "countryAr": "الجزائر والمنطقة",
    "countryEn": "Algeria & Region",
    "flag": "🇩🇿",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Digital"
    ],
    "websiteUrl": "https://menafund.com",
    "featured": false
  },
  {
    "id": "asf-algerian-startup-fund-135",
    "nameAr": "ASF – Algerian Startup Fund",
    "nameEn": "ASF – Algerian Startup Fund",
    "countryAr": "الجزائر",
    "countryEn": "Algeria",
    "flag": "🇩🇿",
    "typeAr": "Government Venture Fund",
    "typeCategory": "gov_dev",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Startups",
      "Technology"
    ],
    "websiteUrl": "https://asf.dz",
    "featured": false
  },
  {
    "id": "anpt-national-agency-for-promotion-of-technology-parks-136",
    "nameAr": "ANPT – National Agency for Promotion of Technology Parks",
    "nameEn": "ANPT – National Agency for Promotion of Technology Parks",
    "countryAr": "الجزائر",
    "countryEn": "Algeria",
    "flag": "🇩🇿",
    "typeAr": "Government / Innovation Funding",
    "typeCategory": "gov_dev",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "ICT"
    ],
    "websiteUrl": "https://www.anpt.dz",
    "featured": false
  },
  {
    "id": "algerian-business-angels-network-137",
    "nameAr": "Algerian Business Angels Network",
    "nameEn": "Algerian Business Angels Network",
    "countryAr": "الجزائر",
    "countryEn": "Algeria",
    "flag": "🇩🇿",
    "typeAr": "Angel Network",
    "typeCategory": "angel",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "SMEs"
    ],
    "websiteUrl": "https://aban.dz",
    "featured": false
  },
  {
    "id": "morocco-venture-capital-138",
    "nameAr": "Morocco Venture Capital",
    "nameEn": "Morocco Venture Capital",
    "countryAr": "المغرب",
    "countryEn": "Morocco",
    "flag": "🇲🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "SMEs"
    ],
    "websiteUrl": "https://moroccoventurecapital.com",
    "featured": false
  },
  {
    "id": "cdg-invest-g-n-ration-entrepreneurs-139",
    "nameAr": "CDG Invest – Génération Entrepreneurs",
    "nameEn": "CDG Invest – Génération Entrepreneurs",
    "countryAr": "المغرب",
    "countryEn": "Morocco",
    "flag": "🇲🇦",
    "typeAr": "Venture / Startup Program",
    "typeCategory": "vc",
    "stageAr": "Seed",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://www.cdg-invest.ma",
    "featured": true
  },
  {
    "id": "maroc-numeric-fund-140",
    "nameAr": "Maroc Numeric Fund",
    "nameEn": "Maroc Numeric Fund",
    "countryAr": "المغرب",
    "countryEn": "Morocco",
    "flag": "🇲🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "Digital"
    ],
    "websiteUrl": "https://www.marocnumericfund.ma",
    "featured": false
  },
  {
    "id": "mnf-club-141",
    "nameAr": "MNF Club",
    "nameEn": "MNF Club",
    "countryAr": "المغرب",
    "countryEn": "Morocco",
    "flag": "🇲🇦",
    "typeAr": "Angel / Investment Network",
    "typeCategory": "angel",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://mnfclub.ma",
    "featured": false
  },
  {
    "id": "212-founders-fund-142",
    "nameAr": "212 Founders Fund",
    "nameEn": "212 Founders Fund",
    "countryAr": "المغرب",
    "countryEn": "Morocco",
    "flag": "🇲🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "SaaS",
      "Fintech",
      "AI"
    ],
    "websiteUrl": "https://212founders.co",
    "featured": false
  },
  {
    "id": "afrimobility-143",
    "nameAr": "Afrimobility",
    "nameEn": "Afrimobility",
    "countryAr": "المغرب",
    "countryEn": "Morocco",
    "flag": "🇲🇦",
    "typeAr": "Venture / Investment",
    "typeCategory": "vc",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Mobility",
      "Technology"
    ],
    "websiteUrl": "https://afrimobility.com",
    "featured": false
  },
  {
    "id": "flat6labs-tunis-fund-144",
    "nameAr": "Flat6Labs Tunis Fund",
    "nameEn": "Flat6Labs Tunis Fund",
    "countryAr": "تونس",
    "countryEn": "Tunisia",
    "flag": "🇹🇳",
    "typeAr": "Accelerator / VC",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "SaaS"
    ],
    "websiteUrl": "https://flat6labs.com",
    "featured": false
  },
  {
    "id": "carthage-business-angels-145",
    "nameAr": "Carthage Business Angels",
    "nameEn": "Carthage Business Angels",
    "countryAr": "تونس",
    "countryEn": "Tunisia",
    "flag": "🇹🇳",
    "typeAr": "Angel Network",
    "typeCategory": "angel",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://carthagebusinessangels.com",
    "featured": true
  },
  {
    "id": "tunisia-investment-authority-146",
    "nameAr": "Tunisia Investment Authority",
    "nameEn": "Tunisia Investment Authority",
    "countryAr": "تونس",
    "countryEn": "Tunisia",
    "flag": "🇹🇳",
    "typeAr": "Government Investment Ecosystem",
    "typeCategory": "gov_dev",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Startups",
      "SMEs",
      "Technology"
    ],
    "websiteUrl": "https://tia.gov.tn",
    "featured": false
  },
  {
    "id": "smart-capital-startup-act-ecosystem-147",
    "nameAr": "Smart Capital – Startup Act Ecosystem",
    "nameEn": "Smart Capital – Startup Act Ecosystem",
    "countryAr": "تونس",
    "countryEn": "Tunisia",
    "flag": "🇹🇳",
    "typeAr": "Government Startup Fund",
    "typeCategory": "gov_dev",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Innovation"
    ],
    "websiteUrl": "https://smartcapital.tn",
    "featured": false
  },
  {
    "id": "216-capital-fund-148",
    "nameAr": "216 Capital Fund",
    "nameEn": "216 Capital Fund",
    "countryAr": "تونس",
    "countryEn": "Tunisia",
    "flag": "🇹🇳",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "SaaS"
    ],
    "websiteUrl": "https://216capital.com",
    "featured": false
  },
  {
    "id": "carthage-innovation-fund-149",
    "nameAr": "Carthage Innovation Fund",
    "nameEn": "Carthage Innovation Fund",
    "countryAr": "تونس",
    "countryEn": "Tunisia",
    "flag": "🇹🇳",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Innovation"
    ],
    "websiteUrl": "https://cif.tn",
    "featured": false
  },
  {
    "id": "flat6labs-iraq-150",
    "nameAr": "Flat6Labs Iraq",
    "nameEn": "Flat6Labs Iraq",
    "countryAr": "العراق",
    "countryEn": "Iraq",
    "flag": "🇮🇶",
    "typeAr": "Accelerator / VC",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://flat6labs.com",
    "featured": false
  },
  {
    "id": "iraq-venture-partners-151",
    "nameAr": "Iraq Venture Partners",
    "nameEn": "Iraq Venture Partners",
    "countryAr": "العراق",
    "countryEn": "Iraq",
    "flag": "🇮🇶",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Technology",
      "SMEs"
    ],
    "websiteUrl": "https://iraqventurepartners.com",
    "featured": true
  },
  {
    "id": "kapita-152",
    "nameAr": "Kapita",
    "nameEn": "Kapita",
    "countryAr": "العراق",
    "countryEn": "Iraq",
    "flag": "🇮🇶",
    "typeAr": "Venture Capital / Ecosystem",
    "typeCategory": "vc",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech"
    ],
    "websiteUrl": "https://kapita.iq",
    "featured": false
  },
  {
    "id": "iraq-angel-investors-network-153",
    "nameAr": "Iraq Angel Investors Network",
    "nameEn": "Iraq Angel Investors Network",
    "countryAr": "العراق",
    "countryEn": "Iraq",
    "flag": "🇮🇶",
    "typeAr": "Angel Network",
    "typeCategory": "angel",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://iaian.org",
    "featured": false
  },
  {
    "id": "seed-iraq-154",
    "nameAr": "SEED Iraq",
    "nameEn": "SEED Iraq",
    "countryAr": "العراق",
    "countryEn": "Iraq",
    "flag": "🇮🇶",
    "typeAr": "Startup / Investment Ecosystem",
    "typeCategory": "investment",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "SMEs"
    ],
    "websiteUrl": "https://seediraq.org",
    "featured": false
  },
  {
    "id": "flat6labs-sudan-155",
    "nameAr": "Flat6Labs Sudan",
    "nameEn": "Flat6Labs Sudan",
    "countryAr": "السودان",
    "countryEn": "Sudan",
    "flag": "🇸🇩",
    "typeAr": "Accelerator / VC",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://flat6labs.com",
    "featured": false
  },
  {
    "id": "savanna-fund-156",
    "nameAr": "Savanna Fund",
    "nameEn": "Savanna Fund",
    "countryAr": "السودان وأفريقيا",
    "countryEn": "Sudan & Africa",
    "flag": "🇸🇩",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "SMEs"
    ],
    "websiteUrl": "https://savannafund.com",
    "featured": false
  },
  {
    "id": "africa-renaissance-fund-157",
    "nameAr": "Africa Renaissance Fund",
    "nameEn": "Africa Renaissance Fund",
    "countryAr": "السودان وأفريقيا",
    "countryEn": "Sudan & Africa",
    "flag": "🇸🇩",
    "typeAr": "Investment Fund",
    "typeCategory": "investment",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "SMEs",
      "Technology"
    ],
    "websiteUrl": "https://africarenfund.com",
    "featured": true
  },
  {
    "id": "flat6labs-yemen-158",
    "nameAr": "Flat6Labs Yemen",
    "nameEn": "Flat6Labs Yemen",
    "countryAr": "اليمن",
    "countryEn": "Yemen",
    "flag": "🇾🇪",
    "typeAr": "Accelerator / Startup Funding",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://flat6labs.com",
    "featured": false
  },
  {
    "id": "shabaka-ventures-159",
    "nameAr": "Shabaka Ventures",
    "nameEn": "Shabaka Ventures",
    "countryAr": "اليمن والمنطقة",
    "countryEn": "Yemen & Region",
    "flag": "🇾🇪",
    "typeAr": "Venture / Angel",
    "typeCategory": "angel",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Digital"
    ],
    "websiteUrl": "https://shabakaventures.com",
    "featured": false
  },
  {
    "id": "mena-business-angels-network-mban-160",
    "nameAr": "MENA Business Angels Network (MBAN)",
    "nameEn": "MENA Business Angels Network (MBAN)",
    "countryAr": "المنطقة (MENA)",
    "countryEn": "MENA Region",
    "flag": "🌐",
    "typeAr": "Angel Network",
    "typeCategory": "angel",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://menafund.com",
    "featured": false
  },
  {
    "id": "mena-angel-investors-161",
    "nameAr": "MENA Angel Investors",
    "nameEn": "MENA Angel Investors",
    "countryAr": "المنطقة (MENA)",
    "countryEn": "MENA Region",
    "flag": "🌐",
    "typeAr": "Angel Network",
    "typeCategory": "angel",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "SaaS",
      "Fintech"
    ],
    "websiteUrl": "https://menafund.com",
    "featured": false
  },
  {
    "id": "arab-angel-fund-162",
    "nameAr": "Arab Angel Fund",
    "nameEn": "Arab Angel Fund",
    "countryAr": "المنطقة (MENA)",
    "countryEn": "MENA Region",
    "flag": "🌐",
    "typeAr": "Angel / Venture Fund",
    "typeCategory": "angel",
    "stageAr": "Seed",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://arabangelfund.com",
    "featured": false
  },
  {
    "id": "seedstars-mena-163",
    "nameAr": "Seedstars MENA",
    "nameEn": "Seedstars MENA",
    "countryAr": "المنطقة (MENA)",
    "countryEn": "MENA Region",
    "flag": "🌐",
    "typeAr": "Accelerator / Investment",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "SaaS"
    ],
    "websiteUrl": "https://menafund.com",
    "featured": true
  },
  {
    "id": "techstars-mena-164",
    "nameAr": "Techstars MENA",
    "nameEn": "Techstars MENA",
    "countryAr": "المنطقة (MENA)",
    "countryEn": "MENA Region",
    "flag": "🌐",
    "typeAr": "Accelerator / Investment",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://menafund.com",
    "featured": false
  },
  {
    "id": "plug-and-play-mena-165",
    "nameAr": "Plug and Play MENA",
    "nameEn": "Plug and Play MENA",
    "countryAr": "المنطقة (MENA)",
    "countryEn": "MENA Region",
    "flag": "🌐",
    "typeAr": "Accelerator / Corporate VC",
    "typeCategory": "cvc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Fintech",
      "AI",
      "Enterprise"
    ],
    "websiteUrl": "https://menafund.com",
    "featured": false
  },
  {
    "id": "endeavor-mena-166",
    "nameAr": "Endeavor MENA",
    "nameEn": "Endeavor MENA",
    "countryAr": "المنطقة (MENA)",
    "countryEn": "MENA Region",
    "flag": "🌐",
    "typeAr": "Entrepreneur / Investment Ecosystem",
    "typeCategory": "investment",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "High-Growth Technology"
    ],
    "websiteUrl": "https://menafund.com",
    "featured": false
  },
  {
    "id": "flat6labs-saudi-seed-fund-167",
    "nameAr": "Flat6Labs Saudi Seed Fund",
    "nameEn": "Flat6Labs Saudi Seed Fund",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture / Accelerator",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "SaaS",
      "Fintech"
    ],
    "websiteUrl": "https://flat6labs.com",
    "featured": false
  },
  {
    "id": "merak-capital-fund-ii-168",
    "nameAr": "Merak Capital Fund II",
    "nameEn": "Merak Capital Fund II",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Digital"
    ],
    "websiteUrl": "https://merakcapital.com",
    "featured": false
  },
  {
    "id": "impact46-fund-ii-169",
    "nameAr": "Impact46 Fund II",
    "nameEn": "Impact46 Fund II",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Venture Capital",
    "typeCategory": "vc",
    "stageAr": "Seed – Series A",
    "stages": [
      "seed",
      "series_a"
    ],
    "sectorsAr": [
      "Fintech",
      "SaaS",
      "Technology"
    ],
    "websiteUrl": "https://impact46.co",
    "featured": true
  },
  {
    "id": "svc-fund-of-funds-170",
    "nameAr": "SVC Fund of Funds",
    "nameEn": "SVC Fund of Funds",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Fund of Funds",
    "typeCategory": "fund_of_funds",
    "stageAr": "VC Funds",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Startup Ecosystem"
    ],
    "websiteUrl": "https://svc.com.sa",
    "featured": false
  },
  {
    "id": "monshaat-funding-programs-171",
    "nameAr": "Monshaat Funding Programs",
    "nameEn": "Monshaat Funding Programs",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Government Financing",
    "typeCategory": "gov_dev",
    "stageAr": "Startup – SME",
    "stages": [
      "sme"
    ],
    "sectorsAr": [
      "SMEs",
      "Technology"
    ],
    "websiteUrl": "https://monshaat.gov.sa",
    "featured": false
  },
  {
    "id": "kafalah-172",
    "nameAr": "Kafalah",
    "nameEn": "Kafalah",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Government Credit Guarantee",
    "typeCategory": "gov_dev",
    "stageAr": "Startup – SME",
    "stages": [
      "sme"
    ],
    "sectorsAr": [
      "SMEs",
      "Technology"
    ],
    "websiteUrl": "https://www.kafalah.gov.sa",
    "featured": false
  },
  {
    "id": "saudi-industrial-development-fund-sidf-173",
    "nameAr": "Saudi Industrial Development Fund – SIDF",
    "nameEn": "Saudi Industrial Development Fund – SIDF",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Development Fund",
    "typeCategory": "gov_dev",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Industrial",
      "Technology"
    ],
    "websiteUrl": "https://www.sidf.gov.sa",
    "featured": false
  },
  {
    "id": "aramco-ventures-174",
    "nameAr": "Aramco Ventures",
    "nameEn": "Aramco Ventures",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Corporate Venture Capital",
    "typeCategory": "cvc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Energy",
      "ClimateTech",
      "IndustrialTech"
    ],
    "websiteUrl": "https://aramcoventures.com",
    "featured": false
  },
  {
    "id": "wa-ed-entrepreneurship-center-175",
    "nameAr": "Wa'ed Entrepreneurship Center",
    "nameEn": "Wa'ed Entrepreneurship Center",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Corporate Startup Ecosystem",
    "typeCategory": "cvc",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Industrial",
      "Energy"
    ],
    "websiteUrl": "https://www.waed.com",
    "featured": true
  },
  {
    "id": "stc-ventures-176",
    "nameAr": "STC Ventures",
    "nameEn": "STC Ventures",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Corporate Venture Capital",
    "typeCategory": "cvc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Telecom",
      "SaaS",
      "Fintech",
      "Digital"
    ],
    "websiteUrl": "https://www.stc.com.sa",
    "featured": false
  },
  {
    "id": "sabic-ventures-177",
    "nameAr": "SABIC Ventures",
    "nameEn": "SABIC Ventures",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Corporate Venture Capital",
    "typeCategory": "cvc",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "IndustrialTech",
      "Materials",
      "Sustainability"
    ],
    "websiteUrl": "https://www.sabic.com",
    "featured": false
  },
  {
    "id": "neom-investment-fund-178",
    "nameAr": "NEOM Investment Fund",
    "nameEn": "NEOM Investment Fund",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Corporate / Government Investment Fund",
    "typeCategory": "cvc",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "AI",
      "Robotics",
      "Mobility",
      "ClimateTech"
    ],
    "websiteUrl": "https://www.neom.com",
    "featured": false
  },
  {
    "id": "al-rajhi-partners-179",
    "nameAr": "Al Rajhi Partners",
    "nameEn": "Al Rajhi Partners",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Investment / Venture",
    "typeCategory": "vc",
    "stageAr": "Early – Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Fintech",
      "Financial Services"
    ],
    "websiteUrl": "https://www.alrajhi.com",
    "featured": false
  },
  {
    "id": "misk-accelerator-fund-180",
    "nameAr": "Misk Accelerator Fund",
    "nameEn": "Misk Accelerator Fund",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "Accelerator / Funding",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Innovation"
    ],
    "websiteUrl": "https://misk.org.sa",
    "featured": false
  },
  {
    "id": "kaust-innovation-fund-181",
    "nameAr": "KAUST Innovation Fund",
    "nameEn": "KAUST Innovation Fund",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "DeepTech Venture Fund",
    "typeCategory": "vc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "AI",
      "DeepTech",
      "Biotech"
    ],
    "websiteUrl": "https://innovation.kaust.edu.sa",
    "featured": true
  },
  {
    "id": "kaust-entrepreneurship-ventures-182",
    "nameAr": "KAUST Entrepreneurship Ventures",
    "nameEn": "KAUST Entrepreneurship Ventures",
    "countryAr": "السعودية",
    "countryEn": "Saudi Arabia",
    "flag": "🇸🇦",
    "typeAr": "University Venture Ecosystem",
    "typeCategory": "vc",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "DeepTech",
      "AI",
      "ClimateTech"
    ],
    "websiteUrl": "https://innovation.kaust.edu.sa",
    "featured": false
  },
  {
    "id": "emirates-nbd-innovation-fund-183",
    "nameAr": "Emirates NBD Innovation Fund",
    "nameEn": "Emirates NBD Innovation Fund",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Corporate Innovation / Investment",
    "typeCategory": "cvc",
    "stageAr": "Early – Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Fintech",
      "BankingTech"
    ],
    "websiteUrl": "https://www.emiratesnbd.com",
    "featured": false
  },
  {
    "id": "mashreq-ventures-184",
    "nameAr": "Mashreq Ventures",
    "nameEn": "Mashreq Ventures",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Corporate Venture",
    "typeCategory": "cvc",
    "stageAr": "Early – Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Fintech",
      "SaaS"
    ],
    "websiteUrl": "https://www.mashreq.com",
    "featured": false
  },
  {
    "id": "fab-ventures-185",
    "nameAr": "FAB Ventures",
    "nameEn": "FAB Ventures",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Corporate Venture Capital",
    "typeCategory": "cvc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Fintech",
      "BankingTech"
    ],
    "websiteUrl": "https://www.bankfab.com",
    "featured": false
  },
  {
    "id": "adnoc-ventures-186",
    "nameAr": "ADNOC Ventures",
    "nameEn": "ADNOC Ventures",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Corporate Venture Capital",
    "typeCategory": "cvc",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "EnergyTech",
      "ClimateTech",
      "IndustrialTech"
    ],
    "websiteUrl": "https://www.adnoc.ae",
    "featured": false
  },
  {
    "id": "etisalat-by-e-ventures-187",
    "nameAr": "Etisalat by e& Ventures",
    "nameEn": "Etisalat by e& Ventures",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Corporate Venture Capital",
    "typeCategory": "cvc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "Telecom",
      "SaaS",
      "AI",
      "Digital"
    ],
    "websiteUrl": "https://www.eand.com",
    "featured": true
  },
  {
    "id": "e-capital-188",
    "nameAr": "e& Capital",
    "nameEn": "e& Capital",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Corporate Venture Capital",
    "typeCategory": "cvc",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "Fintech",
      "Digital"
    ],
    "websiteUrl": "https://www.eand.com",
    "featured": false
  },
  {
    "id": "adnoc-digital-ventures-189",
    "nameAr": "ADNOC Digital Ventures",
    "nameEn": "ADNOC Digital Ventures",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Corporate Investment",
    "typeCategory": "cvc",
    "stageAr": "Early – Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "AI",
      "EnergyTech",
      "IndustrialTech"
    ],
    "websiteUrl": "https://www.adnoc.ae",
    "featured": false
  },
  {
    "id": "emirates-post-group-ventures-190",
    "nameAr": "Emirates Post Group Ventures",
    "nameEn": "Emirates Post Group Ventures",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Corporate Investment / Innovation",
    "typeCategory": "cvc",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "LogisticsTech",
      "E-commerce"
    ],
    "websiteUrl": "https://www.emiratespost.ae",
    "featured": false
  },
  {
    "id": "dp-world-ventures-191",
    "nameAr": "DP World Ventures",
    "nameEn": "DP World Ventures",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Corporate Venture Capital",
    "typeCategory": "cvc",
    "stageAr": "Seed – Growth",
    "stages": [
      "seed",
      "growth"
    ],
    "sectorsAr": [
      "LogisticsTech",
      "Supply Chain",
      "TradeTech"
    ],
    "websiteUrl": "https://www.dpworld.com",
    "featured": false
  },
  {
    "id": "majid-al-futtaim-ventures-192",
    "nameAr": "Majid Al Futtaim Ventures",
    "nameEn": "Majid Al Futtaim Ventures",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Corporate Venture / Innovation",
    "typeCategory": "cvc",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "RetailTech",
      "ConsumerTech",
      "PropTech"
    ],
    "websiteUrl": "https://www.majidalfuttaim.com",
    "featured": false
  },
  {
    "id": "al-futtaim-ventures-193",
    "nameAr": "Al-Futtaim Ventures",
    "nameEn": "Al-Futtaim Ventures",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Corporate Investment",
    "typeCategory": "cvc",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Mobility",
      "RetailTech",
      "Technology"
    ],
    "websiteUrl": "https://www.alfuttaim.com",
    "featured": true
  },
  {
    "id": "emaar-ventures-194",
    "nameAr": "Emaar Ventures",
    "nameEn": "Emaar Ventures",
    "countryAr": "الإمارات",
    "countryEn": "UAE",
    "flag": "🇦🇪",
    "typeAr": "Corporate Venture",
    "typeCategory": "cvc",
    "stageAr": "Growth",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "PropTech",
      "Consumer",
      "Technology"
    ],
    "websiteUrl": "https://www.emaar.com",
    "featured": false
  },
  {
    "id": "qatar-investment-authority-tech-investments-195",
    "nameAr": "Qatar Investment Authority – Tech Investments",
    "nameEn": "Qatar Investment Authority – Tech Investments",
    "countryAr": "قطر",
    "countryEn": "Qatar",
    "flag": "🇶🇦",
    "typeAr": "Sovereign Investment",
    "typeCategory": "investment",
    "stageAr": "Growth – Late Stage",
    "stages": [
      "growth"
    ],
    "sectorsAr": [
      "Technology",
      "AI",
      "Fintech"
    ],
    "websiteUrl": "https://www.qia.qa",
    "featured": false
  },
  {
    "id": "qatar-fintech-circle-196",
    "nameAr": "Qatar FinTech Circle",
    "nameEn": "Qatar FinTech Circle",
    "countryAr": "قطر",
    "countryEn": "Qatar",
    "flag": "🇶🇦",
    "typeAr": "Fintech Investment Ecosystem",
    "typeCategory": "investment",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Fintech"
    ],
    "websiteUrl": "https://qatarfintechhub.com",
    "featured": false
  },
  {
    "id": "qatar-fintech-hub-197",
    "nameAr": "Qatar FinTech Hub",
    "nameEn": "Qatar FinTech Hub",
    "countryAr": "قطر",
    "countryEn": "Qatar",
    "flag": "🇶🇦",
    "typeAr": "Accelerator / Ecosystem",
    "typeCategory": "accelerator",
    "stageAr": "Pre-Seed – Seed",
    "stages": [
      "pre_seed",
      "seed"
    ],
    "sectorsAr": [
      "Fintech"
    ],
    "websiteUrl": "https://qatarfintechhub.com",
    "featured": false
  },
  {
    "id": "oman-startup-hub-198",
    "nameAr": "Oman Startup Hub",
    "nameEn": "Oman Startup Hub",
    "countryAr": "عُمان",
    "countryEn": "Oman",
    "flag": "🇴🇲",
    "typeAr": "Startup Ecosystem / Funding",
    "typeCategory": "investment",
    "stageAr": "Early Stage",
    "stages": [
      "seed"
    ],
    "sectorsAr": [
      "Technology",
      "Startups"
    ],
    "websiteUrl": "https://omanstartuphub.com",
    "featured": false
  }
];
