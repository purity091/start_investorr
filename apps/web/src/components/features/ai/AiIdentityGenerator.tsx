
import React, { useState } from 'react';
import { Sparkles, Palette, Download, RefreshCw, Wand2, Image as ImageIcon, Layout, CreditCard } from 'lucide-react';
import { generateBrandImage } from '../../../services/geminiService';

interface GeneratedAsset {
  id: string;
  type: string;
  url: string;
}

export const AiIdentityGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Modern Minimalist');
  const [assets, setAssets] = useState<GeneratedAsset[]>([]);

  const handleGenerate = async (type: string) => {
    setIsGenerating(true);
    try {
      const imageUrl = await generateBrandImage(`${type} for a company named test2, ${prompt}`, style);
      const newAsset = {
        id: Date.now().toString(),
        type,
        url: imageUrl
      };
      setAssets(prev => [newAsset, ...prev]);
    } catch (err) {
      alert("حدث خطأ أثناء التوليد. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsGenerating(false);
    }
  };

  const styles = ['Modern Minimalist', 'Luxury Corporate', 'Tech Futuristic', 'Traditional Elegant'];

  return (
    <div className="space-y-10 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">وصف الرؤية البصرية</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="مثلاً: شركة تقنية مالية تركز على الأمان والبساطة بألوان زرقاء ملكية..."
              className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:ring-4 focus:ring-purple-50 focus:border-purple-200 outline-none transition-all text-sm font-medium min-h-[120px] resize-none"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">نمط التصميم</label>
            <div className="grid grid-cols-2 gap-2">
              {styles.map(s => (
                <button 
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`p-3 rounded-xl text-[11px] font-bold border transition-all ${
                    style === s ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-100' : 'bg-white text-gray-500 border-gray-100 hover:border-purple-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-50 flex flex-col gap-3">
             <button 
              onClick={() => handleGenerate('Logo Design')}
              disabled={isGenerating || !prompt}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl text-xs font-bold shadow-xl shadow-purple-100 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
             >
                {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Palette size={16} />}
                توليد شعار احترافي
             </button>
             
             <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleGenerate('Business Card')}
                  disabled={isGenerating || !prompt}
                  className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-100 text-gray-700 rounded-xl text-[11px] font-bold hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  <CreditCard size={14} />
                  بطاقة عمل
                </button>
                <button 
                  onClick={() => handleGenerate('Social Media Pack')}
                  disabled={isGenerating || !prompt}
                  className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-100 text-gray-700 rounded-xl text-[11px] font-bold hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  <Layout size={14} />
                  محتوى ترويجي
                </button>
             </div>
          </div>
        </div>

        {/* Display Section */}
        <div className="lg:col-span-2">
          {assets.length === 0 ? (
            <div className="h-full min-h-[400px] border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12 bg-gray-50/30">
               <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-purple-200 mb-6">
                  <Wand2 size={40} />
               </div>
               <h4 className="text-gray-900 font-bold text-lg mb-2">استوديو الهوية الذكي</h4>
               <p className="text-gray-400 text-sm font-medium max-w-sm">صف رؤيتك في المربع الجانبي وابدأ بتوليد أول أصول هويتك البصرية بلمسة واحدة.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {assets.map(asset => (
                 <div key={asset.id} className="group relative bg-white rounded-[2rem] border border-gray-100 p-3 shadow-sm hover:shadow-xl transition-all overflow-hidden animate-in fade-in zoom-in duration-500">
                    <div className="aspect-square rounded-[1.5rem] overflow-hidden bg-gray-50">
                       <img src={asset.url} alt={asset.type} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 flex items-center justify-between">
                       <div>
                          <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">{asset.type}</p>
                          <p className="text-xs font-bold text-gray-800">توليد تلقائي ذكي</p>
                       </div>
                       <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all">
                          <Download size={18} />
                       </button>
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
