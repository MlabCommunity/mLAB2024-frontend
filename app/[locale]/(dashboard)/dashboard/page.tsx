"use client";
import React from "react";
import QuizCard from "../components/QuizCard";
import Link from "next/link";
import { routes } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { getQuizList } from "@/utils/actions/quiz/getQuizList";
import { useTranslations } from "next-intl";

const DashboardPage = () => {
  const { data } = useQuery({
    queryKey: ["quizList"], // Using a more descriptive key
    queryFn: getQuizList,
  });
  const t = useTranslations("Dashboard");
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
        {data?.items.map((quiz) => (
          <QuizCard
            key={quiz.id}
            id={quiz.id}
            title={quiz.title}
            description={quiz.description}
            status={quiz.status}
            questions={quiz.totalQuestions}
          />
        ))}
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
