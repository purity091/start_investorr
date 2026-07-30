import {
  PlanSection,
  ProjectWorkspace,
  WorkspaceChecklistGroup,
  WorkspaceDecisionStatus,
  WorkspaceExecutionTask,
  WorkspaceJourneyStage,
  WorkspaceKpi,
  WorkspacePhasePlan,
  WorkspaceRecommendation,
  WorkspaceWeeklyPriority,
} from '../../types';

export const WORKSPACE_STORAGE_KEY = 'khotta_project_workspace_v1';

const CATEGORY_LABELS: Record<WorkspaceExecutionTask['category'], string> = {
  legal: 'قانوني',
  finance: 'مالي',
  marketing: 'تسويق',
  product: 'منتج',
  sales: 'مبيعات',
};

const DEFAULT_WEEKLY_PRIORITIES: WorkspaceWeeklyPriority[] = [
  { id: 'w1', title: 'تأكيد العميل الأول ومشكلته الرئيسية', owner: 'المؤسس', done: false },
  { id: 'w2', title: 'إكمال تحليل السوق والمنافسين', owner: 'الاستراتيجية', done: false },
  { id: 'w3', title: 'تحديد فرضية تحقق واحدة قابلة للقياس', owner: 'المنتج', done: false },
];

const DEFAULT_PHASE_PLAN: WorkspacePhasePlan[] = [
  {
    id: '30',
    label: 'أول 30 يوم',
    focus: 'إثبات صحة الفرضية ووضوح العرض',
    outcomes: ['تحديد العميل الأول', 'رسالة قيمة واضحة', 'قناة جذب أولية عاملة'],
  },
  {
    id: '60',
    label: 'حتى 60 يوم',
    focus: 'تشغيل أول قناة نمو وانضباط التنفيذ',
    outcomes: ['اختبار عرضين', 'إغلاق أول دورة مبيعات', 'قياس تكلفة الوصول الأولية'],
  },
  {
    id: '90',
    label: 'حتى 90 يوم',
    focus: 'تثبيت القابلية للتكرار والاستعداد للتوسع',
    outcomes: ['قنوات أكثر وضوحًا', 'تحسين التحويل', 'قرار التوسع أو التعديل'],
  },
];

const DEFAULT_CHECKLISTS = (): WorkspaceChecklistGroup[] => [
  {
    id: 'legal',
    label: 'قانوني',
    items: [
      { id: 'legal-1', label: 'تحديد الشكل القانوني المناسب', done: false },
      { id: 'legal-2', label: 'حصر التراخيص والمتطلبات النظامية', done: false },
      { id: 'legal-3', label: 'مراجعة شروط الاستخدام أو العقود الأساسية', done: false },
    ],
  },
  {
    id: 'finance',
    label: 'مالي',
    items: [
      { id: 'finance-1', label: 'إعداد ميزانية تشغيل 90 يوم', done: false },
      { id: 'finance-2', label: 'تحديد نقطة التعادل المبدئية', done: false },
      { id: 'finance-3', label: 'حساب تكلفة اكتساب العميل الأول', done: false },
    ],
  },
  {
    id: 'marketing',
    label: 'تسويق',
    items: [
      { id: 'marketing-1', label: 'صياغة رسالة القيمة الرئيسية', done: false },
      { id: 'marketing-2', label: 'إطلاق صفحة هبوط أو عرض تعريفي', done: false },
      { id: 'marketing-3', label: 'اختيار قناة جذب أولى وبدء اختبارها', done: false },
    ],
  },
  {
    id: 'product',
    label: 'منتج',
    items: [
      { id: 'product-1', label: 'تحديد MVP أو عرض الخدمة الأولي', done: false },
      { id: 'product-2', label: 'صياغة سيناريو الاستخدام الأساسي', done: false },
      { id: 'product-3', label: 'جمع 3 ملاحظات مباشرة من مستخدمين محتملين', done: false },
    ],
  },
  {
    id: 'sales',
    label: 'مبيعات',
    items: [
      { id: 'sales-1', label: 'إعداد قائمة أول 25 عميلًا مستهدفًا', done: false },
      { id: 'sales-2', label: 'كتابة سكربت تواصل أولي', done: false },
      { id: 'sales-3', label: 'ضبط آلية متابعة leads أسبوعيًا', done: false },
    ],
  },
];

