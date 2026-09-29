import type { Metadata } from "next";
import { Schibsted_Grotesk, Onest, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AddedToast } from "@/components/AddToCart";
import { SITE } from "@/lib/site";

const display = Schibsted_Grotesk({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700", "800"] });
const body = Onest({ variable: "--font-body", subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: { default: `${SITE.name} — Noodpakketten voor 72 uur`, template: `%s · ${SITE.name}` },
  description:
    "Complete noodpakketten volgens het 72-uursadvies van de overheid. Water, voeding, licht, radio en EHBO in één pakket. Morgen in huis.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <AddedToast />
        </CartProvider>
      </body>
    </html>
  );
}
