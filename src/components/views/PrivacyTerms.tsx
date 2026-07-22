import React, { useState } from 'react';
import { 
  Shield, 
  FileText, 
  Lock, 
  Eye, 
  UserCheck, 
  Download, 
  Printer, 
  ChevronLeft,
  Scale,
  AlertCircle,
  Copyright,
  Info,
  List,
  Mail,
  MessageSquare,
  Wrench,
  Clock,
  MapPin,
  MessageCircle,
  ChevronRight
} from 'lucide-react';

export const PrivacyTerms: React.FC = () => {
  const [activeSection, setActiveSection] = useState('privacy-intro');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const sections = [
    { id: 'privacy-intro', label: 'سياسة الخصوصية / Privacy', icon: Shield },
    { id: 'data-collection', label: 'جمع البيانات / Data Collection', icon: Eye },
    { id: 'data-usage', label: 'استخدام البيانات / Usage', icon: Lock },
    { id: 'user-rights', label: 'حقوق المستخدم / User Rights', icon: UserCheck },
    { id: 'terms-usage', label: 'شروط الاستخدام / Terms of Use', icon: Scale },
    { id: 'responsibilities', label: 'مسؤوليات المستخدم / Responsibilities', icon: List },
    { id: 'liability', label: 'حدود المسؤولية / Liability', icon: AlertCircle },
    { id: 'intellectual', label: 'الملكية الفكرية / IP Rights', icon: Copyright },
  ];

  return (
    <div className="app-page-shell-wide animate-in fade-in slide-in-from-bottom-2 duration-700 py-8 lg:py-10 font-['IBM_Plex_Sans_Arabic']">
      
      {/* Hero Section - Identical to ContactUs Style */}
      <section className="surface-card mb-8 relative overflow-hidden p-8 md:p-10 lg:p-12">
        <div className="relative z-10 w-full text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-3 tracking-tight">سياسة الخصوصية والشروط</h2>
          <p className="text-[13px] md:text-[14px] text-slate-600 leading-relaxed max-w-4xl font-medium mx-auto">
            نحن نلتزم بحماية خصوصيتك وضمان تجربة آمنة وشفافة. هذه الوثيقة توضح حقوقك ومسؤولياتنا تجاه بياناتك الشخصية وشروط استخدام منصة "خطة".
          </p>
        </div>
        {/* Aesthetic Glass Elements - Identical to ContactUs */}
        <div className="absolute -bottom-12 -left-6 w-48 h-48 bg-slate-100 rounded-full blur-3xl"></div>
        <div className="absolute -top-12 -right-6 w-64 h-64 bg-blue-50 rounded-full blur-3xl"></div>
      </section>

      {/* Main Grid Section - Inspired by ContactUs 2-Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_360px] 2xl:grid-cols-[minmax(0,1.28fr)_420px] gap-8 mb-16">
        
        {/* Main Content Card - Like the Contact Form Card */}
        <div className="surface-card p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-1000"></div>
          
          <main className="relative z-10 space-y-12">
            {/* Privacy Policy Section */}
            <div id="privacy-intro" className="scroll-mt-24 space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <Shield size={24} />
                 </div>
                 <div>
                    <h2 className="text-2xl font-black text-slate-900 leading-tight">سياسة الخصوصية</h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Privacy Policy Framework</p>
                 </div>
              </div>

              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-slate-900 border-r-4 border-indigo-600 pr-3">1. مقدمة / Introduction</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
                    <p className="text-slate-600 text-[13px] font-medium leading-relaxed">تعتبر خصوصية بياناتك الاستثمارية هي حجر الزاوية في علاقتنا معك. توضح هذه السياسة كيف نقوم بتعامل مع معلوماتك عند استخدامك لخدماتنا.</p>
                    <p className="text-slate-500 text-[12px] font-medium leading-relaxed" dir="ltr">Your investment data's privacy is the cornerstone of our relationship. This document outlines our protocols in processing your data.</p>
                  </div>
                </div>

                <div id="data-collection" className="scroll-mt-24 space-y-6 pt-6 border-t border-slate-50">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                    <Eye size={18} className="text-indigo-600" />
                    <span>2. جمع البيانات / Data Collection</span>
                  </h3>
                  <p className="text-slate-500 text-[12px] font-medium leading-relaxed">نقوم بجمع المعلومات اللازمة فقط لتقديم أفضل التحليلات الاستراتيجية، بما في ذلك بيانات الحساب، معلومات المشروع، وسجلات التفاعل مع الذكاء الاصطناعي.</p>
                </div>

                <div id="terms-usage" className="scroll-mt-24 pt-10 border-t border-slate-100 space-y-8">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                        <Scale size={24} />
                     </div>
                     <div>
                        <h2 className="text-2xl font-black text-slate-950 leading-tight">شروط الاستخدام</h2>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">General Terms</p>
                     </div>
                  </div>
                  
                  <div className="space-y-6 pb-6">
                    <h3 className="text-lg font-black text-slate-900 border-r-4 border-slate-900 pr-3">1. الاتفاقية / Agreement</h3>
                    <p className="text-slate-600 text-[13px] font-medium leading-relaxed">باستخدامك لمنصة "خطة"، فإنك تدخل في اتفاقية مُلزمة قانونياً تضمن حقوقك وتحدد مسؤولياتك في إطار الأنظمة المعمول بها.</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Side Actions Drawer - Like the Contact Info Card */}
        <aside className="space-y-6">
          <div className="surface-card p-6 rounded-[2.5rem] space-y-8 flex flex-col sticky top-24">
            
            {/* Table of Contents - Sidebar View */}
            <div className="space-y-4">
              <h4 className="text-slate-900 text-[12px] font-black uppercase tracking-widest pr-2 mb-4">جدول المحتويات</h4>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-black transition-all text-right group ${
                      activeSection === section.id 
                      ? 'bg-white text-indigo-700 shadow-md border-r-4 border-indigo-600' 
                      : 'text-slate-500 hover:bg-white/50 hover:text-indigo-600'
                    }`}
                  >
                    <section.icon size={16} className={activeSection === section.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-600'} />
                    <span className="truncate">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-col gap-3">
               <button className="w-full bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-black text-[11px] flex items-center justify-center gap-3 hover:border-indigo-600 transition-all shadow-sm">
                  <Download size={14} />
                  <span>تحميل PDF</span>
               </button>
               <button className="w-full bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-black text-[11px] flex items-center justify-center gap-3 hover:border-indigo-600 transition-all shadow-sm">
                  <Printer size={14} />
                  <span>طباعة المستند</span>
               </button>
            </div>

            <div className="bg-indigo-600 p-6 rounded-[2rem] text-white flex flex-col items-center text-center shadow-lg shadow-indigo-600/20">
               <Lock size={24} className="mb-3" />
               <h5 className="font-black text-[12px] mb-1">خصوصيتك مضمونة</h5>
               <p className="text-white/70 text-[10px] font-medium leading-relaxed">تشفير AES-256 لحماية كافة أسرارك التجارية.</p>
            </div>
          </div>
        </aside>
      </div>

      {/* FAQ Re-integrated at bottom - Identical to ContactUs footer style */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 py-8">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full mb-6 text-indigo-600 shadow-sm">
            <BookOpen size={16} />
            <span className="text-[11px] font-black tracking-widest uppercase">مركز المساعدة والأسئلة</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">الأسئلة الشائعة</h2>
          <p className="text-slate-500 text-[13px] font-medium max-w-2xl mx-auto leading-relaxed">تعرف على المزيد حول أمن بياناتك وشروط الخدمة.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
           {/* Summary FAQ Data */}
           <details className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg h-fit">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none bg-white hover:bg-slate-50/50 transition-colors">
                <span className="text-[14px] font-black text-slate-800 group-open:text-indigo-600 transition-colors pr-2">هل بياناتي آمنة؟</span>
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-open:bg-indigo-600 group-open:text-white group-open:rotate-180 transition-all duration-500 shrink-0">
                  <ChevronLeft size={18} strokeWidth={3} />
                </div>
              </summary>
              <div className="px-7 pb-7 animate-in fade-in slide-in-from-top-2 duration-500">
                <p className="text-[13px] text-slate-500 leading-relaxed font-medium border-t border-slate-100 pt-5">نعم، نستخدم تشفير AES-256 وحلولاً متطورة لحماية كافة بياناتك.</p>
              </div>
           </details>
           <details className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg h-fit">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none bg-white hover:bg-slate-50/50 transition-colors">
                <span className="text-[14px] font-black text-slate-800 group-open:text-indigo-600 transition-colors pr-2">من يملك الحقوق الفكرية؟</span>
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-open:bg-indigo-600 group-open:text-white group-open:rotate-180 transition-all duration-500 shrink-0">
                  <ChevronLeft size={18} strokeWidth={3} />
                </div>
              </summary>
              <div className="px-7 pb-7 animate-in fade-in slide-in-from-top-2 duration-500">
                <p className="text-[13px] text-slate-500 leading-relaxed font-medium border-t border-slate-100 pt-5">المحتوى المستخرج هو ملكك، بينما الخوارزميات تظل ملكية لشركة خطة.</p>
              </div>
           </details>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        details summary::-webkit-details-marker { display: none; }
        .scroll-mt-24 { scroll-margin-top: 6rem; }
      `}} />
    </div>
  );
};

// Lucide Icons that might be missing locally
const BookOpen = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
);
