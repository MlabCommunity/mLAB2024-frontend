import Header from "@/components/shared/Header";
import "@/app/globals.css";
import React from "react";
import Container from "@/components/shared/Container";
import Navbar from "../../(dashboard)/components/Navbar";

export default function QuizDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Container>
        <section className="flex flex-col items-start md:flex-row md:gap-8 w-full">
          <Navbar />
          {children}
        </section>
      </Container>
    </>
  );
}
