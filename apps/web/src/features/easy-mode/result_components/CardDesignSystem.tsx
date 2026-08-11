import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

/**
 * 🎨 DESIGN TOKENS (shadcn/ui Compliant Tokens)
 */
export const TOKENS = {
  radius: {
    card: "rounded-xl",
    inner: "rounded-lg",
    button: "rounded-md"
  },
  spacing: {
    pageGap: "gap-5",
    cardPadding: "p-6",
    contentGap: "gap-4",
    sectionGap: "gap-5"
  },
  colors: {
    primary: "var(--primary)",
    primaryLight: "var(--primary)",
    primaryGlow: "rgba(99, 102, 241, 0.08)",
    secondary: "#10b981", // Emerald
    danger: "#e11d48", // Rose
    warning: "#f59e0b", // Amber
    surface: "var(--card)",
    border: "var(--border)",
    borderHover: "var(--border)",
    text: {
      title: "var(--foreground)",
      body: "var(--muted-foreground)",
      muted: "var(--muted-foreground)",
      accent: "var(--primary)"
    }
  },
  typography: {
    title: {
      size: "text-lg",
      weight: "font-bold"
    },
    body: {
      size: "text-sm",
      weight: "font-medium",
      lineHeight: "leading-relaxed"
    },
    label: {
      size: "text-xs",
      weight: "font-bold",
      spacing: "0.02em"
    }
  },
  shadows: {
    soft: "shadow-xs",
    premium: "shadow-sm",
    glow: "none"
  }
};

/**
 * ✨ BASE CARD WRAPPER (shadcn/ui Card Compliant)
 */
export const BaseCard = ({ 
  children, 
  variant = "default", 
  className = "", 
  style = {}, 
  onClick,
  isInitiallyOpen = false
}: {
  children: React.ReactNode;
  variant?: "default" | "highlight" | "danger" | "success";
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  isInitiallyOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = React.useState(isInitiallyOpen);

  const variantClass = React.useMemo(() => {
    switch (variant) {
      case "highlight": return "bg-muted/50 border-muted";
      case "danger": return "bg-destructive/5 border-destructive/20";
      case "success": return "bg-emerald-500/5 border-emerald-500/20";
      default: return "bg-card border-border";
    }
  }, [variant]);

  const toggleOpen = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    } else {
      setIsOpen(!isOpen);
    }
    e.stopPropagation();
  };

  const childrenArray = React.Children.toArray(children);
  const header = childrenArray.find((child: any) => child?.type === CardHeader);
  const others = childrenArray.filter((child: any) => child?.type !== CardHeader);

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-200 border shadow-xs h-fit flex flex-col p-3.5 sm:p-6",
        variantClass,
        onClick ? "cursor-pointer" : "cursor-default",
        className
      )}
      style={style}
    >
      <div className="relative z-10 flex flex-col h-full w-full">
        {header && (
          <div 
             onClick={toggleOpen} 
             className="cursor-pointer flex justify-between items-start w-full"
          >
             <div className="flex-1">{header}</div>
             <div className={cn(
               "p-1.5 text-muted-foreground transition-transform duration-200 ml-3 mt-0.5 rounded-md hover:bg-muted/80",
               isOpen && "rotate-180"
             )}>
                <ChevronDown size={18} />
             </div>
          </div>
        )}
        
        <div className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden w-full",
          isOpen ? "max-h-[5000px] opacity-100 mt-2" : "max-h-0 opacity-0 -mt-1"
        )}>
          {!header && children}
          {header && others}
        </div>
      </div>
    </Card>
  );
};

/**
 * 📝 TYPOGRAPHY & HEADER COMPONENTS
 */

export const CardHeader = ({ 
  title, 
  subtitle, 
  icon, 
  badge, 
  badgeType = "default" 
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeType?: "default" | "success" | "danger" | "warning";
}) => {
  const badgeVariant = React.useMemo(() => {
    switch (badgeType) {
      case "success": return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20";
      case "danger": return "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20";
      case "warning": return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  }, [badgeType]);

  return (
    <div className="flex items-start justify-between gap-3 mb-4 w-full">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="size-9 sm:size-10 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight m-0">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground font-medium mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {badge && (
        <Badge variant="outline" className={cn("text-[11px] font-bold px-2.5 py-0.5 rounded-md border shrink-0", badgeVariant)}>
          {badge}
        </Badge>
      )}
    </div>
  );
};

export const CardBody = ({ 
  children, 
  style,
  className = ""
}: { 
  children: React.ReactNode; 
  style?: React.CSSProperties;
  className?: string;
}) => (
  <div 
    className={cn("text-sm text-foreground leading-relaxed font-medium space-y-2 w-full", className)}
    style={style}
  >
    {children}
  </div>
);

export const CardFooter = ({ 
  children,
  className = "" 
}: { 
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("mt-5 pt-4 border-t border-border flex items-center justify-between w-full", className)}>
    {children}
  </div>
);

export const TabHeader = ({ 
  title, 
  description, 
  icon, 
  color
}: { 
  title: string; 
  description: string; 
  icon?: React.ReactNode; 
  color?: string;
}) => (
  <Card className="p-5 sm:p-6 mb-6 rounded-xl border border-border bg-card shadow-xs relative overflow-hidden">
    <div className="flex items-start gap-4 relative z-10">
      {icon && (
        <div className="size-11 sm:size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <h2 className="text-lg sm:text-xl font-bold text-foreground leading-tight mb-1.5">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed max-w-4xl m-0">
          {description}
        </p>
      </div>
    </div>
  </Card>
);
