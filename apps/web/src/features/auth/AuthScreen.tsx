import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Loader2, Mail, Lock, AlertCircle, ArrowRight, User as UserIcon, KeyRound, Sparkles } from 'lucide-react';

type AuthMode = 'login' | 'register' | 'forgot_password';

export const AuthScreen: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const resetState = () => {
    setError(null);
    setMessage(null);
    setPassword('');
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetState();
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    resetState();

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = '/workspace'; // Force redirect to workspace on login
      } else if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: window.location.origin,
          }
        });
        if (error) throw error;
        setMessage('تم إرسال رابط التفعيل إلى بريدك الإلكتروني. يرجى مراجعة صندوق الوارد.');
      } else if (mode === 'forgot_password') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setMessage('تم إرسال تعليمات استعادة كلمة المرور إلى بريدك الإلكتروني.');
      }
    } catch (err: any) {
      console.error(err);
      if (err.message === 'Invalid login credentials') {
        setError('بيانات الدخول غير صحيحة، تأكد من البريد وكلمة المرور.');
      } else if (err.message.includes('User already registered')) {
        setError('البريد الإلكتروني مسجل مسبقاً.');
      } else {
        setError(err.message || 'حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50 overflow-hidden font-['IBM_Plex_Sans_Arabic']">
      
      {/* Visual / Branding Side */}
      <div className="hidden md:flex md:w-1/2 relative bg-slate-900 overflow-hidden flex-col justify-between p-12">
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
          <Badge variant="outline" className="text-blue-300 border-blue-500/30 bg-blue-500/10 mb-6 px-4 py-1.5 backdrop-blur-md">
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
               mode === 'register' ? 'أنشئ حسابك للوصول إلى أدوات الذكاء الاصطناعي وبناء خطتك.' : 
               'أدخل بريدك الإلكتروني وسنرسل لك رابطاً لتعيين كلمة مرور جديدة.'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 animate-in zoom-in-95 duration-300">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="font-medium text-sm leading-relaxed">{error}</p>
              </div>
            )}
            
            {message && (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 animate-in zoom-in-95 duration-300">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="font-medium text-sm leading-relaxed">{message}</p>
              </div>
            )}

            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">الاسم الكامل</label>
                <div className="relative group">
                  <UserIcon className="absolute right-3.5 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
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

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">البريد الإلكتروني</label>
              <div className="relative group">
                <Mail className="absolute right-3.5 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
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
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700">كلمة المرور</label>
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
                  <Lock className="absolute right-3.5 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-4 pr-11 py-6 bg-white border-slate-200 hover:border-slate-300 focus-visible:ring-blue-500 text-left shadow-sm rounded-xl transition-all tracking-widest"
                    dir="ltr"
                  />
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base mt-4 shadow-xl shadow-slate-900/10 rounded-xl group transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  {mode === 'login' ? 'تسجيل الدخول' : 
                   mode === 'register' ? 'إنشاء حساب جديد' : 
                   'إرسال رابط الاستعادة'}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
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