const DEFAULT_FIRST_CUSTOMER_SPRINT: WorkspaceExecutionTask[] = [
  {
    id: 'lead-1',
    title: 'تعريف العميل المثالي الأول',
    description: 'اختر شريحة واحدة فقط وحدد الألم الذي ستبدأ منه.',
    owner: 'المؤسس',
    dueWindow: 'day-7',
    status: 'pending',
    category: 'sales',
    priority: 'high',
  },
  {
    id: 'lead-2',
    title: 'بناء قائمة 25 lead',
    description: 'اجمع أسماء جهات أو أفراد يملكون المشكلة فعلًا ويمكن الوصول إليهم.',
    owner: 'المبيعات',
    dueWindow: 'day-7',
    status: 'pending',
    category: 'sales',
    priority: 'high',
  },
  {
    id: 'lead-3',
    title: 'إطلاق رسالة تواصل واختبارها',
    description: 'صغ رسالة قصيرة تشرح القيمة وتدعو إلى مكالمة أو تجربة أولية.',
    owner: 'التسويق',
    dueWindow: 'day-7',
    status: 'pending',
    category: 'marketing',
    priority: 'medium',
  },
  {
    id: 'lead-4',
    title: 'مقابلات مباشرة مع 5 عملاء محتملين',
    description: 'استخدم الأسئلة لفهم الألم الحالي، لا لبيع الحل فقط.',
    owner: 'المؤسس',
    dueWindow: 'day-7',
    status: 'pending',
    category: 'product',
    priority: 'high',
  },
  {
    id: 'lead-5',
    title: 'عرض أول CTA واضح',
    description: 'حدد هل الهدف مكالمة، تجربة، نموذج طلب، أم حجز Demo.',
    owner: 'المنتج',
    dueWindow: 'day-7',
    status: 'pending',
    category: 'product',
    priority: 'medium',
  },
];

const sectorTaskMap: Array<{
  match: string[];
  tasks: Omit<WorkspaceExecutionTask, 'status'>[];
  kpis: WorkspaceKpi[];
}> = [
  {
    match: ['التجارة الإلكترونية', 'التجزئة', 'التسوق', 'Shopping', 'Ecommerce'],
    tasks: [
      {
        id: 'sector-ecom-1',
        title: 'تجهيز عرض البيع وقنوات الطلب',
        description: 'تأكد من وضوح رحلة الشراء والدفع والطلب الأول.',
        owner: 'المنتج',
        dueWindow: 'day-30',
        category: 'product',
        priority: 'high',
      },
      {
        id: 'sector-ecom-2',
        title: 'اختبار حملة جذب أولية منخفضة الميزانية',
        description: 'ابدأ بقناة واحدة وقس تكلفة أول lead بدل التوسع المبكر.',
        owner: 'التسويق',
        dueWindow: 'day-30',
        category: 'marketing',
        priority: 'high',
      },
      {
        id: 'sector-ecom-3',
        title: 'ضبط خدمة العملاء والمرتجعات',
        description: 'جهز قواعد الرد، سياسة الاسترجاع، وآلية المتابعة.',
        owner: 'العمليات',
        dueWindow: 'day-60',
        category: 'sales',
        priority: 'medium',
      },
    ],
    kpis: [
      { id: 'kpi-leads', label: 'Leads أسبوعية', value: '0', target: '25', insight: 'مؤشر صحة الجذب الأولي.' },
      { id: 'kpi-conv', label: 'نسبة التحويل', value: '0%', target: '3%', insight: 'هل العرض مقنع بما يكفي؟' },
      { id: 'kpi-cac', label: 'تكلفة أول عميل', value: 'غير محسوبة', target: 'ضمن الميزانية', insight: 'احسبها قبل التوسع.' },
    ],
  },
  {
    match: ['التكنولوجيا', 'البرمجيات', 'Software', 'AI', 'SaaS', 'تقنية'],
    tasks: [
      {
        id: 'sector-tech-1',
        title: 'تحديد MVP ضيق بميزة واحدة حرجة',
        description: 'قلل نطاق النسخة الأولى حتى تصل إلى استخدام فعلي أسرع.',
        owner: 'المنتج',
        dueWindow: 'day-30',
        category: 'product',
        priority: 'high',
      },
      {
        id: 'sector-tech-2',
        title: 'إجراء 5 مقابلات مشكلة + 3 عروض Demo',
        description: 'اختبر الألم أولًا ثم اعرض الحل على عينة صغيرة.',
        owner: 'المؤسس',
        dueWindow: 'day-30',
        category: 'sales',
        priority: 'high',
      },
      {
        id: 'sector-tech-3',
        title: 'ضبط قياس onboarding والاستخدام الأول',
        description: 'حدد ما الذي يعني تفعيلًا ناجحًا للمستخدم.',
        owner: 'التحليلات',
        dueWindow: 'day-60',
        category: 'product',
        priority: 'medium',
      },
    ],
    kpis: [
      { id: 'kpi-demo', label: 'عروض Demo', value: '0', target: '8', insight: 'هل تولّد اهتمامًا حقيقيًا؟' },
      { id: 'kpi-activation', label: 'Activation', value: '0%', target: '40%', insight: 'هل يصل العميل للقيمة بسرعة؟' },
      { id: 'kpi-pipeline', label: 'فرص البيع', value: '0', target: '5', insight: 'عدد الجهات الجادة بعد العرض.' },
    ],
  },
];

