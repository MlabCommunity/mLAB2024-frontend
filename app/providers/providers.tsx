"use client";

import { NextUIProvider } from "@nextui-org/react";
import ModalProvider from "./modalProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider as NextThemesProvider } from "next-themes";
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <ReactQueryDevtools initialIsOpen={false} />
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            {children}
          </NextThemesProvider>
          <ModalProvider />
        </NextUIProvider>
      </DndProvider>
    </QueryClientProvider>
  );
}
