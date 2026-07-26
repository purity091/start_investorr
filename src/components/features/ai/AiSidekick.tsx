
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User as UserIcon,
  MessageSquare,
  Zap,
  BrainCircuit,
  ChevronDown,
  Maximize2,
  Minimize2,
  AlertCircle
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  type: 'ai' | 'user';
  text: string;
  timestamp: Date;
}

interface AiSidekickProps {
  activeTab: string;
  userName: string;
}

const TAB_CONTEXTS: Record<string, string> = {
  'home': 'الصفحة الرئيسية - نظرة عامة على المشاريع والمهام والتحليلات العامة.',
  'my-plans': 'قائمة مشاريعي - إدارة واستعراض كافة خطط العمل المتاحة.',
  'new-plan': 'إنشاء خطة جديدة - معالج البدء في بناء استراتيجية عمل جديدة.',
  'brand-identity': 'استوديو الهوية البصرية - توليد شعارات وألوان وهويات بصرية باستخدام الذكاء الاصطناعي.',
  'editor': 'محرر الخطة الاستراتيجية - كتابة وتعديل فصول خطة العمل وتقييم جودتها.',
  'unicorn-benchmark': 'رادار اليونيكورن - مقارنة أداء المشروع مع المعايير العالمية للشركات المليارية.',
  'analytics': 'التحليلات - رسوم بيانية تفصيلية لأداء السوق والمشروع.',
  'tasks': 'إدارة المهام - تتبع الخطوات التنفيذية والمواعيد النهائية.',
  'settings': 'الإعدادات - ضبط الحساب والملف الشخصي والأمان.'
};

export const AiSidekick: React.FC<AiSidekickProps> = ({ activeTab, userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewInsight, setHasNewInsight] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting based on context
  useEffect(() => {
    const context = TAB_CONTEXTS[activeTab] || 'المنصة العامة';
    const greeting: Message = {
      id: 'g1',
      type: 'ai',
      text: `أهلاً ${userName}! أنا مساعدك الشخصي. بما أنك حالياً في "${context}"، كيف يمكنني مساعدتك في تطوير رؤيتك الاستراتيجية اليوم؟`,
      timestamp: new Date()
    };
    setMessages([greeting]);
    setHasNewInsight(true);
  }, [activeTab, userName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Use the pattern from geminiService.ts
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const context = TAB_CONTEXTS[activeTab] || 'المنصة العامة';
      const prompt = `أنت مساعد خبير في ريادة العمل والاستثمار. المستخدم في صفحة: ${context}. اسمه: ${userName}. سؤاله هو: ${input}. أجب باللغة العربية بأسلوب استشاري، احترافي ومختصر.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
      });
      const text = response.text || "عذراً، لم أستطع صياغة رد حالياً.";

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMsg: Message = {
        id: 'err',
        type: 'ai',
        text: 'عذراً، واجهت مشكلة في الاتصال بعقلي السحابي. يرجى المحاولة لاحقاً.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100] font-['IBM_Plex_Sans_Arabic']" dir="rtl">
      
      {/* Trigger Button */}
      {!isOpen && (
        <button 
          onClick={() => { setIsOpen(true); setHasNewInsight(false); }}
          className={`group flex items-center gap-3 bg-white/10 backdrop-blur-2xl border border-white/20 p-2 pr-5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-500 overflow-hidden ${hasNewInsight ? 'ring-4 ring-primary-500/30' : ''}`}
        >
          {/* Animated Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative z-10 flex flex-col items-start">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">AI Sidekick</span>
             <span className="text-xs font-bold text-gray-700">مساعدك الاستراتيجي</span>
          </div>

          <div className="relative w-12 h-12 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-full flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform">
             <Sparkles size={20} className={hasNewInsight ? 'animate-pulse' : ''} />
             {hasNewInsight && (
               <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>
             )}
          </div>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className={`flex flex-col bg-white border border-gray-100 shadow-[0_32px_96px_-12px_rgba(0,0,0,0.16)] rounded-[2.5rem] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMinimized ? 'h-16 w-80' : 'h-[550px] w-[380px]'}`}>
          
          {/* Header */}
          <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white flex-shrink-0">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg">
                   <BrainCircuit size={18} strokeWidth={2.5} />
                </div>
                <div>
                   <h3 className="text-sm font-black">المستشار الذكي</h3>
                   <div className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-[9px] font-bold text-slate-400">نشط الآن</span>
                   </div>
                </div>
             </div>
             <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
             </div>
          </div>

          {/* Messages Area */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-gray-50/50">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex items-start gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${msg.type === 'ai' ? 'bg-white border border-gray-100 text-primary-600' : 'bg-primary-600 text-white'}`}>
                      {msg.type === 'ai' ? <Bot size={16} /> : <UserIcon size={16} />}
                    </div>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-[13px] font-medium leading-relaxed ${
                      msg.type === 'ai' 
                        ? 'bg-white text-gray-700 border border-gray-100 shadow-sm rounded-tr-none' 
                        : 'bg-primary-600 text-white shadow-lg shadow-primary-200/50 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-start gap-3 animate-pulse">
                     <div className="w-8 h-8 rounded-xl bg-white border border-gray-100 text-primary-600 flex items-center justify-center">
                        <Bot size={16} />
                     </div>
                     <div className="bg-white p-4 rounded-2xl rounded-tr-none border border-gray-100 flex gap-1">
                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                     </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
                 <div className="relative flex-1">
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="اسأل رفيقك الاستراتيجي..."
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all text-sm font-medium text-gray-700"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-gray-300">
                       <Zap size={16} />
                    </div>
                 </div>
                 <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="w-11 h-11 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                 >
                    <Send size={18} className="translate-x-0.5" />
                 </button>
              </div>

              {/* Context Indicator */}
              <div className="bg-slate-50 px-6 py-2 border-t border-gray-100 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Active Context: {activeTab.replace('-', ' ')}
                 </span>
              </div>
            </>
          )}

          {isMinimized && (
            <div className="flex-1 flex items-center px-6 gap-3 cursor-pointer" onClick={() => setIsMinimized(false)}>
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="text-xs font-bold text-gray-500">لديك نصيحة برمجية جديدة من المساعد...</span>
            </div>
          )}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};
