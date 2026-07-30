import "../index.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Khotta - Start Investor",
  description: "Business Plan Builder & Investor Hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased min-h-screen bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
