
import { DollarSign, Box, TrendingUp, Zap, Target, Users, Globe, BarChart3, Shield, Rocket } from 'lucide-react';

export interface CompanyDeepDive {
  id: string;
  name: string;
  sector: string;
  valuation: string;
  logo: string;
  color: string;
  gradient: string;
  icon: any;
  problem: {
    title: string;
    description: string;
    impact: string;
  };
  solution: {
    title: string;
    description: string;
    keyFeature: string;
  };
  impact: {
    title: string;
    description: string;
    metrics: { label: string; value: string }[];
  };
  strategy: {
    title: string;
    points: string[];
  };
  lessons: string[];
}

export const companyDeepDives: CompanyDeepDive[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    sector: 'التكنولوجيا المالية (FinTech)',
    valuation: '$50B+',
    logo: 'S',
    color: 'bg-indigo-600',
    gradient: 'from-indigo-600 to-violet-700',
    icon: DollarSign,
    problem: {
      title: 'فوضى المدفوعات الرقمية',
      description: 'قبل سترايب، كان قبول المدفوعات عبر الإنترنت يتطلب أسابيع من الإعداد، وعقوداً معقدة مع البنوك، وبرمجة مئات الأسطر من الكود الهش.',
      impact: 'كانت الشركات الناشئة تقضي وقتاً في حل مشاكل البنية التحتية للمدفوعات بدلاً من بناء منتجاتها.'
    },
    solution: {
      title: 'البنية التحتية الاقتصادية للإنترنت',
      description: 'قدمت سترايب واجهة برمجية (API) ثورية تسمح لأي مطور ببدء قبول المدفوعات في دقائق معدودة.',
      keyFeature: 'واجهة برمجية بسيطة مكونة من 7 أسطر كود فقط.'
    },
    impact: {
      title: 'تمكين التجارة العالمية',
      description: 'أصبحت سترايب المحرك الخلفي لملايين الشركات من المتاجر الصغيرة إلى عمالقة مثل أمازون وفتش.',
      metrics: [
        { label: 'شركات مفعلة', value: '3M+' },
        { label: 'حجم المعاملات', value: '$800B+' },
        { label: 'دعم العملات', value: '135+' }
      ]
    },
    strategy: {
      title: 'سر القيادة',
      points: [
        'التركيز المطلق على تجربة المطورين (Developer Experience).',
        'التوسع الأفقي عبر خدمات مثل Atlas وIssuing.',
        'تحويل التعقيد التنظيمي إلى كود برمجي بسيط.'
      ]
    },
    lessons: [
      'اجعل الحل بسيطاً لدرجة لا يمكن تجاهلها.',
      'حل مشكلة "السباكة" التقنية التي يكرهها الجميع.',
      'ابدأ بمنتج متخصص ثم ابنِ نظاماً بيئياً كاملاً.'
    ]
  },
  {
    id: 'snowflake',
    name: 'Snowflake',
    sector: 'الحوسبة السحابية (Cloud)',
    valuation: '$40B+',
    logo: '❄',
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-sky-600',
    icon: Box,
    problem: {
      title: 'اختناق البيانات الضخمة',
      description: 'قواعد البيانات التقليدية كانت تربط بين التخزين والمعالجة، مما يعني أنه لزيادة سرعة التحليل كان عليك دفع تكاليف تخزين هائلة لا تحتاجها، والعكس صحيح.',
      impact: 'بطء في اتخاذ القرارات المبنية على البيانات وارتفاع غير مبرر في التكاليف.'
    },
    solution: {
      title: 'بنية سحابية أصلية (Cloud Native)',
      description: 'بناء قاعدة بيانات تفصل تماماً بين التخزين والمعالجة، مما يتيح للشركات الدفع فقط مقابل ما تستخدمه من كل منهما.',
      keyFeature: 'توسيع مرن فوري (Elastic Scaling) لمواجهة أعباء العمل المتغيرة.'
    },
    impact: {
      title: 'ثورة في كفاءة البيانات',
      description: 'مكنت الشركات من تحليل كميات هائلة من البيانات في ثوانٍ بدلاً من ساعات، وبجزء بسيط من التكلفة.',
      metrics: [
        { label: 'توفير التكاليف', value: '70%' },
        { label: 'عملاء نشطون', value: '8,000+' },
        { label: 'استعلامات يومية', value: '2.5B+' }
      ]
    },
    strategy: {
      title: 'سر القيادة',
      points: [
        'الاستفادة القصوى من موارد السحابة العامة (AWS, Azure, GCP).',
        'نموذج تسعير مبني على الاستهلاك الفعلي.',
        'سهولة الاستخدام المطلقة دون الحاجة لإدارة البنية التحتية.'
      ]
    },
    lessons: [
      'تحدى القواعد الراسخة في الصناعة (مثل ربط التخزين بالمعالجة).',
      'المرونة المالية (Pay-as-you-go) هي ميزة تنافسية كبرى.',
      'ابنِ منتجاً يعمل بسلاسة فوق العمالقة الموجودين.'
    ]
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    sector: 'السفر والضيافة',
    valuation: '$70B+',
    logo: 'A',
    color: 'bg-rose-500',
    gradient: 'from-rose-500 to-pink-600',
    icon: TrendingUp,
    problem: {
      title: 'فجوة السفر والسكن',
      description: 'الفنادق كانت باهظة الثمن، باردة المشاعر، وغير متوفرة في كل مكان، بينما كان هناك ملايين الغرف الفارغة في منازل الناس لا يستفيد منها أحد.',
      impact: 'كان السفر تجربة مقيدة ومكلفة للأفراد، وفرص ضائعة للدخل للمجتمعات المحلية.'
    },
    solution: {
      title: 'اقتصاد التشارك العالمي',
      description: 'منصة ثقة تسمح للأفراد بتأجير مساحاتهم الخاصة، مما يوفر للمسافرين تجربة محلية أصيلة بأسعار تنافسية.',
      keyFeature: 'نظام تقييم وتأمين متطور لبناء الثقة بين الغرباء.'
    },
    impact: {
      title: 'إعادة تعريف مفهوم السفر',
      description: 'خلق دخل إضافي لملايين العائلات حول العالم وأصبح الخيار الأول للمسافرين الباحثين عن التميز.',
      metrics: [
        { label: 'عدد المضيفين', value: '4M+' },
        { label: 'عدد الضيوف', value: '1.5B+' },
        { label: 'مدن مغطاة', value: '100K+' }
      ]
    },
    strategy: {
      title: 'سر القيادة',
      points: [
        'التركيز على التصميم وبناء الثقة (Design for Trust).',
        'الاستفادة من الأصول غير المستغلة (Underutilized Assets).',
        'خلق مجتمع وليس مجرد منصة تقنية.'
      ]
    },
    lessons: [
      'الثقة هي العملة الحقيقية في اقتصاد التشارك.',
      'التصميم الجيد يحل مشاكل الأمان والتخوفات الاجتماعية.',
      'ركز على "التجربة" وليس فقط على "الخدمة".'
    ]
  }
];
