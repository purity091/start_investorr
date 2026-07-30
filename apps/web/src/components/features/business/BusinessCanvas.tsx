import React from 'react';
import { Briefcase, Coins, HeartHandshake, Users, Wallet } from 'lucide-react';
import { BusinessModelItem } from '../../../types';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

interface BusinessCanvasProps {
  items: BusinessModelItem[];
  hideTitle?: boolean;
}

const categoryMeta: Record<BusinessModelItem['category'], { label: string; icon: React.ElementType }> = {
  users: { label: 'شرائح العملاء', icon: Users },
  partners: { label: 'الشركاء', icon: Briefcase },
  value: { label: 'القيمة المقدمة', icon: HeartHandshake },
  cost: { label: 'هيكل التكاليف', icon: Wallet },
  revenue: { label: 'مصادر الإيرادات', icon: Coins },
};

export const BusinessCanvas: React.FC<BusinessCanvasProps> = ({ items, hideTitle = false }) => {
  return (
    <section className={hideTitle ? 'space-y-4' : 'my-8 space-y-4'} dir="rtl">
      {!hideTitle && (
        <div className="space-y-1 text-right">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">نموذج العمل التجاري</h2>
          <p className="text-sm text-muted-foreground">ملخص سريع للعناصر المدخلة داخل نموذج العمل.</p>
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => {
          const meta = categoryMeta[item.category] ?? categoryMeta.partners;
          const Icon = meta.icon;

          return (
            <Card key={item.id} className="shadow-sm">
              <CardHeader className="space-y-3 pb-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground">
                    <Icon className="size-4" />
                  </div>
                  <Badge variant="outline">{meta.label}</Badge>
                </div>
                <div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription className="mt-1">عنصر ضمن نموذج العمل</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {item.content ? (
                  <p className="line-clamp-4 text-sm leading-6 text-muted-foreground">{item.content}</p>
                ) : (
                  <div className="rounded-lg bg-muted/40 p-4 text-center text-sm text-muted-foreground">
                    لا توجد بيانات بعد
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
