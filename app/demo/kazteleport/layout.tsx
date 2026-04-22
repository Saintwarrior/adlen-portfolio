import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../../globals.css";
import { Shell } from "./_components/Shell";

const sans = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kzt-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-kzt-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Halyk Kazteleport — Корпоративный портал",
    template: "%s — Halyk Kazteleport",
  },
  description:
    "Внутренний корпоративный портал группы Halyk Kazteleport. Демонстрационный стенд.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#007A5C",
  colorScheme: "light",
};

export default function KazteleportLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${sans.variable} ${mono.variable}`}>
      <body className="kzt-root min-h-screen bg-[var(--color-kzt-bg)] text-[var(--color-kzt-ink)] antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
