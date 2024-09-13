"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import { Pagination, Skeleton } from "@nextui-org/react";
import { DashboardQuizItemT } from "../types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getQuizList } from "@/utils/actions/quiz/getQuizList";
import QuizCard from "../components/QuizCard";
import DashboardLoading from "./loading";
import { motion, useScroll } from "framer-motion";

const DashboardPage = () => {
  const t = useTranslations("Dashboard");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // const { data, isPending, isFetching, isSuccess } =
  //   useGetQuizList(currentPage);

  const { data, isPending, isFetching, isSuccess } = useQuery({
    queryKey: ["quizList", currentPage],
    queryFn: () => getQuizList(currentPage),
    staleTime: 50000,
  });
  const totalPages = data?.totalPages;

  const queryClient = useQueryClient();
  useEffect(() => {
    if (currentPage < pageSize) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["quizList", nextPage],
        queryFn: () => getQuizList(nextPage),
      });
    }
  }, [currentPage, queryClient]);

  return !isFetching ? (
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
          {data.items.map((quiz: DashboardQuizItemT, index: number) => (
            <QuizCard
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              description={quiz.description}
              status={quiz.status}
              questions={quiz.totalQuestions}
            />
          ))}
        </div>
        <div className="w-full">
          {data?.items.length !== 0 && isSuccess && (
            <Pagination
              className="flex justify-center w-full py-10"
              total={totalPages}
              initialPage={currentPage}
              onChange={(pageNumber) => setCurrentPage(pageNumber)}
            />
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
  ) : (
    <DashboardLoading />
  );
};

export default DashboardPage;
