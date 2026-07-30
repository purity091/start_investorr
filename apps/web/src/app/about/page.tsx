import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Badge } from '@/components/ui/Badge';
import { Heart, Target, Lightbulb, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <Badge variant="outline" className="mb-6 text-primary border-primary/30 bg-primary/5">من نحن</Badge>
        <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight">نعيد صياغة مفهوم <span className="text-primary">دراسات الجدوى</span> في العالم العربي</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none prose-lg">
          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            في "خطة"، نؤمن بأن كل فكرة عظيمة تستحق فرصة حقيقية للنجاح. لقد بنينا هذه المنصة لتكون الجيل الجديد من دراسات الجدوى، حيث تندمج خبرات الأعمال مع قوة الذكاء الاصطناعي لتقديم خطط تنفيذية واقعية، سريعة، وقابلة للاستثمار.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16 not-prose">
            <div className="bg-muted/30 p-8 rounded-2xl border border-border/50">
              <Target className="size-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">مهمتنا</h3>
              <p className="text-muted-foreground leading-relaxed">تمكين رواد الأعمال وأصحاب المشاريع من اتخاذ قرارات مبنية على بيانات دقيقة وخطط عمل محكمة، دون الحاجة لانتظار أسابيع أو دفع مبالغ طائلة لشركات الاستشارات التقليدية.</p>
            </div>
            <div className="bg-muted/30 p-8 rounded-2xl border border-border/50">
              <Lightbulb className="size-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">رؤيتنا</h3>
              <p className="text-muted-foreground leading-relaxed">أن نصبح المرجعية الأولى لبناء المشاريع وتأسيس الشركات في الشرق الأوسط، والمساهم الأكبر في تقليل نسبة فشل المشاريع الناشئة.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">قيمنا الأساسية</h2>
          <div className="grid sm:grid-cols-2 gap-6 not-prose mb-12">
            {[
              { icon: Heart, title: 'الشغف بريادة الأعمال', desc: 'نحن رواد أعمال نبني لرواد الأعمال.' },
              { icon: Users, title: 'التركيز على المستخدم', desc: 'كل ميزة في المنصة مصممة لتوفير وقتك وجهدك.' },
              { icon: Target, title: 'الواقعية والدقة', desc: 'لا نعتمد على قوالب نظرية، بل منهجيات عملية مثل Lean.' },
              { icon: Lightbulb, title: 'الابتكار المستمر', desc: 'نطور أدواتنا يومياً لتواكب أحدث تقنيات الذكاء الاصطناعي.' }
            ].map((v, i) => (
              <div key={i} className="flex gap-4">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <v.icon className="size-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{v.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
