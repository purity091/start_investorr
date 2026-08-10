import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Loader2, Mail, Lock, AlertCircle, ArrowLeft, User as UserIcon, Sparkles, Eye, EyeOff, CheckSquare, Square } from 'lucide-react';
import { DEFAULT_SUBSCRIPTION_PLAN_ID, SUBSCRIPTION_PLAN_IDS, SUBSCRIPTION_PLANS, SubscriptionPlanId } from '@/lib/subscriptionPlans';

type AuthMode = 'login' | 'register' | 'forgot_password';

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return '';
};

const postAuthAction = async (url: string, body: Record<string, unknown>) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => null)) as {
    error?: unknown;
    message?: unknown;
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

const getAuthErrorCode = (message: string) => message.split(':')[0] || message;

export const AuthScreen: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlanId>(DEFAULT_SUBSCRIPTION_PLAN_ID);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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
        await postAuthAction('/api/auth/login', {
          email,
          password,
        });

        if (rememberMe) {
          localStorage.setItem('khotta_remember_me', 'true');
        } else {
          localStorage.removeItem('khotta_remember_me');
        }

        window.location.href = getSafeRedirectPath();
      } else if (mode === 'register') {
        await postAuthAction('/api/auth/register', {
          name,
          email,
          password,
          subscriptionPlan,
        });
        setMessage('تم إنشاء الحساب بنجاح! إذا كانت المصادقة تتطلب تفعيلاً، مراجعة البريد الإلكتروني.');
      } else if (mode === 'forgot_password') {
        await postAuthAction('/api/auth/forgot-password', {
          email,
        });
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
      } else if (errorCode === 'SUPABASE_CAPTCHA_REJECTED') {
        setError('يبدو أن CAPTCHA ما زال مفعلاً من إعدادات Supabase Auth. عطّله من لوحة Supabase أو فعّل مسار تحقق جديد بشكل واضح.');
      } else if (errorCode === 'USER_ALREADY_REGISTERED' || errorMessage.includes('User already registered')) {
        setError('البريد الإلكتروني مسجل مسبقاً، يمكنك تسجيل الدخول مباشرة.');
      } else if (errorCode === 'WEAK_PASSWORD' || errorMessage.includes('Password should be at least')) {
        setError('كلمة المرور يجب أن تكون 6 أرقام أو أحرف على الأقل.');
      } else if (errorCode === 'VALIDATION_ERROR') {
        setError('تحقق من تعبئة البيانات المطلوبة بصورة صحيحة ثم حاول مرة أخرى.');
      } else if (errorCode === 'PASSWORD_RESET_FAILED') {
        setError('تعذر إرسال رابط استعادة كلمة المرور الآن. حاول مرة أخرى بعد قليل.');
      } else {
        setError('تعذر إكمال المصادقة الآن. تحقق من اتصالك ثم حاول مرة أخرى.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50 overflow-hidden font-['IBM_Plex_Sans_Arabic'] text-right">

      {/* Visual / Branding Side */}
      <div className="hidden md:flex md:w-1/2 relative bg-slate-900 overflow-hidden flex-col justify-between p-12 text-right">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen animate-pulse duration-1000" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/20 blur-[100px] mix-blend-screen" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-2xl shadow-xl shadow-blue-500/30">
            L
          </div>
          <span className="text-3xl font-black tracking-tight text-white">خطة<span className="text-blue-400">.</span></span>
        </div>

        <div className="relative z-10 max-w-lg mt-20">
          <Badge variant="outline" className="text-blue-300 border-blue-500/30 bg-blue-500/10 mb-6 px-4 py-1.5 backdrop-blur-md w-fit">
            <Sparkles className="size-4 ml-2 inline-block text-blue-300" />
            المنصة الأولى لبناء المشاريع
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-[1.3] mb-6">
            حوّل أفكارك الطموحة إلى <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">مشاريع ناجحة</span>.
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            انضم إلى آلاف المؤسسين ورواد الأعمال. ابنِ دراسة الجدوى، استكشف السوق، ونفذ مشروعك بثقة وخطوات مدروسة باستخدام الذكاء الاصطناعي.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-slate-500 font-medium">
          <span>© {new Date().getFullYear()} منصة خطة. جميع الحقوق محفوظة.</span>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative animate-in fade-in slide-in-from-left-8 duration-1000">

        {/* Mobile Logo */}
        <div className="absolute top-6 right-6 md:hidden flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-xl shadow-lg shadow-blue-600/20">
            L
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">خطة<span className="text-blue-600">.</span></span>
        </div>

        <div className="w-full max-w-[420px]">
          <div className="mb-8 text-right">
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              {mode === 'login' ? 'مرحباً بعودتك 👋' :
                mode === 'register' ? 'ابدأ رحلتك الآن 🚀' :
                  'استعادة كلمة المرور 🔐'}
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              {mode === 'login' ? 'سجل دخولك لمتابعة العمل على مشاريعك الطموحة.' :
                mode === 'register' ? 'أنشئ حسابك بسهولة للوصول إلى أدوات الذكاء الاصطناعي.' :
                  'أدخل بريدك الإلكتروني وسنرسل لك رابطاً لتعيين كلمة مرور جديدة.'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 animate-in zoom-in-95 duration-300 text-right">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="font-medium text-sm leading-relaxed">{error}</p>
              </div>
            )}

            {message && (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 animate-in zoom-in-95 duration-300 text-right">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="font-medium text-sm leading-relaxed">{message}</p>
              </div>
            )}

            {mode === 'register' && (
              <div className="space-y-2 text-right">
                <label className="text-sm font-bold text-slate-700">الاسم الكامل</label>
                <div className="relative group">
                  <UserIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
                  <Input
                    type="text"
                    placeholder="محمد عبدالله"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="pl-4 pr-11 py-6 bg-white border-slate-200 hover:border-slate-300 focus-visible:ring-blue-500 text-right shadow-sm rounded-xl transition-all"
                  />
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div className="space-y-2 text-right">
                <label className="text-sm font-bold text-slate-700">اختر باقة حدود المشاريع</label>
                <div className="grid gap-2 sm:grid-cols-3">
                  {SUBSCRIPTION_PLAN_IDS.map((planId) => {
                    const plan = SUBSCRIPTION_PLANS[planId];
                    const selected = subscriptionPlan === planId;

                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSubscriptionPlan(plan.id)}
                        className={`rounded-xl border px-3 py-3 text-right transition-colors ${
                          selected
                            ? 'border-blue-600 bg-blue-50 text-blue-900'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="block text-sm font-bold">{plan.name}</span>
                        <span className="mt-1 block text-xs font-medium text-slate-500">{plan.projectLimitLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="space-y-2 text-right">
              <label className="text-sm font-bold text-slate-700">البريد الإلكتروني</label>
              <div className="relative group">
                <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-4 pr-11 py-6 bg-white border-slate-200 hover:border-slate-300 focus-visible:ring-blue-500 text-left shadow-sm rounded-xl transition-all"
                  dir="ltr"
                />
              </div>
            </div>

            {mode !== 'forgot_password' && (
              <div className="space-y-2 text-right">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700">
                    كلمة المرور <span className="text-xs font-normal text-slate-400">(6 أرقام/أحرف أو أكثر)</span>
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => switchMode('forgot_password')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      نسيت كلمة المرور؟
                    </button>
                  )}
                </div>
                <div className="relative group">
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-12 pr-11 py-6 bg-white border-slate-200 hover:border-slate-300 focus-visible:ring-blue-500 text-left shadow-sm rounded-xl transition-all"
                    dir="ltr"
                  />
                  {/* Eye Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 focus:outline-none"
                    title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me Checkbox */}
            {mode === 'login' && (
              <div className="flex items-center gap-2 pt-1 text-right">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium cursor-pointer select-none"
                >
                  {rememberMe ? (
                    <CheckSquare className="h-5 w-5 text-blue-600 shrink-0" />
                  ) : (
                    <Square className="h-5 w-5 text-slate-300 shrink-0" />
                  )}
                  <span>تذكرني</span>
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base mt-4 shadow-xl shadow-slate-900/10 rounded-xl group transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="ml-2 h-5 w-5 animate-spin" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {mode === 'login' ? 'تسجيل الدخول' :
                    mode === 'register' ? 'إنشاء حساب جديد' :
                      'إرسال رابط الاستعادة'}
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center border-t border-slate-100 pt-8">
            <p className="text-sm font-medium text-slate-500">
              {mode === 'login' ? 'ليس لديك حساب؟ ' :
                mode === 'register' ? 'لديك حساب بالفعل؟ ' :
                  'تذكرت كلمة المرور؟ '}

              <button
                type="button"
                onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                {mode === 'login' ? 'سجل مجاناً' : 'سجل دخولك'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
