import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Tag, 
  Clock, 
  CheckCircle2, 
  Lightbulb, 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Sparkles,
  TrendingUp,
  DollarSign,
  Zap,
  Target,
  ChevronLeft,
  X,
  Compass
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export interface AcademyArticle {
  id: string;
  title: string;
  category: 'platform-core' | 'finance' | 'kpis' | 'strategy' | 'execution';
  categoryLabel: string;
  summary: string;
  readTime: string;
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
  icon: React.ElementType;
  keyTakeaway: string;
  platformApplication: string;
  sections: {
    heading: string;
    content: string;
  }[];
  tags: string[];
}

const ACADEMY_ARTICLES: AcademyArticle[] = [
  {
    id: 'strategic-dashboard-concept',
    title: 'النموذج الاحترافي (Strategic Dashboard)',
    category: 'platform-core',
    categoryLabel: 'مفاهيم المنصة',
    summary: 'فهم الفلسفة والنموذج الهيكلي للنموذج الاحترافي، ولماذا يُبنى على التحليل الاستراتيجي المنظم بدلاً من التخمين.',
    readTime: '4 دقائق',
    difficulty: 'مبتدئ',
    icon: Zap,
    keyTakeaway: 'النموذج الاحترافي يحول المدخلات الأولية للمستثمر إلى خريطة طريق تنفيذية متكاملة بـ 5 أبعاد استراتيجية.',
    platformApplication: 'تجد هذا النموذج في القائمة الجانبية تحت عنوان "النموذج الاحترافي"، حيث يتيح لك إدخال تفاصيل مشروعك واستعراض النتائج والتحليلات المالية فوراً.',
    tags: ['النموذج الاحترافي', 'التخطيط', 'تحليل المشروع', 'الجدوى الاستثمارية'],
    sections: [
      {
        heading: 'ما هو النموذج الاحترافي؟',
        content: 'النموذج الاحترافي هو العمود الفقري لتحليل المشاريع في منصتنا. يُقدم لك واجهة تفاعلية شاملة تجمع بين التحليل المالي، الجدوى الاستثمارية، خطة النمو، وخريطة الطريق التنفيذية بناءً على مدخلاتك الحقيقية.'
      },
      {
        heading: 'لماذا لا نعتمد على التخمين التلقائي؟',
        content: 'تم تصميم النموذج ليعالج مدخلاتك الصريحة ودراستك الفعلية للسوق، بدلاً من إعطائك أرقاماً وهمية أو نصوصاً عامة. هذا يضمن أن النتائج والمؤشرات المالية تعكس الواقع الفعلي لمشروعك وقدرتك على التنفيذ.'
      },
      {
        heading: 'المحاور الخمسة الأساسية للنموذج',
        content: 'يتكون النموذج الاحترافي من 5 تبويبات رئيسية: 1) النبض الاستراتيجي (Strategic Pulse)، 2) الجدوى المالية والتكاليف، 3) خطة النمو والتسويق، 4) مسار التنفيذ العملي، 5) القرار النهائي والتوصية التنفيذية.'
      }
    ]
  },
  {
    id: 'break-even-point',
    title: 'نقطة التعادل (Break-even Point)',
    category: 'finance',
    categoryLabel: 'المفاهيم المالية',
    summary: 'كيفية تحديد حد المبيعات الحرج الذي تتساوى عنده الإيرادات الإجمالية مع التكاليف الكلية للبدء في تحقيق الأرباح.',
    readTime: '5 دقائق',
    difficulty: 'مبتدئ',
    icon: DollarSign,
    keyTakeaway: 'نقطة التعادل هي نقطة الأمان في مشروعك؛ أي مبيعات بعد هذه النقطة تترجم مباشرة إلى أرباح صافية.',
    platformApplication: 'يتم حساب نقطة التعادل تلقائياً داخل تبويب "الجدوى المالية" في النموذج الاحترافي بناءً على التكاليف الثابتة والتكاليف المتغيرة التي تدخلها.',
    tags: ['نقطة التعادل', 'الربحية', 'التكاليف الثابتة', 'التحليل المالي'],
    sections: [
      {
        heading: 'تعريف نقطة التعادل',
        content: 'نقطة التعادل هي حجم المبيعات (بالوحدات أو بالقيمة النقدية) الذي يتساوى عنده إجمالي الإيراد مع إجمالي التكاليف (الثابتة والمتغيرة)، بحيث تكون النتيجة المباشرة للمشروع: لا أرباح ولا خسائر.'
      },
      {
        heading: 'مكونات معادلة التعادل',
        content: 'تتكون نقطة التعادل من: التكاليف الثابتة (مثل الإيجارات والرواتب الأساسية) تقسيم (سعر بيع الوحدة مطروحاً منه التكلفة المتغيرة للوحدة).'
      },
      {
        heading: 'أهميتها للمستثمر والمؤسس',
        content: 'تساعدك نقطة التعادل على معرفة عدد الأيام أو الوحدات التي يجب بيعها شهرياً فقط لتغطية مصاريفك، مما يحدد مستوى المخاطرة وتوقيت الوصول للأرباح الصافية.'
      }
    ]
  },
  {
    id: 'economic-moats',
    title: 'الخندق التنافسي (Economic Moat)',
    category: 'strategy',
    categoryLabel: 'التكتيكات والتنافسية',
    summary: 'كيفية بناء ميزة تنافسية مستدامة تحمي مشروعك من تقليد المنافسين وتضمن لك حصة سوقية مستقرة.',
    readTime: '6 دقائق',
    difficulty: 'متوسط',
    icon: Target,
    keyTakeaway: 'الخندق التنافسي هو ما يمنع المنافسين من سرقة عملائك حتى لو قلدوا منتجك بنفس السعر.',
    platformApplication: 'تُحدد خندقك التنافسي وتصيغه في تبويب "النبض الاستراتيجي" وقسم "خريطة القيمة الفريدة (UVP)" داخل المنصة.',
    tags: ['الخندق التنافسي', 'الميزة التنافسية', 'الاستراتيجية', 'الحماية من المنافسين'],
    sections: [
      {
        heading: 'مفهوم الخندق التنافسي',
        content: 'مفهوم أطلقه المستثمر وارن بافيت، ويشير إلى القدرة التنافسية الهيكلية التي تمنح الشركة ميزة طويلة الأمد على منافسيها، تماماً كالخندق المائي الممتلئ الذي يحمي القلعة من الهجوم.'
      },
      {
        heading: 'أنواع الخنادق التنافسية الرئيسية',
        content: '1) تأثير الشبكة (Network Effects): تزداد قيمة الخدمة كلما زاد مستخدموها. 2) تكاليف التحول (Switching Costs): صعوبة انتقال العميل للمنافس. 3) كفاءة التكلفة والحجم. 4) العلامة التجارية والملكية الفكرية.'
      },
      {
        heading: 'كيف تصنع خندقاً لمشروعك الناشئ؟',
        content: 'يركز المشروع الناشئ في البداية على سرعة التقديم، تجربة المستخدم الاستثنائية، أو احتكار شريحة دقيقة جداً (Niche Market) قبل التوسع.'
      }
    ]
  },
  {
    id: 'ltv-cac-ratio',
    title: 'نسبة القيمة الدائمة إلى تكلفة الاستحواذ (LTV : CAC)',
    category: 'kpis',
    categoryLabel: 'مؤشرات النمو',
    summary: 'المعيار الذهبي لقياس صحة وكفاءة نموذج النمو والتسويق في الشركات الحديثة والمشاريع التكنولوجية.',
    readTime: '5 دقائق',
    difficulty: 'متوسط',
    icon: TrendingUp,
    keyTakeaway: 'النسبة المثالية لـ LTV:CAC هي 3:1؛ إذا كانت أقل من ذلك فأنك تنفق كثيراً، وإذا كانت أعلى فقد تكون مقصراً في الاستثمار للتوسع.',
    platformApplication: 'تظهر هذه النسب وتحليلاتها ضمن قسم "تسريع الإيرادات والنمو" في لوحة تحكم النموذج الاحترافي.',
    tags: ['LTV', 'CAC', 'مؤشرات الأداء', 'التسويق', 'نمو المشتركين'],
    sections: [
      {
        heading: 'ما هي تكلفة الاستحواذ (CAC)؟',
        content: 'تكلفة الاستحواذ على العميل (Customer Acquisition Cost) هي إجمالي ما تنفقه على التسويق والمبيعات مقسوماً على عدد العملاء الجدد الذين اكتسبتهم خلال فترة زمنية محددة.'
      },
      {
        heading: 'ما هي القيمة الدائمة للعميل (LTV)؟',
        content: 'القيمة الدائمة (Lifetime Value) هي إجمالي صافي الأرباح المتوقع تحقيقها من العميل الواحد طوال فترة تعامله مع مشروعك.'
      },
      {
        heading: 'تفسير النسب المئوية',
        content: 'نسبة 1:1 تعني أنك تخسر مالاً مع كل عميل جديد. نسبة 3:1 هي المعيار الصحي التنافسي. نسبة 5:1 تعني أن لديك فرصة لمضاعفة ميزانية التسويق واكتساب حصة أكبر.'
      }
    ]
  },
  {
    id: 'mrr-arr-subscription',
    title: 'الإيراد الشهري المكرر (MRR) والإيراد السنوي (ARR)',
    category: 'kpis',
    categoryLabel: 'مؤشرات النمو',
    summary: 'المؤشر الاستراتيجي الأهم لنماذج الاشتراك والخدمات البرمجية SaaS لقياس التدفقات النقدية القابلة للتنبؤ.',
    readTime: '4 دقائق',
    difficulty: 'مبتدئ',
    icon: Clock,
    keyTakeaway: 'MRR هو محرك التنبؤ المالي الصادق في مشروعك؛ يمنحك الرؤية الدقيقة للتدفقات دون الاعتماد على مبيعات الصدفة.',
    platformApplication: 'يُحسب ويُعرض في قسم "أفكار SaaS" و "أفكار Micro-SaaS" وفي النمذجة المالية للمشاريع القائمة على الاشتراكات.',
    tags: ['MRR', 'ARR', 'SaaS', 'الاشتراكات', 'الإيرادات المكررة'],
    sections: [
      {
        heading: 'تعريف MRR و ARR',
        content: 'MRR هو الإيراد الشهري المكرر (Monthly Recurring Revenue) الحاصل من اشتراكات العملاء الفاعلين، بينما ARR هو قيمته السنوية المكررة (Annual Recurring Revenue).'
      },
      {
        heading: 'لماذا يُفضّل المستثمرون الإيراد المكرر؟',
        content: 'لأنه يوفر قابلية عالية للتنبؤ والاستقرار المالي، مما يقلل من مخاطر تقلب المبيعات الشهرية ويسمح بالتخطيط بعيد المدى للتوسع والتوظيف.'
      },
      {
        heading: 'أنواع الـ MRR التي يجب متابعتها',
        content: '1) New MRR من عملاء جدد. 2) Expansion MRR من ترقية الاشتراكات. 3) Churned MRR الناتجة عن إلغاء الاشتراكات.'
      }
    ]
  },
  {
    id: 'scenario-simulator-concept',
    title: 'محاكاة السيناريوهات وحساسية المخاطر',
    category: 'execution',
    categoryLabel: 'التخطيط والتنفيذ',
    summary: 'اختبار مدى صمود دراسة الجدوى والافتراضات المالية تحت ظروف السوق المختلفة (متفائل، واقعي، متشائم).',
    readTime: '5 دقائق',
    difficulty: 'متقدم',
    icon: Sparkles,
    keyTakeaway: 'محاكاة السيناريوهات تحميك من الصدمات؛ فتدرك سلفاً أين تقع نقطة الانكسار وكيف تتصرف إن انخفضت المبيعات 30%.',
    platformApplication: 'استخدم محاكي السيناريوهات التفاعلي المدمج في لوحة النموذج الاحترافي لتعديل الأسعار والتكاليف ورؤية الأثر المالي المباشر.',
    tags: ['محاكاة السيناريوهات', 'إدارة المخاطر', 'التحليل المالي', 'التخطيط الاستراتيجي'],
    sections: [
      {
        heading: 'لماذا تحتاج لمحاكاة السيناريوهات؟',
        content: 'الواقع الميداني نادراً ما يطابق الخطة النظرية 100%. محاكاة السيناريوهات تتيح لك وضع افتراضات متدرجة لمعرفة أثر الصدمات الخارجية قبل حدوثها.'
      },
      {
        heading: 'السيناريوهات الثلاثة القياسية',
        content: '1) السيناريو الواقعي (Base Case): ما تتوقعه بناءً على السوق. 2) السيناريو المتفائل (Best Case): في حال زاد الإقبال. 3) السيناريو المتشائم (Worst Case): في حال انخفض الطلب أو ارتفعت التكاليف.'
      },
      {
        heading: 'تحليل الحساسية (Sensitivity Analysis)',
        content: 'يحدد المتغير الأكثر تأثيراً على أرباحك (هل هو سعر البيع، تكلفة الإيجار، أم ميزانية التسويق؟)، مما يوجه تركيزك للتفاوض عليه.'
      }
    ]
  },
  {
    id: 'first-90-days-blueprint',
    title: 'خطة أول 90 يوماً لتنفيذ المشروع',
    category: 'execution',
    categoryLabel: 'التخطيط والتنفيذ',
    summary: 'منهجية تحويل دراسة الجدوى النظرية إلى جدول خريطة زمنية ثلاثي المراحل للانطلاق الميداني السليم.',
    readTime: '5 دقائق',
    difficulty: 'متوسط',
    icon: CheckCircle2,
    keyTakeaway: 'الـ 90 يوماً الأولى تضمن لك التدرج المنظم من مرحلة التأسيس إلى إثبات الجدوى ثم الاستقرار التشغيلي.',
    platformApplication: 'يمكنك الوصول إليها مباشرة من القائمة الجانبية تحت عنوان "أول 90 يوم للمشروع" لاستخدام قوائم المهام التفاعلية.',
    tags: ['التنفيذ', 'خطة 90 يوم', 'إطلاق المشروع', 'التأسيس'],
    sections: [
      {
        heading: 'المرحلة الأولى (الأيام 1 - 30): التجهيز والتأسيس',
        content: 'التركيز على استكمال إجراءات الترخيص، تجهيز الهوية والحد الأدنى من المنتج (MVP)، وبناء القنوات الأساسية للتواصل مع العملاء.'
      },
      {
        heading: 'المرحلة الثانية (الأيام 31 - 60): الإطلاق التجريبي',
        content: 'استقطاب الشريحة الأولى من العملاء التجريبيين (Early Adopters)، جمع الملاحظات الصريحة، وتعديل المنتج وفقاً للاحتياج الحقيقي.'
      },
      {
        heading: 'المرحلة الثالثة (الأيام 61 - 90): الضبط والتحسين',
        content: 'تحسين كفاءة العمليات، الضبط المالي، وبدء حملات الاستحواذ الرسمية للوصول إلى نقطة الاستقرار الأولي.'
      }
    ]
  },
  {
    id: 'npv-irr-valuation',
    title: 'صافي القيمة الحالية (NPV) ومعدل العائد الداخلي (IRR)',
    category: 'finance',
    categoryLabel: 'المفاهيم المالية',
    summary: 'الأدوات الاستثمارية المتقدمة لتقييم جدوى الفرص الاستثمارية ومقارنتها بالبدائل المتاحة في السوق.',
    readTime: '7 دقائق',
    difficulty: 'متقدم',
    icon: Compass,
    keyTakeaway: 'إذا كان الـ NPV موجباً والـ IRR أعلى من تكلفة رأس المال، فإن الفرصة الاستثمارية مجدية اقتصادياً.',
    platformApplication: 'تُستعرض هذه المقاييس في التقييمات المالية والتنفيذية المتقدمة في المنصة لمساعدة المستثمرين على اتخاذ القرار.',
    tags: ['NPV', 'IRR', 'التقييم الاستثماري', 'القيمة الزمنية للنقود'],
    sections: [
      {
        heading: 'ما هو صافي القيمة الحالية (NPV)؟',
        content: 'هو خصم التدفقات النقدية المستقبلية للمشروع بقيمتها الحالية (Present Value) مطروحاً منها تكلفة الاستثمار الأولي. إذا كانت النتيجة موجبة، فالمشروع يضيف قيمة نقدية.'
      },
      {
        heading: 'ما هو معدل العائد الداخلي (IRR)؟',
        content: 'هو معدل الخصم الذي يجعل قيمة الـ NPV تساوي صفراً. يمثل النسبة المئوية المتوقعة لربحية رأس المال المستثمر سنوياً.'
      },
      {
        heading: 'كيف يستخدمها المستثمر؟',
        content: 'يقارن المستثمر الـ IRR للمشروع مع العائد المتوقع من الفرص البديلة (مثل الودائع البنكية أو العقار). كلما زاد الفارق، زادت جاذبية المشروع.'
      }
    ]
  },
  {
    id: 'market-discovery-problem-engine',
    title: 'معمل الفرص واستكشاف القطاعات',
    category: 'platform-core',
    categoryLabel: 'مفاهيم المنصة',
    summary: 'كيفية قراءة مؤشرات القطاعات الاقتصادية واكتشاف المشكلات والفجوات السوقية قبل إطلاق دراسة الجدوى.',
    readTime: '6 دقائق',
    difficulty: 'متوسط',
    icon: Lightbulb,
    keyTakeaway: 'الدراسة الناجحة تبدأ من مشكلة حقيقية في قطاع واعد، وليس من مجرد رغبة شخصية في منتج معين.',
    platformApplication: 'تستكشف هذه البيانات من خلال قسمي "استكشاف السوق" و "المشكلات والفرص" في القائمة الجانبية.',
    tags: ['استكشاف السوق', 'القطاعات الاقتصادية', 'الفرص الاستثمارية', 'المشكلات والحلول'],
    sections: [
      {
        heading: 'ما هو قسم استكشاف السوق؟',
        content: 'مكتبة تحليلية تشتمل على أكثر من 90 قطاعاً اقتصادياً (زراعة، تقنية، صحة، تجارة إلكترونية، إلخ)، تستعرض أرقام الإنتاج المحلي والتجارة الدولية.'
      },
      {
        heading: 'ما هو محرك المشكلات والفرص؟',
        content: 'أداة تصنيف تعتمد على تحويل التحديات والاحتياجات غير المخدومة في السوق إلى نماذج مشاريع واعدة ذات طلب حقيقي.'
      },
      {
        heading: 'كيف تبدأ مسارك الصحيح؟',
        content: 'اختر القطاع أولاً ⬅️ حدد المشكلة الرئيسية ⬅️ صغ القيمة الفريدة ⬅️ ثم ابدأ بالنموذج الاحترافي لبناء الجدوى.'
      }
    ]
  },
  {
    id: 'business-model-canvas-concept',
    title: 'مخطط نموذج العمل التجاري (BMC)',
    category: 'strategy',
    categoryLabel: 'التكتيكات والتنافسية',
    summary: 'إطار العمل الاستراتيجي المكون من 9 أحجار بناء لتلخيص وتصميم خريطة تشغيل مشروعك في صفحة واحدة.',
    readTime: '5 دقائق',
    difficulty: 'مبتدئ',
    icon: Target,
    keyTakeaway: 'الـ BMC هو المسودة المرئية الأولى السريعة التي تسبق كتابة التفاصيل المالية والتشغيلية الممتدة.',
    platformApplication: 'متاح كأداة تفاعلية مستقلة في القائمة الجانبية تحت مسمى "بناء نموذج العمل BMC".',
    tags: ['BMC', 'نموذج العمل', 'التخطيط التفاعلي', 'الهيكلة'],
    sections: [
      {
        heading: 'الأحجار التسعة لنموذج العمل',
        content: 'ينقسم المخطط إلى: 1) شرائح العملاء، 2) القيم المعروضة، 3) القنوات، 4) علاقات العملاء، 5) مصادر الإيرادات، 6) الموارد الرئيسية، 7) الأنشطة الرئيسية، 8) الشركاء الرئيسييون، 9) هيكل التكاليف.'
      },
      {
        heading: 'فوائد مخطط BMC',
        content: 'يتميز بالبساطة والسرعة والقدرة على رؤية التناغم بين شريحة العملاء والقيمة المعروضة وهيكل التكاليف على لوحة واحدة.'
      },
      {
        heading: 'تحديث المخطط باستمرار',
        content: 'مخطط BMC ليس وثيقة ثابته، بل أداة حية تتبدل وتتعدل كلما اختبرت افتراضاتك في السوق وحصلت على انطباعات عملائك.'
      }
    ]
  },
  {
    id: 'critical-bottlenecks-concept',
    title: 'تشخيص الاختناقات الحرجة (Critical Bottlenecks)',
    category: 'execution',
    categoryLabel: 'التخطيط والتنفيذ',
    summary: 'التعرف المسبق على العوائق التشغيلية والترخيصية والمالية التي قد تعطل انطلاق المشروع أو تسبب توقفه.',
    readTime: '4 دقائق',
    difficulty: 'متقدم',
    icon: CheckCircle2,
    keyTakeaway: 'معرفة الاختناق الحرج مبكراً تتيح لك وضع خطة بديلة بدلاً من المفاجأة والتوقف بعد إنفاق التكاليف.',
    platformApplication: 'تظهر كبطاقة تشخيصية مخصصة داخل لوحة نتائج النموذج الاحترافي لتحديد درجة الخطورة وكيفية تجاوزها.',
    tags: ['الاختناقات الحرجة', 'التشخيص', 'المخاطر التشغيلية', 'التنفيذ'],
    sections: [
      {
        heading: 'تعريف الاختناق الحرج',
        content: 'هو العنصر الواحد في سلاسل التوريد أو الترخيص أو اكتساب العملاء الذي يعطل قدرة النظام بأكمله على العمل، مهما كانت بقية الأجزاء ممتازة.'
      },
      {
        heading: 'أمثلة شائعة للاختناقات',
        content: '1) تأخر الموافقات التنظيمية. 2) الاعتماد على مورد حصري واحد. 3) ارتفاع تكلفة التجربة الأولية للعميل. 4) نقص التمويل لركوب فترة ما قبل الإيراد.'
      },
      {
        heading: 'استراتيجية تجاوز الاختناقات',
        content: 'تبدأ بالتعرف على أضعف حلقة في السلسلة، ثم تخصيص الموارد الأولوية لتفكيكها قبل البدء في حملات التوسع.'
      }
    ]
  },
  {
    id: 'burn-rate-runway',
    title: 'معدل الحرق والمدى الزمني للنقدية (Burn Rate & Runway)',
    category: 'kpis',
    categoryLabel: 'مؤشرات النمو',
    summary: 'قياس سرعة استهلاك السيولة النقدية وعدد الأشهر المتبقية لاستمرار المشروع قبل الحاجة للربحية أو التمويل.',
    readTime: '5 دقائق',
    difficulty: 'متوسط',
    icon: Clock,
    keyTakeaway: 'المدى الزمني للنقدية (Runway) يجب ألا يقل عن 6 إلى 12 شهراً لتغطية أي تقلبات غير متوقعة في السوق.',
    platformApplication: 'يُحسب ويُقيم في التحليلات التنبؤية والتخطيط المالي داخل المنصة.',
    tags: ['Burn Rate', 'Runway', 'السيولة', 'إدارة النقدية', 'التخطيط المالي'],
    sections: [
      {
        heading: 'ما هو صافي معدل الحرق (Net Burn Rate)؟',
        content: 'هو الفارق السلبي الشهري بين النفقات التشغيلية والمصروفات وبين الإيرادات المحصلة بالفعل. مثلاً: إنفاق 50 ألف وإيراد 20 ألف = حرق صافي 30 ألف شهرياً.'
      },
      {
        heading: 'ما هو المدى الزمني (Cash Runway)؟',
        content: 'هو رصيد السيولة المتوفر بالبنك مقسوماً على صافي معدل الحرق الشهري. إذا كان لديك 300 ألف والحرق 30 ألف، فالمدى الزمني هو 10 أشهر.'
      },
      {
        heading: 'كيف تجنب مشروعك السقوط في "حاوية الموت"؟',
        content: 'مراقبة الـ Runway شهرياً، والبدء في خفض النفقات أو البحث عن تمويل عندما يتبقى 6 أشهر فقط على النفاذ.'
      }
    ]
  }
];

