import React from 'react';
import { Activity, Gauge, ShieldAlert, Target } from 'lucide-react';
import { ScenarioState, SimulationResult } from '../types';

interface ScenarioWarRoomProps {
  scenario: ScenarioState;
  result: SimulationResult;
  unlocked: boolean;
  onChange: (next: Partial<ScenarioState>) => void;
}

interface SliderProps {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}

const SliderField: React.FC<SliderProps> = ({ label, hint, value, min, max, step = 1, suffix = '', onChange }) => (
  <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 hover:bg-white hover:shadow-sm transition-all">
    <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="min-w-0">
        <p className="text-sm font-black text-slate-900 leading-none mb-1">{label}</p>
        <p className="text-[11px] font-bold text-slate-400">{hint}</p>
      </div>
      <span className="rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-black text-white shadow-lg shadow-indigo-100 sm:text-sm">
        {value}
        {suffix}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-indigo-600"
    />
  </div>
);

export const ScenarioWarRoom: React.FC<ScenarioWarRoomProps> = ({ scenario, result, unlocked, onChange }) => {
  if (!unlocked) {
    return (
      <section className="bg-white border border-slate-200 shadow-sm rounded-[2.5rem] p-6 sm:p-10">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Scenario War Room</p>
        <h3 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">محاكاة القرارات اللحظية</h3>
        <p className="mt-4 text-sm font-bold text-slate-400 leading-relaxed">يتم تفعيل غرفة السيناريو بعد اكتمال يوم الاستخبارات حتى يكون التقييم مبنيا على مدخلات حقيقية.</p>
      </section>
    );
  }

  const verdictStyles = {
    stable: 'border-emerald-100 bg-emerald-50 text-emerald-600',
    watch: 'border-amber-100 bg-amber-50 text-amber-600',
    critical: 'border-rose-100 bg-rose-50 text-rose-600',
  };

  const verdictText = {
    stable: 'مستقر وجاهز للتوسع',
    watch: 'يحتاج ضبطا قبل التصعيد',
    critical: 'مخاطرة عالية تستوجب تدخل فوري',
  };

  return (
    <section className="bg-white border border-slate-200 shadow-sm rounded-[2.5rem] p-6 sm:p-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Scenario War Room</p>
          <h3 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">مختبر القرار الفوري</h3>
        </div>
        <span className={`rounded-2xl border px-4 py-2.5 text-xs font-black shadow-sm ${verdictStyles[result.verdict]}`}>{verdictText[result.verdict]}</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SliderField label="تكلفة اكتساب العميل (CAC)" hint="كم يكلف جلب عميل مدفوع واحد" value={scenario.cac} min={20} max={600} step={5} suffix="$" onChange={(value) => onChange({ cac: value })} />
        <SliderField label="معدل فقدان العملاء (Churn)" hint="النسبة الشهرية لخروج العملاء" value={scenario.churn} min={1} max={35} suffix="%" onChange={(value) => onChange({ churn: value })} />
        <SliderField label="زمن أول إيراد" hint="عدد الأشهر للوصول لأول تدفق نقدي" value={scenario.timeToRevenue} min={1} max={24} suffix="ش" onChange={(value) => onChange({ timeToRevenue: value })} />
      </div>

      <div className="mt-8 grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:bg-white hover:shadow-sm transition-all">
          <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400"><Gauge size={16} className="text-indigo-500" /> الاستدامة</p>
          <p className="text-2xl font-black text-slate-900 sm:text-3xl leading-none">{result.sustainability}%</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:bg-white hover:shadow-sm transition-all">
          <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400"><Target size={16} className="text-indigo-500" /> فرصة النجاح</p>
          <p className="text-2xl font-black text-slate-900 sm:text-3xl leading-none">{result.successChance}%</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:bg-white hover:shadow-sm transition-all">
          <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400"><ShieldAlert size={16} className="text-rose-500" /> ضغط المدرج</p>
          <p className="text-2xl font-black text-slate-900 sm:text-3xl leading-none">{result.runwayStress}%</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:bg-white hover:shadow-sm transition-all">
          <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400"><Activity size={16} className="text-emerald-500" /> LTV متوقع</p>
          <p className="text-2xl font-black text-slate-900 sm:text-3xl leading-none">${result.ltvEstimate}</p>
        </div>
      </div>
    </section>
  );
};
