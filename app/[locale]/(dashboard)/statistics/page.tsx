"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useStats } from "../../(quiz-details)/quiz-details/hooks/useStats";
import Stats from "@/components/shared/Stats";

const StatisticsPage = () => {
  const t = useTranslations("Dashboard");
  const { data: stats, isLoading, isFetching } = useStats();
  if (!stats || stats.length == 0) {
    return (
      <div className="flex w-full  font-semibold text-foreground-600 text-2xl items-center justify-center">
        {t("noDataAvailable")}
      </div>
    );
  }
  return (
    <Stats quizStats={stats} isLoading={isLoading} isFetching={isFetching} />
  );
};

export default StatisticsPage;
