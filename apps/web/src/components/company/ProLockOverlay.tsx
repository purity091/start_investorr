import { Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  title: string;
  subtitle: string;
  onUnlock: () => void;
}

export function ProLockOverlay({ title, subtitle, onUnlock }: Props) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-2xl bg-background/80 backdrop-blur-sm p-6 text-center">
      <div className="p-4 rounded-2xl bg-primary/10 text-primary">
        <Lock className="h-7 w-7" />
      </div>
      <div className="space-y-1.5 max-w-sm">
        <h4 className="text-sm sm:text-base font-extrabold text-foreground tracking-tight">{title}</h4>
        <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">{subtitle}</p>
      </div>
      <Button
        onClick={onUnlock}
        size="sm"
        className="gap-2 font-bold shadow-xs border-0"
      >
        <Sparkles className="h-4 w-4" />
        <span>تفعيل الوضع الاحترافي (Pro)</span>
      </Button>
    </div>
  );
}
