import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "DHANVI — Builder. Creator. Engineer.",
  description:
    "Cinematic interactive portfolio of Dhanvi — full-stack developer and creative technologist. Explore projects, achievements, and creative work.",
  keywords: ["portfolio", "developer", "engineer", "creative", "technologist"],
  authors: [{ name: "Dhanvi" }],
  openGraph: {
    title: "DHANVI — Builder. Creator. Engineer.",
    description:
      "Cinematic interactive portfolio of Dhanvi — full-stack developer and creative technologist.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
