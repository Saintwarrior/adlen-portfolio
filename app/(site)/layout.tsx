import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Onest, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["500", "600"],
  style: ["italic", "normal"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Onest({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
console.log(process.env);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://adlen.kz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ADLEN — студия разработки интернет-продуктов",
    template: "%s — ADLEN",
  },
  description:
    "Разрабатываем CRM, WMS, e-commerce и интеграции под ключ. Команда из 8 человек, полный цикл, работаем давно в одном составе. Алматы, Казахстан.",
  keywords: [
    "разработка CRM",
    "разработка сайтов Алматы",
    "WMS",
    "e-commerce",
    "интеграция 1C",
    "ADLEN",
    "студия разработки Казахстан",
  ],
  applicationName: "ADLEN Studio",
  authors: [{ name: "ADLEN" }],
  creator: "ADLEN",
  publisher: "ADLEN",
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    url: SITE_URL,
    siteName: "ADLEN",
    title: "ADLEN — студия разработки интернет-продуктов",
    description:
      "Полный цикл разработки: аналитика, дизайн, разработка, QA, сопровождение. 8 инженеров, работаем вместе с 2019.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ADLEN — студия разработки интернет-продуктов",
    description:
      "CRM, WMS, e-commerce и интеграции под ключ. Алматы, Казахстан.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0907",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-ink text-paper min-h-screen antialiased">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[5] grain opacity-[0.05]"
        />
        <Navbar />
        <main className="relative z-[1]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
