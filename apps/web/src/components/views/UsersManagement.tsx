import React, { useMemo, useState } from 'react';
import { CheckCircle2, Clock, Mail, MoreHorizontal, Plus, Search, Shield, ShieldCheck, ShieldOff, Trash2, Users } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useAuth, UserProfile } from '@/features/auth/AuthContext';
import { supabase } from '@/lib/supabase';

type UserRole = 'admin' | 'manager' | 'user';
type UserStatus = 'active' | 'pending' | 'suspended';

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  registrationDate: string;
}

const roleLabels: Record<UserRole, string> = {
  admin: 'مدير نظام',
  manager: 'مشرف',
  user: 'مستخدم',
};

const statusLabels: Record<UserStatus, string> = {
  active: 'نشط',
  pending: 'بانتظار التفعيل',
  suspended: 'موقوف',
};

const statusStyles: Record<UserStatus, string> = {
  active: 'bg-emerald-50 text-emerald-700',
  pending: 'bg-amber-50 text-amber-700',
  suspended: 'bg-rose-50 text-rose-700',
};

const roleStyles: Record<UserRole, string> = {
  admin: 'bg-slate-900 text-white',
  manager: 'bg-slate-100 text-slate-700',
  user: 'bg-muted text-muted-foreground',
};

export const UsersManagement: React.FC = () => {
  const { profile } = useAuth();
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  React.useEffect(() => {
    const fetchUsers = async () => {
      if (profile?.role !== 'admin') {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (data) {
          setUsers(data.map((p: any) => ({
            id: p.id,
            name: p.full_name || p.email?.split('@')[0] || 'مستخدم',
            email: p.email || '',
            role: p.role as UserRole,
            status: p.status as UserStatus,
            registrationDate: new Date(p.created_at).toISOString().split('T')[0],
          })));
        }
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [profile]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = user.name.includes(searchQuery) || user.email.includes(searchQuery);
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleStatus = async (id: string, currentStatus: UserStatus) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    try {
      await supabase.from('profiles').update({ status: newStatus }).eq('id', id);
      setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, status: newStatus } : user)));
    } catch (err) {
      console.error('Error updating user status:', err);
      alert('حدث خطأ أثناء تحديث حالة المستخدم.');
    }
  };

  const updateRole = async (id: string, newRole: UserRole) => {
    try {
      await supabase.from('profiles').update({ role: newRole }).eq('id', id);
      setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, role: newRole } : user)));
    } catch (err) {
      console.error('Error updating user role:', err);
      alert('حدث خطأ أثناء تحديث صلاحية المستخدم.');
    }
  };

  const deleteUser = async (id: string) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا المستخدم نهائياً؟')) {
      try {
        // Only possible if RLS or edge functions allow auth.users deletion. 
        // For MVP, we can just suspend or delete the profile.
        await supabase.from('profiles').delete().eq('id', id);
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('حدث خطأ أثناء حذف المستخدم.');
      }
    }
  };

  const stats = [
    { label: 'إجمالي المستخدمين', value: users.length, icon: Users },
    { label: 'نشط', value: users.filter((user) => user.status === 'active').length, icon: CheckCircle2 },
    { label: 'بانتظار التفعيل', value: users.filter((user) => user.status === 'pending').length, icon: Clock },
    { label: 'موقوف', value: users.filter((user) => user.status === 'suspended').length, icon: ShieldOff },
  ];

  if (profile?.role !== 'admin') {
    return (
      <main className="app-page-shell-wide space-y-6 text-right" dir="rtl">
        <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <ShieldOff className="size-16 text-muted-foreground opacity-50" />
          <h2 className="text-xl font-bold text-foreground">غير مصرح لك بالوصول</h2>
          <p className="text-muted-foreground">هذه الصفحة مخصصة لمديري النظام فقط.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="app-page-shell-wide space-y-6 text-right" dir="rtl">
      <section className="rounded-xl bg-card p-4 sm:p-5 shadow-sm ring-1 ring-border/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <Badge variant="secondary" className="w-fit">لوحة الإدارة</Badge>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">إدارة المستخدمين</h1>
              <p className="text-sm leading-7 text-muted-foreground">
                واجهة منظمة لمراجعة المستخدمين، الصلاحيات، وحالات الحساب بطريقة جدولية واضحة.
              </p>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-fit">
                <Plus className="size-4" />
                إضافة مستخدم
              </Button>
            </DialogTrigger>
            <DialogContent dir="rtl">
              <DialogHeader>
                <DialogTitle>إضافة مستخدم جديد</DialogTitle>
                <DialogDescription>واجهة نموذج جاهزة للربط لاحقاً بنظام الصلاحيات والدعوات.</DialogDescription>
              </DialogHeader>
              <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">الاسم الكامل</label>
                    <Input placeholder="اسم المستخدم" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">البريد الإلكتروني</label>
                    <Input type="email" dir="ltr" className="text-left" placeholder="name@example.com" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">الدور</label>
                    <Select defaultValue="user">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الدور" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">مدير نظام</SelectItem>
                        <SelectItem value="manager">مشرف</SelectItem>
                        <SelectItem value="user">مستخدم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">حالة الدعوة</label>
                    <Select defaultValue="pending">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">بانتظار التفعيل</SelectItem>
                        <SelectItem value="active">نشط</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">إرسال الدعوة</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="shadow-sm">
              <CardContent className="flex items-center justify-between p-3 sm:p-4">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">{stat.value}</p>
                </div>
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground">
                  <Icon className="size-4" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <Card className="shadow-sm">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-3">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <CardTitle>جدول المستخدمين</CardTitle>
              <CardDescription>بحث وفلاتر مباشرة مع إجراءات مختصرة لكل حساب.</CardDescription>
            </div>
            <div className="grid gap-2 sm:grid-cols-[minmax(240px,1fr)_180px_180px]">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="pr-9"
                  placeholder="ابحث بالاسم أو البريد"
                />
              </div>
              <Select value={roleFilter} onValueChange={(value) => {
                setRoleFilter(value as UserRole | 'all');
                setCurrentPage(1);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="الدور" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الأدوار</SelectItem>
                  <SelectItem value="admin">مدير نظام</SelectItem>
                  <SelectItem value="manager">مشرف</SelectItem>
                  <SelectItem value="user">مستخدم</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={(value) => {
                setStatusFilter(value as UserStatus | 'all');
                setCurrentPage(1);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="pending">بانتظار التفعيل</SelectItem>
                  <SelectItem value="suspended">موقوف</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المستخدم</TableHead>
                <TableHead>الدور</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ التسجيل</TableHead>
                <TableHead className="text-left">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                    لا يوجد مستخدمون يطابقون البحث الحالي.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                          {user.name.slice(0, 1)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground">{user.name}</p>
                          <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground" dir="ltr">
                            <Mail className="size-3" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn('border-transparent', roleStyles[user.role])}>
                        {user.role === 'admin' && <Shield className="size-3" />}
                        {roleLabels[user.role]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn('border-transparent', statusStyles[user.status])}>
                        {statusLabels[user.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">{user.registrationDate}</TableCell>
                    <TableCell className="text-left">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem onClick={() => updateRole(user.id, 'admin')} disabled={user.role === 'admin'}>
                            <Shield className="size-4 ml-2" />
                            ترقية لمدير نظام
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateRole(user.id, 'user')} disabled={user.role === 'user'}>
                            <Users className="size-4 ml-2" />
                            تعيين كمستخدم عادي
                          </DropdownMenuItem>
                          <div className="h-px bg-border my-1" />
                          <DropdownMenuItem onClick={() => toggleStatus(user.id, user.status)}>
                            {user.status === 'active' ? (
                              <>
                                <ShieldOff className="size-4 ml-2" />
                                إيقاف الحساب
                              </>
                            ) : (
                              <>
                                <ShieldCheck className="size-4 ml-2" />
                                تفعيل الحساب
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem variant="destructive" onClick={() => deleteUser(user.id)}>
                            <Trash2 className="size-4 ml-2" />
                            حذف الحساب
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              عرض {paginatedUsers.length} من أصل {filteredUsers.length} مستخدم.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}>
                السابق
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              >
                التالي
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
