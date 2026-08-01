import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap, Mail, Lock, User as UserIcon, ArrowRight, ShieldCheck } from 'lucide-react';
import type { User } from '@/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const newUser: User = {
        name: name.trim() || (email.split('@')[0] ? email.split('@')[0] : 'عبدالله محمد'),
        email: email || 'user@example.com',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || email || 'User')}`,
        credits: 100,
        totalCredits: 100,
      };
      onLoginSuccess(newUser);
      onClose();
    }, 600);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent dir="rtl" className="sm:max-w-[420px] rounded-2xl p-6">
        <DialogHeader className="text-right space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Zap className="size-4" />
            </span>
            <DialogTitle className="text-xl font-bold text-foreground">
              {mode === 'login' ? 'تسجيل الدخول إلى خطة' : 'إنشاء حساب جديد'}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            {mode === 'login'
              ? 'أدخل بياناتك للمتابعة والوصول لمشاريعك ودراسات الجدوى'
              : 'ابدأ دراسة مشروعك الأول مجاناً وبدون أي تعقيدات'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1.5 text-right">
              <Label htmlFor="name" className="text-xs font-semibold">
                الاسم الكامل
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="مثال: عبدالله محمد"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pr-9 text-xs"
                  required
                />
                <UserIcon className="absolute right-3 top-2.5 size-4 text-muted-foreground" />
              </div>
            </div>
          )}

          <div className="space-y-1.5 text-right">
            <Label htmlFor="email" className="text-xs font-semibold">
              البريد الإلكتروني
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pr-9 text-xs"
                required
              />
              <Mail className="absolute right-3 top-2.5 size-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-1.5 text-right">
            <Label htmlFor="password" className="text-xs font-semibold">
              كلمة المرور
            </Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-9 text-xs"
                required
              />
              <Lock className="absolute right-3 top-2.5 size-4 text-muted-foreground" />
            </div>
          </div>

          <Button type="submit" loading={loading} className="w-full gap-2 mt-2 h-10 text-sm">
            <ShieldCheck className="size-4" />
            {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب والمتابعة'}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase">
              <span className="bg-background px-2 text-muted-foreground">أو</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-9 text-xs gap-2"
            onClick={() => {
              onLoginSuccess({
                name: 'عبدالله محمد',
                email: 'demo@khotta.app',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abdullah',
                credits: 85,
                totalCredits: 100,
              });
              onClose();
            }}
          >
            <Zap className="size-3.5 text-primary" />
            الدخول التجريبي السريع (Demo Access)
          </Button>

          <div className="pt-2 text-center text-xs text-muted-foreground">
            {mode === 'login' ? (
              <p>
                ليس لديك حساب؟{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-primary underline-offset-4 hover:underline"
                >
                  أنشئ حساباً مجانياً
                </button>
              </p>
            ) : (
              <p>
                لديك حساب بالفعل؟{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-primary underline-offset-4 hover:underline"
                >
                  تسجيل الدخول
                </button>
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
