"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
// import {change}
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import Navbar from "./Navbar/page";
import ReduxProvider from "@/store/Provider";
import { change } from "@/store/features/adminPanel";
import AdminHome from "@/components/SideBarAdmin";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <LayoutContent>{children}</LayoutContent>
    </ReduxProvider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const adminPage = useSelector((state: RootState) => state.admin.adminPage);

  useEffect(() => {
    if (pathname.includes("/admin")) {
      dispatch(change(true)); // Set adminPage to true
    } else dispatch(change(false));
  }, [pathname, dispatch]);
  
  return (
    <html lang="en">
      <Head>
        <title>
          {adminPage
            ? "Admin Panel - Dr. Alexandra Richardson"
            : "Dr. Alexandra Richardson"}
        </title>
        <meta
          name="description"
          content="Dr. Alexandra Richardson's personal website"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-50 to-blue-50`}
      >
        <Navbar />
        <div className={adminPage ? "pt-0" : "pt-24"}>
          {adminPage && <AdminHome/>}
          {children}</div>
      </body>
    </html>
  );
}
