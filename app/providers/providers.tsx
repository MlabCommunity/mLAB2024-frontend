"use client";

import { NextUIProvider } from "@nextui-org/react";
import ModalProvider from "./modalProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        {children}
        <ModalProvider />
      </NextUIProvider>
    </QueryClientProvider>
  );
}
