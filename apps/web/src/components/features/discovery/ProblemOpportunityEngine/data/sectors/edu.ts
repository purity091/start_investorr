import { GraduationCap } from 'lucide-react';
import { Sector } from '../../types';

export const eduData: Sector = {
  id: 'edu', 
  icon: GraduationCap, 
  name: 'التعليم والتدريب', 
  count: 3100, 
  color: 'blue',
  subs: [
    {
      id: 'k12_support', 
      name: 'التعليم الأساسي والمعزز', 
      count: 156, 
      problems: [
        {
          id: 'edu1', 
          title: 'الاستنزاف الإداري للمعلمين (Teacher Burnout)', 
          desc: 'المعلمون يقضون 60% من وقتهم في المهام الإدارية وتصحيح الواجبات بدلاً من التدريس الفعلي، مما يقلل من جودة مخرجات التعليم.', 
          pain: 8, 
          money: 7, 
          freq: 10, 
          gap: 8,
          budget: 'medium', 
          b2x: 'B2B',
          countries: ['SA', 'AE', 'US', 'GB'],
          opps: [
            { type: 'AI Assistant', name: 'Zaki Class', model: 'SaaS للمدارس - أتمتة التصحيح والتقارير' },
            { type: 'Admin Tool', name: 'AutoGrade', model: 'اشتراك شهري للمعلمين' }
          ]
        }
      ]
    },
    {
      id: 'professional_skills', 
      name: 'التدريب المهني وسد الفجوات', 
      count: 242, 
      problems: [
        {
          id: 'edu5', 
          title: 'فجوة المهارات المتسارعة في عصر الذكاء الاصطناعي', 
          desc: 'المناهج الجامعية الحالية تصبح فاقدة للقيمة خلال سنتين فقط بسبب تسارع تقنيات الـ AI، مما يترك الخريجين دون مهارات سوق العمل الفعلية.', 
          pain: 9, 
          money: 10, 
          freq: 10, 
          gap: 9,
          budget: 'low', 
          b2x: 'B2C',
          countries: ['ALL', 'US', 'IN', 'SA', 'EG'],
          opps: [{ type: 'Micro-Learning', name: 'PromptUni', model: 'معسكرات تدريب مكثفة (Bootcamps) بنظام ISA (الدفع بعد التوظيف)' }]
        },
        {
          id: 'edu10', 
          title: 'ارتفاع نسبة التسرب من الدورات التدريبية عبر الإنترنت', 
          desc: 'أكثر من 90% من المسجلين في الدورات الذاتية لا يكملونها بسبب غياب التحفيز والتفاعل الحقيقي في منصات الفيديو التقليدية.', 
          pain: 7, 
          money: 8, 
          freq: 10, 
          gap: 7,
          budget: 'medium', 
          b2x: 'B2B2C',
          countries: ['EG', 'MA', 'SA', 'US'],
          opps: [{ type: 'Gamified EdTech', name: 'QuestLearn', model: 'تحويل التعلم إلى ألعاب تفاعلية بنظام المكافآت' }]
        }
      ]
    }
  ]
};
