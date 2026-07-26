import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  CircleX,
  Download,
  FileText,
  Layers3,
  Sparkles,
  Target,
} from 'lucide-react';
import { useProjectWorkspace } from '../../../features/workspace/ProjectWorkspaceContext';
import { exportElementToPdf } from '../../../utils/pdfExport';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';

interface BrandIdentityStudioProps {
  setActiveTab?: (tab: string) => void;
  onBrandDraftChange?: (draft: { prompt: string; personality: string; palette: string }) => void;
}

interface SelectOption {
  id: string;
  title: string;
  description: string;
  hint?: string;
  swatches?: string[];
}

const PROJECT_TYPES: SelectOption[] = [
  {
    id: 'startup-platform',
    title: 'منصة رقمية ناشئة',
    description: 'مناسب للمشاريع التي تبني منتجاً رقمياً يحتاج ثقة وسرعة فهم.',
    hint: 'مفيد للمنصات التي تبدأ بمنتج أولي وتحتاج صورة واضحة أمام المستثمر والعميل.',
  },
  {
    id: 'service-business',
    title: 'خدمة احترافية',
    description: 'مناسب للشركات التي تبيع خبرة أو تنفيذ أو استشارات.',
    hint: 'يخدم الشركات التي تبني ثقتها عبر الخبرة والعرض الواضح.',
  },
  {
    id: 'consumer-brand',
    title: 'علامة موجهة للمستهلك',
    description: 'مناسب للمشاريع التي تحتاج حضوراً أوضح وذاكرة بصرية أقوى.',
    hint: 'مناسب عندما يكون قرار الشراء أسرع وتعتمد العلامة على التذكر والانجذاب.',
  },
  {
    id: 'saas-product',
    title: 'منتج SaaS',
    description: 'مناسب لمنتجات البرمجيات التي تبيع اشتراكاً أو تدفقاً رقمياً متكرراً.',
    hint: 'يفيد عندما تحتاج الهوية أن تبدو قابلة للتوسع ومنظمة تقنياً.',
  },
  {
    id: 'marketplace-platform',
    title: 'سوق أو marketplace',
    description: 'مناسب للمنصات التي تجمع طرفين أو أكثر ضمن تجربة تبادل أو بيع أو خدمات.',
    hint: 'الهوية هنا يجب أن تبني الثقة وتُشعر المستخدم بالحركة والنشاط.',
  },
  {
    id: 'consulting-firm',
    title: 'شركة استشارية',
    description: 'مناسب للشركات التي تعتمد على الفكر والخبرة والموثوقية أمام جهات القرار.',
    hint: 'تحتاج عادة إلى لغة بصرية أكثر نضجاً ورسمية.',
  },
  {
    id: 'education-brand',
    title: 'علامة تعليمية',
    description: 'مناسب للمشاريع التعليمية، الأكاديميات، ومنصات التعلم.',
    hint: 'يفضل هوية واضحة وودية وتدعم القراءة المكثفة.',
  },
  {
    id: 'health-service',
    title: 'خدمة صحية أو wellness',
    description: 'مناسب للمشاريع الصحية والعلاجية والوقائية وخدمات العافية.',
    hint: 'تحتاج الهوية إلى ثقة عالية وهدوء بصري أكبر.',
  },
  {
    id: 'industrial-solution',
    title: 'حل صناعي أو B2B',
    description: 'مناسب للمشاريع التي تبيع حلولاً تشغيلية أو تقنية لقطاعات الأعمال والصناعة.',
    hint: 'يفضل خطاب بصري منضبط وواضح ومهني جداً.',
  },
  {
    id: 'community-platform',
    title: 'منصة مجتمعية',
    description: 'مناسب للمنصات التي تبني تفاعلاً أو عضوية أو مجتمعاً حول موضوع محدد.',
    hint: 'تحتاج نبرة أكثر إنسانية ودفئاً مع وضوح جيد.',
  },
  {
    id: 'luxury-brand',
    title: 'علامة فاخرة',
    description: 'مناسب للمشاريع التي تبيع إحساساً بالقيمة العالية والتميز والتجربة الراقية.',
    hint: 'الهوية يجب أن تكون أقل ضجيجاً وأكثر اتزاناً وأناقة.',
  },
  {
    id: 'media-brand',
    title: 'علامة محتوى أو إعلام',
    description: 'مناسب للمنصات أو المشاريع التي تبيع محتوى أو جمهوراً أو حضوراً تحريرياً.',
    hint: 'يفضل اتجاه بصري أسهل تذكراً وله قدرة على التوسع عبر القنوات.',
  },
  {
    id: 'retail-product',
    title: 'منتج تجزئة أو D2C',
    description: 'مناسب للمنتجات الموجهة مباشرة للمستهلك النهائي.',
    hint: 'تحتاج الهوية أن تعمل جيداً على الغلاف، المتجر، والصفحات التسويقية.',
  },
];

const BRAND_PERSONALITIES: SelectOption[] = [
  {
    id: 'trustworthy',
    title: 'موثوق وواضح',
    description: 'يعطي شعوراً بالثبات والوضوح والجدية.',
    hint: 'مناسب للمشاريع التي تريد تقليل التردد ورفع الثقة بسرعة.',
  },
  {
    id: 'premium',
    title: 'راقي ومحسوب',
    description: 'يعطي إحساساً بقيمة أعلى وجودة أكثر هدوءاً.',
    hint: 'مفيد عندما تريد تقديم المشروع كتجربة أعلى قيمة.',
  },
  {
    id: 'bold',
    title: 'جريء ولافت',
    description: 'يبرز وسط المنافسة ويخلق تذكراً أسرع للعلامة.',
    hint: 'يناسب المشاريع التي تريد حضوراً أقوى في سوق مزدحم.',
  },
  {
    id: 'practical',
    title: 'عملي ومباشر',
    description: 'يركز على الحل والوضوح والنتيجة أكثر من الاستعراض.',
    hint: 'مناسب للمشاريع التي تبيع حلاً واضحاً وسريع الفهم.',
  },
  {
    id: 'friendly',
    title: 'ودود وقريب',
    description: 'يجعل العلامة أسهل اقتراباً وأكثر إنسانية في الانطباع.',
    hint: 'جيد للمنصات المجتمعية والتعليمية وبعض الخدمات الاستهلاكية.',
  },
  {
    id: 'innovative',
    title: 'ابتكاري ومستقبلي',
    description: 'يعطي إحساساً بالتقنية والحداثة والحركة للأمام.',
    hint: 'مناسب للمنتجات التقنية والذكاء الاصطناعي والابتكار.',
  },
  {
    id: 'institutional',
    title: 'مؤسسي ومنضبط',
    description: 'يشعر المستخدم بأن المشروع منظم ورسمي وموثوق أمام جهات القرار.',
    hint: 'مفيد للخدمات B2B والجهات الاستشارية والتنفيذية.',
  },
  {
    id: 'human-centered',
    title: 'إنساني ومتعاطف',
    description: 'يبني علاقة أهدأ وأكثر قرباً مع المستخدم النهائي.',
    hint: 'يناسب الصحة والتعليم والمبادرات المجتمعية.',
  },
  {
    id: 'luxury',
    title: 'فاخر وهادئ',
    description: 'يركز على الجودة والانتقاء والاتزان بدل الزخم.',
    hint: 'مناسب للعلامات الراقية والمنتجات عالية القيمة.',
  },
  {
    id: 'editorial',
    title: 'تحريري وناضج',
    description: 'يعطي حضوراً فكرياً ومحتوى منظماً وواعياً بصرياً.',
    hint: 'مفيد للعلامات الإعلامية والمحتوى والبروفايلات الفكرية.',
  },
];

