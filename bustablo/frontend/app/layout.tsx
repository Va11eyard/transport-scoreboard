import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const MontserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bus Tablo",
  description: "This is a page for the bus. It shows videos, the weather and the time. It also tells you where the bus is going.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${MontserratSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
