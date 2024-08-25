import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Page from "@/components/page";
import Navigation from "@/components/navigation";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Match",
  description:
    "Don't know what to watch with your partner/friend? Try Movie Match!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={inter.className + " bg-background"}>
        <Navigation />
        <Page>{children}</Page>
        <Analytics />
      </body>
    </html>
  );
}
