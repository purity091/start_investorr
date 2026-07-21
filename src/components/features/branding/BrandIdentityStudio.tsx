
import React, { useState } from 'react';
import {
  Palette, Sparkles, Type, Image as ImageIcon, Download,
  RefreshCw, Layers, Check, Zap, Layout, CreditCard,
  Target, Wand2, ChevronLeft, SlidersHorizontal, CheckCircle2,
  Smartphone, Monitor, Presentation, Shirt, AppWindow,
  Eye, EyeOff, ClipboardCheck, ArrowUpRight, Briefcase,
  ChevronRight, ArrowLeft
} from 'lucide-react';
import { generateBrandImage } from '../../../services/geminiService';

interface PaletteOption {
  id: string;
  name: string;
  colors: string[];
}

interface BrandIdentityStudioProps {
  setActiveTab?: (tab: string) => void;
  onBrandDraftChange?: (draft: { prompt: string; personality: string; palette: string }) => void;
}

const COLOR_PALETTES: PaletteOption[] = [
  { id: '1', name: 'التقني الحديث (Tech Modern)', colors: ['#0052FF', '#8B5CF6', '#3B82F6', '#F8FAFC'] },
  { id: '2', name: 'الفخامة الهادئة (Quiet Luxury)', colors: ['#0F172A', '#CBD5E1', '#334155', '#F1F5F9'] },
  { id: '3', name: 'الحيوية والنمو (Bio Vitality)', colors: ['#10B981', '#34D399', '#059669', '#F0FDF4'] },
  { id: '4', name: 'الإبداع الجريء (Bold Creative)', colors: ['#EC4899', '#F43F5E', '#8B5CF6', '#FFF1F2'] }
];

const BRAND_PERSONALITIES = [
  { id: 'minimalist', label: 'بسيط (Minimalist)', icon: Target },
  { id: 'luxurious', label: 'فاخر (Luxurious)', icon: Sparkles },
  { id: 'playful', label: 'مبتكر (Playful)', icon: Zap },
  { id: 'traditional', label: 'رصين (Traditional)', icon: Briefcase }
];

