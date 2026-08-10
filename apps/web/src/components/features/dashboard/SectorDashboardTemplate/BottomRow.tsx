import React, { type FC } from 'react';
import { Card } from '../../../ui/Card';
import { Badge } from '../../../ui/Badge';
import { BookOpen, Sparkles, Tag, TrendingUp, BrainCircuit, Video, CheckCircle2 } from 'lucide-react';

export const BottomRow: FC<{
  definition?: string;
  industryInsights?: string[];
  tags?: string[];
  title: string;
}> = ({ definition, industryInsights = [], tags = [], title }) => {
  const hasDefinition = !!definition;
  const hasInsights = industryInsights.length > 0;
  if (!hasDefinition && !hasInsights && tags.length === 0) return null;

  const cleanTitle = title.replace(/^(قطاع|صناعة)\s*/, '');

  const getInsightIcon = (index: number) => {
    switch (index % 3) {
      case 0: return BrainCircuit;
      case 1: return TrendingUp;
      case 2: return Video;
      default: return Sparkles;
    }
  };

  return (
    <div id="definition-section" data-section="definition" className="space-y-6 dir-rtl">
      {/* Definition Box */}
      {hasDefinition && (
        <Card className="border-border bg-card p-6 rounded-xl shadow-xs">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpen size={18} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="m-0 text-xl font-bold tracking-tight text-foreground">
                    تعريف قطاع {cleanTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">
                    النطاق التشغيلي وسياق السوق
                  </p>
                </div>
              </div>
              
              <Badge variant="outline" className="w-fit text-xs font-semibold px-2.5 py-1">
                سياق القطاع
              </Badge>
            </div>

            <div className="p-4 bg-primary/5 rounded-xl border border-primary/15">
              <p className="m-0 text-sm md:text-base font-medium leading-relaxed text-foreground">
                {definition}
              </p>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground shrink-0">
                  <Tag size={13} className="text-primary" />
                  <span>الموضوعات:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="gap-1 rounded-md px-2.5 py-0.5 text-xs font-medium"
                    >
                      <span className="text-muted-foreground">#</span>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Insights Cards Grid */}
      {hasInsights && (
        <Card className="border-border bg-card p-6 rounded-xl shadow-xs">
          <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles size={18} strokeWidth={2} />
              </div>
              <div>
                <h3 className="m-0 text-xl font-bold tracking-tight text-foreground">
                  أبرز الاتجاهات والشواهد الرئيسية
                </h3>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                  رؤى تحليلية تصف حركة السوق
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex text-xs font-medium">
              {industryInsights.length} اتجاهات
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {industryInsights.map((insight, idx) => {
              const Icon = getInsightIcon(idx);
              return (
                <div 
                  key={idx}
                  className="flex flex-col justify-between p-4 rounded-xl bg-card border border-border shadow-2xs hover:border-primary/30 transition-all duration-200 space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon size={16} strokeWidth={2} />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground/60">
                        0{idx + 1}
                      </span>
                    </div>
                    <p className="m-0 text-xs md:text-sm font-medium leading-relaxed text-foreground">
                      {insight}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border/50 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                    <CheckCircle2 size={12} />
                    <span>مؤشر رائد</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};
