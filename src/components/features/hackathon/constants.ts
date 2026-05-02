import {
  Target,
  Layout,
  BarChart3,
  Zap,
  Cpu,
  TrendingUp,
  Route,
  ShieldCheck,
  Activity,
  FileText,
  Download,
  Users,
  Briefcase,
  Rocket,
  DollarSign,
  Search,
  Globe,
  Lock,
  Eye,
  AlertOctagon
} from 'lucide-react';
import { SprintDay, Opportunity } from './types';

export const STORAGE_KEY = 'khotta_revolutionary_hackathon_v4';
export const TOTAL_DURATION = 168 * 60 * 60 * 1000;

export const sprintDays: SprintDay[] = [
  {
    day: 1,
    title: 'اليوم 01: استخبارات السوق والتحقق من الألم السوقي',
    codename: 'Market Intelligence & Gap Analysis',
    accent: '#3b82f6',
    tasks: [
      {
        id: 'target',
        title: 'تحديد الفجوة الاستراتيجية (The Gap)',
        detail: 'لا تبحث عن فكرة، بل ابحث عن "ألم" يكلف السوق ملايين. لماذا لم يُحل هذا الألم حتى الآن؟ وما هو ثمن بقاء الوضع كما هو؟',
        placeholder: 'صف الفجوة السوقية، التكلفة الاقتصادية لهذا الألم، والعوائق التي منعت الآخرين من سدها...',
        icon: Target,
        type: 'text'
      },
      {
        id: 'market_size',
        title: 'التحليل الكمي للسوق (TAM/SAM/SOM)',
        detail: 'المستثمر لا يهتم بالعواطف. قدم أرقاماً دقيقة لحجم السوق الإجمالي، السوق المتاح فنياً، والحصة التي تخطط لاقتناصها في أول 3 سنوات.',
        placeholder: 'إجمالي السوق (TAM)$، السوق المتاح (SAM)$، الحصة المستهدفة (SOM)$، ومصدر هذه الأرقام...',
        icon: BarChart3,
        type: 'list'
      },
      {
        id: 'audience',
        title: 'تشريح العميل المستهدف (ICP)',
        detail: 'من هو "العميل الأكثر تضرراً"؟ ارسم ملامحه السلوكية والمالية. من هم صناع القرار ومن هم المؤثرون في عملية الشراء؟',
        placeholder: 'الخصائص الديموغرافية، العادات الشرائية، التحديات التشغيلية، ومعايير النجاح لديه...',
        icon: Users,
        type: 'list'
      }
    ],
  },
  {
    day: 2,
    title: 'اليوم 02: هندسة القيمة والميزة التنافسية القاتلة',
    codename: 'Value Proposition & Moat Design',
    accent: '#8b5cf6',
    tasks: [
      {
        id: 'solution',
        title: 'هندسة الحل الثوري (10x Solution)',
        detail: 'إذا كان حلك أفضل بـ 20% فقط، فسوف تفشل. يجب أن يكون حلك أفضل بـ 10 أضعاف من حيث السرعة، التكلفة، أو الجودة.',
        placeholder: 'كيف يكسر حلك قواعد اللعبة الحالية؟ وما هي التقنية الجوهرية التي تميزه؟',
        icon: Zap,
        type: 'text'
      },
      {
        id: 'advantage',
        title: 'خندق الحماية (Unfair Advantage)',
        detail: 'ما الذي يمنع شركة عملاقة من تقليدك غداً؟ حدد "الخندق" (بيانات حصرية، خوارزمية محمية، تأثير الشبكة، أو علاقات سيادية).',
        placeholder: 'الملكية الفكرية، تأثير الشبكة (Network Effect)، تكاليف الانتقال (Switching Costs)...',
        icon: ShieldCheck,
        type: 'text'
      },
      {
        id: 'competitors',
        title: 'مصفوفة الاستبدال والمنافسة',
        detail: 'المنافس الحقيقي ليس فقط من يقدم نفس المنتج، بل هو "الوضع الراهن". كيف يقاوم العميل التغيير؟ وكيف ستتغلب عليه؟',
        placeholder: 'المنافسون المباشرون، البدائل غير المباشرة، ونقاط التفوق النوعي لكل منهم...',
        icon: Search,
        type: 'list'
      }
    ],
  },
  {
    day: 3,
    title: 'اليوم 03: الترسانة التقنية ومخطط التنفيذ الأولي',
    codename: 'Technical Arsenal & MVP Ops',
    accent: '#06b6d4',
    tasks: [
      {
        id: 'arsenal',
        title: 'هندسة المعمارية السيادية',
        detail: 'اختر تقنياتك بناءً على القابلية للتوسع (Scalability) والأمان. لا تفرط في الهندسة، ولكن ابنِ أساساً يتحمل المليون مستخدم الأول.',
        placeholder: 'البنية التحتية السحابية، قواعد البيانات، لغات البرمجة، وأدوات الذكاء الاصطناعي...',
        icon: Cpu,
        type: 'list'
      },
      {
        id: 'features',
        title: 'تعريف الحد الأدنى للمنتج القابل للحياة (MVP)',
        detail: 'ما هي الميزة الواحدة التي إذا حذفتها لم يعد للمشروع قيمة؟ احذف كل شيء آخر وركز على هذه النواة فقط في يومك الأول.',
        placeholder: 'الميزة الجوهرية، رحلة المستخدم الأساسية، والوظائف التي سيتم تأجيلها للمرحلة الثانية...',
        icon: Layout,
        type: 'list'
      },
      {
        id: 'prototype_plan',
        title: 'خارطة الطريق التقنية (Tech Roadmap)',
        detail: 'حول الأفكار إلى معالم تنفيذية. متى سيصدر الإصدار التجريبي (Alpha) ومتى ستطلق النسخة العامة (Production)؟',
        placeholder: 'المرحلة 1: بناء النواة، المرحلة 2: الاختبار الميداني، المرحلة 3: الإطلاق العام...',
        icon: Route,
        type: 'text'
      }
    ],
  },
  {
    day: 4,
    title: 'اليوم 04: السيادة المالية ونمذجة الربحية المستدامة',
    codename: 'Financial Sovereignty & Unit Economics',
    accent: '#10b981',
    tasks: [
      {
        id: 'revenue',
        title: 'هيكلة تدفقات الإيرادات',
        detail: 'كيف ستجني المال في كل مرة يتنفس فيها النظام؟ حدد نموذج التسعير (SaaS, Transactional, etc) والقيمة الدائمة للعميل (LTV).',
        placeholder: 'مصادر الدخل الأساسية، استراتيجية التسعير، ومعدل تكرار الشراء المتوقع...',
        icon: TrendingUp,
        type: 'financial'
      },
      {
        id: 'costs',
        title: 'نمذجة التكاليف ومعدل الحرق (Burn Rate)',
        detail: 'كن واقعياً وقاسياً في حساب التكاليف. كم يكلفك الحصول على عميل واحد (CAC)؟ وكم تكلفة تشغيل النظام لكل مستخدم؟',
        placeholder: 'تكاليف الاستحواذ (CAC)، تكاليف التشغيل (OPEX)، وتكاليف التأسيس (CAPEX)...',
        icon: DollarSign,
        type: 'financial'
      },
      {
        id: 'projections',
        title: 'التوقعات المالية ومسار الربحية',
        detail: 'متى ستصل إلى "نقطة التعادل" (Break-even Point)؟ ارسم سيناريوهات النمو المتفائل والواقعي والمتحفظ.',
        placeholder: 'الإيرادات المتوقعة، الأرباح الصافية، والتدفقات النقدية لسنوات 1-3...',
        icon: Activity,
        type: 'text'
      }
    ],
  },
  {
    day: 5,
    title: 'اليوم 05: استراتيجية الاكتساح والنمو الهجومي',
    codename: 'GTM Strategy & Growth Hacking',
    accent: '#f59e0b',
    tasks: [
      {
        id: 'marketing',
        title: 'قنوات الاستحواذ والاكتساح (GTM)',
        detail: 'كيف ستخترق ضجيج السوق؟ حدد القنوات الهجومية (Content, SEO, Paid, Viral) التي ستمنحك نمواً أسياً.',
        placeholder: 'استراتيجية الإطلاق، قنوات التسويق الأساسية، والحملة الافتتاحية...',
        icon: Rocket,
        type: 'list'
      },
      {
        id: 'metrics',
        title: 'مؤشرات الأداء السيادية (North Star)',
        detail: 'ما هو الرقم الوحيد الذي إذا تحسن، تحسن كل شيء في الشركة؟ حدد مؤشراتك الرئيسية وراقبها كالصقر.',
        placeholder: 'الرقم المحوري (North Star Metric)، مؤشرات الاحتفاظ، ومؤشرات النمو الأسبوعي...',
        icon: Briefcase,
        type: 'list'
      },
      {
        id: 'branding',
        title: 'الهوية والوعد السوقي (Positioning)',
        detail: 'العلامة التجارية ليست شعاراً، بل هي "الوعد" الذي تقطعه للعميل. كيف ستتموضع في عقله لتكون الخيار الوحيد المنطقي؟',
        placeholder: 'الرسالة الجوهرية، نبرة الصوت، والانطباع الذهني المستهدف...',
        icon: Globe,
        type: 'text'
      }
    ],
  },
  {
    day: 6,
    title: 'اليوم 06: تحييد المخاطر وحوكمة الكيان السيادي',
    codename: 'Risk Mitigation & Governance',
    accent: '#ef4444',
    tasks: [
      {
        id: 'risk',
        title: 'مصفوفة تحييد المخاطر القصوى',
        detail: 'حدد "الرصاصة" التي قد تقتل مشروعك (تشريعية، تقنية، أو سوقية). ضع خطة استباقية لتحويل المخاطر إلى فرص.',
        placeholder: 'تحديد المخاطر، احتمالية حدوثها، أثرها، وخطة التخفيف (Mitigation)...',
        icon: AlertOctagon,
        type: 'text'
      },
      {
        id: 'legal',
        title: 'الجاهزية القانونية والامتثال',
        detail: 'لا تبنِ قصراً على رمال متحركة. ما هي التراخيص المطلوبة؟ وكيف ستحمي ملكيتك الفكرية وحقوق المساهمين؟',
        placeholder: 'التراخيص، حماية البيانات، هيكل الشركة القانوني، واتفاقيات الملكية...',
        icon: Lock,
        type: 'list'
      },
      {
        id: 'team_governance',
        title: 'حوكمة الفريق وتوزيع الحصص',
        detail: 'من هم "خلية النخبة"؟ وزع الحصص بناءً على القيمة المضافة وليس الصداقة. ضع آلية لاتخاذ القرار وفض النزاعات.',
        placeholder: 'المؤسسون، نظام الاستحقاق (Vesting)، صلاحيات مجلس الإدارة، والأدوار الجوهرية...',
        icon: Users,
        type: 'list'
      }
    ],
  },
  {
    day: 7,
    title: 'اليوم 07: العرض الختامي والجاهزية الاستثمارية',
    codename: 'Final Pitch & Capital Readiness',
    accent: '#1e293b',
    tasks: [
      {
        id: 'brief',
        title: 'الملخص التنفيذي الاستخباراتي',
        detail: 'صغ رسالة مركزة تجيب على: لماذا أنت؟ لماذا هذا الحل؟ لماذا الآن؟ ولماذا سأربح أموالاً طائلة معك؟',
        placeholder: 'فقرة مركزة تلخص جوهر المشروع والقيمة المالية للاستثمار فيه...',
        icon: FileText,
        type: 'text'
      },
      {
        id: 'pitch_deck',
        title: 'هندسة الـ Pitch Deck (12 Slides)',
        detail: 'رتب قصتك في 12 شريحة تجبر المستثمر على طلب اجتماع ثانٍ فوراً. التركيز على الأرقام، الفريق، والتنفيذ.',
        placeholder: 'عناوين الشرائح الـ 12 والنقاط الجوهرية في كل منها...',
        icon: Eye,
        type: 'list'
      },
      {
        id: 'dossier',
        title: 'اعتماد الملف الاستثماري السيادي',
        detail: 'بإغلاق هذه المهمة، أنت لم تعد صاحب "فكرة"، بل أصبحت مؤسساً لكيان استثماري موثق وجاهز للتنفيذ.',
        placeholder: 'اضغط هنا لختم الملف وتحميل النسخة النهائية للاستخدام الرسمي.',
        icon: Download,
        type: 'text'
      }
    ],
  },
];

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'health_tech_ai',
    title: 'منصة تشخيص مبكر بالذكاء الاصطناعي',
    desc: 'سد فجوة التشخيص المتخصص في المناطق النائية عبر خوارزميات رؤية حاسوبية دقيقة.',
    pain: 9,
    sector: 'HealthTech'
  },
  {
    id: 'agri_iot_water',
    title: 'نظام إدارة ري ذكي موفر للمياه',
    desc: 'حل أزمة استنزاف الموارد المائية في الزراعة باستخدام حساسات IoT وتحليل بيانات التربة.',
    pain: 10,
    sector: 'AgriTech'
  },
  {
    id: 'fintech_micro_credit',
    title: 'منصة تمويل متناهي الصغر للمستقلين',
    desc: 'تمكين أصحاب العمل الحر من الحصول على ائتمان بناءً على تقييم أداء رقمي بدلاً من الضمانات التقليدية.',
    pain: 8,
    sector: 'FinTech'
  }
];

