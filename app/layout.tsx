import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { RecoveryProvider } from "@/components/providers/RecoveryProvider";
import "./globals.css";

const marketing = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AfterCare",
  description: "The AI companion that walks patients home from the hospital",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${marketing.variable} ${body.variable}`}>
      <body>
        <RecoveryProvider>{children}</RecoveryProvider>
      </body>
    </html>
  );
}
