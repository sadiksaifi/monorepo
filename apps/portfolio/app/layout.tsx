import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/lib/styles/globals.css";
import { siteConfig } from "@/lib/config/site";
import Navbar from "@/lib/components/navbar";
import Footer from "@/lib/components/footer";
import { Provider } from "@/lib/components/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: 'black',
  width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	minimumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider
        >
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
