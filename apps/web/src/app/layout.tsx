import "../index.css";
import { Metadata, Viewport } from "next";
import Script from "next/script";
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
      <head>
        {/* Yandex.Metrika counter */}
        <Script id="yandex-metrica" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=111626940', 'ym');ym(111626940, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`}
        </Script>
        {/* /Yandex.Metrika counter */}
      </head>
      <body suppressHydrationWarning className="antialiased min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
        {/* Yandex Metrika noscript fallback */}
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/111626940"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
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
