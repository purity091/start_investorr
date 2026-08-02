import React from "react";

/**
 * 🎨 DESIGN TOKENS (shadcn/ui Compliant - Borderless Surface System)
 */
export const TOKENS = {
  radius: {
    card: "16px",
    inner: "12px",
    button: "10px"
  },
  spacing: {
    pageGap: "20px",
    cardPadding: "24px",
    contentGap: "16px",
    sectionGap: "20px"
  },
  colors: {
    primary: "#6366f1",
    primaryLight: "#818cf8",
    primaryGlow: "rgba(99, 102, 241, 0.08)",
    secondary: "#10b981", // Emerald
    danger: "#e11d48", // Rose
    warning: "#f59e0b", // Amber
    surface: "var(--card, #ffffff)",
    border: "transparent",
    borderHover: "transparent",
    text: {
      title: "var(--foreground, #0f172a)",
      body: "var(--muted-foreground, #475569)",
      muted: "var(--muted-foreground, #94a3b8)",
      accent: "#6366f1"
    }
  },
  typography: {
    title: {
      size: "18px",
      weight: "700",
      family: "'IBM Plex Sans Arabic', sans-serif"
    },
    body: {
      size: "14px",
      weight: "500",
      lineHeight: "1.6"
    },
    label: {
      size: "11px",
      weight: "700",
      spacing: "0.02em"
    }
  },
  shadows: {
    soft: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
    premium: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
    glow: "none"
  }
};

/**
 * ✨ BASE CARD WRAPPER (Borderless shadcn/ui Card)
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
  
  const getVariantStyles = () => {
    switch (variant) {
      case "highlight": return { background: "var(--muted, #f8fafc)" };
      case "danger": return { background: "rgba(225, 29, 72, 0.04)" };
      case "success": return { background: "rgba(16, 185, 129, 0.04)" };
      default: return { background: "var(--card, #ffffff)" };
    }
  };

  const baseStyles: React.CSSProperties = {
    borderRadius: TOKENS.radius.card,
    padding: isOpen ? TOKENS.spacing.cardPadding : "18px 20px",
    transition: "all 0.2s ease-in-out",
    position: "relative",
    border: "none",
    boxShadow: isOpen ? TOKENS.shadows.premium : TOKENS.shadows.soft,
    cursor: onClick ? "pointer" : "default",
    overflow: "hidden",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    ...getVariantStyles(),
    ...style
  };

  const toggleOpen = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    } else {
      setIsOpen(!isOpen);
    }
    e.stopPropagation();
  };

  const childrenArray = React.Children.toArray(children);
  const header = childrenArray.find((child: any) => child.type === CardHeader);
  const others = childrenArray.filter((child: any) => child.type !== CardHeader);

  return (
    <div className={`group ${className}`} style={baseStyles}>
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
        {header && (
          <div 
             onClick={toggleOpen} 
             style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
          >
             <div style={{ flex: 1 }}>{header}</div>
             <div style={{ 
               padding: "6px", 
               color: "var(--muted-foreground, #94a3b8)", 
               transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", 
               transition: "transform 0.2s ease-in-out",
               marginLeft: "12px",
               marginTop: "2px"
             }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                   <path d="m6 9 6 6 6-6"/>
                </svg>
             </div>
          </div>
        )}
        
        <div style={{ 
          maxHeight: isOpen ? "5000px" : "0px", 
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          transition: "all 0.3s ease-in-out",
          marginTop: isOpen ? "0" : "-6px"
        }}>
          {!header && children}
          {header && others}
        </div>
      </div>
    </div>
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
  
  const getBadgeStyles = () => {
    switch (badgeType) {
      case "success": return { color: "#047857", bg: "rgba(16, 185, 129, 0.1)" };
      case "danger": return { color: "#b91c1c", bg: "rgba(225, 29, 72, 0.1)" };
      case "warning": return { color: "#b45309", bg: "rgba(245, 158, 11, 0.1)" };
      default: return { color: "#4f46e5", bg: "rgba(99, 102, 241, 0.1)" };
    }
  };

  const badgeStyles = getBadgeStyles();

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: TOKENS.spacing.sectionGap }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {icon && (
          <div style={{ 
            width: 38, 
            height: 38, 
            borderRadius: "10px", 
            background: "var(--muted, #f1f5f9)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            color: "var(--primary, #6366f1)"
          }}>
            {icon}
          </div>
        )}
        <div>
          <h3 style={{ 
            fontSize: TOKENS.typography.title.size, 
            fontWeight: TOKENS.typography.title.weight, 
            color: "var(--foreground, #0f172a)",
            margin: 0,
            lineHeight: 1.2
          }}>
            {title}
          </h3>
          {subtitle && (
            <p style={{ 
              fontSize: "12px", 
              color: "var(--muted-foreground, #64748b)", 
              margin: "3px 0 0",
              fontWeight: 500 
            }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {badge && (
        <div style={{ 
          fontSize: TOKENS.typography.label.size, 
          fontWeight: TOKENS.typography.label.weight, 
          color: badgeStyles.color, 
          background: badgeStyles.bg, 
          padding: "4px 12px", 
          borderRadius: "8px"
        }}>
          {badge}
        </div>
      )}
    </div>
  );
};

export const CardBody = ({ 
  children, 
  style 
}: { 
  children: React.ReactNode; 
  style?: React.CSSProperties 
}) => (
  <div style={{ 
    fontSize: TOKENS.typography.body.size, 
    color: "var(--foreground, #334155)", 
    lineHeight: TOKENS.typography.body.lineHeight,
    fontWeight: TOKENS.typography.body.weight,
    ...style
  }}>
    {children}
  </div>
);

export const CardFooter = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => (
  <div style={{ 
    marginTop: TOKENS.spacing.sectionGap, 
    paddingTop: TOKENS.spacing.sectionGap, 
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }}>
    {children}
  </div>
);

export const TabHeader = ({ 
  title, 
  description, 
  icon, 
  color = TOKENS.colors.primary 
}: { 
  title: string; 
  description: string; 
  icon?: React.ReactNode; 
  color?: string;
}) => (
  <div style={{ 
    marginBottom: "24px", 
    padding: "24px", 
    background: "var(--card, #ffffff)", 
    borderRadius: TOKENS.radius.card, 
    boxShadow: TOKENS.shadows.soft,
    position: "relative",
    overflow: "hidden"
  }}>
    <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-start", gap: 16 }}>
      {icon && (
        <div style={{ 
          width: 48, 
          height: 48, 
          borderRadius: "12px", 
          background: "var(--muted, #f1f5f9)", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          color: color,
          flexShrink: 0
        }}>
          {icon}
        </div>
      )}
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--foreground, #0f172a)", margin: "0 0 8px", lineHeight: 1.2 }}>
          {title}
        </h2>
        <p style={{ fontSize: "13px", color: "var(--muted-foreground, #64748b)", lineHeight: 1.6, fontWeight: 500, maxWidth: "800px", margin: 0 }}>
          {description}
        </p>
      </div>
    </div>
  </div>
);
