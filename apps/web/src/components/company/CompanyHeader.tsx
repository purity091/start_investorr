import { Building, CheckCircle2, ExternalLink, Globe } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Company } from "@/types";

export function CompanyHeader({ company }: { company: Company }) {
  return (
    <Card id="section-summary" className="border-0 shadow-sm shadow-slate-200/60 dark:shadow-none bg-card rounded-2xl sm:rounded-3xl overflow-hidden">
      <CardContent className="p-4 sm:p-7">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full md:w-auto">
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-muted/30 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 p-2 border border-muted/30">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className="w-full h-full object-contain rounded-xl" referrerPolicy="no-referrer" />
              ) : (
                <Building className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground/60" />
              )}
            </div>
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-foreground">{company.name}</h2>
                <Badge variant="secondary" className="font-bold text-[11px] sm:text-xs gap-1 px-2.5 py-0.5 border-0 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-600" />
                  شركة معتمدة
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed font-medium">
                {company.shortDescription}
              </p>
              {company.categories?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {company.categories.map((category, index) => (
                    <Badge key={index} variant="secondary" className="text-[11px] font-semibold bg-muted/60 text-muted-foreground border-0 px-2.5 py-0.5">
                      {category}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          {company.website && (
            <a href={company.website} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto shrink-0 pt-1 md:pt-0">
              <Button variant="default" size="lg" className="w-full gap-2 font-bold shadow-xs px-5 text-xs sm:text-sm border-0 h-10 sm:h-11">
                <Globe className="h-4 w-4" />
                زيارة موقع الويب
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </Button>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
