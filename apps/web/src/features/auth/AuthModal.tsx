'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  Loader2,
  Mail,
  Lock,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  User as UserIcon,
  Zap,
  Eye,
  EyeOff,
  CheckSquare,
  Square,
  CheckCircle2,
  Check,
  CreditCard,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { DEFAULT_SUBSCRIPTION_PLAN_ID, SUBSCRIPTION_PLAN_IDS, SUBSCRIPTION_PLANS, SubscriptionPlanId } from '@/lib/subscriptionPlans';

type AuthMode = 'login' | 'register' | 'forgot_password';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return '';
};

const getAuthErrorCode = (message: string) => message.split(':')[0] || message;

const postAuthAction = async (url: string, body: Record<string, unknown>) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => null)) as {
    error?: unknown;
    message?: unknown;
    sessionCreated?: boolean;
  } | null;

  if (!response.ok) {
    const errorCode = typeof payload?.error === 'string' ? payload.error : 'AUTH_REQUEST_FAILED';
    const detail = typeof payload?.message === 'string' ? payload.message : '';
    throw new Error(detail ? `${errorCode}:${detail}` : errorCode);
  }

  return payload;
};

const getSafeRedirectPath = () => {
  if (typeof window === 'undefined') return '/home';
  const params = new URLSearchParams(window.location.search);
  const rawTarget = params.get('next') || params.get('redirect');
  if (!rawTarget || rawTarget === '/workspace') return '/home';
  const target = rawTarget.startsWith('/') ? rawTarget : `/${rawTarget}`;
  if (target.startsWith('//') || target.includes('://') || target === '/workspace') return '/home';
  return target;
};

