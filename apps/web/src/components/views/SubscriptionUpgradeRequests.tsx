import React from 'react';
import { CheckCircle2, ExternalLink, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { getSubscriptionPlan, SubscriptionPlanId } from '@/lib/subscriptionPlans';
import { supabase } from '@/lib/supabase';

type UpgradeRequest = {
  id: string;
  user_id: string;
  current_plan: SubscriptionPlanId;
  requested_plan: SubscriptionPlanId;
  status: 'pending' | 'approved' | 'rejected';
  receipt_path: string;
  receipt_file_name: string;
  created_at: string;
  userName: string;
  userEmail: string;
};

export const SubscriptionUpgradeRequests: React.FC = () => {
  const [requests, setRequests] = React.useState<UpgradeRequest[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [busyId, setBusyId] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);

  const loadRequests = React.useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('subscription_upgrade_requests')
      .select('id, user_id, current_plan, requested_plan, status, receipt_path, receipt_file_name, created_at')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    if (error) {
      setMessage('تعذر تحميل طلبات الترقية. تأكد من تطبيق ترحيل قاعدة البيانات.');
      setIsLoading(false);
      return;
    }
    const rows = data ?? [];
    const ids = rows.map((row) => row.user_id);
    const { data: profiles } = ids.length
      ? await supabase.from('profiles').select('id, full_name, email').in('id', ids)
      : { data: [] };
    const profileMap = new Map((profiles ?? []).map((item) => [item.id, item]));
    setRequests(rows.map((row) => {
      const user = profileMap.get(row.user_id);
      return {
        ...row,
        current_plan: row.current_plan as SubscriptionPlanId,
        requested_plan: row.requested_plan as SubscriptionPlanId,
        userName: user?.full_name || 'مستخدم',
        userEmail: user?.email || '',
      };
    }));
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    queueMicrotask(() => { void loadRequests(); });
  }, [loadRequests]);

  const review = async (request: UpgradeRequest, status: 'approved' | 'rejected') => {
    setBusyId(request.id);
    setMessage(null);
    const { data: authData } = await supabase.auth.getUser();
    const reviewerId = authData.user?.id;
    if (!reviewerId) return;

    if (status === 'approved') {
      const { error } = await supabase.from('profiles').update({ subscription_plan: request.requested_plan }).eq('id', request.user_id);
      if (error) { setMessage('تعذر تفعيل الباقة للمستخدم.'); setBusyId(null); return; }
    }
    const { error } = await supabase.from('subscription_upgrade_requests').update({
      status, reviewer_id: reviewerId, reviewed_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    }).eq('id', request.id).eq('status', 'pending');
    if (error) setMessage('تعذر حفظ قرار المراجعة.');
    else setRequests((current) => current.filter((item) => item.id !== request.id));
    setBusyId(null);
  };

  const openReceipt = async (path: string) => {
    const { data, error } = await supabase.storage.from('subscription-receipts').createSignedUrl(path, 600);
    if (error || !data?.signedUrl) { setMessage('تعذر فتح الوصل.'); return; }
    window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="shadow-sm" dir="rtl">
      <CardHeader>
        <CardTitle>طلبات ترقية الباقات</CardTitle>
        <CardDescription>راجع وصل الحوالة ثم اعتمد الترقية لتفعيل حدود الباقة الجديدة.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {message && <p className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">{message}</p>}
        {isLoading ? <p className="text-sm text-muted-foreground">جاري تحميل الطلبات...</p> : requests.length === 0 ? <p className="text-sm text-muted-foreground">لا توجد طلبات معلقة حالياً.</p> : requests.map((request) => {
          const target = getSubscriptionPlan(request.requested_plan);
          return <div key={request.id} className="flex flex-col gap-3 rounded-lg border p-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="font-medium">{request.userName}</p>
              <p className="text-xs text-muted-foreground" dir="ltr">{request.userEmail}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <Badge variant="outline">{getSubscriptionPlan(request.current_plan).name}</Badge>
                <span>←</span><Badge>{target.name}</Badge>
                <span className="text-muted-foreground">{new Date(request.created_at).toLocaleDateString('ar')}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => void openReceipt(request.receipt_path)}><ExternalLink className="size-4" /> فتح الوصل</Button>
              <Button size="sm" disabled={busyId === request.id} onClick={() => void review(request, 'approved')}><CheckCircle2 className="size-4" /> اعتماد</Button>
              <Button variant="destructive" size="sm" disabled={busyId === request.id} onClick={() => void review(request, 'rejected')}><XCircle className="size-4" /> رفض</Button>
            </div>
          </div>;
        })}
      </CardContent>
    </Card>
  );
};
