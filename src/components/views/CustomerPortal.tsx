import React from 'react';
import { ArrowLeft, BellRing, Briefcase, CheckCircle2, CreditCard, Crown, Headphones, Layers3, Sparkles, UserCircle2, Wallet } from 'lucide-react';
import { User } from '../../types';
import { useProjectWorkspace } from '../../features/workspace/ProjectWorkspaceContext';

export type CustomerPortalSection =
  | 'dashboard'
  | 'projects'
  | 'subscription'
  | 'usage'
  | 'activity'
  | 'account'
  | 'support';

interface CustomerPortalProps {
  user: User;
  setActiveTab: (tab: string) => void;
  section: CustomerPortalSection;
}

const SECTION_META: Record<CustomerPortalSection, { label: string; desc: string }> = {
  dashboard: { label: 'لوحة التحكم', desc: 'ملخص الحساب والاشتراك والمشاريع والنشاط من مكان واحد.' },
  projects: { label: 'المشاريع', desc: 'كل مشاريعك الجارية والجاهزة مع نقاط الدخول السريعة.' },
  subscription: { label: 'الاشتراك والفوترة', desc: 'الخطة الحالية، التجديد، وسائل الدفع، والفواتير.' },
  usage: { label: 'الاستخدام والصلاحيات', desc: 'حدود الخطة، الاستهلاك، والمزايا المتاحة لك كمشترك.' },
  activity: { label: 'النشاط والتنبيهات', desc: 'آخر ما جرى في حسابك ومشاريعك ومدفوعاتك.' },
  account: { label: 'الحساب والهوية', desc: 'الملف الشخصي، الأمان، وتفضيلات تشغيل المنصة.' },
  support: { label: 'الدعم والطلبات', desc: 'التواصل، المساعدة، ومتابعة الطلبات المتعلقة بحسابك.' },
};

const PORTAL_NAV: Array<{ section: CustomerPortalSection; tab: string; icon: React.ElementType }> = [
  { section: 'dashboard', tab: 'customer-dashboard', icon: Crown },
  { section: 'projects', tab: 'customer-projects', icon: Briefcase },
  { section: 'subscription', tab: 'customer-subscription', icon: CreditCard },
  { section: 'usage', tab: 'customer-usage', icon: Sparkles },
  { section: 'activity', tab: 'customer-activity', icon: BellRing },
  { section: 'account', tab: 'customer-account', icon: UserCircle2 },
  { section: 'support', tab: 'customer-support', icon: Headphones },
];

const PROJECT_ROWS = [
  { name: 'أكاديمية الذكاء الاصطناعي', status: 'جاهز للمراجعة', progress: '92%', targetTab: 'workspace' },
  { name: 'منصة الحصاد الذكي', status: 'قيد التطوير', progress: '68%', targetTab: 'editor' },
  { name: 'بوابة الدفع الإقليمية', status: 'مسودة', progress: '34%', targetTab: 'new-plan' },
];

const ACTIVITY_FEED = [
  { title: 'تم تحديث مساحة المشروع الرئيسية', meta: 'منذ 15 دقيقة', type: 'project' },
  { title: 'تم إنشاء فاتورة التجديد القادمة', meta: '21 يوليو 2026', type: 'billing' },
  { title: 'اقتراح استراتيجي جديد متاح لمشروعك', meta: 'منذ ساعة', type: 'ai' },
  { title: 'تمت مزامنة تغييرات إعدادات الحساب', meta: '20 يوليو 2026', type: 'account' },
];