const PLAN_DETAILS: Record<SubscriptionPlanId, {
  tag: string;
  priceText: string;
  badge?: string;
  detailedFeatures: string[];
}> = {
  starter: {
    tag: 'الباقة الأولى',
    priceText: '99 ر.س / شهرياً أو $26.40 / شهرياً',
    badge: 'البدء الأساسي',
    detailedFeatures: [
      'سعة 5 مشاريع ودراسات جدوى',
      'تصفح عينات +500 شركة ناجحة',
      'حاسبة الإيرادات والنموذج المالي الأساسي',
    ],
  },
  founder: {
    tag: 'مدفوعة',
    priceText: `${SUBSCRIPTION_PLANS.founder.monthlyPriceSar} ر.س / شهرياً أو $${SUBSCRIPTION_PLANS.founder.monthlyPriceUsd.toFixed(2)} / شهرياً`,
    badge: 'الأكثر شعبية',
    detailedFeatures: [
      'سعة 10 مشاريع ودراسات متكاملة',
      'روابط مشاركة تفاعلية آمنة مع المستثمرين',
      'تحليل الفجوات والجاهزية الاستثمارية',
      'توليد تعليمات ChatGPT ومخرجات JSON',
    ],
  },
  leader: {
    tag: 'مدفوعة',
    priceText: `${SUBSCRIPTION_PLANS.leader.monthlyPriceSar} ر.س / شهرياً أو $${SUBSCRIPTION_PLANS.leader.monthlyPriceUsd.toFixed(2)} / شهرياً`,
    badge: 'متقدم للقياديين',
    detailedFeatures: [
      'سعة مشاريع غير محدودة',
      'تعدد المستخدمين ودعم فريق العمل',
      'تخصيص الهوية التجارية والشعار',
      'أولوية الاستشارات والمراجعة VIP 24/7',
    ],
  },
};

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [registerStep, setRegisterStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlanId>(DEFAULT_SUBSCRIPTION_PLAN_ID);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;
      setMode(initialMode);
      setRegisterStep(1);
      setError(null);
      setMessage(null);
    });

    return () => {
      cancelled = true;
    };
  }, [isOpen, initialMode]);

  const resetState = () => {
    setError(null);
    setMessage(null);
    setPassword('');
    setShowPassword(false);
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setRegisterStep(1);
    resetState();
  };

  const validateStep1 = () => {
    setError(null);

    if (!name.trim()) {
      setError('يرجى إدخال الاسم الكامل.');
      return false;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('يرجى إدخال بريد إلكتروني صحيح.');
      return false;
    }

    if (password.length < 6) {
      setError('كلمة المرور بسيطة جداً، يجب أن تتكون من 6 أرقام أو أحرف على الأقل.');
      return false;
    }

    return true;
  };

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (validateStep1()) {
      setRegisterStep(2);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    resetState();

    if (mode !== 'forgot_password' && password.length < 6) {
      setError('كلمة المرور بسيطة جداً، يجب أن تتكون من 6 أرقام أو أحرف على الأقل.');
      setIsLoading(false);
      return;
    }

    try {
      const limitResponse = await fetch('/api/auth/rate-limit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: mode, email }),
      });

      if (!limitResponse.ok) {
        throw new Error('RATE_LIMITED');
      }

      if (mode === 'login') {
        const normalizedEmail = email.trim().toLowerCase();
        const { error: browserAuthError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (browserAuthError) {
          throw browserAuthError;
        }

        window.location.href = getSafeRedirectPath();
        return;
      }

      if (mode === 'register') {
        const normalizedEmail = email.trim().toLowerCase();
        await postAuthAction('/api/auth/register', {
          email: normalizedEmail,
          password,
          name: name.trim(),
          subscriptionPlan,
        });

        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (loginError) {
          setMessage('تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول مباشرة.');
          setMode('login');
          setIsLoading(false);
          return;
        }

        window.location.href = getSafeRedirectPath();
        return;
      }

      if (mode === 'forgot_password') {
        const normalizedEmail = email.trim().toLowerCase();
        await postAuthAction('/api/auth/reset-password-request', {
          email: normalizedEmail,
        });

        setMessage('إذا كان هذا البريد مسجلاً لدينا، فستصلك تعليمات استعادة كلمة المرور قريباً.');
      }
    } catch (err: unknown) {
      const rawCode = getErrorMessage(err);
      const code = getAuthErrorCode(rawCode);

      if (code === 'RATE_LIMITED') {
        setError('تم تجاوز عدد المحاولات المسموح بها مؤقتاً، يرجى المحاولة بعد قليل.');
      } else if (code === 'Invalid login credentials' || code === 'INVALID_CREDENTIALS') {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
      } else if (code === 'EMAIL_EXISTS' || code === 'User already registered') {
        setError('هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول.');
      } else if (code === 'WEAK_PASSWORD') {
        setError('كلمة المرور ضعيفة جداً. يرجى استخدام 6 خانات على الأقل.');
      } else if (code === 'MISSING_FIELDS') {
        setError('يرجى ملء كافة الحقول المطلوبة بشكل صحيح.');
      } else {
        setError(rawCode || 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    if (mode === 'register') {
      if (registerStep === 1) {
        handleNextStep(e);
      } else if (registerStep === 2) {
        setRegisterStep(3);
      } else {
        handleAuth(e);
      }
    } else {
      handleAuth(e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        dir="rtl"
        className="w-[94vw] sm:max-w-[580px] max-h-[85vh] sm:max-h-[90vh] p-0 overflow-hidden border-0 shadow-2xl rounded-2xl sm:rounded-3xl bg-card text-foreground flex flex-col"
      >
        <DialogTitle className="sr-only">
          {mode === 'login' ? 'تسجيل الدخول' : mode === 'register' ? 'إنشاء حساب جديد' : 'استعادة كلمة المرور'}
        </DialogTitle>

        <div className="p-4 sm:p-7 space-y-4 sm:space-y-6 text-right overflow-y-auto max-h-[85vh] sm:max-h-[90vh]">
          
          {/* Top Brand Header */}
          <div className="flex items-center justify-between border-b border-border/30 pb-3 gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-8 sm:size-9 rounded-xl bg-primary text-primary-foreground font-black text-base sm:text-lg shadow-2xs shrink-0">
                L
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-base font-black text-foreground truncate">منصة خطة</h3>
                <p className="text-[9px] sm:text-[10px] text-muted-foreground font-semibold truncate hidden xs:block sm:block">استوديو نمذجة وبناء المشاريع</p>
              </div>
            </div>

            {/* Mode Selector Tabs */}
            <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border-0 shrink-0">
              <button
                type="button"
                onClick={() => switchMode('login')}
                className={cn(
                  "px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-black transition-all cursor-pointer border-0",
                  mode === 'login' ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
                )}
              >
                تسجيل الدخول
              </button>
              <button
                type="button"
                onClick={() => switchMode('register')}
                className={cn(
                  "px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-black transition-all cursor-pointer border-0",
                  mode === 'register' ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
                )}
              >
                إنشاء حساب
              </button>
            </div>
          </div>

          {/* Titles & Descriptions */}
          <div className="space-y-1">
            <h2 className="text-lg sm:text-2xl font-black text-foreground">
              {mode === 'login' && 'مرحباً بعودتك'}
              {mode === 'register' && (
                registerStep === 1 ? 'إنشاء حساب جديد' : registerStep === 2 ? 'اختر خطة اشتراكك' : 'خيارات الدفع والتفعيل'
              )}
              {mode === 'forgot_password' && 'استعادة كلمة المرور'}
            </h2>
            <p className="text-xs text-muted-foreground font-medium">
              {mode === 'login' && 'أدخل بيانات حسابك للمتابعة إلى لوحة تحكم مشاريعك.'}
              {mode === 'register' && (
                registerStep === 1
                  ? 'الخطوة 1 من 3: البيانات الشخصية الحسابية.'
                  : registerStep === 2
                  ? 'الخطوة 2 من 3: حدد الباقة المناسبة لمشاريعك.'
                  : 'الخطوة 3 من 3: مراجعة الدفع وتفعيل الاشتراك.'
              )}
              {mode === 'forgot_password' && 'أدخل بريدك الإلكتروني وسنرسل لك تعليمات إعادة التعيين.'}
            </p>
          </div>

          {/* Registration 3-Step Progress Indicator */}
          {mode === 'register' && (
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-2xl bg-muted/60 border-0">
              <button
                type="button"
                onClick={() => setRegisterStep(1)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1.5 sm:px-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer border-0 min-w-0",
                  registerStep === 1 ? "bg-background text-foreground shadow-2xs font-black" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className={cn(
                  "size-4.5 sm:size-5 rounded-full text-[9px] sm:text-[10px] font-black flex items-center justify-center shrink-0",
                  registerStep === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  1
                </span>
                <span className="truncate">البيانات</span>
              </button>

              <span className="text-muted-foreground/40 font-bold text-[10px] sm:text-xs select-none shrink-0">←</span>

              <button
                type="button"
                onClick={() => {
                  if (validateStep1()) setRegisterStep(2);
                }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1.5 sm:px-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer border-0 min-w-0",
                  registerStep === 2 ? "bg-background text-foreground shadow-2xs font-black" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className={cn(
                  "size-4.5 sm:size-5 rounded-full text-[9px] sm:text-[10px] font-black flex items-center justify-center shrink-0",
                  registerStep === 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  2
                </span>
                <span className="truncate">الباقة</span>
              </button>

              <span className="text-muted-foreground/40 font-bold text-[10px] sm:text-xs select-none shrink-0">←</span>

              <button
                type="button"
                onClick={() => {
                  if (validateStep1()) setRegisterStep(3);
                }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1.5 sm:px-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer border-0 min-w-0",
                  registerStep === 3 ? "bg-background text-foreground shadow-2xs font-black" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className={cn(
                  "size-4.5 sm:size-5 rounded-full text-[9px] sm:text-[10px] font-black flex items-center justify-center shrink-0",
                  registerStep === 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  3
                </span>
                <span className="truncate">الدفع</span>
              </button>
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start gap-2.5 rounded-2xl bg-destructive/10 p-3.5 text-destructive text-xs font-bold leading-relaxed border-0">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {message && (
              <div className="flex items-start gap-2.5 rounded-2xl bg-emerald-500/10 p-3.5 text-emerald-600 text-xs font-bold leading-relaxed border-0">
                <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
                <p>{message}</p>
              </div>
            )}

            {/* REGISTER STEP 1: Personal Details */}
            {mode === 'register' && registerStep === 1 && (
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-foreground">الاسم الكامل</label>
                  <div className="relative">
                    <UserIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type="text"
                      placeholder="محمد عبدالله"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pl-4 pr-10 py-5 bg-background border-0 shadow-2xs rounded-xl text-xs font-medium focus-visible:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-foreground">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-4 pr-10 py-5 bg-background border-0 shadow-2xs rounded-xl text-xs font-medium focus-visible:ring-primary text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-foreground">كلمة المرور</label>
                  <div className="relative">
                    <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="pl-10 pr-10 py-5 bg-background border-0 shadow-2xs rounded-xl text-xs font-medium focus-visible:ring-primary text-left"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs rounded-xl shadow-md gap-2 mt-2 cursor-pointer border-0"
                >
                  <span>الانتقال لاختيار الباقة</span>
                  <ArrowLeft className="size-4" />
                </Button>
              </div>
            )}

            {/* REGISTER STEP 2: Plan Selection */}
            {mode === 'register' && registerStep === 2 && (
              <div className="space-y-3">
                <div className="rounded-2xl bg-primary/5 p-3 flex items-start gap-2 text-xs text-muted-foreground border-0 shadow-2xs">
                  <Zap className="size-4 text-primary shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">
                    اختر الباقة المناسبة. تبدأ الباقات من <strong className="text-primary font-black">99 ر.س شهرياً</strong> (ما يعادل 26.40 دولاراً) مع خيارات سعة أكبر.
                  </p>
                </div>

                {/* Plans List */}
                <div className="grid gap-2.5 grid-cols-1">
                  {SUBSCRIPTION_PLAN_IDS.map((planId) => {
                    const plan = SUBSCRIPTION_PLANS[planId];
                    const meta = PLAN_DETAILS[planId];
                    const selected = subscriptionPlan === planId;

                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSubscriptionPlan(plan.id)}
                        className={cn(
                          'relative rounded-2xl p-3.5 text-right transition-all flex items-center justify-between cursor-pointer border-0 shadow-2xs',
                          selected
                            ? 'bg-primary/10 text-foreground ring-2 ring-primary'
                            : 'bg-muted/40 text-muted-foreground hover:bg-muted/70'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "size-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-all shadow-2xs",
                            selected
                              ? "bg-primary text-primary-foreground"
                              : "bg-background text-muted-foreground"
                          )}>
                            {selected ? <Check className="size-4" /> : plan.shortName.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-black text-foreground">{plan.name}</span>
                              <span className={cn(
                                "text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-2xs",
                                "bg-primary/15 text-primary"
                              )}>
                                {meta.tag}
                              </span>
                              {meta.badge && (
                                <span className="bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[9px] font-bold px-2 py-0.5 rounded-full">
                                  {meta.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-snug mt-0.5 font-medium">
                              {plan.description}
                            </p>
                          </div>
                        </div>

                        <div className="text-left shrink-0 mr-2 flex flex-col items-end gap-0.5">
                          <span className={cn(
                            "text-xs font-black px-2.5 py-1 rounded-lg shadow-2xs",
                            "text-primary bg-background"
                          )}>
                            {meta.priceText}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-bold">
                            {plan.projectLimitLabel}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Plan Features Breakdown */}
                {subscriptionPlan && PLAN_DETAILS[subscriptionPlan] && (
                  <div className="bg-muted/30 rounded-2xl p-3 space-y-1.5 border-0">
                    <div className="flex items-center justify-between text-[11px] font-black text-foreground mb-1">
                      <span>ميزات {SUBSCRIPTION_PLANS[subscriptionPlan].name}:</span>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full",
                        "bg-primary/10 text-primary"
                      )}>
                        خطة مدفوعة
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {PLAN_DETAILS[subscriptionPlan].detailedFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
                          <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setRegisterStep(1)}
                    className="py-5 px-4 text-muted-foreground hover:text-foreground font-bold text-xs rounded-xl gap-2 cursor-pointer border-0"
                  >
                    <ArrowRight className="size-4" />
                    <span>البيانات الشخصية</span>
                  </Button>

                  <Button
                    type="button"
                    onClick={() => setRegisterStep(3)}
                    className="flex-1 py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs rounded-xl shadow-md gap-2 cursor-pointer border-0"
                  >
                    <span>متابعة لخيارات الدفع</span>
                    <ArrowLeft className="size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* REGISTER STEP 3: Payment Options & Final Activation */}
            {mode === 'register' && registerStep === 3 && (
              <div className="space-y-4">
                {/* Plan Summary Badge */}
                <div className="p-3.5 rounded-2xl bg-muted/40 border-0 flex items-center justify-between shadow-2xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-muted-foreground font-bold block">الباقة المختارة:</span>
                    <h4 className="text-xs font-black text-foreground">{SUBSCRIPTION_PLANS[subscriptionPlan].name}</h4>
                  </div>
                  <Badge className={cn(
                    "text-xs font-black px-3 py-1 border-0 shadow-2xs",
                    "bg-primary text-primary-foreground"
                  )}>
                    {PLAN_DETAILS[subscriptionPlan].priceText}
                  </Badge>
                </div>

                {/* Paid Plan Options */}
                <div className="space-y-3">
                    <label className="text-xs font-extrabold text-foreground block">طريقة الدفع والتفعيل</label>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={cn(
                          "p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border-0 shadow-2xs text-xs font-bold",
                          paymentMethod === 'card'
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-muted/50 text-muted-foreground hover:bg-muted"
                        )}
                      >
                        <CreditCard className="size-4" />
                        <span>بطاقة / Apple Pay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bank_transfer')}
                        className={cn(
                          "p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border-0 shadow-2xs text-xs font-bold",
                          paymentMethod === 'bank_transfer'
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-muted/50 text-muted-foreground hover:bg-muted"
                        )}
                      >
                        <Building2 className="size-4" />
                        <span>تحويل بنكي مباشر</span>
                      </button>
                    </div>

                    {/* Card Form */}
                    {paymentMethod === 'card' && (
                      <div className="p-3.5 rounded-2xl bg-muted/20 border-0 space-y-2.5">
                        <Input
                          type="text"
                          placeholder="رقم البطاقة (•••• •••• •••• ••••)"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="bg-background border-0 text-xs py-4 rounded-xl text-left"
                          dir="ltr"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            type="text"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="bg-background border-0 text-xs py-4 rounded-xl text-center"
                            dir="ltr"
                          />
                          <Input
                            type="text"
                            placeholder="CVC"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="bg-background border-0 text-xs py-4 rounded-xl text-center"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    )}

                    {/* Bank Transfer Details */}
                    {paymentMethod === 'bank_transfer' && (
                      <div className="p-3.5 rounded-2xl bg-muted/30 border-0 space-y-2 text-xs font-medium">
                        <div className="flex justify-between text-muted-foreground">
                          <span>البنك:</span>
                          <strong className="text-foreground font-black">مصرف الراجحي</strong>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>اسم الحساب:</span>
                          <strong className="text-foreground font-black">شركة خطة لتقنية المعلومات</strong>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>رقم الإيبان (IBAN):</span>
                          <strong className="text-foreground font-black text-left" dir="ltr">SA03 8000 0000 6080 1010 9999</strong>
                        </div>
                        <div className="pt-2 border-t border-border/20 space-y-1">
                          <label className="text-[11px] font-bold text-foreground block">إرفاق صورة الوصل (اختياري)</label>
                          <Input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => setReceiptFile(e.target.files?.[0] ?? null)}
                            className="bg-background border-0 text-xs py-3 rounded-xl cursor-pointer"
                          />
                          {receiptFile && (
                            <p className="text-[10px] text-emerald-600 font-bold truncate">
                              تم اختيار: {receiptFile.name}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                </div>

                {/* Final Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setRegisterStep(2)}
                    className="py-5 px-4 text-muted-foreground hover:text-foreground font-bold text-xs rounded-xl gap-2 cursor-pointer border-0"
                  >
                    <ArrowRight className="size-4" />
                    <span>تعديل الباقة</span>
                  </Button>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs rounded-xl shadow-md gap-2 cursor-pointer border-0"
                  >
                    {isLoading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <>
                        <span>
                          تأكيد الاشتراك وتفعيل الحساب
                        </span>
                        <ArrowLeft className="size-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* LOGIN MODE */}
            {mode === 'login' && (
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-foreground">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-4 pr-10 py-5 bg-background border-0 shadow-2xs rounded-xl text-xs font-medium focus-visible:ring-primary text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-foreground">كلمة المرور</label>
                    <button
                      type="button"
                      onClick={() => switchMode('forgot_password')}
                      className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                    >
                      نسيت كلمة المرور؟
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="pl-10 pr-10 py-5 bg-background border-0 shadow-2xs rounded-xl text-xs font-medium focus-visible:ring-primary text-left"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setRememberMe(!rememberMe)}
                    className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {rememberMe ? (
                      <CheckSquare className="size-4 text-primary shrink-0" />
                    ) : (
                      <Square className="size-4 text-muted-foreground shrink-0" />
                    )}
                    <span>تذكر بيانات الدخول</span>
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs rounded-xl shadow-md gap-2 mt-2 cursor-pointer border-0"
                >
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      <span>تسجيل الدخول الفوري</span>
                      <ArrowLeft className="size-4" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* FORGOT PASSWORD MODE */}
            {mode === 'forgot_password' && (
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-foreground">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-4 pr-10 py-5 bg-background border-0 shadow-2xs rounded-xl text-xs font-medium focus-visible:ring-primary text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs rounded-xl shadow-md gap-2 mt-2 cursor-pointer border-0"
                >
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      <span>إرسال رابط الاستعادة</span>
                      <ArrowLeft className="size-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </form>

        </div>
      </DialogContent>
    </Dialog>
  );
};
