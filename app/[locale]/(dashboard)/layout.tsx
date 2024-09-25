"use client";

import Header from "@/components/shared/Header";
import "@/app/globals.css";
import Container from "@/components/shared/Container";
import Navbar from "./components/Navbar";
import React from "react";
import GuestModal from "./components/modals/GuestModal";
import { getUserRoleFromJWT } from "@/utils/helpers";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userRole = getUserRoleFromJWT();
  return (
    <>
      {userRole === "Guest" && <GuestModal />}
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
