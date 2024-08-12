import Header from "../../../components/shared/Header";
import "@/app/globals.css";
import Container from '../../../components/shared/Container';

import Navbar from '../../../components/shared/Navbar';
import React from "react";

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
