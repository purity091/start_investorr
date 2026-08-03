const fs = require('fs');
const path = require('path');

const baseDir = 'c:/xampp/htdocs/l-start-investor/apps/web/public/data/academy';
const articlesDir = path.join(baseDir, 'articles');

if (!fs.existsSync(articlesDir)) {
  fs.mkdirSync(articlesDir, { recursive: true });
}

const categories = [
  {
    id: 'platform-core',
    title: 'دليل المنصة والهوية',
    description: 'تعرف على أدوات المنصة، الفرق بين النماذج، وكيفية تصفح رادار اليونيكورن ومعمل الفرص.',
    icon: 'Zap'
  },
  {
    id: 'finance',
    title: 'المفاهيم والتحليلات المالية',
    description: 'شرح مبسط وعميق لمصطلحات نقطة التعادل، صافي القيمة الحالية NPV، ومعدل العائد IRR.',
    icon: 'DollarSign'
  },
  {
    id: 'kpis',
    title: 'مؤشرات الأداء والنمو',
    description: 'فهم مؤشرات CAC, LTV, MRR, ARR ومعدل الحرق والمدى الزمني للنقدية.',
    icon: 'TrendingUp'
  },
  {
    id: 'strategy',
    title: 'الاستراتيجية والتنافسية',
    description: 'تكتيكات بناء الخندق التنافسي، صياغة القيمة الفريدة UVP، وتصميم نموذج العمل BMC.',
    icon: 'Target'
  },
  {
    id: 'execution',
    title: 'التخطيط والتنفيذ الميداني',
    description: 'تشخيص الاختناقات الحرجة، خطة أول 90 يوماً، ومحاكاة السيناريوهات المختلفة.',
    icon: 'CheckCircle2'
  }
];

