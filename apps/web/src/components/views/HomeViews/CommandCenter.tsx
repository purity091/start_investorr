import React, { useState, useEffect } from 'react';
import { Terminal, Activity, Radio, Search, ShieldAlert, Cpu } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   SOVEREIGN COMMAND CENTER — "Live Intel Simulation"
   ═══════════════════════════════════════════════════════════════ */

const LOG_MESSAGES = [
  "المحرك: جاري مسح قطاع اللوجستيات في دبي...",
  "اكتشاف: فجوة في سلسلة توريد المعادن النادرة.",
  "تحليل: نسبة العائد المتوقعة تتجاوز 24%.",
  "تنبيه: تحول استراتيجي في السياسات التجارية الآسيوية.",
  "مواءمة: ربط الفرصة الحالية بملف المستثمر رقم 702.",
  "المحرك: معالجة بيانات الاستهلاك الفوري في الرياض...",
  "اكتشاف: نقص في مراكز البيانات ذات السيادة.",
  "تحديث: تحسن مؤشر الأمان الاستثماري في شمال أفريقيا.",
];

export const CommandCenter = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [scanIndex, setScanIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const nextMsg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
        const newLogs = [nextMsg, ...prev].slice(0, 5);
        return newLogs;
      });
      setScanIndex(prev => (prev + 1) % 360);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-[100px] px-6 sm:px-10 lg:px-14 bg-white relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Standard Section Heading */}
        <div className="space-y-4 mb-16 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-800 shadow-xl">
             <Radio size={14} className="animate-pulse text-indigo-400" /> مركز السيطرة الاستخباراتية
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
             مختبر رصد الفجوات الحي
          </h2>
          <p className="text-slate-400 font-bold text-sm sm:text-base max-w-2xl leading-relaxed">
             شاهد "عقل" المنصة وهو يحلل مليارات البيانات في الوقت الفعلي لاقتناص الفرص الكبرى قبل تحولها لتيار عام.
          </p>
        </div>

        {/* ── Command Console ────────────────────────────────────────────────── */}
        <div className="relative group">
          {/* Outer Glow Decoration */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-500 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-12 bg-slate-950 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
            
            {/* 1. Terminal Analytics Panel (Left/Top) */}
            <div className="lg:col-span-4 p-8 border-b lg:border-b-0 lg:border-l border-white/10 bg-slate-950/50 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">LIVE_INTEL_SYSTEM</span>
                </div>
                <Terminal size={14} className="text-white/20" />
              </div>

              <div className="space-y-4 font-mono">
                {logs.length === 0 ? (
                    <p className="text-indigo-400/40 text-[11px] italic">جاري تهيئة النظام اللاسلكي...</p>
                ) : logs.map((log, i) => (
                  <div key={i} className="flex items-start gap-3 animate-in slide-in-from-right-4 fade-in duration-500">
                    <span className="text-emerald-500/60 text-[10px]">&gt;</span>
                    <p className="text-white/80 text-[11px] font-bold leading-relaxed">{log}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
                 <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-black text-indigo-400 uppercase">قوة المعالجة</span>
                    <span className="text-[9px] font-black text-indigo-400">92%</span>
                 </div>
                 <div className="h-1.5 w-full bg-indigo-950 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[92%] animate-pulse" />
                 </div>
              </div>
            </div>

            {/* 2. Visual Radar Area (Right/Bottom) */}
            <div className="lg:col-span-8 p-12 relative flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950">
              
              {/* Radar Circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] border border-indigo-500/30 rounded-full" />
                <div className="w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] border border-indigo-500/20 rounded-full" />
                <div className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] border border-indigo-500/10 rounded-full" />
                
                {/* Scanning Line */}
                <div 
                  className="absolute w-[250px] sm:w-[300px] h-[2px] bg-gradient-to-r from-transparent to-indigo-500 origin-left"
                  style={{ transform: `rotate(${scanIndex}deg)` }}
                />
              </div>

              {/* Central Visual */}
              <div className="relative z-10 text-center space-y-8">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-indigo-600/10 rounded-full border border-indigo-500/30 flex items-center justify-center animate-pulse">
                    <Cpu size={48} className="text-indigo-400" />
                  </div>
                  <div className="absolute -inset-4 bg-indigo-500/10 blur-2xl rounded-full animate-ping" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.3em]">GLOBAL_MARKET_SCAN</p>
                  <h4 className="text-white text-xl sm:text-2xl font-black">جاري مواءمة الفرص السيادية...</h4>
                </div>

                {/* Technical Stats Overlay */}
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div className="text-right">
                    <p className="text-[8px] font-black text-slate-500 uppercase mb-1">إجمالي الفجوات المرصودة</p>
                    <p className="text-2xl font-black text-white italic">14,204</p>
                  </div>
                  <div className="text-right border-r border-white/10 pr-8">
                    <p className="text-[8px] font-black text-slate-500 uppercase mb-1">دقة المحاكاة</p>
                    <p className="text-2xl font-black text-emerald-400 italic">99.8%</p>
                  </div>
                </div>
              </div>

              {/* Scanning Dots (Static Decorative) */}
              <div className="absolute top-[20%] right-[30%] w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
              <div className="absolute bottom-[30%] left-[25%] w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping [animation-delay:0.5s]" />
              <div className="absolute top-[40%] left-[20%] w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>

          </div>
        </div>

        {/* Console Legend/Footer */}
        <div className="mt-8 flex justify-center">
          <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-6">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-[10px] font-black text-slate-900">سيرفرات الرياض [نشطة]</span>
             </div>
             <div className="w-px h-4 bg-slate-200" />
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                <span className="text-[10px] font-black text-slate-900">سيرفرات دبي [نشطة]</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
