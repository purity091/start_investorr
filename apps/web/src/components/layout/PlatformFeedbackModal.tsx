import React, { useState } from 'react';
import {
  CheckCircle2,
  Lightbulb,
  MessageSquarePlus,
  Send,
  Sparkles,
  Star,
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,  DialogDescription,
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
  { id: 'feature', label: '💡 ميزة جديدة أو فكرة مبتكرة' },
  { id: 'ui', label: '🎨 تحسين الواجهة وتجربة المستخدم' },
  { id: 'performance', label: '⚡ تسريع وتحسين الأداء' },
  { id: 'bug', label: '🛠️ الإبلاغ عن ملاحظة فنية' },
  { id: 'data', label: '📊 طلب بيانات أو قطاعات جديدة' },
  { id: 'general', label: '💬 رأي عام أو ملاحظة' },
];

// WhatsApp recipient number for platform suggestions
const WHATSAPP_PHONE_NUMBER = '966500000000';

export const PlatformFeedbackModal: React.FC<PlatformFeedbackModalProps> = ({
  open,
  onOpenChange,
  userName = '',
}) => {
  const [name, setName] = useState(userName);
  const [feedbackType, setFeedbackType] = useState('feature');
  const [rating, setRating] = useState<number>(5);
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    const selectedTypeObj = FEEDBACK_TYPES.find(t => t.id === feedbackType);
    const typeLabel = selectedTypeObj ? selectedTypeObj.label : feedbackType;

    const formattedMessage = [
      '💡 *اقتراح جديد لمنصة استثمر*',
      '',
      `👤 *الاسم:* ${name.trim() || 'مستثمر بالمنصة'}`,
      `📌 *نوع الاقتراح:* ${typeLabel}`,
      `⭐ *التقييم:* ${rating} من 5 نجوم`,
      '',
      '📝 *تفاصيل الاقتراح:*',
      details.trim(),
      '',
      '--------------------------------',
      '🌐 تم الإرسال عبر منصة استثمر لرواد الأعمال',
    ].join('\n');

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_NUMBER}&text=${encodeURIComponent(formattedMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);

    setTimeout(() => {
      onOpenChange(false);
      setIsSubmitted(false);
      setDetails('');
    }, 2200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl border-border bg-background p-6 shadow-xl" dir="rtl">
        <DialogHeader className="space-y-2 text-right">
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
              <Lightbulb className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                شاركنا اقتراحك لتطوير المنصة
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[11px]">
                  <Sparkles className="size-3 me-1" /> مباشر
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                رأيك واقتراحاتك تساهم مباشرة في إضافة ميزات جديدة وتطوير تجربة المنصة.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
            <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
              <CheckCircle2 className="size-8" />
            </div>
            <h3 className="text-base font-bold text-foreground">تم توجيه اقتراحك إلى واتساب بنجاح!</h3>
            <p className="text-xs text-muted-foreground max-w-xs">
              شكراً لمساهمتك القيمة في تطوير منصة استثمر. يمكنك متابعة الرسالة مباشرة عبر الواتساب.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {/* Name Input */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-semibold text-foreground">اسمك (اختياري)</label>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="أدخل اسمك أو صفك في المنصة..."
                className="h-9 text-xs rounded-xl border-border bg-background"
              />
            </div>

            {/* Feedback Type Selection */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-semibold text-foreground">نوع الاقتراح</label>
              <div className="grid grid-cols-2 gap-2">
                {FEEDBACK_TYPES.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFeedbackType(type.id)}
                    className={`flex items-center gap-1.5 rounded-xl border p-2 text-right text-xs font-medium transition-all ${
                      feedbackType === type.id
                        ? 'border-amber-500 bg-amber-50/60 text-amber-950 font-bold ring-2 ring-amber-500/20'
                        : 'border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <span className="truncate">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Stars */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-semibold text-foreground">تقييمك الحالي لتجربة المنصة</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`size-5 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground/40'
                      }`}
                    />
                  </button>
                ))}
                <span className="ms-2 text-xs font-bold text-amber-600">{rating} / 5</span>
              </div>
            </div>

            {/* Details Textarea */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-semibold text-foreground">
                تفاصيل الاقتراح <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={details}
                onChange={e => setDetails(e.target.value)}
                required
                rows={3}
                placeholder="اكتب اقتراحك بالتفصيل هنا... ما الذي تود تحسينه أو إضافته إلى المنصة؟"
                className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-9 text-xs rounded-xl"
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                variant="default"
                size="sm"
                disabled={!details.trim()}
                className="h-9 gap-2 text-xs rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 shadow-sm"
              >
                <Send className="size-3.5" />
                إرسال عبر الواتساب
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
