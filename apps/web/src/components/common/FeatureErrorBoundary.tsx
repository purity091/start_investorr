import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type FeatureErrorBoundaryProps = {
  children: React.ReactNode;
  boundaryKey?: string;
};

type FeatureErrorBoundaryState = {
  error: Error | null;
};

export class FeatureErrorBoundary extends React.Component<
  FeatureErrorBoundaryProps,
  FeatureErrorBoundaryState
> {
  state: FeatureErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): FeatureErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Feature rendering failed:', error, errorInfo);
  }

  componentDidUpdate(previousProps: FeatureErrorBoundaryProps) {
    if (previousProps.boundaryKey !== this.props.boundaryKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <div className="app-page-shell-wide py-10" dir="rtl">
        <div className="mx-auto flex min-h-[280px] max-w-2xl flex-col items-center justify-center rounded-xl border border-destructive/20 bg-card p-8 text-center shadow-sm">
          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" />
          </div>
          <h2 className="text-lg font-bold text-foreground">حدث خطأ أثناء عرض هذا القسم</h2>
          <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
            يمكنك إعادة المحاولة أو الانتقال إلى قسم آخر. بقية التطبيق ستبقى متاحة.
          </p>
          <Button onClick={this.reset} className="mt-5 gap-2">
            <RotateCcw className="size-4" />
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }
}
