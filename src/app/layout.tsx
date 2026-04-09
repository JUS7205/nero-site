import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import AISupport from "@/components/AISupport";
import Atmosphere from "@/components/Atmosphere";
import AppWrapper from "@/components/AppWrapper";
import "./globals.css";
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NERO | Industrial Luxury Performance",
  description:
    "Performance clothing for those who refuse to look like they live in the gym. Engineered for the iron. Designed for everywhere. Forged in darkness. Built for everywhere.",
  keywords: [
    "NERO",
    "performance clothing",
    "industrial luxury",
    "gym wear",
    "athletic clothing",
    "South Africa",
    "AI gym",
  ],
  authors: [{ name: "NERO" }],
  openGraph: {
    title: "NERO | Industrial Luxury Performance",
    description:
      "Performance clothing for those who refuse to look like they live in the gym. Engineered for the iron. Designed for everywhere.",
    type: "website",
    locale: "en_ZA",
    siteName: "NERO",
  },
  twitter: {
    card: "summary_large_image",
    title: "NERO | Industrial Luxury Performance",
    description:
      "Performance clothing for those who refuse to look like they live in the gym.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        <AppWrapper>
          <Atmosphere />
          {children}
          <Analytics />
          <AISupport />
        </AppWrapper>
      </body>
    </html>
  );
}
