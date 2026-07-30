
import React, { useState } from 'react';
import { 
  MessageSquare, 
  TrendingUp, 
  X, 
  Sparkles, 
  Send, 
  ChevronRight,
  BarChart3,
  Zap,
  BrainCircuit,
  ArrowUpRight,
  ChevronLeft
} from 'lucide-react';

interface LeftAiSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const LeftAiSidebar: React.FC<LeftAiSidebarProps> = ({ isOpen, onToggle }) => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'trends'>('chat');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: 'أهلاً بك! أنا مساعدك الذكي. كيف يمكنني مساعدتك في تطوير خطة عملك اليوم؟' }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setChatHistory([...chatHistory, { role: 'user', text: message }]);
    setMessage('');
    // التظاهر برد الذكاء الاصطناعي
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'ai', text: 'بناءً على طلبك، أقترح مراجعة قسم التوقعات المالية لإضافة تدفقات إيرادات بديلة.' }]);
    }, 1000);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay for AI Sidebar */}
      {isOpen && (
        <div 
          onClick={onToggle}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[45] xl:hidden animate-in fade-in duration-300"
        />
      )}

      {/* Toggle Button when closed - Redesigned as Circular AI Floating Button */}
      {!isOpen && (
        <button 
          onClick={onToggle}
          className="fixed left-6 bottom-6 z-50 w-16 h-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-full flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(79,70,229,0.4)] hover:scale-110 hover:rotate-12 active:scale-95 transition-all duration-500 group"
        >
          {/* Pulsing ring animation */}
          <div className="absolute inset-0 rounded-full bg-indigo-50 animate-ping opacity-20 group-hover:opacity-40"></div>
          
          {/* Orbiting glow */}
          <div className="absolute inset-0 rounded-full border-2 border-white/20 border-t-purple-400 animate-spin duration-3000 opacity-60"></div>
          
          <Sparkles size={28} className="text-white animate-pulse relative z-10" />
          
          {/* Tooltip on hover */}
          <span className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900/90 backdrop-blur-md text-white text-[10px] font-black rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none translate-x-[-10px] group-hover:translate-x-0 border border-white/10 shadow-xl">
             المساعد الذكي (AI)
          </span>
        </button>
      )}

      {/* Main Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100 shadow-[20px_0_50px_rgba(0,0,0,0.05)] z-50 transition-all duration-500 ease-in-out flex flex-col ${isOpen ? 'w-[90vw] md:w-96 translate-x-0' : 'w-0 -translate-x-full overflow-hidden'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <BrainCircuit size={22} />
             </div>
             <div>
                <h3 className="font-bold text-gray-900 text-sm">المساعد الاستراتيجي</h3>
                <div className="flex items-center gap-1.5">
                   <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
                   <span className="text-[10px] font-bold text-gray-400">متصل الآن</span>
                </div>
             </div>
          </div>
          <button onClick={onToggle} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-4 bg-white">
           <div className="flex bg-gray-100/50 p-1 rounded-2xl border border-gray-100">
              <button 
                onClick={() => setActiveSubTab('chat')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${activeSubTab === 'chat' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <MessageSquare size={16} />
                المحادثة
              </button>
              <button 
                onClick={() => setActiveSubTab('trends')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${activeSubTab === 'trends' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <TrendingUp size={16} />
                الاقتراحات
              </button>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {activeSubTab === 'chat' ? (
            <div className="space-y-4">
              {chatHistory.map((chat, i) => (
                <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm font-medium leading-relaxed ${
                    chat.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-bl-none' 
                      : 'bg-gray-100 text-gray-700 rounded-br-none border border-gray-200 shadow-sm'
                  }`}>
                    {chat.text}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Live Trends Card (Dark Style) */}
              <div className="bg-[#0f172a] rounded-[2rem] p-6 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  <span className="px-3 py-1 bg-blue-600 text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg shadow-blue-500/30">
                    LIVE TRENDS
                  </span>
                </div>
                <div className="mt-10 space-y-4 relative z-10">
                  <h4 className="text-xl font-bold mb-6">توجهات السوق الحالية</h4>
                  
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group-hover:bg-white/10 transition-colors">
                    <span className="text-sm font-bold opacity-80">نمو قطاع الـ Fintech</span>
                    <span className="text-success font-bold text-sm">+18%</span>
                  </div>
                  
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group-hover:bg-white/10 transition-colors">
                    <span className="text-sm font-bold opacity-80">الاستثمار في الرياض</span>
                    <span className="text-success font-bold text-sm">عالي جداً</span>
                  </div>
                </div>
                {/* Decoration */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
              </div>

              {/* SWOT Analysis Card (Gradient Style) */}
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-4 left-4 opacity-20">
                   <BarChart3 size={60} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Zap size={20} />
                    </div>
                    <h4 className="text-lg font-bold tracking-tight">تحليل SWOT المتقدم</h4>
                  </div>
                  <p className="text-indigo-100 font-bold text-xs leading-relaxed mb-8 opacity-80">
                    سأقوم بمراجعة جميع الأقسام المكتوبة وتوليد مصفوفة القوة والضعف والفرص.
                  </p>
                  <button className="w-full flex items-center justify-center gap-2 py-4 bg-white text-indigo-700 rounded-2xl text-[13px] font-bold hover:bg-gray-100 transition-all shadow-xl group/btn">
                    توليد التحليل الآن
                    <ChevronLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* New Insights Card */}
              <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                       <Sparkles size={18} />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900">نصيحة استراتيجية</h4>
                 </div>
                 <p className="text-xs font-bold text-gray-500 leading-relaxed italic">
                   "المنافسة في السوق المحلي تزداد، ركز على الميزة التنافسية في قسم وصف الشركة لضمان جذب المستثمرين."
                 </p>
              </div>
            </div>
          )}
        </div>

        {/* Input Area (Only for Chat) */}
        {activeSubTab === 'chat' && (
          <div className="p-4 border-t border-gray-50 bg-white">
            <div className="relative">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اسأل المساعد الذكي..."
                className="w-full pr-4 pl-12 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-primary-300 focus:bg-white transition-all font-bold text-xs"
              />
              <button 
                onClick={handleSend}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-primary-600 text-white rounded-xl shadow-lg hover:bg-primary-700 transition-all active:scale-90"
              >
                <Send size={16} className="rotate-180" />
              </button>
            </div>
          </div>
        )}
      </aside>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}} />
    </>
  );
};
