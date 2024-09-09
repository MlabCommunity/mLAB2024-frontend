import Header from "@/components/shared/Header";
import "@/app/globals.css";
import Container from "@/components/shared/Container";
import Navbar from "./components/Navbar";
import { Pagination } from "@nextui-org/react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
