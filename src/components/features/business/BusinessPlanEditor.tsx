
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  FileText, BarChart3, Lightbulb, Target, Users, DollarSign, 
  Briefcase, BrainCircuit, Save, Edit3, Plus, X, Zap, LayoutGrid, CheckCircle2, ArrowLeft 
} from 'lucide-react';
import { PlanSection } from '../types';

// --- Configuration & Helpers ---
export const SECTION_CONFIG: Record<string, { icon: any, color: string }> = {
  'الملخص': { icon: FileText, color: 'text-blue-500' },
  'السوق': { icon: BarChart3, color: 'text-purple-500' },
  'العمل': { icon: Lightbulb, color: 'text-amber-500' },
  'التسويق': { icon: Target, color: 'text-rose-500' },
  'الهيكل': { icon: Users, color: 'text-emerald-500' },
  'المالية': { icon: DollarSign, color: 'text-cyan-500' },
  'default': { icon: Briefcase, color: 'text-slate-500' }
};

export const getSectionIcon = (title: string) => {
  const entry = Object.entries(SECTION_CONFIG).find(([key]) => title.includes(key));
  return entry ? entry[1].icon : SECTION_CONFIG.default.icon;
};

// --- Sub-components ---
const EditorHeader = ({ progress, onToggleAi, isAiOpen }: { progress: number, onToggleAi: () => void, isAiOpen: boolean }) => (
  <nav className="hidden lg:flex h-auto bg-white/80 backdrop-blur-xl border-b border-slate-100 flex-col lg:flex-row items-center justify-between px-4 sm:px-10 py-3 lg:py-4 shrink-0 z-40 gap-4 lg:gap-0 sticky top-[60px] lg:top-0">
    {/* Row 1: AI Toggle & Context Title */}
    <div className="flex items-center justify-between w-full lg:w-auto">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 lg:w-10 lg:h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shrink-0">
          <Briefcase size={18} className="lg:w-5 lg:h-5" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-[13px] lg:text-base font-black text-slate-800 leading-tight">تطوير خطة العمل</h2>
          <span className="text-[9px] font-bold text-slate-400 lg:hidden">محرك الاستراتيجية v5.0</span>
        </div>
      </div>
      
      {/* AI Toggle Button - Mobile Only */}
      <button 
        onClick={onToggleAi}
        className={`lg:hidden w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
          isAiOpen ? 'bg-slate-950 text-white border-slate-950 shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-500'
        }`}
      >
        <BrainCircuit size={18} />
      </button>
    </div>

    {/* Row 2: Progress & Desktop Controls */}
    <div className="flex flex-col sm:flex-row items-center justify-between lg:justify-end w-full lg:w-auto gap-3 sm:gap-4 lg:gap-6">
      <div className="flex items-center gap-4 bg-slate-50 px-4 lg:px-5 py-2.5 lg:py-3 rounded-[1rem] lg:rounded-2xl border border-slate-100 w-full lg:w-auto">
        <span className="text-[10px] lg:text-[11px] font-bold text-slate-400 whitespace-nowrap">جاهزية الاستثمار</span>
        <div className="flex-1 lg:w-32 h-1.5 lg:h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 transition-all duration-700 shadow-[0_4px_10px_rgba(37,99,235,0.3)]" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-[10px] lg:text-xs font-black text-slate-900">{progress}%</span>
      </div>
      
      <button 
        onClick={onToggleAi}
        className={`hidden lg:flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all shadow-sm ${
          isAiOpen ? 'bg-slate-950 text-white shadow-xl' : 'bg-white border-2 border-slate-100 text-slate-600 hover:border-slate-300'
        }`}
      >
        <BrainCircuit size={18} />
        <span className="whitespace-nowrap">ذكاء الخطة</span>
      </button>
    </div>
  </nav>
);

const AiMetric = ({ label, score, warning }: { label: string, score: number, warning?: boolean }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[11px] font-bold">
      <span className="text-slate-500">{label}</span>
      <span className={warning ? 'text-amber-600' : 'text-slate-900'}>{score}%</span>
    </div>
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div 
        className={`h-full transition-all duration-1000 ${warning ? 'bg-amber-400' : 'bg-blue-600'}`} 
        style={{ width: `${score}%` }} 
      />
    </div>
  </div>
);

