import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const viewport: Viewport = {
  themeColor: "#FF6A00",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Swyng | Menos pantallas. Más cancha.",
  description: "The premium networking platform connecting Founders and Investors through sports like Padel and Golf.",
  manifest: "/manifest.ts",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Swyng",
  },
  applicationName: "Swyng",
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable, "dark")}>
      <body className="antialiased bg-background text-foreground selection:bg-primary/30">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
