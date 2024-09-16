"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import { Pagination, Skeleton } from "@nextui-org/react";
import { DashboardQuizItemT } from "../types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getQuizList } from "@/utils/actions/quiz/getQuizList";
import QuizCard from "../components/QuizCard";
import DashboardLoading from "../components/components/loading";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const t = useTranslations("Dashboard");
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["quizList", currentPage],
    queryFn: () => getQuizList(currentPage),
  });

  const totalPages = data?.totalPages ?? 0;

  const queryClient = useQueryClient();
  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["quizList", nextPage],
        queryFn: () => getQuizList(nextPage),
      });
    }
  }, [currentPage, queryClient, totalPages]);

  const renderQuizCards = () => {
    if (isFetching) return <DashboardLoading />;
    if (!data?.items?.length) return null;

    return data.items.map((quiz: DashboardQuizItemT) => (
      <QuizCard
        key={quiz.id}
        id={quiz.id}
        title={quiz.title}
        description={quiz.description}
        status={quiz.status}
        questions={quiz.totalQuestions}
        currentPage={currentPage}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <section className="py-8 w-full md:max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-5 font-semibold">
          <h2 className="text-4xl font-bold mb-4 sm:mb-0 text-foreground-700">
            {t("quizzes")}
          </h2>
        </div>
        <p className="text-foreground-600 mb-4 text-medium md:text-large">
          {t("manageQuizz")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {renderQuizCards()}
        </div>
        <div className="w-full">
          {isSuccess && data?.items.length >= 0 ? (
            <Pagination
              className="flex justify-center w-full py-10"
              total={totalPages}
              initialPage={currentPage}
              onChange={setCurrentPage}
            />
          ) : (
            <Skeleton className="w-1/2 mx-auto h-12 my-5 rounded-lg" />
          )}
          <div className="w-full border-dashed border-2 border-gray-300 bg-base-primary text-white rounded-lg flex flex-col justify-center items-center p-4">
            <Link href={routes.createQuiz[0].route}>
              <button className="text-white hover:text-gray-200 transition-colors flex flex-col items-center">
                <span className="text-4xl mb-2">+</span>
                <span>{t("addQuizzButton")}</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default DashboardPage;
