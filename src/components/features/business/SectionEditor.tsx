
import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, Edit3, Sparkles, Save, Clock, 
  CheckCircle2, AlertCircle, Cpu, UserCheck, 
  TrendingUp, BarChart4, Zap, MessageSquareQuote
} from 'lucide-react';
import { PlanSection } from '../types';
import { generateSectionContent } from '../../../services/geminiService';

interface SectionEditorProps {
  section: PlanSection;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (id: string, newContent: string) => void;
  onScoreUpdate?: (id: string, updates: Partial<PlanSection>) => void;
  isReadOnly?: boolean;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({ 
  section, 
  isOpen, 
  onToggle, 
  onUpdate,
  onScoreUpdate,
  isReadOnly = false 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [localContent, setLocalContent] = useState(section.content);
  const [editMode, setEditMode] = useState(false);

  // مساعد للحصول على وصف تقييم الذكاء الاصطناعي
  const aiFeedback = useMemo(() => {
    const score = section.aiScore || 0;
    if (score === 0) return "بانتظار التحليل...";
    if (score < 40) return "محتوى سطحي، يحتاج دعم ببيانات.";
    if (score < 70) return "جيد، لكن ينقصه الجانب الاستراتيجي.";
    if (score < 90) return "احترافي، لغة قوية وصياغة سليمة.";
    return "مثالي، متوافق مع معايير المستثمرين.";
  }, [section.aiScore]);

  // مساعد للحصول على حالة التقييم البشري
  const humanLabel = useMemo(() => {
    const score = section.humanScore || 0;
    if (score < 30) return { text: "تحت المراجعة", color: "text-red-500", bg: "bg-red-50" };
    if (score < 60) return { text: "يحتاج تعديلات", color: "text-orange-500", bg: "bg-orange-50" };
    if (score < 85) return { text: "مقبول جداً", color: "text-blue-500", bg: "bg-blue-50" };
    return { text: "جاهز للاعتماد", color: "text-success", bg: "bg-green-50" };
  }, [section.humanScore]);

  const handleAiGenerate = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsGenerating(true);
    try {
      const generated = await generateSectionContent(section.title, localContent.slice(0, 100));
      setLocalContent(generated);
      onUpdate(section.id, generated);
      if (onScoreUpdate) {
        onScoreUpdate(section.id, { 
            progress: Math.min(section.progress + 20, 100),
            aiScore: Math.floor(Math.random() * (98 - 85 + 1) + 85) // Mock realistic high AI score
        });
      }
    } catch (err) {
      alert("Error generating content");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    onUpdate(section.id, localContent);
    setEditMode(false);
    if (localContent.length > 50 && onScoreUpdate) {
        onScoreUpdate(section.id, { isCompleted: true, progress: 100 });
    }
  };

  return (
    <div className={`bg-white rounded-[1.5rem] border transition-all duration-500 overflow-hidden ${
      isOpen ? 'border-primary-100 shadow-lg ring-4 ring-primary-50/50' : 'border-gray-50 hover:border-gray-200'
    }`}>
      
      {/* Header Area */}
      <div onClick={onToggle} className="flex flex-col cursor-pointer group">
        <div className="flex items-center justify-between p-4 sm:p-5">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  section.isCompleted ? 'bg-success text-white shadow-lg shadow-green-100' : 'bg-gray-50 text-gray-300'
              }`}>
                  {section.isCompleted ? <CheckCircle2 size={24} strokeWidth={2.5} /> : <AlertCircle size={24} strokeWidth={2.5} />}
              </div>
              <div>
                  <h3 className={`font-bold text-[15px] transition-colors ${isOpen ? 'text-primary-700' : 'text-gray-800 group-hover:text-primary-600'}`}>
                  {section.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                      {section.lastEdited && (
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
                            <Clock size={12} />
                            <span>{section.lastEdited}</span>
                        </div>
                      )}
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${humanLabel.bg} ${humanLabel.color}`}>
                        {humanLabel.text}
                      </span>
                  </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {!isOpen && (
                  <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-50/50 rounded-2xl border border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">اكتمال القسم</span>
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-500 transition-all duration-1000" style={{ width: `${section.progress}%` }}></div>
                      </div>
                      <span className="text-[11px] font-bold text-gray-700">{section.progress}%</span>
                  </div>
              )}

              {isOpen && !isReadOnly && (
                  <button 
                  onClick={handleAiGenerate}
                  disabled={isGenerating}
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[12px] font-bold rounded-xl shadow-lg shadow-purple-100 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                  >
                  <Sparkles size={16} className={isGenerating ? "animate-spin" : ""} />
                  {isGenerating ? 'جاري التحليل والكتابة...' : 'تحسين بالذكاء الاصطناعي'}
                  </button>
              )}
              <div className={`p-2 rounded-xl transition-all duration-300 ${isOpen ? 'rotate-180 bg-primary-50 text-primary-600' : 'text-gray-300 group-hover:text-gray-400'}`}>
                  <ChevronDown size={20} strokeWidth={3} />
              </div>
            </div>
        </div>
        
        {!isOpen && (
            <div className="h-1 w-full bg-gray-50 overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-l from-primary-500 to-blue-400 transition-all duration-1000 ease-out" 
                    style={{ width: `${section.progress}%` }}
                ></div>
            </div>
        )}
      </div>

      {/* Content Area */}
      {isOpen && (
        <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-0 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="h-px w-full bg-gradient-to-l from-transparent via-gray-100 to-transparent mb-8"></div>
          
          <div className="relative">
            {!editMode ? (
              <div className="group relative">
                 <div className="prose prose-sm max-w-none text-gray-600 leading-loose whitespace-pre-line min-h-[120px] p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-gray-50/40 border border-gray-100/50 hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 font-medium text-[15px]">
                    {localContent || <span className="text-gray-300 italic font-bold text-center block py-4">ابدأ بكتابة مسودة أو دع الذكاء الاصطناعي يقترح عليك محتوى احترافياً...</span>}
                 </div>
                 {!isReadOnly && (
                   <button 
                      onClick={() => setEditMode(true)}
                      className="absolute top-4 left-4 p-3 bg-white rounded-2xl shadow-xl shadow-gray-200/50 text-gray-500 hover:text-primary-600 opacity-0 group-hover:opacity-100 transition-all border border-gray-100 hover:scale-110 active:scale-90"
                   >
                     <Edit3 size={18} strokeWidth={2.5} />
                   </button>
                 )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                    <textarea
                        value={localContent}
                        onChange={(e) => setLocalContent(e.target.value)}
                        className="w-full min-h-[300px] p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border-2 border-primary-100 focus:border-primary-500 focus:ring-8 focus:ring-primary-50/50 transition-all outline-none text-gray-700 leading-loose resize-y font-medium text-[15px] shadow-inner bg-white"
                        placeholder="اكتب تفاصيل هذا القسم باحترافية..."
                        autoFocus
                    />
                    <div className="absolute bottom-4 right-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {localContent.length} حرف
                    </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => setEditMode(false)}
                    className="px-6 py-3 text-sm text-gray-400 font-bold hover:bg-gray-100 rounded-2xl transition-colors"
                  >
                    تجاهل التغييرات
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-10 py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-2xl shadow-xl shadow-primary-200 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <Save size={18} strokeWidth={2.5} />
                    حفظ المسودة
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* New Enhanced Quality Scoreboard */}
          <div className="mt-8 sm:mt-12 p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] bg-[#FDFDFF] border border-gray-100 shadow-inner">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
                        <Zap size={18} strokeWidth={3} />
                    </div>
                    <h4 className="text-[14px] font-bold text-gray-800">مؤشرات الجودة والتقييم</h4>
                </div>
                <div className="flex gap-1.5">
                    {[1, 2, 3].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${section.progress === 100 ? 'bg-success' : 'bg-gray-200'}`}></div>)}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Enhanced AI Score Card */}
                <div className="relative p-4 sm:p-6 rounded-[1.5rem] sm:rounded-3xl bg-white border border-purple-50 shadow-sm group overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-50 rounded-full opacity-40 group-hover:scale-150 transition-transform duration-1000"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-200">
                                    <Cpu size={20} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">تقييم الذكاء الاصطناعي</p>
                                    <h5 className="text-[13px] font-bold text-gray-800">تحليل الصياغة والاستراتيجية</h5>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-purple-600">{section.aiScore || 0}%</div>
                        </div>

                        <div className="space-y-4">
                            <div className="relative h-4 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                <div 
                                    className="h-full bg-gradient-to-l from-purple-600 via-indigo-500 to-purple-400 transition-all duration-1000 relative" 
                                    style={{ width: `${section.aiScore || 0}%` }}
                                >
                                    {/* Moving Light Scan Effect */}
                                    <div className="absolute inset-0 w-20 bg-white/20 skew-x-12 animate-[move_2s_infinite]"></div>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 bg-purple-50/50 p-3 rounded-2xl border border-purple-100/50">
                                <MessageSquareQuote size={16} className="text-purple-500 mt-1 flex-shrink-0" />
                                <p className="text-[12px] font-bold text-purple-700/80 leading-relaxed italic">
                                    "{aiFeedback}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Human Score Card */}
                <div className="relative p-4 sm:p-6 rounded-[1.5rem] sm:rounded-3xl bg-white border border-blue-50 shadow-sm group overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full opacity-40 group-hover:scale-150 transition-transform duration-1000"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                                    <UserCheck size={20} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">التقييم البشري</p>
                                    <h5 className="text-[13px] font-bold text-gray-800">مراجعة الفريق والمدراء</h5>
                                </div>
                            </div>
                            <div className={`text-2xl font-bold ${humanLabel.color}`}>{section.humanScore || 0}%</div>
                        </div>

                        <div className="space-y-6">
                            <div className="relative flex items-center">
                                <input 
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={section.humanScore || 0}
                                    onChange={(e) => onScoreUpdate && onScoreUpdate(section.id, { humanScore: parseInt(e.target.value) })}
                                    className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                                />
                            </div>
                            
                            <div className="grid grid-cols-4 gap-2">
                                {['ضعيف', 'مقبول', 'جيد', 'ممتاز'].map((label, idx) => (
                                    <div key={label} className={`text-center p-2 rounded-xl text-[10px] font-bold transition-all border ${
                                        Math.floor((section.humanScore || 0) / 25) >= idx 
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                                        : 'bg-gray-50 text-gray-400 border-gray-100 opacity-60'
                                    }`}>
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes move {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-500%); }
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: #2563eb;
          border: 4px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
          transition: all 0.2s;
        }
        input[type='range']::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 6px 15px rgba(37, 99, 235, 0.4);
        }
      `}} />
    </div>
  );
};
