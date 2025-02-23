import type { Metadata } from "next";
import { Lato,Poppins } from "next/font/google";
import "./globals.css";
import "@/styles/main.scss";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"], 
  style: ["normal", "italic"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], 
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krishi Connect",
  description: "Harvesting Growth, Together.",
  authors: [{ name: "devShadow" }],
  icons: "/logo-full.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${lato.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
