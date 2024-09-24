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
import { useStats } from "../../(quiz-details)/quiz-details/hooks/useStats";
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

const StatisticsPage = () => {
  const t = useTranslations("Dashboard");
  const { data: stats, isLoading, isFetching } = useStats();
  const tableHeaders = [
    t("scoreTableHeader"),
    t("nameTableHeader"),
    t("status"),
    t("timeTableHeader"),
    t("dateTableHeader"),
    t("detailsTableHeader"),
  ];
  const quizStats: QuizHistoryType[] = stats || [];

  const renderTableContent = () => {
    if (isFetching || isLoading) {
      return [...Array(5)].map((_, index) => (
        <TableRow className="bg-white rounded-lg" key={index}>
          <TableCell>
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell className="text-center md:text-start">
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-full" />
          </TableCell>
        </TableRow>
      ));
    }

    return quizStats.map((stat: QuizHistoryType, index: number) => (
      <TableRow className="bg-white rounded-lg" key={index}>
        <TableCell>{formatQuizResult(stat.quizResult)}</TableCell>
        <TableCell>{stat.quizTitle}</TableCell>
        <TableCell>
          <StatusChip status={stat.status} />
        </TableCell>
        <TableCell className="text-center md:text-start">
          {formatParticipationTime(stat.participtionDateUtc)}
        </TableCell>
        <TableCell>
          {formatParticipationDate(stat.participtionDateUtc)}
        </TableCell>
        <TableCell>
          {stat.status === "Started" ? (
            <span className="text-foreground-600 text-small">
              {t("inProgress")}
            </span>
          ) : (
            <DetailsButton id={stat?.quizId} />
          )}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8 w-full md:max-w-7xl"
    >
      <h2 className="text-4xl font-bold mb-4 text-foreground-700">
        {t("statistics")}
      </h2>
      <p className="text-foreground-600 mb-4 text-medium md:text-large"></p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <NavbarContentContainer>
          <Table
            removeWrapper
            color="default"
            className="overflow-x-auto bg-content2 gap-6 p-6 rounded-lg w-full"
          >
            <TableHeader className="flex justify-between rounded-lg">
              {tableHeaders.map((tableHeader, index) => (
                <TableColumn className="uppercase" key={index}>
                  <div className="flex items-center justify-between gap-2">
                    <span>{tableHeader}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label={t("filterArrow")}
                    >
                      <path
                        d="M2.7193 10.0333L7.06596 5.68666C7.5793 5.17332 8.4193 5.17332 8.93263 5.68666L13.2793 10.0333"
                        stroke="#11181C"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody emptyContent={t("noQuizTakenDialogue")}>
              {renderTableContent()}
            </TableBody>
          </Table>
        </NavbarContentContainer>
        {isFetching ? (
          <Skeleton className="h-[400px]" />
        ) : (
          <Chart quiz={quizStats} />
        )}
        <DetailsModal quiz={quizStats} />
      </motion.div>
    </motion.section>
  );
};

export default StatisticsPage;
