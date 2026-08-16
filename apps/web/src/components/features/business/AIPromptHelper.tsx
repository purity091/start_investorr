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
import { cn } from '@/lib/utils';
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
  Maximize2,
  Minimize2,
  X,
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

export function ClaudeLogo({ className = 'size-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.04 15.41a.8.8 0 0 0 .96.65l5.12-1.03a.8.8 0 0 0 .63-.73V7.2a.8.8 0 0 0-1.12-.73L4.51 9.04a.8.8 0 0 0-.47.74v5.63zm15.92-5.63l-5.12-2.57a.8.8 0 0 0-1.12.73v7.1a.8.8 0 0 0 .63.73l5.12 1.03a.8.8 0 0 0 .96-.65V9.78a.8.8 0 0 0-.47-.74zM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
    </svg>
  );
}

export function DeepSeekLogo({ className = 'size-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-7a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
    </svg>
  );
}

export function GeminiLogo({ className = 'size-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 23c0-6.075-4.925-11-11-11 6.075 0 11-4.925 11-11 0 6.075 4.925 11 11 11-6.075 0-11 4.925-11 11z"/>
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
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPasteFullScreen, setIsPasteFullScreen] = useState(false);
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

  const handleOpenAIModel = async (urlTemplate: string) => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // silent fallback
    }
    const targetUrl = urlTemplate.replace('{prompt}', encodeURIComponent(generatedPrompt));
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
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
        <DialogContent
          showCloseButton={false}
          className={cn(
            "p-0 overflow-hidden transition-all duration-200 flex flex-col border-0 shadow-2xs",
            isFullScreen
              ? "w-[96vw] max-w-[96vw] h-[92vh] sm:max-w-[94vw] max-h-[90vh]"
              : "w-[94vw] sm:max-w-[520px] max-h-[88vh]"
          )}
          dir="rtl"
        >
          {/* Header with clean non-overlapping action controls */}
          <DialogHeader className="border-b border-border p-3 sm:p-4 text-right bg-slate-50/50 shrink-0">
            <div className="flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
                  <ChatGPTLogo className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <DialogTitle className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                    تعليمة الذكاء الاصطناعي ({sectionTitle})
                  </DialogTitle>
                  <DialogDescription className="text-[10px] sm:text-[11px] text-slate-500 truncate mt-0.5">
                    قم بنسخ التعليمة أو فتحها مباشرة في النموذج المطلوب
                  </DialogDescription>
                </div>
              </div>

              {/* Action Controls Group (Fullscreen & Close) */}
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  title={isFullScreen ? "استعادة الحجم" : "عرض ملء الشاشة"}
                  className="size-7 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60"
                >
                  {isFullScreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setPromptModalOpen(false)}
                  title="إغلاق"
                  className="size-7 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60"
                >
                  <X className="size-3.5" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Body */}
          <div className="p-3 sm:p-4 space-y-2.5 flex-1 flex flex-col min-h-0 overflow-y-auto">
            <div className="flex items-center justify-between text-xs shrink-0">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200/60 font-mono text-[10px] px-2 py-0.5">
                JSON Standard Output
              </Badge>
              <span className="text-slate-500 text-[11px] font-medium truncate max-w-[200px]">{projectName}</span>
            </div>

            <div className={cn("relative flex-1 flex flex-col min-h-0", isFullScreen ? "h-full" : "")}>
              <Textarea
                readOnly
                value={generatedPrompt}
                className={cn(
                  "font-mono text-[11px] leading-relaxed bg-slate-50/70 resize-none text-right dir-rtl p-3 border-slate-200/80 rounded-xl text-slate-800",
                  isFullScreen ? "flex-1 min-h-[380px] text-sm leading-loose" : "min-h-[150px] max-h-[220px]"
                )}
              />
              <Button
                type="button"
                size="sm"
                onClick={handleCopyPrompt}
                className="absolute top-2.5 left-2.5 gap-1.5 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 h-7 px-2.5 rounded-lg shadow-2xs z-10"
              >
                {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                <span>{copied ? 'تم النسخ' : 'نسخ النص'}</span>
              </Button>
            </div>

            {/* Standalone AI Direct Launch Bar */}
            <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between gap-2 overflow-x-auto whitespace-nowrap flex-nowrap shrink-0">
              <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 shrink-0 me-1">
                <ExternalLink className="size-3.5 text-emerald-600" />
                <span>فتح مباشرة في:</span>
              </span>

              <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
                {/* ChatGPT */}
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={() => handleOpenAIModel('https://chatgpt.com/?q={prompt}')}
                  title="فتح في ChatGPT مع التعليمة تلقائياً"
                  className="gap-1.5 font-bold text-[11px] border-emerald-200 text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100/80 h-7 rounded-lg px-2.5 shrink-0"
                >
                  <ChatGPTLogo className="size-3.5 text-emerald-600 shrink-0" />
                  <span>ChatGPT</span>
                </Button>

                {/* Claude */}
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={() => handleOpenAIModel('https://claude.ai/new?q={prompt}')}
                  title="فتح في Claude مع التعليمة تلقائياً"
                  className="gap-1.5 font-bold text-[11px] border-amber-200 text-amber-800 bg-amber-50/80 hover:bg-amber-100/80 h-7 rounded-lg px-2.5 shrink-0"
                >
                  <ClaudeLogo className="size-3.5 text-amber-600 shrink-0" />
                  <span>Claude</span>
                </Button>

                {/* DeepSeek */}
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={() => handleOpenAIModel('https://chat.deepseek.com/?q={prompt}')}
                  title="فتح في DeepSeek مع التعليمة تلقائياً"
                  className="gap-1.5 font-bold text-[11px] border-blue-200 text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 h-7 rounded-lg px-2.5 shrink-0"
                >
                  <DeepSeekLogo className="size-3.5 text-blue-600 shrink-0" />
                  <span>DeepSeek</span>
                </Button>

                {/* Gemini */}
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={() => handleOpenAIModel('https://gemini.google.com/app?q={prompt}')}
                  title="فتح في Gemini مع التعليمة تلقائياً"
                  className="gap-1.5 font-bold text-[11px] border-purple-200 text-purple-700 bg-purple-50/80 hover:bg-purple-100/80 h-7 rounded-lg px-2.5 shrink-0"
                >
                  <GeminiLogo className="size-3.5 text-purple-600 shrink-0" />
                  <span>Gemini</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Standalone Dialog Footer */}
          <DialogFooter className="border-t border-border p-3 sm:p-3.5 bg-slate-50/40 flex flex-row items-center justify-between gap-2 shrink-0">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setPromptModalOpen(false);
                setPasteModalOpen(true);
              }}
              className="font-bold text-xs gap-1.5 h-8 bg-slate-100 hover:bg-slate-200 text-slate-800"
            >
              <ClipboardPaste className="size-3.5" />
              <span>لصق الإجابة هنا</span>
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setPromptModalOpen(false)}
              className="h-8 text-xs font-medium text-slate-500 hover:text-slate-800"
            >
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal 2: Paste & Apply AI Answer Dialog */}
      <Dialog open={pasteModalOpen} onOpenChange={setPasteModalOpen}>
        <DialogContent
          showCloseButton={false}
          className={cn(
            "p-0 overflow-hidden transition-all duration-200 flex flex-col border-0 shadow-2xs",
            isPasteFullScreen
              ? "w-[96vw] max-w-[96vw] h-[92vh] sm:max-w-[94vw] max-h-[90vh]"
              : "w-[94vw] sm:max-w-[480px] max-h-[88vh]"
          )}
          dir="rtl"
        >
          <DialogHeader className="border-b border-border p-3 sm:p-4 text-right bg-slate-50/50 shrink-0">
            <div className="flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 shrink-0">
                  <ClipboardPaste className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <DialogTitle className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                    لصق واستخراج الإجابة
                  </DialogTitle>
                  <DialogDescription className="text-[10px] sm:text-[11px] text-slate-500 truncate mt-0.5">
                    الصق مخرج الذكاء الاصطناعي لاستخراج النص وتغذية الدراسة تلقائياً
                  </DialogDescription>
                </div>
              </div>

              {/* Action Controls Group (Fullscreen & Close) */}
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPasteFullScreen(!isPasteFullScreen)}
                  title={isPasteFullScreen ? "استعادة الحجم" : "عرض ملء الشاشة"}
                  className="size-7 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60"
                >
                  {isPasteFullScreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setPasteModalOpen(false)}
                  title="إغلاق"
                  className="size-7 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60"
                >
                  <X className="size-3.5" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="p-3.5 sm:p-4 space-y-2.5 flex-1 flex flex-col min-h-0 overflow-y-auto">
            <div className="flex items-center justify-between shrink-0">
              <label className="text-[11px] font-bold text-slate-700">مخرج الذكاء الاصطناعي (JSON أو نص)</label>
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={handleClipboardPasteDirect}
                className="text-[11px] text-indigo-600 hover:text-indigo-700 gap-1 font-bold h-6 px-2"
              >
                <ClipboardPaste className="size-3" />
                <span>لصق سريح</span>
              </Button>
            </div>

            <Textarea
              value={pastedText}
              onChange={(e) => {
                setPastedText(e.target.value);
                setParseError(null);
              }}
              placeholder={`الصق المخرج هنا...`}
              className={cn(
                "font-mono text-xs leading-relaxed border-slate-200/80 rounded-xl text-right dir-rtl p-3 bg-slate-50/40 text-slate-800",
                isPasteFullScreen ? "flex-1 min-h-[380px] text-sm leading-loose resize-none" : "min-h-[150px] max-h-[240px] resize-y"
              )}
            />

            {parseError && (
              <div className="flex items-center gap-1.5 text-xs text-destructive bg-destructive/10 p-2.5 rounded-lg border border-destructive/20 font-medium shrink-0">
                <AlertCircle className="size-4 shrink-0" />
                <span>{parseError}</span>
              </div>
            )}
          </div>

          <DialogFooter className="border-t border-border p-3 sm:p-3.5 bg-slate-50/40 flex flex-col sm:flex-row items-center justify-end gap-2 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPasteModalOpen(false)}
              className="w-full sm:w-auto text-xs font-bold h-8 text-slate-600"
            >
              إلغاء
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleParseAndApply}
              disabled={!pastedText.trim()}
              className="w-full sm:w-auto font-bold text-xs gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white h-8"
            >
              <Sparkles className="size-3.5" />
              <span>تطبيق الإجابة في الدراسة</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
