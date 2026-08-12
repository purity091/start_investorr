import React, { useState } from 'react';
import { CheckCircle2, MessageSquarePlus, Send } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/Input';

interface PlatformFeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
}

const FEEDBACK_TYPES = [
  { id: 'feature', label: 'ميزة جديدة أو فكرة' },
  { id: 'ui', label: 'تحسين واجهة المستخدم' },
  { id: 'performance', label: 'الأداء والتصفح' },
  { id: 'bug', label: 'ملاحظة فنية' },
  { id: 'data', label: 'بيانات وقطاعات' },
  { id: 'general', label: 'ملاحظات عامة' },
];

const WHATSAPP_PHONE_NUMBER = '963936638280';

export const PlatformFeedbackModal: React.FC<PlatformFeedbackModalProps> = ({
  open,
  onOpenChange,
  userName = '',
}) => {
  const [name, setName] = useState(userName);
  const [feedbackType, setFeedbackType] = useState('feature');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    const selectedTypeObj = FEEDBACK_TYPES.find(t => t.id === feedbackType);
    const typeLabel = selectedTypeObj ? selectedTypeObj.label : feedbackType;

    const formattedMessage = [
      '📌 *اقتراح للمنصة*',
      '',
      `👤 *الاسم:* ${name.trim() || 'مستثمر بالمنصة'}`,
      `🏷️ *النوع:* ${typeLabel}`,
      '',
      '📝 *التفاصيل:*',
      details.trim(),
      '',
      '--------------------------------',
      '🌐 مرسل عبر منصة استثمر',
    ].join('\n');

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_NUMBER}&text=${encodeURIComponent(formattedMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);

    setTimeout(() => {
      onOpenChange(false);
      setIsSubmitted(false);
      setDetails('');
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-xl border border-border bg-card p-6 shadow-sm" dir="rtl">
        <DialogHeader className="space-y-1.5 text-right">
          <div className="flex items-center gap-2">
            <MessageSquarePlus className="size-5 text-foreground shrink-0" />
            <DialogTitle className="text-base font-semibold text-foreground">
              اقتراحات وملاحظات المنصة
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            تواصل مباشرة مع فريق التطوير لتنمية وتحديث ميزات المنصة.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted text-foreground">
              <CheckCircle2 className="size-6 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">تم فتح واتساب لإرسال الاقتراح</h3>
            <p className="text-xs text-muted-foreground">
              شكراً لملاحظتك، تساهم اقتراحاتك في تحسين المنصة باستمرار.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-medium text-foreground">الاسم (اختياري)</label>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="أدخل اسمك..."
                className="h-9 text-xs rounded-md border-border bg-background"
              />
            </div>

            <div className="space-y-1.5 text-right">
              <label className="text-xs font-medium text-foreground">نوع الاقتراح</label>
              <div className="grid grid-cols-2 gap-1.5">
                {FEEDBACK_TYPES.map(type => {
                  const isSelected = feedbackType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFeedbackType(type.id)}
                      className={`flex items-center justify-center rounded-md border px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary font-medium'
                          : 'border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <span className="truncate">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5 text-right">
              <label className="text-xs font-medium text-foreground">
                تفاصيل الاقتراح <span className="text-destructive">*</span>
              </label>
              <textarea
                value={details}
                onChange={e => setDetails(e.target.value)}
                required
                rows={4}
                placeholder="اكتب اقتراحك أو ملاحظتك هنا..."
                className="w-full rounded-md border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors resize-none"
              />
            </div>

            <DialogFooter className="pt-2 border-t border-border flex-row justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-8 text-xs"
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                variant="default"
                size="sm"
                disabled={!details.trim()}
                className="h-8 gap-1.5 text-xs font-medium"
              >
                <Send className="size-3.5" />
                إرسال عبر الواتساب
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
