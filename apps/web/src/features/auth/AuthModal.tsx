'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Loader2, Mail, Lock, AlertCircle, ArrowLeft, User as UserIcon, Zap, Eye, EyeOff, CheckSquare, Square, X, CheckCircle2 } from 'lucide-react';
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

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
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
    resetState();
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false} className="sm:max-w-[850px] max-h-[90vh] overflow-y-auto p-0 border-border/80 bg-card rounded-3xl shadow-2xl backdrop-blur-xl">
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
          <div className="hidden md:flex md:col-span-5 relative bg-slate-950 overflow-hidden flex-col justify-between p-8 text-right border-l border-border/40">
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
              <Badge variant="outline" className="text-primary-foreground border-primary/40 bg-primary/15 px-3 py-1 text-xs gap-1.5 font-bold w-fit">
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
            <div className="mb-6">
              <div className="flex items-center gap-2 bg-muted/60 p-1 rounded-2xl w-fit mb-4 border border-border/40">
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
                {mode === 'register' && 'ابدأ رحلتك الآن'}
                {mode === 'forgot_password' && 'استعادة كلمة المرور'}
              </h2>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                {mode === 'login' && 'أدخل بريدك وكلمة المرور لمتابعة مشاريعك.'}
                {mode === 'register' && 'أنشئ حسابك المجاني للوصول إلى كافة الأدوات.'}
                {mode === 'forgot_password' && 'أدخل بريدك وسنرسل لك رابط التعيين.'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAuth} className="space-y-4">
              {error && (
                <div className="flex items-start gap-2.5 rounded-2xl border border-destructive/30 bg-destructive/10 p-3.5 text-destructive text-xs font-bold leading-relaxed">
                  <AlertCircle className="size-4 shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              {message && (
                <div className="flex items-start gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-emerald-600 text-xs font-bold leading-relaxed">
                  <AlertCircle className="size-4 shrink-0 mt-0.5" />
                  <p>{message}</p>
                </div>
              )}

              {mode === 'register' && (
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
                      className="pl-4 pr-10 py-5 bg-background border-border/80 rounded-xl text-xs font-medium focus-visible:ring-primary"
                    />
                  </div>
                </div>
              )}

              {mode === 'register' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-foreground">اختر الباقة المناسبة لك</label>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      مجاناً 0$ الآن
                    </span>
                  </div>

                  <div className="grid gap-2 grid-cols-1 sm:grid-cols-3">
                    {SUBSCRIPTION_PLAN_IDS.map((planId) => {
                      const plan = SUBSCRIPTION_PLANS[planId];
                      const selected = subscriptionPlan === planId;
                      const isPopular = planId === 'founder';

                      return (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setSubscriptionPlan(plan.id)}
                          className={cn(
                            'relative rounded-2xl border-2 p-3 text-right transition-all flex flex-col justify-between cursor-pointer group',
                            selected
                              ? 'border-primary bg-primary/5 text-foreground shadow-xs'
                              : 'border-border/60 bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted/30'
                          )}
                        >
                          {isPopular && (
                            <span className="absolute -top-2.5 left-3 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                              الأكثر شعبية
                            </span>
                          )}

                          <div className="flex items-center justify-between gap-1.5 mb-1">
                            <span className="text-xs font-black text-foreground">{plan.name}</span>
                            {selected ? (
                              <CheckCircle2 className="size-4 text-primary shrink-0" />
                            ) : (
                              <div className="size-4 rounded-full border border-muted-foreground/30 shrink-0" />
                            )}
                          </div>

                          <div className="space-y-1">
                            <div className="text-[11px] font-bold text-foreground">
                              {plan.projectLimitLabel}
                            </div>
                            <p className="text-[10px] text-muted-foreground leading-relaxed">
                              {plan.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

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
                    className="pl-4 pr-10 py-5 bg-background border-border/80 rounded-xl text-xs font-medium focus-visible:ring-primary text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              {mode !== 'forgot_password' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-foreground">كلمة المرور</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => switchMode('forgot_password')}
                        className="text-[11px] font-bold text-primary hover:underline"
                      >
                        نسيت كلمة المرور؟
                      </button>
                    )}
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
                      className="pl-10 pr-10 py-5 bg-background border-border/80 rounded-xl text-xs font-medium focus-visible:ring-primary text-left"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'login' && (
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
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs rounded-xl shadow-md gap-2 mt-2"
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    <span>
                      {mode === 'login' && 'تسجيل الدخول الفوري'}
                      {mode === 'register' && 'إنشاء حساب جديد مجاناً'}
                      {mode === 'forgot_password' && 'إرسال رابط الاستعادة'}
                    </span>
                    <ArrowLeft className="size-4" />
                  </>
                )}
              </Button>

            </form>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
