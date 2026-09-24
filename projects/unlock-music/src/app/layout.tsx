import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_CONFIG } from "@/data/music-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} - ${SITE_CONFIG.englishName}`,
  description: SITE_CONFIG.subTagline,
  keywords: [
    "音乐解锁",
    "unlock music",
    "ncm转mp3",
    "qmc转mp3",
    "mflac解密",
    "kgm格式转换",
    "kwm解密",
    "音乐格式转换",
  ],
  openGraph: {
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.englishName}`,
    description: SITE_CONFIG.subTagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50/60 text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
