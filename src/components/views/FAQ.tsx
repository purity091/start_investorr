import React from 'react';
import { ChevronLeft, HelpCircle, BookOpen, MessageCircle, Sparkles, Wrench } from 'lucide-react';

export const FAQ: React.FC = () => {
  const faqData = [
    { q: "ما هو \"مساعد الإطلاق\"؟", a: "مساعد الإطلاق هو منصة تعتمد على الذكاء الاصطناعي لمساعدتك في تحويل فكرتك إلى مشروع حقيقي، من خلال تحليل السوق، دراسة الجدوى، ووضع خطة تنفيذ واضحة تساعدك على البدء بثقة." },
    { q: "هل يمكنني استخدام المنصة بدون خبرة مسبقة في الأعمال؟", a: "نعم، تم تصميم المنصة خصيصاً للمبتدئين. كل خطوة مدعومة بتوجيهات مبسطة تساعدك على الفهم واتخاذ القرار، حتى لو لم تكن لديك أي خلفية في ريادة الأعمال." },
    { q: "ما نوع المشاريع التي يمكن تحليلها؟", a: "يمكنك تحليل معظم أنواع المشاريع مثل المطاعم والكافيهات، التجارة الإلكترونية، الخدمات، والمشاريع التقنية. المنصة تتكيف مع نوع المشروع وتعطيك تحليلاً مخصصاً لكل حالة." },
    { q: "هل النتائج التي يقدمها الذكاء الاصطناعي دقيقة؟", a: "التحليلات مبنية على نماذج ذكية وبيانات سوقية واقعية، وتهدف لتقريبك من القرار الصحيح بنسبة عالية. لكنها تظل أداة دعم قرار، ويُفضل دائماً دمجها مع التحقق الميداني." },
    { q: "ماذا سأحصل بعد إدخال بيانات مشروعي؟", a: "ستحصل على تقرير شامل يتضمن: تحليل استراتيجي كامل، توقعات مالية، كشف المخاطر، خطة تنفيذ، وتوصيات واضحة لاتخاذ القرار." },
    { q: "هل يمكنني تعديل البيانات وإعادة التحليل؟", a: "نعم، يمكنك تعديل أي معلومة وإعادة توليد التحليل في أي وقت، مما يساعدك على اختبار أكثر من سيناريو قبل اتخاذ القرار النهائي." },
    { q: "هل المنصة تعطي خطوات عملية أم مجرد معلومات؟", a: "المنصة لا تقدم معلومات فقط، بل تعطيك خطوات تنفيذ واضحة، مهام يومية وتوجيهات عملية تساعدك على الانتقال من الفكرة إلى التنفيذ مباشرة." },
    { q: "هل يمكنني تحميل التقرير أو مشاركته؟", a: "نعم، يمكنك تصدير التقرير بصيغ مختلفة (مثل PDF) ومشاركته مع شركاء أو مستثمرين بسهولة." },
    { q: "كيف تساعدك المنصة على تقليل المخاطر؟", a: "تقوم المنصة بتحليل مشروعك واكتشاف نقاط الضعف والمخاطر المحتملة مبكراً، ثم تقدم لك توصيات عملية لتقليلها قبل أن تؤثر على نجاح المشروع." },
    { q: "هل أحتاج لاشتراك مدفوع لاستخدام المنصة؟", a: "تتوفر نسخة مجانية لتجربة المنصة، بالإضافة إلى باقات مدفوعة تقدم ميزات متقدمة وتحليلات أعمق تناسب المستخدمين الجادين في إطلاق مشاريعهم." },
    { q: "ما هو \"الوضع السهل\" (Easy Mode)؟", a: "هو نظام توجيه ذكي يأخذك خطوة بخطوة عبر واجهة مبسطة لإدخال بياناتك دون الحاجة لخبرة تقنية، حيث يقوم الذكاء الاصطناعي بمعالجة التعقيدات خلف الكواليس لتوليد دراسة متكاملة." },
    { q: "ما الفرق بين الوضع السهل والوضع الاحترافي؟", a: "الوضع السهل يركز على السرعة والبساطة للمبتدئين، بينما يمنحك الوضع الاحترافي (Advanced Mode) تحكماً كاملاً في التفاصيل المالية الدقيقة والمعايير المتقدمة للتحليل الاستراتيجي." },
    { q: "كيف تعمل ميزة \"محاكي المالية\" (Financial Simulator)؟", a: "هي أداة تتيح لك اختبار سيناريوهات مختلفة (مثل تغير أسعار البيع أو تكاليف التشغيل) لترى تأثيرها الفوري على أرباحك وتدفقاتك النقدية المستقبلية." },
    { q: "ما هو \"تحليل المنافسين الذكي\" وكيف يساعدني؟", a: "يقوم النظام بتحليل الشركات الرائدة في قطاعك ليمنحك رؤية واضحة حول نقاط قوتهم وضعفهم، مما يساعدك على ابتكار ميزة تنافسية تضمن لك التفوق في السوق." },
    { q: "هل التقارير المستخرجة مقبولة لدى الجهات التمويلية؟", a: "نعم، التقارير مصممة لتكون \"جاهزة للمستثمر\"، حيث تشمل كافة البيانات المالية والتحليلات الاستراتيجية التي تطلبها الصناديق الاستثمارية والجهات المانحة للقروض." }
  ];

  return (
    <div className="app-page-shell-wide animate-in fade-in slide-in-from-bottom-2 duration-700 py-8 lg:py-10 font-['IBM_Plex_Sans_Arabic']">
      {/* Header Section - Restored */}
      <header className="text-center mb-16 pt-8">
        <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full mb-6 text-indigo-600 animate-in slide-in-from-top-4 duration-1000 shadow-sm">
          <BookOpen size={16} className="animate-pulse" />
          <span className="text-[11px] font-black tracking-widest uppercase">مركز المساعدة</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          الأسئلة <span className="text-indigo-600">الشائعة</span>
        </h1>
        <p className="text-slate-500 text-[15px] font-medium max-w-2xl mx-auto leading-relaxed">
          كل ما تحتاجه لإطلاق مشروعك بثقة. ابحث عن إجابات لاستفساراتك أو تواصل مع فريقنا للمساعدة.
        </p>
      </header>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
        {faqData.map((item, idx) => (
          <details key={idx} className="group surface-card rounded-[2rem] overflow-hidden transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/5 h-fit">
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none bg-white hover:bg-slate-50/50 transition-colors">
              <span className="text-[14px] font-black text-slate-800 group-open:text-indigo-600 transition-colors pr-2 leading-relaxed">{item.q}</span>
              <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-open:bg-indigo-600 group-open:text-white group-open:rotate-180 transition-all duration-500 shrink-0">
                <ChevronLeft size={18} strokeWidth={3} />
              </div>
            </summary>
            <div className="px-7 pb-7 animate-in fade-in slide-in-from-top-2 duration-500">
              <p className="text-[13px] text-slate-500 leading-relaxed font-medium border-t border-slate-100 pt-5">{item.a}</p>
            </div>
          </details>
        ))}
      </div>


    </div>
  );
};

// Add styles to hide default summary arrow
const styles = `
  details summary::-webkit-details-marker {
    display: none;
  }
  details > summary {
    list-style: none;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
