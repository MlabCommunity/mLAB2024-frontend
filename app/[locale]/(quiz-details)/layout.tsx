import React from "react";
import "@/app/globals.css";
import Container from "@/components/shared/Container";
import Header from "@/components/shared/Header";
import Link from "next/link";
import { routes } from "@/routes";
import { getTranslations } from "next-intl/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("QuestionsOnAnswers");
  return (
    <>
      <Header />
      <Container>
        <div className="flex flex-col md:flex-row">
          <aside className="w-full md:w-64 bg-white p-4 md:relative md:top-0 md:left-0">
            <Link
              href={routes.dashboard}
              className="text-xl mb-4 hover:text-foreground-600 transition-all"
            >
              Dashboard
            </Link>
            <nav className="space-y-2">
              <p className="block p-2 rounded-lg">- {t("quizDetails")}</p>
            </nav>
          </aside>
          <main className="flex-1 p-4">{children}</main>
        </div>
      </Container>
    </>
  );
}