const COLOR_SYSTEMS: SelectOption[] = [
  {
    id: 'blue-system',
    title: 'أزرق مؤسسي',
    description: 'للثقة والتنظيم والانضباط.',
    hint: 'مناسب للعروض والمواقع والمواد الرسمية.',
    swatches: ['#0f172a', '#2563eb', '#dbeafe', '#f8fafc'],
  },
  {
    id: 'green-system',
    title: 'أخضر نمو',
    description: 'يعطي إحساساً بالهدوء والاستمرارية والجودة.',
    hint: 'مناسب للمشاريع التي تريد نبرة هادئة وواثقة.',
    swatches: ['#14532d', '#16a34a', '#dcfce7', '#fafaf9'],
  },
  {
    id: 'contrast-system',
    title: 'تباين سوقي',
    description: 'مزيج أقوى يلفت الانتباه دون فقدان الجدية.',
    hint: 'مناسب للمشاريع التي تحتاج تميّزاً أسرع في السوق.',
    swatches: ['#111827', '#ea580c', '#fed7aa', '#fff7ed'],
  },
  {
    id: 'teal-system',
    title: 'فيروزي تقني',
    description: 'يوحي بالابتكار والمرونة والوضوح الحديث.',
    hint: 'مفيد للمنصات التقنية والخدمات الرقمية.',
    swatches: ['#0f172a', '#0f766e', '#99f6e4', '#f0fdfa'],
  },
  {
    id: 'violet-system',
    title: 'بنفسجي مؤسسي',
    description: 'يعطي حضوراً مميزاً مع بقاء النبرة منظمة.',
    hint: 'مناسب عندما تريد اختلافاً بصرياً دون صخب.',
    swatches: ['#1e1b4b', '#7c3aed', '#ddd6fe', '#f5f3ff'],
  },
  {
    id: 'indigo-system',
    title: 'نيلي استراتيجي',
    description: 'نظام عميق للثقة والتحليل واتخاذ القرار.',
    hint: 'يناسب المشاريع التي تخاطب صناع القرار.',
    swatches: ['#1e293b', '#4338ca', '#c7d2fe', '#eef2ff'],
  },
  {
    id: 'sky-system',
    title: 'سماوي حديث',
    description: 'خفيف وواضح ويوحي بالخدمة السلسة.',
    hint: 'مناسب للتجارب الرقمية السهلة وسرعة التبني.',
    swatches: ['#082f49', '#0284c7', '#bae6fd', '#f0f9ff'],
  },
  {
    id: 'navy-gold-system',
    title: 'كحلي وذهبي',
    description: 'يمزج الجدية مع الإحساس بالقيمة العالية.',
    hint: 'مناسب للبروفايلات الراقية والخدمات عالية الثقة.',
    swatches: ['#172554', '#ca8a04', '#fef08a', '#fffef2'],
  },
  {
    id: 'charcoal-red-system',
    title: 'فحمي وأحمر',
    description: 'نظام قوي وحاد يلفت الانتباه بسرعة.',
    hint: 'مناسب للعلامات الجريئة أو الأسواق التنافسية.',
    swatches: ['#111827', '#dc2626', '#fecaca', '#fef2f2'],
  },
  {
    id: 'sand-olive-system',
    title: 'رملي وزيتوني',
    description: 'يوحي بالاستدامة والهدوء والقرب من الواقع.',
    hint: 'مناسب للمشاريع الزراعية أو البيئية أو الحرفية.',
    swatches: ['#44403c', '#4d7c0f', '#d9f99d', '#fefce8'],
  },
  {
    id: 'rose-charcoal-system',
    title: 'وردي داكن',
    description: 'يعطي طابعاً معاصراً مع حضور بصري واضح.',
    hint: 'ملائم للعلامات الاستهلاكية والتجارب الجديدة.',
    swatches: ['#1f2937', '#e11d48', '#fecdd3', '#fff1f2'],
  },
  {
    id: 'amber-system',
    title: 'عنبر دافئ',
    description: 'نظام مرح لكن منضبط، يعطي دفئاً وثقة.',
    hint: 'جيد للعلامات التي تريد قرباً إنسانياً أكبر.',
    swatches: ['#451a03', '#d97706', '#fde68a', '#fffbeb'],
  },
  {
    id: 'emerald-system',
    title: 'زمردي نقي',
    description: 'يعكس النمو والصحة والاستمرارية.',
    hint: 'مناسب للصحة والغذاء والبيئة ومنتجات الثقة.',
    swatches: ['#022c22', '#059669', '#a7f3d0', '#ecfdf5'],
  },
  {
    id: 'cyan-system',
    title: 'سماوي احترافي',
    description: 'حديث وواضح ويعطي طابعاً تقنياً أنيقاً.',
    hint: 'جيد للأنظمة الرقمية ومنتجات البيانات.',
    swatches: ['#083344', '#0891b2', '#a5f3fc', '#ecfeff'],
  },
  {
    id: 'plum-system',
    title: 'برقوقي هادئ',
    description: 'يوحي بالنضج والتميّز الهادئ.',
    hint: 'ملائم للعلامات التي تريد فرادة راقية.',
    swatches: ['#3b0764', '#9333ea', '#e9d5ff', '#faf5ff'],
  },
  {
    id: 'stone-system',
    title: 'حجري محايد',
    description: 'نظام محافظ وواضح يركز على المضمون.',
    hint: 'مناسب للخدمات الاحترافية والملفات الرسمية.',
    swatches: ['#292524', '#78716c', '#d6d3d1', '#fafaf9'],
  },
  {
    id: 'forest-system',
    title: 'غابي عميق',
    description: 'يعكس الثبات والطبيعة والاعتمادية.',
    hint: 'جيد للمشاريع الطويلة الأمد أو ذات البعد الطبيعي.',
    swatches: ['#052e16', '#166534', '#bbf7d0', '#f0fdf4'],
  },
  {
    id: 'ocean-system',
    title: 'محيطي عميق',
    description: 'يوحي بالاتساع والهدوء والانضباط.',
    hint: 'مناسب للمنصات التي تريد صورة أكثر نضجاً.',
    swatches: ['#082f49', '#0369a1', '#bae6fd', '#f8fafc'],
  },
  {
    id: 'burgundy-system',
    title: 'خمري فاخر',
    description: 'يعطي إحساساً بالنخبوية والهوية المميزة.',
    hint: 'مفيد للعلامات الفاخرة أو المتخصصة.',
    swatches: ['#4c0519', '#be123c', '#fbcfe8', '#fff1f2'],
  },
  {
    id: 'mint-system',
    title: 'نعناعي خفيف',
    description: 'يعطي طاقة خفيفة وتجربة ودودة.',
    hint: 'مناسب للتجارب الحديثة أو الواجهات السلسة.',
    swatches: ['#064e3b', '#10b981', '#a7f3d0', '#f0fdf4'],
  },
  {
    id: 'slate-lime-system',
    title: 'رصاصي ولايم',
    description: 'مزيج حديث وغير تقليدي يبرز العناصر المهمة بسرعة.',
    hint: 'مناسب للمنتجات الشابة أو التجريبية.',
    swatches: ['#1e293b', '#84cc16', '#d9f99d', '#f7fee7'],
  },
  {
    id: 'copper-system',
    title: 'نحاسي غني',
    description: 'يوحي بالدفء والقيمة والحضور الأصيل.',
    hint: 'مفيد للعلامات الحرفية أو المنتجات المتخصصة.',
    swatches: ['#431407', '#c2410c', '#fdba74', '#fff7ed'],
  },
  {
    id: 'pearl-system',
    title: 'لؤلؤي ناعم',
    description: 'نظام فاتح ونظيف يعطي مساحة وأناقة.',
    hint: 'مناسب لتجارب تعتمد البساطة والهدوء.',
    swatches: ['#334155', '#94a3b8', '#e2e8f0', '#ffffff'],
  },
  {
    id: 'ruby-system',
    title: 'ياقوتي واضح',
    description: 'يعطي طاقة وحضوراً سريعاً مع وضوح قوي.',
    hint: 'مناسب للعلامات التي تحتاج جذب انتباه مباشر.',
    swatches: ['#450a0a', '#b91c1c', '#fecaca', '#fef2f2'],
  },
  {
    id: 'lavender-system',
    title: 'لافندر هادئ',
    description: 'خفيف وحديث ويعطي نعومة منظمة.',
    hint: 'مناسب للمنتجات ذات النبرة الودية أو الهادئة.',
    swatches: ['#312e81', '#8b5cf6', '#ddd6fe', '#f5f3ff'],
  },
  {
    id: 'sunset-system',
    title: 'غروب دافئ',
    description: 'يوحي بالطاقة والحيوية والدفء البصري.',
    hint: 'جيد للعلامات الاستهلاكية أو المجتمعية.',
    swatches: ['#7c2d12', '#f97316', '#fed7aa', '#fff7ed'],
  },
  {
    id: 'ice-system',
    title: 'جليدي نقي',
    description: 'يعكس صفاء وبساطة ووضوحاً شديداً.',
    hint: 'مناسب للتقنية والخدمات الدقيقة ومنتجات التنظيم.',
    swatches: ['#0f172a', '#38bdf8', '#e0f2fe', '#f8fafc'],
  },
  {
    id: 'olive-beige-system',
    title: 'زيتوني وبيج',
    description: 'نظام هادئ وأرضي يعطي ثقة واقعية.',
    hint: 'مناسب للغذاء، الاستدامة، والمنتجات الطبيعية.',
    swatches: ['#3f3f46', '#65a30d', '#ecfccb', '#fafaf9'],
  },
  {
    id: 'royal-system',
    title: 'ملكي كلاسيكي',
    description: 'يعطي فخامة وانضباطاً في الوقت نفسه.',
    hint: 'مفيد للهويات التي تريد حضوراً رفيعاً وواضحاً.',
    swatches: ['#172554', '#7c3aed', '#ddd6fe', '#f8fafc'],
  },
  {
    id: 'graphite-system',
    title: 'غرافيتي حديث',
    description: 'محايد قوي يسمح بإبراز المحتوى والمنتج.',
    hint: 'مناسب للمشاريع التي تريد حياداً مع لمسة عصرية.',
    swatches: ['#111827', '#6b7280', '#d1d5db', '#f9fafb'],
  },
];

