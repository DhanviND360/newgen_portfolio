import type { Metadata, Viewport } from "next";
import { Anton, Inter, Silkscreen } from "next/font/google";
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

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${silkscreen.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
