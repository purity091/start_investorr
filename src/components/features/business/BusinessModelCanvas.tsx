 
import React, { useState, useEffect } from 'react';
import { 
  Users, DollarSign, Zap, Package, Heart, 
  Truck, Key, Settings, ArrowUpRight, 
  Plus, X, HelpCircle, Lightbulb, 
  ChevronRight, ChevronLeft, Save, 
  Info, Sparkles, Download, LayoutGrid,
  Maximize2, Minimize2, Search, Filter, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---

interface Note {
  id: string;
  content: string;
  color: 'yellow' | 'blue' | 'rose' | 'emerald' | 'amber';
}

interface BmcData {
  keyPartners: Note[];
  keyActivities: Note[];
  keyResources: Note[];
  valuePropositions: Note[];
  customerRelationships: Note[];
  channels: Note[];
  customerSegments: Note[];
  costStructure: Note[];
  revenueStreams: Note[];
}

const INITIAL_DATA: BmcData = {
  keyPartners: [],
  keyActivities: [],
  keyResources: [],
  valuePropositions: [],
  customerRelationships: [],
  channels: [],
  customerSegments: [],
  costStructure: [],
  revenueStreams: [],
};

const NOTE_COLORS = {
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  rose: 'bg-rose-100 text-rose-800 border-rose-200',
  emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  amber: 'bg-amber-100 text-amber-800 border-amber-200',
};

// --- Block Metadata ---

const BLOCK_METADATA = {
  keyPartners: {
    title: 'الشركاء الرئيسيون',
    icon: <Key />,
    description: 'الموردون والشركاء الذين يجعلون نموذج العمل يعمل.',
    questions: [
      'من هم شركاؤنا الرئيسيون؟',
      'من هم موردونا الرئيسيون؟',
      'ما هي الموارد الرئيسية التي نحصل عليها من الشركاء؟',
      'ما هي الأنشطة الرئيسية التي يقوم بها الشركاء؟'
    ],
    examples: ['موردي المواد الخام', 'شركات الخدمات اللوجستية', 'المسوقين بالعمولة'],
    color: 'bg-violet-50 text-violet-600',
    indicator: 'bg-violet-500'
  },
  keyActivities: {
    title: 'الأنشطة الرئيسية',
    icon: <Settings />,
    description: 'أهم الأشياء التي يجب على الشركة القيام بها لإنجاح نموذج عملها.',
    questions: [
      'ما هي الأنشطة التي تتطلبها قيمنا المقترحة؟',
      'ما هي قنوات التوزيع لدينا؟',
      'كيف ندير علاقاتنا مع العملاء؟'
    ],
    examples: ['تطوير البرمجيات', 'إدارة سلاسل الإمداد', 'حل المشكلات التقنية'],
    color: 'bg-blue-50 text-blue-600',
    indicator: 'bg-blue-500'
  },
  keyResources: {
    title: 'الموارد الرئيسية',
    icon: <Package />,
    description: 'الأصول المطلوبة لعرض وتقديم العناصر المذكورة سابقاً.',
    questions: [
      'ما هي الموارد التي تتطلبها قيمنا المقترحة؟',
      'الموارد البشرية، الفكرية، المالية، والمادية؟'
    ],
    examples: ['براءات الاختراع', 'فريق المطورين', 'رأس المال الاستثماري'],
    color: 'bg-sky-50 text-sky-600',
    indicator: 'bg-sky-500'
  },
  valuePropositions: {
    title: 'القيمة المقدَّمة',
    icon: <Zap />,
    description: 'مجموعة المنتجات والخدمات التي تخلق قيمة لشريحة محددة من العملاء.',
    questions: [
      'ما هي القيمة التي نقدمها للعميل؟',
      'ما هي المشكلة التي نساعد في حلها؟',
      'ما هي احتياجات العملاء التي نلبيها؟'
    ],
    examples: ['توفير التكاليف', 'سهولة الاستخدام', 'التصميم المتميز'],
    color: 'bg-indigo-50 text-indigo-600',
    indicator: 'bg-indigo-500'
  },
  customerRelationships: {
    title: 'علاقات العملاء',
    icon: <Heart />,
    description: 'أنواع العلاقات التي تقيمها الشركة مع شرائح محددة من العملاء.',
    questions: [
      'ما نوع العلاقة التي تتوقعها كل شريحة من عملائنا؟',
      'كيف يتم دمج هذه العلاقات في نموذج عملنا؟'
    ],
    examples: ['المساعدة الشخصية', 'الخدمات الذاتية', 'المجتمعات عبر الإنترنت'],
    color: 'bg-rose-50 text-rose-600',
    indicator: 'bg-rose-500'
  },
  channels: {
    title: 'قنوات التوصيل',
    icon: <Truck />,
    description: 'كيف تتواصل الشركة مع شرائح عملائها وتصل إليهم لتقديم القيمة.',
    questions: [
      'من خلال أي قنوات يريد عملاؤنا الوصول إليهم؟',
      'كيف نصل إليهم الآن؟ كيف يتم دمج قنواتنا؟'
    ],
    examples: ['الموقع الإلكتروني', 'مواقع التواصل الاجتماعي', 'متاجر التجزئة'],
    color: 'bg-teal-50 text-teal-600',
    indicator: 'bg-teal-500'
  },
  customerSegments: {
    title: 'شرائح العملاء',
    icon: <Users />,
    description: 'المجموعات المختلفة من الأشخاص أو المؤسسات التي تهدف الشركة للوصول إليها.',
    questions: [
      'لمن نخلق القيمة؟',
      'من هم أهم عملائنا؟'
    ],
    examples: ['جيل زد المهتم بالتقنية', 'أصحاب الشركات الصغيرة', 'المستثمرون الأفراد'],
    color: 'bg-emerald-50 text-emerald-600',
    indicator: 'bg-emerald-500'
  },
  costStructure: {
    title: 'هيكل التكاليف',
    icon: <DollarSign />,
    description: 'جميع التكاليف المتكبدة لتشغيل نموذج العمل.',
    questions: [
      'ما هي أهم التكاليف الكامنة في نموذج عملنا؟',
      'ما هي الموارد الرئيسية الأكثر تكلفة؟',
      'ما هي الأنشطة الرئيسية الأكثر تكلفة؟'
    ],
    examples: ['رواتب الموظفين', 'تكاليف السيرفرات', 'ميزانية التسويق'],
    color: 'bg-amber-50 text-amber-600',
    indicator: 'bg-amber-500'
  },
  revenueStreams: {
    title: 'مصادر الإيرادات',
    icon: <DollarSign />,
    description: 'النقد الذي تولده الشركة من كل شريحة من شرائح العملاء.',
    questions: [
      'ما هي القيمة التي يكون عملاؤنا مستعدين حقاً لدفع ثمنها؟',
      'كيف يفضلون الدفع؟ كم تساهم كل قناة في الإيرادات؟'
    ],
    examples: ['الاشتراكات الشهرية', 'رسوم الاستخدام', 'الإعلانات'],
    color: 'bg-emerald-50 text-emerald-600',
    indicator: 'bg-emerald-500'
  }
};

const BLOCK_ORDER: (keyof BmcData)[] = [
  'keyPartners',
  'keyActivities',
  'keyResources',
  'valuePropositions',
  'customerRelationships',
  'channels',
  'customerSegments',
  'costStructure',
  'revenueStreams',
];

// --- Components ---

const StickyNote: React.FC<{
  note: Note;
  onDelete: () => void;
  onUpdate: (content: string) => void;
  onColorChange: (color: Note['color']) => void;
}> = ({ note, onDelete, onUpdate, onColorChange }) => {
  const [isEditing, setIsEditing] = useState(!note.content);
  const [isPriority, setIsPriority] = useState(false);

  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={`relative p-3 rounded-xl shadow-sm border-b-4 mb-3 group transition-all hover:shadow-md ${isPriority ? 'ring-2 ring-amber-400 ring-offset-2' : ''} ${NOTE_COLORS[note.color]}`}
    >
      <div className="flex items-center justify-between mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-1">
          {(['yellow', 'blue', 'rose', 'emerald', 'amber'] as Note['color'][]).map(c => (
            <button
              key={c}
              onClick={() => onColorChange(c)}
              className={`w-2 h-2 rounded-full border border-black/5 ${NOTE_COLORS[c].split(' ')[0]}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsPriority(!isPriority)}
            className={`transition-colors ${isPriority ? 'text-amber-500' : 'text-slate-300 hover:text-amber-400'}`}
          >
            <Star size={12} fill={isPriority ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={onDelete}
            className="text-slate-300 hover:text-rose-500"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {isEditing ? (
        <textarea
          autoFocus
          value={note.content}
          onChange={(e) => onUpdate(e.target.value)}
          onBlur={() => setIsEditing(false)}
          className="w-full bg-transparent border-none focus:ring-0 text-[11px] font-bold resize-none leading-tight min-h-[60px] p-0"
          placeholder="اكتب هنا..."
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="text-[11px] font-bold leading-tight cursor-text break-words min-h-[40px]"
        >
          {note.content || <span className="opacity-30 italic font-medium text-[10px]">اضغط لإضافة تفاصيل استراتيجية...</span>}
        </div>
      )}

      {isPriority && !isEditing && (
        <div className="absolute -top-1 -left-1">
           <span className="flex h-3 w-3">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
           </span>
        </div>
      )}
    </motion.div>
  );
};

const CanvasBlock: React.FC<{
  id: keyof BmcData;
  notes: Note[];
  onAdd: (color: Note['color']) => void;
  onDeleteNote: (noteId: string) => void;
  onUpdateNote: (noteId: string, content: string) => void;
  onUpdateNoteColor: (noteId: string, color: Note['color']) => void;
  isFocused?: boolean;
  onToggleFocus?: () => void;
  className?: string;
}> = ({ id, notes, onAdd, onDeleteNote, onUpdateNote, onUpdateNoteColor, isFocused = false, onToggleFocus, className = '' }) => {
  const meta = BLOCK_METADATA[id];
  const [showGuide, setShowGuide] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(n => n.content.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className={`group relative bg-white flex flex-col p-4 transition-all duration-300 ${isFocused ? 'h-full' : 'hover:shadow-2xl hover:ring-1 hover:ring-slate-200 border border-slate-100 rounded-3xl min-h-[200px]'} overflow-visible ${className}`}>
      {/* Indicator */}
      {!isFocused && <div className={`absolute top-0 right-0 w-1 h-full ${meta.indicator} opacity-10 group-hover:opacity-100 transition-opacity rounded-r-3xl`} />}
      
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${meta.color} shadow-sm shrink-0`}>
            {React.cloneElement(meta.icon as React.ReactElement, { size: 16 })}
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-800 leading-tight">
              {meta.title}
            </h3>
            {isFocused && <p className="text-[10px] font-bold text-slate-400 mt-0.5">{meta.description}</p>}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isFocused && (
            <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 mr-2 ml-4">
              <Search size={12} className="text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="بحث في الملاحظات..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-[10px] font-bold w-32"
              />
            </div>
          )}
          <button 
            onClick={() => setShowGuide(!showGuide)}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${showGuide ? 'bg-indigo-100 text-indigo-600' : 'text-slate-300 hover:text-slate-500 hover:bg-slate-50'}`}
          >
            <HelpCircle size={14} />
          </button>
          <button 
            onClick={onToggleFocus}
            className="w-7 h-7 text-slate-300 hover:text-slate-500 hover:bg-slate-50 rounded-full flex items-center justify-center transition-all"
          >
            {isFocused ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button 
            onClick={() => onAdd('yellow')}
            className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className={`relative flex-1 flex flex-col overflow-y-auto custom-scrollbar pr-1 ${isFocused ? 'px-4' : 'max-h-[400px]'}`}>
        <div className={isFocused ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8' : 'flex flex-col'}>
          <AnimatePresence mode="popLayout">
            {filteredNotes.map(note => (
              <StickyNote
                key={note.id}
                note={note}
                onDelete={() => onDeleteNote(note.id)}
                onUpdate={(content) => onUpdateNote(note.id, content)}
                onColorChange={(color) => onUpdateNoteColor(note.id, color)}
              />
            ))}
          </AnimatePresence>
        </div>
        
        {filteredNotes.length === 0 && !showGuide && (
          <div className="flex-1 flex flex-col items-center justify-center opacity-20 py-8">
            <LayoutGrid size={32} className="text-slate-300 mb-2" />
            <p className="text-[10px] font-bold text-slate-400">
              {searchQuery ? 'لا توجد نتائج للبحث' : 'لا يوجد ملاحظات'}
            </p>
          </div>
        )}

        {/* Guidance Overlay */}
        <AnimatePresence>
          {showGuide && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 p-4 rounded-2xl flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-indigo-600 flex items-center gap-1">
                  <Lightbulb size={12} />
                  دليل القسم
                </span>
                <button onClick={() => setShowGuide(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={14} />
                </button>
              </div>
              <div className="space-y-3 overflow-y-auto">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">أسئلة موجهة:</p>
                  <ul className="space-y-1">
                    {meta.questions.map((q, i) => (
                      <li key={i} className="text-[10px] font-semibold text-slate-600 flex items-start gap-1">
                        <span className="text-indigo-400 mt-1">•</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">أمثلة:</p>
                  <div className="flex flex-wrap gap-1">
                    {meta.examples.map((ex, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-bold italic">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const BusinessModelCanvas: React.FC<{
  onComplete: (data: BmcData) => void;
}> = ({ onComplete }) => {
  const [data, setData] = useState<BmcData>(() => {
    const saved = localStorage.getItem('bmc_data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [focusedBlock, setFocusedBlock] = useState<keyof BmcData | null>(null);

  useEffect(() => {
    localStorage.setItem('bmc_data', JSON.stringify(data));
  }, [data]);

  const addNote = (key: keyof BmcData, color: Note['color']) => {
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      content: '',
      color
    };
    setData(prev => ({
      ...prev,
      [key]: [newNote, ...prev[key]]
    }));
  };

  const deleteNote = (key: keyof BmcData, noteId: string) => {
    setData(prev => ({
      ...prev,
      [key]: prev[key].filter(n => n.id !== noteId)
    }));
  };

  const updateNote = (key: keyof BmcData, noteId: string, content: string) => {
    setData(prev => ({
      ...prev,
      [key]: prev[key].map(n => n.id === noteId ? { ...n, content } : n)
    }));
  };

  const updateNoteColor = (key: keyof BmcData, noteId: string, color: Note['color']) => {
    setData(prev => ({
      ...prev,
      [key]: prev[key].map(n => n.id === noteId ? { ...n, color } : n)
    }));
  };

  const filledBlocks = Object.keys(data).filter(key => data[key as keyof BmcData].length > 0).length;
  const pct = Math.round((filledBlocks / 9) * 100);
  const totalNotes = Object.values(data).reduce((sum, notes) => sum + notes.length, 0);
  const populatedBlocks = BLOCK_ORDER.filter((key) => data[key].length > 0);
  const suggestedFocus: (keyof BmcData)[] = populatedBlocks.length < 2
    ? ['valuePropositions', 'customerSegments']
    : populatedBlocks.length < 5
      ? ['channels', 'customerRelationships']
      : ['costStructure', 'revenueStreams'];

  return (
    <div dir="rtl" className="w-full max-w-[1880px] mx-auto min-h-screen flex flex-col px-3 py-4 md:px-6 md:py-6 xl:px-8 gap-6 xl:gap-8 animate-in fade-in duration-1000">
      
      {/* --- Strategic Header --- */}
      <div className="w-full bg-white border border-slate-200 p-5 md:p-6 xl:p-7 rounded-[2rem] shadow-sm flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 xl:gap-8">

        <div className="flex items-start gap-4 md:gap-5">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
            <LayoutGrid size={32} />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
              <h2 className="text-xl md:text-2xl xl:text-[1.7rem] font-black text-slate-900 tracking-tight">Business Model Canvas</h2>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-full border border-slate-200 uppercase tracking-[0.18em]">Strategic Workspace</span>
            </div>
            <p className="text-sm md:text-[15px] font-bold text-slate-500 leading-relaxed max-w-3xl">مساحة عمل منظمة لرسم عناصر نموذج العمل كاملة، مع توزيع بصري أوضح للمربعات، ومؤشرات تغطية تساعد الفريق على إنهاء النموذج قبل نقله للتنفيذ أو للمراجعة.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4 xl:gap-6">
          <div className="hidden md:flex items-center gap-4 border border-slate-200 rounded-2xl px-4 py-3 bg-slate-50">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em]">تغطية النموذج</span>
                <span className="text-sm font-black text-slate-900">{filledBlocks}/9</span>
              </div>
              <div className="w-40 h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  className="h-full bg-slate-900 rounded-full" 
                />
              </div>
            </div>
            <div className="w-11 h-11 rounded-full border-2 border-slate-200 flex items-center justify-center text-[11px] font-black text-slate-900 bg-white">{pct}%</div>
          </div>

          <div className="flex items-center gap-3">
             <button className="p-3.5 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-slate-900 hover:border-slate-300 transition-all active:scale-95 shadow-sm">
                <Download size={20} />
             </button>
             <button
              onClick={() => onComplete(data)}
              className="flex items-center gap-3 px-5 md:px-6 py-3.5 bg-slate-900 text-white rounded-2xl text-xs font-black shadow-sm hover:bg-slate-800 transition-all active:scale-95 group"
            >
              <Sparkles size={18} className="text-slate-300 group-hover:animate-pulse" />
              تحليل الاستراتيجية بالذكاء الاصطناعي
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 xl:grid xl:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-6 items-start">
        {/* --- Main Canvas Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-5 gap-4 xl:gap-5">
        
        {/* Row 1: The Core 5 Columns */}
        {/* Column 1: Key Partners */}
        <CanvasBlock 
          id="keyPartners" 
          notes={data.keyPartners}
          onAdd={(c) => addNote('keyPartners', c)}
          onDeleteNote={(id) => deleteNote('keyPartners', id)}
          onUpdateNote={(id, ct) => updateNote('keyPartners', id, ct)}
          onUpdateNoteColor={(id, c) => updateNoteColor('keyPartners', id, c)}
          onToggleFocus={() => setFocusedBlock('keyPartners')}
          className="2xl:row-span-2"
        />

        {/* Column 2: Activities & Resources */}
        <div className="lg:row-span-2 flex flex-col gap-4">
          <CanvasBlock 
            id="keyActivities" 
            notes={data.keyActivities}
            onAdd={(c) => addNote('keyActivities', c)}
            onDeleteNote={(id) => deleteNote('keyActivities', id)}
            onUpdateNote={(id, ct) => updateNote('keyActivities', id, ct)}
            onUpdateNoteColor={(id, c) => updateNoteColor('keyActivities', id, c)}
            onToggleFocus={() => setFocusedBlock('keyActivities')}
            className="flex-1"
          />
          <CanvasBlock 
            id="keyResources" 
            notes={data.keyResources}
            onAdd={(c) => addNote('keyResources', c)}
            onDeleteNote={(id) => deleteNote('keyResources', id)}
            onUpdateNote={(id, ct) => updateNote('keyResources', id, ct)}
            onUpdateNoteColor={(id, c) => updateNoteColor('keyResources', id, c)}
            onToggleFocus={() => setFocusedBlock('keyResources')}
            className="flex-1"
          />
        </div>

        {/* Column 3: Value Propositions */}
        <CanvasBlock 
          id="valuePropositions" 
          notes={data.valuePropositions}
          onAdd={(c) => addNote('valuePropositions', c)}
          onDeleteNote={(id) => deleteNote('valuePropositions', id)}
          onUpdateNote={(id, ct) => updateNote('valuePropositions', id, ct)}
          onUpdateNoteColor={(id, c) => updateNoteColor('valuePropositions', id, c)}
          onToggleFocus={() => setFocusedBlock('valuePropositions')}
          className="2xl:row-span-2 border border-slate-300 ring-1 ring-slate-200 shadow-sm"
        />

        {/* Column 4: Relationships & Channels */}
        <div className="lg:row-span-2 flex flex-col gap-4">
          <CanvasBlock 
            id="customerRelationships" 
            notes={data.customerRelationships}
            onAdd={(c) => addNote('customerRelationships', c)}
            onDeleteNote={(id) => deleteNote('customerRelationships', id)}
            onUpdateNote={(id, ct) => updateNote('customerRelationships', id, ct)}
            onUpdateNoteColor={(id, c) => updateNoteColor('customerRelationships', id, c)}
            onToggleFocus={() => setFocusedBlock('customerRelationships')}
            className="flex-1"
          />
          <CanvasBlock 
            id="channels" 
            notes={data.channels}
            onAdd={(c) => addNote('channels', c)}
            onDeleteNote={(id) => deleteNote('channels', id)}
            onUpdateNote={(id, ct) => updateNote('channels', id, ct)}
            onUpdateNoteColor={(id, c) => updateNoteColor('channels', id, c)}
            onToggleFocus={() => setFocusedBlock('channels')}
            className="flex-1"
          />
        </div>

        {/* Column 5: Customer Segments */}
        <CanvasBlock 
          id="customerSegments" 
          notes={data.customerSegments}
          onAdd={(c) => addNote('customerSegments', c)}
          onDeleteNote={(id) => deleteNote('customerSegments', id)}
          onUpdateNote={(id, ct) => updateNote('customerSegments', id, ct)}
          onUpdateNoteColor={(id, c) => updateNoteColor('customerSegments', id, c)}
          onToggleFocus={() => setFocusedBlock('customerSegments')}
          className="2xl:row-span-2"
        />

        {/* Row 2: Bottom Layer - Financials (span 5 columns on large screens) */}
        <div className="2xl:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-5">
          <CanvasBlock 
            id="costStructure" 
            notes={data.costStructure}
            onAdd={(c) => addNote('costStructure', c)}
            onDeleteNote={(id) => deleteNote('costStructure', id)}
            onUpdateNote={(id, ct) => updateNote('costStructure', id, ct)}
            onUpdateNoteColor={(id, c) => updateNoteColor('costStructure', id, c)}
            onToggleFocus={() => setFocusedBlock('costStructure')}
          />
          <CanvasBlock 
            id="revenueStreams" 
            notes={data.revenueStreams}
            onAdd={(c) => addNote('revenueStreams', c)}
            onDeleteNote={(id) => deleteNote('revenueStreams', id)}
            onUpdateNote={(id, ct) => updateNote('revenueStreams', id, ct)}
            onUpdateNoteColor={(id, c) => updateNoteColor('revenueStreams', id, c)}
            onToggleFocus={() => setFocusedBlock('revenueStreams')}
          />
        </div>

        </div>

        <aside className="hidden xl:flex xl:flex-col xl:gap-4 xl:sticky xl:top-6">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] mb-1">???? ????</p>
                <h3 className="text-base font-black text-slate-900">???? ??????? ????</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xs font-black">{pct}%</div>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] mb-1">???? ????</p>
                <p className="text-sm font-black text-slate-900">{filledBlocks} ?? 9</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] mb-1">????? ??????</p>
                <p className="text-sm font-black text-slate-900">{totalNotes} ?????? ???</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] mb-1">?????? ???????? ???????</p>
                <p className="text-sm font-black text-slate-900 leading-relaxed">{BLOCK_METADATA[suggestedFocus[0]].title}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] mb-1">????? ????????</p>
              <h3 className="text-base font-black text-slate-900">??? ????? ??????? ????? ????</h3>
            </div>
            <div className="space-y-2.5">
              {BLOCK_ORDER.map((key) => {
                const hasNotes = data[key].length > 0;
                return (
                  <button
                    key={key}
                    onClick={() => setFocusedBlock(key)}
                    className={`w-full flex items-center justify-between rounded-2xl border px-3.5 py-3 text-right transition-all ${
                      hasNotes
                        ? 'border-slate-200 bg-white hover:bg-slate-50'
                        : 'border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${BLOCK_METADATA[key].color}`}>
                        {React.cloneElement(BLOCK_METADATA[key].icon as React.ReactElement, { size: 14 })}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-black text-slate-900 truncate">{BLOCK_METADATA[key].title}</p>
                        <p className="text-[10px] font-bold text-slate-400">{data[key].length} ?????</p>
                      </div>
                    </div>
                    <span className={`w-2.5 h-2.5 rounded-full ${hasNotes ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] mb-2">?????? ??????</p>
            <ul className="space-y-2.5 text-[11px] font-bold text-slate-600 leading-relaxed">
              {suggestedFocus.map((key) => (
                <li key={key} className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                  ???? ???? ?? {BLOCK_METADATA[key].title} ???? ?????? ???????.
                </li>
              ))}
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                ???? ?? ???? ???????? ????? ????? ???????? ??? ????? ?????.
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* --- Focused Block Overlay --- */}
      <AnimatePresence>
        {focusedBlock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-slate-900/40 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-[3rem] shadow-2xl flex flex-col overflow-hidden"
            >
              <CanvasBlock 
                id={focusedBlock}
                notes={data[focusedBlock]}
                onAdd={(c) => addNote(focusedBlock, c)}
                onDeleteNote={(id) => deleteNote(focusedBlock, id)}
                onUpdateNote={(id, ct) => updateNote(focusedBlock, id, ct)}
                onUpdateNoteColor={(id, c) => updateNoteColor(focusedBlock, id, c)}
                isFocused={true}
                onToggleFocus={() => setFocusedBlock(null)}
                className="flex-1 rounded-none border-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Footer Status --- */}
      <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-4 py-5 bg-slate-50 border border-slate-200 rounded-[1.75rem]">
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">تزامن حيّ نشط</span>
            </div>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-yellow-200" />
                  <span className="text-[10px] font-bold text-slate-400">مسودة</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-rose-200" />
                  <span className="text-[10px] font-bold text-slate-400">تحت الاختبار</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-emerald-200" />
                  <span className="text-[10px] font-bold text-slate-400">مؤكد</span>
               </div>
            </div>
         </div>
         <p className="text-[11px] font-bold text-slate-500 leading-relaxed">نصيحة: ابدأ دائماً بـ "القيمة المقدمة" و "شرائح العملاء" فهما قلب النموذج.</p>
      </div>

      <style>{`
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
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};
