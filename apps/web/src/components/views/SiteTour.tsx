import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface TourStep {
  targetId: string;
  title: string;
  content: string;
  position: 'left' | 'bottom' | 'center';
  desktopOnly?: boolean;
  mobileOnly?: boolean;
}

const ALL_STEPS: TourStep[] = [
  {
    targetId: 'tour-site-tour-trigger-header',
    title: 'الجولة الشاملة',
    content: 'من هنا يستطيع المستخدم إعادة تشغيل الجولة التعريفية في أي وقت ومراجعة مناطق المنصة الأساسية.',
    position: 'bottom',
  },
  {
    targetId: 'tour-home',
    title: 'الرئيسية',
    content: 'نقطة البداية لفهم المنصة والانتقال إلى مسارات بناء دراسة الجدوى واستكشاف السوق.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-projects',
    title: 'مشاريعي',
    content: 'مساحة مراجعة المشاريع، حالتها، وآخر نقطة عمل يمكن العودة إليها بسرعة.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-new-plan',
    title: 'بناء دراسة جدوى مشروع',
    content: 'بداية رحلة تحويل الفكرة إلى دراسة منظمة عبر النموذج السهل، الاحترافي، MIT 24 Steps، أو BMC.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-market-discovery',
    title: 'استكشاف قطاعات السوق',
    content: 'قسم مخصص لفهم القطاعات، قراءة اللوحات السوقية، وبناء تصور قبل اتخاذ قرار المشروع.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-problem-engine',
    title: 'المشاكل والفرص',
    content: 'قاعدة بيانات تعرض مشاكل وفرص السوق بطريقة تساعد المستخدم على اختيار فرصة قابلة للدراسة.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-unicorn',
    title: 'رادار اليونيكورن',
    content: 'أداة لمقارنة الفكرة بمعايير النمو العالي وقابلية التوسع والتميّز.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-bmc',
    title: 'نموذج العمل BMC',
    content: 'تحويل الفكرة إلى نموذج عمل واضح يشرح العملاء، القيمة، القنوات، الإيرادات، والتكاليف.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-brand',
    title: 'استوديو الهوية البصرية',
    content: 'مساحة تحديد عناصر الهوية البصرية للمشروع وتجهيز brief قابل للتسليم للمصمم.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-workspace',
    title: 'مساحة المشروع',
    content: 'المساحة التشغيلية التي تجمع المشروع الحالي، المرحلة، عناصر التنفيذ، والمراجعة.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-tasks',
    title: 'المهام',
    content: 'متابعة الأولويات اليومية والمواعيد المرتبطة بتقدم المشروع.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-notifications',
    title: 'الإشعارات',
    content: 'مركز يعرض آخر التحديثات والتنبيهات التي تحتاج متابعة من المستخدم.',
    position: 'bottom',
  },
  {
    targetId: 'tour-profile-menu',
    title: 'الحساب وبوابة المشترك',
    content: 'من قائمة الحساب يصل المستخدم إلى ملفه الشخصي، الإعدادات، وبوابة إدارة الاشتراك.',
    position: 'bottom',
  },
  {
    targetId: 'tour-mobile-bottom-nav',
    title: 'التنقل على الجوال',
    content: 'على الشاشات الصغيرة يظهر شريط تنقل مختصر للوصول السريع إلى أهم أقسام المنصة.',
    position: 'center',
    mobileOnly: true,
  },
  {
    targetId: 'tour-mobile-menu',
    title: 'القائمة المحمولة',
    content: 'القائمة المحمولة تجمع روابط المنصة الكاملة عندما يحتاج المستخدم إلى كل الخيارات.',
    position: 'center',
    mobileOnly: true,
  },
];

interface SiteTourProps {
  onComplete: () => void;
  onSkip: () => void;
}

