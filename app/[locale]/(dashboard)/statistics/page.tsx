"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  TableCell,
  Skeleton,
} from "@nextui-org/react";
import NavbarContentContainer from "@/components/NavbarContentContainer";
import DetailsModal from "../../(quiz-details)/modals/DetailsModal";
import {
  formatParticipationDate,
  formatParticipationTime,
  formatQuizResult,
} from "@/utils/helpers";
import StatusChip from "../../(quiz-details)/components/statistics/StatusChip/StatusChip";
import DetailsButton from "../../(quiz-details)/components/statistics/buttons/DetailsButton";
import Chart from "../../(quiz-details)/components/chart/Chart";
import { QuizHistoryType } from "@/types";
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
