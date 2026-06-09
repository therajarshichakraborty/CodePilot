import type { Metadata } from "next";
import { Patrick_Hand, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const patrickHand = Patrick_Hand({
  weight: "400",
  variable: "--font-patrick-hand",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodePilot",
  description: "Next Generation Code Editor for web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${patrickHand.variable} ${geistMono.variable} h-full cursor-pointer `}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col cursor-pointer">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AnimatedThemeToggler className="top-4 right-4 z-10 absolute " />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
