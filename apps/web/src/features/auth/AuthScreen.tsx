import React, { useEffect, useId, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Loader2, Mail, Lock, AlertCircle, ArrowLeft, User as UserIcon, Sparkles, Eye, EyeOff, CheckSquare, Square } from 'lucide-react';

type AuthMode = 'login' | 'register' | 'forgot_password';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: (errorCode?: string) => boolean;
          theme?: 'light' | 'dark' | 'auto';
          language?: string;
          size?: 'normal' | 'compact' | 'flexible';
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const TURNSTILE_SCRIPT_ID = 'cloudflare-turnstile-script';

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

const loadTurnstileConfig = async () => {
  const response = await fetch('/api/auth/turnstile-config', { cache: 'no-store' });
  const payload = (await response.json().catch(() => null)) as {
    enabled?: unknown;
    siteKey?: unknown;
    siteKeyConfigured?: unknown;
    secretConfigured?: unknown;
  } | null;

  if (!response.ok || !payload) {
    throw new Error('TURNSTILE_CONFIG_FAILED');
  }

  return {
    enabled: payload.enabled === true,
    siteKey: typeof payload.siteKey === 'string' ? payload.siteKey : '',
    siteKeyConfigured: payload.siteKeyConfigured === true,
    secretConfigured: payload.secretConfigured === true,
  };
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

const loadTurnstileScript = () => {
  if (typeof window === 'undefined') return Promise.reject(new Error('Turnstile requires a browser.'));
  if (window.turnstile) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Turnstile.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Turnstile.'));
    document.head.appendChild(script);
  });
};

