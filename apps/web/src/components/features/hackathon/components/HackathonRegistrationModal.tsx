import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Briefcase, Globe, CheckCircle2, ChevronDown } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export const HackathonRegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [formData, setFormData] = useState({
    industries: [] as string[],
    domains: [] as string[],
    mobile: '',
    jobRole: '',
    country: 'المملكة العربية السعودية'
  });

  const industries = ['الرعاية الصحية', 'التعليم التقني', 'التقنيات المالية', 'الزراعة الذكية', 'اللوجستيات', 'الذكاء الاصطناعي', 'التجارة الإلكترونية', 'الطاقة المستدامة'];
  const domains = ['تطوير الويب', 'تطبيقات الجوال', 'علم البيانات', 'البلوكشين', 'الأمن السيبراني', 'إنترنت الأشياء (IoT)', 'الواقع الافتراضي/المعزز', 'الحوسبة السحابية'];

  const toggleSelection = (list: string[], item: string, max: number) => {
    if (list.includes(item)) {
      return list.filter(i => i !== item);
    }
    if (list.length < max) {
      return [...list, item];
    }
    return list;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            dir="rtl"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <div>
                  <h2 className="text-2xl font-black text-slate-900">طلب الانضمام للهاكثون</h2>
                  <p className="text-xs font-bold text-slate-400 mt-1">يرجى إكمال بياناتك المهنية لبدء الرحلة</p>
               </div>
               <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-400">
                  <X size={24} />
               </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
               {/* Industries */}
               <section>
                  <label className="block text-sm font-black text-slate-900 mb-4 flex items-center justify-between">
                     <span>القطاع المستهدف (اختر حتى 2) *</span>
                     <span className="text-[10px] text-indigo-500 font-bold">{formData.industries.length}/2 مختار</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                     {industries.map(ind => (
                        <button
                          key={ind}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, industries: toggleSelection(prev.industries, ind, 2) }))}
                          className={`p-3 text-[10px] font-black rounded-xl border-2 transition-all ${
                            formData.industries.includes(ind)
                              ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100'
                              : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-100'
                          }`}
                        >
                           {ind}
                        </button>
                     ))}
                  </div>
               </section>

               {/* Domains */}
               <section>
                  <label className="block text-sm font-black text-slate-900 mb-4 flex items-center justify-between">
                     <span>المجال التقني (اختر حتى 3) *</span>
                     <span className="text-[10px] text-indigo-500 font-bold">{formData.domains.length}/3 مختار</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                     {domains.map(dom => (
                        <button
                          key={dom}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, domains: toggleSelection(prev.domains, dom, 3) }))}
                          className={`p-3 text-[10px] font-black rounded-xl border-2 transition-all ${
                            formData.domains.includes(dom)
                              ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100'
                              : 'bg-white border-slate-100 text-slate-500 hover:border-emerald-100'
                          }`}
                        >
                           {dom}
                        </button>
                     ))}
                  </div>
               </section>

               {/* Mobile & Job Role */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="block text-sm font-black text-slate-900 mb-3">رقم الجوال *</label>
                     <div className="relative">
                        <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          required
                          type="tel"
                          placeholder="05xxxxxxxx"
                          value={formData.mobile}
                          onChange={e => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pr-12 pl-4 text-sm font-bold focus:bg-white focus:border-indigo-500 transition-all outline-none"
                        />
                     </div>
                  </div>
                  <div>
                     <label className="block text-sm font-black text-slate-900 mb-3">المسمى الوظيفي / الدور *</label>
                     <div className="relative">
                        <Briefcase className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          required
                          type="text"
                          placeholder="مثلاً: مطور برمجيات، مؤسس..."
                          value={formData.jobRole}
                          onChange={e => setFormData(prev => ({ ...prev, jobRole: e.target.value }))}
                          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pr-12 pl-4 text-sm font-bold focus:bg-white focus:border-indigo-500 transition-all outline-none"
                        />
                     </div>
                  </div>
               </div>

               {/* Country */}
               <div>
                  <label className="block text-sm font-black text-slate-900 mb-3">الدولة *</label>
                  <div className="relative">
                     <Globe className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                     <select
                       value={formData.country}
                       onChange={e => setFormData(prev => ({ ...prev, country: e.target.value }))}
                       className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pr-12 pl-4 text-sm font-black focus:bg-white focus:border-indigo-500 transition-all outline-none appearance-none"
                     >
                        <option>المملكة العربية السعودية</option>
                        <option>الإمارات العربية المتحدة</option>
                        <option>الكويت</option>
                        <option>قطر</option>
                        <option>البحرين</option>
                        <option>عمان</option>
                        <option>أخرى</option>
                     </select>
                     <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
               </div>
            </form>

            {/* Footer */}
            <div className="p-8 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
               <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                  <CheckCircle2 size={16} />
                  <span>بياناتك محمية ومشفرة</span>
               </div>
               <button
                 onClick={handleSubmit}
                 disabled={formData.industries.length === 0 || formData.domains.length === 0 || !formData.mobile || !formData.jobRole}
                 className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
               >
                  تأكيد الانضمام والبدء
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
