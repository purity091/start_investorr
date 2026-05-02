import React, { useRef, useState } from 'react';
import { BookOpen, MapPin, ArrowLeft, ArrowRight, Quote } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   INTELLIGENCE STORIES — "High-Impact Success Carousel"
   ═══════════════════════════════════════════════════════════════ */

const STORIES = [
  {
    id: 1,
    title: "من 40 مليار دولار إلى 237 مليار دولار: انفجار قيمة النظام البيئي في سيول",
    location: "سيول، كوريا الجنوبية",
    desc: "أصبحت سيول مركزاً عالمياً للشركات الناشئة في غضون أربع سنوات فقط، مدفوعة بالاستثمارات الجريئة وصنع السياسات المستندة للبيانات.",
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2070&auto=format&fit=crop",
    tag: "نمو استراتيجي"
  },
  {
    id: 2,
    title: "الثورة القائمة على البيانات وراء النظام البيئي في طوكيو البالغ 66 مليار دولار",
    location: "طوكيو، اليابان",
    desc: "تتشكل استراتيجية الشركات الناشئة في طوكيو والسياسة الوطنية من خلال رؤى مستندة إلى البيانات ومعايير عالمية دقيقة.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2094&auto=format&fit=crop",
    tag: "سياسات تقنية"
  },
  {
    id: 3,
    title: "الارتقاء بأبوظبي من خلال البيانات والسياسات والشراكات الدولية المسؤولة",
    location: "أبوظبي، الإمارات العربية المتحدة",
    desc: "تشمل تدخلات برنامج أبوظبي إطلاق مبادرات توسع معترف بها عالمياً في مراحل متأخرة، مما ضاعف قيمة النظام البيئي.",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2070&auto=format&fit=crop",
    tag: "قيادة إقليمية"
  },
  {
    id: 4,
    title: "تحول الاقتصاد الألماني: كيف نمت التكنولوجيا العميقة بمقدار 3 أضعاف",
    location: "برلين، ألمانيا",
    desc: "لقد تحولت ولاية شمال الراين وستفاليا من خلال التركيز القائم على البيانات على توسيع نطاق الدعم ونمو التكنولوجيا المتقدمة.",
    image: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?q=80&w=2059&auto=format&fit=crop",
    tag: "تكنولوجيا عميقة"
  }
];

export const IntelligenceStories = () => {
  return (
    <section className="py-10 sm:py-14 px-5 sm:px-10 lg:px-14 bg-white border-b border-slate-100 overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-4 mb-10 border-b border-slate-50 pb-6">
          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-indigo-100 shadow-sm">
               <BookOpen size={12} /> قصص التحول العالمي
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">
               الهندسة العكسية للنجاح
            </h2>
            <p className="text-slate-400 font-bold text-[12px] sm:text-sm max-w-2xl">
               حلل المسارات الاستراتيجية التي حولت مدنًا وقطاعات كاملة إلى قوى اقتصادية بمليارات الدولارات.
            </p>
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STORIES.map((story) => (
            <div 
              key={story.id} 
              className="group"
            >
              <div className="relative h-[340px] rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-50">
                {/* Background Image */}
                <img 
                   src={story.image} 
                   alt={story.title}
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-right">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                       <span className="px-2 py-0.5 bg-indigo-600 text-white rounded text-[8px] font-black uppercase tracking-widest">
                          {story.tag}
                       </span>
                       <div className="flex items-center gap-1 text-white/70 text-[9px] font-black">
                          <MapPin size={10} className="text-indigo-400" />
                          {story.location}
                       </div>
                    </div>
                    
                    <h3 className="text-base font-black text-white leading-tight group-hover:text-indigo-300 transition-colors line-clamp-2">
                      {story.title}
                    </h3>
                    
                    <p className="text-white/60 text-[10px] font-bold leading-relaxed line-clamp-2 pt-2 border-t border-white/10">
                      {story.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
