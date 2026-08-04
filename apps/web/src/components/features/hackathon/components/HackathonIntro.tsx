import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Target,
  Zap,
  Cpu,
  TrendingUp,
  Rocket,
  ShieldCheck,
  FileText,
  ChevronRight,
  Sparkles,
  Users,
  Globe,
  Award,
  Check,
  Code,
  Activity,
  Layout,
  Info,
} from 'lucide-react';

interface HackathonIntroProps {
  onStart: () => void;
}

export const HackathonIntro: React.FC<HackathonIntroProps> = ({ onStart }) => {
  const [hasAcceptedPledge, setHasAcceptedPledge] = useState(false);
  const [showPledgeError, setShowPledgeError] = useState(false);

  const steps = [
    { day: 1, title: 'استخبارات السوق', icon: Target, desc: 'التحقق من الألم السوقي وحجم الفرصة الحقيقية.', color: '#3b82f6' },
    { day: 2, title: 'هندسة الحل', icon: Zap, desc: 'بناء القيمة المضافة والميزة التنافسية غير العادلة.', color: '#8b5cf6' },
    { day: 3, title: 'الترسانة التقنية', icon: Cpu, desc: 'تحديد الهيكل التقني ومخطط المنتج الأولي MVP.', color: '#06b6d4' },
    { day: 4, title: 'السيادة المالية', icon: TrendingUp, desc: 'تصميم نموذج الربح والتوقعات المالية لـ 3 سنوات.', color: '#10b981' },
    { day: 5, title: 'الاكتساح التسويقي', icon: Rocket, desc: 'بناء استراتيجية النمو وقنوات الاستحواذ الهجومية.', color: '#f59e0b' },
    { day: 6, title: 'إدارة المخاطر', icon: ShieldCheck, desc: 'تحييد المخاطر ووضع هيكل الحوكمة والجاهزية.', color: '#ef4444' },
    { day: 7, title: 'العرض النهائي', icon: FileText, desc: 'تجهيز ملف الاستثمار والوقوف أمام لجنة التحكيم.', color: '#1e293b' },
  ];

  const highlights = [
    { icon: Trophy, title: 'تكريم وتميّز', desc: 'إبراز أفضل الفرق ومنحها فرص عرض أوسع وربطها بمسارات دعم وتوجيه.' },
    { icon: Users, title: 'مجتمع النخبة', desc: 'تواصل مع أفضل العقول والمؤسسين في المنطقة.' },
    { icon: Globe, title: 'وصول عالمي', desc: 'عرض مشروعك على مستثمرين دوليين وصناديق جريئة.' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-tajawal overflow-x-hidden" dir="rtl">
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-black mb-8">
              <Sparkles size={16} />
              <span>أكبر هاكثون استثماري في المنطقة</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
              حوّل فكرتك إلى <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-blue-600">كيان استثماري سيادي</span>
            </h1>

            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
              انضم إلى رحلة مكثفة لمدة 7 أيام، نصمم خلالها مستقبلك التجاري عبر أدوات استخباراتية استراتيجية وجلسات تنفيذية قاسية للوصول إلى الجاهزية الاستثمارية الكاملة.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={onStart}
                className="px-12 py-5 bg-slate-900 text-white rounded-2xl text-lg font-black shadow-2xl shadow-slate-400/40 hover:scale-105 transition-all flex items-center gap-3 group"
              >
                ابدأ رحلة التنفيذ
                <ChevronRight size={20} className="group-hover:-translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-4 text-slate-400">
                <div className="flex -space-x-3 space-x-reverse">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://api.dicebear.com/9.x/adventurer/svg?seed=user-${i}`}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-white bg-slate-100"
                    />
                  ))}
                </div>
                <span className="text-sm font-bold">+1,200 مشترك حالياً</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">رحلة الـ 7 أيام</h2>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
              خارطة طريق دقيقة مصممة لتحويل الأفكار الخام إلى مشاريع قابلة للتمويل والنمو السريع.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-slate-100 border border-white transition-all group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: step.color, color: 'white' }}
                  >
                    <step.icon size={28} />
                  </div>

                  <div className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    اليوم {step.day}
                  </div>
                  <h4 className="text-lg font-black mb-3">{step.title}</h4>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {step.desc}
                  </p>

                  <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-slate-200 rounded-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <Award size={64} className="text-indigo-400 mx-auto mb-8" />
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8">هل أنت مستعد للتحدي؟</h2>
              <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto mb-12">
                الآلاف من رواد الأعمال بدأوا من هنا. رحلتك نحو القمة تبدأ بالتزام حقيقي.
              </p>

              <div className="max-w-xl mx-auto mb-12 bg-white/5 border border-white/10 rounded-3xl p-8 text-right backdrop-blur-md">
                <h4 className="text-white font-black mb-4 flex items-center gap-2">
                  <ShieldCheck size={20} className="text-indigo-400" /> ميثاق الالتزام (Founder&apos;s Pledge)
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                  أتعهد بصفتي مؤسساً بالالتزام الكامل بالجدول الزمني للهاكثون، والبحث عن الحقيقة السوقية بصدق، وتنفيذ المهام بمعايير احترافية عالية، مع إدراكي أن الفكرة بلا تنفيذ هي مجرد وهم.
                </p>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    id="commitment-check"
                    checked={hasAcceptedPledge}
                    onChange={(event) => {
                      setHasAcceptedPledge(event.target.checked);
                      if (event.target.checked) setShowPledgeError(false);
                    }}
                    className="w-6 h-6 rounded-lg bg-white/10 border-white/20 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-white text-sm font-bold group-hover:text-indigo-300 transition-colors">أوافق على ميثاق الالتزام وأتعهد بالتنفيذ</span>
                </label>
              </div>

              <button
                onClick={() => {
                  if (hasAcceptedPledge) {
                    onStart();
                  } else {
                    setShowPledgeError(true);
                  }
                }}
                className="px-16 py-6 bg-white text-slate-900 rounded-2xl text-xl font-black shadow-2xl hover:bg-indigo-50 hover:scale-105 transition-all active:scale-95"
              >
                ابدأ الهاكثون الآن
              </button>
              {showPledgeError ? (
                <p className="text-sm font-bold text-rose-200">
                  يرجى الموافقة على ميثاق الالتزام قبل البدء.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm font-bold">
            © 2026 START INVESTOR HACKATHON. جميع الحقوق محفوظة لخلية الاستخبارات الاستثمارية.
          </p>
        </div>
      </footer>
    </div>
  );
};