const CATEGORIES = [
  { id: 'all', label: 'كافة المقالات' },
  { id: 'platform-core', label: 'مفاهيم المنصة' },
  { id: 'finance', label: 'المفاهيم المالية' },
  { id: 'kpis', label: 'مؤشرات النمو' },
  { id: 'strategy', label: 'التكتيكات والتنافسية' },
  { id: 'execution', label: 'التخطيط والتنفيذ' },
];

export const PlatformAcademyView: React.FC<{ setActiveTab?: (tab: string) => void }> = ({ setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<AcademyArticle | null>(null);
  const [savedArticles, setSavedArticles] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('start_investor_academy_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleSaveArticle = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSavedArticles((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('start_investor_academy_saved', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save article preferences', err);
      }
      return updated;
    });
  };

  const filteredArticles = useMemo(() => {
    return ACADEMY_ARTICLES.filter((article) => {
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q)) ||
        article.keyTakeaway.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 font-sans animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-8">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
            <BookOpen className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-slate-300 bg-slate-100/80 text-slate-700 font-bold">
                المركز المعرفي الموحد
              </Badge>
              <span className="text-xs font-bold text-slate-400">| {ACADEMY_ARTICLES.length} مقال تنفيذي</span>
            </div>
            <h1 className="text-3xl font-black text-slate-950 tracking-tight sm:text-4xl mt-1">
              أكاديمية التحليل والاستثمار الاستراتيجي
            </h1>
          </div>
        </div>
        <p className="max-w-3xl text-sm sm:text-base font-medium leading-relaxed text-slate-600">
          دليلك الشامل لمفاهيم المنصة، المصطلحات المالية، مؤشرات النمو التنافسية، وأساليب التنفيذ الميداني. صُمم هذا القسم لمساعدتك على فهم كل خيار ومؤشر تراه في دراساتك الاستراتيجية.
        </p>

        {/* Live Search and Quick Filter */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              type="text"
              placeholder="ابحث عن مفهوم، مصطلح (مثل: نقطة التعادل، LTV، الخندق التنافسي)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 font-medium rounded-xl h-11 focus-visible:ring-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-lg border border-slate-200">
              المحفوظات: {savedArticles.length}
            </Badge>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? ACADEMY_ARTICLES.length 
              : ACADEMY_ARTICLES.filter(a => a.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border
                  ${isSelected
                    ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'}
                `}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] tabular-nums ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
            <Search className="size-7" />
          </div>
          <h3 className="text-lg font-black text-slate-900">لم نجد مقالات تطابق بحثك</h3>
          <p className="mt-1 text-sm font-medium text-slate-500 max-w-md">
            جرب البحث بكلمات أخرى أو اختر تصنيفاً آخر لاستكشاف المفاهيم والمصطلحات.
          </p>
          <Button
            variant="outline"
            className="mt-6 border-slate-300 font-bold"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            عرض كافة المقالات
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const Icon = article.icon;
            const isSaved = savedArticles.includes(article.id);

            return (
              <Card
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-md cursor-pointer"
              >
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-slate-100 text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-colors">
                        <Icon className="size-4" />
                      </span>
                      <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-700 text-[11px] font-bold">
                        {article.categoryLabel}
                      </Badge>
                    </div>

                    <button
                      onClick={(e) => toggleSaveArticle(article.id, e)}
                      title={isSaved ? 'إزالة من المحفوظات' : 'حفظ المقال'}
                      className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      {isSaved ? (
                        <BookmarkCheck className="size-5 text-amber-500 fill-amber-500" />
                      ) : (
                        <Bookmark className="size-5" />
                      )}
                    </button>
                  </div>

                  {/* Title & Summary */}
                  <h2 className="text-lg font-black text-slate-950 leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600 line-clamp-3">
                    {article.summary}
                  </p>

                  {/* Key Takeaway Badge */}
                  <div className="mt-4 rounded-xl border border-amber-200/60 bg-amber-50/50 p-3">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="size-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[11px] font-bold text-amber-900 leading-relaxed line-clamp-2">
                        {article.keyTakeaway}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 text-[11px] font-bold text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {article.readTime}
                    </span>
                    <span>•</span>
                    <span className="text-slate-500">{article.difficulty}</span>
                  </div>
                  
                  <span className="flex items-center gap-1 text-slate-950 group-hover:translate-x-[-4px] transition-transform">
                    اقرأ المزيد
                    <ChevronLeft className="size-3.5" />
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Article Detail View Modal / Drawer */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl font-sans" dir="rtl">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-slate-300 bg-slate-100 text-slate-800 font-bold">
                    {selectedArticle.categoryLabel}
                  </Badge>
                  <span className="text-xs font-bold text-slate-400">• {selectedArticle.readTime}</span>
                  <span className="text-xs font-bold text-slate-400">• مستوى: {selectedArticle.difficulty}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaveArticle(selectedArticle.id)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                  title="حفظ المقال"
                >
                  {savedArticles.includes(selectedArticle.id) ? (
                    <BookmarkCheck className="size-5 text-amber-500 fill-amber-500" />
                  ) : (
                    <Bookmark className="size-5" />
                  )}
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Key Takeaway Box */}
            <div className="my-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0">
                  <Lightbulb className="size-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider">الخلاصة المستفادة</h4>
                  <p className="mt-1 text-sm font-bold text-amber-900 leading-relaxed">
                    {selectedArticle.keyTakeaway}
                  </p>
                </div>
              </div>
            </div>

            {/* Platform Application Box */}
            <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50/80 p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-blue-950 uppercase tracking-wider">كيف يُستخدم هذا المفهوم داخل منصتنا؟</h4>
                  <p className="mt-1 text-sm font-bold text-blue-900 leading-relaxed">
                    {selectedArticle.platformApplication}
                  </p>
                </div>
              </div>
            </div>

            {/* Article Sections */}
            <div className="space-y-6 text-slate-800 leading-relaxed">
              {selectedArticle.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2 border-b border-slate-100 pb-5 last:border-0">
                  <h3 className="text-lg font-black text-slate-950">{sec.heading}</h3>
                  <p className="text-sm sm:text-base font-medium text-slate-600 leading-loose">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <Tag className="size-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-500">الكلمات الدالة:</span>
              {selectedArticle.tags.map((tag, idx) => (
                <span key={idx} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-100">
              <Button
                variant="outline"
                onClick={() => setSelectedArticle(null)}
                className="border-slate-300 font-bold"
              >
                إغلاق
              </Button>

              {setActiveTab && (
                <Button
                  onClick={() => {
                    setSelectedArticle(null);
                    setActiveTab('strategic-dashboard');
                  }}
                  className="bg-slate-950 text-white font-bold hover:bg-slate-800"
                >
                  انتقل للنموذج الاحترافي
                  <ArrowLeft className="size-4 mr-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformAcademyView;
