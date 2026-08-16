import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/Badge';
import {
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  ClipboardPaste,
  Bot,
  AlertCircle,
  Lightbulb,
  ShieldAlert,
} from 'lucide-react';

export function ChatGPTLogo({ className = 'size-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7944.7944 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.535-3.0137l.142.0852 4.783 2.7582a.7707.7707 0 0 0 .7855 0l5.8364-3.3693v2.332a.0805.0805 0 0 1-.0332.0615l-4.8399 2.7914a4.4945 4.4945 0 0 1-6.1388-1.6453zm-1.1565-10.428a4.4755 4.4755 0 0 1 2.3414-1.973l-.0047.161-1.002 5.4984v.0047a.7849.7849 0 0 0 .3927.6813l5.8364 3.3693-2.0153 1.1685a.0758.0758 0 0 1-.0711 0l-4.8399-2.7914a4.4945 4.4945 0 0 1-.6375-6.1189zm15.8675 3.0374l-5.8364-3.3693 2.0153-1.1638a.0758.0758 0 0 1 .0711 0l4.8399 2.7914a4.4945 4.4945 0 0 1-.6754 8.0967v-.0047l-4.7783-2.7582a.7802.7802 0 0 0-.7807 0zm2.0105-3.0232l-.142-.0852-4.7735-2.7582a.7707.7707 0 0 0-.7855 0l-5.8364 3.3693v-2.332a.0805.0805 0 0 1 .0332-.0615l4.8399-2.7914a4.4945 4.4945 0 0 1 6.6502 4.659zm-12.642-4.9904a4.4755 4.4755 0 0 1 2.8764 1.0408l-.1419.0804-4.7783 2.7582a.7944.7944 0 0 0-.3927.6813v6.7369l-2.02-1.1686a.071.071 0 0 1-.038-.052v-5.5826a4.504 4.504 0 0 1 4.4945-4.4944zm1.9443 6.9406l3.0425-1.758 3.0426 1.758v3.516l-3.0426 1.758-3.0425-1.758z"/>
    </svg>
  );
}

export interface AIPromptHelperProps {
  sectionTitle: string;
  questionText: string;
  projectName?: string;
  projectSector?: string;
  targetMarket?: string;
  customerType?: string;
  previousAnswersSummary?: string;
  onApplyAnswer: (answer: string) => void;
  compact?: boolean;
}

