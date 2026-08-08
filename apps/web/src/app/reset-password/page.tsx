"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { AlertCircle, CheckCircle2, Loader2, Lock, Eye, EyeOff, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { createClient } from '@/utils/supabase/client';
import { useAuthModal } from '@/features/auth/AuthModalContext';

export default function ResetPasswordPage() {
  const { openAuthModal } = useAuthModal();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  React.useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setError(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف أو أرقام على الأقل.');
      return;
    }

    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين، يرجى التأكد وإعادة المحاولة.');
      return;
    }

    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        throw updateError;
      }
      setIsComplete(true);
    } catch (err: any) {
      setError(err?.message || 'تعذر تحديث كلمة المرور. قد تكون انتهت صلاحية الرابط، اطلب رابطاً جديداً.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-right relative overflow-hidden font-sans">
      {/* Background Lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/15 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Logo */}
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center size-11 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 text-primary-foreground font-black text-2xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              خ
            </div>
            <span className="text-3xl font-black tracking-tight text-white">خطة<span className="text-primary">.</span></span>
          </Link>
          <Badge variant="outline" className="text-primary-foreground border-primary/30 bg-primary/10 text-xs px-3 py-0.5 gap-1">
            <Sparkles className="size-3 text-primary" />
            استعادة الوصول للحساب
          </Badge>
        </div>

        <Card className="border-border/80 bg-card/95 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="space-y-2 p-6 sm:p-8 pb-4 text-right border-b border-border/40">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-2 shadow-2xs">
              {isComplete ? <CheckCircle2 className="size-6 text-emerald-600" /> : <KeyRound className="size-6" />}
            </div>
            <CardTitle className="text-xl font-black text-foreground">
              {isComplete ? 'تم تحديث كلمة المرور بنجاح 🎉' : 'تعيين كلمة مرور جديدة'}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground font-medium leading-relaxed">
              {isComplete 
                ? 'تمت حماية حسابك بنجاح بكلمة المرور الجديدة. يمكنك الآن تسجيل الدخول والمتابعة.'
                : 'أدخل كلمة المرور الجديدة أدناه لإكمال عملية استعادة الحساب.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 pt-6">
            {isComplete ? (
              <div className="space-y-4">
                <Button 
                  onClick={() => openAuthModal('login')} 
                  size="lg" 
                  className="w-full font-bold text-xs h-11 gap-2 shadow-md bg-primary hover:bg-primary/90 cursor-pointer"
                >
                  تسجيل الدخول الآن
                  <ArrowLeft className="size-4" />
                </Button>
                <div className="text-center">
                  <Link href="/" className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors">
                    العودة للصفحة الرئيسية
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-start gap-2.5 rounded-2xl border border-destructive/30 bg-destructive/10 p-3.5 text-destructive text-xs font-bold leading-relaxed">
                    <AlertCircle className="size-4 shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-foreground">كلمة المرور الجديدة</label>
                  <div className="relative">
                    <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      minLength={6}
                      required
                      dir="ltr"
                      className="pl-10 pr-10 py-5 bg-background border-border/80 rounded-xl text-xs font-medium focus-visible:ring-primary text-left"
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

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-foreground">تأكيد كلمة المرور الجديدة</label>
                  <div className="relative">
                    <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      minLength={6}
                      required
                      dir="ltr"
                      className="pl-10 pr-10 py-5 bg-background border-border/80 rounded-xl text-xs font-medium focus-visible:ring-primary text-left"
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
                      <span>تحديث كلمة المرور والحفظ</span>
                      <ArrowLeft className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
