import React from "react";
import type { Metadata } from "next";
import { Inter, Oswald, Montserrat } from "next/font/google";
import "../styles/globals.scss";
import SmoothScroll from "@/components/atoms/SmoothScroll";
import Navbar from "@/components/molecules/Navbar/Navbar";
import Footer from "@/components/organisms/Footer/Footer";
import { siteContent } from "@/lib/siteContent";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
});

const { metadata: siteMetadata } = siteContent;

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.og.url),
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  openGraph: {
    title: siteMetadata.og.title,
    description: siteMetadata.og.description,
    url: siteMetadata.og.url,
    siteName: "M&L Consultorías y Peritajes",
    images: [
      {
        url: siteMetadata.og.image,
        width: 1200,
        height: 630,
        alt: "M&L Consultorías y Peritajes Visual Identity",
      },
    ],
    locale: "es_CR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.og.title,
    description: siteMetadata.og.description,
    images: [siteMetadata.og.image],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${oswald.variable} ${montserrat.variable}`}
      >
        <ThemeProvider>
          <SmoothScroll>
            <Navbar />
            <main id="main-content">
              {children}
            </main>
            <Footer />
            <Toaster position="top-center" richColors />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
