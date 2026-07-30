import React, { useState, useEffect } from 'react';
import { Network, Search, Zap, Crosshair, ChevronLeft, Shield } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   HERO BANNER — "Cinematic Intelligence Hub"
   ═══════════════════════════════════════════════════════════════ */

export const HeroBanner = () => {
  const tickerData = [
    { flag: '🇸🇦', label: 'الرعاية الصحية الرقمية', value: '$2.4B', trend: '+18%' },
    { flag: '🇦🇪', label: 'التجارة الإلكترونية B2B', value: '$1.8B', trend: '+24%' },
    { flag: '🇪🇬', label: 'التكنولوجيا المالية', value: '$950M', trend: '+32%' },
    { flag: '🇶🇦', label: 'الخدمات اللوجستية', value: '$1.2B', trend: '+15%' },
    { flag: '🇰🇼', label: 'تطبيقات التوصيل', value: '$680M', trend: '+21%' },
    { flag: '🌍', label: 'الذكاء الاصطناعي', value: '$4.1B', trend: '+45%' },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-slate-900 border-b border-indigo-500/20" dir="rtl">
      
      {/* ── Background Overlays ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[60%] bg-indigo-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[50%] bg-blue-600/5 blur-[80px] rounded-full" />
      </div>

      {/* ── Main Content Area ── */}
      <div className="relative z-10 py-6 sm:py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            
            {/* Left Column: Info */}
            <div className="flex-1 text-right space-y-4 lg:space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-[9px] font-black text-indigo-400 uppercase tracking-widest">
                <Shield size={10} /> نظام الاستخبارات النشط
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.2] tracking-tight">
                مركز القيادة <span className="text-indigo-500">الاستخباراتية</span> الاستثمارية
              </h1>
              
              <p className="text-[13px] sm:text-sm lg:text-base font-bold text-slate-400/90 max-w-xl leading-relaxed">
                منصة سيادية لاستكشاف الفجوات العالمية وبناء قرارات استثمارية دقيقة باستخدام محركات الذكاء الاصطناعي الأكثر تقدماً.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button 
                  onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
                  className="w-full sm:w-auto px-7 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-[12px] transition-all duration-300 shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 group border border-indigo-400/30"
                >
                  <Zap size={16} className="fill-white/20" />
                  <span>ابدأ الرحلة الاستكشافية</span>
                  <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                
                <div className="hidden sm:flex items-center gap-5 border-r border-slate-800 pr-5 h-10">
                  <div className="text-right">
                    <div className="text-xs font-black text-white">14</div>
                    <div className="text-[9px] font-bold text-slate-500">قطاعاً عالمياً</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-white">+2.4K</div>
                    <div className="text-[9px] font-bold text-slate-500">فجوة سوقية</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Card */}
            <div className="w-full lg:w-[380px] shrink-0">
               <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl border border-slate-700/50 p-5 relative overflow-hidden group shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                        <div className="absolute inset-0 w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
                      </div>
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider">فرص نشطة الآن</span>
                    </div>
                    <div className="px-1.5 py-0.5 bg-slate-900/50 border border-slate-800 rounded text-[9px] font-bold text-slate-500">تحديث حي</div>
                  </div>
                  
                  <div className="space-y-2.5">
                    {tickerData.slice(0, 4).map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-900/40 border border-slate-800/40 hover:border-indigo-500/30 p-2.5 rounded-xl transition-all hover:translate-x-1 group/item">
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg filter grayscale group-hover/item:grayscale-0 transition-all">{item.flag}</span>
                          <div>
                            <div className="text-[10px] font-black text-slate-200 group-hover/item:text-white transition-colors">{item.label}</div>
                            <div className="text-[9px] font-bold text-slate-500">{item.value}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/5 px-1.5 py-0.5 rounded-md text-[9px] font-black border border-emerald-400/10">
                          <TrendingUpIcon /> {item.trend}
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

const TrendingUpIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);
