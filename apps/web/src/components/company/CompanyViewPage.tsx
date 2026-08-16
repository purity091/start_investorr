"use client";

import { useAuth } from '@/features/auth/AuthContext';
import { Company } from "@/types";
import { CompanyHeader } from "@/components/company/CompanyHeader";
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
  const { profile, loading } = useAuth();
  const hasProAccess = profile?.subscription_plan === 'founder' || profile?.subscription_plan === 'leader';
  // Avoid showing a false lock while the authenticated profile is still loading.
  const viewTier: 'public' | 'pro' = loading || hasProAccess ? 'pro' : 'public';

  const handleUnlock = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/pricing";
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background font-sans">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-6">

        {/* First Div: Header Card containing Logo, Details, & Collapsible Index Button */}
        <div>
          <CompanyHeader company={company} />
        </div>

        {/* Main Content Area - Full 100% Width */}
        <main className="w-full space-y-4 sm:space-y-6">
          <Section01Identity selectedCompany={company} />
          <Section02Ecosystem selectedCompany={company} viewTier={viewTier} setViewTier={handleUnlock} />
          <Section03Funding selectedCompany={company} viewTier={viewTier} setViewTier={handleUnlock} />
          <Section04Strategy selectedCompany={company} viewTier={viewTier} setViewTier={handleUnlock} />
          <Section05Audience selectedCompany={company} viewTier={viewTier} setViewTier={handleUnlock} />
        </main>
      </div>
    </div>
  );
}

export default CompanyViewPage;
