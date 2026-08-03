"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("../../App"), {
  ssr: false,
  loading: () => (
    <div dir="rtl" className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <p className="font-medium text-muted-foreground">جاري تحميل مساحة العمل...</p>
      </div>
    </div>
  ),
});

export function AppClientShell() {
  return <App />;
}