export const AIPromptHelper: React.FC<AIPromptHelperProps> = ({
  sectionTitle,
  questionText,
  projectName = 'مشروع استثماري',
  projectSector = 'خدمات وتجارة رقمية',
  targetMarket,
  customerType,
  previousAnswersSummary,
  onApplyAnswer,
  compact = false,
}) => {
  const [promptModalOpen, setPromptModalOpen] = useState(false);
  const [pasteModalOpen, setPasteModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);

  const resolvedTargetMarket = targetMarket || 'المملكة العربية السعودية ودول الخليج العربي';

  // Formulate structured prompt targeting JSON output with smart fallback assumptions
  const generatedPrompt = `أنت مستشار استثماري متمكن وخبير في التخطيط المالي ودراسات الجدوى الاقتصادية.
المطلوب تقديم تحليل احترافي ودقيق وعملي لإضافته مباشرة داخل دراسة الجدوى:

- اسم المشروع: "${projectName}"
- القطاع/المجال: "${projectSector}"
- السوق المستهدف والمنطقة: "${resolvedTargetMarket}"
${customerType ? `- شريحة العملاء: "${customerType}"` : ''}
- قسم الدراسة: "${sectionTitle}"
- السؤال/العنصر المراد تحليله: "${questionText}"
${previousAnswersSummary ? `- السياق السابق المكتمل في الدراسة:\n${previousAnswersSummary}` : ''}

توجيهات هامة للتحليل (Smart Strategic Directives):
1. اعتمد أسساً استثمارية واقعية ومؤشرات ملموسة متناسبة مع الطبيعة التشغيلية والسوق المستهدف.
2. إذا كانت البيانات الأولية المدخلة قصيرة أو غير مكتملة، قم بافتراض بيئة عمل ريادية نموذجية تخدم سوق ${resolvedTargetMarket} واذكر هذا الافتراض الاستثماري ضمن التحليل بصياغة راقية.

تنبيه إلزام التنسيق (Strict JSON Output Requirement):
يرجى إرجاع الإجابة بتنسيق JSON حصراً لتغذية النظام المالي بالصيغة التالية دون أي مقدمات أو نصوص خارج الكود:

\`\`\`json
{
  "answer": "اكتب هنا الإجابة المفصلة والمعمقة باللغة العربية بأسلوب استثماري رصين ومناسب لدراسة الجدوى...",
  "key_metrics": ["مؤشر 1", "مؤشر 2"],
  "recommendation": "توصية تنفيذية قصيرة"
}
\`\`\``;

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleParseAndApply = () => {
    setParseError(null);
    if (!pastedText.trim()) {
      setParseError('يرجى لصق النص المنسوخ من ChatGPT أولاً.');
      return;
    }

    let cleaned = pastedText.trim();

    // Clean markdown wrappers if present
    if (cleaned.includes('```')) {
      cleaned = cleaned.replace(/```json/gi, '').replace(/```/g, '').trim();
    }

    try {
      // 1. Direct JSON Parse
      const parsed = JSON.parse(cleaned);
      if (parsed && typeof parsed === 'object') {
        const resultText = parsed.answer || parsed.response || parsed.result || JSON.stringify(parsed, null, 2);
        onApplyAnswer(resultText);
        setPasteModalOpen(false);
        setPastedText('');
        return;
      }
    } catch {
      // 2. Fuzzy Regex Match for JSON "answer" key if user copied partial string
      const answerMatch = cleaned.match(/"answer"\s*:\s*"([\s\S]*?)"\s*(?:,|\})/);
      if (answerMatch && answerMatch[1]) {
        const cleanAnswer = answerMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
        onApplyAnswer(cleanAnswer);
        setPasteModalOpen(false);
        setPastedText('');
        return;
      }

      // 3. Fallback: Clean raw text
      onApplyAnswer(cleaned);
      setPasteModalOpen(false);
      setPastedText('');
    }
  };

  const handleClipboardPasteDirect = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setPastedText(text);
      }
    } catch {
      // Permission denied or unsupported
    }
  };

  return (
    <div className="flex items-center gap-1.5 flex-wrap my-1">
      {/* Button 1: Open Prompt Helper */}
      <Button
        type="button"
        variant="outline"
        size={compact ? "xs" : "sm"}
        onClick={() => setPromptModalOpen(true)}
        className="gap-1.5 font-bold text-xs border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 h-7 rounded-lg"
      >
        <ChatGPTLogo className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span>توليد تعليمة ChatGPT (JSON)</span>
      </Button>

      {/* Button 2: Paste AI Answer */}
      <Button
        type="button"
        variant="outline"
        size={compact ? "xs" : "sm"}
        onClick={() => setPasteModalOpen(true)}
        className="gap-1.5 font-bold text-xs border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 h-7 rounded-lg"
      >
        <ClipboardPaste className="size-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
        <span>لصق إجابة AI واستخراجها</span>
      </Button>

      {/* Modal 1: Copy Prompt Dialog */}
      <Dialog open={promptModalOpen} onOpenChange={setPromptModalOpen}>
        <DialogContent className="sm:max-w-[580px] p-0 overflow-hidden" dir="rtl">
          <DialogHeader className="border-b border-border p-4 sm:p-5 text-right bg-muted/20">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                <ChatGPTLogo className="size-5" />
              </div>
              <div>
                <DialogTitle className="text-base font-extrabold text-foreground">
                  تعليمة ChatGPT المنضبطة (Structured AI Prompt)
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  انسخ هذه التعليمة والصقها في ChatGPT للحصول على تحليل بتنسيق JSON يغذي الدراسة مباشرة.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="p-4 sm:p-5 space-y-3.5">
            {/* Smart Context Guidance Banner */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
              <Lightbulb className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold block">تطبيق الافتراضات الذكية تلقائياً:</span>
                <p className="leading-relaxed text-[11px] opacity-90">
                  إذا لم تكن قد حددت السوق المستهدف بعد، تم تزويد التعليمة بافتراض تلقائي لسوق ({resolvedTargetMarket}) لضمان إجابة دقيقة من الذكاء الاصطناعي.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono">
                JSON Format Output
              </Badge>
              <span className="text-muted-foreground font-medium">قسم: {sectionTitle}</span>
            </div>

            <div className="relative">
              <Textarea
                readOnly
                value={generatedPrompt}
                className="font-mono text-xs leading-relaxed bg-muted/40 min-h-[220px] resize-none text-right dir-rtl p-3 border-border/80 rounded-xl"
              />
              <Button
                type="button"
                size="sm"
                onClick={handleCopyPrompt}
                className="absolute top-2.5 left-2.5 gap-1.5 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3 rounded-lg shadow-2xs"
              >
                {copied ? <Check className="size-3.5 text-emerald-300" /> : <Copy className="size-3.5" />}
                <span>{copied ? 'تم نسخ التعليمة!' : 'نسخ التعليمة'}</span>
              </Button>
            </div>
          </div>

          <DialogFooter className="border-t border-border p-4 bg-muted/10 flex flex-col sm:flex-row items-center justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              asChild
              className="w-full sm:w-auto gap-2 font-bold text-xs border-emerald-600/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10 h-9"
            >
              <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer">
                <ChatGPTLogo className="size-4 shrink-0" />
                <span>الانتقال إلى ChatGPT</span>
                <ExternalLink className="size-3.5" />
              </a>
            </Button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => {
                  setPromptModalOpen(false);
                  setPasteModalOpen(true);
                }}
                className="w-full sm:w-auto font-bold text-xs gap-1.5 h-9"
              >
                <ClipboardPaste className="size-3.5" />
                <span>لصق الإجابة الآن</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setPromptModalOpen(false)}
                className="h-9 text-xs"
              >
                إغلاق
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal 2: Paste & Apply AI Answer Dialog */}
      <Dialog open={pasteModalOpen} onOpenChange={setPasteModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden" dir="rtl">
          <DialogHeader className="border-b border-border p-4 sm:p-5 text-right bg-muted/20">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600">
                <ClipboardPaste className="size-5" />
              </div>
              <div>
                <DialogTitle className="text-base font-extrabold text-foreground">
                  لصق واستخراج إجابة الذكاء الاصطناعي
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  الصق مخرج ChatGPT المنسوخ (JSON أو نص) لاستخراج الإجابة وتغذية الخلية تلقائياً.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground">نص أو كود الذكاء الاصطناعي (JSON)</label>
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={handleClipboardPasteDirect}
                className="text-xs text-indigo-600 dark:text-indigo-400 gap-1 font-bold h-6 px-2"
              >
                <ClipboardPaste className="size-3" />
                <span>لصق من الحافظة</span>
              </Button>
            </div>

            <Textarea
              value={pastedText}
              onChange={(e) => {
                setPastedText(e.target.value);
                setParseError(null);
              }}
              placeholder={`الصق الإجابة هنا، مثال:\n{\n  "answer": "تستهدف المنصة التشاركية قطاع الشركات والمؤسسات الصغيرة..."\n}`}
              className="font-mono text-xs leading-relaxed min-h-[160px] resize-y text-right dir-rtl p-3 border-border rounded-xl"
            />

            {parseError && (
              <div className="flex items-center gap-1.5 text-xs text-destructive bg-destructive/10 p-2.5 rounded-lg border border-destructive/20 font-medium">
                <AlertCircle className="size-4 shrink-0" />
                <span>{parseError}</span>
              </div>
            )}
          </div>

          <DialogFooter className="border-t border-border p-4 bg-muted/10 flex flex-col sm:flex-row items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPasteModalOpen(false)}
              className="w-full sm:w-auto text-xs font-bold"
            >
              إلغاء
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleParseAndApply}
              disabled={!pastedText.trim()}
              className="w-full sm:w-auto font-bold text-xs gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Sparkles className="size-3.5" />
              <span>استخراج الإجابة وتطبيقها</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
