import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "../auth";
import { Footer } from "@/components/footer";

const poppins = localFont({
  src: "./fonts/Poppins-Regular.ttf",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "UBEPSA",
  description: "For the students",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <SessionProvider>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
