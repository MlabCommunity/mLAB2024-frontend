"use client";
import React from "react";
import QuizCard from "../components/QuizCard";
import Link from "next/link";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import { useGetQuizList } from "@/utils/hooks/useGetQuizList";
import { DashboardQuizT } from "@/types";
import { Skeleton } from "@nextui-org/react";

const DashboardPage = () => {
  const t = useTranslations("Dashboard");
  const { data, isPending, isFetching } = useGetQuizList();

  const skeletonItems = Array.from({ length: 4 });

  return (
    <section className="py-8 w-full md:max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-5 font-semibold">
        <h2 className="text-4xl font-bold mb-4 sm:mb-0 text-foreground-700">
          {t("quizzes")}
        </h2>
        <Link href={routes.takeQuiz}>
          <button className="text-small text-white font-normal py-2 px-4 rounded-xl transition-colors bg-base-primary">
            {t("createNewQuizButton")}
          </button>
        </Link>
      </div>
      <p className="text-foreground-600 mb-4 text-medium md:text-large">
        {t("manageQuizz")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {(isPending || isFetching ? skeletonItems : data?.items).map(
          (quiz: DashboardQuizT , index: number) =>
            quiz ? (
              <QuizCard
                key={quiz.id}
                id={quiz.id}
                title={quiz.title}
                description={quiz.description}
                status={quiz.status}
                questions={quiz.totalQuestions}
              />
            ) : (
              <div
                key={index}
                className="border-dashed border-2 border-gray-300 bg-[#f4f4f5] p-3 md:justify-between flex flex-col shadow-md hover:shadow-lg transition-shadow relative w-full sm:w-auto h-auto rounded-lg"
              >
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <Skeleton className="mt-4 h-4 w-5/6 rounded-lg" />
                <div className="flex items-center justify-start gap-4 mt-4">
                  <Skeleton className="h-8 w-20 rounded-lg" />
                  <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
              </div>
            )
        )}
        <div className="border-dashed border-2 border-gray-300 bg-base-primary text-white rounded-lg flex flex-col justify-center items-center p-4">
          <Link href={routes.createQuiz[0].route}>
            <button className="text-white hover:text-gray-200 transition-colors flex flex-col items-center">
              <span className="text-4xl mb-2">+</span>
              <span>{t("addQuizzButton")}</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
