import Footer from "@/app/_components/footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import ThemeSwitcher from "@/app/_components/theme-switcher";
import ThemeScript from "@/app/_components/ThemeScript";
import Container from "@/app/_components/container";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "seungchan.io",
    template: "%s | seungchan.io",
  },
  description: "이것저것 쓰는 곳",
  keywords: ["프론트엔드", "기술 블로그", "Next.js", "React"],
  authors: [{ name: "seungchan" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://seungchan.io",
    siteName: "seungchan.io",
    title: "seungchan.io",
    description: "이것저것 쓰는 곳",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "seungchan.io",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "seungchan.io",
    description: "이것저것 쓰는 곳",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}
      >
        <div className="min-h-screen">
          <Container>
            <ThemeSwitcher />
            {children}
          </Container>
        </div>
        <Footer />
      </body>
    </html>
  );
}
