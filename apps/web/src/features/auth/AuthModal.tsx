'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Loader2, Mail, Lock, AlertCircle, ArrowLeft, ArrowRight, User as UserIcon, Zap, Eye, EyeOff, CheckSquare, Square, X, CheckCircle2, Check } from 'lucide-react';
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
  if (typeof window === 'undefined') return '/workspace';
  const params = new URLSearchParams(window.location.search);
  const rawTarget = params.get('next') || params.get('redirect');
  if (!rawTarget) return '/workspace';
  const target = rawTarget.startsWith('/') ? rawTarget : `/${rawTarget}`;
  if (target.startsWith('//') || target.includes('://')) return '/workspace';
  return target;
};

const PLAN_DETAILS: Record<SubscriptionPlanId, {
  tag: string;
  isFree: boolean;
  priceText: string;
  badge?: string;
  detailedFeatures: string[];
}> = {
  starter: {
    tag: 'مجانية 100%',
    isFree: true,
    priceText: '0 ر.س (مجاناً)',
    badge: 'البدء السريع',
    detailedFeatures: [
      'سعة 5 مشاريع ودراسات جدوى',
      'تصفح عينات +500 شركة ناجحة',
      'حاسبة الإيرادات والنموذج المالي الأساسي',
    ],
  },
  founder: {
    tag: 'مدفوعة',
    isFree: false,
    priceText: '35 ر.س / شهرياً',
    badge: 'الأكثر شعبية 🔥',
    detailedFeatures: [
      'سعة 10 مشاريع ودراسات متكاملة',
      'روابط مشاركة تفاعلية آمنة مع المستثمرين',
      'تحليل الفجوات والجاهزية الاستثمارية',
      'توليد تعليمات ChatGPT ومخرجات JSON',
    ],
  },
  leader: {
    tag: 'مدفوعة',
    isFree: false,
    priceText: '75 ر.س / شهرياً',
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
  const [registerStep, setRegisterStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlanId>(DEFAULT_SUBSCRIPTION_PLAN_ID);
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

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('يرجى إدخال الاسم الكامل.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('يرجى إدخال بريد إلكتروني صحيح.');
      return;
    }

    if (password.length < 6) {
      setError('كلمة المرور بسيطة جداً، يجب أن تتكون من 6 أرقام أو أحرف على الأقل.');
      return;
    }

    setRegisterStep(2);
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
        if (browserAuthError) throw browserAuthError;
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error('AUTH_SESSION_NOT_CREATED');
        if (rememberMe) {
          localStorage.setItem('khotta_remember_me', 'true');
        } else {
          localStorage.removeItem('khotta_remember_me');
        }
        window.location.replace(getSafeRedirectPath());
      } else if (mode === 'register') {
        const registration = await postAuthAction('/api/auth/register', { name, email, password, subscriptionPlan });
        if (!registration?.sessionCreated) {
          setMessage('تم إنشاء الحساب. افتح رسالة تأكيد البريد الإلكتروني، ثم سجّل الدخول من النافذة نفسها.');
          setMode('login');
          setRegisterStep(1);
          setPassword('');
          return;
        }
        const { error: browserAuthError } = await supabase.auth.signInWithPassword({ email, password });
        if (browserAuthError) throw browserAuthError;
        if (!(await supabase.auth.getSession()).data.session) {
          throw new Error('AUTH_SESSION_NOT_CREATED');
        }
        if (rememberMe) localStorage.setItem('khotta_remember_me', 'true');
        window.location.href = getSafeRedirectPath();
        setMessage('تم إنشاء الحساب بنجاح! إذا كانت المصادقة تتطلب تفعيلاً، راجع بريدك الإلكتروني.');
      } else if (mode === 'forgot_password') {
        await postAuthAction('/api/auth/forgot-password', { email });
        setMessage('تم إرسال تعليمات استعادة كلمة المرور إلى بريدك الإلكتروني.');
      }
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      const errorCode = getAuthErrorCode(errorMessage);

      if (errorCode === 'RATE_LIMITED') {
        setError('تم تجاوز عدد المحاولات المسموح. حاول لاحقاً.');
      } else if (errorCode === 'INVALID_CREDENTIALS' || errorCode === 'Invalid login credentials') {
        setError('بيانات الدخول غير صحيحة، تأكد من البريد وكلمة المرور.');
      } else if (errorCode === 'EMAIL_NOT_CONFIRMED') {
        setError('الحساب موجود لكن البريد الإلكتروني غير مفعّل. راجع بريدك واضغط رابط التفعيل.');
      } else if (errorCode === 'USER_ALREADY_REGISTERED' || errorMessage.includes('User already registered')) {
        setError('البريد الإلكتروني مسجل مسبقاً، يمكنك تسجيل الدخول مباشرة.');
      } else if (errorCode === 'WEAK_PASSWORD' || errorMessage.includes('Password should be at least')) {
        setError('كلمة المرور يجب أن تكون 6 أرقام أو أحرف على الأقل.');
      } else {
        setError('تعذر إكمال العملية. تأكد من البيانات ودقة الاتصال.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register' && registerStep === 1) {
      handleNextStep();
      return;
    }
    handleAuth(e);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false} className="sm:max-w-[850px] max-h-[90vh] overflow-y-auto p-0 border-0 bg-card rounded-3xl shadow-2xl backdrop-blur-xl">
        <DialogTitle className="sr-only">نافذة تسجيل الدخول وإنشاء الحساب</DialogTitle>

        {/* Custom Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-50 p-2 rounded-full bg-background/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-all shadow-xs cursor-pointer"
          title="إغلاق"
        >
          <X className="size-5" />
        </button>

        <div dir="rtl" className="grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
          {/* Visual / Branding Sidebar */}
          <div className="hidden md:flex md:col-span-5 relative bg-slate-950 overflow-hidden flex-col justify-between p-8 text-right border-0">
            {/* Background Glows */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-primary/25 blur-[100px] mix-blend-screen animate-pulse duration-1000" />
              <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-600/20 blur-[90px] mix-blend-screen" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
            </div>

            {/* Logo */}
            <div className="relative z-10 flex items-center gap-2.5">
              <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-primary to-indigo-600 text-primary-foreground font-black text-xl shadow-lg shadow-primary/20">
                L
              </div>
              <span className="text-2xl font-black tracking-tight text-white">خطة<span className="text-primary">.</span></span>
            </div>

            {/* Content */}
            <div className="relative z-10 my-auto py-6 space-y-4">
              <Badge variant="outline" className="text-primary-foreground border-0 bg-primary/20 px-3 py-1 text-xs gap-1.5 font-bold w-fit">
                <Zap className="size-3.5 text-primary" />
                استوديو بناء المشاريع
              </Badge>

              <h3 className="text-2xl font-black text-white leading-snug">
                انطلق في بناء مشروعك <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-300">
                  بمنهجية معتمدة وذكاء اصطناعي
                </span>
              </h3>

              <ul className="space-y-2 text-xs text-slate-300 font-medium pt-2">
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-emerald-400"></span>
                  توليد نماذج العمل التجاري BMC في ثوانٍ
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-blue-400"></span>
                  استكشاف الفرص وقواعد البيانات الاستثمارية
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-amber-400"></span>
                  حساب التكاليف ومؤشرات الـ SaaS المتقدمة
                </li>
              </ul>
            </div>

            {/* Footer */}
            <div className="relative z-10 text-[11px] text-slate-400 font-medium">
              جميع الحقوق محفوظة © {new Date().getFullYear()} خطة.
            </div>
          </div>

          {/* Authentication Form Side */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center text-right">
            
            {/* Header / Mode Selector */}
            <div className="mb-4">
              <div className="flex items-center gap-2 bg-muted/60 p-1 rounded-2xl w-fit mb-3 border-0">
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className={cn(
                    "px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer",
                    mode === 'login' ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  تسجيل الدخول
                </button>
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  className={cn(
                    "px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer",
                    mode === 'register' ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  إنشاء حساب جديد
                </button>
              </div>

              <h2 className="text-2xl font-black text-foreground">
                {mode === 'login' && 'مرحباً بعودتك'}
                {mode === 'register' && (registerStep === 1 ? 'ابدأ رحلتك الآن' : 'اختر خطة اشتراكك')}
                {mode === 'forgot_password' && 'استعادة كلمة المرور'}
              </h2>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                {mode === 'login' && 'أدخل بريدك وكلمة المرور لمتابعة مشاريعك.'}
                {mode === 'register' && (registerStep === 1 ? 'الخطوة 1 من 2: أنشئ حسابك الشخصي للوصول للأدوات.' : 'الخطوة 2 من 2: حدد الباقة المناسبة (مجانية أو مدفوعة).')}
                {mode === 'forgot_password' && 'أدخل بريدك وسنرسل لك رابط التعيين.'}
              </p>
            </div>

            {/* Registration Step Progress Indicator */}
            {mode === 'register' && (
              <div className="flex items-center gap-2 mb-4 p-1 rounded-2xl bg-muted/50 border-0">
                <button
                  type="button"
                  onClick={() => setRegisterStep(1)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer",
                    registerStep === 1
                      ? "bg-background text-foreground shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className={cn(
                    "size-5 rounded-full text-[10px] font-black flex items-center justify-center transition-all",
                    registerStep === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    1
                  </span>
                  <span>البيانات الشخصية</span>
                </button>

                <span className="text-muted-foreground/30 font-bold text-xs select-none">←</span>

                <button
                  type="button"
                  onClick={() => {
                    if (name && email && password.length >= 6) {
                      setRegisterStep(2);
                    } else {
                      handleNextStep();
                    }
                  }}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer",
                    registerStep === 2
                      ? "bg-background text-foreground shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className={cn(
                    "size-5 rounded-full text-[10px] font-black flex items-center justify-center transition-all",
                    registerStep === 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    2
                  </span>
                  <span>اختيار الباقة</span>
                </button>
              </div>
            )}

            {/* Form */}
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

              {/* REGISTER STEP 1 */}
              {mode === 'register' && registerStep === 1 && (
                <>
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
                    className="w-full py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs rounded-xl shadow-md gap-2 mt-2 cursor-pointer"
                  >
                    <span>الانتقال لاختيار الباقة</span>
                    <ArrowLeft className="size-4" />
                  </Button>
                </>
              )}

              {/* REGISTER STEP 2 */}
              {mode === 'register' && registerStep === 2 && (
                <div className="space-y-3">
                  {/* Informative Banner */}
                  <div className="rounded-2xl bg-primary/5 p-3 flex items-start gap-2.5 text-xs text-muted-foreground border-0 shadow-2xs">
                    <Zap className="size-4 text-primary shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-medium">
                      يمكنك البدء فوراً بـ <strong className="text-emerald-600 dark:text-emerald-400 font-black">الباقة المجانية</strong> دون بطاقة ائتمان، أو اختيار إحدى <strong className="text-primary font-black">الباقات المدفوعة</strong> لسعة أكبر وأدوات متقدمة.
                    </p>
                  </div>

                  {/* Plans List */}
                  <div className="grid gap-2 grid-cols-1">
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
                            'relative rounded-2xl p-3 text-right transition-all flex items-center justify-between cursor-pointer border-0 shadow-2xs',
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
                                : meta.isFree
                                  ? "bg-emerald-500/15 text-emerald-600"
                                  : "bg-background text-muted-foreground"
                            )}>
                              {selected ? <Check className="size-4" /> : plan.shortName.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-black text-foreground">{plan.name}</span>
                                
                                <span className={cn(
                                  "text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-2xs",
                                  meta.isFree
                                    ? "bg-emerald-500/15 text-emerald-600"
                                    : "bg-primary/15 text-primary"
                                )}>
                                  {meta.tag}
                                </span>

                                {meta.badge && !meta.isFree && (
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
                              meta.isFree ? "text-emerald-600 bg-background" : "text-primary bg-background"
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
                          PLAN_DETAILS[subscriptionPlan].isFree ? "bg-emerald-500/10 text-emerald-600" : "bg-primary/10 text-primary"
                        )}>
                          {PLAN_DETAILS[subscriptionPlan].isFree ? 'خطة مجانية' : 'خطة مدفوعة'}
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
                      onClick={() => {
                        setError(null);
                        setRegisterStep(1);
                      }}
                      className="py-5 px-4 text-muted-foreground hover:text-foreground font-bold text-xs rounded-xl gap-2 cursor-pointer"
                    >
                      <ArrowRight className="size-4" />
                      <span>العودة للبيانات</span>
                    </Button>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs rounded-xl shadow-md gap-2 cursor-pointer"
                    >
                      {isLoading ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <>
                          <span>
                            {PLAN_DETAILS[subscriptionPlan]?.isFree ? 'البدء بالحساب المجاني' : 'متابعة بـ ' + SUBSCRIPTION_PLANS[subscriptionPlan].name}
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
                <>
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
                    className="w-full py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs rounded-xl shadow-md gap-2 mt-2 cursor-pointer"
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
                </>
              )}

              {/* FORGOT PASSWORD MODE */}
              {mode === 'forgot_password' && (
                <>
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
                    className="w-full py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs rounded-xl shadow-md gap-2 mt-2 cursor-pointer"
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
                </>
              )}
            </form>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

