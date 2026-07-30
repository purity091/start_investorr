import React, { type FC } from 'react';
import { SectorLeader } from './types';
import { Card } from '../../../ui/Card';

export const LeadersSection: FC<{
  leaders: SectorLeader[];
  title: string;
}> = ({ leaders, title }) => (
  <Card
    id="leaders-section"
    data-section="leaders"
    className="border-border bg-background p-8 dir-rtl"
  >
    <div className="mb-8 flex items-center gap-4">
      <div className="h-8 w-1 shrink-0 rounded bg-primary" />
      <h2 className="m-0 text-2xl font-black tracking-tight text-foreground">
        أبرز قادة {title.replace(/^(قطاع|صناعة)\s*/, '')}
      </h2>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {leaders.map((leader, idx) => (
        <Card
          key={idx}
          className="group relative cursor-default border-border bg-muted/20 p-6 pr-12 shadow-none transition-all duration-300 hover:-translate-y-1 hover:bg-background hover:shadow-sm"
        >
          <div className="absolute right-4 top-6 flex size-7 items-center justify-center rounded-full border border-border bg-background text-xs font-black text-muted-foreground shadow-sm">
            {idx + 1}
          </div>
          <p className="m-0 text-lg font-black leading-tight text-foreground">{leader.name}</p>
          <p className="mt-1.5 text-sm font-semibold text-muted-foreground">{leader.country}</p>
          {leader.note && (
            <p className="mt-4 border-t border-border pt-4 text-[13px] font-medium leading-relaxed text-muted-foreground">
              {leader.note}
            </p>
          )}
        </Card>
      ))}
    </div>
  </Card>
);