const TurnstileField: React.FC<{
  actionKey: string;
  siteKey: string | null;
  configLoading: boolean;
  configError: string | null;
  onTokenChange: (token: string | null) => void;
  onError: (message: string | null) => void;
}> = ({ actionKey, siteKey, configLoading, configError, onTokenChange, onError }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'verified' | 'error'>('loading');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const generatedId = useId().replace(/:/g, '');
  const containerId = `turnstile-${generatedId}`;

  useEffect(() => {
    if (!siteKey) return;

    let cancelled = false;
    onTokenChange(null);
    onError(null);

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;

        if (widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: 'light',
          language: 'ar',
          size: 'normal',
          callback: (token) => {
            setStatus('verified');
            onError(null);
            onTokenChange(token);
          },
          'expired-callback': () => {
            setStatus('ready');
            onTokenChange(null);
            onError('انتهت صلاحية التحقق الأمني. أعد التحقق ثم حاول مرة أخرى.');
          },
          'error-callback': (errorCode) => {
            const message =
              errorCode === '110200'
                ? 'نطاق الموقع الحالي غير مسموح في Cloudflare Turnstile. أضف هذا النطاق في Hostname Management ثم أعد تحميل الصفحة.'
                : errorCode
                  ? `تعذر تحميل التحقق الأمني. كود Cloudflare: ${errorCode}`
                  : 'تعذر تحميل التحقق الأمني. حدّث الصفحة أو حاول لاحقاً.';
            setStatus('error');
            setStatusMessage(message);
            onTokenChange(null);
            onError(message);
            return true;
          },
        });
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) {
          const message = 'تعذر تحميل التحقق الأمني. تأكد من الاتصال ثم حاول مرة أخرى.';
          setStatus('error');
          setStatusMessage(message);
          onTokenChange(null);
          onError(message);
        }
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [actionKey, onError, onTokenChange, siteKey]);

  if (configLoading) {
    return (
      <div className="space-y-2 text-right">
        <label className="text-sm font-bold text-slate-700">التحقق الأمني</label>
        <div className="flex min-h-[76px] items-center justify-center rounded-xl border border-slate-200 bg-white p-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Loader2 className="size-4 animate-spin" />
            جاري تجهيز التحقق الأمني...
          </div>
        </div>
      </div>
    );
  }

  if (!siteKey) {
    return (
      <div className="space-y-2 text-right">
        <label className="text-sm font-bold text-slate-700">التحقق الأمني</label>
        <div className="flex min-h-[76px] items-center justify-center rounded-xl border border-red-200 bg-red-50 p-3">
          <p className="max-w-xs text-center text-xs font-semibold leading-6 text-red-700">
            {configError || 'التحقق الأمني غير مهيأ حالياً.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 text-right">
      <label className="text-sm font-bold text-slate-700">التحقق الأمني</label>
      <div className="flex min-h-[76px] items-center justify-center rounded-xl border border-slate-200 bg-white p-2">
        <div className="flex flex-col items-center gap-2">
          {status === 'loading' && (
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Loader2 className="size-4 animate-spin" />
              جاري تحميل التحقق الأمني...
            </div>
          )}
          {status === 'error' && (
            <p className="max-w-xs text-center text-xs font-semibold leading-6 text-red-600">
              {statusMessage || 'تعذر عرض التحقق الأمني. حدّث الصفحة أو تأكد أن Cloudflare Turnstile يسمح بهذا النطاق.'}
            </p>
          )}
          <div id={containerId} ref={containerRef} className={status === 'error' ? 'hidden' : ''} />
        </div>
      </div>
    </div>
  );
};

export const AuthScreen: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const [turnstileSiteKey, setTurnstileSiteKey] = useState<string | null>(null);
  const [isTurnstileConfigLoading, setIsTurnstileConfigLoading] = useState(true);
  const [turnstileConfigError, setTurnstileConfigError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadTurnstileConfig()
      .then((config) => {
        if (cancelled) return;

        if (!config.siteKeyConfigured) {
          setTurnstileSiteKey(null);
          setTurnstileConfigError('لم يتم ضبط NEXT_PUBLIC_TURNSTILE_SITE_KEY في بيئة الإنتاج.');
          return;
        }

        if (!config.secretConfigured) {
          setTurnstileSiteKey(null);
          setTurnstileConfigError('لم يتم ضبط TURNSTILE_SECRET في بيئة الإنتاج.');
          return;
        }

        if (!config.enabled || !config.siteKey) {
          setTurnstileSiteKey(null);
          setTurnstileConfigError('التحقق الأمني غير مهيأ حالياً.');
          return;
        }

        setTurnstileSiteKey(config.siteKey);
        setTurnstileConfigError(null);
      })
      .catch(() => {
        if (cancelled) return;
        setTurnstileSiteKey(null);
        setTurnstileConfigError('تعذر قراءة إعدادات Turnstile من الخادم.');
      })
      .finally(() => {
        if (!cancelled) {
          setIsTurnstileConfigLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const resetState = () => {
    setError(null);
    setMessage(null);
    setPassword('');
    setShowPassword(false);
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setCaptchaToken(null);
    setTurnstileError(null);
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

    if (!turnstileSiteKey) {
      setError(turnstileConfigError || 'التحقق الأمني غير مهيأ حالياً.');
      setIsLoading(false);
      return;
    }

    if (!captchaToken) {
      setError(turnstileError || 'أكمل التحقق الأمني قبل المتابعة.');
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
          turnstileToken: captchaToken,
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
          turnstileToken: captchaToken,
        });
        setMessage('تم إنشاء الحساب بنجاح! إذا كانت المصادقة تتطلب تفعيلاً، مراجعة البريد الإلكتروني.');
      } else if (mode === 'forgot_password') {
        await postAuthAction('/api/auth/forgot-password', {
          email,
          turnstileToken: captchaToken,
        });
        setMessage('تم إرسال تعليمات استعادة كلمة المرور إلى بريدك الإلكتروني.');
      }
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      const errorCode = getAuthErrorCode(errorMessage);

      if (errorCode === 'RATE_LIMITED') {
        setError('تم تجاوز عدد المحاولات المسموح. حاول لاحقاً.');
      } else if (errorCode === 'Security verification is not configured.') {
        setError('لم يتم ضبط TURNSTILE_SECRET في بيئة الإنتاج.');
      } else if (errorCode === 'Security verification failed.') {
        setError('فشل التحقق الأمني. أعد التحقق ثم حاول مرة أخرى.');
      } else if (errorCode === 'INVALID_CREDENTIALS' || errorCode === 'Invalid login credentials') {
        setError('بيانات الدخول غير صحيحة، تأكد من البريد وكلمة المرور.');
      } else if (errorCode === 'EMAIL_NOT_CONFIRMED') {
        setError('الحساب موجود لكن البريد الإلكتروني غير مفعّل. راجع بريدك واضغط رابط التفعيل.');
      } else if (errorCode === 'SUPABASE_CAPTCHA_REJECTED') {
        setError('Supabase CAPTCHA ما زال مفعلاً بجانب التحقق الحالي. عطّل CAPTCHA من Supabase Auth أو استخدم مسار تحقق واحد فقط.');
      } else if (errorCode === 'USER_ALREADY_REGISTERED' || errorMessage.includes('User already registered')) {
        setError('البريد الإلكتروني مسجل مسبقاً، يمكنك تسجيل الدخول مباشرة.');
      } else if (errorCode === 'WEAK_PASSWORD' || errorMessage.includes('Password should be at least')) {
        setError('كلمة المرور يجب أن تكون 6 أرقام أو أحرف على الأقل.');
      } else {
        setError('تعذر إكمال المصادقة. افتح تفاصيل طلب /api/auth/login في Network لمعرفة السبب.');
      }
    } finally {
      setIsLoading(false);
      setCaptchaToken(null);
      if (window.turnstile) {
        window.turnstile.reset();
      }
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

            <TurnstileField
              key={mode}
              actionKey={mode}
              siteKey={turnstileSiteKey}
              configLoading={isTurnstileConfigLoading}
              configError={turnstileConfigError}
              onTokenChange={setCaptchaToken}
              onError={setTurnstileError}
            />

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
