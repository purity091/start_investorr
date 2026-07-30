import fs from 'fs';
import path from 'path';

const appDir = path.join(process.cwd(), 'apps/web/src/app');
if (!fs.existsSync(appDir)) fs.mkdirSync(appDir, { recursive: true });

// 1. layout.tsx
const layoutCode = `import "../index.css";
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
      <body className="antialiased min-h-screen bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
`;
fs.writeFileSync(path.join(appDir, 'layout.tsx'), layoutCode);

// 2. page.tsx
const pageCode = `"use client";
import dynamic from 'next/dynamic';

// Dynamically import the App component to avoid SSR issues with browser APIs (window/localStorage)
const App = dynamic(() => import('../App'), { ssr: false });

export default function Home() {
  return <App />;
}
`;
fs.writeFileSync(path.join(appDir, 'page.tsx'), pageCode);

console.log('Next.js app/ directory scaffolded successfully.');
