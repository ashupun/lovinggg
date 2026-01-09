import type { Metadata } from "next";
import { Inter, Playfair_Display, Pacifico, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-romantic",
  weight: "400",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "loving.gg - Send Love Notes",
  description: "Create beautiful love notes and letters for the people you cherish",
  keywords: ["love notes", "love letters", "romantic", "gifts"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${pacifico.variable} ${caveat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
