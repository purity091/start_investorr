import React, { type FC } from 'react';
import { Card, CardContent } from '../../../ui/Card';
import { Badge } from '../../../ui/Badge';
import { cn } from '../../../../lib/utils';

export const BottomRow: FC<{
  definition?: string;
  industryInsights?: string[];
  tags?: string[];
  title: string;
}> = ({ definition, industryInsights = [], tags = [], title }) => {
  const hasDefinition = !!definition;
  const hasInsights = industryInsights.length > 0;
  if (!hasDefinition && !hasInsights && tags.length === 0) return null;

  return (
    <div className={cn("grid gap-8 dir-rtl", hasDefinition && hasInsights ? "lg:grid-cols-[2fr_1fr]" : "grid-cols-1")}>
      {hasDefinition && (
        <Card
          id="definition-section"
          data-section="definition"
          className="border-border bg-background p-8"
        >
          <div className="relative z-10">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-8 w-1 shrink-0 rounded bg-primary" />
              <h3 className="m-0 text-2xl font-black tracking-tight text-foreground">
                تعريف {title.replace(/^(قطاع|صناعة)\s*/, '')}
              </h3>
            </div>
            <p className="m-0 text-base font-medium leading-relaxed text-muted-foreground">{definition}</p>
            {tags.length > 0 && (
              <div className="mt-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px w-6 bg-border" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">الموضوعات المرتبطة</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {tags.map((tag, i) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="gap-1.5 rounded-xl border-border bg-muted/30 px-3.5 py-1.5 text-[13px] font-bold text-muted-foreground hover:bg-muted"
                    >
                      <span className={i === 0 ? "text-primary" : "text-muted-foreground/60"}>#</span>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
      {hasInsights && (
        <Card 
          id="insights-section" 
          data-section="insights-bottom" 
          className="flex flex-col border-border bg-background p-8"
        >
          <h3 className="m-0 mb-6 text-2xl font-black tracking-tight text-foreground">أبرز النقاط</h3>
          <ul className="m-0 flex flex-1 flex-col gap-5 p-0 list-none">
            {industryInsights.map((insight, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
                <p className="m-0 text-[15px] font-medium leading-relaxed text-muted-foreground">{insight}</p>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};
