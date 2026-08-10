import type { Metadata } from "next";

export const siteConfig = {
  name: "خطة.",
  legalName: "منصة خطة",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://khotta.app",
  locale: "ar_SA",
  twitterHandle: "@khotta_app",
  description:
    "منصة عربية ذكية لبناء دراسات الجدوى ونماذج العمل والتحليلات المالية واستكشاف أفكار مشاريع SaaS وMicro-SaaS قابلة للنمو والاستثمار.",
  keywords: [
    "دراسة جدوى",
    "دراسات جدوى",
    "خطة عمل",
    "نموذج العمل التجاري",
    "Business Model Canvas",
    "تحليل مالي",
    "أفكار مشاريع SaaS",
    "أفكار Micro-SaaS",
    "فرص استثمارية",
    "ريادة الأعمال",
  ],
};

export const absoluteUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, siteConfig.url).toString();
};

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

export function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = "/og-image.png",
  noIndex = false,
  type = "website",
}: SeoOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: path,
      languages: {
        ar: path,
        "x-default": path,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl("/favicon.ico"),
  sameAs: [siteConfig.url],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: "ar",
  description: siteConfig.description,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/market-discovery?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
