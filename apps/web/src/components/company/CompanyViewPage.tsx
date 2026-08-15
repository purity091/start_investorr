import { useState } from "react";
import { Company } from "@/types";
import { CompanyHeader }      from "@/components/company/CompanyHeader";
import { CompanySidebarTOC }  from "@/components/company/CompanySidebarTOC";
import { Section01Identity }  from "@/components/company/Section01Identity";
import { Section02Ecosystem } from "@/components/company/Section02Ecosystem";
import { Section03Funding }   from "@/components/company/Section03Funding";
import { Section04Strategy }  from "@/components/company/Section04Strategy";
import { Section05Audience }  from "@/components/company/Section05Audience";

interface Props {
  company: Company;
  onBack?: () => void;
}

export function CompanyViewPage({ company }: Props) {
  const [viewTier, setViewTier] = useState<"public" | "pro">("public");

  return (
    <div dir="rtl" className="min-h-screen bg-background font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        {/* Company Header */}
        <div className="mb-6">
          <CompanyHeader company={company} />
        </div>

        {/* Main layout: sidebar TOC + content */}
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <CompanySidebarTOC />

          <main className="flex-1 min-w-0 space-y-6">
            <Section01Identity selectedCompany={company} />
            <Section02Ecosystem selectedCompany={company} viewTier={viewTier} setViewTier={setViewTier} />
            <Section03Funding selectedCompany={company} />
            <Section04Strategy selectedCompany={company} viewTier={viewTier} setViewTier={setViewTier} />
            <Section05Audience selectedCompany={company} viewTier={viewTier} setViewTier={setViewTier} />
          </main>
        </div>
      </div>
    </div>
  );
}
