import type { Metadata } from "next";
import { Suspense } from "react";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/toast";
import { siteConfig } from "@/config/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const rogenz = localFont({
  src: [
    {
      path: "../fonts/rogenz/Rogenz.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/rogenz/Rogenz.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/rogenz/Rogenz.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-rogenz",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${rogenz.variable}`}
    >
      <body className="font-sans antialiased min-h-screen bg-[#080E1B]">
        <ToastProvider>
          <div className="flex min-h-screen flex-col bg-[#080E1B]">
            <Suspense fallback={<div className="h-16 w-full" />}>
              <Navbar />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
