
"use client"; 

import Header from "@/components/shared/Header";
import "@/app/globals.css";
import React from "react";
import Container from "@/components/shared/Container";
import Navbar from "../../(dashboard)/components/Navbar";
import { useTheme } from "@/app/context/ThemeContext"; 

export default function QuizDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme(); 

  return (
    <>
      <Header />
      <Container>
        <section
          className={`flex flex-col items-start md:flex-row md:gap-8 w-full ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          <Navbar />
          {children}
        </section>
      </Container>
    </>
  );
}
