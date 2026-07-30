
import { PlanSection, BusinessModelItem, Comment, User } from '../types';

export const MOCK_USER: User = {
  name: 'عبدالله محمد',
  email: 'abdullah@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abdullah',
  credits: 85,
  totalCredits: 100,
};

export const INITIAL_SECTIONS: PlanSection[] = [
  { id: '1', title: 'الملخص التنفيذي', content: '', isCompleted: true, lastEdited: 'منذ يومين', aiScore: 85, humanScore: 90, progress: 100 },
  { id: '2', title: 'تحليل السوق والمنافسين', content: '', isCompleted: false, lastEdited: 'أمس', aiScore: 45, humanScore: 0, progress: 20 },
  { id: '3', title: 'نموذج العمل التجاري', content: '', isCompleted: false, progress: 60, aiScore: 72, humanScore: 0 },
  { id: '4', title: 'خطة التسويق والمبيعات', content: '', isCompleted: false, progress: 30, aiScore: 64, humanScore: 0 },
  { id: '5', title: 'الهيكل التنظيمي والإداري', content: '', isCompleted: true, lastEdited: 'منذ أسبوع', aiScore: 92, humanScore: 95, progress: 100 },
  { id: '6', title: 'التوقعات المالية', content: '', isCompleted: false, progress: 10, aiScore: 50, humanScore: 0 },
];

export const CANVAS_ITEMS: BusinessModelItem[] = [
  { id: 'c1', category: 'users', title: 'شرائح العملاء', content: 'الشركات الصغيرة والمتوسطة، رواد الأعمال' },
  { id: 'c2', category: 'partners', title: 'الشركاء الرئيسيون', content: 'البنوك المحلية، مزودو خدمات الكلاود' },
  { id: 'c3', category: 'value', title: 'القيمة المضافة', content: 'سهولة الاستخدام، رسوم منخفضة' },
  { id: 'c4', category: 'cost', title: 'هيكل التكاليف', content: '' },
  { id: 'c5', category: 'revenue', title: 'مصادر الإيرادات', content: 'اشتراكات شهرية، عمولة العمليات' },
];

export const INITIAL_COMMENTS: Comment[] = [
  { id: '1', user: 'سارة أحمد', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara', text: 'أعتقد أننا بحاجة لتفصيل أكثر في قسم تحليل السوق وتحديد المنافسين المباشرين.', timestamp: 'منذ 2 ساعة' }
];

export const ADMIN_TABS = ['admin-dashboard', 'users-management', 'admin-plans', 'admin-analytics', 'admin-security'];