const SiteTour: React.FC<SiteTourProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [isFinished, setIsFinished] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const tourSteps = useMemo(() => {
    const mobile = window.innerWidth < 1024;
    return ALL_STEPS.filter((step) => (mobile ? !step.desktopOnly : !step.mobileOnly));
  }, []);

  const step = tourSteps[currentStep];

  useEffect(() => {
    if (!step) return;

    const updatePosition = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      const element = document.getElementById(step.targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        window.setTimeout(() => {
          const rect = element.getBoundingClientRect();
          setTooltipPos({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
        }, 260);
      } else {
        setTooltipPos({
          top: window.innerHeight / 2 - 40,
          left: window.innerWidth / 2 - 120,
          width: 240,
          height: 80,
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [currentStep, step]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep((value) => value + 1);
      return;
    }
    setIsFinished(true);
  };

  if (!step) return null;

  if (isFinished) {
    return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/20 p-4 sm:p-5 backdrop-blur-sm" dir="rtl">
        <div className="w-full max-w-xl rounded-xl bg-background p-4 sm:p-6 text-center shadow-lg ring-1 ring-border">
          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-lg bg-muted text-foreground">
            <CheckCircle2 className="size-6 text-emerald-600" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">اكتملت الجولة التعريفية</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
            راجعت الآن المسارات الرئيسية في المنصة: الرئيسية، المشاريع، بناء دراسة الجدوى، الاستكشاف، الهوية، الحساب، والإشعارات.
          </p>
          <Button onClick={onComplete} className="mt-6 w-full sm:w-fit">ابدأ استخدام المنصة</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000]" dir="rtl">
      <div
        className="pointer-events-none absolute z-[10001] rounded-xl ring-2 ring-ring/70 transition-all duration-300"
        style={{
          top: tooltipPos.top - 6,
          left: tooltipPos.left - 6,
          width: tooltipPos.width + 12,
          height: tooltipPos.height + 12,
          opacity: tooltipPos.width > 0 ? 1 : 0,
        }}
      />

      <div
        ref={tooltipRef}
        className={`pointer-events-auto fixed z-[10002] transition-all duration-300 lg:absolute ${isMobile ? 'bottom-20 left-1/2 -translate-x-1/2' : ''}`}
        style={
          !isMobile
            ? {
                top: step.position === 'center' ? tooltipPos.top + tooltipPos.height + 18 : tooltipPos.top + tooltipPos.height / 2,
                left: step.position === 'left' ? tooltipPos.left - 24 : tooltipPos.left + tooltipPos.width / 2,
                transform: step.position === 'left' ? 'translate(-100%, -50%)' : 'translate(-50%, 0)',
                opacity: tooltipPos.width > 0 ? 1 : 0,
              }
            : { opacity: tooltipPos.width > 0 ? 1 : 0 }
        }
      >
        <div className="relative flex w-[calc(100vw-32px)] flex-col rounded-xl bg-background p-4 sm:p-5 text-right shadow-lg ring-1 ring-border lg:w-[390px]">
          {!isMobile && step.position === 'left' && (
            <div className="absolute -right-2 top-1/2 size-4 -translate-y-1/2 rotate-45 bg-background ring-1 ring-border" />
          )}

          <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground">
                <Sparkles className="size-4" />
              </div>
              <div>
                <Badge variant="outline" className="mb-1">الجولة</Badge>
                <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
              </div>
            </div>
            <Button onClick={onSkip} variant="ghost" size="icon-sm">
              <X className="size-4" />
            </Button>
          </div>

          <p className="relative z-10 mb-5 text-sm leading-7 text-muted-foreground">{step.content}</p>

          <div className="relative z-10 flex items-center justify-between border-t border-border pt-4">
            <span className="text-xs text-muted-foreground">{currentStep + 1} / {tourSteps.length}</span>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setCurrentStep((value) => Math.max(0, value - 1))}
                disabled={currentStep === 0}
                variant="outline"
                size="icon-sm"
              >
                <ChevronRight className="size-4" />
              </Button>
              <Button onClick={handleNext} size="sm">
                {currentStep === tourSteps.length - 1 ? 'إنهاء الجولة' : 'الخطوة التالية'}
                <ChevronLeft className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteTour;
