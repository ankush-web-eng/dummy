import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
// import SessionProvider from "@/lib/session";
// import { getServerSession } from "next-auth";
import { ImageProvider } from "@/context/imageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    absolute: "Test App",
    template: "%s | Test App"
  },
  description: "Generated by create next app",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <ImageProvider >

          {children}
        </ImageProvider>
      </body>
    </html>
  );
}