export const CustomerPortal: React.FC<CustomerPortalProps> = ({ user, setActiveTab, section }) => {
  const { workspace } = useProjectWorkspace();
  const meta = SECTION_META[section];
  const completedSections = workspace.planSections.filter((item) => item.isCompleted).length;
  const totalSections = Math.max(workspace.planSections.length, 1);
  const usedCredits = user.totalCredits - user.credits;
  const allTasks = [...workspace.execution.autoTasks, ...workspace.execution.firstCustomerSprint];
  const completedTasks = allTasks.filter((task) => task.status === 'completed').length;

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 py-6">
      <div className="app-page-shell-wide space-y-6">
        <section className="surface-card overflow-hidden rounded-[1.75rem] bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-black text-slate-700">
                <Crown size={14} className="text-slate-900" />
                مساحة العميل
              </div>
              <div>
                <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-[3.25rem]">{meta.label}</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{meta.desc}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <QuickHeroButton label="فتح مساحة المشروع" onClick={() => setActiveTab('workspace')} />
                <QuickHeroButton label="إعدادات الحساب" onClick={() => setActiveTab('settings')} secondary />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:w-[480px]">
              <HeroMetric label="الخطة" value="الاحترافي" helper="نشطة حتى 21 أغسطس 2026" />
              <HeroMetric label="الرصيد" value={`${user.credits}/${user.totalCredits}`} helper="اعتمادات الذكاء" />
              <HeroMetric label="الجاهزية" value={`${workspace.metrics.readinessScore}%`} helper="مرتبطة بالمشروع" />
            </div>
          </div>
        </section>

        <div className="grid gap-6 2xl:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="surface-card p-3">
              {PORTAL_NAV.map((item) => {
                const isActive = item.section === section;
                return (
                  <button
                    key={item.tab}
                    onClick={() => setActiveTab(item.tab)}
                    className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-right text-sm font-black transition last:mb-0 ${
                      isActive ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="flex-1">{SECTION_META[item.section].label}</span>
                  </button>
                );
              })}
            </div>

            <div className="surface-card p-5">
              <h3 className="text-sm font-black text-slate-900">رحلتك الحالية</h3>
              <div className="mt-4 space-y-3">
                <SideFact label="المشروع الرئيسي" value={workspace.profile.name || 'غير محدد بعد'} />
                <SideFact label="القطاع" value={workspace.profile.sectorLabel || 'غير محدد'} />
                <SideFact label="المرحلة" value={workspace.currentStage} />
                <SideFact label="قرار المتابعة" value={workspace.decision.status} />
              </div>
            </div>
          </aside>

          <main className="space-y-8">
            {section === 'dashboard' && (
              <>
                <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-2">
                  <MetricCard icon={Briefcase} label="المشاريع" value="3" note="نشطة داخل حسابك" tone="blue" />
                  <MetricCard icon={Layers3} label="أقسام الخطة" value={`${completedSections}/${totalSections}`} note="مكتملة حتى الآن" tone="emerald" />
                  <MetricCard icon={CheckCircle2} label="المهام التنفيذية" value={`${completedTasks}/${allTasks.length || 1}`} note="ضمن المساحة" tone="amber" />
                  <MetricCard icon={Wallet} label="المستهلك من الرصيد" value={`${usedCredits}`} note="اعتماد مستخدم" tone="purple" />
                </div>

                <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.35fr)_minmax(420px,0.95fr)] xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.9fr)]">
                  <Panel title="مركز التحكم السريع" subtitle="أهم نقاط الوصول للمستخدم المشترك">
                    <div className="grid gap-4 md:grid-cols-2">
                      <ActionTile title="إدارة المشاريع" desc="راجع مشاريعك وانتقل مباشرة إلى التحرير أو التشغيل." cta="المشاريع" onClick={() => setActiveTab('customer-projects')} />
                      <ActionTile title="الفوترة والاشتراك" desc="راجع الخطة الحالية والتجديد القادم والفواتير." cta="الفوترة" onClick={() => setActiveTab('customer-subscription')} />
                      <ActionTile title="الاستخدام والصلاحيات" desc="افهم حدود الباقة وما استهلكته من اعتمادات." cta="الاستخدام" onClick={() => setActiveTab('customer-usage')} />
                      <ActionTile title="الدعم والطلبات" desc="اطلب مساعدة أو ترقية أو تواصل مع المستشار." cta="الدعم" onClick={() => setActiveTab('customer-support')} />
                    </div>
                  </Panel>

                  <Panel title="ما الذي يجب فعله الآن؟" subtitle="أفضل خطوة تالية في رحلة العميل">
                    <div className="space-y-3">
                      <StepRow title="راجع مشروعك الرئيسي" desc="ادخل إلى مساحة المشروع لمتابعة مؤشرات الجاهزية والتنفيذ." button="المساحة" onClick={() => setActiveTab('workspace')} />
                      <StepRow title="أكمل ما تبقى من الخطة" desc="حرر أقسام المشروع غير المكتملة وارفع جودة الخطة." button="المحرر" onClick={() => setActiveTab('editor')} />
                      <StepRow title="راجع الفوترة" desc="تأكد أن وسيلة الدفع وتجديد 21 أغسطس 2026 جاهزان." button="الاشتراك" onClick={() => setActiveTab('customer-subscription')} />
                    </div>
                  </Panel>
                </div>
              </>
            )}

            {section === 'projects' && (
              <div className="space-y-6">
                <Panel title="كل مشاريعك" subtitle="إدارة المشاريع التابعة لحسابك المشترك">
                  <div className="space-y-4">
                    {PROJECT_ROWS.map((project) => (
                      <div key={project.name} className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-100 bg-slate-50/70 p-5 md:flex-row md:items-center md:justify-between">
                        <button
                          onClick={() => setActiveTab(project.targetTab)}
                          className="rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-black text-white transition hover:bg-slate-800"
                        >
                          فتح
                        </button>
                        <div className="text-right">
                          <p className="text-sm font-black text-slate-900">{project.name}</p>
                          <p className="mt-1 text-xs font-bold text-slate-500">{project.status} • تقدم {project.progress}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <PortalButton label="فتح صفحة مشاريعي الحالية" onClick={() => setActiveTab('my-plans')} />
                    <PortalButton label="إنشاء مشروع جديد" onClick={() => setActiveTab('new-plan')} secondary />
                  </div>
                </Panel>

                <Panel title="تسلسل رحلة المشروع" subtitle="كيف يدخل المستخدم المشترك إلى العمل الفعلي">
                  <JourneyStrip
                    items={[
                      'إنشاء فكرة',
                      'اكتشاف سوق',
                      'صياغة الخطة',
                      'اتخاذ القرار',
                      'التشغيل داخل المساحة',
                    ]}
                  />
                </Panel>
              </div>
            )}

            {section === 'subscription' && (
              <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.25fr)_minmax(420px,0.95fr)] xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
                <Panel title="حالة الاشتراك الحالية" subtitle="كل ما يتعلق بالخطة والفواتير">
                  <div className="grid gap-4 md:grid-cols-3">
                    <BadgeCard label="الخطة الحالية" value="الاحترافي" />
                    <BadgeCard label="التجديد القادم" value="21 أغسطس 2026" />
                    <BadgeCard label="الحالة" value="نشط" />
                  </div>
                  <div className="mt-5 rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5 text-right">
                    <p className="text-sm font-black text-slate-900">وسيلة الدفع الأساسية</p>
                    <p className="mt-2 text-xs font-bold text-slate-500">بطاقة أعمال تنتهي بـ 4242 ومفعّل عليها التجديد التلقائي.</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <PortalButton label="مقارنة الخطط" onClick={() => setActiveTab('pricing')} />
                    <PortalButton label="إعدادات الدفع" onClick={() => setActiveTab('settings')} secondary />
                  </div>
                </Panel>

                <Panel title="سجل الفواتير" subtitle="آخر العمليات المالية المتعلقة باشتراكك">
                  <div className="space-y-3">
                    {[
                      ['INV-2026-071', '21 يوليو 2026', '149 ر.س'],
                      ['INV-2026-061', '21 يونيو 2026', '149 ر.س'],
                      ['INV-2026-051', '21 مايو 2026', '149 ر.س'],
                    ].map(([id, date, amount]) => (
                      <div key={id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
                        <div className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-700">مدفوعة</div>
                        <div className="text-right">
                          <p className="text-sm font-black text-slate-900">{id}</p>
                          <p className="mt-1 text-xs font-bold text-slate-500">{date} • {amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>
            )}

            {section === 'usage' && (
              <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3 xl:grid-cols-2">
                <Panel title="اعتمادات الذكاء" subtitle="المتاح والمستهلك من خطتك">
                  <ProgressBar value={Math.round((usedCredits / Math.max(user.totalCredits, 1)) * 100)} />
                  <p className="mt-4 text-sm font-bold leading-7 text-slate-600">
                    استهلكت {usedCredits} اعتماداً وبقي لديك {user.credits} اعتماداً ضمن الدورة الحالية.
                  </p>
                </Panel>

                <Panel title="المزايا المتاحة" subtitle="ما يتيحه لك الاشتراك الحالي">
                  <FeatureList items={['مساحة مشروع كاملة', 'محرر الخطة', 'تصدير القوالب', 'تنبيهات الحساب', 'دعم أسرع']} />
                </Panel>

                <Panel title="الربط مع المحتوى" subtitle="ماذا يتحكم هذا الحساب داخل الموقع؟">
                  <FeatureList items={['المشاريع والخطط', 'النشاط والتنبيهات', 'الفواتير والاشتراك', 'إعدادات الحساب', 'الدعم والطلبات']} />
                </Panel>
              </div>
            )}

            {section === 'activity' && (
              <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.2fr)_minmax(420px,0.95fr)] xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
                <Panel title="آخر النشاطات" subtitle="كل ما جرى في حسابك عبر الموقع">
                  <div className="space-y-3">
                    {ACTIVITY_FEED.map((item) => (
                      <div key={item.title} className="rounded-[1.75rem] border border-slate-100 bg-slate-50/60 p-4">
                        <p className="text-sm font-black text-slate-900">{item.title}</p>
                        <p className="mt-1 text-xs font-bold text-slate-500">{item.meta}</p>
                      </div>
                    ))}
                  </div>
                </Panel>

                <Panel title="التنبيهات المرتبطة" subtitle="الانتقال إلى مركز الإشعارات أو المهام">
                  <div className="space-y-3">
                    <StepRow title="مركز التنبيهات" desc="راجع التنبيهات غير المقروءة والتحديثات الأخيرة." button="التنبيهات" onClick={() => setActiveTab('notifications')} />
                    <StepRow title="المهام والجدولة" desc="تابع ما تبقى من مهام مرتبطة بمشاريعك." button="المهام" onClick={() => setActiveTab('tasks')} />
                  </div>
                </Panel>
              </div>
            )}

            {section === 'account' && (
              <div className="grid gap-6 2xl:grid-cols-2 xl:grid-cols-2">
                <Panel title="بيانات الحساب" subtitle="هوية العميل وتفاصيل الوصول">
                  <div className="space-y-3">
                    <SideFact label="الاسم" value={user.name} />
                    <SideFact label="البريد" value={user.email} />
                    <SideFact label="الرصيد الحالي" value={`${user.credits}/${user.totalCredits}`} />
                    <SideFact label="حالة التحقق" value="موثّق" />
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <PortalButton label="الملف الشخصي" onClick={() => setActiveTab('profile')} />
                    <PortalButton label="إعدادات الحساب" onClick={() => setActiveTab('settings')} secondary />
                  </div>
                </Panel>

                <Panel title="التحكم بالموقع من حسابك" subtitle="ما يملكه المستخدم المشترك من نقاط إدارة">
                  <FeatureList items={['الوصول إلى المشاريع', 'إدارة بيانات الحساب', 'التحكم في الخطة والفواتير', 'إدارة التنبيهات', 'الدخول إلى أدوات التحليل']} />
                </Panel>
              </div>
            )}

            {section === 'support' && (
              <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.15fr)_minmax(420px,0.95fr)] xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.95fr)]">
                <Panel title="الدعم والطلبات" subtitle="كل ما يخص مساعدة العميل المشترك">
                  <div className="grid gap-4 md:grid-cols-2">
                    <ActionTile title="التواصل مع مستشار" desc="للاستفسار عن الترقية أو الاستخدام الاستراتيجي للمنصة." cta="تواصل" onClick={() => setActiveTab('contact-us')} />
                    <ActionTile title="مراجعة الأسئلة المتكررة" desc="للإجابات العامة المتعلقة بالحساب والاشتراك." cta="الأسئلة" onClick={() => setActiveTab('site-map')} />
                    <ActionTile title="إعدادات الحساب" desc="لتعديل بيانات الوصول أو التفضيلات أو وسائل الدفع." cta="الإعدادات" onClick={() => setActiveTab('settings')} />
                    <ActionTile title="التسعير والترقية" desc="لرفع الخطة أو معرفة الفروقات بين الباقات." cta="الخطط" onClick={() => setActiveTab('pricing')} />
                  </div>
                </Panel>

                <Panel title="حالة حسابك الآن" subtitle="ملخص الدعم التشغيلي">
                  <div className="space-y-3">
                    <SideFact label="آخر تجديد" value="21 يوليو 2026" />
                    <SideFact label="التجديد القادم" value="21 أغسطس 2026" />
                    <SideFact label="أولوية الدعم" value="احترافية" />
                  </div>
                </Panel>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const Panel = ({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) => (
  <section className="surface-card p-6 sm:p-7">
    <div className="mb-5 text-right">
      <h2 className="text-lg font-black text-slate-900">{title}</h2>
      <p className="mt-1 text-xs font-bold text-slate-400">{subtitle}</p>
    </div>
    {children}
  </section>
);

const HeroMetric = ({ label, value, helper }: { label: string; value: string; helper: string }) => (
  <div className="surface-muted bg-white p-4">
    <p className="text-[10px] font-black text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-black text-slate-950">{value}</p>
    <p className="mt-1 text-[11px] font-bold text-slate-500">{helper}</p>
  </div>
);

const MetricCard = ({
  icon: Icon,
  label,
  value,
  note,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  note: string;
  tone: 'blue' | 'emerald' | 'amber' | 'purple';
}) => {
  const tones = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="surface-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tones[tone]}`}>
          <Icon size={18} />
        </div>
        <span className="text-[11px] font-black text-slate-400">{label}</span>
      </div>
      <p className="text-3xl font-black text-slate-900">{value}</p>
      <p className="mt-2 text-xs font-bold text-slate-500">{note}</p>
    </div>
  );
};

const SideFact = ({ label, value }: { label: string; value: string }) => (
  <div className="surface-muted flex items-center justify-between px-4 py-3">
    <span className="text-sm font-black text-slate-700">{value}</span>
    <span className="text-xs font-black text-slate-400">{label}</span>
  </div>
);

const StepRow = ({
  title,
  desc,
  button,
  onClick,
}: {
  title: string;
  desc: string;
  button: string;
  onClick: () => void;
}) => (
  <div className="surface-muted p-4">
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <button onClick={onClick} className="rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-black text-white transition hover:bg-slate-800">
        {button}
      </button>
      <div className="text-right">
        <p className="text-sm font-black text-slate-900">{title}</p>
        <p className="mt-1 text-xs font-bold leading-6 text-slate-500">{desc}</p>
      </div>
    </div>
  </div>
);

const ActionTile = ({
  title,
  desc,
  cta,
  onClick,
}: {
  title: string;
  desc: string;
  cta: string;
  onClick: () => void;
}) => (
  <div className="surface-muted p-5">
    <h3 className="text-sm font-black text-slate-900">{title}</h3>
    <p className="mt-2 text-xs font-bold leading-6 text-slate-500">{desc}</p>
    <button onClick={onClick} className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-xs font-black text-slate-800 shadow-sm transition hover:bg-slate-900 hover:text-white">
      {cta}
      <ArrowLeft size={14} />
    </button>
  </div>
);

const PortalButton = ({
  label,
  onClick,
  secondary,
}: {
  label: string;
  onClick: () => void;
  secondary?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`rounded-2xl px-4 py-3 text-sm font-black transition ${
      secondary ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50' : 'bg-slate-900 text-white hover:bg-slate-800'
    }`}
  >
    {label}
  </button>
);

const QuickHeroButton = ({
  label,
  onClick,
  secondary,
}: {
  label: string;
  onClick: () => void;
  secondary?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`rounded-2xl px-5 py-3 text-sm font-black transition ${
      secondary ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'
    }`}
  >
    {label}
  </button>
);

const BadgeCard = ({ label, value }: { label: string; value: string }) => (
  <div className="surface-muted p-4 text-right">
    <p className="text-[11px] font-black text-slate-400">{label}</p>
    <p className="mt-2 text-lg font-black text-slate-900">{value}</p>
  </div>
);

const ProgressBar = ({ value }: { value: number }) => (
  <div>
    <div className="mb-2 flex items-center justify-between">
      <span className="text-sm font-black text-slate-800">{value}%</span>
      <span className="text-[11px] font-black text-slate-400">نسبة الاستهلاك</span>
    </div>
    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
      <div className="h-full rounded-full bg-gradient-to-l from-indigo-600 to-sky-500" style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  </div>
);

const FeatureList = ({ items }: { items: string[] }) => (
  <div className="space-y-3">
    {items.map((item) => (
      <div key={item} className="surface-muted flex items-center gap-3 px-4 py-3">
        <CheckCircle2 size={18} className="text-emerald-500" />
        <span className="text-sm font-black text-slate-700">{item}</span>
      </div>
    ))}
  </div>
);

const JourneyStrip = ({ items }: { items: string[] }) => (
  <div className="grid gap-3 md:grid-cols-5">
    {items.map((item, index) => (
      <div key={item} className="surface-muted p-4 text-center">
        <p className="text-[11px] font-black text-slate-400">المرحلة {index + 1}</p>
        <p className="mt-2 text-sm font-black text-slate-800">{item}</p>
      </div>
    ))}
  </div>
);
