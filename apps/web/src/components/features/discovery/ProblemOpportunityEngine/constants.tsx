import React from 'react';
import { 
  Building2, 
  Users, 
  Landmark, 
  Sprout, 
  Globe
} from 'lucide-react';
import { DATA } from './data/sectors/index';

export const B2X_MODELS = [
  {
    id: 'B2B',
    title: 'الأعمال والشركات (B2B)',
    subtitle: 'Business to Business',
    desc: 'نماذج تستهدف حل مشاكل الشركات، المنشآت، والمؤسسات. تتميز بالولاء العالي والعقود السنوية المجزية والمستقرة.',
    color: 'indigo',
    icon: Building2,
    traits: ['قيمة العقد عالية (ACV)', 'نسبة ترك منخفضة (Churn)', 'مبيعات تعتمد على العائد (ROI)']
  },
  {
    id: 'B2C',
    title: 'الأفراد والمستهلكين (B2C)',
    subtitle: 'Business to Consumer',
    desc: 'مشاريع تستهدف الجمهور العريض لتسهيل حياتهم اليومية. تتميز بالنمو الفيروسي والوصول لشرائح سكانية ضخمة.',
    color: 'rose',
    icon: Users,
    traits: ['نمو فيروسي سريع', 'قاعدة عملاء ضخمة بالملايين', 'قرارات مبنية على سرعة الحل']
  },
  {
    id: 'B2G',
    title: 'القطاع العام والحكومي (B2G)',
    subtitle: 'Business to Government',
    desc: 'حلول تستهدف الوزارات والهيئات الوطنية لمعالجة تحديات استراتيجية وتطوير البنية التحتية والرفاهية المجتمعية.',
    color: 'emerald',
    icon: Landmark,
    traits: ['عقود استراتيجية مليونية', 'عوائق دخول للمنافسين (Moat)', 'شراكة سيادية طويلة الأمد']
  },
  {
    id: 'B2B2C',
    title: 'الوساطة الذكية (B2B2C)',
    subtitle: 'Business to Business to Consumer',
    desc: 'نماذج توفر حلولاً للشركات لتصل بدورها للمستهلك النهائي بشكل أفضل. يجمع بين استقرار العقود المؤسسية وضخامة السوق الاستهلاكي.',
    color: 'sky',
    icon: Building2,
    traits: ['توسع أفقي سريع', 'امتلاك بيانات المستهلك النهائي', 'شراكات تشغيلية قوية']
  }
];

export const BUDGET_TIERS = [
  {
    id: 'low',
    title: 'منخفضة التكلفة (Bootstrap)',
    subtitle: 'أقل من 50,000$',
    desc: 'مشاريع تقنية وخدمية يمكن البدء بها بميزانية محدودة، تعتمد على الجهد الذاتي والنمو التدريجي السريع.',
    color: 'emerald',
    icon: Sprout,
    features: ['مخاطرة مالية منخفضة', 'سرعة الانطلاق للسوق (Go-to-Market)']
  },
  {
    id: 'medium',
    title: 'فرص متوسطة (SME)',
    subtitle: '50,000$ - 500,000$',
    desc: 'مشاريع تتطلب فريق متخصص، تجهيزات تقنية أو تشغيلية متوسطة، وحملات تسويقية منظمة.',
    color: 'amber',
    icon: Building2,
    features: ['عوائد مستقرة ومجزية', 'نماذج أعمال مجربة']
  },
  {
    id: 'high',
    title: 'مشاريع ضخمة (Enterprise)',
    subtitle: 'أكثر من 500,000$',
    desc: 'استثمارات رأسمالية كبيرة لبناء بنية تحتية، تقنيات عميقة (Deep Tech)، أو منصات وطنية تتطلب سيولة.',
    color: 'rose',
    icon: Globe,
    features: ['تأثير واسع النطاق', 'عوائق دخول عالية (Moat)']
  }
];

export const CONTINENTS = [
  { id: 'middle_east', name: 'الشرق الأوسط والخليج', countries: ['SA', 'AE', 'QA', 'KW', 'BH', 'OM', 'JO', 'LB', 'IQ'] },
  { id: 'africa', name: 'أفريقيا المتنامية', countries: ['EG', 'MA', 'DZ', 'TN'] },
  { id: 'europe', name: 'السوق الأوروبية', countries: ['GB', 'FR', 'DE', 'TR', 'CH'] },
  { id: 'america', name: 'الأمريكتان', countries: ['US', 'CA', 'BR'] },
  { id: 'asia', name: 'آسيا والمحيط الهادئ', countries: ['CN', 'JP', 'KR', 'IN', 'AU', 'SG'] }
];

export const COUNTRIES = [
  { id: 'ALL', name: 'عالمي', flag: <Globe className="w-4 h-4 text-indigo-500" /> },
  { id: 'SA', name: 'السعودية', flag: '🇸🇦' },
  { id: 'AE', name: 'الإمارات', flag: '🇦🇪' },
  { id: 'QA', name: 'قطر', flag: '🇶🇦' },
  { id: 'KW', name: 'الكويت', flag: '🇰🇼' },
  { id: 'BH', name: 'البحرين', flag: '🇧🇭' },
  { id: 'OM', name: 'عُمان', flag: '🇴🇲' },
  { id: 'EG', name: 'مصر', flag: '🇪🇬' },
  { id: 'JO', name: 'الأردن', flag: '🇯🇴' },
  { id: 'MA', name: 'المغرب', flag: '🇲🇦' },
  { id: 'DZ', name: 'الجزائر', flag: '🇩🇿' },
  { id: 'TN', name: 'تونس', flag: '🇹🇳' },
  { id: 'LB', name: 'لبنان', flag: '🇱🇧' },
  { id: 'IQ', name: 'العراق', flag: '🇮🇶' },
  { id: 'US', name: 'الولايات المتحدة', flag: '🇺🇸' },
  { id: 'GB', name: 'المملكة المتحدة', flag: '🇬🇧' },
  { id: 'FR', name: 'فرنسا', flag: '🇫🇷' },
  { id: 'DE', name: 'ألمانيا', flag: '🇩🇪' },
  { id: 'TR', name: 'تركيا', flag: '🇹🇷' },
  { id: 'CN', name: 'الصين', flag: '🇨🇳' },
  { id: 'JP', name: 'اليابان', flag: '🇯🇵' },
  { id: 'KR', name: 'كوريا الجنوبية', flag: '🇰🇷' },
  { id: 'IN', name: 'الهند', flag: '🇮🇳' },
  { id: 'CA', name: 'كندا', flag: '🇨🇦' },
  { id: 'AU', name: 'أستراليا', flag: '🇦🇺' },
  { id: 'CH', name: 'سويسرا', flag: '🇨🇭' },
  { id: 'SG', name: 'سنغافورة', flag: '🇸🇬' },
];

export { DATA };
