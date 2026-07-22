import React, { useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Download,
  FileCode,
  FileText,
  Presentation,
  Settings2,
  Sparkles,
} from 'lucide-react';
import { useProjectWorkspace } from '../../features/workspace/ProjectWorkspaceContext';
import { exportElementToPdf } from '../../utils/pdfExport';
import { slugifyReportName } from '../../utils/reportDownloads';

interface Template {
  id: string;
  name: string;
  type: 'PDF' | 'PPTX' | 'DOCX';
  category: 'Investor' | 'Bank' | 'Lean';
  image: string;
  description: string;
  promise: string;
}

type SectionKey = 'summary' | 'financials' | 'marketing' | 'swot';

const TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'النموذج الاستثماري التقني',
    type: 'PDF',
    category: 'Investor',
    image: '/investor_template_mockup_1775307219319.png',
    description: 'نسخة مهيأة لمشاركة المستثمرين وصناديق التمويل مع سرد واضح للفرصة.',
    promise: 'يركز على الجاذبية الاستثمارية، الجاهزية، وخارطة التنفيذ.',
  },
  {
    id: '2',
    name: 'القالب الرسمي للجهات التمويلية',
    type: 'PDF',
    category: 'Bank',
    image: '/bank_template_mockup_1775307234164.png',
    description: 'تنسيق أكثر رسمية يبرز الجوانب التشغيلية والالتزام والانضباط.',
    promise: 'مناسب للمراجعات الرسمية والائتمانية واجتماعات الشركاء.',
  },
  {
    id: '3',
    name: 'عرض القرار التنفيذي',
    type: 'PPTX',
    category: 'Investor',
    image: '/pitch_deck_mockup_1775307247127.png',
    description: 'قالب موجز يختصر المشروع في رسائل قرار سريعة وواضحة.',
    promise: 'يبرز الرسائل العليا والنقاط التي تحرك قرار الاجتماع الأول.',
  },
  {
    id: '4',
    name: 'تقرير المتابعة التشغيلية',
    type: 'DOCX',
    category: 'Lean',
    image: '/annual_report_mockup_1775307267245.png',
    description: 'نسخة متابعة داخلية تربط بين الخطة، التنفيذ، والمهام القادمة.',
    promise: 'مصمم للمراجعات الداخلية الأسبوعية ومتابعة التقدم الفعلي.',
  },
];

