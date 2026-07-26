import React from 'react';
import { MessageCircleMore, Sparkles, X } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface StrategicSupportFloatProps {
  onOpenContact: () => void;
}

export const StrategicSupportFloat: React.FC<StrategicSupportFloatProps> = ({ onOpenContact }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="pointer-events-none fixed bottom-24 left-4 z-40 hidden xl:block 2xl:left-6">
      <div className="pointer-events-auto">
        {isOpen ? (
          <Card className="w-[320px] rounded-2xl border-border bg-background/98 shadow-lg backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 text-right">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/40 text-foreground">
                    <MessageCircleMore size={18} />
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="rounded-md text-[11px]">
                      الدعم الاستراتيجي
                    </Badge>
                    <div>
                      <p className="text-sm font-semibold text-foreground">تحتاج لخبرة استثمارية؟</p>
                      <p className="mt-1 text-xs leading-6 text-muted-foreground">
                        افتح محادثة سريعة مع المستشار لمراجعة الفكرة أو اختيار المسار الأنسب داخل المنصة.
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0 rounded-lg"
                  onClick={() => setIsOpen(false)}
                  aria-label="إخفاء الدعم"
                >
                  <X size={16} />
                </Button>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Button type="button" className="flex-1" onClick={onOpenContact}>
                  <Sparkles size={16} />
                  <span>ابدأ الدردشة</span>
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  إخفاء
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Button
            type="button"
            size="lg"
            className="h-14 rounded-full px-5 shadow-lg"
            onClick={() => setIsOpen(true)}
          >
            <MessageCircleMore size={18} />
            <span>الدعم الاستراتيجي</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default StrategicSupportFloat;
