import { TOKENS } from "./result_components/CardDesignSystem";
import { QUESTIONS } from "./constants";

export const TAB_CONFIGS = {
  strategic_pulse: {
    id: "strategic_pulse",
    title: "النبض الاستراتيجي",
    subtitle: "تحليل تقاطع القطاعات واكتشاف الفرص الهجينة",
    bannerTitle: "محرّك النبض الاستراتيجي",
    bannerSubtitle: "أجب بوضوح لنفكك التحديات ونرسم لك مساراً استثمارياً فائق الدقة.",
    themeColor: TOKENS.colors.primary,
    resultsTitle: "بوابة الاستشراف: نتائج التشخيص والنبض الاستراتيجي",
    loadingMessages: [
      "تحليل 'النبض الاستراتيجي' وفهم الجاهزية التشغيلية...",
      "قياس 'فجوة الاستهداف' واستخراج حاجات العملاء...",
      "معايرة 'الأمان المالي' وتحليل المخاطر التشغيلية...",
      "بناء 'خريطة القيمة المضافة' (UVP Map) والميزة التنافسية...",
      "توليد توصيات 'تسريع الدخل' وتحديد مسار التنفيذ الأنسب...",
    ],
    questions: [
      // STEP 1 - CURRENT STATUS
      {
        id: "op_readiness", step: 1, label: "الجاهزية التشغيلية", sublabel: "كيف تصف مستوى الجاهزية لمشروعك الآن؟",
        icon: "Activity", type: "cards", options: [
          { val: "beginner", title: "مبتدئ", desc: "أفكار أولية" },
          { val: "medium", title: "متوسط", desc: "بدأت التنفيذ" },
          { val: "ready", title: "شبه جاهز", desc: "على وشك الانطلاق" }
        ]
      },
      {
        id: "financial_estimates", step: 1, label: "التقديرات المالية", sublabel: "هل لديك أرقام تقريبية عن الدخل المتوقع والمصاريف؟",
        icon: "Calculator", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "دراسة مالية واضحة" },
          { val: "no", title: "لا", desc: "مجرد توقعات" },
          { val: "partial", title: "جزئي", desc: "بعض الأرقام" }
        ]
      },
      {
        id: "main_goal", step: 1, label: "الهدف الحالي", sublabel: "ما هو الهدف الرئيسي من المشروع في المرحلة الحالية؟",
        icon: "Target", type: "textarea_choice", placeholder: "اكتب هدفك هنا باختصار...",
        options: [
          { val: "test", label: "اختبار الفكرة" },
          { val: "revenue", label: "تحقيق دخل سريع" },
          { val: "growth", label: "النمو والانتشار" }
        ]
      },
      // STEP 2 - TARGETING GAP
      {
        id: "target_audience_clear", step: 2, label: "الجمهور المستهدف", sublabel: "هل حددت جمهورك المستهدف بشكل واضح؟",
        icon: "Users", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "فئات محددة" },
          { val: "no", title: "لا", desc: "سوق عام" },
          { val: "partial", title: "جزئي", desc: "تصور مبدئي" }
        ]
      },
      {
        id: "market_gaps", step: 2, label: "فجوات السوق", sublabel: "هل تعرف أي الفجوات في السوق يمكن أن تستغلها؟",
        icon: "Search", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "فرص واضحة" },
          { val: "no", title: "لا", desc: "لم أبحث بعد" },
          { val: "partial", title: "جزئي", desc: "بعض الملاحظات" }
        ]
      },
      {
        id: "customer_needs_first", step: 2, label: "حاجات العملاء", sublabel: "ما أهم حاجات العملاء التي تريد تلبيتها أولًا؟",
        icon: "Heart", type: "textarea_choice", placeholder: "مثال: سرعة التوصيل، جودة المنتج...",
        options: [
          { val: "quality", label: "الجودة العالية" },
          { val: "price", label: "السعر التنافسي" },
          { val: "experience", label: "تجربة مميزة" }
        ]
      },
      // STEP 3 - FINANCIAL SAFETY
      {
        id: "budget_3months", step: 3, label: "ميزانية التشغيل", sublabel: "هل لديك ميزانية كافية لتغطية أول 3 أشهر؟",
        icon: "Wallet", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "سيولة كافية" },
          { val: "no", title: "لا", desc: "أحتاج تمويل" },
          { val: "partial", title: "جزئي", desc: "تغطي شهرين" }
        ]
      },
      {
        id: "break_even_month", step: 3, label: "نقطة التعادل", sublabel: "هل حددت الشهر المتوقع للتعادل المالي؟",
        icon: "TrendingUp", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تاريخ محدد" },
          { val: "no", title: "لا", desc: "لم أحدد" },
          { val: "not_fixed", title: "غير محدد", desc: "حسب السوق" }
        ]
      },
      {
        id: "financial_gap_plan", step: 3, label: "خطة الفجوة المالية", sublabel: "هل لديك خطة للتعامل مع فجوة مالية محتملة؟",
        icon: "LifeBuoy", type: "textarea_choice", placeholder: "كيف ستتعامل مع نقص السيولة؟",
        options: [
          { val: "loan", label: "قرض بنكي" },
          { val: "investor", label: "شريك مستثمر" },
          { val: "self", label: "تمويل ذاتي" }
        ]
      },
      // STEP 4 - OPERATIONAL RISKS
      {
        id: "biggest_launch_threat", step: 4, label: "التهديد الأكبر", sublabel: "ما هو أكبر تهديد قد يوقف المشروع قبل الإطلاق؟",
        icon: "ShieldAlert", type: "cards", options: [
          { val: "capital", title: "نقص المال", desc: "ميزانية محدودة" },
          { val: "supply", title: "مشاكل التوريد", desc: "سلاسل الإمداد" },
          { val: "competition", title: "المنافسة", desc: "لاعبين كبار" }
        ]
      },
      {
        id: "risk_mitigation_plan", step: 4, label: "تقليل المخاطر", sublabel: "هل لديك خطة لتقليل المخاطر التشغيلية؟",
        icon: "ShieldCheck", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "إجراءات وقائية" },
          { val: "no", title: "لا", desc: "بدون خطة" },
          { val: "partial", title: "جزئي", desc: "بعض الحلول" }
        ]
      },
      {
        id: "strategic_confidence", step: 4, label: "مستوى الثقة", sublabel: "هل حددت مستوى الثقة بالقرار الاستراتيجي الحالي؟",
        icon: "BarChart", type: "cards", options: [
          { val: "low", title: "منخفض", desc: "كثير من الشكوك" },
          { val: "med", title: "متوسط", desc: "وضوح جزئي" },
          { val: "high", title: "مرتفع", desc: "يقين كامل" }
        ]
      },
      // STEP 5 - STRATEGIC DECISION
      {
        id: "business_model", step: 5, label: "نموذج العمل", sublabel: "هل لديك نموذج عمل محدد تريد تنفيذه؟",
        icon: "Layout", type: "cards", options: [
          { val: "cloud", title: "Cloud Kitchen", desc: "سحابي فقط" },
          { val: "dinein", title: "Dine-in", desc: "صالات طعام" },
          { val: "hybrid", title: "نموذج هجين", desc: "توصيل واستقبال" }
        ]
      },
      {
        id: "cost_cut_decision", step: 5, label: "تقليل المصاريف", sublabel: "هل ستتخذ قرارات تقليل المصاريف الثابتة فورًا؟",
        icon: "Scissors", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "ضغط التكاليف" },
          { val: "no", title: "لا", desc: "حسب الميزانية" },
          { val: "partial", title: "جزئي", desc: "بعض البنود" }
        ]
      },
      {
        id: "first_action_step", step: 5, label: "أول خطوة عملية", sublabel: "ما هي أول خطوة عملية ستقوم بها بعد مراجعة التحليل؟",
        icon: "Zap", type: "textarea_choice", placeholder: "ما هي البداية الحقيقية؟",
        options: [
          { val: "legal", label: "التراخيص" },
          { val: "hiring", label: "التوظيف" },
          { val: "equipment", label: "شراء المعدات" }
        ]
      },
      // STEP 6 - FINANCIAL GAP ANALYSIS
      {
        id: "want_funding_gap", step: 6, label: "تحليل فجوة التمويل", sublabel: "هل تريد معرفة الفجوة بين ميزانيتك والاحتياجات الفعلية؟",
        icon: "DollarSign", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "أريد التفاصيل" },
          { val: "no", title: "لا", desc: "مكتفي مالياً" },
          { val: "partial", title: "جزئي", desc: "ملخص سريع" }
        ]
      },
      {
        id: "want_order_estimates", step: 6, label: "تقدير الطلبات", sublabel: "هل تريد تقدير الطلبات اليومية ومتوسط قيمة الطلب؟",
        icon: "ShoppingBag", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "أهداف رقمية" },
          { val: "no", title: "لا", desc: "بدون أرقام" },
          { val: "partial", title: "جزئي", desc: "متوسط تقديري" }
        ]
      },
      {
        id: "want_revenue_acceleration", step: 6, label: "تسريع الدخل", sublabel: "هل تريد توصيات لتسريع الدخل في أول 90 يوم؟",
        icon: "Rocket", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تكتيكات سريعة" },
          { val: "no", title: "لا", desc: "نمو طبيعي" },
          { val: "partial", title: "جزئي", desc: "أهم الخطوات" }
        ]
      },
      // STEP 7 - PROPOSED EXECUTION PATH
      {
        id: "want_safe_path", step: 7, label: "المسار الآمن", sublabel: "هل تريد الذكاء أن يقترح لك المسار الأكثر أمانًا ماليًا؟",
        icon: "Shield", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "أقل مخاطرة" },
          { val: "no", title: "لا", desc: "أفضل الهجوم" },
          { val: "partial", title: "جزئي", desc: "توازن" }
        ]
      },
      {
        id: "want_path_comparison", step: 7, label: "مقارنة المسارات", sublabel: "هل ترغب بتوضيح المزايا والتحديات لكل مسار؟",
        icon: "GitCompare", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "رؤية شاملة" },
          { val: "no", title: "لا", desc: "مسار واحد فقط" },
          { val: "partial", title: "جزئي", desc: "أهم الاختلافات" }
        ]
      },
      {
        id: "want_quick_tips", step: 7, label: "نصائح تنفيذية", sublabel: "هل تريد نصائح تنفيذية سريعة لتقليل المخاطر؟",
        icon: "Lightbulb", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "خطوات محددة" },
          { val: "no", title: "لا", desc: "بدون نصائح" },
          { val: "partial", title: "جزئي", desc: "أهم تلميحتين" }
        ]
      },
      // STEP 8 - UVP MAP
      {
        id: "want_uvp_analysis", step: 8, label: "تحليل الميزة التنافسية", sublabel: "هل تريد تحليل ميزتك التنافسية (UVP)؟",
        icon: "Zap", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "مقارنة السوق" },
          { val: "no", title: "لا", desc: "وضوح داخلي" },
          { val: "partial", title: "جزئي", desc: "أهم ميزتين" }
        ]
      },
      {
        id: "want_marketing_focus", step: 8, label: "تركيز التسويق", sublabel: "هل تريد معرفة أين يجب أن تركز في التسويق والإعلانات؟",
        icon: "Megaphone", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "خطة توزيع" },
          { val: "no", title: "لا", desc: "تغطية شاملة" },
          { val: "partial", title: "جزئي", desc: "أفضل قناة" }
        ]
      },
      {
        id: "want_final_report", step: 8, label: "التقرير النهائي", sublabel: "هل ترغب في تلخيص كل الاستنتاجات في تقرير PDF؟",
        icon: "FileText", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "توثيق كامل" },
          { val: "no", title: "لا", desc: "ملخص رقمي" },
          { val: "partial", title: "جزئي", desc: "خلاصة تنفيذية" }
        ]
      }
    ]
  },
  financial_viability: {
    id: "financial_viability",
    title: "التحليل المالي والجدوى",
    subtitle: "محاكاة التدفقات النقدية والتحقق من الربحية",
    bannerTitle: "مختبر الجدوى المالية",
    bannerSubtitle: "أدخل حدودك المالية لنقوم بحساب معدل العائد المتوقع (IRR) وفترة الاسترداد.",
    themeColor: "#f59e0b", // Amber/Gold
    resultsTitle: "البصيرة المالية: تشخيص الربحية وكفاءة رأس المال",
    loadingMessages: [
      "محاكاة التدفقات النقدية للـ 3 سنوات القادمة...",
      "معايرة 'نقطة التعادل' (Break-even Point)...",
      "قياس 'معدل الحرق' (Burn Rate) المتوقع وقوة السيولة...",
      "تقييم الأصول واستهلاك رأس المال التشغيلي...",
    ],
    questions: [
      // STEP 1 - CAPITAL
      {
        id: "capital_total", step: 1, label: "إجمالي رأس المال", sublabel: "ما هو إجمالي رأس المال المتاح لديك حالياً للاستثمار؟",
        icon: "Wallet", type: "cards", options: [
          { val: "low", title: "< $3,000", desc: "بداية رشيقة" },
          { val: "med", title: "$3,000–$6,000", desc: "نموذج متوسط" },
          { val: "high", title: "> $6,000", desc: "رأس مال قوي" }
        ]
      },
      {
        id: "capital_extra", step: 1, label: "الموارد الإضافية", sublabel: "هل لديك موارد مالية إضافية يمكنك الوصول إليها بسرعة؟",
        icon: "Zap", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "أملك احتياطي للطوارئ" },
          { val: "no", title: "لا", desc: "هذا هو كل رأس المال" }
        ]
      },
      {
        id: "risk_feeling", step: 1, label: "الشعور تجاه المخاطر", sublabel: "ما هو شعورك الحالي تجاه المخاطرة المالية؟",
        icon: "ShieldAlert", type: "cards", options: [
          { val: "low", title: "منخفض", desc: "أفضل الأمان العالي" },
          { val: "med", title: "متوسط", desc: "مخاطرة محسوبة" },
          { val: "high", title: "مرتفع", desc: "نمو سريع بأي ثمن" }
        ]
      },
      // STEP 2 - GOALS
      {
        id: "goal_revenue", step: 2, label: "هدف الإيرادات", sublabel: "ما هو هدفك الشهري للإيرادات بعد 12 شهر؟",
        icon: "Target", type: "cards", options: [
          { val: "3k", title: "$3,000", desc: "هدف مستقر" },
          { val: "6k", title: "$6,000", desc: "نمو طموح" },
          { val: "10k", title: "$10,000", desc: "نمو انفجاري" }
        ]
      },
      {
        id: "goal_margin", step: 2, label: "هامش الربح المستهدف", sublabel: "ما هو هامش الربح الصافي المستهدف؟",
        icon: "TrendingUp", type: "cards", options: [
          { val: "20p", title: "20%", desc: "هامش معقول" },
          { val: "35p", title: "35%", desc: "هامش تنافسي" },
          { val: "50p", title: "50%", desc: "هامش مرتفع جداً" }
        ]
      },
      {
        id: "focus_type", step: 2, label: "نوع التركيز", sublabel: "هل ترغب بالتركيز على النمو السريع أم الاستقرار المالي؟",
        icon: "Activity", type: "cards", options: [
          { val: "growth", title: "نمو سريع", desc: "توسع مكثف" },
          { val: "stable", title: "استقرا مستدام", desc: "بناء ثبات" }
        ]
      },
      // STEP 3 - COSTS
      {
        id: "setup_cost", step: 3, label: "تكلفة التأسيس", sublabel: "ما هو حجم تكلفة التأسيس المتوقع؟",
        icon: "Calculator", type: "cards", options: [
          { val: "low", title: "< $20,000", desc: "اقتصادي" },
          { val: "med", title: "$20,000–$40,000", desc: "متكامل" },
          { val: "high", title: "> $40,000", desc: "استثمار كبير" }
        ]
      },
      {
        id: "setup_model", step: 3, label: "نموذج التجهيز", sublabel: "هل ستستثمر في ديكور كامل أم نموذج توصيل فقط؟",
        icon: "Truck", type: "cards", options: [
          { val: "delivery", title: "توصيل فقط", desc: "سحابي" },
          { val: "decor", title: "ديكور كامل", desc: "استقبال" },
          { val: "hybrid", title: "هجين", desc: "الاثنين معاً" }
        ]
      },
      {
        id: "op_cost_est", step: 3, label: "التكاليف التشغيلية", sublabel: "ما هو تقديرك للتكاليف الشهرية التشغيلية؟",
        icon: "Coins", type: "cards", options: [
          { val: "low", title: "منخفض", desc: "سيطرة عالية" },
          { val: "med", title: "متوسط", desc: "تكاليف اعتيادية" },
          { val: "high", title: "مرتفع", desc: "توسع تشغيلي" }
        ]
      },
      // STEP 4 - EXPECTED REVENUE
      {
        id: "target_orders", step: 4, label: "عدد الطلبات", sublabel: "كم عدد الطلبات اليومية المستهدف؟",
        icon: "ShoppingBag", type: "cards", options: [
          { val: "10", title: "10", desc: "بداية" },
          { val: "20", title: "20", desc: "متوسط" },
          { val: "30", title: "30+", desc: "كثيف" }
        ]
      },
      {
        id: "target_aov", step: 4, label: "متوسط الطلب (AOV)", sublabel: "ما هو متوسط قيمة الطلب المتوقع؟",
        icon: "DollarSign", type: "cards", options: [
          { val: "low", title: "<$20", desc: "اقتصادي" },
          { val: "med", title: "$20–$30", desc: "متوسط" },
          { val: "high", title: ">$30", desc: "بريميوم" }
        ]
      },
      {
        id: "geo_radius", step: 4, label: "المنطقة الجغرافية", sublabel: "ما هو السوق المستهدف من حيث المنطقة الجغرافية؟",
        icon: "MapPin", type: "cards", options: [
          { val: "5km", title: "5 كم", desc: "تركيز محلي" },
          { val: "10km", title: "10 كم", desc: "نطاق أوسع" },
          { val: "more", title: "أكثر", desc: "تغطية كاملة" }
        ]
      },
      // STEP 5 - GAPS
      {
        id: "has_loans", step: 5, label: "الالتزامات والنمو", sublabel: "هل لديك أي قروض أو التزامات مالية تؤثر على المشروع؟",
        icon: "CreditCard", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "توجد التزامات" },
          { val: "no", title: "لا", desc: "حرية مالية" }
        ]
      },
      {
        id: "main_risk", step: 5, label: "مصدر الخطر الأكبر", sublabel: "ما هو أهم مصدر خطر تشعر أنه يهدد رأس المال؟",
        icon: "ShieldAlert", type: "cards", options: [
          { val: "fixed", title: "تكاليف ثابتة", desc: "إيجارات ورواتب" },
          { val: "variable", title: "تكاليف متغيرة", desc: "مواد وسلاسل إمداد" },
          { val: "demand", title: "نقص الطلب", desc: "ضعف المبيعات" }
        ]
      },
      {
        id: "safety_buffer", step: 5, label: "معدل الأمان المالي", sublabel: "ما هو معدل الأمان المالي المطلوب قبل بدء التشغيل؟",
        icon: "ShieldCheck", type: "cards", options: [
          { val: "50p", title: "50%", desc: "مقبول" },
          { val: "75p", title: "75%", desc: "جيد" },
          { val: "100p", title: "100%", desc: "أمان كامل" }
        ]
      },
      // STEP 6 - STRATEGIES
      {
        id: "do_upsell", step: 6, label: "استراتيجية Upselling", sublabel: "هل ترغب في إضافة Upselling للمنتجات الحالية؟",
        icon: "PlusCircle", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "زيادة الربحية" },
          { val: "no", title: "لا", desc: "تبسيط النموذج" },
          { val: "later", title: "لاحقاً", desc: "تأجيل التطوير" }
        ]
      },
      {
        id: "do_ads", step: 6, label: "الحملات الإعلانية", sublabel: "هل تفكر بإطلاق حملات إعلانية مدفوعة؟",
        icon: "Megaphone", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "نمو سريع" },
          { val: "no", title: "لا", desc: "نمو عضوي" },
          { val: "later", title: "لاحقاً", desc: "بعد الاستقرار" }
        ]
      },
      {
        id: "growth_style", step: 6, label: "أسلوب زيادة الطلبات", sublabel: "ما هو أسلوبك المفضل لزيادة الطلبات؟",
        icon: "MousePointer2", type: "cards", options: [
          { val: "offers", title: "عروض خاصة", desc: "جذب فوري" },
          { val: "social", title: "تواصل اجتماعي", desc: "بناء جمهور" },
          { val: "quality", title: "تحسين الجودة", desc: "سمعة قوية" }
        ]
      },
      // STEP 7 - SCENARIOS
      {
        id: "scenario_type", step: 7, label: "نوع السيناريوهات", sublabel: "هل تريد أن نعرض لك سيناريو متفائل فقط، أم متفائل وحذر؟",
        icon: "Eye", type: "cards", options: [
          { val: "opt", title: "متفائل فقط", desc: "تركيز على النجاح" },
          { val: "both", title: "متفائل + حذر", desc: "رؤية شاملة" }
        ]
      },
      {
        id: "fund_gap", step: 7, label: "فجوة التمويل", sublabel: "ما هو المستوى المقبول لديك لفجوة التمويل؟",
        icon: "AlertTriangle", type: "cards", options: [
          { val: "25", title: "< 25%", desc: "أمان عالٍ" },
          { val: "50", title: "25-50%", desc: "توازن" },
          { val: "75", title: "> 50%", desc: "مخاطرة" }
        ]
      },
      {
        id: "payback_term", step: 7, label: "مدة الاسترداد", sublabel: "كم مدة الاسترداد المقبولة لديك قبل تحقيق الربح؟",
        icon: "Calendar", type: "cards", options: [
          { val: "6m", title: "< 6 أشهر", desc: "استرداد سريع" },
          { val: "1y", title: "6-12 شهر", desc: "منطقي" },
          { val: "2y", title: "> 12 شهر", desc: "استثمار طويل" }
        ]
      },
      // STEP 8 - DECISION
      {
        id: "model_choice", step: 8, label: "وضع القرار المالي", sublabel: "هل ترغب بالتركيز على Cloud Kitchen أم نموذج هجين؟",
        icon: "Home", type: "cards", options: [
          { val: "cloud", title: "Cloud Kitchen", desc: "سحابي" },
          { val: "hybrid", title: "هجين", desc: "متنوع" },
          { val: "full", title: "مطعم كامل", desc: "تقليدي" }
        ]
      },
      {
        id: "need_cost_cut", step: 8, label: "توصيات التكاليف", sublabel: "هل تريد توصيات لتقليل التكاليف بشكل فوري؟",
        icon: "Scissors", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تحسين الربح" },
          { val: "no", title: "لا", desc: "الالتزام بالخطة" }
        ]
      },
      {
        id: "final_feeling", step: 8, label: "الشعور النهائي", sublabel: "ما هو شعورك بعد الإجابة عن جميع الأسئلة؟",
        icon: "Award", type: "cards", options: [
          { val: "ready", title: "جاهز للقرار", desc: "وضوح كامل" },
          { val: "need_more", title: "أحتاج تحليل", desc: "مزيد من الدراسة" }
        ]
      }
    ]
  },
  execution_path: {
    id: "execution_path",
    title: "مسار التنفيذ والأداء",
    subtitle: "تحويل الاستراتيجية إلى خطة عمل تنفيذية",
    bannerTitle: "مختبر الكفاءة التشغيلية",
    bannerSubtitle: "حدد مواردك وفريقك لنقوم برسم المسار الحرج وتوزيع المهام بدقة.",
    themeColor: "#10b981", // Emerald/Green
    resultsTitle: "بوابة الإنجاز: تقرير التنفيذ والجاهزية الميدانية",
    loadingMessages: [
      "رسم 'المسار الحرج' (Critical Path Method)...",
      "توزيع الموارد البشرية على المهام التنفيذية...",
      "تحديد معالم الإنجاز (Milestones) للـ 90 يوماً الأولى...",
      "ضبط 'مؤشرات الأداء التشغيلي' (Operational KPIs)...",
    ],
    questions: [
      // STEP 1 - READINESS
      {
        id: "reg_status", step: 1, label: "البداية والاستعداد", sublabel: "هل جهزت اسم المشروع والسجل التجاري؟",
        icon: "FileText", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "جاهز قانونياً" },
          { val: "no", title: "لا", desc: "لم أبدأ بعد" },
          { val: "pending", title: "قيد الإجراء", desc: "في المعالجة" }
        ]
      },
      {
        id: "location_ready", step: 1, label: "تجهيز الموقع", sublabel: "هل لديك موقع جاهز للتشغيل؟",
        icon: "MapPin", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "المكان جاهز" },
          { val: "no", title: "لا", desc: "أبحث عن موقع" },
          { val: "building", title: "قيد التجهيز", desc: "جاري العمل" }
        ]
      },
      {
        id: "budget_detail", step: 1, label: "دقة الميزانية", sublabel: "هل حددت ميزانية بدء التشغيل بالتفصيل؟",
        icon: "Calculator", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "خطة مالية كاملة" },
          { val: "no", title: "لا", desc: "تقدير تقريبي" },
          { val: "partial", title: "جزئي", desc: "بعض الأرقام" }
        ]
      },
      // STEP 2 - TASKS
      {
        id: "task_list", step: 2, label: "قائمة المهام", sublabel: "هل وضعت قائمة المهام اليومية الأساسية؟",
        icon: "CheckSquare", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "مهام مجدولة" },
          { val: "no", title: "لا", desc: "لا يوجد قائمة" },
          { val: "partial", title: "جزئي", desc: "مهام عامة" }
        ]
      },
      {
        id: "timeline_ready", step: 2, label: "الجدول الزمني", sublabel: "هل لديك جدول زمني لتسليم كل مهمة؟",
        icon: "Calendar", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "مواعيد محددة" },
          { val: "no", title: "لا", desc: "مرن جداً" },
          { val: "partial", title: "جزئي", desc: "تواريخ تقديرية" }
        ]
      },
      {
        id: "team_resp", step: 2, label: "مسؤوليات الفريق", sublabel: "هل وضعت مسؤوليات واضحة لكل عضو؟",
        icon: "Users", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "توزيع مهام دقيق" },
          { val: "no", title: "لا", desc: "الكل يعمل معاً" },
          { val: "partial", title: "جزئي", desc: "توزيع مبدئي" }
        ]
      },
      // STEP 3 - MODEL
      {
        id: "op_model_choice", step: 3, label: "نموذج التشغيل", sublabel: "هل تريد التركيز على السحابي أم الهجين؟",
        icon: "Layers", type: "cards", options: [
          { val: "cloud", title: "Cloud Kitchen", desc: "سحابي" },
          { val: "hybrid", title: "هجين", desc: "تنوع قنوات" },
          { val: "full", title: "مطعم كامل", desc: "نموذج تقليدي" }
        ]
      },
      {
        id: "fixed_cut", step: 3, label: "تقليل التكاليف", sublabel: "هل لديك خطة لتقليل التكاليف الثابتة؟",
        icon: "Scissors", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "خطة ضغط" },
          { val: "no", title: "لا", desc: "تكاليف ثابتة" },
          { val: "think", title: "أفكر فيها", desc: "قيد المراجعة" }
        ]
      },
      {
        id: "order_flow", step: 3, label: "منطق الطلبات", sublabel: "هل قررت طريقة التعامل مع التوصيل؟",
        icon: "Truck", type: "cards", options: [
          { val: "internal", title: "داخلي", desc: "فريق خاص" },
          { val: "platforms", title: "منصات توصيل", desc: "جاهز/هنقر" },
          { val: "hybrid", title: "هجين", desc: "توازن نموذجين" }
        ]
      },
      // STEP 4 - RESOURCES
      {
        id: "supplier_found", step: 4, label: "الموردين", sublabel: "هل حددت الموردين الرئيسيين؟",
        icon: "Box", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "عقود جاهزة" },
          { val: "no", title: "لا", desc: "أبحث عن أفضل" },
          { val: "partial", title: "جزئي", desc: "قائمة أولية" }
        ]
      },
      {
        id: "equip_found", step: 4, label: "المعدات", sublabel: "هل لديك خطة لتأمين المعدات؟",
        icon: "ChefHat", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "مشتريات جاهزة" },
          { val: "no", title: "لا", desc: "أبحث عن خيارات" },
          { val: "partial", title: "جزئي", desc: "تم تأمين البعض" }
        ]
      },
      {
        id: "inv_plan", step: 4, label: "إدارة المخزون", sublabel: "هل لديك خطة لإدارة المخزون؟",
        icon: "ClipboardList", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "نظام جرد آلي" },
          { val: "no", title: "لا", desc: "يدوي/ورقي" },
          { val: "partial", title: "جزئي", desc: "قيد الإعداد" }
        ]
      },
      // STEP 5 - MENU
      {
        id: "menu_final", step: 5, label: "تطوير المنيو", sublabel: "هل حددت المنتجات الرئيسية؟",
        icon: "Coffee", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "قائمة نهائية" },
          { val: "no", title: "لا", desc: "لا زلت أجرب" },
          { val: "partial", title: "جزئي", desc: "مسودة أولية" }
        ]
      },
      {
        id: "price_test", step: 5, label: "اختبار الأسعار", sublabel: "هل قمت باختبار الأسعار مقارنة بالسوق؟",
        icon: "DollarSign", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "دراسة تنافسية" },
          { val: "no", title: "لا", desc: "تسعير تقديري" },
          { val: "think", title: "أفكر فيه", desc: "قيد المراجعة" }
        ]
      },
      {
        id: "cx_plan", step: 5, label: "تجربة العميل", sublabel: "هل وضعت خطة لتجربة العميل؟",
        icon: "Heart", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "رحلة عميل كاملة" },
          { val: "no", title: "لا", desc: "تركيز على المنتج" },
          { val: "partial", title: "جزئي", desc: "بعض النقاط" }
        ]
      },
      // STEP 6 - MARKETING
      {
        id: "mkt_plan", step: 6, label: "خطة التسويق", sublabel: "هل لديك خطة لحملات التسويق؟",
        icon: "Megaphone", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "استراتيجية إطلاق" },
          { val: "no", title: "لا", desc: "تلقائي" },
          { val: "partial", title: "جزئي", desc: "أفكار متفرقة" }
        ]
      },
      {
        id: "mkt_channels", step: 6, label: "قنوات الوصول", sublabel: "هل حددت القنوات التي ستستهدفها؟",
        icon: "Smartphone", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تيك توك/إنستا" },
          { val: "no", title: "لا", desc: "كل القنوات" },
          { val: "think", title: "أفكر فيه", desc: "قيد التجربة" }
        ]
      },
      {
        id: "mkt_budget", step: 6, label: "ميزانية الإعلانات", sublabel: "هل حددت ميزانية الإعلانات الشهرية؟",
        icon: "Coins", type: "cards", options: [
          { val: "low", title: "منخفضة", desc: "نمو حذر" },
          { val: "med", title: "متوسطة", desc: "توازن" },
          { val: "high", title: "مرتفعة", desc: "نمو هجومي" }
        ]
      },
      // STEP 7 - TRACKING
      {
        id: "order_track", step: 7, label: "متابعة المبيعات", sublabel: "هل لديك خطة لمتابعة الطلبات؟",
        icon: "BarChart3", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "لوحة تحكم حية" },
          { val: "no", title: "لا", desc: "مراجعة يدوية" },
          { val: "partial", title: "جزئي", desc: "تقارير أسبوعية" }
        ]
      },
      {
        id: "kpi_track", step: 7, label: "مؤشرات الأداء", sublabel: "هل لديك مؤشرات KPI واضحة؟",
        icon: "Activity", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "أهداف رقمية" },
          { val: "no", title: "لا", desc: "مراقبة عامة" },
          { val: "think", title: "أفكر فيه", desc: "قيد الصياغة" }
        ]
      },
      {
        id: "strategy_adj", step: 7, label: "تعديل المسار", sublabel: "هل لديك طريقة لتعديل الاستراتيجية؟",
        icon: "RefreshCw", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "استجابة سريعة" },
          { val: "no", title: "لا", desc: "ثبات على الخطة" },
          { val: "think", title: "أفكر فيه", desc: "حسب النتائج" }
        ]
      },
      // STEP 8 - IMPROVE
      {
        id: "monthly_rev", step: 8, label: "مراجعة شهرية", sublabel: "هل ستقوم بمراجعة الخطة شهرياً؟",
        icon: "CalendarRange", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تدقيق مستمر" },
          { val: "no", title: "لا", desc: "مراجعة ربعية" },
          { val: "partial", title: "جزئي", desc: "مراجعة عارضة" }
        ]
      },
      {
        id: "quality_plan", step: 8, label: "تحسين الجودة", sublabel: "هل لديك خطة لتحسين الجودة باستمرار؟",
        icon: "Award", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تطوير دائم" },
          { val: "no", title: "لا", desc: "التزام بالثبات" },
          { val: "partial", title: "جزئي", desc: "حل مشاكل" }
        ]
      },
      {
        id: "learn_record", step: 8, label: "سجل الدروس", sublabel: "هل ستحتفظ بسجل لكل تجربة وتعديل؟",
        icon: "BookOpen", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "ذاكرة مؤسسية" },
          { val: "no", title: "لا", desc: "تعلم ذاتي" },
          { val: "partial", title: "جزئي", desc: "توثيق محدود" }
        ]
      }
    ]
  },
  growth_plan: {
    id: "growth_plan",
    title: "خارطة النمو السريع",
    subtitle: "استراتيجيات القياس والتوسع (Scaling)",
    bannerTitle: "محرّك النمو الانفجاري",
    bannerSubtitle: "كيف تخطط للوصول إلى أول 1,000 عميل؟ دعنا نبني لك محركات النمو.",
    themeColor: "#ef4444", // Red/Rose
    resultsTitle: "خارطة النمو: استراتيجية الاستحواذ والتوسع",
    loadingMessages: [
      "بناء 'قمع المبيعات' (Sales Funnel) الرقمي المحسن...",
      "حساب 'تكلفة الاستحواذ' (CAC) المتوقعة لكل قناة...",
      "تصميم حلقات النمو (Growth Loops) ذاتية الاستدامة...",
    ],
    questions: [
      // STEP 1 - GOALS
      {
        id: "growth_90day", step: 1, label: "أهداف الـ 90 يوم", sublabel: "ما هو هدفك الأساسي خلال الـ 90 يوم القادمة؟",
        icon: "Target", type: "cards", options: [
          { val: "orders", title: "زيادة الطلبات", desc: "كثافة مبيعات" },
          { val: "revenue", title: "تحسين الإيرادات", desc: "قيمة أعلى" },
          { val: "reach", title: "توسيع العملاء", desc: "قاعدة بيانات" },
          { val: "brand", title: "زيادة الوعي", desc: "براندينج" }
        ]
      },
      {
        id: "digital_target", step: 1, label: "الهدف الرقمي", sublabel: "هل لديك هدف رقمي محدد لكل مؤشر؟",
        icon: "Calculator", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "أرقام دقيقة" },
          { val: "no", title: "لا", desc: "رؤية عامة" },
          { val: "partial", title: "جزئي", desc: "بعض المؤشرات" }
        ]
      },
      {
        id: "priority_rank", step: 1, label: "ترتيب الأولويات", sublabel: "هل وضعت ترتيب الأولويات بين الأهداف؟",
        icon: "ListOrdered", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "قرار محدد" },
          { val: "no", title: "لا", desc: "كلها مهمة" },
          { val: "think", title: "أفكر فيه", desc: "قيد الموازنة" }
        ]
      },
      // STEP 2 - CUSTOMERS
      {
        id: "active_cust", step: 2, label: "العملاء النشطون", sublabel: "من هم عملاؤك الأكثر نشاطاً؟",
        icon: "Users", type: "cards", options: [
          { val: "repeat", title: "زبائن متكررين", desc: "ولاء عالٍ" },
          { val: "new", title: "زبائن جدد", desc: "استحواذ جديد" },
          { val: "all", title: "كل العملاء", desc: "تغطية شاملة" }
        ]
      },
      {
        id: "know_needs", step: 2, label: "احتياجات العميل", sublabel: "هل تعرف احتياجاتهم الأساسية وما الذي يجعلهم يعودون؟",
        icon: "HeartPath", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "فهم عميق" },
          { val: "no", title: "لا", desc: "تخمين أولى" },
          { val: "partial", title: "جزئي", desc: "بعض المعلومات" }
        ]
      },
      {
        id: "behavior_analysis", step: 2, label: "تحليل السلوك", sublabel: "هل قمت بتحليل سلوك العملاء على المنصات؟",
        icon: "MousePointer2", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "بيانات حقيقية" },
          { val: "no", title: "لا", desc: "لم أحلل بعد" },
          { val: "partial", title: "جزئي", desc: "بعض التجارب" }
        ]
      },
      // STEP 3 - CHANNELS
      {
        id: "mkt_focus", step: 3, label: "قنوات التسويق", sublabel: "ما القنوات التي تريد التركيز عليها أولاً؟",
        icon: "Share2", type: "cards", options: [
          { val: "tiktok", title: "TikTok", desc: "فيديو قصير" },
          { val: "insta", title: "Instagram", desc: "بصري" },
          { val: "wa", title: "WhatsApp", desc: "مباشر" },
          { val: "local", title: "محلي", desc: "منطقة جغرافية" }
        ]
      },
      {
        id: "channel_budget", step: 3, label: "ميزانية القنوات", sublabel: "هل لديك ميزانية محددة لكل قناة؟",
        icon: "Coins", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "توزيع مالي" },
          { val: "no", title: "لا", desc: "ميزانية واحدة" },
          { val: "think", title: "أفكر فيها", desc: "قيد الدراسة" }
        ]
      },
      {
        id: "mkt_msg", step: 3, label: "الرسائل التسويقية", sublabel: "هل لديك فكرة عن الرسائل التي تناسب كل قناة؟",
        icon: "MessageSquare", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "محتوى متخصص" },
          { val: "no", title: "لا", desc: "محتوى واحد" },
          { val: "partial", title: "جزئي", desc: "قيد التطوير" }
        ]
      },
      // STEP 4 - REV BOOST
      {
        id: "aov_boost", step: 4, label: "زيادة الإيرادات", sublabel: "هل لديك خطة لتعزيز متوسط قيمة الطلب (AOV)؟",
        icon: "TrendingUp", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "استراتيجية واضحة" },
          { val: "no", title: "لا", desc: "تسعير ثابت" },
          { val: "think", title: "أفكر فيها", desc: "قيد البحث" }
        ]
      },
      {
        id: "upsell_use", step: 4, label: "Upselling & Bundles", sublabel: "هل ستستخدم عروض upselling أو bundles؟",
        icon: "PlusCircle", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "عروض مجمعة" },
          { val: "no", title: "لا", desc: "بيع فردي" },
          { val: "partial", title: "جزئي", desc: "لبعض الأصناف" }
        ]
      },
      {
        id: "retention_loop", step: 4, label: "تحفيز الطلب", sublabel: "هل تفكر بتحفيز العملاء للطلب بشكل متكرر؟",
        icon: "RefreshCw", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "نظام ولاء/نقاط" },
          { val: "no", title: "لا", desc: "طلب عشوائي" },
          { val: "partial", title: "جزئي", desc: "كوبونات بسيطة" }
        ]
      },
      // STEP 5 - CAMPAIGNS
      {
        id: "short_campaign", step: 5, label: "حملات قصيرة", sublabel: "هل لديك خطة لتجربة حملات قصيرة المدى أولاً؟",
        icon: "Zap", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "اختبار سريع" },
          { val: "no", title: "لا", desc: "إطلاق كبير" },
          { val: "think", title: "أفكر فيها", desc: "قيد التخطيط" }
        ]
      },
      {
        id: "ab_testing", step: 5, label: "A/B Testing", sublabel: "هل ستجرب A/B Testing للمنتجات أو الأسعار؟",
        icon: "Split", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "مقارنة علمية" },
          { val: "no", title: "لا", desc: "قرار واحد" },
          { val: "partial", title: "جزئي", desc: "لبعض العروض" }
        ]
      },
      {
        id: "campaign_track", step: 5, label: "قياس الفعالية", sublabel: "هل لديك طريقة لقياس فعالية كل حملة مباشرة؟",
        icon: "BarChart", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تتبع ROAS/ROI" },
          { val: "no", title: "لا", desc: "مراقبة عامة" },
          { val: "partial", title: "جزئي", desc: "أرقام مبدئية" }
        ]
      },
      // STEP 6 - ANALYSIS
      {
        id: "daily_track", step: 6, label: "تحليل النتائج", sublabel: "هل ستراقب الطلبات يومياً لتعديل الاستراتيجية؟",
        icon: "Eye", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "رقابة لصيقة" },
          { val: "no", title: "لا", desc: "مراجعة شهرية" },
          { val: "partial", title: "جزئي", desc: "أوقات الذروة" }
        ]
      },
      {
        id: "forecast_comp", step: 6, label: "فجوة التوقعات", sublabel: "هل ستقارن النتائج مع توقعاتك الشهرية؟",
        icon: "Compare", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تحليل انحرافات" },
          { val: "no", title: "لا", desc: "متابعة واقعية" },
          { val: "partial", title: "جزئي", desc: "للإيرادات فقط" }
        ]
      },
      {
        id: "gap_action", step: 6, label: "خطوات التحسين", sublabel: "هل ستحدد خطوات التحسين بناءً على الفجوات؟",
        icon: "StepForward", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "إجراءات تصحيحية" },
          { val: "no", title: "لا", desc: "استمرار" },
          { val: "partial", title: "جزئي", desc: "تعديل بسيط" }
        ]
      },
      // STEP 7 - CX
      {
        id: "cust_feedback", step: 7, label: "تجربة العميل", sublabel: "هل ستسأل العملاء عن رأيهم بعد كل تجربة؟",
        icon: "MessageHeart", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "استبيان آلي" },
          { val: "no", title: "لا", desc: "تلقي الشكاوى" },
          { val: "partial", title: "جزئي", desc: "سؤال شفهي" }
        ]
      },
      {
        id: "wait_time_cut", step: 7, label: "سرعة التوصيل", sublabel: "هل ستسعى لتقليل أوقات الانتظار؟",
        icon: "Timer", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تحسين اللوجستيات" },
          { val: "no", title: "لا", desc: "وقت اعتيادي" },
          { val: "partial", title: "جزئي", desc: "مراقبة التأخير" }
        ]
      },
      {
        id: "gradual_quality", step: 7, label: "جودة المنتج", sublabel: "هل ستضع خطة لتحسين جودة المنتج تدريجيًا؟",
        icon: "Award", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تطوير مستمر" },
          { val: "no", title: "لا", desc: "المنتج الحالي" },
          { val: "partial", title: "جزئي", desc: "حل مشاكل" }
        ]
      },
      // STEP 8 - SCALE
      {
        id: "scale_ideas", step: 8, label: "التوسع المستقبلي", sublabel: "هل لديك فكرة عن التوسع في مناطق جديدة؟",
        icon: "Maximize2", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "خريطة توسع" },
          { val: "no", title: "لا", desc: "تركيز حالي" },
          { val: "think", title: "أفكر فيها", desc: "قيد الدراسة" }
        ]
      },
      {
        id: "scale_budget", step: 8, label: "ميزانية التوسع", sublabel: "هل ستضع خطة ميزانية للتوسع لاحقاً؟",
        icon: "Coins", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تمويل جاهز" },
          { val: "no", title: "لا", desc: "حسب الأرباح" },
          { val: "partial", title: "جزئي", desc: "تقدير أولي" }
        ]
      },
      {
        id: "scale_kpi", step: 8, label: "مؤشرات النجاح", sublabel: "هل ستحدد مؤشرات النجاح قبل التوسع؟",
        icon: "Flag", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "شروط قاسية" },
          { val: "no", title: "لا", desc: "قرار عاطفي" },
          { val: "partial", title: "جزئي", desc: "بعض الشروط" }
        ]
      }
    ]
  },
  revenue_acceleration: {
    id: "revenue_acceleration",
    title: "خطة الانطلاق المتسارع",
    subtitle: "تكتيكات الـ GTM (Go-To-Market) والنتائج السريعة",
    bannerTitle: "مسرِّع الانطلاق",
    bannerSubtitle: "اليوم الأول هو الأهم. جهز قائمة الإطلاق الخاصة بك لنتائج سريعة.",
    themeColor: "#8b5cf6", // Violet
    resultsTitle: "مانيفستو الانطلاق: تشخيص الجاهزية والسرعة",
    loadingMessages: [
      "مراجعة 'قائمة التحقق' (GTM Checklist)...",
      "تحليل 'وقت الدخول للسوق' (Time-to-Market)...",
      "إعداد تكتيكات 'تحسين معدل التحويل' (CRO)...",
    ],
    questions: [
      // STEP 1 - GOAL
      {
        id: "launch_goal", step: 1, label: "هدف الانطلاق", sublabel: "ما هو الهدف الرئيسي من الانطلاق خلال أول 30 يوم؟",
        icon: "Rocket", type: "cards", options: [
          { val: "open", title: "فتح العمليات", desc: "بدء فعلي" },
          { val: "test", title: "اختبار السوق", desc: "جس نبض" },
          { val: "attract", title: "جذب العملاء", desc: "أول 100" },
          { val: "verify", title: "تحقق الإيرادات", desc: "تدفق نقدي" }
        ]
      },
      {
        id: "launch_expect", step: 1, label: "التوقعات الرقمية", sublabel: "هل لديك توقعات رقمية للطلبات أو الإيرادات؟",
        icon: "Calculator", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "أرقام محددة" },
          { val: "no", title: "لا", desc: "لم أحدد بعد" },
          { val: "partial", title: "جزئي", desc: "تقدير أولي" }
        ]
      },
      {
        id: "launch_priority", step: 1, label: "ترتيب الأولويات", sublabel: "هل رتبت أولوياتك بين العملاء، المنتج، والتسويق؟",
        icon: "ListOrdered", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تركيز واضح" },
          { val: "no", title: "لا", desc: "توازن عام" },
          { val: "think", title: "أفكر فيه", desc: "قيد المراجعة" }
        ]
      },
      // STEP 2 - LEGAL
      {
        id: "legal_reg", step: 2, label: "تسجيل الأعمال", sublabel: "هل سجلت الاسم التجاري ومكاتبك القانونية؟",
        icon: "FileSignature", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "سجل تجاري جاهز" },
          { val: "no", title: "لا", desc: "لم أبدأ" },
          { val: "partial", title: "جزئي", desc: "بانتظار الموافقة" }
        ]
      },
      {
        id: "health_license", step: 2, label: "التراخيص المطلوبة", sublabel: "هل تحتاج إلى تراخيص البلدية أو الصحة؟",
        icon: "Stethoscope", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تراخيص مطلوبة" },
          { val: "no", title: "لا", desc: "غير مطلوبة حالياً" },
          { val: "think", title: "أفكر فيها", desc: "قيد الاستقصاء" }
        ]
      },
      {
        id: "legal_timeline", step: 2, label: "الجدولة القانونية", sublabel: "هل وضعت خطة زمنية لإتمام التراخيص؟",
        icon: "CalendarCheck", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تواريخ تسليم" },
          { val: "no", title: "لا", desc: "إجراءات مفتوحة" },
          { val: "partial", title: "جزئي", desc: "تقدير زمني" }
        ]
      },
      // STEP 3 - PLACE
      {
        id: "place_ready", step: 3, label: "تجهيز الموقع", sublabel: "هل لديك موقع فعلي أو مطبخ سحابي جاهز؟",
        icon: "Warehouse", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "جاهز للاستلام" },
          { val: "no", title: "لا", desc: "قيد البحث" },
          { val: "partial", title: "جزئي", desc: "قيد التشطيب" }
        ]
      },
      {
        id: "equip_list", step: 3, label: "المعدات الأساسية", sublabel: "هل حددت المعدات الأساسية التي تحتاجها؟",
        icon: "ChefHat", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "قائمة كاملة" },
          { val: "no", title: "لا", desc: "لم أحدد" },
          { val: "partial", title: "جزئي", desc: "المعدات الحرجة" }
        ]
      },
      {
        id: "equip_budget_flow", step: 3, label: "ميزانية المعدات", sublabel: "هل لديك خطة شراء أو استئجار ضمن ميزانيتك؟",
        icon: "CreditCard", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "خطة مالية واضحة" },
          { val: "no", title: "لا", desc: "حسب التساهيل" },
          { val: "partial", title: "جزئي", desc: "تمويل خارجي" }
        ]
      },
      // STEP 4 - SUPPLY
      {
        id: "main_suppliers", step: 4, label: "الموردين", sublabel: "هل حددت الموردين الأساسيين؟",
        icon: "Truck", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "اتفاقات نهائية" },
          { val: "no", title: "لا", desc: "جاري البحث" },
          { val: "partial", title: "جزئي", desc: "موردين بدلاء" }
        ]
      },
      {
        id: "priced_menu", step: 4, label: "المنيو والتسعير", sublabel: "هل وضعت قائمة من المنتجات مع الأسعار؟",
        icon: "ClipboardList", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "منيو جاهز" },
          { val: "no", title: "لا", desc: "قيد التسعير" },
          { val: "partial", title: "جزئي", desc: "أصناف تجريبية" }
        ]
      },
      {
        id: "quality_test_run", step: 4, label: "اختبار الجودة", sublabel: "هل اختبرت عينات المنتجات لضمان الجودة؟",
        icon: "CheckCircle", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تم التذوق/الفحص" },
          { val: "no", title: "لا", desc: "عند الإطلاق" },
          { val: "partial", title: "جزئي", desc: "تحسين مستمر" }
        ]
      },
      // STEP 5 - TEAM
      {
        id: "team_ready_now", step: 5, label: "جاهزية الفريق", sublabel: "هل لديك فريق جاهز للتشغيل من البداية؟",
        icon: "Users", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "طاقم كامل" },
          { val: "no", title: "لا", desc: "فردي حالياً" },
          { val: "partial", title: "جزئي", desc: "نقص في التخصصات" }
        ]
      },
      {
        id: "training_plan", step: 5, label: "خطة التدريب", sublabel: "هل وضعت خطة تدريب للموظفين الجدد؟",
        icon: "GraduationCap", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "برنامج تأهيلي" },
          { val: "no", title: "لا", desc: "تدريب على رأس العمل" },
          { val: "partial", title: "جزئي", desc: "دليل تشغيلي" }
        ]
      },
      {
        id: "resp_matrix", step: 5, label: "مصفوفة المسؤوليات", sublabel: "هل حددت مسؤوليات كل عضو بدقة؟",
        icon: "Layers", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "مهام واضحة" },
          { val: "no", title: "لا", desc: "تداخل مهام" },
          { val: "partial", title: "جزئي", desc: "توزيع مبدئي" }
        ]
      },
      // STEP 6 - LAUNCH MKT
      {
        id: "launch_mkt_plan", step: 6, label: "حملة الإطلاق", sublabel: "هل لديك خطة للإعلان عن الانطلاق؟",
        icon: "Megaphone", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "حملة افتتاح" },
          { val: "no", title: "لا", desc: "افتتاح هادئ" },
          { val: "partial", title: "جزئي", desc: "بعض المنشورات" }
        ]
      },
      {
        id: "launch_channels", step: 6, label: "قنوات الانطلاق", sublabel: "هل حددت القنوات الرقمية التي ستستخدمها؟",
        icon: "Share2", type: "cards", options: [
          { val: "tiktok", title: "TikTok", desc: "صناعة ترند" },
          { val: "insta", title: "Instagram", desc: "صور مبهرة" },
          { val: "wa", title: "WhatsApp", desc: "دائرة المعارف" },
          { val: "local", title: "محلي", desc: "توزيع ميداني" }
        ]
      },
      {
        id: "launch_offers", step: 6, label: "عروض الافتتاح", sublabel: "هل ستقدم عروضاً خاصة لجذب العملاء؟",
        icon: "Tag", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "خصومات افتتاح" },
          { val: "no", title: "لا", desc: "سعر عادي" },
          { val: "partial", title: "جزئي", desc: "هدايا عينية" }
        ]
      },
      // STEP 7 - SOFT RUN
      {
        id: "soft_launch", step: 7, label: "التشغيل التجريبي", sublabel: "هل ستجرب التشغيل لفترة قصيرة؟",
        icon: "PlayCircle", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "Soft Launch" },
          { val: "no", title: "لا", desc: "إطلاق مباشر" },
          { val: "partial", title: "جزئي", desc: "ليوم واحد" }
        ]
      },
      {
        id: "early_feedback", step: 7, label: "تعليقات البداية", sublabel: "هل ستجمع تعليقات العملاء الأوائل؟",
        icon: "MessageCircle", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تحسين فوري" },
          { val: "no", title: "لا", desc: "لاحقاً" },
          { val: "partial", title: "جزئي", desc: "للأصدقاء فقط" }
        ]
      },
      {
        id: "adj_method", step: 7, label: "تعديل الخدمات", sublabel: "هل لديك طريقة لتعديل المنيو بناءً على التجربة؟",
        icon: "Settings2", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "مرونة كاملة" },
          { val: "no", title: "لا", desc: "التزام بالخطة" },
          { val: "think", title: "أفكر فيه", desc: "حسب الضرورة" }
        ]
      },
      // STEP 8 - TOTAL GO
      {
        id: "trial_eval", step: 8, label: "تقييم التجربة", sublabel: "هل ستقيم النتائج التجريبية مقابل توقعاتك؟",
        icon: "BarChart", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تحليل جدوى" },
          { val: "no", title: "لا", desc: "انطلاق تلقائي" },
          { val: "partial", title: "جزئي", desc: "ملاحظات عامة" }
        ]
      },
      {
        id: "official_date", step: 8, label: "الموعد الرسمي", sublabel: "هل حددت موعدًا لإطلاق المشروع رسمياً؟",
        icon: "Calendar", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تاريخ محدد" },
          { val: "soon", title: "قريباً", desc: "لم يحدد بدقة" },
          { val: "partial", title: "جزئي", desc: "مرتبط بالتراخيص" }
        ]
      },
      {
        id: "post_launch_follow", step: 8, label: "متابعة الأداء", sublabel: "هل لديك خطة متابعة بعد الإطلاق؟",
        icon: "Activity", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "مراقبة نمو" },
          { val: "no", title: "لا", desc: "تركيز تشغيلي" },
          { val: "partial", title: "جزئي", desc: "تقارير أسبوعية" }
        ]
      }
    ]
  },
  final_decision: {
    id: "final_decision",
    title: "الاستنتاج النهائي",
    subtitle: "القرار الجوهري: (Go / No Go) والقرار الاستثماري",
    bannerTitle: "غرفة اتخاذ القرار",
    bannerSubtitle: "هنا نجمع كل الخيوط لنعطيك الخلاصة النهائية: هل مشروعك يستحق الاستثمار؟",
    themeColor: "#0f172a", // Slate/Black
    resultsTitle: "المذكرة الاستراتيجية النهائية: خلاصة الذكاء الاستثماري",
    loadingMessages: [
      "تجميع كافة نقاط البيانات من المختبرات السابقة...",
      "إجراء 'اختبار الضغط' (Stress Test) للنموذج النهائي...",
      "صياغة 'توصية الذكاء الاصطناعي' النهائية (Final Verdict)...",
    ],
    questions: [
      // STEP 1 - CURRENT READINESS
      {
        id: "overall_readiness", step: 1, label: "جاهزية المشروع", sublabel: "كيف تصف جاهزية مشروعك بشكل عام؟",
        icon: "Activity", type: "cards", options: [
          { val: "beginner", title: "مبتدئ", desc: "في المراحل الأولى" },
          { val: "half_ready", title: "نصف جاهز", desc: "بناء في العمل" },
          { val: "partially_ready", title: "جاهز جزئي", desc: "على وشك الاكتمال" }
        ]
      },
      {
        id: "swot_knowledge", step: 1, label: "نقاط القوة والضعف", sublabel: "هل تعرف أهم نقاط القوة والضعف في مشروعك؟",
        icon: "ShieldCheck", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "وضوح تام" },
          { val: "no", title: "لا", desc: "تحتاج تحليل" },
          { val: "partial", title: "جزئي", desc: "معرفة محدودة" }
        ]
      },
      {
        id: "kpi_raw_data", step: 1, label: "مؤشرات الأداء", sublabel: "هل لديك أرقام تقريبية لمؤشرات الأداء الحالية؟",
        icon: "BarChart3", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "بيانات متوفرة" },
          { val: "no", title: "لا", desc: "بدون أرقام" },
          { val: "partial", title: "جزئي", desc: "بعض الأرقام" }
        ]
      },
      // STEP 2 - RISK ASSESSMENT
      {
        id: "biggest_threat", step: 2, label: "التهديد الأكبر", sublabel: "ما هو أكبر تهديد تواجهه حاليًا؟",
        icon: "AlertTriangle", type: "cards", options: [
          { val: "financial", title: "مالي", desc: "تمويل وسيولة" },
          { val: "marketing", title: "تسويقي", desc: "جذب العملاء" },
          { val: "operational", title: "تشغيلي", desc: "إدارة العمل" },
          { val: "technical", title: "تقني", desc: "أنظمة وبرمجيات" }
        ]
      },
      {
        id: "risk_mitigation_plan", step: 2, label: "خطة المخاطر", sublabel: "هل لديك خطة لتقليل المخاطر المحتملة؟",
        icon: "LifeBuoy", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "خطة طوارئ" },
          { val: "no", title: "لا", desc: "بدون خطة" },
          { val: "partial", title: "جزئي", desc: "أفكار أولية" }
        ]
      },
      {
        id: "previous_experience", step: 2, label: "الخبرة السابقة", sublabel: "هل سبق وأن واجهت عقبات مشابهة في مشاريع سابقة؟",
        icon: "History", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "خبرة مكتسبة" },
          { val: "no", title: "لا", desc: "أول مرة" },
          { val: "partial", title: "جزئي", desc: "مواقف مشابهة" }
        ]
      },
      // STEP 3 - MARKET & COMPETITION
      {
        id: "competitor_knowledge", step: 3, label: "المنافسين", sublabel: "هل تعرف منافسيك الرئيسيين بشكل كامل؟",
        icon: "Users", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "دراسة شاملة" },
          { val: "no", title: "لا", desc: "معرفة سطحية" },
          { val: "partial", title: "جزئي", desc: "رؤية محدودة" }
        ]
      },
      {
        id: "competitor_pricing", step: 3, label: "دراسة الأسعار", sublabel: "هل درست أسعار وخدمات المنافسين؟",
        icon: "Search", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تحليل مالي" },
          { val: "no", title: "لا", desc: "لم أدرس بعد" },
          { val: "partial", title: "جزئي", desc: "مقارنة سريعة" }
        ]
      },
      {
        id: "unique_selling_prop", step: 3, label: "الميزة التنافسية", sublabel: "هل حددت الميزة التنافسية لمشروعك؟",
        icon: "Zap", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تميز واضح" },
          { val: "no", title: "لا", desc: "تحتاج تحديد" },
          { val: "partial", title: "جزئي", desc: "قيد التطوير" }
        ]
      },
      // STEP 4 - RESOURCE EVALUATION
      {
        id: "budget_3months", step: 4, label: "ميزانية التشغيل", sublabel: "هل لديك ميزانية كافية للتشغيل لمدة 3 أشهر؟",
        icon: "Wallet", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تمويل مؤمن" },
          { val: "no", title: "لا", desc: "نقص سيولة" },
          { val: "partial", title: "جزئي", desc: "تمويل لشهرين" }
        ]
      },
      {
        id: "hr_availability", step: 4, label: "الموارد البشرية", sublabel: "هل الموارد البشرية متاحة للعمل فورًا؟",
        icon: "Users2", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "فريق جاهز" },
          { val: "no", title: "لا", desc: "جاري التوظيف" },
          { val: "partial", title: "جزئي", desc: "نقص بسيط" }
        ]
      },
      {
        id: "tools_tech_ready", step: 4, label: "الأدوات والتقنيات", sublabel: "هل لديك أدوات وتقنيات مناسبة لإدارة المشروع؟",
        icon: "Cpu", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "أنظمة متكاملة" },
          { val: "no", title: "لا", desc: "أبحث عن حلول" },
          { val: "partial", title: "جزئي", desc: "تجهيز جزئي" }
        ]
      },
      // STEP 5 - GOALS
      {
        id: "first_month_goal", step: 5, label: "هدف الشهر الأول", sublabel: "ما هو الهدف المالي للشهر الأول؟",
        icon: "Target", type: "cards", options: [
          { val: "fixed_amount", title: "مبلغ محدد", desc: "رقم مستهدف" },
          { val: "market_test", title: "اختبار السوق", desc: "جس نبض" },
          { val: "undefined", title: "غير محدد", desc: "رؤية عامة" }
        ]
      },
      {
        id: "growth_3months", step: 5, label: "أهداف النمو", sublabel: "هل لديك أهداف نمو للثلاثة أشهر القادمة؟",
        icon: "TrendingUp", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "خطة توسع" },
          { val: "no", title: "لا", desc: "تركيز حالي" },
          { val: "partial", title: "جزئي", desc: "توقعات عامة" }
        ]
      },
      {
        id: "kpi_indicators", step: 5, label: "تتبع النجاح", sublabel: "هل حددت مؤشرات الأداء (KPIs) لتتبع النجاح؟",
        icon: "Compass", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "معايير رقمية" },
          { val: "no", title: "لا", desc: "بدون تتبع" },
          { val: "partial", title: "جزئي", desc: "معايير بسيطة" }
        ]
      },
      // STEP 6 - STRATEGIC DECISIONS
      {
        id: "radical_decisions", step: 6, label: "قرار جذري", sublabel: "هل أنت مستعد لاتخاذ قرارات جذرية لتقليل المخاطر؟",
        icon: "Layout", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "شجاعة تجارية" },
          { val: "no", title: "لا", desc: "تخوف من التغيير" },
          { val: "partial", title: "جزئي", desc: "تغيير محسوب" }
        ]
      },
      {
        id: "flexible_plan", step: 6, label: "مرونة الخطة", sublabel: "هل ستعتمد على خطة مرنة قابلة للتعديل؟",
        icon: "RefreshCw", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "استجابة سريعة" },
          { val: "no", title: "لا", desc: "ثبات كامل" },
          { val: "partial", title: "جزئي", desc: "تعديل محدود" }
        ]
      },
      {
        id: "priorities_balance", step: 6, label: "توازن الأولويات", sublabel: "هل وضعت أولويات واضحة بين النمو والجودة والتكاليف؟",
        icon: "ListChecks", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "ترتيب دقيق" },
          { val: "no", title: "لا", desc: "ضبابية الأولويات" },
          { val: "partial", title: "جزئي", desc: " موازنة أولية" }
        ]
      },
      // STEP 7 - EXPECTED RESULTS
      {
        id: "fast_financial_goals", step: 7, label: "سرعة الأهداف", sublabel: "هل تتوقع تحقيق أهدافك المالية بسرعة؟",
        icon: "Coins", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تحقيق سريع" },
          { val: "no", title: "لا", desc: "مدى طويل" },
          { val: "partial", title: "جزئي", desc: "نتائج متدرجة" }
        ]
      },
      {
        id: "dept_kpi", step: 7, label: "مؤشرات الأقسام", sublabel: "هل حددت مؤشرات نجاح واضحة لكل قسم من المشروع؟",
        icon: "Flag", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "توزيع مهام" },
          { val: "no", title: "لا", desc: "تقييم كلي" },
          { val: "partial", title: "جزئي", desc: "أقسام رئيسية" }
        ]
      },
      {
        id: "weekly_review", step: 7, label: "مراجعة أسبوعية", sublabel: "هل ستراجع نتائجك أسبوعيًا لضبط الخطة؟",
        icon: "RotateCcw", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تدقيق مستمر" },
          { val: "no", title: "لا", desc: "مراجعة ربعية" },
          { val: "partial", title: "جزئي", desc: "عند الحاجة" }
        ]
      },
      // STEP 8 - FINAL RECOMMENDATION
      {
        id: "ready_to_launch", step: 8, label: "الإطلاق الرسمي", sublabel: "هل أنت مستعد للإطلاق رسميًا بعد مراجعة كل التحليلات؟",
        icon: "Rocket", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "انطلاق فوري" },
          { val: "no", title: "لا", desc: "تأجيل التطوير" },
          { val: "thinking", title: "أفكر فيه", desc: "دراسة أخيرة" }
        ]
      },
      {
        id: "need_ai_recommend", step: 8, label: "توصيات الذكاء", sublabel: "هل تحتاج لتوصيات إضافية من الذكاء الاصطناعي لتقوية الخطة؟",
        icon: "Sparkles", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "تحسين ذكي" },
          { val: "no", title: "لا", desc: "خطة مستقلة" },
          { val: "partial", title: "جزئي", desc: "نقاط محددة" }
        ]
      },
      {
        id: "need_pdf_report", step: 8, label: "تقرير PDF", sublabel: "هل تريد تلخيص كل القرارات والخطط في تقرير نهائي PDF؟",
        icon: "FileText", type: "cards", options: [
          { val: "yes", title: "نعم", desc: "توثيق كامل" },
          { val: "no", title: "لا", desc: "ملخص رقمي" },
          { val: "partial", title: "جزئي", desc: "خلاصة الأداء" }
        ]
      }
    ]
  }
};
