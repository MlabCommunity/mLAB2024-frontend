"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import DetailsButton from "../components/statistics/buttons/DetailsButton";
import NavbarContentContainer from "@/components/NavbarContentContainer";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ChartModal from "../modals/ChartModal";
import { useStats } from "../quiz-details/hooks/useStats";
import {
  formatQuizResult,
  formatParticipationDate,
  formatParticipationTime,
} from "@/utils/helpers";
import StatusChip from "../components/statistics/StatusChip/StatusChip";
import { QuizHistoryType } from "@/types";
import DetailsModal from "../modals/DetailsModal";
import { Button, Skeleton } from "@nextui-org/react";
import { useModalStore } from "@/store/modalStore";
import StatisticsPage from "../../(dashboard)/statistics/page";

function Statistics() {
  const t = useTranslations("quizDetails");

  const tableHeaders = [
    t("scoreTableHeader"),
    t("nameTableHeader"),
    t("status"),
    t("timeTableHeader"),
    t("dateTableHeader"),
    t("detailsTableHeader"),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div>Coming soon...</div>
    </motion.div>
  );
}

export default Statistics;
