import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  Sparkles,
  X,
} from 'lucide-react';

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
    content: 'من هنا يستطيع المستخدم إعادة تشغيل الجولة التعريفية في أي وقت ومراجعة كل مناطق المنصة الأساسية.',
    position: 'bottom',
  },
  {
    targetId: 'tour-home',
    title: 'الصفحة الرئيسية',
    content: 'هذه نقطة البداية: تقدم صورة عامة عن المنصة، القيمة الأساسية، والانتقال إلى أهم المسارات.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-projects',
    title: 'مشاريعي',
    content: 'هنا يعود المستخدم إلى جميع مشاريعه، يراجع الحالة، ويفتح آخر نقطة عمل بسرعة.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-new-plan',
    title: 'بناء مشروع',
    content: 'هذه بداية رحلة بناء المشروع من التوجه الأولي وحتى تحويله إلى مشروع واضح قابل للتنفيذ.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-market-discovery',
    title: 'اكتشاف السوق',
    content: 'هذا القسم مخصص لاكتشاف القطاعات، قراءة اللوحات السوقية، وفهم السياق قبل اتخاذ القرار.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-problem-engine',
    title: 'المشاكل والفرص',
    content: 'هنا ينتقل المستخدم من الاستكشاف العام إلى تشخيص الفجوات والفرص الحقيقية في السوق.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-unicorn',
    title: 'رادار اليونيكورن',
    content: 'هذا المسار يساعد على مقارنة الفكرة بمعايير النمو العالية ورؤية عناصر التوسع والتميز.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-hackathon',
    title: 'هاكاثون المستثمر',
    content: 'مساحة لتجميع الأفكار والتحديات في تجربة مركزة تساعد المستخدم على اختبار الفكرة بصيغة تنافسية.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-bmc',
    title: 'نموذج العمل',
    content: 'هنا يتم تحويل الفكرة إلى Business Model Canvas واضح يشرح القيمة والعملاء والقنوات والإيرادات.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-brand',
    title: 'استوديو الهوية',
    content: 'القسم المسؤول عن بناء هوية المشروع بصرياً من الألوان والخطوط وحتى تسليم brief للمصمم.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-workspace',
    title: 'مساحة المشروع',
    content: 'هذه هي المساحة التشغيلية التي تجمع المشروع الحالي، مرحلته، وعناصر التنفيذ والمتابعة.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-tasks',
    title: 'المهام والجدولة',
    content: 'من هنا يتابع المستخدم التنفيذ اليومي، الأولويات، والمواعيد المرتبطة بتقدم المشروع.',
    position: 'left',
    desktopOnly: true,
  },
  {
    targetId: 'tour-notifications',
    title: 'التنبيهات',
    content: 'مركز التنبيهات يعرض آخر التحديثات، الإشعارات المهمة، والأنشطة التي تحتاج متابعة.',
    position: 'bottom',
  },
  {
    targetId: 'tour-profile-menu',
    title: 'الحساب وبوابة العميل',
    content: 'من قائمة الحساب يصل المستخدم إلى ملفه الشخصي، مشاريعه، وبوابة العميل الخاصة بالاشتراك والإدارة.',
    position: 'bottom',
  },
  {
    targetId: 'tour-mobile-bottom-nav',
    title: 'الملاحة المحمولة',
    content: 'على الجوال، هذه الشريط هو الطريق الأسرع للتنقل بين استكشاف السوق، المشاريع، الفرص، والفكرة الجديدة.',
    position: 'center',
    mobileOnly: true,
  },
  {
    targetId: 'tour-mobile-menu',
    title: 'القائمة المحمولة',
    content: 'القائمة المحمولة تجمع الأقسام الكاملة للمنصة عندما يحتاج المستخدم الوصول إلى جميع الروابط على الشاشات الصغيرة.',
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
    return ALL_STEPS.filter((step) => {
      if (mobile) return !step.desktopOnly;
      return !step.mobileOnly;
    });
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
        setTimeout(() => {
          const rect = element.getBoundingClientRect();
          setTooltipPos({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          });
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

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((value) => value - 1);
    }
  };

  if (!step) return null;

  if (isFinished) {
    return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-5 sm:p-6 bg-slate-950/35 backdrop-blur-sm transition-all duration-500">
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 max-w-2xl w-full text-center shadow-[0_40px_100px_rgba(0,0,0,0.18)] border border-slate-200">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
            <CheckCircle2 size={34} className="sm:w-10 sm:h-10" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">أصبحت الجولة شاملة لكل المنصة</h2>
          <p className="text-slate-500 font-bold mb-8 sm:mb-10 leading-relaxed text-sm sm:text-base text-right">
            راجعت الآن المسارات الرئيسية: البداية، المشاريع، بناء المشروع، الاكتشاف، التحليل، الهوية، الحساب، والتنبيهات. هذا يعكس رحلة الاستخدام الكاملة التي سيستلمها المبرمج لاحقاً.
          </p>
          <button
            onClick={onComplete}
            className="w-full py-4 sm:py-5 bg-slate-950 text-white rounded-xl sm:rounded-2xl text-[14px] sm:text-[15px] font-black shadow-lg hover:bg-slate-800 active:scale-95 transition-all"
          >
            ابدأ استخدام المنصة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none">
      <div
        className="absolute z-[10001] border-[3px] border-blue-500/80 rounded-2xl transition-all duration-500 pointer-events-none shadow-[0_0_30px_rgba(59,130,246,0.24)]"
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
        className={`fixed lg:absolute z-[10002] pointer-events-auto transition-all duration-500 ${isMobile ? 'bottom-20 left-1/2 -translate-x-1/2' : ''}`}
        style={!isMobile ? {
          top: step.position === 'center' ? tooltipPos.top + tooltipPos.height + 18 : tooltipPos.top + tooltipPos.height / 2,
          left: step.position === 'left' ? tooltipPos.left - 24 : tooltipPos.left + tooltipPos.width / 2,
          transform: step.position === 'left' ? 'translate(-100%, -50%)' : 'translate(-50%, 0)',
          opacity: tooltipPos.width > 0 ? 1 : 0,
        } : {
          opacity: tooltipPos.width > 0 ? 1 : 0,
        }}
      >
        <div className="bg-white rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 w-[calc(100vw-32px)] lg:w-[390px] shadow-[0_30px_90px_rgba(0,0,0,0.18)] border border-slate-200 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/70 rounded-full blur-3xl -mr-16 -mt-16" />

          {!isMobile && step.position === 'left' && (
            <div className="absolute w-5 h-5 bg-white rotate-45 -right-2 top-1/2 -translate-y-1/2 border-r border-t border-slate-200" />
          )}

          <div className="flex items-center justify-between mb-5 relative z-10 rtl text-right">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center shadow-sm">
                <Sparkles size={18} />
              </div>
              <h3 className="font-black text-[15px] text-slate-900 tracking-tight">{step.title}</h3>
            </div>
            <button onClick={onSkip} className="text-slate-300 hover:text-slate-900 transition-colors bg-slate-50 p-2 rounded-full">
              <X size={16} />
            </button>
          </div>

          <p className="text-[13px] font-bold text-slate-500 leading-relaxed text-right mb-8 relative z-10 px-1">
            {step.content}
          </p>

          <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 relative z-10">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              {currentStep + 1} / {tourSteps.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all ${currentStep === 0 ? 'text-slate-200 bg-slate-50' : 'text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm'}`}
              >
                <ChevronRight size={18} />
              </button>

              <button
                onClick={handleNext}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl text-[11px] sm:text-[12px] font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm active:scale-95"
              >
                <span className="whitespace-nowrap">{currentStep === tourSteps.length - 1 ? 'إنهاء الجولة' : 'الخطوة التالية'}</span>
                <ChevronLeft size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteTour;