export const BrandIdentityStudio: React.FC<BrandIdentityStudioProps> = ({ setActiveTab, onBrandDraftChange }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedPalette, setSelectedPalette] = useState<string>('1');
  const [selectedPersonality, setSelectedPersonality] = useState<string>('minimalist');
  const [generatedLogos, setGeneratedLogos] = useState<string[]>([]);
  const [activeMockup, setActiveMockup] = useState<'logo' | 'mobile' | 'card' | 'website'>('logo');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleGenerateLogo = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const palette = COLOR_PALETTES.find(p => p.id === selectedPalette);
      const personality = BRAND_PERSONALITIES.find(p => p.id === selectedPersonality);
      const stylePrompt = `Logo design for ${prompt}, personality: ${personality?.label}, using colors ${palette?.colors.join(', ')}. Professional, minimalist, high quality, vector style, white background.`;
      const imageUrl = await generateBrandImage(stylePrompt, "professional brand logo");
      setGeneratedLogos(prev => [imageUrl, ...prev]);
      setActiveMockup('logo');
    } catch (err) {
      alert("حدث خطأ أثناء توليد الشعار. يرجى المحاولة لاحقاً.");
    } finally {
      setIsGenerating(false);
    }
  };

  React.useEffect(() => {
    onBrandDraftChange?.({
      prompt,
      personality: selectedPersonality,
      palette: selectedPalette,
    });
  }, [onBrandDraftChange, prompt, selectedPersonality, selectedPalette]);

  return (
    <div dir="rtl" className={`font-['IBM_Plex_Sans_Arabic'] min-h-screen transition-colors duration-700 pb-32 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-[#FAFAF9] text-slate-900'}`}>
      
      {/* Immersive Header - Mobile Optimized */}
      <div className={`px-6 pt-8 pb-10 rounded-b-[3rem] shadow-sm mb-8 ${isDarkMode ? 'bg-slate-900/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="flex flex-col items-center gap-4 relative w-full">
             <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl transition-transform hover:rotate-12 ${isDarkMode ? 'bg-indigo-600 text-white' : 'bg-[#0052FF] text-white shadow-blue-200'}`}>
                <Palette size={32} strokeWidth={2.5} />
             </div>
             <div>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border mb-3 inline-block ${isDarkMode ? 'bg-white/5 border-white/10 text-indigo-400' : 'bg-blue-50 border-blue-100 text-[#0052FF]'}`}>Studio Engine v5.0</span>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">استوديو <span className={isDarkMode ? 'text-indigo-400' : 'text-[#0052FF]'}>الهوية البصرية</span></h1>
             </div>
          </div>
          <p className={`text-sm font-bold max-w-sm leading-relaxed px-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
             نحن لا نصمم شعارات، بل نبني روحاً بصرية لمشروعك تتحدث لغة التميز والابتكار التنافسي.
          </p>

          <div className="flex items-center gap-4 w-full justify-center mt-2">
             <button 
               onClick={() => setIsDarkMode(!isDarkMode)}
               className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white shadow-lg'}`}
             >
                {isDarkMode ? <Eye size={20} /> : <EyeOff size={20} />}
             </button>
             <div className={`px-6 py-3 rounded-2xl border flex items-center gap-6 shadow-sm ${isDarkMode ? 'bg-slate-900/50 border-white/10' : 'bg-white border-slate-100'}`}>
                <div className="text-center">
                   <div className="text-lg font-black leading-none mb-1">94%</div>
                   <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">اتساق</div>
                </div>
                <div className="w-px h-6 bg-slate-200"></div>
                <div className="text-center">
                   <div className="text-lg font-black leading-none mb-1">1.2k+</div>
                   <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">هوية</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="px-6 max-w-7xl mx-auto space-y-8">
        
        {/* Main Interface: Order Stacked for Mobile */}
        
        {/* 1. Viewport (The Result) - Moved Up for Mobile focus */}
        <div className={`rounded-[2.5rem] min-h-[450px] border flex flex-col relative overflow-hidden transition-all duration-1000 ${isDarkMode ? 'bg-slate-900/50 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
           
           {/* Mockup Switcher - Scrollable on Mobile */}
           <div className="absolute top-6 inset-x-4 z-30 flex items-center justify-center">
              <div className={`flex items-center gap-1.5 p-1.5 rounded-2xl border ${isDarkMode ? 'bg-slate-950/80 border-white/10 backdrop-blur-xl' : 'bg-white/80 border-slate-100 backdrop-blur-xl'}`}>
                 <MockupModeBtn active={activeMockup === 'logo'} onClick={() => setActiveMockup('logo')} icon={<ImageIcon size={16} />} label="شعار" darkMode={isDarkMode} />
                 <MockupModeBtn active={activeMockup === 'mobile'} onClick={() => setActiveMockup('mobile')} icon={<Smartphone size={16} />} label="تطبيق" darkMode={isDarkMode} />
                 <MockupModeBtn active={activeMockup === 'card'} onClick={() => setActiveMockup('card')} icon={<CreditCard size={16} />} label="بزنس" darkMode={isDarkMode} />
              </div>
           </div>

           {/* Main Content Render */}
           <div className="flex-1 flex items-center justify-center p-6 pt-24 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none ${isDarkMode ? 'bg-indigo-400' : 'bg-[#0052FF]'}`}></div>
              <div className={`absolute bottom-0 left-0 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none ${isDarkMode ? 'bg-violet-400' : 'bg-indigo-400'}`}></div>

              {generatedLogos.length === 0 ? (
                <div className="text-center animate-in zoom-in-95 duration-1000">
                   <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 mx-auto ${isDarkMode ? 'bg-white/5 text-white/20' : 'bg-slate-50 text-slate-200'}`}>
                      <ImageIcon size={40} strokeWidth={1.5} />
                   </div>
                   <h3 className={`text-xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>بانتظار الإبداع...</h3>
                   <p className="text-slate-400 font-bold text-xs max-w-[240px] mx-auto leading-relaxed">
                      ابدأ بوصف رؤيتك لاختيار ملامح العلامة وتجسيدها هنا.
                   </p>
                </div>
              ) : (
                 <div className="w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-500">
                    {activeMockup === 'logo' && (
                      <div className="flex flex-col items-center">
                         <div className={`relative p-8 rounded-[3rem] group ${isDarkMode ? 'bg-white' : 'bg-slate-50 border border-slate-100 shadow-inner'}`}>
                            <img src={generatedLogos[0]} className="w-48 h-48 object-contain" alt="AI Generated Logo" />
                            <button className={`absolute bottom-4 left-4 p-3 rounded-2xl shadow-xl bg-slate-950 text-white`}>
                               <Download size={18} />
                            </button>
                         </div>
                      </div>
                    )}

                    {activeMockup === 'mobile' && (
                      <div className="relative w-56 h-[420px] mx-auto bg-slate-950 border-[4px] border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden">
                         <div className="absolute top-0 inset-x-0 h-5 bg-slate-950 flex justify-center z-20"><div className="w-16 h-3 bg-slate-800 rounded-b-lg"></div></div>
                         <div className="h-full bg-white p-5 flex flex-col items-center justify-center relative">
                            <img src={generatedLogos[0]} className="w-24 h-24 object-contain mb-6" alt="Identity" />
                            <div className="w-full h-6 bg-slate-100 rounded-md mb-3"></div>
                            <div className="w-full h-16 bg-slate-50 rounded-xl mb-3 border border-slate-100"></div>
                            <div className="grid grid-cols-2 gap-3 w-full">
                               <div className="h-12 bg-slate-50 rounded-lg border border-slate-100"></div>
                               <div className="h-12 bg-slate-50 rounded-lg border border-slate-100"></div>
                            </div>
                            <div className="mt-8 w-full h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white text-[8px] font-black uppercase">Start Journey</div>
                         </div>
                      </div>
                    )}

                    {activeMockup === 'card' && (
                      <div className="flex flex-col gap-6 items-center scale-90 sm:scale-100">
                         <div className="w-full aspect-[1.6/1] max-w-[320px] bg-slate-950 rounded-2xl shadow-xl p-6 flex flex-col justify-between relative overflow-hidden text-white">
                            <img src={generatedLogos[0]} className="w-16 h-16 object-contain brightness-0 invert opacity-90" alt="Logo" />
                            <div>
                               <div className="text-base font-black mb-0.5">اسم المؤسس</div>
                               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Co-Founder & CEO</div>
                            </div>
                         </div>
                         <div className="w-full aspect-[1.6/1] max-w-[320px] bg-white rounded-2xl shadow-xl p-6 flex items-center justify-center border border-slate-100">
                            <img src={generatedLogos[0]} className="w-28 h-28 object-contain" alt="Logo" />
                         </div>
                      </div>
                    )}
                 </div>
              )}
           </div>

           {/* Info Ribbon - Mobile labels increased */}
           <div className={`py-5 px-6 border-t ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50/50 border-slate-50'}`}>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[8px] font-black uppercase tracking-widest text-slate-400 mb-4">
                 <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div> Vector</div>
                 <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div> 300 DPI</div>
                 <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div> Psycho-Match</div>
              </div>
              {generatedLogos.length > 0 && (
                <button className={`w-full py-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-lg ${isDarkMode ? 'bg-white text-slate-900' : 'bg-slate-950 text-white'}`}>
                   <span>تحميل باقة الهوية الكاملة</span>
                   <ArrowUpRight size={14} />
                </button>
              )}
           </div>
        </div>

        {/* 2. Controls Section */}
        <div className="space-y-6">
           
           {/* Brief Card */}
           <div className={`rounded-[2.5rem] p-8 border ${isDarkMode ? 'bg-slate-900/30 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
              <div className="flex items-center gap-3 mb-6">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-indigo-600/20 text-indigo-400' : 'bg-blue-50 text-[#0052FF]'}`}>
                    <Target size={20} />
                 </div>
                 <h4 className="text-lg font-black italic">جوهر العلامة</h4>
              </div>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="صف روح علامتك التجارية... (مثال: تطبيق عقاري فندقي فاخر يهتم بالأمان والخصوصية)"
                className={`w-full h-32 p-5 rounded-2xl outline-none border transition-all text-sm font-bold resize-none ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-indigo-400/50' : 'bg-slate-50 border-slate-200 focus:bg-white focus:border-[#0052FF]/50 shadow-inner'}`}
              />
           </div>

           {/* Personality Selector */}
           <div className={`rounded-[2.5rem] p-8 border ${isDarkMode ? 'bg-slate-900/30 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 text-center">طابع الشخصية البصرية</h4>
              <div className="grid grid-cols-2 gap-4">
                 {BRAND_PERSONALITIES.map(p => (
                   <button 
                     key={p.id}
                     onClick={() => setSelectedPersonality(p.id)}
                     className={`p-5 rounded-2xl border text-center transition-all group flex flex-col items-center gap-2 ${selectedPersonality === p.id 
                       ? (isDarkMode ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-900 text-white')
                       : (isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100')}`}
                   >
                      <p.icon size={26} className={selectedPersonality === p.id ? 'text-white' : 'text-slate-400'} />
                      <span className="text-xs font-black uppercase text-right leading-none truncate w-full text-center">{p.label.split(' ')[0]}</span>
                   </button>
                 ))}
              </div>
           </div>

           {/* Palette Selection */}
           <div className={`rounded-[2.5rem] p-8 border ${isDarkMode ? 'bg-slate-900/30 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 text-center">سيكولوجية الألوان</h4>
              <div className="space-y-4">
                 {COLOR_PALETTES.map(p => (
                   <button 
                     key={p.id}
                     onClick={() => setSelectedPalette(p.id)}
                     className={`w-full p-5 rounded-2xl border flex items-center justify-between transition-all ${selectedPalette === p.id 
                       ? (isDarkMode ? 'bg-white/10 border-white/20' : 'bg-white border-slate-900 shadow-lg scale-[1.02]')
                       : (isDarkMode ? 'bg-transparent border-white/5' : 'bg-slate-50 border-slate-50')}`}
                   >
                      <span className="text-xs font-black">{p.name.split(' (')[0]}</span>
                      <div className="flex -space-x-2">
                         {p.colors.map((c, i) => <div key={i} className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: c, zIndex: 10 - i }}></div>)}
                      </div>
                   </button>
                 ))}
              </div>
           </div>

           {/* Action CTA - Large and Primary */}
           <button 
             onClick={handleGenerateLogo}
             disabled={isGenerating || !prompt}
             className={`w-full py-7 rounded-[2.5rem] text-sm font-black shadow-2xl transition-all flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-50 ${isDarkMode ? 'bg-indigo-600 text-white shadow-indigo-900/50' : 'bg-[#0052FF] text-white shadow-blue-200'}`}
           >
              {isGenerating ? <RefreshCw className="animate-spin" size={24} /> : <Wand2 size={24} className="group-hover:rotate-12" /> }
              <span>توليد الهوية البصرية الذكية</span>
           </button>
        </div>

        {/* 3. Typography Studio */}
        <div className={`rounded-[2.5rem] p-6 sm:p-10 border flex flex-col items-center gap-6 sm:gap-8 ${isDarkMode ? 'bg-slate-900/30 border-white/5 text-white' : 'bg-white border-slate-100 shadow-sm text-slate-900'}`}>
           <div className="text-center">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-sm ${isDarkMode ? 'bg-indigo-600/20 text-indigo-400' : 'bg-blue-50 text-[#0052FF]'}`}><Type size={28} /></div>
              <h4 className="text-2xl font-black mb-3">استوديو الخطوط</h4>
              <p className="text-xs font-bold text-slate-400 max-w-xs leading-relaxed mx-auto">
                 حلول تيبوغرافية متقدمة تضمن الهوية البصرية الفاخرة لعلامتك.
              </p>
           </div>
           <div className="space-y-6 w-full mt-4">
              <FontPreview name="IBM Plex Sans Arabic" sample="النموذج الرئيسي للعنوان" isPrimary={true} darkMode={isDarkMode} />
              <FontPreview name="Readex Pro" sample="النص التفصيلي للمحتوى والفقرات" isPrimary={false} darkMode={isDarkMode} />
           </div>
        </div>
      </div>
    </div>
  );
};

const MockupModeBtn = ({ active, onClick, icon, label, darkMode }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, darkMode: boolean }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2.5 rounded-xl text-[11px] font-black flex items-center gap-2 transition-all shrink-0 ${active 
      ? (darkMode ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900 text-white shadow-lg') 
      : (darkMode ? 'text-slate-500' : 'text-slate-400')}`}
  >
     {icon}
     <span className="uppercase tracking-widest">{label}</span>
  </button>
);

const FontPreview = ({ name, sample, isPrimary, darkMode }: { name: string, sample: string, isPrimary: boolean, darkMode: boolean }) => (
  <div className={`p-4 sm:p-6 rounded-[1.8rem] border flex flex-col gap-2 transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100 hover:bg-white'}`}>
     <div className="flex items-center justify-between">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{name}</span>
        {isPrimary && <span className={`text-[9px] font-black px-3 py-1 rounded-full ${darkMode ? 'bg-indigo-600/20 text-indigo-400' : 'bg-blue-50 text-[#0052FF]'}`}>Primary</span>}
     </div>
     <div className="text-lg sm:text-xl font-black truncate mt-1">{sample}</div>
  </div>
);