const defaultSectorTasks = (): Omit<WorkspaceExecutionTask, 'status'>[] => [
  {
    id: 'generic-1',
    title: 'تثبيت عرض القيمة للعميل الأول',
    description: 'صغ ماذا تبيع ولماذا الآن ولمَن تحديدًا.',
    owner: 'المؤسس',
    dueWindow: 'day-30',
    category: 'marketing',
    priority: 'high',
  },
  {
    id: 'generic-2',
    title: 'إعداد هيكل عرض أو خدمة أولية',
    description: 'حدد المنتج أو الخدمة القابلة للبيع خلال 30 يومًا.',
    owner: 'المنتج',
    dueWindow: 'day-30',
    category: 'product',
    priority: 'high',
  },
  {
    id: 'generic-3',
    title: 'بناء روتين متابعة leads أسبوعيًا',
    description: 'اجعل جمع الطلب وقياس الردود عملية ثابتة.',
    owner: 'المبيعات',
    dueWindow: 'day-60',
    category: 'sales',
    priority: 'medium',
  },
];

const defaultKpis = (): WorkspaceKpi[] => [
  { id: 'generic-kpi-1', label: 'مقابلات عملاء', value: '0', target: '10', insight: 'ابدأ من التحقق النوعي.' },
  { id: 'generic-kpi-2', label: 'Leads جديدة', value: '0', target: '20', insight: 'صحة القناة الأولى.' },
  { id: 'generic-kpi-3', label: 'عروض سعر/Proposal', value: '0', target: '5', insight: 'هل يتحول الاهتمام إلى نية شراء؟' },
];

const baseAutoTasks = (): WorkspaceExecutionTask[] => [
  {
    id: 'auto-legal',
    title: 'حصر المتطلبات القانونية والتراخيص',
    description: 'جمع كل ما يلزم للتشغيل النظامي قبل الإطلاق الفعلي.',
    owner: 'قانوني',
    dueWindow: 'day-30',
    status: 'pending',
    category: 'legal',
    priority: 'high',
  },
  {
    id: 'auto-finance',
    title: 'إعداد ميزانية تشغيل 90 يوم',
    description: 'تحديد الحد الأدنى من النقد اللازم حتى أول نتائج.',
    owner: 'مالي',
    dueWindow: 'day-30',
    status: 'pending',
    category: 'finance',
    priority: 'high',
  },
  {
    id: 'auto-sales',
    title: 'تجهيز مسار أول lead حتى الإغلاق',
    description: 'حدد من أين يأتي العميل، كيف يتواصل، وكيف تتابعه.',
    owner: 'المبيعات',
    dueWindow: 'day-60',
    status: 'pending',
    category: 'sales',
    priority: 'medium',
  },
];

