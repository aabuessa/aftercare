import type { Metadata } from "next";
import { Varela_Round, Nunito_Sans } from "next/font/google";
import "./globals.css";

const heading = Varela_Round({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const body = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "AfterCare",
  description: "Your post-discharge recovery companion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
