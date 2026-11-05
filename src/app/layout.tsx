import type { Metadata } from "next";
import { Andika, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import Australian from "@/components/australia";
import "./globals.css";

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-andika",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "linus kang, full-stack dev.",
  description: "hello! student from australia learning programming.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${andika.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script src="/oneko.js" strategy="lazyOnload" />
        <Script
          defer
          src="https://analytics.linus.my/script.js"
          data-website-id="f1243d8f-0528-411e-9e05-b2a53ff18a30"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Suspense
          fallback={<div className="min-h-full flex flex-col">{children}</div>}
        >
          <Australian>{children}</Australian>
        </Suspense>
      </body>
    </html>
  );
}
