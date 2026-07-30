"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ChevronDown, 
  Bot, 
  LayoutGrid, 
  Palette, 
  Lightbulb, 
  Building2, 
  ShoppingCart, 
  Coffee, 
  TrendingDown,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const FeaturesMegaMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mega Menu Trigger Link */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer select-none outline-none",
          isOpen ? "text-primary font-bold" : "text-slate-600 hover:text-slate-900"
        )}
      >
        <span>المميزات والحلول</span>
        <ChevronDown className={cn("size-4 text-slate-400 transition-transform duration-200", isOpen && "rotate-180 text-primary")} />
      </button>

      {/* Mega Menu Dropdown Panel */}
      {isOpen && (
        <div 
          className="absolute right-0 top-full pt-2 w-[780px] z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          dir="rtl"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-2xl shadow-slate-900/10 p-6 grid grid-cols-12 gap-6 ring-1 ring-slate-900/5">
            
            {/* Column 1: Featured Card (Hero / Spotlight) */}
            <div className="col-span-4 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-xl p-5 text-white flex flex-col justify-between relative overflow-hidden group border border-slate-800 shadow-md">
              <div className="absolute -left-10 -bottom-10 size-36 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-3 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-primary-foreground text-[11px] font-bold border border-white/10 backdrop-blur-xs">
                  <Sparkles className="size-3.5 text-amber-400" />
                  ذكاء اصطناعي فائق
                </div>
                
                <h3 className="text-lg font-black tracking-tight leading-snug">
                  منصة خطة المتكاملة لدراسات الجدوى
                </h3>
                
                <p className="text-slate-300 text-xs leading-relaxed font-normal">
                  حول فكرة مشروعك إلى دراسة جدوى مالية وتسويقية احترافية مع خطة تنفيذ ونموذج عمل متكامل خلال دقائق.
                </p>
              </div>

              <div className="pt-6 relative z-10">
                <Link
                  href="/features"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-between w-full text-xs font-bold text-white bg-primary hover:bg-primary/90 px-3.5 py-2.5 rounded-lg transition-all shadow-sm group-hover:gap-2"
                >
                  <span>استكشف كافة الحلول</span>
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Column 2: Core Tools & AI Features */}
            <div className="col-span-4 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-2">
                الأدوات والاستوديوهات
              </span>

              <div className="space-y-1">
                <Link
                  href="/features#ai-generator"
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <Bot className="size-4.5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      مولد دراسات الجدوى بالذكاء الاصطناعي
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight line-clamp-2">
                      تحليل الأسواق، التكاليف، والإيرادات المتوقعة تلقائياً.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/features#bmc-studio"
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                    <LayoutGrid className="size-4.5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      استوديو نموذج العمل التجاري
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight line-clamp-2">
                      تخطيط وبناء نماذج BMC التفاعلية بطريقة بصرية.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/features#brand-studio"
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0">
                    <Palette className="size-4.5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                      استوديو الهوية التجارية
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight line-clamp-2">
                      ابتكار الأسماء، الشعارات الهوية البصرية المتناسقة.
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Column 3: Business Sectors & Ideas Databases */}
            <div className="col-span-4 space-y-3 border-r border-slate-100 pr-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-2">
                قواعد البيانات والقطاعات
              </span>

              <div className="space-y-1">
                <Link
                  href="/features#saas-gallery"
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
                    <Lightbulb className="size-4.5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      أفكار شركات SaaS و Micro-SaaS
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight line-clamp-2">
                      قواعد بيانات تفاعلية لمشاريع تقنية ناجحة ومحللة.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/features#post-mortem"
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                    <TrendingDown className="size-4.5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      شركات فشلت (دروس مستفادة)
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight line-clamp-2">
                      تحليل أسباب الفشل لتجنب الأخطاء الجسيمة والمكلفة.
                    </p>
                  </div>
                </Link>

                <div className="pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="size-3.5 text-slate-500" />
                      قطاعات الأعمال
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span title="التجارة الإلكترونية"><ShoppingCart className="size-3.5 text-slate-400" /></span>
                      <span title="المطاعم والمقاهي"><Coffee className="size-3.5 text-slate-400" /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
