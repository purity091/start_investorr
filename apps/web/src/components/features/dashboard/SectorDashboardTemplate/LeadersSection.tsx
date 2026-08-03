import React, { type FC } from 'react';
import { SectorLeader } from './types';
import { Card } from '../../../ui/Card';
import { Badge } from '../../../ui/Badge';
import { Building2, Globe, Trophy } from 'lucide-react';

export const LeadersSection: FC<{
  leaders: SectorLeader[];
  title: string;
}> = ({ leaders, title }) => {
  const cleanTitle = title.replace(/^(قطاع|صناعة)\s*/, '');

  return (
    <Card
      id="leaders-section"
      data-section="leaders"
      className="border-border bg-card p-6 rounded-xl dir-rtl shadow-xs"
    >
      <div className="mb-6 flex items-start gap-3 border-b border-border pb-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
          <Trophy size={20} strokeWidth={2} />
        </div>
        <div className="flex-1 text-right">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="m-0 text-xl font-bold tracking-tight text-foreground">
              الشركات والكيانات الرائدة في {cleanTitle}
            </h2>
            <Badge variant="outline" className="text-xs font-semibold">
              القادة واللاعبون الرئيسيون
            </Badge>
          </div>
          <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
            أبرز الشركات العالمية والإقليمية التي تقود الابتكار وتستحوذ على الحصة السوقية في هذا المجال.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {leaders.map((leader, idx) => (
          <Card
            key={idx}
            className="flex flex-col justify-between border-border bg-muted/30 p-4 rounded-lg shadow-none"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex size-7 items-center justify-center rounded-md bg-background text-xs font-bold text-primary border border-border">
                  #{(idx + 1).toString().padStart(2, '0')}
                </div>
                <Badge variant="secondary" className="gap-1 text-[11px] font-medium">
                  <Globe size={11} />
                  {leader.country}
                </Badge>
              </div>

              <div className="flex items-center gap-2 mb-1.5">
                <Building2 size={15} className="text-primary shrink-0" />
                <h3 className="m-0 text-sm font-bold text-foreground">
                  {leader.name}
                </h3>
              </div>
            </div>

            {leader.note && (
              <div className="mt-3 pt-2 border-t border-border">
                <p className="m-0 text-xs font-normal leading-relaxed text-muted-foreground">
                  {leader.note}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </Card>
  );
};
