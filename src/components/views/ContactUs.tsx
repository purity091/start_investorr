import React from 'react';
import { FAQ } from './FAQ';
import {
  Phone,
  Mail,
  MessageCircle,
  Wrench,
  CreditCard,
  Clock,
  Send,
  MapPin,
  ChevronLeft,
  ShieldCheck,
  Lock,
  Share2
} from 'lucide-react';

export const ContactUs: React.FC = () => {
  return (
    <div className="app-page-shell-wide animate-in fade-in slide-in-from-bottom-2 duration-700 py-8 lg:py-10 font-['IBM_Plex_Sans_Arabic']">
      {/* Hero Section - Compact Executive View */}
      <section className="surface-card mb-8 relative overflow-hidden p-8 md:p-10 lg:p-12">
        <div className="relative z-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-end">
          <h2 className="text-2xl md:text-3xl font-black mb-3 tracking-tight">اتصل بنا</h2>
          <p className="text-[13px] md:text-[14px] text-slate-600 leading-relaxed max-w-4xl font-medium mx-auto xl:mx-0">
            شراكتنا تبدأ بتوفير الدعم الاستراتيجي والتقني الذي تحتاجه لتحويل أهدافك إلى نتائج ملموسة. فريق خبراء "خطة" متاح للإجابة على تساؤلاتكم ودعم نمو مشاريعكم الاستثمارية باحترافية وكفاءة.
          </p>
        </div>
        {/* Aesthetic Glass Elements - Scaled Down */}
        <div className="absolute -bottom-12 -left-6 w-48 h-48 bg-slate-100 rounded-full blur-3xl"></div>
        <div className="absolute -top-12 -right-6 w-64 h-64 bg-blue-50 rounded-full blur-3xl"></div>
      </section>



      {/* Main Layout Split: Form & Visual */}
      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] 2xl:grid-cols-[minmax(0,1.2fr)_minmax(420px,0.8fr)] gap-6 items-start mb-8">
        {/* Contact Form */}
        <div className="surface-card p-8 lg:p-10">
          <h3 className="text-lg font-black text-slate-900 mb-6 border-r-4 border-blue-600 pr-3">أرسل لنا رسالة مباشرة</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-right">
                <label className="block text-[10px] font-black text-slate-400 mr-2 uppercase tracking-widest">الاسم</label>
                <input
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all font-bold text-[12px] placeholder:text-slate-400"
                  placeholder="أدخل اسمك الكامل"
                  type="text"
                />
              </div>
              <div className="space-y-1.5 text-right">
                <label className="block text-[10px] font-black text-slate-400 mr-2 uppercase tracking-widest">البريد الإلكتروني</label>
                <input
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-left font-bold text-[12px] placeholder:text-slate-400"
                  dir="ltr"
                  placeholder="example@email.com"
                  type="email"
                />
              </div>
            </div>
            <div className="space-y-1.5 text-right">
              <label className="block text-[10px] font-black text-slate-400 mr-2 uppercase tracking-widest">الموضوع</label>
              <select className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all font-bold text-[12px] appearance-none cursor-pointer">
                <option>طلب دعم تقني</option>
                <option>استفسار عام</option>
                <option>تعاون تجاري</option>
                <option>أخرى</option>
              </select>
            </div>
            <div className="space-y-1.5 text-right">
              <label className="block text-[10px] font-black text-slate-400 mr-2 uppercase tracking-widest">الرسالة</label>
              <textarea
                className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all font-bold text-[12px] placeholder:text-slate-400"
                placeholder="كيف يمكننا مساعدتك اليوم؟"
                rows={4}
              ></textarea>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-black text-sm shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2">
              <span>إرسال الرسالة</span>
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* Side Info - Compact Integrated Contact Card */}
        <div className="surface-card p-6 lg:p-7 space-y-8 flex flex-col">
          
          {/* Map Card Visualization - Top of Sidebar */}
          <div 
            className="relative rounded-[2rem] overflow-hidden h-48 group shadow-lg border border-white cursor-pointer"
            onClick={() => window.open('https://maps.google.com', '_blank')}
          >
            <img
              alt="Map Visualization"
              className="w-full h-full object-cover grayscale-[0.6] opacity-80 group-hover:scale-110 transition-transform duration-1000"
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200"
            />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative">
                <div className="absolute -inset-3 bg-indigo-500/20 rounded-full animate-ping"></div>
                <div className="absolute -top-4 -right-1 text-slate-400 opacity-60">
                   <MapPin size={18} fill="currentColor" />
                </div>
                <div className="relative text-indigo-600 shadow-xl">
                   <MapPin size={28} fill="currentColor" />
                </div>
                <div className="w-8 h-2 bg-black/10 rounded-[100%] blur-[2px] mt-1 mx-auto"></div>
              </div>
            </div>

            <div className="absolute bottom-3 right-3">
              <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-white/50">
                <span className="text-[8px] font-black text-slate-800">مقر مشروع المسار الرقمي</span>
              </div>
            </div>
          </div>

          {/* Symmetrical Contact Grid - Two Columns */}
          <div className="grid grid-cols-2 gap-x-1 gap-y-6 pr-1">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <MapPin size={18} strokeWidth={2.5} />
              </div>
              <div className="text-right">
                <h4 className="text-slate-900 text-[11px] font-black mb-0.5">المقر الرئيسي</h4>
                <p className="text-slate-500 text-[9px] font-bold leading-tight">حي الياسمين، الرياض</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <Clock size={18} strokeWidth={2.5} />
              </div>
              <div className="text-right">
                <h4 className="text-slate-900 text-[11px] font-black mb-0.5">أوقات الدوام</h4>
                <p className="text-slate-500 text-[9px] font-bold leading-tight">الأحد-الخميس: 9ص-6م</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <Mail size={18} strokeWidth={2.5} />
              </div>
              <div className="text-right">
                <h4 className="text-slate-900 text-[11px] font-black mb-0.5">البريد الإلكتروني</h4>
                <p className="text-slate-500 text-[9px] font-bold leading-tight truncate max-w-[80px]">hello@khotta-ai.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <MessageCircle size={18} strokeWidth={2.5} />
              </div>
              <div className="text-right">
                <h4 className="text-slate-900 text-[11px] font-black mb-0.5">نظام الدعم</h4>
                <p className="text-slate-500 text-[9px] font-bold leading-tight">فتح تذكرة فنية 24/7</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <Phone size={18} strokeWidth={2.5} />
              </div>
              <div className="text-right">
                <h4 className="text-slate-900 text-[11px] font-black mb-0.5">الهاتف</h4>
                <p className="text-slate-500 text-[9px] font-bold leading-tight" dir="ltr">+966 11 000 0000</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <Share2 size={18} strokeWidth={2.5} />
              </div>
              <div className="text-right">
                <h4 className="text-slate-900 text-[11px] font-black mb-0.5">تابعنا</h4>
                <p className="text-slate-500 text-[9px] font-bold leading-tight">@khotta_ai</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrated FAQ Section from standalone component */}
      <FAQ />

      <style dangerouslySetInnerHTML={{ __html: `
        details summary::-webkit-details-marker {
          display: none;
        }
        @keyframes custom-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        .animate-whatsapp-pulse {
          animation: custom-pulse 2s infinite ease-in-out;
        }
      `}} />

      {/* Floating WhatsApp Button - Premium Immediate Support */}
      <a
        href="https://wa.me/9668001234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-[100] group flex items-center gap-3 animate-whatsapp-pulse hover:animate-none"
      >
        {/* Label - Appears on Hover */}
        <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 hidden md:block">
          <span className="text-[12px] font-black text-slate-800 whitespace-nowrap">تحدث معنا مباشرة</span>
        </div>

        {/* The Icon Circle */}
        <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30_rgba(37,211,102,0.3)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.4)] transition-all hover:scale-110 active:scale-95 border-4 border-white/20">
          <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </div>
      </a>
    </div>
  );
};
