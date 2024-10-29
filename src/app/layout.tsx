import type { Metadata } from "next";

import '../ui/styles.css';

import StoreProvider from "./StoreProvider";
import Toast from "@/components/common/Toast";
import Spinner from "@/components/common/Spinner";

import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Colsubsidio-IntegrationsViewer",
  description: "Colsubsidio-IntegrationsViewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <StoreProvider>
          <Spinner />
          <Toast />
          <Header />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
