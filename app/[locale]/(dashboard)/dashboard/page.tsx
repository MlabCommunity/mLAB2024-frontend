"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import { Button, Pagination, Skeleton } from "@nextui-org/react";
import { DashboardQuizItemT } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import QuizCard from "../components/QuizCard";
import DashboardLoading from "../components/components/loading";
import { motion } from "framer-motion";
import { ListPlus } from "lucide-react";
import usePaginator from "@/app/hooks/usePaginator";
import { getQuizList } from "@/utils/actions/quiz/getQuizList";
import { useStepperStore } from "@/store/stepperStore";
import { useRouter } from "next/navigation";
const DashboardPage = () => {
  const t = useTranslations("Dashboard");
  const {
    page,
    setPage,
    pages,
    items: quizzes,
    isFetching,
    isSuccess,
  } = usePaginator({
    fetch: getQuizList,
    queryKey: ["quizList"],
    pageSize: 4,
  });
  const { addVisitedRoute, setCurrentRoute } = useStepperStore();
  const router = useRouter();
  const redirectToQuizCreation = () => {
    addVisitedRoute(routes.generateQuiz.pathname);
    setCurrentRoute(routes.generateQuiz.pathname);
    router.push(routes.generateQuiz.pathname);
  };
  const queryClient = useQueryClient();

  const renderQuizCards = () => {
    if (isFetching) return <DashboardLoading />;
    if (!quizzes.length) return null;

    return quizzes?.map((quiz: DashboardQuizItemT) => (
      <QuizCard
        key={quiz.id}
        id={quiz.id}
        title={quiz.title}
        description={quiz.description}
        status={quiz.status}
        questions={quiz.totalQuestions}
        currentPage={page}
      />
    ));
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["quizzes"] });
  }, [queryClient]);
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
          <Link href="take-quiz-join">
            <Button size="lg" className="gap-2" color="primary">
              <ListPlus />
              {t("takeQuizBtn")}
            </Button>
          </Link>
        </div>
        <p className="text-foreground-600 mb-4 text-medium md:text-large">
          {t("manageQuizz")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {renderQuizCards()}
        </div>
        <div className="w-full">
          {isSuccess && quizzes && quizzes.length >= 0 ? (
            <Pagination
              className="flex justify-center w-full py-10"
              total={pages}
              initialPage={page}
              onChange={handlePageChange}
            />
          ) : (
            <Skeleton className="w-1/2 mx-auto h-12 my-5 rounded-lg" />
          )}

          <button
            className="text-white w-full h-full hover:text-gray-200 transition-colors flex flex-col items-center"
            onClick={redirectToQuizCreation}
          >
            <div className="w-full cursor-pointer border-dashed border-2 border-gray-300 bg-base-primary text-white rounded-lg flex flex-col justify-center items-center p-4">
              <span className="text-4xl mb-2">+</span>
              <span>{t("addQuizzButton")}</span>
            </div>
          </button>
        </div>
      </section>
    </motion.div>
  );
};

export default DashboardPage;
