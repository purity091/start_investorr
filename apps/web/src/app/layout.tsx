import "../index.css";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { createMetadata, organizationJsonLd, siteConfig, websiteJsonLd } from "@/lib/seo";

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  ...createMetadata({
    title: "خطة. | دراسات جدوى ونماذج عمل وتحليل مشاريع بالذكاء الاصطناعي",
    description: siteConfig.description,
    path: "/",
  }),
  title: {
    default: "خطة. | دراسات جدوى ونماذج عمل وتحليل مشاريع بالذكاء الاصطناعي",
    template: "%s | خطة.",
  },
  applicationName: siteConfig.name,
  category: "business",
  authors: [{ name: "فريق منصة خطة" }],
  creator: "خطة",
  publisher: "خطة.",
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]).replace(/</g, "\\u003c"),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
