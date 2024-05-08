import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from 'next/link';
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="my-5">
      <div className='mx-auto container flex justify-between mb-2 text-3xl'>
          <button className='navButtons font-extralight mr-2 w-1/2 rounded border border-gray-100'>
            <Link href="/">
              User
            </Link>
          </button>
          <button className='navButtons font-extralight ml-2 w-1/2 rounded border border-gray-100'>
            <Link href="/editor">
              Editor
            </Link>
          </button>
        </div> 
        <div className={inter.className}>
          {children}
        </div>
      </body>
    </html>
  );
}