import React from "react";
import "@/app/globals.css";
import Container from "@/components/shared/Container";
import Header from "@/components/shared/Header";
import Link from "next/link";
import { routes } from "@/routes";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { useGetSingleQuiz } from "@/utils/hooks/useGetSingleQuiz";
import { absoluteUrl } from "@/lib";
import { getSingleQuiz } from "@/utils/actions/quiz/getSingleQuiz";

export async function generateMetadata({
  params,
}: {
  params: { quizId: string };
}): Promise<Metadata> {
  const singleQuizData = await getSingleQuiz(params.quizId);

  return {
    title: singleQuizData.title || "Quiz Details",
    alternates: {
      canonical: `${routes.quizDetails.pathname}/${params.quizId}`,
    },
    openGraph: {
      title: singleQuizData.title || "Quiz Details",
      url: absoluteUrl(`${routes.quizDetails.pathname}/${params.quizId}`),
    },
  };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("quizDetails");
  return (
    <>
      <Header />
      <Container>
        <div className="flex flex-col md:flex-row">
          <aside className="w-full md:w-64 bg-white p-4 md:relative md:top-0 md:left-0">
            <Link
              href={routes.dashboard.pathname}
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
