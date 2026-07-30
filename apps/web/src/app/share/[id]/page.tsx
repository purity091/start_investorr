"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ProjectWorkspace } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Loader2, LayoutGrid, AlertCircle, FileText, Target, Activity, Zap, TrendingUp, Users, DollarSign, Rocket, CheckCircle2 } from 'lucide-react';

export default function PublicSharePage() {
  const params = useParams();
  const id = params.id as string;
  const [workspace, setWorkspace] = useState<ProjectWorkspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from('business_canvas')
          .select('canvas_data, project_title')
          .eq('id', id)
          .eq('is_public', true)
          .single();

        if (error) {
          throw error;
        }

        if (data && data.canvas_data) {
          setWorkspace(data.canvas_data as ProjectWorkspace);
        } else {
          setError('لم يتم العثور على المشروع أو أنه غير متاح للعامة.');
        }
      } catch (err) {
        console.error('Error fetching public project:', err);
        setError('حدث خطأ أثناء جلب المشروع. قد يكون الرابط غير صالح.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen bg-muted/20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="size-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">جاري تحميل مساحة العمل المفتوحة...</p>
      </div>
    );
  }

  if (error || !workspace) {
    return (
      <div dir="rtl" className="min-h-screen bg-muted/20 flex flex-col items-center justify-center p-4">
        <div className="bg-background border border-border rounded-xl p-8 max-w-md w-full text-center space-y-4 shadow-sm">
          <div className="mx-auto bg-destructive/10 text-destructive size-12 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="size-6" />
          </div>
          <h2 className="text-xl font-bold text-foreground">عذراً!</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  const profile = workspace.profile;
  const metrics = workspace.metrics;

  return (
    <div dir="rtl" className="min-h-screen bg-muted/10 font-sans selection:bg-primary/20">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-black text-primary">خطة<span className="text-foreground">.</span></div>
            <div className="w-px h-6 bg-border/60 mx-2" />
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">نسخة عرض عامة</Badge>
          </div>
          <a href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            أنشئ مشروعك الخاص
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        
        {/* Project Profile Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end justify-between bg-background p-6 md:p-10 rounded-2xl border border-border shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-primary" />
          <div className="space-y-5">
            <h1 className="text-4xl md:text-5xl font-black text-foreground">{profile.name || 'مشروع بدون اسم'}</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl leading-relaxed">
              {profile.opportunitySummary || 'لم يتم تقديم وصف ملخص لهذا المشروع بعد.'}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium"><Target className="size-4 ml-2" />{profile.sectorLabel || 'غير محدد'}</Badge>
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium"><LayoutGrid className="size-4 ml-2" />{profile.customerType || 'غير محدد'}</Badge>
            </div>
          </div>

          <div className="flex gap-6 lg:flex-col bg-muted/30 p-5 rounded-2xl border border-border/50 lg:min-w-[220px]">
            <div className="space-y-1 text-center lg:text-right">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">مؤشر الجاهزية</p>
              <p className="text-3xl font-black text-foreground flex items-center justify-center lg:justify-start gap-2">
                {metrics.readinessScore || 0}%
                {(metrics.readinessScore || 0) >= 80 && <CheckCircle2 className="size-6 text-emerald-500" />}
              </p>
            </div>
            <div className="w-px h-12 lg:w-full lg:h-px bg-border/60" />
            <div className="space-y-1 text-center lg:text-right">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">مستوى التنفيذ</p>
              <p className="text-3xl font-black text-foreground">{metrics.executionScore || 0}%</p>
            </div>
          </div>
        </div>

        {/* Business Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          
          <Card className="shadow-none border-border">
            <CardHeader className="bg-muted/30 border-b border-border/50">
              <CardTitle className="text-xl flex items-center gap-2">
                <FileText className="size-6 text-primary" />
                المشكلة والحل
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-8">
              <div className="space-y-3">
                <h4 className="font-bold text-base text-foreground flex items-center gap-2">
                  <AlertCircle className="size-4 text-amber-500" />
                  المشكلة المستهدفة
                </h4>
                <p className="text-muted-foreground text-sm md:text-base leading-8">
                  {workspace.planSections?.find(s => s.id === 'problem')?.content || 'لم يتم التحديد بعد في مساحة العمل.'}
                </p>
              </div>
              <div className="w-full h-px bg-border/40" />
              <div className="space-y-3">
                <h4 className="font-bold text-base text-foreground flex items-center gap-2">
                  <Zap className="size-4 text-emerald-500" />
                  القيمة المقترحة (الحل)
                </h4>
                <p className="text-muted-foreground text-sm md:text-base leading-8">
                  {workspace.planSections?.find(s => s.id === 'solution')?.content || 'لم يتم التحديد بعد في مساحة العمل.'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-border">
            <CardHeader className="bg-muted/30 border-b border-border/50">
              <CardTitle className="text-xl flex items-center gap-2">
                <Target className="size-6 text-blue-500" />
                السوق والعملاء
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-8">
              <div className="space-y-3">
                <h4 className="font-bold text-base text-foreground flex items-center gap-2">
                  <Users className="size-4 text-blue-400" />
                  الجمهور المستهدف
                </h4>
                <p className="text-muted-foreground text-sm md:text-base leading-8">
                  {workspace.planSections?.find(s => s.id === 'target-market')?.content || 'لم يتم التحديد بعد في مساحة العمل.'}
                </p>
              </div>
              <div className="w-full h-px bg-border/40" />
              <div className="space-y-3">
                <h4 className="font-bold text-base text-foreground flex items-center gap-2">
                  <TrendingUp className="size-4 text-indigo-500" />
                  حجم السوق والفرصة
                </h4>
                <p className="text-muted-foreground text-sm md:text-base leading-8">
                  {workspace.planSections?.find(s => s.id === 'market-size')?.content || 'لم يتم إدخال بيانات حجم السوق.'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-border md:col-span-2">
            <CardHeader className="bg-muted/30 border-b border-border/50">
              <CardTitle className="text-xl flex items-center gap-2">
                <DollarSign className="size-6 text-emerald-600" />
                النموذج التجاري والتسعير
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="font-bold text-base text-foreground flex items-center gap-2">
                  <DollarSign className="size-4 text-muted-foreground" />
                  نموذج الإيرادات
                </h4>
                <p className="text-muted-foreground text-sm md:text-base leading-8">
                  {workspace.planSections?.find(s => s.id === 'business-model')?.content || 'لم يتم توضيح طريقة توليد الإيرادات.'}
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-base text-foreground flex items-center gap-2">
                  <Rocket className="size-4 text-muted-foreground" />
                  استراتيجية الوصول (Go-to-Market)
                </h4>
                <p className="text-muted-foreground text-sm md:text-base leading-8">
                  {workspace.planSections?.find(s => s.id === 'go-to-market')?.content || 'لم يتم تحديد قنوات التسويق والوصول للعملاء.'}
                </p>
              </div>
            </CardContent>
          </Card>

        </div>

      </main>
    </div>
  );
}
