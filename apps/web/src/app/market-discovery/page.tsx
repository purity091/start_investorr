import { PublicLayout } from "@/components/layout/PublicLayout";
import { MarketDiscoveryClient } from "./MarketDiscoveryClient";
import { createMetadata } from "@/lib/seo";

export const revalidate = 86400;

export const metadata = createMetadata({
  title: "استكشاف قطاعات السوق والفرص الاستثمارية",
  description:
    "استكشف قطاعات السوق الواعدة، اتجاهات الطلب، الفجوات، والفرص الاستثمارية لمساعدتك على اختيار فكرة مشروع مبنية على تحليل لا على التخمين.",
  path: "/market-discovery",
  keywords: ["استكشاف السوق", "فرص استثمارية", "تحليل قطاعات", "أبحاث السوق", "فجوات السوق"],
});

export default function MarketDiscoveryPage() {
  return (
    <PublicLayout>
      <MarketDiscoveryClient />
    </PublicLayout>
  );
}
