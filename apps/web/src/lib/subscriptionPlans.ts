export const SUBSCRIPTION_PLAN_IDS = ['starter', 'founder', 'leader'] as const;

export type SubscriptionPlanId = (typeof SUBSCRIPTION_PLAN_IDS)[number];

export type ProjectLimit = number | null;

export type SubscriptionPlan = {
  id: SubscriptionPlanId;
  name: string;
  shortName: string;
  projectLimit: ProjectLimit;
  projectLimitLabel: string;
  description: string;
};

export const SUBSCRIPTION_PLANS: Record<SubscriptionPlanId, SubscriptionPlan> = {
  starter: {
    id: 'starter',
    name: 'باقة رائد',
    shortName: 'رائد',
    projectLimit: 5,
    projectLimitLabel: '5 مشاريع',
    description: 'مناسبة للتجربة وبناء أول مجموعة مشاريع.',
  },
  founder: {
    id: 'founder',
    name: 'باقة مؤسس',
    shortName: 'مؤسس',
    projectLimit: 10,
    projectLimitLabel: '10 مشاريع',
    description: 'للعمل الجاد على أكثر من فكرة ومقارنة البدائل.',
  },
  leader: {
    id: 'leader',
    name: 'باقة قائد',
    shortName: 'قائد',
    projectLimit: null,
    projectLimitLabel: 'مشاريع غير محدودة',
    description: 'لإدارة عدد مفتوح من المشاريع ودراسات الجدوى.',
  },
};

export const DEFAULT_SUBSCRIPTION_PLAN_ID: SubscriptionPlanId = 'starter';

export const isSubscriptionPlanId = (value: unknown): value is SubscriptionPlanId =>
  typeof value === 'string' && SUBSCRIPTION_PLAN_IDS.includes(value as SubscriptionPlanId);

export const normalizeSubscriptionPlanId = (value: unknown): SubscriptionPlanId =>
  isSubscriptionPlanId(value) ? value : DEFAULT_SUBSCRIPTION_PLAN_ID;

export const getSubscriptionPlan = (value: unknown) =>
  SUBSCRIPTION_PLANS[normalizeSubscriptionPlanId(value)];

export const SUBSCRIPTION_PLAN_ORDER: Record<SubscriptionPlanId, number> = {
  starter: 0,
  founder: 1,
  leader: 2,
};

export const isHigherSubscriptionPlan = ({
  currentPlanId,
  targetPlanId,
}: {
  currentPlanId: unknown;
  targetPlanId: unknown;
}) =>
  SUBSCRIPTION_PLAN_ORDER[normalizeSubscriptionPlanId(targetPlanId)]
  > SUBSCRIPTION_PLAN_ORDER[normalizeSubscriptionPlanId(currentPlanId)];

export const hasReachedProjectLimit = ({
  planId,
  activeProjectsCount,
}: {
  planId: unknown;
  activeProjectsCount: number;
}) => {
  const plan = getSubscriptionPlan(planId);
  return plan.projectLimit !== null && activeProjectsCount >= plan.projectLimit;
};
