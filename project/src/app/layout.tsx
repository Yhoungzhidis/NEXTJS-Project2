import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/styles/globals.css';
import clsx from 'clsx';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CPEN UG",
  description: "Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className={clsx("bg-back-img bg-center bg-no-repeat bg-cover bg-fixed bg-origin-border")}>
      <div className=" backdrop-blur">
    {children}
    </div>
      </div>
      </body>
      
    </html>
  );
}
