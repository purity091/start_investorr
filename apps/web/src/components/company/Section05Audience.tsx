"use client";

import { useState } from "react";
import {
  Users, Layers, UserCheck, ShieldAlert, Lightbulb, CheckCircle2,
  Compass, Zap, ShieldCheck, DollarSign, Award, Building2, Globe,
  Target, Cpu,
} from "lucide-react";
import { Company } from "@/types";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProLockOverlay } from "./ProLockOverlay";

interface Props {
  selectedCompany: Company;
  viewTier: "public" | "pro";
  setViewTier: (tier: "public" | "pro") => void;
}

export function Section05Audience({ selectedCompany, viewTier, setViewTier }: Props) {
  const [activeAudienceTab, setActiveAudienceTab] = useState<"audience" | "benchmark">("audience");

  return (
    <Card id="main-section-5" className="border-0 shadow-sm shadow-slate-200/60 dark:shadow-none rounded-3xl overflow-hidden bg-card space-y-0 pt-0 relative">
      <div className="p-4 sm:p-7 bg-muted/30 space-y-4 sm:space-y-5">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-xl font-extrabold tracking-tight text-foreground">مصفوفة العملاء والجمهور المستهدف</h3>
            <p className="text-[11px] sm:text-sm text-muted-foreground font-medium mt-0.5 leading-relaxed">مصفوفة 8-Layer ICP للعميل المثالي، قنوات التواصل، ومصفوفة المقارنة والتمركز التنافسي الشامل</p>
          </div>
        </div>

        <div className="flex gap-4 sm:gap-6 overflow-x-auto pt-2 pb-1 scrollbar-none max-w-full">
          <button type="button" onClick={() => setActiveAudienceTab("audience")}
            className={`pb-3 text-[11px] sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 relative ${activeAudienceTab === "audience" ? "text-indigo-600 dark:text-indigo-400 font-extrabold" : "text-muted-foreground hover:text-foreground"}`}>
            <span>مصفوفة العملاء والشرائح</span>
            {activeAudienceTab === "audience" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-500 rounded-full" />}
          </button>
          <button type="button" onClick={() => setActiveAudienceTab("benchmark")}
            className={`pb-3 text-[11px] sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 relative ${activeAudienceTab === "benchmark" ? "text-indigo-600 dark:text-indigo-400 font-extrabold" : "text-muted-foreground hover:text-foreground"}`}>
            <span>المقارنة والتمركز الاستراتيجي</span>
            {activeAudienceTab === "benchmark" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-500 rounded-full" />}
          </button>
        </div>
      </div>

      <CardContent className="p-3.5 sm:p-7 relative min-h-[220px]">
        {viewTier === "public" && (
          <ProLockOverlay
            title="قسم مصفوفة العملاء والجمهور المستهدف حصري لباقة مؤسس وقائد"
            subtitle="ترقية حسابك إلى باقة مؤسس أو قائد للوصول إلى مصفوفة 8-Layer ICP للعميل المثالي ومصفوفة التمركز التنافسي."
            onUnlock={() => setViewTier("pro")}
          />
        )}
        {/* AUDIENCE TAB */}
        {activeAudienceTab === "audience" && (
          <div id="section-target-audience" className="space-y-6 relative">
            {selectedCompany.targetAudienceProfile?.idealCustomerPersonas?.length > 0 ? (
              <div className="rounded-2xl bg-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse min-w-[750px]">
                    <thead>
                      <tr className="bg-muted/30 text-foreground">
                        <th className="py-4 px-5 w-64 min-w-[220px] text-xs font-black bg-muted/20">
                          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                            <Layers className="h-4 w-4 shrink-0" />
                            <span>طبقات التقييم الاستراتيجي</span>
                          </div>
                        </th>
                        {selectedCompany.targetAudienceProfile.idealCustomerPersonas.map((persona, idx) => (
                          <th key={idx} className="py-4 px-6 text-right">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-black text-xs flex items-center justify-center shrink-0">0{idx + 1}</div>
                              <div>
                                <h5 className="text-sm font-black text-foreground tracking-tight">{persona.personaTitle || persona.customerSegment || `الشخصية 0${idx + 1}`}</h5>
                                {persona.customerSegment && <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold block mt-0.5">{persona.customerSegment}</span>}
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-muted/30 text-xs font-medium">
                      {/* ROW 1: Customer Profile */}
                      <tr className="hover:bg-muted/10 transition-colors">
                        <td className="py-4 px-5 font-bold text-foreground bg-muted/10 align-top space-y-1">
                          <div className="flex items-center gap-2 font-black"><UserCheck className="h-4 w-4 text-indigo-500 shrink-0" /><span>ملف العميل والدور</span></div>
                          <span className="text-[11px] text-muted-foreground font-normal block">من هو العميل؟</span>
                        </td>
                        {selectedCompany.targetAudienceProfile.idealCustomerPersonas.map((persona, idx) => (
                          <td key={idx} className="py-4 px-6 align-top space-y-2">
                            <p className="text-xs sm:text-sm text-foreground font-semibold leading-relaxed">{persona.customerProfile || "—"}</p>
                            {persona.archetypeRole && <Badge variant="outline" className="text-[11px] font-bold bg-muted/40 text-muted-foreground border-muted px-2.5 py-0.5">{persona.archetypeRole}</Badge>}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 2: Pain Points */}
                      <tr className="hover:bg-muted/10 transition-colors">
                        <td className="py-4 px-5 font-bold text-foreground bg-muted/10 align-top space-y-1">
                          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-black"><ShieldAlert className="h-4 w-4 shrink-0" /><span>المشاكل والمعاناة</span></div>
                          <span className="text-[11px] text-muted-foreground font-normal block">ما الذي يعاني منه؟</span>
                        </td>
                        {selectedCompany.targetAudienceProfile.idealCustomerPersonas.map((persona, idx) => (
                          <td key={idx} className="py-4 px-6 align-top">
                            {persona.painPoints?.length ? (
                              <ul className="space-y-2">
                                {persona.painPoints.map((pain, pIdx) => (
                                  <li key={pIdx} className="text-xs sm:text-sm text-foreground font-semibold flex items-start gap-2 bg-rose-500/5 p-2.5 rounded-xl">
                                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                                    <span className="leading-relaxed">{pain}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : <span className="text-muted-foreground italic">غير محدد</span>}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 3: Key Motivations */}
                      <tr className="hover:bg-muted/10 transition-colors">
                        <td className="py-4 px-5 font-bold text-foreground bg-muted/10 align-top space-y-1">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black"><Lightbulb className="h-4 w-4 shrink-0" /><span>الدوافع ومحفزات الحل</span></div>
                          <span className="text-[11px] text-muted-foreground font-normal block">لماذا يبحث عن الحل؟</span>
                        </td>
                        {selectedCompany.targetAudienceProfile.idealCustomerPersonas.map((persona, idx) => (
                          <td key={idx} className="py-4 px-6 align-top">
                            {persona.keyMotivations?.length ? (
                              <ul className="space-y-2">
                                {persona.keyMotivations.map((mot, mIdx) => (
                                  <li key={mIdx} className="text-xs sm:text-sm text-foreground font-semibold flex items-start gap-2 bg-emerald-500/5 p-2.5 rounded-xl">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span className="leading-relaxed">{mot}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : <span className="text-muted-foreground italic">غير محدد</span>}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 4: Buying Behavior */}
                      <tr className="hover:bg-muted/10 transition-colors">
                        <td className="py-4 px-5 font-bold text-foreground bg-muted/10 align-top space-y-1">
                          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-black"><Compass className="h-4 w-4 shrink-0" /><span>سلوك وقنوات البحث</span></div>
                          <span className="text-[11px] text-muted-foreground font-normal block">كيف يتسوق العميل؟</span>
                        </td>
                        {selectedCompany.targetAudienceProfile.idealCustomerPersonas.map((persona, idx) => (
                          <td key={idx} className="py-4 px-6 align-top">
                            <div className="p-3 bg-sky-500/5 rounded-xl space-y-1">
                              <p className="text-xs sm:text-sm text-foreground font-semibold leading-relaxed">{persona.buyingBehavior || "—"}</p>
                            </div>
                          </td>
                        ))}
                      </tr>
                      {/* ROW 5: Buying Triggers */}
                      <tr className="hover:bg-muted/10 transition-colors">
                        <td className="py-4 px-5 font-bold text-foreground bg-muted/10 align-top space-y-1">
                          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-black"><Zap className="h-4 w-4 shrink-0" /><span>محفز وتوقيت القرار</span></div>
                          <span className="text-[11px] text-muted-foreground font-normal block">متى يقرر الشراء؟</span>
                        </td>
                        {selectedCompany.targetAudienceProfile.idealCustomerPersonas.map((persona, idx) => (
                          <td key={idx} className="py-4 px-6 align-top">
                            <div className="p-3 bg-amber-500/5 rounded-xl">
                              <p className="text-xs sm:text-sm text-foreground font-bold leading-relaxed">{persona.buyingTriggers || "—"}</p>
                            </div>
                          </td>
                        ))}
                      </tr>
                      {/* ROW 6: Decision Criteria */}
                      <tr className="hover:bg-muted/10 transition-colors">
                        <td className="py-4 px-5 font-bold text-foreground bg-muted/10 align-top space-y-1">
                          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black"><ShieldCheck className="h-4 w-4 shrink-0" /><span>معايير اختيار المنصة</span></div>
                          <span className="text-[11px] text-muted-foreground font-normal block">لماذا يفضل هذه المنصة؟</span>
                        </td>
                        {selectedCompany.targetAudienceProfile.idealCustomerPersonas.map((persona, idx) => (
                          <td key={idx} className="py-4 px-6 align-top">
                            {persona.decisionCriteria?.length ? (
                              <ul className="space-y-1.5">
                                {persona.decisionCriteria.map((crit, cIdx) => (
                                  <li key={cIdx} className="text-xs sm:text-sm text-foreground font-semibold flex items-start gap-2">
                                    <span className="text-indigo-500 font-bold shrink-0 mt-0.5">•</span>
                                    <span className="leading-relaxed">{crit}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : <span className="text-muted-foreground italic">غير محدد</span>}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 7: Economic Value */}
                      <tr className="hover:bg-muted/10 transition-colors">
                        <td className="py-4 px-5 font-bold text-foreground bg-muted/10 align-top space-y-1">
                          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black"><DollarSign className="h-4 w-4 shrink-0" /><span>القيمة الاقتصادية (LTV)</span></div>
                          <span className="text-[11px] text-muted-foreground font-normal block">كم يساوي العميل؟</span>
                        </td>
                        {selectedCompany.targetAudienceProfile.idealCustomerPersonas.map((persona, idx) => (
                          <td key={idx} className="py-4 px-6 align-top">
                            <div className="p-3 bg-muted/20 rounded-xl space-y-1.5">
                              <span className="text-xs sm:text-sm font-extrabold text-foreground block">{persona.economicValueLtv || "—"}</span>
                              {persona.valueAlignment && <p className="text-xs text-muted-foreground font-medium border-t border-muted/40 pt-1.5 mt-1">{persona.valueAlignment}</p>}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-muted-foreground italic text-xs sm:text-sm font-medium">لم يتم إدخال بيانات الجمهور والعملاء المستهدفين بعد.</div>
            )}
          </div>
        )}

        {/* BENCHMARK TAB */}
        {activeAudienceTab === "benchmark" && (
          <div id="section-strategic-matrix" className="space-y-6 relative">
            <div className="rounded-2xl bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse min-w-[750px]">
                  <thead>
                    <tr className="bg-muted/30 text-foreground">
                      <th className="py-4 px-5 w-64 min-w-[220px] text-xs font-black bg-muted/20">
                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400"><Layers className="h-4 w-4 shrink-0" /><span>معايير المقارنة التنافسية</span></div>
                      </th>
                      <th className="py-4 px-6 text-right bg-muted/10">
                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-sm"><Award className="h-4 w-4 shrink-0" /><span>{selectedCompany.name}</span></div>
                      </th>
                      <th className="py-4 px-6 text-right">
                        <div className="flex items-center gap-2 text-muted-foreground font-bold text-sm"><Building2 className="h-4 w-4 shrink-0" /><span>المنافس الإقليمي المباشر</span></div>
                      </th>
                      <th className="py-4 px-6 text-right">
                        <div className="flex items-center gap-2 text-muted-foreground font-bold text-sm"><Globe className="h-4 w-4 shrink-0" /><span>المعيار العالمي</span></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/30 text-xs font-medium">
                    <tr className="hover:bg-muted/10 transition-colors">
                      <td className="py-4 px-5 font-bold text-foreground bg-muted/10 align-top space-y-1">
                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black"><Target className="h-4 w-4 shrink-0" /><span>01. القيمة المضافة المحورية</span></div>
                        <span className="text-[11px] text-muted-foreground font-normal block">الركيزة التنافسية والتخصص</span>
                      </td>
                      <td className="py-4 px-6 bg-muted/5 align-top"><p className="text-xs sm:text-sm text-foreground font-semibold leading-relaxed">{selectedCompany.competitiveAdvantage || "—"}</p></td>
                      <td className="py-4 px-6 align-top"><p className="text-xs sm:text-sm text-muted-foreground font-semibold leading-relaxed">التركيز على مرونة التخصيص وواجهات التاجر الموجهة للمشاريع</p></td>
                      <td className="py-4 px-6 align-top"><p className="text-xs sm:text-sm text-muted-foreground font-semibold leading-relaxed">الانتشار العالمي الضخم ومنظومة المطورين الشاملة</p></td>
                    </tr>
                    <tr className="hover:bg-muted/10 transition-colors">
                      <td className="py-4 px-5 font-bold text-foreground bg-muted/10 align-top space-y-1">
                        <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-black"><Cpu className="h-4 w-4 shrink-0" /><span>02. البنية التقنية والأنظمة</span></div>
                        <span className="text-[11px] text-muted-foreground font-normal block">التقنيات والتكاملات البرمجية</span>
                      </td>
                      <td className="py-4 px-6 bg-muted/5 align-top space-y-2">
                        <p className="text-xs sm:text-sm font-semibold text-foreground leading-relaxed">{selectedCompany.techSolutionDetails?.architectureOverview || "بنية سحابية موزعة مع ربط APIs متطور"}</p>
                        {selectedCompany.sampleTechs?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {selectedCompany.sampleTechs.map((tech, tIdx) => (
                              <Badge key={tIdx} variant="outline" className="text-[10px] font-bold bg-card border-muted/40">{tech}</Badge>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 align-top"><p className="text-xs sm:text-sm text-muted-foreground font-semibold leading-relaxed">حلول سحابية مرنة تعتمد على التكامل مع موفري الخدمات الإقليميين</p></td>
                      <td className="py-4 px-6 align-top"><p className="text-xs sm:text-sm text-muted-foreground font-semibold leading-relaxed">بنية خوادم Edge عالية السرعة مع محرك ثيمات مخصص</p></td>
                    </tr>
                    <tr className="hover:bg-muted/10 transition-colors">
                      <td className="py-4 px-5 font-bold text-foreground bg-muted/10 align-top space-y-1">
                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black"><Users className="h-4 w-4 shrink-0" /><span>03. شريحة المستهدفين الأساسية</span></div>
                        <span className="text-[11px] text-muted-foreground font-normal block">من يستفيد من المنصة؟</span>
                      </td>
                      <td className="py-4 px-6 bg-muted/5 align-top"><p className="text-xs sm:text-sm font-bold text-foreground leading-relaxed">{selectedCompany.marketPosition || "—"}</p></td>
                      <td className="py-4 px-6 align-top"><p className="text-xs sm:text-sm text-muted-foreground font-semibold leading-relaxed">تجار التجزئة المحليين والرواد الراغبين في مرونة الربط</p></td>
                      <td className="py-4 px-6 align-top"><p className="text-xs sm:text-sm text-muted-foreground font-semibold leading-relaxed">جميع فئات التجارة العالمية من صانعي المحتوى حتى الشركات الكبرى</p></td>
                    </tr>
                    <tr className="hover:bg-muted/10 transition-colors">
                      <td className="py-4 px-5 font-bold text-foreground bg-muted/10 align-top space-y-1">
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black"><Award className="h-4 w-4 shrink-0" /><span>04. الحجم المالي والتمويل</span></div>
                        <span className="text-[11px] text-muted-foreground font-normal block">القدرة المالية والتقييم</span>
                      </td>
                      <td className="py-4 px-6 bg-muted/5 align-top space-y-1">
                        <span className="text-xs sm:text-sm font-extrabold text-foreground block">إجمالي التمويل: {selectedCompany.totalFundingAmount || "—"}</span>
                        <span className="text-[11px] text-muted-foreground font-semibold block">الحالة: {selectedCompany.fundingStatus || "شركة خاصة"}</span>
                      </td>
                      <td className="py-4 px-6 align-top"><span className="text-xs sm:text-sm font-semibold text-muted-foreground block">جولات استثمارية إقليمية متعددة</span></td>
                      <td className="py-4 px-6 align-top"><span className="text-xs sm:text-sm font-semibold text-muted-foreground block">شركة مساهمة عامة متداولة بقيمة سوقية ضخمة</span></td>
                    </tr>
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
