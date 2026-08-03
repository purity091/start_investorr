import React, { type FC } from 'react';
import * as LucideIcons from 'lucide-react';
import { Lightbulb, Sparkles, Rocket } from 'lucide-react';
import { BusinessOpportunity } from './types';
import { Card, CardContent } from '../../../ui/Card';
import { Badge } from '../../../ui/Badge';

const renderOpportunityIcon = (iconProp: any) => {
  if (!iconProp) return <Lightbulb size={22} strokeWidth={2.5} />;

  if (typeof iconProp === 'function' || (typeof iconProp === 'object' && (iconProp.$$typeof || iconProp.render))) {
    const Component = iconProp;
    return <Component size={22} strokeWidth={2.5} />;
  }

  if (typeof iconProp === 'string' && iconProp.trim().length > 0) {
    const IconComponent = (LucideIcons as any)[iconProp] || Lightbulb;
    return <IconComponent size={22} strokeWidth={2.5} />;
  }

  if (typeof iconProp === 'object' && (iconProp.name || iconProp.iconName)) {
    const iconName = iconProp.name || iconProp.iconName;
    const IconComponent = (LucideIcons as any)[iconName] || Lightbulb;
    return <IconComponent size={22} strokeWidth={2.5} />;
  }

  return <Lightbulb size={22} strokeWidth={2.5} />;
};

export const OpportunityCard: FC<{ opp: BusinessOpportunity; index: number }> = ({
  opp,
  index,
}) => {
  return (
    <Card 
      className="flex flex-col justify-between border-border bg-card shadow-xs rounded-xl p-5"
    >
      <div className="dir-rtl space-y-3">
        {/* Card Header: Icon & Idea Index */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-primary">
            {renderOpportunityIcon(opp.icon)}
          </div>
          <Badge variant="secondary" className="font-semibold text-xs">
            فكرة #{index + 1}
          </Badge>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h4 className="m-0 text-base font-bold tracking-tight text-foreground">
            {opp.title}
          </h4>
          {(opp.description || opp.note) && (
            <p className="m-0 text-xs text-muted-foreground font-normal leading-relaxed">
              {opp.description || opp.note}
            </p>
          )}
        </div>

        {/* List of Concepts / Ideas */}
        {opp.examples && opp.examples.length > 0 && (
          <div className="pt-3 border-t border-border space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
              <Sparkles size={13} className="text-primary" />
              <span>المفاهيم والنماذج:</span>
            </div>
            
            <div className="flex flex-col gap-1.5">
              {opp.examples.map((ex, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-2.5 text-xs font-medium text-foreground leading-relaxed"
                >
                  <div className="size-1.5 shrink-0 rounded-full bg-primary mt-1.5" />
                  <span>{ex}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export const OpportunitiesSection: FC<{ opportunities: BusinessOpportunity[] }> = ({
  opportunities,
}) => {
  return (
    <Card
      id="opportunities-section"
      data-section="opportunities-section"
      className="border-border bg-card p-6 rounded-xl dir-rtl shadow-xs"
    >
      <div className="mb-6 flex items-start gap-3 border-b border-border pb-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
          <Rocket size={20} strokeWidth={2} />
        </div>
        <div className="flex-1 text-right">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="m-0 text-xl font-bold tracking-tight text-foreground">
              فرص نماذج الأعمال والأفكار الاستثمارية
            </h3>
            <Badge variant="outline" className="text-xs font-semibold">
              أفكار استثمارية
            </Badge>
          </div>
          <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
            مجموعة من الأفكار ونماذج الأعمال المبتكرة القابلة للتطبيق والعمل في هذا القطاع.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((opp, idx) => (
          <OpportunityCard key={opp.id || idx} opp={opp} index={idx} />
        ))}
      </div>
    </Card>
  );
};
