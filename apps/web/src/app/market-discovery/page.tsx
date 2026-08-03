import { PublicLayout } from "@/components/layout/PublicLayout";
import { MarketDiscoveryClient } from "./MarketDiscoveryClient";

export const revalidate = 86400;

export const metadata = {
  title: "استكشاف قطاعات السوق | خطة",
  description: "استكشف قطاعات السوق والفرص العامة دون تحميل لوحة التطبيق الكاملة.",
};

export default function MarketDiscoveryPage() {
  return (
    <PublicLayout>
      <MarketDiscoveryClient />
    </PublicLayout>
  );
}
