"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useStats } from "../../(quiz-details)/quiz-details/hooks/useStats";
import Stats from "@/components/shared/Stats";

const StatisticsPage = () => {
  const t = useTranslations("Dashboard");
  const { data: stats, isLoading, isFetching } = useStats();
  return (
    <Stats
      quizStats={stats || []}
      isLoading={isLoading}
      isFetching={isFetching}
    />
  );
};

export default StatisticsPage;
