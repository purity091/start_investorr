import { useState } from "react";
import { Activity } from "lucide-react";
import { Company } from "@/types";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface Props {
  selectedCompany: Company;
}

export function Section03Funding({ selectedCompany }: Props) {
  const [activeFundingTab, setActiveFundingTab] = useState<"funding" | "investments">("funding");

  return (
    <Card id="main-section-3" className="border-0 shadow-sm shadow-slate-200/60 dark:shadow-none rounded-3xl overflow-hidden bg-card space-y-0 pt-0 relative">
      {/* Header Banner with Clean Text Tabs matching Section 5 */}
      <div className="p-4 sm:p-7 bg-muted/30 space-y-4 sm:space-y-5">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 flex items-center justify-center">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">التمويل والمعاملات الاستثمارية</h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">سجل جولات التمويل التاريخية، كبار المستثمرين المشاركين، والاستثمارات الخارجية الممنوحة</p>
          </div>
        </div>

        {/* Clean Text Tabs matching Section 5 */}
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pt-2 pb-1 scrollbar-none max-w-full">
          <button
            type="button"
            onClick={() => setActiveFundingTab("funding")}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 relative ${
              activeFundingTab === "funding"
                ? "text-emerald-600 dark:text-emerald-400 font-extrabold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>جولات التمويل ({selectedCompany.fundingRounds.length})</span>
            {activeFundingTab === "funding" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-500 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveFundingTab("investments")}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 relative ${
              activeFundingTab === "investments"
                ? "text-emerald-600 dark:text-emerald-400 font-extrabold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>الاستثمارات الممنوحة ({selectedCompany.investments.length})</span>
            {activeFundingTab === "investments" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-500 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Card Content Area */}
      <CardContent className="p-6 sm:p-7 relative">
        {/* FUNDING ROUNDS TAB CONTENT */}
        {activeFundingTab === "funding" && (
          <div id="section-funding" className="space-y-4">
            <div className="rounded-2xl bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse min-w-[650px]">
                  <thead>
                    <tr className="bg-muted/30 text-foreground">
                      <th className="py-3.5 px-5 text-xs font-black">التاريخ</th>
                      <th className="py-3.5 px-5 text-xs font-black">اسم المعاملة</th>
                      <th className="py-3.5 px-5 text-xs font-black text-center">المستثمرون</th>
                      <th className="py-3.5 px-5 text-xs font-black">المبلغ المرفوع</th>
                      <th className="py-3.5 px-5 text-xs font-black">المستثمر الرئيسي</th>
                      <th className="py-3.5 px-5 text-xs font-black">نوع التمويل</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/30 text-xs font-medium">
                    {selectedCompany.fundingRounds.map((fr) => (
                      <tr key={fr.id} className="hover:bg-muted/10 transition-colors">
                        <td className="py-4 px-5 font-bold text-foreground">{fr.announcedDate}</td>
                        <td className="py-4 px-5">{fr.transactionName}</td>
                        <td className="py-4 px-5 text-center font-bold text-muted-foreground">{fr.investorsCount}</td>
                        <td className="py-4 px-5 font-extrabold text-foreground">{fr.moneyRaised}</td>
                        <td className="py-4 px-5 text-muted-foreground font-semibold">{fr.leadInvestor}</td>
                        <td className="py-4 px-5">
                          <Badge variant="secondary" className="text-xs font-semibold bg-muted/60 text-foreground border-0">
                            {fr.fundingType}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                    {selectedCompany.fundingRounds.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-6 text-center text-muted-foreground italic font-medium">لا توجد جولات تمويل مسجلة.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* INVESTMENTS TAB CONTENT */}
        {activeFundingTab === "investments" && (
          <div id="section-investments" className="space-y-4">
            <div className="rounded-2xl bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse min-w-[650px]">
                  <thead>
                    <tr className="bg-muted/30 text-foreground">
                      <th className="py-3.5 px-5 text-xs font-black">تاريخ الاستثمار</th>
                      <th className="py-3.5 px-5 text-xs font-black">المؤسسة المستهدفة</th>
                      <th className="py-3.5 px-5 text-xs font-black text-center">مستثمر رئيسي</th>
                      <th className="py-3.5 px-5 text-xs font-black">جولة التمويل</th>
                      <th className="py-3.5 px-5 text-xs font-black">مبلغ الاستثمار</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/30 text-xs font-medium">
                    {selectedCompany.investments.map((inv) => (
                      <tr key={inv.id} className="hover:bg-muted/10 transition-colors">
                        <td className="py-4 px-5 font-bold text-foreground">{inv.announcedDate}</td>
                        <td className="py-4 px-5 text-foreground font-bold">{inv.orgName}</td>
                        <td className="py-4 px-5 text-center">
                          <Badge variant={inv.isLead ? "secondary" : "outline"} className="text-xs font-semibold border-0">
                            {inv.isLead ? "نعم" : "لا"}
                          </Badge>
                        </td>
                        <td className="py-4 px-5 text-muted-foreground font-medium">{inv.fundingRound}</td>
                        <td className="py-4 px-5 font-extrabold text-foreground">{inv.moneyRaised}</td>
                      </tr>
                    ))}
                    {selectedCompany.investments.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-muted-foreground italic font-medium">لا توجد استثمارات مسجلة.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
