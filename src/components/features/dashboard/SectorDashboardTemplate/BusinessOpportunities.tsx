import React, { useState, type FC } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { BusinessOpportunity } from './types';
import { Card, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { cn } from '../../../../lib/utils';

export const OpportunityCard: FC<{ opp: BusinessOpportunity; index: number; onBuildPlan?: (p?: string) => void }> = ({
  opp,
  index,
  onBuildPlan,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const Icon = opp.icon;

  return (
    <Card 
      className="group flex cursor-default flex-col overflow-hidden border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md"
    >
      <div className="flex items-start justify-between p-6 pb-2 dir-rtl">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/30 text-primary">
          {Icon && <Icon size={22} strokeWidth={2.5} />}
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black leading-none text-muted-foreground/30 select-none">
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <Button 
            variant="outline"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "size-8 rounded-lg transition-all",
              isOpen ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            <ChevronDown size={18} strokeWidth={2.5} className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 dir-rtl">
        <h4 className="m-0 text-lg font-black tracking-tight text-foreground">{opp.title}</h4>
      </div>

      <div 
        className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out dir-rtl",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <CardContent className="border-t border-border bg-muted/10 pt-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-4 w-1 rounded-sm bg-primary" />
            <p className="m-0 text-[11px] font-black uppercase tracking-widest text-primary">المسارات الاستثمارية المقترحة:</p>
          </div>
          <ul className="m-0 flex flex-col gap-2.5 p-0 list-none">
            {opp.examples.map((ex, i) => (
              <li key={i}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBuildPlan?.(ex);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl border border-border bg-background p-3.5 text-right text-sm font-bold text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground hover:shadow-sm"
                >
                  <div className="size-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="flex-1">{ex}</span>
                  <ExternalLink size={14} className="shrink-0 opacity-30" />
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </div>
    </Card>
  );
};

export const OpportunitiesSection: FC<{ opportunities: BusinessOpportunity[]; onBuildPlan?: (p?: string) => void }> = ({
  opportunities,
  onBuildPlan,
}) => {
  return (
    <Card
      id="opportunities-section"
      data-section="opportunities-section"
      className="border-border bg-background p-8 dir-rtl"
    >
      <div className="mb-8 flex items-start gap-4">
        <div className="mt-1 h-8 w-1 shrink-0 rounded bg-primary" />
        <div className="flex-1 text-right">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="m-0 text-2xl font-black tracking-tight text-foreground">
              نماذج الأعمال والفرص الاستثمارية
            </h3>
            <Badge variant="default" className="rounded-full px-3 py-1 text-[11px] font-black tracking-wider">
              فرص واعدة
            </Badge>
          </div>
          <p className="mt-2 max-w-3xl text-base font-medium leading-relaxed text-muted-foreground">
            أبرز مسارات العمل المتاحة في هذا القطاع وكيفية البدء في تنفيذها من خلال نماذج عمل واقعية ومجربة.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((opp, idx) => (
          <OpportunityCard key={opp.id} opp={opp} index={idx} onBuildPlan={onBuildPlan} />
        ))}
      </div>
    </Card>
  );
};