const articlesData = [
  // Category 1: Platform Core
  {
    id: 'strategic-dashboard',
    slug: 'strategic-dashboard',
    title: 'النموذج الاحترافي (Strategic Dashboard)',
    subtitle: 'دليل فهم واستخدام لوحة التخطيط الاستراتيجي المتقدم لخطة الاستثمار',
    categoryId: 'platform-core',
    categoryName: 'دليل المنصة والهوية',
    readTime: '6 دقائق',
    difficulty: 'مبتدئ',
    updatedAt: '2026-08-03',
    icon: 'Zap',
    tags: ['النموذج الاحترافي', 'التحليل الاستراتيجي', 'الجدوى', 'خطة الاستثمار'],
    summary: 'فهم الفلسفة والنموذج الهيكلي للنموذج الاحترافي، ولماذا يُبنى على التحليل الاستراتيجي المنظم بدلاً من التخمين التلقائي.',
    keyTakeaway: 'النموذج الاحترافي يحول المدخلات الأولية للمستثمر إلى خريطة طريق تنفيذية متكاملة بـ 5 أبعاد استراتيجية ومالية محددة.',
    platformApplication: 'تجد هذا النموذج في القائمة الجانبية تحت عنوان "النموذج الاحترافي". يتيح لك إدخال تفاصيل مشروعك واستعراض التحليلات المالية وتقييم القرار النهائي فوراً.',
    tableOfContents: [
      { id: 'what-is-pro-model', title: 'ما هو النموذج الاحترافي؟' },
      { id: 'why-user-inputs', title: 'فلسفة الاعتماد على مدخلات المستثمر الصريحة' },
      { id: 'five-pillars', title: 'المحاور الخمسة الأساسية للنموذج' },
      { id: 'how-to-interpret', title: 'كيف تقرأ وتفسر القرار النهائي؟' }
    ],
    sections: [
      {
        id: 'what-is-pro-model',
        heading: 'ما هو النموذج الاحترافي؟',
        content: 'النموذج الاحترافي هو العمود الفقري المتقدم لتحليل المشاريع في منصتنا. يُقدم لك واجهة تفاعلية شاملة تجمع بين التحليل المالي المتقدم، الجدوى الاستثمارية، خطة النمو، وخريطة الطريق التنفيذية بناءً على مدخلاتك الحقيقية وتوقعاتك الميدانية.',
        callout: {
          type: 'tip',
          title: 'نصيحة استراتيجية',
          text: 'النموذج الاحترافي مُصمم لخدمة المستثمرين والمؤسسين الذين يبحثون عن دراسة حقيقية قابلة للتطبيق أمام الشركاء والبنك.'
        }
      },
      {
        id: 'why-user-inputs',
        heading: 'فلسفة الاعتماد على مدخلات المستثمر الصريحة',
        content: 'تم تصميم النموذج ليعالج مدخلاتك الصريحة ودراستك الفعلية للسوق، بدلاً من إعطائك أرقاماً وهمية أو نصوصاً عامة. هذا يضمن أن النتائج والمؤشرات المالية تعكس الواقع الفعلي لمشروعك وقدرتك الميدانية على التنفيذ والالتزام.'
      },
      {
        id: 'five-pillars',
        heading: 'المحاور الخمسة الأساسية للنموذج',
        content: 'يتكون النموذج الاحترافي من 5 تبويبات رئيسية: 1) النبض الاستراتيجي (Strategic Pulse) لتحديد الرؤية، 2) الجدوى المالية والتكاليف لتحديد نقطة التعادل، 3) خطة النمو والتسويق، 4) مسار التنفيذ العملي، 5) القرار النهائي والتوصية التنفيذية.'
      },
      {
        id: 'how-to-interpret',
        heading: 'كيف تقرأ وتفسر القرار النهائي؟',
        content: 'في نهاية النموذج، يُعطيك النظام ملخصاً تنفذياً وتقييماً واضحاً لمستوى الجاهزية والخطوات الموصى بها للانطلاق، بالإضافة لتحديد المخاطر والأولويات لضمان عدم التعثر.'
      }
    ],
    relatedArticles: ['easy-vs-pro-model', 'break-even-point', 'scenario-simulator']
  },
  {
    id: 'easy-vs-pro-model',
    slug: 'easy-vs-pro-model',
    title: 'الفرق بين النموذج السهل والنموذج الاحترافي',
    subtitle: 'مقارنة بين مساري التخطيط السريع والدراسة الشاملة في المنصة',
    categoryId: 'platform-core',
    categoryName: 'دليل المنصة والهوية',
    readTime: '4 دقائق',
    difficulty: 'مبتدئ',
    updatedAt: '2026-08-03',
    icon: 'Sparkles',
    tags: ['النموذج السهل', 'النموذج الاحترافي', 'مقارنة', 'المسارات'],
    summary: 'متى تختار النموذج السهل لبناء فكرة سريعة، ومتى تنتقل للنموذج الاحترافي لبناء دراسة جدوى استثمارية مكتملة الأركان.',
    keyTakeaway: 'النموذج السهل هو البوابة السريعة لاختبار الفكرة في 5 دقائق، بينما النموذج الاحترافي هو وثيقتك التنفيذية أمام المستثمرين والشركاء.',
    platformApplication: 'يمكنك التبديل بين النموذج السهل والنموذج الاحترافي مباشرة عبر القائمة الجانبية قسم "بناء دراسة جدوى مشروع".',
    tableOfContents: [
      { id: 'easy-model-purpose', title: 'الهدف من النموذج السهل' },
      { id: 'pro-model-purpose', title: 'الهدف من النموذج الاحترافي' },
      { id: 'comparison-table', title: 'جدول الفروق الرئيسية' }
    ],
    sections: [
      {
        id: 'easy-model-purpose',
        heading: 'الهدف من النموذج السهل',
        content: 'صُمم النموذج السهل للمبتدئين وللأفكار في مراحلها الأولى. يُجيب على 6 أسئلة مبسطة ليمنحك انطباعاً أولياً وتوجيهاً استراتيجياً سريعاً حول القيمة المضافة والشريحة المستهدفة.'
      },
      {
        id: 'pro-model-purpose',
        heading: 'الهدف من النموذج الاحترافي',
        content: 'مخصص للمشاريع القائمة أو الأفكار الناضجة التي تحتاج دراسة مالية وتشغيلية دقيقة تتضمن حساب نقطة التعادل، الإيراد المكرر، تشخيص الاختناقات، وخريطة طريق 90 يوماً.'
      },
      {
        id: 'comparison-table',
        heading: 'جدول الفروق الرئيسية',
        content: 'النموذج السهل: وقت الإدخال (3-5 دقائق)، الجمهور (صاحب الفكرة)، التفاصيل المالية (تقديرية أساسية).\nالنموذج الاحترافي: وقت الإدخال (10-15 دقيقة)، الجمهور (المستثمر والبنك والشركاء)، التفاصيل المالية (حسابات تفصيلية، سيناريوهات متعددة).'
      }
    ],
    relatedArticles: ['strategic-dashboard', 'market-discovery-guide']
  },
  {
    id: 'market-discovery-guide',
    slug: 'market-discovery-guide',
    title: 'دليل استكشاف السوق ورادار القطاعات',
    subtitle: 'كيف تستفيد من أرقام أكثر من 90 قطاعاً اقتصادياً لبناء مشروعك',
    categoryId: 'platform-core',
    categoryName: 'دليل المنصة والهوية',
    readTime: '5 دقائق',
    difficulty: 'متوسط',
    updatedAt: '2026-08-03',
    icon: 'Compass',
    tags: ['استكشاف السوق', 'القطاعات', 'التجارة', 'الفجوات السوقية'],
    summary: 'كيفية قراءة بيانات الإنتاج، الاستهلاك، وحجم السوق لكل قطاع لاكتشاف الفرص الحقيقية قبل كتابة الخطط.',
    keyTakeaway: 'البيانات التاريخية ومؤشرات التجارة الدولية في قسم استكشاف السوق تجنبك دخول قطاعات مشبعة وتوجهك للقطاعات الواعدة.',
    platformApplication: 'تصفح قسم "استكشاف السوق" وقسم "المشكلات والفرص" في القائمة الجانبية لاستكشاف حجم قطاعك قبل البدء بدراسة الجدوى.',
    tableOfContents: [
      { id: 'sector-data-sources', title: 'مصادر وتغطية البيانات' },
      { id: 'how-to-find-gaps', title: 'كيف تكتشف الفجوة السوقية؟' },
      { id: 'linking-to-plan', title: 'ربط بيانات القطاع بالدراسة' }
    ],
    sections: [
      {
        id: 'sector-data-sources',
        heading: 'مصادر وتغطية البيانات',
        content: 'يحتوي قسم استكشاف السوق على مؤشرات مفصلة لأكثر من 90 قطاعاً شاملاً (التقنية، الزراعة، الصحة، التصنيع، العقارات، الخدمات) مقسمة بشكل تفاعلي يعرض حجم الإنتاج والتصدير والاستيراد.'
      },
      {
        id: 'how-to-find-gaps',
        heading: 'كيف تكتشف الفجوة السوقية؟',
        content: 'ابحث عن القطاعات التي يزداد فيها حجم الاستيراد وتراجع الإنتاج المحلي، أو القطاعات ذات النمو السنوي العالي مع قلة المنافسين المباشرين.'
      },
      {
        id: 'linking-to-plan',
        heading: 'ربط بيانات القطاع بالدراسة',
        content: 'استخدم أرقام متوسطات القطاع كمرجع أساسي عند تقدير أسعار منتجاتك وتكاليف التسويق في النموذج الاحترافي لضمان التوافق مع واقع السوق.'
      }
    ],
    relatedArticles: ['strategic-dashboard', 'proven-failed-projects-guide']
  },
  {
    id: 'proven-failed-projects-guide',
    slug: 'proven-failed-projects-guide',
    title: 'معمل التجربة: تعلم من الشركات الناجحة والفاشلة',
    subtitle: 'قاعدة بيانات تحليلية لدراسة نماذج الأعمال وقصص الدروس المستفادة',
    categoryId: 'platform-core',
    categoryName: 'دليل المنصة والهوية',
    readTime: '5 دقائق',
    difficulty: 'متوسط',
    updatedAt: '2026-08-03',
    icon: 'Lightbulb',
    tags: ['شركات ناجحة', 'شركات فشلت', 'دروس مستفادة', 'SaaS'],
    summary: 'دليل التعامل مع معرض الشركات الناجحة (Proven) والمعرض التحليلي للشركات التي أفلست لتفادي أخطائها.',
    keyTakeaway: 'دراسة أسباب فشل المشاريع المماثلة توفر عليك ملايين الريالات وسنوات من محاولة تجربة خيارات أثبتت عدم جدواها.',
    platformApplication: 'تصفح قسم "أفكار شركات ناجحة" وقسم "شركات فشلت" من القائمة الجانبية لقراءة التحليلات واستلهام الأفكار.',
    tableOfContents: [
      { id: 'proven-gallery-value', title: 'قيمة قسم أفكار شركات ناجحة' },
      { id: 'failed-gallery-lessons', title: 'دروس معمل المشاريع التي فشلت' }
    ],
    sections: [
      {
        id: 'proven-gallery-value',
        heading: 'قيمة قسم أفكار شركات ناجحة',
        content: 'يستعرض نماذج عمل محددة مع أرقام إيراداتها، تقنياتها، وقنوات توزيعها لتسريع نمذجة فكرتك واستنساخ التكتيكات الناجحة.'
      },
      {
        id: 'failed-gallery-lessons',
        heading: 'دروس معمل المشاريع التي فشلت',
        content: 'يحلل أسباب الانهيار المحددة (مثل: عدم ملاءمة المنتج للسوق، الحرق المالي السريع، الشراكات الخاطئة) لتحصين مشروعك ضد القاتل الصامت.'
      }
    ],
    relatedArticles: ['economic-moats', 'critical-bottlenecks']
  },

  // Category 2: Finance
  {
    id: 'break-even-point',
    slug: 'break-even-point',
    title: 'نقطة التعادل (Break-even Point)',
    subtitle: 'حجم المبيعات الحرج لتغطية التكاليف وبداية الربحية الصافية',
    categoryId: 'finance',
    categoryName: 'المفاهيم والتحليلات المالية',
    readTime: '6 دقائق',
    difficulty: 'مبتدئ',
    updatedAt: '2026-08-03',
    icon: 'DollarSign',
    tags: ['نقطة التعادل', 'الربحية', 'التكاليف الثابتة', 'التحليل المالي'],
    summary: 'كيفية تحديد نقطة الأمان في مشروعك التي تتساوى عندها الإيرادات مع التكاليف الكلية للبدء في تحقيق الأرباح.',
    keyTakeaway: 'نقطة التعادل تعكس مستوى المخاطرة المالي؛ كلما انخفضت نقطة التعادل، زادت قدرة مشروعك على البقاء.',
    platformApplication: 'تُحسب تلقائياً في تبويب "الجدوى المالية" بالنموذج الاحترافي بناءً على التكاليف الثابتة والتكاليف المتغيرة التي تدخلها.',
    tableOfContents: [
      { id: 'definition', title: 'تعريف نقطة التعادل' },
      { id: 'formula', title: 'معادلة حساب نقطة التعادل' },
      { id: 'fixed-vs-variable', title: 'التكاليف الثابتة مقابل المتغيرة' },
      { id: 'practical-example', title: 'مثال عملي تطبيقي' }
    ],
    sections: [
      {
        id: 'definition',
        heading: 'تعريف نقطة التعادل',
        content: 'نقطة التعادل هي حجم المبيعات (بالوحدات أو بالقيمة النقدية) الذي يتساوى عنده إجمالي الإيراد مع إجمالي التكاليف (الثابتة والمتغيرة)، بحيث يكون صافي ربح المشروع يدمج الصفر تماماً.'
      },
      {
        id: 'formula',
        heading: 'معادلة حساب نقطة التعادل',
        content: 'نقطة التعادل بالوحدات = التكاليف الثابتة الإجمالية ÷ (سعر بيع الوحدة - التكلفة المتغيرة للوحدة).\nنقطة التعادل النقدية = نقطة التعادل بالوحدات × سعر بيع الوحدة.'
      },
      {
        id: 'fixed-vs-variable',
        heading: 'التكاليف الثابتة مقابل المتغيرة',
        content: 'التكاليف الثابتة: المصاريف التي تدفعها بغض النظر عن حجم البيع (الإيجار، الرواتب الأساسية، الاشتراكات).\nالتكاليف المتغيرة: المصاريف التي ترتبط بكل وحدة مبيعة (المواد الخام، عمولة البوابة المالية، التغليف).'
      },
      {
        id: 'practical-example',
        heading: 'مثال عملي تطبيقي',
        content: 'متجر يبيع اشتراكاً بـ 100 ريال، تكلفته المتغيرة 20 ريال، وتكاليفه الثابتة الشهري 16,000 ريال.\nهامش المساهمة = 100 - 20 = 80 ريال.\nنقطة التعادل = 16,000 ÷ 80 = 200 مشترك شهرياً لتغطية المصاريف.'
      }
    ],
    relatedArticles: ['capex-vs-opex', 'npv-irr-valuation', 'scenario-simulator']
  },
  {
    id: 'capex-vs-opex',
    slug: 'capex-vs-opex',
    title: 'التكاليف الرأسمالية (Capex) مقابل التكاليف التشغيلية (Opex)',
    subtitle: 'كيف تفرق بين مصاريف التأسيس ومصاريف الاستمرار اليومي',
    categoryId: 'finance',
    categoryName: 'المفاهيم والتحليلات المالية',
    readTime: '5 دقائق',
    difficulty: 'مبتدئ',
    updatedAt: '2026-08-03',
    icon: 'DollarSign',
    tags: ['Capex', 'Opex', 'التكاليف', 'الميزانية', 'التأسيس'],
    summary: 'فهم الفارق الهيكلي بين نفقات شراء الأصول الثابتة وبين المصاريف الدورية الناتجة عن التشغيل الميداني.',
    keyTakeaway: 'التقليل من Capex في بداية المشروع يرفع من مرونتك المالية ويسمح بتوجيه السيولة نحو التسويق والنمو.',
    platformApplication: 'تُدخل التكاليف الرأسمالية والتكاليف التشغيلية في الجدول المالي بالنموذج الاحترافي لتقدير رأس المال المطلوب.',
    tableOfContents: [
      { id: 'what-is-capex', title: 'ما هي التكاليف الرأسمالية (Capex)؟' },
      { id: 'what-is-opex', title: 'ما هي التكاليف التشغيلية (Opex)؟' },
      { id: 'impact-on-cashflow', title: 'الأثر على التدفقات النقدية' }
    ],
    sections: [
      {
        id: 'what-is-capex',
        heading: 'ما هي التكاليف الرأسمالية (Capex)؟',
        content: 'هي الأموال التي تشتري بها أصولاً طويلة الأجل تستخدمها لأكثر من سنة (مثل المعدات، الأجهزة، الديكورات، أو ملكية وتطوير البرمجيات الأساسية).'
      },
      {
        id: 'what-is-opex',
        heading: 'ما هي التكاليف التشغيلية (Opex)؟',
        content: 'هي المصاريف المستمرة اليومية والشهرية لإبقاء العمل عالقاً ومنتجاً (مثل الرواتب، الفواتير، الإيجار، الإعلانات الدوريّة، الصيانة).'
      },
      {
        id: 'impact-on-cashflow',
        heading: 'الأثر على التدفقات النقدية',
        content: 'التركيز على نماذج التشغيل الخفيفة (Asset-Light Model) يحول Capex الضخم إلى Opex مرن قابل للزيادة أو الخفض بحسب ظروف المبيعات.'
      }
    ],
    relatedArticles: ['break-even-point', 'burn-rate-runway']
  },
  {
    id: 'npv-irr-valuation',
    slug: 'npv-irr-valuation',
    title: 'صافي القيمة الحالية (NPV) ومعدل العائد الداخلي (IRR)',
    subtitle: 'المقاييس الاستثمارية المتقدمة لتقييم جدوى المشروعات',
    categoryId: 'finance',
    categoryName: 'المفاهيم والتحليلات المالية',
    readTime: '7 دقائق',
    difficulty: 'متقدم',
    updatedAt: '2026-08-03',
    icon: 'TrendingUp',
    tags: ['NPV', 'IRR', 'التقييم الاستثماري', 'القيمة الزمنية للنقود'],
    summary: 'أدوات تقييم القرار الاستثماري لتحديد القيمة النقدية المستقبلية بالأسعار الحالية ومقارنة العائد بالبدائل المتاحة.',
    keyTakeaway: 'إذا كان الـ NPV موجباً والـ IRR أعلى من تكلفة رأس المال أو العائد المتوقع من الودائع والعقار، فالمشروع مجدٍ اقتصادياً.',
    platformApplication: 'تُستعرض هذه النسب في قسم التقييم الاستثماري المتقدم بالمنصة لمساعدة المستثمرين والشريك في اتخاذ قرار الدخول.',
    tableOfContents: [
      { id: 'npv-concept', title: 'مفهوم صافي القيمة الحالية (NPV)' },
      { id: 'irr-concept', title: 'مفهوم معدل العائد الداخلي (IRR)' },
      { id: 'decision-rule', title: 'قاعدة اتخاذ القرار الاستثماري' }
    ],
    sections: [
      {
        id: 'npv-concept',
        heading: 'مفهوم صافي القيمة الحالية (NPV)',
        content: 'هو خصم التدفقات النقدية المستقبلية المتوقعة للمشروع بقيمتها الحالية (Present Value) باستخدام معدل خصم محدد، مطروحاً منها رأس المال الأولي. الـ NPV الموجب يعني زيادة ثروة المستثمر.'
      },
      {
        id: 'irr-concept',
        heading: 'مفهوم معدل العائد الداخلي (IRR)',
        content: 'هو معدل الخصم الذي يجعل قيمة الـ NPV تساوي صفراً تماماً. يمثل النسبة المئوية السنوية للعائد الناتج عن رأس المال المستثمر داخل المشروع.'
      },
      {
        id: 'decision-rule',
        heading: 'قاعدة اتخاذ القرار الاستثماري',
        content: 'يقارن المستثمر الـ IRR بـ تكلفة رأس المال (WACC) أو عائد الاستثمار في العقار والأسهُم. الفارق الإيجابي الكبير يعكس خياراً استثمارياً جاذباً ومثمراً.'
      }
    ],
    relatedArticles: ['break-even-point', 'gross-vs-net-margin']
  },
  {
    id: 'gross-vs-net-margin',
    slug: 'gross-vs-net-margin',
    title: 'هامش الربح الإجمالي مقابل صافي الربح',
    subtitle: 'فهم المؤشرات الحاكمة لربحية المبيعات وربحية الشركة النهائية',
    categoryId: 'finance',
    categoryName: 'المفاهيم والتحليلات المالية',
    readTime: '5 دقائق',
    difficulty: 'مبتدئ',
    updatedAt: '2026-08-03',
    icon: 'DollarSign',
    tags: ['هامش الربح', 'Gross Margin', 'Net Margin', 'الأرباح'],
    summary: 'الفارق الجوهري بين ربحية المنتج الفردي بعد تكلفته المباشرة وبين ما يتبقى في خزانة الشركة بعد كل المصاريف.',
    keyTakeaway: 'قد تمتلك هامش ربح إجمالي ممتاز 80% ولكن تفلس إذا كانت التكاليف الإدارية والتسويقية تأكل كامل الأرباح.',
    platformApplication: 'تظهر الهوامش الربحية في ملخص الجدول المالي بالنموذج الاحترافي لمساعدتك على ضبط الأسعار والتكاليف.',
    tableOfContents: [
      { id: 'gross-margin', title: 'هامش الربح الإجمالي (Gross Margin)' },
      { id: 'net-margin', title: 'هامش الربح الصافي (Net Margin)' },
      { id: 'healthy-targets', title: 'المستهدفات الصحية لكل قطاع' }
    ],
    sections: [
      {
        id: 'gross-margin',
        heading: 'هامش الربح الإجمالي (Gross Margin)',
        content: 'يحسب كـ (الإيرادات - التكلفة المباشرة للبضاعة المبيعة COGS) ÷ الإيرادات. يعكس كفاءة تسعير وتصنيع أو تقديم المنتج نفسه.'
      },
      {
        id: 'net-margin',
        heading: 'هامش الربح الصافي (Net Margin)',
        content: 'يحسب كـ (صافي الربح النهائي بعد التكاليف الإدارية، التسويق، الاستهلاك والضرائب) ÷ الإيرادات. يعكس كفاءة إدارة المشروع كاملاً.'
      },
      {
        id: 'healthy-targets',
        heading: 'المستهدفات الصحية لكل قطاع',
        content: 'مشاريع SaaS البرمجية: هامش إجمالي 70%-85%، هامش صافي 20%-30%.\nالمطاعم والتجارة: هامش إجمالي 40%-60%، هامش صافي 10%-18%.'
      }
    ],
    relatedArticles: ['break-even-point', 'mrr-arr-metrics']
  },

  // Category 3: KPIs
  {
    id: 'ltv-cac-ratio',
    slug: 'ltv-cac-ratio',
    title: 'نسبة القيمة الدائمة إلى تكلفة الاستحواذ (LTV : CAC)',
    subtitle: 'المعيار الذهبي لقياس كفاءة النمو والاستثمار التسويقي',
    categoryId: 'kpis',
    categoryName: 'مؤشرات الأداء والنمو',
    readTime: '5 دقائق',
    difficulty: 'متوسط',
    updatedAt: '2026-08-03',
    icon: 'TrendingUp',
    tags: ['LTV', 'CAC', 'مؤشرات النمو', 'التسويق', 'استحواذ العملاء'],
    summary: 'العلاقة التناسبية الاستراتيجية بين ما تنفقه لجلب العميل الجديد وبين ما يكسبه مشروعك من العميل طوال فترة تعامله.',
    keyTakeaway: 'النسبة الصحية الذهبيه هي 3:1؛ أطول فترة سداد تكلفة الاستحواذ Payback Period يجب ألا تتجاوز 12 شهراً.',
    platformApplication: 'يتم تحليل وتصور هذه النسبة في قسم "تسريع الإيرادات والنمو" في لوحة تحكم النموذج الاحترافي.',
    tableOfContents: [
      { id: 'cac-explained', title: 'ما هي تكلفة الاستحواذ (CAC)؟' },
      { id: 'ltv-explained', title: 'ما هي القيمة الدائمة (LTV)؟' },
      { id: 'ratio-analysis', title: 'تحليل وتفسير النسب' }
    ],
    sections: [
      {
        id: 'cac-explained',
        heading: 'ما هي تكلفة الاستحواذ (CAC)؟',
        content: 'إجمالي مصاريف التسويق والمبيعات ومكافآت الفريق مقسومة على عدد العملاء الجدد المكتسبين خلال نفس الفترة.'
      },
      {
        id: 'ltv-explained',
        heading: 'ما هي القيمة الدائمة (LTV)؟',
        content: 'إجمالي صافي الربح المتوقع الحصول عليه من العميل طوال عمر تعامله مع المنتج (متوسط قيمة الشراء × تكرار الشراء × متوسط عمر العميل).'
      },
      {
        id: 'ratio-analysis',
        heading: 'تحليل وتفسير النسب',
        content: '1:1 = خسارة مادية متواصلة.\n3:1 = نمو صحي وتوازن ممتاز.\n5:1 = فرصة لتسريع الإنفاق التسويقي واكتساب شريحة أكبر.'
      }
    ],
    relatedArticles: ['mrr-arr-metrics', 'churn-rate-reduction']
  },
  {
    id: 'mrr-arr-metrics',
    slug: 'mrr-arr-metrics',
    title: 'الإيراد الشهري المكرر (MRR) والإيراد السنوي (ARR)',
    subtitle: 'شريان التنبؤ المالي لنماذج الاشتراكات وخدمات SaaS',
    categoryId: 'kpis',
    categoryName: 'مؤشرات الأداء والنمو',
    readTime: '4 دقائق',
    difficulty: 'مبتدئ',
    updatedAt: '2026-08-03',
    icon: 'TrendingUp',
    tags: ['MRR', 'ARR', 'SaaS', 'الاشتراكات', 'الإيراد المكرر'],
    summary: 'المؤشر الأهم للتدفقات النقدية المتوقعة والثابتة شهرياً وسنوياً بعيداً عن المبيعات الموسمية العشوائية.',
    keyTakeaway: 'النمو الحقيقي في MRR يأتي من تقليل التسرب والتوسع مع العملاء الحاليين Expansion MRR.',
    platformApplication: 'يُعرض في نماذج SaaS، أفكار Micro-SaaS وفي الجداول النمذجية بالنموذج الاحترافي.',
    tableOfContents: [
      { id: 'mrr-definition', title: 'تعريف الـ MRR و الـ ARR' },
      { id: 'components-of-mrr', title: 'أجزاء ومكونات الـ MRR' }
    ],
    sections: [
      {
        id: 'mrr-definition',
        heading: 'تعريف الـ MRR و الـ ARR',
        content: 'MRR هو الإيراد الشهري المكرر المتوقع تحصيله من اشتراكات العملاء الفاعلين. ARR هو قيمته المضروبة في 12 لتمثيل السنة الكاملة.'
      },
      {
        id: 'components-of-mrr',
        heading: 'أجزاء ومكونات الـ MRR',
        content: 'New MRR: من عملاء جدد.\nExpansion MRR: من ترقية باقات العملاء الحاليين.\nChurned MRR: الإيراد المفقود بسبب إلغاء الاشتراكات.'
      }
    ],
    relatedArticles: ['ltv-cac-ratio', 'churn-rate-reduction']
  },
  {
    id: 'churn-rate-reduction',
    slug: 'churn-rate-reduction',
    title: 'معدل التسرب والارتداد (Churn Rate)',
    subtitle: 'قياس نسبة العملاء المغادرين وكيفية حماية قاعدتك من التسرب',
    categoryId: 'kpis',
    categoryName: 'مؤشرات الأداء والنمو',
    readTime: '5 دقائق',
    difficulty: 'متوسط',
    updatedAt: '2026-08-03',
    icon: 'TrendingUp',
    tags: ['Churn Rate', 'التسرب', 'الاحتفاظ بالعملاء', 'SaaS'],
    summary: 'النسبة المئوية للعملاء أو الإيرادات المغادرة للمشروع خلال فترة معينة وأثرها على النمو الكلي.',
    keyTakeaway: 'التسرب المرتفع كالماء المصبوب في دلو مكسور؛ مهما أنفقت على التسويق لن تنمو حتى تسد ثقب التسرب.',
    platformApplication: 'يُدخل مؤشر التسرب في حسابات الاستحواذ والنمو بالمنصة لتحديد صافي النمو المتوقع.',
    tableOfContents: [
      { id: 'churn-types', title: 'أنواع التسرب (عملاء مقابل إيراد)' },
      { id: 'negative-churn', title: 'مفهوم التسرب السلبي الممتاز (Negative Churn)' }
    ],
    sections: [
      {
        id: 'churn-types',
        heading: 'أنواع التسرب (عملاء مقابل إيراد)',
        content: 'تسرب العملاء Customer Churn: نسبة المشتركين الذين ألغوا خدمتهم.\nتسرب الإيراد Revenue Churn: النسبة المئوية للمبالغ المالية المفقودة بسبب الإلغاء أو تخفيض الباقات.'
      },
      {
        id: 'negative-churn',
        heading: 'مفهوم التسرب السلبي الممتاز (Negative Churn)',
        content: 'يحدث عندما تتفوق الإيرادات المكتسبة من ترقيات العملاء الحاليين على الإيرادات المفقودة من العملاء الذين ألغوا اشتراكهم.'
      }
    ],
    relatedArticles: ['mrr-arr-metrics', 'burn-rate-runway']
  },
  {
    id: 'burn-rate-runway',
    slug: 'burn-rate-runway',
    title: 'معدل الحرق والمدى الزمني للنقدية (Burn Rate & Runway)',
    subtitle: 'سرعة استهلاك السيولة وعدد الأشهر المتبقية قبل نفاذ النقدية',
    categoryId: 'kpis',
    categoryName: 'مؤشرات الأداء والنمو',
    readTime: '5 دقائق',
    difficulty: 'متوسط',
    updatedAt: '2026-08-03',
    icon: 'TrendingUp',
    tags: ['Burn Rate', 'Runway', 'السيولة', 'النقدية', 'إدارة المال'],
    summary: 'قياس كمية النقد الصافي المستهلك شهرياً وحساب عدد الأشهر المتبقية لاستمرار العمليات بأمان.',
    keyTakeaway: 'المدى الزمني للنقدية (Runway) يجب ألا يقل عن 6 إلى 12 شهراً لتغطية أي تقلبات ومخاطر استئناف المبيعات.',
    platformApplication: 'يتم احتسابه وتنبيهك به في التخطيط المالي وتوقعات الدخل بالنموذج الاحترافي.',
    tableOfContents: [
      { id: 'gross-vs-net-burn', title: 'الحرق الإجمالي مقابل الصافي' },
      { id: 'calculating-runway', title: 'حساب المدى الزمني Runway' }
    ],
    sections: [
      {
        id: 'gross-vs-net-burn',
        heading: 'الحرق الإجمالي مقابل الصافي',
        content: 'الحرق الإجمالي Gross Burn: إجمالي المصاريف التشغيلية الشهرية.\nالحرق الصافي Net Burn: المصاريف التشغيلية مطروحاً منها الإيرادات الفعلية المحصلة.'
      },
      {
        id: 'calculating-runway',
        heading: 'حساب المدى الزمني Runway',
        content: 'المدى الزمني بالشهور = الرصيد النقدي المتوفر بالبنك ÷ صافي معدل الحرق الشهري. إذا كان لديك 300,000 ريال والحرق الصافي 30,000 ريال فالـ Runway هو 10 أشهر.'
      }
    ],
    relatedArticles: ['capex-vs-opex', 'break-even-point']
  },

  // Category 4: Strategy
  {
    id: 'economic-moats',
    slug: 'economic-moats',
    title: 'تطوير الخندق التنافسي (Economic Moat)',
    subtitle: 'استراتيجية بناء حصن تنافسي يحمي مشروعك من التقليد',
    categoryId: 'strategy',
    categoryName: 'الاستراتيجية والتنافسية',
    readTime: '6 دقائق',
    difficulty: 'متوسط',
    updatedAt: '2026-08-03',
    icon: 'Target',
    tags: ['الخندق التنافسي', 'الميزة التنافسية', 'الاستراتيجية', 'الحماية'],
    summary: 'كيفية صنع خصائص ومميزات هيكلية تجعل العميل يستمر معك ويصعب على المنافسين سلب حصتك السوقية.',
    keyTakeaway: 'الخندق التنافسي الحقيقي يعتمد على تكاليف التحول عالية القيمة، تأثير الشبكة، أو احتكار المعرفة الميدانية.',
    platformApplication: 'تُحدد خندقك التنافسي وتصيغه في تبويب "النبض الاستراتيجي" وخريطة القيمة الفريدة UVP بالمنصة.',
    tableOfContents: [
      { id: 'moat-types', title: 'أنواع الخنادق التنافسية الرئيسية' },
      { id: 'startup-moats', title: 'كيف يبني المشروع الناشئ خندقاً؟' }
    ],
    sections: [
      {
        id: 'moat-types',
        heading: 'أنواع الخنادق التنافسية الرئيسية',
        content: '1) تأثير الشبكة Network Effects. 2) تكاليف التحول Switching Costs. 3) كفاءة التكلفة والحجم Cost Advantage. 4) أصول الملكية والعلامة التجارية Intangibles.'
      },
      {
        id: 'startup-moats',
        heading: 'كيف يبني المشروع الناشئ خندقاً؟',
        content: 'بالتركيز على شريحة سوقية دقيقة جداً (Niche Market)، تقديم سرعة استثنائية في الخدمة، وتأسيس علاقة موثوقة ومباشرة مع العملاء الأولين.'
      }
    ],
    relatedArticles: ['uvp-guide', 'business-model-canvas-guide']
  },
  {
    id: 'uvp-guide',
    slug: 'uvp-guide',
    title: 'صياغة خريطة القيمة الفريدة (UVP)',
    subtitle: 'الوعد الصريح الموجه للعميل الذي يجعلك الخيار الوحيد المنطقي',
    categoryId: 'strategy',
    categoryName: 'الاستراتيجية والتنافسية',
    readTime: '5 دقائق',
    difficulty: 'مبتدئ',
    updatedAt: '2026-08-03',
    icon: 'Target',
    tags: ['UVP', 'القيمة الفريدة', 'التسويق', 'التموقع'],
    summary: 'كيف تحول مميزات المنتج إلى منافع واضحة تحل مشكلة صريحة للعميل دون رغوة كلامية.',
    keyTakeaway: 'الـ UVP الناجح يجيب ببساطة: ما هي المشكلة؟ ما هو الحل؟ وما الذي يجعلنا مختلفين عن البدائل المتاحة؟',
    platformApplication: 'تُصاغ وتُقيم في قسم خريطة القيمة الفريدة UVP Map في لوحة التحكم الاستراتيجية بالمنصة.',
    tableOfContents: [
      { id: 'uvp-formula', title: 'معادلة صياغة الـ UVP' },
      { id: 'good-vs-bad-uvp', title: 'أمثلة للـ UVP الجيد والضعيف' }
    ],
    sections: [
      {
        id: 'uvp-formula',
        heading: 'معادلة صياغة الـ UVP',
        content: 'نحن نساعد [الشريحة المستهدفة] على تحقيق [النتيجة المرغوبة] بدون [المعاناة الرئيسية] عبر [الأسلوب الفريد].'
      },
      {
        id: 'good-vs-bad-uvp',
        heading: 'أمثلة للـ UVP الجيد والضعيف',
        content: 'ضعيف: نحن أفضل برنامج محاسبة سحابي في المنطقة.\nجيد: أصدر فواتيرك الضريبية وتحصل مستحقاتك في أقل من 60 ثانية بدون أي خبرة محاسبية.'
      }
    ],
    relatedArticles: ['economic-moats', 'business-model-canvas-guide']
  },
  {
    id: 'business-model-canvas-guide',
    slug: 'business-model-canvas-guide',
    title: 'مخطط نموذج العمل التجاري (BMC)',
    subtitle: 'إطار العمل الاستراتيجي المكون من 9 أحجار بناء لتصميم المشروع',
    categoryId: 'strategy',
    categoryName: 'الاستراتيجية والتنافسية',
    readTime: '5 دقائق',
    difficulty: 'مبتدئ',
    updatedAt: '2026-08-03',
    icon: 'Target',
    tags: ['BMC', 'نموذج العمل', 'الهيكلة', 'التخطيط'],
    summary: 'شرح الأحجار التسعة المكونة لنموذج العمل وكيفية ربط القيمة المعروضة بشرائح العملاء وهياكل التكاليف.',
    keyTakeaway: 'الـ BMC هو المسودة التفاعلية المرئية التي تسبق وتغذي التفاصيل المالية والتشغيلية الممتدة.',
    platformApplication: 'متاح كأداة تفاعلية مستقلة في القائمة الجانبية تحت مسمى "بناء نموذج العمل BMC".',
    tableOfContents: [
      { id: 'nine-blocks', title: 'الأحجار التسعة لنموذج العمل' },
      { id: 'how-to-use-bmc', title: 'كيف تستفيد من مخطط BMC في المنصة؟' }
    ],
    sections: [
      {
        id: 'nine-blocks',
        heading: 'الأحجار التسعة لنموذج العمل',
        content: '1) شرائح العملاء، 2) القيم المعروضة، 3) القنوات، 4) علاقات العملاء، 5) مصادر الإيرادات، 6) الموارد الرئيسية، 7) الأنشطة الرئيسية، 8) الشركاء الرئيسييون، 9) هيكل التكاليف.'
      },
      {
        id: 'how-to-use-bmc',
        heading: 'كيف تستفيد من مخطط BMC في المنصة؟',
        content: 'اكتب واحرر خانات المخطط في أداة BMC، ثم قم بتصدير المخطط بتنسيق أنيق لتضمينه في العروض التقديمية وملفات Pitch Deck.'
      }
    ],
    relatedArticles: ['uvp-guide', 'strategic-dashboard']
  },

  // Category 5: Execution
  {
    id: 'critical-bottlenecks',
    slug: 'critical-bottlenecks',
    title: 'تشخيص الاختناقات الحرجة (Critical Bottlenecks)',
    subtitle: 'التعرف المبكر على نقاط الانكسار والعوائق التنفيذية قبل وقوعها',
    categoryId: 'execution',
    categoryName: 'التخطيط والتنفيذ الميداني',
    readTime: '4 دقائق',
    difficulty: 'متقدم',
    updatedAt: '2026-08-03',
    icon: 'CheckCircle2',
    tags: ['الاختناقات الحرجة', 'المخاطر', 'التشخيص', 'التنفيذ'],
    summary: 'كيفية تحديد الحلقة الأضعف في سلاسل التوريد، التراخيص، أو الاستحواذ لتفادي تعطل انطلاق المشروع.',
    keyTakeaway: 'تحديد الاختناق الحرج مبكراً يوجه الموارد التمويلية لتفكيكه بدلاً من هدر النقدية على أمور ثانوية.',
    platformApplication: 'تظهر كبطاقة تشخيصية مخصصة داخل لوحة نتائج النموذج الاحترافي لتحديد درجة الخطورة وكيفية التعامل معها.',
    tableOfContents: [
      { id: 'definition', title: 'تعريف الاختناق الحرج' },
      { id: 'common-examples', title: 'أمثلة شائعة للاختناقات التنفيذية' }
    ],
    sections: [
      {
        id: 'definition',
        heading: 'تعريف الاختناق الحرج',
        content: 'العنصر التأسيسي أو التشغيلي الواحد الذي يتسبب في إعاقة المحرك الكلي للمشروع مهما كانت بقية المكونات ممتازة ومكتملة.'
      },
      {
        id: 'common-examples',
        heading: 'أمثلة شائعة للاختناقات التنفيذية',
        content: '1) تأخر موافقات تراخيص الهيئات. 2) الاعتماد على مورد حصري واحد. 3) ارتفاع تكلفة التجربة الأولى للعميل. 4) نقص التمويل لفترة ما قبل الإيراد.'
      }
    ],
    relatedArticles: ['first-90-days-plan', 'scenario-simulator']
  },
  {
    id: 'first-90-days-plan',
    slug: 'first-90-days-plan',
    title: 'خطة أول 90 يوماً لإطلاق المشروع',
    subtitle: 'خريطة الطريق التنفيذية المقسمة على 3 مراحل متدرجة للنزول للميدان',
    categoryId: 'execution',
    categoryName: 'التخطيط والتنفيذ الميداني',
    readTime: '5 دقائق',
    difficulty: 'متوسط',
    updatedAt: '2026-08-03',
    icon: 'CheckCircle2',
    tags: ['خطة 90 يوم', 'التنفيذ', 'الإطلاق', 'المهام'],
    summary: 'منهجية تحويل الدراسة النظرية إلى جدول زمني ثلاثي المراحل للانطلاق الميداني السليم وإثبات الجدوى.',
    keyTakeaway: 'الـ 90 يوماً الأولى تضمن التدرج المنظم من مرحلة التأسيس إلى إثبات الجدوى ثم الاستقرار التشغيلي.',
    platformApplication: 'يمكنك الوصول إليها مباشرة من القائمة الجانبية تحت عنوان "أول 90 يوم للمشروع" لاستخدام قوائم المهام التفاعلية.',
    tableOfContents: [
      { id: 'month-1', title: 'الشهر الأول: التجهيز والتأسيس' },
      { id: 'month-2', title: 'الشهر الثاني: الإطلاق التجريبي' },
      { id: 'month-3', title: 'الشهر الثالث: الضبط والتوسع' }
    ],
    sections: [
      {
        id: 'month-1',
        heading: 'الشهر الأول: التجهيز والتأسيس',
        content: 'إنهاء التراخيص الرسمية، تجهيز المنتج الأولي MVP، وتجهيز القنوات الأساسية للتواصل والتسليم.'
      },
      {
        id: 'month-2',
        heading: 'الشهر الثاني: الإطلاق التجريبي',
        content: 'استقطاب الشريحة الأولى من العملاء التجريبيين، جمع الملاحظات الصريحة، وتعديل الخدمة وفق انطباعاتهم.'
      },
      {
        id: 'month-3',
        heading: 'الشهر الثالث: الضبط والتوسع',
        content: 'تحسين كفاءة العمليات، الضبط المالي لخفض التكاليف المتغيرة، وبدء الحملات التسويقية المستدامة.'
      }
    ],
    relatedArticles: ['critical-bottlenecks', 'strategic-dashboard']
  },
  {
    id: 'scenario-simulator',
    slug: 'scenario-simulator',
    title: 'محاكاة السيناريوهات وحساسية المخاطر',
    subtitle: 'اختبار صمود النموذج المالي تحت ظروف السوق المختلفة',
    categoryId: 'execution',
    categoryName: 'التخطيط والتنفيذ الميداني',
    readTime: '5 دقائق',
    difficulty: 'متقدم',
    updatedAt: '2026-08-03',
    icon: 'CheckCircle2',
    tags: ['محاكاة السيناريوهات', 'المخاطر', 'التحليل المالي', 'التخطيط'],
    summary: 'اختبار مرونة دراسة الجدوى تحت 3 حالات: المتفائل، الواقعي، والمتشائم لرؤية أثر تغير الأسعار والطلب.',
    keyTakeaway: 'محاكاة السيناريوهات تكشف لك نقطة الانكسار وتجهز لك السيناريو التفاعلي البديل قبل انخفاض المبيعات.',
    platformApplication: 'استخدم محاكي السيناريوهات التفاعلي المدمج في لوحة النموذج الاحترافي لتعديل الأسعار والتكاليف ورؤية الأثر فوراً.',
    tableOfContents: [
      { id: 'three-cases', title: 'السيناريوهات الثلاثة القياسية' },
      { id: 'sensitivity-test', title: 'اختبار الحساسية المالية' }
    ],
    sections: [
      {
        id: 'three-cases',
        heading: 'السيناريوهات الثلاثة القياسية',
        content: '1) السيناريو الواقعي Base Case. 2) السيناريو المتفائل Best Case. 3) السيناريو المتشائم Worst Case.'
      },
      {
        id: 'sensitivity-test',
        heading: 'اختبار الحساسية المالية',
        content: 'يحدد المتغير الأكثر حرجاً وتأثيراً على أرباحك (سعر البيع، تكلفة الإيجار، أو ميزانية التسويق)، مما يعطيك أولوية التفاوض والتأمين.'
      }
    ],
    relatedArticles: ['break-even-point', 'critical-bottlenecks']
  }
];

// Write individual JSON files
articlesData.forEach(article => {
  const filePath = path.join(articlesDir, `${article.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(article, null, 2), 'utf8');
  console.log('Created article JSON:', article.slug);
});

// Write index.json
const indexContent = {
  categories: categories,
  articles: articlesData.map(a => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    subtitle: a.subtitle,
    categoryId: a.categoryId,
    categoryName: a.categoryName,
    readTime: a.readTime,
    difficulty: a.difficulty,
    updatedAt: a.updatedAt,
    icon: a.icon,
    tags: a.tags,
    summary: a.summary,
    keyTakeaway: a.keyTakeaway,
    tableOfContents: a.tableOfContents
  }))
};

fs.writeFileSync(path.join(baseDir, 'index.json'), JSON.stringify(indexContent, null, 2), 'utf8');
console.log('Successfully generated academy index.json with', articlesData.length, 'articles');
