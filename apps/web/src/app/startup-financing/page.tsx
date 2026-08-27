import { PublicLayout } from "@/components/layout/PublicLayout";
import { StartupFinancingView } from "@/components/views/StartupFinancingView";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "دليل شركات التمويل والاستثمار الجريء بالوطن العربي | حاضنات وصناديق الاستثمار",
  description:
    "دليل استثماري شامل يضم أكثر من 198 جهة تمويلية، صندوق استثمار جريء (Venture Capital)، وحاضنات ومسرعات أعمال في السعودية، الإمارات، مصر ودول الخليج.",
  path: "/startup-financing",
  keywords: [
    "شركات تمويل ناشئة",
    "جهات التمويل الاستثماري",
    "صناديق الاستثمار الجريء",
    "Venture Capital MENA",
    "حاضنات أعمال في السعودية",
    "مسرعات أعمال",
    "تمويل الشركات الناشئة",
    "مستثمرين ملائكيين"
  ],
});

export const financingDirectoryJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "دليل جهات التمويل والاستثمار الجريء بالوطن العربي",
  description: "قائمة موثقة بأبرز صناديق الاستثمار الجريء وحاضنات الأعمال في منطقة الشرق الأوسط وشمال أفريقيا.",
  url: "https://khotta.app/startup-financing",
  numberOfItems: 198,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "صناديق الاستثمار الجريء (Venture Capital)"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "حاضنات ومسرعات الأعمال (Accelerators & Incubators)"
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "شبكات المستثمرين الملائكيين (Angel Networks)"
    }
  ]
};

export default function StartupFinancingPage() {
  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financingDirectoryJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <StartupFinancingView />
      </div>
    </PublicLayout>
  );
}
