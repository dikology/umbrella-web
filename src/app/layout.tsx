import type { Metadata } from "next";
import { Crimson_Pro, Source_Serif_4, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

// Display font - for headlines and dramatic text
const crimsonPro = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// Body font - for readable body text
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

// UI font - for buttons, labels, navigation
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Mono font - for code and technical content
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Umbrella - Read Authentic Chinese Texts at Your Level",
  description: "Learn Chinese through reading. Adaptive difficulty, instant dictionary, offline access. Join beta testers on iOS.",
  keywords: ["learn Chinese", "Chinese reading app", "HSK", "Chinese comprehension", "adaptive learning"],
  openGraph: {
    title: "Umbrella - Read Chinese Authentically",
    description: "Smart reading app with adaptive difficulty for learning Chinese through authentic texts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${crimsonPro.variable} ${sourceSerif.variable} ${inter.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