const cloneChecklists = (groups: WorkspaceChecklistGroup[]) =>
  groups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({ ...item })),
  }));

export const createInitialWorkspace = (planSections: PlanSection[]): ProjectWorkspace => ({
  id: 'workspace-primary',
  updatedAt: new Date().toISOString(),
  currentStage: 'discovery',
  profile: {
    name: 'مشروع جديد',
    sectorId: null,
    sectorLabel: null,
    sectorGroup: null,
    countryId: null,
    countryLabel: null,
    customerType: null,
    opportunityTitle: null,
    opportunitySummary: null,
  },
  assumptions: [
    'العميل لديه ألم واضح يستحق الدفع',
    'السوق قابل للدخول دون حواجز تنظيمية قاتلة',
  ],
  risks: [
    'تحليل المنافسة غير مكتمل',
    'لم يتم اختبار فرضية الطلب بعد',
  ],
  planSections,
  brand: {
    prompt: '',
    personality: null,
    palette: null,
  },
  decision: {
    status: 'validate',
    confidence: 58,
    rationale: 'المعطيات الحالية واعدة لكن تحتاج إلى تحقق سوقي أوضح قبل الالتزام الكامل.',
  },
  execution: {
    weeklyPriorities: DEFAULT_WEEKLY_PRIORITIES,
    bottlenecks: ['غياب عميل محدد بوضوح', 'الخطة المالية غير مكتملة'],
    phasePlan: DEFAULT_PHASE_PLAN,
    autoTasks: baseAutoTasks(),
    checklists: DEFAULT_CHECKLISTS(),
    firstCustomerSprint: DEFAULT_FIRST_CUSTOMER_SPRINT,
    kpis: defaultKpis(),
  },
  metrics: {
    journeyProgress: 24,
    readinessScore: 41,
    validationScore: 35,
    executionScore: 22,
  },
  recommendations: [],
});

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, value));

const getCompletedSectionsCount = (sections: PlanSection[]) =>
  sections.filter((section) => section.isCompleted || section.progress >= 80 || section.content.trim().length > 80).length;

const getAverageScore = (sections: PlanSection[], key: 'aiScore' | 'humanScore') => {
  const values = sections.map((section) => section[key]).filter((value): value is number => typeof value === 'number');
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
};

const deriveDecisionStatus = (readinessScore: number, validationScore: number): WorkspaceDecisionStatus => {
  if (readinessScore >= 75 && validationScore >= 70) return 'continue';
  if (readinessScore >= 50 && validationScore >= 45) return 'validate';
  if (readinessScore >= 30) return 'delay';
  return 'pivot';
};

const deriveStage = (workspace: ProjectWorkspace): WorkspaceJourneyStage => {
  if (workspace.metrics.executionScore >= 70) return 'execution';
  if (workspace.metrics.readinessScore >= 65) return 'planning';
  if (workspace.metrics.validationScore >= 55) return 'decision';
  if (workspace.profile.sectorId || workspace.profile.opportunityTitle) return 'analysis';
  return 'discovery';
};

const getSectorBlueprint = (workspace: ProjectWorkspace) => {
  const haystack = `${workspace.profile.sectorLabel || ''} ${workspace.profile.sectorGroup || ''} ${workspace.profile.opportunityTitle || ''}`.toLowerCase();
  return sectorTaskMap.find((entry) => entry.match.some((term) => haystack.includes(term.toLowerCase())));
};

const mergeUniqueTasks = (baseTasks: WorkspaceExecutionTask[], extraTasks: Omit<WorkspaceExecutionTask, 'status'>[]) => {
  const existingIds = new Set(baseTasks.map((task) => task.id));
  const merged = [...baseTasks];
  extraTasks.forEach((task) => {
    if (!existingIds.has(task.id)) {
      merged.push({ ...task, status: 'pending' });
    }
  });
  return merged;
};

