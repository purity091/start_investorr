"use client";

import { DiscoveryCenter } from "@/components/features/discovery/DiscoveryCenter";

export function MarketDiscoveryClient() {
  const setActiveTab = (tab: string) => {
    window.location.href = `/${encodeURIComponent(tab)}`;
  };

  return <DiscoveryCenter setActiveTab={setActiveTab} />;
}
