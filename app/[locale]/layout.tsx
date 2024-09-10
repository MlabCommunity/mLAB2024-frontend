import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers/providers";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "react-hot-toast";
import { constructMetadata } from "@/utils";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <main className="flex-1">
              {children}
              <Toaster position="top-center" />
            </main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