const buildRecommendations = (workspace: ProjectWorkspace): WorkspaceRecommendation[] => {
  const recommendations: WorkspaceRecommendation[] = [];

  if (!workspace.profile.sectorId) {
    recommendations.push({
      id: 'rec-sector',
      title: 'حدد القطاع والفرصة أولًا',
      description: 'ابدأ من اكتشاف السوق أو محرك الفرص لتثبيت الاتجاه قبل بناء القرار.',
      actionLabel: 'فتح الاكتشاف',
      targetTab: 'market-discovery',
      priority: 'high',
    });
  }

  if (workspace.metrics.validationScore < 55) {
    recommendations.push({
      id: 'rec-validate',
      title: 'ارفع مستوى التحقق السوقي',
      description: 'أكمل الفرضيات والعميل المستهدف قبل الانتقال إلى قرار استثماري نهائي.',
      actionLabel: 'فتح الوضع السهل',
      targetTab: 'strategic-dashboard',
      priority: 'high',
    });
  }

  if (workspace.execution.autoTasks.filter((task) => task.status === 'completed').length < 3) {
    recommendations.push({
      id: 'rec-execution',
      title: 'ابدأ تنفيذ خطة 30-60-90',
      description: 'لديك الآن خطة تنفيذ أولية، ابدأ بإغلاق أول مهام التشغيل بدل الانتظار.',
      actionLabel: 'مراجعة التنفيذ',
      targetTab: 'workspace',
      priority: 'high',
    });
  }

  if (workspace.metrics.readinessScore < 70) {
    recommendations.push({
      id: 'rec-plan',
      title: 'أغلق فجوات الخطة الأساسية',
      description: 'تحليل السوق والخطة المالية ما زالا يحتاجان إلى استكمال لرفع الجاهزية.',
      actionLabel: 'فتح محرر الخطة',
      targetTab: 'editor',
      priority: 'medium',
    });
  }

  if (!workspace.brand.prompt) {
    recommendations.push({
      id: 'rec-brand',
      title: 'اربط الهوية بالرؤية',
      description: 'صغ هوية أولية للمشروع حتى تصبح الرسالة أوضح عند العرض والشراكات.',
      actionLabel: 'فتح الهوية',
      targetTab: 'brand-identity',
      priority: 'low',
    });
  }

  return recommendations.slice(0, 5);
};