const TYPOGRAPHY_OPTIONS: SelectOption[] = [
  {
    id: 'ibm-readex',
    title: 'IBM Plex Sans Arabic + Readex Pro',
    description: 'توازن بين الوضوح والاحتراف والعرض المؤسسي.',
    hint: 'جيد للعروض الرسمية وصفحات المشاريع.',
  },
  {
    id: 'readex-ibm',
    title: 'Readex Pro + IBM Plex Sans Arabic',
    description: 'عناوين أوضح وحضور بصري أقوى مع نصوص مقروءة.',
    hint: 'مفيد إذا أردت عناوين أقوى من النصوص المساندة.',
  },
  {
    id: 'ibm-cairo',
    title: 'IBM Plex Sans Arabic + Cairo',
    description: 'مناسب للمواد التي تحتاج بساطة وسهولة قراءة عالية.',
    hint: 'مريح للمنصات والواجهات الطويلة المحتوى.',
  },
  {
    id: 'cairo-ibm',
    title: 'Cairo + IBM Plex Sans Arabic',
    description: 'يعطي طابعاً عملياً وودوداً مع وضوح جيد في العناوين.',
    hint: 'مناسب للمنصات الخدمية والواجهات المباشرة.',
  },
  {
    id: 'tajawal-ibm',
    title: 'Tajawal + IBM Plex Sans Arabic',
    description: 'خفيف وحديث ويعطي إحساساً رقمياً أسلس.',
    hint: 'مفيد للمنتجات التقنية والتجارب السريعة.',
  },
  {
    id: 'alexandria-readex',
    title: 'Alexandria + Readex Pro',
    description: 'حضور حديث وواضح مع شخصية أقوى في العناوين.',
    hint: 'مناسب للعلامات الشابة أو النشطة بصرياً.',
  },
  {
    id: 'noto-kufi-ibm',
    title: 'Noto Kufi Arabic + IBM Plex Sans Arabic',
    description: 'يعطي انضباطاً هندسياً أوضح ونبرة أكثر مؤسسية.',
    hint: 'جيد للمشاريع التي تريد صرامة وتنظيماً بصرياً أعلى.',
  },
  {
    id: 'elmessiri-readex',
    title: 'El Messiri + Readex Pro',
    description: 'يمزج طابعاً مميزاً في العنوان مع نص داعم واضح.',
    hint: 'ملائم للعلامات التي تريد شخصية أوضح دون مبالغة.',
  },
  {
    id: 'changa-cairo',
    title: 'Changa + Cairo',
    description: 'طاقة أعلى وحضور بصري أقوى في العناصر البارزة.',
    hint: 'مناسب للعلامات الجريئة أو العروض ذات الإيقاع الأسرع.',
  },
];

const LOGO_DIRECTIONS: SelectOption[] = [
  {
    id: 'wordmark',
    title: 'شعار نصي واضح',
    description: 'يركز على اسم المشروع ويخدم المشاريع التي تريد وضوحاً مباشراً.',
    hint: 'مفيد إذا كان اسم العلامة نفسه هو الأصل الأقوى.',
  },
  {
    id: 'symbolic',
    title: 'رمز مع اسم',
    description: 'يجمع بين اسم العلامة وأيقونة مبسطة قابلة للاستخدام المنفصل.',
    hint: 'يعطي مرونة أعلى بين الموقع والأيقونة والصورة الرمزية.',
  },
  {
    id: 'monogram',
    title: 'اختصار أو monogram',
    description: 'مناسب إذا كان المشروع يحتاج علامة مختصرة للصورة الشخصية والأيقونة.',
    hint: 'جيد عندما يكون الاسم طويلاً أو الاستخدامات الرقمية كثيرة.',
  },
  {
    id: 'lettermark',
    title: 'حرف أو lettermark',
    description: 'يركز على حرف أو اختصار بصري واحد أو أكثر من اسم المشروع.',
    hint: 'مناسب للعلامات التي تحتاج رمزاً بسيطاً وقابلاً للتكرار.',
  },
  {
    id: 'combination-mark',
    title: 'Combination mark',
    description: 'مزيج متوازن بين الرمز والنص مع وضوح أعلى في جميع الاستخدامات.',
    hint: 'أحد أكثر الاتجاهات مرونة للمشاريع الجديدة.',
  },
  {
    id: 'emblem',
    title: 'Emblem أو شارة',
    description: 'يعطي طابعاً أكثر رسوخاً واحتواءً ضمن شكل متكامل.',
    hint: 'مفيد للجهات التعليمية، المجتمعية، وبعض العلامات الرسمية.',
  },
  {
    id: 'geometric',
    title: 'رمز هندسي minimal',
    description: 'يعتمد شكلاً هندسياً بسيطاً وحديثاً وسهل الاستخدام.',
    hint: 'مناسب للمنتجات التقنية والمنصات الحديثة.',
  },
  {
    id: 'premium-signature',
    title: 'شعار راقٍ بتوقيع بصري',
    description: 'اتجاه يركز على الأناقة والتميز الهادئ أكثر من الشكل الصريح.',
    hint: 'مناسب للعلامات الفاخرة أو التجارب الرفيعة.',
  },
  {
    id: 'dynamic-symbol',
    title: 'رمز ديناميكي',
    description: 'يعطي إحساساً بالحركة والنشاط والتطور داخل العلامة.',
    hint: 'مفيد للمنصات التي تريد الإحساس بالحيوية والتجدد.',
  },
];

