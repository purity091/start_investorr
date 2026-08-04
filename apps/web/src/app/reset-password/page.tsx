"use client";

import { useState } from 'react';
import Link from 'next/link';
import { AlertCircle, CheckCircle2, Loader2, Lock } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف أو أرقام على الأقل.');
      return;
    }

    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين.');
      return;
    }

    setIsLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setIsLoading(false);

    if (updateError) {
      setError('تعذر تحديث كلمة المرور. افتح الرابط من البريد مرة أخرى أو اطلب رابطاً جديداً.');
      return;
    }

    setIsComplete(true);
  };

  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-right">
      <Card className="w-full max-w-md border-border shadow-sm">
        <CardHeader className="space-y-2">
          <div className="flex size-11 items-center justify-center rounded-lg bg-muted text-foreground">
            {isComplete ? <CheckCircle2 className="size-5 text-emerald-600" /> : <Lock className="size-5" />}
          </div>
          <CardTitle className="text-xl font-bold">
            {isComplete ? 'تم تحديث كلمة المرور' : 'تعيين كلمة مرور جديدة'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isComplete ? (
            <div className="space-y-4">
              <p className="text-sm leading-7 text-muted-foreground">
                يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.
              </p>
              <Button asChild className="w-full">
                <Link href="/login">العودة إلى تسجيل الدخول</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error ? (
                <div className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  <span>{error}</span>
                </div>
              ) : null}

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">كلمة المرور الجديدة</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={6}
                  required
                  dir="ltr"
                  className="text-left"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">تأكيد كلمة المرور</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  minLength={6}
                  required
                  dir="ltr"
                  className="text-left"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
                تحديث كلمة المرور
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