const SECTION_LABELS: Record<SectionKey, string> = {
  summary: 'الملخص التنفيذي',
  financials: 'المؤشرات والجاهزية',
  marketing: 'الموقع السوقي والتنفيذ',
  swot: 'المخاطر ونقاط القرار',
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('ar', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);

const sectionTone: Record<SectionKey, string> = {
  summary: 'منظور القرار',
  financials: 'جاهزية رقمية',
  marketing: 'حركة السوق',
  swot: 'انتباه إداري',
};

export const ExportTemplates: React.FC = () => {
  const { workspace } = useProjectWorkspace();
  const reportRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState('1');
  const [brandColor, setBrandColor] = useState('#2563eb');
  const [sections, setSections] = useState<Record<SectionKey, boolean>>({
    summary: true,
    financials: true,
    marketing: true,
    swot: true,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGeneratedName, setLastGeneratedName] = useState<string | null>(null);

  const selectedTemplate = useMemo(
    () => TEMPLATES.find((template) => template.id === selectedId) ?? TEMPLATES[0],
    [selectedId],
  );

  const toggleSection = (key: SectionKey) =>
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const allTasks = useMemo(
    () => [...workspace.execution.autoTasks, ...workspace.execution.firstCustomerSprint],
    [workspace.execution.autoTasks, workspace.execution.firstCustomerSprint],
  );

  const completedTasks = allTasks.filter((task) => task.status === 'completed').length;
  const completedChecklistItems = workspace.execution.checklists
    .flatMap((group) => group.items)
    .filter((item) => item.done).length;
  const totalChecklistItems = workspace.execution.checklists.flatMap((group) => group.items).length;
  const completedSections = workspace.planSections.filter((section) => section.isCompleted).length;
  const selectedSectionCount = Object.values(sections).filter(Boolean).length;

  const includedSectionEntries = useMemo(() => {
    const fallbackSummary =
      workspace.planSections
        .filter((section) => section.content?.trim())
        .slice(0, 3)
        .map((section) => `${section.title}: ${section.content.trim().slice(0, 280)}`)
        .join('\n\n') || 'لم يتم إدخال أقسام تفصيلية كافية بعد، لكن الجاهزية العامة والمهام الحالية مرفقة داخل التقرير.';

    const summaryContent = `اسم المشروع: ${workspace.profile.name || 'مشروع جديد'}\nالقطاع: ${
      workspace.profile.sectorLabel || 'غير محدد'
    }\nالمرحلة الحالية: ${workspace.currentStage}\nقرار المتابعة: ${workspace.decision.status}\n\n${fallbackSummary}`;

    const financialContent = `درجة الجاهزية: ${workspace.metrics.readinessScore}%\nاكتمال الخطة: ${completedSections}/${Math.max(
      workspace.planSections.length,
      1,
    )}\nاكتمال التنفيذ: ${completedTasks}/${Math.max(allTasks.length, 1)}\nاكتمال الجاهزية التشغيلية: ${completedChecklistItems}/${Math.max(
      totalChecklistItems,
      1,
    )}\n\nالهدف هنا هو قياس الاقتراب من قرار تنفيذ أو تمويل حقيقي.`;

    const marketingContent =
      workspace.execution.weeklyPriorities.map((item, index) => `${index + 1}. ${item.title}`).join('\n') ||
      'لا توجد أولويات تشغيلية مسجلة بعد.';

    const swotContent =
      workspace.execution.bottlenecks.join('\n') ||
      'لا توجد معوقات مسجلة حالياً، لكن يوصى بمراجعة الفرضيات السوقية ومخاطر التنفيذ.';

    const map: Record<SectionKey, { title: string; content: string }> = {
      summary: { title: SECTION_LABELS.summary, content: summaryContent },
      financials: { title: SECTION_LABELS.financials, content: financialContent },
      marketing: { title: SECTION_LABELS.marketing, content: marketingContent },
      swot: { title: SECTION_LABELS.swot, content: swotContent },
    };

    return (Object.entries(sections) as Array<[SectionKey, boolean]>)
      .filter(([, enabled]) => enabled)
      .map(([key]) => ({ key, ...map[key] }));
  }, [
    allTasks.length,
    completedChecklistItems,
    completedSections,
    completedTasks,
    sections,
    totalChecklistItems,
    workspace.currentStage,
    workspace.decision.status,
    workspace.execution.bottlenecks,
    workspace.execution.weeklyPriorities,
    workspace.metrics.readinessScore,
    workspace.planSections,
    workspace.profile.name,
    workspace.profile.sectorLabel,
  ]);

  const fileBaseName = useMemo(() => {
    const projectName = workspace.profile.name || 'strategic-project';
    return (
      slugifyReportName(`${projectName}-${selectedTemplate.name}-${new Date().toISOString().slice(0, 10)}`) ||
      'strategic-report'
    );
  }, [selectedTemplate.name, workspace.profile.name]);

  const generatedAt = useMemo(() => formatDate(new Date()), []);

  const downloadReport = async () => {
    if (!reportRef.current) return;

    setIsGenerating(true);

    try {
      await exportElementToPdf({
        element: reportRef.current,
        fileName: `${fileBaseName}.pdf`,
      });

      setLastGeneratedName(`${fileBaseName}.pdf`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div
        dir="rtl"
        className="min-h-[calc(100vh-100px)] bg-[#F8FAFC] font-['IBM_Plex_Sans_Arabic'] text-slate-900 animate-in fade-in duration-700 flex flex-col lg:flex-row shadow-inner relative overflow-hidden"
      >
        <aside className="w-full lg:w-80 bg-white border-l border-slate-100 flex flex-col shrink-0 z-10 shadow-sm">
          <div className="p-6 lg:p-7 border-b border-slate-50">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center border border-blue-100">
                <Settings2 size={16} />
              </div>
              <h2 className="text-md font-black text-slate-950">تخصيص التصدير</h2>
            </div>

            <div className="rounded-[1.5rem] border border-blue-100 bg-blue-50/70 p-4 mb-6">
              <p className="text-[11px] font-black text-blue-900">ماذا سيخرج داخل PDF؟</p>
              <p className="mt-2 text-[12px] font-bold leading-6 text-blue-800">
                الملف الآن لا يكتفي بملخص سريع، بل يجمع أقسام الخطة، الجاهزية، القوائم التشغيلية،
                مؤشرات القرار، الأولويات، العوائق، وخطوات الوصول لأول عميل.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                لون الهوية
              </label>
              <div className="flex flex-wrap gap-2">
                {['#2563eb', '#7c3aed', '#059669', '#dc2626', '#1e293b'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setBrandColor(color)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      brandColor === color ? 'border-slate-900 scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                أقسام الملخص الافتتاحي
              </label>
              {(Object.keys(sections) as SectionKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => toggleSection(key)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${
                    sections[key]
                      ? 'bg-blue-50 border-blue-100 text-blue-900'
                      : 'bg-transparent border-transparent text-slate-400'
                  }`}
                >
                  <span className="text-[12px] font-black">{SECTION_LABELS[key]}</span>
                  <div className={`w-8 h-4 rounded-full relative ${sections[key] ? 'bg-blue-600' : 'bg-slate-200'}`}>
                    <div
                      className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${
                        sections[key] ? 'left-0.5' : 'left-4.5'
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 border-b border-slate-100 space-y-3">
            <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-700">
                  PDF فعلي
                </span>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">{workspace.profile.name || 'مشروع جديد'}</p>
                  <p className="mt-1 text-[11px] font-bold text-slate-500">
                    {workspace.profile.sectorLabel || 'غير محدد'} • جاهزية {workspace.metrics.readinessScore}%
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white border border-slate-100 p-3 text-right">
                  <p className="text-[10px] font-black text-slate-400">الأقسام</p>
                  <p className="mt-1 text-lg font-black text-slate-900">{selectedSectionCount}</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-100 p-3 text-right">
                  <p className="text-[10px] font-black text-slate-400">المهام</p>
                  <p className="mt-1 text-lg font-black text-slate-900">
                    {completedTasks}/{Math.max(allTasks.length, 1)}
                  </p>
                </div>
              </div>
            </div>

            {lastGeneratedName && (
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-right">
                <p className="text-[11px] font-black text-emerald-800">تم تجهيز الملف بنجاح</p>
                <p className="mt-1 text-[11px] font-bold text-emerald-700">{lastGeneratedName}</p>
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-50/50 mt-auto">
            <button
              onClick={downloadReport}
              disabled={isGenerating}
              className="w-full py-3.5 bg-slate-950 text-white rounded-xl font-black text-xs shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
              {isGenerating ? 'جاري توليد ملف PDF...' : 'تحميل التقرير التنفيذي PDF'}
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto no-scrollbar p-6 lg:p-8">
          <header className="mb-6">
            <h2 className="text-xl lg:text-2xl font-black text-slate-950 mb-1 tracking-tight">
              استوديو القوالب <span className="text-blue-600">الاحترافية</span>
            </h2>
            <p className="text-slate-500 font-bold text-[12px]">
              التصدير الآن يولد PDF حقيقي مبني على بيانات المشروع الحالية وليس ملفاً مختصراً أو شكلياً.
            </p>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.1fr)_380px] gap-6 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedId(template.id)}
                  className={`group relative bg-white border rounded-[1.5rem] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    selectedId === template.id ? 'border-blue-600 ring-4 ring-blue-50' : 'border-slate-100'
                  }`}
                >
                  <div className="aspect-[16/10] bg-slate-50 overflow-hidden relative">
                    <img
                      src={template.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg border border-white/50 shadow-sm flex items-center gap-2">
                      {template.type === 'PDF' && <FileText size={10} className="text-rose-500" />}
                      {template.type === 'PPTX' && <Presentation size={10} className="text-amber-500" />}
                      {template.type === 'DOCX' && <FileCode size={10} className="text-emerald-500" />}
                      <span className="text-[8px] font-black text-slate-700">{template.type}</span>
                    </div>
                    {selectedId === template.id && (
                      <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-[1px] flex items-center justify-center">
                        <Check size={32} className="text-blue-600 animate-in zoom-in" strokeWidth={4} />
                      </div>
                    )}
                  </div>
                  <div className="p-5 text-right">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[8px] font-black bg-slate-50 text-slate-500 px-2 py-1 rounded-md border">
                        {template.category}
                      </span>
                      <h3 className="text-md font-black text-slate-900">{template.name}</h3>
                    </div>
                    <p className="text-slate-500 text-[11px] font-bold leading-6">{template.description}</p>
                    <p className="mt-3 text-blue-700 text-[11px] font-black leading-6">{template.promise}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <section className="surface-card p-5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-700">
                    Preview
                  </span>
                  <h3 className="text-sm font-black text-slate-950">ماذا سيظهر داخل التقرير؟</h3>
                </div>
                <div className="space-y-3">
                  {includedSectionEntries.map((entry) => (
                    <div key={entry.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-right">
                      <p className="text-sm font-black text-slate-900">{entry.title}</p>
                      <p className="mt-2 text-[11px] font-bold leading-6 text-slate-500">
                        {entry.content.slice(0, 160)}
                        {entry.content.length > 160 ? '...' : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="surface-card p-5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <Sparkles size={16} className="text-blue-600" />
                  <h3 className="text-sm font-black text-slate-950">القيمة الحقيقية للملف</h3>
                </div>
                <div className="space-y-3">
                  {[
                    'يغطي أقسام الخطة المكتوبة وليس فقط عنوان المشروع.',
                    'يشمل القوائم التشغيلية والمهام والـ KPI والتوصيات.',
                    'ينزل كملف PDF فعلي جاهز للمشاركة مع الشركاء والمستثمرين.',
                    'يحافظ على التصميم العربي داخل الملف النهائي.',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <p className="text-[12px] font-bold leading-6 text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 duration-700">
          <div className="bg-slate-900/90 backdrop-blur-xl text-white px-3 py-2.5 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10 ring-1 ring-slate-800">
            <div className="w-9 h-9 bg-white/10 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-inner">
              <img src={selectedTemplate.image} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[7px] font-black text-blue-400 uppercase tracking-widest">القالب النشط</span>
              <h4 className="text-[11px] font-black text-white truncate max-w-[180px]">{selectedTemplate.name}</h4>
            </div>
            <div className="w-[1px] h-6 bg-white/10 mx-1" />
            <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-all font-black text-[10px] whitespace-nowrap">
              جاهز الآن
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>

      <div className="fixed left-[-99999px] top-0 z-[-1] w-[1240px] bg-white p-8 text-slate-900" aria-hidden="true">
        <div ref={reportRef} dir="rtl" className="bg-white">
          <section className="rounded-[32px] border border-slate-200 p-8" style={{ borderTop: `8px solid ${brandColor}` }}>
            <div className="flex items-start justify-between gap-6">
              <div className="text-right">
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[12px] font-black text-slate-600">
                  تقرير جاهز للمشاركة • {generatedAt}
                </span>
                <h1 className="mt-5 text-4xl font-black text-slate-950">{selectedTemplate.name}</h1>
                <p className="mt-3 text-base font-bold leading-8 text-slate-600">
                  {workspace.profile.name || 'مشروع جديد'} • {workspace.profile.sectorLabel || 'غير محدد'} •{' '}
                  {workspace.currentStage}
                </p>
                <p className="mt-4 max-w-[760px] text-[14px] leading-8 text-slate-600">
                  هذا التقرير يجمع كل المعلومات الأساسية الموجودة في الخطة الحالية: الملخص التنفيذي، مؤشرات
                  الجاهزية، كامل الأقسام المكتوبة، الأولويات، القوائم التشغيلية، التوصيات، وخطوات التنفيذ
                  القريبة.
                </p>
              </div>
              <div className="grid min-w-[300px] grid-cols-2 gap-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-right">
                  <p className="text-[11px] font-black text-slate-400">جاهزية القرار</p>
                  <p className="mt-2 text-3xl font-black text-slate-950">{workspace.metrics.readinessScore}%</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-right">
                  <p className="text-[11px] font-black text-slate-400">الأقسام المكتملة</p>
                  <p className="mt-2 text-3xl font-black text-slate-950">
                    {completedSections}/{Math.max(workspace.planSections.length, 1)}
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-right">
                  <p className="text-[11px] font-black text-slate-400">المهام المنجزة</p>
                  <p className="mt-2 text-3xl font-black text-slate-950">
                    {completedTasks}/{Math.max(allTasks.length, 1)}
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-right">
                  <p className="text-[11px] font-black text-slate-400">الجاهزية التشغيلية</p>
                  <p className="mt-2 text-3xl font-black text-slate-950">
                    {completedChecklistItems}/{Math.max(totalChecklistItems, 1)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 grid grid-cols-2 gap-5">
            {includedSectionEntries.map((entry) => (
              <article key={entry.title} className="rounded-[28px] border border-slate-200 p-6 text-right">
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-black text-white"
                    style={{ backgroundColor: brandColor }}
                  >
                    {sectionTone[entry.key]}
                  </span>
                  <h2 className="text-xl font-black text-slate-950">{entry.title}</h2>
                </div>
                <p className="whitespace-pre-wrap text-[14px] leading-8 text-slate-600">{entry.content}</p>
              </article>
            ))}
          </section>

          <section className="mt-6 rounded-[28px] border border-slate-200 p-6 text-right">
            <h2 className="text-2xl font-black text-slate-950">كامل أقسام الخطة</h2>
            <div className="mt-5 space-y-4">
              {workspace.planSections.map((section) => (
                <article key={section.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-black text-slate-500">
                      {section.isCompleted ? 'مكتمل' : 'قيد العمل'}
                    </span>
                    <h3 className="text-lg font-black text-slate-900">{section.title}</h3>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-[13px] leading-8 text-slate-600">
                    {section.content?.trim() || 'لا يوجد محتوى مكتوب لهذا القسم بعد.'}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-6 grid grid-cols-2 gap-5">
            <article className="rounded-[28px] border border-slate-200 p-6 text-right">
              <h2 className="text-2xl font-black text-slate-950">الأولويات الأسبوعية</h2>
              <div className="mt-5 space-y-3">
                {workspace.execution.weeklyPriorities.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[14px] font-bold leading-7 text-slate-700">{item.title}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[28px] border border-slate-200 p-6 text-right">
              <h2 className="text-2xl font-black text-slate-950">المعوقات الحالية</h2>
              <div className="mt-5 space-y-3">
                {workspace.execution.bottlenecks.map((item, index) => (
                  <div key={`${item}-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[14px] font-bold leading-7 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="mt-6 grid grid-cols-2 gap-5">
            <article className="rounded-[28px] border border-slate-200 p-6 text-right">
              <h2 className="text-2xl font-black text-slate-950">سبرنت الوصول لأول عميل</h2>
              <div className="mt-5 space-y-3">
                {workspace.execution.firstCustomerSprint.map((task) => (
                  <div key={task.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-black text-slate-500">
                        {task.priority}
                      </span>
                      <p className="text-[14px] font-black text-slate-900">{task.title}</p>
                    </div>
                    <p className="mt-2 text-[12px] font-bold text-slate-500">{task.status}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[28px] border border-slate-200 p-6 text-right">
              <h2 className="text-2xl font-black text-slate-950">مؤشرات الأداء</h2>
              <div className="mt-5 space-y-3">
                {workspace.execution.kpis.map((kpi) => (
                  <div key={kpi.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className="rounded-full px-3 py-1 text-[11px] font-black text-white"
                        style={{ backgroundColor: brandColor }}
                      >
                        {kpi.target}
                      </span>
                      <p className="text-[14px] font-black text-slate-900">{kpi.label}</p>
                    </div>
                    <p className="mt-2 text-[16px] font-black text-slate-950">{kpi.value}</p>
                    <p className="mt-2 text-[12px] leading-7 text-slate-500">{kpi.insight}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="mt-6 grid grid-cols-2 gap-5">
            <article className="rounded-[28px] border border-slate-200 p-6 text-right">
              <h2 className="text-2xl font-black text-slate-950">قوائم الجاهزية التشغيلية</h2>
              <div className="mt-5 space-y-4">
                {workspace.execution.checklists.map((group) => (
                  <div key={group.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-slate-900">{group.title}</h3>
                    <div className="mt-4 space-y-2">
                      {group.items.map((item) => (
                        <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                          <span className="rounded-full px-3 py-1 text-[10px] font-black text-slate-500 bg-slate-100">
                            {item.done ? 'مكتمل' : 'غير مكتمل'}
                          </span>
                          <p className="text-[13px] font-bold text-slate-700">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[28px] border border-slate-200 p-6 text-right">
              <h2 className="text-2xl font-black text-slate-950">التوصيات الحالية</h2>
              <div className="mt-5 space-y-3">
                {workspace.decision.recommendations.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-black text-slate-500">
                        {item.status}
                      </span>
                      <p className="text-[14px] font-black text-slate-900">{item.title}</p>
                    </div>
                    <p className="mt-3 text-[13px] leading-7 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </div>
      </div>
    </>
  );
};
