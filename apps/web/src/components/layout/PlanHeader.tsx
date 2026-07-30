
import React, { useState } from 'react';
import { 
  Calendar, Layers, MapPin, Briefcase, CheckCircle2, 
  Download, BrainCircuit, Lightbulb, Wallet, Globe, 
  Share2, History, Copy, Trash2, ChevronDown,
  FileText, FileSpreadsheet, Presentation, BarChart3, QrCode,
  Settings2, Wand2, Zap, Info
} from 'lucide-react';

// مكون صغير للمعلومات الأساسية بتصميم "كبسولة" ذكي
const SmartInfoPill = ({ icon: Icon, text, label, color }: { icon: any, text: string, label: string, color: string }) => {
  const colors: any = {
    blue: 'text-blue-600 bg-blue-50/50 border-blue-100',
    purple: 'text-purple-600 bg-purple-50/50 border-purple-100',
    orange: 'text-orange-600 bg-orange-50/50 border-orange-100',
    emerald: 'text-emerald-600 bg-emerald-50/50 border-emerald-100',
  };
  
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white/50 border border-gray-100 rounded-2xl hover:bg-white hover:shadow-md hover:shadow-gray-100/50 transition-all group cursor-pointer">
      <div className={`w-9 h-9 flex items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${colors[color]}`}>
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-1">{label}</span>
        <span className="text-[13px] font-bold text-gray-700 leading-none">{text}</span>
      </div>
    </div>
  );
};

const ActionButton = ({ icon: Icon, label, active, onClick, variant = 'default' }: any) => {
  const isAi = variant === 'ai';
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all border
        ${active 
          ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-100' 
          : isAi 
            ? 'bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 border-purple-100 hover:from-purple-100 hover:to-indigo-100'
            : 'bg-white text-gray-600 border-gray-100 hover:border-gray-300 hover:bg-gray-50'
        }
      `}
    >
      <Icon size={18} strokeWidth={2.5} className={isAi ? 'animate-pulse' : ''} />
      <span>{label}</span>
      {onClick && <ChevronDown size={14} className={`transition-transform duration-300 ${active ? 'rotate-180' : ''}`} />}
    </button>
  );
};

const Dropdown = ({ children }: { children?: React.ReactNode }) => (
  <div className="absolute top-full mt-2 right-0 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
    {children}
  </div>
);

const DropdownItem = ({ icon: Icon, text, color = 'text-gray-700' }: any) => (
  <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors group">
    <div className={`p-1.5 rounded-lg bg-gray-50 group-hover:bg-white shadow-sm transition-colors ${color}`}>
      <Icon size={14} strokeWidth={2.5} />
    </div>
    <span className={`text-[12px] font-bold ${color}`}>{text}</span>
  </button>
);

export const PlanHeader: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="relative mb-10 group/header">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-100/80 -z-10"></div>
      
      <div className="p-8">
        {/* Top Section: Title & Progress Hub */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-16 h-16 bg-primary-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-primary-100 rotate-3 group-hover/header:rotate-0 transition-transform duration-500">
                <FileText size={32} strokeWidth={2.5} />
              </div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-success rounded-lg border-4 border-white flex items-center justify-center text-white">
                <CheckCircle2 size={12} strokeWidth={4} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">خطة عمل test2</h1>
                <span className="bg-success/10 text-success text-[10px] font-bold px-3 py-1 rounded-full border border-success/20 uppercase">
                  جاهزة للتنفيذ
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-gray-300 bg-gray-50 px-2 py-0.5 rounded tracking-widest uppercase">#BP-2023-892</span>
                <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                <p className="text-gray-400 text-xs font-bold">نسخة أولية احترافية • تم التعديل منذ 5 دقائق</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-gray-50/50 p-2 pr-6 rounded-[2rem] border border-gray-100 min-w-[320px]">
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-bold text-gray-500 flex items-center gap-1.5">
                  <Zap size={14} className="text-amber-500 fill-amber-500" />
                  نسبة الإنجاز
                </span>
                <span className="text-sm font-bold text-primary-600">100%</span>
              </div>
              <div className="h-2 bg-gray-200/50 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-gradient-to-l from-primary-600 to-blue-400 w-full rounded-full shadow-lg shadow-primary-100"></div>
              </div>
            </div>
            
            <div className="flex flex-col items-center border-r border-gray-200 pr-4">
              <span className="text-[9px] font-bold text-gray-400 uppercase mb-1">صحة الخطة</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`w-1.5 h-3 rounded-full ${i <= 4 ? 'bg-success' : 'bg-gray-200'}`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Smart Metadata Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SmartInfoPill icon={Calendar} text="أكتوبر 25, 2023" label="تاريخ الإنشاء" color="blue" />
          <SmartInfoPill icon={Layers} text="7 فصول مراجعة" label="الهيكل التنظيمي" color="purple" />
          <SmartInfoPill icon={MapPin} text="الرياض، السعودية" label="النطاق الجغرافي" color="orange" />
          <SmartInfoPill icon={Briefcase} text="تقنية معلومات" label="قطاع الصناعة" color="emerald" />
        </div>

        {/* Bottom Section: Integrated Action Toolbar */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
          <div className="flex flex-wrap gap-2.5">
            {/* Export Menu */}
            <div className="relative">
              <ActionButton 
                icon={Download} 
                label="تصدير الخطة" 
                active={activeMenu === 'export'} 
                onClick={() => toggleMenu('export')} 
              />
              {activeMenu === 'export' && (
                <Dropdown>
                  <DropdownItem icon={FileText} text="تصدير PDF" />
                  <DropdownItem icon={FileText} text="تصدير Word" />
                  <DropdownItem icon={FileSpreadsheet} text="تصدير Excel" />
                  <DropdownItem icon={Presentation} text="تصدير PowerPoint" />
                  <div className="h-px bg-gray-50 my-1"></div>
                  <DropdownItem icon={BarChart3} text="إنفوجرافيك مخصص" color="text-primary-600" />
                </Dropdown>
              )}
            </div>

            {/* AI Assistant Menu */}
            <div className="relative">
              <ActionButton 
                icon={Wand2} 
                label="المساعد الذكي" 
                active={activeMenu === 'ai'} 
                variant="ai"
                onClick={() => toggleMenu('ai')} 
              />
              {activeMenu === 'ai' && (
                <Dropdown>
                  <DropdownItem icon={BrainCircuit} text="تحليل SWOT ذكي" color="text-purple-600" />
                  <DropdownItem icon={Lightbulb} text="اقتراح أهداف بديلة" color="text-amber-500" />
                  <DropdownItem icon={Globe} text="ترجمة ذكية فورية" />
                </Dropdown>
              )}
            </div>

            {/* Management Menu */}
            <div className="relative">
              <ActionButton 
                icon={Settings2} 
                label="إدارة المشروع" 
                active={activeMenu === 'manage'} 
                onClick={() => toggleMenu('manage')} 
              />
              {activeMenu === 'manage' && (
                <Dropdown>
                  <DropdownItem icon={Wallet} text="الميزانية والمالية" />
                  <DropdownItem icon={History} text="سجل التغييرات" />
                  <DropdownItem icon={CheckCircle2} text="اعتماد الخطة" />
                </Dropdown>
              )}
            </div>

            <ActionButton icon={Share2} label="مشاركة" />
          </div>

          <div className="flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all border border-transparent hover:border-primary-100 group/btn">
              <Copy size={18} strokeWidth={2.5} className="group-hover/btn:scale-110 transition-transform" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-danger hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100 group/btn">
              <Trash2 size={18} strokeWidth={2.5} className="group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