// --- Main Component ---
interface BusinessPlanEditorProps {
  sections: PlanSection[];
  onSectionUpdate: (id: string, updates: Partial<PlanSection>) => void;
  expandedSectionId: string | null;
  onSectionExpand: (id: string | null) => void;
  setActiveTab: (tab: string) => void;
  onWorkspaceSync?: (sections: PlanSection[]) => void;
}

export const BusinessPlanEditor: React.FC<BusinessPlanEditorProps> = ({
  sections,
  onSectionUpdate,
  expandedSectionId,
  onSectionExpand,
  setActiveTab,
  onWorkspaceSync
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(true);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // حساب التقدم
  const totalProgress = useMemo(() => 
    sections.length > 0 ? Math.round((sections.filter(s => s.isCompleted).length / sections.length) * 100) : 0, 
  [sections]);

  const activeSection = useMemo(() => 
    sections.find(s => s.id === expandedSectionId) || sections[0] || { id: '0', title: 'خطة جديدة', content: '', isCompleted: false },
  [sections, expandedSectionId]);

  // التحكم في التعديل
  const startEditing = () => {
    setEditingId(activeSection.id);
    setEditContent(activeSection.content || '');
  };

  const cancelEditing = () => setEditingId(null);

  const saveContent = () => {
    onSectionUpdate(activeSection.id, { 
      content: editContent, 
      isCompleted: editContent.trim().length > 50 
    });
    setEditingId(null);
  };

  useEffect(() => {
    onWorkspaceSync?.(sections);
  }, [onWorkspaceSync, sections]);

  return (
    <div dir="rtl" className="h-full lg:h-[calc(100vh-64px)] flex flex-col font-['IBM_Plex_Sans_Arabic'] bg-white overflow-hidden text-slate-900 w-full max-w-full">
      
      <EditorHeader 
        progress={totalProgress} 
        onToggleAi={() => setIsAiSidebarOpen(!isAiSidebarOpen)} 
        isAiOpen={isAiSidebarOpen} 
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex overflow-hidden w-full max-w-full">
        
        {/* الملاح الجانبي (Right) - Hidden on Mobile */}
        <aside className="hidden lg:flex w-72 border-l border-slate-100 flex flex-col bg-white shrink-0">
          <div className="p-8">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 text-right">هيكل الاستراتيجية</h4>
            <div className="space-y-1.5">
              {sections.map((section) => {
                const Icon = getSectionIcon(section.title);
                const isActive = activeSection.id === section.id;
                return (
                  <button 
                    key={section.id}
                    onClick={() => { onSectionExpand(section.id); cancelEditing(); }}
                    className={`w-full group p-4 rounded-2xl text-right transition-all flex items-center justify-between border-2 ${
                      isActive 
                        ? 'bg-blue-50/50 border-blue-600 text-blue-950 shadow-sm' 
                        : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                      <span className={`text-sm ${isActive ? 'font-black' : 'font-medium'}`}>{section.title}</span>
                    </div>
                    {section.isCompleted && <CheckCircle2 size={16} className="text-emerald-500" />}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* منطقة المحرر المركزية (Center) */}
        <main className="flex-1 overflow-y-auto no-scrollbar bg-[#FAFAF9] flex flex-col items-center pb-32 lg:pb-10">
          <div className="w-full max-w-4xl flex flex-col gap-8 p-4 sm:p-6 lg:p-10">
            
            {/* 1. Dashboard Overview - Mobile Optimized */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Strategic Score Card */}
              <div className="bg-slate-950 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl">
                 <Zap className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5 rotate-12" />
                 <div className="relative z-10">
                    <span className="text-[10px] font-black text-blue-400 uppercase mb-2 block tracking-widest">Score الاستراتيجي</span>
                    <div className="text-5xl font-black mb-4 leading-none">85%</div>
                    <p className="text-slate-400 text-xs leading-relaxed font-medium">
                      يُنصح بزيادة التركيز على <span className="text-white font-bold">الميزة التنافسية</span> لتحسين فرص قبول الخطة.
                    </p>
                 </div>
              </div>

              {/* Quick Metrics */}
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                 <h5 className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2 mb-6">
                   <LayoutGrid size={14} /> مقاييس الأداء
                 </h5>
                 <div className="space-y-5">
                    <AiMetric label="وضوح الرؤية" score={85} />
                    <AiMetric label="التحليل التنافسي" score={45} warning />
                    <AiMetric label="الواقعية المالية" score={85} />
                 </div>
              </div>
            </div>

            {/* 2. Editor Workspace */}
            <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200/60 shadow-sm flex flex-col overflow-hidden">
              {/* ترويسة القسم الحالية */}
              <div className="px-6 sm:px-12 py-6 sm:py-8 border-b border-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 text-right">
                <div className="flex items-center gap-3 sm:gap-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-slate-900 shadow-inner">
                    {React.createElement(getSectionIcon(activeSection.title), { size: 20 })}
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black tracking-tight">{activeSection.title}</h2>
                </div>
              </div>

              {/* محتوى المحرر */}
              <div className="p-6 sm:p-12 text-right">
                {editingId === activeSection.id ? (
                  <div className="flex flex-col">
                    <textarea 
                      autoFocus
                      ref={editorRef}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full text-base sm:text-xl font-medium text-slate-800 leading-relaxed outline-none border-none resize-none placeholder:text-slate-200 min-h-[300px]"
                      placeholder="ابدأ بصياغة رؤيتك الاستراتيجية هنا..."
                    />
                    <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button onClick={cancelEditing} className="text-slate-400 hover:text-rose-500 font-bold text-sm transition-colors">إلغاء التغييرات</button>
                      <button 
                        onClick={saveContent}
                        className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                      >
                        <Save size={18} /> حفظ المسودة الاستراتيجية
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {activeSection.content ? (
                      <div>
                        <p className="text-base sm:text-xl font-medium text-slate-700 leading-relaxed sm:leading-[2] whitespace-pre-wrap">{activeSection.content}</p>
                        <div className="mt-12 flex flex-col sm:flex-row gap-4">
                          <button 
                            onClick={startEditing}
                            className="px-6 py-3.5 bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                          >
                            <Edit3 size={18} /> تعديل النص
                          </button>
                          <button className="px-6 py-3.5 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-100 transition-all">
                            <Zap size={18} /> تحسين بواسطة AI
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center opacity-60 py-20">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6">
                          <Plus size={24} className="sm:w-8 sm:h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-400 mb-8">هذا القسم ينتظر إبداعك...</h3>
                        <button 
                          onClick={startEditing}
                          className="px-10 py-4 bg-slate-950 text-white rounded-2xl font-bold text-sm sm:text-base shadow-xl hover:scale-105 transition-all"
                        >
                          ابدأ الكتابة الآن
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* لوحة التحليل الذكي (Left) - Fixed with safe z-index */}
        <aside className={`fixed inset-0 z-[60] lg:relative lg:inset-auto w-full lg:w-80 bg-white border-r border-slate-100 flex flex-col shrink-0 transition-all duration-500 transform ${isAiSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:hidden lg:w-0'}`}>
          <div className="p-6 border-b border-slate-50 flex items-center justify-between text-right">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <BrainCircuit size={18} />
              </div>
              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest text-right">تحليل الجودة اللحظي</h4>
            </div>
            <button onClick={() => setIsAiSidebarOpen(false)} className="w-8 h-8 rounded-lg hover:bg-slate-50 flex items-center justify-center text-slate-300 hover:text-slate-900 transition-colors"><X size={18} /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8 text-right bg-slate-50/30">
            {/* بطاقة التقييم */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg">
              <Zap className="absolute -bottom-6 -right-6 w-24 h-24 text-white/5 rotate-12" />
              <div className="relative z-10">
                <span className="text-[9px] font-black text-blue-400 uppercase mb-2 block tracking-widest">Score الاستراتيجي</span>
                <div className="text-4xl font-black mb-2 leading-none">{activeSection.aiScore || 85}%</div>
                <p className="text-slate-400 text-[10px] leading-relaxed font-medium">
                  يُنصح بزيادة التركيز على <span className="text-white">الميزة التنافسية</span> لتحسين فرص القبول.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h5 className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2">
                <LayoutGrid size={14} /> مقاييس الأداء
              </h5>
              <div className="space-y-5">
                <AiMetric label="وضوح الرؤية" score={85} />
                <AiMetric label="التحليل التنافسي" score={45} warning />
                <AiMetric label="الواقعية المالية" score={85} />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