const IMAGERY_OPTIONS: SelectOption[] = [
  {
    id: 'real-clean',
    title: 'صور حقيقية نظيفة',
    description: 'تعتمد لقطات واضحة ومضيئة وتظهر المنتج أو الخدمة كما هي.',
    hint: 'مناسبة عندما تريد أقصى وضوح وثقة بصرية.',
  },
  {
    id: 'product-focus',
    title: 'تركيز على المنتج',
    description: 'تضع القيمة والوظيفة في الواجهة أكثر من المشاهد العامة.',
    hint: 'تخدم المنتجات الرقمية أو المادية التي تحتاج شرحاً مباشراً.',
  },
  {
    id: 'brand-atmosphere',
    title: 'جو بصري للعلامة',
    description: 'تعتمد صوراً أهدأ تبني الإحساس العام بالعلامة والهوية.',
    hint: 'مفيدة عندما يكون الإحساس العام جزءاً من القيمة.',
  },
  {
    id: 'editorial-imagery',
    title: 'أسلوب تحريري',
    description: 'يعتمد صوراً أقرب للمجلات والبروفايلات والصفحات التحريرية.',
    hint: 'مناسب للبروفايلات الراقية والعلامات الفكرية أو الإعلامية.',
  },
  {
    id: 'lifestyle-scenes',
    title: 'مشاهد lifestyle',
    description: 'يُظهر المنتج أو الخدمة ضمن حياة العميل واستخدامه اليومي.',
    hint: 'مفيد للعلامات الاستهلاكية والمشاريع القريبة من المستخدم النهائي.',
  },
  {
    id: 'ui-showcase',
    title: 'عرض الواجهة أو النظام',
    description: 'يعتمد لقطات من المنصة أو التطبيق أو المنتج الرقمي كجزء من الهوية.',
    hint: 'مناسب للـ SaaS والمنصات الرقمية التي تبيع المنتج نفسه بصرياً.',
  },
  {
    id: 'architectural-clean',
    title: 'مشاهد معمارية أو مكانية',
    description: 'يعطي الهوية بعداً أكثر اتساعاً وتنظيماً وبنية.',
    hint: 'مفيد للعقار، الصناعة، والجهات التنفيذية.',
  },
  {
    id: 'abstract-forms',
    title: 'عناصر abstract',
    description: 'يعتمد أشكالاً وخامات وتجريدات بصرية بدل الصور المباشرة.',
    hint: 'مناسب للعلامات الحديثة التي تريد لغة بصرية فريدة.',
  },
  {
    id: '3d-clean',
    title: 'عناصر ثلاثية الأبعاد نظيفة',
    description: 'يضيف بعداً حديثاً ومرناً إذا كان التنفيذ متقناً وبسيطاً.',
    hint: 'مفيد للمنتجات الرقمية والشروحات المرئية الحديثة.',
  },
  {
    id: 'documentary-human',
    title: 'توثيقي إنساني',
    description: 'يعتمد صوراً واقعية بشرية تُظهر الأثر والاستخدام بشكل صادق.',
    hint: 'مناسب للمبادرات الاجتماعية، الصحة، والتعليم.',
  },
];

const APPLICATION_OPTIONS: SelectOption[] = [
  {
    id: 'pitch-website',
    title: 'العرض والموقع',
    description: 'الهوية يجب أن تنجح أولاً في العرض التقديمي والصفحة التعريفية.',
    hint: 'أفضل خيار للمشاريع التي لا تزال في مرحلة الإقناع والتمويل.',
  },
  {
    id: 'platform-interface',
    title: 'واجهة المنصة',
    description: 'الهوية يجب أن تمتد بسهولة إلى الأزرار والعناوين والبطاقات.',
    hint: 'مفيد عندما يكون الاستخدام اليومي داخل المنتج نفسه هو الأساس.',
  },
  {
    id: 'profile-documents',
    title: 'الملف التجاري والمستندات',
    description: 'الهوية يجب أن تبدو قوية أيضاً في الملفات والوثائق والبروفايل.',
    hint: 'مناسب للشركات الخدمية أو B2B التي تعتمد كثيراً على العروض والملفات.',
  },
  {
    id: 'landing-page',
    title: 'Landing page',
    description: 'يجب أن تنجح الهوية أولاً على صفحات الهبوط والتحويل.',
    hint: 'مناسب إذا كان التسويق الرقمي هو المدخل الأساسي للعملاء.',
  },
  {
    id: 'mobile-app',
    title: 'تطبيق جوال',
    description: 'الأولوية لعمل الهوية داخل التطبيق والأيقونات والعناصر المصغرة.',
    hint: 'مهم للمنتجات التي تبدأ من الجوال أو تعتمد على الاستخدام اليومي.',
  },
  {
    id: 'social-brand',
    title: 'الحضور الاجتماعي',
    description: 'يجب أن تنجح الهوية في الصور الشخصية والأغلفة والمنشورات المختصرة.',
    hint: 'مفيد للعلامات التي تبني جمهوراً أو محتوى أو مبيعات عبر السوشيال.',
  },
  {
    id: 'company-profile',
    title: 'Company profile',
    description: 'يجب أن تبدو الهوية قوية داخل بروفايل الشركة والعروض الرسمية.',
    hint: 'مناسب للشركات التي تبيع عبر العلاقات والعروض التنفيذية.',
  },
  {
    id: 'packaging-brand',
    title: 'التغليف والعبوة',
    description: 'الأولوية لعمل الهوية على المنتج المادي أو العبوة أو المادة المطبوعة.',
    hint: 'مفيد للعلامات الاستهلاكية والمنتجات D2C.',
  },
  {
    id: 'dashboard-ui',
    title: 'لوحة التحكم وواجهة البيانات',
    description: 'الأولوية لاستخدام الهوية داخل الشاشات التشغيلية والجداول والبطاقات.',
    hint: 'مفيد للمنتجات التحليلية أو الإدارية أو SaaS التشغيلي.',
  },
];

const getOption = (options: SelectOption[], id: string) => options.find((option) => option.id === id) ?? options[0];