export const deriveWorkspace = (workspace: ProjectWorkspace): ProjectWorkspace => {
  const completedSections = getCompletedSectionsCount(workspace.planSections);
  const totalSections = Math.max(workspace.planSections.length, 1);
  const aiAverage = getAverageScore(workspace.planSections, 'aiScore');
  const humanAverage = getAverageScore(workspace.planSections, 'humanScore');
  const validationBase = workspace.profile.sectorId ? 25 : 5;
  const assumptionsBonus = clamp(workspace.assumptions.length * 6, 0, 18);
  const riskPenalty = clamp(workspace.risks.length * 4, 0, 20);
  const journeyProgress = clamp(Math.round((completedSections / totalSections) * 55) + validationBase + assumptionsBonus - Math.round(riskPenalty / 2));
  const readinessScore = clamp(Math.round(journeyProgress * 0.45 + aiAverage * 0.35 + humanAverage * 0.2));
  const validationScore = clamp(Math.round(validationBase + assumptionsBonus + (workspace.profile.customerType ? 12 : 0) + (workspace.profile.opportunityTitle ? 10 : 0) - riskPenalty / 2));

  const sectorBlueprint = getSectorBlueprint(workspace);
  const baseTasks = workspace.execution.autoTasks?.length ? workspace.execution.autoTasks : baseAutoTasks();
  const autoTasks = mergeUniqueTasks(baseTasks, sectorBlueprint?.tasks || defaultSectorTasks());
  const sprintTasks = workspace.execution.firstCustomerSprint?.length ? workspace.execution.firstCustomerSprint : DEFAULT_FIRST_CUSTOMER_SPRINT;
  const doneAutoTasks = autoTasks.filter((task) => task.status === 'completed').length;
  const doneSprintTasks = sprintTasks.filter((task) => task.status === 'completed').length;
  const checklistItems = (workspace.execution.checklists || DEFAULT_CHECKLISTS()).flatMap((group) => group.items);
  const checklistDone = checklistItems.filter((item) => item.done).length;

  const executionScore = clamp(
    Math.round((doneAutoTasks / Math.max(autoTasks.length, 1)) * 40) +
      Math.round((doneSprintTasks / Math.max(sprintTasks.length, 1)) * 20) +
      Math.round((checklistDone / Math.max(checklistItems.length, 1)) * 25) +
      Math.round(readinessScore * 0.15)
  );
  const decisionStatus = deriveDecisionStatus(readinessScore, validationScore);

  const rationaleMap: Record<WorkspaceDecisionStatus, string> = {
    continue: 'المعطيات الحالية قوية بما يكفي للانتقال إلى التنفيذ المنضبط مع متابعة المخاطر.',
    validate: 'المشروع واعد، لكن يلزم اختبار فرضيات الطلب والميزة التنافسية قبل التوسع.',
    delay: 'هناك إشارات إيجابية جزئية، لكن الفجوات الحالية تمنع قرار التزام مباشر.',
    pivot: 'المؤشرات الحالية ضعيفة، والأفضل تعديل الاتجاه أو الشريحة أو عرض القيمة.',
  };

  const bottlenecks = [
    !workspace.profile.sectorId ? 'لم يتم تثبيت القطاع الرئيسي بعد' : '',
    validationScore < 50 ? 'التحقق السوقي ما زال منخفضًا' : '',
    readinessScore < 60 ? 'الخطة الاستثمارية غير مكتملة' : '',
    !workspace.profile.customerType ? 'العميل الأول غير محدد بوضوح' : '',
    doneSprintTasks < 2 ? 'أول 7 أيام لم تتحول بعد إلى نشاط جذب فعلي' : '',
    checklistDone < 5 ? 'التشغيل القانوني والمالي والتسويقي ما زال غير منضبط' : '',
  ].filter(Boolean);

  const weeklyPriorities: WorkspaceWeeklyPriority[] = [
    { id: 'w1', title: autoTasks.find((task) => task.priority === 'high' && task.status !== 'completed')?.title || 'تثبيت أول مهمة حرجة', owner: 'القيادة', done: false },
    { id: 'w2', title: sprintTasks.find((task) => task.status !== 'completed')?.title || 'إغلاق دورة العميل الأول', owner: 'المبيعات', done: doneSprintTasks >= sprintTasks.length },
    { id: 'w3', title: bottlenecks[0] ? `معالجة: ${bottlenecks[0]}` : 'متابعة مؤشرات الأداء الأولية', owner: 'العمليات', done: bottlenecks.length === 0 },
  ];

  const nextWorkspace: ProjectWorkspace = {
    ...workspace,
    updatedAt: new Date().toISOString(),
    metrics: {
      journeyProgress,
      readinessScore,
      validationScore,
      executionScore,
    },
    decision: {
      status: decisionStatus,
      confidence: clamp(Math.round((readinessScore + validationScore + executionScore) / 3)),
      rationale: rationaleMap[decisionStatus],
    },
    execution: {
      ...workspace.execution,
      weeklyPriorities,
      bottlenecks,
      phasePlan: workspace.execution.phasePlan?.length ? workspace.execution.phasePlan : DEFAULT_PHASE_PLAN,
      autoTasks,
      checklists: cloneChecklists(workspace.execution.checklists?.length ? workspace.execution.checklists : DEFAULT_CHECKLISTS()),
      firstCustomerSprint: sprintTasks,
      kpis: workspace.execution.kpis?.length ? workspace.execution.kpis : sectorBlueprint?.kpis || defaultKpis(),
    },
  };

  nextWorkspace.currentStage = deriveStage(nextWorkspace);
  nextWorkspace.recommendations = buildRecommendations(nextWorkspace);
  return nextWorkspace;
};

export const getExecutionCategoryLabel = (category: WorkspaceExecutionTask['category']) => CATEGORY_LABELS[category];
