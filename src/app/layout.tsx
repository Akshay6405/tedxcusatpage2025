import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TEDx CUSAT - Ideas Worth Spreading",
  description: "Join us at TEDx CUSAT for an inspiring journey of ideas, innovation, and transformation. Discover talks that challenge perspectives and ignite change.",
  keywords: "TEDx, CUSAT, ideas, innovation, talks, speakers, technology, education",
  authors: [{ name: "TEDx CUSAT Team" }],
  openGraph: {
    title: "TEDx CUSAT - Ideas Worth Spreading",
    description: "Join us at TEDx CUSAT for an inspiring journey of ideas, innovation, and transformation.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEDx CUSAT - Ideas Worth Spreading",
    description: "Join us at TEDx CUSAT for an inspiring journey of ideas, innovation, and transformation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}