export const BrandIdentityStudio: React.FC<BrandIdentityStudioProps> = ({
  setActiveTab,
  onBrandDraftChange,
}) => {
  const { workspace } = useProjectWorkspace();
  const reportRef = useRef<HTMLDivElement>(null);
  const [exportState, setExportState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const projectName = workspace.profile.name || 'المشروع';
  const sectorLabel = workspace.profile.sectorLabel || 'القطاع المستهدف';
  const customerType = workspace.profile.customerType || 'العميل المستهدف';
  const opportunityTitle = workspace.profile.opportunityTitle || 'قيمة المشروع الأساسية';
  const opportunitySummary =
    workspace.profile.opportunitySummary ||
    'المطلوب من الهوية أن تعكس قيمة المشروع وتوضح لماذا هذا المشروع مهم للعميل والسوق.';
  const countryLabel = workspace.profile.countryLabel || 'السوق المحلي';

  const [projectType, setProjectType] = useState('startup-platform');
  const [personality, setPersonality] = useState('trustworthy');
  const [colorSystem, setColorSystem] = useState('blue-system');
  const [typography, setTypography] = useState('ibm-readex');
  const [logoDirection, setLogoDirection] = useState('wordmark');
  const [imageryStyle, setImageryStyle] = useState('real-clean');
  const [applicationFocus, setApplicationFocus] = useState('pitch-website');
  const [detailsContext, setDetailsContext] = useState<{
    sectionTitle: string;
    option: SelectOption;
  } | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    project: true,
    personality: false,
    colors: false,
    typography: false,
    logo: false,
    imagery: false,
    applications: false,
    summary: true,
  });

  const selectedProjectType = useMemo(() => getOption(PROJECT_TYPES, projectType), [projectType]);
  const selectedPersonality = useMemo(() => getOption(BRAND_PERSONALITIES, personality), [personality]);
  const selectedColorSystem = useMemo(() => getOption(COLOR_SYSTEMS, colorSystem), [colorSystem]);
  const selectedTypography = useMemo(() => getOption(TYPOGRAPHY_OPTIONS, typography), [typography]);
  const selectedLogoDirection = useMemo(() => getOption(LOGO_DIRECTIONS, logoDirection), [logoDirection]);
  const selectedImageryStyle = useMemo(() => getOption(IMAGERY_OPTIONS, imageryStyle), [imageryStyle]);
  const selectedApplicationFocus = useMemo(
    () => getOption(APPLICATION_OPTIONS, applicationFocus),
    [applicationFocus],
  );

  const completedBrandSteps = useMemo(
    () => [projectType, personality, colorSystem, typography, logoDirection, imageryStyle, applicationFocus].filter(Boolean).length,
    [applicationFocus, colorSystem, imageryStyle, logoDirection, personality, projectType, typography],
  );

  const completionPercent = Math.round((completedBrandSteps / 7) * 100);

  const finalSummary = useMemo(
    () => ({
      prompt: `هوية بصرية لمشروع ${projectName} في ${sectorLabel} حول ${opportunityTitle}`,
      brandStatement: `${projectName} هو ${selectedProjectType.title} يستهدف ${customerType} ويحتاج هوية ${selectedPersonality.title} تخدم ${selectedApplicationFocus.title}.`,
      designerBrief: [
        `نوع المشروع: ${selectedProjectType.title}.`,
        `شخصية العلامة: ${selectedPersonality.title}.`,
        `نظام الألوان: ${selectedColorSystem.title}.`,
        `زوج الخطوط: ${selectedTypography.title}.`,
        `اتجاه الشعار: ${selectedLogoDirection.title}.`,
        `أسلوب الصور: ${selectedImageryStyle.title}.`,
        `أولوية التطبيق: ${selectedApplicationFocus.title}.`,
      ],
    }),
    [
      customerType,
      opportunityTitle,
      projectName,
      sectorLabel,
      selectedApplicationFocus.title,
      selectedColorSystem.title,
      selectedImageryStyle.title,
      selectedLogoDirection.title,
      selectedPersonality.title,
      selectedProjectType.title,
      selectedTypography.title,
    ],
  );

  useEffect(() => {
    onBrandDraftChange?.({
      prompt: finalSummary.prompt,
      personality: selectedPersonality.title,
      palette: selectedColorSystem.title,
    });
  }, [finalSummary.prompt, onBrandDraftChange, selectedColorSystem.title, selectedPersonality.title]);

  const handleExportReport = async () => {
    if (!reportRef.current) return;

    setExportState('loading');
    try {
      await exportElementToPdf({
        element: reportRef.current,
        fileName: `${projectName}-brand-identity-report.pdf`,
      });
      setExportState('success');
      window.setTimeout(() => setExportState('idle'), 3200);
    } catch {
      setExportState('error');
      window.setTimeout(() => setExportState('idle'), 3200);
    }
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections((current) => ({
      ...current,
      [sectionId]: !current[sectionId],
    }));
  };

  const openDetails = (sectionTitle: string, options: SelectOption[], optionId: string) => {
    setDetailsContext({
      sectionTitle,
      option: getOption(options, optionId),
    });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#f8fafc] pb-24 font-['IBM_Plex_Sans_Arabic'] text-slate-900">
      <div className="app-page-shell-wide pt-8 sm:pt-10">
        <Card className="overflow-hidden rounded-[2rem] border-slate-200 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.25)]">
          <div className="grid gap-0 xl:grid-cols-[minmax(0,1.15fr)_420px]">
            <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
              <div className="absolute inset-0 bg-slate-50" />
              <div className="relative">
                <Badge variant="secondary" className="px-4 py-2 text-[11px]">
                  مساحة قرار الهوية البصرية للمشروع
                </Badge>
                <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl xl:text-5xl">
                  استوديو الهوية البصرية
                </h1>
                <p className="mt-4 max-w-4xl text-sm font-bold leading-8 text-slate-600 sm:text-[15px]">
                  الواجهة هنا ليست form تقليدي. هي مساحة قرار تساعد العميل على بناء هوية المشروع بصرياً على مراحل
                  واضحة، مع معاينة حيّة للاختيارات، ثم إخراج تقرير نهائي جاهز للمصمم والتنفيذ.
                </p>

                <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-slate-50/90 p-4 sm:p-5">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="max-w-2xl">
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">الخطوة الأولى</p>
                      <h2 className="mt-2 text-xl font-black text-slate-950 sm:text-2xl">حدد المشروع الذي ستبني له الهوية الآن</h2>
                      <p className="mt-2 text-sm font-bold leading-7 text-slate-600">
                        الاستوديو يبني الهوية للمشروع النشط حالياً في حسابك، وليس لمشروع عام. إذا كان هذا ليس المشروع المطلوب، انتقل إلى
                        <span className="mx-1 text-slate-900">مشاريعي</span>
                        ثم افتح المشروع الصحيح وارجع هنا.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        onClick={() => setActiveTab?.('my-plans')}
                        variant="outline"
                        size="lg"
                      >
                        <Briefcase size={16} />
                        الذهاب إلى مشاريعي
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setActiveTab?.('new-plan')}
                        size="lg"
                      >
                        <Sparkles size={16} />
                        إنشاء مشروع جديد
                      </Button>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
                    <Card className="rounded-[1.5rem] p-4 sm:p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex min-w-0 items-start gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                            <Target size={20} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">المشروع النشط في حسابك</p>
                            <h3 className="mt-1 text-lg font-black text-slate-950 sm:text-xl">{projectName}</h3>
                            <p className="mt-1 text-sm font-bold text-slate-500">{sectorLabel}</p>
                          </div>
                        </div>
                        <Badge variant="success">
                          المشروع المستخدم الآن
                        </Badge>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">الفرصة</p>
                          <p className="mt-2 text-sm font-bold leading-6 text-slate-700">{opportunityTitle}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">العميل المستهدف</p>
                          <p className="mt-2 text-sm font-bold leading-6 text-slate-700">{customerType}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">مصدر الاختيار</p>
                          <p className="mt-2 text-sm font-bold leading-6 text-slate-700">من المشروع الحالي داخل الحساب ومساحة العمل</p>
                        </div>
                      </div>
                    </Card>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                      <TopCard icon={<FileText size={18} />} label="الناتج النهائي" value="Brand Brief PDF" note="جاهز للمصمم" />
                      <TopCard icon={<Layers3 size={18} />} label="طريقة العمل" value="اختيارات متدرجة" note="كل مرحلة تبني ما بعدها" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-3">
                  <TopCard icon={<Target size={18} />} label="المشروع" value={projectName} note={sectorLabel} />
                  <TopCard icon={<Sparkles size={18} />} label="الفرصة" value={opportunityTitle} note={customerType} />
                  <TopCard icon={<FileText size={18} />} label="الناتج" value="تقرير مصمم PDF" note="جاهز للتنفيذ" />
                </div>

                <div className="mt-6 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white">
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">ماذا سيحدث هنا؟</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {[
                        'اختيار نوع المشروع وشخصية العلامة',
                        'تحديد الألوان والخطوط والشعار',
                        'تصدير brief نهائي للمصمم',
                      ].map((item) => (
                        <div key={item} className="rounded-2xl bg-white/10 px-4 py-4">
                          <p className="text-[13px] font-bold leading-7 text-slate-100">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">قيمة الاستوديو</p>
                    <div className="mt-4 space-y-3">
                      {[
                        'قرارات بصرية مترابطة بدل اختيارات معزولة',
                        'شرح لكل خيار عبر modal عند الحاجة',
                        'ملخص حيّ يوضح أين وصلت الهوية الآن',
                      ].map((item) => (
                        <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                          <p className="text-[13px] font-bold leading-7 text-slate-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <LiveIdentityBoard
              projectName={projectName}
              sectorLabel={sectorLabel}
              selectedProjectType={selectedProjectType.title}
              selectedPersonality={selectedPersonality.title}
              selectedColorSystem={selectedColorSystem}
              selectedTypography={selectedTypography.title}
              selectedLogoDirection={selectedLogoDirection.title}
              selectedApplicationFocus={selectedApplicationFocus.title}
            />
          </div>
        </Card>

        <div className="mt-6 space-y-6">
          <section className="surface-card p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="text-right">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">حالة التفاعل</p>
                <h2 className="mt-2 text-lg font-black text-slate-950">التقدم والتأكيد وحالة التحميل</h2>
                <p className="mt-2 text-[13px] font-bold leading-7 text-slate-600">
                  هذه الطبقة تعرض بشكل مقصود كيف يجب أن تبدو حالات التفاعل في الواجهة: تقدم حي، اختيار نشط، تحميل، ثم تأكيد بعد الإنجاز.
                </p>
              </div>

              <div className="min-w-[220px] rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-right">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-slate-900">{completionPercent}%</span>
                  <span className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">اكتمال الهوية</span>
                </div>
                <div className="ui-progress-track mt-3 h-3 rounded-full bg-slate-200">
                  <div
                    className="ui-progress-fill h-full rounded-full bg-slate-900 transition-[width] duration-500"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
                <p className="mt-3 text-[12px] font-bold text-slate-600">{completedBrandSteps} من 7 قرارات تم تحديدها</p>
              </div>
            </div>
          </section>

          <StepSection
            sectionId="project"
            step="01"
            title="تحديد نوع المشروع"
            description="اختر طبيعة المشروع أولاً حتى تبنى بقية عناصر الهوية على أساس صحيح."
            isOpen={openSections.project}
            onToggle={toggleSection}
            selectedTitle={selectedProjectType.title}
            selectedNote={selectedProjectType.description}
          >
            <OptionGrid
              options={PROJECT_TYPES}
              value={projectType}
              onChange={setProjectType}
              showDetailsAction
              onOpenDetails={(id) => openDetails('فكرة نوع المشروع', PROJECT_TYPES, id)}
              gridClassName="sm:grid-cols-2 xl:grid-cols-3"
            />
          </StepSection>

          <StepSection
            sectionId="personality"
            step="02"
            title="اختيار شخصية العلامة"
            description="حدد كيف تريد أن يقرأ العميل المشروع بصرياً: موثوق، راقٍ، أو جريء."
            isOpen={openSections.personality}
            onToggle={toggleSection}
            selectedTitle={selectedPersonality.title}
            selectedNote={selectedPersonality.description}
          >
            <OptionGrid
              options={BRAND_PERSONALITIES}
              value={personality}
              onChange={setPersonality}
              showDetailsAction
              onOpenDetails={(id) => openDetails('فكرة شخصية العلامة', BRAND_PERSONALITIES, id)}
              gridClassName="sm:grid-cols-2 xl:grid-cols-3"
            />
          </StepSection>

          <StepSection
            sectionId="colors"
            step="03"
            title="اختيار تمازج الألوان"
            description="اختر النظام اللوني الأنسب للمشروع. هذا القرار سيؤثر على الموقع والعرض والمواد البصرية."
            isOpen={openSections.colors}
            onToggle={toggleSection}
            selectedTitle={selectedColorSystem.title}
            selectedNote={selectedColorSystem.hint || selectedColorSystem.description}
          >
            <OptionGrid
              options={COLOR_SYSTEMS}
              value={colorSystem}
              onChange={setColorSystem}
              showSwatches
              showDetailsAction
              onOpenDetails={(id) => openDetails('فكرة نظام الألوان', COLOR_SYSTEMS, id)}
              gridClassName="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            />
            <div className="mt-5 rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-5">
              <p className="text-sm font-black text-slate-900">لم يعجبك أي نموذج؟</p>
              <p className="mt-2 text-[13px] font-bold leading-7 text-slate-600">
                يمكنك الانتقال إلى خدمة احترافية مخصصة للهوية البصرية ليتم تجهيز نظام ألوان خاص بمشروعك خارج
                النماذج الجاهزة.
              </p>
              <button
                onClick={() => setActiveTab?.('contact-us')}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-[12px] font-black text-white transition hover:bg-slate-800 sm:w-auto"
              >
                طلب تصميم هوية مخصصة
                <ArrowLeft size={14} />
              </button>
            </div>
          </StepSection>

          <StepSection
            sectionId="typography"
            step="04"
            title="اختيار الخطوط"
            description="حدد زوج الخطوط الذي يخدم القراءة ويعطي النبرة المناسبة للهوية."
            isOpen={openSections.typography}
            onToggle={toggleSection}
            selectedTitle={selectedTypography.title}
            selectedNote={selectedTypography.hint || selectedTypography.description}
          >
            <OptionGrid
              options={TYPOGRAPHY_OPTIONS}
              value={typography}
              onChange={setTypography}
              showDetailsAction
              onOpenDetails={(id) => openDetails('فكرة الخطوط', TYPOGRAPHY_OPTIONS, id)}
              gridClassName="sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            />
          </StepSection>

          <StepSection
            sectionId="logo"
            step="05"
            title="اختيار اتجاه الشعار"
            description="اختر الشكل العام للشعار الذي تريد أن يعمل داخل الموقع والعروض والمواد الرسمية."
            isOpen={openSections.logo}
            onToggle={toggleSection}
            selectedTitle={selectedLogoDirection.title}
            selectedNote={selectedLogoDirection.description}
          >
            <OptionGrid
              options={LOGO_DIRECTIONS}
              value={logoDirection}
              onChange={setLogoDirection}
              showDetailsAction
              onOpenDetails={(id) => openDetails('فكرة اتجاه الشعار', LOGO_DIRECTIONS, id)}
              gridClassName="sm:grid-cols-2 xl:grid-cols-3"
            />
          </StepSection>

          <StepSection
            sectionId="imagery"
            step="06"
            title="اختيار أسلوب الصور"
            description="اختر الأسلوب البصري للصور والمشاهد المرافقة للهوية."
            isOpen={openSections.imagery}
            onToggle={toggleSection}
            selectedTitle={selectedImageryStyle.title}
            selectedNote={selectedImageryStyle.description}
          >
            <OptionGrid
              options={IMAGERY_OPTIONS}
              value={imageryStyle}
              onChange={setImageryStyle}
              showDetailsAction
              onOpenDetails={(id) => openDetails('فكرة أسلوب الصور', IMAGERY_OPTIONS, id)}
              gridClassName="sm:grid-cols-2 xl:grid-cols-3"
            />
          </StepSection>

          <StepSection
            sectionId="applications"
            step="07"
            title="اختيار أولوية التطبيق"
            description="حدد أين يجب أن تنجح الهوية أولاً حتى يعرف المصمم أين يركز."
            isOpen={openSections.applications}
            onToggle={toggleSection}
            selectedTitle={selectedApplicationFocus.title}
            selectedNote={selectedApplicationFocus.description}
          >
            <OptionGrid
              options={APPLICATION_OPTIONS}
              value={applicationFocus}
              onChange={setApplicationFocus}
              showDetailsAction
              onOpenDetails={(id) => openDetails('فكرة أولوية التطبيق', APPLICATION_OPTIONS, id)}
              gridClassName="sm:grid-cols-2 xl:grid-cols-3"
            />
          </StepSection>

          <StepSection
            sectionId="summary"
            step="08"
            title="الملخص النهائي قبل التصدير"
            description="راجع قرارات الهوية كلها في مكان واحد ثم صدّر التقرير النهائي للمصمم."
            isOpen={openSections.summary}
            onToggle={toggleSection}
            selectedTitle="جاهز للتصدير"
            selectedNote="راجع الاختيارات النهائية ثم أنشئ PDF"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                <Layers3 size={18} />
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
              <SummaryChoice label="نوع المشروع" value={selectedProjectType.title} />
              <SummaryChoice label="الشخصية" value={selectedPersonality.title} />
              <SummaryChoice label="الألوان" value={selectedColorSystem.title} />
              <SummaryChoice label="الخطوط" value={selectedTypography.title} />
              <SummaryChoice label="الشعار" value={selectedLogoDirection.title} />
              <SummaryChoice label="الصور" value={selectedImageryStyle.title} />
            </div>

            <div className="mt-6 grid gap-4 2xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-black text-slate-950">وصف الهوية الناتج</h3>
                <p className="mt-3 text-[13px] font-bold leading-8 text-slate-700">{finalSummary.brandStatement}</p>
                <p className="mt-4 text-[13px] font-bold leading-8 text-slate-600">{opportunitySummary}</p>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">جاهزية التصدير</p>
                <p className="mt-3 text-sm font-black text-slate-950">يمكنك الآن إنشاء brief نهائي للمصمم</p>
                <p className="mt-3 text-[12px] font-bold leading-7 text-slate-600">
                  التقرير سيجمع قرارات المشروع، الشخصية، الألوان، الخطوط، الشعار، وأولوية التطبيق في ملف واحد.
                </p>

                <div className="mt-5 flex flex-col gap-3">
                  <Button
                    onClick={handleExportReport}
                    loading={exportState === 'loading'}
                    loadingText="جارٍ إنشاء التقرير..."
                    size="lg"
                    className={`w-full rounded-3xl px-6 py-4 ${
                      exportState === 'success'
                        ? 'ui-confirmation-flash bg-emerald-600 hover:bg-emerald-600'
                        : exportState === 'error'
                          ? 'bg-rose-600 hover:bg-rose-600'
                          : ''
                    }`}
                  >
                    <Download size={18} />
                    {exportState === 'success'
                      ? 'تم إنشاء التقرير بنجاح'
                      : exportState === 'error'
                        ? 'تعذر إنشاء التقرير حالياً'
                        : 'تصدير التقرير النهائي PDF'}
                  </Button>
                  <Button
                    onClick={() => setActiveTab?.('workspace')}
                    variant="outline"
                    size="lg"
                    className="w-full rounded-3xl px-6 py-4"
                  >
                    الانتقال إلى مساحة العمل
                    <ArrowLeft size={14} />
                  </Button>
                </div>
                <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-[12px] font-bold leading-7 text-slate-600">
                    {exportState === 'loading'
                      ? 'يتم الآن تجهيز ملف الـ PDF النهائي مع جميع الاختيارات المعتمدة.'
                      : exportState === 'success'
                        ? 'التأكيد ظهر هنا لإيضاح حالة النجاح بعد التصدير وتسليم Feedback واضح للمستخدم.'
                        : exportState === 'error'
                          ? 'هذه حالة خطأ مرئية للمطور حتى يبني رسالة فشل واضحة إذا تعذر التصدير لاحقاً.'
                          : 'هذه المنطقة تمثل حالة التأكيد النصي أسفل الإجراء الرئيسي بعد كل تفاعل مهم.'}
                  </p>
                </div>
              </div>
            </div>
          </StepSection>
        </div>

        <div className="sr-only">
          <div ref={reportRef} className="w-[1200px] bg-white p-10 text-slate-900">
            <div className="border-b border-slate-200 pb-6">
              <p className="text-sm font-bold text-slate-500">Brand Identity Report</p>
              <h1 className="mt-3 text-4xl font-black">{projectName}</h1>
              <p className="mt-4 text-lg font-bold leading-8 text-slate-700">
                تقرير هوية بصرية جاهز للمصمم، صادر من المنصة بتاريخ 22 يوليو 2026.
              </p>
            </div>

            <section className="mt-8 grid grid-cols-2 gap-6">
              <ReportCard title="تعريف المشروع">
                <ReportLine label="المشروع" value={projectName} />
                <ReportLine label="القطاع" value={sectorLabel} />
                <ReportLine label="السوق" value={countryLabel} />
                <ReportLine label="العميل المستهدف" value={customerType} />
                <ReportLine label="الفرصة" value={opportunityTitle} />
              </ReportCard>
              <ReportCard title="الهدف من الهوية">
                <p className="text-base font-bold leading-8 text-slate-700">{opportunitySummary}</p>
              </ReportCard>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-black">الاختيارات المعتمدة</h2>
              <div className="mt-4 grid grid-cols-2 gap-5">
                <ReportMiniCard title="نوع المشروع" value={selectedProjectType.title} description={selectedProjectType.description} />
                <ReportMiniCard title="شخصية العلامة" value={selectedPersonality.title} description={selectedPersonality.description} />
                <ReportMiniCard title="نظام الألوان" value={selectedColorSystem.title} description={selectedColorSystem.description} />
                <ReportMiniCard title="الخطوط" value={selectedTypography.title} description={selectedTypography.description} />
                <ReportMiniCard title="اتجاه الشعار" value={selectedLogoDirection.title} description={selectedLogoDirection.description} />
                <ReportMiniCard title="أسلوب الصور" value={selectedImageryStyle.title} description={selectedImageryStyle.description} />
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-black">لوحة الألوان المعتمدة</h2>
              <div className="mt-4 flex gap-3">
                {(selectedColorSystem.swatches ?? []).map((swatch) => (
                  <div key={swatch} className="h-20 flex-1 rounded-2xl border border-slate-200" style={{ backgroundColor: swatch }} />
                ))}
              </div>
              <p className="mt-4 text-base font-bold leading-8 text-slate-700">{selectedColorSystem.hint}</p>
            </section>

            <section className="mt-8 grid grid-cols-2 gap-6">
              <ReportCard title="الوصف النهائي للهوية">
                <p className="text-base font-bold leading-8 text-slate-700">{finalSummary.brandStatement}</p>
              </ReportCard>
              <ReportCard title="ما يجب على المصمم تسليمه">
                <ul className="space-y-2">
                  {finalSummary.designerBrief.map((item) => (
                    <li key={item} className="text-base font-bold leading-8 text-slate-700">
                      • {item}
                    </li>
                  ))}
                </ul>
              </ReportCard>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-black">ملاحظات تنفيذية</h2>
              <div className="mt-4 rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                <ul className="space-y-2">
                  <li className="text-base font-bold leading-8 text-slate-700">• يجب أن تنجح الهوية أولاً في: {selectedApplicationFocus.title}.</li>
                  <li className="text-base font-bold leading-8 text-slate-700">• يجب أن تبقى عناصر الهوية متسقة بين الموقع والعرض والملف التعريفي.</li>
                  <li className="text-base font-bold leading-8 text-slate-700">• يفضّل تقديم تطبيقات مرئية على غلاف عرض وصفحة تعريفية ومكوّن واجهة أساسي.</li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        {detailsContext ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
            <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-500">
                    {detailsContext.sectionTitle}
                  </span>
                  <h3 className="mt-4 text-2xl font-black text-slate-950">{detailsContext.option.title}</h3>
                  <p className="mt-3 text-sm font-bold leading-8 text-slate-700">{detailsContext.option.description}</p>
                </div>
                <button
                  onClick={() => setDetailsContext(null)}
                  className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-500 transition hover:border-slate-300 hover:text-slate-800"
                >
                  <CircleX size={18} />
                </button>
              </div>

              <div className="mt-6">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">لماذا قد تختاره؟</p>
                <p className="mt-3 text-[14px] font-bold leading-8 text-slate-700">
                  {detailsContext.option.hint || 'هذا الاختيار مناسب عندما تريد قراراً بصرياً واضحاً ومتماسكاً مع هدف المشروع.'}
                </p>
              </div>

              {detailsContext.option.swatches?.length ? (
              <div className="mt-6">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">المعاينة اللونية</p>
                <div className="mt-4 flex gap-3">
                  {(detailsContext.option.swatches ?? []).map((swatch) => (
                    <div key={swatch} className="flex-1">
                      <div className="h-20 rounded-2xl border border-slate-200" style={{ backgroundColor: swatch }} />
                      <p className="mt-2 text-center text-[11px] font-black text-slate-500">{swatch}</p>
                    </div>
                  ))}
                </div>
              </div>
              ) : null}

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-black text-slate-900">الفكرة الأساسية</p>
                  <p className="mt-3 text-[13px] font-bold leading-7 text-slate-700">
                    هذا الاختيار يحدد كيف ستُقرأ العلامة بصرياً منذ أول لحظة، وما إذا كانت ستبدو أوضح، أرقى، أو أكثر حضوراً.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-black text-slate-900">أين سيظهر أثره؟</p>
                  <p className="mt-3 text-[13px] font-bold leading-7 text-slate-700">
                    سيؤثر مباشرة على صفحات الموقع، العروض، المواد التسويقية، وتجربة المستخدم التي يرى من خلالها المشروع.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    if (COLOR_SYSTEMS.some((item) => item.id === detailsContext.option.id)) {
                      setColorSystem(detailsContext.option.id);
                    } else if (PROJECT_TYPES.some((item) => item.id === detailsContext.option.id)) {
                      setProjectType(detailsContext.option.id);
                    } else if (BRAND_PERSONALITIES.some((item) => item.id === detailsContext.option.id)) {
                      setPersonality(detailsContext.option.id);
                    } else if (TYPOGRAPHY_OPTIONS.some((item) => item.id === detailsContext.option.id)) {
                      setTypography(detailsContext.option.id);
                    } else if (LOGO_DIRECTIONS.some((item) => item.id === detailsContext.option.id)) {
                      setLogoDirection(detailsContext.option.id);
                    } else if (IMAGERY_OPTIONS.some((item) => item.id === detailsContext.option.id)) {
                      setImageryStyle(detailsContext.option.id);
                    } else if (APPLICATION_OPTIONS.some((item) => item.id === detailsContext.option.id)) {
                      setApplicationFocus(detailsContext.option.id);
                    }
                    setDetailsContext(null);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-[12px] font-black text-white transition hover:bg-slate-800"
                >
                  اعتماد هذا الاختيار
                  <CheckCircle2 size={14} />
                </button>
                <button
                  onClick={() => setDetailsContext(null)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-[12px] font-black text-slate-700 transition hover:border-slate-300"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const StepSection = ({
  sectionId,
  step,
  title,
  description,
  isOpen,
  onToggle,
  selectedTitle,
  selectedNote,
  children,
}: {
  sectionId: string;
  step: string;
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: (sectionId: string) => void;
  selectedTitle: string;
  selectedNote: string;
  children: React.ReactNode;
}) => (
  <section className="surface-card p-5 sm:p-6 xl:p-8">
    <button
      type="button"
      onClick={() => onToggle(sectionId)}
      className="grid w-full gap-4 text-right xl:grid-cols-[minmax(0,1fr)_280px]"
    >
      <div>
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-500">
          المرحلة {step}
        </span>
        <h2 className="mt-4 text-xl font-black text-slate-950">{title}</h2>
        <p className="mt-2 max-w-3xl text-[13px] font-bold leading-7 text-slate-600">{description}</p>
      </div>
      <div className="flex items-stretch justify-end">
        <div className="ui-card-interactive flex w-full items-center justify-between rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 xl:min-h-[104px]">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">الاختيار الحالي</p>
            <p className="mt-2 text-sm font-black text-slate-900">{selectedTitle}</p>
            <p className="mt-2 text-[12px] font-bold leading-6 text-slate-600">{selectedNote}</p>
          </div>
          <span className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600">
            <ChevronDown className={`transition ${isOpen ? 'rotate-180' : ''}`} size={18} />
          </span>
        </div>
      </div>
    </button>
    {isOpen ? <div className="mt-6">{children}</div> : null}
  </section>
);

const OptionGrid = ({
  options,
  value,
  onChange,
  showSwatches = false,
  showDetailsAction = false,
  onOpenDetails,
  gridClassName = 'sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4',
}: {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  showSwatches?: boolean;
  showDetailsAction?: boolean;
  onOpenDetails?: (id: string) => void;
  gridClassName?: string;
}) => (
  <div className={`grid gap-4 ${gridClassName}`}>
    {options.map((option) => {
      const active = option.id === value;
      return (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          aria-pressed={active}
          className={`ui-card-interactive rounded-[1.5rem] border p-4 text-right transition sm:min-h-[208px] xl:min-h-[220px] ${
            active
              ? 'ui-selected-ring border-slate-900 bg-slate-900 text-white shadow-sm'
              : 'border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-black ${
                active ? 'bg-white/15 text-white' : 'bg-white text-slate-500'
              }`}
            >
              {active ? 'تم الاختيار' : 'اختيار متاح'}
            </span>
            <CheckCircle2 size={16} className={active ? 'text-white' : 'text-slate-300'} />
          </div>
          <h3 className="mt-3 text-[15px] font-black">{option.title}</h3>
          <p className={`mt-2 text-[12px] font-bold leading-6 ${active ? 'text-slate-200' : 'text-slate-600'}`}>
            {option.description}
          </p>
          {!showDetailsAction && option.hint ? (
            <p className={`mt-2 text-[11px] font-bold leading-6 ${active ? 'text-slate-300' : 'text-slate-500'}`}>
              {option.hint}
            </p>
          ) : null}
          {showSwatches && option.swatches ? (
            <div className="mt-4 flex -space-x-2">
              {option.swatches.map((color) => (
                <span
                  key={color}
                  className="h-7 w-7 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          ) : null}
          {showDetailsAction ? (
            <div className="mt-4 flex">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenDetails?.(option.id);
                }}
                className={`rounded-2xl px-4 py-2 text-[12px] font-black transition ${
                  active
                    ? 'bg-white/15 text-white hover:bg-white/20'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                عرض الفكرة
              </button>
            </div>
          ) : null}
        </button>
      );
    })}
  </div>
);

const TopCard = ({
  icon,
  label,
  value,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
}) => (
  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 text-right">
    <div className="flex items-center justify-between gap-4">
      <div className="rounded-2xl bg-white p-3 text-slate-700 shadow-sm">{icon}</div>
      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{label}</span>
    </div>
    <p className="mt-4 line-clamp-2 text-sm font-black text-slate-950">{value}</p>
    <p className="mt-2 text-[12px] font-bold text-slate-500">{note}</p>
  </div>
);

const LiveIdentityBoard = ({
  projectName,
  sectorLabel,
  selectedProjectType,
  selectedPersonality,
  selectedColorSystem,
  selectedTypography,
  selectedLogoDirection,
  selectedApplicationFocus,
}: {
  projectName: string;
  sectorLabel: string;
  selectedProjectType: string;
  selectedPersonality: string;
  selectedColorSystem: SelectOption;
  selectedTypography: string;
  selectedLogoDirection: string;
  selectedApplicationFocus: string;
}) => (
  <aside className="border-t border-slate-200 bg-slate-50 p-5 sm:p-6 xl:border-r xl:border-t-0 xl:p-8">
    <div className="xl:sticky xl:top-8">
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">لوحة الهوية الحية</p>
        <h2 className="mt-3 text-2xl font-black text-slate-950">{projectName}</h2>
        <p className="mt-2 text-[13px] font-bold text-slate-600">{sectorLabel}</p>

        <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">شكل الهوية الحالي</p>
              <p className="mt-3 text-xl font-black">{selectedPersonality}</p>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black">
              {selectedProjectType}
            </span>
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-white px-6 py-8 text-center text-slate-950">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">هوية أولية</p>
            <p className="mt-4 text-3xl font-black tracking-tight">{projectName}</p>
            <p className="mt-2 text-sm font-bold text-slate-500">{selectedLogoDirection}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {(selectedColorSystem.swatches ?? []).map((color) => (
                <span
                  key={color}
                  className="h-10 w-10 rounded-full border-4 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <BoardRow label="الألوان" value={selectedColorSystem.title} />
          <BoardRow label="الخطوط" value={selectedTypography} />
          <BoardRow label="الشعار" value={selectedLogoDirection} />
          <BoardRow label="أولوية التطبيق" value={selectedApplicationFocus} />
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-4">
          <p className="text-sm font-black text-slate-900">كيف تستفيد من هذه اللوحة؟</p>
          <p className="mt-2 text-[13px] font-bold leading-7 text-slate-600">
            كلما غيّرت اختياراً في أي مرحلة، تتحدث هذه اللوحة فوراً لتريك اتجاه الهوية النهائي على الشاشات الكبيرة
            بدون الحاجة إلى النزول حتى الملخص الأخير.
          </p>
        </div>
      </div>
    </div>
  </aside>
);

const BoardRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3">
    <span className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">{label}</span>
    <span className="text-[13px] font-black text-slate-900">{value}</span>
  </div>
);

const SummaryChoice = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">{label}</p>
    <p className="mt-3 text-sm font-black leading-7 text-slate-900">{value}</p>
  </div>
);

const ReportCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-[24px] border border-slate-200 p-6">
    <h3 className="text-xl font-black">{title}</h3>
    <div className="mt-4">{children}</div>
  </div>
);

const ReportMiniCard = ({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) => (
  <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
    <p className="text-sm font-black text-slate-500">{title}</p>
    <p className="mt-2 text-base font-black text-slate-900">{value}</p>
    <p className="mt-3 text-sm font-bold leading-7 text-slate-700">{description}</p>
  </div>
);

const ReportLine = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0">
    <span className="text-sm font-black text-slate-500">{label}</span>
    <span className="text-base font-black text-slate-800">{value}</span>
  </div>
);

