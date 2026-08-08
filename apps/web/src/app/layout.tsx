import "../index.css";
import { Metadata, Viewport } from "next";
import { AuthModalProvider } from "@/features/auth/AuthModalContext";

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "خطة. | الجيل الجديد من دراسات الجدوى والتحليلات الاستثمارية",
    template: "%s | خطة.",
  },
  description:
    "منصة خطة هي المنصة العربية الأولى المعتمدة بالذكاء الاصطناعي لإعداد دراسات الجدوى الاقتصادية، التوقعات المالية لـ 5 سنوات، ونماذج العمل الاستثمارية بدقة وسرعة.",
  keywords: [
    "خطة",
    "دراسة جدوى",
    "دراسات جدوى",
    "توقعات مالية",
    "نموذج العمل التجاري",
    "BMC",
    "مستثمر",
    "ذكاء اصطناعي",
    "تخطيط مشاريع",
    "ريادة الأعمال",
  ],
  authors: [{ name: "فريق منصة خطة" }],
  creator: "خطة",
  publisher: "خطة.",
  metadataBase: new URL("https://khotta.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "خطة. | الجيل الجديد من دراسات الجدوى",
    description:
      "منصة خطة تزودك بأحدث الأدوات الذكية والنماذج المالية المعتمدة لإعداد دراسات جدوى احترافية بأعلى دقة وسرعة.",
    url: "https://khotta.app",
    siteName: "خطة.",
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "خطة. | الجيل الجديد من دراسات الجدوى",
    description: "حوّل فكرتك إلى مشروع استثماري ناجح مع منصة خطة.",
  },
  robots: {
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
        <AuthModalProvider>
          {children}
        </AuthModalProvider>
      </body>
    </html>
  );
}
